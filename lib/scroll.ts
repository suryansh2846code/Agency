// Shared scroll state, read inside the R3F render loop (useFrame) without
// triggering React re-renders. Updated by the Lenis provider on scroll.
export const scrollState = {
  progress: 0, // 0..1 down the whole page
  velocity: 0,
  pointerX: 0, // -1..1 normalized mouse position
  pointerY: 0,
};

if (typeof window !== "undefined") {
  window.addEventListener("pointermove", (e) => {
    scrollState.pointerX = (e.clientX / window.innerWidth - 0.5) * 2;
    scrollState.pointerY = (e.clientY / window.innerHeight - 0.5) * 2;
  });
}
