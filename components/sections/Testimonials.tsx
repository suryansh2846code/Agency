import Reveal from "@/components/Reveal";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow text-center">From the principal&apos;s office</p>
          <h2 className="mt-3 text-center font-head font-bold tracking-tight" style={{ fontSize: "clamp(28px, 4.5vw, 48px)" }}>
            Trusted by <span className="grad-text">people who run schools.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              {/* hologram-style screen */}
              <figure className="relative h-full rounded-3xl border border-[var(--blue)]/25 bg-gradient-to-b from-[var(--blue)]/[0.08] to-transparent p-8 backdrop-blur-sm">
                <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--cyan)] to-transparent" />
                <span className="text-xs uppercase tracking-[0.16em] text-[var(--cyan)]">{t.tag}</span>
                <blockquote className="mt-4 text-[var(--text)]/95 leading-relaxed">“{t.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full glass font-head text-sm font-bold">
                    {t.name.charAt(0)}
                  </span>
                  <span className="text-sm text-[var(--muted)]">{t.name}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-[var(--muted)]">
          Placeholder quotes — replace with real principal testimonials &amp; video.
        </p>
      </div>
    </section>
  );
}
