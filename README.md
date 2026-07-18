# ORIGIN — Every Great Brand Starts as a Blueprint

A premium, interactive landing page for **ORIGIN**, a digital agency that builds
websites, content and admissions growth for schools & colleges. The concept:
the whole site is **one continuous construction** — the visitor watches a brand
being *engineered* from a blueprint into a finished product, tracked by a
persistent **BUILD %** dashboard. Message: _we don't buy templates, we engineer
brands._

## The experience

- **Cold-open cinematic** — on load, a terminal boots (`CLIENT: ORIGIN`), a
  blueprint grid unfolds, and the **Blueprint Beam** (ORIGIN's signature scan
  line) draws a site wireframe. ~5s, skippable, respects reduced-motion.
- **Scroll-scrubbed hero** — a pinned hero plays a video of a robotic arm
  building the blueprint on a drafting desk; scrolling scrubs it frame-by-frame
  (forward builds, back un-builds).
- **BUILD % spine** — a fixed engineering HUD reads page scroll and reports the
  build phase (INITIATED → RESEARCH → BLUEPRINT → … → GROWTH → COMPLETE). One
  number drives the whole story.

## School website templates (the product)

ORIGIN sells school websites in tiers (Basic / Professional / Premium). The
templates are **ORIGIN's internal tooling** — a school receives a finished
site, not the template. Each template is **config-driven**: `config.ts` is the
only file edited per client (name, colours, copy, photos), and one or a few
brand tokens re-theme the whole site via CSS `color-mix`. Copy is generic and
reusable; images/logo/name are placeholders.

Two aesthetics are built, for the two age wings:

- **Primary / Kindergarten** — playful "scrapbook" style (Poppins + Caveat,
  polaroids, stickers, sticky notes). Route: **`/demo`**.
- **Secondary / Senior** — mature editorial style (Archivo display, warm-gray
  canvas, two-tone grotesk headlines, hand-drawn doodles, polaroid + sketch
  cards, multi-accent buttons). Route: **`/senior`**. Highlights: a seamless
  horizontal **education-journey** scroller (intro panel → cards, per stage), a
  **statement** whose hand-drawn annotations draw on tied to scroll position,
  and a staggered **spotlight** collage with hover (photo + caption converge and
  invert colours).

Both live under their own nested route layout so they inherit the root layout
but override the dark canvas with their own light theme (scoped by a wrapper
`.school` / `.senior` class).

## Tech stack

- **Next.js 16** (App Router, TypeScript) + **Tailwind CSS v4**
- **three** + **@react-three/fiber** (R3F) + **@react-three/drei**
- **@react-three/postprocessing** (bloom)
- **framer-motion** (UI motion), **lenis** (smooth scroll)
- Fonts: **Space Grotesk** (display), **Inter** (body), **Geist Mono**
  (engineering/HUD), **Roboto Condensed** (tiny construction labels)

## Project structure

```
app/
  layout.tsx        # fonts (incl. Geist Mono), ORIGIN metadata, smooth-scroll
  page.tsx          # composes the page + mounts the cold-open and BUILD% HUD
  globals.css       # theme tokens + blueprint primitives (grid, caret, beam)
components/
  intro/            # BuildIntro — the cold-open cinematic
  hud/              # BuildHud — the tiltable BUILD% metadata panel
  blueprint/        # Wireframe — shared blueprint SVG primitive
  scene/            # HeroVideo (scroll-scrubbed video hero)
                    #   HeroScene (parked real-time 3D hero — see devlog)
  sections/         # Hero + the marketing sections (glassmorphism)
  Atmosphere.tsx    # inferred industrial-lab backdrop (wakes on scroll)
  Dust.tsx          # drifting dust-particle canvas
  TiltCard.tsx      # reusable glass card with hover tilt + shine
  SectionHeader.tsx # shared section heading
  Nav.tsx  Footer.tsx  Reveal.tsx  SmoothScroll.tsx
  school/           # primary/kindergarten template chrome (SchoolNav, SchoolFooter)
  senior/           # senior template pieces (SeniorNav/Footer + interactive
                    #   SeniorJourney, SeniorStatement)
app/demo/           # primary/kindergarten template (config.ts + scoped school.css)
app/senior/         # senior template (config.ts + scoped senior.css)
public/senior/      # senior template assets (hand-drawn arrow PNGs)
lib/
  scroll.ts         # shared scroll state (page progress + hero-build progress)
legacy/             # the original static HTML/CSS/JS site (archived)
```

## Design system

- **Industrial material palette** — obsidian / carbon / gunmetal / titanium /
  steel materials; **blue is precious** (Blueprint Blue `#2D8CFF` for
  active/focus, Electric `#4CB8FF` for glow, Cyan `#8DEBFF` for tiny HUD).
  Roughly a 4%-surface / 1%-glow budget so blue never takes over.
- **Typography (3 tiers)** — Space Grotesk (display/identity), Inter (body),
  Geist Mono (HUD/engineering), Roboto Condensed (tiny construction labels).
- **Glassmorphism** — carbon-tinted frosted panels (`.glass-card`) with
  hairline metallic edges.
- **Tilt + shine** — `TiltCard` (and the BUILD% HUD) tilt in 3D toward the
  cursor with a light glare on hover.
- **Atmosphere** — the page lives inside an inferred industrial lab
  (`Atmosphere`): vignette, concrete grain, blueprint grid, hidden engineering
  marks, drifting `Dust`, haze and a slow scanner beam that **wake up as you
  scroll** (mirroring BUILD%), rather than sitting on empty black.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

