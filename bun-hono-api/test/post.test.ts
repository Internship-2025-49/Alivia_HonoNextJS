import { jest } from "@jest/globals";
import prisma from "../prisma/client/index"; // Pastikan path ini benar
import { Context } from "hono";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../src/controllers/PostController";

describe("getPosts test", () => {
  test("getPosts test", async () => {
    const getPostsTest = {
      json: jest.fn(),
    } as unknown as Context;

    const data = await prisma.post.findMany({ orderBy: { id: "desc" } });

    await getPosts(getPostsTest);

    expect(getPostsTest.json).toHaveBeenCalledWith(data);
  });

  test("getUserById test", async () => {
    const postId = 171;
    const getPostByIdTest = {
      req: {
        param: jest.fn().mockReturnValue(postId.toString()),
      },
      json: jest.fn(),
    } as unknown as Context;

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    await getPostById(getPostByIdTest);

    expect(getPostByIdTest.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: `Detail Data Post By ID : ${postId}`,
        data: expect.any(Object),
      }),
      200
    );
  });
});

describe("createPost test", () => {
  test("createPost insert all", async () => {
    const createTest = {
      req: {
        json: jest.fn(() =>
          Promise.resolve({
            username: "get all",
            name: "nama user test",
            address: "alamat test",
            phone: "0000000000",
          })
        ),
      },
      json: jest.fn(),
    } as unknown as Context;

    const newUserData = {
      username: "get all",
      name: "nama user test",
      address: "alamat test",
      phone: "0000000000",
    };

    await createPost(createTest);

    expect(createTest.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: "Post Created Successfully!",
        data: expect.objectContaining(newUserData), // Cocokkan hanya `data` bagian dalamnya
      }),
      201
    );
  });

  test("createPost without username", async () => {
    const createTest = {
      req: {
        json: jest.fn(() =>
          Promise.resolve({
            name: "without username test",
            address: "alamat test",
            phone: "0000000000",
          })
        ),
      },
      json: jest.fn(),
    } as unknown as Context;

    const newUserData = {
      name: "without username test",
      address: "alamat test",
      phone: "0000000000",
    };

    await createPost(createTest);

    expect(createTest.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: "Post Created Successfully!",
        data: expect.objectContaining(newUserData), // Cocokkan hanya `data` bagian dalamnya
      }),
      201
    );
  });

  test("createPost without name", async () => {
    const createTest = {
      req: {
        json: jest.fn(() =>
          Promise.resolve({
            username: "without name test",
            address: "alamat test",
            phone: "0000000000",
          })
        ),
      },
      json: jest.fn(),
    } as unknown as Context;

    const newUserData = {
      username: "without name test",
      address: "alamat test",
      phone: "0000000000",
    };

    await createPost(createTest);

    expect(createTest.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: "Post Created Successfully!",
        data: expect.objectContaining(newUserData), // Cocokkan hanya `data` bagian dalamnya
      }),
      201
    );
  });

  test("createPost without address", async () => {
    const createTest = {
      req: {
        json: jest.fn(() =>
          Promise.resolve({
            username: "without address test",
            name: "nama user test",
            phone: "0000000000",
          })
        ),
      },
      json: jest.fn(),
    } as unknown as Context;

    const newUserData = {
      username: "without address test",
      name: "nama user test",
      phone: "0000000000",
    };

    await createPost(createTest);
    expect(createTest.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: "Post Created Successfully!",
        data: expect.objectContaining(newUserData), // Cocokkan hanya `data` bagian dalamnya
      }),
      201
    );
  });

  test("createPost without phone", async () => {
    const createTest = {
      req: {
        json: jest.fn(() =>
          Promise.resolve({
            username: "without phone test",
            name: "nama user test",
            address: "alamat test",
          })
        ),
      },
      json: jest.fn(),
    } as unknown as Context;

    const newUserData = {
      username: "without phone test",
      name: "nama user test",
      address: "alamat test",
    };

    await createPost(createTest);
    expect(createTest.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: "Post Created Successfully!",
        data: expect.objectContaining(newUserData), // Cocokkan hanya `data` bagian dalamnya
      }),
      201
    );
  });
});

