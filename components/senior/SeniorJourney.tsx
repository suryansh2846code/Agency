"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { senior } from "@/app/senior/config";

/* One seamless horizontal scroller. For each stage: an intro panel (two
   white-border photos + text/CTA) followed by its black-border cards. It
   flows straight into the next stage. The timeline tracks scroll position
   and jumps to a stage when clicked. Photos are placeholders (gradients). */
export default function SeniorJourney() {
  const stages = senior.journey.stages;
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const introRefs = useRef<(HTMLDivElement | null)[]>([]);

  function updateActive() {
    const track = trackRef.current;
    if (!track) return;
    const threshold = track.getBoundingClientRect().left + track.clientWidth * 0.3;
    let idx = 0;
    introRefs.current.forEach((el, i) => {
      if (el && el.getBoundingClientRect().left <= threshold) idx = i;
    });
    setActive(idx);
  }

  useEffect(() => {
    updateActive();
  }, []);

  function goToStage(i: number) {
    const el = introRefs.current[i];
    const track = trackRef.current;
    if (!el || !track) return;
    const delta = el.getBoundingClientRect().left - track.getBoundingClientRect().left;
    track.scrollTo({ left: track.scrollLeft + delta - 8, behavior: "smooth" });
  }

  function nudge(dir: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * track.clientWidth * 0.55, behavior: "smooth" });
  }

  return (
    <div>
      {/* timeline — track + evenly-spaced clickable nodes */}
      <div className="relative mt-14 hidden md:block">
        <div className="absolute inset-x-0 top-[7px] h-[3px] bg-[var(--ink)]/20" />
        <div
          className="absolute left-0 top-[7px] h-[3px] bg-[var(--brand)] transition-all duration-500"
          style={{ width: `${(active / (stages.length - 1)) * 100}%` }}
        />
        <div className="relative flex justify-between">
          {stages.map((s, i) => (
            <button
              key={s.name}
              onClick={() => goToStage(i)}
              className="group flex flex-1 flex-col items-center gap-4 first:items-start last:items-end"
            >
              <span
                className={`h-4 w-4 rounded-full border-2 transition-colors ${
                  i <= active ? "border-[var(--brand)] bg-[var(--brand)]" : "border-[var(--ink)]/35 bg-[var(--paper-2)] group-hover:border-[var(--brand)]"
                }`}
              />
              <span
                className={`senior-display text-[15px] font-bold transition-colors ${
                  i === active ? "text-[var(--brand)]" : "text-[var(--ink-soft)] group-hover:text-[var(--ink)]"
                }`}
              >
                {s.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* pill tabs on mobile */}
      <div className="mt-6 flex gap-2 overflow-x-auto pb-2 md:hidden">
        {stages.map((s, i) => (
          <button
            key={s.name}
            onClick={() => goToStage(i)}
            className={`senior-display shrink-0 rounded-full px-4 py-2 text-[14px] font-bold transition-colors ${
              i === active ? "bg-[var(--brand)] text-white" : "bg-white/60 text-[var(--ink-soft)]"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* arrows */}
      <div className="mb-6 mt-10 flex justify-end gap-3">
        <NavBtn dir="left" onClick={() => nudge(-1)} />
        <NavBtn dir="right" onClick={() => nudge(1)} />
      </div>

      {/* seamless horizontal track */}
      <div
        ref={trackRef}
        onScroll={updateActive}
        className="flex snap-x gap-8 overflow-x-auto pb-14 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {stages.map((stage, si) => (
          <Fragment key={stage.name}>
            {/* intro panel — two white-border photos + text */}
            <div
              ref={(el) => {
                introRefs.current[si] = el;
              }}
              className="w-[90vw] max-w-[940px] shrink-0 snap-start"
            >
              <div className="grid items-center gap-12 lg:grid-cols-2">
                <div className="relative mx-auto w-[300px] pb-14 pr-10 pt-4 sm:w-[360px]">
                  {/* main white photo — same overall size as the black cards, gently tilted */}
                  <div className="polaroid w-full rotate-2 shadow-[0_34px_66px_-42px_rgba(20,18,12,.5)]">
                    <div className="senior-photo aspect-[4/5] w-full" />
                  </div>
                  {/* smaller white photo overlapping the corner, tilted the other way */}
                  <div className="polaroid absolute -bottom-2 -right-4 w-40 -rotate-[5deg] shadow-[0_24px_44px_-28px_rgba(20,18,12,.55)] sm:w-48">
                    <div className="senior-photo aspect-[4/3] w-full" />
                  </div>
                </div>
                <div>
                  <h3 className="senior-display text-3xl font-extrabold sm:text-4xl">{stage.title}</h3>
                  <p className="mt-4 text-lg text-[var(--ink-soft)]">{stage.body}</p>
                  <Link href={stage.cta[1]} className="senior-btn senior-btn-blue mt-7">
                    {stage.cta[0]} →
                  </Link>
                </div>
              </div>
            </div>

            {/* black-border cards — image with text below */}
            {stage.cards.map((c, i) => (
              <article
                key={c.title}
                className={`sketch-card w-[300px] shrink-0 snap-start self-start overflow-hidden sm:w-[360px] ${i % 2 ? "-rotate-2 translate-y-8" : "rotate-2 translate-y-1"}`}
              >
                <div className="senior-photo aspect-[4/3] w-full" />
                <div className="p-6">
                  <h4 className="senior-display text-xl font-extrabold">{c.title}</h4>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--ink-soft)]">{c.desc}</p>
                </div>
              </article>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function NavBtn({ onClick, dir }: { onClick: () => void; dir: "left" | "right" }) {
  return (
    <button
      aria-label={dir === "left" ? "Previous" : "Next"}
      onClick={onClick}
      className="grid h-12 w-12 place-items-center rounded-full bg-[var(--brand)] text-white transition-transform hover:scale-105"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        {dir === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  );
}