Dev shortcuts: `?nointro=1` skips the cold-open; `?hp=<0..1>` forces a fixed
hero build state (for inspecting/screenshotting the scrub).

## Assets excluded from git

Large binaries are **not committed** (see `.gitignore`). The app builds and
typechecks without them (they load via runtime URLs), but the **hero renders
its video at runtime**, so a deploy needs it in place:

| Path | What | Notes |
|---|---|---|
| `public/videos/origin-arm.mp4` | hero video | **required at runtime.** Re-encode all-keyframe for smooth scrubbing: `ffmpeg -i src.mp4 -an -c:v libx264 -crf 22 -g 1 -keyint_min 1 -sc_threshold 0 -movflags +faststart public/videos/origin-arm.mp4` |
| `public/models/arm.glb` | robot-arm model | only used by the parked `HeroScene` |
| `assets/` | AI/source inputs (PNGs, source `.glb`, source `.mp4`) | working inputs; not needed to run |

---

## Project status & devlog

**Current milestone:** ORIGIN concept — cold-open cinematic, BUILD % spine, and
a scroll-scrubbed video hero, on top of the existing marketing sections. Builds
clean; verified via headless Chrome screenshots.

**Premium glass pass (2026-07):** refined the hero into a calm editorial
two-column layout (robot right, copy in a ≤560px left zone), lightened the nav
into floating glass, redesigned the BUILD% HUD as a tiltable metadata panel, and
began restyling the sections in glassmorphism with a reusable tilt-and-shine
`TiltCard` over an ambient `Backdrop`. Services done; the remaining sections
(Stats, Portfolio, Process, Testimonials, Pricing, Final CTA) are next.

**Identity pass (2026-07):** restyled all remaining sections in glass, adopted
the industrial **material palette** (blue as a precious accent) and the 3-tier
**type system** (Space Grotesk / Inter / Geist Mono / Roboto Condensed), and
replaced the flat backdrop with the layered **`Atmosphere`** (vignette, grain,
grid, hidden marks, `Dust`, haze, scanner beam) that wakes on scroll. Added
smooth-scroll for in-page anchors.

**The 3D → video pivot (why the hero is a video):** the hero was first built as
a real-time R3F scene (`HeroScene`) where a robot arm builds 3D blocks from a
blueprint on scroll. The supplied arm model was a single fused mesh (image-to-3D)
with no joints, so it couldn't articulate — only slide rigidly. Rather than rig
it, we pivoted the hero to a **pre-rendered video scrubbed by scroll**, which
keeps the fixed-base, articulated motion and a photoreal look. `HeroScene` is
kept parked for possible revival.

**School templates (2026-07):** started ORIGIN's product — reusable,
config-driven school websites. Built the **primary/kindergarten** scrapbook
template (`/demo`) and the **secondary/senior** editorial template (`/senior`),
the latter matched section-by-section to a modern international-school reference
(structure/style only — generic copy + placeholders for copyright safety).
Senior template includes a seamless horizontal education-journey scroller, a
scroll-driven annotation draw-on, and a hover-interactive spotlight collage.
Next: the inner pages (About, Academics, Student Life, Admissions + form).

**Where we left off:** run `git log --oneline -1`. All work lives on **`main`**
(single-branch workflow — see [Branching](#branching)).

---

## Git commit conventions

This repo uses **Conventional Commits** (`feat:`/`fix:`/`chore:`/`docs:`/
`test:`/`refactor:`), imperative subjects < 72 chars, with a body explaining
_what_ and _why_ for non-trivial changes. History is kept as focused,
one-concern commits in natural build order, each in a working state.

### Branching

**Single branch: `main`.** All work is committed to `main` — no long-lived
feature or worktree branches are kept. If an isolated workspace is used while
building, its commits are fast-forwarded onto `main` and the temporary branch
is deleted, so the repository only ever has `main`, locally and on `origin`.

### Reusable prompt — "make this type of commit"

Paste this to regenerate a clean, deliberate git history from working changes:

```text
Commit my work as a clean, well-narrated git history that reads like the project
was planned deliberately — not one giant dump, and not fake filler commits.

RULES:
1. Break the work into focused, logical commits in the order the project would
   naturally be built: scaffold/tooling → config → core logic/algorithms → main
   feature/MVP → integrations/UI → docs → tests → each fix → each new feature.
2. ONE concern per commit. A commit either adds a coherent piece, fixes one
   specific thing, or refactors one thing — never mixes fixes with features.
3. If the code went through fixes/iterations, reconstruct them as SEPARATE
   commits so the history shows the real journey (e.g. "fix: X because Y", then
   the feature built on top). Do not collapse fixes into the feature commit.
4. Every commit must leave the project in a working state — typecheck/build/tests
   should pass at each commit where applicable. Verify before committing.
5. Use Conventional Commits: feat: / fix: / chore: / docs: / test: / refactor:.
   - Subject line: imperative mood, <72 chars, lowercase after the prefix.
   - For non-trivial commits (fixes, features), add a body explaining WHAT and
     especially WHY (the problem it solves), wrapped at ~72 cols.
6. Stage files explicitly per commit (git add <paths>), not `git add -A`, so each
   commit contains only its intended files.
7. Respect/create a proper .gitignore: never commit node_modules, build output
   (dist/build/target), large binaries/models, .env, or secrets. Tell me what you
   excluded.
8. Use my existing git identity. Do NOT fake commit dates.

BEFORE committing: show me the planned commit sequence (subjects only) and wait
for my OK. AFTER committing: show `git log --oneline`, confirm the working tree is
clean, and confirm the final state matches the working code (typecheck/build/tests
green). Only push if I ask, and never force-push a shared branch.
```
