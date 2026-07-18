import Link from "next/link";
import { school } from "@/app/demo/config";

export default function SchoolFooter() {
  return (
    <footer className="mt-8 bg-[var(--brand-deep)] text-white/85">
      <div className="school-container grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <span className="school-head grid h-9 w-9 place-items-center rounded-xl bg-white/15 text-[15px] font-bold text-white">
              {school.short[0]}
            </span>
            <span className="school-head text-lg font-extrabold text-white">{school.short}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-white/70">{school.tagline}</p>
        </div>

        <div>
          <h4 className="school-head text-sm font-bold uppercase tracking-wide text-white">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {school.nav.map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="text-white/70 transition-colors hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="school-head text-sm font-bold uppercase tracking-wide text-white">Contact</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li>{school.contact.address}</li>
            <li>
              <a href={`tel:${school.contact.phone}`} className="hover:text-white">{school.contact.phone}</a>
            </li>
            <li>
              <a href={`mailto:${school.contact.email}`} className="hover:text-white">{school.contact.email}</a>
            </li>
            <li>{school.contact.hours}</li>
          </ul>
        </div>

        <div>
          <h4 className="school-head text-sm font-bold uppercase tracking-wide text-white">Follow us</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {school.socials.map(([label, href]) => (
              <li key={label}>
                <a href={href} className="text-white/70 transition-colors hover:text-white">{label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="school-container flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/55 sm:flex-row">
          <span>© {new Date().getFullYear()} {school.name}. All rights reserved.</span>
          <span>Website by ORIGIN</span>
        </div>
      </div>
    </footer>
  );
}
