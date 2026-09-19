"use client";

import { useEffect, useRef, useState } from "react";
import { useCursor, type CursorState } from "./CursorContext";

const LABEL: Record<CursorState, string> = {
  default: "",
  play: "PLAY",
  view: "VIEW",
  open: "OPEN",
};

export default function CustomCursor() {
  const { subscribe } = useCursor();
  const dotRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);
  // Starts false to match the server render (no window); the effect below
  // corrects it after mount so client and server hydrate identically.
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- media query value is unknowable during SSR
    setIsFinePointer(mq.matches);
    const update = () => setIsFinePointer(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    return subscribe(setState);
  }, [subscribe]);

  useEffect(() => {
    if (!isFinePointer) return;
    const el = dotRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      setVisible(true);
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  const expanded = state !== "default";

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] flex items-center justify-center rounded-full border border-[var(--fg)]/70 transition-[width,height,opacity,background-color] duration-200 ease-out"
      style={{
        width: expanded ? 64 : 8,
        height: expanded ? 64 : 8,
        opacity: visible ? 1 : 0,
        backgroundColor: expanded ? "rgba(244,242,238,0.16)" : "var(--fg)",
        backdropFilter: expanded ? "blur(2px)" : undefined,
      }}
    >
      <span
        className="font-mono-label text-[9px] text-[var(--fg)] transition-opacity duration-150"
        style={{ opacity: expanded ? 1 : 0 }}
      >
        {LABEL[state]}
      </span>
    </div>
  );
}
