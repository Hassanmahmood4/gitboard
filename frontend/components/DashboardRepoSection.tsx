"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import { RepoCard } from "@/components/RepoCard";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/Button";
import { useRepos } from "@/hooks/useRepos";

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function DashboardRepoSection() {
  const { repos, loading, error, refetch } = useRepos();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return repos;
    return repos.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.full_name.toLowerCase().includes(q),
    );
  }, [repos, query]);

  return (
    <section className="mt-10 space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1">
          <SearchBar
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Filter repositories"
          />
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={() => void refetch()}
          className="shrink-0 sm:ml-1"
        >
          Refresh
        </Button>
      </div>

      {loading && (
        <p className="text-sm text-[var(--muted)] transition-opacity duration-200">
          Loading repositories…
        </p>
      )}
      {error && (
        <p
          className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          role="alert"
        >
          {error.message}
        </p>
      )}
      {!loading && !error && filtered.length === 0 && (
        <p className="text-sm text-[var(--muted)]">No repositories match.</p>
      )}
      {!loading && !error && filtered.length > 0 && (
        <motion.ul
          className="grid list-none grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          variants={listVariants}
          initial="hidden"
          animate="show"
        >
          {filtered.map((repo) => (
            <motion.li key={repo.id} variants={itemVariants} className="h-full">
              <RepoCard repo={repo} />
            </motion.li>
          ))}
        </motion.ul>
      )}
    </section>
  );
}
