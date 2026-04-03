import type { GitHubRepo } from "../types/repo.js";

export const DEFAULT_GITHUB_REPOS_URL =
  "https://api.github.com/users/Hassanmahmood4/repos";

type FetchReposOptions = {
  url?: string;
  signal?: AbortSignal;
};

export async function fetchGitHubRepos(
  options: FetchReposOptions = {},
): Promise<GitHubRepo[]> {
  const target = options.url ?? DEFAULT_GITHUB_REPOS_URL;

  const response = await fetch(target, {
    signal: options.signal,
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `GitHub API error ${response.status}: ${text || response.statusText}`,
    );
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("Unexpected GitHub API response shape");
  }

  return data as GitHubRepo[];
}
