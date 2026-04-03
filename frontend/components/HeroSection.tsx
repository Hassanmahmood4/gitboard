"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

const btnTransition = { type: "spring" as const, stiffness: 420, damping: 28 };

/** Light rays — single accent hue, restrained */
const LF = {
  m: "linear-gradient(180deg, rgba(139,92,246,0.55) 0%, rgba(139,92,246,0.22) 45%, rgba(139,92,246,0.08) 72%, transparent 100%)",
  c: "linear-gradient(180deg, rgba(139,92,246,0.42) 0%, rgba(139,92,246,0.1) 52%, transparent 100%)",
  p: "linear-gradient(180deg, rgba(167,139,250,0.4) 0%, rgba(139,92,246,0.14) 50%, transparent 100%)",
  g: "linear-gradient(180deg, rgba(139,92,246,0.35) 0%, rgba(139,92,246,0.16) 48%, rgba(124,58,237,0.08) 78%, transparent 100%)",
  cp: "linear-gradient(180deg, rgba(139,92,246,0.65) 0%, rgba(167,139,250,0.35) 100%)",
} as const;

type LFKey = keyof typeof LF;
type Anim = "a" | "b" | "c";

type LightRaySpec = {
  id: string;
  layer: "back" | "mid" | "front";
  left: number;
  top: number;
  h: number;
  w: number;
  blur: string;
  opLow: number;
  opHigh: number;
  dur: number;
  delay: number;
  anim: Anim;
  bg: LFKey;
  bloom?: boolean;
  bloomBlur?: string;
  bloomOp?: number;
};

