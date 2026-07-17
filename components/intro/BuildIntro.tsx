"use client";

/**
 * ORIGIN cold-open — a dark industrial shutter over the screen that rolls up to
 * reveal the workspace. The ORIGIN wordmark sits centered on the shutter and
 * flies up + shrinks into the nav position as the shutter lifts, so it lands
 * exactly where the real nav logo lives (a shared-element handoff that stitches
 * the intro to the site).
 *
 * TEMP: plays on every load for testing (restore the once-per-visit guard before
 * launch). `?nointro=1` skips it; respects prefers-reduced-motion.
 */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimate } from "framer-motion";

const SEEN_KEY = "origin-intro-seen";
const SLATS = 18;
const LIFT_DELAY = 0.55;
const LIFT_DUR = 1.25;
const EASE = [0.76, 0, 0.24, 1] as const;

type IntroWin = Window & { __originIntroDone?: boolean };
// tell the nav its logo can appear (the shutter has opened / intro is skipped)
function markIntroDone() {
  (window as IntroWin).__originIntroDone = true;
  window.dispatchEvent(new Event("origin:intro-done"));
}

export default function BuildIntro() {
  const [play, setPlay] = useState(true);
  const [visible, setVisible] = useState(true);
  const [scope, animate] = useAnimate();
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || new URLSearchParams(window.location.search).has("nointro")) {
      markIntroDone();
      setPlay(false);
      setVisible(false);
      return;
    }
    // TEMP: plays every load. Restore once-per-visit before launch:
    //   if (sessionStorage.getItem(SEEN_KEY) === "1") { markIntroDone(); setPlay(false); setVisible(false); return; }

    (window as IntroWin).__originIntroDone = false; // hide the nav logo while playing
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    // shared-element: dock the intro logo onto the REAL nav logo's exact rect,
    // then hold it centered + scaled and fly it home as the shutter lifts.
    const el = logoRef.current;
    const navLogo = document.querySelector<HTMLElement>('header a[href="#top"]');
    if (el && navLogo) {
      const nav = navLogo.getBoundingClientRect();
      el.style.left = `${nav.left}px`;
      el.style.top = `${nav.top}px`;
      const r = el.getBoundingClientRect();
      const dx = window.innerWidth / 2 - (r.left + r.width / 2);
      const dy = window.innerHeight / 2 - (r.top + r.height / 2);
      const total = LIFT_DELAY + LIFT_DUR;
      animate(
        el,
        { x: [dx, dx, 0], y: [dy, dy, 0], scale: [3, 3, 1], opacity: [1, 1, 1] },
        { duration: total, times: [0, LIFT_DELAY / total, 1], ease: EASE }
      );
    }

    const t = window.setTimeout(finish, (LIFT_DELAY + LIFT_DUR + 0.5) * 1000);
    function finish() {
      sessionStorage.setItem(SEEN_KEY, "1");
      document.body.style.overflow = prevOverflow;
      setVisible(false);
      markIntroDone();
    }
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, [animate]);

  const skip = () => {
    sessionStorage.setItem(SEEN_KEY, "1");
    document.body.style.overflow = "";
    setVisible(false);
    markIntroDone();
  };

  if (!play) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={scope}
          key="origin-intro"
          className="fixed inset-0 z-[200] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* the shutter — dark slats that roll up to reveal the workspace */}
          <motion.div
            className="absolute inset-0 flex flex-col bg-[var(--obsidian)]"
            initial={{ y: 0 }}
            animate={{ y: "-105%" }}
            transition={{ delay: LIFT_DELAY, duration: LIFT_DUR, ease: EASE }}
            onAnimationComplete={() => {
              sessionStorage.setItem(SEEN_KEY, "1");
              document.body.style.overflow = "";
              setVisible(false);
              markIntroDone();
            }}
          >
            {Array.from({ length: SLATS }).map((_, i) => (
              <div
                key={i}
                className="w-full flex-1 border-t border-black/40"
                style={{
                  background: "linear-gradient(180deg, #0E1115 0%, #0A0B0E 55%, #070809 100%)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,.025)",
                }}
              />
            ))}
            {/* light-leak glow riding the opening edge */}
            <div
              className="absolute inset-x-0 bottom-0 h-[3px]"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(141,235,255,.9), transparent)",
                boxShadow: "0 0 24px 4px rgba(76,184,255,.6)",
              }}
            />
          </motion.div>

          {/* shared ORIGIN wordmark — fixed onto the real nav logo's rect (set in
              the effect), scaled up to centre, then flown home as the shutter lifts. */}
          <div
            ref={logoRef}
            className="pointer-events-none fixed z-10 inline-flex items-baseline gap-2.5 will-change-transform"
            style={{ opacity: 0, left: 0, top: 0, transformOrigin: "center" }}
          >
            <span className="font-head text-xl font-extrabold tracking-[0.16em]">ORIGIN</span>
            <span className="hidden font-mono text-[9px] tracking-[0.3em] text-[var(--muted)] sm:inline">
              DIGITAL AGENCY
            </span>
          </div>

          {/* Skip */}
          <button
            onClick={skip}
            className="absolute bottom-8 right-8 z-10 rounded-full border border-white/15 px-4 py-1.5 font-mono text-[11px] tracking-[0.2em] text-[var(--titanium)] transition hover:border-white/40 hover:text-[var(--text)]"
          >
            SKIP
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
