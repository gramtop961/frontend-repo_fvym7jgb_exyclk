import React, { useState } from 'react';

const dummyUsers = [
  { id: 1, name: 'Alya Putri', email: 'alya@campus.ac.id', role: 'seller' },
  { id: 2, name: 'Raka Pratama', email: 'raka@campus.ac.id', role: 'buyer' },
  { id: 3, name: 'Admin Kampus', email: 'admin@campus.ac.id', role: 'admin' },
];

const Auth = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = dummyUsers.find(u => u.email === email.trim());
    if (user) onLogin(user);
    else alert('User tidak ditemukan. Coba: alya@campus.ac.id, raka@campus.ac.id, admin@campus.ac.id');
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
        <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Masuk</div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Gunakan email kampus untuk masuk cepat.</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email@campus.ac.id" className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
          <button className="w-full px-4 py-2 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800">Masuk</button>
        </form>
        <button onClick={onClose} className="mt-3 w-full text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">Batal</button>
        <div className="mt-4 text-xs text-zinc-500">Contoh akun: alya@campus.ac.id (seller), raka@campus.ac.id (buyer), admin@campus.ac.id (admin)</div>
      </div>
    </div>
  );
};

export default Auth;