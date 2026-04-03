"use client";

import { useEffect, useState } from "react";

import { DashboardRepoSection } from "@/components/DashboardRepoSection";
import { GitTimelineLoader } from "@/components/GitTimelineLoader";

const MAIN_MS = 2400;
const FADE_MS = 550;

type Props = { signedInAs: string };

/**
 * Client-only dashboard shell so the Git timeline loader can render immediately
 * (no RSC children blocking the client boundary).
 */
export function DashboardPageClient({ signedInAs }: Props) {
  const [phase, setPhase] = useState<"loading" | "fading" | "done">("loading");

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const main = reduced ? 900 : MAIN_MS;
    const fade = reduced ? 280 : FADE_MS;
    const tFade = window.setTimeout(() => setPhase("fading"), main);
    const tDone = window.setTimeout(() => setPhase("done"), main + fade);
    return () => {
      clearTimeout(tFade);
      clearTimeout(tDone);
    };
  }, []);

  return (
    <>
      <main
        className={`mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-10 transition-opacity duration-500 ease-out motion-reduce:transition-none sm:px-6 sm:py-14 ${
          phase === "loading"
            ? "pointer-events-none opacity-0"
            : "opacity-100"
        }`}
        aria-hidden={phase === "loading"}
      >
        <header className="border-b border-white/[0.06] pb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Your Repositories
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            Signed in as{" "}
            <span className="font-medium text-white">{signedInAs}</span>
          </p>
        </header>
        <DashboardRepoSection />
      </main>
      {phase !== "done" ? (
        <GitTimelineLoader fading={phase === "fading"} />
      ) : null}
    </>
  );
}
