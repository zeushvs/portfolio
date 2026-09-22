"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function ChapterTransition({ from, to }: { from: string; to: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const wipe = wipeRef.current;
    if (!root || !wipe) return;

    const st = gsap.fromTo(
      wipe,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 85%",
          end: "bottom 40%",
          scrub: true,
        },
      }
    );

    return () => {
      st.scrollTrigger?.kill();
      st.kill();
    };
  }, []);

  return (
    <div ref={rootRef} className="relative flex items-center gap-2 overflow-hidden px-6 py-6 sm:gap-4 sm:px-10">
      <span className="font-mono-label whitespace-nowrap text-[8px] text-[var(--fg-faint)] sm:text-[10px]">{from}</span>
      <div className="relative h-px min-w-4 flex-1 bg-[var(--line)]">
        <div
          ref={wipeRef}
          style={{ transformOrigin: "0% 50%" }}
          className="absolute inset-y-0 left-0 h-px w-full origin-left scale-x-0 bg-[var(--accent)]"
        />
      </div>
      <span className="font-mono-label whitespace-nowrap text-[8px] text-[var(--fg-dim)] sm:text-[10px]">{to}</span>
    </div>
  );
}
