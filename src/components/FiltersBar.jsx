import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

const campuses = ['UI', 'ITB', 'UGM', 'UNAIR'];

const FiltersBar = ({ query, setQuery, selectedCampuses, toggleCampus, sortBy, setSortBy }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
        <input
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          placeholder="Cari produk..."
          className="w-full pl-9 pr-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
        />
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          {campuses.map(c => {
            const active = selectedCampuses.includes(c);
            return (
              <button
                key={c}
                onClick={()=>toggleCampus(c)}
                className={`px-3 py-1.5 rounded-full text-sm border transition ${active ? 'bg-emerald-700 text-white border-emerald-700' : 'border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
              >{c}</button>
            );
          })}
        </div>
        <div className="relative">
          <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
          <select
            value={sortBy}
            onChange={e=>setSortBy(e.target.value)}
            className="appearance-none pl-9 pr-8 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100"
          >
            <option value="newest">Terbaru</option>
            <option value="price-asc">Harga: Rendah ke Tinggi</option>
            <option value="price-desc">Harga: Tinggi ke Rendah</option>
            <option value="title-asc">Nama: A-Z</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FiltersBar;
