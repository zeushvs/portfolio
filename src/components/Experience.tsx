import { experience } from "@/data/projects";

export default function Experience() {
  return (
    <section className="relative bg-[var(--bg-raised)] px-6 py-24 sm:px-10">
      <span className="font-mono-label text-[11px] text-[var(--fg-faint)]">PRODUCTION TIMELINE</span>

      <div className="relative mt-10 flex items-center justify-between font-mono-label text-xs text-[var(--fg-dim)]">
        <span>2024</span>
        <div className="h-px flex-1 bg-[var(--line)]" />
        <span>2025</span>
        <div className="h-px flex-1 bg-[var(--line)]" />
        <span>2026</span>
        <div className="h-px flex-1 bg-[var(--line)]" />
        <span className="text-[var(--accent)]">NOW</span>
      </div>

      <div className="mt-16 flex flex-col gap-10 sm:flex-row sm:gap-6">
        {experience.map((e) => (
          <div key={e.org} className="flex-1 border-l border-[var(--line)] pl-6">
            <span className="font-mono-label text-[10px] text-[var(--fg-faint)]">{e.period}</span>
            <h3 className="mt-2 text-2xl font-semibold uppercase tracking-tight">{e.org}</h3>
            <p className="mt-1 whitespace-pre-line font-mono-label text-xs text-[var(--fg-dim)]">{e.role}</p>
            {e.detail && <p className="mt-2 font-mono-label text-xs text-[var(--fg-faint)]">{e.detail}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
