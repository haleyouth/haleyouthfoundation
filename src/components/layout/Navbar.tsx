"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, ChevronDown } from "lucide-react";
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  const isTransparent = isHome && !scrolled;

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: isTransparent ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.92)",
        backdropFilter: isTransparent ? "blur(0px)" : "blur(20px)",
        borderBottomColor: isTransparent ? "rgba(255,255,255,0)" : "rgba(226,232,240,0.5)",
        boxShadow: isTransparent
          ? "0 0 0 rgba(0,0,0,0)"
          : "0 1px 20px rgba(0,0,0,0.06)",
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b"
    >
      {/* Top accent line */}
      <div className="h-[2px] bg-gradient-to-r from-primary via-accent to-secondary" />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={false}
          animate={{ height: scrolled ? 56 : 72 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex items-center justify-between"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <motion.div
              initial={false}
              animate={{ width: scrolled ? 36 : 44, height: scrolled ? 36 : 44 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/logo_s.png"
                alt="Haleyouth Foundation"
                width={44}
                height={44}
                className="w-full h-full object-contain"
              />
            </motion.div>
            <div className="hidden sm:block">
              <motion.p
                initial={false}
                animate={{ fontSize: scrolled ? "14px" : "16px" }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "font-bold leading-tight transition-colors duration-400",
                  isTransparent ? "text-white" : "text-text-primary"
                )}
              >
                {SITE_CONFIG.name}
              </motion.p>
              <AnimatePresence>
                {!scrolled && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "text-[10px] leading-tight tracking-widest uppercase",
                      isTransparent ? "text-white/50" : "text-text-secondary/60"
                    )}
                  >
                    {SITE_CONFIG.tagline}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-300 group",
                    active
                      ? isTransparent
                        ? "text-white"
                        : "text-primary"
                      : isTransparent
                      ? "text-white/70 hover:text-white"
                      : "text-text-secondary hover:text-text-primary hover:bg-gray-50"
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.div
                      layoutId="nav-active"
                      className={cn(
                        "absolute -bottom-0.5 left-3 right-3 h-[2px] rounded-full",
                        isTransparent ? "bg-white" : "bg-primary"
                      )}
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                </Link>
              );
            })}
            <div className="ml-3 pl-3 border-l border-gray-200/50">
              <Link
                href="/get-involved/donate"
                className="btn-accent inline-flex items-center gap-2 !py-2 !px-5 !text-[13px] !rounded-lg !shadow-md"
              >
                <Heart size={13} className="fill-white" />
                Donate
              </Link>
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "lg:hidden p-2.5 rounded-xl transition-all duration-300",
              isTransparent
                ? "text-white hover:bg-white/10"
                : "text-text-primary hover:bg-gray-100"
            )}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:hidden bg-white overflow-hidden shadow-2xl border-t border-gray-100"
          >
            <div className="px-4 py-5 space-y-1 max-h-[70vh] overflow-y-auto">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "block px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all duration-200",
                      pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                        ? "text-primary bg-primary/5 border-l-[3px] border-primary"
                        : "text-text-secondary hover:text-primary hover:bg-gray-50"
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-4"
              >
                <Link
                  href="/get-involved/donate"
                  className="btn-accent block w-full text-center !text-[15px]"
                >
                  <Heart size={16} className="inline mr-2 fill-white" />
                  Donate Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
