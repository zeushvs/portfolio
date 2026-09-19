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
        gsap.set(playhead, { left: `${self.progress * 100}%` });
      },
    });

    return () => st.kill();
  }, []);

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
          style={{ left: "0%" }}
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
