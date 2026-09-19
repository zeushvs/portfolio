"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import MediaFrame from "./MediaFrame";
import { heroReel, profilePhoto } from "@/data/projects";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const frameCounterRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const portraitFrameRef = useRef<HTMLDivElement>(null);
  const portraitInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const videoWrap = videoWrapRef.current;
    const title = titleRef.current;
    const counter = frameCounterRef.current;
    const portraitFrame = portraitFrameRef.current;
    const portraitInner = portraitInnerRef.current;
    if (!section || !videoWrap || !title || !counter || !portraitFrame || !portraitInner) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=120%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(videoWrap, { opacity: 1, scale: 1, ease: "none" }, 0)
        .to(title, { yPercent: -12, opacity: 0, ease: "none" }, 0);

      if (!reduceMotion) {
        tl.to(portraitFrame, { y: -60, rotate: 4, scale: 0.92, opacity: 0.15, ease: "none" }, 0);
      }

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=120%",
        scrub: true,
        onUpdate: (self) => {
          const frame = Math.round(self.progress * 240);
          counter.textContent = `FRAME ${String(frame).padStart(4, "0")}`;
        },
      });

      // Cursor parallax + hover focus, fine-pointer desktop only.
      let onMove: ((e: MouseEvent) => void) | null = null;
      let onEnter: (() => void) | null = null;
      let onLeave: (() => void) | null = null;

      if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const maxOffset = 20;
        const quickX = gsap.quickTo(portraitInner, "x", { duration: 0.6, ease: "power3.out" });
        const quickY = gsap.quickTo(portraitInner, "y", { duration: 0.6, ease: "power3.out" });

        onMove = (e: MouseEvent) => {
          const rect = portraitFrame.getBoundingClientRect();
          const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
          const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
          quickX(gsap.utils.clamp(-1, 1, relX) * maxOffset);
          quickY(gsap.utils.clamp(-1, 1, relY) * maxOffset);
        };
        onEnter = () => gsap.to(portraitInner, { scale: 1.03, duration: 0.6, ease: "power3.out" });
        onLeave = () => gsap.to(portraitInner, { scale: 1, x: 0, y: 0, duration: 0.7, ease: "power3.out" });

        section.addEventListener("mousemove", onMove);
        portraitFrame.addEventListener("mouseenter", onEnter);
        portraitFrame.addEventListener("mouseleave", onLeave);
      }

      return () => {
        tl.scrollTrigger?.kill();
        st.kill();
        tl.kill();
        if (onMove) section.removeEventListener("mousemove", onMove);
        if (onEnter) portraitFrame.removeEventListener("mouseenter", onEnter);
        if (onLeave) portraitFrame.removeEventListener("mouseleave", onLeave);
      };
    });

    // Mobile: no pin, no cursor parallax — just a subtle scroll-linked drift on the portrait.
    mm.add("(max-width: 767px)", () => {
      if (reduceMotion) return () => {};

      const tween = gsap.to(portraitFrame, {
        y: -30,
        rotate: 3,
        scale: 0.95,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex h-[100vh] w-full flex-col justify-between overflow-hidden bg-[var(--bg-deep)] px-6 pb-8 pt-28 sm:px-10"
    >
      <div
        ref={videoWrapRef}
        className="absolute inset-0 opacity-[0.32] md:scale-[1.08] md:opacity-0"
        style={{ transform: "scale(1.02)" }}
      >
        <MediaFrame media={heroReel} className="h-full w-full" priority frameLabel="showreel montage — hidden until scroll" />
        <div className="absolute inset-0 bg-[var(--bg-deep)]/25" />
      </div>

      <div className="relative z-10 flex items-start justify-between font-mono-label text-[11px] text-[var(--fg-dim)]">
        <span>
          01 / 09
          <br />
          VISUAL CREATIVE
        </span>
        <span className="text-right">
          60 FPS · 4K
          <br />
          TIMELINE 01 · 2026
        </span>
      </div>

      <div
        ref={titleRef}
        className="relative z-10 flex flex-1 flex-col items-center justify-center gap-10 md:flex-row md:items-center md:justify-between md:gap-6"
      >
        <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
          <h1 className="text-[13vw] font-semibold uppercase leading-[0.9] tracking-tight sm:text-[9vw] md:text-[7.5vw]">
            HARSHVARDHAN
            <br />
            SINGH
          </h1>
          <p className="font-mono-label text-xs text-[var(--fg-faint)] sm:text-sm">
            AN ENGINEER WHO DECIDED TO FOLLOW HIS PASSION
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 font-mono-label text-xs text-[var(--fg-dim)] sm:text-sm md:justify-start">
            <span>EDITOR</span>
            <span>CINEMATOGRAPHER</span>
            <span>VISUAL STORYTELLER</span>
          </div>
        </div>

        <div
          ref={portraitFrameRef}
          className="group relative h-[65vw] w-[65vw] shrink-0 overflow-hidden rounded-full border border-[var(--line)] sm:h-[60vw] sm:w-[60vw] md:h-[65vh] md:w-[65vh]"
        >
          <div ref={portraitInnerRef} className="absolute -inset-[8%]">
            <MediaFrame media={profilePhoto} className="h-full w-full" priority frameLabel="profile photo" />
          </div>

          <div className="pointer-events-none absolute inset-0 hidden items-center justify-center opacity-0 transition-opacity duration-300 motion-reduce:transition-none md:flex md:group-hover:opacity-100">
            <div className="relative h-14 w-14 scale-90 transition-transform duration-300 motion-reduce:transition-none md:group-hover:scale-100">
              <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-[var(--fg)]/80" />
              <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-[var(--fg)]/80" />
              <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-[var(--fg)]/80" />
              <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-[var(--fg)]/80" />
              <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--fg)]/90" />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between">
        <div className="h-px flex-1 bg-[var(--line)]" />
        <span ref={frameCounterRef} className="mx-4 font-mono-label text-[10px] text-[var(--fg-faint)]">
          FRAME 0000
        </span>
        <div className="h-px flex-1 bg-[var(--line)]" />
      </div>
    </section>
  );
}
