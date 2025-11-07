import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import ImageUpload from './ImageUpload';

const Dashboard = ({ currentUser }) => {
  const [myProducts, setMyProducts] = useState([
    { id: 101, title: 'Hoodie Uniqlo Navy', price: 45000, image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop' },
  ]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);

  if (!currentUser || (currentUser.role !== 'seller' && currentUser.role !== 'admin')) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 text-zinc-600 dark:text-zinc-300">
        Kamu perlu masuk sebagai penjual untuk mengakses dashboard.
      </div>
    );
  }

  const addProduct = (e) => {
    e.preventDefault();
    if (!title || !price) return;
    const finalImage = imageUrl || URL.createObjectURL(imageFile || new Blob());
    setMyProducts(prev => [{ id: Date.now(), title, price: Number(price), image: finalImage }, ...prev]);
    setTitle('');
    setPrice('');
    setImageUrl('');
    setImageFile(null);
  };

  const removeProduct = (id) => setMyProducts(prev => prev.filter(p => p.id !== id));

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">Dashboard Penjual</h2>
      <form onSubmit={addProduct} className="grid gap-3 mb-6">
        <div className="grid sm:grid-cols-3 gap-3">
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Nama produk" className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
          <input type="number" value={price} onChange={e=>setPrice(e.target.value)} placeholder="Harga" className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
          <input value={imageUrl} onChange={e=>setImageUrl(e.target.value)} placeholder="Atau tempel URL gambar" className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
        </div>
        <div className="flex items-center justify-between gap-3">
          <ImageUpload onChange={(file, url)=>{ setImageFile(file); setImageUrl(url); }} />
          <button className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800"><Plus size={16}/> Tambah</button>
        </div>
      </form>

      <div className="grid gap-3">
        {myProducts.map(p => (
          <div key={p.id} className="flex items-center justify-between p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <div className="flex items-center gap-3">
              <img src={p.image} alt={p.title} className="h-14 w-14 rounded object-cover border border-zinc-200 dark:border-zinc-800"/>
              <div>
                <div className="font-medium text-zinc-900 dark:text-zinc-100">{p.title}</div>
                <div className="text-sm text-zinc-500">Rp{p.price.toLocaleString('id-ID')}</div>
              </div>
            </div>
            <button onClick={()=>removeProduct(p.id)} className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-red-600">
              <Trash2 size={16}/>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
