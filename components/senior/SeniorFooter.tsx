import Link from "next/link";
import { senior } from "@/app/senior/config";

const BTN: Record<string, string> = { blue: "senior-btn-blue", red: "senior-btn-red", gold: "senior-btn-gold", dark: "senior-btn-dark" };

export default function SeniorFooter() {
  return (
    <footer className="bg-[var(--paper)]">
      <div className="senior-container py-16">
        {/* boxed logo */}
        <Link href="/senior" className="senior-logo text-[13px]">
          {senior.name}
        </Link>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          {/* campuses */}
          <div className="grid gap-10 sm:grid-cols-2">
            {senior.campuses.map((c) => (
              <div key={c.name}>
                <h4 className="senior-display text-lg font-extrabold text-[var(--ink)]">{c.name}</h4>
                <address className="mt-3 space-y-1 text-[15px] not-italic text-[var(--ink-soft)]">
                  {c.lines.map((l) => (
                    <div key={l}>{l}</div>
                  ))}
                  <div className="pt-1">{c.phone}</div>
                </address>
              </div>
            ))}
          </div>

          {/* actions + connect + affiliates */}
          <div>
            <div className="flex flex-wrap gap-3">
              {senior.footerButtons.map(([label, href, c]) => (
                <Link key={label} href={href} className={`senior-btn ${BTN[c]} !px-6`}>{label}</Link>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-6">
              <span className="senior-display text-[13px] font-bold uppercase tracking-[0.14em] text-[var(--ink)]">Connect</span>
              <div className="flex gap-3">
                {senior.socials.map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="grid h-9 w-9 place-items-center rounded-full bg-[var(--ink)] text-xs font-bold text-[var(--paper)]"
                  >
                    {label[0]}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-6">
              <span className="senior-display text-[13px] font-bold uppercase tracking-[0.14em] text-[var(--ink)]">Affiliates</span>
              <div className="flex flex-wrap gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <span key={i} className="grid h-10 w-14 place-items-center rounded bg-white/60 text-[8px] font-semibold uppercase text-[var(--ink-soft)] ring-1 ring-[var(--line)]">
                    logo
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--line)]">
        <div className="senior-container flex flex-col items-center justify-between gap-2 py-5 text-[13px] text-[var(--ink-soft)] sm:flex-row">
          <span>© {new Date().getFullYear()} {senior.name}. All rights reserved.</span>
          <span>
            <Link href="#" className="text-[var(--brand)] hover:underline">Privacy Policy</Link> · Website by ORIGIN
          </span>
        </div>
      </div>
    </footer>
  );
}
