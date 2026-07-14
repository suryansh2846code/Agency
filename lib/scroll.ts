// Shared scroll state, read inside the R3F render loop (useFrame) without
// triggering React re-renders. Updated by the Lenis provider on scroll.
export const scrollState = {
  progress: 0, // 0..1 down the whole page
  velocity: 0,
  pointerX: 0, // -1..1 normalized mouse position
  pointerY: 0,
  heroBuild: 0, // 0..1 local scroll progress through the pinned hero section
};

if (typeof window !== "undefined") {
  window.addEventListener("pointermove", (e) => {
    scrollState.pointerX = (e.clientX / window.innerWidth - 0.5) * 2;
    scrollState.pointerY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Native-scroll fallback: keeps `progress` correct even when Lenis is not
  // running (e.g. prefers-reduced-motion). Lenis-driven scrolling also moves
  // window.scrollY, so this stays accurate in both modes.
  const updateProgress = () => {
    const limit = document.documentElement.scrollHeight - window.innerHeight;
    scrollState.progress = limit > 0 ? Math.min(1, Math.max(0, window.scrollY / limit)) : 0;
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress, { passive: true });
  updateProgress();
}
