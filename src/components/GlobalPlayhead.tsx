"use client";

import { useRef } from "react";
import { motion, useMotionValueEvent, useTransform } from "motion/react";
import { useGlobalScrollProgress } from "./ScrollProgressContext";

export default function GlobalPlayhead() {
  const progress = useGlobalScrollProgress();
  const top = useTransform(progress, [0, 1], ["0%", "100%"]);
  const labelRef = useRef<HTMLSpanElement>(null);

  useMotionValueEvent(progress, "change", (v) => {
    const totalSeconds = Math.round(v * 59 * 60 + v * 59);
    const m = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const s = String(totalSeconds % 60).padStart(2, "0");
    if (labelRef.current) labelRef.current.textContent = `${m}:${s}`;
  });

  return (
    <div className="pointer-events-none fixed left-4 top-0 z-40 hidden h-full flex-col items-center lg:flex">
      <div className="relative h-[70vh] w-px bg-[var(--line)]" style={{ marginTop: "15vh" }}>
        <motion.div
          style={{ top }}
          className="absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
        >
          <span ref={labelRef} className="font-mono-label whitespace-nowrap text-[9px] text-[var(--fg-dim)]">
            00:00
          </span>
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
        </motion.div>
      </div>
    </div>
  );
}
