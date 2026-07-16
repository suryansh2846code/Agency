const MENU: [string, string][] = [
  ["Home", "#top"],
  ["Services", "#services"],
  ["Work", "#work"],
  ["Process", "#process"],
  ["Contact", "#contact"],
];
const SOCIALS: [string, string][] = [
  ["X", "#"],
  ["Instagram", "#"],
  ["LinkedIn", "#"],
];
const RESOURCES: [string, string][] = [
  ["Pricing", "#pricing"],
  ["Our Work", "#work"],
  ["Process", "#process"],
];

function Column({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="min-w-[140px]">
      <h4 className="font-head text-sm font-bold tracking-[0.12em] text-[var(--text)]">{title}</h4>
      <div className="mt-3 h-px w-full bg-white/12" />
      <ul className="mt-4 space-y-2.5">
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="text-[15px] text-[var(--muted)] transition-colors hover:text-[var(--text)]">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Mark() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="13" stroke="var(--text)" strokeWidth="1.6" />
      <path d="M6 16h20M20 12l6 4-6 4" stroke="var(--blue)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative z-[1] mt-16 overflow-hidden px-6 pt-14 md:px-14">
      {/* transparent — the shared Atmosphere shows through, same as the sections */}
      <div className="relative">
        {/* top row: mark + tagline */}
        <div className="flex items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-3">
            <Mark />
            <span className="font-head text-lg font-extrabold tracking-[0.18em]">ORIGIN</span>
          </a>
          <p className="font-mono text-[11px] tracking-[0.22em] text-[var(--titanium)] sm:text-[13px]">
            FROM IDEA <span className="text-[var(--text)]">TO IMPACT.</span>
          </p>
        </div>

        {/* columns spread across the full width */}
        <div className="mt-14 flex flex-wrap justify-between gap-10">
          <Column title="MENU" links={MENU} />
          <Column title="SOCIALS" links={SOCIALS} />
          <div className="min-w-[140px]">
            <h4 className="font-head text-sm font-bold tracking-[0.12em] text-[var(--text)]">RESOURCES</h4>
            <div className="mt-3 h-px w-full bg-white/12" />
            <ul className="mt-4 space-y-2.5">
              {RESOURCES.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-[15px] text-[var(--muted)] transition-colors hover:text-[var(--text)]">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm text-[var(--text)] transition-colors hover:border-[var(--blue)]/60"
            >
              Send a message →
            </a>
          </div>
        </div>
      </div>

      {/* giant wordmark spanning the full width, bleeding off the bottom —
          fades up from black (rising out of the background) to bright blue */}
      <div className="relative mt-12 select-none">
        {/* soft blue bloom behind so the word feels lit from the dark */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[10%] top-[25%] bg-[radial-gradient(55%_75%_at_50%_55%,rgba(45,140,255,.2),transparent_70%)] blur-2xl" />
        <span
          className="relative block text-center font-head font-extrabold leading-[0.72] tracking-[-0.02em]"
          style={{
            fontSize: "clamp(80px, 23vw, 520px)",
            background:
              "linear-gradient(180deg, #EAF3FF 0%, #4CB8FF 26%, #2D8CFF 50%, rgba(45,140,255,0.25) 78%, rgba(8,9,11,0) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: "-0.12em",
          }}
        >
          ORIGIN
        </span>
      </div>

      {/* fine print */}
      <div className="relative flex flex-col items-center justify-between gap-2 pb-6 pt-4 font-mono text-[10px] tracking-[0.15em] text-[var(--titanium)] sm:flex-row">
        <span>© {new Date().getFullYear()} ORIGIN · ALL RIGHTS RESERVED</span>
        <span>EVERY GREAT BRAND STARTS AS A BLUEPRINT</span>
      </div>
    </footer>
  );
}
