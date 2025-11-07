import React from 'react';
import { Home, ShoppingBag, User, LogIn, LogOut, Sun, Moon } from 'lucide-react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const NavBar = ({ currentUser, activeTab, onTabChange, onOpenAuth, onLogout, theme, onToggleTheme }) => {
  const navItems = [
    { key: 'landing', label: 'Home', icon: Home },
    { key: 'products', label: 'Products', icon: ShoppingBag },
  ];

  if (currentUser?.role === 'seller') {
    navItems.push({ key: 'dashboard', label: 'Dashboard', icon: User });
  }
  if (currentUser?.role === 'admin') {
    navItems.push({ key: 'admin', label: 'Admin', icon: User });
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-white/70 dark:bg-neutral-900/70 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-violet-500 to-emerald-500" />
          <span className="text-lg font-semibold tracking-tight">ThriftCampus</span>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onTabChange(key)}
              className={classNames(
                'inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors',
                activeTab === key
                  ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                  : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
              )}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle theme"
            onClick={onToggleTheme}
            className="inline-flex items-center justify-center rounded-md p-2 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {currentUser ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-sm text-neutral-600 dark:text-neutral-300">
                {currentUser.name}
              </span>
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-2 rounded-md bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 px-3 py-2 text-sm"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="inline-flex items-center gap-2 rounded-md bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 px-3 py-2 text-sm"
            >
              <LogIn size={16} />
              Login
            </button>
          )}
        </div>
      </div>

      <div className="md:hidden px-4 pb-3 flex items-center gap-2 overflow-x-auto">
        {navItems.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onTabChange(key)}
            className={classNames(
              'px-3 py-1.5 rounded-full text-sm',
              activeTab === key
                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </header>
  );
};

export default NavBar;
