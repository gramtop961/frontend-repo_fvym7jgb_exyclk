import React, { useMemo, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

// Simple email validator
const isEmail = (v) => /.+@.+\..+/.test(v);

const readUsers = () => {
  try {
    const raw = localStorage.getItem('tc_users');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeUsers = (users) => {
  localStorage.setItem('tc_users', JSON.stringify(users));
};

const AuthModal = ({ onClose, onLogin }) => {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const canSubmit = useMemo(() => {
    if (mode === 'register') return name.trim() && isEmail(email) && password.length >= 6;
    return isEmail(email) && password.length >= 1;
  }, [mode, name, email, password]);

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    const users = readUsers();
    if (!isEmail(email)) return setError('Masukkan email yang valid.');
    if (password.length < 6) return setError('Kata sandi minimal 6 karakter.');
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return setError('Email sudah terdaftar.');
    }
    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      password, // For demo only; do NOT store plain text in production
      role: 'buyer',
    };
    const updated = [...users, newUser];
    writeUsers(updated);
    onLogin({ id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    const users = readUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user || user.password !== password) {
      return setError('Email atau kata sandi salah.');
    }
    onLogin({ id: user.id, name: user.name, email: user.email, role: user.role });
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2 p-1 rounded-lg bg-zinc-100 dark:bg-zinc-800">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`px-3 py-1.5 rounded-md text-sm ${mode==='login' ? 'bg-white dark:bg-zinc-900 shadow text-zinc-900 dark:text-zinc-100' : 'text-zinc-600 dark:text-zinc-300'}`}
            >Masuk</button>
            <button
              onClick={() => { setMode('register'); setError(''); }}
              className={`px-3 py-1.5 rounded-md text-sm ${mode==='register' ? 'bg-white dark:bg-zinc-900 shadow text-zinc-900 dark:text-zinc-100' : 'text-zinc-600 dark:text-zinc-300'}`}
            >Daftar</button>
          </div>
          <button onClick={onClose} className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">Tutup</button>
        </div>

        {mode === 'register' ? (
          <form onSubmit={handleRegister} className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs text-zinc-500">Nama Lengkap</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Anda"
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-zinc-500">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@campus.ac.id"
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-zinc-500">Kata Sandi</label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 pr-10"
                />
                <button type="button" onClick={() => setShow(s => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-zinc-600 dark:text-zinc-400">
                  {show ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>
            </div>
            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
            <button disabled={!canSubmit} className="w-full px-4 py-2 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 disabled:opacity-50">Daftar</button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs text-zinc-500">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@campus.ac.id"
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-zinc-500">Kata Sandi</label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Kata sandi"
                  className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 pr-10"
                />
                <button type="button" onClick={() => setShow(s => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-zinc-600 dark:text-zinc-400">
                  {show ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>
            </div>
            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
            <button disabled={!canSubmit} className="w-full px-4 py-2 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 disabled:opacity-50">Masuk</button>
          </form>
        )}
        <p className="mt-4 text-xs text-zinc-500">Catatan: Data akun disimpan secara lokal di browser Anda (demo).</p>
      </div>
    </div>
  );
};

export default AuthModal;
