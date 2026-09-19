"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Tick = { label: string; active?: boolean };

export default function TimelineRuler({
  timecode,
  ticks,
  className = "",
}: {
  timecode: string;
  ticks: Tick[];
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);

  // The playhead only travels across the active chapter's own segment: it
  // starts where the previous chapter's tick ended and stops at the current
  // chapter's tick. No active tick → the full length.
  const activeIndex = ticks.findIndex((t) => t.active);
  const from = activeIndex === -1 ? 0 : activeIndex / ticks.length;
  const to = activeIndex === -1 ? 1 : (activeIndex + 1) / ticks.length;

  useEffect(() => {
    const root = rootRef.current;
    const playhead = playheadRef.current;
    if (!root || !playhead) return;

    const st = ScrollTrigger.create({
      trigger: root,
      start: "top 90%",
      end: "bottom 10%",
      scrub: true,
      onUpdate: (self) => {
        gsap.set(playhead, { left: `${(from + self.progress * (to - from)) * 100}%` });
      },
    });

    return () => st.kill();
  }, [from, to]);

  return (
    <div ref={rootRef} className={`w-full ${className}`}>
      <div className="relative flex items-center justify-between font-mono-label text-[10px] text-[var(--fg-faint)]">
        <span className="text-[var(--fg-dim)]">{timecode}</span>
        <span className="rec-dot text-[var(--accent)]">● REC</span>
      </div>
      <div className="relative mt-2 h-px w-full bg-[var(--line)]">
        <div
          ref={playheadRef}
          className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]"
          style={{ left: `${from * 100}%` }}
        />
      </div>
      <div className="mt-3 grid grid-flow-col auto-cols-fr gap-2">
        {ticks.map((t) => (
          <div key={t.label} className="flex flex-col gap-1">
            <div className={`rule ${t.active ? "bg-[var(--fg-dim)]" : ""}`} />
            <span
              className={`font-mono-label text-[10px] ${
                t.active ? "text-[var(--fg)]" : "text-[var(--fg-faint)]"
              }`}
            >
              {t.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
