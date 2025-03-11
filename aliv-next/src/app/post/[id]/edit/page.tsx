// "use client";

// import React, { useState, useEffect, use } from "react";
// import { useRouter } from "next/navigation";
// import { fetcher } from "@/app/libs";
// import useSWR from "swr";
// import Swal from "sweetalert2";

// export default function PostEdit({
//   params,
// }: {
//   params: Promise<{ id: number }>;
// }) {
//   const router = useRouter();
//   const resolvedParams = use(params);
//   const {
//     data: user,
//     isLoading,
//     error,
//   } = useSWR(`/utils/queries/users/${resolvedParams.id}`, fetcher);

//   const [username, setUsername] = useState<string>("");
//   const [name, setName] = useState<string>("");
//   const [address, setAddress] = useState<string>("");
//   const [phone, setPhone] = useState<string>("");

//   useEffect(() => {
//     if (user?.result) {
//       setUsername(user.result.username);
//       setName(user.result.name);
//       setAddress(user.result.address);
//       setPhone(user.result.phone);
//     }
//   }, [user, isLoading]);

//   const updateUser = async (e: React.FormEvent) => {
//     e.preventDefault();
//     // Memeriksa apakah semua field telah terisi
//     if (username === "" || name === "" || address === "" || phone === "") {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Semua formulir harus diisi!",
//         confirmButtonColor: "#d33",
//         width: "300px",
//       });
//       return;
//     }

//     const formData = { username, name, address, phone };

//     try {
//       const res = await fetch(`/utils/queries/users/${resolvedParams.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const content = await res.json();
//       if (content) {
//         Swal.fire({
//           icon: "success",
//           title: "Berhasil!",
//           text: "Data berhasil diperbaharui!",
//           confirmButtonColor: "#4CAF50",
//           width: "300px",
//         }).then(() => {
//           router.push("/post");
//         });
//       } else {
//         alert("Terjadi kesalahan saat memperbarui data");
//       }
//     } catch (error) {
//       console.error("Error updating user:", error);
//       alert("Terjadi kesalahan saat memperbarui data");
//     }
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error loading user data.</div>;
//   if (!user) return <div>Error page.</div>;

//   return (
//     <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
//       <h2 className="text-3xl font-bold text-yellow-500 text-center mb-6">
//         Edit User ✏️
//       </h2>
//       <form className="space-y-4" onSubmit={updateUser}>
//         <div>
//           <label className="text-sm font-semibold block text-gray-700 mb-1">
//             Username
//           </label>
//           <input
//             type="text"
//             name="username"
//             className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <div>
//           <label className="text-sm font-semibold block text-gray-700 mb-1">
//             Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div>
//           <label className="text-sm font-semibold block text-gray-700 mb-1">
//             Address
//           </label>
//           <textarea
//             name="address"
//             className="w-full border border-gray-300 p-3 rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//           />
//         </div>
//         <div>
//           <label className="text-sm font-semibold block text-gray-700 mb-1">
//             Phone
//           </label>
//           <input
//             type="text"
//             name="phone"
//             className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//           />
//         </div>
//         <div className="text-center">
//           <button className="w-full py-3 text-white font-semibold rounded-lg bg-yellow-500 hover:bg-yellow-600 transition duration-300">
//             Update
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// ini pake tanstack

// "use client";

// import React, { useState, useEffect, use } from "react";
// import { useRouter } from "next/navigation";
// import Swal from "sweetalert2";
// import { useQuery, useMutation } from "@tanstack/react-query";

// export default function PostEdit({
//   params,
// }: {
//   params: Promise<{ id: number }>;
// }) {
//   const router = useRouter();
//   const resolvedParams = use(params);

//   // ✅ Fetch detail user pakai TanStack Query
//   const {
//     data: user,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["user", resolvedParams.id],
//     queryFn: async () => {
//       const res = await fetch(`/utils/queries/users/${resolvedParams.id}`);
//       return res.json();
//     },
//   });

//   const [username, setUsername] = useState("");
//   const [name, setName] = useState("");
//   const [address, setAddress] = useState("");
//   const [phone, setPhone] = useState("");

//   useEffect(() => {
//     if (user?.result) {
//       setUsername(user.result.username);
//       setName(user.result.name);
//       setAddress(user.result.address);
//       setPhone(user.result.phone);
//     }
//   }, [user]);

