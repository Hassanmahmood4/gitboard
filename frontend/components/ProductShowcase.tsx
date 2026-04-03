"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ChatRole = "user" | "ai";

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
};

const CHAT_SEED: ChatMessage[] = [
  {
    id: "seed-1",
    role: "ai",
    text: "This function handles API requests but lacks validation. Consider using a schema.",
  },
  {
    id: "seed-2",
    role: "user",
    text: "How can I improve this?",
  },
  {
    id: "seed-3",
    role: "ai",
    text: "You can add input validation using Zod or Joi before processing the request.",
  },
];

const MOCK_AI_REPLIES = [
  "Try narrowing types at the boundary: parse once, then pass a validated object to your handlers.",
  "For errors, return a consistent JSON shape (`{ error, code }`) so the client can branch cleanly.",
  "Consider `AbortSignal` on fetch and a short timeout so hung requests don’t pile up.",
  "If this path is hot, memoize the parsed schema or reuse a single validator instance.",
] as const;

let chatId = 0;
function nextChatId() {
  chatId += 1;
  return `m-${chatId}`;
}

type FileId =
  | "index.ts"
  | "package.json"
  | "components/Button.tsx"
  | "utils/format.ts"
  | "api/client.ts";

const FILE_TABS: { id: FileId; label: string }[] = [
  { id: "index.ts", label: "index.ts" },
  { id: "package.json", label: "package.json" },
  { id: "components/Button.tsx", label: "Button.tsx" },
];

function kw(s: string) {
  return <span className="text-white/42">{s}</span>;
}
function str(s: string) {
  return <span className="text-white/55">&quot;{s}&quot;</span>;
}
function v(s: string) {
  return <span className="text-white/90">{s}</span>;
}
function ty(s: string) {
  return <span className="text-[var(--accent-secondary)]/80">{s}</span>;
}
function fn(s: string) {
  return <span className="text-[#dcdcaa]">{s}</span>;
}
function pun(s: string) {
  return <span className="text-white/45">{s}</span>;
}

