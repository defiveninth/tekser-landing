"use client";
import { useState } from "react";

type User = {
  id: string;
  phone: string;
  plan: "free" | "premium";
  status: "active" | "banned";
  reports: number;
  checks: number;
  joined: string;
};

const MOCK_USERS: User[] = [
  { id: "u1", phone: "+7 700 123 4567", plan: "premium", status: "active", reports: 12, checks: 340, joined: "2024-11-03" },
  { id: "u2", phone: "+7 701 987 6543", plan: "free", status: "active", reports: 3, checks: 18, joined: "2025-01-15" },
  { id: "u3", phone: "+7 702 555 0011", plan: "free", status: "banned", reports: 0, checks: 5, joined: "2025-02-20" },
  { id: "u4", phone: "+7 705 444 3322", plan: "premium", status: "active", reports: 27, checks: 910, joined: "2024-09-07" },
  { id: "u5", phone: "+7 707 222 8899", plan: "free", status: "active", reports: 1, checks: 9, joined: "2025-03-01" },
  { id: "u6", phone: "+7 771 333 1100", plan: "free", status: "active", reports: 6, checks: 44, joined: "2025-04-18" },
];

const EMPTY: User = { id: "", phone: "", plan: "free", status: "active", reports: 0, checks: 0, joined: "" };

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<{ mode: "add" | "edit"; data: User } | null>(null);
  const [form, setForm] = useState<User>(EMPTY);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = users.filter((u) => u.phone.includes(search));

  const openAdd = () => {
    setForm({ ...EMPTY, id: `u${Date.now()}`, joined: new Date().toISOString().slice(0, 10) });
    setModal({ mode: "add", data: EMPTY });
  };

  const openEdit = (u: User) => {
    setForm({ ...u });
    setModal({ mode: "edit", data: u });
  };

  const save = () => {
    if (!form.phone.trim()) return;
    if (modal?.mode === "add") {
      setUsers((prev) => [form, ...prev]);
    } else {
      setUsers((prev) => prev.map((u) => (u.id === form.id ? form : u)));
    }
    setModal(null);
  };

  const confirmDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== deleteId));
    setDeleteId(null);
  };

  const toggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === "active" ? "banned" : "active" } : u))
    );
  };

  return (
    <div style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="p-8 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-white">Users</h1>
          <p className="text-[13px] text-[#8b949e] mt-0.5">{users.length} total accounts</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white text-[13px] rounded-md transition-colors"
        >
          <span className="text-lg leading-none">+</span> Add User
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by phone..."
          className="w-full max-w-sm bg-[#161b22] border border-[#30363d] text-[13px] text-white placeholder-[#656d76] px-3 py-2 rounded-md outline-none focus:border-orange-500 transition-colors"
        />
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[#21262d] overflow-hidden">
        <table className="w-full text-[13px]">
          <thead className="bg-[#161b22] border-b border-[#21262d]">
            <tr>
              {["Phone", "Plan", "Status", "Reports", "Checks", "Joined", "Actions"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-[#8b949e] font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#21262d]">
            {filtered.map((u) => (
              <tr key={u.id} className="bg-[#0d1117] hover:bg-[#161b22] transition-colors">
                <td className="px-4 py-3 text-white">{u.phone}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${u.plan === "premium" ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20" : "bg-[#21262d] text-[#8b949e] border border-[#30363d]"}`}>
                    {u.plan.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${u.status === "active" ? "bg-green-500/15 text-green-400 border border-green-500/20" : "bg-red-500/15 text-red-400 border border-red-500/20"}`}>
                    {u.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#8b949e]">{u.reports}</td>
                <td className="px-4 py-3 text-[#8b949e]">{u.checks}</td>
                <td className="px-4 py-3 text-[#8b949e]">{u.joined}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(u)} className="text-[#8b949e] hover:text-white transition-colors text-[12px]">Edit</button>
                    <span className="text-[#30363d]">|</span>
                    <button onClick={() => toggleStatus(u.id)} className={`text-[12px] transition-colors ${u.status === "active" ? "text-[#8b949e] hover:text-red-400" : "text-[#8b949e] hover:text-green-400"}`}>
                      {u.status === "active" ? "Ban" : "Unban"}
                    </button>
                    <span className="text-[#30363d]">|</span>
                    <button onClick={() => setDeleteId(u.id)} className="text-[#8b949e] hover:text-red-400 transition-colors text-[12px]">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-[#656d76]">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-white text-[15px] font-semibold mb-5">{modal.mode === "add" ? "Add User" : "Edit User"}</h2>
            <div className="flex flex-col gap-4">
              <Field label="Phone Number">
                <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="+7 7XX XXX XXXX" className={inputCls} />
              </Field>
              <div className="flex gap-4">
                <Field label="Plan">
                  <select value={form.plan} onChange={(e) => setForm((f) => ({ ...f, plan: e.target.value as User["plan"] }))} className={inputCls}>
                    <option value="free">Free</option>
                    <option value="premium">Premium</option>
                  </select>
                </Field>
                <Field label="Status">
                  <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as User["status"] }))} className={inputCls}>
                    <option value="active">Active</option>
                    <option value="banned">Banned</option>
                  </select>
                </Field>
              </div>
            </div>
            <div className="flex gap-3 mt-6 justify-end">
              <button onClick={() => setModal(null)} className="px-4 py-2 text-[13px] text-[#8b949e] hover:text-white border border-[#30363d] rounded-md transition-colors">Cancel</button>
              <button onClick={save} className="px-4 py-2 text-[13px] bg-orange-500 hover:bg-orange-400 text-white rounded-md transition-colors">
                {modal.mode === "add" ? "Create" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 w-full max-w-sm shadow-2xl">
            <h2 className="text-white text-[15px] font-semibold mb-2">Delete User?</h2>
            <p className="text-[#8b949e] text-[13px] mb-6">This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-[13px] text-[#8b949e] hover:text-white border border-[#30363d] rounded-md transition-colors">Cancel</button>
              <button onClick={confirmDelete} className="px-4 py-2 text-[13px] bg-red-500 hover:bg-red-400 text-white rounded-md transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const inputCls = "w-full bg-[#0d1117] border border-[#30363d] text-[13px] text-white px-3 py-2 rounded-md outline-none focus:border-orange-500 transition-colors";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex-1">
      <label className="block text-[11px] text-[#8b949e] mb-1.5 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}