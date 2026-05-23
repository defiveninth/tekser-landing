import { NextRequest, NextResponse } from "next/server";
import { updateAdminUserPlan, type AdminUser } from "@/lib/admin-api";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const plan = body.plan as AdminUser["plan"];

    if (!plan) {
      return NextResponse.json({ error: "Plan is required" }, { status: 400 });
    }

    const result = await updateAdminUserPlan(id, plan);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update plan";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