function CodeLine({
  n,
  children,
  highlight,
}: {
  n: number;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex min-h-[1.45rem] font-mono text-[11px] leading-[1.45rem] sm:text-xs sm:leading-6 ${
        highlight
          ? "-mx-1 rounded-sm bg-[rgba(139,92,246,0.08)] px-1 ring-1 ring-[rgba(139,92,246,0.14)]"
          : ""
      }`}
    >
      <span className="w-7 shrink-0 select-none pr-2 text-right text-white/22 sm:w-8 sm:pr-3">
        {n}
      </span>
      <span className="min-w-0 flex-1 whitespace-pre-wrap text-white/90">
        {children}
      </span>
    </div>
  );
}

/** 0-based index of the “cursor” line per file */
const HIGHLIGHT_LINE: Record<FileId, number> = {
  "index.ts": 5,
  "package.json": 7,
  "components/Button.tsx": 6,
  "utils/format.ts": 1,
  "api/client.ts": 4,
};

const CODE_LINES: Record<
  FileId,
  { lines: React.ReactNode[]; tabTitle: string }
> = {
  "index.ts": {
    tabTitle: "index.ts",
    lines: [
      <>
        {kw("import")} {pun("{")} {v("fetchRepos")} {pun("}")} {kw("from")}{" "}
        {str("@/lib/github")}
        {pun(";")}
      </>,
      <></>,
      <>
        {kw("export")} {kw("async")} {kw("function")} {fn("loadDashboard")} {pun("()")}{" "}
        {pun("{")}
      </>,
      <>
        {pun("  ")}
        {kw("const")} {v("res")} {pun("=")} {kw("await")} {fn("fetch")}{pun("(")}
        {str("/api/github")}
        {pun(");")}
      </>,
      <>
        {pun("  ")}
        {kw("if")} {pun("(!")} {v("res")} {pun(".")} {v("ok")} {pun(")")} {kw("throw")}{" "}
        {kw("new")} {v("Error")} {pun("(")}
        {str("GitHub fetch failed")}
        {pun(");")}
      </>,
      <>
        {pun("  ")}
        {kw("return")} {v("res")} {pun(".")} {fn("json")} {pun("();")}
      </>,
      <>{pun("}")}</>,
    ],
  },
  "package.json": {
    tabTitle: "package.json",
    lines: [
      <>{pun("{")}</>,
      <>
        {pun('  ')}
        {str("name")}
        {pun(": ")}
        {str("gitboard")}
        {pun(",")}
      </>,
      <>
        {pun("  ")}
        {str("version")}
        {pun(": ")}
        {str("0.1.0")}
        {pun(",")}
      </>,
      <>
        {pun("  ")}
        {str("scripts")}
        {pun(": ")}
        {pun("{")}
      </>,
      <>
        {pun("    ")}
        {str("dev")}
        {pun(": ")}
        {str("next dev")}
      </>,
      <>
        {pun("  ")}
        {pun("},")}
      </>,
      <>
        {pun("  ")}
        {str("dependencies")}
        {pun(": ")}
        {pun("{ ")}
        {str("next")}
        {pun(": ")}
        {str("^16")}
        {pun(" }")}
      </>,
      <>{pun("}")}</>,
    ],
  },
  "components/Button.tsx": {
    tabTitle: "Button.tsx",
    lines: [
      <>
        {str("use client")}
        {pun(";")}
      </>,
      <></>,
      <>
        {kw("import")} {pun("{")} {v("type")} {v("ButtonHTMLAttributes")} {pun("}")}{" "}
        {kw("from")} {str("react")}
        {pun(";")}
      </>,
      <></>,
      <>
        {kw("export")} {kw("function")} {fn("Button")} {pun("(")}
        {pun("{")} {v("children")} {pun(", ...")} {v("props")} {pun("}: Props)")}{" "}
        {pun("{")}
      </>,
      <>
        {pun("  ")}
        {kw("return")} {pun("(")}
      </>,
      <>
        {pun("    ")}
        {pun("<")} {v("button")} {v("className")} {pun("=")}
        {str("rounded-lg px-4 py-2")}
        {pun(" {...")} {v("props")} {pun("}>")}
      </>,
      <>
        {pun("      ")}
        {pun("{")} {v("children")} {pun("}")}
      </>,
      <>
        {pun("    ")}
        {pun("</")} {v("button")} {pun(">")}
      </>,
      <>
        {pun("  ")}
        {pun(");")}
      </>,
      <>{pun("}")}</>,
    ],
  },
  "utils/format.ts": {
    tabTitle: "format.ts",
    lines: [
      <>
        {kw("export")} {kw("function")} {fn("formatStars")} {pun("(")}
        {v("n")}
        {pun(": ")}
        {ty("number")}
        {pun("): ")}
        {ty("string")} {pun("{")}
      </>,
      <>
        {pun("  ")}
        {kw("if")} {pun("(")}
        {v("n")}
        {pun(" >= ")}
        {v("1000")}
        {pun(")")} {kw("return")}{" "}
        <span className="text-[var(--accent-secondary)]/85">
          {["`", "${(n/1000).toFixed(1)}", "k`"].join("")}
        </span>
        {pun(";")}
      </>,
      <>
        {pun("  ")}
        {kw("return")} {v("String")} {pun("(")}
        {v("n")}
        {pun(");")}
      </>,
      <>{pun("}")}</>,
    ],
  },
  "api/client.ts": {
    tabTitle: "client.ts",
    lines: [
      <>
        {kw("const")} {v("BASE")} {pun(" = ")}
        {str("/api")}
        {pun(";")}
      </>,
      <></>,
      <>
        {kw("export")} {kw("async")} {kw("function")} {fn("getJSON")} {pun("<")} {ty("T")}
        {pun(">(")}
        {v("path")}
        {pun(": ")}
        {ty("string")}
        {pun("): Promise<")} {ty("T")}
        {pun("> ")}
        {pun("{")}
      </>,
      <>
        {pun("  ")}
        {kw("const")} {v("r")} {pun(" = ")}
        {kw("await")} {fn("fetch")} {pun("(")}
        {v("BASE")} {pun(" + ")} {v("path")}
        {pun(");")}
      </>,
      <>
        {pun("  ")}
        {kw("return")} {v("r")} {pun(".")} {fn("json")} {pun("() ")}
        {kw("as")} {ty("T")}
        {pun(";")}
      </>,
      <>{pun("}")}</>,
    ],
  },
};

const AI_REVIEW: Record<
  FileId,
  {
    summary: string;
    good: string[];
    improve: string[];
  }
> = {
  "index.ts": {
    summary:
      "Entry uses async/await with a clear API round-trip. Good separation of transport from UI.",
    good: ["Clean structure", "Modular components", "Good naming"],
    improve: [
      "Add error handling",
      "Improve API validation",
      "Optimize performance (cache)",
    ],
  },
  "package.json": {
    summary:
      "Manifest is well-formed with modern Next.js and sensible script entrypoints.",
    good: ["Clear versioning", "Predictable scripts", "Lean dependency set"],
    improve: [
      "Pin major versions in CI",
      "Add engines field",
      "Document env requirements",
    ],
  },
  "components/Button.tsx": {
    summary:
      "Client component with typed props extension pattern — idiomatic for App Router.",
    good: ["Reusable API", "Type-safe props spread", "Small surface area"],
    improve: [
      "Add loading / disabled states",
      "Verify focus styles for a11y",
      "Consider polymorphic `as` prop",
    ],
  },
  "utils/format.ts": {
    summary: "Pure utility with no side effects — easy to test and tree-shake.",
    good: ["Simple branching", "Readable return types", "No I/O"],
    improve: [
      "Add unit tests",
      "Handle negative input",
      "i18n for suffixes",
    ],
  },
  "api/client.ts": {
    summary:
      "Thin fetch wrapper — good starting point for centralizing headers and errors.",
    good: ["Single choke point", "Generic JSON typing", "Composable base URL"],
    improve: [
      "Add timeout + AbortSignal",
      "Normalize error responses",
      "Retry policy for 5xx",
    ],
  },
};

function TrafficLights() {
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
    </div>
  );
}

function ThinkingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 2 }}
      className="flex items-center gap-1.5 px-2 py-1.5 font-mono text-[10px] text-white/45"
      role="status"
      aria-live="polite"
    >
      <span className="italic">AI is thinking</span>
      <span className="flex gap-0.5" aria-hidden>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1 w-1 rounded-full bg-white/50"
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
              delay: i * 0.18,
              ease: "easeInOut",
            }}
          />
        ))}
      </span>
    </motion.div>
  );
}

function AssistantChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    CHAT_SEED.map((m) => ({ ...m, id: nextChatId() })),
  );
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const replyIndex = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const send = useCallback(() => {
    const t = draft.trim();
    if (!t || thinking) return;
    setDraft("");
    setMessages((prev) => [...prev, { id: nextChatId(), role: "user", text: t }]);
    setThinking(true);
    const delay = 900 + Math.random() * 700;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      const reply =
        MOCK_AI_REPLIES[replyIndex.current % MOCK_AI_REPLIES.length] ?? "";
      replyIndex.current += 1;
      setMessages((prev) => [
        ...prev,
        { id: nextChatId(), role: "ai", text: reply },
      ]);
      setThinking(false);
    }, delay);
  }, [draft, thinking]);

  return (
    <div
      className="flex h-full min-h-0 flex-1 flex-col rounded-lg border border-white/[0.1] bg-[#0f172a]"
      role="region"
      aria-label="Repository assistant chat"
    >
      <div
        ref={scrollRef}
        className="min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain px-2 py-2 sm:px-2.5 sm:py-2.5"
      >
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[92%] rounded-lg px-2.5 py-1.5 font-mono text-[10px] leading-snug transition-shadow duration-200 ease-in-out sm:text-[11px] ${
                  m.role === "ai"
                    ? "border border-[rgba(139,92,246,0.2)] bg-[rgba(139,92,246,0.08)] text-white/85 hover:shadow-[0_0_12px_var(--accent-glow-soft)]"
                    : "border border-transparent bg-[rgba(255,255,255,0.05)] text-white/80"
                }`}
              >
                {m.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <AnimatePresence>{thinking ? <ThinkingIndicator /> : null}</AnimatePresence>
      </div>
      <form
        className="shrink-0 border-t border-white/[0.08] p-2"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <div className="flex gap-1.5">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask about this repository..."
            className="min-w-0 flex-1 rounded-md border border-white/[0.12] bg-[#0a0f18] px-2.5 py-1.5 font-mono text-[10px] text-white/90 placeholder:text-white/30 outline-none ring-[var(--accent)]/0 transition-[box-shadow,border-color] duration-200 ease-in-out focus:border-[var(--accent)]/40 focus:ring-2 focus:ring-[var(--accent)]/15 sm:text-[11px]"
            aria-label="Message assistant"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={!draft.trim() || thinking}
            className="shrink-0 rounded-md border border-white/[0.1] bg-transparent px-2.5 py-1.5 font-mono text-[10px] font-medium text-white/85 transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--accent)]/[0.12] hover:shadow-[0_0_12px_var(--accent-glow-soft)] disabled:pointer-events-none disabled:opacity-35 sm:px-3 sm:text-[11px]"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export function ProductShowcase() {
  const [activeFile, setActiveFile] = useState<FileId>("index.ts");

  const code = CODE_LINES[activeFile];
  const review = AI_REVIEW[activeFile];

  const terminalLine = useMemo(() => {
    const map: Record<FileId, string> = {
      "index.ts": "index.ts",
      "package.json": "package.json",
      "components/Button.tsx": "src/components/Button.tsx",
      "utils/format.ts": "src/utils/format.ts",
      "api/client.ts": "src/api/client.ts",
    };
    return map[activeFile];
  }, [activeFile]);

  return (
    <section
      id="features"
      className="vscode-showcase scroll-mt-28 border-t border-white/[0.06] bg-[var(--bg-primary)] py-14 sm:py-20 lg:py-24"
      aria-labelledby="vscode-showcase-heading"
    >
      <h2
        id="vscode-showcase-heading"
        className="mb-8 text-center text-xs font-medium uppercase tracking-[0.2em] text-white/40 sm:mb-10"
      >
        Repo review workspace
      </h2>

      <div className="relative mx-auto w-[min(90%,1400px)] px-3 sm:px-5">
        <div
          className="vscode-showcase__glow pointer-events-none absolute left-1/2 top-1/2 h-[min(85vw,720px)] w-[min(92vw,1280px)] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] opacity-[0.85] blur-3xl"
          aria-hidden
        />

        <motion.div
          className="vscode-showcase__editor relative flex max-h-[600px] min-h-[500px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1c] shadow-[0_20px_80px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-72px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{
            y: -2,
            transition: { type: "spring", stiffness: 380, damping: 28 },
          }}
        >
          {/* Title bar */}
          <header className="flex h-10 shrink-0 items-center gap-3 border-b border-white/[0.1] bg-[#131920] px-3 sm:h-11 sm:px-4">
            <TrafficLights />
            <span className="min-w-0 truncate font-mono text-[11px] font-medium text-white/70 sm:text-xs">
              {code.tabTitle}
            </span>
            <div className="ml-auto flex min-w-0 gap-0.5 overflow-x-auto">
              {FILE_TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveFile(t.id)}
                  className={`shrink-0 rounded-t-md px-2.5 py-1.5 font-mono text-[10px] transition-all duration-200 ease-in-out sm:px-3 sm:text-xs ${
                    activeFile === t.id
                      ? "border border-b-0 border-white/12 bg-[var(--bg-secondary)] text-[var(--accent)]"
                      : "text-white/40 hover:bg-white/[0.04] hover:text-white/65"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </header>

          {/* 3 columns: 20% | 50% | 30% */}
          <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
            {/* Explorer */}
            <aside className="flex w-full shrink-0 flex-col border-b border-white/[0.08] bg-[#070a10] lg:w-[20%] lg:border-b-0 lg:border-r">
              <div className="border-b border-white/[0.06] px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/35">
                Explorer
              </div>
              <nav
                className="flex-1 overflow-y-auto p-2 font-mono text-[11px] sm:text-xs"
                aria-label="Repository files"
              >
                <div className="mb-0.5 flex items-center gap-1 text-[var(--text-secondary)]">
                  <span className="text-white/35">▼</span>
                  <span className="text-white/65">src/</span>
                </div>
                <div className="ml-2 border-l border-white/[0.06] pl-2">
                  <div className="flex items-center gap-1 text-[var(--text-secondary)]">
                    <span className="text-white/35">▼</span>
                    <span className="text-white/55">components/</span>
                  </div>
                  <FileRow
                    name="Button.tsx"
                    active={activeFile === "components/Button.tsx"}
                    onSelect={() => setActiveFile("components/Button.tsx")}
                  />
                  <div className="mt-1 flex items-center gap-1 text-[var(--text-secondary)]">
                    <span className="text-white/35">▼</span>
                    <span className="text-white/55">utils/</span>
                  </div>
                  <FileRow
                    name="format.ts"
                    active={activeFile === "utils/format.ts"}
                    onSelect={() => setActiveFile("utils/format.ts")}
                  />
                  <div className="mt-1 flex items-center gap-1 text-[var(--text-secondary)]">
                    <span className="text-white/35">▼</span>
                    <span className="text-white/55">api/</span>
                  </div>
                  <FileRow
                    name="client.ts"
                    active={activeFile === "api/client.ts"}
                    onSelect={() => setActiveFile("api/client.ts")}
                  />
                </div>
                <FileRow
                  name="index.ts"
                  active={activeFile === "index.ts"}
                  onSelect={() => setActiveFile("index.ts")}
                  className="mt-2"
                />
                <FileRow
                  name="package.json"
                  active={activeFile === "package.json"}
                  onSelect={() => setActiveFile("package.json")}
                />
              </nav>
            </aside>

            {/* Code */}
            <main className="flex min-h-[220px] min-w-0 flex-1 flex-col border-b border-white/[0.08] bg-[#0d1117] lg:w-[50%] lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between border-b border-white/[0.06] px-2 py-1 font-mono text-[10px] text-white/30 sm:px-3 sm:text-[11px]">
                <span>
                  {terminalLine}{" "}
                  <span className="text-white/18">— UTF-8 LF TypeScript</span>
                </span>
              </div>
              <div className="min-h-0 flex-1 overflow-auto p-1 sm:p-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFile}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {code.lines.map((line, i) => (
                      <CodeLine
                        key={i}
                        n={i + 1}
                        highlight={i === HIGHLIGHT_LINE[activeFile]}
                      >
                        {line}
                      </CodeLine>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </main>

            {/* AI review + integrated assistant chat */}
            <aside className="flex min-h-0 w-full shrink-0 flex-col overflow-hidden bg-[#0b1018] lg:w-[30%] lg:max-w-[380px]">
              <div className="shrink-0 border-b border-white/[0.08] px-3 py-2">
                <p className="font-mono text-xs font-semibold text-[var(--accent)] sm:text-sm">
                  AI Code Review
                </p>
                <p className="mt-0.5 font-mono text-[10px] text-white/35">
                  GitBoard · {code.tabTitle}
                </p>
              </div>

              <div className="flex min-h-0 flex-1 flex-col">
                <div className="min-h-0 flex-1 overflow-y-auto p-3 font-mono text-[11px] leading-relaxed sm:text-xs">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFile}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <p className="text-white/50">{review.summary}</p>
                      <div>
                        <p className="mb-2 flex items-center gap-1.5 text-[var(--accent)]/90">
                          <span aria-hidden>✔</span>
                          <span className="font-semibold">What&apos;s good</span>
                        </p>
                        <ul className="space-y-1.5 border-l-2 border-[var(--accent)]/25 pl-3 text-white/75">
                          {review.good.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2 flex items-center gap-1.5 text-[#dcdcaa]">
                          <span aria-hidden>⚠</span>
                          <span className="font-semibold">Improvements</span>
                        </p>
                        <ul className="space-y-1.5 border-l-2 border-[#cca700]/45 pl-3 text-white/70">
                          {review.improve.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="shrink-0 border-t border-white/[0.08] bg-[#080c12] px-2 pb-2 pt-2">
                  <p className="mb-1.5 px-1 font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-white/35">
                    Assistant
                  </p>
                  <div className="h-[196px] sm:h-[206px]">
                    <AssistantChat key={activeFile} />
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <footer className="shrink-0 border-t border-white/[0.1] bg-[#050608] px-3 py-2 font-mono text-[10px] leading-relaxed text-white/45 sm:px-4 sm:text-xs">
            <p>
              <span className="text-white/40">$</span> analyzing{" "}
              <span className="text-[var(--accent-secondary)]/90">{terminalLine}</span>
              …
            </p>
            <p className="mt-0.5 text-[var(--accent)]/90">
              <span className="text-[var(--accent)]">✔</span> review complete
            </p>
          </footer>
        </motion.div>
      </div>
    </section>
  );
}

function FileRow({
  name,
  active,
  onSelect,
  className = "",
}: {
  name: string;
  active: boolean;
  onSelect: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`ml-3 mt-0.5 block w-[calc(100%-0.75rem)] rounded px-2 py-1 text-left font-mono text-[11px] transition-colors sm:text-xs ${
        active
          ? "bg-[rgba(139,92,246,0.1)] text-[var(--accent)] ring-1 ring-[rgba(139,92,246,0.22)]"
          : "text-[var(--text-secondary)] hover:bg-white/[0.06] hover:text-[var(--text-primary)]"
      } ${className}`}
    >
      {name}
    </button>
  );
}
