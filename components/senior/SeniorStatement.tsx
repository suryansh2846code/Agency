"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { senior } from "@/app/senior/config";

/* Big statement with hand-drawn annotations that DRAW ON as you scroll
   through the section — the stroke progress is tied to scroll position. */
export default function SeniorStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let ticking = false;
    function compute() {
      ticking = false;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the block's top enters the bottom of the viewport,
      // 1 when its bottom leaves the top — i.e. draw across the whole section scroll.
      const raw = (vh - rect.top) / (vh + rect.height);
      setP(Math.max(0, Math.min(1, raw)));
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(compute);
    }
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const s = senior.statement;
  // staggered: circle first, then wave, then underline
  const seg = (a: number, b: number) => Math.max(0, Math.min(1, (p - a) / (b - a)));

  return (
    <div ref={ref} className="senior-container grid items-center gap-10 lg:grid-cols-[3fr_1fr]">
      <div>
        <p className="senior-display font-semibold leading-[1.15] text-[var(--ink)]" style={{ fontSize: "clamp(28px,4.1vw,54px)" }}>
          {s.pre}
          <Circle progress={seg(0, 0.55)}>{s.circle}</Circle>
          {s.mid}
          <Wave progress={seg(0.22, 0.77)}>{s.wave}</Wave>
          {s.mid2}
          <Underline progress={seg(0.45, 1)}>{s.underline}</Underline>
          {s.post}
        </p>
        <Link href={s.cta[1]} className="senior-btn senior-btn-red mt-9">
          {s.cta[0]}
        </Link>
      </div>
      <div className="mx-auto grid h-40 w-40 place-items-center rounded-2xl bg-white/40 text-center ring-1 ring-[var(--line)]">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--ink-soft)]">
          mascot
          <br />
          placeholder
        </span>
      </div>
    </div>
  );
}

const draw = (progress: number) => ({
  strokeDasharray: 1,
  strokeDashoffset: 1 - progress,
});

function Circle({ children, progress }: { children: React.ReactNode; progress: number }) {
  return (
    <span className="relative inline-block px-1">
      {children}
      <svg viewBox="0 0 200 90" preserveAspectRatio="none" className="pointer-events-none absolute -inset-x-1.5 -inset-y-0.5 h-full w-full">
        <ellipse cx="100" cy="45" rx="97" ry="43" fill="none" stroke="var(--red)" strokeWidth="4.5" strokeLinecap="round" pathLength={1} style={draw(progress)} />
      </svg>
    </span>
  );
}

function Wave({ children, progress }: { children: React.ReactNode; progress: number }) {
  return (
    <span className="relative inline-block">
      {children}
      <svg viewBox="0 0 100 12" preserveAspectRatio="none" className="pointer-events-none absolute -bottom-2 left-0 h-2.5 w-full">
        <path d="M0 6 q 12 -7 25 0 t 25 0 t 25 0 t 25 0" fill="none" stroke="var(--gold)" strokeWidth="4" strokeLinecap="round" pathLength={1} style={draw(progress)} />
      </svg>
    </span>
  );
}

function Underline({ children, progress }: { children: React.ReactNode; progress: number }) {
  return (
    <span className="relative inline-block">
      {children}
      <svg viewBox="0 0 100 6" preserveAspectRatio="none" className="pointer-events-none absolute -bottom-1.5 left-0 h-2 w-full">
        <path d="M0 3 H100" fill="none" stroke="var(--brand)" strokeWidth="5" strokeLinecap="round" pathLength={1} style={draw(progress)} />
      </svg>
    </span>
  );
}
