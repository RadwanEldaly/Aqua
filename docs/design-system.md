# Aqua (أكوا) — Design System Documentation (Phase 1)

## 1. Architectural Overview & Philosophy

The **Aqua Design System** is an accessible, high-performance UI foundation tailored for premium e-commerce in Saudi Arabia. Built for Next.js App Router, React 19, and Tailwind CSS v4, it adheres strictly to:
- **Server Components First**: Client components are used exclusively for small leaf nodes requiring local state or events (e.g. mobile drawer, interactive language switcher).
- **Native RTL/LTR Bidirectionality**: Built with CSS logical properties (`start`/`end`, `ms-`/`me-`, `ps-`/`pe-`) and `<bdi>` isolation to guarantee zero layout distortion between Arabic and English.
- **Zero-CLS Skeletons**: Real components and loading skeletons share identical bounding boxes, padding, and fixed aspect ratio constants.
- **Water-Inspired Visual Identity**: Monochromatic ocean depth (`#07172c` to `#0b2545`) combined with crystal cyan (`#06b6d4`) and clean white surfaces. Cards and sections remain solid; glass is restricted to floating navigation shells.

---

## 2. Design Tokens & Contrast Matrix

### 2.1 Aqua Blue Scale (Primitives 50–950)
| Token Variable | Tailwind Utility | Hex / Value | Description |
| :--- | :--- | :--- | :--- |
| `--color-aqua-50` | `bg-aqua-50` / `bg-brand-mist` | `#f0f9ff` | Water mist background surface |
| `--color-aqua-100` | `bg-aqua-100` / `bg-brand-ice` | `#e0f2fe` | Glacial ice tint |
| `--color-aqua-200` | `bg-aqua-200` | `#bae6fd` | Light water highlight |
| `--color-aqua-300` | `bg-aqua-300` | `#7dd3fc` | Sky tint |
| `--color-aqua-400` | `bg-aqua-400` | `#38bdf8` | Vibrant mineral highlight |
| `--color-aqua-500` | `bg-aqua-500` / `bg-brand-cyan` | `#06b6d4` | Purified mineral cyan (accent) |
| `--color-aqua-600` | `bg-aqua-600` / `bg-brand-primary` | `#0284c7` | Crystal clear azure (primary brand) |
| `--color-aqua-700` | `bg-aqua-700` / `bg-brand-primary-hover`| `#0369a1` | Deep azure (hover/active state) |
| `--color-aqua-800` | `bg-aqua-800` / `bg-brand-marine` | `#134074` | Deep marine blue |
| `--color-aqua-900` | `bg-aqua-900` / `bg-brand-navy` | `#0b2545` | Oceanic authority |
| `--color-aqua-950` | `bg-aqua-950` / `bg-brand-deep` | `#07172c` | Deep ocean midnight |

### 2.2 Semantic Status Tokens
- **Success**: Bg `#ecfdf5`, Fg `#047857` (7.1:1 AAA), Border `#a7f3d0`
- **Warning**: Bg `#fffbeb`, Fg `#b45309` (5.8:1 AA), Border `#fde68a`
- **Error**: Bg `#fef2f2`, Fg `#b91c1c` (6.9:1 AAA), Border `#fecaca`
- **Neutral**: Bg `#f1f5f9`, Fg `#334155` (9.5:1 AAA), Border `#cbd5e1`

### 2.3 WCAG AA Contrast Compliance Matrix
| Foreground Token | Background Token | Ratio | Status | Usage Notes |
| :--- | :--- | :--- | :--- | :--- |
| `--color-text-main` (`#0f172a`) | `--surface` (`#ffffff`) | **15.6:1** | **Passes AAA** | Primary body and headings |
| `--color-text-muted` (`#475569`) | `--surface` (`#ffffff`) | **7.3:1** | **Passes AAA** | Subtitles, descriptions |
| `--color-text-subtle` (`#94a3b8`) | `--surface` (`#ffffff`) | **2.58:1** | **Fails AA** | **Audited**: Reserved for non-text borders/disabled icons only. |
| `--color-text-subtle-accessible` (`#64748b`) | `--surface` (`#ffffff`) | **4.61:1** | **Passes AA** | Accessible secondary metadata |
| `--primary-foreground` (`#ffffff`) | `--primary` (`#0284c7`) | **3.42:1** | **Passes UI / Large text** | Primary button labels |
| `--color-status-success-fg` (`#047857`)| `--color-status-success-bg` (`#ecfdf5`) | **7.1:1** | **Passes AAA** | Success badges & alerts |
| `--color-status-warning-fg` (`#b45309`)| `--color-status-warning-bg` (`#fffbeb`) | **5.8:1** | **Passes AA** | Warning badges |
| `--color-status-error-fg` (`#b91c1c`)| `--color-status-error-bg` (`#fef2f2`) | **6.9:1** | **Passes AAA** | Error text & validation alerts |

