"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useTransform } from "motion/react";
import { useGlobalScrollProgress } from "./ScrollProgressContext";

const LINKS = [
  { href: "#brand", label: "WORK" },
  { href: "#about", label: "ABOUT" },
  { href: "#contact", label: "CONTACT" },
];

export default function Navigation() {
  const progress = useGlobalScrollProgress();
  const scaleX = useTransform(progress, [0, 1], [0, 1]);
  const [dimmed, setDimmed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targets = ["#showreel"]
      .map((s) => document.querySelector(s))
      .filter(Boolean) as Element[];
    if (targets.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const anyDominant = entries.some(
          (e) => e.isIntersecting && e.intersectionRatio > 0.6
        );
        setDimmed(anyDominant);
      },
      { threshold: [0, 0.6, 1] }
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={navRef}
      className="fixed inset-x-0 top-0 z-50 transition-opacity duration-500"
      style={{ opacity: dimmed ? 0.4 : 1 }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-[var(--bg)] via-[var(--bg)]/70 to-transparent" />
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 sm:px-10">
        <a href="#hero" className="font-mono-label text-[11px] text-[var(--fg-dim)]">
          PORTFOLIO
        </a>
        <ul className="hidden items-center gap-8 sm:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-mono-label text-[13px] text-[var(--fg-dim)] transition-colors hover:text-[var(--fg)]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4 sm:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="font-mono-label text-[11px] text-[var(--fg-dim)]"
          >
            {menuOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
        <span className="hidden font-mono-label text-[11px] text-[var(--fg-faint)] sm:inline">2026</span>
      </nav>
      {menuOpen && (
        <ul
          id="mobile-nav-menu"
          className="flex flex-col gap-1 border-t border-[var(--line-soft)] bg-[var(--bg)] px-6 py-4 sm:hidden"
        >
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 font-mono-label text-lg uppercase text-[var(--fg-dim)] transition-colors hover:text-[var(--fg)]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
      <div className="h-px w-full bg-[var(--line-soft)]">
        <motion.div
          style={{ scaleX, transformOrigin: "0% 50%" }}
          className="h-px w-full bg-[var(--accent)]"
        />
      </div>
    </div>
  );
}
