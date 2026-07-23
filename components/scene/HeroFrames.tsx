"use client";

/**
 * Scroll-scrubbed hero image sequence (Apple-style). The pinned hero feeds its
 * local scroll progress (0..1) into `scrollState.heroBuild`; we map that to a
 * frame index and paint it onto a canvas. Painting a pre-decoded frame is far
 * smoother than seeking a video, so the arm build scrubs cleanly both ways.
 */

import { useEffect, useRef } from "react";
import { scrollState } from "@/lib/scroll";

const FRAME_COUNT = 300;
const frameUrl = (i: number) => `/hero-frames/frame-${String(i + 1).padStart(3, "0")}.jpg`;

// horizontal focus (matches the video's object-position: 64%)
const FOCUS_X = 0.64;
const FOCUS_Y = 0.5;

export default function HeroFrames() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // preload every frame; `loaded` gates drawing until a frame is decoded
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    const loaded: boolean[] = new Array(FRAME_COUNT).fill(false);
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        loaded[i] = true;
      };
      img.src = frameUrl(i);
      images[i] = img;
    }

    let cw = 0;
    let ch = 0;
    let lastDrawn = -1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      cw = rect.width;
      ch = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastDrawn = -1; // force a repaint at the new size
    };

    const draw = (img: HTMLImageElement) => {
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!iw || !ih) return;
      const scale = Math.max(cw / iw, ch / ih); // cover
      const w = iw * scale;
      const h = ih * scale;
      const x = (cw - w) * FOCUS_X;
      const y = (ch - h) * FOCUS_Y;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, x, y, w, h);
    };

    let raf = 0;
    let cur = 0;

    const loop = () => {
      const target = scrollState.heroBuild * (FRAME_COUNT - 1);
      // ease toward the target so scroll jumps don't snap
      cur += (target - cur) * 0.16;
      if (Math.abs(target - cur) < 0.01) cur = target;
      let idx = Math.round(cur);
      if (idx < 0) idx = 0;
      else if (idx > FRAME_COUNT - 1) idx = FRAME_COUNT - 1;
      if (idx !== lastDrawn && loaded[idx]) {
        draw(images[idx]);
        lastDrawn = idx;
      }
      raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ filter: "contrast(1.05) saturate(0.9) brightness(0.96)" }}
    />
  );
}
