import type { GitHubRepo } from "@/types/repo";

type RepoCardProps = {
  repo: GitHubRepo;
};

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <article
      className="group flex h-full flex-col rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111827] p-5 transition-[transform,box-shadow] duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_0_20px_var(--accent-glow-soft)]"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="min-w-0 flex-1 font-semibold leading-snug tracking-tight text-white">
          <span className="block truncate" title={repo.full_name}>
            {repo.name}
          </span>
        </h3>
        {repo.language ? (
          <span
            className="shrink-0 rounded-full border border-[var(--purple)]/35 bg-[var(--purple)]/15 px-2.5 py-0.5 text-xs font-medium text-[#e9d5ff]"
            title="Primary language"
          >
            {repo.language}
          </span>
        ) : (
          <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-xs text-[var(--muted)]">
            —
          </span>
        )}
      </div>

      <p className="mt-3 min-h-10 flex-1 text-sm leading-relaxed text-[var(--muted)] line-clamp-2">
        {repo.description ?? "No description provided."}
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
        <span className="text-xs text-[var(--muted)]">
          ★ {repo.stargazers_count}
        </span>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg border border-[var(--accent)]/45 bg-[var(--accent)]/10 px-3 py-1.5 text-xs font-semibold text-[var(--accent)] transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--accent)]/18 hover:shadow-[0_0_14px_var(--accent-glow-soft)]"
        >
          View on GitHub
        </a>
      </div>
    </article>
  );
}
