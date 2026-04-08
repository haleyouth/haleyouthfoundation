"use client";

import Image from "next/image";
import { Plus, Edit, Trash2, ExternalLink, GripVertical } from "lucide-react";
import { PARTNERS } from "@/lib/constants";

export default function AdminPartnersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Partners</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus size={16} /> Add Partner
        </button>
      </div>

      {/* Partners table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="w-8 py-3 px-2"></th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Logo</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Name</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Tier</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Website</th>
              <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {PARTNERS.map((partner) => (
              <tr key={partner.name} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-2 px-2 text-gray-300 cursor-grab"><GripVertical size={14} /></td>
                <td className="py-2 px-4">
                  <Image src={partner.logo} alt={partner.name} width={60} height={30} className="object-contain h-8 w-auto" />
                </td>
                <td className="py-2 px-4 font-medium text-gray-900">{partner.name}</td>
                <td className="py-2 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                    partner.tier === "strategic" ? "bg-blue-100 text-blue-700" :
                    partner.tier === "program" ? "bg-green-100 text-green-700" :
                    partner.tier === "knowledge" ? "bg-purple-100 text-purple-700" :
                    "bg-gray-100 text-gray-700"
                  }`}>
                    {partner.tier}
                  </span>
                </td>
                <td className="py-2 px-4">
                  {partner.website ? (
                    <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1 text-xs">
                      Link <ExternalLink size={10} />
                    </a>
                  ) : (
                    <span className="text-gray-400 text-xs">No link</span>
                  )}
                </td>
                <td className="py-2 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-primary transition-colors" title="Edit"><Edit size={14} /></button>
                    <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors" title="Delete"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-gray-400 text-xs text-center">
        Drag-and-drop reordering and logo upload will be available after Firebase integration.
      </p>
    </div>
  );
}
