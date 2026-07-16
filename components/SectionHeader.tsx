import Reveal from "@/components/Reveal";

/** Consistent section header — mono eyebrow + editorial heading + optional sub. */
export default function SectionHeader({
  eyebrow,
  children,
  sub,
}: {
  eyebrow: string;
  children: React.ReactNode;
  sub?: string;
}) {
  return (
    <Reveal>
      <p className="flex items-center justify-center gap-2 font-mono text-[12px] tracking-[0.22em] text-[var(--cyan)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--cyan)]" /> {eyebrow}
      </p>
      <h2
        className="mx-auto mt-4 max-w-2xl text-center font-head font-semibold tracking-tight"
        style={{ fontSize: "clamp(28px, 4vw, 46px)", lineHeight: 1.1 }}
      >
        {children}
      </h2>
      {sub && <p className="mx-auto mt-4 max-w-xl text-center text-[var(--muted)]">{sub}</p>}
    </Reveal>
  );
}
