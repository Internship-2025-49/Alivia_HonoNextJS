import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import type { runInContext } from "vm";
import { handle } from "hono/cloudflare-pages";
import { Routes } from "./routes/index.js";

const app = new Hono().basePath("/api");

app.use(
  "*",
  cors({
    origin: "http://localhost:3000",
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["*"],
  })
);

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});

app.get("/", (c) => c.text("Hello, Alivia!"));
app.route("/posts", Routes);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export default app;

// app.all("/abc", (c) => {
//   return c.json({ success: "okeee" });
// });

// app.route("/posts", Routes);

// app.get("/", (c) => {
//   return c.text("hono jelekkk!");
// });

// const port = 3000;
// console.log(`Server is running on http://localhost:${port}`);

// serve({
//   fetch: app.fetch,
//   port,
// });
