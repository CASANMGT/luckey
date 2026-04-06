# Luckey changelog

User-facing history for the **Luckey** module. The canonical source for the in-app “Pembaruan” screen is:

`src/luckey/data/changelog.ts`

Keep this file aligned with that module when you cut a Luckey release.

## 0.6.0 — 2026-04-06

### Added

- **Transfer bank** flow: choose bank, copy account details, upload proof, await operator verification, success receipt screen.
- **Cash (tunai)** flow: await operator verification, then success receipt screen.
- **Digital receipt** confirmation UI (teal styling): totals, line items, PDF CTA, and **share summary** to tenant **WhatsApp** or **email** (brand icons; contact placeholders in `constants.ts`).
- `src/luckey/data/transferBanks.ts` and `src/luckey/utils/contractRenewal.ts`.

### Changed

- Payment method order: **QRIS**, **Transfer Bank**, **Bayar tunai**; main scroll resets when entering transfer/cash sub-flows.
- **Kamar**: contract end date, **≤30 day** countdown, and renewal CTA when approaching expiry.

## 0.5.0 — 2026-04-05

### Added

- In-app **Pembaruan** (changelog) screen and version badge on Beranda.
- This **`.github/luckey`** documentation folder.

## 0.4.0 — 2026-04-04

### Added

- Legal PKS with autofill, NIK/HP validation, TL;DR after full text.
- Typed “handwriting” signature option alongside canvas draw.
- Signed vs unsigned contract flows and Legal PKS navigation.

## 0.3.0 — 2026-04-03

### Added

- Beranda, Bayar, Kwitansi, Kamar, bottom navigation.

## 0.2.0 — 2026-04-02

### Added

- Kunci (smart lock), guest PIN, pindah kamar flow.

## 0.1.0 — 2026-04-01

### Added

- Initial Luckey prototype: splash, login, theme, `/luckey` route.
