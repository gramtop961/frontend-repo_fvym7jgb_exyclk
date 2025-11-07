import React, { useEffect, useState } from 'react';
import { Heart, Search } from 'lucide-react';

const dummyProducts = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: [
    'Hoodie Uniqlo',
    'Denim Jacket',
    'Sepatu Converse',
    'Tote Bag Kanvas',
    'Kemeja Flanel',
    'Sweater Vintage',
  ][i % 6] + ' #' + (i + 1),
  price: 25000 + (i % 6) * 10000,
  campus: ['UI', 'ITB', 'UGM', 'UNAIR'][i % 4],
  image: `https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop`,
  seller: ['Alya', 'Raka', 'Dimas', 'Nayla'][i % 4],
}));

const SkeletonCard = () => (
  <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
    <div className="h-40 bg-zinc-200/60 dark:bg-zinc-800 animate-pulse" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-zinc-200/60 dark:bg-zinc-800 rounded w-3/4 animate-pulse" />
      <div className="h-4 bg-zinc-200/60 dark:bg-zinc-800 rounded w-1/2 animate-pulse" />
      <div className="h-8 bg-zinc-200/60 dark:bg-zinc-800 rounded animate-pulse" />
    </div>
  </div>
);

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const t = setTimeout(() => {
      setItems(dummyProducts);
      setLoading(false);
    }, 900);
    return () => clearTimeout(t);
  }, []);

  const filtered = items.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <section id="products" className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Produk Terbaru</h2>
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
          <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Cari produk..." className="w-full pl-9 pr-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100" />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          filtered.map(p => (
            <div key={p.id} className="group rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900">
              <div className="relative">
                <img src={p.image} alt={p.title} className="h-40 w-full object-cover" />
                <button className="absolute top-2 right-2 p-2 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur border border-zinc-200 dark:border-zinc-800 opacity-0 group-hover:opacity-100 transition">
                  <Heart size={16} className="text-emerald-700" />
                </button>
              </div>
              <div className="p-4">
                <div className="font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1">{p.title}</div>
                <div className="text-sm text-zinc-500">{p.campus} • {p.seller}</div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-emerald-700 dark:text-emerald-400 font-bold">Rp{p.price.toLocaleString('id-ID')}</div>
                  <button className="px-3 py-1.5 text-sm rounded-md bg-emerald-700 text-white hover:bg-emerald-800">Detail</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Products;
