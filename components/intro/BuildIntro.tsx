"use client";

/**
 * ORIGIN — the cold-open cinematic (~4.5s).
 *
 * Black → blinking caret → "CLIENT: ORIGIN" types → blueprint grid + coords
 * unfold → the Blueprint Beam sweeps and "constructs" a wireframe → glass/light
 * flash → BUILD COMPLETE → fades out to reveal the page.
 *
 * One source of truth: a single rAF advances `t` (ms since start) and EVERY
 * beat is derived from it — same philosophy the whole site will use with BUILD%.
 * Plays once per session; respects prefers-reduced-motion; always skippable.
 */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Wireframe from "@/components/blueprint/Wireframe";

const SEEN_KEY = "origin-intro-seen";

// Beat boundaries (ms). SCALE stretches the whole cinematic uniformly
// (~+0.5s overall) without changing the choreography.
const SCALE = 1.11;
const s = (ms: number) => Math.round(ms * SCALE);
const TYPE_MS = s(108); // per-character typing interval
const T = {
  bootLine: s(300),
  projectId: s(650),
  typeStart: s(1000),
  typeEnd: s(1650),
  systemsOn: s(1750), // grid + coords + status
  drawStart: s(2100),
  drawEnd: s(3900),
  complete: s(4100),
  fadeOut: s(4550),
  end: s(5050),
};

const CLIENT = "ORIGIN";
const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

export default function BuildIntro() {
  const [visible, setVisible] = useState(true);
  const [play, setPlay] = useState(true); // false = skip rendering entirely
  const [t, setT] = useState(0);
  const raf = useRef(0);

  // Decide whether to play at all (client-only checks).
  useEffect(() => {
    // Dev/QA escape hatch: ?nointro=1 skips straight to the page.
    if (new URLSearchParams(window.location.search).has("nointro")) {
      setPlay(false);
      setVisible(false);
      return;
    }

    // TEMP (testing): play on EVERY load. Before launch, restore the
    // once-per-visit guard below so refreshes/returns don't re-trap visitors:
    //   const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    //   if (reduce || sessionStorage.getItem(SEEN_KEY) === "1") { setPlay(false); setVisible(false); return; }

    // Lock scroll + pin to top while the cinematic runs.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const start = performance.now();
    const loop = (now: number) => {
      const elapsed = now - start;
      setT(elapsed);
      if (elapsed >= T.fadeOut) {
        finish();
        return;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    function finish() {
      cancelAnimationFrame(raf.current);
      sessionStorage.setItem(SEEN_KEY, "1");
      document.body.style.overflow = prevOverflow;
      setVisible(false);
    }

    return () => {
      cancelAnimationFrame(raf.current);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const skip = () => {
    cancelAnimationFrame(raf.current);
    sessionStorage.setItem(SEEN_KEY, "1");
    document.body.style.overflow = "";
    setVisible(false);
  };

  if (!play) return null;

  // ---- Derived beat values --------------------------------------------------
  const typed = CLIENT.slice(
    0,
    Math.max(0, Math.min(CLIENT.length, Math.floor((t - T.typeStart) / TYPE_MS)))
  );
  const showBoot = t > T.bootLine;
  const showId = t > T.projectId;
  const showClient = t > T.typeStart;
  const systemsOn = t > T.systemsOn;
  const draw = clamp01((t - T.drawStart) / (T.drawEnd - T.drawStart));
  const built = t > T.drawEnd;
  const complete = t > T.complete;
  const pct = Math.round(clamp01((t - T.typeStart) / (T.drawEnd - T.typeStart)) * 100);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="origin-intro"
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#04060d] font-mono text-[var(--text)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Blueprint grid — fades in when systems come online */}
          <div
            className="bp-grid absolute inset-0 transition-opacity duration-700"
            style={{ opacity: systemsOn ? 1 : 0 }}
          />
          {/* Vignette for depth */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#04060d_85%)]" />

          {/* Terminal readout — top-left */}
          <div className="absolute left-6 top-6 text-[12px] leading-relaxed sm:left-10 sm:top-10 sm:text-[13px]">
            {showBoot && (
              <div className="text-[var(--muted)]">
                &gt; INITIALIZING PROJECT<span className="bp-caret" />
              </div>
            )}
            {showId && <div className="text-[var(--muted)]">PROJECT_0001</div>}
            {showClient && (
              <div className="mt-1 text-[var(--cyan)]">
                CLIENT: <span className="text-[var(--text)]">{typed}</span>
                {typed.length < CLIENT.length && <span className="bp-caret" />}
              </div>
            )}
            {systemsOn && (
              <div className="mt-1 text-[var(--muted)]">
                STATUS: <span className="text-[var(--blue-2)]">BUILDING</span>
              </div>
            )}
          </div>

          {/* Corner construction notes */}
          {systemsOn && (
            <>
              <Note className="right-6 top-6 sm:right-10 sm:top-10">GRID LOCKED · 1280PX</Note>
              <Note className="bottom-6 right-6 sm:bottom-10 sm:right-10 text-right">
                EXPORT TARGET · WEB
              </Note>
            </>
          )}

          {/* ---- The frame being constructed ---- */}
          <div className="relative aspect-[400/260] w-[min(78vw,620px)]">
            {/* dimension label */}
            {systemsOn && (
              <div className="absolute -top-6 left-0 flex w-full items-center gap-2 text-[10px] text-[var(--blue-2)]/70">
                <span>0</span>
                <span className="h-px flex-1 bg-[var(--blue-2)]/30" />
                <span>1440 PX</span>
              </div>
            )}

            {/* Drawn wireframe — revealed left→right behind the beam */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${(1 - draw) * 100}% 0 0)` }}
            >
              <Wireframe />
            </div>

            {/* Glass / light fill after construction completes */}
            <div
              className="absolute inset-0 rounded-[6px] transition-opacity duration-500"
              style={{
                opacity: built ? 1 : 0,
                background:
                  "linear-gradient(135deg, rgba(61,123,255,.16), rgba(53,224,255,.05) 45%, transparent 70%)",
                boxShadow: "inset 0 0 60px rgba(61,123,255,.25)",
              }}
            />

            {/* The Blueprint Beam — leads the construction */}
            {t > T.drawStart && !built && (
              <div className="bp-beam" style={{ left: `${draw * 100}%` }} />
            )}

          </div>

          {/* BUILD % readout — bottom-left (seed of the persistent HUD) */}
          {showClient && (
            <div className="absolute bottom-6 left-6 w-[190px] sm:bottom-10 sm:left-10">
              <div className="flex items-center justify-between text-[11px] text-[var(--muted)]">
                <span>BUILD</span>
                <span className="text-[var(--text)]">{pct}%</span>
              </div>
              <div className="mt-1.5 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-gradient-to-r from-[var(--blue)] to-[var(--cyan)]"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )}

          {/* BUILD COMPLETE stamp */}
          <AnimatePresence>
            {complete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-1/2 top-[calc(50%+180px)] -translate-x-1/2 whitespace-nowrap text-[13px] tracking-[0.35em] text-[var(--cyan)]"
              >
                BUILD COMPLETE
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skip */}
          <button
            onClick={skip}
            className="absolute bottom-6 right-6 rounded-full border border-white/15 px-4 py-1.5 text-[11px] tracking-[0.2em] text-[var(--muted)] transition hover:border-white/40 hover:text-[var(--text)] sm:bottom-10 sm:right-10"
          >
            SKIP
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Note({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`absolute text-[10px] tracking-[0.15em] text-[var(--blue-2)]/60 ${className}`}>
      {children}
    </div>
  );
}
