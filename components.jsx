/* Bitki Hub — shared components
   Provides: Icon, Header, Footer, PrimaryCTA, GhostCTA, ProductCard
   Modal overlays → components-modal.jsx
   UI primitives  → components-ui.jsx */

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
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [logoFailed, setLogoFailed] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

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
  const handleNav = (id) => { go(id); setMenuOpen(false); };

  const LogoEl = () => (
    <a className="site-header__logo" href="#" onClick={(e) => { e.preventDefault(); go("home"); }}>
      {!logoFailed
        ? <img src={logoSrc} alt="Bitki Hub"
            style={{height:"40px",width:"auto",display:"block"}}
            onError={() => setLogoFailed(true)} />
        : <span style={{fontWeight:800,fontSize:"18px",letterSpacing:"-0.01em"}}>Bitki Hub</span>
      }
    </a>
  );

  return (
    <>
      <header className="site-header">
        <div className="container site-header__inner">
          <LogoEl />

          {!isMobile && (
            <nav className="site-header__nav">
              {items.map(([id, label]) => (
                <a key={id} href={`#${id}`}
                  className={route === id || (id==="products" && route==="product") ? "is-active" : ""}
                  onClick={(e) => { e.preventDefault(); handleNav(id); }}>
                  {label}
                </a>
              ))}
            </nav>
          )}

          <div className="site-header__spacer"></div>

          {!isMobile && (
            <>
              <div className="lang-toggle" role="group" aria-label="Language">
                <button className={lang==="en"?"is-active":""} onClick={()=>setLang("en")}>EN</button>
                <button className={lang==="ar"?"is-active":""} onClick={()=>setLang("ar")}>ع</button>
              </div>
              <button className="btn btn--primary" onClick={()=>go("contact")}>
                {t.requestQuote}
                <span className="arrow"><Icon name="arrow" size={14}/></span>
              </button>
            </>
          )}

          {isMobile && (
            <button
              className="nav-hamburger"
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(o => !o)}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          )}
        </div>
      </header>

      {isMobile && menuOpen && (
        <div className="mobile-overlay" onClick={() => setMenuOpen(false)}>
          <div className="mobile-overlay__panel" onClick={e => e.stopPropagation()}>
            <div className="mobile-overlay__top">
              <span className="mobile-overlay__brand">Bitki Hub</span>
              <button className="mobile-overlay__close" onClick={() => setMenuOpen(false)}>✕</button>
            </div>
            <nav className="mobile-overlay__nav">
              {items.map(([id, label]) => (
                <a key={id} href={`#${id}`}
                  className={route === id || (id==="products" && route==="product") ? "is-active" : ""}
                  onClick={(e) => { e.preventDefault(); handleNav(id); }}>
                  {label}
                </a>
              ))}
            </nav>
            <div className="mobile-overlay__footer">
              <div className="lang-toggle" role="group" aria-label="Language">
                <button className={lang==="en"?"is-active":""} onClick={()=>setLang("en")}>EN</button>
                <button className={lang==="ar"?"is-active":""} onClick={()=>setLang("ar")}>ع</button>
              </div>
              <button className="btn btn--primary"
                style={{width:"100%",justifyContent:"center"}}
                onClick={() => { go("contact"); setMenuOpen(false); }}>
                {t.requestQuote}
                <span className="arrow"><Icon name="arrow" size={14}/></span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
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
          €{p.price.toFixed(2)}
        </div>
        <span className="quote-cta">{t.cta.view} <Icon name="arrow" size={12}/></span>
      </div>
    </div>
  </button>
);

Object.assign(window, { Icon, Header, Footer, PrimaryCTA, GhostCTA, ProductCard });
