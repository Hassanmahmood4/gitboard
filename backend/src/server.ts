import { serve } from "@hono/node-server";
import { Hono } from "hono";

import { fetchGitHubRepos } from "./lib/github.js";

const app = new Hono();

app.get("/api/github", async (c) => {
  try {
    const repos = await fetchGitHubRepos();
    return c.json(repos);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch repositories";
    return c.json({ error: message }, 500);
  }
});

app.post("/api/ai", (c) =>
  c.json({
    message:
      "AI route stub — wire your provider here (e.g. OpenAI) when you are ready.",
  }),
);

const port = Number(process.env.PORT) || 3001;

console.log(`GitBoard backend listening on http://127.0.0.1:${port}`);

serve({
  fetch: app.fetch,
  port,
});
