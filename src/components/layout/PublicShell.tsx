"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initAnalytics } from "@/lib/firebase";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  // Initialize Firebase Analytics
  useEffect(() => {
    initAnalytics();
  }, []);

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
