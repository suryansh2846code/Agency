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

## Tech stack

- **Next.js 16** (App Router, TypeScript) + **Tailwind CSS v4**
- **three** + **@react-three/fiber** (R3F) + **@react-three/drei**
- **@react-three/postprocessing** (bloom)
- **framer-motion** (UI motion), **lenis** (smooth scroll)
- Fonts: **Sora** (display), **Inter** (body), **Geist Mono** (engineering/HUD)

## Project structure

```
app/
  layout.tsx        # fonts (incl. Geist Mono), ORIGIN metadata, smooth-scroll
  page.tsx          # composes the page + mounts the cold-open and BUILD% HUD
  globals.css       # theme tokens + blueprint primitives (grid, caret, beam)
components/
  intro/            # BuildIntro — the cold-open cinematic
  hud/              # BuildHud — the persistent BUILD% dashboard
  blueprint/        # Wireframe — shared blueprint SVG primitive
  scene/            # HeroVideo (scroll-scrubbed video hero)
                    #   HeroScene (parked real-time 3D hero — see devlog)
  sections/         # Hero + the marketing sections
  Nav.tsx  Footer.tsx  Reveal.tsx  SmoothScroll.tsx
lib/
  scroll.ts         # shared scroll state (page progress + hero-build progress)
legacy/             # the original static HTML/CSS/JS site (archived)
```

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

**The 3D → video pivot (why the hero is a video):** the hero was first built as
a real-time R3F scene (`HeroScene`) where a robot arm builds 3D blocks from a
blueprint on scroll. The supplied arm model was a single fused mesh (image-to-3D)
with no joints, so it couldn't articulate — only slide rigidly. Rather than rig
it, we pivoted the hero to a **pre-rendered video scrubbed by scroll**, which
keeps the fixed-base, articulated motion and a photoreal look. `HeroScene` is
kept parked for possible revival.

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
