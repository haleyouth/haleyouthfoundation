"use client";

import Image from "next/image";
import { Plus, Trash2, Edit } from "lucide-react";
import { GALLERY_IMAGES } from "@/lib/constants";

export default function AdminGalleryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Gallery & Media</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus size={16} /> Upload Images
        </button>
      </div>

      {/* Storage indicator */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Storage Used</span>
          <span className="text-sm text-gray-500">{GALLERY_IMAGES.length} images</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-primary rounded-full h-2" style={{ width: "15%" }} />
        </div>
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {GALLERY_IMAGES.map((img, i) => (
          <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm group relative">
            <div className="relative aspect-square">
              <Image src={img.src} alt={img.caption} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button className="p-2 bg-white rounded-lg text-gray-700 hover:text-primary" title="Edit"><Edit size={14} /></button>
                <button className="p-2 bg-white rounded-lg text-gray-700 hover:text-red-500" title="Delete"><Trash2 size={14} /></button>
              </div>
            </div>
            <div className="p-3">
              <p className="text-xs text-gray-500 line-clamp-2">{img.caption}</p>
              <span className="text-[10px] text-gray-400 mt-1 block">{img.category}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-gray-400 text-xs text-center">
        Drag-and-drop upload and image editing will be available after Firebase Storage integration.
      </p>
    </div>
  );
}
