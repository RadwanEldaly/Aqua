# Client Needs & Handover Checklist — AQUA Storefront

This document details all remaining client assets, content approvals, and operational configurations required for final launch.

---

## 1. High-Priority Brand Assets

### Transparent Logo File
- **Current State**: Storefront displays crisp typographic text wordmark **أكوا** (Arabic) and **AQUA** (English) in the header and footer pills.
- **Client Need**:
  - Transparent vector SVG or high-resolution PNG (minimum 600px width with transparent background).
  - **Important Brand Note**: Existing legacy assets in the `LOGO/` folder read *"AQUA GUARD"* on an opaque underwater photo background. The approved storefront brand name is **أكوا / AQUA**. If the brand is to remain "أكوا", provide the matching transparent logo; if it is to be "أكوا جارد / AQUA GUARD", confirm the official naming across all messaging.

---

## 2. Content Approvals

### About Us Page Copy (`/about`)
- **Current State**: The `/about` route is deliberately deactivated and returns HTTP 404 (`notFound()`), removed from the header navigation, footer links, and sitemap to prevent unapproved placeholder claims from being indexed.
- **Client Need**: Approved Arabic and English copy for the brand story, mission, and company background.
- **One-Line Restoration**:
  Once copy is provided, restore the page by removing line 28 (`notFound();`) in `src/app/[locale]/about/page.tsx` and adding `{ href: "/about", label: tNav("about") }` to `site-header.tsx` and `site-footer.tsx`.

### Business Contact Details (`/contact`)
- **Current State**: Contact page provides a direct WhatsApp inquiry button and a prefilled message form that opens WhatsApp. Physical showroom address, operating hours, and email are omitted.
- **Client Need**:
  - Official commercial registration address or showroom locations (city, district, street).
  - Working hours and days (e.g., Saturday - Thursday, 9 AM - 10 PM).
  - Official support email address.

### Product Pricing & Specifications Confirmation
- **Current State**: Product catalog features provisional items with optional pricing and Cash-on-Delivery (COD). Cart totals appear strictly when all items in the cart have a valid price.
- **Client Need**:
  - Final price confirmations for all products and filter packages.
  - Confirmation of any discontinued items or additional stock units.

---

## 3. Operational Credentials (Hosting)

| Item | Environment Variable | Action Required |
| :--- | :--- | :--- |
| **WhatsApp Business Number** | `NEXT_PUBLIC_WHATSAPP_NUMBER` | Provide active WhatsApp Business number in international format `9665xxxxxxxx`. Configure directly in Vercel settings. |
| **Production Domain URL** | `NEXT_PUBLIC_SITE_URL` | Add custom production domain (e.g., `https://aqua-sa.com`) in Vercel domains and set environment variable. |

---

## 4. Policy & Compliance Summary

In accordance with strict brand integrity rules, the storefront currently contains:
- **NO** unverified warranty claims.
- **NO** unverified "free installation" or "free delivery" claims.
- **NO** fake testimonials, statistics, or invented star ratings.
- **NO** unverified certification badges.
- **NO** phone numbers hardcoded in source files.
