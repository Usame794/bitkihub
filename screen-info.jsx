/* Bitki Hub — Info screens (About, Projects, Blog, FAQ, Privacy)
   Requires: Icon, PrimaryCTA, LeafMark (globals)
   Exports:  SimplePage, Blog, BlogPost, FAQ, Privacy */
const { useState: _iS, useEffect: _iE } = React;

/* ── About / Projects ─────────────────────────────────────── */
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
                  <img src={pr.img} alt={pr.title[lang]} loading="lazy"/>
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
                <img src={UNSPLASH("photo-1416879595882-3373a0480b5b", 1400)} alt="" loading="lazy"/>
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

/* ── Blog listing ─────────────────────────────────────────── */
const Blog = ({ t, lang, go }) => {
  const [cat, setCat] = _iS("all");
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
          <h1>{lang==="en" ? "Field journal." : "مقالات ونصائح."}</h1>
          <p className="page-head__lede">
            {lang==="en"
              ? "Notes from Yalova, container math from the trade desk, and honest specimen advice from the people who grow them."
              : "مقالات ونصائح من فريق المزرعة حول التنسيق وأنواع النباتات والشحن."}
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
            <a href="#" className="blog-feature" onClick={(e)=>{e.preventDefault(); go("post", feature.id);}}>
              <div className="blog-feature__media">
                <img src={feature.img} alt={feature.title[lang]} loading="lazy"/>
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
                    {lang==="en" ? "Read the journal entry" : "اقرأ المزيد"}
                    <span className="arrow"><Icon name="arrow" size={14}/></span>
                  </button>
                </div>
              </div>
            </a>
          )}

          {rest.length > 0 && (
            <div className="blog-grid">
              {rest.map(post => (
                <a key={post.id} href="#" className="blog-card"
                  onClick={(e)=>{e.preventDefault(); go("post", post.id);}}>
                  <div className="blog-card__media">
                    <img src={post.img} alt={post.title[lang]} loading="lazy"/>
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
              <h2>{lang==="en" ? "Get field notes in your inbox." : "تابع آخر المقالات والأخبار عبر بريدك."}</h2>
              <p>{lang==="en" ? "Monthly digest. Specimen news, trade-desk updates, no fluff." : "رسالة شهرية. أخبار المزرعة، تحديثات الشحن، ونصائح نباتية مختصرة."}</p>
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

/* ── Blog post ────────────────────────────────────────────── */
const BlogPost = ({ t, lang, go, postId }) => {
  const post    = BLOG_POSTS.find(p => String(p.id) === String(postId)) || BLOG_POSTS[0];
  const cat     = BLOG_CATEGORIES.find(c => c.id === post.cat) || BLOG_CATEGORIES[1];
  const related = BLOG_POSTS.filter(p => String(p.id) !== String(postId) && p.cat === post.cat).slice(0, 3);

  _iE(() => { window.scrollTo(0, 0); }, [postId]);

  return (
    <main>
      <div className="blog-post-hero">
        <img src={post.img} alt={post.title[lang]}/>
      </div>

      <div className="container blog-post-container">
        <div className="crumbs" style={{fontSize:12,color:"var(--text-soft)",margin:"32px 0 20px",textTransform:"uppercase",letterSpacing:".12em"}}>
          <a href="#" onClick={(e)=>{e.preventDefault(); go("home");}}>{t.nav.home}</a>
          {" / "}
          <a href="#" onClick={(e)=>{e.preventDefault(); go("blog");}}>{t.nav.blog}</a>
          {" / "}
          <span>{cat[lang]}</span>
        </div>

        <div className="blog-post-meta">
          <span className="blog-post-cat">{cat[lang]}</span>
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.read} {lang==="en"?"min read":"دقائق قراءة"}</span>
        </div>

        <h1 className="blog-post-title">{post.title[lang]}</h1>

        <div className="blog-post-body">
          <p>{post.excerpt[lang]}</p>
        </div>

        <div className="blog-post-footer">
          <button className="btn btn--ghost" onClick={()=>go("blog")}>
            ← {lang==="en"?"Back to field journal":"العودة إلى المقالات"}
          </button>
          <button className="btn btn--primary" onClick={()=>go("contact")}>
            {t.requestQuote}
            <span className="arrow"><Icon name="arrow" size={14}/></span>
          </button>
        </div>

        {related.length > 0 && (
          <div className="blog-post-related">
            <h3 style={{marginBottom: 24}}>{lang==="en"?"More from the journal":"مقالات أخرى"}</h3>
            <div className="blog-grid">
              {related.map(p => (
                <a key={p.id} href="#" className="blog-card"
                  onClick={(e)=>{e.preventDefault(); go("post", p.id);}}>
                  <div className="blog-card__media"><img src={p.img} alt={p.title[lang]} loading="lazy"/></div>
                  <div className="blog-card__cat">{BLOG_CATEGORIES.find(c=>c.id===p.cat)[lang]}</div>
                  <h3 className="blog-card__title">{p.title[lang]}</h3>
                  <p className="blog-card__excerpt">{p.excerpt[lang]}</p>
                  <div className="blog-card__meta">
                    <span>{p.date}</span><span>·</span>
                    <span>{p.read} {lang==="en"?"min":"د"}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

/* ── FAQ page ─────────────────────────────────────────────── */
const FAQ = ({ t, lang, go }) => {
  const [cat, setCat]   = _iS("all");
  const [open, setOpen] = _iS(0);
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
          <h1>{lang==="en" ? "Questions, answered." : "الأسئلة الشائعة."}</h1>
          <p className="page-head__lede">
            {lang==="en"
              ? "Everything we typically explain on the first WhatsApp message — MOQs, ports, lead times, paperwork. If your question isn't here, our trade desk is one tap away."
              : "إجابات على الأسئلة الأكثر شيوعاً حول الطلب والشحن والتوثيق."}
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
              <strong>{lang==="en" ? "Need a human?" : "هل تريد التحدث مع أحد من فريقنا؟"}</strong>
              {lang==="en"
                ? "WhatsApp our trade desk — average reply under an hour during business hours."
                : "تواصل معنا عبر واتساب — نرد في أقل من ساعة"}
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

/* ── Privacy page ─────────────────────────────────────────── */
const Privacy = ({ t, lang, go }) => {
  const enSections = [
    { id: "intro", title: "About this policy",
      body: (
        <>
          <p>Bitki Hub Tarım Ltd. Şti. ("Bitki Hub", "we", "us") is a wholesale plant nursery based in Yalova, Türkiye. This Privacy Policy explains what information we collect when you contact us about plants, browse our catalogue, or do business with us — and what we do with it.</p>
          <p>If anything here is unclear, write to <strong>info@bitkihub.com</strong> and a real person will reply.</p>
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
          <p>Send any request to <strong>info@bitkihub.com</strong>. We respond within 30 days.</p>
        </>
      ) },
    { id: "contact", title: "Contact",
      body: (
        <>
          <p>Bitki Hub Tarım Ltd. Şti.<br/>Yalova, Türkiye<br/>info@bitkihub.com</p>
          <p>This policy was last updated on May 16, 2026. If we make material changes, we'll post a notice here and email anyone whose data is affected.</p>
        </>
      ) },
  ];

  const arSections = [
    { id: "intro", title: "حول هذه السياسة",
      body: (
        <>
          <p>شركة بِتكي هَب الزراعية المحدودة ("بِتكي هَب"، "نحن") مشتل جملة في يالوفا، تركيا. توضح هذه السياسة ما نجمعه من معلومات عندما تتواصل معنا أو تتصفح كتالوجنا، وكيف نستخدمها.</p>
          <p>لأي استفسار، راسلنا على <strong>info@bitkihub.com</strong>.</p>
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
          <p>راسلنا على <strong>info@bitkihub.com</strong> وسنرد خلال 30 يوماً.</p>
        </>
      ) },
    { id: "contact", title: "تواصل",
      body: (
        <>
          <p>شركة بِتكي هَب الزراعية المحدودة<br/>يالوفا، تركيا<br/>info@bitkihub.com</p>
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
              <div><strong>{lang==="en" ? "Contact" : "للتواصل"}</strong> info@bitkihub.com</div>
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

Object.assign(window, { SimplePage, Blog, BlogPost, FAQ, Privacy });
