import React, { useEffect, useMemo, useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

const emailRegex = /.+@.+\..+/;

function readUsers() {
  try {
    const raw = localStorage.getItem('tc_users');
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) return arr;
    return [];
  } catch (e) {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem('tc_users', JSON.stringify(users));
}

export default function AuthModal({ open, onClose, onLogin }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setError('');
    setPassword('');
  }, [open]);

  const canSubmit = useMemo(() => {
    if (loading) return false;
    if (!emailRegex.test(email)) return false;
    if (password.length < 6) return false;
    if (mode === 'register' && name.trim().length < 2) return false;
    return true;
  }, [loading, email, password, name, mode]);

  const handleRegister = () => {
    setError('');
    setLoading(true);
    setTimeout(() => {
      const users = readUsers();
      const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        setError('An account with this email already exists.');
        setLoading(false);
        return;
      }
      const newUser = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim(),
        role: 'buyer',
      };
      users.push({ ...newUser, password });
      writeUsers(users);
      setLoading(false);
      onLogin(newUser);
      onClose();
    }, 600);
  };

  const handleLogin = () => {
    setError('');
    setLoading(true);
    setTimeout(() => {
      const users = readUsers();
      const found = users.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (!found) {
        setError('Invalid email or password.');
        setLoading(false);
        return;
      }
      const { password: _pw, ...safe } = found;
      setLoading(false);
      onLogin(safe);
      onClose();
    }, 600);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    if (mode === 'register') handleRegister();
    else handleLogin();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex gap-2">
            <button
              onClick={() => setMode('login')}
              className={`px-3 py-1.5 rounded-md text-sm ${mode === 'login' ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900' : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
            >
              Login
            </button>
            <button
              onClick={() => setMode('register')}
              className={`px-3 py-1.5 rounded-md text-sm ${mode === 'register' ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900' : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
            >
              Register
            </button>
          </div>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={submit} className="px-5 py-4 space-y-3">
          {mode === 'register' && (
            <div>
              <label className="block text-sm mb-1 text-neutral-700 dark:text-neutral-300">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                placeholder="Your name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm mb-1 text-neutral-700 dark:text-neutral-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-neutral-700 dark:text-neutral-300">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                placeholder="At least 6 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full inline-flex justify-center rounded-md bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 px-3 py-2 text-sm disabled:opacity-50"
          >
            {loading ? 'Please wait…' : mode === 'login' ? 'Login' : 'Create account'}
          </button>
        </form>

        <div className="px-5 pb-4 text-center text-xs text-neutral-500">
          Demo only: accounts are stored in your browser. For real auth, connect to the backend.
        </div>
      </div>
    </div>
  );
}
