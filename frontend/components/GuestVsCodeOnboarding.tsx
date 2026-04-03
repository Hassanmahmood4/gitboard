"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

type Phase = "setup" | "working" | "workspace";

type WorkKind = "clone" | "folder";

type WindowWithDirPicker = Window & {
  showDirectoryPicker?: (options?: {
    mode?: "read" | "readwrite";
  }) => Promise<FileSystemDirectoryHandle>;
};

function parseGithubRepoUrl(raw: string): { display: string; path: string } | null {
  const s = raw.trim();
  if (!s) return null;
  try {
    const u = new URL(s.startsWith("http") ? s : `https://${s}`);
    if (!u.hostname.includes("github.com")) return null;
    const parts = u.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return null;
    const owner = parts[0];
    const repo = parts[1].replace(/\.git$/, "");
    if (!owner || !repo) return null;
    return { display: `${owner}/${repo}`, path: `${owner}/${repo}` };
  } catch {
    return null;
  }
}

const EXPLORER_FILES = [
  { name: "README.md", hint: "Documentation" },
  { name: "package.json", hint: "Manifest" },
  { name: "src/index.ts", hint: "Entry" },
] as const;

export function GuestVsCodeOnboarding() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [repoInput, setRepoInput] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);
  const [workKind, setWorkKind] = useState<WorkKind>("clone");
  const [targetLabel, setTargetLabel] = useState("");
  const [activeFile, setActiveFile] = useState<string>("README.md");
  const [folderError, setFolderError] = useState<string | null>(null);

  const canPickFolder = useMemo(() => {
    if (typeof window === "undefined") return false;
    return typeof (window as WindowWithDirPicker).showDirectoryPicker ===
      "function";
  }, []);

  const openFromUrl = useCallback(() => {
    setInputError(null);
    const parsed = parseGithubRepoUrl(repoInput);
    if (!parsed) {
      setInputError("Enter a valid GitHub URL (e.g. https://github.com/owner/repo)");
      return;
    }
    setWorkKind("clone");
    setTargetLabel(parsed.display);
    setPhase("working");
    window.setTimeout(() => {
      setPhase("workspace");
    }, 1400);
  }, [repoInput]);

  const openFolder = useCallback(async () => {
    setFolderError(null);
    setInputError(null);
    if (!canPickFolder) {
      setFolderError(
        "This browser can’t open folders from the web. Try Chrome or Edge, or paste a GitHub URL above.",
      );
      return;
    }
    try {
      const picker = (window as WindowWithDirPicker).showDirectoryPicker?.bind(
        window,
      );
      if (!picker) {
        setFolderError("Folder picker is not available in this environment.");
        return;
      }
      const dir = await picker({ mode: "read" });
      setWorkKind("folder");
      setTargetLabel(dir.name);
      setPhase("working");
      window.setTimeout(() => {
        setPhase("workspace");
      }, 1100);
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      setFolderError("Could not read that folder. Check permissions and try again.");
    }
  }, [canPickFolder]);

  const reset = useCallback(() => {
    setPhase("setup");
    setRepoInput("");
    setInputError(null);
    setFolderError(null);
    setTargetLabel("");
    setActiveFile("README.md");
  }, []);

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col bg-black">
      <motion.div
        layout
        className="flex min-h-0 w-full flex-1 flex-col overflow-hidden bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Editor title bar — same black as navbar, no seam */}
        <header className="flex h-10 shrink-0 items-center justify-between gap-3 bg-black px-3 sm:h-11 sm:px-4">
          <span className="min-w-0 truncate font-mono text-[11px] text-white/50 sm:text-[12px]">
            GitBoard — Guest workspace
          </span>
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={reset}
              className="rounded px-2 py-1 font-mono text-[11px] text-white/45 transition-colors hover:bg-white/10 hover:text-white/80"
            >
              Reset
            </button>
            <Link
              href="/"
              className="rounded px-2 py-1 font-mono text-[11px] text-white/45 transition-colors hover:bg-white/10 hover:text-white/80"
            >
              Close
            </Link>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col">
          <AnimatePresence mode="wait">
          {phase === "setup" && (
            <motion.div
              key="setup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-black"
            >
              <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-5 py-10 sm:px-8 sm:py-14 lg:py-16">
              <h1 className="font-sans text-lg font-medium tracking-tight text-white/90 sm:text-xl">
                Open a folder or clone a repository
              </h1>
              <p className="mt-2 max-w-lg font-sans text-sm leading-relaxed text-white/55">
                Paste a public GitHub link to simulate opening a remote repo, or open a
                local folder from your machine (supported browsers only). Guest mode
                stays on this device until you sign in.
              </p>

              <div className="mt-8 space-y-2">
                <label
                  htmlFor="guest-repo-url"
                  className="block font-mono text-[11px] font-medium uppercase tracking-wider text-[#858585]"
                >
                  Repository URL
                </label>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                  <input
                    id="guest-repo-url"
                    type="url"
                    inputMode="url"
                    autoComplete="off"
                    spellCheck={false}
                    placeholder="https://github.com/owner/repository"
                    value={repoInput}
                    onChange={(e) => {
                      setRepoInput(e.target.value);
                      setInputError(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") openFromUrl();
                    }}
                    className="min-h-10 w-full min-w-0 rounded border border-white/[0.12] bg-white/[0.05] px-3 py-2 font-mono text-[13px] text-white/90 placeholder:text-white/35 outline-none ring-0 transition-[border-color,box-shadow] duration-200 ease-in-out focus:border-[var(--accent)] focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)]"
                  />
                  <button
                    type="button"
                    onClick={openFromUrl}
                    className="h-10 shrink-0 rounded border border-transparent bg-[var(--accent)] px-5 font-sans text-[13px] font-medium text-white shadow-none transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-[var(--shadow-accent-hover)] sm:px-6"
                  >
                    Open
                  </button>
                </div>
                {inputError ? (
                  <p className="font-mono text-[12px] text-[#f48771]" role="alert">
                    {inputError}
                  </p>
                ) : null}
              </div>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center" aria-hidden>
                  <div className="w-full border-t border-white/[0.08]" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-black px-3 font-mono text-[11px] uppercase tracking-wider text-white/35">
                    or
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={openFolder}
                  disabled={!canPickFolder}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded border border-white/[0.12] bg-white/[0.06] px-4 font-sans text-[13px] font-medium text-white/85 transition-colors hover:bg-white/[0.1] disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <span className="font-mono text-[14px] opacity-80" aria-hidden>
                    📂
                  </span>
                  Open folder from device…
                </button>
                {!canPickFolder ? (
                  <span className="font-mono text-[11px] text-[#858585]">
                    Folder picker requires a Chromium-based browser.
                  </span>
                ) : null}
              </div>
              {folderError ? (
                <p className="mt-3 font-mono text-[12px] text-[#f48771]" role="alert">
                  {folderError}
                </p>
              ) : null}

              <p className="mt-10 border-t border-white/[0.08] pt-6 font-mono text-[11px] leading-relaxed text-white/40">
                Tip: Use Sign in above to connect GitHub and load real repositories in
                the dashboard.
              </p>
              </div>
            </motion.div>
          )}

          {phase === "working" && (
            <motion.div
              key="working"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex min-h-0 flex-1 flex-col items-center justify-center gap-5 bg-black px-8 py-16"
            >
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-[var(--accent)]" />
              <p className="text-center font-mono text-[13px] text-white/75">
                {workKind === "clone" ? (
                  <>
                    Cloning{" "}
                    <span className="text-[var(--accent-secondary)]">{targetLabel}</span>…
                  </>
                ) : (
                  <>
                    Opening folder{" "}
                    <span className="text-[var(--accent-secondary)]">{targetLabel}</span>…
                  </>
                )}
              </p>
              <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full bg-[var(--accent)]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: workKind === "clone" ? 1.35 : 1.05, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          )}

          {phase === "workspace" && (
            <motion.div
              key="workspace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="flex min-h-0 flex-1">
                {/* Activity bar */}
                <div className="flex w-12 shrink-0 flex-col items-center gap-3 border-r border-white/[0.06] bg-black py-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded border-l-2 border-white text-[#cccccc]"
                    title="Explorer"
                  >
                    <span className="text-[15px] opacity-90" aria-hidden>
                      ⧉
                    </span>
                  </span>
                  <span className="text-[13px] text-[#858585] opacity-50" aria-hidden>
                    ◇
                  </span>
                  <span className="text-[13px] text-[#858585] opacity-50" aria-hidden>
                    ⧐
                  </span>
                </div>

                {/* Sidebar */}
                <aside className="flex w-52 shrink-0 flex-col border-r border-white/[0.06] bg-black sm:w-60 md:w-64">
                  <div className="px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-wide text-white/45">
                    Explorer
                  </div>
                  <div className="min-h-0 flex-1 overflow-y-auto px-1 pb-3 font-mono text-[12px]">
                    <div className="px-2 py-1 text-white/75">
                      <span className="text-white/35">▼ </span>
                      <span className="text-white/90">{targetLabel}</span>
                    </div>
                    <div className="ml-2 border-l border-white/[0.08] pl-2">
                      {EXPLORER_FILES.map((f) => (
                        <button
                          key={f.name}
                          type="button"
                          onClick={() => setActiveFile(f.name)}
                          className={`mt-0.5 flex w-full items-center gap-2 rounded px-2 py-1 text-left transition-colors ${
                            activeFile === f.name
                              ? "bg-white/[0.08] text-white"
                              : "text-white/70 hover:bg-white/[0.05]"
                          }`}
                        >
                          <span className="text-white/35">▸</span>
                          {f.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </aside>

                {/* Editor */}
                <div className="flex min-w-0 flex-1 flex-col bg-black">
                  <div className="flex h-9 shrink-0 items-end gap-0 border-b border-white/[0.06] bg-black px-1 pt-1">
                    <div className="flex h-8 max-w-[200px] items-center gap-2 rounded-t border border-b-0 border-white/[0.08] bg-black px-3 font-mono text-[12px] text-white/80">
                      <span className="truncate">{activeFile}</span>
                      <span className="text-white/40">×</span>
                    </div>
                  </div>
                  <div className="min-h-0 flex-1 overflow-auto p-4 font-mono text-[12px] leading-6 text-[#d4d4d4]">
                    {activeFile === "README.md" && (
                      <div className="space-y-3">
                        <div className="text-[#6a9955]"># Guest workspace</div>
                        <p className="text-[#cccccc]">
                          {workKind === "clone" ? (
                            <>
                              Simulated clone of{" "}
                              <span className="text-[#4ec9b0]">{targetLabel}</span>.
                              In a signed-in session, GitBoard would sync issues, PRs,
                              and AI review against the real remote.
                            </>
                          ) : (
                            <>
                              Opened folder{" "}
                              <span className="text-[#4ec9b0]">{targetLabel}</span>{" "}
                              from your device. File tree above is illustrative; connect
                              an account to index private repos.
                            </>
                          )}
                        </p>
                        <p className="text-[#858585]">
                          — GitBoard guest preview · no data leaves this tab except if
                          you sign in.
                        </p>
                      </div>
                    )}
                    {activeFile === "package.json" && (
                      <pre className="text-[#d4d4d4]">
                        <span className="text-[#dcdcaa]">{"{"}</span>
                        {"\n"}
                        <span className="text-[#9cdcfe]">  &quot;name&quot;</span>
                        <span className="text-[#d4d4d4]">: </span>
                        <span className="text-[#ce9178]">
                          &quot;{targetLabel.replace("/", "-")}&quot;
                        </span>
                        <span className="text-[#d4d4d4]">,</span>
                        {"\n"}
                        <span className="text-[#9cdcfe]">  &quot;private&quot;</span>
                        <span className="text-[#d4d4d4]">: </span>
                        <span className="text-[#569cd6]">true</span>
                        {"\n"}
                        <span className="text-[#dcdcaa]">{"}"}</span>
                      </pre>
                    )}
                    {activeFile === "src/index.ts" && (
                      <pre className="text-[#d4d4d4]">
                        <span className="text-[#569cd6]">export</span>
                        <span className="text-[#d4d4d4]"> </span>
                        <span className="text-[#569cd6]">async</span>
                        <span className="text-[#d4d4d4]"> </span>
                        <span className="text-[#569cd6]">function</span>
                        <span className="text-[#d4d4d4]"> </span>
                        <span className="text-[#dcdcaa]">main</span>
                        <span className="text-[#d4d4d4]">() {"{"}</span>
                        {"\n"}
                        <span className="text-[#d4d4d4]">  </span>
                        <span className="text-[#6a9955]">
                          {`// Start building in GitBoard`}
                        </span>
                        {"\n"}
                        <span className="text-[#d4d4d4]">{"}"}</span>
                        {"\n"}
                      </pre>
                    )}
                  </div>
                </div>
              </div>

              {/* Status bar */}
              <footer className="flex h-6 shrink-0 items-center justify-between border-t border-white/[0.06] bg-black px-2 font-mono text-[11px] text-white/50">
                <span className="flex items-center gap-2">
                  <span className="text-white/55">Guest</span>
                  <span className="text-white/25">|</span>
                  <span className="truncate text-white/55">{targetLabel}</span>
                </span>
                <span className="hidden text-white/40 sm:inline">UTF-8 LF</span>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
