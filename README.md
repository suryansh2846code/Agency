# Brandname — Digital Growth for Schools & Colleges

A premium, interactive **3D landing page** for a digital agency that builds
websites, runs social media, and drives admissions growth for schools and
colleges. Theme: **"Building the Future of Education"** — the visitor travels
through a futuristic digital campus while clean, conversion-focused content
reads on top (≈70% premium business site, 30% cinematic 3D).

> **Brand name is a placeholder.** Find-and-replace `Brandname` once the real
> name is chosen. Contact links (email / WhatsApp / socials) are `TODO` stubs.

## Tech stack

- **Next.js 16** (App Router, TypeScript) + **Tailwind CSS v4**
- **three** + **@react-three/fiber** (R3F) + **@react-three/drei**
- **@react-three/postprocessing** (bloom / vignette)
- **gsap**, **framer-motion** (UI motion), **lenis** (smooth scroll)
- Fonts: **Sora** (display) + **Inter** (body)

## Project structure

```
app/
  layout.tsx        # fonts, metadata, smooth-scroll provider
  page.tsx          # composes the page + mounts the 3D scene
  globals.css       # theme tokens (navy/electric-blue), glass/glow utilities
components/
  scene/            # CampusScene (R3F) + SceneMount (client, SSR-off)
  sections/         # Hero, Services, Stats, Portfolio, Process,
                    #   Testimonials, Pricing, FinalCTA
  Nav.tsx  Footer.tsx  Reveal.tsx  SmoothScroll.tsx
lib/
  data.ts           # all page content (services, pricing, stats, ...)
  scroll.ts         # shared scroll state read by the 3D render loop
legacy/             # the original static HTML/CSS/JS site (archived)
agency_notes.txt    # full business context, pricing, roadmap
```

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

---

## Project status & devlog

**Current milestone:** 3D digital-campus **MVP** — full scene + all content
sections, builds clean (`npm run build` green), verified rendering headless.

**Where we left off / last commit:** run `git log --oneline -1`. All work lives
on **`main`** — this repo uses a single-branch workflow (see [Branching](#branching)).
The table below is the deliberate build order; run `git log` for anything newer:

| # | Commit | Subject |
|---|--------|---------|
| 1 | `9af753e` | feat: add interactive three.js hero to the landing page |
| 2 | `d6ae38d` | fix: fall back to a css orb when webgl is unavailable |
| 3 | `f3abb75` | chore: archive the static site under legacy/ before the 3d rebuild |
| 4 | `e8188ba` | chore: scaffold next.js app with tailwind and the r3f 3d stack |
| 5 | `b01ef47` | feat: add lenis smooth scroll and shared scroll state |
| 6 | `a870a6d` | feat: add premium navy/electric-blue theme, fonts and layout |
| 7 | `f33139d` | feat: build the 3d digital-campus scene with bloom and scroll camera |
| 8 | `206f7d2` | feat: add site content data and a scroll-reveal helper |
| 9 | `87d5638` | feat: build landing sections, nav and footer |
| 10 | `626b196` | feat: assemble the landing page and mount the campus scene |
| 11 | `f206f4e` | chore: remove unused next.js starter assets |
| 12 | _this commit_ | docs: add project readme with stack, status and commit guide |

**Next up (to match the full cinematic brief):** swap procedural buildings for
real campus/character models, wire GSAP scroll choreography (building →
webpage, social floats, admissions counters, night finale), and replace
placeholder portfolio/testimonials with real assets. See below.

### Assets needed to reach the full vision

3D is the storytelling layer; I integrate/animate assets but don't author
pro-grade art. To match the full brief, provide:

| Element | Asset | Format |
|---|---|---|
| Campus / buildings | low-poly models | `.glb` (Draco) |
| Walking students | rigged + animated character (Mixamo) | `.glb` |
| Drone | model | `.glb` |
| Lighting/reflections | HDRI | `.hdr` / `.exr` |
| Building → webpage | real site screenshots | `.png` / `.webp` |
| Social scene | IG posts + short reels | `.jpg` + `.mp4` (muted) |
| Portfolio / testimonials | screenshots, logos, principal videos | `.webp` / `.svg` / `.mp4` |

Sourcing options: **Spline** (web-ready campus), **Sketchfab/Quaternius**
(low-poly packs), **Mixamo** (rigged characters), or a Blender artist. Keep
each 3D asset low-poly and web-optimized (perf/mobile is the main constraint).

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
