"use client";

import { fetcher } from "@/app/libs";
import { use } from "react";
import useSWR from "swr";

export default function Detail({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const resolvedParams = use(params);
  const {
    data: user,
    isLoading,
    error,
  } = useSWR(
    `/utils/queries/users/${resolvedParams.id}`,
    fetcher
    // {
    // revalidateOnFocus: true,
    // refreshInterval: 100,
    // }
  );

  if (isLoading)
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  if (error)
    return (
      <div>
        <span>Error fetching data</span>
      </div>
    );
  if (!user)
    return (
      <div>
        <span>No user found</span>
      </div>
    );

  if (user) {
    console.log(user);
  }
  console.log("dataUser : ", user);

  return (
    <div className="w-full">
      <h2 className="text-center font-bold text-3xl py-3">
        {user.data.username}
      </h2>
      <div className="w-full max-w-4xl m-auto border-[1px] p-3 border-gray-500 rounded-md">
        <p>{user.data.name}</p>
      </div>
      <div className="w-full max-w-4xl m-auto border-[1px] p-3 border-gray-500 rounded-md">
        <p>{user.data.address}</p>
      </div>
      <div className="w-full max-w-4xl m-auto border-[1px] p-3 border-gray-500 rounded-md">
        <p>{user.data.phone}</p>
      </div>
      <div className="w-full max-w-4xl m-auto border-[1px] p-3 border-gray-500 rounded-md">
        <p>{user.data.username}</p>
      </div>
    </div>
  );
}
