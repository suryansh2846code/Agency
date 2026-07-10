"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { websitePlans, socialPlans } from "@/lib/data";

type Plan = { name: string; price: string; note: string; featured?: boolean; features: string[] };

function PlanCard({ p }: { p: Plan }) {
  return (
    <article
      className={`group relative h-full rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1.5 ${
        p.featured ? "glass glow-blue border-[var(--blue)]/50" : "border border-white/10 bg-white/[0.02]"
      }`}
    >
      {p.featured && (
        <span className="absolute -top-3 left-8 rounded-full bg-gradient-to-r from-[var(--blue)] to-[#6aa4ff] px-3 py-1 text-xs font-semibold text-white">
          Most popular ⭐
        </span>
      )}
      <h4 className="font-head text-xl font-bold">{p.name}</h4>
      <p className="mt-3 font-head text-3xl font-extrabold">
        {p.price}
        <span className="ml-1 text-sm font-normal text-[var(--muted)]">{p.note}</span>
      </p>
      <ul className="mt-6 space-y-3">
        {p.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <span className="mt-0.5 text-[var(--cyan)]">✓</span>
            <span className="text-[var(--text)]/90">{f}</span>
          </li>
        ))}
      </ul>
      <a href="#contact" className={`btn mt-8 w-full ${p.featured ? "btn-primary" : "btn-ghost"}`}>
        Get started
      </a>
    </article>
  );
}

export default function Pricing() {
  const [tab, setTab] = useState<"website" | "social">("website");
  const plans = tab === "website" ? websitePlans : socialPlans;

  return (
    <section id="pricing" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow text-center">Pricing</p>
          <h2 className="mt-3 text-center font-head font-bold tracking-tight" style={{ fontSize: "clamp(28px, 4.5vw, 48px)" }}>
            Simple packages. <span className="grad-text">Pick what fits.</span>
          </h2>

          <div className="mt-8 flex justify-center">
            <div className="glass inline-flex rounded-full p-1">
              {(["website", "social"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`rounded-full px-6 py-2.5 text-sm font-semibold capitalize transition-all ${
                    tab === t ? "bg-[var(--blue)] text-white" : "text-[var(--muted)] hover:text-white"
                  }`}
                >
                  {t === "website" ? "Website (one-time)" : "Social (monthly)"}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3 items-stretch">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <PlanCard p={p} />
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-[var(--muted)]">
          Prices are starting ranges — final quote depends on scope.
        </p>
      </div>
    </section>
  );
}
