"use client";

import { useEffect, useRef } from "react";
import { categories } from "@/data/projects";
import { gsap } from "@/lib/gsap";
import ChapterHeader from "../ChapterHeader";
import MediaFrame from "../MediaFrame";

const category = categories.find((c) => c.id === "travel")!;

export default function Travel() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const layers = root.querySelectorAll<HTMLElement>("[data-parallax]");

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const tweens = Array.from(layers).map((layer) => {
        const speed = Number(layer.dataset.parallax ?? 0.1);
        return gsap.fromTo(
          layer,
          { yPercent: -speed * 40 },
          {
            yPercent: speed * 40,
            ease: "none",
            scrollTrigger: {
              trigger: layer,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
      return () => tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="travel" ref={rootRef} className="relative bg-[var(--bg)]">
      <ChapterHeader category={category} align="right" />

      <div className="px-6 py-16 sm:px-10">
        <p className="max-w-2xl text-4xl font-semibold uppercase leading-tight tracking-tight sm:text-6xl">
          PLACES I&apos;VE SEEN.
          <br />
          STORIES I&apos;VE CAPTURED.
        </p>
      </div>

      <div className="flex flex-col gap-24 pb-24">
        {category.projects.map((p, i) => (
          <div
            key={p.slug}
            className={`relative px-6 sm:px-10 ${i % 2 === 1 ? "flex justify-end" : ""}`}
          >
            <div
              data-parallax={0.08 + i * 0.04}
              className="relative aspect-video w-full overflow-hidden sm:aspect-auto sm:h-[75vh] sm:w-[75%]"
            >
              <MediaFrame media={p.media} fit="contain-mobile" className="h-full w-full" />
              <div className="pointer-events-none absolute bottom-6 left-6 font-mono-label text-[13px] text-[var(--fg-dim)]">
                {p.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
