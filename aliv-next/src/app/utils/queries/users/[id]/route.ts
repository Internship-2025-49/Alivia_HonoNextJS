/* eslint-disable @typescript-eslint/no-explicit-any */
import { getApiKey, getAuthToken } from "@/app/utils/helper/authHelpers";
import { userForm } from "@/app/utils/type/userSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const token = await getAuthToken();
    const apiKey = await getApiKey(token);

    const res = await fetch(
      `http://localhost:3000/api/posts/data/${params.id}`,
      {
        next: { revalidate: 10 },
        headers: {
          Authorization: `Bearer ${token}`,
          "api-key-alivia": apiKey,
        },
      }
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// export async function PUT(
//   request: NextRequest,
//   { params }: { params: { id: number }; userData: PostAddModel }
// ) {
//   try {
//     const token = await getAuthToken();
//     const apiKey = await getApiKey(token);
//     const body = await request.json();

//     const res = await fetch(
//       `http://localhost:3000/api/posts/data/${params.id}`,
//       {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "api-key-alivia": apiKey,
//         },
//         body: JSON.stringify(body),
//       }
//     );
//     const data = await res.json();
//     return NextResponse.json(data);
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// export const UpdatePost = async ({
//   id,
//   userData,
// }: {
//   id: string;
//   userData: {
//     username: string;
//     name: string;
//     address: string;
//     phone: string;
//   };
// }) => {
//   try {
//     const token = await getAuthToken();
//     const apiKey = await getApiKey(token);

//     const res = await fetch(`http://localhost:3000/api/posts/data/${id}`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "api-key-alivia": apiKey,
//       },
//       body: JSON.stringify(userData),
//     });
//     const data = await res.json();
//     return NextResponse.json(data);
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// };

export const UpdatePost = async ({
  id,
  userData,
}: {
  id: number;
  userData: userForm;
}) => {
  try {
    const token = await getAuthToken();
    const apiKey = await getApiKey(token);

    const res = await fetch(`http://localhost:3000/api/posts/data/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "api-key-alivia": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const PostUser = async ({ userData }: { userData: userForm }) => {
  try {
    const token = await getAuthToken();
    const apiKey = await getApiKey(token);

    const res = await fetch("http://localhost:3000/api/posts/data", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "api-key-alivia": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const ViewPost = async ({ id }: { id: number }) => {
  try {
    const token = await getAuthToken();
    const apiKey = await getApiKey(token);

    const res = await fetch(`http://localhost:3000/api/posts/data/${id}`, {
      next: { revalidate: 10 },
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "api-key-alivia": apiKey,
      },
    });

    const data = await res.json();
    return await data;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const DeletePost = async (id: number) => {
  try {
    const token = await getAuthToken();
    const apiKey = await getApiKey(token);

    const res = await fetch(`http://localhost:3000/api/posts/data/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "api-key-alivia": apiKey,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Gagal menghapus post.");
    }

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: number } }
// ) {
//   try {
//     const token = await getAuthToken();
//     const apiKey = await getApiKey(token);

//     const res = await fetch(
//       `http://localhost:3000/api/posts/data/${params.id}`,
//       {
//         next: { revalidate: 10 },
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "api-key-alivia": apiKey,
//         },
//       }
//     );
//     const data = await res.json();
//     return NextResponse.json(data);
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// export async function POST(
//   request: NextRequest,
//   { params }: { params: { id: number }; userData: PostAddModel }
// ) {
//   try {
//     const token = await getAuthToken();
//     const apiKey = await getApiKey(token);
//     const body = await request.json();

//     const res = await fetch(
//       `http://localhost:3000/api/posts/data/${params.id}`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "api-key-alivia": apiKey,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(body),
//       }
//     );

//     const data = await res.json();
//     return NextResponse.json(data);
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
