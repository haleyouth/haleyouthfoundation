"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const transparent = isHome && !scrolled && !isOpen;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
          transparent
            ? "bg-transparent"
            : "bg-white shadow-md"
        )}
        style={{ WebkitBackdropFilter: transparent ? "none" : "blur(20px)", backdropFilter: transparent ? "none" : "blur(20px)" }}
      >
        {/* Accent bar */}
        <div className="h-0.5 bg-gradient-to-r from-primary via-accent to-secondary" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("flex items-center justify-between transition-all", scrolled ? "h-14" : "h-16")}>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0 z-[101]">
              <Image
                src="/images/logo_s.png"
                alt="Haleyouth"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className={cn(
                "font-bold text-sm hidden sm:inline transition-colors",
                transparent ? "text-white" : "text-gray-900"
              )}>
                {SITE_CONFIG.name}
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 rounded-lg text-[13px] font-medium transition-colors",
                      active
                        ? transparent ? "text-white bg-white/20" : "text-primary bg-primary/5"
                        : transparent ? "text-white/80 hover:text-white hover:bg-white/10" : "text-gray-600 hover:text-primary hover:bg-gray-50"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/get-involved/donate"
                className="ml-2 px-5 py-2 bg-gradient-to-r from-accent to-[#BF360C] text-white text-[13px] font-bold rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Donate
              </Link>
            </div>

            {/* Mobile hamburger - plain HTML button, no animation library */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg z-[101] transition-colors",
                transparent && !isOpen ? "text-white" : "text-gray-900"
              )}
              aria-label="Menu"
              aria-expanded={isOpen}
            >
              <div className="w-5 flex flex-col gap-[5px]">
                <span className={cn(
                  "block h-[2px] rounded-full transition-all duration-300 origin-center",
                  transparent && !isOpen ? "bg-white" : "bg-gray-900",
                  isOpen && "rotate-45 translate-y-[7px]"
                )} />
                <span className={cn(
                  "block h-[2px] rounded-full transition-all duration-300",
                  transparent && !isOpen ? "bg-white" : "bg-gray-900",
                  isOpen && "opacity-0 scale-0"
                )} />
                <span className={cn(
                  "block h-[2px] rounded-full transition-all duration-300 origin-center",
                  transparent && !isOpen ? "bg-white" : "bg-gray-900",
                  isOpen && "-rotate-45 -translate-y-[7px]"
                )} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay - completely separate from header, plain CSS */}
      <div
        className={cn(
          "fixed inset-0 z-[99] bg-white transition-all duration-300 lg:hidden",
          isOpen && mounted ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
        style={{ paddingTop: scrolled ? 58 : 66 }}
      >
        <div className="h-full overflow-y-auto px-4 py-6">
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-4 py-4 rounded-xl text-[16px] font-medium transition-colors",
                    active
                      ? "text-primary bg-primary/5 border-l-[3px] border-primary"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  {item.label}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-300">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              );
            })}
          </nav>
          <div className="mt-6 px-2">
            <Link
              href="/get-involved/donate"
              onClick={() => setIsOpen(false)}
              className="block w-full py-4 bg-gradient-to-r from-accent to-[#BF360C] text-white text-center text-[16px] font-bold rounded-xl shadow-lg"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
