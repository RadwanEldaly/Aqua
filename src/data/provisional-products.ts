/**
 * PROVISIONAL, to be replaced by the real catalog.
 *
 * Single source of truth for provisional product data.
 *
 * STRICT CATALOG RULES:
 * - Clean cutout photography only.
 * - Names describe strictly what is visibly in each photograph.
 * - Zero prices, currency symbols, stage counts, capacities, model numbers, or brand names.
 * - Zero claims (no "RO", "smart", "jumbo", "commercial").
 */

export interface ProductCategory {
  id: string;
  label: {
    ar: string;
    en: string;
  };
}

export interface ProvisionalProduct {
  id: string;
  categoryId: string;
  name: {
    ar: string;
    en: string;
  };
  image: {
    src: string;
    width: number;
    height: number;
    alt: {
      ar: string;
      en: string;
    };
  };
}

export const PROVISIONAL_CATEGORIES: readonly ProductCategory[] = [
  {
    id: "all",
    label: {
      ar: "الكل",
      en: "All",
    },
  },
  {
    id: "home-systems",
    label: {
      ar: "أنظمة منزلية",
      en: "Home Systems",
    },
  },
  {
    id: "dispensers",
    label: {
      ar: "برادات وموزعات",
      en: "Dispensers",
    },
  },
  {
    id: "filters",
    label: {
      ar: "فلاتر",
      en: "Filters",
    },
  },
  {
    id: "cartridges-and-parts",
    label: {
      ar: "شمعات وقطع غيار",
      en: "Cartridges & Parts",
    },
  },
] as const;

