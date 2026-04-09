"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { GALLERY_IMAGES, GALLERY_CATEGORIES } from "@/lib/constants";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const filtered = activeCategory === "All" ? GALLERY_IMAGES : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  const goNext = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((prev) => (prev! + 1) % filtered.length);
  }, [lightbox, filtered.length]);

  const goPrev = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((prev) => (prev! - 1 + filtered.length) % filtered.length);
  }, [lightbox, filtered.length]);

  return (
    <>
      <PageHeader title="Photo Gallery" subtitle="Moments from our programs, events, and community impact." badge="Gallery" />

      <section className="py-12 sm:py-20 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setLightbox(null); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat ? "bg-primary text-white shadow-lg shadow-primary/25" : "bg-white text-text-secondary hover:bg-primary/5 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((img, i) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => setLightbox(i)}
              >
                <div className="relative overflow-hidden rounded-xl">
                  <Image
                    src={img.src}
                    alt={img.caption}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end">
                    <p className="text-white text-sm p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      {img.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-50 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/50 text-sm font-mono z-50">
              {lightbox + 1} / {filtered.length}
            </div>

            {/* Previous */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white z-50 transition-all hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white z-50 transition-all hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={lightbox}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative max-w-5xl max-h-[80vh] w-full mx-16 sm:mx-20"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={filtered[lightbox].src}
                  alt={filtered[lightbox].caption}
                  width={1200}
                  height={800}
                  className="w-full h-auto max-h-[75vh] object-contain rounded-lg"
                />
                <p className="text-white/70 text-center text-sm mt-4 px-4">{filtered[lightbox].caption}</p>
              </motion.div>
            </AnimatePresence>

            {/* Thumbnail strip */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 max-w-[90vw] overflow-x-auto px-4 py-2">
              {filtered.map((img, i) => (
                <button
                  key={img.src}
                  onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    i === lightbox ? "border-white opacity-100 scale-110" : "border-transparent opacity-40 hover:opacity-70"
                  }`}
                >
                  <Image src={img.src} alt="" width={56} height={56} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
