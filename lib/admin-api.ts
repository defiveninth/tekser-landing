const API_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.EXPO_PUBLIC_API_URL ||
  "";

const ADMIN_API_KEY = process.env.ADMIN_API_KEY || "";

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  plan: "free" | "pro" | "pro_plus" | "enterprise";
  credits: number;
  checks: number;
  reports: number;
  joined: string;
};

function assertConfigured() {
  if (!API_URL) throw new Error("API_URL is not configured");
  if (!ADMIN_API_KEY) throw new Error("ADMIN_API_KEY is not configured");
}

async function adminFetch(path: string, init?: RequestInit) {
  assertConfigured();
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "X-Admin-Key": ADMIN_API_KEY,
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.detail || data.message || `Request failed (${res.status})`);
  }
  return data;
}

export async function fetchAdminUsers(search = ""): Promise<AdminUser[]> {
  const q = search.trim() ? `?search=${encodeURIComponent(search.trim())}` : "";
  const data = await adminFetch(`/admin/users${q}`);
  return data.users ?? [];
}

export async function updateAdminUserPlan(userId: string, plan: AdminUser["plan"]) {
  return adminFetch(`/admin/users/${userId}/plan`, {
    method: "PATCH",
    body: JSON.stringify({ plan }),
  });
}
