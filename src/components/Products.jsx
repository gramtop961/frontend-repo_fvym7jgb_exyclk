import React, { useEffect, useMemo, useState } from 'react';
import FiltersBar from './FiltersBar';
import ProductCard from './ProductCard';
import Chat from './Chat';

const baseProducts = Array.from({ length: 16 }).map((_, i) => ({
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
    <div className="h-44 bg-zinc-200/60 dark:bg-zinc-800 animate-pulse" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-zinc-200/60 dark:bg-zinc-800 rounded w-3/4 animate-pulse" />
      <div className="h-4 bg-zinc-200/60 dark:bg-zinc-800 rounded w-1/2 animate-pulse" />
      <div className="h-8 bg-zinc-200/60 dark:bg-zinc-800 rounded animate-pulse" />
    </div>
  </div>
);

const Products = ({ currentUser }) => {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [selectedCampuses, setSelectedCampuses] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [chatProduct, setChatProduct] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setItems(baseProducts);
      setLoading(false);
    }, 900);
    return () => clearTimeout(t);
  }, []);

  const toggleCampus = (c) => {
    setSelectedCampuses((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const filteredSorted = useMemo(() => {
    let data = items.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()));
    if (selectedCampuses.length) {
      data = data.filter((p) => selectedCampuses.includes(p.campus));
    }
    switch (sortBy) {
      case 'price-asc':
        data = [...data].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        data = [...data].sort((a, b) => b.price - a.price);
        break;
      case 'title-asc':
        data = [...data].sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        data = [...data].sort((a, b) => b.id - a.id);
    }
    return data;
  }, [items, query, selectedCampuses, sortBy]);

  return (
    <section id="products" className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between gap-4 mb-2">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Produk Terbaru</h2>
      </div>

      <FiltersBar
        query={query}
        setQuery={setQuery}
        selectedCampuses={selectedCampuses}
        toggleCampus={toggleCampus}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          filteredSorted.map((p) => (
            <ProductCard key={p.id} product={p} onChat={() => setChatProduct(p)} />
          ))
        )}
      </div>

      {chatProduct && (
        <Chat
          currentUser={currentUser}
          peerName={chatProduct.seller}
          onClose={() => setChatProduct(null)}
        />
      )}
    </section>
  );
};

export default Products;
