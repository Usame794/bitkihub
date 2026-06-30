/* Bitki Hub — Home screen
   Requires: Icon, PrimaryCTA, GhostCTA, LeafMark, BrandStamp, KickerBar, SpecimenCard (globals)
   Exports:  Home */
const { useState: _hS, useEffect: _hE } = React;

/* ── Hero variants ────────────────────────────────────────── */
const HeroSplit = ({ t, go, lang }) => (
  <section className="hero hero--split">
    <div className="container">
      <div className="hero__grid">
        <div>
          <span className="eyebrow">{t.heroEyebrow}</span>
          <h1 className="hero__title" style={{marginTop: 20}}>
            {t.heroTitleA} <span className="serif-em">{t.heroTitleEm}</span><br/>{t.heroTitleB}
          </h1>
          <p className="hero__sub">{t.heroSub}</p>
          <div className="hero__cta">
            <PrimaryCTA onClick={()=>go("products")}>{t.cta.browse}</PrimaryCTA>
            <GhostCTA onClick={()=>go("contact")}>{t.cta.call}</GhostCTA>
          </div>
          <div className="hero__meta">
            {[t.heroStat1, t.heroStat2, t.heroStat3].map(([num, lbl]) => (
              <div key={lbl}>
                <div className="hero__meta-num">{num}</div>
                <div className="hero__meta-lbl">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero__media">
          {/* Hero image — eager load, above fold */}
          <img src={UNSPLASH("photo-1469474968028-56623f02e42e", 1100)} alt="Nursery"/>
          <span className="hero__media-tag">{lang==="en"?"Live from Yalova":"بث من يالوفا"}</span>
          <div className="hero__media-card">
            <div>
              <strong>{lang==="en"?"This week's loading schedule":"جدول التحميل هذا الأسبوع"}</strong>
              <span style={{opacity:.78}}>{lang==="en"?"3 containers to Jeddah, 2 to Doha":"3 حاويات إلى جدّة، 2 إلى الدوحة"}</span>
            </div>
            <Icon name="truck" size={28}/>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const HeroFull = ({ t, go, lang }) => (
  <section className="hero hero--full">
    <div className="hero__bg">
      <img src={UNSPLASH("photo-1469474968028-56623f02e42e", 1800)} alt=""/>
    </div>
    <div className="mark-watermark" style={{right: "-200px", top: "-100px", width: 720, height: 720, opacity: .07, zIndex: 1}}>
      <LeafMark size={720} color="#fff"/>
    </div>
    <div className="hero__content">
      <div className="container">
        <span className="eyebrow" style={{color: "rgba(255,255,255,.7)"}}>{t.heroEyebrow}</span>
        <h1 className="hero__title" style={{marginTop: 18, maxWidth: 1000}}>
          {t.heroTitleA} <span className="serif-em">{t.heroTitleEm}</span><br/>{t.heroTitleB}
        </h1>
        <p className="hero__sub" style={{maxWidth: 600}}>{t.heroSub}</p>
        <div className="hero__cta">
          <PrimaryCTA onClick={()=>go("products")}>{t.cta.browse}</PrimaryCTA>
          <button className="btn btn--ghost" style={{color:"#fff", borderColor:"rgba(255,255,255,.3)"}} onClick={()=>go("contact")}>
            {t.cta.call}
          </button>
        </div>
        <div className="hero__meta">
          {[t.heroStat1, t.heroStat2, t.heroStat3].map(([num, lbl]) => (
            <div key={lbl}>
              <div className="hero__meta-num" style={{color:"var(--lime-400)"}}>{num}</div>
              <div className="hero__meta-lbl" style={{color:"rgba(255,255,255,.6)"}}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const HeroEditorial = ({ t, go, lang }) => (
  <section className="hero hero--edit">
    <img className="hero__bg-mark" src="" alt="" style={{display:"none"}}/>
    <div style={{position:"absolute", right:"-6%", top: "5%", width: "60vw", maxWidth: 900, opacity: .055, zIndex: 0}}>
      <LeafMark size={900} color="var(--brand)"/>
    </div>
    <div className="brand-rail brand-rail--left">Bitki Hub · Yalova · Türkiye</div>
    <div className="container">
      <div style={{display:"flex", justifyContent: "space-between", alignItems:"start", gap: 32, flexWrap:"wrap"}}>
        <span className="eyebrow">{t.heroEyebrow}</span>
        <span className="eyebrow" style={{flexDirection:"row-reverse"}}>{lang==="en" ? "Issue 01 · Spring 2026" : "العدد 01 · ربيع 2026"}</span>
      </div>
      <h1 className="hero__title-mega">
        {t.heroTitleA}<br/>
        <span className="serif-em">{t.heroTitleEm}</span> {t.heroTitleB.replace(".", "")}<span style={{color:"var(--lime-500)"}}>.</span>
      </h1>
      <div className="hero__bottom">
        <div className="hero__bottom-l">
          <p>{t.heroSub}</p>
        </div>
        <div style={{display:"grid", placeItems:"center"}}>
          <BrandStamp size="lg"/>
        </div>
        <div className="hero__bottom-r">
          <PrimaryCTA onClick={()=>go("products")}>{t.cta.browse}</PrimaryCTA>
          <GhostCTA onClick={()=>go("contact")}>{t.cta.call}</GhostCTA>
        </div>
      </div>
    </div>
  </section>
);

const HeroCatalog = ({ t, go, lang }) => {
  const tiles = [
    { id: "trees",  img: UNSPLASH("photo-1542273917363-3b1817f69a2d", 1100), label: lang==="en"?"Ornamental Trees":"أشجار زينة" },
    { id: "palms",  img: UNSPLASH("photo-1503614472-8c93d56e92ce", 800),  label: lang==="en"?"Palms":"النخيل" },
    { id: "indoor", img: UNSPLASH("photo-1485955900006-10f4d324d411", 800), label: lang==="en"?"Indoor":"داخلي" },
  ];
  return (
    <section className="hero hero--catalog">
      <div className="container">
        <span className="eyebrow">{t.heroEyebrow}</span>
        <h1 className="hero__title" style={{marginTop: 18, maxWidth: 1100}}>
          {t.heroTitleA} <em>{t.heroTitleEm}</em> {t.heroTitleB}
        </h1>
        <div style={{display:"flex", gap:32, marginTop: 28, flexWrap: "wrap", alignItems:"end", justifyContent: "space-between"}}>
          <p className="hero__sub" style={{margin:0, maxWidth: 540}}>{t.heroSub}</p>
          <div className="hero__cta" style={{margin:0}}>
            <PrimaryCTA onClick={()=>go("products")}>{t.cta.browse}</PrimaryCTA>
            <GhostCTA onClick={()=>go("contact")}>{t.cta.call}</GhostCTA>
          </div>
        </div>
        <div className="hero__catalog-grid">
          {tiles.map(tile => (
            <button key={tile.id} className="hero__catalog-cell" onClick={()=>go("products", null, tile.id)}>
              <img src={tile.img} alt={tile.label}/>
              <span className="label">{tile.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Home page ────────────────────────────────────────────── */
const Home = ({ t, go, lang, tweaks, openQuote, cardStyle }) => {
  const Hero = tweaks.hero === "full"      ? HeroFull
             : tweaks.hero === "catalog"   ? HeroCatalog
             : tweaks.hero === "editorial" ? HeroEditorial
             : HeroSplit;
  const featured = PRODUCTS[0];

  return (
    <main>
      <Hero t={t} go={go} lang={lang}/>

      <KickerBar items={t.stripItems}/>

      {/* Categories */}
      <section>
        <div className="container">
          <div className="editorial-start">
            <div className="marker editorial-start__num">01</div>
            <div className="editorial-start__body">
              <span className="eyebrow">{t.sec1Eyebrow}</span>
              <h2 style={{marginTop: 14}}>{t.sec1Title}</h2>
              <p>{t.sec1Sub}</p>
            </div>
          </div>
          <div className="cat-grid">
            {CATEGORIES.slice(0,6).map(c => (
              <a key={c.id} href="#" onClick={(e)=>{e.preventDefault(); go("products", null, c.id);}}>
                <img src={c.img} alt={c[lang]} loading="lazy"/>
                <div className="cat-grid__chev"><Icon name="arrow" size={16}/></div>
                <div className="cat-grid__info">
                  <h3>{c[lang]}</h3>
                  <div className="meta">
                    <span>{c.blurb[lang]}</span>
                    <span className="count">{PRODUCTS.filter(p=>p.cat===c.id).length}+</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Specimen of the season */}
      <section className="tight">
        <div className="container">
          <div className="editorial-start">
            <div className="marker editorial-start__num">02</div>
            <div className="editorial-start__body">
              <span className="eyebrow">{lang==="en" ? "Specimen of the season" : "نبات الموسم"}</span>
              <h2 className="display-italic-serif" style={{marginTop:14, fontSize: "clamp(34px, 4vw, 56px)"}}>
                {lang==="en" ? "Field-grown for the heat ahead." : "مهيّأ للحرارة القادمة."}
              </h2>
            </div>
          </div>
          <div className="feature-specimen">
            <div className="feature-specimen__media">
              <img src={featured.gallery[0]} alt={featured.name[lang]} loading="lazy"/>
              <div className="idx">№ 01 · {lang==="en" ? "Olive grove, Block 4-B" : "بستان الزيتون"}</div>
            </div>
            <div className="feature-specimen__body">
              <span className="eyebrow">{lang==="en" ? "Specimen" : "النبات"}</span>
              <h2>{featured.latin}</h2>
              <div className="common">{featured.name[lang]}</div>
              <p>{featured.desc[lang]}</p>
              <div className="feature-specimen__data">
                <div><span className="lbl">{t.pdSpecs.height}</span><span className="val">{featured.height}</span></div>
                <div><span className="lbl">{t.pdSpecs.age}</span><span className="val">{featured.age}</span></div>
                <div><span className="lbl">{t.pdSpecs.water}</span><span className="val">{featured.water}</span></div>
                <div><span className="lbl">{t.pdSpecs.moq}</span><span className="val">{featured.moq} {lang==="en"?"units":"نبتة"}</span></div>
              </div>
              <div className="feature-specimen__cta" style={{display:"flex", gap: 10}}>
                <PrimaryCTA onClick={()=>go("product", featured.id)}>{t.cta.view}</PrimaryCTA>
                <button className="btn btn--ghost" onClick={()=>openQuote(featured)}>{t.requestQuote}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Bitki Hub */}
      <section className="tight" style={{background: "var(--surface-2)"}}>
        <div className="container">
          <div className="editorial-start">
            <div className="marker editorial-start__num">03</div>
            <div className="editorial-start__body">
              <span className="eyebrow">{t.sec2Eyebrow}</span>
              <h2 style={{marginTop: 14}}>{t.sec2Title}</h2>
            </div>
          </div>
          <div className="feature-row">
            <div className="feature-row__media">
              <img src={UNSPLASH("photo-1416879595882-3373a0480b5b", 1400)} alt="" loading="lazy"/>
            </div>
            <div>
              <div className="feature-list">
                {t.sec2Items.map((item, i) => (
                  <div key={i} className="feature-list__item">
                    <div className="feature-list__num">0{i+1}</div>
                    <div className="feature-list__body">
                      <h4>{item.t}</h4>
                      <p>{item.b}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* In-stock list */}
      <section className="tight">
        <div className="container">
          <div className="editorial-start">
            <div className="marker editorial-start__num">04</div>
            <div className="editorial-start__body">
              <span className="eyebrow">{lang==="en"?"In stock now":"متوفر الآن"}</span>
              <h2 style={{marginTop: 14}}>{lang==="en" ? "This month's stock list." : "قائمة هذا الشهر."}</h2>
              <p>{lang==="en"
                ? "Quantities are real-time and update as containers ship. Reach out for current MOQs and lead times."
                : "الكميات محدّثة لحظياً وتتغير مع كل شحنة. اطلب الحدود الدنيا الحالية وأوقات التنفيذ."}</p>
            </div>
          </div>
          <div className="products-grid">
            {PRODUCTS.slice(0, 4).map((p, i) => (
              <SpecimenCard key={p.id} p={p} lang={lang} t={t} go={go} idx={i}/>
            ))}
          </div>
          <div style={{marginTop: 40, textAlign:"center"}}>
            <GhostCTA onClick={()=>go("products")}>{t.cta.browse}</GhostCTA>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="stats-band tight">
        <div className="stats-band__mark">
          <LeafMark size={320} color="#fff"/>
        </div>
        <div className="container">
          <h2 className="display-italic-serif">{t.statsTitle}</h2>
          {t.stats.map(([num, lbl]) => (
            <div key={lbl} className="stats-band__item">
              <div className="num">{num}</div>
              <div className="lbl">{lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="tight" style={{background: "var(--surface-2)"}}>
        <div className="container">
          <div className="editorial-start">
            <div className="marker editorial-start__num">06</div>
            <div className="editorial-start__body">
              <span className="eyebrow">{t.certsEyebrow}</span>
              <h2 style={{marginTop:14}}>{t.certsTitle}</h2>
            </div>
          </div>
          <div className="certs">
            {t.certs.map((c, i) => (
              <div key={i} className="cert">
                <div className="cert__icon"><Icon name={["cert","shield","leaf","check"][i] || "shield"} size={20}/></div>
                <h4>{c.t}</h4>
                <p>{c.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Home contact form */}
      <section className="tight">
        <div className="container">
          <div className="editorial-start">
            <div className="marker editorial-start__num">07</div>
            <div className="editorial-start__body">
              <span className="eyebrow">{t.nav.contact}</span>
              <h2 style={{marginTop:14}}>{lang==="en" ? "Send a quick enquiry." : "أرسل استفساراً سريعاً."}</h2>
              <p>{lang==="en"
                ? "Tell us roughly what you're looking for. We'll come back within a working day in English or Arabic."
                : "أخبرنا بما تبحث عنه، وسنرد خلال يوم عمل بالعربية أو الإنجليزية."}</p>
            </div>
          </div>
          <HomeContactForm t={t} lang={lang} go={go}/>
        </div>
      </section>

      {/* CTA band */}
      <section style={{paddingTop: 0}}>
        <div className="container">
          <div className="cta-band">
            <div className="cta-band__mark"><LeafMark size={460} color="#fff"/></div>
            <div style={{position:"relative", zIndex: 1, maxWidth: 600}}>
              <h2>{t.ctaTitle}</h2>
              <p>{t.ctaSub}</p>
            </div>
            <div style={{position:"relative", zIndex: 1, display:"flex", gap: 12, alignItems:"center"}}>
              <PrimaryCTA onClick={()=>go("contact")}>{t.requestQuote}</PrimaryCTA>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

Object.assign(window, { Home });
