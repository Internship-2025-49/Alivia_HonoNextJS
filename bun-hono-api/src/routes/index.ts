import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";
import { jwt } from "hono/jwt";
import type { JwtVariables } from "hono/jwt";
import prisma from "../../prisma/client/index.js";
import { apiKeyAuth } from "../middleware/auth.js";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../contollers/PostController.js";

type Variables = JwtVariables;

const router = new Hono<{ Variables: Variables }>();

// router.use(
//   "/*",
//   jwt({
//     secret: "48f84dfac82c919e3c12935abeb85e294c69cb5af75fe9ae9399c1ba65795b56",
//   })
// );

// router.use(
//   "/auth/*",
//   basicAuth({
//     username: "hono",
//     password: "honojelek",
//   })
// );

// router.get("/key", async (c) => {
//   const auth = await prisma.auth.findFirst();

//   if (auth) {
//     return c.json({
//       statusCode: 200,
//       message: "Authorized",
//       key: auth.key,
//     });
//   }
// });

// router.use("*", apiKeyAuth);

router.get("/auth/page", (c) => {
  return c.text("You are authorized");
});
//routes posts index
router.get("/data", (c) => getPosts(c));

//routes posts create
router.post("/data", (c) => createPost(c));

//routes posts detail
router.get("/data/:id", (c) => getPostById(c));

//route post update
router.put("/data/:id", (c) => updatePost(c));

//route post delete
router.delete("/data/:id", (c) => deletePost(c));

export const Routes = router;
