import { NextResponse } from "next/server";

export async function GET() {
  // Replace with your backend URL
  const backendUrl = "http://localhost:8080/api/users";
  try {
    const res = await fetch(backendUrl);
    if (!res.ok) {
      throw new Error("Failed to fetch users from backend");
    }
    const users = await res.json();
    return NextResponse.json(users);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
