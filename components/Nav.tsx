"use client";

import { useEffect, useState } from "react";

const links = [
  ["Work", "#work"],
  ["Services", "#services"],
  ["Process", "#process"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2.5" : "py-4"
      }`}
    >
      <div className="container">
        <div
          className={`flex items-center justify-between rounded-full px-6 py-2 transition-all ${
            scrolled
              ? "border border-white/10 bg-[rgba(6,10,20,0.45)] backdrop-blur-2xl"
              : ""
          }`}
        >
          <a href="#top" className="flex items-baseline gap-2.5">
            <span className="font-head text-xl font-extrabold tracking-[0.16em]">ORIGIN</span>
            <span className="hidden font-mono text-[9px] tracking-[0.3em] text-[var(--muted)] sm:inline">
              DIGITAL AGENCY
            </span>
          </a>

          <nav className="hidden items-center gap-11 text-[13px] tracking-wide text-[var(--muted)] md:flex">
            {links.map(([label, href]) => (
              <a key={href} href={href} className="transition-colors hover:text-white">
                {label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="group flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 font-mono text-[12px] tracking-[0.12em] text-[var(--text)] backdrop-blur-md transition-colors hover:border-[var(--cyan)]/50"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--cyan)] transition-transform group-hover:scale-125" />
            LET&apos;S BUILD
          </a>
        </div>
      </div>
    </header>
  );
}
