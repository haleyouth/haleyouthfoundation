"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function SDGBadge({ num, size = "md" }: { num: number; size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.12, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`${sizes[size]} rounded-xl overflow-hidden shadow-md hover:shadow-xl cursor-default transition-shadow duration-300`}
    >
      <Image
        src={`/images/sdgs/sdg-${num}.png`}
        alt={`SDG ${num}`}
        width={96}
        height={96}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}

export function SDGRow({ goals, size = "md" }: { goals: number[]; size?: "sm" | "md" | "lg" }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {goals.map((num, i) => (
        <motion.div
          key={num}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: i * 0.06, duration: 0.4 }}
          viewport={{ once: true }}
        >
          <SDGBadge num={num} size={size} />
        </motion.div>
      ))}
    </div>
  );
}
