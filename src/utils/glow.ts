import type { MouseEvent } from "react";

export function trackGlow(event: MouseEvent<HTMLElement>) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();

  el.style.setProperty("--glow-x", `${event.clientX - rect.left}px`);
  el.style.setProperty("--glow-y", `${event.clientY - rect.top}px`);
}
