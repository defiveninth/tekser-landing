import { createClient } from "@supabase/supabase-js";
import { randomBytes } from "crypto";

export type Plan = "free" | "pro" | "pro_plus" | "enterprise";

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  plan: Plan;
  credits: number;
  checks: number;
  reports: number;
  joined: string;
};

const VALID_PLANS: Plan[] = ["free", "pro", "pro_plus", "enterprise"];

function getSupabaseAdmin() {
  const url =
    process.env.SUPABASE_URL ||
    process.env.EXPO_PUBLIC_SUPABASE_URL ||
    "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (!url || !key) {
    throw new Error(
      "Supabase admin is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel env."
    );
  }

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function fetchAdminUsers(search = ""): Promise<AdminUser[]> {
  const supabase = getSupabaseAdmin();
  const searchLower = search.toLowerCase().trim();

  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("*");

  if (profilesError) {
    throw new Error(profilesError.message);
  }

  const profilesById = new Map((profiles ?? []).map((p) => [p.id, p]));

  const { data: authData, error: authError } = await supabase.auth.admin.listUsers({
    perPage: 1000,
  });

  if (authError) {
    throw new Error(authError.message);
  }

  const results: AdminUser[] = [];

  for (const user of authData.users) {
    const profile = profilesById.get(user.id);
    const email = (user.email || profile?.phone || "").trim();
    const metadata = user.user_metadata ?? {};
    const name =
      profile?.full_name ||
      (typeof metadata.full_name === "string" ? metadata.full_name : null) ||
      "User";

    if (searchLower) {
      const haystack = `${email} ${name}`.toLowerCase();
      if (!haystack.includes(searchLower)) continue;
    }

    const createdAt = profile?.created_at || user.created_at;
    const joined = createdAt ? String(createdAt).slice(0, 10) : "";

    const plan = (profile?.plan || "free") as Plan;

    results.push({
      id: user.id,
      email,
      name,
      plan: VALID_PLANS.includes(plan) ? plan : "free",
      credits: profile?.credits ?? 0,
      checks: profile?.numbers_checked ?? 0,
      reports: profile?.reports_sent ?? 0,
      joined,
    });
  }

  results.sort((a, b) => (b.joined || "").localeCompare(a.joined || ""));
  return results;
}

export async function updateAdminUserPlan(userId: string, plan: Plan) {
  if (!VALID_PLANS.includes(plan)) {
    throw new Error("Invalid plan type");
  }

  const supabase = getSupabaseAdmin();
  const now = new Date().toISOString();
  const updates: Record<string, string | number> = { plan };

  if (plan === "pro" || plan === "pro_plus") {
    const { data: profile } = await supabase
      .from("profiles")
      .select("credits")
      .eq("id", userId)
      .maybeSingle();

    const currentCredits = profile?.credits ?? 0;
    updates.credits = currentCredits + (plan === "pro" ? 5 : 10);
    updates.last_daily_bonus = now;
  } else if (plan === "enterprise") {
    updates.credits = 999999;
    updates.api_key = `tk_${randomBytes(24).toString("base64url")}`;
  }

  const { error } = await supabase.from("profiles").update(updates).eq("id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return { plan, updates };
}
