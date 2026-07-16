export default function Footer() {
  return (
    <footer className="relative z-[1] border-t border-white/10 py-12">
      <div className="container flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div>
          <a href="#top" className="flex items-baseline gap-2">
            <span className="font-head text-lg font-extrabold tracking-[0.16em]">ORIGIN</span>
            <span className="font-mono text-[9px] tracking-[0.28em] text-[var(--muted)]">DIGITAL AGENCY</span>
          </a>
          <p className="mt-2 text-sm text-[var(--muted)]">Every great brand starts as a blueprint.</p>
        </div>
        <nav className="flex gap-6 text-sm text-[var(--muted)]">
          {/* TODO: replace with real account links */}
          <a href="#" className="transition-colors hover:text-white">Instagram</a>
          <a href="#" className="transition-colors hover:text-white">Facebook</a>
          <a href="mailto:hello@origin.agency" className="transition-colors hover:text-white">Email</a>
        </nav>
      </div>
      <p className="mt-8 text-center font-mono text-[10px] tracking-[0.15em] text-[var(--muted)]">
        © {new Date().getFullYear()} ORIGIN · ALL RIGHTS RESERVED
      </p>
    </footer>
  );
}
