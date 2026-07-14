"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { scrollState } from "@/lib/scroll";
import HeroVideo from "@/components/scene/HeroVideo";

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

const ease = [0.22, 1, 0.36, 1] as const;

// Temporarily hide the DOM overlay to evaluate the 3D scene on its own.
const SHOW_CONTENT = false;

const IDEA = [
  ["Websites that impress", "Modern, fast and mobile-first websites."],
  ["Content that connects", "Engaging posts, reels and videos that showcase your story."],
  ["Strategy that grows", "Data-driven strategies that bring more inquiries and admissions."],
  ["Results that matter", "More visibility, more engagement, more admissions."],
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Feed the pinned hero's local scroll progress (0..1) to the 3D scene, which
  // scrubs the whole build (blueprint drop → arm travel → blocks rise).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const forced = params.get("hp");
    if (forced !== null) {
      scrollState.heroBuild = clamp01(parseFloat(forced));
      return; // dev override for inspecting a fixed build state
    }
    let raf = 0;
    const update = () => {
      const el = sectionRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const span = el.offsetHeight - window.innerHeight;
        scrollState.heroBuild = span > 0 ? clamp01(-rect.top / span) : 0;
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="top" ref={sectionRef} className="relative h-[240vh]">
      {/* pinned viewport — the build scrubs while the tall section scrolls past */}
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* scroll-scrubbed hero video */}
        <div className="absolute inset-0">
          <HeroVideo />
        </div>
      {SHOW_CONTENT && (
      <>
      {/* readability wash on the left where the headline sits */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#05070f_8%,rgba(5,7,15,0.72)_34%,transparent_58%)]" />

      <div className="container relative z-10 flex min-h-[100svh] items-center py-28">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* ---- Left: the pitch ---- */}
          <div className="lg:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="font-mono text-[12px] tracking-[0.2em] text-[var(--cyan)]"
            >
              PROJECT_0001 · ORIGIN
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease }}
              className="mt-5 font-head font-extrabold tracking-tight text-glow"
              style={{ fontSize: "clamp(38px, 5.2vw, 66px)", lineHeight: 1.02 }}
            >
              EVERY GREAT BRAND STARTS <span className="grad-text">AS A BLUEPRINT.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="mt-6 max-w-md text-lg text-[var(--muted)]"
            >
              We design, build and grow digital experiences that drive real results for
              schools and colleges.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a href="#contact" className="btn btn-primary">
                LET&apos;S DRAW IT TOGETHER →
              </a>
              <a href="#work" className="btn btn-ghost">
                ▶ VIEW OUR WORK
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-12 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full border border-white/15">↓</span>
              Scroll to watch the transformation
            </motion.div>
          </div>

          <div className="hidden lg:col-span-4 lg:block" />

          {/* ---- Right: THE IDEA ---- */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease }}
            className="glass rounded-2xl p-5 lg:col-span-3"
          >
            <div className="flex items-center gap-2 font-mono text-[12px] tracking-[0.18em] text-[var(--cyan)]">
              <span>◆</span> THE IDEA
            </div>
            <p className="mt-3 text-sm text-[var(--muted)]">
              We turn your vision into a powerful digital presence that attracts, engages
              and converts.
            </p>

            <div className="mt-4 flex items-center justify-between font-mono text-[10px] tracking-[0.12em] text-[var(--blue-2)]">
              <span>YOUR VISION</span>
              <span className="text-[var(--muted)]">→</span>
              <span>STRATEGY</span>
              <span className="text-[var(--muted)]">→</span>
              <span>IMPACT</span>
            </div>

            <div className="mt-5 space-y-4">
              {IDEA.map(([title, desc]) => (
                <div key={title} className="flex gap-3">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md border border-[var(--blue)]/30 bg-[var(--blue)]/10 text-[var(--cyan)]">
                    ▢
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-[var(--text)]">{title}</div>
                    <div className="text-[12px] leading-snug text-[var(--muted)]">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
      </>
      )}
      </div>
    </section>
  );
}
