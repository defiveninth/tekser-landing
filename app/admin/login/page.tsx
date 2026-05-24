"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState, Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }
      const from = searchParams.get("from") || "/admin/users";
      router.push(from);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      className="min-h-screen bg-[#0a0c10] flex items-center justify-center p-6"
    >
      <div className="w-full max-w-sm bg-[#161b22] border border-[#30363d] rounded-xl p-8 shadow-2xl">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded bg-orange-500 flex items-center justify-center text-white text-sm font-bold">
            K
          </div>
          <div>
            <h1 className="text-white text-[15px] font-semibold">Tekser Admin</h1>
            <p className="text-[#8b949e] text-[11px]">Sign in to continue</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-[11px] text-[#8b949e] mb-1.5 uppercase tracking-wide">
              Login
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              className="w-full bg-[#0d1117] border border-[#30363d] text-[13px] text-white px-3 py-2 rounded-md outline-none focus:border-orange-500"
              required
            />
          </div>
          <div>
            <label className="block text-[11px] text-[#8b949e] mb-1.5 uppercase tracking-wide">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full bg-[#0d1117] border border-[#30363d] text-[13px] text-white px-3 py-2 rounded-md outline-none focus:border-orange-500"
              required
            />
          </div>

          {error && (
            <p className="text-[12px] text-red-400 bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-2.5 bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white text-[13px] font-medium rounded-md transition-colors"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center text-[#8b949e] text-sm">
          Loading...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