//   // ✅ Update user pakai TanStack Mutation
//   const mutation = useMutation({
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     mutationFn: async (formData: any) => {
//       const res = await fetch(`/utils/queries/users/${resolvedParams.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       return res.json();
//     },
//     onSuccess: () => {
//       Swal.fire({
//         icon: "success",
//         title: "Berhasil!",
//         text: "Data berhasil diperbaharui!",
//         confirmButtonColor: "#4CAF50",
//         width: "300px",
//       }).then(() => {
//         router.push("/post");
//       });
//     },
//     onError: () => {
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: "Gagal memperbarui data. Coba lagi nanti.",
//         confirmButtonColor: "#d33",
//       });
//     },
//   });

//   const updateUser = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!username || !name || !address || !phone) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Semua formulir harus diisi!",
//         confirmButtonColor: "#d33",
//         width: "300px",
//       });
//       return;
//     }

//     const formData = { username, name, address, phone };
//     mutation.mutate(formData);
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error loading user data.</div>;
//   if (!user) return <div>Data tidak ditemukan.</div>;

//   return (
//     <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
//       <h2 className="text-3xl font-bold text-yellow-500 text-center mb-6">
//         Edit User ✏️
//       </h2>
//       <form className="space-y-4" onSubmit={updateUser}>
//         <div>
//           <label className="text-sm font-semibold block text-gray-700 mb-1">
//             Username
//           </label>
//           <input
//             type="text"
//             name="username"
//             className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <div>
//           <label className="text-sm font-semibold block text-gray-700 mb-1">
//             Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div>
//           <label className="text-sm font-semibold block text-gray-700 mb-1">
//             Address
//           </label>
//           <textarea
//             name="address"
//             className="w-full border border-gray-300 p-3 rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//           />
//         </div>
//         <div>
//           <label className="text-sm font-semibold block text-gray-700 mb-1">
//             Phone
//           </label>
//           <input
//             type="text"
//             name="phone"
//             className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//           />
//         </div>
//         <div className="text-center">
//           <button
//             type="submit"
//             disabled={mutation.isPending}
//             className="w-full py-3 text-white font-semibold rounded-lg bg-yellow-500 hover:bg-yellow-600 transition duration-300"
//           >
//             {mutation.isPending ? "Updating..." : "Update"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

//tanstack versi baru

// "use client";

// import React, { useState, useEffect, use } from "react";
// import { useRouter } from "next/navigation";
// import Swal from "sweetalert2";

// import { useQuery, useMutation } from "@tanstack/react-query";

// export default function PostEdit({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const { id } = use(params);
//   const router = useRouter();

//   // ✅ Ambil detail user
//   const {
//     data: user,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["user", id],
//     queryFn: async () => {
//       const { id } = await params;
//       const res = await fetch(`/utils/queries/users/${id}`);
//       if (!res.ok) throw new Error("Failed to fetch user");
//       return res.json();
//     },
//   });

//   const [username, setUsername] = useState("");
//   const [name, setName] = useState("");
//   const [address, setAddress] = useState("");
//   const [phone, setPhone] = useState("");

//   useEffect(() => {
//     if (user?.data) {
//       console.log("Fetched user data:", user.data);
//       setUsername(user.data.username);
//       setName(user.data.name);
//       setAddress(user.data.address);
//       setPhone(user.data.phone);
//     }
//   }, [user]);

//   // ✅ Mutasi update user
//   const updateMutation = useMutation({
//     mutationFn: async (formData: {
//       username: string;
//       name: string;
//       address: string;
//       phone: string;
//     }) => {
//       const res = await fetch(`/utils/queries/users/${(await params).id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       if (!res.ok) throw new Error("Failed to update user");
//       return res.json();
//     },
//     onSuccess: () => {
//       Swal.fire({
//         icon: "success",
//         title: "Berhasil!",
//         text: "Data berhasil diperbaharui!",
//         confirmButtonColor: "#4CAF50",
//         width: "300px",
//       }).then(() => router.push("/post"));
//     },
//     onError: () => {
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: "Gagal memperbarui data. Coba lagi nanti.",
//         confirmButtonColor: "#d33",
//       });
//     },
//   });

//   const handleUpdate = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!username || !name || !address || !phone) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Semua formulir harus diisi!",
//         confirmButtonColor: "#d33",
//         width: "300px",
//       });
//       return;
//     }
//     updateMutation.mutate({ username, name, address, phone });
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error loading user data.</div>;
//   if (!user?.data) return <div>Data user tidak ditemukan.</div>;

//   return (
//     <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
//       <h2 className="text-3xl font-bold text-yellow-500 text-center mb-6">
//         Edit User ✏️
//       </h2>
//       <form className="space-y-4" onSubmit={handleUpdate}>
//         <InputField label="Username" value={username} onChange={setUsername} />
//         <InputField label="Name" value={name} onChange={setName} />
//         <TextareaField label="Address" value={address} onChange={setAddress} />
//         <InputField label="Phone" value={phone} onChange={setPhone} />
//         <div className="text-center">
//           <button
//             type="submit"
//             className="w-full py-3 text-white font-semibold rounded-lg bg-yellow-500 hover:bg-yellow-600 transition duration-300"
//           >
//             {updateMutation.isPending ? "Updating..." : "Update"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// // 🔹 Komponen Input biar reusable
// function InputField({
//   label,
//   value,
//   onChange,
// }: {
//   label: string;
//   value: string;
//   onChange: (val: string) => void;
// }) {
//   return (
//     <div>
//       <label className="text-sm font-semibold block text-gray-700 mb-1">
//         {label}
//       </label>
//       <input
//         type="text"
//         className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//       />
//     </div>
//   );
// }

// // 🔹 Komponen Textarea biar reusable juga
// function TextareaField({
//   label,
//   value,
//   onChange,
// }: {
//   label: string;
//   value: string;
//   onChange: (val: string) => void;
// }) {
//   return (
//     <div>
//       <label className="text-sm font-semibold block text-gray-700 mb-1">
//         {label}
//       </label>
//       <textarea
//         className="w-full border border-gray-300 p-3 rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//       />
//     </div>
//   );
// }

// "use client";

// import FormUser from "@/app/components/FormUser";
// import { useQuery } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { use } from "react";

// export default function PostEdit({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = use(params);
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const router = useRouter();

//   const { data: user, isLoading, error } = useQuery({
//     queryKey: ["user", id],
//     queryFn: async () => {
//       const res = await fetch(`/utils/queries/users/${id}`);
//       if (!res.ok) throw new Error("Failed to fetch user");
//       return res.json();
//     },
//   });

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error loading user data.</div>;
//   if (!user?.data) return <div>Data user tidak ditemukan.</div>;

//   return (
//     <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
//       <h2 className="text-3xl font-bold text-yellow-500 text-center mb-6">
//         Edit User ✏️
//       </h2>
//       <FormUser user={user.data} />
//     </div>
//   );
// }

// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// import { useQuery } from "@tanstack/react-query";
// import UserForm from "@/app/components/FormUser";

// export default function PostEdit({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const router = useRouter();
//   const [resolvedParams, setResolvedParams] = React.useState<{ id: string }>();

//   // Resolve params async
//   React.useEffect(() => {
//     params.then(setResolvedParams);
//   }, [params]);

//   const id = resolvedParams?.id;

//   const {
//     data: user,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["user", id],
//     enabled: !!id, // BIAR KUERI JALAN PAS ID ADA
//     queryFn: async () => {
//       const res = await fetch(`/utils/queries/users/${id}`);
//       if (!res.ok) throw new Error("Failed to fetch user");
//       return res.json();
//     },
//   });

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error loading user data.</div>;
//   if (!user?.data) return <div>Data user tidak ditemukan.</div>;

//   return (
//     <UserForm user={user.data} titleText="Edit User ✏️" buttonText="Update" />
//   );
// }

// "use client";

// import React, { use } from "react";
// import { useViewpost } from "@/app/utils/hooks/post";
// import UserForm from "@/app/components/FormUser";

// export default function PostEdit({
//   params,
// }: {
//   params: Promise<{ id: number }>;
// }) {
//   const { id: userId } = use(params);

//   const getUserById = useViewpost(userId);

//   const user = getUserById.data;

//   if (!user) return <div>User not found.</div>;

//   return (
//     <div className="container w-full py-10">
//       <div className="flex justify-center">
//         <UserForm
//           user={user.data}
//           titleText="Edit User ✏️"
//           buttonText="Update"
//         />
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { useViewpost } from "@/app/utils/hooks/post";
import UserForm from "@/app/components/FormUser";

export default function PostEdit({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      console.log("Params resolved:", resolvedParams); // 🔍 Cek isi params
      setUserId(resolvedParams.id);
    });
  }, [params]);

  const getUserById = useViewpost(userId ?? 0); // Pastikan id ada sebelum fetch

  const user = getUserById.data;

  if (!userId) return <div>Loading...</div>;
  if (!user) return <div>User not found.</div>;

  return (
    <div className="container w-full py-10">
      <div className="flex justify-center">
        <UserForm
          user={user.data}
          titleText="Edit User ✏️"
          buttonText="Update"
        />
      </div>
    </div>
  );
}
