"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, FileText, ImageIcon, Target, Handshake, Users,
  Mail, Settings, LogOut, Menu, X, Heart,
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: FileText, label: "News & Blog", href: "/admin/posts" },
  { icon: ImageIcon, label: "Gallery", href: "/admin/gallery" },
  { icon: Target, label: "Programs", href: "/admin/programs" },
  { icon: Handshake, label: "Partners", href: "/admin/partners" },
  { icon: Users, label: "Team", href: "/admin/team" },
  { icon: Mail, label: "Submissions", href: "/admin/submissions" },
  { icon: Heart, label: "Donations", href: "/admin/donations" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setChecking(false);
      return;
    }
    const auth = localStorage.getItem("hyf-admin-auth");
    if (auth === "true") {
      setAuthenticated(true);
    } else {
      router.push("/admin/login");
    }
    setChecking(false);
  }, [pathname, router]);

  // Login page renders without shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Loading state
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // Not authenticated
  if (!authenticated) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("hyf-admin-auth");
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex pt-0">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-surface-dark text-white transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
          <Link href="/admin" className="font-bold text-lg">HYF Admin</Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/60 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <nav className="p-3 space-y-1 mt-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full p-3 border-t border-white/10 space-y-1">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors">
            <LogOut size={18} className="rotate-180" />
            Back to Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-colors w-full"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 gap-4 shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-700">
            <Menu size={22} />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            {sidebarItems.find((i) => i.href === pathname)?.label || "Admin Panel"}
          </h1>
        </header>

        {/* Page content */}
        <div className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
