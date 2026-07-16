import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import TiltCard from "@/components/TiltCard";
import { portfolio } from "@/lib/data";

export default function Portfolio() {
  return (
    <section id="work" className="section">
      <div className="container">
        <SectionHeader eyebrow="SELECTED WORK">
          Brands we&apos;ve <span className="grad-text">brought online.</span>
        </SectionHeader>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {portfolio.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1} className="h-full">
              <TiltCard className="group glass-card rounded-2xl p-7">
                <div className="flex items-center justify-between">
                  <span className="note-label">PROJECT_00{i + 1}</span>
                  <span className="note-label text-[var(--cyan)]/70">CASE FILE</span>
                </div>

                <span className="mt-6 block text-xs uppercase tracking-[0.16em] text-[var(--cyan)]">
                  {p.type}
                </span>
                <h3 className="mt-2 font-head text-xl font-semibold">{p.name}</h3>

                <div className="my-6 h-px w-full bg-gradient-to-r from-white/10 to-transparent" />

                <p className="note-label">RESULT</p>
                <p className="mt-1 font-head text-lg font-semibold text-white">{p.result}</p>

                <div className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--blue-2)] opacity-0 transition-opacity group-hover:opacity-100">
                  Open case study →
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-[var(--muted)]">
          Placeholder case studies — swap with real results once your first site ships.
        </p>
      </div>
    </section>
  );
}
