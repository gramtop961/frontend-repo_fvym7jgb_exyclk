import React, { useEffect, useMemo, useState } from 'react';
import NavBar from './components/NavBar';
import AuthModal from './components/AuthModal';
import { Landing, Products, Dashboard, Footer } from './components/Sections';

const THEME_KEY = 'theme';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [authOpen, setAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = localStorage.getItem(THEME_KEY);
    return saved || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const onToggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <NavBar
        currentUser={currentUser}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenAuth={() => setAuthOpen(true)}
        onLogout={handleLogout}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

      {activeTab === 'landing' && <Landing />}
      {activeTab === 'products' && <Products />}
      {activeTab === 'dashboard' && <Dashboard currentUser={currentUser} />}

      <Footer />

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}
