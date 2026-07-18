"use client";

import { useState } from "react";
import Link from "next/link";
import { senior } from "@/app/senior/config";

export default function SeniorNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[var(--paper)]/92 backdrop-blur">
      <div className="senior-container flex items-center justify-between py-6">
        {/* boxed wordmark logo (placeholder) */}
        <Link href="/senior" className="senior-logo text-[15px] sm:text-[24px]" onClick={() => setOpen(false)}>
          <span className="hidden sm:inline">{senior.name}</span>
          <span className="sm:hidden">{senior.short}</span>
        </Link>

        <div className="flex items-center gap-5 text-[var(--ink)] sm:gap-7">
          <button aria-label="Search" className="hidden text-[var(--ink)] hover:text-[var(--brand)] sm:block">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" strokeLinecap="round" />
            </svg>
          </button>
          <button aria-label="Calendar" className="hidden items-center gap-1 text-[var(--ink)] hover:text-[var(--brand)] md:flex">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" strokeLinecap="round" />
            </svg>
            <Chevron />
          </button>

          <span className="hidden h-7 w-px bg-[var(--line)] md:block" />

          <UtilityItem label="Plan a Visit" href="/senior/admissions" />
          <UtilityItem label="Apply" href="/senior/admissions" />

          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="text-[var(--ink)] hover:text-[var(--brand)]"
          >
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* full menu */}
      {open && (
        <nav className="border-y-2 border-[var(--ink)] bg-[var(--paper-2)]">
          <div className="senior-container grid gap-1 py-6 sm:grid-cols-2 lg:grid-cols-4">
            {senior.nav.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="senior-display border-b border-[var(--line)] py-3 text-xl font-extrabold text-[var(--ink)] transition-colors hover:text-[var(--brand)] sm:border-0"
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function UtilityItem({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="senior-display hidden items-center gap-1.5 text-[18px] font-extrabold uppercase tracking-[0.06em] text-[var(--ink)] transition-colors hover:text-[var(--brand)] sm:flex"
    >
      {label}
      <Chevron />
    </Link>
  );
}

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
