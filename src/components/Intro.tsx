"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Intro() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const lines = root.querySelectorAll("[data-line]");

    const st = gsap.fromTo(
      lines,
      { opacity: 0.15, y: 12 },
      {
        opacity: 1,
        y: 0,
        ease: "none",
        stagger: 0.08,
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          end: "top 30%",
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
    <section className="relative flex min-h-[70vh] flex-col items-start justify-center gap-10 px-6 py-32 sm:px-10">
      <h2 className="max-w-4xl text-[9vw] font-semibold uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
        <span data-line className="block">I TURN MOMENTS</span>
        <span data-line className="block">INTO STORIES.</span>
      </h2>
      <p data-line className="max-w-md font-mono-label text-sm leading-relaxed text-[var(--fg-dim)]">
        I shoot. I cut. I create.
        <br />
        Building visual stories for brands, people &amp; places.
      </p>
    </section>
  );
}
