"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
}

export default function PageHeader({ title, subtitle, badge }: PageHeaderProps) {
  return (
    <section className="pt-28 pb-16 bg-gradient-to-br from-primary-dark via-primary to-primary-dark relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-10 -right-10 w-60 h-60 rounded-full bg-white" />
        <div className="absolute bottom-0 left-10 w-40 h-40 rounded-full bg-white" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {badge && (
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">
              {badge}
            </p>
          )}
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-white/80 text-lg max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
