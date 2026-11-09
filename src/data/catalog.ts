import type { Product } from "@/types/product";

export interface CatalogCategory {
  id: "all" | "packages" | "systems" | "dispensers" | "filters" | "accessories" | "commercial" | "shower";
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
    id: "systems",
    label: { ar: "أنظمة التحلية المنزلية", en: "Home RO Systems" },
  },
  {
    id: "dispensers",
    label: { ar: "برادات وموزعات المياه", en: "Water Dispensers & Coolers" },
  },
  {
    id: "filters",
    label: { ar: "فلاتر ومحطات جامبو", en: "Jumbo & Main Filters" },
  },
  {
    id: "commercial",
    label: { ar: "فلاتر المطاعم والكافيهات", en: "Restaurant & Cafe Filters" },
  },
  {
    id: "accessories",
    label: { ar: "قطع غيار وصيانة", en: "Spare Parts & Maintenance" },
  },
  {
    id: "shower",
    label: { ar: "فلاتر الدش", en: "Shower Filters" },
  },
] as const;

export const CATALOG_PRODUCTS: readonly Product[] = [
  // 1. Featured Package: بكج الأمان
  {
    id: "package-alaman",
    slug: "package-alaman",
    name: {
      ar: "بكج الأمان (خزان + فلتر 7 مراحل + برادة + حنفية فاخرة)",
      en: "Al-Aman Safety Package (Tank + 7-Stage Filter + Dispenser + Luxury Faucet)",
    },
    shortDescription: {
      ar: "شامل التركيب والضريبة - العرض الأقوى والشامل لحماية ونقاء مياه منزلك بالكامل مع برادة طاولة ذكية.",
      en: "Complete home water purification bundle with smart tabletop dispenser. Includes installation & VAT.",
    },
    fullDescription: {
      ar: "بكج الأمان المتكامل يوفر لك حلاً متكاملاً لنقاء مياه الشرب والطهي؛ يشمل جهاز تحلية 7 مراحل بنظام التناضح العكسي RO عالي الكفاءة، برادة مياه طاولة ذكية أنيقة، خزان ضغط صحي، وصنبور فاخر من الستانلس ستيل المقاوم للصدأ (شامل التركيب والضريبة).",
      en: "The complete Al-Aman package delivers pure drinking water for your home. Includes a 7-stage RO system, smart tabletop water dispenser, pressurized storage tank, and premium stainless steel faucet (includes installation & VAT).",
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
    category: "systems",
    badge: {
      ar: "العرض الأقوى - بكج الأمان",
      en: "Best Offer - Al-Aman Bundle",
    },
    isOffer: true,
    features: [
      { ar: "جهاز تحلية 7 مراحل بتقنية التناضح العكسي RO", en: "7-Stage RO purification system" },
      { ar: "برادة مياه طاولة ذكية 3 صنابير (بارد، فاتر، حار)", en: "Smart tabletop dispenser with 3 taps" },
      { ar: "خزان ضغط صحي سعة 15 لتر مقاوم للبكتيريا", en: "15L antibacterial pressurized tank" },
      { ar: "صنبور فاخر من الفولاذ المقاوم للصدأ 304", en: "Luxury 304 stainless steel faucet" },
      { ar: "شامل التركيب والضريبة وكافة الملحقات", en: "Includes installation, VAT, and all fittings" },
    ],
    packageIncludes: [
      { ar: "وحدة تنقية 7 مراحل متطورة", en: "7-stage advanced purifier unit" },
      { ar: "برادة طاولة عصرية", en: "Modern tabletop dispenser" },
      { ar: "خزان مياه صحي 15 لتر", en: "Sanitary 15L water tank" },
      { ar: "صنبور مياه شرب ستيل", en: "Steel drinking faucet" },
      { ar: "طقم محابس وتوصيلات كاملة", en: "Complete valve and fittings kit" },
    ],
    specs: [
      { id: "stages", label: { ar: "عدد المراحل", en: "Stages" }, value: { ar: "7 مراحل تنقية", en: "7 Stages" } },
      { id: "capacity", label: { ar: "الإنتاجية اليومية", en: "Daily Capacity" }, value: { ar: "حتى 280 لتر/يوم", en: "Up to 280 L/day" } },
      { id: "tank", label: { ar: "سعة الخزان", en: "Tank Capacity" }, value: { ar: "15 لتر", en: "15 L" } },
    ],
    inStock: true,
  },

  // 2. Featured Offer: جهاز تحلية Artec Pro ديجيتال
  {
    id: "artec-pro-digital",
    slug: "artec-pro-digital",
    name: {
      ar: "جهاز تحلية Artec Pro ديجيتال - 6 مراحل بدون خزان",
      en: "Artec Pro Digital 6-Stage Tankless RO Water Purifier",
    },
    shortDescription: {
      ar: "تركيب مجاني، ضمان سنتين، حتى 1600 لتر يومياً.",
      en: "Free installation, 2-year warranty, up to 1600L/day output.",
    },
    fullDescription: {
      ar: "جهاز تحلية Artec Pro ديجيتال الذكي بدون خزان يمثل قمة التكنولوجيا الحديثة لتنقية المياه المنزلية؛ يتميز بتصميم مدمج وأنيق يوضع فوق الرخام أو تحته بسهولة دون الحاجة لخزان خارجي، ويوفر تدفقاً مائياً فورياً بإنتاجية فائقة تصل إلى 1600 لتر يومياً مع شاشة رقمية توضح جودة المياه. (تركيب مجاني، ضمان سنتين).",
      en: "Artec Pro Digital Smart tankless water purifier delivers unmatched performance with an elegant space-saving design. Free installation, 2-year warranty, output up to 1600 L/day with real-time digital display.",
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
      { ar: "تركيب مجاني وضمان سنتين كاملتين", en: "Free installation and full 2-year warranty" },
      { ar: "قطع كهربائية أصلية عالية الكفاءة", en: "High efficiency original electrical components" },
    ],
    specs: [
      { id: "stages", label: { ar: "عدد المراحل", en: "Stages" }, value: { ar: "6 مراحل مدمجة", en: "6 Integrated Stages" } },
      { id: "capacity", label: { ar: "الإنتاجية", en: "Capacity" }, value: { ar: "1600 لتر/يومياً", en: "1600 L/day" } },
      { id: "screen", label: { ar: "نوع الشاشة", en: "Display" }, value: { ar: "شاشة ديجيتال تفاعلية", en: "Interactive Digital Screen" } },
      { id: "tankless", label: { ar: "نظام الخزان", en: "Tank System" }, value: { ar: "بدون خزان (تدفق مباشر)", en: "Tankless Direct Flow" } },
    ],
    inStock: true,
  },

  // 3. نظام التحلية المنزلي بيور نانو 7 مراحل مع خزان وصنبور
  {
    id: "classic-7stages-no-install",
    slug: "classic-7stages-no-install",
    name: {
      ar: "نظام التحلية المنزلي بيور نانو 7 مراحل مع خزان وصنبور",
      en: "Pure Nano 7-Stage Home RO System with Tank & Faucet",
    },
    shortDescription: {
      ar: "فلتر تنقية وتحلية مياه منزلي كلاسيك 7 مراحل بدون تركيب.",
      en: "Classic 7-stage home RO water purifier without installation.",
    },
    fullDescription: {
      ar: "فلتر كلاسيك 7 مراحل لتنقية وتحلية المياه المنزلية بتقنية التناضح العكسي RO، يوفر مياهاً نقية وصحية للشرب والطهي (سعر الجهاز بدون خدمة التركيب).",
      en: "Classic 7-stage home RO water purifier delivering fresh, pure water for drinking and cooking (device price without installation service).",
    },
    price: 499,
    currency: "SAR",
    images: ["/images/products/pure-7stages-complete.jpg"],
    thumbnailImage: "/images/products/pure-7stages-complete.jpg",
    category: "systems",
    badge: { ar: "سعر اقتصادي", en: "Economy" },
    features: [
      { ar: "7 مراحل تنقية متكاملة بالتناضح العكسي RO", en: "7-stage integrated RO purification" },
      { ar: "خزان حفظ مياه صحي وصنبور شرب", en: "Sanitary storage tank and drinking faucet" },
      { ar: "سعر الجهاز فقط بدون خدمة التركيب", en: "Device only price without installation service" },
    ],
    specs: [],
    inStock: true,
  },

  // 4. فلتر كلاسيك 7 مراحل (شامل التركيب والضمان)
  {
    id: "pure-7stages-complete",
    slug: "pure-7stages-complete",
    name: {
      ar: "فلتر كلاسيك 7 مراحل (شامل التركيب والضمان)",
      en: "Classic 7-Stage RO Filter (With Installation & Warranty)",
    },
    shortDescription: {
      ar: "نظام تحلية منزلي كلاسيك 7 مراحل شامل خدمة التركيب والضمان.",
      en: "Classic 7-stage home RO water purifier with installation and warranty included.",
    },
    fullDescription: {
      ar: "فلتر كلاسيك 7 مراحل يوفر مياهاً نقية تماماً خالية من الأملاح الزائدة والميكروبات والكلور، مزود بخزان ضغط صحي وحنفية ستيل ومرحلة لإضافة المعادن المفيدة للجسم (شامل التركيب والضمان).",
      en: "Complete 7-stage under-sink RO system providing crisp, pure drinking water with essential remineralization stage, sanitary tank, and stainless steel faucet (includes installation & warranty).",
    },
    price: 569,
    currency: "SAR",
    images: ["/images/products/pure-7stages-complete.jpg"],
    thumbnailImage: "/images/products/pure-7stages-complete.jpg",
    category: "systems",
    badge: { ar: "شامل التركيب والضمان", en: "Installed & Guaranteed" },
    features: [
      { ar: "7 مراحل تنقية تشمل التناضح العكسي والمعادن", en: "7 stages including RO and remineralization" },
      { ar: "خزان حفظ مياه صحي محكم الإغلاق", en: "Hygienic sealed storage tank" },
      { ar: "صنبور كروم فاخر للمجلى", en: "Luxury chrome sink faucet" },
      { ar: "شامل خدمة التركيب المعتمد والضمان", en: "Certified installation service and warranty included" },
    ],
    specs: [
      { id: "stages", label: { ar: "عدد المراحل", en: "Stages" }, value: { ar: "7 مراحل", en: "7 Stages" } },
      { id: "capacity", label: { ar: "الإنتاجية", en: "Capacity" }, value: { ar: "75 جالون/يومياً", en: "75 GPD" } },
    ],
    inStock: true,
  },

  // 5. Stand 7-Stage RO System
  {
    id: "stand-7stages-filter",
    slug: "stand-7stages-filter",
    name: {
      ar: "فلتر 7 مراحل + قاعدة + ساعة ضغط",
      en: "7-Stage Stand RO Filter + Base + Pressure Gauge",
    },
    shortDescription: {
      ar: "هيكل ستاند قوي وساعة ضغط متطورة لتنقية مياه منزلية احترافية.",
      en: "Heavy-duty stand-mounted 7-stage RO purifier with pressure gauge.",
    },
    fullDescription: {
      ar: "فلتر 7 مراحل مع قاعدة ستاند أرضية متينة وساعة قياس ضغط هيدروليكية ومضخة ضغط، تسهل وضعه على الأرضيات أو تحت المجلى وتضمن تدفقاً مستمراً ومياهاً نقية.",
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
      ar: "فلتر 9 مراحل + ساعة ضغط + خزان",
      en: "9-Stage Stand RO Filter + Pressure Gauge + Tank",
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

  // 7. فلتر جامبو ثلاثي لخزان المنزل الرئيسي (أكوا تاور 20 بوصة)
  {
    id: "jumbo-triple-rack",
    slug: "jumbo-triple-rack",
    name: {
      ar: "فلتر جامبو ثلاثي لخزان المنزل الرئيسي (أكوا تاور 20 بوصة)",
      en: "Jumbo 20-Inch Triple Housing Whole-House Filter (Aqua Tower)",
    },
    shortDescription: {
      ar: "تنقية المياه المركزية للخزانات العلوية لحماية شبكة السباكة والأجهزة.",
      en: "Whole-house central water filtration for rooftop tank supply and plumbing protection.",
    },
    fullDescription: {
      ar: "فلتر جامبو ثلاثي بمقاس 20 بوصة مصمم ليركب بعد الخزان العلوي أو العداد الرئيسي ليصفي كامل مياه المنزل من الأتربة والشوائب والصدأ والكلور لحماية الخلاطات وسخانات المياه والغسالات.",
      en: "High-capacity 20-inch triple jumbo rooftop tank filter installed after the main water tank or meter. Filters entire home water supply from rust, silt, sand, and chlorine.",
    },
    price: 1199,
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

  // 8. بكج التوفير: فلتر نانو سيلفر 7 مراحل + برادة بيور تاب سوداء
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
      ar: "بكج التوفير الذكي يجمع بين وحدة الفلترة الفائقة 7 مراحل بنظام التناضح العكسي، وبرادة طاولة بيور تاب سوداء فاخرة بثلاثة صنابير للمياه الباردة والحارة والمعتدلة.",
      en: "Smart combo offer combining the 7-stage RO filtration unit and the sleek Pure Tap black tabletop water dispenser.",
    },
    price: 1049,
    currency: "SAR",
    images: [
      "/images/offers/bundle-filter-dispenser.jpg",
      "/images/products/pure-7stages-complete.jpg",
      "/images/products/tabletop-dispenser-black.jpg",
    ],
    thumbnailImage: "/images/offers/bundle-filter-dispenser.jpg",
    category: "systems",
    badge: {
      ar: "عرض التوفير",
      en: "Special Bundle",
    },
    isOffer: true,
    features: [
      { ar: "فلتر تحلية 7 مراحل متكامل", en: "7-Stage RO purifier" },
      { ar: "برادة طاولة فاخرة بـ 3 صنابير (بارد، فاتر، حار)", en: "Tabletop dispenser with 3 taps" },
      { ar: "حنفية ستانلس ستيل فاخرة وخزان تخزين", en: "Stainless steel faucet & storage tank" },
      { ar: "فحص الجودة والمطابقة قبل التسليم", en: "Quality tested before dispatch" },
    ],
    specs: [
      { id: "stages", label: { ar: "مراحل الفلتر", en: "Stages" }, value: { ar: "7 مراحل RO", en: "7 RO Stages" } },
      { id: "dispenser", label: { ar: "نوع البرادة", en: "Dispenser" }, value: { ar: "طاولة 3 صنابير", en: "Tabletop 3 Taps" } },
    ],
    inStock: true,
  },

  // 9. برادة طاولة كلاسیك بیور نانو فضية - 3 صنابیر (بارد، فاتر، حار)
  {
    id: "tabletop-dispenser-silver",
    slug: "tabletop-dispenser-silver",
    name: {
      ar: "برادة طاولة كلاسیك بیور نانو فضية - 3 صنابیر (بارد، فاتر، حار)",
      en: "Classic Pure Nano Tabletop Water Dispenser - Silver 3 Taps (Cold, Normal, Hot)",
    },
    shortDescription: {
      ar: "برادة فضية متينة بثلاث صنابير تتصل مباشرة بجهاز التحلية بدون قوارير.",
      en: "Silver 3-tap dispenser connecting directly to water purifier without bottles.",
    },
    fullDescription: {
      ar: "برادة مياه كلاسيك بيور نانو الفضية ذاتية التعبئة تقدم تجربة مريحة وعملية، تتصل مباشرة بجهاز الفلتر لتمنحك مياهاً باردة وساخنة ومعتدلة في أي وقت دون عناء تعبئة وحمل القوارير الثقيلة.",
      en: "Classic Pure Nano silver self-refilling tabletop dispenser delivers continuous chilled, warm, and hot water. Directly hooked up to your filtration unit for zero-bottle hassle.",
    },
    price: 549,
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

  // 10. برادة طاولة کلاسیك بیور نانو سوداء فاخرة - 3 صنابير
  {
    id: "tabletop-dispenser-black",
    slug: "tabletop-dispenser-black",
    name: {
      ar: "برادة طاولة کلاسیك بیور نانو سوداء فاخرة - 3 صنابير",
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
    price: 549,
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

  // 11. برادة مياه طاولة فاخرة ديجيتال مع شاشة تحكم دائرية
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
    price: 1099,
    currency: "SAR",
    images: ["/images/products/digital-round-dispenser.jpg"],
    thumbnailImage: "/images/products/digital-round-dispenser.jpg",
    category: "dispensers",
    badge: { ar: "ديجيتال فاخر", en: "Premium Digital" },
    features: [
      { ar: "فلتر تنقية مدمج داخلي عالي الكفاءة", en: "High efficiency built-in internal filter" },
      { ar: "شاشة تحكم رقمية دائرية تعرض درجات الحرارة", en: "Circular digital display showing temperatures" },
      { ar: "صنابير مياه باردة وساخنة مع قفل أمان للأطفال", en: "Hot and cold taps with child safety lock" },
    ],
    specs: [
      { id: "type", label: { ar: "النوع", en: "Type" }, value: { ar: "برادة بفلتر مدمج", en: "Built-in Filter Dispenser" } },
      { id: "cooling", label: { ar: "التبريد", en: "Cooling" }, value: { ar: "كمبروسر تبريد سريع", en: "Rapid Compressor Cooling" } },
    ],
    inStock: true,
  },

  // 12. فلتر 800 لتر للمطاعم
  {
    id: "restaurant-filter-800l",
    slug: "restaurant-filter-800l",
    name: {
      ar: "فلتر 800 لتر للمطاعم",
      en: "800L Commercial Filter for Restaurants",
    },
    shortDescription: {
      ar: "مناسب للمطاعم والكافيهات.",
      en: "Suitable for restaurants and cafes.",
    },
    fullDescription: {
      ar: "فلتر 800 لتر للمطاعم، مناسب للمطاعم والكافيهات.",
      en: "800L commercial filter, suitable for restaurants and cafes.",
    },
    price: 2149,
    currency: "SAR",
    images: ["/images/products/restaurant-filter-800l.jpg"],
    thumbnailImage: "/images/products/restaurant-filter-800l.jpg",
    category: "commercial",
    badge: { ar: "للمطاعم والكافيهات", en: "Commercial" },
    specs: [],
    inStock: true,
  },

  // 13. فلتر خزان 1600 لتر للمطاعم
  {
    id: "restaurant-filter-1600l",
    slug: "restaurant-filter-1600l",
    name: {
      ar: "فلتر خزان 1600 لتر للمطاعم",
      en: "1600L Tank Commercial Filter for Restaurants",
    },
    shortDescription: {
      ar: "مناسب للمطاعم والكافيهات.",
      en: "Suitable for restaurants and cafes.",
    },
    fullDescription: {
      ar: "فلتر خزان 1600 لتر للمطاعم، مناسب للمطاعم والكافيهات.",
      en: "1600L tank commercial filter, suitable for restaurants and cafes.",
    },
    price: 3149,
    currency: "SAR",
    images: ["/images/products/restaurant-filter-1600l.jpg"],
    thumbnailImage: "/images/products/restaurant-filter-1600l.jpg",
    category: "commercial",
    badge: { ar: "للمطاعم والكافيهات", en: "Commercial" },
    specs: [],
    inStock: true,
  },

  // 14. خزان 15 لتر
  {
    id: "water-tank-19l",
    slug: "water-tank-19l",
    name: {
      ar: "خزان 15 لتر",
      en: "15L Pressurized Water Storage Tank",
    },
    shortDescription: {
      ar: "خزان صحي مغلق يحفظ نقاء المياه بسعة 15 لتر وبضغط هوائي قوي وتدفق سريع.",
      en: "Hygienic 15L sealed tank preserving pure water under steady pressure.",
    },
    fullDescription: {
      ar: "خزان مياه التحلية تانك لايف سعة 15 لتر مصنوع من مواد صحية مطابقة للمواصفات العالمية ومزود ببالون هواء داخلي يدفع المياه بقوة إلى الصنبور أو البرادة، ويحمي المياه من البكتيريا والملوثات الجوية.",
      en: "TankLife food-grade 15L pressurized storage tank ensures hygienic water storage and consistent tap pressure. FDA and NSF compliant materials.",
    },
    price: 149,
    currency: "SAR",
    images: ["/images/products/water-tank-19l.jpg"],
    thumbnailImage: "/images/products/water-tank-19l.jpg",
    category: "accessories",
    badge: { ar: "صحي وآمن", en: "Food Grade" },
    features: [
      { ar: "سعة 15 لتر لحفظ مخزون وافر من المياه النقية", en: "15L capacity ensures constant water backup" },
      { ar: "مبطن بمادة البولي بروبيلين الصحية المقاومة للروائح", en: "Food-grade polypropylene lining" },
    ],
    specs: [
      { id: "capacity", label: { ar: "السعة", en: "Capacity" }, value: { ar: "15 لتر", en: "15 L" } },
      { id: "material", label: { ar: "المادة", en: "Material" }, value: { ar: "فولاذ مبطن بالبلاستيك الغذائي", en: "Food-grade Lined Steel" } },
    ],
    inStock: true,
  },

  // 15. حنفية سوبر
  {
    id: "luxury-faucet-304",
    slug: "luxury-faucet-304",
    name: {
      ar: "حنفية سوبر",
      en: "Super Luxury Drinking Water Faucet 304",
    },
    shortDescription: {
      ar: "صنبور رقبة بجعة فخم مقاوم للصدأ بنسبة 100% مع قلب سيراميك متين.",
      en: "Gooseneck 304 stainless steel faucet with smooth ceramic cartridge.",
    },
    fullDescription: {
      ar: "صنبور مياه التحلية الفاخر المصنوع من الستانلس ستيل 304 الخالي من الرصاص يضمن سلامة مياه الشرب من أي ترسبات معدنية، ويتميز بعنق أوزة طويل يدور 360 درجة ومقبض سلس للإغلاق والفتح.",
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

  // 16. طقم فلاتر 4 شهور
  {
    id: "cartridges-3stages",
    slug: "cartridges-3stages",
    name: {
      ar: "طقم فلاتر 4 شهور",
      en: "4-Month Filter Cartridges Pack",
    },
    shortDescription: {
      ar: "طقم الصيانة الدورية للأشهر الأربعة الأولى لتصفية الرواسب والكلور.",
      en: "Essential 4-month routine service pack for sediment and chlorine removal.",
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
      { ar: "المراحل الأساسية الأولى لتغيير كل 3 إلى 4 أشهر", en: "Primary stages to replace every 3-4 months" },
      { ar: "حماية ممبرين التناضح العكسي وإطالة عمره", en: "Protects and extends RO membrane lifespan" },
    ],
    specs: [
      { id: "count", label: { ar: "العدد", en: "Count" }, value: { ar: "3 شمعات", en: "3 Cartridges" } },
      { id: "size", label: { ar: "المقاس", en: "Size" }, value: { ar: "10 بوصة قياسي", en: "10 Inch Standard" } },
    ],
    inStock: true,
  },

  // 17. طقم فلاتر سنتين
  {
    id: "cartridges-7stages",
    slug: "cartridges-7stages",
    name: {
      ar: "طقم فلاتر سنتين",
      en: "2-Year Complete Filter Cartridges Pack",
    },
    shortDescription: {
      ar: "طقم الشمعات الشامل لجميع أجهزة التحلية المنزلية لتجديد الفلتر بالكامل لمدة سنتين.",
      en: "Full replacement set including sediment, carbons, RO membrane and mineral stages.",
    },
    fullDescription: {
      ar: "طقم شمعات الـ 7 مراحل المتكامل يمنح جهازك تجديداً كاملاً؛ يشمل شمعة الشوائب PP، شمعة الكربون الحبيبي UDF، شمعة الكربون الصلب CTO، ممبرين التناضح العكسي عالي الكفاءة، شمعة البوست كربون، شمعة المعادن، وشمعة النانو.",
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

  // 18. 2 فلتر شاور (عرض)
  {
    id: "shower-filter-bundle",
    slug: "shower-filter-bundle",
    name: {
      ar: "2 فلتر شاور (عرض)",
      en: "Special 2x Filtered Shower Head Bundle",
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
    category: "shower",
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
] as const;

/**
 * Archived products preserved unchanged with their original prices and IDs.
 * Hidden from listings, search, related products, and sitemap until client confirms.
 */
export const ARCHIVED_PRODUCTS: readonly Product[] = [
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
    inStock: false,
  },
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
    inStock: false,
  },
] as const;

/**
 * Get product by ID or slug (only from active visible products)
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
