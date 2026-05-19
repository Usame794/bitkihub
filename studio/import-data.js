/**
 * Bitki Hub — Sanity import script
 * Reads all hardcoded content from data.jsx and upserts it into Sanity.
 * Safe to re-run: uses createOrReplace with stable _id values.
 *
 * Run: node studio/import-data.js
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { homedir } from 'os'
import { join } from 'path'

// Read auth token from Sanity CLI config (~/.config/sanity/config.json)
// or fall back to SANITY_TOKEN env var
function getToken() {
  try {
    const cfg = JSON.parse(readFileSync(join(homedir(), '.config', 'sanity', 'config.json'), 'utf8'))
    if (cfg.authToken) return cfg.authToken
  } catch {}
  return process.env.SANITY_TOKEN || ''
}

const client = createClient({
  projectId:  'akpzc8he',
  dataset:    'production',
  apiVersion: '2024-01-01',
  useCdn:     false,
  token:      getToken(),
})

// ─── Helpers ────────────────────────────────────────────────────────────────

const UNSPLASH = (id, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`

let created = 0, updated = 0, errors = 0

async function upsert(doc) {
  try {
    const existing = await client.getDocument(doc._id)
    await client.createOrReplace(doc)
    existing ? updated++ : created++
    process.stdout.write('.')
  } catch (err) {
    errors++
    console.error(`\n  ✗ ${doc._id}: ${err.message}`)
  }
}

// ─── 1. Categories ──────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: 'hedges',       en: 'Hedging & Screening',     ar: 'أسوار وحواجز نباتية',
    blurb: { en: 'Photinia, Buxus, Viburnum and Elaeagnus — the working backbone of every garden wall.',
             ar: 'فوتينيا، بُكسس، فيبرنوم وإلياغنوس — العمود الفقري لكل سور أخضر.' },
    img: UNSPLASH('photo-1466692476868-aef1dfb1e735') },
  { id: 'conifers',     en: 'Conifers & Topiary',      ar: 'صنوبريات ونباتات مُطعّمة',
    blurb: { en: 'Grafted Cupressus, Juniperus and Thuja for verticals, screens and shaped specimens.',
             ar: 'سرو وعرعر وثوجا مطعّمة للحدود الرأسية والأشكال المنحوتة.' },
    img: UNSPLASH('photo-1518173946687-a4c8892bbd9f') },
  { id: 'flowering',    en: 'Flowering Shrubs',        ar: 'شجيرات مُزهرة',
    blurb: { en: 'Lagerstroemia, Hibiscus, Oleander and Abelia — long-season colour for landscape work.',
             ar: 'كريب ميرتل وخطمي ودِفلى وأبيليا — ألوان موسم طويل لمشاريع التنسيق.' },
    img: UNSPLASH('photo-1499002238440-d264edd596ec') },
  { id: 'foliage',      en: 'Ornamental Foliage',      ar: 'أوراق زينة ملوّنة',
    blurb: { en: 'Nandina, Loropetalum, Berberis and Photinia varieties grown for leaf colour, not bloom.',
             ar: 'ناندينا ولوروبيتالم وبربريس بأوراق ملوّنة على مدار العام.' },
    img: UNSPLASH('photo-1614594975525-e45190c55d0b') },
  { id: 'ground',       en: 'Ground Cover & Creepers', ar: 'غطاء أرضي ومُتسلّقات',
    blurb: { en: 'Juniperus horizontalis carpets, Convolvulus mounds and Rhyncospermum climbers.',
             ar: 'نباتات منخفضة وفرشية الانتشار، ومتسلّقات للأسوار والتعريشات.' },
    img: UNSPLASH('photo-1459411552884-841db9b3cc2a') },
  { id: 'mediterranean', en: 'Mediterranean Aromatics', ar: 'نباتات متوسطية عطرية',
    blurb: { en: 'Rosmarinus, Myrtus, Teucrium, Callistemon — drought-tolerant, scented, low-water.',
             ar: 'إكليل الجبل، الآس، تيوكريوم، كاليستيمون — مقاومة للجفاف ومنخفضة الاستهلاك.' },
    img: UNSPLASH('photo-1416879595882-3373a0480b5b') },
]

// ─── 2. Liners (products) ───────────────────────────────────────────────────

const PRODUCTS = [
  {
    id: 'photinia-red-robin',
    name: { en: 'Red Robin Photinia', ar: 'فوتينيا ريد روبن' },
    latin: "Photinia × fraseri 'Red Robin'", cat: 'hedges',
    badge: { en: 'Best seller', ar: 'الأكثر طلباً' },
    price: 1.03, unit: 'EUR', moq: 500,
    height: '25–35 cm', pot: '9 × 9 × 8 cm',
    climate: 'Mediterranean · Continental', water: 'Moderate', sun: 'Full to part sun', age: '12–14 months',
    img: UNSPLASH('photo-1542273917363-3b1817f69a2d'),
    gallery: ['photo-1542273917363-3b1817f69a2d','photo-1466692476868-aef1dfb1e735','photo-1448375240586-882707db888b','photo-1614594975525-e45190c55d0b'].map(id=>UNSPLASH(id)),
    desc: { en: 'The standard evergreen hedging liner — fast-growing, brilliant red new growth flushing three times a year, hardy down to −15 °C. Our most-shipped variety, packed 500+ per pallet.',
            ar: 'أكثر شتلاتنا طلباً للأسوار الخضراء: نمو سريع وأوراق جديدة حمراء لامعة ثلاث مرات في السنة، تتحمّل البرودة حتى −15 °م. تُشحن 500 وحدة فأكثر للمنصة.' },
  },
  {
    id: 'buxus-rotundifolia',
    name: { en: 'Common Boxwood', ar: 'بُكسس مستدير الأوراق' },
    latin: "Buxus sempervirens 'Rotundifolia'", cat: 'hedges', badge: null,
    price: 0.96, unit: 'EUR', moq: 500,
    height: '15–25 cm', pot: '9 × 9 × 8 cm',
    climate: 'Temperate · Mediterranean', water: 'Moderate', sun: 'Full sun to shade', age: '14–16 months',
    img: UNSPLASH('photo-1466692476868-aef1dfb1e735'),
    gallery: ['photo-1466692476868-aef1dfb1e735','photo-1542273917363-3b1817f69a2d','photo-1448375240586-882707db888b','photo-1614594975525-e45190c55d0b'].map(id=>UNSPLASH(id)),
    desc: { en: 'Classic round-leaf boxwood liner for clipped hedges, parterres and topiary cones. Sourced from our certified blight-free stock blocks.',
            ar: 'بُكسس كلاسيكي مستدير الأوراق لأسوار التشذيب، البارتير، والأشكال الهندسية. من قطاعات إنتاج معتمدة خالية من اللفحة.' },
  },
  {
    id: 'cupressus-stricta-grafted',
    name: { en: 'Italian Cypress (grafted)', ar: 'السرو الإيطالي (مطعّم)' },
    latin: "Cupressus sempervirens 'Stricta' grafted", cat: 'conifers',
    badge: { en: 'Grafted', ar: 'مُطعّم' },
    price: 1.94, unit: 'EUR', moq: 200,
    height: '30–45 cm', pot: '7 × 7 × 8 cm',
    climate: 'Mediterranean', water: 'Low', sun: 'Full sun', age: '18–24 months',
    img: UNSPLASH('photo-1518173946687-a4c8892bbd9f'),
    gallery: ['photo-1518173946687-a4c8892bbd9f','photo-1448375240586-882707db888b','photo-1466692476868-aef1dfb1e735','photo-1542273917363-3b1817f69a2d'].map(id=>UNSPLASH(id)),
    desc: { en: 'Grafted Italian cypress liners selected for true narrow column habit — no drift, no broom-out, identical silhouettes down the whole avenue.',
            ar: 'شتلات سرو إيطالي مطعّمة بشكل عمودي صارم — قوامها متطابق على طول الجادة دون انفتاح أو انحراف.' },
  },
  {
    id: 'juniperus-blue-arrow',
    name: { en: 'Blue Arrow Juniper', ar: 'عرعر السهم الأزرق' },
    latin: "Juniperus scopulorum 'Blue Arrow'", cat: 'conifers', badge: null,
    price: 1.03, unit: 'EUR', moq: 300,
    height: '25–35 cm', pot: '9 × 9 × 8 cm',
    climate: 'Continental · Arid', water: 'Very low', sun: 'Full sun', age: '14–16 months',
    img: UNSPLASH('photo-1448375240586-882707db888b'),
    gallery: ['photo-1448375240586-882707db888b','photo-1518173946687-a4c8892bbd9f','photo-1466692476868-aef1dfb1e735','photo-1542273917363-3b1817f69a2d'].map(id=>UNSPLASH(id)),
    desc: { en: 'Steel-blue, dead-vertical accent conifer. Drought-hardy and salt-tolerant — equally happy on a Riyadh boulevard or an Aegean coastline.',
            ar: 'عرعر عمودي بلون أزرق فولاذي، مقاوم للجفاف والملوحة — يلائم جادات الرياض كما يلائم ساحل بحر إيجة.' },
  },
  {
    id: 'thuja-aurea-nana-grafted',
    name: { en: 'Golden Pyramid Thuja (grafted)', ar: 'ثوجا ذهبية هرمية (مطعّمة)' },
    latin: "Thuja orientalis 'Pyramidalis Aurea' grafted", cat: 'conifers',
    badge: { en: 'From our nursery', ar: 'من مشتلنا' },
    price: 1.29, unit: 'EUR', moq: 200,
    height: '25–40 cm', pot: '7 × 7 × 8 cm',
    climate: 'Mediterranean · Continental', water: 'Low', sun: 'Full sun', age: '16–20 months',
    img: 'assets/products/thuja-aurea-nana.jpg',
    gallery: ['assets/products/thuja-aurea-nana.jpg', UNSPLASH('photo-1518173946687-a4c8892bbd9f'), UNSPLASH('photo-1448375240586-882707db888b'), UNSPLASH('photo-1466692476868-aef1dfb1e735')],
    desc: { en: 'Tight conical Thuja with bright gold winter colouring deepening through the season. Grafted on Thuja orientalis stock for a clean, uniform pyramid — no broom-out, no reversion to green.',
            ar: 'ثوجا مخروطية متماسكة بلون ذهبي شتوي يزداد عمقاً مع الموسم. مطعّمة على أصل ثوجا شرقية لشكل هرمي موحّد دون عودة إلى اللون الأخضر.' },
  },
  {
    id: 'lagerstroemia-black-diamond-red',
    name: { en: 'Black Diamond Crepe Myrtle', ar: 'كريب ميرتل بلاك دايموند' },
    latin: "Lagerstroemia 'Black Diamond Best Red'", cat: 'flowering',
    badge: { en: 'Premium', ar: 'فئة مميزة' },
    price: 2.41, unit: 'EUR', moq: 100,
    height: '30–40 cm', pot: '9 × 9 × 8 cm',
    climate: 'Mediterranean · Hot', water: 'Moderate', sun: 'Full sun', age: '16–18 months',
    img: UNSPLASH('photo-1499002238440-d264edd596ec'),
    gallery: ['photo-1499002238440-d264edd596ec','photo-1416879595882-3373a0480b5b','photo-1614594975525-e45190c55d0b','photo-1542273917363-3b1817f69a2d'].map(id=>UNSPLASH(id)),
    desc: { en: 'Near-black foliage with deep crimson summer blooms — the most striking crepe myrtle in our line. Licensed Black Diamond® genetics, certified per plant.',
            ar: 'أوراق سوداء تقريباً وأزهار صيفية حمراء قانية — أبرز أنواع الكريب ميرتل لدينا. جينات Black Diamond® مرخّصة وموثّقة لكل نبتة.' },
  },
  {
    id: 'hibiscus-white-chiffon',
    name: { en: 'White Chiffon Rose of Sharon', ar: 'خطمي أبيض شيفون' },
    latin: "Hibiscus syriacus 'White Chiffon' ®", cat: 'flowering', badge: null,
    price: 1.09, unit: 'EUR', moq: 300,
    height: '25–35 cm', pot: '9 × 9 × 8 cm',
    climate: 'Temperate · Mediterranean', water: 'Moderate', sun: 'Full sun', age: '14–16 months',
    img: UNSPLASH('photo-1416879595882-3373a0480b5b'),
    gallery: ['photo-1416879595882-3373a0480b5b','photo-1499002238440-d264edd596ec','photo-1614594975525-e45190c55d0b','photo-1542273917363-3b1817f69a2d'].map(id=>UNSPLASH(id)),
    desc: { en: 'Double, anemone-form white blooms from July to October. Reliable, deer-resistant, recovers cleanly from hard prune — a workhorse summer shrub.',
            ar: 'أزهار بيضاء مزدوجة من يوليو إلى أكتوبر، مقاومة وسهلة العناية وتُجدّد جيداً بعد التقليم القاسي.' },
  },
  {
    id: 'nerium-petite-salmon',
    name: { en: 'Dwarf Salmon Oleander', ar: 'دِفلى سالمون قزمي' },
    latin: "Nerium oleander nana 'Petite Salmon'", cat: 'flowering', badge: null,
    price: 1.03, unit: 'EUR', moq: 300,
    height: '20–30 cm', pot: '9 × 9 × 8 cm',
    climate: 'Hot · Arid', water: 'Low', sun: 'Full sun', age: '12–14 months',
    img: UNSPLASH('photo-1568084680786-a84f91d1153c'),
    gallery: ['photo-1568084680786-a84f91d1153c','photo-1499002238440-d264edd596ec','photo-1416879595882-3373a0480b5b','photo-1614594975525-e45190c55d0b'].map(id=>UNSPLASH(id)),
    desc: { en: 'Compact 1.2 m mature habit with salmon-pink semi-double flowers. The default Gulf street planter — heat-, salt- and pollution-tolerant.',
            ar: 'ينضج بارتفاع 1.2 م مع أزهار سالمون نصف مزدوجة. الخيار التقليدي لشوارع الخليج: مقاوم للحر والملوحة والتلوث.' },
  },
  {
    id: 'nandina-gulf-stream',
    name: { en: 'Gulf Stream Heavenly Bamboo', ar: 'ناندينا غولف ستريم' },
    latin: "Nandina domestica 'Gulf Stream'", cat: 'foliage', badge: null,
    price: 1.27, unit: 'EUR', moq: 300,
    height: '20–30 cm', pot: '9 × 9 × 8 cm',
    climate: 'Mediterranean · Temperate', water: 'Low', sun: 'Full sun to part shade', age: '14–16 months',
    img: UNSPLASH('photo-1485955900006-10f4d324d411'),
    gallery: ['photo-1485955900006-10f4d324d411','photo-1614594975525-e45190c55d0b','photo-1542273917363-3b1817f69a2d','photo-1466692476868-aef1dfb1e735'].map(id=>UNSPLASH(id)),
    desc: { en: 'Mounded sterile heavenly bamboo with bright coral-red new growth in spring and burgundy in winter. Sterile cultivar — no berries, no seed escape.',
            ar: 'ناندينا مدمجة بأوراق ربيعية مرجانية وشتوية برغندية، عقيمة لا تنتج ثماراً ولا تنتشر بذرياً.' },
  },
  {
    id: 'loropetalum-black-pearl',
    name: { en: 'Black Pearl Loropetalum', ar: 'لوروبيتالم بلاك بيرل' },
    latin: "Loropetalum chinense 'Black Pearl' ®", cat: 'foliage',
    badge: { en: 'New 2026', ar: 'وارد 2026' },
    price: 1.42, unit: 'EUR', moq: 200,
    height: '20–30 cm', pot: '9 × 9 × 8 cm',
    climate: 'Mediterranean · Subtropical', water: 'Moderate', sun: 'Full sun to part shade', age: '14–16 months',
    img: UNSPLASH('photo-1614594975525-e45190c55d0b'),
    gallery: ['photo-1614594975525-e45190c55d0b','photo-1485955900006-10f4d324d411','photo-1542273917363-3b1817f69a2d','photo-1499002238440-d264edd596ec'].map(id=>UNSPLASH(id)),
    desc: { en: "The darkest Loropetalum on the market — near-black year-round foliage with bright fuchsia spider flowers in spring. Trademarked PlantHaven release.",
            ar: 'أغمق أنواع اللوروبيتالم — أوراق شبه سوداء طوال العام مع أزهار فوشيا في الربيع. إصدار PlantHaven المسجّل.' },
  },
  {
    id: 'juniperus-blue-pacific',
    name: { en: 'Blue Pacific Juniper', ar: 'عرعر بلو باسيفيك زاحف' },
    latin: "Juniperus horizontalis 'Blue Pacific'", cat: 'ground',
    badge: { en: 'Drought-tolerant', ar: 'مقاوم للجفاف' },
    price: 1.03, unit: 'EUR', moq: 500,
    height: '10–15 cm', pot: '9 × 9 × 8 cm',
    climate: 'Arid · Mediterranean', water: 'Very low', sun: 'Full sun', age: '12–14 months',
    img: UNSPLASH('photo-1459411552884-841db9b3cc2a'),
    gallery: ['photo-1459411552884-841db9b3cc2a','photo-1448375240586-882707db888b','photo-1466692476868-aef1dfb1e735','photo-1518173946687-a4c8892bbd9f'].map(id=>UNSPLASH(id)),
    desc: { en: 'Tight-mat creeping juniper, blue-green needles, spreads to 2 m. The most-specified turf alternative in our line — replaces fescue at 5 % of the water budget.',
            ar: 'عرعر زاحف يفرش بصرامة حتى 2 م، أوراقه إبرية مزرقّة. بديل المسطح الأخضر الأكثر طلباً — يستهلك 5% فقط من ماء الفِسكيو.' },
  },
  {
    id: 'rosmarinus-officinalis',
    name: { en: 'Rosemary', ar: 'إكليل الجبل' },
    latin: 'Rosmarinus officinalis', cat: 'mediterranean',
    badge: { en: 'Aromatic', ar: 'عطري' },
    price: 0.90, unit: 'EUR', moq: 500,
    height: '15–25 cm', pot: '9 × 9 × 8 cm',
    climate: 'Mediterranean · Arid', water: 'Very low', sun: 'Full sun', age: '10–12 months',
    img: UNSPLASH('photo-1469474968028-56623f02e42e'),
    gallery: ['photo-1469474968028-56623f02e42e','photo-1416879595882-3373a0480b5b','photo-1466692476868-aef1dfb1e735','photo-1518173946687-a4c8892bbd9f'].map(id=>UNSPLASH(id)),
    desc: { en: 'Upright culinary-grade rosemary, hardened off in open field through a Yalova winter. Mass-planted for fragrance strips, herb walks and pollinator borders.',
            ar: 'إكليل جبل منتصب بدرجة طهي، مُهيّأ في الحقل المفتوح عبر شتاء يالوفا. للزراعة الكثيفة في ممرات العطر وحدائق الملقّحات.' },
  },
  {
    id: 'callistemon-laevis',
    name: { en: 'Bottlebrush', ar: 'كاليستيمون فرشاة' },
    latin: 'Callistemon laevis', cat: 'mediterranean', badge: null,
    price: 0.90, unit: 'EUR', moq: 300,
    height: '20–30 cm', pot: '9 × 9 × 8 cm',
    climate: 'Mediterranean · Hot', water: 'Low', sun: 'Full sun', age: '12–14 months',
    img: UNSPLASH('photo-1503614472-8c93d56e92ce'),
    gallery: ['photo-1503614472-8c93d56e92ce','photo-1499002238440-d264edd596ec','photo-1416879595882-3373a0480b5b','photo-1568084680786-a84f91d1153c'].map(id=>UNSPLASH(id)),
    desc: { en: 'Australian bottlebrush with bright red spring and autumn flowers — bird- and bee-magnet. Tolerates poor, alkaline and saline soils.',
            ar: 'كاليستيمون أسترالي بأزهار حمراء ربيعية وخريفية تجذب الطيور والنحل. يتحمّل التربة الفقيرة والقلوية والمالحة.' },
  },
]

// ─── 3. Supply projects ─────────────────────────────────────────────────────

const PROJECTS = [
  { id: 1, title: { en: "Lusail Boulevard — Photinia screening run", ar: "بوليفارد لوسيل — أسوار الفوتينيا" },
    loc: "Doha, Qatar", meta: ["38,400 Photinia 'Red Robin'", "9 containers · 2025", "Landscape contractor"],
    img: UNSPLASH('photo-1466692476868-aef1dfb1e735', 1200) },
  { id: 2, title: { en: "NEOM partner nursery — grow-on supply", ar: "مشتل شريك في نيوم — توريد للتربية" },
    loc: "Tabuk, KSA", meta: ["120,000 mixed liners", "Quarterly schedule", "Wholesale grower"],
    img: UNSPLASH('photo-1542273917363-3b1817f69a2d', 1200) },
  { id: 3, title: { en: "Italian Cypress avenue — grafted column run", ar: "جادة السرو الإيطالي المطعّم" },
    loc: "Sharm El-Sheikh, Egypt", meta: ["6,800 Cupressus 'Stricta' grafted", "Hospitality · 2025", "Resort group"],
    img: UNSPLASH('photo-1518173946687-a4c8892bbd9f', 1200) },
  { id: 4, title: { en: "Mediterranean palette — wadi restoration", ar: "لوحة متوسطية — إحياء الوديان" },
    loc: "Amman, Jordan", meta: ["Rosmarinus, Myrtus, Teucrium", "Public works · 2024", "Municipal tender"],
    img: UNSPLASH('photo-1416879595882-3373a0480b5b', 1200) },
]

// ─── 4. Blog posts ──────────────────────────────────────────────────────────

const BLOG_POSTS = [
  { id: 1, cat: 'field', read: 6, date: '2026-05-12',
    title: { en: 'Inside Block 4-B: how we field-acclimate 200,000 Photinia liners through a Yalova winter',
             ar: 'داخل قطاع 4-B: كيف نُهيّئ 200,000 شتلة فوتينيا في شتاء يالوفا' },
    excerpt: { en: 'Three transplant stages, two frost-burn lessons, one open-field winter — the exact protocol every Red Robin liner goes through before it ships south.',
               ar: 'ثلاث مراحل نقل، درسان من حرق الصقيع، وشتاء واحد في الحقل المفتوح — البروتوكول الذي تمر به كل شتلة ريد روبن قبل أن تتجه جنوباً.' },
    img: UNSPLASH('photo-1542273917363-3b1817f69a2d', 1100) },
  { id: 2, cat: 'trade', read: 4, date: '2026-05-05',
    title: { en: "A landscape contractor's container math: 38,400 Photinia liners, one boulevard",
             ar: 'حسابات مقاول التنسيق: 38,400 شتلة فوتينيا، شارع واحد' },
    excerpt: { en: 'Breakdown of a Lusail Boulevard supply run — pallet density, mixed-load tradeoffs, and the documentation that saves a week at Hamad Port customs.',
               ar: 'تحليل توريد بوليفارد لوسيل — كثافة المنصات، مقايضات الشحن المختلط، والوثائق التي توفر أسبوعاً في جمارك ميناء حمد.' },
    img: UNSPLASH('photo-1466692476868-aef1dfb1e735', 1100) },
  { id: 3, cat: 'specimens', read: 8, date: '2026-04-28',
    title: { en: "Cupressus 'Stricta' grafted vs seed-grown: why the rootstock matters",
             ar: "السرو 'سترِكتا' المطعّم مقابل البذري: لماذا الأصل يصنع الفرق" },
    excerpt: { en: 'Trunk uniformity, drift resistance, salt tolerance — a side-by-side decision matrix for landscape architects specifying Italian cypress in the Gulf.',
               ar: 'تجانس الجذع، مقاومة الانحراف، تحمّل الملوحة — مصفوفة قرار جنباً إلى جنب للمهندسين عند توصيف السرو الإيطالي في الخليج.' },
    img: UNSPLASH('photo-1518173946687-a4c8892bbd9f', 1100) },
  { id: 4, cat: 'climate', read: 5, date: '2026-04-18',
    title: { en: "What 'climate-adapted' actually means for a 25 cm liner (and what it doesn't)",
             ar: "ما الذي تعنيه عبارة 'مُكيّفة مناخياً' لشتلة 25 سم (وما لا تعنيه)" },
    excerpt: { en: 'An honest field note on why a Yalova winter is not the same as a Riyadh summer — and the first 90 days of post-arrival irrigation that close the gap.',
               ar: 'ملاحظة صريحة عن لماذا شتاء يالوفا لا يساوي صيف الرياض — وأول 90 يوماً من الري بعد الوصول يسدّون الفجوة.' },
    img: UNSPLASH('photo-1416879595882-3373a0480b5b', 1100) },
  { id: 5, cat: 'trade', read: 3, date: '2026-04-09',
    title: { en: 'New for 2026: weekly TIR service to Central Europe',
             ar: 'جديد 2026: خدمة TIR أسبوعية إلى وسط أوروبا' },
    excerpt: { en: 'Cutting 7–10 days off European deliveries with a dedicated road slot every Thursday from Yalova to Hamburg, Rotterdam and Munich.',
               ar: 'نقلص 7–10 أيام من زمن التسليم لأوروبا مع خانة شحن مخصصة كل خميس من يالوفا إلى هامبورغ وروتردام وميونخ.' },
    img: UNSPLASH('photo-1448375240586-882707db888b', 1100) },
  { id: 6, cat: 'specimens', read: 7, date: '2026-03-30',
    title: { en: 'Why we doubled Loropetalum production for 2026',
             ar: 'لماذا ضاعفنا إنتاج اللوروبيتالم لعام 2026' },
    excerpt: { en: "On dark foliage as a year-round design tool, the rise of 'Black Pearl', and the propagation challenges that almost stopped us scaling it.",
               ar: "عن الأوراق الداكنة بوصفها أداة تصميم على مدار العام، صعود 'بلاك بيرل'، وتحديات الإكثار التي كادت توقف توسيعنا." },
    img: UNSPLASH('photo-1614594975525-e45190c55d0b', 1100) },
]

// ─── 5. FAQ items ───────────────────────────────────────────────────────────

const FAQS = [
  { cat: 'ordering', q: { en: "What's the minimum order quantity?", ar: 'ما هو الحد الأدنى للطلب؟' },
    a: { en: 'MOQs are set per variety and are listed on every product page. Most liners start at 300–500 units per variety, premium grafted material at 100–200. You can mix 120+ varieties inside a single 40-ft container — only per-variety MOQ applies.',
         ar: 'الحد الأدنى محدد لكل صنف ومذكور على صفحته. معظم الشتلات تبدأ من 300–500 وحدة، والمواد المطعّمة المميزة من 100–200. يمكن خلط أكثر من 120 صنفاً في حاوية 40 قدم واحدة — يطبَّق الحد الأدنى للصنف فقط لا للحاوية.' } },
  { cat: 'ordering', q: { en: 'How quickly will I receive a quote?', ar: 'متى أستلم عرض السعر؟' },
    a: { en: 'Within one working day during business hours (Mon–Sat, 08:00–18:00 TRT). For urgent enquiries, WhatsApp our trade desk on +90 501 320 09 87 — we usually reply within an hour.',
         ar: 'خلال يوم عمل واحد (الإثنين–السبت، 08:00–18:00 بتوقيت تركيا). للطلبات العاجلة، تواصل عبر واتساب على +90 501 320 09 87 — نرد عادةً خلال ساعة.' } },
  { cat: 'ordering', q: { en: 'What are your payment terms?', ar: 'ما هي شروط الدفع؟' },
    a: { en: '50 % deposit on order confirmation, 50 % before container loading. We accept SWIFT in EUR. For first orders we may request a proforma invoice and bank reference; established trade partners can apply for net-30 terms.',
         ar: '50% عند تأكيد الطلب و50% قبل تحميل الحاوية. نقبل التحويل البنكي باليورو. للطلبات الجديدة قد نطلب فاتورة مبدئية ومرجعاً بنكياً، وللعملاء الدائمين يمكن التقديم لشروط دفع آجل 30 يوماً.' } },
  { cat: 'shipping', q: { en: 'Which ports do you ship to?', ar: 'إلى أي موانئ تشحنون؟' },
    a: { en: 'Weekly reefer / open-top departures via Mersin and Yalova ports to Jebel Ali (UAE), Dammam (KSA), Hamad Port (Qatar), Aqaba (Jordan), Alexandria (Egypt), Misrata (Libya), Beirut (Lebanon) and Latakia (Syria). Road haul to Europe via TIR also available.',
         ar: 'شحن أسبوعي عبر ميناءَي مرسين ويالوفا إلى جبل علي (الإمارات)، الدمام (السعودية)، ميناء حمد (قطر)، العقبة (الأردن)، الإسكندرية (مصر)، مصراتة (ليبيا)، بيروت (لبنان) واللاذقية (سوريا). الشحن البري لأوروبا عبر TIR متاح أيضاً.' } },
  { cat: 'shipping', q: { en: 'How long does shipping take?', ar: 'كم تستغرق مدة الشحن؟' },
    a: { en: 'From Yalova: 7–10 days to Gulf ports, 4–6 days to Levant ports, 10–14 days to North African ports, 3–5 days TIR to Central Europe. Add 7–14 days for in-stock preparation and 4–8 weeks for grow-to-order varieties.',
         ar: 'من يالوفا: 7–10 أيام لموانئ الخليج، 4–6 أيام للشام، 10–14 يوم لشمال أفريقيا، 3–5 أيام TIR إلى وسط أوروبا. أضف 7–14 يوم للتحضير و4–8 أسابيع للأصناف بحسب الطلب.' } },
  { cat: 'shipping', q: { en: 'Who handles customs clearance?', ar: 'من يتولى التخليص الجمركي؟' },
    a: { en: 'We ship CIF by default — Bitki Hub handles export documentation, phytosanitary certificates and EU plant passports. You handle import clearance at your destination port, with full document support from our customs team.',
         ar: 'نشحن بشروط CIF افتراضياً — نتولى وثائق التصدير والشهادات الصحية وجواز السفر النباتي الأوروبي. أنت تتولى التخليص في ميناء الوصول مع دعم وثائقي كامل من فريقنا.' } },
  { cat: 'specimens', q: { en: 'What pot sizes do you produce?', ar: 'ما هي أحجام الأوعية؟' },
    a: { en: 'Our standard production is 9 × 9 × 8 cm liners for shrubs and perennials, and 7 × 7 × 8 cm liners for grafted conifers and topiary. Larger sizes (P15, P20) available on advance request — typically 8–14 month lead time.',
         ar: 'إنتاجنا القياسي شتلات 9×9×8 سم للشجيرات والمعمرات، و7×7×8 سم للصنوبريات المطعّمة. الأحجام الأكبر (P15 وP20) متاحة بالحجز المسبق بمدة 8–14 شهراً.' } },
  { cat: 'specimens', q: { en: 'Are your varieties climate-adapted for the Gulf?', ar: 'هل الأصناف مهيأة لمناخ الخليج؟' },
    a: { en: 'We specifically curate species that thrive in arid and Mediterranean conditions — Photinia, Oleander, Lagerstroemia, Italian cypress, Juniperus, Callistemon and Rosmarinus all perform reliably in Gulf and Levant climates. Every liner is field-acclimated in Yalova through a full winter before export.',
         ar: 'نختار الأصناف التي تنجح في الظروف الجافة والمتوسطية — الفوتينيا، الدِفلى، كريب ميرتل، السرو الإيطالي، العرعر، الكاليستيمون وإكليل الجبل تثبت نجاحها في مناخ الخليج والشام. كل شتلة تتأقلم في حقولنا عبر شتاء يالوفا كاملاً قبل التصدير.' } },
  { cat: 'specimens', q: { en: 'Do you offer grow-to-order varieties?', ar: 'هل تقدمون أصنافاً بحسب الطلب؟' },
    a: { en: 'Yes. For projects requiring specific quantities of a variety not currently in volume, we can grow-to-order with 4–8 months lead time for soft-wood cuttings and 12–18 months for grafted material. Send your project brief.',
         ar: 'نعم. للمشاريع التي تتطلب كميات محددة من صنف غير متوفر بحجم كبير حالياً، يمكننا التربية بحسب الطلب بمدة 4–8 أشهر للعقل العشبية و12–18 شهراً للمطعّم. أرسل لنا تفاصيل المشروع.' } },
  { cat: 'specimens', q: { en: 'What certifications do your plants carry?', ar: 'ما هي شهادات النباتات؟' },
    a: { en: 'EU Plant Passport (every batch), Phytosanitary Certificate (issued per destination country), Global GAP, ISO 9001:2015, and full traceability tags. Documentation is sent ahead of shipment for pre-clearance.',
         ar: 'جواز السفر النباتي الأوروبي لكل دفعة، شهادة صحية لكل دولة وصول، شهادة Global GAP، شهادة ISO 9001:2015، وبطاقات تتبع كاملة. ترسل الوثائق قبل الشحن للتخليص المسبق.' } },
  { cat: 'after', q: { en: 'What is the survival guarantee?', ar: 'ما هو ضمان البقاء؟' },
    a: { en: 'We replace any liner that arrives dead-on-arrival, documented with photos within 7 days of container opening. For viability beyond that window, we work case-by-case — most issues are post-arrival handling, not liner condition.',
         ar: 'نستبدل أي شتلة تصل ميتة، بشرط توثيق بالصور خلال 7 أيام من فتح الحاوية. خارج هذه المدة نتعامل مع كل حالة على حدة — معظم المشاكل تخص مناولة ما بعد الوصول لا حالة الشتلة.' } },
  { cat: 'after', q: { en: 'Do you provide installation support?', ar: 'هل تقدمون الدعم الميداني؟' },
    a: { en: "We're a propagation nursery, not a landscape contractor — but we work closely with our partners' agronomy teams and can connect you with vetted grow-on nurseries and installation crews in most MENA capitals.",
         ar: 'نحن مشتل إكثار، لا مقاول تنسيق — لكننا نعمل مع فرق الزراعة لشركائنا ويمكننا توصيلك بمشاتل تربية وفرق تركيب موثوقة في معظم عواصم المنطقة.' } },
]

// ─── 6. Site content singleton ──────────────────────────────────────────────

const SITE_CONTENT = {
  _id:  'siteContent',
  _type: 'siteContent',
  heroEyebrow: { en: 'Yalova, Türkiye → Wholesale to MENA & EU', ar: 'يالوفا، تركيا ← جملة إلى الشرق الأوسط وأوروبا' },
  heroTitleA:  { en: 'Growing',  ar: 'نزرع' },
  heroTitleEm: { en: 'the future', ar: 'مستقبل' },
  heroTitleB:  { en: 'of greener cities.', ar: 'مدن أكثر اخضراراً.' },
  heroSub: {
    en: 'Wholesale young plants and grafted liners — Mediterranean ornamentals, conifers, hedge plants and flowering shrubs — propagated on our 40-hectare nursery in Yalova and shipped to landscape contractors and grow-on nurseries across the MENA region and Europe.',
    ar: 'شتلات جملة ونباتات مطعّمة — نباتات الزينة المتوسطية، الصنوبريات، الأسوار الخضراء والشجيرات المزهرة — نُكثّرها في مشتلنا في يالوفا على 40 هكتاراً ونصدّرها إلى مقاولي تنسيق الحدائق والمشاتل في منطقة الشرق الأوسط وأوروبا.',
  },
  heroStat1: { en: ['40 ha', 'Production area'],   ar: ['40 هكتار', 'مساحة الإنتاج'] },
  heroStat2: { en: ['120+', 'Varieties in stock'],  ar: ['120+', 'صنف متوفر'] },
  heroStat3: { en: ['18', 'Countries served'],      ar: ['18', 'دولة تصدير'] },
  sec1Eyebrow: { en: 'Catalogue', ar: 'الكتالوج' },
  sec1Title:   { en: 'A working stocklist, not a coffee-table book.', ar: 'قائمة عمل، لا كتاب زينة.' },
  sec1Sub: {
    en: "Every liner is field-acclimated through a full Yalova winter, packed by hand, and ready for road or container haul to the climate that's waiting on the other end.",
    ar: 'كل شتلة تتأقلم في حقولنا عبر شتاء يالوفا كاملاً، وتُعبَّأ يدوياً، وجاهزة للشحن إلى مناخها النهائي.',
  },
  sec2Eyebrow: { en: 'Why Bitki Hub', ar: 'لماذا Bitki Hub' },
  sec2Title:   { en: 'Built for landscape work at scale.', ar: 'مصمَّم لمشاريع التنسيق الكبيرة.' },
  statsTitle:  { en: 'Numbers we plant against.', ar: 'أرقام نقيس بها أنفسنا.' },
  stripItems: {
    en: ['Field-acclimated in Yalova', 'Phytosanitary certified', 'Weekly MENA & EU shipping', 'Mixed pallets accepted', 'Wholesale only'],
    ar: ['تأقلم حقلي في يالوفا', 'شهادة صحية', 'شحن أسبوعي', 'حاويات مختلطة', 'بيع جملة فقط'],
  },
  ctaTitle: { en: "Send us your project list and we'll quote the container.", ar: 'أرسل قائمة مشروعك، ونرسل لك عرض سعر للحاوية.' },
  ctaSub:   { en: 'Average response: under 24 hours, in English or Arabic.', ar: 'متوسط الرد: أقل من 24 ساعة، بالعربية أو الإنجليزية.' },
  footerTagline: {
    en: 'Wholesale young plants and grafted liners from Yalova, Türkiye — shipped across the MENA region and Europe.',
    ar: 'شتلات جملة ونباتات مطعّمة من يالوفا، تركيا — شحن إلى منطقة الشرق الأوسط وأوروبا.',
  },
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Bitki Hub → Sanity import\n')
  console.log(`Project: akpzc8he  Dataset: production\n`)

  // Categories
  console.log(`\nCategories (${CATEGORIES.length}):`)
  for (const [i, c] of CATEGORIES.entries()) {
    await upsert({
      _id:   `category-${c.id}`,
      _type: 'category',
      id:    c.id,
      order: i,
      name:  { en: c.en, ar: c.ar },
      blurb: c.blurb,
      imageUrl: c.img,
    })
  }

  // Liners
  console.log(`\nLiners (${PRODUCTS.length}):`)
  for (const [i, p] of PRODUCTS.entries()) {
    await upsert({
      _id:   `liner-${p.id}`,
      _type: 'liner',
      slug:  { _type: 'slug', current: p.id },
      order: i,
      name:  p.name,
      latin: p.latin,
      category: p.cat,
      badge: p.badge,
      price: p.price,
      priceUnit: p.unit,
      moq:   p.moq,
      height: p.height,
      potSize: p.pot,
      climate: p.climate,
      waterNeed: p.water,
      sunExposure: p.sun,
      age:   p.age,
      imageUrl: p.img,
      galleryUrls: p.gallery,
      description: p.desc,
    })
  }

  // Projects
  console.log(`\nProjects (${PROJECTS.length}):`)
  for (const [i, p] of PROJECTS.entries()) {
    await upsert({
      _id:   `project-${p.id}`,
      _type: 'supplyProject',
      order: i,
      title: p.title,
      location: p.loc,
      meta:  p.meta,
      imageUrl: p.img,
    })
  }

  // Blog posts
  console.log(`\nBlog posts (${BLOG_POSTS.length}):`)
  for (const p of BLOG_POSTS) {
    await upsert({
      _id:   `blog-${p.id}`,
      _type: 'blogPost',
      publishedAt: p.date,
      category: p.cat,
      readTime: p.read,
      title:   p.title,
      excerpt: p.excerpt,
      imageUrl: p.img,
    })
  }

  // FAQ items
  console.log(`\nFAQ items (${FAQS.length}):`)
  for (const [i, f] of FAQS.entries()) {
    await upsert({
      _id:      `faq-${f.cat}-${i}`,
      _type:    'faqItem',
      order:    i,
      category: f.cat,
      question: f.q,
      answer:   f.a,
    })
  }

  // Site content singleton
  console.log('\nSite content singleton:')
  await upsert(SITE_CONTENT)

  const total = CATEGORIES.length + PRODUCTS.length + PROJECTS.length + BLOG_POSTS.length + FAQS.length + 1
  console.log(`\n\n✓ Done — ${created} created, ${updated} updated, ${errors} errors  (${total} total documents)\n`)
}

main().catch(err => { console.error('\nFatal:', err.message); process.exit(1) })
