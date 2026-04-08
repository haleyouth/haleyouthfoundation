"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart } from "lucide-react";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  const isTransparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isTransparent ? "bg-transparent" : "navbar-blur"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <Image
              src="/images/logo_s.png"
              alt="Haleyouth Foundation"
              width={42}
              height={42}
              className="h-10 w-auto transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <p
                className={cn(
                  "font-bold text-base leading-tight transition-colors duration-300",
                  isTransparent ? "text-white" : "text-text-primary"
                )}
              >
                {SITE_CONFIG.name}
              </p>
              <p
                className={cn(
                  "text-[11px] leading-tight transition-colors duration-300 tracking-wide",
                  isTransparent ? "text-white/60" : "text-text-secondary"
                )}
              >
                {SITE_CONFIG.tagline}
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-300",
                    active
                      ? isTransparent
                        ? "text-white"
                        : "text-primary"
                      : isTransparent
                      ? "text-white/75 hover:text-white"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.div
                      layoutId="nav-indicator"
                      className={cn(
                        "absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full",
                        isTransparent ? "bg-white" : "bg-primary"
                      )}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </Link>
              );
            })}
            <Link
              href="/get-involved/donate"
              className="ml-3 btn-accent inline-flex items-center gap-2 !py-2.5 !px-5 !text-sm !rounded-lg"
            >
              <Heart size={14} />
              Donate
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "lg:hidden p-2.5 rounded-xl transition-colors",
              isTransparent
                ? "text-white hover:bg-white/10"
                : "text-text-primary hover:bg-gray-100"
            )}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white border-t border-border/50 overflow-hidden shadow-xl"
          >
            <div className="px-4 py-5 space-y-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                      ? "text-primary bg-primary/5"
                      : "text-text-secondary hover:text-primary hover:bg-gray-50"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-3">
                <Link
                  href="/get-involved/donate"
                  className="btn-accent block w-full text-center !text-sm"
                >
                  <Heart size={16} className="inline mr-2" />
                  Donate Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
