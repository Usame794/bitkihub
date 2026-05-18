/* Bitki Hub — root app, router + Tweaks */
const { useState: _useState, useEffect: _useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "hero": "split",
  "density": "comfortable",
  "cardStyle": "default",
  "lang": "en"
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

  _useEffect(() => {
    const onHash = () => setNav(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  _useEffect(() => { window.scrollTo(0, 0); }, [route, arg]);

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
      <Header route={route} go={go} t={t} lang={lang} setLang={(v)=>setTweak("lang", v)} theme={theme}/>
      <div key={`${route}-${arg}-${lang}`} className="fade-in">{screen}</div>
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
