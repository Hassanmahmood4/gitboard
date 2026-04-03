"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type FeatureId =
  | "ai-review"
  | "insights"
  | "search"
  | "quality"
  | "performance"
  | "security";

const FEATURES: {
  id: FeatureId;
  label: string;
  blurb: string;
}[] = [
  {
    id: "ai-review",
    label: "AI Code Review",
    blurb: "Inline suggestions on every diff",
  },
  {
    id: "insights",
    label: "Repo Insights",
    blurb: "Activity, ownership, and health",
  },
  {
    id: "search",
    label: "Smart Search",
    blurb: "Symbols, PRs, and files in one place",
  },
  {
    id: "quality",
    label: "Code Quality Analysis",
    blurb: "Lint, complexity, and coverage",
  },
  {
    id: "performance",
    label: "Performance Suggestions",
    blurb: "Hot paths and slow queries",
  },
  {
    id: "security",
    label: "Security Checks",
    blurb: "Secrets, deps, and CVEs",
  },
];

const previewMotion = {
  initial: { opacity: 0, x: 18 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -14 },
  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
};

function PreviewAiReview() {
  return (
    <div className="flex h-full min-h-[320px] flex-col sm:min-h-[360px] lg:flex-row">
      <div className="flex flex-1 flex-col border-b border-white/[0.08] bg-[#070a10] font-mono text-[10px] sm:text-[11px] lg:border-b-0 lg:border-r">
        <div className="flex h-8 items-center border-b border-white/[0.08] px-2 text-white/35">
          <span className="truncate font-mono text-white/50">api/handler.ts</span>
        </div>
        <div className="flex-1 space-y-1 p-3 text-white/80">
          <div>
            <span className="text-white/45">export async function</span>{" "}
            <span className="text-[#dcdcaa]">post</span>
            <span className="text-white/40">() {"{"}</span>
          </div>
          <div className="pl-2 text-white/40">
            <span className="text-white/45">const</span> body ={" "}
            <span className="text-[#dcdcaa]">await</span> req.json();
          </div>
          <div className="-mx-1 rounded-sm bg-[rgba(139,92,246,0.08)] py-0.5 pl-2 pr-1 ring-1 ring-[rgba(139,92,246,0.12)]">
            <span className="text-[var(--accent)]/90">return</span> json(body);
          </div>
          <div className="text-white/40">{"}"}</div>
        </div>
      </div>
      <aside className="flex w-full flex-col bg-[#0d1219] lg:w-[42%] lg:max-w-[280px]">
        <div className="border-b border-white/[0.08] px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-white/55">
          AI suggestions
        </div>
        <ul className="flex-1 space-y-2.5 p-3 text-[11px] leading-snug text-white/70">
          <li className="rounded-lg border border-[rgba(139,92,246,0.2)] bg-[rgba(139,92,246,0.08)] px-2.5 py-2 transition-shadow duration-200 ease-in-out hover:shadow-[0_0_14px_var(--accent-glow-soft)]">
            <span className="font-medium text-white/90">Tip</span>
            <p className="mt-1 text-white/60">
              Validate <code className="text-white/75">body</code> with a
              schema before persisting.
            </p>
          </li>
          <li className="rounded-lg border border-[rgba(139,92,246,0.2)] bg-[rgba(139,92,246,0.08)] px-2.5 py-2 transition-shadow duration-200 ease-in-out hover:shadow-[0_0_14px_var(--accent-glow-soft)]">
            <span className="font-medium text-white/90">Refactor</span>
            <p className="mt-1 text-white/60">
              Extract JSON parsing to a shared helper for tests.
            </p>
          </li>
        </ul>
      </aside>
    </div>
  );
}

