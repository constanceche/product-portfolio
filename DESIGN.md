# Design

How the site looks and moves, and where each rule lives. Almost everything here is defined in [src/styles/global.css](src/styles/global.css).

## Direction

Clean and editorial. A warm neutral background, near-black text, one accent color, large serif headlines, and thin-line illustrations that draw themselves in. Motion is small and quick; nothing loops for attention except a few slow drifting shapes in the hero.

## Color

Colors are CSS variables on `:root`, with a second set under `:root[data-theme='dark']`. Components never use raw hex values, so changing a variable changes the whole site.

| Variable | Light | Dark | Used for |
|---|---|---|---|
| `--bg` | `#f7f4ee` | `#111214` | Page background |
| `--surface` | `#fcfaf6` | `#17181b` | Figure panels, tags |
| `--ink` | `#17171a` | `#efede7` | Text, figure outlines, solid buttons |
| `--muted` | `#66645f` | `#a09e96` | Secondary text, labels |
| `--line` | `#dcd7cc` | `#2c2d31` | Borders, dividers, faint figure lines |
| `--accent` | `#2440c8` | `#93a5ff` | Links on hover, key figure lines, numbers, focus rings |

The accent is used sparingly: one accent line or shape per figure, section numbers, result values, and hover states. To change the site's color, change `--accent` in both themes.

In Tailwind classes these are available as `bg-bg`, `bg-surface`, `text-ink`, `text-muted`, `border-line`, `text-accent`, and so on.

### Theme

The theme follows the visitor's system setting until they use the toggle in the nav; after that their choice is saved in the browser. A small script in the `<head>` of [Base.astro](src/layouts/Base.astro) sets `data-theme` on `<html>` before the page paints, so there is no flash of the wrong theme.

## Type

| Role | Font | Notes |
|---|---|---|
| Headlines | Fraunces (variable serif) | Weight 380, tight tracking (`-0.02em`), line height 1.05. Class: `.display` |
| Body and UI | Inter (variable sans) | 16px base, line height 1.6 |
| Labels | Inter | 12px, uppercase, wide tracking (`0.14em`), muted. Class: `.eyebrow` |

Both fonts are bundled with the site (via `@fontsource-variable`), so nothing loads from a third party.

Headline sizes scale with the screen using `clamp()`:

| Element | Size |
|---|---|
| Hero headline | `clamp(2.6rem, 6.6vw, 5.25rem)` |
| Contact headline | `clamp(2.2rem, 6vw, 4.5rem)` |
| Case-study title | `clamp(2.3rem, 5.6vw, 4.5rem)` |
| Section headline | `clamp(1.9rem, 4.2vw, 3.25rem)` |
| Stat numbers | `clamp(2.4rem, 5vw, 3.5rem)` |
| Card and timeline titles | `1.5rem` |

## Layout

- **Width:** content sits in `.wrap`, at most `72rem` wide, with side padding of `clamp(1.25rem, 4vw, 2.5rem)`.
- **Sections:** each `.section` has a top border and vertical padding of `clamp(4rem, 9vw, 7.5rem)`.
- **Section headers:** a numbered label (`01 / What I bring`) above a serif headline, from [SectionHeading.astro](src/components/SectionHeading.astro).
- **Two-column rows:** timeline, leadership, skills, and education use an `11rem` label column beside the content on screens `768px` and wider, and stack below that.
- **Grids:** strengths and work cards are three columns from `768px`; stats go from two to three to five columns.
- **Nav:** sticky, 64px tall, translucent background with blur. The name shortens to "CC" on small screens.

## Components

| Class | Look |
|---|---|
| `.btn` | Pill with a 1px ink border; fills with ink on hover |
| `.btn-solid` | Ink-filled pill; turns accent on hover |
| `.link` | Text link with a 1px underline that grows from the left on hover |
| `.tag` | Small pill on the surface color; border and text turn accent on hover |
| `.prose` | Case-study body text: `42rem` wide, serif `h2`s, list items marked with a short accent dash |

