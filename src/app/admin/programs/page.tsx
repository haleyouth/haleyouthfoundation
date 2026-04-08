"use client";

import { Edit, Eye, GripVertical, Star } from "lucide-react";
import { PROGRAMS } from "@/lib/constants";

export default function AdminProgramsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-gray-900">Programs</h2>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="w-8 py-3 px-2"></th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Program</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Category</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">SDGs</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Featured</th>
              <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {PROGRAMS.map((program) => (
              <tr key={program.slug} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-2 text-gray-300 cursor-grab"><GripVertical size={14} /></td>
                <td className="py-3 px-4">
                  <p className="font-medium text-gray-900">{program.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{program.tagline}</p>
                </td>
                <td className="py-3 px-4 text-gray-500 text-xs">{program.category}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-1">
                    {program.sdgs?.map((sdg) => (
                      <span key={sdg} className="w-5 h-5 bg-primary/10 text-primary text-[10px] font-bold rounded flex items-center justify-center">{sdg}</span>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4">
                  {program.featured && <Star size={14} className="text-yellow-500 fill-yellow-500" />}
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors" title="Preview"><Eye size={14} /></button>
                    <button className="p-1.5 text-gray-400 hover:text-primary transition-colors" title="Edit"><Edit size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
