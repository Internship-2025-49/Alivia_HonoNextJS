export async function getUserById(id: number) {
  const res = await fetch(`/utils/queries/users/${id}`);
  if (!res.ok) throw new Error("Failed to fetch user data");

  return res.json();
}
