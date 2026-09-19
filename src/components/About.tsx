import { profilePhoto } from "@/data/projects";
import MediaFrame from "./MediaFrame";

const stats = [
  { value: "2+", label: "years\nExperience" },
  { value: "100+", label: "videos\nCompleted" },
  { value: "7+", label: "brand\nCollaborations" },
];

export default function About() {
  return (
    <section
      id="about"
      // Toned-down orange, scoped to this section only (site accent is #d6482f).
      style={{ "--accent": "#c45a45" } as React.CSSProperties}
      className="relative flex min-h-[90vh] flex-col justify-center gap-12 bg-[var(--bg)] px-6 py-32 sm:px-10"
    >
      <span className="font-mono-label text-sm font-bold text-[var(--fg-faint)]">ABOUT</span>

      <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-[minmax(0,340px)_1fr] md:gap-16">
        <div className="relative mx-auto w-full max-w-xs md:mx-0">
          <div className="absolute -bottom-5 -left-5 h-full w-full rounded-md bg-[var(--accent)]" />
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md border border-[var(--line)]">
            <MediaFrame media={profilePhoto} className="h-full w-full grayscale contrast-[1.05]" priority />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <h2 className="text-[9vw] font-semibold uppercase leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Hi I am,
            <br />
            <span className="text-[var(--fg)]">HARSHVARDHAN</span>{" "}
            <span className="relative inline-block text-[var(--accent)]">
              SINGH
              <span className="ml-3 inline-block h-[0.55em] w-10 translate-y-[0.05em] bg-[var(--accent)]/50 align-middle sm:w-16" />
            </span>
          </h2>

          <p className="max-w-lg font-mono-label text-sm leading-relaxed text-[var(--fg-dim)]">
            Passionate video editor with 2+ years of experience working on Instagram content,
            YouTube videos, and creative projects for brands — specializing in engaging visual
            narratives through strategic editing, color grading, and motion graphics.
          </p>

          <div className="flex flex-wrap gap-x-10 gap-y-6">
            {stats.map((stat) => (
              <div key={stat.value} className="border-l-2 border-[var(--accent)] pl-4">
                <div className="text-2xl font-semibold text-[var(--fg)] sm:text-3xl">{stat.value}</div>
                <div className="whitespace-pre-line font-mono-label text-xs uppercase leading-tight text-[var(--fg-dim)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
