// import { PostAddModel } from "@/app/types";
// import { getApiKey, getAuthToken } from "@/app/utils/helper/authHelpers";

export async function getUserById(id: number) {
  const res = await fetch(`/utils/queries/users/${id}`);
  if (!res.ok) throw new Error("Failed to fetch user data");

  return res.json();
}

// export async function updateUser(id: number, userData: PostAddModel) {
//   const token = await getAuthToken();
//   const apiKey = await getApiKey(token);

//   const res = await fetch(`http://localhost:3000/api/posts/data/${id}`, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "api-key-alivia": apiKey,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userData),
//   });

//   if (!res.ok) throw new Error("Failed to update user");

//   return res.json();
// }

// export async function createUser(userData: PostAddModel) {
//   const token = await getAuthToken();
//   const apiKey = await getApiKey(token);

//   const res = await fetch("http://localhost:3000/api/posts/data", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "api-key-alivia": apiKey,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userData),
//   });

//   if (!res.ok) throw new Error("Failed to create user");

//   return res.json();
// }
