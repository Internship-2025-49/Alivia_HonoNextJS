"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { fetcher } from "@/app/libs";
import useSWR from "swr";
import Swal from "sweetalert2";

export default function PostEdit({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const {
    data: user,
    isLoading,
    error,
  } = useSWR(`/utils/queries/users/${resolvedParams.id}`, fetcher);

  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  useEffect(() => {
    if (user?.result) {
      setUsername(user.result.username);
      setName(user.result.name);
      setAddress(user.result.address);
      setPhone(user.result.phone);
    }
  }, [user, isLoading]);

  const updateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    // Memeriksa apakah semua field telah terisi
    if (username === "" || name === "" || address === "" || phone === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Semua formulir harus diisi!",
        confirmButtonColor: "#d33",
        width: "300px",
      });
      return;
    }

    const formData = { username, name, address, phone };

    try {
      const res = await fetch(`/utils/queries/users/${resolvedParams.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const content = await res.json();
      if (content.data) {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Data berhasil diperbaharui!",
          confirmButtonColor: "#4CAF50",
          width: "300px",
        }).then(() => {
          router.push("/post");
        });
      } else {
        alert("Terjadi kesalahan saat memperbarui data");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Terjadi kesalahan saat memperbarui data");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user data.</div>;
  if (!user) return <div>Error page.</div>;

  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-3xl font-bold text-yellow-500 text-center mb-6">
        Edit User ✏️
      </h2>
      <form className="space-y-4" onSubmit={updateUser}>
        <div>
          <label className="text-sm font-semibold block text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-semibold block text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-semibold block text-gray-700 mb-1">
            Address
          </label>
          <textarea
            name="address"
            className="w-full border border-gray-300 p-3 rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-semibold block text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button className="w-full py-3 text-white font-semibold rounded-lg bg-yellow-500 hover:bg-yellow-600 transition duration-300">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
