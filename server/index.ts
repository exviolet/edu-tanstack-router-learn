import { Hono } from "hono";
import { cors } from "hono/cors";
import posts from "./routes/posts";
import { getStats } from "./db";

const delay = () => new Promise((r) => setTimeout(r, 300));

const app = new Hono();

app.use("/*", cors());
app.route("/api/posts", posts);

app.get("/api/stats", async (c) => {
  await delay();
  return c.json(getStats());
});

const port = 3001;
console.log(`Hono server running at http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
