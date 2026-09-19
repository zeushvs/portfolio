"use client";

import { useEffect, useRef, useState } from "react";
import { contactLinks, type ContactLink } from "@/data/projects";

const linkClass =
  "font-mono-label text-xs text-[var(--fg-dim)] underline-offset-4 transition-colors hover:text-[var(--fg)] hover:underline";

// A link that opens a small menu of destinations instead of navigating.
function LinkMenu({ link }: { link: ContactLink }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    // `flex` (not a plain block) so the button is a flex item like the sibling
    // <a> links — inside a block the body-font line-box strut pushes its text down.
    <div ref={wrapRef} className="relative flex">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        className={linkClass}
      >
        {link.label}
        <span aria-hidden className="ml-1 inline-block text-[9px] leading-none">
          {open ? "▴" : "▾"}
        </span>
      </button>
      {open && (
        <ul className="absolute bottom-full left-0 z-10 mb-3 flex min-w-48 flex-col border border-[var(--line)] bg-black py-1">
          {link.options?.map((o) => (
            <li key={o.href}>
              <a
                href={o.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block whitespace-nowrap px-4 py-2 font-mono-label text-xs text-[var(--fg-dim)] transition-colors hover:bg-white/5 hover:text-[var(--fg)]"
              >
                {o.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative flex min-h-screen flex-col justify-between bg-black px-6 py-16 sm:px-10">
      <div className="flex-1" />
      <div className="flex flex-col items-start gap-10">
        <h2 className="max-w-3xl text-[11vw] font-semibold uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
          LET&apos;S MAKE
          <br />
          SOMETHING
          <br />
          WORTH WATCHING.
        </h2>

        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold uppercase tracking-tight">HARSHVARDHAN SINGH</h3>
          <div className="flex flex-wrap gap-x-4 font-mono-label text-xs text-[var(--fg-dim)]">
            <span>VIDEO EDITOR</span>
            <span>CINEMATOGRAPHER</span>
            <span>VISUAL STORYTELLER</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          {contactLinks.map((link) =>
            link.options ? (
              <LinkMenu key={link.label} link={link} />
            ) : (
              <a
                key={link.label}
                href={link.href}
                {...(link.href?.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={linkClass}
              >
                {link.label}
              </a>
            )
          )}
        </div>
      </div>

      <div className="mt-24 flex items-center justify-between border-t border-[var(--line)] pt-6 font-mono-label text-[10px] text-[var(--fg-faint)]">
        <span>TIMELINE COMPLETE</span>
        <span>00:59:59:29</span>
      </div>
    </section>
  );
}
