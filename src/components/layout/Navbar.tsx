"use client";

import { useState, useEffect } from "react";
import Link from "@/components/ui/Link";
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

  // Bar height: 80px at top, 64px when scrolled.
  // Logo size: 160px at top (overshoots the 80px bar by ~100%, hanging ~80px below),
  // smoothly transitions to 64px (fits inside the 64px bar) when scrolled.
  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-out",
          transparent
            ? "bg-transparent"
            : "bg-white/95 shadow-md"
        )}
        style={{ WebkitBackdropFilter: transparent ? "none" : "blur(20px)", backdropFilter: transparent ? "none" : "blur(20px)" }}
      >
        {/* Accent bar */}
        <div className="h-0.5 bg-gradient-to-r from-primary via-accent to-secondary" />

        <div className="max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-10">
          <div
            className={cn(
              "relative flex items-center justify-between transition-all duration-500 ease-out",
              scrolled ? "h-16" : "h-20"
            )}
          >
            {/* Logo, scaled and translated so it overshoots the bar at top, then settles inside on scroll */}
            <Link
              href="/"
              className="relative flex items-center gap-3 shrink-0 z-[101]"
              aria-label={SITE_CONFIG.name}
            >
              <div
                className={cn(
                  "relative transition-all duration-500 ease-out origin-left",
                  scrolled ? "w-16 h-16" : "w-[160px] h-[160px] translate-y-[40px]"
                )}
              >
                <Image
                  src="/icon.png"
                  alt="Haleyouth"
                  fill
                  priority
                  sizes="160px"
                  className="object-contain drop-shadow-sm"
                />
              </div>
              {/* Wordmark only appears once the logo collapses, so the nav has full breathing room at rest */}
              <span
                className={cn(
                  "font-bold hidden sm:inline transition-all duration-500 ease-out whitespace-nowrap",
                  scrolled
                    ? "text-lg opacity-100 max-w-[240px] ml-0"
                    : "text-lg opacity-0 max-w-0 ml-[-12px] overflow-hidden pointer-events-none",
                  transparent ? "text-white" : "text-gray-900"
                )}
                aria-hidden={!scrolled}
              >
                {SITE_CONFIG.name}
              </span>
            </Link>

            {/* Desktop nav, generous spacing so links breathe */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3">
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3 xl:px-4 py-2.5 rounded-lg text-[15px] font-medium transition-colors whitespace-nowrap",
                      active
                        ? transparent ? "text-white bg-white/20" : "text-primary bg-primary/5"
                        : transparent ? "text-white/85 hover:text-white hover:bg-white/10" : "text-gray-700 hover:text-primary hover:bg-gray-50"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/get-involved/donate"
                className="ml-2 xl:ml-3 px-5 xl:px-6 py-2.5 bg-gradient-to-r from-accent to-[#BF360C] text-white text-[15px] font-bold rounded-lg shadow-md hover:shadow-lg transition-all whitespace-nowrap"
              >
                Donate
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "lg:hidden relative w-12 h-12 flex items-center justify-center rounded-lg z-[101] transition-colors",
                transparent && !isOpen ? "text-white" : "text-gray-900"
              )}
              aria-label="Menu"
              aria-expanded={isOpen}
            >
              <div className="w-6 flex flex-col gap-[6px]">
                <span className={cn(
                  "block h-[2.5px] rounded-full transition-all duration-300 origin-center",
                  transparent && !isOpen ? "bg-white" : "bg-gray-900",
                  isOpen && "rotate-45 translate-y-[8.5px]"
                )} />
                <span className={cn(
                  "block h-[2.5px] rounded-full transition-all duration-300",
                  transparent && !isOpen ? "bg-white" : "bg-gray-900",
                  isOpen && "opacity-0 scale-0"
                )} />
                <span className={cn(
                  "block h-[2.5px] rounded-full transition-all duration-300 origin-center",
                  transparent && !isOpen ? "bg-white" : "bg-gray-900",
                  isOpen && "-rotate-45 -translate-y-[8.5px]"
                )} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[99] bg-white transition-all duration-300 lg:hidden",
          isOpen && mounted ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
        style={{ paddingTop: scrolled ? 66 : 82 }}
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
                    "flex items-center justify-between px-4 py-4 rounded-xl text-[17px] font-medium transition-colors",
                    active
                      ? "text-primary bg-primary/5 border-l-[3px] border-primary"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  {item.label}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-300">
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
              className="block w-full py-4 bg-gradient-to-r from-accent to-[#BF360C] text-white text-center text-[17px] font-bold rounded-xl shadow-lg"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
