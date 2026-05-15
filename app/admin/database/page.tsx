"use client";
import { useState } from "react";

type ScamRecord = {
  id: string;
  phone: string;
  category: "spam" | "scam" | "credit_scam" | "investment_scam" | "unknown";
  region: string;
  reports: number;
  riskScore: number;
  lastSeen: string;
  description: string;
};

const CATEGORIES = ["spam", "scam", "credit_scam", "investment_scam", "unknown"] as const;
const REGIONS = ["Almaty", "Astana", "Shymkent", "Karaganda", "Aktobe", "Atyrau", "Unknown"];

const MOCK_DB: ScamRecord[] = [
  { id: "s1", phone: "+7 700 000 0001", category: "scam", region: "Almaty", reports: 87, riskScore: 97, lastSeen: "2025-05-10", description: "Impersonates bank security department, asks for card details." },
  { id: "s2", phone: "+7 701 999 8877", category: "investment_scam", region: "Astana", reports: 54, riskScore: 91, lastSeen: "2025-05-12", description: "Offers guaranteed high-return crypto investments." },
  { id: "s3", phone: "+7 702 111 2233", category: "credit_scam", region: "Shymkent", reports: 33, riskScore: 78, lastSeen: "2025-04-30", description: "Claims to offer fast loans, requests upfront fee." },
  { id: "s4", phone: "+7 705 666 5544", category: "spam", region: "Karaganda", reports: 120, riskScore: 55, lastSeen: "2025-05-13", description: "Mass advertising spam calls." },
  { id: "s5", phone: "+7 707 333 2211", category: "scam", region: "Aktobe", reports: 19, riskScore: 82, lastSeen: "2025-05-08", description: "Poses as law enforcement, threatens arrest." },
  { id: "s6", phone: "+7 771 444 3300", category: "unknown", region: "Unknown", reports: 7, riskScore: 40, lastSeen: "2025-03-22", description: "Reported multiple times, type unclear." },
];

const EMPTY: ScamRecord = { id: "", phone: "", category: "unknown", region: "Unknown", reports: 0, riskScore: 0, lastSeen: "", description: "" };

const CAT_COLOR: Record<ScamRecord["category"], string> = {
  spam: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  scam: "bg-red-500/15 text-red-400 border-red-500/20",
  credit_scam: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  investment_scam: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  unknown: "bg-[#21262d] text-[#8b949e] border-[#30363d]",
};

function RiskBadge({ score }: { score: number }) {
  const color = score >= 80 ? "text-red-400" : score >= 50 ? "text-yellow-400" : "text-green-400";
  return <span className={`font-semibold ${color}`}>{score}</span>;
}

export default function DatabasePage() {
  const [records, setRecords] = useState<ScamRecord[]>(MOCK_DB);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState<string>("all");
  const [modal, setModal] = useState<{ mode: "add" | "edit"; data: ScamRecord } | null>(null);
  const [form, setForm] = useState<ScamRecord>(EMPTY);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = records.filter((r) => {
    const matchSearch = r.phone.includes(search) || r.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "all" || r.category === catFilter;
    return matchSearch && matchCat;
  });

  const openAdd = () => {
    setForm({ ...EMPTY, id: `s${Date.now()}`, lastSeen: new Date().toISOString().slice(0, 10) });
    setModal({ mode: "add", data: EMPTY });
  };

  const openEdit = (r: ScamRecord) => {
    setForm({ ...r });
    setModal({ mode: "edit", data: r });
  };

  const save = () => {
    if (!form.phone.trim()) return;
    if (modal?.mode === "add") {
      setRecords((prev) => [form, ...prev]);
    } else {
      setRecords((prev) => prev.map((r) => (r.id === form.id ? form : r)));
    }
    setModal(null);
  };

  const confirmDelete = () => {
    setRecords((prev) => prev.filter((r) => r.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="p-8 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-white">Scammer Database</h1>
          <p className="text-[13px] text-[#8b949e] mt-0.5">{records.length} flagged numbers</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white text-[13px] rounded-md transition-colors"
        >
          <span className="text-lg leading-none">+</span> Add Record
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search phone or description..."
          className="bg-[#161b22] border border-[#30363d] text-[13px] text-white placeholder-[#656d76] px-3 py-2 rounded-md outline-none focus:border-orange-500 transition-colors w-64"
        />
        <select
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
          className="bg-[#161b22] border border-[#30363d] text-[13px] text-white px-3 py-2 rounded-md outline-none focus:border-orange-500 transition-colors"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c.replace("_", " ")}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[#21262d] overflow-hidden">
        <table className="w-full text-[13px]">
          <thead className="bg-[#161b22] border-b border-[#21262d]">
            <tr>
              {["Phone", "Category", "Region", "Reports", "Risk Score", "Last Seen", "Actions"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-[#8b949e] font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#21262d]">
            {filtered.map((r) => (
              <tr key={r.id} className="bg-[#0d1117] hover:bg-[#161b22] transition-colors">
                <td className="px-4 py-3 text-white">{r.phone}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${CAT_COLOR[r.category]}`}>
                    {r.category.replace("_", " ")}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#8b949e]">{r.region}</td>
                <td className="px-4 py-3 text-[#8b949e]">{r.reports}</td>
                <td className="px-4 py-3"><RiskBadge score={r.riskScore} /></td>
                <td className="px-4 py-3 text-[#8b949e]">{r.lastSeen}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(r)} className="text-[#8b949e] hover:text-white transition-colors text-[12px]">Edit</button>
                    <span className="text-[#30363d]">|</span>
                    <button onClick={() => setDeleteId(r.id)} className="text-[#8b949e] hover:text-red-400 transition-colors text-[12px]">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-[#656d76]">No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 w-full max-w-lg shadow-2xl">
            <h2 className="text-white text-[15px] font-semibold mb-5">{modal.mode === "add" ? "Add Record" : "Edit Record"}</h2>
            <div className="flex flex-col gap-4">
              <Field label="Phone Number">
                <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="+7 7XX XXX XXXX" className={inputCls} />
              </Field>
              <div className="flex gap-4">
                <Field label="Category">
                  <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as ScamRecord["category"] }))} className={inputCls}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c.replace("_", " ")}</option>)}
                  </select>
                </Field>
                <Field label="Region">
                  <select value={form.region} onChange={(e) => setForm((f) => ({ ...f, region: e.target.value }))} className={inputCls}>
                    {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </Field>
              </div>
              <div className="flex gap-4">
                <Field label="Risk Score (0–100)">
                  <input type="number" min={0} max={100} value={form.riskScore} onChange={(e) => setForm((f) => ({ ...f, riskScore: Number(e.target.value) }))} className={inputCls} />
                </Field>
                <Field label="Reports">
                  <input type="number" min={0} value={form.reports} onChange={(e) => setForm((f) => ({ ...f, reports: Number(e.target.value) }))} className={inputCls} />
                </Field>
              </div>
              <Field label="Description">
                <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} className={inputCls + " resize-none"} />
              </Field>
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
            <h2 className="text-white text-[15px] font-semibold mb-2">Delete Record?</h2>
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