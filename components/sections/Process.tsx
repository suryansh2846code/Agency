import Reveal from "@/components/Reveal";
import { process } from "@/lib/data";

export default function Process() {
  return (
    <section id="process" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow text-center">How it works</p>
          <h2 className="mt-3 text-center font-head font-bold tracking-tight" style={{ fontSize: "clamp(28px, 4.5vw, 48px)" }}>
            Five islands, <span className="grad-text">first call to growth.</span>
          </h2>
        </Reveal>

        <div className="relative mt-16">
          {/* connecting line */}
          <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-[1px] bg-gradient-to-r from-transparent via-[var(--blue)]/50 to-transparent lg:block" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.08}>
                <div className="relative text-center lg:text-left">
                  <div className="mx-auto lg:mx-0 grid h-[72px] w-[72px] place-items-center rounded-2xl glass glow-blue font-head text-xl font-extrabold grad-text">
                    {p.step}
                  </div>
                  <h3 className="mt-5 font-head text-lg font-bold">{p.title}</h3>
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