export const PROVISIONAL_PRODUCTS: readonly ProvisionalProduct[] = [
  {
    id: "under-sink-system-with-tank",
    categoryId: "home-systems",
    name: {
      ar: "وحدة تنقية مياه متعددة الأسطوانات مع خزان أبيض وصنبور",
      en: "Multi-cylinder water filtration unit with white tank and faucet",
    },
    image: {
      src: "/images/products/under-sink-system-with-tank-whitened.jpg",
      width: 1080,
      height: 1113,
      alt: {
        ar: "أسطوانات تنقية رأسية مع خزان أسطواني أبيض وصنبور معدني منحني",
        en: "Vertical filtration cylinders with white cylindrical tank and curved metal faucet",
      },
    },
  },
  {
    id: "countertop-dispenser-silver",
    categoryId: "dispensers",
    name: {
      ar: "موزع مياه مكتبي باللون الفضي مع ثلاثة صنابير",
      en: "Tabletop water dispenser in silver with three taps",
    },
    image: {
      src: "/images/products/countertop-dispenser-silver-whitened.jpg",
      width: 1080,
      height: 1238,
      alt: {
        ar: "موزع مياه مكتبي فضي مع صينية تنقيط وثلاثة صنابير",
        en: "Silver tabletop water dispenser with drip tray and three taps",
      },
    },
  },
  {
    id: "countertop-dispenser-black",
    categoryId: "dispensers",
    name: {
      ar: "موزع مياه مكتبي باللون الأسود مع ثلاثة صنابير",
      en: "Tabletop water dispenser in black with three taps",
    },
    image: {
      src: "/images/products/countertop-dispenser-black-whitened.jpg",
      width: 1080,
      height: 1290,
      alt: {
        ar: "موزع مياه مكتبي أسود مع صينية تنقيط وثلاثة صنابير",
        en: "Black tabletop water dispenser with drip tray and three taps",
      },
    },
  },
  {
    id: "countertop-purifier-digital",
    categoryId: "dispensers",
    name: {
      ar: "جهاز تنقية مياه مكتبي باللون الأسود مع شاشة رقمية",
      en: "Countertop water purifier in black with digital display",
    },
    image: {
      src: "/images/products/countertop-purifier-digital-whitened.jpg",
      width: 1080,
      height: 1069,
      alt: {
        ar: "جهاز تنقية مياه مكتبي أسود مع شاشة دائرية وصنبورين",
        en: "Black countertop water purifier with circular display screen and dual taps",
      },
    },
  },
  {
    id: "triple-housing-filter-rack",
    categoryId: "filters",
    name: {
      ar: "وحدة تنقية مياه ثلاثية على حامل معدني مع مقياس ضغط",
      en: "Triple-housing filtration unit on metal stand with pressure gauge",
    },
    image: {
      src: "/images/products/triple-housing-filter-rack-whitened.jpg",
      width: 1080,
      height: 1080,
      alt: {
        ar: "ثلاث أسطوانات تنقية زرقاء على حامل معدني مع مقياس ضغط علوي",
        en: "Three blue filtration cylinders on standing metal rack with top pressure gauge",
      },
    },
  },
  {
    id: "triple-housing-system-pump",
    categoryId: "filters",
    name: {
      ar: "وحدة تنقية ثلاثية الأسطوانات الزرقاء على هيكل أبيض مع أسطوانة أفقية سوداء وتمديدات علوية",
      en: "Triple blue cylinder filtration unit on white frame with black horizontal top cylinder and tubing",
    },
    image: {
      src: "/images/products/triple-housing-system-pump-whitened.jpg",
      width: 1080,
      height: 1065,
      alt: {
        ar: "ثلاث أسطوانات تنقية زرقاء رأسية مثبتة داخل هيكل أبيض يعلوه جسم أسطواني أسود وتمديدات بيضاء",
        en: "Three vertical blue filtration cylinders in a white frame topped by a black cylinder and white tubing",
      },
    },
  },
  {
    id: "triple-housing-system-gauge",
    categoryId: "filters",
    name: {
      ar: "وحدة تنقية ثلاثية مع أسطوانة شفافة ومقياس ضغط",
      en: "Triple-housing filtration unit with clear cylinder and pressure gauge",
    },
    image: {
      src: "/images/products/triple-housing-system-gauge-whitened.jpg",
      width: 1080,
      height: 1076,
      alt: {
        ar: "وحدة تنقية ثلاثية تضم أسطوانتين زرقاوين وأسطوانة شفافة على حامل",
        en: "Triple filtration unit with two blue cylinders and one transparent cylinder on stand",
      },
    },
  },
  {
    id: "replacement-cartridges-trio",
    categoryId: "cartridges-and-parts",
    name: {
      ar: "طقم شمعات تنقية أسطوانية ثلاثي بألوان أبيض وأزرق وبني",
      en: "Three-piece cylindrical filter cartridge set in white, blue, and brown",
    },
    image: {
      src: "/images/products/replacement-cartridges-trio-whitened.jpg",
      width: 1080,
      height: 1074,
      alt: {
        ar: "ثلاث شمعات تنقية أسطوانية رأسية بألوان أبيض وأزرق وبني موضوعة جنباً إلى جنب",
        en: "Three vertical cylindrical filter cartridges in white, blue, and brown standing side by side",
      },
    },
  },
  {
    id: "replacement-cartridges-set",
    categoryId: "cartridges-and-parts",
    name: {
      ar: "مجموعة شمعات تنقية أسطوانية متعددة الألوان مرتبة في صف واحد",
      en: "Multi-colored cylindrical filter cartridges arranged in a single row",
    },
    image: {
      src: "/images/products/replacement-cartridges-set-whitened.jpg",
      width: 1600,
      height: 822,
      alt: {
        ar: "سبع شمعات تنقية أسطوانية بألوان متعددة مصطفة أفقياً جنباً إلى جنب",
        en: "Seven multi-colored cylindrical filter cartridges lined up horizontally side by side",
      },
    },
  },
  {
    id: "pressurized-storage-tank",
    categoryId: "cartridges-and-parts",
    name: {
      ar: "خزان مياه أسطواني باللون الأبيض مع قاعدة وصمام علوي",
      en: "White cylindrical water tank with base and top valve",
    },
    image: {
      src: "/images/products/pressurized-storage-tank-whitened.jpg",
      width: 1600,
      height: 1398,
      alt: {
        ar: "خزان مياه أسطواني أبيض مع ملصق أزرق وصمام علوي",
        en: "White cylindrical water tank with blue label and top valve",
      },
    },
  },
  {
    id: "drinking-water-faucet",
    categoryId: "cartridges-and-parts",
    name: {
      ar: "صنبور مياه شرب من الستانلس ستيل بتصميم منحني",
      en: "Stainless steel gooseneck drinking water faucet",
    },
    image: {
      src: "/images/products/drinking-water-faucet-whitened.jpg",
      width: 1080,
      height: 1074,
      alt: {
        ar: "صنبور مياه شرب منحني من الستانلس ستيل مع مقبض تحكم جانبي",
        en: "Curved stainless steel drinking water tap with side lever",
      },
    },
  },
] as const;
