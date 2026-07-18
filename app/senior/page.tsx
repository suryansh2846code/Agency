import Link from "next/link";
import { senior } from "./config";
import SeniorJourney from "@/components/senior/SeniorJourney";
import SeniorStatement from "@/components/senior/SeniorStatement";

const BTN: Record<string, string> = { blue: "senior-btn-blue", red: "senior-btn-red", gold: "senior-btn-gold", dark: "senior-btn-dark" };

export default function SeniorHome() {
  const j = senior.journey;
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="pb-20 pt-2">
        <div className="senior-container grid items-center gap-10 lg:min-h-[720px] lg:grid-cols-[1fr_1.05fr]">
          <div className="relative">
            <img
              src="/senior/arrow-curl.png"
              alt=""
              aria-hidden
              className="pointer-events-none absolute -right-4 -top-2 hidden w-52 mix-blend-multiply lg:block"
            />
            <h1 className="senior-display font-black" style={{ fontSize: "clamp(60px,10vw,148px)", lineHeight: 0.84 }}>
              {senior.hero.accentLines.map((l) => (
                <span key={l} className="block whitespace-nowrap senior-accent">{l}</span>
              ))}
              {senior.hero.inkLines.map((l) => (
                <span key={l} className="block whitespace-nowrap">{l}</span>
              ))}
            </h1>
            <p className="mt-8 max-w-md text-lg text-[var(--ink-soft)]">{senior.hero.body}</p>
            <Link href={senior.hero.cta[1]} className="senior-btn senior-btn-blue mt-8">
              {senior.hero.cta[0]} →
            </Link>
          </div>

          {/* large dominant collage */}
          <div className="relative mt-10 h-[560px] sm:h-[680px] lg:mt-0 lg:h-full lg:min-h-[700px]">
            <div className="senior-photo absolute right-0 top-6 h-[94%] w-[78%] rounded-sm shadow-[0_50px_100px_-56px_rgba(20,18,12,.65)]">
              <img src="/senior/img/p20.jpg" alt="" className="h-full w-full object-cover" />
            </div>
            <Polaroid className="absolute left-0 top-0 w-48 -rotate-[7deg] sm:w-60" tall src="/senior/img/p7.jpg" />
            <Polaroid className="absolute -bottom-2 right-4 w-52 rotate-[6deg] sm:w-64" src="/senior/img/p18.jpg" />
            <CrestSticker className="absolute bottom-28 left-4 h-28 w-28 sm:h-36 sm:w-36" />
          </div>
        </div>
      </section>

      {/* ---------- Who we are ---------- */}
      <section className="senior-section">
        <div className="senior-dots mx-auto mb-16 h-11 max-w-6xl" />
        <div className="senior-container relative grid items-center gap-10 md:grid-cols-[1fr_2fr_1fr]">
          <Polaroid className="mx-auto w-52 -rotate-6" tall src="/senior/img/p8.jpg" />
          <div className="text-center">
            <TwoTone accent={senior.whoWeAre.accent} ink={senior.whoWeAre.ink} size="clamp(40px,6vw,76px)" />
            <p className="mx-auto mt-6 max-w-xl text-[var(--ink-soft)]">{senior.whoWeAre.body}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {senior.whoWeAre.ctas.map(([label, href, c]) => (
                <Link key={label} href={href} className={`senior-btn ${BTN[c]}`}>{label}</Link>
              ))}
            </div>
          </div>
          <Polaroid className="mx-auto w-48 rotate-6" src="/senior/img/p13.jpg" />
        </div>
      </section>

      {/* ---------- Ever wonder what a day ---------- */}
      <section className="pb-24">
        <div className="senior-container text-center">
          <TwoTone accent={senior.day.accent} ink={senior.day.ink} size="clamp(30px,5vw,56px)" />
          <div className="group relative mx-auto mt-10 max-w-3xl cursor-pointer overflow-hidden rounded-sm bg-[var(--gold)] shadow-[0_40px_80px_-50px_rgba(20,18,12,.6)]">
            <img src="/senior/img/p15.jpg" alt="" className="aspect-video w-full object-cover" />
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute inset-0 grid place-items-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-[var(--ink)] transition-transform group-hover:scale-110">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </span>
            </div>
          </div>
        </div>
        <div className="senior-dots mx-auto mt-24 h-11 max-w-6xl" />
      </section>

      {/* ---------- Journey of education ---------- */}
      <section className="senior-section bg-[var(--paper-2)]">
        <div className="senior-container">
          <div className="relative">
            <img
              src="/senior/arrow-squiggle.png"
              alt=""
              aria-hidden
              className="pointer-events-none absolute -top-20 right-20 hidden w-72 mix-blend-multiply lg:block"
            />
            <h2 className="senior-display font-black" style={{ fontSize: "clamp(36px,5.5vw,72px)", lineHeight: 0.95 }}>
              <span className="senior-accent">{j.accent}</span> {j.mid} <span>{j.ink}</span>
            </h2>
          </div>

          <SeniorJourney />
        </div>
      </section>

      {/* ---------- Meet the people ---------- */}
      <section className="senior-section">
        <div className="senior-container grid items-center gap-14 lg:grid-cols-2">
          {/* big dotted rectangle — larger than both photos, both fit inside */}
          <div className="senior-dots relative h-[460px] w-full sm:h-[520px]">
            <Polaroid className="absolute left-6 top-7 w-[60%] -rotate-3 shadow-[0_34px_66px_-42px_rgba(20,18,12,.5)]" src="/senior/img/p4.jpg" />
            <Polaroid className="absolute bottom-7 right-6 w-[46%] rotate-3 shadow-[0_24px_44px_-28px_rgba(20,18,12,.55)]" src="/senior/img/p6.jpg" />
          </div>
          <div>
            <h2 className="senior-display font-extrabold text-[var(--ink)]" style={{ fontSize: "clamp(40px,5.6vw,74px)", lineHeight: 1.02 }}>
              {senior.people.accent} {senior.people.ink}
            </h2>
            <p className="mt-6 max-w-lg text-lg text-[var(--ink-soft)]">{senior.people.body}</p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {senior.people.ctas.map(([label, href, c]) => (
                <Link key={label} href={href} className={`senior-btn ${BTN[c]} !px-5 text-[13px]`}>{label}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Big statement ---------- */}
      <section className="pb-24 pt-4">
        <SeniorStatement />
      </section>

      {/* ---------- Life in & out ---------- */}
      <section className="senior-section bg-[var(--paper-2)]">
        <div className="senior-container relative grid items-center gap-14 lg:grid-cols-2">
          {/* hand-drawn arrow (asset) pointing toward the photos */}
          <img
            src="/senior/arrow-curl.png"
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-[38%] top-0 hidden w-44 mix-blend-multiply lg:block"
          />
          <div>
            <h2 className="senior-display font-medium text-[var(--ink)]" style={{ fontSize: "clamp(40px,5.6vw,74px)", lineHeight: 1.05 }}>
              Life <span className="font-extrabold">in</span> <span className="font-extrabold">&amp;</span> <span className="font-extrabold">out</span> of the classroom
            </h2>
            <p className="mt-6 max-w-lg text-lg text-[var(--ink-soft)]">{senior.life.body}</p>
            <Link href={senior.life.cta[1]} className="senior-btn senior-btn-blue mt-8">{senior.life.cta[0]}</Link>
          </div>
          {/* big dotted rectangle with two tilted photos */}
          <div className="senior-dots relative h-[460px] w-full sm:h-[520px]">
            <Polaroid className="absolute right-5 top-7 w-[62%] rotate-2 shadow-[0_34px_66px_-42px_rgba(20,18,12,.5)]" src="/senior/img/p17.jpg" />
            <Polaroid className="absolute bottom-7 left-2 w-[46%] -rotate-3 shadow-[0_24px_44px_-28px_rgba(20,18,12,.55)]" src="/senior/img/p9.jpg" />
          </div>
        </div>
      </section>

      {/* ---------- Spotlight ---------- */}
      <section className="senior-section">
        <div className="senior-container">
          {/* heading: first word medium, second bold */}
          <h2 className="senior-display text-[var(--ink)]" style={{ fontSize: "clamp(38px,5.5vw,72px)", lineHeight: 1 }}>
            <span className="font-medium">{senior.spotlight.accent}</span> <span className="font-extrabold">{senior.spotlight.ink}</span>
          </h2>
          <p className="mt-4 max-w-xl text-lg text-[var(--ink-soft)]">{senior.spotlight.body}</p>

          {/* staggered photo collage — two explicit columns, right one offset down */}
          <div className="relative mt-16 grid gap-10 md:grid-cols-2">
            {/* decorative sticker floating between columns */}
            <div className="pointer-events-none absolute left-1/2 top-16 z-20 hidden h-32 w-28 -translate-x-1/2 place-items-center rounded-2xl bg-white/50 text-center ring-1 ring-[var(--line)] lg:grid">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--ink-soft)]">sticker<br />placeholder</span>
            </div>

            <div className="flex flex-col gap-10">
              <SpotCard title={senior.spotlight.items[0].title} aspect="aspect-[4/3]" src="/senior/img/p5.jpg" />
              <SpotCard title={senior.spotlight.items[2].title} aspect="aspect-[3/4]" src="/senior/img/p12.jpg" />
            </div>
            <div className="flex flex-col gap-10 md:mt-28">
              <SpotCard title={senior.spotlight.items[1].title} aspect="aspect-[3/4]" src="/senior/img/p19.jpg" />
              <SpotCard title={senior.spotlight.items[3].title} aspect="aspect-[4/3]" src="/senior/img/p2.jpg" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------- helpers ---------------- */
// spotlight collage card: photo + overlapping caption. On hover the photo and
// caption slide together and the caption's colours invert.
function SpotCard({ title, aspect, blue = false, src }: { title: string; aspect: string; blue?: boolean; src?: string }) {
  return (
    <figure className="group relative cursor-pointer">
      <div className="-translate-x-3 overflow-hidden rounded-[2px] shadow-[0_30px_60px_-44px_rgba(20,18,12,.5)] transition-transform duration-500 ease-out group-hover:translate-x-0">
        <div className={`senior-photo w-full ${aspect}`}>
          {src && <img src={src} alt="" className="h-full w-full object-cover" />}
        </div>
      </div>
      <figcaption
        className={`senior-display absolute -bottom-4 left-0 inline-flex translate-x-12 items-center gap-3 px-6 py-4 text-lg font-extrabold shadow-lg transition-all duration-500 ease-out group-hover:translate-x-0 ${
          blue
            ? "bg-[var(--brand)] text-white group-hover:bg-white group-hover:text-[var(--brand)]"
            : "bg-white text-[var(--ink)] group-hover:bg-[var(--brand)] group-hover:text-white"
        }`}
      >
        {title}
        <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
      </figcaption>
    </figure>
  );
}

function TwoTone({ accent, ink, size }: { accent: string; ink: string; size: string }) {
  return (
    <h2 className="senior-display font-black" style={{ fontSize: size, lineHeight: 1 }}>
      <span className="senior-accent">{accent}</span> {ink}
    </h2>
  );
}

function Polaroid({ className = "", tall = false, src }: { className?: string; tall?: boolean; src?: string }) {
  return (
    <div className={`polaroid ${className}`}>
      <div className={`senior-photo w-full ${tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
        {src && <img src={src} alt="" className="h-full w-full object-cover" />}
      </div>
    </div>
  );
}

function CrestSticker({ className = "" }: { className?: string }) {
  return (
    <span className={`grid place-items-center rounded-full bg-white text-center text-[9px] font-bold uppercase tracking-widest text-[var(--ink-soft)] shadow-lg ${className}`}>
      crest
    </span>
  );
}

