import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { process } from "@/lib/data";

export default function Process() {
  return (
    <section id="process" className="section">
      <div className="container">
        <SectionHeader eyebrow="HOW WE BUILD">
          Five phases, <span className="grad-text">first call to launch.</span>
        </SectionHeader>

        <div className="relative mt-16">
          {/* connecting line */}
          <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-[var(--blue)]/50 to-transparent lg:block" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.08} className="h-full">
                <div className="text-center lg:text-left">
                  <div className="glass-card mx-auto grid h-[72px] w-[72px] place-items-center rounded-2xl font-head text-xl font-extrabold lg:mx-0">
                    <span className="grad-text">{p.step}</span>
                  </div>
                  <div className="note-label mt-4">PHASE_{p.step}</div>
                  <h3 className="mt-1.5 font-head text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">{p.blurb}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
