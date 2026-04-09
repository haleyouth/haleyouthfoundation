"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, ChevronRight } from "lucide-react";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const isTransparent = isHome && !scrolled && !isOpen;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isTransparent ? "bg-transparent" : "bg-white/95 backdrop-blur-xl shadow-[0_1px_20px_rgba(0,0,0,0.06)]"
      )}
    >
      {/* Accent line */}
      <div className="h-[2px] bg-gradient-to-r from-primary via-accent to-secondary" />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-300",
            scrolled ? "h-14" : "h-16 sm:h-[72px]"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <Image
              src="/images/logo_s.png"
              alt="Haleyouth Foundation"
              width={36}
              height={36}
              className={cn("transition-all duration-300", scrolled ? "w-7 h-7 sm:w-8 sm:h-8" : "w-8 h-8 sm:w-9 sm:h-9")}
            />
            <div className="hidden sm:block">
              <p className={cn(
                "font-bold leading-tight transition-all duration-300",
                scrolled ? "text-[13px]" : "text-[14px]",
                isTransparent ? "text-white" : "text-text-primary"
              )}>
                {SITE_CONFIG.name}
              </p>
              {!scrolled && (
                <p className={cn(
                  "text-[9px] tracking-[0.12em] uppercase",
                  isTransparent ? "text-white/40" : "text-text-secondary/50"
                )}>
                  {SITE_CONFIG.tagline}
                </p>
              )}
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center">
            <div className={cn(
              "flex items-center gap-0.5 p-1 rounded-2xl transition-all",
              !isTransparent && "bg-gray-50/80"
            )}>
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-200",
                      active
                        ? isTransparent ? "text-white bg-white/15" : "text-primary bg-white shadow-sm"
                        : isTransparent ? "text-white/70 hover:text-white hover:bg-white/10" : "text-text-secondary hover:text-primary hover:bg-white"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="ml-3 pl-3 border-l border-gray-200/40">
              <Link href="/get-involved/donate" className="btn-accent inline-flex items-center gap-1.5 !py-2 !px-4 !text-[13px] !rounded-lg">
                <Heart size={13} className="fill-white" /> Donate
              </Link>
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors z-50",
              isTransparent ? "text-white hover:bg-white/10" : "text-text-primary hover:bg-gray-100"
            )}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu - full screen overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-[58px] bg-white z-40 overflow-y-auto">
          <div className="px-4 py-6 space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center justify-between px-4 py-4 rounded-xl text-base font-medium transition-colors",
                  pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                    ? "text-primary bg-primary/5"
                    : "text-text-secondary hover:text-primary hover:bg-gray-50"
                )}
              >
                {item.label}
                <ChevronRight size={16} className="text-gray-300" />
              </Link>
            ))}
            <div className="pt-4 px-2">
              <Link
                href="/get-involved/donate"
                onClick={() => setIsOpen(false)}
                className="btn-accent block w-full text-center !text-base !py-4"
              >
                <Heart size={16} className="inline mr-2 fill-white" />
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
