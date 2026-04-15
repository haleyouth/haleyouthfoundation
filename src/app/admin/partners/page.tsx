"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { fetchAll, addItem, updateItem, deleteItem } from "@/lib/admin-crud";
import { PARTNERS } from "@/lib/constants";
import { Plus, Edit, Trash2, Save, X, RefreshCw, Loader2, ExternalLink } from "lucide-react";

interface Partner { id?: string; name: string; logo: string; tier: string; website: string; description: string; }
const emptyPartner: Partner = { name: "", logo: "", tier: "program", website: "", description: "" };
const tiers = ["strategic", "program", "knowledge", "support"];

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partner | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAll<Partner>("admin_partners");
      setPartners(data.length > 0 ? data : PARTNERS.map((p) => ({ ...emptyPartner, name: p.name, logo: p.logo, tier: p.tier, website: p.website || "", description: p.description })));
    } catch { setPartners([]); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const data = { ...editing } as Record<string, unknown>; delete data.id;
      if (isNew) await addItem("admin_partners", data);
      else if (editing.id) await updateItem("admin_partners", editing.id, data);
      setEditing(null); setIsNew(false); load();
    } catch (err) { alert("Failed: " + err); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => { if (confirm("Delete this partner?")) { await deleteItem("admin_partners", id); load(); } };
  const inputClass = "w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";
  const tierColor: Record<string, string> = { strategic: "bg-blue-100 text-blue-700", program: "bg-green-100 text-green-700", knowledge: "bg-purple-100 text-purple-700", support: "bg-orange-100 text-orange-700" };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-lg font-bold text-gray-900">Partners</h2>
        <div className="flex gap-2">
          <button onClick={load} disabled={loading} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 bg-white rounded-lg border border-gray-200 disabled:opacity-50"><RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh</button>
          <button onClick={() => { setEditing({ ...emptyPartner }); setIsNew(true); }} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium"><Plus size={16} /> Add Partner</button>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center p-4 pt-20 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-900">{isNew ? "Add Partner" : "Edit Partner"}</h3>
              <button onClick={() => { setEditing(null); setIsNew(false); }} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Name *</label><input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className={inputClass} /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Logo URL</label><input value={editing.logo} onChange={(e) => setEditing({ ...editing, logo: e.target.value })} className={inputClass} placeholder="/images/partners/..." /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Tier</label><select value={editing.tier} onChange={(e) => setEditing({ ...editing, tier: e.target.value })} className={inputClass}>{tiers.map((t) => <option key={t} value={t} className="capitalize">{t}</option>)}</select></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Website</label><input value={editing.website} onChange={(e) => setEditing({ ...editing, website: e.target.value })} className={inputClass} placeholder="https://..." /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Description</label><textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={2} className={`${inputClass} resize-none`} /></div>
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <button onClick={() => { setEditing(null); setIsNew(false); }} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">Cancel</button>
              <button onClick={handleSave} disabled={saving || !editing.name} className="flex items-center gap-2 px-5 py-2 bg-primary text-white text-sm font-medium rounded-lg disabled:opacity-50">{saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-xl p-12 text-center"><Loader2 size={24} className="animate-spin text-primary mx-auto" /></div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full text-sm min-w-[500px]">
            <thead className="bg-gray-50 border-b"><tr>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Logo</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Name</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Tier</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Website</th>
              <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
            </tr></thead>
            <tbody>
              {partners.map((p) => (
                <tr key={p.id || p.name} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2 px-4">{p.logo && <Image src={p.logo} alt={p.name} width={60} height={30} className="object-contain h-8 w-auto" />}</td>
                  <td className="py-2 px-4 font-medium text-gray-900">{p.name}</td>
                  <td className="py-2 px-4"><span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${tierColor[p.tier] || "bg-gray-100 text-gray-700"}`}>{p.tier}</span></td>
                  <td className="py-2 px-4">{p.website ? <a href={p.website} target="_blank" rel="noopener noreferrer" className="text-primary text-xs flex items-center gap-1 hover:underline">Link <ExternalLink size={10} /></a> : <span className="text-gray-400 text-xs">—</span>}</td>
                  <td className="py-2 px-4 text-right">
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
