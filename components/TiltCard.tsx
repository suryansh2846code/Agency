"use client";

/**
 * Reusable glass card with a 3D tilt + cursor-following shine on hover.
 * Pass the card styling via `className` (e.g. "glass-card rounded-2xl p-7").
 */

import { useRef, useState } from "react";

export default function TiltCard({
  children,
  className = "",
  max = 8,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, o: 0 });
  const [hovering, setHovering] = useState(false);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({ rx: (py - 0.5) * -2 * max, ry: (px - 0.5) * 2 * max });
    setGlare({ x: px * 100, y: py * 100, o: 1 });
  };
  const onLeave = () => {
    setHovering(false);
    setTilt({ rx: 0, ry: 0 });
    setGlare((g) => ({ ...g, o: 0 }));
  };

  return (
    <div className="h-full" style={{ perspective: "1000px" }}>
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={onLeave}
        className={`relative h-full overflow-hidden ${className}`}
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: hovering ? "transform 90ms linear" : "transform 500ms ease",
          borderColor: hovering ? "rgba(45,140,255,.4)" : undefined,
          boxShadow: hovering
            ? "inset 0 1px 0 rgba(255,255,255,.07), 0 34px 70px -40px rgba(45,140,255,.4)"
            : undefined,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            opacity: glare.o,
            transition: "opacity 300ms ease",
            background: `radial-gradient(340px circle at ${glare.x}% ${glare.y}%, rgba(76,184,255,.14), transparent 55%)`,
          }}
        />
        {children}
      </div>
    </div>
  );
}