const LIGHT_RAYS: LightRaySpec[] = [
  /* Layer 1 — very faint, heavy blur, varied height & spacing */
  {
    id: "b1",
    layer: "back",
    left: 3.5,
    top: 20,
    h: 58,
    w: 5,
    blur: "24px",
    opLow: 0.06,
    opHigh: 0.2,
    dur: 9.5,
    delay: 0.3,
    anim: "a",
    bg: "c",
  },
  {
    id: "b2",
    layer: "back",
    left: 12,
    top: 44,
    h: 32,
    w: 3,
    blur: "32px",
    opLow: 0.04,
    opHigh: 0.14,
    dur: 8,
    delay: 1.8,
    anim: "b",
    bg: "p",
  },
  {
    id: "b3",
    layer: "back",
    left: 31,
    top: 10,
    h: 72,
    w: 6,
    blur: "20px",
    opLow: 0.07,
    opHigh: 0.22,
    dur: 10,
    delay: 0.8,
    anim: "c",
    bg: "g",
  },
  {
    id: "b4",
    layer: "back",
    left: 46,
    top: 52,
    h: 28,
    w: 3,
    blur: "28px",
    opLow: 0.05,
    opHigh: 0.16,
    dur: 7.5,
    delay: 2.4,
    anim: "a",
    bg: "c",
  },
  {
    id: "b5",
    layer: "back",
    left: 56,
    top: 14,
    h: 48,
    w: 4,
    blur: "26px",
    opLow: 0.06,
    opHigh: 0.18,
    dur: 9,
    delay: 0.1,
    anim: "b",
    bg: "p",
  },
  {
    id: "b6",
    layer: "back",
    left: 88,
    top: 22,
    h: 62,
    w: 5,
    blur: "22px",
    opLow: 0.05,
    opHigh: 0.19,
    dur: 8.5,
    delay: 1.2,
    anim: "c",
    bg: "g",
  },
  {
    id: "b7",
    layer: "back",
    left: 78,
    top: 58,
    h: 24,
    w: 2,
    blur: "34px",
    opLow: 0.03,
    opHigh: 0.11,
    dur: 10,
    delay: 3,
    anim: "a",
    bg: "p",
  },

  /* Layer 2 — mid field */
  {
    id: "m1",
    layer: "mid",
    left: 8,
    top: 12,
    h: 76,
    w: 3,
    blur: "12px",
    opLow: 0.14,
    opHigh: 0.42,
    dur: 7,
    delay: 0.5,
    anim: "b",
    bg: "c",
  },
  {
    id: "m2",
    layer: "mid",
    left: 25,
    top: 38,
    h: 48,
    w: 4,
    blur: "10px",
    opLow: 0.12,
    opHigh: 0.38,
    dur: 8.5,
    delay: 2,
    anim: "a",
    bg: "p",
  },
  {
    id: "m3",
    layer: "mid",
    left: 38,
    top: 6,
    h: 86,
    w: 3,
    blur: "8px",
    opLow: 0.16,
    opHigh: 0.48,
    dur: 6.5,
    delay: 0.2,
    anim: "c",
    bg: "g",
  },
  {
    id: "m4",
    layer: "mid",
    left: 51,
    top: 46,
    h: 42,
    w: 5,
    blur: "11px",
    opLow: 0.1,
    opHigh: 0.36,
    dur: 9,
    delay: 1.5,
    anim: "b",
    bg: "cp",
  },
  {
    id: "m5",
    layer: "mid",
    left: 61,
    top: 18,
    h: 58,
    w: 3,
    blur: "9px",
    opLow: 0.13,
    opHigh: 0.4,
    dur: 7.5,
    delay: 2.8,
    anim: "a",
    bg: "c",
  },
  {
    id: "m6",
    layer: "mid",
    left: 94,
    top: 16,
    h: 54,
    w: 4,
    blur: "14px",
    opLow: 0.11,
    opHigh: 0.35,
    dur: 8,
    delay: 0.9,
    anim: "c",
    bg: "p",
  },

  /* Layer 3 — bright clusters + bloom */
  {
    id: "f-cb1",
    layer: "front",
    left: 21.8,
    top: 14,
    h: 80,
    w: 4,
    blur: "2px",
    opLow: 0.42,
    opHigh: 0.92,
    dur: 6.5,
    delay: 0.4,
    anim: "c",
    bg: "m",
    bloom: true,
    bloomBlur: "38px",
    bloomOp: 0.52,
  },
  {
    id: "f-cb2",
    layer: "front",
    left: 24.6,
    top: 30,
    h: 56,
    w: 3,
    blur: "1.5px",
    opLow: 0.35,
    opHigh: 0.78,
    dur: 7.5,
    delay: 1.1,
    anim: "a",
    bg: "cp",
    bloom: true,
    bloomBlur: "32px",
    bloomOp: 0.45,
  },
  {
    id: "f-cb3",
    layer: "front",
    left: 26.5,
    top: 8,
    h: 88,
    w: 5,
    blur: "1px",
    opLow: 0.48,
    opHigh: 1,
    dur: 6,
    delay: 0.1,
    anim: "b",
    bg: "m",
    bloom: true,
    bloomBlur: "42px",
    bloomOp: 0.58,
  },
  {
    id: "f-ca1",
    layer: "front",
    left: 70.4,
    top: 6,
    h: 90,
    w: 5,
    blur: "1px",
    opLow: 0.45,
    opHigh: 0.98,
    dur: 6.2,
    delay: 0.6,
    anim: "c",
    bg: "m",
    bloom: true,
    bloomBlur: "40px",
    bloomOp: 0.55,
  },
  {
    id: "f-ca2",
    layer: "front",
    left: 72.6,
    top: 24,
    h: 64,
    w: 3,
    blur: "1.5px",
    opLow: 0.38,
    opHigh: 0.85,
    dur: 7.2,
    delay: 1.4,
    anim: "a",
    bg: "g",
    bloom: true,
    bloomBlur: "34px",
    bloomOp: 0.48,
  },
  {
    id: "f-ca3",
    layer: "front",
    left: 74.3,
    top: 4,
    h: 92,
    w: 4,
    blur: "0px",
    opLow: 0.5,
    opHigh: 1,
    dur: 5.8,
    delay: 0.2,
    anim: "b",
    bg: "m",
    bloom: true,
    bloomBlur: "36px",
    bloomOp: 0.6,
  },
  {
    id: "f-ca4",
    layer: "front",
    left: 76.5,
    top: 34,
    h: 52,
    w: 2.5,
    blur: "2px",
    opLow: 0.32,
    opHigh: 0.72,
    dur: 8,
    delay: 2,
    anim: "c",
    bg: "p",
    bloom: true,
    bloomBlur: "28px",
    bloomOp: 0.4,
  },
];

