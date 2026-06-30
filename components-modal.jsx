/* Bitki Hub — modal overlays
   Loaded after components.jsx (needs Icon) and components-ui.jsx (needs PhoneInput).
   Security: honeypot anti-spam + rate limiting + input sanitization on submit. */
const { useState: _mS, useEffect: _mE } = React;

/* ============================================================
   Quick Quote modal — opened from product cards
   ============================================================ */
const QuoteModal = ({ product, onClose, t, lang }) => {
  const [qty, setQty]               = _mS(product?.moq || 1);
  const [method, setMethod]         = _mS("whatsapp");
  const [email, setEmail]           = _mS("");
  const [phone, setPhone]           = _mS("");
  const [country, setCountry]       = _mS("SA");
  const [errors, setErrors]         = _mS({});
  const [submitted, setSubmitted]   = _mS(false);
  const [sending, setSending]       = _mS(false);
  const [sendError, setSendError]   = _mS(false);
  const [deliveryCountry, setDeliveryCountry] = _mS("Saudi Arabia");
  const [_hp, set_hp]               = _mS(""); // honeypot

  if (!product) return null;

  const useEmail = method === "email" || method === "both";
  const useWA    = method === "whatsapp" || method === "both";

  const submit = async () => {
    if (_hp) return; // bot detected — silently reject

    const e = {};
    if (useEmail && (!email || !email.includes("@"))) e.email = true;
    if (useWA && !phone) e.phone = true;
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    if (!checkRateLimit()) {
      setSendError("rate");
      return;
    }

    setSending(true);
    setSendError(false);
    try {
      await sanityMutate([{ create: {
        _type:           'lead',
        createdAt:       new Date().toISOString(),
        source:          'quote-modal',
        plant:           sanitizeField(`${product.name.en} (${product.latin})`, 200),
        email:           useEmail ? sanitizeField(email, 200) : undefined,
        phone:           useWA    ? sanitizeField(phone, 30)  : undefined,
        replyVia:        method,
        deliveryCountry: sanitizeField(deliveryCountry, 100),
      }}]);
      fetch("https://formspree.io/f/REPLACE_WITH_YOUR_ENDPOINT", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          _subject: `Quick Quote — ${product.name.en}`,
          plant: `${product.name.en} (${product.latin})`,
          reply_via: method,
          email: useEmail ? email : undefined,
          whatsapp_number: useWA ? phone : undefined,
          delivery_country: deliveryCountry,
        }),
      }).catch(() => {});
      setSubmitted(true);
    } catch (err) {
      console.error("[Quote modal] submission error:", err);
      setSendError("error");
    } finally {
      setSending(false);
    }
  };

  const methodOpts = [
    { id: "whatsapp", label: lang === "en" ? "WhatsApp" : "واتساب",  icon: "wa" },
    { id: "email",    label: lang === "en" ? "Email"    : "البريد",   icon: "mail" },
    { id: "both",     label: lang === "en" ? "Both"     : "كلاهما",   icon: "both" },
  ];

  const errorMsg = sendError === "rate"
    ? (lang === "en" ? "Too many requests. Please wait a minute before trying again." : "محاولات كثيرة. الرجاء الانتظار دقيقة.")
    : (lang === "en" ? "Something went wrong. Please try again or email us at info@bitkihub.com" : "حدث خطأ. يرجى المحاولة مجدداً أو التواصل عبر info@bitkihub.com");

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e)=>e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}><Icon name="x" size={18}/></button>
        {!submitted ? (
          <>
            <div className="eyebrow" style={{marginBottom: 12}}>{lang==="en"?"Quick quote":"عرض سعر سريع"}</div>
            <h3 style={{fontSize: 26, marginBottom: 6}}>{product.name[lang]}</h3>
            <div style={{color:"var(--text-soft)", fontStyle:"italic", marginBottom:24, fontFamily:"var(--font-serif)"}}>{product.latin}</div>

            {/* Honeypot — hidden from humans, traps bots */}
            <div style={{position:"absolute",left:"-9999px",width:"1px",height:"1px",overflow:"hidden"}} aria-hidden="true">
              <input tabIndex={-1} autoComplete="off" value={_hp} onChange={e=>set_hp(e.target.value)} name="website"/>
            </div>

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
              <select value={deliveryCountry} onChange={e => setDeliveryCountry(e.target.value)}>
                {(lang==="en" ? COUNTRIES_EN : COUNTRIES_AR).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            {sendError && (
              <div style={{color:"#c0392b",fontSize:13,marginBottom:12,padding:"10px 14px",background:"rgba(192,57,43,.08)",borderRadius:8}}>
                {errorMsg}
              </div>
            )}

            <button className="btn btn--dark btn--lg" style={{width:"100%", justifyContent:"center"}}
              onClick={submit} disabled={sending}>
              {sending
                ? (lang==="en" ? "Sending…" : "جارٍ الإرسال…")
                : (lang==="en" ? "Send quote request" : "إرسال طلب السعر")}
              {!sending && <span className="arrow"><Icon name="arrow" size={14}/></span>}
            </button>

            <div style={{marginTop:14, textAlign:"center", fontSize:12, color:"var(--text-soft)"}}>
              {lang === "en"
                ? "We typically reply within 1 hour during business hours."
                : "نرد عادةً خلال ساعة خلال أوقات العمل."}
            </div>
          </>
        ) : (
          <div className="success-state">
            <div className="check"><Icon name="check" size={28} stroke={2.4}/></div>
            <h3 style={{fontSize: 24, marginBottom: 8}}>{t.successTitle}</h3>
            <p style={{color:"var(--text-soft)"}}>
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
   WhatsApp floating action button — visible on every page
   ============================================================ */
function WhatsAppFAB({ phone = "905013200987", lang = "en" }) {
  const [open, setOpen] = _mS(false);
  const msg  = lang === "ar"
    ? "مرحباً، أرغب بالاستفسار عن منتجاتكم."
    : "Hi Bitki Hub — I'd like to ask about your nursery stock.";
  const href  = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
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
            {lang === "ar"
              ? "نحن متاحون الآن — أرسل لنا الأنواع والكميات وميناء الوصول وسنرد بعرض سعر."
              : "We're online — send species, quantities and port of entry; we'll come back with a quote and lead time."}
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

Object.assign(window, { QuoteModal, WhatsAppFAB });