Corners: pills are fully rounded, work-card panels use `14px`, and the case-study figure panel uses `18px`.

## Figures

All illustrations are hand-written inline SVG in [src/components/figures/](src/components/figures/), so they are sharp at any size and follow the theme.

| File | Contains |
|---|---|
| `PathFigure.astro` | Hero: one line through three nodes (discover, build, launch) |
| `StrengthIcon.astro` | Three 64px icons: roadmap, code window, rising chart |
| `CaseFigure.astro` | Three case-study figures: `network`, `tiers`, `ads` |

Every figure has the class `.fig`, which sets a 1.5px stroke in the ink color, round caps and joins, and no fill. Classes inside a figure change individual shapes:

| Class | Effect |
|---|---|
| `.acc` | Accent-colored stroke |
| `.soft` | Faint stroke in the line color |
| `.fill-bg` | Filled with the page background (hides lines passing behind) |
| `.fill-acc` | Filled with the accent, no stroke |

Text inside figures is 10px uppercase in the muted color.

## Motion

One easing curve is used almost everywhere: `--ease`, `cubic-bezier(0.16, 1, 0.3, 1)`, which starts fast and settles gently. Dots and nodes that "pop" use a slight overshoot, `cubic-bezier(0.34, 1.56, 0.64, 1)`.

### How it works

Most animation is CSS. [src/scripts/motion.ts](src/scripts/motion.ts) watches for elements scrolling into view and adds the class `is-in`; the CSS transitions do the rest. Markup opts in with attributes and classes:

| In the markup | Effect |
|---|---|
| `data-reveal` | Fades in and rises 12px over 0.8s when scrolled into view |
| `style="--i:2"` on a `data-reveal` element | Delays it by 2 × 80ms, for staggered groups |
| `data-draw` on an `<svg>` | Animates the shapes inside it when scrolled into view |
| `.draw` plus `pathLength="1"` on a shape | Stroke draws from start to end over 1.4s |
| `.pop` | Scales up from 60% with a slight overshoot |
| `.grow` | Bar grows from the left |
| `style="--d:500"` on a shape | Delays that shape by 500ms |
| `.float` | Slow continuous drift (hero shapes) |
| `data-count="500"` | Number counts up from 0 once, over 1.6s |
| `data-tilt` | Sets `--mx` and `--my` from the pointer, so the card's figure leans up to 8px toward it |

One rule to remember: `.pop`, `.grow`, and `.float` use CSS transforms, which override an SVG `transform` attribute on the same element. Position with an outer `<g transform="translate(...)">` and put the animated class on an inner element.

### Other motion

- **Hero:** headline words rise in one at a time, 70ms apart; the intro and buttons fade in after.
- **Scroll progress:** a 2px accent bar across the top of the page.
- **Timeline:** the accent line grows with scroll position; each dot pops and fills as its entry appears.
- **Work cards:** the panel lifts 4px with a soft shadow and an accent border on hover.
- **Nav:** a single underline slides to the hovered or focused link.
- **Theme toggle:** the sun's rays spin away and a crescent is carved out of the disc.
- **Page transitions:** pages cross-fade in 0.35s. A work card's title and figure panel morph into the case-study header, using Astro's `transition:name`. Browsers without the View Transitions API navigate normally.

### Reduced motion

Every hidden starting state is written under `html.motion`. The head script adds that class only when the visitor has not asked their system to reduce motion. Without it, or without JavaScript, the page shows everything in its finished state: text visible, figures drawn, numbers at their final values, no progress bar, no page-transition animation.

When adding an animation, scope its starting state under `.motion` so this keeps working.

## Accessibility

- Keyboard focus shows a 2px accent outline.
- The hero headline is read as one sentence by screen readers, though it is split into words for animation.
- Decorative figures are hidden from screen readers; the hero figure has a text description.
- Text and accent colors were chosen for contrast against the background in both themes.
