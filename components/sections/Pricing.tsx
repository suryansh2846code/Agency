"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import TiltCard from "@/components/TiltCard";
import { websitePlans, socialPlans } from "@/lib/data";

type Plan = { name: string; price: string; note: string; featured?: boolean; features: string[] };

function PlanCard({ p }: { p: Plan }) {
  return (
    <TiltCard
      className={`glass-card rounded-2xl p-8 ${
        p.featured ? "border-[var(--blue)]/45 shadow-[0_30px_70px_-40px_rgba(61,123,255,.7)]" : ""
      }`}
    >
      {/* reserved row keeps all cards aligned whether or not they're featured */}
      <div className="mb-4 flex h-6 items-center">
        {p.featured && (
          <span className="rounded-full bg-gradient-to-r from-[var(--blue)] to-[#6aa4ff] px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.12em] text-white">
            MOST POPULAR ★
          </span>
        )}
      </div>
      <h4 className="font-head text-xl font-semibold">{p.name}</h4>
      <p className="mt-3 font-head text-3xl font-extrabold">
        {p.price}
        <span className="ml-1 text-sm font-normal text-[var(--muted)]">{p.note}</span>
      </p>
      <div className="my-6 h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
      <ul className="space-y-3">
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
    </TiltCard>
  );
}

export default function Pricing() {
  const [tab, setTab] = useState<"website" | "social">("website");
  const plans = tab === "website" ? websitePlans : socialPlans;

  return (
    <section id="pricing" className="section">
      <div className="container">
        <SectionHeader eyebrow="PRICING">
          Simple packages. <span className="grad-text">Pick what fits.</span>
        </SectionHeader>

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

        <div className="mt-12 grid items-stretch gap-6 md:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08} className="h-full">
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
