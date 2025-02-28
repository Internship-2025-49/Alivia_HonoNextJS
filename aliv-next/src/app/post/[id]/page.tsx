// "use client";

// import { fetcher } from "@/app/libs";
// import { use } from "react";
// import useSWR from "swr";

// export default function Detail({
//   params,
// }: {
//   params: Promise<{ id: number }>;
// }) {
//   const resolvedParams = use(params);
//   const {
//     data: user,
//     isLoading,
//     error,
//   } = useSWR(`/utils/queries/users/${resolvedParams.id}`, fetcher, {
//     revalidateOnFocus: true,
//     refreshInterval: 100,
//   });

//   if (isLoading)
//     return (
//       <div>
//         <span>Loading...</span>
//       </div>
//     );
//   if (error)
//     return (
//       <div>
//         <span>Error fetching data</span>
//       </div>
//     );
//   if (!user)
//     return (
//       <div>
//         <span>No user found</span>
//       </div>
//     );

//   if (user) {
//     console.log(user);
//   }
//   console.log("dataUser : ", user);

//   return (
//     <div className="w-full flex flex-col items-center">
//       <h2 className="text-center font-bold text-4xl py-4 text-yellow-500">
//         Ini data user
//       </h2>
//       <div className="w-full max-w-4xl space-y-4">
//         {[
//           { label: "Name", value: user.data.name },
//           { label: "Address", value: user.data.address },
//           { label: "Phone", value: user.data.phone },
//           { label: "Username", value: user.data.username },
//         ].map((item, index) => (
//           <div
//             key={index}
//             className="border border-gray-600 bg-white shadow-md p-4 rounded-lg"
//           >
//             <h3 className="text-lg font-semibold text-gray-700">
//               {item.label}
//             </h3>
//             <p className="text-gray-600">{item.value}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

//setelah pake tanstack
"use client";

import { getUserById } from "@/app/utils/queries/users/[id]/query";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";

export default function Detail({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id: userId } = use(params);

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
  });

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

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-center font-bold text-4xl py-4 text-yellow-500">
        Ini data user
      </h2>
      <div className="w-full max-w-4xl space-y-4">
        {[
          { label: "Name", value: user.data.name },
          { label: "Address", value: user.data.address },
          { label: "Phone", value: user.data.phone },
          { label: "Username", value: user.data.username },
        ].map((item, index) => (
          <div
            key={index}
            className="border border-gray-600 bg-white shadow-md p-4 rounded-lg"
          >
            <h3 className="text-lg font-semibold text-gray-700">
              {item.label}
            </h3>
            <p className="text-gray-600">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
