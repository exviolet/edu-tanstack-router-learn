import { Hono } from "hono";
import { getPosts, getPost, createPost, updatePost, deletePost, getCommentsByPostId } from "../db";

const delay = () => new Promise((r) => setTimeout(r, 300));

const posts = new Hono();

posts.get("/", async (c) => {
  await delay();
  const page = c.req.query("page");
  const limit = c.req.query("limit");
  if (page && limit) {
    return c.json(getPosts(Number(page), Number(limit)));
  }
  return c.json(getPosts());
});

posts.get("/:id", async (c) => {
  await delay();
  const post = getPost(Number(c.req.param("id")));
  if (!post) return c.json({ error: "Post not found" }, 404);
  return c.json(post);
});

posts.get("/:id/comments", async (c) => {
  await delay();
  const comments = getCommentsByPostId(Number(c.req.param("id")));
  return c.json(comments);
});

posts.post("/", async (c) => {
  await delay();
  const body = await c.req.json<{ title: string; body: string }>();
  const post = createPost(body);
  return c.json(post, 201);
});

posts.patch("/:id", async (c) => {
  await delay();
  const body = await c.req.json<{ title?: string; body?: string }>();
  const post = updatePost(Number(c.req.param("id")), body);
  if (!post) return c.json({ error: "Post not found" }, 404);
  return c.json(post);
});

posts.delete("/:id", async (c) => {
  await delay();
  const ok = deletePost(Number(c.req.param("id")));
  if (!ok) return c.json({ error: "Post not found" }, 404);
  return c.json({ success: true });
});

export default posts;
