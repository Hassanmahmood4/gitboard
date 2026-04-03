"use client";

import type { InputHTMLAttributes } from "react";

type SearchBarProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
};

export function SearchBar({
  label = "Search repositories",
  className = "",
  id = "search",
  ...props
}: SearchBarProps) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-1">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type="search"
        placeholder="Search repositories..."
        className={`w-full min-w-0 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] shadow-inner shadow-black/20 placeholder:text-[var(--muted)] transition-[border-color,box-shadow] duration-200 focus:border-[var(--accent)]/45 focus:outline-none focus:ring-1 focus:ring-[var(--accent)]/25 ${className}`.trim()}
        {...props}
      />
    </div>
  );
}
