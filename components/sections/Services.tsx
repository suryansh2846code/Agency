import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <Reveal>
          <p className="flex items-center justify-center gap-2 font-mono text-[12px] tracking-[0.22em] text-[var(--cyan)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--cyan)]" /> WHAT WE BUILD
          </p>
          <h2
            className="mx-auto mt-4 max-w-2xl text-center font-head font-semibold tracking-tight"
            style={{ fontSize: "clamp(28px, 4vw, 46px)", lineHeight: 1.1 }}
          >
            Three systems. One <span className="grad-text">growth engine.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-[var(--muted)]">
            Everything your school needs online, engineered by one team — built for
            admissions, not vanity metrics.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1} className="h-full">
              <TiltCard className="glass-card rounded-2xl p-7">
                <div className="flex items-center justify-between">
                  <span className="note-label">MODULE_{s.tag}</span>
                  <span className="note-label text-[var(--cyan)]/70">INSTALLED ✓</span>
                </div>
                {/* faint module number watermark */}
                <div className="pointer-events-none absolute -right-3 -top-6 font-head text-[110px] font-bold leading-none text-white/[0.03]">
                  {s.tag}
                </div>

                <h3 className="mt-6 font-head text-2xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{s.blurb}</p>

                <div className="my-6 h-px w-full bg-gradient-to-r from-white/10 to-transparent" />

                <ul className="space-y-2.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm text-[var(--text)]/90">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--cyan)] shadow-[0_0_10px_var(--cyan)]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
