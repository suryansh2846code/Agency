"use client";

/**
 * The persistent BUILD% dashboard — ORIGIN's spine.
 *
 * Reads `scrollState.progress` (0..1 down the page) every frame and reports it
 * as an engineering readout: PROJECT / CLIENT / STATUS / phase / %. The whole
 * site is "one continuous build" because this single number drives the story.
 */

import { useEffect, useState } from "react";
import { scrollState } from "@/lib/scroll";

// Build phases mapped to progress — see the phase table in the plan.
function phaseFor(pct: number): string {
  if (pct >= 100) return "COMPLETE";
  if (pct >= 92) return "GROWTH";
  if (pct >= 78) return "LAUNCH";
  if (pct >= 62) return "TESTING";
  if (pct >= 45) return "MATERIALS";
  if (pct >= 25) return "BLUEPRINT";
  if (pct >= 12) return "RESEARCH";
  return "INITIATED";
}

export default function BuildHud() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      // setState with an unchanged value is a no-op in React, so this is cheap.
      setPct(Math.round(scrollState.progress * 100));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const done = pct >= 100;
  const phase = phaseFor(pct);

  return (
    <div className="fixed right-4 top-[74px] z-40 w-[188px] select-none font-mono text-[11px] leading-tight sm:right-6">
      <div className="glass rounded-lg px-3.5 py-3">
        <div className="flex items-center justify-between text-[var(--muted)]">
          <span className="tracking-[0.18em]">PROJECT</span>
          <span className="font-semibold tracking-[0.2em] text-[var(--text)]">ORIGIN</span>
        </div>

        <div className="mt-2 flex items-center justify-between text-[var(--muted)]">
          <span>CLIENT</span>
          <span className="text-[var(--blue-2)]">YOUR BRAND</span>
        </div>

        <div className="mt-1 flex items-center justify-between text-[var(--muted)]">
          <span>STATUS</span>
          <span className={done ? "text-[var(--green)]" : "text-[var(--cyan)]"}>
            {done ? "READY" : "BUILDING"}
          </span>
        </div>

        {/* progress bar */}
        <div className="mt-2.5 h-[4px] w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--blue)] to-[var(--cyan)] transition-[width] duration-150 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-[var(--muted)]">{phase}</span>
          <span className="tabular-nums font-semibold text-[var(--text)]">{pct}%</span>
        </div>
      </div>
    </div>
  );
}
