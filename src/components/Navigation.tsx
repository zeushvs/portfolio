"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useTransform } from "motion/react";
import { useGlobalScrollProgress } from "./ScrollProgressContext";

const LINKS = [
  { href: "#work", label: "WORK" },
  { href: "#about", label: "ABOUT" },
  { href: "#contact", label: "CONTACT" },
];

export default function Navigation() {
  const progress = useGlobalScrollProgress();
  const scaleX = useTransform(progress, [0, 1], [0, 1]);
  const [dimmed, setDimmed] = useState(false);
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
          HS / REEL
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
        <span className="font-mono-label text-[11px] text-[var(--fg-faint)]">2026</span>
      </nav>
      <div className="h-px w-full bg-[var(--line-soft)]">
        <motion.div
          style={{ scaleX, transformOrigin: "0% 50%" }}
          className="h-px w-full bg-[var(--accent)]"
        />
      </div>
    </div>
  );
}
