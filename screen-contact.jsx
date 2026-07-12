/* Bitki Hub — Contact screens
   Requires: Icon, PrimaryCTA, PhoneInput, LeafMark (globals)
             sanityMutate, checkRateLimit, sanitizeField (from sanity.jsx)
   Exports:  Contact, HomeContactForm */
const { useState: _cS, useEffect: _cE } = React;

/* ── Full contact page ────────────────────────────────────── */
const Contact = ({ t, lang, go }) => {
  const [form, setForm] = _cS({
    name: "", company: "", email: "", phone: "", phoneCountry: "SA",
    country: lang==="en" ? "Saudi Arabia" : "السعودية",
    buyer: "Landscaper",
    species: "", message: "",
    _hp: "", // honeypot — must stay empty
  });
  const [errors, setErrors]   = _cS({});
  const [done, setDone]       = _cS(false);
  const [sending, setSending] = _cS(false);
  const [sendError, setSendError] = _cS(false); // false | "error" | "rate"

  const upd = (k, v) => setForm({...form, [k]: v});

  const submit = async () => {
    if (form._hp) return; // bot — silent reject

    const e = {};
    if (!form.name) e.name = true;
    if (!form.email || !form.email.includes("@")) e.email = true;
    if (!form.company) e.company = true;
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setSending(true);
    setSendError(false);
    try {
      if (!checkRateLimit()) { setSendError("rate"); return; }
      await sanityMutate([{ create: {
        _type:           'lead',
        createdAt:       new Date().toISOString(),
        source:          'contact-form',
        name:            sanitizeField(form.name, 200),
        company:         sanitizeField(form.company, 200),
        email:           sanitizeField(form.email, 200),
        phone:           sanitizeField(form.phone, 30) || undefined,
        plant:           sanitizeField(form.species, 500) || undefined,
        deliveryCountry: sanitizeField(form.country, 100),
        message:         sanitizeField(form.message, 1000) || undefined,
      }}]);
      fetch("https://formspree.io/f/REPLACE_WITH_YOUR_ENDPOINT", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          _subject:        `Contact Form — ${form.name} (${form.company})`,
          name:            form.name,    company:         form.company,
          email:           form.email,   phone:           form.phone,
          buyer_type:      form.buyer,   delivery_country: form.country,
          species_interest: form.species, message:         form.message,
        }),
      }).catch(() => {});
      setDone(true);
      window.scrollTo({top: 0, behavior:"smooth"});
    } catch (err) {
      console.error("[Contact form] submission error:", err);
      setSendError("error");
    } finally {
      setSending(false);
    }
  };

  const buyers = ["Landscaper", "Developer", "Nursery", "Other"];

  const errorMsg = sendError === "rate"
    ? (lang === "en" ? "Too many requests. Please wait a minute before trying again." : "محاولات كثيرة. الرجاء الانتظار دقيقة.")
    : (lang === "en" ? "Something went wrong. Please try again or email us at info@bitkihub.com" : "حدث خطأ. يرجى المحاولة مجدداً أو التواصل عبر info@bitkihub.com");

  return (
    <main>
      <div className="container">
        <div className="contact-layout">
          <div className="contact-side">
            <div className="crumbs" style={{fontSize:12, color:"var(--text-soft)", marginBottom: 14, textTransform:"uppercase", letterSpacing:".12em"}}>{t.nav.contact}</div>
            <h1>{t.contactTitle}</h1>
            <p className="contact-side__lede">{t.contactLede}</p>
            <div className="contact-info">
              <div className="contact-info__item">
                <div className="ic"><Icon name="pin" size={18}/></div>
                <div>
                  <h4>{lang==="en"?"Nursery & loading dock":"المشتل وميناء التحميل"}</h4>
                  <p>{lang==="en"?"Yalova, Türkiye":"يالوفا، تركيا"}</p>
                  <small>{lang==="en"?"Visits by appointment":"الزيارة بموعد مسبق"}</small>
                </div>
              </div>
              <div className="contact-info__item">
                <div className="ic"><Icon name="phone" size={18}/></div>
                <div>
                  <h4>{lang==="en"?"Sales — MENA":"المبيعات"}</h4>
                  <p dir="ltr">+90 501 320 09 87</p>
                  <small>{lang==="en"?"WhatsApp available":"واتساب متوفر"}</small>
                </div>
              </div>
              <div className="contact-info__item">
                <div className="ic"><Icon name="mail" size={18}/></div>
                <div>
                  <h4>{lang==="en"?"Email":"البريد الإلكتروني"}</h4>
                  <p>info@bitkihub.com</p>
                  <small>{lang==="en"?"Response within 1 working day":"الرد خلال يوم عمل"}</small>
                </div>
              </div>
              <div className="contact-info__item">
                <div className="ic"><Icon name="clock" size={18}/></div>
                <div>
                  <h4>{lang==="en"?"Hours":"ساعات العمل"}</h4>
                  <p>{lang==="en"?"Sun–Thu · 08:00 – 18:00 TRT":"الأحد–الخميس · 08:00 – 18:00 بتوقيت تركيا"}</p>
                  <small>{lang==="en"?"Friday by appointment":"الجمعة بموعد"}</small>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="contact-form">
              {!done ? (
                <>
                  <h3>{t.contactCardTitle}</h3>
                  <p className="contact-form__sub">{t.contactCardSub}</p>

                  {/* Honeypot — hidden from humans, traps bots */}
                  <div style={{position:"absolute",left:"-9999px",width:"1px",height:"1px",overflow:"hidden"}} aria-hidden="true">
                    <input tabIndex={-1} autoComplete="off" value={form._hp} onChange={e=>upd("_hp", e.target.value)}/>
                  </div>

                  <div className="form-grid">
                    <div className={`field ${errors.name ? "field--error" : ""}`}>
                      <label>{t.fields.name} *</label>
                      <input value={form.name} onChange={e=>upd("name", e.target.value)} placeholder={lang==="en"?"e.g. Mohammed Al-Sharif":"الاسم"}/>
                    </div>
                    <div className={`field ${errors.company ? "field--error" : ""}`}>
                      <label>{t.fields.company} *</label>
                      <input value={form.company} onChange={e=>upd("company", e.target.value)} placeholder={lang==="en"?"e.g. Green Vista Landscapes":"اسم الشركة"}/>
                    </div>
                    <div className={`field ${errors.email ? "field--error" : ""}`}>
                      <label>{t.fields.email} *</label>
                      <input type="email" value={form.email} onChange={e=>upd("email", e.target.value)} placeholder="you@company.com"/>
                    </div>
                    <div className="field">
                      <label>{t.fields.phone}</label>
                      <PhoneInput lang={lang}
                        value={form.phone} onChange={(v) => upd("phone", v)}
                        country={form.phoneCountry} onCountryChange={(v) => upd("phoneCountry", v)}/>
                    </div>
                    <div className="field">
                      <label>{t.fields.country}</label>
                      <select value={form.country} onChange={e=>upd("country", e.target.value)}>
                        {(lang==="en" ? COUNTRIES_EN : COUNTRIES_AR).map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="field">
                      <label>{lang==="en"?"Approx. order value":"قيمة الطلب التقريبية"}</label>
                      <select>
                        <option>{lang==="en"?"Under $10K":"أقل من 10 ألف $"}</option>
                        <option>$10K – $50K</option>
                        <option>$50K – $200K</option>
                        <option>{lang==="en"?"Over $200K":"أكثر من 200 ألف $"}</option>
                      </select>
                    </div>

                    <div className="field full">
                      <label>{t.fields.buyer}</label>
                      <div className="buyer-row">
                        {buyers.map((b, i) => (
                          <label key={b}>
                            <input type="radio" name="buyer" checked={form.buyer===b} onChange={()=>upd("buyer", b)}/>
                            <Icon name={["build","user","leaf","globe"][i]} size={20}/>
                            <span>{t.buyers[i]}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="field full">
                      <label>{t.fields.species}</label>
                      <textarea value={form.species} onChange={e=>upd("species", e.target.value)} placeholder={lang==="en"?"e.g. 200× Phoenix dactylifera 2.5m, 80× Olea europaea 150cm…":"اكتب الأنواع والكميات"}/>
                    </div>

                    <div className="field full">
                      <label>{t.fields.message}</label>
                      <textarea style={{minHeight: 80}} value={form.message} onChange={e=>upd("message", e.target.value)} placeholder={lang==="en"?"Timeline, port of entry, prior work…":""}/>
                    </div>
                  </div>

                  {sendError && (
                    <div style={{color:"#c0392b", fontSize:13, marginBottom:12, padding:"10px 14px", background:"rgba(192,57,43,.08)", borderRadius:8}}>
                      {errorMsg}
                    </div>
                  )}
                  <div className="form-submit-row">
                    <small>{t.submitNote}</small>
                    <button className="btn btn--dark btn--lg" onClick={submit} disabled={sending}>
                      {sending ? (lang==="en" ? "Sending…" : "جارٍ الإرسال…") : t.submit}
                      {!sending && <span className="arrow"><Icon name="arrow" size={14}/></span>}
                    </button>
                  </div>
                </>
              ) : (
                <div className="success-state">
                  <div className="check"><Icon name="check" size={28} stroke={2.4}/></div>
                  <h3 style={{fontSize: 28, marginBottom: 12}}>{t.successTitle}</h3>
                  <p style={{color: "var(--text-soft)", maxWidth: 360, margin: "0 auto"}}>{t.successBody}</p>
                  <div style={{display:"flex", gap: 10, justifyContent: "center", marginTop: 24}}>
                    <button className="btn btn--ghost" onClick={()=>{setDone(false); setForm({...form, species:"", message:""});}}>{t.successBack}</button>
                    <button className="btn btn--primary" onClick={()=>go("products")}>{t.cta.browse}</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

/* ── Home contact form — compact embed ───────────────────── */
const HomeContactForm = ({ t, lang, go }) => {
  const [form, setForm] = _cS({ name: "", email: "", phone: "", phoneCountry: "SA", company: "", message: "" });
  const [done, setDone]       = _cS(false);
  const [errors, setErrors]   = _cS({});
  const [sending, setSending] = _cS(false);
  const [sendError, setSendError] = _cS(false);
  const phone    = "+90 501 320 09 87";
  const waNumber = "905013200987";
  const upd = (k, v) => setForm({ ...form, [k]: v });
  const submit = async () => {
    const e = {};
    if (!form.name) e.name = true;
    if (!form.email || !form.email.includes("@")) e.email = true;
    if (!form.phone) e.phone = true;
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setSending(true);
    setSendError(false);
    try {
      if (!checkRateLimit()) { setSendError(true); return; }
      await sanityMutate([{ create: {
        _type:     'lead',
        createdAt: new Date().toISOString(),
        source:    'contact-form',
        name:      sanitizeField(form.name, 200),
        company:   sanitizeField(form.company, 200) || undefined,
        email:     sanitizeField(form.email, 200),
        phone:     sanitizeField(form.phone, 30) || undefined,
        message:   sanitizeField(form.message, 1000) || undefined,
      }}]);
      setDone(true);
    } catch (err) {
      console.error("[HomeContactForm] submission error:", err);
      setSendError(true);
    } finally {
      setSending(false);
    }
  };
  return (
    <div className="home-contact">
      <div className="home-contact__bg">
        <LeafMark size={380} color="var(--brand)"/>
      </div>
      <div className="home-contact__left">
        <h2>{lang==="en" ? "Talk to our trade desk." : "تواصل مع فريق المبيعات."}</h2>
        <p>{lang==="en"
          ? "Fastest channel is WhatsApp — drop your species list there and we'll quote the container."
          : "أسرع طريقة للتواصل هي واتساب — أرسل لنا أنواع النباتات وسنرد بعرض السعر."}</p>
        <div className="home-contact__channels">
          <a className="home-contact__chan wa" href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener">
            <div className="ic">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.5 3.5C18.2 1.2 15.2 0 12 0 5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.7.9 3.7 1.5 5.8 1.5 6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.4zM12 21.8c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.5 15.6 2 13.8 2 12 2 6.5 6.5 2 12 2c2.7 0 5.2 1 7.1 2.9 1.9 1.9 2.9 4.4 2.9 7.1 0 5.5-4.5 9.8-10 9.8zM17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.7 1.2 2.9.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.5-.3z"/></svg>
            </div>
            <div>
              <strong>WhatsApp</strong>
              <small>{lang==="en" ? "Reply within 1 hour" : "الرد خلال ساعة"}</small>
            </div>
          </a>
          <div className="home-contact__chan mail">
            <div className="ic"><Icon name="mail" size={18}/></div>
            <div>
              <strong>info@bitkihub.com</strong>
              <small>{lang==="en" ? "Trade enquiries only" : "استفسارات الجملة"}</small>
            </div>
          </div>
          <div className="home-contact__chan phone">
            <div className="ic"><Icon name="phone" size={18}/></div>
            <div>
              <strong>{phone}</strong>
              <small>{lang==="en" ? "Sun–Thu · 08:00–18:00 TRT" : "الأحد–الخميس · 08:00–18:00"}</small>
            </div>
          </div>
        </div>
      </div>

      <div className="home-contact__form">
        <div className="contact-form" style={{padding: 0, background: "transparent", border: "none"}}>
          {!done ? (
            <>
              <div className="form-grid">
                <div className={`field ${errors.name ? "field--error" : ""}`}>
                  <label>{t.fields.name} *</label>
                  <input value={form.name} onChange={e=>upd("name", e.target.value)} placeholder={lang==="en"?"Mohammed Al-Sharif":"الاسم"}/>
                </div>
                <div className="field">
                  <label>{t.fields.company}</label>
                  <input value={form.company} onChange={e=>upd("company", e.target.value)} placeholder={lang==="en"?"Company":"الشركة"}/>
                </div>
                <div className={`field ${errors.email ? "field--error" : ""}`}>
                  <label>{t.fields.email} *</label>
                  <input type="email" value={form.email} onChange={e=>upd("email", e.target.value)} placeholder="you@company.com"/>
                </div>
                <div className={`field ${errors.phone ? "field--error" : ""}`}>
                  <label>{t.fields.phone} *</label>
                  <PhoneInput lang={lang} error={errors.phone}
                    value={form.phone} onChange={(v) => upd("phone", v)}
                    country={form.phoneCountry} onCountryChange={(v) => upd("phoneCountry", v)}/>
                </div>
                <div className="field full">
                  <label>{t.fields.species}</label>
                  <textarea style={{minHeight: 100}} value={form.message} onChange={e=>upd("message", e.target.value)} placeholder={lang==="en"?"e.g. 200× Phoenix dactylifera 2.5m to Jeddah by August.":"اكتب الأنواع والكميات"}/>
                </div>
              </div>
              {sendError && (
                <div style={{color:"#c0392b",fontSize:13,marginBottom:10,padding:"8px 12px",background:"rgba(192,57,43,.08)",borderRadius:8}}>
                  {lang==="en" ? "Something went wrong. Please try again or email info@bitkihub.com" : "حدث خطأ. يرجى المحاولة مجدداً أو التواصل عبر info@bitkihub.com"}
                </div>
              )}
              <div className="form-submit-row">
                <small>{lang==="en" ? "Or send the full project list on our contact page." : "أو أرسل القائمة الكاملة عبر صفحة التواصل."}</small>
                <div style={{display:"flex", gap: 8}}>
                  <button className="btn btn--ghost" onClick={()=>go("contact")}>
                    {lang==="en" ? "Full form" : "النموذج الكامل"}
                  </button>
                  <button className="btn btn--dark" onClick={submit} disabled={sending}>
                    {sending ? (lang==="en" ? "Sending…" : "جارٍ الإرسال…") : t.submit}
                    {!sending && <span className="arrow"><Icon name="arrow" size={14}/></span>}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="success-state">
              <div className="check"><Icon name="check" size={28} stroke={2.4}/></div>
              <h3 style={{fontSize: 22, marginBottom: 8}}>{t.successTitle}</h3>
              <p style={{color:"var(--text-soft)", fontSize: 14}}>{t.successBody}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { Contact, HomeContactForm });
