import { additionalSkills } from "@/data/projects";
import MediaFrame from "../MediaFrame";

export default function AdditionalSkills() {
  return (
    <section id="additional" className="relative bg-[var(--bg-raised)] px-6 py-20 sm:px-10">
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl font-semibold uppercase leading-[0.95] tracking-tight sm:text-5xl">
          Additional Skills
        </h2>
        <p className="max-w-xl font-mono-label text-xs text-[var(--fg-dim)] sm:text-sm">
          OUTSIDE THE EDIT BAY — DESIGN AND 3D WORK PICKED UP ALONG THE WAY.
        </p>
      </div>

      <div className="mt-12 flex flex-col gap-14">
        {additionalSkills.map((group) => (
          <div key={group.id} className="flex flex-col gap-5">
            <div className="flex items-baseline justify-between border-b border-[var(--line-soft)] pb-3 font-mono-label text-[10px] text-[var(--fg-faint)]">
              <span className="text-[var(--fg)]">{group.title}</span>
              <span>{group.note}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {group.projects.map((p) => (
                <div key={p.slug} className="flex flex-col gap-2">
                  <div className="relative aspect-video w-full overflow-hidden border border-[var(--line)]">
                    <MediaFrame media={p.media} fit="contain" className="h-full w-full" />
                  </div>
                  <span className="font-mono-label text-[10px] uppercase text-[var(--fg-dim)]">{p.title}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
