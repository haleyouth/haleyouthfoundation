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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  const isTransparent = isHome && !scrolled;

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: isTransparent ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.95)",
        backdropFilter: isTransparent ? "blur(0px)" : "blur(24px)",
        boxShadow: isTransparent
          ? "0 0 0 rgba(0,0,0,0)"
          : "0 4px 30px rgba(0,0,0,0.06)",
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Premium accent gradient line */}
      <motion.div
        initial={false}
        animate={{ opacity: scrolled || !isHome ? 1 : 0.4 }}
        className="h-[2px] bg-gradient-to-r from-primary via-accent to-secondary"
      />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={false}
          animate={{ height: scrolled ? 56 : 72 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-center justify-between"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <motion.div
              initial={false}
              animate={{ width: scrolled ? 32 : 40, height: scrolled ? 32 : 40 }}
              transition={{ duration: 0.35 }}
              className="relative"
            >
              <Image
                src="/images/logo_s.png"
                alt="Haleyouth Foundation"
                width={40}
                height={40}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </motion.div>
            <div className="hidden sm:block overflow-hidden">
              <motion.p
                initial={false}
                animate={{ fontSize: scrolled ? "13px" : "15px" }}
                transition={{ duration: 0.35 }}
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
                    animate={{ opacity: 1, height: 14 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className={cn(
                      "text-[9px] leading-tight tracking-[0.15em] uppercase",
                      isTransparent ? "text-white/40" : "text-text-secondary/50"
                    )}
                  >
                    {SITE_CONFIG.tagline}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center">
            <div className={cn(
              "flex items-center gap-0.5 p-1 rounded-2xl transition-all duration-500",
              !isTransparent && "bg-gray-50/80"
            )}>
              {NAV_ITEMS.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-3.5 py-2 rounded-xl text-[13px] font-medium transition-all duration-300 group",
                      active
                        ? isTransparent
                          ? "text-white bg-white/15"
                          : "text-primary bg-white shadow-sm"
                        : isTransparent
                        ? "text-white/70 hover:text-white hover:bg-white/10"
                        : "text-text-secondary hover:text-primary hover:bg-white"
                    )}
                  >
                    {item.label}
                    {/* Hover underline effect */}
                    <span className={cn(
                      "absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300",
                      active
                        ? isTransparent ? "w-5 bg-white/60" : "w-5 bg-primary"
                        : "w-0 group-hover:w-5",
                      !active && (isTransparent ? "bg-white/50" : "bg-primary/50")
                    )} />
                  </Link>
                );
              })}
            </div>

            <div className="ml-4 pl-4 border-l border-gray-200/40">
              <Link
                href="/get-involved/donate"
                className="btn-accent inline-flex items-center gap-2 !py-2.5 !px-5 !text-[13px] !rounded-xl group"
              >
                <Heart size={13} className="fill-white group-hover:scale-110 transition-transform" />
                Donate
                <ChevronRight size={13} className="opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
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
            className="lg:hidden bg-white overflow-hidden shadow-2xl"
          >
            <div className="px-4 py-5 space-y-1 max-h-[75vh] overflow-y-auto">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all duration-200",
                      pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                        ? "text-primary bg-primary/5 border-l-[3px] border-primary"
                        : "text-text-secondary hover:text-primary hover:bg-gray-50"
                    )}
                  >
                    {item.label}
                    <ChevronRight size={16} className="text-gray-300" />
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
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
