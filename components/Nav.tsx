"use client";

import { useEffect, useState } from "react";

const links = [
  ["Work", "#work"],
  ["Services", "#services"],
  ["Process", "#process"],
  ["About", "#about"],
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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="container">
        <div
          className={`flex items-center justify-between rounded-full px-5 py-2.5 transition-all ${
            scrolled ? "glass" : ""
          }`}
        >
          <a href="#top" className="flex items-baseline gap-2">
            <span className="font-head text-lg font-extrabold tracking-[0.14em]">ORIGIN</span>
            <span className="hidden font-mono text-[9px] tracking-[0.28em] text-[var(--muted)] sm:inline">
              DIGITAL AGENCY
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-[var(--muted)]">
            {links.map(([label, href]) => (
              <a key={href} href={href} className="hover:text-white transition-colors">
                {label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="btn btn-primary !py-2.5 !px-5 text-sm">
            LET&apos;S BUILD
          </a>
        </div>
      </div>
    </header>
  );
}
