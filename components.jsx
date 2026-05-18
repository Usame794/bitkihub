/* Bitki Hub — shared components */
const { useState, useEffect, useRef, useMemo } = React;

/* ============================================================
   Icons (lightweight inline)
   ============================================================ */
const Icon = ({ name, size = 18, stroke = 1.6, ...rest }) => {
  const paths = {
    arrow:    <path d="M5 12h14M13 6l6 6-6 6"/>,
    chev:     <path d="M9 6l6 6-6 6"/>,
    chevDown: <path d="M6 9l6 6 6-6"/>,
    plus:     <path d="M12 5v14M5 12h14"/>,
    minus:    <path d="M5 12h14"/>,
    search:   <><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></>,
    heart:    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>,
    leaf:     <path d="M11 20A7 7 0 0 1 4 13c0-5 7-11 7-11s7 6 7 11a7 7 0 0 1-7 7zM11 4v16"/>,
    truck:    <><path d="M1 3h15v13H1zM16 8h4l3 3v5h-7"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>,
    shield:   <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></>,
    cert:     <><circle cx="12" cy="9" r="6"/><path d="M9 14l-2 7 5-3 5 3-2-7"/></>,
    globe:    <><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20"/></>,
    pin:      <><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
    mail:     <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></>,
    phone:    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/>,
    clock:    <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,
    drop:     <path d="M12 2s7 8 7 13a7 7 0 0 1-14 0c0-5 7-13 7-13z"/>,
    sun:      <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></>,
    star:     <path d="M12 2l3.09 6.26 6.91 1-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.13 2 9.26l6.91-1z"/>,
    user:     <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    build:    <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 21V9h6v12"/></>,
    sprout:   <><path d="M12 22V12"/><path d="M12 12c0-4 3-6 7-6-2 4-4 6-7 6z"/><path d="M12 12c0-4-3-6-7-6 2 4 4 6 7 6z"/></>,
    check:    <path d="M5 12l5 5 9-12"/>,
    x:        <path d="M18 6L6 18M6 6l12 12"/>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" {...rest}>
      {paths[name]}
    </svg>
  );
};

/* ============================================================
   Header / Footer
   ============================================================ */
const Header = ({ route, go, t, lang, setLang, theme }) => {
  const items = [
    ["home", t.nav.home],
    ["products", t.nav.products],
    ["projects", t.nav.projects],
    ["blog", t.nav.blog],
    ["faq", t.nav.faq],
    ["about", t.nav.about],
    ["contact", t.nav.contact],
  ];
  const logoSrc = theme === "dark" ? "assets/logo-white.png" : "assets/logo-on-light.png";
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="site-header__logo" href="#" onClick={(e)=>{e.preventDefault(); go("home");}}>
          <img src={logoSrc} alt="Bitki Hub" />
        </a>
        <nav className="site-header__nav">
          {items.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={route === id || (id==="products" && route==="product") ? "is-active" : ""}
              onClick={(e) => { e.preventDefault(); go(id); }}>
              {label}
            </a>
          ))}
        </nav>
        <div className="site-header__spacer"></div>
        <div className="lang-toggle" role="group" aria-label="Language">
          <button className={lang==="en"?"is-active":""} onClick={()=>setLang("en")}>EN</button>
          <button className={lang==="ar"?"is-active":""} onClick={()=>setLang("ar")}>ع</button>
        </div>
        <button className="btn btn--primary" onClick={()=>go("contact")}>
          {t.requestQuote}
          <span className="arrow"><Icon name="arrow" size={14}/></span>
        </button>
      </div>
    </header>
  );
};

