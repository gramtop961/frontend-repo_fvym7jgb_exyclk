import React, { useEffect, useMemo, useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

const SystemPasswordGate = ({ onUnlock }) => {
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const expected = useMemo(() => {
    const envPass = import.meta.env.VITE_APP_PASSWORD;
    return (envPass && String(envPass).trim()) || 'thriftcampus';
  }, []);

  useEffect(() => {
    // If already unlocked in this session/localStorage, notify parent
    const unlocked = localStorage.getItem('systemUnlocked') === '1';
    if (unlocked) onUnlock();
  }, [onUnlock]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === expected) {
      localStorage.setItem('systemUnlocked', '1');
      setError('');
      onUnlock();
    } else {
      setError('Kata sandi salah. Coba lagi.');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-emerald-50 to-white dark:from-zinc-950 dark:to-zinc-950 p-6">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur shadow-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-xl bg-emerald-700 dark:bg-emerald-600 grid place-items-center text-white">
            <Lock size={20} />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Masuk Sistem</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Masukkan kata sandi sistem untuk melanjutkan</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              placeholder="Kata sandi sistem"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute inset-y-0 right-2 my-auto p-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              aria-label={show ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white font-medium"
          >
            Masuk
          </button>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
            Hint: ganti VITE_APP_PASSWORD di environment untuk mengatur kata sandi. Default: "thriftcampus".
          </p>
        </form>
      </div>
    </div>
  );
};

export default SystemPasswordGate;
