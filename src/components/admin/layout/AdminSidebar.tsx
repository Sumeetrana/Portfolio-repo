"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "⬛" },
  { href: "/admin/generate", label: "Generate", icon: "✨" },
  { href: "/admin/drafts", label: "Drafts", icon: "✍️" },
  { href: "/admin/published", label: "Published", icon: "🌐" },
  { href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 bg-[#0a0a1a] border-r border-slate-800 min-h-screen flex flex-col">
      <div className="px-6 py-5 border-b border-slate-800">
        <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">Admin</p>
        <p className="text-sm text-slate-300 mt-0.5 font-medium">Content Platform</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-indigo-600/20 text-indigo-300 font-medium"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <span className="text-base leading-none">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-4 border-t border-slate-800">
        <Link href="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
          ← Back to site
        </Link>
      </div>
    </aside>
  );
}