const Footer = ({ t, go, theme }) => (
  <footer className="footer footer--5">
    <div className="container">
      <div className="footer__brand">
        <img src="assets/logo-white.png" alt="Bitki Hub" />
        <p>{t.footer.tagline}</p>
      </div>
      <div>
        <h5>{t.footer.colA}</h5>
        <ul>{t.footer.colAItems.map(x => <li key={x}><a onClick={()=>go("products")} href="#products">{x}</a></li>)}</ul>
      </div>
      <div>
        <h5>{t.footer.colB}</h5>
        <ul>
          {t.footer.colBItems.map((x, i) => {
            const routes = ["about", "about", "projects", "blog", "faq", null];
            return <li key={x}><a onClick={(e)=>{ e.preventDefault(); routes[i] && go(routes[i]); }} href="#">{x}</a></li>;
          })}
        </ul>
      </div>
      <div>
        <h5>{t.footer.colC}</h5>
        <ul>
          {t.footer.colCItems.map((x, i) => {
            const routes = ["privacy", "privacy", "privacy", null, null];
            return <li key={x}><a onClick={(e)=>{ e.preventDefault(); routes[i] && go(routes[i]); }} href="#">{x}</a></li>;
          })}
        </ul>
      </div>
      <div>
        <h5>{t.footer.colD}</h5>
        <ul>{t.footer.colDItems.map(x => <li key={x}><a href="#">{x}</a></li>)}</ul>
      </div>
    </div>
    <div className="container footer__bottom">
      <span>{t.footer.bottom}</span>
      <span>{t.footer.tagBottom}</span>
    </div>
  </footer>
);

/* ============================================================
   Reusable building blocks
   ============================================================ */
const PrimaryCTA = ({ children, onClick, dark }) => (
  <button className={`btn ${dark ? "btn--dark" : "btn--primary"}`} onClick={onClick}>
    {children}
    <span className="arrow"><Icon name="arrow" size={14}/></span>
  </button>
);
const GhostCTA = ({ children, onClick }) => (
  <button className="btn btn--ghost" onClick={onClick}>
    {children}
  </button>
);

const ProductCard = ({ p, lang, t, go, style }) => (
  <button className={`product-card ${style==="min" ? "style-min" : ""}`} onClick={() => go("product", p.id)}>
    <div className="product-card__media">
      <img src={p.img} alt={p.name[lang]} loading="lazy" />
      {p.badge && <span className="product-card__tag">{p.badge[lang]}</span>}
      <span className="product-card__fav" aria-label="favorite"><Icon name="heart" size={16} stroke={1.8}/></span>
    </div>
    <div className="product-card__body">
      <div className="latin">{p.latin}</div>
      <div className="name">{p.name[lang]}</div>
      <div className="meta">
        <span>{p.height}</span>
        <span>{p.pot}</span>
      </div>
      <div className="product-card__footer">
        <div className="price">
          <span className="from">{lang==="en" ? "from" : "ابتداء من"}</span>
          ${p.price}
        </div>
        <span className="quote-cta">{t.cta.view} <Icon name="arrow" size={12}/></span>
      </div>
    </div>
  </button>
);

/* ============================================================
   Quote Modal — supports Email and/or WhatsApp contact
   ============================================================ */
