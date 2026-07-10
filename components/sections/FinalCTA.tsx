import Reveal from "@/components/Reveal";

export default function FinalCTA() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal>
          <div className="glass glow-blue relative overflow-hidden rounded-[36px] px-8 py-20 text-center">
            <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[var(--blue)]/25 blur-3xl" />
            <p className="eyebrow">The campus lights are on</p>
            <h2 className="relative mx-auto mt-4 max-w-2xl font-head font-extrabold tracking-tight" style={{ fontSize: "clamp(30px, 5vw, 60px)" }}>
              Ready to fill more <span className="grad-text">classrooms?</span>
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-[var(--muted)]">
              Get a free strategy call and audit of your website and social media. No obligation —
              just a clear plan to grow admissions.
            </p>
            <div className="relative mt-9 flex flex-wrap justify-center gap-4">
              {/* TODO: replace with your real details */}
              <a href="mailto:hello@brandname.com" className="btn btn-primary">Book Your Free Strategy Call</a>
              <a href="https://wa.me/91XXXXXXXXXX" className="btn btn-ghost">WhatsApp Us</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
