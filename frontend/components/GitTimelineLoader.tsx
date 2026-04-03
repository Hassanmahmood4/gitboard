"use client";

import { createPortal } from "react-dom";
import { useEffect, useLayoutEffect, useState } from "react";

const EVENTS = [
  "Cloning repo…",
  "Indexing files…",
  "Analyzing commits…",
  "Generating AI insights…",
] as const;

type Pulse = { id: number; x: number; tone: "accent" | "git" };

type GitTimelineLoaderProps = {
  /** When true, overlay fades out */
  fading: boolean;
};

let pulseSeq = 0;

export function GitTimelineLoader({ fading }: GitTimelineLoaderProps) {
  const [eventIndex, setEventIndex] = useState(0);
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    setPortalTarget(document.body);
  }, []);

  useEffect(() => {
    if (fading) return;
    const stepMs = 580;
    const id = window.setInterval(() => {
      setEventIndex((i) => (i < EVENTS.length - 1 ? i + 1 : i));
    }, stepMs);
    return () => clearInterval(id);
  }, [fading]);

  useEffect(() => {
    if (fading) return;
    const timeoutIds: number[] = [];
    const spawn = () => {
      const id = ++pulseSeq;
      const x = 6 + Math.random() * 88;
      const tone: Pulse["tone"] = Math.random() > 0.42 ? "git" : "accent";
      setPulses((p) => [...p, { id, x, tone }]);
      const t = window.setTimeout(() => {
        setPulses((p) => p.filter((q) => q.id !== id));
      }, 900);
      timeoutIds.push(t);
    };
    spawn();
    const iv = window.setInterval(spawn, 320 + Math.floor(Math.random() * 380));
    return () => {
      clearInterval(iv);
      timeoutIds.forEach(clearTimeout);
    };
  }, [fading]);

  const overlay = (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center bg-[#020617] transition-opacity duration-500 ease-out motion-reduce:transition-none ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ zIndex: 2147483000 }}
      role="status"
      aria-live="polite"
      aria-busy={!fading}
    >
      {/* Subtle vertical grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 47px,
            rgba(255, 255, 255, 0.07) 47px,
            rgba(255, 255, 255, 0.07) 48px
          )`,
        }}
        aria-hidden
      />

      <div className="relative z-[1] w-[min(92vw,56rem)] px-4">
        {/* Timeline: line + dots + pulses share one positioned frame */}
        <div className="relative h-20 w-full">
          {/* Horizontal rail */}
          <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 overflow-visible rounded-full">
            <div
              className="h-full w-full rounded-full motion-reduce:opacity-90"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(74, 222, 128, 0.18) 22%, rgba(139, 92, 246, 0.5) 50%, rgba(74, 222, 128, 0.18) 78%, transparent 100%)",
                backgroundSize: "200% 100%",
                animation: "git-timeline-line-shimmer 5s linear infinite",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                boxShadow:
                  "0 0 10px rgba(74, 222, 128, 0.18), 0 0 20px rgba(139, 92, 246, 0.1)",
              }}
              aria-hidden
            />
          </div>

          {/* Dots travel left → right along the rail */}
          <div
            className="pointer-events-none absolute inset-x-0 top-1/2 h-3 -translate-y-1/2"
            aria-hidden
          >
            <span
              className="git-timeline-loader__dot"
              style={{ animationDelay: "0s" }}
            />
            <span
              className="git-timeline-loader__dot"
              style={{
                animationDelay: "0.95s",
                color: "#a78bfa",
                animationDuration: "3.1s",
              }}
            />
            <span
              className="git-timeline-loader__dot"
              style={{ animationDelay: "1.85s", animationDuration: "2.6s" }}
            />
          </div>

          {/* Vertical pulses from the rail (center of this frame = timeline) */}
          <div
            className="pointer-events-none absolute inset-0 w-full"
            aria-hidden
          >
            {pulses.map((p) => (
              <span
                key={p.id}
                className="git-timeline-loader__pulse"
                style={{
                  left: `${p.x}%`,
                  marginLeft: "-0.5px",
                  background:
                    p.tone === "git"
                      ? "linear-gradient(to top, rgba(74, 222, 128, 0.85), transparent)"
                      : "linear-gradient(to top, rgba(139, 92, 246, 0.85), transparent)",
                  boxShadow:
                    p.tone === "git"
                      ? "0 0 10px rgba(74, 222, 128, 0.3)"
                      : "0 0 10px rgba(139, 92, 246, 0.3)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <p className="relative z-[1] mt-14 min-h-[1.5rem] text-center font-mono text-sm tracking-tight text-[var(--text-secondary)] motion-reduce:animate-none sm:text-[0.9375rem]">
        <span className="text-[var(--text-primary)]/90">{EVENTS[eventIndex]}</span>
      </p>

      <span className="sr-only">Loading dashboard, please wait.</span>
    </div>
  );

  if (portalTarget) {
    return createPortal(overlay, portalTarget);
  }
  return overlay;
}
