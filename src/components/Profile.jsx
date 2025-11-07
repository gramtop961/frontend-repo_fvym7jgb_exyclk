import React from 'react';

const Profile = ({ currentUser }) => {
  if (!currentUser) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 text-zinc-600 dark:text-zinc-300">
        Masuk untuk melihat profilmu.
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">Profil</h2>
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
          <div className="text-sm text-zinc-500">Nama</div>
          <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{currentUser.name}</div>
          <div className="mt-4 text-sm text-zinc-500">Email</div>
          <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{currentUser.email}</div>
          <div className="mt-4 text-sm text-zinc-500">Peran</div>
          <div className="inline-flex px-2.5 py-1 rounded-md text-xs bg-emerald-700/10 text-emerald-800 dark:text-emerald-300 border border-emerald-700/20 capitalize">{currentUser.role}</div>
        </div>
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
          <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Statistik</div>
          <div className="grid grid-cols-3 gap-3">
            {[
              {k:'Terjual', v: 12},
              {k:'Favorit', v: 34},
              {k:'Ulasan', v: 9},
            ].map(s => (
              <div key={s.k} className="text-center rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
                <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{s.v}</div>
                <div className="text-xs text-zinc-500">{s.k}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;