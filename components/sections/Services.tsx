import Reveal from "@/components/Reveal";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow text-center">What we do</p>
          <h2 className="mt-3 text-center font-head font-bold tracking-tight" style={{ fontSize: "clamp(28px, 4.5vw, 48px)" }}>
            Three buildings. One <span className="grad-text">digital campus.</span>
          </h2>
          <p className="mt-4 text-center text-[var(--muted)] max-w-2xl mx-auto">
            Everything your school needs online, handled by one team — built for admissions, not vanity metrics.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <article className="glass group h-full rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--blue)]/50">
                <div className="font-head text-sm font-bold text-[var(--cyan)]">{s.tag}</div>
                <h3 className="mt-3 font-head text-2xl font-bold">{s.title}</h3>
                <p className="mt-3 text-[var(--muted)]">{s.blurb}</p>
                <ul className="mt-6 space-y-2.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm text-[var(--text)]/90">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--cyan)] shadow-[0_0_10px_var(--cyan)]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
