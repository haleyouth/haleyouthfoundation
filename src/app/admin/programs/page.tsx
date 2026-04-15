"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchAll, addItem, updateItem, deleteItem } from "@/lib/admin-crud";
import { PROGRAMS } from "@/lib/constants";
import { Plus, Edit, Trash2, Save, X, RefreshCw, Loader2, Star } from "lucide-react";

interface Program {
  id?: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  category: string;
  icon: string;
  image: string;
  featured: boolean;
  sdgs: string;
  stats: string;
}

const emptyProgram: Program = { title: "", slug: "", tagline: "", description: "", category: "Education & Scholarships", icon: "BookOpen", image: "", featured: false, sdgs: "", stats: "" };
const categories = ["Education & Scholarships", "Health & Wellness", "Climate & Environment", "Skills & Empowerment", "Community Development", "Peace & Advocacy"];

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Program | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAll<Program>("admin_programs");
      if (data.length === 0) {
        // Seed from static constants on first load
        setPrograms(PROGRAMS.map((p) => ({
          ...emptyProgram,
          title: p.title,
          slug: p.slug,
          tagline: p.tagline,
          description: p.description,
          category: p.category,
          icon: p.icon,
          image: p.image,
          featured: p.featured || false,
          sdgs: (p.sdgs || []).join(", "),
          stats: (p.stats || []).map((s) => `${s.label}: ${s.value}`).join("; "),
        })));
      } else {
        setPrograms(data);
      }
    } catch {
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const data = { ...editing } as Record<string, unknown>;
      delete data.id;
      if (isNew) {
        await addItem("admin_programs", data);
      } else if (editing.id) {
        await updateItem("admin_programs", editing.id, data);
      }
      setEditing(null);
      setIsNew(false);
      load();
    } catch (err) {
      alert("Failed to save: " + err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this program?")) return;
    await deleteItem("admin_programs", id);
    load();
  };

  const inputClass = "w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-lg font-bold text-gray-900">Programs</h2>
        <div className="flex gap-2">
          <button onClick={load} disabled={loading} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 bg-white rounded-lg border border-gray-200 hover:border-primary/30 transition-all disabled:opacity-50">
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
          <button onClick={() => { setEditing({ ...emptyProgram }); setIsNew(true); }} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">
            <Plus size={16} /> Add Program
          </button>
        </div>
      </div>

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center p-4 pt-20 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-900">{isNew ? "Add Program" : "Edit Program"}</h3>
              <button onClick={() => { setEditing(null); setIsNew(false); }} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Title *</label>
                  <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Slug *</label>
                  <input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className={inputClass} placeholder="e.g. pad-a-girl" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Tagline</label>
                <input value={editing.tagline} onChange={(e) => setEditing({ ...editing, tagline: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} className={`${inputClass} resize-none`} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                  <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className={inputClass}>
                    {categories.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Image URL</label>
                  <input value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} className={inputClass} placeholder="/images/events/..." />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">SDGs (comma separated)</label>
                  <input value={editing.sdgs} onChange={(e) => setEditing({ ...editing, sdgs: e.target.value })} className={inputClass} placeholder="1, 4, 10" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Stats (semicolon separated)</label>
                  <input value={editing.stats} onChange={(e) => setEditing({ ...editing, stats: e.target.value })} className={inputClass} placeholder="Girls Reached: 500+; Schools: 5+" />
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="w-4 h-4 rounded border-gray-300 text-primary" />
                <span className="text-sm text-gray-700">Featured program</span>
              </label>
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <button onClick={() => { setEditing(null); setIsNew(false); }} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">Cancel</button>
              <button onClick={handleSave} disabled={saving || !editing.title} className="flex items-center gap-2 px-5 py-2 bg-primary text-white text-sm font-medium rounded-lg disabled:opacity-50">
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Programs table */}
      {loading ? (
        <div className="bg-white rounded-xl p-12 text-center"><Loader2 size={24} className="animate-spin text-primary mx-auto" /></div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Program</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Category</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">SDGs</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Featured</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((p) => (
                <tr key={p.id || p.slug} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <p className="font-medium text-gray-900 truncate max-w-[200px]">{p.title}</p>
                    <p className="text-xs text-gray-400 truncate max-w-[200px]">{p.tagline}</p>
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-500">{p.category}</td>
                  <td className="py-3 px-4 text-xs text-gray-500">{p.sdgs || "—"}</td>
                  <td className="py-3 px-4">{p.featured && <Star size={14} className="text-yellow-500 fill-yellow-500" />}</td>
                  <td className="py-3 px-4 text-right">
                    <button onClick={() => { setEditing(p); setIsNew(false); }} className="p-1.5 text-gray-400 hover:text-primary"><Edit size={14} /></button>
                    {p.id && <button onClick={() => handleDelete(p.id!)} className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
