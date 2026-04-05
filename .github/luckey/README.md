# Luckey (GitHub notes)

Luckey is the **Smart Lock & kos management** mobile web module embedded in the Casan dashboard. It is served at the **`/luckey`** path when the main app loads.

## Code layout

| Area | Path |
|------|------|
| App shell & state | `src/luckey/LuckeyApp.tsx` |
| Screens | `src/luckey/screens/` |
| Shared UI | `src/luckey/components/` |
| Data & copy | `src/luckey/data/` (includes **changelog source** for the in-app “Pembaruan” screen) |
| Styles | `src/luckey/luckey.css` |
| Types | `src/luckey/types.ts` |
| Static assets | `public/luckey/` |

## Changelog workflow

1. **In-app releases** are driven by `src/luckey/data/changelog.ts` (`LUCKEY_APP_VERSION` + `LUCKEY_CHANGELOG`).
2. For GitHub visibility, mirror the same version headings and bullets in **this folder’s** `CHANGELOG.md` when you ship Luckey-facing changes.
3. Optional: mention larger Luckey milestones in the repository root `CHANGELOG.md` under **Unreleased** if the change affects the whole monorepo.

## Pull requests

- Scope PRs to `src/luckey/**`, `public/luckey/**`, and `.github/luckey/**` when possible.
- Smoke-test locally: `npm run dev` → open `http://localhost:<port>/luckey`.

## Related scripts

- `npm run dev:luckey` — Vite on port **5180** and opens `/luckey` (see `package.json`).
