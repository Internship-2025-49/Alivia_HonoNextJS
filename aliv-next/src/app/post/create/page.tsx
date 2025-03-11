// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function UserCreate() {
//   const router = useRouter();
//   const [username, setUsername] = useState<string>("");
//   const [name, setName] = useState<string>("");
//   const [address, setAddress] = useState<string>("");
//   const [phone, setPhone] = useState<string>("");

//   const addUser = async (e: any) => {
//     e.preventDefault();
//     if (username !== "" && address !== "" && name !== "" && phone !== "") {
//       const formData = {
//         username: username,
//         name: name,
//         address: address,
//         phone: phone,
//       };

//       const add = await fetch("/utils/queries/users", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const content = await add.json();

//       console.log("Form Data:", formData);

//       if (content.success > 0) {
//         router.push("/post");
//       } else {
//         alert(content.message);
//         // throw new Error(
//         //   content.message || `HTTP Error kata siapa  ${add.status}`
//         // );
//       }
//     }
//   };

//   return (
//     <div className="w-full max-w-7xl m-auto">
//       <form className="w-full" onSubmit={addUser}>
//         <span className="font-bold text-yellow-500 py-2 block underline text-2xl">
//           Form Add
//         </span>
//         <div className="w-full py-2">
//           <label htmlFor="" className="text-sm font-bold py-2 block">
//             Username
//           </label>
//           <input
//             type="text"
//             name="username"
//             className="w-full border-[1px] border-gray-200 p-2 rounded-sm text-black"
//             onChange={(e: any) => setUsername(e.target.value)}
//           />
//         </div>
//         <div className="w-full py-2">
//           <label htmlFor="" className="text-sm font-bold py-2 block">
//             Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             className="w-full border-[1px] border-gray-200 p-2 rounded-sm text-black"
//             onChange={(e: any) => setName(e.target.value)}
//           />
//         </div>
//         <div className="w-full py-2">
//           <label htmlFor="" className="text-sm font-bold py-2 block">
//             Address
//           </label>
//           <textarea
//             name="address"
//             className="w-full border-[1px] border-gray-200 p-2 rounded-sm text-black"
//             onChange={(e: any) => setAddress(e.target.value)}
//           />
//         </div>
//         <div className="w-full py-2">
//           <label htmlFor="" className="text-sm font-bold py-2 block">
//             Phone
//           </label>
//           <input
//             type="text"
//             name="phone"
//             className="w-full border-[1px] border-gray-200 p-2 rounded-sm text-black"
//             onChange={(e: any) => setPhone(e.target.value)}
//           />
//         </div>
//         <div className="w-full py-2">
//           <button className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// setelah pake shadecn//

/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import Swal from "sweetalert2";

// export default function UserCreate() {
//   const router = useRouter();
//   const [username, setUsername] = useState<string>("");
//   const [name, setName] = useState<string>("");
//   const [address, setAddress] = useState<string>("");
//   const [phone, setPhone] = useState<string>("");

//   const addUser = async (e: any) => {
//     e.preventDefault();

//     // Cek apakah semua field terisi
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

//     const formData = {
//       username: username,
//       name: name,
//       address: address,
//       phone: phone,
//     };

//     try {
//       const add = await fetch("/utils/queries/users", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       console.log("Raw Response:", add);

//       const content = await add.json();
//       console.log("Response JSON:", content);

//       if (content.success) {
//         Swal.fire({
//           icon: "success",
//           title: "Berhasil!",
//           text: "Data sudah berhasil dibuat!",
//           confirmButtonColor: "#4CAF50",
//           width: "300px",
//         }).then(() => {
//           router.push("/post");
//         });
//       } else {
//         alert(content.message || "Terjadi kesalahan saat menyimpan data.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: "Gagal menyimpan data. Coba lagi nanti.",
//         confirmButtonColor: "#d33",
//       });
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold text-yellow-500 mb-6 text-center">
//         Form Add
//       </h2>
//       <form className="space-y-4" onSubmit={addUser}>
//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-1">
//             Username
//           </label>
//           <input
//             type="text"
//             name="username"
//             className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
//             onChange={(e: any) => setUsername(e.target.value)}
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-1">
//             Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
//             onChange={(e: any) => setName(e.target.value)}
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-1">
//             Address
//           </label>
//           <textarea
//             name="address"
//             className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
//             onChange={(e: any) => setAddress(e.target.value)}
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-1">
//             Phone
//           </label>
//           <input
//             type="text"
//             name="phone"
//             className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
//             onChange={(e: any) => setPhone(e.target.value)}
//           />
//         </div>
//         <div className="flex justify-center">
//           <button className="px-6 py-3 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition">
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// pas udah pake tanstack//

/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import Swal from "sweetalert2";
// import { useMutation } from "@tanstack/react-query";

// export default function UserCreate() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     username: "",
//     name: "",
//     address: "",
//     phone: "",
//   });

// const mutation = useMutation({
//   mutationFn: async (data: any) => {
//     const response = await fetch("/utils/queries/users", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     return response.json();
//   },
//   onSuccess: (content) => {
//     if (content.success) {
//       Swal.fire({
//         icon: "success",
//         title: "Berhasil!",
//         text: "Data sudah berhasil dibuat!",
//         confirmButtonColor: "#4CAF50",
//         width: "300px",
//       }).then(() => {
//         router.push("/post");
//       });
//     } else {
//       alert(content.message || "Terjadi kesalahan saat menyimpan data.");
//     }
//   },
//   onError: () => {
//     Swal.fire({
//       icon: "error",
//       title: "Error!",
//       text: "Gagal menyimpan data. Coba lagi nanti.",
//       confirmButtonColor: "#d33",
//     });
//   },
// });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

// const handleSubmit = (e: React.FormEvent) => {
//   e.preventDefault();
//   if (
//     !formData.username ||
//     !formData.name ||
//     !formData.address ||
//     !formData.phone
//   ) {
//     Swal.fire({
//       icon: "error",
//       title: "Oops...",
//       text: "Semua formulir harus diisi!",
//       confirmButtonColor: "#d33",
//       width: "300px",
//     });
//     return;
//   }
//   mutation.mutate(formData);
// };

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold text-yellow-500 mb-6 text-center">
//         Form Add
//       </h2>
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-1">
//             Username
//           </label>
//           <input
//             type="text"
//             name="username"
//             className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-1">
//             Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-1">
//             Address
//           </label>
//           <textarea
//             name="address"
//             className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-1">
//             Phone
//           </label>
//           <input
//             type="text"
//             name="phone"
//             className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
//             onChange={handleChange}
//           />
//         </div>
//         <div className="flex justify-center">
//           <button className="px-6 py-3 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition">
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

"use client";

import FormUser from "@/app/components/FormUser";
import React from "react";

export default function UserCreate() {
  return (
    <div className="container w-full py-10">
      <div className="flex justify-center">
        {}
        <FormUser titleText="Add User" buttonText="Submit"></FormUser>
      </div>
    </div>
  );
}
