# Løid — Ankush Das · CTO & Systems Architect Portfolio

Official high-performance executive portfolio of **Ankush Das (Løid)**, Co-Founder & Chief Technology Officer at **Sednium Technologies**.

> **Live site:** [https://loid.sednium.com/](https://loid.sednium.com/)  
> **Repository:** [github.com/AnkushDas4/Loid](https://github.com/AnkushDas4/Loid)

A modern, single-page portfolio built with **React 19 + TypeScript + Vite**, featuring a custom glassmorphism design system, interactive animations, a direct contact workflow, and a full **SEO & AI-discovery layer**.

---

## 📖 Table of Contents

- [✨ Highlights](#-highlights)
- [📦 Flagship Projects](#-flagship-projects)
- [🧰 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [📜 Available Scripts](#-available-scripts)
- [🔌 Contact API](#-contact-api)
- [🤖 SEO & AI Discovery](#-seo--ai-discovery)
- [🌐 Deployment](#-deployment)
- [♿ Accessibility & Performance](#-accessibility--performance)
- [📬 Contact & Comms](#-contact--comms)

---

## ✨ Highlights

- **Executive layout** — Hero, Experience, Projects, Skills, About, and Contact sections in a clean, focused single-page flow.
- **Obsidian Glassmorphism design system** — dark/light theme with Tailwind CSS, blur surfaces, border glows, and brand-blue accents.
- **Framer Motion animations** — 60 FPS springs, scroll-observed reveals, layout transitions, and hover/tap micro-interactions.
- **Magnetic buttons** — proximity-driven cursor pull on CTAs and interactive controls.
- **Custom cursor** — sleek desktop-only cursor with hover and click states (hidden on touch devices).
- **Web Audio micro-interactions** — synthesized haptic blips, clicks, and activation hums via the Web Audio API (`src/utils/audio.ts`).
- **Interactive card demos** — a curated library of animated UI primitives (glassmorphism, gyro tilt, magnetic, spotlight, outline draw, swipe reveal, border beam, haptic press).
- **Responsive navigation** — sticky/frosted header, smooth anchor scrolling with header offset, and an animated mobile drawer.
- **Direct contact workflow** — form backed by a serverless endpoint plus one-click Email, Telegram, and Phone links.
- **Robust SEO** — canonical URL, Open Graph/Twitter social cards, and JSON-LD structured data.
- **AI-ready content** — `robots.txt`, `ai.txt`, `llms.txt`, `llms-full.txt`, and `sitemap.xml` for crawlers and LLM agents.
- **Accessible by default** — skip-to-content link, clear focus states, semantic landmarks, and `aria-label`s on icon controls.

---

## 📦 Flagship Projects

| Project | What it is | Link |
| --- | --- | --- |
| **OnyxChat** | Local-first Android encrypted messaging client built on the S.H.I.E.L.D. protocol, with stateless routing and hardware-backed storage. | [onyxchat.sednium.com](https://onyxchat.sednium.com) |
| **Blade Launcher** | Next-generation mobile launcher for Minecraft: Java Edition on Android with isolated Java 8–26 runtimes and multi-renderer graphics. | [blade-launcher.sednium.com](https://blade-launcher.sednium.com/) |
| **S.H.I.E.L.D. Protocol** | Six-layer zero-knowledge messaging architecture using hybrid post-quantum cryptography and per-message forward secrecy. | [sednium.com/shield](https://sednium.com/shield) |
| **KryptonIDE** | Native Android IDE with incremental syntax parsing and an integrated PTY terminal bridge, optimized for constrained hardware. | [kryptonide.sednium.com](https://kryptonide.sednium.com) |
| **Sednicon** | Automated SVG optimization and cross-platform iconography delivery API. | [sednicon.sednium.com](https://sednicon.sednium.com) |

---

## 🧰 Tech Stack

| Layer | Tools |
| --- | --- |
| **UI** | React 19, TypeScript, Vite 6, Tailwind CSS |
| **Animation** | Framer Motion (springs, layout transitions, scroll reveals) |
| **Icons** | Lucide React |
| **Audio** | Web Audio API synthesizer |
| **Styling** | Tailwind CSS + custom Obsidian Glassmorphism design system |
| **Contact backend** | Python serverless handler (`api/contact.py`) + Gmail SMTP |
| **SEO / AI** | JSON-LD, Open Graph, Twitter Cards, `robots.txt`, `sitemap.xml`, `ai.txt`, `llms.txt`, `llms-full.txt` |

---

## 📁 Project Structure

```text
Loid/
├── api/
│   └── contact.py              # Vercel serverless contact endpoint
├── public/                     # Served as-is at the site root
│   ├── robots.txt              # Crawler access policy (search + AI bots)
│   ├── sitemap.xml             # XML sitemap
│   ├── ai.txt                  # AI-crawler agent policy manifest
│   ├── llms.txt                # Curated map for language models
│   ├── llms-full.txt           # Full plain-text content for deep ingestion
│   └── og-image.png            # 1200×630 social share card
├── src/
│   ├── components/             # Sections, nav, cursor, and reusable UI
│   │   └── demos/              # Animated card primitives
│   ├── data/
│   │   └── portfolioData.ts    # Single source of truth for content
│   ├── utils/
│   │   └── audio.ts            # Web Audio synthesizer
│   ├── App.tsx                 # App shell + theme state
│   ├── main.tsx                # React entry point
│   └── index.css               # Global styles
├── index.html                  # Metadata, fonts, JSON-LD, noscript fallback
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 20+**
- **npm 10+**

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/AnkushDas4/Loid.git
cd Loid

# 2. Install dependencies
npm install

# 3. Start the dev server (http://localhost:3000)
npm run dev
```

The Vite dev server is bound to `0.0.0.0` (host: `true`), so it works with container/sandbox previews.

### Production build

```bash
npm run build       # Outputs to dist/
npm run preview     # Preview the production build locally
```

---

## 📜 Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server on port `3000` |
| `npm run build` | Type-check and build for production into `dist/` |
| `npm run preview` | Serve the production build locally |

---

## 🔌 Contact API

The contact form posts to `POST /api/contact`, implemented by [`api/contact.py`](api/contact.py) (a Vercel-compatible serverless handler). It validates the payload and forwards it as an email over Gmail SMTP.

### Request body

```json
{
  "name": "Alex Rivers",
  "email": "alex@example.com",
  "subject": "Project inquiry",
  "payload": "Hi Ankush, ..."
}
```

### Server environment variables

| Variable | Description |
| --- | --- |
| `SMTP_PASS` | Gmail app password for `loid.sednium@gmail.com` |
| `GMAIL_APP_PASS` | Alias for `SMTP_PASS` (optional, used as fallback) |

> Without a configured password the endpoint returns a clear `500` error; the UI then falls back to a `mailto:` link so visitors are never blocked.

---

## 🤖 SEO & AI Discovery

The site ships with a full machine-readable discovery layer:

| File | Purpose |
| --- | --- |
| `robots.txt` | Explicit allow rules for search engines and major AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, etc.) |
| `sitemap.xml` | Canonical XML sitemap with `lastmod`, `changefreq`, and `priority` |
| `ai.txt` | Human/machine-readable AI agent policy: identity, allowed crawlers, permissions, and citation requirements |
| `llms.txt` | Curated, token-efficient Markdown map of the portfolio for language models |
| `llms-full.txt` | Full plain-text content snapshot for deep-context AI ingestion |
| `og-image.png` | 1200×630 Open Graph / Twitter social card |

`index.html` additionally provides a canonical URL, rich Open Graph + Twitter metadata, geo tags, and a JSON-LD `Person` / `Organization` / `WebSite` / `ItemList` graph for structured results.

---

## 🌐 Deployment

The app is configured for **Vercel** (or any static Vite host). Files in `public/` are copied verbatim to the deployment root, so the SEO/AI files are immediately reachable at `https://loid.sednium.com/robots.txt`, `/llms.txt`, etc.

For the contact API, deploy `api/contact.py` as a serverless function on the same host and configure the `SMTP_PASS` environment variable.

---

## ♿ Accessibility & Performance

- Skip-to-content link with visible focus treatment.
- Semantic landmarks (`header`, `main`, `footer`, section headings).
- Keyboard-reachable icon controls with descriptive `aria-label`s.
- Responsive `prefers-color-scheme` theme detection with persisted preference.
- Static, dependency-light build with lazy interaction-friendly visuals.

---

## 📬 Contact & Comms

- **Email**: [loid@sednium.com](mailto:loid@sednium.com)
- **Telegram**: [@ankushdas4](https://t.me/ankushdas4)
- **Sednium Technologies**: [sednium.com](https://www.sednium.com) *(Created on January 20, 2024)*
- **Personal GitHub**: [github.com/AnkushDas4](https://github.com/AnkushDas4)
- **Sednium GitHub**: [github.com/Sednium-Technologies](https://github.com/Sednium-Technologies)
- **LinkedIn**: [linkedin.com/in/ankush-das](https://www.linkedin.com/in/ankush-das)
- **PGP Fingerprint**: `4A8F 9C12 E5B7 88D1 32A4 F0E9 77B2 C19A`

---

## 📜 License

All rights reserved. © Ankush Das. This repository is distributed for portfolio and professional purposes; no public license is granted unless explicitly stated by the author.

---

## 🧾 Client Intake Page

A private onboarding form for Domain Procurement, DNS Setup & SEO Foundations clients, served at `/client-intake` (alias `/domain-onboarding`).

- **Code:** `src/pages/ClientIntake.tsx`, `src/components/intake/*`, rules in `src/utils/intake.ts` (validation, normalisation, summary).
- **Backend:** `POST /api/intake` (`api/intake.py`) emails the submission to `loid@sednium.com` using the same `SMTP_PASS` as the contact form. Optional `INTAKE_TO` overrides the recipient.
- **Swap the backend:** set `VITE_INTAKE_ENDPOINT` (e.g. a Formspree URL). For Web3Forms also set `VITE_INTAKE_ACCESS_KEY`. The payload already includes `name`, `email`, `subject` and `message`.
- **Routing:** `vercel.json` rewrites both paths to `index.html` and sends `X-Robots-Tag: noindex`. The page also sets `noindex` itself and both paths are disallowed in `robots.txt`.
- **Local testing:** `/api/intake` only exists under `vercel dev`, not plain `vite`.
