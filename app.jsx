/* Bitki Hub — root app, router + Tweaks */
const { useState: _useState, useEffect: _useEffect } = React;

/* ── Language detection ──────────────────────────────────────────────────────
   Priority order:
     1. localStorage  — user's explicit manual choice (survives reloads)
     2. navigator.language — Arabic browser setting
     3. IP geolocation — country-based detection (async, first visit only)
     4. Default: "en"
   ─────────────────────────────────────────────────────────────────────────── */
const _ARABIC_COUNTRIES = new Set([
  'SA','AE','EG','KW','QA','BH','OM','JO','IQ','LB','SY','LY','TN','DZ','MA'
]);
const _LANG_KEY  = 'bitkihub_lang';
const _getLang   = () => { try { return localStorage.getItem(_LANG_KEY) } catch { return null } };
const _saveLang  = (l) => { try { localStorage.setItem(_LANG_KEY, l)   } catch {} };

/* Runs synchronously — zero render flash */
const __INITIAL_LANG = (() => {
  const saved = _getLang();
  if (saved === 'ar' || saved === 'en') return saved;
  /* Arabic browser locale → save so the async IP check skips on next visit */
  if ((navigator.language || '').toLowerCase().startsWith('ar')) {
    _saveLang('ar');
    return 'ar';
  }
  return 'en'; // IP check in useEffect may upgrade this for Arabic-country visitors
})();

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "hero": "split",
  "density": "comfortable",
  "cardStyle": "default",
  "lang": __INITIAL_LANG
}/*EDITMODE-END*/;

/* Simple hash router: #home, #products, #products/cat=palms, #product/olea-europaea-150, #contact, #projects, #about */
function parseHash() {
  const h = (window.location.hash || "#home").slice(1);
  const [head, ...rest] = h.split("/");
  return { route: head || "home", arg: rest.join("/") };
}
function pushHash(route, arg) {
  const h = arg ? `#${route}/${arg}` : `#${route}`;
  if (window.location.hash !== h) window.location.hash = h;
}

