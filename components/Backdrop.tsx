/**
 * Fixed page backdrop — a faint blueprint grid and soft blue/cyan glows behind
 * everything below the hero. Gives the glassmorphism cards something to refract
 * so the frosted-glass effect actually reads.
 */
export default function Backdrop() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-[#05070f]">
      <div className="bp-grid absolute inset-0 opacity-[0.35]" />
      <div className="absolute -left-40 top-[18%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(61,123,255,.20),transparent_70%)] blur-3xl" />
      <div className="absolute right-[-12%] top-[52%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(53,224,255,.13),transparent_70%)] blur-3xl" />
      <div className="absolute left-[20%] bottom-[6%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(61,123,255,.12),transparent_70%)] blur-3xl" />
    </div>
  );
}