const QuoteModal = ({ product, onClose, t, lang }) => {
  const [qty, setQty] = useState(product?.moq || 1);
  const [method, setMethod] = useState("whatsapp"); // 'email' | 'whatsapp' | 'both'
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("SA");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  if (!product) return null;

  const useEmail = method === "email" || method === "both";
  const useWA    = method === "whatsapp" || method === "both";

  const submit = () => {
    const e = {};
    if (useEmail && (!email || !email.includes("@"))) e.email = true;
    if (useWA && !phone) e.phone = true;
    setErrors(e);
    if (Object.keys(e).length === 0) setSubmitted(true);
  };

  const methodOpts = [
    { id: "whatsapp", label: lang === "en" ? "WhatsApp" : "واتساب",  icon: "wa" },
    { id: "email",    label: lang === "en" ? "Email"    : "البريد",   icon: "mail" },
    { id: "both",     label: lang === "en" ? "Both"     : "كلاهما",   icon: "both" },
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e)=>e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}><Icon name="x" size={18}/></button>
        {!submitted ? (
          <>
            <div className="eyebrow" style={{marginBottom: 12}}>{lang==="en"?"Quick quote":"عرض سعر سريع"}</div>
            <h3 style={{fontSize: 26, marginBottom: 6}}>{product.name[lang]}</h3>
            <div style={{color: "var(--text-soft)", fontStyle: "italic", marginBottom: 24, fontFamily: "var(--font-serif)"}}>{product.latin}</div>

            <div className="field" style={{marginBottom: 16}}>
              <label>{lang==="en" ? "How should we reply?" : "كيف نرد عليك؟"}</label>
              <div className="method-row">
                {methodOpts.map(opt => (
                  <button key={opt.id} type="button"
                    className={`method-pill ${method === opt.id ? "is-active" : ""}`}
                    onClick={() => setMethod(opt.id)}>
                    {opt.icon === "wa" && (
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M20.5 3.5C18.2 1.2 15.2 0 12 0 5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.7.9 3.7 1.5 5.8 1.5 6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.4zM12 21.8c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.5 15.6 2 13.8 2 12 2 6.5 6.5 2 12 2c2.7 0 5.2 1 7.1 2.9 1.9 1.9 2.9 4.4 2.9 7.1 0 5.5-4.5 9.8-10 9.8z"/></svg>
                    )}
                    {opt.icon === "mail" && <Icon name="mail" size={14}/>}
                    {opt.icon === "both" && <Icon name="check" size={14}/>}
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {useWA && (
              <div className={`field ${errors.phone ? "field--error" : ""}`} style={{marginBottom: 16}}>
                <label>{lang==="en" ? "WhatsApp number" : "رقم واتساب"} *</label>
                <PhoneInput lang={lang} error={errors.phone}
                  value={phone} onChange={setPhone}
                  country={country} onCountryChange={setCountry}/>
              </div>
            )}

            {useEmail && (
              <div className={`field ${errors.email ? "field--error" : ""}`} style={{marginBottom: 16}}>
                <label>{lang==="en"?"Email":"البريد الإلكتروني"} *</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com"/>
              </div>
            )}

            <div className="field" style={{marginBottom: 16}}>
              <label>{t.qtyLabel} ({lang==="en"?"min":"حد أدنى"} {product.moq})</label>
              <div className="qty-stepper" style={{alignSelf:"start"}}>
                <button onClick={()=>setQty(Math.max(product.moq, qty - 10))}><Icon name="minus" size={14}/></button>
                <input value={qty} onChange={e=>setQty(parseInt(e.target.value)||product.moq)}/>
                <button onClick={()=>setQty(qty + 10)}><Icon name="plus" size={14}/></button>
              </div>
            </div>

            <div className="field" style={{marginBottom: 24}}>
              <label>{lang==="en"?"Country of delivery":"دولة التسليم"}</label>
              <select>
                {(lang==="en" ? COUNTRIES_EN : COUNTRIES_AR).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            <button className="btn btn--dark btn--lg" style={{width:"100%", justifyContent:"center"}} onClick={submit}>
              {lang==="en"?"Send quote request":"إرسال طلب السعر"}
              <span className="arrow"><Icon name="arrow" size={14}/></span>
            </button>

            <div style={{marginTop: 14, textAlign: "center", fontSize: 12, color: "var(--text-soft)"}}>
              {lang === "en"
                ? "We typically reply within 1 hour during business hours."
                : "نرد عادةً خلال ساعة خلال أوقات العمل."}
            </div>
          </>
        ) : (
          <div className="success-state">
            <div className="check"><Icon name="check" size={28} stroke={2.4}/></div>
            <h3 style={{fontSize: 24, marginBottom: 8}}>{t.successTitle}</h3>
            <p style={{color: "var(--text-soft)"}}>
              {lang === "en"
                ? (useWA && useEmail ? "We'll reach out by WhatsApp and email shortly."
                   : useWA ? "We'll WhatsApp you with a quote shortly."
                   : "A quote will land in your inbox within one working day.")
                : (useWA && useEmail ? "سنتواصل عبر الواتساب والبريد قريباً."
                   : useWA ? "سنرسل عرض السعر عبر الواتساب قريباً."
                   : "سيصلك عرض السعر عبر البريد الإلكتروني خلال يوم عمل.")}
            </p>
            <button className="btn btn--ghost" style={{marginTop: 20}} onClick={onClose}>{lang==="en"?"Close":"إغلاق"}</button>
          </div>
        )}
      </div>
    </div>
  );
};

/* ============================================================
   WhatsApp floating action button — on every page
   ============================================================ */
function WhatsAppFAB({ phone = "905555555555", lang = "en" }) {
  const [open, setOpen] = useState(false);
  const msg = lang === "ar"
    ? "مرحباً، أرغب بالاستفسار عن منتجاتكم."
    : "Hi Bitki Hub — I'd like to ask about your nursery stock.";
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  const label = lang === "ar" ? "تواصل عبر واتساب" : "Chat on WhatsApp";
  const sub   = lang === "ar" ? "نرد عادةً خلال ساعة" : "We usually reply within the hour";
  return (
    <>
      {open && (
        <div className="wa-card" onMouseLeave={() => setOpen(false)}>
          <div className="wa-card__head">
            <div className="wa-card__avatar">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.7 1.2 2.9.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.5-.3z"/><path d="M20.5 3.5C18.2 1.2 15.2 0 12 0 5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.7.9 3.7 1.5 5.8 1.5 6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.4zM12 21.8c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.5 15.6 2 13.8 2 12 2 6.5 6.5 2 12 2c2.7 0 5.2 1 7.1 2.9 1.9 1.9 2.9 4.4 2.9 7.1 0 5.5-4.5 9.8-10 9.8z"/></svg>
            </div>
            <div>
              <strong>Bitki Hub Sales</strong>
              <small>{sub}</small>
            </div>
            <button className="wa-card__x" onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="wa-card__msg">
            {lang === "ar" ? "نحن متاحون الآن — أرسل لنا الأنواع والكميات وميناء الوصول وسنرد بعرض سعر." : "We're online — send species, quantities and port of entry; we'll come back with a quote and lead time."}
          </div>
          <a href={href} target="_blank" rel="noopener" className="wa-card__cta">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.5 3.5C18.2 1.2 15.2 0 12 0 5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.7.9 3.7 1.5 5.8 1.5 6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.4zM12 21.8c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.5 15.6 2 13.8 2 12 2 6.5 6.5 2 12 2c2.7 0 5.2 1 7.1 2.9 1.9 1.9 2.9 4.4 2.9 7.1 0 5.5-4.5 9.8-10 9.8z"/></svg>
            {label}
          </a>
        </div>
      )}
      <button className="wa-fab" onClick={() => setOpen(o => !o)} aria-label="WhatsApp">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.7 1.2 2.9.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.5-.3z"/><path d="M20.5 3.5C18.2 1.2 15.2 0 12 0 5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.7.9 3.7 1.5 5.8 1.5 6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.4zM12 21.8c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.5 15.6 2 13.8 2 12 2 6.5 6.5 2 12 2c2.7 0 5.2 1 7.1 2.9 1.9 1.9 2.9 4.4 2.9 7.1 0 5.5-4.5 9.8-10 9.8z"/></svg>
        <span className="wa-fab__pulse"></span>
      </button>
    </>
  );
}

Object.assign(window, { Header, Footer, PrimaryCTA, GhostCTA, ProductCard, QuoteModal, Icon, LeafMark, BrandStamp, KickerBar, SpecimenCard, WhatsAppFAB, PhoneInput });

/* ============================================================
   Phone input with country dial-code library
   In production: pre-select based on visitor IP (geolocation API).
   ============================================================ */
function PhoneInput({ value, onChange, country, onCountryChange, lang, error, placeholder }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const current = DIAL_CODES.find(c => c.code === country) || DIAL_CODES[0];
  const filtered = DIAL_CODES.filter(c => {
    if (!search) return true;
    const s = search.toLowerCase();
    return c.name.en.toLowerCase().includes(s)
        || c.name.ar.includes(search)
        || c.dial.includes(s)
        || c.code.toLowerCase().includes(s);
  });

  return (
    <div className={`phone-input ${error ? "phone-input--error" : ""}`} ref={ref}>
      <button type="button" className="phone-input__cc" onClick={() => setOpen(o => !o)}>
        <span className="flag">{current.flag}</span>
        <span className="dial">{current.dial}</span>
        <Icon name="chevDown" size={12}/>
      </button>
      <input type="tel" className="phone-input__num"
        value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || (lang === "ar" ? "5xx xxx xxxx" : "5xx xxx xxxx")}/>

      {open && (
        <div className="phone-input__menu">
          <div className="phone-input__search">
            <Icon name="search" size={14}/>
            <input autoFocus placeholder={lang === "ar" ? "ابحث عن دولة…" : "Search country…"}
              value={search} onChange={(e) => setSearch(e.target.value)}/>
          </div>
          <div className="phone-input__list">
            {filtered.map(c => (
              <button key={c.code} type="button" className={`phone-input__row ${c.code === country ? "is-active" : ""}`}
                onClick={() => { onCountryChange(c.code); setOpen(false); setSearch(""); }}>
                <span className="flag">{c.flag}</span>
                <span className="name">{c.name[lang] || c.name.en}</span>
                <span className="dial">{c.dial}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="phone-input__empty">{lang === "ar" ? "لا نتائج" : "No matches"}</div>
            )}
          </div>
          <div className="phone-input__hint">
            <Icon name="globe" size={12}/>
            {lang === "ar"
              ? "سيتم اختيار الدولة تلقائياً حسب موقعك."
              : "Country auto-detected from your location."}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   Brand mark — SVG version of the leaf-and-seed logo
   ============================================================ */
function LeafMark({ size = 48, color = "currentColor", className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 240 200" fill="none" className={className} aria-hidden="true">
      {/* outer semi-circle bowl */}
      <path d="M 40 70 A 80 80 0 0 0 200 70" stroke={color} strokeWidth="14" strokeLinecap="butt" fill="none"/>
      {/* inner semi-circle bowl */}
      <path d="M 60 70 A 60 60 0 0 0 180 70" stroke={color} strokeWidth="10" strokeLinecap="butt" fill="none"/>
      {/* left leaf */}
      <path d="M 55 28 C 60 80 100 105 120 105 C 110 60 85 30 55 28 Z" fill="none" stroke={color} strokeWidth="12" strokeLinejoin="round"/>
      {/* right leaf */}
      <path d="M 185 28 C 180 80 140 105 120 105 C 130 60 155 30 185 28 Z" fill="none" stroke={color} strokeWidth="12" strokeLinejoin="round"/>
    </svg>
  );
}

/* ============================================================
   Rotating stamp — "Yalova · est 2024 · field grown"
   ============================================================ */
function BrandStamp({ size = "md", text = "Bitki Hub · Yalova · Est 2024 · Field Grown · ", color = "var(--green-1000)", coreColor }) {
  // text repeats once around the circle
  const id = React.useMemo(() => "stamp-" + Math.random().toString(36).slice(2, 8), []);
  return (
    <div className={`brand-stamp ${size === "lg" ? "brand-stamp--lg" : ""}`} style={{ color }}>
      <svg className="brand-stamp__ring" viewBox="0 0 200 200">
        <defs>
          <path id={id} d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"/>
        </defs>
        <text>
          <textPath href={`#${id}`} startOffset="0">{text}{text}</textPath>
        </text>
      </svg>
      <div className="brand-stamp__core" style={coreColor ? {background: coreColor} : null}>
        <LeafMark size={size === "lg" ? 44 : 30} color="var(--green-1000)"/>
      </div>
    </div>
  );
}

/* ============================================================
   Kicker bar — lime marquee with small leaf separator
   ============================================================ */
function KickerBar({ items }) {
  return (
    <div className="kicker-bar">
      <div className="kicker-bar__track">
        {[...items, ...items, ...items].map((s, i) => (
          <span key={i} className="kicker-bar__item">
            <LeafMark size={16} color="var(--green-1000)" className="leaf"/>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   Editorial specimen card
   ============================================================ */
function SpecimenCard({ p, lang, t, go, idx }) {
  return (
    <button className="specimen-card" onClick={() => go("product", p.id)}>
      <div className="specimen-card__media">
        <img src={p.img} alt={p.name[lang]} loading="lazy"/>
        <span className="specimen-card__idx">№ {String(idx + 1).padStart(2, "0")}</span>
        {p.badge && <span className="specimen-card__tag">{p.badge[lang]}</span>}
      </div>
      <div className="specimen-card__body">
        <div className="specimen-card__latin">{p.latin}</div>
        <div className="specimen-card__name">{p.name[lang]}</div>
        <div className="specimen-card__row">
          <span>{p.height}</span>
          <div className="specimen-card__price">
            <small>{lang==="en" ? "from" : "من"}</small>${p.price}
          </div>
        </div>
      </div>
    </button>
  );
}
