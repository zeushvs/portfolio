import { tools } from "@/data/projects";

export default function Tools() {
  return (
    <section className="relative bg-[var(--bg)] px-6 py-24 sm:px-10">
      <span className="font-mono-label text-[11px] text-[var(--fg-faint)]">TOOLS</span>
      <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
        {tools.map((group) => (
          <div key={group.group} className="flex flex-col gap-4">
            <span className="font-mono-label text-[10px] text-[var(--fg-faint)]">{group.group}</span>
            <div className="flex flex-col gap-2">
              {group.items.map((item) => (
                <div key={item} className="flex items-center justify-between border-b border-[var(--line-soft)] pb-2">
                  <span className="font-mono-label text-sm text-[var(--fg-dim)]">{item}</span>
                  <span className="h-1 w-1 rounded-full bg-[var(--fg-faint)]" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
