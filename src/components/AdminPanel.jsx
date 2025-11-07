import React from 'react';
import { ShieldCheck, UserMinus, CheckCircle2 } from 'lucide-react';

const AdminPanel = ({ users = [] }) => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 mb-6">
        <ShieldCheck className="text-emerald-700" />
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Administrator Panel</h2>
      </div>
      <div className="grid gap-3">
        {users.map(u => (
          <div key={u.id} className="flex items-center justify-between p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <div>
              <div className="font-medium text-zinc-900 dark:text-zinc-100">{u.name}</div>
              <div className="text-sm text-zinc-500">{u.email} • {u.role}</div>
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-emerald-700/20 text-emerald-800 dark:text-emerald-300"><CheckCircle2 size={16}/> Verify</button>
              <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700"><UserMinus size={16}/> Remove</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminPanel;