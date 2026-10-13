# Constance Chen · Portfolio

A personal portfolio site built from my resume. It has one scrolling home page and three case-study pages, with line-drawn SVG figures, scroll animations, and page transitions.

Built with [Astro](https://astro.build), Tailwind CSS, and [Motion](https://motion.dev). Hosted on GitHub Pages.

## Run it locally

You need Node.js 22 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:4321.

| Command | What it does |
|---|---|
| `npm run dev` | Starts the dev server with live reload |
| `npm run build` | Builds the static site into `dist/` |
| `npm run preview` | Serves the built site from `dist/` |

## Pages

| Path | Content |
|---|---|
| `/` | Hero, strengths, selected work, experience timeline, numbers, leadership, skills, education, contact |
| `/work/develop-for-good/` | Donation platform for Linens N Love, then product management at Develop For Good |
| `/work/canaan-xpress-crm/` | First CRM implementation at Canaan Xpress |
| `/work/google-ads-nonprofit/` | Google Ads campaigns for a nonprofit client at Kepler U |

## Editing content

Almost all text lives in two places.

**Home page text** is in [src/data/resume.ts](src/data/resume.ts): the tagline and intro, strengths, experience entries, stats, leadership, skills, and education. Edit the values there and the page updates.

**Case studies** are Markdown files in [src/content/work/](src/content/work/). The block at the top of each file sets the title, dates, summary, headline results, and tools. The body below it is the page text. Each file ends with a `TODO` comment listing material that would strengthen it.

To add a case study, add a new `.md` file in that folder with the same top block. The file name becomes the URL. The `figure` field must be `network`, `tiers`, or `ads`; a new illustration needs a new entry in [src/components/figures/CaseFigure.astro](src/components/figures/CaseFigure.astro) and in the schema in [src/content.config.ts](src/content.config.ts).

**The resume download** is [public/Constance-Chen-Resume.pdf](public/Constance-Chen-Resume.pdf). Replace that file to update it, keeping the same file name.

## Project layout

```
src/
  pages/              index.astro and work/[slug].astro
  layouts/Base.astro  page shell: head, nav, footer, theme and motion setup
  components/         one file per home page section
  components/figures/ the SVG illustrations
  content/work/       case studies (Markdown)
  data/resume.ts      home page content
  scripts/motion.ts   scroll reveals, count-ups, timeline, nav underline, theme toggle
  styles/global.css   colors, type, and animation rules
  lib/paths.ts        withBase(), which prefixes internal links with the deploy path
public/               files served as they are (resume PDF, favicon)
.github/workflows/    the deploy workflow
```

Colors, type, and animation are described in [DESIGN.md](DESIGN.md).

## Deployment

Every push to `main` runs [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which builds the site and publishes it to GitHub Pages. It can also be run by hand from the repo's Actions tab.

One-time setup: in the repo, go to Settings → Pages and set Source to **GitHub Actions**.

The workflow gets the site address and path from GitHub and passes them to the build as `SITE_URL` and `BASE_PATH`, so nothing needs changing if the repo is renamed. For this to keep working, internal links in the code must go through `withBase()` from [src/lib/paths.ts](src/lib/paths.ts) rather than being written as plain `/some/path`.

To use a custom domain, add it under Settings → Pages.
