'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products, categories } from '@/lib/mock-products';
import { cn } from '@/lib/utils';

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = useMemo(() => {
    let list = category === 'all' ? products : products.filter((p) => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, category]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Products</h1>
      <p className="mt-1 text-slate-600 dark:text-slate-400">
        Browse our catalog. Add items to cart to try the checkout flow.
      </p>

      {/* Search + filters */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setCategory(cat.slug)}
              className={cn(
                'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                category === cat.slug
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="aspect-square relative bg-slate-100 dark:bg-slate-700">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              {product.featured && (
                <span className="absolute top-2 left-2 rounded bg-primary-600 px-2 py-0.5 text-xs font-medium text-white">
                  Featured
                </span>
              )}
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {product.name}
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                {product.description}
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-slate-500 dark:text-slate-400">
          No products match your search.
        </p>
      )}
    </div>
  );
}
