"use client";

import { useEffect, useRef, useState } from "react";
import { categories } from "@/data/projects";
import ChapterHeader from "../ChapterHeader";
import MediaFrame from "../MediaFrame";
import { useCursor } from "../cursor/CursorContext";

const category = categories.find((c) => c.id === "corporate")!;

// Feathers the player's edges so it dissolves into the section background
// instead of reading as a hard-edged box.
const featherMask = {
  maskImage:
    "linear-gradient(to right, transparent 0%, #000 22%), linear-gradient(to bottom, transparent 0%, #000 14%, #000 86%, transparent 100%)",
  maskComposite: "intersect",
  WebkitMaskImage:
    "linear-gradient(to right, transparent 0%, #000 22%), linear-gradient(to bottom, transparent 0%, #000 14%, #000 86%, transparent 100%)",
  WebkitMaskComposite: "source-in",
} as React.CSSProperties;

export default function Corporate() {
  // Slug of the row whose video is currently playing large (one at a time).
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const rowRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const { setCursor } = useCursor();

  // Collapsing the previously open row above can shift the newly opened one;
  // nudge it back into view.
  useEffect(() => {
    if (!openSlug) return;
    const id = requestAnimationFrame(() => {
      rowRefs.current[openSlug]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
    return () => cancelAnimationFrame(id);
  }, [openSlug]);

  const toggle = (slug: string) => {
    // The element under the pointer is about to be swapped, so its
    // pointer-leave never fires — reset the cursor by hand.
    setCursor("default");
    setOpenSlug((cur) => (cur === slug ? null : slug));
  };

  return (
    <section id="corporate" className="relative bg-[var(--bg-raised)]">
      <ChapterHeader category={category} />
      <div className="flex flex-col divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {category.projects.map((p, i) => {
          const isOpen = openSlug === p.slug;
          return (
            <div
              key={p.slug}
              ref={(el) => {
                rowRefs.current[p.slug] = el;
              }}
              // Open rows reserve enough height for a 16:9 player at 40% width.
              className={`relative grid grid-cols-1 items-center gap-6 px-6 py-8 sm:px-10 ${
                isOpen ? "sm:min-h-[22.5vw] sm:grid-cols-[80px_1fr]" : "sm:grid-cols-[80px_1fr_260px]"
              }`}
            >
              <span className="relative z-10 font-mono-label text-xs text-[var(--fg-faint)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative z-10 flex flex-col gap-2 sm:max-w-[55%]">
                <h3 className="text-2xl font-semibold uppercase tracking-tight sm:text-3xl">{p.title}</h3>
                <span className="font-mono-label text-[11px] text-[var(--fg-dim)]">ROLE — {p.role}</span>
              </div>

              {isOpen ? (
                // Background layer pinned to the row's right edge. The "screen"
                // blend lets the section colour show through the video's dark
                // areas. Clicking it again returns to the small preview.
                <div
                  className="relative aspect-video w-full mix-blend-screen sm:absolute sm:inset-y-0 sm:right-0 sm:z-0 sm:aspect-auto sm:w-[40%]"
                  style={featherMask}
                  onClick={() => toggle(p.slug)}
                >
                  <MediaFrame media={p.media} fit="contain" withSound interactive={false} className="h-full w-full" />
                </div>
              ) : (
                <div className="relative aspect-video w-full overflow-hidden" onClick={() => toggle(p.slug)}>
                  <MediaFrame media={p.media} interactive={false} className="h-full w-full" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
