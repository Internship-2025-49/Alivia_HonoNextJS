"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { userForm, userSchema } from "../utils/type/userSchema";
import { userDefaultValues } from "../utils/type/defaultValues";
import { FormProps } from "../types";

import Swal from "sweetalert2";
// import { createUser, updateUser } from "../utils/queries/users/[id]/query";

export default function UserForm({ user, titleText, buttonText }: FormProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const queryClient = new QueryClient();

  const router = useRouter();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: user || userDefaultValues,
  });

  const mutation = useMutation({
    mutationFn: async (data: userForm) => {
      if (user) {
        // Kalau update
        const res = await fetch(`/utils/queries/users/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Failed to update user");
        return res.json();
      } else {
        // Kalau create
        const res = await fetch("/utils/queries/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Failed to create user");
        return res.json();
      }
    },
    onSuccess: (content) => {
      if (content.success) {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: user ? "Data berhasil diupdate!" : "Data berhasil dibuat!",
          confirmButtonColor: "#4CAF50",
          width: "300px",
        }).then(() => {
          router.push("/post");
        });
      } else {
        alert(content.message || "Terjadi kesalahan saat menyimpan data.");
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

  function submit(values: z.infer<typeof userSchema>) {
    mutation.mutate(values);
  }

  return (
    <div className="w-3/4 mx-auto bg-white p-8 rounded-lg shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="w-full space-y-4">
          <div className="text-center">
            <span className="font-bold py-2 block text-4xl text-yellow-500">
              {titleText}
            </span>
          </div>

          <div>
            <FormField
              control={form.control}
              name="username"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-semibold text-gray-700 mb-1">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter username"
                      className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="name"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-semibold text-gray-700 mb-1">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter name"
                      className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="address"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-semibold text-gray-700 mb-1">
                    Address
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter address"
                      className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="phone"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-semibold text-gray-700 mb-1">
                    Phone
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter phone number"
                      className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              className="px-6 py-3 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600 transition"
            >
              {buttonText}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
