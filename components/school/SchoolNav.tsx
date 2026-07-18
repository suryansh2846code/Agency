"use client";

import { useState } from "react";
import Link from "next/link";
import { school } from "@/app/demo/config";

export default function SchoolNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 pt-4">
      <div className="school-container">
        <div className="flex items-center justify-between gap-3 rounded-[22px] border-2 border-[var(--ink)] bg-[var(--brand)] px-3 py-2.5 text-white shadow-[4px_5px_0_0_var(--ink)]">
          {/* logo */}
          <Link href="/demo" className="flex items-center gap-2.5 pl-1" onClick={() => setOpen(false)}>
            <span className="school-head grid h-9 w-9 place-items-center rounded-[10px] bg-white text-[15px] font-extrabold text-[var(--brand)]">
              {school.short[0]}
            </span>
            <span className="leading-tight">
              <span className="school-head block text-[15px] font-extrabold">{school.short}</span>
              <span className="block text-[10px] font-medium uppercase tracking-[0.14em] text-white/70">
                School
              </span>
            </span>
          </Link>

          {/* nav pills */}
          <nav className="hidden items-center gap-1 lg:flex">
            {school.nav.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="school-head rounded-full px-3.5 py-2 text-[13px] font-semibold text-white/85 transition-colors hover:bg-white/15 hover:text-white"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* cta + menu */}
          <div className="flex items-center gap-2">
            <Link
              href="/demo/contact"
              className="school-btn school-btn-accent hidden !border-0 !py-2.5 !text-[13px] !shadow-none sm:inline-flex"
            >
              Apply Now
            </Link>
            <button
              aria-label="Menu"
              onClick={() => setOpen((o) => !o)}
              className="grid h-10 w-10 place-items-center rounded-[10px] bg-white/15 text-white lg:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* mobile menu */}
        {open && (
          <div className="mt-2 rounded-[20px] border-2 border-[var(--ink)] bg-[#fffdf7] p-2 shadow-[4px_5px_0_0_var(--ink)] lg:hidden">
            {school.nav.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="school-head block rounded-xl px-4 py-3 text-[15px] font-semibold text-[var(--ink)] hover:bg-[var(--brand-soft)]"
              >
                {label}
              </Link>
            ))}
            <Link href="/demo/contact" onClick={() => setOpen(false)} className="school-btn school-btn-accent mt-2 w-full !border-0">
              Apply Now
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
