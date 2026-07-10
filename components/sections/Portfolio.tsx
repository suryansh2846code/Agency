import Reveal from "@/components/Reveal";
import { portfolio } from "@/lib/data";

export default function Portfolio() {
  return (
    <section id="work" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow text-center">Selected work</p>
          <h2 className="mt-3 text-center font-head font-bold tracking-tight" style={{ fontSize: "clamp(28px, 4.5vw, 48px)" }}>
            Campuses we&apos;ve <span className="grad-text">brought online.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {portfolio.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-8 transition-all duration-300 hover:-translate-y-1.5">
                {/* faux "building" screen glow */}
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[var(--blue)]/20 blur-3xl transition-opacity duration-300 group-hover:opacity-100 opacity-60" />
                <span className="relative text-xs uppercase tracking-[0.16em] text-[var(--cyan)]">{p.type}</span>
                <h3 className="relative mt-3 font-head text-xl font-bold">{p.name}</h3>
                <p className="relative mt-4 text-sm text-[var(--muted)]">Result</p>
                <p className="relative mt-1 font-head text-lg font-semibold text-white">{p.result}</p>
                <div className="relative mt-6 inline-flex items-center gap-2 text-sm text-[var(--blue-2)] opacity-0 transition-opacity group-hover:opacity-100">
                  Open case study →
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-[var(--muted)]">
          Placeholder case studies — swap with real results once your first school site ships.
        </p>
      </div>
    </section>
  );
}
