"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Show, UserButton } from "@clerk/nextjs";

const centerLink =
  "text-sm font-medium text-[var(--text-secondary)] transition-colors duration-200 ease-in-out hover:-translate-y-0.5 hover:text-[var(--text-primary)]";

const loginBtn =
  "inline-flex items-center justify-center rounded-full border border-white/[0.1] bg-transparent px-4 py-2 text-sm font-semibold text-[var(--text-primary)] transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[0_0_16px_var(--accent-glow-soft)]";

const signUpBtn =
  "inline-flex items-center justify-center rounded-full border border-transparent bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-[var(--shadow-accent-hover)]";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-shadow duration-300 ease-in-out ${
        scrolled
          ? "border-transparent bg-[var(--bg-primary)]/80 shadow-[0_1px_0_rgba(139,92,246,0.2)] supports-[backdrop-filter]:bg-[var(--bg-primary)]/65"
          : "border-white/[0.06] bg-[var(--bg-primary)]/45 supports-[backdrop-filter]:bg-[var(--bg-primary)]/35"
      }`}
    >
      <div className="relative mx-auto flex h-14 max-w-[1100px] items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="shrink-0 text-lg font-bold tracking-tight text-[var(--text-primary)] transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:opacity-90"
          aria-label="GitBoard home"
        >
          <span className="text-[var(--text-primary)]">Git</span>
          <span className="text-[var(--accent)]">Board</span>
        </Link>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex"
          aria-label="Primary"
        >
          <Link href="/dashboard" className={centerLink}>
            Dashboard
          </Link>
          <Link href="/#features" className={centerLink}>
            Features
          </Link>
          <Link href="/#docs" className={centerLink}>
            Docs
          </Link>
          <Link href="/#pricing" className={centerLink}>
            Pricing
          </Link>
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3 md:min-w-[200px]">
          <nav
            className="mr-1 flex items-center gap-4 md:hidden"
            aria-label="Mobile primary"
          >
            <Link
              href="/dashboard"
              className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
              Dashboard
            </Link>
          </nav>
          <Show when="signed-out">
            <Link href="/sign-in" className={loginBtn}>
              Login
            </Link>
            <Link href="/sign-up" className={signUpBtn}>
              Sign up
            </Link>
          </Show>
          <Show when="signed-in">
            <UserButton
              appearance={{
                variables: { colorPrimary: "#8b5cf6" },
                elements: {
                  userButtonAvatarBox:
                    "w-9 h-9 rounded-full ring-1 ring-white/15 transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:ring-[var(--accent)]/40",
                },
              }}
            />
          </Show>
        </div>
      </div>
    </header>
  );
}