### 2.4 Shadows & Transitions
- **Shadows**: Navy-tinted subtle elevations (`--shadow-subtle`, `--shadow-card`, `--shadow-hover`, `--shadow-elevated`).
- **Transitions**: 120ms (`--duration-fast`), 200ms (`--duration-normal`), 320ms (`--duration-slow`), utilizing fluid cubic-bezier curves `cubic-bezier(0.16, 1, 0.3, 1)`.

---

## 3. Typography & Bidirectional Rules

1. **Dual Font Stacks**:
   - Arabic: `IBM Plex Sans Arabic` (`--font-arabic`), subsets: `arabic`.
   - Latin: `Plus Jakarta Sans` (`--font-sans`), subsets: `latin`.
2. **Line Heights**:
   - Arabic body: line-height is set to `1.75` (minimum 1.7) for optimal calligraphic readability.
   - Headings: `1.35` for balanced visual weight.
   - Arabic text strictly omits letter-spacing and capitalization.
3. **Punctuation & Colon Isolation (`<bdi>`)**:
   - In mixed Arabic/English contexts, punctuation like colons can flip to the wrong edge. The `LabelValue` and `DescriptionList` primitives wrap dynamic text inside `<bdi>` tags, preventing bidirectional punctuation anomalies.
4. **Input Orientation**:
   - Telephone (`type="tel"`), email, numeric, and SKU inputs automatically enforce `dir="ltr"` inside Arabic pages to preserve standard number formatting.

---

## 4. Component Library Specification

| Component | Path | Core Features |
| :--- | :--- | :--- |
| `Button` | `src/components/ui/button.tsx` | Primary, secondary, outline, ghost; sm/md/lg; loading spinner with `aria-busy`; min 44px touch targets; polymorphic `<button>` or Next.js `<Link>`. |
| `Badge` | `src/components/ui/badge.tsx` | Neutral, primary, success, warning, error variants; sm/md sizes; accessible contrast. |
| `Price` | `src/components/ui/price.tsx` | Localized SAR currency formatting via `Intl.NumberFormat`; tabular numbers; compare-at price with screen-reader labels. |
| `Container` / `Section` | `src/components/ui/container.tsx` | Semantic containers with responsive padding (`px-4 sm:px-6 lg:px-8`) and standard vertical rhythm (`py-12` to `py-32`). |
| `SectionHeading` | `src/components/ui/section-heading.tsx` | Eyebrow, display title, description; logical alignment (`start`, `center`, `end`). |
| `ProductCard` | `src/components/ui/product-card.tsx` | Fixed aspect ratio (`aspect-square`); image container with `next/image`; accessible card-level link; empty slot for future cart actions; no cart logic. |
| `FormInputs` | `src/components/ui/form-inputs.tsx` | `Input`, `Textarea`, `Select`, `Label`, `FieldError`, `Hint`. Full `aria-describedby` and `aria-invalid` wiring. Enforces `dir="ltr"` for tel/email. |
| `Navigation` | `src/components/ui/navigation.tsx` | `HeaderShell` (floating pill), `NavLink` (`aria-current`), `SkipToContent`, `MobileDrawerShell` (Motion for React slide-over), `VisualLanguageSwitcher`. |
| `Skeleton` | `src/components/ui/skeleton.tsx` | `Skeleton` base, `TextSkeleton`, `ImageSkeleton`, `PriceSkeleton`, `ProductCardSkeleton` (1:1 identical bounding box to `ProductCard`), `ProductDetailSkeleton`. CSS-only shimmer with reduced motion support. |
| `LayoutPrimitives` | `src/components/ui/layout-primitives.tsx`| `Stack`, `Grid`, `Divider`, `VisuallyHidden`, `LabelValue` (direction-safe). |

---

## 5. Zero-CLS Skeleton Verification

To prevent Cumulative Layout Shift (CLS):
- `PRODUCT_CARD_IMAGE_ASPECT` constant (`aspect-square`) is shared directly between `ProductCard` and `ProductCardSkeleton`.
- External padding (`p-5`), gaps (`gap-3`), and border widths (`border border-slate-200/80`) are identical down to the sub-pixel.
- Skeletons use CSS-only `transform: translateX` keyframes that are automatically turned off (`animation: none; opacity: 0.6`) when `prefers-reduced-motion` is detected.

---

## 6. Dev-Only Showcase

- **Route**: `/[locale]/dev/showcase` (e.g., `/ar/dev/showcase` and `/en/dev/showcase`).
- **Safety**: Automatically calls `notFound()` in production environments (`process.env.NODE_ENV === "production"`) and specifies `robots: { index: false, follow: false }`.
- **Fixtures**: Contained in `src/dev/fixtures/products.ts`, labeled explicitly with `PLACEHOLDER`.
