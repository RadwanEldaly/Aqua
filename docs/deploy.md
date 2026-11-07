# Deployment Guide — AQUA Storefront

## 1. Overview
The AQUA Storefront is built on Next.js 16 (App Router) with full internationalization (`next-intl`), React 19, and Tailwind CSS. The project is fully pre-rendered with static optimization (SSG) across all locale variants (`/ar`, `/en`).

---

## 2. Environment Variables

Configure the following environment variables in your hosting environment (e.g., Vercel Project Settings > Environment Variables, or `.env.production`):

| Variable | Required | Description | Example |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | **Yes** | Canonical base URL used for sitemap generation, OpenGraph metadata, and canonical links. Omit trailing slash. | `https://aqua-sa.com` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | **Yes** | WhatsApp business phone number in international digits-only format (Saudi Arabia `9665xxxxxxxx`). When omitted, WhatsApp buttons automatically hide with zero layout shift. | `9665xxxxxxxx` |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | Optional | Default locale (defaults to `ar`). | `ar` |
| `NEXT_PUBLIC_DEFAULT_CURRENCY` | Optional | Default currency code (defaults to `SAR`). | `SAR` |

> [!IMPORTANT]
> Never commit real phone numbers, API keys, or credentials into version control. Set them strictly via environment variables.

---

## 3. Deploying to Vercel (Recommended)

1. **Connect Repository**: Import the Git repository in your Vercel Dashboard.
2. **Framework Preset**: Vercel automatically detects Next.js.
3. **Configure Environment Variables**:
   - Add `NEXT_PUBLIC_SITE_URL` = `https://your-domain.com`
   - Add `NEXT_PUBLIC_WHATSAPP_NUMBER` = `9665xxxxxxxx`
4. **Deploy**: Trigger a production deployment.
   - Vercel automatically sets `VERCEL_PROJECT_PRODUCTION_URL` if `NEXT_PUBLIC_SITE_URL` is omitted.
   - Production builds run: `next build`.

---

## 4. Self-Hosted Node.js / Docker Deployment

### Local / Server Build:
```bash
# 1. Install dependencies
npm ci

# 2. Build production assets
npm run build

# 3. Start production server
npm run start -- -p 3000
```

### Health & Route Verification Commands:
```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/
# Expected: 200

curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/products
# Expected: 200

curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/cart
# Expected: 200

curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/checkout
# Expected: 200

curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/contact
# Expected: 200

curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/about
# Expected: 404 (Gated until copy approved)
```

---

## 5. Post-Deployment Verification Checklist

1. [ ] **Metadata & Canonical**: Verify `curl -I https://your-domain.com/` returns 200 and `<link rel="canonical" href="https://your-domain.com/">` is present.
2. [ ] **Sitemap & Robots**: Inspect `https://your-domain.com/sitemap.xml` (lists `/`, `/products`, `/contact` with alternates) and `https://your-domain.com/robots.txt` (disallows `/dev`, `/cart`, `/checkout`).
3. [ ] **WhatsApp Ordering**: Place a test item in cart, proceed to `/checkout`, submit form with a Saudi number, and verify WhatsApp prefilled message opens correctly.
4. [ ] **Accessibility**: Lighthouse mobile Accessibility score is 100/100.
