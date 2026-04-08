"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, FileText, ImageIcon, Target, Handshake, Users,
  Mail, Settings, LogOut, Menu, X, Heart, PanelLeftClose, PanelLeftOpen,
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

function isLoginPage(path: string) {
  return path === "/admin/login" || path === "/admin/login/";
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (isLoginPage(pathname)) {
      setReady(true);
      return;
    }
    try {
      const auth = localStorage.getItem("hyf-admin-auth");
      if (auth === "true") {
        setAuthenticated(true);
        setReady(true);
      } else {
        window.location.href = "/admin/login/";
      }
    } catch {
      window.location.href = "/admin/login/";
    }
  }, [pathname]);

  if (isLoginPage(pathname)) return <>{children}</>;

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-[3px] border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!authenticated) return null;

  const handleLogout = () => {
    localStorage.removeItem("hyf-admin-auth");
    window.location.href = "/admin/login/";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-surface-dark text-white transform transition-all duration-300 lg:translate-x-0 lg:static lg:z-auto flex flex-col",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          collapsed ? "lg:w-[68px]" : "lg:w-64",
          "w-64"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/10 shrink-0">
          {!collapsed && <Link href="/admin" className="font-bold text-lg">HYF Admin</Link>}
          {collapsed && <Link href="/admin" className="font-bold text-lg mx-auto">H</Link>}
          <button onClick={() => setMobileOpen(false)} className="lg:hidden text-white/60 hover:text-white">
            <X size={20} />
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex text-white/40 hover:text-white transition-colors"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="p-2 space-y-1 mt-2 flex-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const active = pathname === item.href || pathname === item.href + "/";
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg text-sm font-medium transition-all",
                  collapsed ? "justify-center px-2 py-3" : "px-3 py-2.5",
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon size={18} className="shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-2 border-t border-white/10 space-y-1 shrink-0">
          <Link
            href="/"
            title={collapsed ? "Back to Site" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-colors",
              collapsed ? "justify-center px-2 py-3" : "px-3 py-2.5"
            )}
          >
            <LogOut size={18} className="rotate-180 shrink-0" />
            {!collapsed && <span>Back to Site</span>}
          </Link>
          <button
            onClick={handleLogout}
            title={collapsed ? "Logout" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg text-sm font-medium text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-colors w-full",
              collapsed ? "justify-center px-2 py-3" : "px-3 py-2.5"
            )}
          >
            <LogOut size={18} className="shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-4 shrink-0">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-700">
            <Menu size={20} />
          </button>
          <h1 className="text-sm font-semibold text-gray-900">
            {sidebarItems.find((i) => pathname === i.href || pathname === i.href + "/")?.label || "Admin Panel"}
          </h1>
        </header>
        <div className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
