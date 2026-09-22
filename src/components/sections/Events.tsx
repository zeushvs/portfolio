"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { categories } from "@/data/projects";
import { gsap } from "@/lib/gsap";
import ChapterHeader from "../ChapterHeader";
import MediaFrame from "../MediaFrame";

const category = categories.find((c) => c.id === "events")!;
const CUT_COUNT = 8;

function CutStrip({
  stripRef,
  wrapRef,
  activeIndex,
  onSelect,
}: {
  stripRef: RefObject<HTMLDivElement | null>;
  wrapRef: RefObject<HTMLDivElement | null>;
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div ref={wrapRef} className="relative w-full overflow-x-auto md:overflow-hidden">
      <div ref={stripRef} className="flex w-max gap-3 px-6 sm:px-10">
        {Array.from({ length: CUT_COUNT }).map((_, i) => {
          const projectIndex = i % category.projects.length;
          const isActive = projectIndex === activeIndex;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(projectIndex)}
              aria-label={`Play ${category.projects[projectIndex].title} on the main screen`}
              className={`relative h-[24vh] w-[28vw] flex-shrink-0 overflow-hidden text-left transition-opacity duration-200 sm:h-[38vh] sm:w-[20vw] ${
                isActive ? "opacity-100 ring-1 ring-[var(--fg)]" : "opacity-60 hover:opacity-90"
              }`}
            >
              <MediaFrame
                media={category.projects[projectIndex].media}
                interactive={false}
                still
                className="h-full w-full"
              />
              <span className="absolute inset-x-2 top-2 font-mono-label text-[9px] leading-tight text-[var(--fg-dim)]">
                CUT {String(projectIndex + 1).padStart(2, "0")} — {category.projects[projectIndex].title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Events() {
  const topStripRef = useRef<HTMLDivElement>(null);
  const topWrapRef = useRef<HTMLDivElement>(null);
  const bottomStripRef = useRef<HTMLDivElement>(null);
  const bottomWrapRef = useRef<HTMLDivElement>(null);
  const cutWordsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const topStrip = topStripRef.current;
    const topWrap = topWrapRef.current;
    const bottomStrip = bottomStripRef.current;
    const bottomWrap = bottomWrapRef.current;
    const cutWords = cutWordsRef.current;
    if (!topStrip || !topWrap || !bottomStrip || !bottomWrap || !cutWords) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const topTl = gsap.fromTo(
        topStrip,
        { xPercent: 0 },
        {
          xPercent: -55,
          ease: "none",
          scrollTrigger: {
            trigger: topWrap,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
          },
        }
      );

      const bottomTl = gsap.fromTo(
        bottomStrip,
        { xPercent: 0 },
        {
          xPercent: -55,
          ease: "none",
          scrollTrigger: {
            trigger: bottomWrap,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
          },
        }
      );

      const words = gsap.fromTo(
        cutWords.children,
        { opacity: 0.1 },
        {
          opacity: 1,
          ease: "none",
          stagger: { each: 0.15, from: "start" },
          scrollTrigger: {
            trigger: topWrap,
            start: "top 70%",
            end: "top 10%",
            scrub: true,
          },
        }
      );

      return () => {
        topTl.scrollTrigger?.kill();
        bottomTl.scrollTrigger?.kill();
        words.scrollTrigger?.kill();
        topTl.kill();
        bottomTl.kill();
        words.kill();
      };
    });
    return () => mm.revert();
  }, []);

  const active = category.projects[activeIndex];

  return (
    <section id="events" className="relative overflow-hidden bg-[var(--bg)]">
      <ChapterHeader category={category} />

      <div ref={cutWordsRef} className="flex flex-wrap gap-x-4 px-6 pb-10 sm:px-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="text-3xl font-semibold uppercase tracking-tight text-[var(--fg-faint)] sm:text-5xl">
            CUT
          </span>
        ))}
      </div>

      <CutStrip stripRef={topStripRef} wrapRef={topWrapRef} activeIndex={activeIndex} onSelect={setActiveIndex} />

      <div className="relative px-6 py-6 sm:px-10">
        <div className="relative aspect-video w-full overflow-hidden sm:aspect-auto sm:h-[85vh]">
          <MediaFrame media={active.media} fit="contain-mobile" className="h-full w-full" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 sm:p-10">
            <div className="flex items-baseline justify-between font-mono-label text-[10px] text-[var(--fg-dim)]">
              <span>
                {String(activeIndex + 1).padStart(2, "0")} / {active.services.join(" · ")}
              </span>
              {active.year && <span>{active.year}</span>}
            </div>
            <h3 className="text-4xl font-semibold uppercase tracking-tight text-[var(--fg)] sm:text-6xl">
              {active.title}
            </h3>
            <div className="flex flex-wrap gap-x-6 font-mono-label text-[11px] text-[var(--fg-dim)]">
              {active.client && <span>CLIENT — {active.client}</span>}
              <span>ROLE — {active.role}</span>
            </div>
            {active.blurb && (
              <p className="mt-2 max-w-md font-mono-label text-xs leading-relaxed text-[var(--fg-faint)]">
                {active.blurb}
              </p>
            )}
          </div>
        </div>
      </div>

      <CutStrip stripRef={bottomStripRef} wrapRef={bottomWrapRef} activeIndex={activeIndex} onSelect={setActiveIndex} />
    </section>
  );
}
