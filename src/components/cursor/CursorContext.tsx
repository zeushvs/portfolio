"use client";

import { createContext, useCallback, useContext, useRef } from "react";

export type CursorState = "default" | "play" | "view" | "open";

type Listener = (s: CursorState) => void;

type CursorContextValue = {
  setCursor: (state: CursorState) => void;
  subscribe: (fn: Listener) => () => void;
};

const CursorContext = createContext<CursorContextValue | null>(null);

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error("useCursor must be used within CursorProvider");
  return ctx;
}

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const listeners = useRef<Set<Listener>>(new Set());

  const setCursor = useCallback((state: CursorState) => {
    listeners.current.forEach((fn) => fn(state));
  }, []);

  const subscribe = useCallback((fn: Listener) => {
    listeners.current.add(fn);
    return () => {
      listeners.current.delete(fn);
    };
  }, []);

  return (
    <CursorContext.Provider value={{ setCursor, subscribe }}>
      {children}
    </CursorContext.Provider>
  );
}
