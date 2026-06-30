/* Bitki Hub — shared UI primitives
   Loaded after components.jsx (needs Icon) and data.jsx (needs DIAL_CODES). */
const { useState: _uiS, useEffect: _uiE, useRef: _uiR } = React;

/* ============================================================
   Phone input with country dial-code selector
   ============================================================ */
function PhoneInput({ value, onChange, country, onCountryChange, lang, error, placeholder }) {
  const [open, setOpen]   = _uiS(false);
  const [search, setSearch] = _uiS("");
  const ref = _uiR(null);

  _uiE(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const current  = DIAL_CODES.find(c => c.code === country) || DIAL_CODES[0];
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
        placeholder={placeholder || "5xx xxx xxxx"}/>

      {open && (
        <div className="phone-input__menu">
          <div className="phone-input__search">
            <Icon name="search" size={14}/>
            <input autoFocus placeholder={lang === "ar" ? "ابحث عن دولة…" : "Search country…"}
              value={search} onChange={(e) => setSearch(e.target.value)}/>
          </div>
          <div className="phone-input__list">
            {filtered.map(c => (
              <button key={c.code} type="button"
                className={`phone-input__row ${c.code === country ? "is-active" : ""}`}
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
   Brand mark — SVG leaf logo
   ============================================================ */
function LeafMark({ size = 48, color = "currentColor", className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 240 200" fill="none" className={className} aria-hidden="true">
      <path d="M 40 70 A 80 80 0 0 0 200 70" stroke={color} strokeWidth="14" strokeLinecap="butt" fill="none"/>
      <path d="M 60 70 A 60 60 0 0 0 180 70" stroke={color} strokeWidth="10" strokeLinecap="butt" fill="none"/>
      <path d="M 55 28 C 60 80 100 105 120 105 C 110 60 85 30 55 28 Z" fill="none" stroke={color} strokeWidth="12" strokeLinejoin="round"/>
      <path d="M 185 28 C 180 80 140 105 120 105 C 130 60 155 30 185 28 Z" fill="none" stroke={color} strokeWidth="12" strokeLinejoin="round"/>
    </svg>
  );
}

/* ============================================================
   Rotating stamp — "Yalova · est 2024 · field grown"
   ============================================================ */
function BrandStamp({ size = "md", text = "Bitki Hub · Yalova · Est 2024 · Field Grown · ", color = "var(--green-1000)", coreColor }) {
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
   Kicker bar — lime marquee strip
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
   Editorial specimen card — used on home page stock list
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
            <small>{lang==="en" ? "from" : "من"}</small>€{p.price.toFixed(2)}
          </div>
        </div>
      </div>
    </button>
  );
}

Object.assign(window, { PhoneInput, LeafMark, BrandStamp, KickerBar, SpecimenCard });
