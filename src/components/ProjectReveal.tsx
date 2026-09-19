"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import type { Project } from "@/data/projects";
import MediaFrame from "./MediaFrame";

export default function ProjectReveal({ project, index }: { project: Project; index: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const media = mediaRef.current;
    const meta = metaRef.current;
    if (!wrap || !media || !meta) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top 90%",
          end: "top 20%",
          scrub: true,
        },
      });
      tl.fromTo(media, { scale: 0.86, borderRadius: 24 }, { scale: 1, borderRadius: 0, ease: "none" }, 0);
      tl.fromTo(meta, { opacity: 0, y: 24 }, { opacity: 1, y: 0, ease: "none" }, 0.15);

      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "bottom 40%",
          end: "bottom -10%",
          scrub: true,
        },
      });
      exitTl.to(media, { scale: 0.94, opacity: 0.5, ease: "none" });

      return () => {
        tl.scrollTrigger?.kill();
        exitTl.scrollTrigger?.kill();
        tl.kill();
        exitTl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={wrapRef} className="relative px-6 py-6 sm:px-10">
      <div
        ref={mediaRef}
        className="relative h-[60vh] w-full overflow-hidden sm:h-[85vh]"
      >
        <MediaFrame media={project.media} className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <div
          ref={metaRef}
          className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 sm:p-10"
        >
          <div className="flex items-baseline justify-between font-mono-label text-[10px] text-[var(--fg-dim)]">
            <span>{String(index + 1).padStart(2, "0")} / {project.services.join(" · ")}</span>
            <span>{project.year}</span>
          </div>
          <h3 className="text-4xl font-semibold uppercase tracking-tight text-[var(--fg)] sm:text-6xl">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-x-6 font-mono-label text-[11px] text-[var(--fg-dim)]">
            {project.client && <span>CLIENT — {project.client}</span>}
            <span>ROLE — {project.role}</span>
          </div>
          {project.blurb && (
            <p className="mt-2 max-w-md font-mono-label text-xs leading-relaxed text-[var(--fg-faint)]">
              {project.blurb}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
