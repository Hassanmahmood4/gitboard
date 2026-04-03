"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/**
 * Fixed ambient blobs (CSS) + subtle pointer-follow glow.
 * Opacity kept low; disabled for reduced-motion users.
 */
export function MarketingVisualLayer() {
  const [pos, setPos] = useState({ x: 50, y: 45 });
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const w = Math.max(window.innerWidth, 1);
      const h = Math.max(window.innerHeight, 1);
      setPos({ x: (e.clientX / w) * 100, y: (e.clientY / h) * 100 });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <>
      <div className="marketing-blobs" aria-hidden>
        <div className="marketing-blobs__mid" />
      </div>
      {!reduceMotion ? (
        <div
          className="marketing-cursor-glow pointer-events-none fixed inset-0 z-[1] hidden md:block"
          style={{
            background: `radial-gradient(520px circle at ${pos.x}% ${pos.y}%, var(--accent-glow-soft), transparent 52%)`,
            opacity: 0.11,
          }}
          aria-hidden
        />
      ) : null}
    </>
  );
}
