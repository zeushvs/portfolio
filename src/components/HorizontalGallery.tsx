"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import type { Category } from "@/data/projects";
import ChapterHeader from "./ChapterHeader";
import MediaFrame from "./MediaFrame";

// Pins the section and converts vertical scroll into horizontal movement of
// the track until every slide has passed, then releases the pin so normal
// vertical scrolling continues into the next section. Desktop only — on
// small screens the track falls back to a plain vertical stack.
export default function HorizontalGallery({
  category,
  numberOnly = false,
}: {
  category: Category;
  // First caption line shows just "01", "02", … instead of "01 / Services".
  numberOnly?: boolean;
}) {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

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
  }, [category]);

  return (
    <section id={category.id} className="relative bg-[var(--bg)]">
      <ChapterHeader category={category} />
      <div ref={pinRef} className="relative w-full overflow-hidden">
        <div ref={trackRef} className="flex flex-col gap-4 md:h-screen md:flex-row md:gap-0">
          {category.projects.map((project, i) => (
            <div
              key={project.slug}
              className="relative w-full shrink-0 px-6 py-6 sm:px-10 md:h-full md:w-screen md:px-0 md:py-0"
            >
              <div className="relative aspect-video w-full overflow-hidden sm:aspect-auto sm:h-[85vh] md:h-full">
                {project.gallery && project.gallery.length === 2 ? (
                  <div className="absolute inset-0 flex">
                    <div className="relative h-full w-1/2 border-r border-white/10">
                      <MediaFrame media={project.gallery[0]} fit="contain-mobile" className="h-full w-full" />
                    </div>
                    <div className="relative h-full w-1/2">
                      <MediaFrame media={project.gallery[1]} fit="contain-mobile" className="h-full w-full" />
                    </div>
                  </div>
                ) : (
                  <MediaFrame media={project.media} fit="contain-mobile" className="h-full w-full" />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-1 p-3 sm:gap-2 sm:p-10">
                  <div className="flex items-baseline justify-between font-mono-label text-[9px] text-[var(--fg-dim)] sm:text-[10px]">
                    <span>
                      {String(i + 1).padStart(2, "0")}
                      {!numberOnly && ` / ${project.services.join(" · ")}`}
                    </span>
                    {project.year && <span>{project.year}</span>}
                  </div>
                  <h3 className="text-xl font-semibold uppercase tracking-tight text-[var(--fg)] sm:text-6xl">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-x-3 font-mono-label text-[9px] text-[var(--fg-dim)] sm:gap-x-6 sm:text-[11px]">
                    {project.client && <span>CLIENT — {project.client}</span>}
                    <span>ROLE — {project.role}</span>
                  </div>
                  {project.blurb && (
                    <p className="hidden font-mono-label leading-relaxed text-[var(--fg-faint)] sm:mt-2 sm:block sm:max-w-md sm:text-xs">
                      {project.blurb}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
