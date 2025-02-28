// import React from "react";
// import Link from "next/link";
// import { UserModel } from "../types/index";
// export default function Post(params: UserModel) {
//   return (
//     <tr>
//       <td className="w-10 border border-slate-300 text-center">{params.id}</td>
//       <td className="border border-slate-300">{params.username}</td>
//       <td className="border border-slate-300 text-center">{params.name}</td>
//       <td className="border border-slate-300 text-center">{params.address}</td>
//       <td className="border border-slate-300 text-center">{params.phone}</td>
//       <td className="w-52 border border-slate-300">
//         <span
//           onClick={() => params.deleteUser(params.id)}
//           className="bg-red-500 p-2 inline-block text-white text-sm"
//         >
//           Delete
//         </span>
//         <Link
//           href={`/post/edit/${params.id}`}
//           className="bg-yellow-500 p-2 inline-block ml-3 text-white text-sm"
//         >
//           Edit
//         </Link>
//         <Link
//           href={`/post/read/${params.id}`}
//           className="bg-yellow-500 p-2 inline-block ml-3 text-white text-sm"
//         >
//           View
//         </Link>
//       </td>
//     </tr>
//   );
// }

//sesudah pake shdcn

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserModel } from "../types/index";

export default function Post(params: UserModel) {
  return (
    <tr>
      <td className="w-10 border border-slate-300 text-center">{params.id}</td>
      <td className="border border-slate-300 text-center">{params.username}</td>
      <td className="border border-slate-300 text-center">{params.name}</td>
      <td className="border border-slate-300 text-center">{params.address}</td>
      <td className="border border-slate-300 text-center">{params.phone}</td>
      <td className="w-52 border border-slate-300 flex gap-2 p-2">
        <div className="flex justify-center gap-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => params.deleteUser(params.id)}
          >
            Delete
          </Button>
          <Button className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all">
            <Link href={`/post/${params.id}/edit`}>Edit</Link>
          </Button>
          <Button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
            <Link href={`/post/${params.id}`}>View</Link>
          </Button>
        </div>
      </td>
    </tr>
  );
}
