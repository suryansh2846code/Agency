import Link from "next/link";
import { school } from "./config";

export default function SchoolHome() {
  return (
    <>
      {/* ---------- Hero (scrapbook) ---------- */}
      <section className="relative overflow-hidden">
        <div className="school-container py-12 md:py-16">
          <div className="text-center">
            <span className="school-eyebrow rounded-full border-2 border-[var(--ink)] bg-white px-4 py-1.5">
              {school.hero.eyebrow}
            </span>
          </div>

          {/* staggered headline */}
          <h1
            className="school-head mx-auto mt-6 max-w-5xl font-extrabold uppercase"
            style={{ fontSize: "clamp(40px, 8.5vw, 108px)", lineHeight: 0.95 }}
          >
            <span className="block">{school.hero.lines[0]}</span>
            <span className="block pl-[8vw]">
              {school.hero.lines[1]}
              <span
                className="school-hand ml-3 inline-block max-w-[220px] align-middle font-bold normal-case leading-tight text-[var(--brand)]"
                style={{ fontSize: "clamp(15px, 1.7vw, 24px)" }}
              >
                {school.hero.note}
              </span>
            </span>
            <span className="block pl-[20vw] text-[var(--brand)]">{school.hero.lines[2]}</span>
          </h1>

          {/* collage */}
          <div className="relative mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-12">
            <Polaroid className="rotate-[-6deg]" />
            <StickyNote text={school.hero.sticky} className="rotate-[4deg]" />
            <Polaroid className="rotate-[5deg]" tall />
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link href={school.hero.primaryCta[1]} className="school-btn school-btn-primary">
              {school.hero.primaryCta[0]}
            </Link>
            <Link href={school.hero.secondaryCta[1]} className="school-btn school-btn-outline">
              {school.hero.secondaryCta[0]}
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Stats bar ---------- */}
      <section className="border-y border-[var(--line)] bg-white">
        <div className="school-container grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {school.stats.map((s) => (
            <div key={s.l} className="text-center">
              <div className="school-head text-[clamp(28px,4vw,40px)] font-extrabold text-[var(--brand)]">{s.n}</div>
              <div className="mt-1 text-sm text-[var(--ink-soft)]">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Welcome ---------- */}
      <section className="school-section">
        <div className="school-container grid items-center gap-12 lg:grid-cols-2">
          <div className="school-photo order-2 aspect-[5/4] w-full rounded-[24px] lg:order-1" />
          <div className="order-1 lg:order-2">
            <span className="school-eyebrow">{school.welcome.eyebrow}</span>
            <h2 className="mt-4 text-[clamp(26px,3.5vw,40px)] font-extrabold">{school.welcome.title}</h2>
            <p className="mt-5 text-[var(--ink-soft)]">{school.welcome.body}</p>
            <ul className="mt-6 space-y-3">
              {school.welcome.points.map((p) => (
                <li key={p} className="flex items-center gap-3 font-medium text-[var(--ink)]">
                  <Check /> {p}
                </li>
              ))}
            </ul>
            <Link href="/demo/about" className="school-btn school-btn-outline mt-8">
              More about us →
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Programs ---------- */}
      <section className="school-section bg-[var(--bg-alt)]">
        <div className="school-container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="school-eyebrow">Academics</span>
            <h2 className="mt-4 text-[clamp(26px,3.5vw,40px)] font-extrabold">Programs for every stage of learning</h2>
            <p className="mt-4 text-[var(--ink-soft)]">
              A continuous journey from first steps to graduation, with the right challenge at every age.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {school.programs.map((p) => (
              <div key={p.title} className="school-card school-card-hover p-6">
                <div className="school-head grid h-11 w-11 place-items-center rounded-xl bg-[var(--brand-soft)] text-[var(--brand)]">
                  <GradCap />
                </div>
                <div className="mt-5 text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">{p.ages}</div>
                <h3 className="mt-1 text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-[var(--ink-soft)]">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/demo/academics" className="school-btn school-btn-ghost">
              Explore academics →
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Why choose us ---------- */}
      <section className="school-section">
        <div className="school-container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="school-eyebrow">Why families choose us</span>
            <h2 className="mt-4 text-[clamp(26px,3.5vw,40px)] font-extrabold">Everything your child needs to flourish</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {school.features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-[var(--line)] p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--brand)] text-white">
                  <Star />
                </div>
                <h3 className="mt-5 text-base font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-[var(--ink-soft)]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Testimonials ---------- */}
      <section className="school-section bg-[var(--bg-alt)]">
        <div className="school-container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="school-eyebrow">Parent voices</span>
            <h2 className="mt-4 text-[clamp(26px,3.5vw,40px)] font-extrabold">Loved by our community</h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            {school.testimonials.map((t) => (
              <figure key={t.name} className="school-card p-8">
                <div className="school-head text-4xl leading-none text-[var(--brand)]">&ldquo;</div>
                <blockquote className="mt-2 text-[var(--ink)]">{t.quote}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="school-head grid h-10 w-10 place-items-center rounded-full bg-[var(--brand-soft)] font-bold text-[var(--brand)]">
                    {t.name[0]}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-[var(--brand-ink)]">{t.name}</span>
                    <span className="block text-xs text-[var(--ink-soft)]">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Admissions CTA ---------- */}
      <section className="py-20">
        <div className="school-container">
          <div className="relative overflow-hidden rounded-[28px] bg-[var(--brand)] px-8 py-16 text-center text-white">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <h2 className="relative text-[clamp(26px,4vw,44px)] font-extrabold text-white">
              Admissions for 2026–27 are open
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-white/85">
              Book a campus visit or start your application today — our admissions team would love to meet your family.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/demo/contact" className="school-btn bg-white font-semibold text-[var(--brand-ink)] hover:bg-white/90">
                Apply for Admission
              </Link>
              <a href={`tel:${school.contact.phone}`} className="school-btn border border-white/40 text-white hover:bg-white/10">
                Call {school.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* --- tiny inline icons --- */
function Check() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[var(--brand)]" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
function GradCap() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10 12 5 2 10l10 5 10-5Z" /><path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" />
    </svg>
  );
}
function Star() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9L12 3Z" />
    </svg>
  );
}

/* --- scrapbook pieces --- */
function Clip() {
  return (
    <span className="absolute -top-4 left-1/2 z-10 -translate-x-1/2">
      <svg width="40" height="30" viewBox="0 0 40 30" fill="none">
        <path d="M13 13c0-8-5-8-4 -1" stroke="#8b8f98" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <path d="M27 13c0-8 5-8 4 -1" stroke="#8b8f98" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <path d="M8 11h24l-2.4 15a2 2 0 0 1-2 1.7H12.4a2 2 0 0 1-2-1.7z" fill="#232323" />
      </svg>
    </span>
  );
}

function Polaroid({ className = "", tall = false }: { className?: string; tall?: boolean }) {
  return (
    <div className={`polaroid relative w-[210px] ${className}`}>
      <Clip />
      <div className={`school-photo w-full rounded-[2px] ${tall ? "aspect-[3/4]" : "aspect-[4/3]"}`} />
    </div>
  );
}

function StickyNote({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`sticky-note relative w-[210px] p-6 ${className}`} style={{ borderRadius: "3px" }}>
      <Clip />
      <p className="school-hand whitespace-pre-line text-[19px] font-bold leading-snug text-[#2a241d]">{text}</p>
    </div>
  );
}
