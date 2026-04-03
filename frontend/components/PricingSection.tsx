import Link from "next/link";

const btnPrimary =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-transparent bg-[var(--accent)] px-5 py-2.5 text-center text-sm font-semibold text-white shadow-none transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-[var(--shadow-accent-hover)]";
const btnOutline =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-white/[0.1] px-5 py-2.5 text-center text-sm font-semibold text-[var(--text-primary)] transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--accent)]/[0.06] hover:shadow-[0_0_16px_var(--accent-glow-soft)]";

const tiers = [
  {
    name: "Hobby",
    price: "$0",
    period: "forever",
    description: "For side projects and personal repos.",
    features: [
      "Up to 3 repositories",
      "Basic repo insights",
      "Community support",
    ],
    cta: "Start free",
    href: "/sign-up",
    highlighted: false,
    buttonClass: btnPrimary,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/ month",
    description: "For developers who want AI review at scale.",
    features: [
      "Unlimited repositories",
      "Full AI code review",
      "Smart search & quality scores",
      "Priority email support",
    ],
    cta: "Get Pro",
    href: "/sign-up",
    highlighted: true,
    buttonClass: btnPrimary,
  },
  {
    name: "Team",
    price: "Custom",
    period: "",
    description: "SSO, audit logs, and dedicated support.",
    features: [
      "Everything in Pro",
      "Organization-wide policies",
      "SSO / SAML",
      "Dedicated success engineer",
    ],
    cta: "Contact sales",
    href: "mailto:hello@gitboard.app",
    highlighted: false,
    external: true,
    buttonClass: btnOutline,
  },
] as const;

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="scroll-mt-28 border-t border-white/[0.06] bg-[var(--bg-primary)] py-20 sm:py-28 lg:py-32"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
            Pricing
          </p>
          <h2
            id="pricing-heading"
            className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl lg:leading-tight"
          >
            Simple plans for every engineering team
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] sm:mt-4 sm:text-base">
            Start free, upgrade when you need AI review across more repos and
            tighter workflows.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border p-6 sm:p-8 ${
                tier.highlighted
                  ? "border-[var(--accent)]/30 bg-[var(--accent)]/[0.04] ring-1 ring-[var(--accent)]/15"
                  : "border-white/[0.08] bg-white/[0.02]"
              }`}
            >
              {tier.highlighted ? (
                <span className="mb-4 inline-flex w-fit rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-white/85">
                  Most popular
                </span>
              ) : (
                <span className="mb-4 block h-7" aria-hidden />
              )}
              <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/45">
                {tier.description}
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight text-white">
                  {tier.price}
                </span>
                {tier.period ? (
                  <span className="text-sm text-white/40">{tier.period}</span>
                ) : null}
              </div>
              <ul className="mt-8 flex flex-1 flex-col gap-3 text-sm text-white/65">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="mt-0.5 text-[var(--accent)]" aria-hidden>
                      ✓
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              {"external" in tier && tier.external ? (
                <a href={tier.href} className={`mt-8 ${tier.buttonClass}`}>
                  {tier.cta}
                </a>
              ) : (
                <Link href={tier.href} className={`mt-8 ${tier.buttonClass}`}>
                  {tier.cta}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
