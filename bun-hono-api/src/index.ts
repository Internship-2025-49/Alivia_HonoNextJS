import { Hono } from "hono";
import { Routes } from "./routes/index.js";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";

const app = new Hono().basePath("/api");

app.use("/api/*", cors());

app.all("/abc", (c) => {
  return c.json({ success: "okeee" });
});

app.route("/posts", Routes);

app.get("/", (c) => {
  return c.text("hono jelekkk!");
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});

export default app;
