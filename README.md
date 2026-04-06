# Luckey

**Smart living for kos & boarding houses** — a mobile-first web app for tenants to manage **digital keys**, **rent & payments**, **contracts**, and **guest access**, with a **Legal PKS** (perjanjian sewa) flow aligned to **IoT / smart lock** operations in Indonesia.

[![Repository](https://img.shields.io/badge/GitHub-CASANMGT%2Fluckey-004D4D?style=flat&logo=github)](https://github.com/CASANMGT/luckey)
[![License](https://img.shields.io/badge/license-Private-808080?style=flat)]()

---

## Table of contents

1. [What is Luckey?](#what-is-luckey)
2. [Who it’s for](#who-its-for)
3. [Feature overview](#feature-overview)
4. [User journeys & navigation](#user-journeys--navigation)
5. [Technical stack](#technical-stack)
6. [Project structure](#project-structure)
7. [Design system](#design-system)
8. [Legal PKS & digital contract](#legal-pks--digital-contract)
9. [Changelog & versioning](#changelog--versioning)
10. [Getting started](#getting-started)
11. [Build & preview](#build--preview)
12. [Deployment notes](#deployment-notes)
13. [Git & GitHub](#git--github)
14. [Contributing](#contributing)
15. [Additional documentation](#additional-documentation)

---

## What is Luckey?

**Luckey** is a **prototype / product shell** for a tenant-facing experience: soft **Korean-inspired** UI (mint, teal, sprout green), **neumorphism / glass** accents, and flows that mirror real kos operations — billing, smart lock metaphors, contract extension, and **digital signatures**.

The app is **data-mock driven** today (demo tenant “Dewi”, Kos Melati Indah, Kamar 302). It is structured so you can later swap mocks for **REST/GraphQL**, **auth**, and **real smart-lock / payment** integrations without rewriting the screen layer.

**Current version (in-app):** `0.6.0` — see [`src/luckey/data/changelog.ts`](src/luckey/data/changelog.ts) and [`.github/luckey/CHANGELOG.md`](.github/luckey/CHANGELOG.md).

---

## Who it’s for

| Audience | Use |
|----------|-----|
| **Tenants (penyewa)** | Check rent status, pay, open “digital key”, request guest PINs, view/sign contracts. |
| **Product / design** | Clickable spec for UX, copy (ID), and visual language. |
| **Engineering** | Reference implementation for routing, forms, canvas signature, and document gating. |

---

## Feature overview

### Onboarding & shell

- **Splash** — Branded animation (SVG mascot, sparkles, loading dots), slogan *Smart Living, Made Easy.*
- **Login** — Tenant/owner-style entry; proceeds to **Beranda** (demo auth only).

### Home & money

- **Beranda** — Greeting, property chip, rent stats, upcoming/paid bills, activity feed.
- **Pembaruan** — Tap header (avatar + **Luckey**) to open a **modal changelog** (version + release notes).
- **Bayar** — Methods **QRIS**, **Transfer Bank**, **Bayar tunai**; transfer path with bank picker, copyable account details, proof upload, and operator verification (demo); cash path with operator confirmation (demo); main scroll resets on sub-steps.
- **Kwitansi** — Receipt summary; after confirmation, **digital receipt** layout with PDF CTA and **share to your WhatsApp / email** (prefilled message; tenant contact placeholders in `constants.ts`).

### Smart access

- **Kunci** — “Hold to unlock” style interaction, backup PIN display with **show/hide**, navigation to guest flows.
- **Request (tamu)** — Generate **4-digit guest PIN**, pick duration (1H / 4H / 24H / custom), preview share text.
- **Share guest** — Preview of message to share (e.g. WhatsApp).

### Room & contract

- **Kamar** — Active contract card with **end date**, **countdown** when ≤30 days remain, **Ajukan Perpanjangan** when relevant; “Ajukan Pindahan”, history; **Lihat Dokumen** opens **signed** contract view.
- **Kontrak ditandatangani** — Summary, download CTA (UI), **Lihat Legal PKS**, **Ajukan Perpanjangan** → unsigned flow.
- **Kontrak unsigned (perpanjangan)** — Legal PKS gate, **dual signature** (draw on canvas **or** typed **handwriting** font), T&C checkbox, submit.

### Legal & compliance (in-app)

- **Legal PKS** — Full **Perjanjian Sewa Menyewa Kamar Kos dengan IoT** text, **autofilled** from profile (kos, room, rent, dates, denda, grace period, etc.).
- **Tenant fields** — **NIK (16 digit)** and **HP** required before “Saya telah membaca” on the renewal path; **green checks** when valid.
- **TL;DR** — Executive bullet summary **below** the full pasal, with copy that the full text is binding.

### Other

- **Pindah** — Move-out reasons as pills + confirmation flow.
- **Success** — Generic success / handoff screen after signature (demo).
- **Changelog (full screen)** — Optional screen from nav type `changelog` (modal is primary entry from Beranda).

---

## User journeys & navigation

- **Primary navigation** — Floating **BottomNav**: Beranda, Bayar, **Kunci** (FAB), Request, Kamar.
- **Legal PKS** hides the bottom bar for reading focus; **back** returns to signed or unsigned contract depending on entry.
- **Contract graph (simplified)**  
  `Kamar` → **Lihat Dokumen** → `kontrakDokumenSigned` → **Ajukan Perpanjangan** → `kontrakDokumenUnsigned` → **Buka Legal PKS** → `kontrakLegalPks` → acknowledge → signature → submit.

State for contracts, PKS, and signature lives in **`LuckeyApp.tsx`** (`screen`, `pksProfile`, `legalPksViewed`, `signatureMode`, etc.).

---

## Technical stack

| Layer | Choice |
|-------|--------|
| **UI** | React 18, TypeScript |
| **Styling** | Tailwind CSS 3 (utility-first), custom `luckey.css` (keyframes, handwriting import) |
| **Build** | Vite 6, `@vitejs/plugin-react-swc` |
| **State** | React hooks (`useState`, `useEffect`, `useMemo`, `useRef`) — no Redux in this repo |
| **Signature** | HTML5 Canvas + optional **Dancing Script / Caveat** for typed name |

---

## Project structure

```text
luckey/
├── index.html                 # App shell
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig*.json
├── public/
│   └── luckey/                # Static assets (logos, splash art)
├── scripts/
│   └── push.ps1               # Optional: echo GitHub URL + git push
├── .github/
│   └── luckey/                # Extra maintainer docs + markdown changelog mirror
└── src/
    ├── main.tsx               # Mounts LuckeyApp
    ├── index.css              # Tailwind entry
    └── luckey/
        ├── LuckeyApp.tsx      # Screen router & global state
        ├── luckey.css         # Animations, app chrome
        ├── types.ts           # Screen union, GuestDuration
        ├── constants.ts       # cardClass, payment/move/guest lists, tenant contact for receipt share
        ├── components/        # BottomNav, ChangelogModal, ChangelogBody
        ├── screens/           # Feature views (Splash, Login, PrimaryScreens, Kontrak*, Legal PKS, Changelog)
        ├── hooks/             # useSignaturePad
        ├── utils/             # contractRenewal (countdown / renewal window)
        └── data/              # changelog.ts, legalPksProfile.ts, legalPksKontrak.ts, transferBanks.ts
```

---

## Design system

Luckey intentionally uses a **fixed palette** (see Tailwind arbitrary values in components):

| Token role | Example | Notes |
|------------|---------|--------|
| **Primary / text** | `#004D4D` | Headings, primary buttons |
| **Accent** | `#008080` | Secondary text, borders |
| **Success / unlock** | `#90EE90`, `#A5F28A`, `#6EE0AF` | Active states, CTAs |
| **Surfaces** | `#F2FDFB`, `#D0F5ED`, gradients `#9DE4F8` → `#B3F7E5` | Backgrounds, cards |
| **Warning / billing** | Yellows `#EAB308`, `#FDE047`, amber text `#92400E` | Tags, upcoming bill |

**Patterns:** Large radii (`rounded-2xl` / `rounded-3xl`), soft borders `#D0F5ED`, mobile frame `max-w-[400px]` with optional “phone bezel” on large screens.

---

## Legal PKS & digital contract

- **Profile model** — `LegalPksProfile` in [`src/luckey/data/legalPksProfile.ts`](src/luckey/data/legalPksProfile.ts): parties, room, rent, dates, denda, grace days. Defaults match demo UI; **opening dates** refresh when opening Legal PKS.
- **Document body** — Built by `buildLegalPksMeta` / `buildLegalPksSections` in [`src/luckey/data/legalPksKontrak.ts`](src/luckey/data/legalPksKontrak.ts).
- **Gating** — On **unsigned** path: user must complete NIK/HP, read PKS, tap **Saya telah membaca**, then accept T&C, then sign (draw or typed).
- **Disclaimer** — In-app copy states TL;DR does not replace full pasal; this is **not legal advice** — have counsel review before production use.

---

## Changelog & versioning

1. **Source of truth for the UI** — [`src/luckey/data/changelog.ts`](src/luckey/data/changelog.ts): bump `LUCKEY_APP_VERSION`, prepend a release to `LUCKEY_CHANGELOG`.
2. **Markdown mirror** — [`.github/luckey/CHANGELOG.md`](.github/luckey/CHANGELOG.md) for GitHub readers (keep in sync with `changelog.ts` on each release).
3. **Repo pointer** — Root [`CHANGELOG.md`](CHANGELOG.md) links both locations.
4. **In-app** — Modal from Beranda header + optional full **Changelog** screen.

---

## Getting started

**Prerequisites:** Node.js **18+** (or 20+ recommended), npm.

```bash
git clone https://github.com/CASANMGT/luckey.git
cd luckey
npm install
npm run dev
```

Open **http://localhost:5173** — the app runs at the **root** `/` (this repo is standalone, not under `/luckey`).

---

## Build & preview

| Command | Purpose |
|---------|---------|
| `npm run build` | `tsc -b` + Vite production build → `dist/` |
| `npm run preview` | Serve `dist/` locally |

---

## Deployment notes

- Static hosting (**Vercel**, **Netlify**, **GitHub Pages**, S3+CloudFront, etc.) works: build output is **`dist/`**; configure **SPA fallback** to `index.html` for client-side routes if you add a real router later.
- **Base path:** default `/`. If you host under a subpath, set `base` in `vite.config.ts` and audit asset paths under `public/luckey/`.

---

## Git & GitHub

| Item | Value |
|------|--------|
| **Remote** | [https://github.com/CASANMGT/luckey](https://github.com/CASANMGT/luckey) |
| **Default branch** | `main` (branch protection: no force-push, no deletion) |

**Author (this repo’s convention):**

```bash
git config user.name "claux"
git config user.email "clauxz@gmail.com"
```

**Push (repeatable):**

```bash
npm run git-push
# or: git push -u origin main
# or: .\scripts\push.ps1
```

**SSH remote (optional):**

```bash
git remote set-url origin git@github.com:CASANMGT/luckey.git
```

---

## Contributing

1. Branch from `main`, open a **PR** (required if you add stricter branch rules later).
2. Keep **Luckey** changes inside `src/luckey/`, `public/luckey/`, and `.github/luckey/` when possible.
3. Run **`npm run build`** before pushing.
4. Update **`changelog.ts`**, mirror **`.github/luckey/CHANGELOG.md`**, and bump **`package.json`** `version` when you cut a user-facing release.

---

## Additional documentation

| Doc | Description |
|-----|-------------|
| [`CHANGELOG.md`](CHANGELOG.md) | Points to in-app changelog module and GitHub mirror |
| [`.github/luckey/README.md`](.github/luckey/README.md) | Maintainer notes (historically mirrored from monorepo context) |
| [`.github/luckey/CHANGELOG.md`](.github/luckey/CHANGELOG.md) | Human-readable release log |

---

## License

**Private** by default for **CASANMGT/luckey**. Add a `LICENSE` file if you open-source the project.

---

## Maintainer

**Organization:** [CASANMGT](https://github.com/CASANMGT) · **Luckey:** [github.com/CASANMGT/luckey](https://github.com/CASANMGT/luckey)

*Smart Living, Made Easy.*
