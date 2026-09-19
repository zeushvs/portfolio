import { categories } from "@/data/projects";
import ChapterHeader from "../ChapterHeader";
import MediaFrame from "../MediaFrame";

const category = categories.find((c) => c.id === "cinematography")!;
const specs = ["24 FPS", "50 MM", "1/125", "ISO 400"];

export default function Cinematography() {
  return (
    <section id="cinematography" className="relative bg-[var(--bg)]">
      <ChapterHeader category={category} align="right" />
      <div className="grid grid-cols-1 gap-px bg-[var(--line)] sm:grid-cols-2">
        {category.projects.map((p) => (
          <div key={p.slug} className="relative aspect-video bg-[var(--bg)]">
            <MediaFrame media={p.media} fit="contain" className="h-full w-full" />
            <div className="pointer-events-none absolute left-4 top-4 flex flex-wrap gap-2">
              {specs.map((s) => (
                <span
                  key={s}
                  className="rounded-sm border border-[var(--line)] bg-black/40 px-2 py-1 font-mono-label text-[9px] text-[var(--fg-dim)] backdrop-blur-sm"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-baseline justify-between bg-gradient-to-t from-black/55 to-transparent p-4">
              <h3 className="font-mono-label text-sm uppercase tracking-wide text-[var(--fg)]">{p.title}</h3>
              <span className="font-mono-label text-[10px] text-[var(--fg-dim)]">{p.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
