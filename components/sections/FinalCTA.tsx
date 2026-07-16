import Reveal from "@/components/Reveal";

export default function FinalCTA() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal>
          <div className="glass-card relative overflow-hidden rounded-[32px] px-8 py-20 text-center">
            <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[var(--blue)]/25 blur-3xl" />
            <p className="flex items-center justify-center gap-2 font-mono text-[12px] tracking-[0.22em] text-[var(--cyan)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--cyan)]" /> BUILD COMPLETE · READY TO LAUNCH
            </p>
            <h2
              className="relative mx-auto mt-4 max-w-2xl font-head font-semibold tracking-tight"
              style={{ fontSize: "clamp(30px, 5vw, 58px)", lineHeight: 1.06 }}
            >
              Your next success story <span className="grad-text">hasn&apos;t been built yet.</span>
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-[var(--muted)]">
              Get a free strategy call and audit of your website and social media. No obligation —
              just a clear plan to grow admissions.
            </p>
            <div className="relative mt-9 flex flex-wrap justify-center gap-4">
              {/* TODO: replace with real details */}
              <a href="mailto:hello@origin.agency" className="btn btn-primary font-mono !tracking-[0.12em]">
                → INITIALIZE PROJECT
              </a>
              <a href="https://wa.me/91XXXXXXXXXX" className="btn btn-ghost font-mono !tracking-[0.12em]">
                WHATSAPP US
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
