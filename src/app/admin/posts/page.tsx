"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Eye, Search } from "lucide-react";

const mockPosts = [
  { id: "1", title: "Haleyouth Foundation at UNGA SDGs Roundtable", category: "Events", status: "Published", date: "Sep 2025" },
  { id: "2", title: "Pad-a-Girl Climate Action Project Completed", category: "Programs", status: "Published", date: "Dec 2025" },
  { id: "3", title: "Back-to-School Project Reaches 200+ Students", category: "Programs", status: "Draft", date: "2024" },
];

export default function AdminPostsPage() {
  const [search, setSearch] = useState("");
  const filtered = mockPosts.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Blog Posts</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus size={16} /> New Post
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Search posts..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Title</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Category</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
              <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((post) => (
              <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-gray-900">{post.title}</td>
                <td className="py-3 px-4 text-gray-500">{post.category}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${post.status === "Published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {post.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-500">{post.date}</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-primary transition-colors" title="Preview"><Eye size={14} /></button>
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
        Blog post editing with rich text editor will be available after Firebase integration.
      </p>
    </div>
  );
}
