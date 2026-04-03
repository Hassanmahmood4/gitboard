import type { ReactNode } from "react";

type LogoItem = {
  id: string;
  mark: ReactNode;
};

/**
 * Mixed order (not grouped by category) for visual balance.
 * Inline SVGs — swap for official brand assets if your legal/design requires it.
 */
const LOGOS: LogoItem[] = [
  {
    id: "nextjs",
    mark: (
      <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          fill="currentColor"
          d="M89.2 0L0 180h35.5L89.2 36.6 143.2 180H180L89.2 0z"
        />
      </svg>
    ),
  },
  {
    id: "react",
    mark: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <circle cx="12" cy="12" r="1.8" fill="currentColor" />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="3.8"
          stroke="currentColor"
          strokeWidth="1.15"
          fill="none"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="3.8"
          stroke="currentColor"
          strokeWidth="1.15"
          fill="none"
          transform="rotate(60 12 12)"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="3.8"
          stroke="currentColor"
          strokeWidth="1.15"
          fill="none"
          transform="rotate(-60 12 12)"
        />
      </svg>
    ),
  },
  {
    id: "supabase",
    mark: (
      <svg viewBox="0 0 109 113" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          fill="currentColor"
          d="M63.7 2.5c-1.2-1.8-3.7-2-5.1-.3L2.4 68.7c-1.4 1.7-.5 4.3 1.7 4.7l30.5 5.7-18.8 58.1c-.6 1.8 1.7 3.2 3.2 1.9l94.5-88.4c1.5-1.4.4-4-1.6-4h-35L63.7 2.5z"
        />
      </svg>
    ),
  },
  {
    id: "tailwind",
    mark: (
      <svg viewBox="0 0 54 33" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.14 3.653C30.6 13.5 33.75 16.5 40.5 16.5c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.14-3.653C36.9 3 33.75 0 27 0zM13.5 16.5C6.3 16.5 1.8 20.1 0 27.3c2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.14 3.653C17.1 30 20.25 33 27 33c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.14-3.653C23.4 19.5 20.25 16.5 13.5 16.5z"
        />
      </svg>
    ),
  },
  {
    id: "nodejs",
    mark: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          fill="currentColor"
          d="M11.9 1L3.6 5.8v12.4l8.3 4.8 8.3-4.8V5.8L11.9 1zm-.1 2.2l5.9 3.4v6.8l-5.9 3.4-5.9-3.4V6.6l5.9-3.4z"
        />
        <path
          fill="currentColor"
          d="M11.4 7.2v5.1l2.2-1.3V8.4l-2.2-1.2zm1.2 7.4l-2.2 1.3v2.5l2.2-1.3v-2.5z"
          opacity="0.65"
        />
      </svg>
    ),
  },
  {
    id: "postgresql",
    mark: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <ellipse cx="16" cy="7" rx="9" ry="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          d="M7 7v4M25 7v4M7 11c0 4 2.5 7 9 7s9-3 9-7"
        />
        <ellipse cx="16" cy="18" rx="9" ry="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          d="M7 18v3c0 3 3.5 5 9 5s9-2 9-5v-3"
        />
      </svg>
    ),
  },
  {
    id: "vercel",
    mark: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path fill="currentColor" d="M12 3L22 21H2L12 3z" />
      </svg>
    ),
  },
  {
    id: "openai",
    mark: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          fill="currentColor"
          d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2a8 8 0 110 16 8 8 0 010-16zm0 2.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zm0 2a3.5 3.5 0 110 7 3.5 3.5 0 010-7z"
          opacity="0.92"
        />
      </svg>
    ),
  },
  {
    id: "clerk",
    mark: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          fill="currentColor"
          d="M12 2L4 6v12l8 4 8-4V6l-8-4zm0 2.2l5.5 2.75v8.1L12 17.9l-5.5-2.75v-8.1L12 4.2z"
        />
        <path
          fill="currentColor"
          d="M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"
          opacity="0.5"
        />
      </svg>
    ),
  },
  {
    id: "express",
    mark: (
      <svg viewBox="0 0 90 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <text
          x="0"
          y="21"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="17"
          fontWeight="600"
          letterSpacing="-0.02em"
        >
          express
        </text>
      </svg>
    ),
  },
  {
    id: "github",
    mark: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.35 1.11 2.92.85.09-.66.35-1.11.64-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.3 9.3 0 012.5-.34c.85.004 1.71.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.33 4.8-4.56 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.59.69.49A10.03 10.03 0 0022 12.26C22 6.58 17.52 2 12 2z"
        />
      </svg>
    ),
  },
];

function LogoGroup({ duplicate }: { duplicate?: boolean }) {
  return (
    <ul
      className={`logo-marquee__group list-none ${duplicate ? "logo-marquee__group--duplicate" : ""}`}
      aria-hidden
    >
      {LOGOS.map((logo) => (
        <li key={`${duplicate ? "d-" : ""}${logo.id}`} className="logo-marquee__item">
          {logo.mark}
        </li>
      ))}
    </ul>
  );
}

export function LogoMarquee() {
  return (
    <section
      className="logo-marquee"
      aria-labelledby="logo-marquee-heading"
    >
      <h2
        id="logo-marquee-heading"
        className="logo-marquee__heading"
      >
        Built with modern technologies
      </h2>
      <div className="logo-marquee__viewport">
        <div className="logo-marquee__track">
          <LogoGroup />
          <LogoGroup duplicate />
        </div>
        <div className="logo-marquee__fade logo-marquee__fade--left" aria-hidden />
        <div className="logo-marquee__fade logo-marquee__fade--right" aria-hidden />
      </div>
    </section>
  );
}
