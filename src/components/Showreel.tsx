"use client";

import { useEffect, useRef, useState } from "react";
import { showreel } from "@/data/projects";
import MediaFrame, { type MediaFrameHandle } from "./MediaFrame";
import CursorTarget from "./cursor/CursorTarget";

function fmt(sec: number) {
  if (!Number.isFinite(sec)) return "00:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function Showreel() {
  const mediaRef = useRef<MediaFrameHandle>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const v = mediaRef.current?.getVideo();
    if (!v) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => setPlaying(false);
    const onTimeUpdate = () => setElapsed(v.currentTime);
    const onLoadedMetadata = () => setDuration(v.duration);
    const onVolumeChange = () => setMuted(v.muted);

    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onEnded);
    v.addEventListener("timeupdate", onTimeUpdate);
    v.addEventListener("loadedmetadata", onLoadedMetadata);
    v.addEventListener("volumechange", onVolumeChange);
    if (v.readyState >= 1) setDuration(v.duration);

    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("timeupdate", onTimeUpdate);
      v.removeEventListener("loadedmetadata", onLoadedMetadata);
      v.removeEventListener("volumechange", onVolumeChange);
    };
  }, []);

  const togglePlay = () => {
    const v = mediaRef.current?.getVideo();
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const toggleSound = () => mediaRef.current?.toggleSound();

  return (
    <section id="showreel" className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 opacity-80">
        <MediaFrame ref={mediaRef} media={showreel} className="h-full w-full" autoPlay={false} />
      </div>
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <span className="font-mono-label text-xs text-[var(--fg-dim)]">SHOWREEL · 2026</span>
        <CursorTarget as="play">
          <button
            onClick={togglePlay}
            className="flex h-20 w-20 items-center justify-center rounded-full border border-[var(--fg)]/40 text-[var(--fg)] transition-colors hover:border-[var(--fg)]"
            aria-label={playing ? "Pause showreel" : "Play showreel"}
          >
            <span className="font-mono-label text-[11px]">{playing ? "PAUSE" : "PLAY"}</span>
          </button>
        </CursorTarget>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between px-6 py-6 font-mono-label text-[11px] text-[var(--fg-dim)] sm:px-10">
        <span>{playing ? "PLAY" : "PAUSED"}</span>
        <span>
          {fmt(elapsed)} / {fmt(duration)}
        </span>
        <button onClick={toggleSound} className="transition-colors hover:text-[var(--fg)]">
          {muted ? "SOUND OFF" : "SOUND ON"}
        </button>
      </div>
    </section>
  );
}
