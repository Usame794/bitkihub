/* Bitki Hub — Products screens
   Requires: Icon, PrimaryCTA, ProductCard (globals)
   Exports:  Products, ProductDetail */
const { useState: _pS, useEffect: _pE, useMemo: _pM } = React;

/* ── Products listing ─────────────────────────────────────── */
const Products = ({ t, lang, go, initialCat, cardStyle }) => {
  const [cat, setCat] = _pS(initialCat || "all");
  const [q, setQ]     = _pS("");
  const [sort, setSort] = _pS(0);

  _pE(() => { if (initialCat) setCat(initialCat); }, [initialCat]);

  const filtered = _pM(() => {
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
        <div className="container toolbar-inner">
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
            <p style={{marginTop: 16}}>{lang==="en"?"No specimens match those filters.":"لا توجد نباتات تطابق بحثك."}</p>
          </div>
        )}
      </div>
    </main>
  );
};

/* ── Product detail ───────────────────────────────────────── */
const ProductDetail = ({ t, lang, go, productId, openQuote, cardStyle }) => {
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  const [activeImg, setActiveImg] = _pS(0);
  const [tab, setTab]             = _pS(0);
  const [qty, setQty]             = _pS(product.moq);

  _pE(() => { setActiveImg(0); setTab(0); setQty(product.moq); window.scrollTo(0, 0); }, [productId]);

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
                  <img src={g} alt="" loading="lazy"/>
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
                  <span className="price">€{product.price.toFixed(2)}</span>
                  <span className="unit">/ {lang==="en"?"liner":"شتلة"}</span>
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

Object.assign(window, { Products, ProductDetail });
