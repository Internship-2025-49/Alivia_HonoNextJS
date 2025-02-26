import type { Context } from "hono";
import prisma from "../../prisma/client/index";

/**
 * Getting all posts
 */
export const getPosts = async (c: Context) => {
  try {
    // Get all posts
    const data = await prisma.post.findMany({ orderBy: { id: "desc" } });

    // Return JSON
    return c.json(data);
  } catch (e: unknown) {
    console.error(`Error getting posts: ${e}`);
    return c.text("Error getting posts", 500);
  }
};

export async function createPost(c: Context) {
  try {
    // Get body request (JSON)
    const body = await c.req.json();

    // Validasi apakah setiap field bertipe string
    const username = typeof body.username === "string" ? body.username : "";
    const name = typeof body.name === "string" ? body.name : "";
    const address = typeof body.address === "string" ? body.address : "";
    const phone = typeof body.phone === "string" ? body.phone : "";

    // Buat data post
    const post = await prisma.post.create({
      data: {
        username,
        name,
        address,
        phone,
      },
    });

    // Return JSON response
    return c.json(
      {
        success: true,
        message: "Post Created Successfully!",
        data: post,
      },
      201
    );
  } catch (e: unknown) {
    console.error(`Error creating post: ${e}`);
    return c.text("Error creating post", 500);
  }
}

export async function getPostById(c: Context) {
  try {
    // Convert id to number
    const postId = parseInt(c.req.param("id"));

    // Get post by id
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    c;

    // If post not found
    if (!post) {
      // Return JSON
      return c.json(
        {
          success: false,
          message: "ID Post Not Found!",
        },
        404
      );
    }

    // Return JSON
    return c.json(
      {
        success: true,
        message: `Detail Data Post By ID : ${postId}`,
        data: post,
      },
      200
    );
  } catch (e: unknown) {
    console.error(`Error finding post: ${e}`);
    return c.text("Error finding post", 500);
  }
}

/**
 * Updating a post
 */
export async function updatePost(c: Context) {
  try {
    // Convert id to number
    const postId = parseInt(c.req.param("id"));

    // Get body request
    const body = await c.req.json();

    // Check if title and content is string
    const username =
      typeof body["username"] === "string" ? body["username"] : "";
    const name = typeof body["name"] === "string" ? body["name"] : "";
    const address = typeof body["address"] === "string" ? body["address"] : "";
    const phone = typeof body["phone"] === "string" ? body["phone"] : "";

    // Update post with prisma
    const post = await prisma.post.update({
      where: { id: postId },
      data: {
        username: username,
        name: name,
        address: address,
        phone: phone,
      },
    });

    // Return JSON
    return c.json(
      {
        success: true,
        message: "Post Updated Successfully!",
        data: post,
      },
      200
    );
  } catch (e: unknown) {
    console.error(`Error updating post: ${e}`);
    return c.json({ message: "Error updating post" }, 500);
  }
}

/**
 * Deleting a post
 */
export async function deletePost(c: Context) {
  try {
    // Convert id to number
    const postId = parseInt(c.req.param("id"));

    // Delete post with prisma
    await prisma.post.delete({
      where: { id: postId },
    });

    // Return JSON
    return c.json(
      {
        success: true,
        message: "Post Deleted Successfully!",
      },
      200
    );
  } catch (e: unknown) {
    console.error(`Error deleting post: ${e}`);
    return c.text("Error deleting post", 500);
  }
}
