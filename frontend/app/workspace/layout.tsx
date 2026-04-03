import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guest workspace · GitBoard",
  description: "Try GitBoard without signing in",
};

export default function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-[100dvh] flex-1 flex-col bg-black text-white">
      <header className="shrink-0 bg-black px-4 py-2.5 sm:px-5">
        <div className="flex w-full items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm font-bold tracking-tight transition-opacity hover:opacity-90"
          >
            <span className="text-white">Git</span>
            <span className="text-[var(--accent)]">Board</span>
          </Link>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.12em] text-white/40 sm:inline">
            Guest workspace
          </span>
          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="rounded-full border border-transparent bg-[var(--accent)] px-3 py-1.5 text-xs font-semibold text-white shadow-none transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-[var(--shadow-accent-hover)] sm:px-4 sm:text-sm"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
