"use client";

import { createContext, useContext, useRef } from "react";
import { useScroll, type MotionValue } from "motion/react";

const ScrollProgressContext = createContext<MotionValue<number> | null>(null);

export function useGlobalScrollProgress() {
  const ctx = useContext(ScrollProgressContext);
  if (!ctx) throw new Error("useGlobalScrollProgress must be used within ScrollProgressProvider");
  return ctx;
}

export function ScrollProgressProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });

  return (
    <div ref={ref} id="scroll-progress-root">
      <ScrollProgressContext.Provider value={scrollYProgress}>
        {children}
      </ScrollProgressContext.Provider>
    </div>
  );
}
