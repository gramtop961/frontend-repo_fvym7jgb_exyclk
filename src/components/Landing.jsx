import React from 'react';
import { Rocket, Star } from 'lucide-react';

const Landing = ({ onGetStarted }) => {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-200/40 via-transparent to-transparent dark:from-emerald-900/20 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              Jual-Beli Thrift di Kampus Lebih Mudah
            </h1>
            <p className="mt-4 text-zinc-600 dark:text-zinc-300">
              ThriftCampus menghubungkan penjual dan pembeli barang bekas berkualitas di lingkungan kampus. Cepat, aman, dan ramah untuk mahasiswa.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={onGetStarted} className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800">
                <Rocket size={18}/> Mulai Jual
              </button>
              <a href="#products" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-emerald-700 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
                <Star size={18}/> Jelajahi Produk
              </a>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                {k:'Cepat', v:'List produk dalam hitungan detik'},
                {k:'Aman', v:'Verifikasi kampus dan chat privat'},
                {k:'Hemat', v:'Barang berkualitas harga bersahabat'},
              ].map((i) => (
                <div key={i.k} className="rounded-lg p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100">{i.k}</div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">{i.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="aspect-[4/3] rounded-xl overflow-hidden border border-emerald-700/20 bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-zinc-900 grid place-items-center">
            <div className="text-center p-6">
              <div className="text-emerald-800 dark:text-emerald-300 text-6xl font-black">TC</div>
              <p className="mt-2 text-zinc-600 dark:text-zinc-300 max-w-sm">Royal green aesthetic untuk generasi kampus. Minimal, cepat, dan fokus pada barang.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