describe("updatePost describe", () => {
  test("updatePost update all", async () => {
    const firstData = await prisma.post.findMany({
      orderBy: { id: "asc" },
      take: 5, // Ambil lima data pertama
    });

    if (firstData.length < 2) {
      throw new Error("Tidak cukup data post untuk diupdate.");
    }

    const updateTest = {
      req: {
        param: jest.fn(() => firstData[0].id.toString()), // Gunakan ID urutan kedua
        json: jest.fn(() =>
          Promise.resolve({
            username: "update ALL",
            name: "update name",
            address: "update address",
            phone: "1234567890",
          })
        ),
      },
      json: jest.fn(),
      // text: jest.fn(),
    } as unknown as Context;

    const updatedUserData = {
      username: "update ALL",
      name: "update name",
      address: "update address",
      phone: "1234567890",
    };

    await updatePost(updateTest);

    expect(updateTest.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: "Post Updated Successfully!",
        data: expect.objectContaining(updatedUserData),
      }),
      200
    );
  });

  test("updatePost update username only", async () => {
    const secondData = await prisma.post.findMany({
      orderBy: { id: "asc" },
      take: 5, // Ambil lima data pertama
    });

    if (secondData.length < 2) {
      throw new Error("Tidak cukup data post untuk diupdate.");
    }

    const updateTest = {
      req: {
        param: jest.fn(() => secondData[1].id.toString()), // Gunakan ID urutan kedua
        json: jest.fn(() =>
          Promise.resolve({
            username: "update only username",
          })
        ),
      },
      json: jest.fn(),
    } as unknown as Context;

    const updatedUserData = {
      username: "update only username",
    };

    await updatePost(updateTest);

    expect(updateTest.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: "Post Updated Successfully!",
        data: expect.objectContaining(updatedUserData), // Cocokkan hanya `data` bagian dalamnya
      }),
      200
    );
  });

  test("updatePost update name only", async () => {
    const thirdData = await prisma.post.findMany({
      orderBy: { id: "asc" },
      take: 5, // Ambil lima data pertama
    });

    if (thirdData.length < 2) {
      throw new Error("Tidak cukup data post untuk diupdate.");
    }
    const updateTest = {
      req: {
        param: jest.fn(() => thirdData[2].id.toString()), // Gunakan ID urutan kedua
        json: jest.fn(() =>
          Promise.resolve({
            name: "update name only",
          })
        ),
      },
      json: jest.fn(),
    } as unknown as Context;

    const updatedUserData = {
      name: "update name only",
    };

    await updatePost(updateTest);

    expect(updateTest.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: "Post Updated Successfully!",
        data: expect.objectContaining(updatedUserData), // Cocokkan hanya `data` bagian dalamnya
      }),
      200
    );
  });

  test("updatePost update address only", async () => {
    const fourthdData = await prisma.post.findMany({
      orderBy: { id: "asc" },
      take: 5, // Ambil lima data pertama
    });

    if (fourthdData.length < 2) {
      throw new Error("Tidak cukup data post untuk diupdate.");
    }

    // const lastData = await prisma.post.findFirst({
    //   orderBy: { id: "desc" },
    // });

    // if (!lastData) {
    //   throw new Error("Tidak ada data post untuk diupdate.");
    // }

    const updateTest = {
      req: {
        param: jest.fn(() => fourthdData[3].id.toString()), // Gunakan ID urutan kedua
        json: jest.fn(() =>
          Promise.resolve({
            address: "update address only",
          })
        ),
      },
      json: jest.fn(),
    } as unknown as Context;

    const updatedUserData = {
      address: "update address only",
    };

    await updatePost(updateTest);

    expect(updateTest.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: "Post Updated Successfully!",
        data: expect.objectContaining(updatedUserData), // Cocokkan hanya `data` bagian dalamnya
      }),
      200
    );
  });

  test("updatePost update phone only", async () => {
    const fivedData = await prisma.post.findMany({
      orderBy: { id: "asc" },
      take: 5, // Ambil lima data pertama
    });

    if (fivedData.length < 2) {
      throw new Error("Tidak cukup data post untuk diupdate.");
    }

    const updateTest = {
      req: {
        param: jest.fn(() => fivedData[4].id.toString()), // Gunakan ID urutan kedua
        json: jest.fn(() =>
          Promise.resolve({
            phone: "1234567890 update phone only",
          })
        ),
      },
      json: jest.fn(),
    } as unknown as Context;

    const updatedUserData = {
      phone: "1234567890 update phone only",
    };

    await updatePost(updateTest);

    expect(updateTest.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: "Post Updated Successfully!",
        data: expect.objectContaining(updatedUserData), // Cocokkan hanya `data` bagian dalamnya
      }),
      200
    );
  });
});

describe("deletePost test", () => {
  test("deletePost multiple ids exist", async () => {
    // Ambil 5 ID terakhir dari database
    const lastFivePosts = await prisma.post.findMany({
      orderBy: { id: "desc" },
      take: 5,
      select: { id: true },
    });

    if (lastFivePosts.length < 5) {
      throw new Error("Tidak cukup data post untuk dihapus.");
    }

    // Loop setiap ID untuk dihapus
    for (const post of lastFivePosts) {
      const deleteTest = {
        req: {
          param: jest.fn().mockReturnValue(post.id.toString()),
        },
        json: jest.fn(),
      } as unknown as Context;

      await deletePost(deleteTest);

      expect(deleteTest.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Post Deleted Successfully!",
          success: true,
        }),
        200
      );
    }
  });
});
