import type { Product } from "@/types/product";

export interface CatalogCategory {
  id: "all" | "packages" | "systems" | "dispensers" | "filters" | "accessories";
  label: {
    ar: string;
    en: string;
  };
  count?: number;
}

export const CATALOG_CATEGORIES: readonly CatalogCategory[] = [
  {
    id: "all",
    label: { ar: "جميع المنتجات", en: "All Products" },
  },
  {
    id: "packages",
    label: { ar: "العروض والبكجات", en: "Special Packages" },
  },
  {
    id: "systems",
    label: { ar: "أنظمة التحلية المنزلية", en: "Home RO Systems" },
  },
  {
    id: "dispensers",
    label: { ar: "برادات وموزعات المياه", en: "Water Dispensers" },
  },
  {
    id: "filters",
    label: { ar: "فلاتر ومحطات جامبو", en: "Jumbo & Main Filters" },
  },
  {
    id: "accessories",
    label: { ar: "شمعات وقطع غيار", en: "Cartridges & Spares" },
  },
] as const;

export const CATALOG_PRODUCTS: readonly Product[] = [
  // 1. Featured Package: بكج الأمان
  {
    id: "package-alaman",
    slug: "package-alaman",
    name: {
      ar: "بكج الأمان المتكامل (فلتر 7 مراحل + برادة + خزان + حنفية)",
      en: "Al-Aman Safety Package (7-Stage Filter + Dispenser + Tank + Faucet)",
    },
    shortDescription: {
      ar: "العرض الأقوى والشامل لحماية ونقاء مياه منزلك بالكامل مع برادة طاولة ذكية.",
      en: "Complete home water purification bundle with smart tabletop dispenser.",
    },
    fullDescription: {
      ar: "بكج الأمان المتكامل يوفر لك حلاً متكاملاً لنقاء مياه الشرب والطهي؛ يشمل جهاز تحلية 7 مراحل بنظام التناضح العكسي RO عالي الكفاءة، برادة مياه طاولة ذكية أنيقة، خزان ضغط صحي لحفظ المياه، وصنبور فاخر من الستانلس ستيل المقاوم للصدأ. ",
      en: "The complete Al-Aman package delivers pure drinking water for your home. Includes a 7-stage RO system, smart tabletop water dispenser, pressurized storage tank, and premium stainless steel faucet. ",
    },
    price: 1999,
    compareAtPrice: 2899,
    currency: "SAR",
    images: [
      "/images/offers/package-alaman.jpg",
      "/images/products/pure-7stages-complete.jpg",
      "/images/products/tabletop-dispenser-black.jpg",
    ],
    thumbnailImage: "/images/offers/package-alaman.jpg",
    category: "packages",
    badge: {
      ar: "العرض الأقوى - بكج الأمان",
      en: "Best Offer - Al-Aman Bundle",
    },
    isOffer: true,
    features: [
      { ar: "جهاز تحلية 7 مراحل بتقنية التناضح العكسي RO", en: "7-Stage RO purification system" },
      { ar: "برادة مياه طاولة ذكية 3 صنابير (بارد، فاتر، حار)", en: "Smart tabletop dispenser with 3 taps" },
      { ar: "خزان ضغط صحي سعة 19 لتر مقاوم للبكتيريا", en: "19L antibacterial pressurized tank" },
      { ar: "صنبور فاخر من الفولاذ المقاوم للصدأ 304", en: "Luxury 304 stainless steel faucet" },
      { ar: "شامل جميع الملحقات والتوصيلات الأساسية", en: "Includes all standard fittings and accessories" },
    ],
    packageIncludes: [
      { ar: "وحدة تنقية 7 مراحل متطورة", en: "7-stage advanced purifier unit" },
      { ar: "برادة طاولة عصرية", en: "Modern tabletop dispenser" },
      { ar: "خزان مياه تانك لايف 19 لتر", en: "TankLife 19L water tank" },
      { ar: "صنبور مياه شرب ستيل", en: "Steel drinking faucet" },
      { ar: "طقم محابس وتوصيلات كاملة", en: "Complete valve and fittings kit" },
    ],
    specs: [
      { id: "stages", label: { ar: "عدد المراحل", en: "Stages" }, value: { ar: "7 مراحل تنقية", en: "7 Stages" } },
      { id: "capacity", label: { ar: "الإنتاجية اليومية", en: "Daily Capacity" }, value: { ar: "حتى 280 لتر/يوم", en: "Up to 280 L/day" } },
      { id: "tank", label: { ar: "سعة الخزان", en: "Tank Capacity" }, value: { ar: "19 لتر (5 جالون)", en: "19 L (5 Gal)" } },
    ],
    inStock: true,
  },

  // 2. Featured Offer: جهاز ارتك برو ديجيتال
  {
    id: "artec-pro-digital",
    slug: "artec-pro-digital",
    name: {
      ar: "جهاز تحلية ارتك برو ديجيتال 6 مراحل مدمجة بدون خزان",
      en: "Artec Pro Digital 6-Stage Tankless RO Water Purifier",
    },
    shortDescription: {
      ar: "الفلتر الذكي المدمج بشاشة ديجيتال وإنتاجية فائقة تصل إلى 1600 لتر يومياً.",
      en: "Smart compact tankless purifier with digital display and up to 1600L/day output.",
    },
    fullDescription: {
      ar: "جهاز تحلية ارتك برو ديجيتال الذكي بدون خزان يمثل قمة التكنولوجيا الحديثة لتنقية المياه المنزلية؛ يتميز بتصميم مدمج وأنيق يوضع فوق الرخام أو تحته بسهولة دون الحاجة لخزان خارجي، ويوفر تدفقاً مائياً فورياً بإنتاجية فائقة تصل إلى 1600 لتر يومياً مع شاشة رقمية توضح جودة المياه ودرجة الحرارة.",
      en: "Artec Pro Digital Smart tankless water purifier delivers unmatched performance with an elegant space-saving design. Operates without an external tank, delivering fresh pure water up to 1600 L/day with real-time digital display.",
    },
    price: 1300,
    compareAtPrice: 1550,
    currency: "SAR",
    images: [
      "/images/offers/artec-pro-digital.jpg",
      "/images/products/countertop-purifier-digital.jpg",
    ],
    thumbnailImage: "/images/offers/artec-pro-digital.jpg",
    category: "systems",
    badge: {
      ar: "عرض خاص - الفلتر الذكي",
      en: "Special Offer - Smart Filter",
    },
    isOffer: true,
    features: [
      { ar: "تصميم مدمج بدون خزان يوفر مساحة المطبخ", en: "Compact tankless design saves kitchen space" },
      { ar: "شاشة رقمية ديجيتال ذكية لقياس نسبة الأملاح TDS", en: "Digital smart screen for TDS monitoring" },
      { ar: "إنتاجية فائقة تصل إلى 1600 لتر من المياه النقية يومياً", en: "Massive output up to 1600 liters per day" },
      { ar: "يزيل الشوائب والرواسب والكلور والأملاح الزائدة بنسبة 99%", en: "Removes 99% of sediments, chlorine and excess salts" },
      { ar: "قطع كهربائية أصلية", en: "Original electrical components" },
    ],
    specs: [
      { id: "stages", label: { ar: "عدد المراحل", en: "Stages" }, value: { ar: "6 مراحل مدمجة", en: "6 Integrated Stages" } },
      { id: "capacity", label: { ar: "الإنتاجية", en: "Capacity" }, value: { ar: "1600 لتر/يومياً", en: "1600 L/day" } },
      { id: "screen", label: { ar: "نوع الشاشة", en: "Display" }, value: { ar: "شاشة ديجيتال تفاعلية", en: "Interactive Digital Screen" } },
      { id: "tankless", label: { ar: "نظام الخزان", en: "Tank System" }, value: { ar: "بدون خزان (تدفق مباشر)", en: "Tankless Direct Flow" } },
    ],
    inStock: true,
  },

  // 3. Featured Offer: بكج دش الاستحمام المصفى 2x
  {
    id: "shower-filter-bundle",
    slug: "shower-filter-bundle",
    name: {
      ar: "عرض خاص 2x: دش استحمام مصفى لإزالة الكلور والأملاح",
      en: "Special 2x Bundle: Filtered Shower Head for Chlorine Removal",
    },
    shortDescription: {
      ar: "حبتين رأس دش نانو مصفى لحماية البشرة والشعر وتجربة شاور فاخرة.",
      en: "2x filtered shower heads for skin & hair protection and luxury shower experience.",
    },
    fullDescription: {
      ar: "احصل على حبتين من رأس دش الاستحمام المصفى بتقنية حبيبات النانو النشطة لتنقية المياه من الكلور الضار والشوائب والأملاح الزائدة، مما يمنحك شعراً صحياً ولامعاً وبشرة رطبة وناعمة مع زيادة ضغط الماء وتوفير الاستهلاك.",
      en: "Get 2x advanced filtered shower heads with active nano mineral beads that filter out chlorine, heavy metals and sediments. Enhances skin moisture and hair vitality while boosting water pressure.",
    },
    price: 99,
    compareAtPrice: 198,
    currency: "SAR",
    images: [
      "/images/offers/shower-filter-bundle.jpg",
    ],
    thumbnailImage: "/images/offers/shower-filter-bundle.jpg",
    category: "accessories",
    badge: {
      ar: "وفر 99 ريال - لفترة محدودة",
      en: "Save 99 SAR - Limited Time",
    },
    isOffer: true,
    features: [
      { ar: "عرض حبتين (2x) بسعر حبة واحدة", en: "2x heads for the price of one" },
      { ar: "إزالة الكلور والصدأ والشوائب الضارة", en: "Removes chlorine, rust and sediments" },
      { ar: "حبيبات معدنية لتغذية البشرة وتنعيم الشعر", en: "Mineral beads for skin hydration and soft hair" },
      { ar: "زيادة قوة تدفق المياه مع توفير 30% من الاستهلاك", en: "Increases water pressure while saving 30% water" },
      { ar: "سهل التركيب في دقيقة واحدة دون الحاجة لأدوات", en: "Easy 1-minute installation with no tools needed" },
    ],
    specs: [
      { id: "count", label: { ar: "العدد في البكج", en: "Quantity" }, value: { ar: "2 رأس دش مصفى", en: "2 Filtered Heads" } },
      { id: "filtration", label: { ar: "نوع الفلترة", en: "Filtration Type" }, value: { ar: "حبيبات أيونية ومعدنية نشطة", en: "Active Ionic Mineral Beads" } },
      { id: "compatibility", label: { ar: "التوافق", en: "Compatibility" }, value: { ar: "جميع ليات ومقابض الدش القياسية", en: "Universal Standard Hose Fit" } },
    ],
    inStock: true,
  },

  // 4. Featured Offer: بكج فلتر نانو سيلفر + برادة
  {
    id: "bundle-filter-dispenser",
    slug: "bundle-filter-dispenser",
    name: {
      ar: "بكج التوفير: فلتر نانو سيلفر 7 مراحل + برادة بيور تاب سوداء",
      en: "Economy Bundle: Pure Silver 7-Stage Purifier + Pure Tap Dispenser",
    },
    shortDescription: {
      ar: "طقم متكامل يجمع بين قوة التحلية السداسية والسباعية مع برادة أنيقة.",
      en: "Complete water bundle combining 7-stage RO purifier and tabletop dispenser.",
    },
    fullDescription: {
      ar: "بكج التوفير الذكي يجمع بين وحدة الفلترة الفائقة بيور نانو سيلفر 7 مراحل أمريكية الصنع، وبرادة طاولة بيور تاب الأنيقة بتصميم أسود عصري وصنابير ثلاثية للمياه الباردة والحارة والمعتدلة.",
      en: "Smart economy bundle combining the Pure Nano Silver 7-stage RO filtration unit and the sleek Pure Tap tabletop water dispenser in modern black.",
    },
    price: 1650,
    compareAtPrice: 2200,
    currency: "SAR",
    images: [
      "/images/offers/bundle-filter-dispenser.jpg",
      "/images/products/pure-7stages-complete.jpg",
      "/images/products/tabletop-dispenser-black.jpg",
    ],
    thumbnailImage: "/images/offers/bundle-filter-dispenser.jpg",
    category: "packages",
    badge: {
      ar: "عرض متكامل - وفر 550 ر.س",
      en: "Full Bundle - Save 550 SAR",
    },
    isOffer: true,
    features: [
      { ar: "فلتر نانو سيلفر 7 مراحل متكامل", en: "7-Stage Nano Silver purifier" },
      { ar: "برادة بيور تاب سوداء فاخرة بـ 3 صنابير", en: "Luxury black Pure Tap dispenser" },
      { ar: "حنفية ستانلس ستيل فاخرة وخزان تخزين", en: "Stainless steel faucet & storage tank" },
      { ar: "فحص الجودة والمطابقة قبل التسليم", en: "Quality tested before dispatch" },
    ],
    specs: [
      { id: "stages", label: { ar: "مراحل الفلتر", en: "Stages" }, value: { ar: "7 مراحل RO", en: "7 RO Stages" } },
      { id: "dispenser", label: { ar: "نوع البرادة", en: "Dispenser" }, value: { ar: "طاولة 3 صنابير", en: "Tabletop 3 Taps" } },
    ],
    inStock: true,
  },

  // 5. Stand 7-Stage RO System
  {
    id: "stand-7stages-filter",
    slug: "stand-7stages-filter",
    name: {
      ar: "نظام تنقية ستاند متطور 7 مراحل مع ساعة ضغط ومضخة",
      en: "Advanced 7-Stage Stand RO System with Gauge & Booster Pump",
    },
    shortDescription: {
      ar: "هيكل ستاند قوي وساعة ضغط متطورة لتنقية مياه منزلية احترافية.",
      en: "Heavy-duty stand-mounted 7-stage RO purifier with pressure gauge.",
    },
    fullDescription: {
      ar: "نظام تنقية ستاند متطور 7 مراحل مثبت على قاعدة حديدية قوية تسهل وضعه على الأرضيات أو تحت المجلى بدون الحاجة لتثبيت جداري، مزود بساعة قياس ضغط هيدروليكية ومضخة ضغط لضمان تدفق مستمر.",
      en: "Floor-standing 7-stage RO filtration system built on a heavy-duty powder-coated frame. Includes oil-filled pressure gauge and high-flow booster pump.",
    },
    price: 599,
    currency: "SAR",
    images: ["/images/products/stand-7stages-filter.jpg"],
    thumbnailImage: "/images/products/stand-7stages-filter.jpg",
    category: "systems",
    badge: { ar: "الأكثر متانة", en: "Heavy Duty" },
    features: [
      { ar: "قاعدة ستاند أرضية متينة مطلية ضد الصدأ", en: "Heavy-duty rustproof floor stand" },
      { ar: "مضخة ديناميكية قوية لرفع كفاءة التحلية", en: "Powerful booster pump for maximum efficiency" },
      { ar: "ساعة ضغط مدمجة لمراقبة أداء الفلتر بدقة", en: "Built-in pressure gauge for performance tracking" },
    ],
    specs: [
      { id: "stages", label: { ar: "المراحل", en: "Stages" }, value: { ar: "7 مراحل تنقية", en: "7 Stages" } },
      { id: "pump", label: { ar: "المضخة", en: "Pump" }, value: { ar: "مضخة بوستر 24 فولت", en: "24V Booster Pump" } },
      { id: "frame", label: { ar: "الهيكل", en: "Frame" }, value: { ar: "ستاند أرضي مقاوم للصدأ", en: "Rustproof Floor Stand" } },
    ],
    inStock: true,
  },

  // 6. Stand 9-Stage RO System with Gauge & Tank
  {
    id: "stand-9stages-filter",
    slug: "stand-9stages-filter",
    name: {
      ar: "فلتر 9 مراحل مع ساعة ضغط + خزان",
      en: "9-Stage RO Filter System with Pressure Gauge + Tank",
    },
    shortDescription: {
      ar: "نظام تنقية ستاند متطور 9 مراحل مع ساعة ضغط وخزان حفظ صحي.",
      en: "Advanced 9-stage RO filtration stand system with pressure gauge and tank.",
    },
    fullDescription: {
      ar: "فلتر تنقية وتحلية مياه متطور 9 مراحل مثبت على هيكل ستاند أرضي متين، مزود بساعة قياس ضغط لمتابعة كفاءة الضخ ومضخة قوية، بالإضافة إلى خزان حفظ مياه صحي وصنبور ستيل فاخر لضمان مياه شرب نقية وصحية بأعلى معايير الجودة.",
      en: "Advanced 9-stage stand RO water purification system on a heavy-duty frame. Features an integrated pressure gauge, booster pump, sanitary storage tank, and luxury drinking faucet for pure, healthy water.",
    },
    price: 699,
    currency: "SAR",
    images: ["/images/products/stand-9stages-filter.jpg"],
    thumbnailImage: "/images/products/stand-9stages-filter.jpg",
    category: "systems",
    badge: { ar: "9 مراحل متطورة", en: "9-Stage System" },
    features: [
      { ar: "9 مراحل تنقية متطورة تضمن إزالة الشوائب والأملاح وإضافة المعادن الصحية", en: "9 advanced purification stages ensuring pure, mineral-balanced water" },
      { ar: "ساعة قياس ضغط هيدروليكية لمراقبة كفاءة الفلتر بدقة", en: "Hydraulic pressure gauge for precise system monitoring" },
      { ar: "خزان ضغط صحي لحفظ المياه النقية وتوفير تدفق مستمر", en: "Sanitary pressurized tank for continuous fresh water supply" },
      { ar: "قاعدة ستاند أرضية قوية تسهل وضعه على الأرضيات أو تحت المجلى", en: "Durable floor stand frame for stable under-sink or floor placement" },
      { ar: "صنبور مياه شرب فاخر وتوصيلات متكاملة", en: "Luxury drinking faucet and complete installation fittings" },
    ],
    specs: [
      { id: "stages", label: { ar: "عدد المراحل", en: "Stages" }, value: { ar: "9 مراحل تنقية", en: "9 Stages" } },
      { id: "tank", label: { ar: "الخزان", en: "Tank" }, value: { ar: "خزان ضغط صحي مرفق", en: "Sanitary Tank Included" } },
      { id: "gauge", label: { ar: "ساعة الضغط", en: "Pressure Gauge" }, value: { ar: "ساعة قياس ضغط مدمجة", en: "Built-in Pressure Gauge" } },
      { id: "frame", label: { ar: "الهيكل", en: "Frame" }, value: { ar: "ستاند أرضي مقاوم للصدأ", en: "Rustproof Floor Stand" } },
    ],
    inStock: true,
  },

  // 6. Pure 7-Stage Under-sink Complete
  {
    id: "pure-7stages-complete",
    slug: "pure-7stages-complete",
    name: {
      ar: "نظام التحلية المنزلي بيور نانو 7 مراحل مع خزان وصنبور",
      en: "Pure Nano 7-Stage Under-Sink RO System with Tank & Faucet",
    },
    shortDescription: {
      ar: "نظام قياسي لمياه الشرب المنزلية النقية.",
      en: "Standard home RO drinking water system.",
    },
    fullDescription: {
      ar: "نظام التحلية المنزلي بيور نانو 7 مراحل يوفر مياهاً نقية تماماً خالية من الأملاح الزائدة والميكروبات والكلور، مزود بخزان ضغط صحي وحنفية ستيل ومرحلة لإضافة المعادن المفيدة للجسم.",
      en: "Complete 7-stage under-sink RO system providing crisp, pure drinking water with essential remineralization stage, sanitary tank, and stainless steel faucet.",
    },
    price: 850,
    compareAtPrice: 1100,
    currency: "SAR",
    images: ["/images/products/pure-7stages-complete.jpg"],
    thumbnailImage: "/images/products/pure-7stages-complete.jpg",
    category: "systems",
    badge: { ar: "الأكثر مبيعاً", en: "Best Seller" },
    features: [
      { ar: "7 مراحل تنقية تشمل التناضح العكسي والمعادن", en: "7 stages including RO and remineralization" },
      { ar: "خزان حفظ مياه صحي محكم الإغلاق", en: "Hygienic sealed storage tank" },
      { ar: "صنبور كروم فاخر للمجلى", en: "Luxury chrome sink faucet" },
    ],
    specs: [
      { id: "stages", label: { ar: "عدد المراحل", en: "Stages" }, value: { ar: "7 مراحل", en: "7 Stages" } },
      { id: "capacity", label: { ar: "الإنتاجية", en: "Capacity" }, value: { ar: "75 جالون/يومياً", en: "75 GPD" } },
    ],
    inStock: true,
  },

  // 7. Jumbo Triple Filter Rack (Aqua Tower)
  {
    id: "jumbo-triple-rack",
    slug: "jumbo-triple-rack",
    name: {
      ar: "فلتر جامبو ثلاثي لخزان المنزل الرئيسي (أكوا تاور 20 بوصة)",
      en: "Jumbo 20-Inch Triple Housing Whole-House Filter (Aqua Tower)",
    },
    shortDescription: {
      ar: "تنقية المياه المركزية للخزانات العلوية لحماية شبكة السباكة والأجهزة.",
      en: "Whole-house central water filtration for tank supply and plumbing protection.",
    },
    fullDescription: {
      ar: "فلتر جامبو ثلاثي بمقاس 20 بوصة مصمم ليركب بعد الخزان العلوي أو العداد الرئيسي ليصفي كامل مياه المنزل من الأتربة والشوائب والصدأ والكلور لحماية الخلاطات وسخانات المياه والغسالات.",
      en: "High-capacity 20-inch triple jumbo filter installed after the main water tank or meter. Filters entire home water supply from rust, silt, sand, and chlorine.",
    },
    price: 1450,
    compareAtPrice: 1800,
    currency: "SAR",
    images: ["/images/products/jumbo-triple-rack.jpg"],
    thumbnailImage: "/images/products/jumbo-triple-rack.jpg",
    category: "filters",
    badge: { ar: "تنقية مركزية", en: "Whole House" },
    features: [
      { ar: "3 أسطوانات زرقاء عملاقة 20 بوصة عالية التحمل", en: "3 heavy-duty 20-inch jumbo housings" },
      { ar: "حماية كامل شبكة المنزل والمواسير وسخانات المياه", en: "Protects plumbing, heaters and washing machines" },
      { ar: "ساعة ضغط مدمجة لمراقبة تدفق المياه والانسداد", en: "Built-in gauge for clogging detection" },
    ],
    specs: [
      { id: "size", label: { ar: "مقاس الأسطوانة", en: "Housing Size" }, value: { ar: "20 بوصة جامبو", en: "20 Inch Jumbo" } },
      { id: "inlet", label: { ar: "مقاس المداخل", en: "Inlet/Outlet" }, value: { ar: "1 بوصة نحاس", en: "1 Inch Brass" } },
    ],
    inStock: true,
  },

  // 8. Jumbo Triple White Station
  {
    id: "jumbo-triple-white",
    slug: "jumbo-triple-white",
    name: {
      ar: "محطة تنقية مركزية جامبو ثلاثية بهيكل حديدي أبيض كامل",
      en: "Whole-House Triple Jumbo Filtration Station with White Frame",
    },
    shortDescription: {
      ar: "محطة تنقية قوية بإطار حديدي مغلق لتنقية مياه الفلل والمباني.",
      en: "Enclosed metal frame triple filtration station for villas and buildings.",
    },
    fullDescription: {
      ar: "محطة جامبو ثلاثية متينة بإطار حديدي متين يضمن ثبات الفلاتر وحمايتها في أسطح المنازل، توفر تدفقاً عالياً للمياه مع تصفية فائقة من الرواسب والكلور والروائح.",
      en: "Heavy-duty triple jumbo filtration unit mounted on a powder-coated white stand, ideal for rooftop installations and high-flow villa water treatment.",
    },
    price: 1350,
    compareAtPrice: 1650,
    currency: "SAR",
    images: ["/images/products/jumbo-triple-white.jpg"],
    thumbnailImage: "/images/products/jumbo-triple-white.jpg",
    category: "filters",
    badge: { ar: "للفلل والمنازل", en: "For Villas" },
    features: [
      { ar: "هيكل حديدي مطلي ومقاوم للعوامل الجوية", en: "Weatherproof powder-coated metal frame" },
      { ar: "تدفق مياه عالي لا يقلل من ضغط شبكة المنزل", en: "High flow rate maintains house pressure" },
    ],
    specs: [
      { id: "size", label: { ar: "المقاس", en: "Size" }, value: { ar: "20 بوصة جامبو", en: "20 Inch Jumbo" } },
      { id: "stages", label: { ar: "المراحل", en: "Stages" }, value: { ar: "3 مراحل تنقية", en: "3 Stages" } },
    ],
    inStock: true,
  },

  // 9. Triple Housing Clear
  {
    id: "triple-housing-clear",
    slug: "triple-housing-clear",
    name: {
      ar: "فلتر تنقية مياه ثلاثي مسبق بأسطوانة شفافة للمعاينة",
      en: "Triple Stage Pre-Filter System with Transparent Inspection Housing",
    },
    shortDescription: {
      ar: "فلتر مسبق ثلاثي بأسطوانة أولى شفافة لمراقبة حالة الشمعة والشوائب.",
      en: "Triple pre-filter with transparent first stage for easy visual check.",
    },
    fullDescription: {
      ar: "فلتر تنقية مياه ثلاثي بأسطوانة أولى شفافة تسمح لك برؤية الشوائب العالقة ومعرفة وقت استبدال الشمعة بسهولة، مثالي للمطابخ والشقق كمرحلة تنقية أولية.",
      en: "3-stage pre-filtration unit featuring a transparent first chamber for instant visual inspection of filter saturation. Great for residential pre-filtration.",
    },
    price: 420,
    compareAtPrice: 550,
    currency: "SAR",
    images: ["/images/products/triple-housing-clear.jpg"],
    thumbnailImage: "/images/products/triple-housing-clear.jpg",
    category: "filters",
    badge: { ar: "سهل المراقبة", en: "Easy View" },
    features: [
      { ar: "أسطوانة شفافة لمعاينة الشمعة بدون فتح", en: "Clear housing for quick inspection" },
      { ar: "حجم مناسب يسهل تركيبه في أي مكان", en: "Compact size fits anywhere" },
    ],
    specs: [
      { id: "stages", label: { ar: "المراحل", en: "Stages" }, value: { ar: "3 مراحل", en: "3 Stages" } },
      { id: "size", label: { ar: "المقاس", en: "Size" }, value: { ar: "10 بوصة قياسي", en: "10 Inch Standard" } },
    ],
    inStock: true,
  },

  // 10. Digital Round Display Dispenser
  {
    id: "digital-round-dispenser",
    slug: "digital-round-dispenser",
    name: {
      ar: "برادة مياه طاولة فاخرة ديجيتال مع شاشة تحكم دائرية",
      en: "Luxury Digital Tabletop Water Dispenser with Circular Screen",
    },
    shortDescription: {
      ar: "برادة ذكية بتصميم بيانو أسود فخم وشاشة دائرية توضح درجات الحرارة.",
      en: "Smart piano-black tabletop dispenser with circular temperature display.",
    },
    fullDescription: {
      ar: "برادة مياه طاولة ديجيتال تجمع بين الفخامة والأداء العالي؛ تتيح لك الحصول الفوري على الماء البارد والساخن مع شاشة دائرية مضيئة توضح درجات الحرارة بدقة ونظام أمان للأطفال لصنبور الماء الساخن.",
      en: "Premium digital tabletop water dispenser featuring an ultra-modern circular LED display, child lock on hot water, and quiet rapid cooling compressor.",
    },
    price: 790,
    compareAtPrice: 990,
    currency: "SAR",
    images: ["/images/products/digital-round-dispenser.jpg"],
    thumbnailImage: "/images/products/digital-round-dispenser.jpg",
    category: "dispensers",
    badge: { ar: "ديجيتال فاخر", en: "Premium Digital" },
    features: [
      { ar: "شاشة تحكم رقمية دائرية تعرض درجات الحرارة", en: "Circular digital display showing temperatures" },
      { ar: "صنابير مياه باردة وساخنة مع قفل أمان للأطفال", en: "Hot and cold taps with child safety lock" },
      { ar: "توصيل مباشر بجهاز التحلية دون الحاجة لقوارير", en: "Direct connection to purifier — no bottles needed" },
    ],
    specs: [
      { id: "type", label: { ar: "النوع", en: "Type" }, value: { ar: "برادة طاولة ديجيتال", en: "Digital Tabletop" } },
      { id: "cooling", label: { ar: "التبريد", en: "Cooling" }, value: { ar: "كمبروسر تبريد سريع", en: "Rapid Compressor Cooling" } },
    ],
    inStock: true,
  },

  // 11. Silver Pure Nano Dispenser
  {
    id: "tabletop-dispenser-silver",
    slug: "tabletop-dispenser-silver",
    name: {
      ar: "برادة طاولة كلاسيك بيور نانو فضية - 3 صنابير (بارد، فاتر، حار)",
      en: "Classic Pure Nano Tabletop Water Dispenser - Silver 3 Taps",
    },
    shortDescription: {
      ar: "برادة فضية متينة بثلاث صنابير تتصل مباشرة بجهاز التحلية بدون قوارير.",
      en: "Silver 3-tap dispenser connecting directly to water purifier without bottles.",
    },
    fullDescription: {
      ar: "برادة مياه كلاسيك بيور نانو الفضية تقدم تجربة مريحة وعملية لكل منزل ومكتب، تتصل مباشرة بجهاز الفلتر لتمنحك مياهاً باردة وساخنة ومعتدلة في أي وقت دون عناء تعبئة وحمل القوارير الثقيلة.",
      en: "Classic Pure Nano silver tabletop dispenser delivers continuous chilled, warm, and hot water. Directly hooked up to your filtration unit for zero-bottle hassle.",
    },
    price: 620,
    compareAtPrice: 780,
    currency: "SAR",
    images: ["/images/products/tabletop-dispenser-silver.jpg"],
    thumbnailImage: "/images/products/tabletop-dispenser-silver.jpg",
    category: "dispensers",
    badge: { ar: "الأكثر طلباً", en: "Popular" },
    features: [
      { ar: "3 صنابير (بارد، فاتر، حار) لتلبية جميع الاستخدامات", en: "3 taps (cold, normal, hot) for all needs" },
      { ar: "توفير كامل لتكلفة ومساحة قوارير المياه", en: "Saves 100% bottle costs and floor space" },
      { ar: "خزان ستانلس ستيل صحي داخلي مضاد للبكتيريا", en: "Hygienic stainless steel internal tank" },
    ],
    specs: [
      { id: "taps", label: { ar: "الصنابير", en: "Taps" }, value: { ar: "3 صنابير منفصلة", en: "3 Separate Taps" } },
      { id: "color", label: { ar: "اللون", en: "Color" }, value: { ar: "فضي أنيق", en: "Elegant Silver" } },
    ],
    inStock: true,
  },

  // 12. Black Pure Nano Dispenser
  {
    id: "tabletop-dispenser-black",
    slug: "tabletop-dispenser-black",
    name: {
      ar: "برادة طاولة كلاسيك بيور نانو سوداء فاخرة - 3 صنابير",
      en: "Classic Pure Nano Tabletop Water Dispenser - Piano Black 3 Taps",
    },
    shortDescription: {
      ar: "لون أسود ملكي فخم يندمج بشكل رائع مع ديكورات المطابخ الحديثة.",
      en: "Royal piano black dispenser complementing modern kitchen aesthetics.",
    },
    fullDescription: {
      ar: "برادة بيور نانو باللون الأسود الملكي تتميز بجاذبية عصرية وقوة تبريد عالية وتوفير للطاقة، مع قفل أمان على صنبور الماء الحار لحماية الأطفال وتوصيل ذاتي بجهاز التحلية.",
      en: "Piano black Pure Nano tabletop dispenser combining modern design, energy efficiency, and instant hot and cold water with child safety lock.",
    },
    price: 640,
    compareAtPrice: 800,
    currency: "SAR",
    images: ["/images/products/tabletop-dispenser-black.jpg"],
    thumbnailImage: "/images/products/tabletop-dispenser-black.jpg",
    category: "dispensers",
    badge: { ar: "تصميم عصري", en: "Modern Design" },
    features: [
      { ar: "لون أسود ملكي مقاوم للخدوش والبصمات", en: "Scratch-resistant royal black finish" },
      { ar: "تبريد سريع وهادئ بدون ضوضاء", en: "Quiet rapid cooling compressor" },
      { ar: "توصيل مباشر وتعبئة ذاتية مستمرة", en: "Direct connection with auto-refill" },
    ],
    specs: [
      { id: "taps", label: { ar: "الصنابير", en: "Taps" }, value: { ar: "3 صنابير", en: "3 Taps" } },
      { id: "color", label: { ar: "اللون", en: "Color" }, value: { ar: "أسود ملكي", en: "Piano Black" } },
    ],
    inStock: true,
  },

  // 13. Pressurized Water Storage Tank 19L
  {
    id: "water-tank-19l",
    slug: "water-tank-19l",
    name: {
      ar: "خزان ضغط مياه التحلية سعة 19 لتر (تانك لايف)",
      en: "19L Pressurized RO Water Storage Tank (TankLife)",
    },
    shortDescription: {
      ar: "خزان صحي مغلق يحفظ نقاء المياه بضغط هوائي قوي وتدفق سريع.",
      en: "Hygienic sealed tank preserving pure water under steady pressure.",
    },
    fullDescription: {
      ar: "خزان مياه التحلية تانك لايف مصنوع من مواد صحية مطابقة للمواصفات العالمية ومزود ببالون هواء داخلي يدفع المياه بقوة إلى الصنبور أو البرادة، ويحمي المياه من البكتيريا والملوثات الجوية.",
      en: "TankLife food-grade pressurized storage tank ensures hygienic water storage and consistent tap pressure. FDA and NSF compliant materials.",
    },
    price: 149,
    currency: "SAR",
    images: ["/images/products/water-tank-19l.jpg"],
    thumbnailImage: "/images/products/water-tank-19l.jpg",
    category: "accessories",
    badge: { ar: "صحي وآمن", en: "Food Grade" },
    features: [
      { ar: "سعة 19 لتر لحفظ مخزون وافر من المياه النقية", en: "19L capacity ensures constant water backup" },
      { ar: "مبطن بمادة البولي بروبيلين الصحية المقاومة للروائح", en: "Food-grade polypropylene lining" },
    ],
    specs: [
      { id: "capacity", label: { ar: "السعة", en: "Capacity" }, value: { ar: "19 لتر (5 جالون)", en: "19 L (5 Gal)" } },
      { id: "material", label: { ar: "المادة", en: "Material" }, value: { ar: "فولاذ مبطن بالبلاستيك الغذائي", en: "Food-grade Lined Steel" } },
    ],
    inStock: true,
  },

  // 14. Luxury 304 Stainless Steel Faucet
  {
    id: "luxury-faucet-304",
    slug: "luxury-faucet-304",
    name: {
      ar: "صنبور مياه شرب فاخر من الفولاذ المقاوم للصدأ (ستانلس ستيل 304)",
      en: "Luxury 304 Stainless Steel Drinking Water Faucet",
    },
    shortDescription: {
      ar: "صنبور رقبة بجعة فخم مقاوم للصدأ بنسبة 100% مع قلب سيراميك متين.",
      en: "Gooseneck 304 stainless steel faucet with smooth ceramic cartridge.",
    },
    fullDescription: {
      ar: "صنبور مياه التحلية المصنوع من الستانلس ستيل 304 الخالي من الرصاص يضمن سلامة مياه الشرب من أي ترسبات معدنية، ويتميز بعنق أوزة طويل يدور 360 درجة ومقبض سلس للإغلاق والفتح.",
      en: "Lead-free 304 stainless steel drinking water faucet with 360-degree swivel spout and durable ceramic valve for smooth drip-free control.",
    },
    price: 89,
    currency: "SAR",
    images: ["/images/products/luxury-faucet-304.jpg"],
    thumbnailImage: "/images/products/luxury-faucet-304.jpg",
    category: "accessories",
    badge: { ar: "ستانلس 304", en: "SUS 304" },
    features: [
      { ar: "مصنوع بالكامل من الفولاذ 304 غير قابل للصدأ", en: "100% SUS 304 lead-free stainless steel" },
      { ar: "دوران 360 درجة لمرونة كاملة في الاستخدام", en: "360-degree swivel rotation" },
    ],
    specs: [
      { id: "material", label: { ar: "الخامة", en: "Material" }, value: { ar: "ستانلس ستيل 304 أصلي", en: "Genuine 304 Stainless Steel" } },
      { id: "valve", label: { ar: "القلب الداخلي", en: "Valve" }, value: { ar: "سيراميك عالي التحمل", en: "Heavy Duty Ceramic Disc" } },
    ],
    inStock: true,
  },

  // 15. Cartridges Set 7 Stages Full
  {
    id: "cartridges-7stages",
    slug: "cartridges-7stages",
    name: {
      ar: "طقم شمعات فلاتر سوبر برو متكامل (7 مراحل كاملة مع الممبرين)",
      en: "Super Pro Complete 7-Stage Filter Cartridges Set with RO Membrane",
    },
    shortDescription: {
      ar: "طقم الشمعات الشامل لجميع أجهزة التحلية المنزلية لتجديد الفلتر بالكامل.",
      en: "Full replacement set including sediment, carbons, RO membrane and mineral stages.",
    },
    fullDescription: {
      ar: "طقم شمعات سوبر برو الـ 7 مراحل المتكامل يمنح جهازك تجديداً كاملاً؛ يشمل شمعة الشوائب PP، شمعة الكربون الحبيبي UDF، شمعة الكربون الصلب CTO، ممبرين التناضح العكسي عالي الكفاءة، شمعة البوست كربون، شمعة المعادن، وشمعة النانو.",
      en: "Complete 7-stage filter cartridge replacement kit providing full renewal for home purifiers: PP sediment, UDF carbon, CTO block, high-rejection RO membrane, post carbon, mineralizer, and nano filter.",
    },
    price: 289,
    currency: "SAR",
    images: ["/images/products/cartridges-7stages.jpg"],
    thumbnailImage: "/images/products/cartridges-7stages.jpg",
    category: "accessories",
    badge: { ar: "طقم متكامل", en: "Full 7-Pack" },
    features: [
      { ar: "7 شمعات كاملة تشمل الممبرين والبوست كربون", en: "All 7 stages including RO membrane" },
      { ar: "متوافقة مع جميع أجهزة الفلترة المنزلية القياسية", en: "Universally fits all standard home purifiers" },
    ],
    specs: [
      { id: "count", label: { ar: "عدد الشمعات", en: "Count" }, value: { ar: "7 شمعات تنقية", en: "7 Cartridges" } },
    ],
    inStock: true,
  },

  // 16. Cartridges Set 3 Stages Basic
  {
    id: "cartridges-3stages",
    slug: "cartridges-3stages",
    name: {
      ar: "طقم شمعات فلاتر التحلية الأساسية (المراحل الثلاث الأولى: PP + UDF + CTO)",
      en: "Basic 3-Stage Filter Replacement Pack (PP + UDF + CTO)",
    },
    shortDescription: {
      ar: "طقم الصيانة الدورية للأشهر الستة الأولى لتصفية الرواسب والكلور.",
      en: "Essential 6-month routine service pack for sediment and chlorine removal.",
    },
    fullDescription: {
      ar: "طقم شمعات الفلترة الأولية يتكون من شمعة الشوائب القطنية PP بمسامية 5 ميكرون، شمعة الكربون المنشط UDF لامتصاص الكلور والروائح، وشمعة الكربون المسمط CTO لإزالة المركبات العضوية.",
      en: "Essential first-line replacement pack containing 5-micron PP sediment filter, granular activated carbon (UDF), and carbon block (CTO) for effective chlorine and taste removal.",
    },
    price: 89,
    currency: "SAR",
    images: ["/images/products/cartridges-3stages.jpg"],
    thumbnailImage: "/images/products/cartridges-3stages.jpg",
    category: "accessories",
    badge: { ar: "صيانة دورية", en: "Routine Care" },
    features: [
      { ar: "المراحل الأساسية الأولى لتغيير كل 3 إلى 6 أشهر", en: "Primary stages to replace every 3-6 months" },
      { ar: "حماية ممبرين التناضح العكسي وإطالة عمره", en: "Protects and extends RO membrane lifespan" },
    ],
    specs: [
      { id: "count", label: { ar: "العدد", en: "Count" }, value: { ar: "3 شمعات", en: "3 Cartridges" } },
      { id: "size", label: { ar: "المقاس", en: "Size" }, value: { ar: "10 بوصة قياسي", en: "10 Inch Standard" } },
    ],
    inStock: true,
  },
] as const;

/**
 * Get product by ID or slug
 */
export function getProductById(idOrSlug: string): Product | undefined {
  return CATALOG_PRODUCTS.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
}

/**
 * Get products by category
 */
export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return [...CATALOG_PRODUCTS];
  return CATALOG_PRODUCTS.filter((p) => p.category === category);
}

/**
 * Get all special offers and promotional packages
 */
export function getSpecialOffers(): Product[] {
  return CATALOG_PRODUCTS.filter((p) => p.isOffer);
}
