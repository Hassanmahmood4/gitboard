"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const CLI = "npx gitboard init";

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function NeonGridBackdrop() {
  return (
    <div className="neon-grid-system" aria-hidden>
      <div className="neon-grid-radial" />
      <div className="neon-grid-v-glow" />
      <div className="neon-grid-h-glow" />
      <div className="neon-grid-v-sharp" />
      <div className="neon-grid-h-sharp" />
      <div className="neon-grid-streaks">
        <div className="neon-grid-streak neon-grid-streak--a" />
        <div className="neon-grid-streak neon-grid-streak--b" />
        <div className="neon-grid-streak neon-grid-streak--c" />
      </div>
      <div className="neon-grid-fade" />
    </div>
  );
}

const btnLift =
  "transition-all duration-200 ease-in-out motion-safe:hover:-translate-y-0.5 active:translate-y-0";

export function FinalCtaSection() {
  const [copied, setCopied] = useState(false);

  const copyCli = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(CLI);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, []);

  return (
    <section
      className="neon-cta-section relative w-full overflow-hidden border-t border-white/[0.06] bg-[var(--bg-primary)] py-32 sm:py-40 lg:py-44"
      aria-labelledby="final-cta-heading"
    >
      <NeonGridBackdrop />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-primary)]/20 to-[var(--bg-primary)] opacity-95"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[var(--bg-primary)]/35 backdrop-blur-[72px]"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-left"
        >
          <h2
            id="final-cta-heading"
            className="max-w-[min(100%,38rem)] text-3xl font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-4xl md:text-5xl lg:text-6xl"
          >
            The smartest way to analyze your GitHub repositories.
          </h2>

          <p className="mt-6 max-w-[min(100%,34rem)] text-base leading-snug text-white/85 sm:mt-7 sm:text-lg md:leading-relaxed">
            Trusted by developers. Built for modern workflows. Ship safer code
            faster with AI-powered review and repo intelligence.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link
              href="/sign-up"
              className={`inline-flex min-h-12 items-center justify-center rounded-full border border-transparent bg-[var(--accent)] px-8 py-3 text-sm font-semibold text-white shadow-none sm:min-h-[3.25rem] sm:px-9 sm:text-base ${btnLift} hover:shadow-[var(--shadow-accent-hover)]`}
            >
              Get started
            </Link>

            <Link
              href="/#docs"
              className={`inline-flex min-h-12 items-center justify-center rounded-full border border-white/[0.1] bg-transparent px-8 py-3 text-sm font-semibold text-[var(--text-primary)] sm:min-h-[3.25rem] sm:px-9 sm:text-base ${btnLift} hover:border-[var(--accent)] hover:bg-[var(--accent)]/[0.06] hover:shadow-[0_0_16px_var(--accent-glow-soft)]`}
            >
              Read the docs
            </Link>

            <button
              type="button"
              onClick={copyCli}
              className={`inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full border border-white/[0.1] bg-transparent px-6 py-3 font-mono text-xs font-medium text-[var(--text-secondary)] sm:w-auto sm:min-h-[3.25rem] sm:px-7 sm:text-sm ${btnLift} hover:border-[var(--accent)] hover:bg-[var(--accent)]/[0.08] hover:text-[var(--text-primary)] hover:shadow-[0_0_16px_var(--accent-glow-soft)]`}
            >
              <span className="opacity-60" aria-hidden>
                $
              </span>
              <span>{CLI}</span>
              <CopyIcon className="ml-0.5 shrink-0 opacity-55" />
              {copied ? (
                <span className="ml-1 font-sans text-[11px] font-semibold sm:text-xs">
                  Copied
                </span>
              ) : null}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
