"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchAll, addItem, updateItem, deleteItem } from "@/lib/admin-crud";
import { Plus, Edit, Trash2, Save, X, RefreshCw, Loader2 } from "lucide-react";

interface TeamMember { id?: string; name: string; role: string; bio: string; photo: string; status: string; }
const emptyMember: TeamMember = { name: "", role: "", bio: "", photo: "", status: "Active" };

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAll<TeamMember>("admin_team");
      if (data.length === 0) {
        setMembers([
          { name: "Chairman", role: "Founder & Chairman", bio: "", photo: "", status: "Active" },
          { name: "Hamida", role: "Project Volunteer", bio: "", photo: "", status: "Active" },
          { name: "Hadiza", role: "Project Volunteer", bio: "", photo: "", status: "Active" },
          { name: "Shamsiyya", role: "Project Volunteer", bio: "", photo: "", status: "Active" },
          { name: "Fauwzziyyah", role: "Project Volunteer", bio: "", photo: "", status: "Active" },
        ]);
      } else {
        setMembers(data);
      }
    } catch { setMembers([]); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const data = { ...editing } as Record<string, unknown>; delete data.id;
      if (isNew) await addItem("admin_team", data);
      else if (editing.id) await updateItem("admin_team", editing.id, data);
      setEditing(null); setIsNew(false); load();
    } catch (err) { alert("Failed: " + err); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => { if (confirm("Remove this member?")) { await deleteItem("admin_team", id); load(); } };
  const inputClass = "w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-lg font-bold text-gray-900">Team Members</h2>
        <div className="flex gap-2">
          <button onClick={load} disabled={loading} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 bg-white rounded-lg border border-gray-200 disabled:opacity-50"><RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh</button>
          <button onClick={() => { setEditing({ ...emptyMember }); setIsNew(true); }} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium"><Plus size={16} /> Add Member</button>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center p-4 pt-20 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-900">{isNew ? "Add Member" : "Edit Member"}</h3>
              <button onClick={() => { setEditing(null); setIsNew(false); }} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-medium text-gray-700 mb-1">Name *</label><input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className={inputClass} /></div>
                <div><label className="block text-xs font-medium text-gray-700 mb-1">Role *</label><input value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })} className={inputClass} placeholder="e.g. Program Director" /></div>
              </div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Photo URL</label><input value={editing.photo} onChange={(e) => setEditing({ ...editing, photo: e.target.value })} className={inputClass} placeholder="/images/team/..." /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Bio</label><textarea value={editing.bio} onChange={(e) => setEditing({ ...editing, bio: e.target.value })} rows={3} className={`${inputClass} resize-none`} placeholder="Short biography..." /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })} className={inputClass}>
                  <option>Active</option><option>Inactive</option>
                </select>
              </div>
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((m) => (
            <div key={m.id || m.name} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold text-lg">{m.name[0]}</span>
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">{m.name}</p>
                  <p className="text-gray-500 text-xs truncate">{m.role}</p>
                </div>
              </div>
              {m.bio && <p className="text-gray-500 text-xs mb-3 line-clamp-2">{m.bio}</p>}
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${m.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{m.status}</span>
                <div className="flex gap-1">
                  <button onClick={() => { setEditing(m); setIsNew(false); }} className="p-1.5 text-gray-400 hover:text-primary"><Edit size={13} /></button>
                  {m.id && <button onClick={() => handleDelete(m.id!)} className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 size={13} /></button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