function PreviewInsights() {
  const bars = [40, 72, 55, 88, 64, 92, 48];
  return (
    <div className="flex h-full min-h-[320px] flex-col gap-4 p-4 sm:min-h-[360px] sm:p-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { k: "Commits", v: "1.2k", d: "7d" },
          { k: "Contributors", v: "18", d: "active" },
          { k: "PRs merged", v: "42", d: "30d" },
          { k: "Issues closed", v: "89%", d: "resolution" },
        ].map((s) => (
          <div
            key={s.k}
            className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5"
          >
            <p className="text-[10px] uppercase tracking-wider text-white/40">
              {s.k}
            </p>
            <p className="mt-1 text-xl font-semibold tabular-nums text-white sm:text-2xl">
              {s.v}
            </p>
            <p className="text-[10px] text-[var(--accent)]/80">{s.d}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col rounded-xl border border-white/[0.08] bg-[#070a10] p-4">
        <p className="text-xs font-medium text-white/50">Merge frequency</p>
        <div className="mt-4 flex flex-1 items-end gap-1.5 sm:gap-2">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex flex-1 flex-col items-center justify-end gap-1"
            >
              <div
                className="w-full max-w-[28px] rounded-t-sm bg-gradient-to-t from-[var(--accent)]/25 to-[var(--accent-secondary)]/35"
                style={{ height: `${h}%`, minHeight: "24px" }}
              />
              <span className="text-[9px] text-white/30">
                {["M", "T", "W", "T", "F", "S", "S"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PreviewSearch() {
  return (
    <div className="flex h-full min-h-[320px] flex-col gap-4 p-4 sm:min-h-[360px] sm:p-5">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--accent)]/08 to-transparent opacity-50 blur-3xl" />
        <div className="relative flex items-center gap-2 rounded-xl border border-white/[0.12] bg-[#070a10] px-3 py-2.5 shadow-inner">
          <span className="text-white/35">⌘</span>
          <span className="font-mono text-xs text-white/45">K</span>
          <span className="mx-1 h-4 w-px bg-white/15" />
          <span className="truncate font-mono text-sm text-white/75">
            auth middleware rate limit
          </span>
          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--accent)]/70" />
        </div>
      </div>
      <div className="flex-1 space-y-2 overflow-hidden">
        {[
          {
            t: "src/middleware.ts",
            s: "Symbol · enforceAuth",
            m: "main",
          },
          {
            t: "docs/security.md",
            s: "Doc · OAuth2 flow",
            m: "docs",
          },
          {
            t: "#1842 Rate limit bypass",
            s: "Pull request",
            m: "open",
          },
          {
            t: "packages/api/src/limit.ts",
            s: "File · sliding window",
            m: "feat/ratelimit",
          },
        ].map((r, i) => (
          <div
            key={i}
            className="flex w-full items-start gap-3 rounded-xl border border-transparent bg-white/[0.02] px-3 py-2.5 transition-colors hover:border-white/[0.08] hover:bg-white/[0.04]"
          >
            <span className="mt-0.5 font-mono text-lg text-[var(--accent)]/70">
              /
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-mono text-xs text-white/90 sm:text-sm">
                {r.t}
              </p>
              <p className="mt-0.5 text-[11px] text-white/45">{r.s}</p>
            </div>
            <span className="shrink-0 rounded-md bg-[var(--accent)]/12 px-2 py-0.5 text-[10px] text-white/80">
              {r.m}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewQuality() {
  const gradId = useId().replace(/:/g, "");
  const items = [
    { ok: false, t: "Cyclomatic complexity > 12 in parseToken" },
    { ok: false, t: "Missing tests for error branches" },
    { ok: true, t: "Type coverage 98% on lib/" },
    { ok: true, t: "ESLint: 0 errors, 2 warnings" },
    { ok: false, t: "Duplicate logic in two handlers" },
  ];
  return (
    <div className="flex h-full min-h-[320px] flex-col gap-4 p-4 sm:min-h-[360px] sm:p-5">
      <div className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-[#070a10] px-4 py-3">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-white/40">
            Quality score
          </p>
          <p className="mt-1 text-3xl font-semibold tabular-nums text-white">
            78
            <span className="text-lg text-white/35">/100</span>
          </p>
        </div>
        <div className="relative h-16 w-16 shrink-0">
          <svg className="-rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="3"
            />
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke={`url(#${gradId})`}
              strokeWidth="3"
              strokeDasharray={`${0.78 * 97.4} 97.4`}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="var(--accent-secondary)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <ul className="flex-1 space-y-2">
        {items.map((it, i) => (
          <li
            key={i}
            className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
          >
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px] font-bold ${
                it.ok
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "bg-amber-500/20 text-amber-200"
              }`}
            >
              {it.ok ? "✓" : "!"}
            </span>
            <span className="text-sm text-white/75">{it.t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PreviewPerformance() {
  return (
    <div className="flex h-full min-h-[320px] flex-col gap-3 p-4 sm:min-h-[360px] sm:p-5">
      {[
        {
          sev: "high",
          title: "N+1 queries in /api/repos",
          hint: "Batch with DataLoader · ~420ms saved",
        },
        {
          sev: "med",
          title: "Large bundle: charts chunk",
          hint: "Dynamic import + suspense boundary",
        },
        {
          sev: "low",
          title: "Image without priority on LCP",
          hint: "Add priority to hero asset",
        },
      ].map((row, i) => (
        <div
          key={i}
          className="rounded-xl border border-white/[0.08] bg-[#070a10] p-3 sm:p-4"
        >
          <div className="flex items-center gap-2">
            <span
              className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                row.sev === "high"
                  ? "bg-rose-500/20 text-rose-200"
                  : row.sev === "med"
                    ? "bg-amber-500/20 text-amber-200"
                    : "bg-white/10 text-white/60"
              }`}
            >
              {row.sev}
            </span>
            <span className="font-medium text-white/90">{row.title}</span>
          </div>
          <p className="mt-2 text-xs text-white/65">{row.hint}</p>
        </div>
      ))}
    </div>
  );
}

function PreviewSecurity() {
  return (
    <div className="flex h-full min-h-[320px] flex-col gap-3 p-4 sm:min-h-[360px] sm:p-5">
      <div className="rounded-xl border border-rose-500/25 bg-rose-500/[0.07] px-3 py-2.5">
        <p className="text-xs font-semibold text-rose-200">
          2 vulnerabilities · 1 critical
        </p>
        <p className="mt-1 text-[11px] text-white/50">
          Run dependency scan on latest default branch
        </p>
      </div>
      {[
        {
          pkg: "json-parse-kit",
          cve: "CVE-2024-0001",
          level: "Critical",
        },
        {
          pkg: "legacy-crypto",
          cve: "GHSA-xx00",
          level: "High",
        },
        {
          pkg: "dotenv exposure",
          cve: "Secret scan",
          level: "Medium",
        },
      ].map((a, i) => (
        <div
          key={i}
          className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-[#070a10] px-3 py-3"
        >
          <div className="min-w-0">
            <p className="truncate font-mono text-xs text-white/90">
              {a.pkg}
            </p>
            <p className="mt-0.5 text-[10px] text-white/40">{a.cve}</p>
          </div>
          <span
            className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-semibold ${
              a.level === "Critical"
                ? "bg-rose-500/25 text-rose-100"
                : a.level === "High"
                  ? "bg-orange-500/20 text-orange-200"
                  : "bg-amber-500/15 text-amber-200/90"
            }`}
          >
            {a.level}
          </span>
        </div>
      ))}
    </div>
  );
}

function FeaturePreview({ id }: { id: FeatureId }) {
  switch (id) {
    case "ai-review":
      return <PreviewAiReview />;
    case "insights":
      return <PreviewInsights />;
    case "search":
      return <PreviewSearch />;
    case "quality":
      return <PreviewQuality />;
    case "performance":
      return <PreviewPerformance />;
    case "security":
      return <PreviewSecurity />;
    default:
      return null;
  }
}

export function InteractiveFeaturesSection() {
  const [selectedFeature, setSelectedFeature] =
    useState<FeatureId>("ai-review");

  return (
    <section
      id="capabilities"
      className="scroll-mt-28 border-t border-white/[0.06] bg-[var(--bg-primary)] py-16 sm:py-20 lg:py-28"
      aria-labelledby="interactive-features-heading"
    >
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
            Product
          </p>
          <h2
            id="interactive-features-heading"
            className="mt-3 max-w-xl text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          >
            Everything you need to ship with confidence
          </h2>
          <p className="mt-2 max-w-lg text-xs leading-relaxed text-[var(--text-secondary)] sm:mt-3 sm:text-sm">
            Pick a capability to see how GitBoard surfaces it in the product.
          </p>
        </motion.div>

        <div className="mt-12 flex flex-col gap-10 lg:mt-14 lg:flex-row lg:items-start lg:gap-16">
          {/* Feature list — minimal text rows (Neon / Linear style) */}
          <nav
            className="flex w-full shrink-0 flex-col gap-8 lg:max-w-sm lg:gap-8"
            aria-label="Feature previews"
          >
            {FEATURES.map((f) => {
              const active = selectedFeature === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedFeature(f.id)}
                  className="group relative w-full border-0 bg-transparent py-0 text-left transition-transform duration-200 ease-in-out hover:translate-x-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
                >
                  {active ? (
                    <motion.span
                      layoutId="interactive-feature-indicator"
                      className="pointer-events-none absolute left-0 top-0 bottom-0 w-0.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow-soft)]"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                      }}
                      aria-hidden
                    />
                  ) : null}
                  <span className="block pl-5 sm:pl-6">
                    <span
                      className={`block text-[13px] transition-colors duration-200 sm:text-sm ${
                        active
                          ? "font-semibold text-[var(--text-primary)]"
                          : "font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                      }`}
                    >
                      {f.label}
                    </span>
                    <span
                      className={`mt-1 block text-xs leading-relaxed transition-colors duration-200 sm:text-[13px] ${
                        active
                          ? "text-[var(--text-secondary)]"
                          : "text-[var(--text-secondary)]/80 group-hover:text-[var(--text-secondary)]"
                      }`}
                    >
                      {f.blurb}
                    </span>
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Preview */}
          <div className="relative min-w-0 flex-1">
            <div
              className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[var(--bg-secondary)] shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
              role="region"
              aria-live="polite"
              aria-label="Feature preview"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedFeature}
                  {...previewMotion}
                  className="min-h-[320px] sm:min-h-[360px]"
                >
                  <FeaturePreview id={selectedFeature} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
