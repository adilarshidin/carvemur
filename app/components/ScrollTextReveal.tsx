"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

type ScrollTextRevealProps = {
  /** The paragraph that brightens word-by-word as it scrolls through view */
  text: string;
  /** Small uppercase label above the paragraph, e.g. "Nuestra Filosofía" */
  eyebrow?: string;
  /** Dim opacity each word starts at (0–1) */
  dimOpacity?: number;
};

export default function ScrollTextReveal({
  text,
  eyebrow,
  dimOpacity = 0.15,
}: ScrollTextRevealProps) {
  const targetRef = useRef<HTMLParagraphElement>(null);

  // The reveal runs from when the paragraph's top hits 90% of the viewport
  // until it reaches 25% — a comfortable, readable scrub window.
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = text.split(" ");

  return (
    <section
      id="manifesto"
      className="flex w-full justify-center bg-[#faf7f2] px-6 py-[40vh]"
      style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
    >
      <div className="max-w-3xl">
        {eyebrow && (
          <p className="mb-8 font-sans text-[0.7rem] uppercase tracking-[0.28em] text-amber-600">
            {eyebrow}
          </p>
        )}

        <p
          ref={targetRef}
          className="flex flex-wrap font-sans text-2xl font-medium leading-snug tracking-[-0.02em] text-[#111111] md:text-4xl md:leading-snug"
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[start, end]}
                dimOpacity={dimOpacity}
              >
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
  dimOpacity,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  dimOpacity: number;
}) {
  const opacity = useTransform(progress, range, [dimOpacity, 1]);
  return (
    <span className="relative mr-[0.28em] mt-[0.18em]">
      {/* faint static ghost keeps the line readable before reveal */}
      <span style={{ opacity: dimOpacity }}>{children}</span>
      <motion.span className="absolute inset-0" style={{ opacity }}>
        {children}
      </motion.span>
    </span>
  );
}
