# Al-Quran Website

Read the Quran online — Arabic text + Urdu translation, all 114 surahs, each
with its own page for SEO (so a Google search for a specific surah can land
directly on that surah).

## Tech stack

- **Next.js** (App Router) — same pattern as the PDF Toolkit project
- **Tailwind CSS** — Islamic theme (cream/palm-green/gold, no generic look)
- Quran data from a free, public dataset (no API key, no cost, no rate limit)

## Structure

```
quran-website/
├── app/
│   ├── page.js              ← homepage: search + list of all 114 surahs
│   ├── layout.js             ← fonts (Arabic/Urdu), header/footer
│   ├── globals.css           ← design tokens
│   ├── sitemap.js            ← auto-generates /sitemap.xml (115 URLs)
│   ├── robots.js             ← auto-generates /robots.txt
│   └── surah/
│       └── [slug]/
│           └── page.js       ← ONE template that builds all 114 surah pages
├── components/
│   ├── Header.js
│   ├── Footer.js
│   └── SurahList.js          ← search + grid (client component)
└── lib/
    └── quran.js               ← fetches Quran data, builds URL slugs
```

## Why every surah has its own URL

`/surah/2-al-baqarah`, `/surah/112-al-ikhlas`, etc. — **114 separate pages**,
each with its own title and description (e.g. "Surah Al-Baqarah (2) — Read
with Urdu Translation"). This is what lets Google show the *right* surah
when someone searches for it by name — same principle as the PDF Toolkit's
separate tool pages.

## Running locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. First build fetches Quran data over the
network — needs internet access (works fine on your machine and on Vercel).

## Deploy — Vercel only, 100% free, no card needed

Same approach as the PDF Toolkit's final setup — **no separate backend**,
because this site only reads data, it doesn't process files. Just Vercel:

1. Push this project to GitHub
2. vercel.com -> Add New -> Project -> import the repo
3. Root Directory: set to this project's folder if it's inside a bigger repo
4. Environment Variable: add NEXT_PUBLIC_SITE_URL = your Vercel URL (add
   this after the first deploy gives you the URL, then redeploy)
5. Deploy

No CORS_ORIGIN, no Render, no card - this project genuinely needs nothing
but Vercel's free tier.

## Data source note

Quran text and Urdu translation come from the open-source quran-json
dataset (Uthmani Arabic text + Tanzil.net translations), fetched at build
time and cached - so the live site doesn't hit the data source on every
visit; the pages are static.
