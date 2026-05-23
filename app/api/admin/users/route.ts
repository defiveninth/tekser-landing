import { NextRequest, NextResponse } from "next/server";
import { fetchAdminUsers } from "@/lib/admin-api";

export async function GET(request: NextRequest) {
  try {
    const search = request.nextUrl.searchParams.get("search") || "";
    const users = await fetchAdminUsers(search);
    return NextResponse.json({ users });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load users";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
