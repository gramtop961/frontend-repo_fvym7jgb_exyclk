import React from 'react';
import { Home, ShoppingBag, User, Settings, Moon, Sun, LogIn, LogOut, Shield } from 'lucide-react';

const NavBar = ({ activeTab, setActiveTab, isDark, toggleDark, currentUser, onLoginClick, onLogout }) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-zinc-900/70 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div onClick={() => setActiveTab('landing')} className="flex items-center gap-3 cursor-pointer">
          <div className="h-9 w-9 rounded-lg bg-emerald-700 dark:bg-emerald-600 grid place-items-center text-white font-bold">TC</div>
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">ThriftCampus</span>
        </div>
        <nav className="hidden sm:flex items-center gap-1">
          <button onClick={() => setActiveTab('landing')} className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${activeTab==='landing' ? 'bg-emerald-700 text-white' : 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
            <Home size={18}/> <span>Home</span>
          </button>
          <button onClick={() => setActiveTab('products')} className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${activeTab==='products' ? 'bg-emerald-700 text-white' : 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
            <ShoppingBag size={18}/> <span>Products</span>
          </button>
          <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${activeTab==='dashboard' ? 'bg-emerald-700 text-white' : 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
            <Settings size={18}/> <span>Seller</span>
          </button>
          <button onClick={() => setActiveTab('profile')} className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${activeTab==='profile' ? 'bg-emerald-700 text-white' : 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
            <User size={18}/> <span>Profile</span>
          </button>
          {currentUser?.role === 'admin' && (
            <button onClick={() => setActiveTab('admin')} className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${activeTab==='admin' ? 'bg-emerald-700 text-white' : 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <Shield size={18}/> <span>Admin</span>
            </button>
          )}
        </nav>
        <div className="flex items-center gap-2">
          <button aria-label="Toggle dark mode" onClick={toggleDark} className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200">
            {isDark ? <Sun size={18}/> : <Moon size={18}/>} 
          </button>
          {currentUser ? (
            <button onClick={onLogout} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
              <LogOut size={16}/> Logout
            </button>
          ) : (
            <button onClick={onLoginClick} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm bg-emerald-700 text-white hover:bg-emerald-800">
              <LogIn size={16}/> Login
            </button>
          )}
        </div>
      </div>
      {/* Mobile nav */}
      <div className="sm:hidden border-t border-zinc-200 dark:border-zinc-800 px-2 py-2 grid grid-cols-4 gap-2">
        {[
          {id:'landing', label:'Home', icon: Home},
          {id:'products', label:'Products', icon: ShoppingBag},
          {id:'dashboard', label:'Seller', icon: Settings},
          {id:'profile', label:'Profile', icon: User},
        ].map(item => (
          <button key={item.id} onClick={() => setActiveTab(item.id)} className={`py-2 rounded-md text-xs flex items-center justify-center gap-2 ${activeTab===item.id ? 'bg-emerald-700 text-white' : 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
            <item.icon size={16}/> {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};

export default NavBar;
