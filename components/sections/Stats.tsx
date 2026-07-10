"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { stats } from "@/lib/data";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(v),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="font-head font-extrabold grad-text" style={{ fontSize: "clamp(44px, 7vw, 76px)" }}>
      {Math.round(n)}
      {suffix}
    </span>
  );
}

const oldSchool = ["Outdated or no website", "Empty, inactive socials", "Parents can't find you", "Enquiries slip away"];
const withUs = ["Modern, fast website", "Reels & posts every week", "Top of search & feeds", "Enquiries tracked & growing"];

export default function Stats() {
  return (
    <section className="section">
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-3 text-center">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-3xl py-10 px-6">
              <Counter value={s.value} suffix={s.suffix} />
              <p className="mt-2 text-sm uppercase tracking-[0.14em] text-[var(--muted)]">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Before / After */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Old school</p>
            <h3 className="mt-2 font-head text-2xl font-bold text-[var(--muted)]">An empty campus</h3>
            <ul className="mt-5 space-y-3">
              {oldSchool.map((t) => (
                <li key={t} className="flex items-center gap-3 text-[var(--muted)]">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-white/5 text-xs">×</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass glow-blue rounded-3xl p-8">
            <p className="eyebrow">With Brandname</p>
            <h3 className="mt-2 font-head text-2xl font-bold">A campus that&apos;s alive</h3>
            <ul className="mt-5 space-y-3">
              {withUs.map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-[var(--green)]/15 text-xs text-[var(--green)]">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
