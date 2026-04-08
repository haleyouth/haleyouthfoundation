"use client";

import { Plus, Edit, Trash2 } from "lucide-react";

const team = [
  { name: "Dr. Lukman Enegi Ismaila", role: "Founder & Chairman", status: "Active" },
  { name: "Hamida", role: "Project Volunteer", status: "Active" },
  { name: "Hadiza", role: "Project Volunteer", status: "Active" },
  { name: "Shamsiyya", role: "Project Volunteer", status: "Active" },
  { name: "Fauwzziyyah", role: "Project Volunteer", status: "Active" },
];

export default function AdminTeamPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Team Members</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus size={16} /> Add Member
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.map((m) => (
          <div key={m.name} className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-lg">{m.name[0]}</span>
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">{m.name}</p>
                <p className="text-gray-500 text-xs">{m.role}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">{m.status}</span>
              <div className="flex gap-1">
                <button className="p-1.5 text-gray-400 hover:text-primary transition-colors"><Edit size={13} /></button>
                <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
