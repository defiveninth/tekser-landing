"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  {
    id: "users",
    label: "Users",
    href: "/admin/users",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
  },
  {
    id: "database",
    label: "Scammer DB",
    href: "/admin/database",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside
      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      className="w-[220px] flex-shrink-0 bg-[#0d1117] border-r border-[#21262d] flex flex-col"
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[#21262d]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-orange-500 flex items-center justify-center text-white text-xs font-bold">K</div>
          <div>
            <div className="text-[13px] font-semibold text-white leading-tight">Tekser</div>
            <div className="text-[10px] text-[#8b949e]">Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
        <div className="text-[10px] text-[#656d76] uppercase tracking-widest px-2 mb-2">Navigation</div>
        {NAV.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] transition-all duration-150 ${
                active
                  ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                  : "text-[#8b949e] hover:text-white hover:bg-[#21262d] border border-transparent"
              }`}
            >
              <span className={active ? "text-orange-400" : "text-[#8b949e]"}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-[#21262d] space-y-2">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full px-3 py-2 text-[12px] text-[#8b949e] hover:text-white hover:bg-[#21262d] rounded-md transition-colors text-left"
        >
          Log out
        </button>
        <div className="px-2 text-[10px] text-[#656d76]">v0.1.0 · Live</div>
      </div>
    </aside>
  );
}