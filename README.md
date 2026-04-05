# Luckey

Smart Lock & kos (boarding house) management — mobile web app (React + Vite + Tailwind).

This repository is **standalone** (not the Casan dashboard monorepo). Deploy or develop it on its own.

## Git author (this folder only)

This repo was initialized with a placeholder identity. Set **your** name and email before pushing (use the same email as your GitHub account):

```bash
git config user.name "Your Real Name"
git config user.email "your-email@example.com"
```

(`--global` is optional if you only use one identity on this machine.)

## GitHub remote (CASANMGT)

Target repository: **`CASANMGT/luckey`** — create it under the [CASANMGT](https://github.com/CASANMGT) account or org if it does not exist yet (empty repo, no README).

```bash
git remote add origin https://github.com/CASANMGT/luckey.git
git branch -M main
git push -u origin main
```

SSH:

```bash
git remote add origin git@github.com:CASANMGT/luckey.git
```

## Scripts

| Command        | Description        |
|----------------|--------------------|
| `npm install`  | Install deps       |
| `npm run dev`  | Dev server         |
| `npm run build`| Production build   |
| `npm run preview` | Preview `dist` |

Open [http://localhost:5173](http://localhost:5173) after `npm run dev`.

## Docs

- Module notes for contributors: [`.github/luckey/README.md`](.github/luckey/README.md)
- Changelog (markdown): [`.github/luckey/CHANGELOG.md`](.github/luckey/CHANGELOG.md)
- In-app changelog source: `src/luckey/data/changelog.ts`

## License

Private by default; add a `LICENSE` file if you open-source.