function LightRay({ spec }: { spec: LightRaySpec }) {
  const bg = LF[spec.bg];
  const style = {
    left: `${spec.left}%`,
    top: `${spec.top}%`,
    height: `${spec.h}%`,
    "--lf-w": `${spec.w}px`,
    "--lf-dur": `${spec.dur}s`,
    "--lf-delay": `${spec.delay}s`,
    "--lf-op-low": spec.opLow,
    "--lf-op-high": spec.opHigh,
    "--lf-bloom-blur": spec.bloomBlur ?? "36px",
    "--lf-bloom-op": spec.bloomOp ?? 0.5,
  } as React.CSSProperties;

  const shaftStyle: React.CSSProperties = {
    background: bg,
    filter:
      spec.blur === "0px" ? "none" : `blur(${spec.blur})`,
    boxShadow:
      spec.layer === "front"
        ? "0 0 24px rgba(139,92,246,0.12)"
        : undefined,
  };

  return (
    <div
      className={`hero-lf-ray hero-lf-ray--anim-${spec.anim}`}
      style={style}
    >
      {spec.bloom ? (
        <div className="hero-lf-ray__bloom" style={{ background: bg }} />
      ) : null}
      <div className="hero-lf-ray__shaft" style={shaftStyle} />
    </div>
  );
}

export function HeroSection() {
  const router = useRouter();
  const back = LIGHT_RAYS.filter((r) => r.layer === "back");
  const mid = LIGHT_RAYS.filter((r) => r.layer === "mid");
  const front = LIGHT_RAYS.filter((r) => r.layer === "front");

  return (
    <section className="relative isolate min-h-[min(92vh,880px)] w-full overflow-hidden">
      <div className="hero-breathe-bg" aria-hidden>
        <div className="hero-lf-stack">
          <div className="hero-lf-layer hero-lf-layer--back">
            {back.map((spec) => (
              <LightRay key={spec.id} spec={spec} />
            ))}
          </div>
          <div className="hero-lf-layer hero-lf-layer--mid">
            {mid.map((spec) => (
              <LightRay key={spec.id} spec={spec} />
            ))}
          </div>
          <div className="hero-lf-layer hero-lf-layer--front">
            {front.map((spec) => (
              <LightRay key={spec.id} spec={spec} />
            ))}
          </div>
        </div>
        <div className="hero-breathe-radial" />
        <div className="hero-breathe-mesh" />
        <div className="hero-breathe-noise" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[6] bg-[rgba(0,0,0,0.65)]"
        aria-hidden
      />

      <motion.div
        className="relative z-[7] mx-auto flex min-h-[min(88vh,820px)] w-full max-w-[1100px] flex-col justify-center px-5 py-16 text-left sm:px-8 sm:py-20 lg:px-12 lg:py-24"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)] sm:text-xs"
        >
          AI-powered GitHub Dashboard
        </motion.p>

        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-[min(100%,42rem)] text-balance text-4xl font-bold leading-[1.12] tracking-tight text-[var(--text-primary)] sm:mt-7 sm:text-5xl sm:leading-[1.1] lg:text-6xl xl:text-7xl"
        >
          Explore Your{" "}
          <span className="text-gradient-accent [filter:drop-shadow(0_0_20px_var(--accent-glow-soft))]">
            GitHub Projects
          </span>{" "}
          Like Never Before
        </motion.h1>

        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-xl text-pretty text-sm leading-relaxed text-[var(--text-secondary)] sm:mt-9 sm:max-w-lg sm:text-base lg:text-lg"
        >
          Visualize, analyze, and understand your repositories with a modern,
          AI-powered dashboard.
        </motion.p>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-start gap-3 sm:mt-11 sm:flex-row sm:flex-wrap sm:gap-4"
        >
          <motion.div
            whileTap={{ scale: 0.98 }}
            transition={btnTransition}
            className="w-fit"
          >
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full border border-transparent bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-none transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-[var(--shadow-accent-hover)]"
            >
              View Dashboard
            </Link>
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.98 }}
            transition={btnTransition}
            className="w-fit"
          >
            <button
              type="button"
              onClick={() => router.push("/workspace")}
              className="inline-flex items-center justify-center rounded-full border border-white/[0.1] bg-transparent px-6 py-3 text-sm font-semibold text-[var(--text-primary)] shadow-none transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--accent)]/[0.06] hover:shadow-[0_0_18px_var(--accent-glow-soft)]"
            >
              Try as guest
            </button>
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.98 }}
            transition={btnTransition}
            className="w-fit"
          >
            <a
              href="mailto:hello@gitboard.app"
              className="inline-flex items-center justify-center rounded-full border border-white/[0.1] bg-transparent px-6 py-3 text-sm font-semibold text-[var(--text-primary)] shadow-none transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--accent)]/[0.05] hover:shadow-[0_0_18px_var(--accent-glow-soft)]"
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
