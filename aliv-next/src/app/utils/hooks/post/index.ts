import { useMutation, useQuery } from "@tanstack/react-query";
import * as mutations from "../../queries/users/[id]/route";
import { GET } from "../../queries/users/route";
import { userForm } from "../../type/userSchema";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export const useAllPost = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      try {
        return await GET();
      } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
      }
    },
    onSuccess: () => {
      router.push("/post");
    },
    onError: (error) => {
      console.error("Failed to fetch posts:", error);
    },
  });
};

export const useUpdatePost = () => {
  // const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      idUser,
      body,
    }: {
      idUser: number;
      body: userForm;
    }) => {
      try {
        const result = await mutations.UpdatePost({
          id: idUser,
          userData: body,
        });
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (res, { body }) => {
      if (res?.success) {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: body.name ? "Data berhasil diupdate!" : "Data berhasil dibuat!",
          confirmButtonColor: "#4CAF50",
          width: "300px",
        }).then(() => {
          router.push("/post");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Data gagal diperbarui, silakan coba lagi.",
          confirmButtonColor: "#d33",
        });
      }
    },

    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Gagal menyimpan data. Coba lagi nanti.",
        confirmButtonColor: "#d33",
      });
    },
  });
};

export const usePost = () => {
  // const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ body }: { body: userForm }) => {
      try {
        const result = mutations.PostUser({
          userData: body,
        });
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (res) => {
      if (res?.success) {
        const isCreated = res?.message?.includes("Created");

        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: isCreated ? "Data berhasil dibuat!" : "Data berhasil diupdate!",
          confirmButtonColor: "#4CAF50",
          width: "300px",
        }).then(() => {
          router.push("/post");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Data gagal diperbarui, silakan coba lagi.",
          confirmButtonColor: "#d33",
        });
      }
    },

    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Gagal menyimpan data. Coba lagi nanti.",
        confirmButtonColor: "#d33",
      });
    },
  });
};

export const useViewpost = (idUser: number) => {
  // const router = useRouter();

  return useQuery({
    queryKey: ["getById", idUser],
    queryFn: async () => {
      try {
        const result = mutations.ViewPost({
          id: idUser,
        });
        return result;
      } catch (error) {
        console.log(error);
      }
    },
  });
};

export const useDeletepost = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      try {
        const result = await mutations.DeletePost(id);
        return result;
      } catch (error) {
        console.error("Failed to delete post:", error);
        throw error;
      }
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Post berhasil dihapus!",
        timer: 2000,
        showConfirmButton: false,
      });
      router.push("/post");
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: `Gagal menghapus post: ${error?.message || "Terjadi kesalahan"}`,
      });
    },
  });
};
