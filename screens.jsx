/* Bitki Hub — page screens */
const { useState: useS, useEffect: useE, useRef: useR, useMemo: useM } = React;

/* ============================================================
   HERO variants
   ============================================================ */
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
    { id: "trees", img: UNSPLASH("photo-1542273917363-3b1817f69a2d", 1100), label: lang==="en"?"Ornamental Trees":"أشجار زينة" },
    { id: "palms", img: UNSPLASH("photo-1503614472-8c93d56e92ce", 800),  label: lang==="en"?"Palms":"النخيل" },
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

/* ============================================================
   HOME
   ============================================================ */
const Home = ({ t, go, lang, tweaks, openQuote, cardStyle }) => {
  const Hero = tweaks.hero === "full" ? HeroFull
             : tweaks.hero === "catalog" ? HeroCatalog
             : tweaks.hero === "editorial" ? HeroEditorial
             : HeroSplit;
  const featured = PRODUCTS[0]; // Olive — flagship
  return (
    <main>
      <Hero t={t} go={go} lang={lang}/>

      {/* Lime kicker bar with leaf marks */}
      <KickerBar items={t.stripItems}/>

      {/* Categories — editorial section start */}
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
                <img src={c.img} alt={c[lang]}/>
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

      {/* Featured "Specimen of the Season" */}
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
              <img src={featured.gallery[0]} alt={featured.name[lang]}/>
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
              <img src={UNSPLASH("photo-1416879595882-3373a0480b5b", 1400)} alt=""/>
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

      {/* Featured specimens row — using new editorial cards */}
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

      {/* Stats band — supercharged */}
      <section className="stats-band tight">
        <div className="stats-band__mark">
          <LeafMark size={600} color="#fff"/>
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

      {/* Projects */}
      <section>
        <div className="container">
          <div className="editorial-start">
            <div className="marker editorial-start__num">05</div>
            <div className="editorial-start__body">
              <span className="eyebrow">{t.projectsEyebrow}</span>
              <h2 style={{marginTop:14}}>{t.projectsTitle}</h2>
              <p>{t.projectsSub}</p>
            </div>
          </div>
          <div className="projects">
            {PROJECTS.map(pr => (
              <a key={pr.id} className="project" href="#">
                <img src={pr.img} alt={pr.title[lang]}/>
                <div className="project__overlay">
                  <span className="project__loc">{pr.loc}</span>
                  <div className="project__title">{pr.title[lang]}</div>
                  <div className="project__meta">{pr.meta.map(m => <span key={m}>{m}</span>)}</div>
                </div>
              </a>
            ))}
          </div>
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

/* ============================================================
   PRODUCTS listing
   ============================================================ */
const Products = ({ t, lang, go, initialCat, cardStyle }) => {
  const [cat, setCat] = useS(initialCat || "all");
  const [q, setQ] = useS("");
  const [sort, setSort] = useS(0);

  useE(() => { if (initialCat) setCat(initialCat); }, [initialCat]);

  const filtered = useM(() => {
    let list = PRODUCTS.slice();
    if (cat !== "all") list = list.filter(p => p.cat === cat);
    if (q) {
      const qq = q.toLowerCase();
      list = list.filter(p =>
        p.latin.toLowerCase().includes(qq) ||
        p.name.en.toLowerCase().includes(qq) ||
        p.name.ar.includes(q)
      );
    }
    if (sort === 1) list.sort((a,b) => a.price - b.price);
    if (sort === 2) list.sort((a,b) => b.price - a.price);
    if (sort === 3) list.sort((a,b) => parseInt(b.height) - parseInt(a.height));
    if (sort === 4) list.sort((a,b) => a.moq - b.moq);
    return list;
  }, [cat, q, sort]);

  const allCats = [["all", lang==="en" ? "All" : "الكل", PRODUCTS.length],
    ...CATEGORIES.map(c => [c.id, c[lang], PRODUCTS.filter(p=>p.cat===c.id).length])];

  return (
    <main>
      <div className="page-head">
        <div className="container">
          <div className="crumbs">
            <a href="#" onClick={(e)=>{e.preventDefault(); go("home");}}>{t.nav.home}</a>
            <Icon name="chev" size={12}/>
            <span>{t.nav.products}</span>
          </div>
          <h1>{t.productsTitle}</h1>
          <p className="page-head__lede">{t.productsSub}</p>
        </div>
      </div>

      <div className="product-toolbar">
        <div className="container" style={{display: "flex", alignItems: "center", justifyContent:"space-between", gap: 16, width: "100%"}}>
          <div className="chip-row">
            {allCats.map(([id, label, count]) => (
              <button key={id} className={`chip ${cat === id ? "is-active" : ""}`} onClick={()=>setCat(id)}>
                {label} <span className="count">{count}</span>
              </button>
            ))}
          </div>
          <div className="search-input">
            <Icon name="search" size={14}/>
            <input placeholder={t.searchPlaceholder} value={q} onChange={e=>setQ(e.target.value)}/>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="results-bar">
          <span>{t.productsResultsFmt(filtered.length, PRODUCTS.length)}</span>
          <div style={{display:"flex", alignItems:"center", gap: 10}}>
            <span>{t.sortLabel}</span>
            <select value={sort} onChange={e=>setSort(parseInt(e.target.value))}>
              {t.sortOptions.map((o, i) => <option key={o} value={i}>{o}</option>)}
            </select>
          </div>
        </div>

        <div className="products-grid" style={{paddingBottom: 80}}>
          {filtered.map(p => (
            <ProductCard key={p.id} p={p} lang={lang} t={t} go={go} style={cardStyle}/>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{padding:"80px 0", textAlign:"center", color:"var(--text-soft)"}}>
            <Icon name="search" size={32}/>
            <p style={{marginTop: 16}}>{lang==="en"?"No specimens match those filters.":"لا توجد نتائج مطابقة."}</p>
          </div>
        )}
      </div>
    </main>
  );
};

/* ============================================================
   PRODUCT DETAIL
   ============================================================ */
const ProductDetail = ({ t, lang, go, productId, openQuote, cardStyle }) => {
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  const [activeImg, setActiveImg] = useS(0);
  const [tab, setTab] = useS(0);
  const [qty, setQty] = useS(product.moq);

  useE(() => { setActiveImg(0); setTab(0); setQty(product.moq); window.scrollTo(0, 0); }, [productId]);

  const related = PRODUCTS.filter(p => p.cat === product.cat && p.id !== product.id).slice(0, 4);
  const cat = CATEGORIES.find(c => c.id === product.cat);

  const tabBodies = [
    <>
      <p>{product.desc[lang]}</p>
      <p>{lang==="en"
        ? "Each specimen ships with a phytosanitary certificate, EU plant passport and traceable batch tag. Our team can advise on container loading, port routing and customs documentation for your country of import."
        : "كل نبات يُشحن مع شهادة صحية وجواز نباتي أوروبي وبطاقة دفعة قابلة للتتبع. نقدّم استشارات للتحميل والشحن والتخليص الجمركي."}</p>
    </>,
    <>
      <p>{lang==="en"
        ? `${product.name.en} thrives in ${product.climate.toLowerCase()} conditions. Plant in well-drained soil with full sun exposure. Water needs are ${product.water.toLowerCase()} once established.`
        : `يزدهر هذا النبات في ظروف مناخية ملائمة، ويُفضّل تربة جيدة التصريف وشمس مباشرة.`}</p>
      <p>{lang==="en"
        ? "We harden off every specimen through two summer seasons in Yalova before export, so it arrives at your site already adapted to high-light, low-humidity conditions."
        : "نُهيّئ كل نبات لموسمين كاملين قبل التصدير ليصل إلى موقعك متأقلماً مع ظروف الإضاءة العالية ومستوى الرطوبة المنخفض."}</p>
    </>,
    <>
      <p>{lang==="en"
        ? "Standard lead time from order confirmation: 14–21 days for in-stock specimens, 6–10 weeks for grown-to-order. Container loads ship weekly from Yalova port via reefer or open-top to Jebel Ali, Dammam, Aqaba, Hamad Port and Misrata."
        : "وقت التنفيذ من تأكيد الطلب: 14–21 يوم للمتوفر، و6–10 أسابيع للنباتات بحسب الطلب. شحن أسبوعي من ميناء يالوفا إلى جبل علي، الدمام، العقبة، ميناء حمد ومصراتة."}</p>
      <p>{lang==="en"
        ? "Per-container minimums apply. Mixed-species loads welcomed. Survival guarantee for 60 days post-arrival on certified specimens."
        : "حد أدنى لكل حاوية، نقبل خلطات أنواع متعددة، مع ضمان البقاء لمدة 60 يوماً."}</p>
    </>
  ];

  return (
    <main>
      <div className="container">
        <div className="pd-layout">
          <div className="pd-gallery">
            <div className="pd-gallery__main">
              <img src={product.gallery[activeImg]} alt={product.name[lang]} key={activeImg} className="fade-in"/>
            </div>
            <div className="pd-gallery__thumbs">
              {product.gallery.map((g, i) => (
                <button key={i} className={`pd-gallery__thumb ${activeImg === i ? "is-active" : ""}`} onClick={()=>setActiveImg(i)}>
                  <img src={g} alt=""/>
                </button>
              ))}
            </div>
          </div>

          <div className="pd-info">
            <div className="crumbs">
              <a href="#" onClick={(e)=>{e.preventDefault(); go("products");}}>{t.nav.products}</a>
              {" / "}
              <a href="#" onClick={(e)=>{e.preventDefault(); go("products", null, product.cat);}}>{cat[lang]}</a>
            </div>
            <h1>{product.name[lang]}</h1>
            <div className="latin">{product.latin}</div>

            <div className="price-block">
              <div>
                <div className="from">{lang==="en"?"From":"ابتداء من"}</div>
                <div style={{display:"flex", alignItems:"baseline", gap: 8}}>
                  <span className="price">${product.price}</span>
                  <span className="unit">/ {lang==="en"?"specimen":"نبتة"}</span>
                </div>
                <div className="moq">{lang==="en"?"Minimum order:":"الحد الأدنى:"} {product.moq} {lang==="en"?"units":"نبتة"}</div>
              </div>
              <div className="qty-stepper">
                <button onClick={()=>setQty(Math.max(product.moq, qty - 10))}><Icon name="minus" size={14}/></button>
                <input value={qty} onChange={e=>setQty(parseInt(e.target.value)||product.moq)}/>
                <button onClick={()=>setQty(qty + 10)}><Icon name="plus" size={14}/></button>
              </div>
            </div>

            <div className="spec-grid">
              {[
                ["height", product.height],
                ["pot", product.pot],
                ["climate", product.climate],
                ["water", product.water],
                ["sun", product.sun],
                ["age", product.age],
                ["moq", `${product.moq} ${lang==="en"?"units":"نبتة"}`],
                ["origin", lang==="en" ? "Yalova, Türkiye" : "يالوفا، تركيا"],
              ].map(([k, v]) => (
                <div key={k}>
                  <span className="lbl">{t.pdSpecs[k]}</span>
                  <span className="val">{v}</span>
                </div>
              ))}
            </div>

            <div className="pd-actions">
              <PrimaryCTA onClick={()=>openQuote(product)}>{t.requestQuote}</PrimaryCTA>
              <button className="btn btn--ghost" onClick={()=>openQuote(product)}>{t.addToEnquiry}</button>
            </div>

            <div className="pd-tabs">
              {t.pdTabs.map((label, i) => (
                <button key={i} className={tab === i ? "is-active" : ""} onClick={()=>setTab(i)}>{label}</button>
              ))}
            </div>
            <div className="pd-tab-body">{tabBodies[tab]}</div>
          </div>
        </div>

        {/* Related */}
        <section className="tight" style={{paddingTop: 0}}>
          <div className="section-head">
            <h2>{t.related}</h2>
          </div>
          <div className="products-grid">
            {related.map(p => <ProductCard key={p.id} p={p} lang={lang} t={t} go={go} style={cardStyle}/>)}
          </div>
        </section>
      </div>
    </main>
  );
};

/* ============================================================
   CONTACT
   ============================================================ */
const Contact = ({ t, lang, go }) => {
  const [form, setForm] = useS({
    name: "", company: "", email: "", phone: "", phoneCountry: "SA",
    country: lang==="en" ? "Saudi Arabia" : "السعودية",
    buyer: "Landscaper",
    species: "", message: "",
  });
  const [errors, setErrors] = useS({});
  const [done, setDone] = useS(false);

  const upd = (k, v) => setForm({...form, [k]: v});

  const submit = () => {
    const e = {};
    if (!form.name) e.name = true;
    if (!form.email || !form.email.includes("@")) e.email = true;
    if (!form.company) e.company = true;
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setDone(true);
      window.scrollTo({top: 0, behavior:"smooth"});
    }
  };

  const buyers = ["Landscaper", "Developer", "Nursery", "Other"];

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
                  <p>+90 226 — — —</p>
                  <small>{lang==="en"?"WhatsApp available":"واتساب متوفر"}</small>
                </div>
              </div>
              <div className="contact-info__item">
                <div className="ic"><Icon name="mail" size={18}/></div>
                <div>
                  <h4>{lang==="en"?"Email":"البريد الإلكتروني"}</h4>
                  <p>sales@bitkihub.com</p>
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

                  <div className="form-submit-row">
                    <small>{t.submitNote}</small>
                    <button className="btn btn--dark btn--lg" onClick={submit}>
                      {t.submit}
                      <span className="arrow"><Icon name="arrow" size={14}/></span>
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

/* ============================================================
   ABOUT / PROJECTS stubs (lightweight, for nav completeness)
   ============================================================ */
const SimplePage = ({ t, lang, go, kind }) => {
  const isProjects = kind === "projects";
  return (
    <main>
      <div className="page-head">
        <div className="container">
          <div className="crumbs">
            <a href="#" onClick={(e)=>{e.preventDefault(); go("home");}}>{t.nav.home}</a>
            <Icon name="chev" size={12}/>
            <span>{isProjects ? t.nav.projects : t.nav.about}</span>
          </div>
          <h1>{isProjects ? t.projectsTitle : (lang==="en" ? "A 40-hectare nursery in Yalova." : "مشتل بمساحة 40 هكتاراً في يالوفا.")}</h1>
          <p className="page-head__lede">{isProjects ? t.projectsSub : t.heroSub}</p>
        </div>
      </div>
      <section>
        <div className="container">
          {isProjects ? (
            <div className="projects">
              {[...PROJECTS, ...PROJECTS].map((pr, i) => (
                <a key={i} className="project" href="#">
                  <img src={pr.img} alt={pr.title[lang]}/>
                  <div className="project__overlay">
                    <span className="project__loc">{pr.loc}</span>
                    <div className="project__title">{pr.title[lang]}</div>
                    <div className="project__meta">{pr.meta.map(m => <span key={m}>{m}</span>)}</div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="feature-row">
              <div className="feature-row__media">
                <img src={UNSPLASH("photo-1416879595882-3373a0480b5b", 1400)} alt=""/>
              </div>
              <div>
                <span className="eyebrow">{t.sec2Eyebrow}</span>
                <h2 style={{marginTop:14}}>{t.sec2Title}</h2>
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
                <div style={{marginTop: 32}}>
                  <PrimaryCTA onClick={()=>go("contact")}>{t.cta.call}</PrimaryCTA>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

/* ============================================================
   Home contact form — compact embed for homepage
   ============================================================ */
const HomeContactForm = ({ t, lang, go }) => {
  const [form, setForm] = useS({ name: "", email: "", phone: "", phoneCountry: "SA", company: "", message: "" });
  const [done, setDone] = useS(false);
  const [errors, setErrors] = useS({});
  const phone = "+90 555 555 5555";
  const waNumber = "905555555555";
  const upd = (k, v) => setForm({ ...form, [k]: v });
  const submit = () => {
    const e = {};
    if (!form.name) e.name = true;
    if (!form.email || !form.email.includes("@")) e.email = true;
    if (!form.phone) e.phone = true;
    setErrors(e);
    if (Object.keys(e).length === 0) setDone(true);
  };
  return (
    <div className="home-contact">
      <div className="home-contact__bg">
        <LeafMark size={380} color="var(--brand)"/>
      </div>
      <div className="home-contact__left">
        <h2>{lang==="en" ? "Talk to our trade desk." : "تحدّث مع قسم المبيعات."}</h2>
        <p>{lang==="en"
          ? "Fastest channel is WhatsApp — drop your species list there and we'll quote the container."
          : "أسرع طريقة هي واتساب — أرسل قائمة الأنواع وسنرد بعرض السعر."}</p>
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
              <strong>sales@bitkihub.com</strong>
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
              <div className="form-submit-row">
                <small>{lang==="en" ? "Or send the full project list on our contact page." : "أو أرسل القائمة الكاملة عبر صفحة التواصل."}</small>
                <div style={{display:"flex", gap: 8}}>
                  <button className="btn btn--ghost" onClick={()=>go("contact")}>
                    {lang==="en" ? "Full form" : "النموذج الكامل"}
                  </button>
                  <button className="btn btn--dark" onClick={submit}>
                    {t.submit}
                    <span className="arrow"><Icon name="arrow" size={14}/></span>
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

/* ============================================================
   BLOG page
   ============================================================ */
const Blog = ({ t, lang, go }) => {
  const [cat, setCat] = useS("all");
  const filtered = cat === "all" ? BLOG_POSTS : BLOG_POSTS.filter(p => p.cat === cat);
  const [feature, ...rest] = filtered;
  return (
    <main>
      <div className="page-head">
        <div className="container">
          <div className="crumbs">
            <a href="#" onClick={(e)=>{e.preventDefault(); go("home");}}>{t.nav.home}</a>
            <Icon name="chev" size={12}/>
            <span>{t.nav.blog}</span>
          </div>
          <h1>{lang==="en" ? "Field journal." : "يوميات الحقل."}</h1>
          <p className="page-head__lede">
            {lang==="en"
              ? "Notes from Yalova, container math from the trade desk, and honest specimen advice from the people who grow them."
              : "ملاحظات من يالوفا، تحليلات من قسم التجارة، ومشورة صريحة من الذين يربّون هذه النباتات."}
          </p>
        </div>
      </div>

      <div className="product-toolbar">
        <div className="container" style={{display:"flex", justifyContent:"center"}}>
          <div className="chip-row">
            {BLOG_CATEGORIES.map(c => (
              <button key={c.id} className={`chip ${cat === c.id ? "is-active" : ""}`} onClick={()=>setCat(c.id)}>
                {c[lang]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section>
        <div className="container">
          {feature && (
            <a href="#" className="blog-feature" onClick={(e)=>e.preventDefault()}>
              <div className="blog-feature__media">
                <img src={feature.img} alt={feature.title[lang]}/>
              </div>
              <div className="blog-feature__body">
                <span className="blog-feature__cat">
                  {BLOG_CATEGORIES.find(c => c.id === feature.cat)[lang]}
                </span>
                <h2 className="blog-feature__title">{feature.title[lang]}</h2>
                <p className="blog-feature__excerpt">{feature.excerpt[lang]}</p>
                <div className="blog-feature__meta">
                  <span>{feature.date}</span>
                  <span>·</span>
                  <span>{feature.read} {lang==="en"?"min read":"دقائق قراءة"}</span>
                </div>
                <div className="blog-feature__cta">
                  <button className="btn btn--primary">
                    {lang==="en" ? "Read the journal entry" : "اقرأ المقال"}
                    <span className="arrow"><Icon name="arrow" size={14}/></span>
                  </button>
                </div>
              </div>
            </a>
          )}

          {rest.length > 0 && (
            <div className="blog-grid">
              {rest.map(post => (
                <a key={post.id} href="#" className="blog-card" onClick={(e)=>e.preventDefault()}>
                  <div className="blog-card__media">
                    <img src={post.img} alt={post.title[lang]}/>
                  </div>
                  <div className="blog-card__cat">
                    {BLOG_CATEGORIES.find(c => c.id === post.cat)[lang]}
                  </div>
                  <h3 className="blog-card__title">{post.title[lang]}</h3>
                  <p className="blog-card__excerpt">{post.excerpt[lang]}</p>
                  <div className="blog-card__meta">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.read} {lang==="en"?"min":"د"}</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <section style={{paddingTop: 0}}>
        <div className="container">
          <div className="cta-band">
            <div className="cta-band__mark"><LeafMark size={460} color="#fff"/></div>
            <div style={{position:"relative", zIndex: 1, maxWidth: 600}}>
              <h2>{lang==="en" ? "Get field notes in your inbox." : "تابع يوميات الحقل عبر بريدك."}</h2>
              <p>{lang==="en" ? "Monthly digest. Specimen news, trade-desk updates, no fluff." : "ملخص شهري. أخبار النباتات، تحديثات الشحن، بلا حشو."}</p>
            </div>
            <div style={{position:"relative", zIndex: 1, display:"flex", gap: 10, alignItems:"center"}}>
              <input type="email" placeholder={lang==="en"?"you@company.com":"البريد الإلكتروني"}
                style={{padding: "14px 18px", borderRadius: 999, border: "1px solid rgba(255,255,255,.3)", background:"rgba(255,255,255,.08)", color:"#fff", fontFamily:"inherit", outline: "none", minWidth: 240}}/>
              <button className="btn btn--primary">{lang==="en"?"Subscribe":"اشترك"}</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

/* ============================================================
   FAQ page
   ============================================================ */
const FAQ = ({ t, lang, go }) => {
  const [cat, setCat] = useS("all");
  const [open, setOpen] = useS(0);
  const list = cat === "all" ? FAQS : FAQS.filter(f => f.cat === cat);
  return (
    <main>
      <div className="page-head">
        <div className="container">
          <div className="crumbs">
            <a href="#" onClick={(e)=>{e.preventDefault(); go("home");}}>{t.nav.home}</a>
            <Icon name="chev" size={12}/>
            <span>{t.nav.faq}</span>
          </div>
          <h1>{lang==="en" ? "Questions, answered." : "أجوبة لأسئلتك."}</h1>
          <p className="page-head__lede">
            {lang==="en"
              ? "Everything we typically explain on the first WhatsApp message — MOQs, ports, lead times, paperwork. If your question isn't here, our trade desk is one tap away."
              : "كل ما نشرحه عادةً في أول محادثة واتساب — الحدود الدنيا، الموانئ، أوقات التنفيذ، الوثائق. لأي سؤال آخر، قسم التجارة على بُعد ضغطة زر."}
          </p>
        </div>
      </div>

      <div className="container">
        <div className="faq-layout">
          <aside className="faq-side">
            <div className="faq-side__group">
              <button className={cat==="all"?"is-active":""} onClick={()=>{setCat("all"); setOpen(0);}}>
                {lang==="en" ? "All questions" : "كل الأسئلة"}
              </button>
              {FAQ_CATEGORIES.map(c => (
                <button key={c.id} className={cat===c.id?"is-active":""} onClick={()=>{setCat(c.id); setOpen(0);}}>
                  {c[lang]}
                </button>
              ))}
            </div>
            <div className="faq-side__help">
              <strong>{lang==="en" ? "Need a human?" : "تريد التحدث مع موظف؟"}</strong>
              {lang==="en"
                ? "WhatsApp our trade desk — average reply under an hour during business hours."
                : "تواصل عبر الواتساب مع قسم التجارة — متوسط الرد أقل من ساعة."}
              <div style={{marginTop: 14}}>
                <button className="btn btn--primary" style={{padding:"10px 14px", fontSize:13}} onClick={()=>go("contact")}>
                  {t.requestQuote}
                </button>
              </div>
            </div>
          </aside>

          <div className="faq-list">
            {list.map((item, i) => (
              <div key={i} className={`faq-item ${open === i ? "is-open" : ""}`}>
                <button className="faq-item__btn" onClick={()=>setOpen(open === i ? -1 : i)}>
                  <span>{item.q[lang]}</span>
                  <span className="chev"><Icon name="chevDown" size={14}/></span>
                </button>
                <div className="faq-item__body">
                  <p>{item.a[lang]}</p>
                </div>
              </div>
            ))}
            {list.length === 0 && (
              <div style={{padding:"40px 0", color:"var(--text-soft)"}}>
                {lang==="en" ? "No questions in this category yet." : "لا توجد أسئلة في هذه الفئة."}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

/* ============================================================
   PRIVACY page
   ============================================================ */
const Privacy = ({ t, lang, go }) => {
  const enSections = [
    { id: "intro", title: "About this policy",
      body: (
        <>
          <p>Bitki Hub Tarım Ltd. Şti. ("Bitki Hub", "we", "us") is a wholesale plant nursery based in Yalova, Türkiye. This Privacy Policy explains what information we collect when you contact us about plants, browse our catalogue, or do business with us — and what we do with it.</p>
          <p>If anything here is unclear, write to <strong>privacy@bitkihub.com</strong> and a real person will reply.</p>
        </>
      ) },
    { id: "collect", title: "What we collect",
      body: (
        <>
          <p>We try to collect the minimum needed to do business with you. That typically means:</p>
          <ul>
            <li><strong>Contact details</strong> you submit on our forms or WhatsApp — name, company, email, phone, country of delivery, buyer type.</li>
            <li><strong>Enquiry contents</strong> — the species, sizes, quantities and project context you share with us.</li>
            <li><strong>Technical data</strong> automatically collected by our hosting and analytics — IP address, browser, device type, pages visited, referring URL.</li>
            <li><strong>Communications</strong> — copies of emails, WhatsApp threads and order documents.</li>
          </ul>
        </>
      ) },
    { id: "use", title: "How we use it",
      body: (
        <>
          <p>We use this information to:</p>
          <ul>
            <li>Reply to your enquiry, prepare quotes and process orders.</li>
            <li>Issue shipping, customs and phytosanitary documentation.</li>
            <li>Maintain our customer records as required by Turkish tax and trade law.</li>
            <li>Improve our catalogue, content and website (aggregated analytics only).</li>
            <li>Occasionally send you trade-desk updates — only if you opted in.</li>
          </ul>
          <p>We do <strong>not</strong> sell your data to anyone, ever.</p>
        </>
      ) },
    { id: "share", title: "Who we share it with",
      body: (
        <>
          <p>To run a nursery and ship containers across the MENA region, some data has to leave our systems. We share strictly what's necessary with:</p>
          <ul>
            <li>Freight forwarders, shipping lines and customs brokers handling your container.</li>
            <li>Phytosanitary inspectors at origin and destination ports.</li>
            <li>Payment institutions and our bank for invoice settlement.</li>
            <li>Government authorities where law requires it (Türkiye and your destination country).</li>
          </ul>
        </>
      ) },
    { id: "cookies", title: "Cookies & analytics",
      body: (
        <>
          <p>We use a small set of cookies: essential cookies for site functionality, language and tweak preferences, and analytics cookies that give us anonymous traffic statistics. We do not run advertising trackers.</p>
          <p>You can change your cookie preferences any time from the footer "Cookie settings" link.</p>
        </>
      ) },
    { id: "retention", title: "How long we keep it",
      body: (
        <>
          <p>Enquiry data is kept for up to 24 months from your last contact. Order records and invoices are kept for 10 years to comply with Turkish accounting law. Analytics data is anonymised after 26 months.</p>
        </>
      ) },
    { id: "rights", title: "Your rights",
      body: (
        <>
          <p>Under GDPR (if you're in the EU) and KVKK (Türkiye), you can ask us to:</p>
          <ul>
            <li>Access, correct or export the data we hold on you.</li>
            <li>Delete your data (subject to legal retention obligations).</li>
            <li>Object to processing or withdraw consent for marketing.</li>
          </ul>
          <p>Send any request to <strong>privacy@bitkihub.com</strong>. We respond within 30 days.</p>
        </>
      ) },
    { id: "contact", title: "Contact",
      body: (
        <>
          <p>Bitki Hub Tarım Ltd. Şti.<br/>Yalova, Türkiye<br/>privacy@bitkihub.com</p>
          <p>This policy was last updated on May 16, 2026. If we make material changes, we'll post a notice here and email anyone whose data is affected.</p>
        </>
      ) },
  ];

  // Arabic version (concise, same structure)
  const arSections = [
    { id: "intro", title: "حول هذه السياسة",
      body: (
        <>
          <p>شركة بِتكي هَب الزراعية المحدودة ("بِتكي هَب"، "نحن") مشتل جملة في يالوفا، تركيا. توضح هذه السياسة ما نجمعه من معلومات عندما تتواصل معنا أو تتصفح كتالوجنا، وكيف نستخدمها.</p>
          <p>لأي استفسار، راسلنا على <strong>privacy@bitkihub.com</strong>.</p>
        </>
      ) },
    { id: "collect", title: "ما الذي نجمعه",
      body: (
        <>
          <p>نحاول جمع الحد الأدنى اللازم لإتمام التعامل:</p>
          <ul>
            <li><strong>بيانات التواصل</strong>: الاسم، الشركة، البريد، الهاتف، دولة التسليم، نوع المشتري.</li>
            <li><strong>محتوى الاستفسار</strong>: الأنواع والأحجام والكميات والسياق.</li>
            <li><strong>بيانات تقنية</strong>: عنوان IP، المتصفح، الجهاز، الصفحات الزائرة.</li>
            <li><strong>المراسلات</strong>: نسخ من الإيميل، الواتساب، ووثائق الطلب.</li>
          </ul>
        </>
      ) },
    { id: "use", title: "كيف نستخدمها",
      body: (
        <>
          <p>نستخدم هذه المعلومات من أجل:</p>
          <ul>
            <li>الرد على استفسارك وتجهيز عروض الأسعار وتنفيذ الطلبات.</li>
            <li>إصدار وثائق الشحن والجمارك والشهادات الصحية النباتية.</li>
            <li>الالتزام بقوانين الضرائب والتجارة في تركيا.</li>
            <li>تحسين الكتالوج والموقع (إحصاءات مجمعة فقط).</li>
            <li>إرسال تحديثات قسم التجارة عند موافقتك.</li>
          </ul>
          <p>لا نبيع بياناتك لأي طرف.</p>
        </>
      ) },
    { id: "share", title: "مع من نشاركها",
      body: (
        <>
          <p>نشارك ما هو ضروري فقط مع:</p>
          <ul>
            <li>وكلاء الشحن وخطوط النقل والمخلّصين الجمركيين.</li>
            <li>مفتشي الصحة النباتية في الموانئ.</li>
            <li>المؤسسات المالية والبنك لإتمام المعاملات.</li>
            <li>الجهات الحكومية عند الطلب القانوني.</li>
          </ul>
        </>
      ) },
    { id: "cookies", title: "الكوكيز والتحليلات",
      body: <p>نستخدم كوكيز أساسية لتشغيل الموقع وكوكيز تحليلية لإحصاءات مجهولة الهوية. لا نستخدم متعقبات إعلانية. يمكنك تعديل تفضيلاتك من رابط "إعدادات الكوكي" في التذييل.</p> },
    { id: "retention", title: "مدة الاحتفاظ",
      body: <p>بيانات الاستفسارات: حتى 24 شهراً من آخر تواصل. سجلات الطلبات والفواتير: 10 سنوات وفق القانون التركي. بيانات التحليلات: تُجهَّل بعد 26 شهراً.</p> },
    { id: "rights", title: "حقوقك",
      body: (
        <>
          <p>وفقاً لقوانين GDPR و KVKK، يحق لك:</p>
          <ul>
            <li>الوصول إلى بياناتك أو تصحيحها أو تصديرها.</li>
            <li>طلب حذف بياناتك (مع مراعاة الالتزامات القانونية).</li>
            <li>الاعتراض على المعالجة أو سحب الموافقة على التسويق.</li>
          </ul>
          <p>راسلنا على <strong>privacy@bitkihub.com</strong> وسنرد خلال 30 يوماً.</p>
        </>
      ) },
    { id: "contact", title: "تواصل",
      body: (
        <>
          <p>شركة بِتكي هَب الزراعية المحدودة<br/>يالوفا، تركيا<br/>privacy@bitkihub.com</p>
          <p>آخر تحديث: 16 مايو 2026. عند أي تغيير جوهري، سنُعلِم المتأثرين.</p>
        </>
      ) },
  ];

  const sections = lang === "ar" ? arSections : enSections;

  return (
    <main>
      <div className="page-head">
        <div className="container">
          <div className="crumbs">
            <a href="#" onClick={(e)=>{e.preventDefault(); go("home");}}>{t.nav.home}</a>
            <Icon name="chev" size={12}/>
            <span>{lang==="en" ? "Privacy policy" : "سياسة الخصوصية"}</span>
          </div>
          <h1>{lang==="en" ? "Privacy policy." : "سياسة الخصوصية."}</h1>
          <p className="page-head__lede">
            {lang==="en"
              ? "Plain-language summary of what data we collect, why, and what you can do about it."
              : "ملخص واضح لما نجمعه من بيانات، لماذا، وما الذي يمكنك فعله."}
          </p>
        </div>
      </div>

      <div className="container">
        <div className="legal-layout">
          <aside className="legal-side">
            <h5>{lang==="en" ? "On this page" : "في هذه الصفحة"}</h5>
            <ol>
              {sections.map(s => (
                <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
              ))}
            </ol>
          </aside>
          <div className="legal-body">
            <div className="legal-meta">
              <div><strong>{lang==="en" ? "Effective date" : "تاريخ السريان"}</strong> May 16, 2026</div>
              <div><strong>{lang==="en" ? "Jurisdiction" : "الاختصاص"}</strong> Türkiye / GDPR / KVKK</div>
              <div><strong>{lang==="en" ? "Contact" : "للتواصل"}</strong> privacy@bitkihub.com</div>
            </div>
            {sections.map((s, i) => (
              <section key={s.id} id={s.id}>
                <h2>
                  <span className="num">{String(i+1).padStart(2,"0")}</span>
                  {s.title}
                </h2>
                {s.body}
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

Object.assign(window, { Home, Products, ProductDetail, Contact, SimplePage, HomeContactForm, Blog, FAQ, Privacy });
