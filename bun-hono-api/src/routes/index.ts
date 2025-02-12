//import hono

import { Hono } from "hono";
import { createPost, getPosts } from "../contollers/PostController.js";

//import controller

//inistialize router
const router = new Hono();

//routes posts index
router.get("/", (c) => getPosts(c));

//routes posts create
router.post("/", (c) => createPost(c));
export const Routes = router;
