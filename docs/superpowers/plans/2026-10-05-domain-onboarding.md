# Domain Onboarding Implementation Plan

A dedicated client intake page (`/domain-onboarding` and `/client-intake`) for the Domain Procurement, DNS Setup & SEO Foundations package (₹1.2k – ₹1.5k). Uses a zero-dependency, spam-proof `mailto:` submission flow, high-contrast confirmation card with one-click record copy and WhatsApp dispatch, and WHOIS security guarantees.

## User Review Required

> [!NOTE]
> No backend server or SMTP secrets needed. Form submissions directly generate a structured `mailto:loid@sednium.com` email payload and allow clients to copy their submission summary with one click.

---

## Proposed Changes

### 1. Remove Obsolete Backend
- **Delete [`api/intake.py`](file:///home/ankush/.gemini/antigravity/scratch/loid-portfolio/api/intake.py)**: Remove broken Python SMTP serverless endpoint.
- **Update [`README.md`](file:///home/ankush/.gemini/antigravity/scratch/loid-portfolio/README.md)**: Clean up references to Python backend.

### 2. Update Data Utilities & Options
- **Update [`src/utils/intake.ts`](file:///home/ankush/.gemini/antigravity/scratch/loid-portfolio/src/utils/intake.ts)**:
  - Add TLD options: `.in` (India exclusive), `.com` (Global reach), `.sednium.com` (Subdomain on sednium.com), `other` (Custom TLD like .org, .co, .io, .net), and `open` (Open to recommendations).
  - Format structured `mailto:` URL generator with pre-filled subject and human-readable body containing Ref ID, Client info, Domain specs, Hosting details, and SEO keywords.

### 3. Build Client Onboarding Page
- **Create [`src/pages/ClientIntake.tsx`](file:///home/ankush/.gemini/antigravity/scratch/loid-portfolio/src/pages/ClientIntake.tsx)**:
  - Header with `"← Back to Portfolio"` navigation and Theme toggle.
  - Package Badge: `Domain Procurement, DNS Setup & SEO Foundations (₹1.2k – ₹1.5k)`.
  - Reassuring WHOIS Verification Guarantee banner.
  - Section A: Client & WHOIS Registrant Identity.
  - Section B: Domain Specifications (with TLD picker including `.in`, `.com`, and `sednium.com` subdomain).
  - Section C: Website & Hosting Status.
  - Section D: Search Presence & SEO Foundations.
  - Submission handler: sets state to submitted, launches `mailto:`, and renders `IntakeSuccess`.

### 4. Routing & Navigation
- **Update [`src/main.tsx`](file:///home/ankush/.gemini/antigravity/scratch/loid-portfolio/src/main.tsx)**:
  - Handle `/domain-onboarding` and `/client-intake`.
  - Listen to `popstate` and provide client-side navigation back to `/`.
- **Update [`src/components/Footer.tsx`](file:///home/ankush/.gemini/antigravity/scratch/loid-portfolio/src/components/Footer.tsx)**:
  - Add subtle link to `/domain-onboarding` for client convenience.

### 5. Verification
- Run `npm run build` to verify type checking and Vite bundle build.
- Test routing and form validation.

---

## Verification Plan
- `npm run build` must exit 0 without any Rollup/Vite errors.
- Both `/domain-onboarding` and `/client-intake` route correctly.
- Form inputs validate required fields, domain names, 10-digit phone, and valid emails.
