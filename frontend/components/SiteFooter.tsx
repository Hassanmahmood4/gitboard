import Link from "next/link";

const muted = "text-sm text-white/45 transition-colors hover:text-white/75";

export function SiteFooter() {
  return (
    <footer
      className="border-t border-white/[0.08] bg-[var(--bg-primary)]"
      aria-labelledby="site-footer-heading"
    >
      <div className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="max-w-sm">
            <h2 id="site-footer-heading" className="sr-only">
              Site footer
            </h2>
            <Link
              href="/"
              className="inline-block text-lg font-bold tracking-tight text-white"
            >
              <span className="text-white">Git</span>
              <span className="text-[var(--accent)]">Board</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
              GitHub intelligence for teams — reviews, insights, and search in
              one place.
            </p>
            <p className="mt-6 text-xs text-white/35">
              © {new Date().getFullYear()} GitBoard. All rights reserved.
            </p>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-10 sm:grid-cols-3 lg:max-w-lg">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
                Product
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li>
                  <Link href="/#features" className={muted}>
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/#capabilities" className={muted}>
                    Capabilities
                  </Link>
                </li>
                <li>
                  <Link href="/#pricing" className={muted}>
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className={muted}>
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
                Resources
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li>
                  <Link href="/#docs" className={muted}>
                    Docs
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com"
                    className={muted}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
                Contact
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li>
                  <a
                    href="mailto:hello@gitboard.app"
                    className="text-sm font-medium text-[var(--accent)] transition-all duration-200 ease-in-out hover:text-[var(--accent-secondary)]"
                  >
                    hello@gitboard.app
                  </a>
                </li>
                <li>
                  <p className="text-sm text-white/45">
                    We respond within one business day.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/30">
            Credits: built with Next.js, Clerk, and modern AI tooling.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/30">
            <span className="text-white/35">Privacy</span>
            <span className="text-white/35">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
