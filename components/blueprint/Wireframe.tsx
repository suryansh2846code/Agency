/**
 * A simple website wireframe drawn in blueprint lines — shared by the cold-open
 * (drawn progressively behind the beam) and the hero drafting table (fully drawn).
 */
export default function Wireframe({
  stroke = "#7fb2ff",
  className = "",
}: {
  stroke?: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 400 260" fill="none" className={`h-full w-full ${className}`}>
      <g stroke={stroke} strokeWidth={1.2} opacity={0.9}>
        {/* outer frame */}
        <rect x={4} y={4} width={392} height={252} rx={4} />
        {/* nav bar */}
        <line x1={4} y1={34} x2={396} y2={34} />
        <rect x={16} y={14} width={26} height={12} rx={2} />
        <line x1={300} y1={20} x2={320} y2={20} />
        <line x1={332} y1={20} x2={352} y2={20} />
        <line x1={364} y1={20} x2={384} y2={20} />
        {/* hero copy */}
        <line x1={24} y1={70} x2={190} y2={70} strokeWidth={2.4} />
        <line x1={24} y1={90} x2={230} y2={90} strokeWidth={2.4} />
        <line x1={24} y1={118} x2={150} y2={118} />
        <rect x={24} y={138} width={64} height={20} rx={10} />
        {/* hero visual */}
        <rect x={250} y={58} width={126} height={104} rx={4} />
        <path d="M250 130 L286 96 L312 118 L340 88 L376 120" />
        {/* three cards */}
        <rect x={24} y={192} width={104} height={48} rx={4} />
        <rect x={148} y={192} width={104} height={48} rx={4} />
        <rect x={272} y={192} width={104} height={48} rx={4} />
      </g>
    </svg>
  );
}
