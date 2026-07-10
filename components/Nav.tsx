"use client";

import { useEffect, useState } from "react";

const links = [
  ["Services", "#services"],
  ["Work", "#work"],
  ["Process", "#process"],
  ["Pricing", "#pricing"],
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
          <a href="#top" className="font-head text-lg font-extrabold tracking-tight">
            Brand<span className="grad-text">name</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-[var(--muted)]">
            {links.map(([label, href]) => (
              <a key={href} href={href} className="hover:text-white transition-colors">
                {label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="btn btn-primary !py-2.5 !px-5 text-sm">
            Book a Call
          </a>
        </div>
      </div>
    </header>
  );
}
