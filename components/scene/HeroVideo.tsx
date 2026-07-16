"use client";

/**
 * Scroll-scrubbed hero video. The pinned hero section feeds its local scroll
 * progress (0..1) into `scrollState.heroBuild`; we map that to the video's
 * timeline and seek frame-by-frame, so scrolling scrubs the arm build forward
 * and backward. The clip is re-encoded all-keyframe for smooth seeking.
 */

import { useEffect, useRef } from "react";
import { scrollState } from "@/lib/scroll";

export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;

    let raf = 0;
    let cur = 0;
    let lastSet = -1;

    const loop = () => {
      const dur = Number.isFinite(v.duration) && v.duration > 0 ? v.duration : 10;
      const target = scrollState.heroBuild * dur;
      // ease toward the target so scroll jumps don't snap the playhead
      cur += (target - cur) * 0.14;
      if (Math.abs(target - cur) < 0.002) cur = target;
      if (v.readyState >= 2 && Math.abs(cur - lastSet) > 0.01) {
        try {
          v.currentTime = cur;
          lastSet = cur;
        } catch {
          /* seek not ready yet */
        }
      }
      raf = requestAnimationFrame(loop);
    };

    // Prime the decoder so seeking paints frames reliably (esp. Safari).
    const prime = () => {
      v.play().then(() => v.pause()).catch(() => {});
    };
    v.addEventListener("loadeddata", prime, { once: true });

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener("loadeddata", prime);
    };
  }, []);

  return (
    <video
      ref={ref}
      src="/videos/origin-arm.mp4"
      muted
      playsInline
      preload="auto"
      className="absolute inset-0 h-full w-full object-cover [object-position:64%_center]"
      style={{ filter: "contrast(1.05) saturate(0.9) brightness(0.96)" }}
    />
  );
}
