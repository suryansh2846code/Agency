"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { stats } from "@/lib/data";
import TiltCard from "@/components/TiltCard";

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
    <span ref={ref} className="grad-text font-head font-extrabold" style={{ fontSize: "clamp(40px, 6vw, 68px)" }}>
      {Math.round(n)}
      {suffix}
    </span>
  );
}

const before = ["Outdated or no website", "Empty, inactive socials", "Parents can't find you", "Enquiries slip away"];
const after = ["Modern, fast website", "Reels & posts every week", "Top of search & feeds", "Enquiries tracked & growing"];

export default function Stats() {
  return (
    <section className="section">
      <div className="container">
        <div className="grid gap-6 sm:grid-cols-3">
          {stats.map((s, i) => (
            <TiltCard key={s.label} className="glass-card rounded-2xl px-6 py-9 text-center">
              <div className="note-label">METRIC_0{i + 1}</div>
              <div className="mt-3">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-[var(--muted)]">{s.label}</p>
            </TiltCard>
          ))}
        </div>

        {/* before / after */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="glass-card rounded-2xl p-8 opacity-80">
            <span className="note-label">STATUS · LEGACY</span>
            <h3 className="mt-2 font-head text-2xl font-semibold text-[var(--muted)]">Before ORIGIN</h3>
            <ul className="mt-5 space-y-3">
              {before.map((t) => (
                <li key={t} className="flex items-center gap-3 text-[var(--muted)]">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-white/5 text-xs">×</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <TiltCard className="glass-card rounded-2xl p-8">
            <span className="note-label text-[var(--cyan)]/70">STATUS · BUILT</span>
            <h3 className="mt-2 font-head text-2xl font-semibold">With ORIGIN</h3>
            <ul className="mt-5 space-y-3">
              {after.map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-[var(--green)]/15 text-xs text-[var(--green)]">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
