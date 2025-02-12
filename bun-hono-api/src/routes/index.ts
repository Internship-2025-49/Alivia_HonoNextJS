//import hono

import { Hono } from "hono";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../contollers/PostController.js";

//import controller

//inistialize router
const router = new Hono();

//routes posts index
router.get("/data", (c) => getPosts(c));

//routes posts create
router.post("/data", (c) => createPost(c));

//routes posts detail
router.get("/data/:id", (c) => getPostById(c));

//route post update
router.patch("/data/:id", (c) => updatePost(c));

//route post delete
router.delete("/data/:id", (c) => deletePost(c));

export const Routes = router;
