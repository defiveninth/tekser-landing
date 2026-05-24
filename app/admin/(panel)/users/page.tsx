"use client";

import { useCallback, useEffect, useState } from "react";

type Plan = "free" | "pro" | "pro_plus" | "enterprise";

type User = {
  id: string;
  email: string;
  name: string;
  plan: Plan;
  credits: number;
  checks: number;
  reports: number;
  joined: string;
};

const PLANS: { value: Plan; label: string }[] = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "pro_plus", label: "Pro+" },
  { value: "enterprise", label: "Enterprise" },
];

const PLAN_BADGE: Record<Plan, string> = {
  free: "bg-[#21262d] text-[#8b949e] border-[#30363d]",
  pro: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  pro_plus: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  enterprise: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const loadUsers = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/users?search=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load users");
      setUsers(data.users || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => loadUsers(search), 300);
    return () => clearTimeout(timer);
  }, [search, loadUsers]);

  const handlePlanChange = async (user: User, newPlan: Plan) => {
    if (newPlan === user.plan) return;

    setSavingId(user.id);
    setError(null);

    try {
      const res = await fetch(`/api/admin/users/${user.id}/plan`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: newPlan }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update plan");

      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id
            ? {
                ...u,
                plan: newPlan,
                credits:
                  newPlan === "enterprise"
                    ? 999999
                    : newPlan === "pro"
                      ? u.credits + 5
                      : newPlan === "pro_plus"
                        ? u.credits + 10
                        : u.credits,
              }
            : u
        )
      );
      setToast(`${user.email} → ${newPlan.toUpperCase()}`);
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update plan");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="p-8 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-white">Users</h1>
          <p className="text-[13px] text-[#8b949e] mt-0.5">
            Switch tariff after WhatsApp payment confirmation
          </p>
        </div>
        <button
          onClick={() => loadUsers(search)}
          disabled={loading}
          className="px-4 py-2 text-[13px] text-[#8b949e] hover:text-white border border-[#30363d] rounded-md transition-colors disabled:opacity-50"
        >
          Refresh
        </button>
      </div>

      <div className="mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by email or name..."
          className="w-full max-w-md bg-[#161b22] border border-[#30363d] text-[13px] text-white placeholder-[#656d76] px-3 py-2 rounded-md outline-none focus:border-orange-500 transition-colors"
        />
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-[13px]">
          {error}
        </div>
      )}

      {toast && (
        <div className="mb-4 px-4 py-3 rounded-md bg-green-500/10 border border-green-500/20 text-green-400 text-[13px]">
          Plan updated: {toast}
        </div>
      )}

      <div className="rounded-lg border border-[#21262d] overflow-hidden">
        <table className="w-full text-[13px]">
          <thead className="bg-[#161b22] border-b border-[#21262d]">
            <tr>
              {["Email", "Name", "Tariff", "Credits", "Checks", "Reports", "Joined"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-[#8b949e] font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#21262d]">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-[#656d76]">
                  Loading users...
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="bg-[#0d1117] hover:bg-[#161b22] transition-colors">
                  <td className="px-4 py-3 text-white">{u.email || "—"}</td>
                  <td className="px-4 py-3 text-[#8b949e]">{u.name}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-medium border ${PLAN_BADGE[u.plan]}`}
                      >
                        {u.plan.replace("_", " ").toUpperCase()}
                      </span>
                      <select
                        value={u.plan}
                        disabled={savingId === u.id}
                        onChange={(e) => handlePlanChange(u, e.target.value as Plan)}
                        className="bg-[#0d1117] border border-[#30363d] text-[12px] text-white px-2 py-1.5 rounded-md outline-none focus:border-orange-500 disabled:opacity-50 min-w-[120px]"
                      >
                        {PLANS.map((p) => (
                          <option key={p.value} value={p.value}>
                            {p.label}
                          </option>
                        ))}
                      </select>
                      {savingId === u.id && (
                        <span className="text-[11px] text-orange-400">Saving...</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#8b949e]">
                    {u.plan === "enterprise" ? "∞" : u.credits}
                  </td>
                  <td className="px-4 py-3 text-[#8b949e]">{u.checks}</td>
                  <td className="px-4 py-3 text-[#8b949e]">{u.reports}</td>
                  <td className="px-4 py-3 text-[#8b949e]">{u.joined || "—"}</td>
                </tr>
              ))
            )}
            {!loading && users.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-[#656d76]">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
