"use client";

import { useCallback, useEffect, useState } from "react";

import type { GitHubRepo } from "@/types/repo";

type UseReposState = {
  repos: GitHubRepo[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
};

export function useRepos(): UseReposState {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRepos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/github");
      const payload: unknown = await response.json();

      if (!response.ok) {
        const msg =
          typeof payload === "object" &&
          payload !== null &&
          "error" in payload &&
          typeof (payload as { error: unknown }).error === "string"
            ? (payload as { error: string }).error
            : `Request failed with ${response.status}`;
        throw new Error(msg);
      }

      if (!Array.isArray(payload)) {
        throw new Error("Invalid response from /api/github");
      }

      setRepos(payload as GitHubRepo[]);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("Unknown error"));
      setRepos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchRepos();
  }, [fetchRepos]);

  return { repos, loading, error, refetch: fetchRepos };
}
