/* Print version — renders all key screens stacked, no router, no Tweaks panel */
const noop = () => {};
const goNoop = () => {};

function PrintApp() {
  const lang = "en";
  const t = STRINGS[lang];

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.setAttribute("data-density", "comfortable");
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.setAttribute("lang", "en");
  }, []);

  const tweaks = { hero: "split", theme: "light", density: "comfortable", cardStyle: "default", lang: "en" };

  const sampleProduct = PRODUCTS[0].id;

  return (
    <>
      <Header route="home" go={goNoop} t={t} lang={lang} setLang={noop} theme="light"/>

      <div className="print-page">
        <Home t={t} go={goNoop} lang={lang} tweaks={tweaks} openQuote={noop} cardStyle="default"/>
      </div>

      <div className="print-divider">
        <span>Catalogue</span>
      </div>
      <div className="print-page">
        <Products t={t} lang={lang} go={goNoop} initialCat="all" cardStyle="default"/>
      </div>

      <div className="print-divider">
        <span>Product detail</span>
      </div>
      <div className="print-page">
        <ProductDetail t={t} lang={lang} go={goNoop} productId={sampleProduct} openQuote={noop} cardStyle="default"/>
      </div>

      <div className="print-divider">
        <span>Contact</span>
      </div>
      <div className="print-page">
        <Contact t={t} lang={lang} go={goNoop}/>
      </div>

      <div className="print-divider">
        <span>FAQ</span>
      </div>
      <div className="print-page">
        <FAQ t={t} lang={lang} go={goNoop}/>
      </div>

      <div className="print-divider">
        <span>Privacy policy</span>
      </div>
      <div className="print-page">
        <Privacy t={t} lang={lang} go={goNoop}/>
      </div>

      <div className="print-divider">
        <span>Blog</span>
      </div>
      <div className="print-page">
        <Blog t={t} lang={lang} go={goNoop}/>
      </div>

      <Footer t={t} go={goNoop} theme="light"/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<PrintApp />);

/* Auto-print after fonts + layout settle */
(async function autoPrint() {
  try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch (e) {}
  await new Promise(r => setTimeout(r, 800));
  window.print();
})();
