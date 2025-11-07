import React, { useEffect, useMemo, useState } from 'react';
import NavBar from './components/NavBar';
import Landing from './components/Landing';
import Products from './components/Products';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import AdminPanel from './components/AdminPanel';
import Auth from './components/Auth';

function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [authOpen, setAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleDark = () => setIsDark((d) => !d);

  const handleLoginClick = () => setAuthOpen(true);
  const handleLogout = () => setCurrentUser(null);
  const handleLogin = (user) => { setCurrentUser(user); setAuthOpen(false); };

  const demoUsers = useMemo(() => ([
    { id: 1, name: 'Alya Putri', email: 'alya@campus.ac.id', role: 'seller' },
    { id: 2, name: 'Raka Pratama', email: 'raka@campus.ac.id', role: 'buyer' },
    { id: 3, name: 'Admin Kampus', email: 'admin@campus.ac.id', role: 'admin' },
  ]), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-zinc-950 dark:to-zinc-950">
      <NavBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        toggleDark={toggleDark}
        currentUser={currentUser}
        onLoginClick={handleLoginClick}
        onLogout={handleLogout}
      />

      {activeTab === 'landing' && (
        <>
          <Landing onGetStarted={() => setActiveTab('dashboard')} />
          <Products currentUser={currentUser} />
        </>
      )}

      {activeTab === 'products' && <Products currentUser={currentUser} />}
      {activeTab === 'dashboard' && <Dashboard currentUser={currentUser} />}
      {activeTab === 'profile' && <Profile currentUser={currentUser} />}
      {activeTab === 'admin' && currentUser?.role === 'admin' && <AdminPanel users={demoUsers} />}

      <footer className="mt-16 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-zinc-500 flex items-center justify-between">
          <div>© {new Date().getFullYear()} ThriftCampus</div>
          <div className="flex gap-4">
            <a className="hover:text-emerald-700" href="#products">Produk</a>
            <button onClick={()=>setActiveTab('dashboard')} className="hover:text-emerald-700">Jual</button>
            <button onClick={()=>setActiveTab('profile')} className="hover:text-emerald-700">Profil</button>
          </div>
        </div>
      </footer>

      {authOpen && <Auth onClose={()=>setAuthOpen(false)} onLogin={handleLogin} />}
    </div>
  );
}

export default App;
