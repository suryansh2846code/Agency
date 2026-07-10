"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] flex items-center">
      <div className="container">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="eyebrow mb-5"
          >
            Digital growth for schools &amp; colleges
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="font-head font-extrabold tracking-tight text-glow"
            style={{ fontSize: "clamp(40px, 7vw, 82px)", lineHeight: 1.02 }}
          >
            We build <span className="grad-text">digital campuses</span> that fill classrooms.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease }}
            className="mt-6 text-lg text-[var(--muted)] max-w-xl"
          >
            Websites, social media and admissions growth — one premium team turning your
            school&apos;s online presence into more enquiries and more seats filled.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <a href="#contact" className="btn btn-primary">Book Free Strategy Call</a>
            <a href="#pricing" className="btn btn-ghost">See Pricing</a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-10 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)]"
          >
            Websites • Social Media • Admissions Growth
          </motion.div>
        </div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--muted)]"
      >
        <div className="flex flex-col items-center gap-2 text-[11px] uppercase tracking-[0.2em]">
          Scroll to enter campus
          <span className="h-9 w-[1px] bg-gradient-to-b from-[var(--cyan)] to-transparent animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
}
