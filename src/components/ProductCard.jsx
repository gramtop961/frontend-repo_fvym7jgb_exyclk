import React from 'react';
import { Heart, MessageSquare } from 'lucide-react';

const ProductCard = ({ product, onChat }) => {
  return (
    <div className="group rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900">
      <div className="relative">
        <img src={product.image} alt={product.title} className="h-44 w-full object-cover" />
        <button className="absolute top-2 right-2 p-2 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur border border-zinc-200 dark:border-zinc-800 opacity-0 group-hover:opacity-100 transition">
          <Heart size={16} className="text-emerald-700" />
        </button>
      </div>
      <div className="p-4">
        <div className="font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1">{product.title}</div>
        <div className="text-sm text-zinc-500">{product.campus} • {product.seller}</div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-emerald-700 dark:text-emerald-400 font-bold">Rp{product.price.toLocaleString('id-ID')}</div>
          <button onClick={()=>onChat?.(product)} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md bg-emerald-700 text-white hover:bg-emerald-800"><MessageSquare size={14}/> Chat</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
