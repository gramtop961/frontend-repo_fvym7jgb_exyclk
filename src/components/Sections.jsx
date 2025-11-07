import React from 'react';
import Spline from '@splinetool/react-spline';

export const Landing = () => {
  return (
    <section className="relative min-h-[60vh] grid place-items-center overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/8n9zH9-PlaceholderScene/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto text-center p-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Buy & sell pre-loved campus goods</h1>
        <p className="mt-3 text-neutral-600 dark:text-neutral-300">Discover deals from fellow students. Safe, simple, sustainable.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <a href="#products" className="rounded-md bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 px-4 py-2 text-sm">Browse products</a>
          <a href="#dashboard" className="rounded-md border border-neutral-300 dark:border-neutral-700 px-4 py-2 text-sm">Start selling</a>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white dark:from-neutral-950 via-transparent" />
    </section>
  );
};

export const Products = () => {
  const items = [
    { id: 1, title: 'Graphing Calculator', price: 35, condition: 'Good' },
    { id: 2, title: 'Textbook: Linear Algebra', price: 18, condition: 'Like New' },
    { id: 3, title: 'Dorm Lamp', price: 12, condition: 'Good' },
    { id: 4, title: 'iPad (2018)', price: 140, condition: 'Fair' },
  ];

  return (
    <section id="products" className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6">Popular items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {items.map(item => (
          <div key={item.id} className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 hover:shadow-md transition-shadow">
            <div className="aspect-video rounded-md bg-neutral-100 dark:bg-neutral-800 mb-3" />
            <div className="flex items-start justify-between">
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="text-xs text-neutral-500">{item.condition}</div>
              </div>
              <div className="font-semibold">${item.price}</div>
            </div>
            <button className="mt-3 w-full rounded-md bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 px-3 py-2 text-sm">Add to cart</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export const Dashboard = ({ currentUser }) => {
  return (
    <section id="dashboard" className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-3">Seller dashboard</h2>
      {currentUser ? (
        <p className="text-neutral-600 dark:text-neutral-300">Welcome back, {currentUser.name}. Manage your listings and track messages from buyers.</p>
      ) : (
        <p className="text-neutral-600 dark:text-neutral-300">Login to access seller tools.</p>
      )}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
          <div className="text-sm text-neutral-500">Active listings</div>
          <div className="text-3xl font-bold">4</div>
        </div>
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
          <div className="text-sm text-neutral-500">This month sales</div>
          <div className="text-3xl font-bold">$212</div>
        </div>
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
          <div className="text-sm text-neutral-500">Messages</div>
          <div className="text-3xl font-bold">7</div>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => (
  <footer className="mt-14 border-t border-neutral-200 dark:border-neutral-800">
    <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-neutral-500">
      © {new Date().getFullYear()} ThriftCampus. Built for students, by students.
    </div>
  </footer>
);
