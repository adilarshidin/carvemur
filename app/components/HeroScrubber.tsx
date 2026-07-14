"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

const FRAME_COUNT = 151;

function frameSrc(index: number) {
  return `/frames/frame_${String(index + 1).padStart(4, "0")}.jpg`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function HeroScrubber() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const ready = loadedCount > 0;

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const canvasRatio = cw / ch;
    const imageRatio = iw / ih;

    let sx = 0;
    let sy = 0;
    let sw = iw;
    let sh = ih;

    if (imageRatio > canvasRatio) {
      sw = ih * canvasRatio;
      sx = (iw - sw) / 2;
    } else {
      sh = iw / canvasRatio;
      sy = (ih - sh) / 2;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  }, []);

  const updateFrame = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const scrollableDistance = rect.height - window.innerHeight;
    const progress =
      scrollableDistance > 0 ? clamp(-rect.top / scrollableDistance, 0, 1) : 0;
    const frameIndex = Math.round(progress * (FRAME_COUNT - 1));

    currentFrameRef.current = frameIndex;
    drawFrame(frameIndex);

    // Logo and scroll-hint fade out over the first bit of scrubbing.
    const overlay = overlayRef.current;
    if (overlay) {
      const overlayOpacity = 1 - clamp(progress / 0.08, 0, 1);
      overlay.style.opacity = String(overlayOpacity);
      overlay.style.pointerEvents = overlayOpacity < 0.05 ? "none" : "auto";
    }
  }, [drawFrame]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    updateFrame();
  }, [updateFrame]);

  // Preload every frame so any scroll position can be rendered instantly.
  useEffect(() => {
    let cancelled = false;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (cancelled) return;
        if (i === currentFrameRef.current) drawFrame(i);
        setLoadedCount((count) => count + 1);
      };
      img.src = frameSrc(i);
      imagesRef.current[i] = img;
    }

    return () => {
      cancelled = true;
    };
  }, [drawFrame]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  const lenis = useLenis(() => {
    updateFrame();
  }, [updateFrame]);

  const handleScrollDown = useCallback(() => {
    const target = containerRef.current
      ? containerRef.current.offsetTop + window.innerHeight
      : window.innerHeight;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.2 });
    } else {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  }, [lenis]);

  const loadingProgress = Math.round((loadedCount / FRAME_COUNT) * 100);

  return (
    <div
      ref={containerRef}
      id="hero"
      className="relative h-[500vh] w-full bg-black"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="block h-full w-full" />
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-black text-sm tracking-wide text-white/70">
            Loading {loadingProgress}%
          </div>
        )}

        <div ref={overlayRef} className="absolute inset-0">
          <button
            type="button"
            onClick={handleScrollDown}
            aria-label="Desplázate hacia abajo"
            className="group absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 transition-colors hover:text-white"
          >
            <svg
              className="h-7 w-7 animate-bounce md:h-8 md:w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 4v15M5 12l7 7 7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
