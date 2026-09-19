"use client";

import { categories, type Category } from "@/data/projects";
import TimelineRuler from "./TimelineRuler";

export default function ChapterHeader({
  category,
  align = "left",
}: {
  category: Category;
  align?: "left" | "right";
}) {
  const ticks = categories.map((c) => ({ label: c.nav.toUpperCase(), active: c.id === category.id }));

  return (
    <header
      className={`flex flex-col gap-8 px-6 pb-12 pt-24 sm:px-10 ${
        align === "right" ? "items-end text-right" : "items-start text-left"
      }`}
    >
      <div className="flex w-full items-baseline justify-between font-mono-label text-[11px] text-[var(--fg-faint)]">
        <span>CHAPTER {category.index}</span>
        <span>{category.nav.toUpperCase()}</span>
      </div>
      <h2 className="text-[13vw] font-semibold uppercase leading-[0.9] tracking-tight sm:text-6xl md:text-[6.5vw]">
        {category.headline[0] && <span className="block">{category.headline[0]}</span>}
        <span className="block">{category.headline[1]}</span>
      </h2>
      <p className="max-w-md font-mono-label text-xs text-[var(--fg-dim)] sm:text-sm">
        {category.subtitle}
      </p>
      <TimelineRuler timecode={category.timecode} ticks={ticks} className="max-w-3xl" />
    </header>
  );
}
