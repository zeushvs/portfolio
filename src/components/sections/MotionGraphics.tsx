"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { categories, type Project } from "@/data/projects";
import ChapterHeader from "../ChapterHeader";
import MediaFrame from "../MediaFrame";

const category = categories.find((c) => c.id === "motion-graphics")!;

function SlideMeta({ project, index }: { project: Project; index: number }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 sm:p-8">
      <div className="flex items-baseline justify-between font-mono-label text-[10px] text-[var(--fg-dim)]">
        <span>
          {String(index + 1).padStart(2, "0")} / {project.services.join(" · ")}
        </span>
        {project.year && <span>{project.year}</span>}
      </div>
      <h3 className="text-3xl font-semibold uppercase tracking-tight text-[var(--fg)] sm:text-5xl">
        {project.title}
      </h3>
      <div className="flex flex-wrap gap-x-6 font-mono-label text-[11px] text-[var(--fg-dim)]">
        {project.client && <span>CLIENT — {project.client}</span>}
        <span>ROLE — {project.role}</span>
      </div>
    </div>
  );
}

// THF / Groww — same pinned-slide format as before, but inset with breathing
// room on every side instead of bleeding to the screen edges.
function FramedSlide({ project, index }: { project: Project; index: number }) {
  return (
    <div className="relative flex w-full shrink-0 items-center justify-center px-4 py-6 sm:px-8 md:h-full md:w-screen md:px-10 md:py-10">
      <div className="relative aspect-video w-full max-w-3xl overflow-hidden rounded-2xl sm:aspect-auto sm:h-[72vh] md:h-[80vh] md:w-[90%] md:max-w-5xl">
        <MediaFrame media={project.media} fit="contain-mobile" className="h-full w-full" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <SlideMeta project={project} index={index} />
      </div>
    </div>
  );
}

// Origin x Beerbiceps — both are vertical clips, shown at their native aspect
// ratio side by side (no cropping to fill), with negative space between them.
function SplitSlide({ project, index }: { project: Project; index: number }) {
  const [a, b] = project.gallery ?? [];
  if (!a || !b) return null;
  const labels = project.title.split(" × ");

  const renderClip = (i: 0 | 1) => (
    <div className="flex flex-col items-center gap-3">
      <div className="relative aspect-[9/16] h-[42vh] overflow-hidden rounded-2xl sm:h-[55vh] md:h-[68vh]">
        <MediaFrame media={i === 0 ? a : b} fit="contain" className="h-full w-full" />
      </div>
      <span className="text-xl font-semibold uppercase tracking-tight text-[var(--fg)] sm:text-2xl">
        {labels[i]?.trim() ?? project.title}
      </span>
    </div>
  );

  return (
    <div className="relative flex w-full shrink-0 flex-col items-center justify-center gap-8 px-6 py-10 sm:px-10 md:h-full md:w-screen md:px-16 md:py-16">
      <div className="flex flex-col items-center gap-6 md:flex-row md:gap-20">
        {renderClip(0)}
        <span className="hidden shrink-0 flex-col items-center text-center font-mono-label text-[12px] uppercase tracking-[0.2em] text-[var(--fg-faint)] md:flex">
          <span>Vertical format</span>
          <span>Social media content</span>
        </span>
        {renderClip(1)}
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex items-baseline gap-6 font-mono-label text-[10px] text-[var(--fg-dim)]">
          <span>
            {String(index + 1).padStart(2, "0")} / {project.services.join(" · ")}
          </span>
          {project.year && <span>{project.year}</span>}
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 font-mono-label text-[11px] text-[var(--fg-dim)]">
          {project.client && <span>CLIENT — {project.client}</span>}
          <span>ROLE — {project.role}</span>
        </div>
      </div>
    </div>
  );
}

export default function MotionGraphics() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [groww, thf, split] = category.projects;

  useEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const getDistance = () => Math.max(0, track.scrollWidth - pin.offsetWidth);

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => "+=" + getDistance(),
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id={category.id} className="relative bg-[var(--bg)]">
      <ChapterHeader category={category} />
      <div ref={pinRef} className="relative w-full overflow-hidden">
        <div ref={trackRef} className="flex flex-col gap-6 md:h-screen md:flex-row md:gap-0">
          <FramedSlide project={groww} index={0} />
          <FramedSlide project={thf} index={1} />
          <SplitSlide project={split} index={2} />
        </div>
      </div>
    </section>
  );
}
