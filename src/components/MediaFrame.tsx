"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import type { MediaAsset } from "@/data/projects";
import CursorTarget from "./cursor/CursorTarget";

type Props = {
  media: MediaAsset;
  className?: string;
  frameLabel?: string;
  autoPlay?: boolean;
  priority?: boolean;
  // "cover" (default) crops to fill the frame; "contain" preserves the
  // source's native aspect ratio instead (e.g. side-by-side vertical clips).
  fit?: "cover" | "contain";
  // false disables the built-in click-to-toggle-sound behavior, for
  // thumbnails whose click is repurposed by a parent (e.g. a picker strip).
  interactive?: boolean;
  // Thumbnail mode: show a single frame, never play. Avoids a live decoder
  // per tile when many large clips sit on screen at once.
  still?: boolean;
  // Start playing from the beginning with sound on as soon as it mounts —
  // for players opened by an explicit click (e.g. an expanded video).
  withSound?: boolean;
};

// How long a video may sit off-screen before its decoder/buffers are freed.
const UNLOAD_DELAY_MS = 4000;

export type MediaFrameHandle = {
  getVideo: () => HTMLVideoElement | null;
  toggleSound: () => void;
};

// Deterministic-looking placeholder gradients keyed off the label so each
// project reads as visually distinct without shipping real assets yet.
function gradientFor(label: string) {
  let hash = 0;
  for (let i = 0; i < label.length; i++) hash = (hash * 31 + label.charCodeAt(i)) >>> 0;
  const h1 = hash % 360;
  const h2 = (h1 + 40) % 360;
  return `linear-gradient(145deg, hsl(${h1} 34% 19%), hsl(${h2} 26% 13%) 60%, #0d0d0d 100%)`;
}

// Only one video on the page plays with sound at a time.
let activeAudioVideo: HTMLVideoElement | null = null;

const MediaFrame = forwardRef<MediaFrameHandle, Props>(function MediaFrame(
  { media, className = "", frameLabel, autoPlay = true, priority = false, fit = "cover", interactive = true, still = false, withSound = false },
  ref
) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(priority);
  const [soundOn, setSoundOn] = useState(false);
  const isPlayableVideo = media.kind === "video" && !media.placeholder;

  useEffect(() => {
    if (media.placeholder || media.kind !== "video") return;
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [media]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || media.placeholder || still) return;
    let unloadTimer: ReturnType<typeof setTimeout> | undefined;
    if (inView && autoPlay) {
      // The element persists across source swaps (e.g. a picker strip
      // changing which project the same <video> points at), so the load
      // algorithm needs an explicit kick before play() will do anything.
      // It may also have been unloaded while off-screen (see below).
      if (!v.getAttribute("src")) v.src = media.src;
      v.load();
      if (withSound) {
        if (activeAudioVideo && activeAudioVideo !== v) activeAudioVideo.muted = true;
        activeAudioVideo = v;
        v.muted = false;
      }
      v.play().catch(() => {
        // Sound-on autoplay can be refused by the browser; fall back to muted.
        v.muted = true;
        v.play().catch(() => {});
      });
    }
    if (!inView) {
      v.pause();
      if (!v.muted) {
        v.muted = true;
        if (activeAudioVideo === v) activeAudioVideo = null;
      }
      // A paused video still holds its decoder and buffered data, and with
      // dozens of large clips on the page that adds up. Release it after a
      // short grace period; it reloads when scrolled back into view.
      if (autoPlay && v.getAttribute("src")) {
        unloadTimer = setTimeout(() => {
          v.removeAttribute("src");
          v.load();
        }, UNLOAD_DELAY_MS);
      }
    }
    return () => clearTimeout(unloadTimer);
  }, [inView, autoPlay, still, withSound, media.placeholder, media.src]);

  // Don't leave a dangling reference to an unmounted element as the
  // "currently audible" video.
  useEffect(() => {
    const v = videoRef.current;
    return () => {
      if (v && activeAudioVideo === v) activeAudioVideo = null;
    };
  }, []);

  // Video element fires "volumechange" whenever .muted is set, including
  // when another MediaFrame instance mutes this one via activeAudioVideo —
  // so this stays in sync regardless of who triggered it.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !isPlayableVideo) return;
    const onVolumeChange = () => setSoundOn(!v.muted);
    v.addEventListener("volumechange", onVolumeChange);
    return () => v.removeEventListener("volumechange", onVolumeChange);
  }, [isPlayableVideo]);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v || !isPlayableVideo) return;
    if (v.muted) {
      if (activeAudioVideo && activeAudioVideo !== v) activeAudioVideo.muted = true;
      activeAudioVideo = v;
      v.muted = false;
      v.play().catch(() => {});
    } else {
      v.muted = true;
      if (activeAudioVideo === v) activeAudioVideo = null;
    }
  };

  // Click on a video: restart from the beginning with sound on. Clicking the
  // one that is already audible mutes it again (it keeps playing silently).
  const playFromStart = () => {
    const v = videoRef.current;
    if (!v || !isPlayableVideo) return;
    if (!v.muted) {
      v.muted = true;
      if (activeAudioVideo === v) activeAudioVideo = null;
      return;
    }
    if (activeAudioVideo && activeAudioVideo !== v) activeAudioVideo.muted = true;
    activeAudioVideo = v;
    v.currentTime = 0;
    v.muted = false;
    v.play().catch(() => {});
  };

  useImperativeHandle(ref, () => ({
    getVideo: () => videoRef.current,
    toggleSound,
  }));

  const cursorState = media.kind === "video" ? "play" : "view";

  return (
    <CursorTarget
      as={cursorState}
      className={`relative overflow-hidden ${className}`}
      onClick={isPlayableVideo && interactive ? playFromStart : undefined}
    >
      <div
        ref={wrapRef}
        className={`absolute inset-0 ${fit === "contain" && !media.placeholder ? "flex items-center justify-center" : ""}`}
      >
        {media.placeholder ? (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center"
            style={{ background: gradientFor(media.label) }}
          >
            <div className="absolute inset-0 opacity-[0.1] mix-blend-screen" style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,.5) 2px, rgba(255,255,255,.5) 3px)",
            }} />
            <span className="font-mono-label text-[10px] text-[var(--fg-dim)]">
              {media.kind === "video" ? "VIDEO PLACEHOLDER" : "IMAGE PLACEHOLDER"}
            </span>
            <span className="font-mono-label text-[10px] text-[var(--fg-faint)]">
              REPLACE → /public/media/{media.label}
            </span>
            {frameLabel && (
              <span className="font-mono-label text-[10px] text-[var(--fg-faint)]">{frameLabel}</span>
            )}
          </div>
        ) : media.kind === "video" ? (
          <video
            ref={videoRef}
            className={
              fit === "contain"
                ? "relative h-full w-auto object-contain"
                : "absolute inset-0 h-full w-full object-cover"
            }
            src={still ? `${media.src}#t=0.5` : media.src}
            poster={media.poster}
            muted
            loop
            playsInline
            preload={still ? "metadata" : priority ? "auto" : "none"}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={media.src}
            alt={media.label}
            className="absolute inset-0 h-full w-full object-cover"
            loading={priority ? "eager" : "lazy"}
          />
        )}
        {isPlayableVideo && (
          <span
            className={`pointer-events-none absolute right-3 top-3 z-10 font-mono-label text-[9px] tracking-wide text-[var(--fg)] transition-opacity duration-200 ${
              soundOn ? "opacity-90" : "opacity-0"
            }`}
          >
            ◄)) SOUND ON
          </span>
        )}
      </div>
    </CursorTarget>
  );
});

export default MediaFrame;