function App() {
  const [tweak, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [{ route, arg }, setNav] = _useState(parseHash());
  const [pendingCat, setPendingCat] = _useState(null);
  const [quoteFor, setQuoteFor] = _useState(null);
  /* cmsRev flips from 0 → 1 once Sanity data has replaced window globals,
     which forces the screen <div key=…> to remount with fresh data. */
  const [cmsRev, setCmsRev] = _useState(0);

  _useEffect(() => {
    const onHash = () => setNav(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  _useEffect(() => { window.scrollTo(0, 0); }, [route, arg]);

  /* ── Sanity hydration (initial load) ── */
  _useEffect(() => {
    if (typeof window.initFromSanity !== "function") return;
    window.initFromSanity().then(updated => {
      if (updated) setCmsRev(1);
    });
  }, []);

  /* ── Sanity live preview refresh ──────────────────────────────────────────
     sanity.jsx fires "sanity:updated" whenever content is published while
     the site is loaded inside the Studio's Presentation tool iframe.
     Incrementing cmsRev remounts the active screen with fresh CMS data.
     ──────────────────────────────────────────────────────────────────────── */
  _useEffect(() => {
    const onSanityUpdate = () => setCmsRev(v => v + 1);
    window.addEventListener("sanity:updated", onSanityUpdate);
    return () => window.removeEventListener("sanity:updated", onSanityUpdate);
  }, []);

  /* ── IP-based language detection ─────────────────────────────────────────
     Only runs when there is no stored preference (first visit from a
     non-Arabic browser). Calls ipapi.co to get the visitor's country and
     switches to Arabic if they're in an Arabic-speaking country.
     Aborts after 2.5 s so it never hangs the page.
     ──────────────────────────────────────────────────────────────────────── */
  _useEffect(() => {
    if (_getLang()) return; /* Stored preference exists — skip */
    const ctrl  = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 2500);
    fetch('https://ipapi.co/json/', { signal: ctrl.signal })
      .then(r => r.json())
      .then(({ country_code }) => {
        clearTimeout(timer);
        if (_getLang()) return; /* User switched manually while we were fetching */
        const detected = _ARABIC_COUNTRIES.has(country_code) ? 'ar' : 'en';
        _saveLang(detected);
        setTweak('lang', detected);
      })
      .catch(() => clearTimeout(timer));
    return () => { ctrl.abort(); clearTimeout(timer); };
  }, []);

  const lang = tweak.lang || "en";
  const t = STRINGS[lang];
  const theme = tweak.theme;

  _useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-density", tweak.density);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", lang);
  }, [theme, tweak.density, lang]);

  const go = (r, productId, catId) => {
    if (catId) setPendingCat(catId); else if (r !== "products") setPendingCat(null);
    pushHash(r, productId || (catId && r === "products" ? `cat-${catId}` : undefined));
  };

  let initialCat = null;
  if (route === "products" && arg && arg.startsWith("cat-")) initialCat = arg.slice(4);
  else if (pendingCat && route === "products") initialCat = pendingCat;

  let screen;
  if (route === "products") screen = <Products t={t} lang={lang} go={go} initialCat={initialCat} cardStyle={tweak.cardStyle}/>;
  else if (route === "product") screen = <ProductDetail t={t} lang={lang} go={go} productId={arg} openQuote={setQuoteFor} cardStyle={tweak.cardStyle}/>;
  else if (route === "contact") screen = <Contact t={t} lang={lang} go={go}/>;
  else if (route === "projects") screen = <SimplePage t={t} lang={lang} go={go} kind="projects"/>;
  else if (route === "about") screen = <SimplePage t={t} lang={lang} go={go} kind="about"/>;
  else if (route === "blog") screen = <Blog t={t} lang={lang} go={go}/>;
  else if (route === "faq") screen = <FAQ t={t} lang={lang} go={go}/>;
  else if (route === "privacy") screen = <Privacy t={t} lang={lang} go={go}/>;
  else screen = <Home t={t} go={go} lang={lang} tweaks={tweak} openQuote={setQuoteFor} cardStyle={tweak.cardStyle}/>;

  return (
    <>
      <Header route={route} go={go} t={t} lang={lang} setLang={(v)=>{ _saveLang(v); setTweak("lang", v); }} theme={theme}/>
      <div key={`${route}-${arg}-${lang}-${cmsRev}`} className="fade-in">{screen}</div>
      <Footer t={t} go={go} theme={theme}/>

      {quoteFor && <QuoteModal product={quoteFor} onClose={()=>setQuoteFor(null)} t={t} lang={lang}/>}

      <WhatsAppFAB lang={lang}/>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme & density" />
        <TweakRadio label="Theme" value={tweak.theme}
          options={["light", "dark"]}
          onChange={(v) => setTweak("theme", v)} />
        <TweakRadio label="Density" value={tweak.density}
          options={["comfortable", "compact"]}
          onChange={(v) => setTweak("density", v)} />
        <TweakRadio label="Language" value={tweak.lang}
          options={["en", "ar"]}
          onChange={(v) => setTweak("lang", v)} />

        <TweakSection label="Homepage hero" />
        <TweakSelect label="Layout" value={tweak.hero}
          options={[
            { label: "Editorial — mega type + stamp", value: "editorial" },
            { label: "Split — image + copy", value: "split" },
            { label: "Full-bleed dark", value: "full" },
            { label: "Catalogue tiles", value: "catalog" },
          ]}
          onChange={(v) => setTweak("hero", v)} />

        <TweakSection label="Product cards" />
        <TweakRadio label="Card style" value={tweak.cardStyle}
          options={["default", "min"]}
          onChange={(v) => setTweak("cardStyle", v)} />

        <TweakSection label="Jump to" />
        <TweakButton label="Home"        onClick={() => go("home")} />
        <TweakButton label="Catalogue"   onClick={() => go("products")} />
        <TweakButton label="Product detail" onClick={() => go("product", "olea-europaea-150")} />
        <TweakButton label="Blog"        onClick={() => go("blog")} />
        <TweakButton label="FAQ"         onClick={() => go("faq")} />
        <TweakButton label="Privacy"     onClick={() => go("privacy")} />
        <TweakButton label="Contact"     onClick={() => go("contact")} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
