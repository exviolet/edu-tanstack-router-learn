import { Hono } from "hono";
import { cors } from "hono/cors";
import posts from "./routes/posts";

const app = new Hono();

app.use("/*", cors());
app.route("/api/posts", posts);

const port = 3001;
console.log(`Hono server running at http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
