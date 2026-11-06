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
      ar: "وحدة تنقية متعددة الأسطوانات مع خزان",
      en: "Multi-cylinder filtration unit with tank",
    },
    image: {
      src: "/images/products/under-sink-system-with-tank.jpg",
      width: 1080,
      height: 1113,
      alt: {
        ar: "وحدة تنقية متعددة الأسطوانات مع خزان أبيض وصنبور معدني منحني",
        en: "Multi-cylinder filtration unit with white cylindrical tank and curved metal faucet",
      },
    },
  },
  {
    id: "countertop-dispenser-silver",
    categoryId: "dispensers",
    name: {
      ar: "موزع مياه مكتبي فضي",
      en: "Silver tabletop water dispenser",
    },
    image: {
      src: "/images/products/countertop-dispenser-silver.jpg",
      width: 1080,
      height: 1238,
      alt: {
        ar: "موزع مياه مكتبي فضي مع ثلاثة صنابير وصينية تنقيط",
        en: "Silver tabletop water dispenser with three taps and drip tray",
      },
    },
  },
  {
    id: "countertop-dispenser-black",
    categoryId: "dispensers",
    name: {
      ar: "موزع مياه مكتبي أسود",
      en: "Black tabletop water dispenser",
    },
    image: {
      src: "/images/products/countertop-dispenser-black.jpg",
      width: 1080,
      height: 1290,
      alt: {
        ar: "موزع مياه مكتبي أسود مع ثلاثة صنابير وصينية تنقيط",
        en: "Black tabletop water dispenser with three taps and drip tray",
      },
    },
  },
  {
    id: "countertop-purifier-digital",
    categoryId: "dispensers",
    name: {
      ar: "جهاز تنقية مكتبي بشاشة رقمية",
      en: "Tabletop purifier with digital display",
    },
    image: {
      src: "/images/products/countertop-purifier-digital.jpg",
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
      ar: "وحدة تنقية ثلاثية بحامل معدني",
      en: "Triple-housing filtration unit on stand",
    },
    image: {
      src: "/images/products/triple-housing-filter-rack.jpg",
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
      ar: "وحدة تنقية ثلاثية بهيكل أبيض",
      en: "Triple-cylinder filtration unit on white frame",
    },
    image: {
      src: "/images/products/triple-housing-system-pump.jpg",
      width: 1080,
      height: 1065,
      alt: {
        ar: "ثلاث أسطوانات تنقية زرقاء رأسية داخل هيكل أبيض يعلوه جسم أسطواني أسود وتمديدات",
        en: "Three vertical blue filtration cylinders in white frame with black top cylinder and tubing",
      },
    },
  },
  {
    id: "triple-housing-system-gauge",
    categoryId: "filters",
    name: {
      ar: "وحدة تنقية ثلاثية بمقياس ضغط",
      en: "Triple-housing filtration unit with gauge",
    },
    image: {
      src: "/images/products/triple-housing-system-gauge.jpg",
      width: 1080,
      height: 1076,
      alt: {
        ar: "وحدة تنقية ثلاثية تضم أسطوانتين زرقاوين وأسطوانة شفافة مع مقياس ضغط",
        en: "Triple filtration unit with two blue cylinders and one transparent cylinder with gauge",
      },
    },
  },
  {
    id: "replacement-cartridges-trio",
    categoryId: "cartridges-and-parts",
    name: {
      ar: "طقم شمعات تنقية ثلاثي ملون",
      en: "Three-piece colored filter cartridge set",
    },
    image: {
      src: "/images/products/replacement-cartridges-trio.jpg",
      width: 1080,
      height: 1074,
      alt: {
        ar: "ثلاث شمعات تنقية أسطوانية رأسية بألوان أبيض وأزرق وبني جنباً إلى جنب",
        en: "Three vertical cylindrical filter cartridges in white, blue, and brown standing side by side",
      },
    },
  },
  {
    id: "replacement-cartridges-set",
    categoryId: "cartridges-and-parts",
    name: {
      ar: "طقم شمعات تنقية متعدد الألوان",
      en: "Multi-colored filter cartridge set",
    },
    image: {
      src: "/images/products/replacement-cartridges-set.jpg",
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
      ar: "خزان مياه أسطواني أبيض",
      en: "White cylindrical water tank",
    },
    image: {
      src: "/images/products/pressurized-storage-tank.jpg",
      width: 1600,
      height: 1398,
      alt: {
        ar: "خزان مياه أسطواني أبيض مع قاعدة وصمام علوي وملصق أزرق",
        en: "White cylindrical water tank with base, blue label, and top valve",
      },
    },
  },
  {
    id: "drinking-water-faucet",
    categoryId: "cartridges-and-parts",
    name: {
      ar: "صنبور مياه ستانلس ستيل منحني",
      en: "Curved stainless steel drinking faucet",
    },
    image: {
      src: "/images/products/drinking-water-faucet.jpg",
      width: 1080,
      height: 1074,
      alt: {
        ar: "صنبور مياه شرب منحني من الستانلس ستيل مع مقبض تحكم جانبي",
        en: "Curved stainless steel drinking water tap with side lever",
      },
    },
  },
] as const;
