"use client";

import { useCursor, type CursorState } from "./CursorContext";

export default function CursorTarget({
  as: state,
  children,
  className,
  onClick,
}: {
  as: CursorState;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const { setCursor } = useCursor();
  return (
    <div
      data-cursor
      className={className}
      onPointerEnter={() => setCursor(state)}
      onPointerLeave={() => setCursor("default")}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
