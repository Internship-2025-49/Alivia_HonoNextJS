import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";
import { cors } from "hono/cors";
import { jwt } from "hono/jwt";
import type { JwtVariables } from "hono/jwt";
import jsonwebtoken from "jsonwebtoken";
import prisma from "../../prisma/client/index.js";
import { apiKeyAuth } from "../middleware/auth.js";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../contollers/PostController.js";
import { bearerAuth } from "hono/bearer-auth";

export const app = new Hono<{ Variables: JwtVariables }>();

//basic auth
app.use(
  "/basic/*",
  basicAuth({
    username: "hono",
    password: "hono123",
  })
);

app.get("/basic/page", (c) => {
  return c.text("You are authorized");
});

app.delete("/basic/delete/page", (c) => {
  return c.text("Page deleted");
});

// bearer
const token = "honoalivia";
app.use("/bearer/*", bearerAuth({ token }));

app.get("/bearer/page", (c) => {
  return c.json({ message: "Read post!" });
});

app.post("/bearer/create/page", (c) => {
  return c.json({ message: "Created post!" }, 201);
});

// //jwt
const secretKey = "secret";

app.post("/jwt/generate", async (c) => {
  const payload = {
    sub: "1234567890",
    name: "lipia",
    iat: Math.floor(Date.now() / 1000),
  };

  const token = jsonwebtoken.sign(payload, secretKey, { expiresIn: "1h" });

  return c.json({ token });
});

app.use("/jwt/*", jwt({ secret: secretKey }));

app.get("/jwt/page", (c) => {
  const payload = c.get("jwtPayload");
  return c.json({ message: "Token valid!", payload });
});

// //cors//
app.use("/api/*", cors());
app.use(
  "/api2/*",
  cors({
    origin: "http://localhost:3000",
    allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    maxAge: 600,
    credentials: true,
  })
);

app.all("/api/abc", (c) => {
  return c.json({ success: true });
});
app.all("/api2/abc", (c) => {
  return c.json({ success: true });
});

//batas

app.use("*", apiKeyAuth);
//routes posts index
app.get("/data", (c) => getPosts(c));

app.get("/basic/data", (c) => getPosts(c));

app.get("/bearer/data", (c) => getPosts(c));

app.get("/jwt/data", (c) => getPosts(c));

//routes posts create
app.post("/data", (c) => createPost(c));

app.get("/basic/data", (c) => createPost(c));

app.get("/bearer/data", (c) => createPost(c));

app.get("/jwt/data", (c) => createPost(c));

//routes posts detail
app.get("/basic/data/:id", (c) => getPostById(c));

app.get("/bearer/data/:id", (c) => getPostById(c));

app.get("/jwt/data/:id", (c) => getPostById(c));

app.get("/data/:id", (c) => getPostById(c));

//route post update
app.put("/basic/data/:id", (c) => updatePost(c));

app.put("/bearer/data/:id", (c) => updatePost(c));

app.put("/jwt/data/:id", (c) => updatePost(c));

app.put("/data/:id", (c) => updatePost(c));

//route post delete
app.delete("/data/:id", (c) => deletePost(c));

app.delete("/basic/data/:id", (c) => deletePost(c));

app.delete("/bearer/data/:id", (c) => deletePost(c));

app.delete("/jwt/data/:id", (c) => deletePost(c));

export const Routes = app;
