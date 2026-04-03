import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** @deprecated Shorthand alias for `secondary` */
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const resolved = variant === "ghost" ? "secondary" : variant;

  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold tracking-tight transition-all duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    primary:
      "border border-transparent bg-[var(--accent)] text-white shadow-none hover:-translate-y-0.5 hover:shadow-[var(--shadow-accent-hover)] active:translate-y-0 active:brightness-95",
    secondary:
      "border border-white/[0.1] bg-transparent text-[var(--text-primary)] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--accent)]/[0.06] hover:shadow-[0_0_16px_var(--accent-glow-soft)]",
  };

  return (
    <button
      type="button"
      className={`${base} ${variants[resolved]} ${className}`.trim()}
      {...props}
    />
  );
}
