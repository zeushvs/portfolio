import { categories } from "@/data/projects";
import ChapterHeader from "../ChapterHeader";
import MediaFrame from "../MediaFrame";

const category = categories.find((c) => c.id === "photography")!;

export default function Photography() {
  const [street, ...rest] = category.projects;

  return (
    <section id="photography" className="relative bg-[var(--bg)]">
      <ChapterHeader category={category} />

      <div className="flex flex-col gap-3 px-6 pb-24 sm:px-10">
        <div className="relative aspect-video w-full overflow-hidden border border-[var(--line)]">
          <MediaFrame media={street.media} fit="contain" className="h-full w-full" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <span className="pointer-events-none absolute left-3 top-3 font-mono-label text-[9px] text-[var(--fg-dim)]">
            FRAME 001
          </span>
          <span className="pointer-events-none absolute bottom-4 left-4 text-2xl font-semibold uppercase leading-none tracking-tight text-[var(--fg-dim)] sm:bottom-6 sm:left-6 sm:text-4xl">
            {street.services[0]}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {rest.map((p, i) => (
            <div key={p.slug} className="relative aspect-[4/5] overflow-hidden border border-[var(--line)]">
              <MediaFrame media={p.media} className="h-full w-full" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="pointer-events-none absolute left-3 top-3 font-mono-label text-[9px] text-[var(--fg-dim)]">
                FRAME {String(i + 2).padStart(3, "0")}
              </span>
              <span className="pointer-events-none absolute bottom-4 left-4 text-xl font-semibold uppercase leading-none tracking-tight text-[var(--fg-dim)] sm:text-2xl">
                {p.services[0]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
