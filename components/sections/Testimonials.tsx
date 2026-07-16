import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import TiltCard from "@/components/TiltCard";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader eyebrow="FROM THE PRINCIPAL'S OFFICE">
          Trusted by <span className="grad-text">people who run schools.</span>
        </SectionHeader>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1} className="h-full">
              <TiltCard className="glass-card rounded-2xl p-8">
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[var(--cyan)] to-transparent" />
                <span className="text-xs uppercase tracking-[0.16em] text-[var(--cyan)]">{t.tag}</span>
                <blockquote className="mt-4 leading-relaxed text-[var(--text)]/95">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="glass grid h-9 w-9 place-items-center rounded-full font-head text-sm font-bold">
                    {t.name.charAt(0)}
                  </span>
                  <span className="text-sm text-[var(--muted)]">{t.name}</span>
                </figcaption>
              </TiltCard>
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
