/* eslint-disable @typescript-eslint/no-explicit-any */
import { getApiKey, getAuthToken } from "@/app/utils/authHelpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const token = await getAuthToken();
    const apiKey = await getApiKey(token);

    const res = await fetch("http://localhost:3000/api/posts/data", {
      headers: {
        Authorization: `Bearer ${token}`,
        "api-key-alivia": apiKey,
      },
    });

    const result = await res.json();
    return NextResponse.json({ result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = await getAuthToken();
    const apiKey = await getApiKey(token);
    const body = await request.json();

    const res = await fetch("http://localhost:3000/api/posts/data", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "api-key-alivia": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
