export default function Footer() {
  return (
    <footer className="relative z-[1] border-t border-white/10 py-12">
      <div className="container flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div>
          <a href="#top" className="font-head text-lg font-extrabold">
            Brand<span className="grad-text">name</span>
          </a>
          <p className="mt-1 text-sm text-[var(--muted)]">Building the future of education, online.</p>
        </div>
        <nav className="flex gap-6 text-sm text-[var(--muted)]">
          {/* TODO: replace with real account links */}
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Facebook</a>
          <a href="mailto:hello@brandname.com" className="hover:text-white transition-colors">Email</a>
        </nav>
      </div>
      <p className="mt-8 text-center text-xs text-[var(--muted)]">
        © {new Date().getFullYear()} Brandname. All rights reserved.
      </p>
    </footer>
  );
}
