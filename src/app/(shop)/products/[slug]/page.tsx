'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug } from '@/lib/mock-products';
import { useCart } from '@/components/context/CartContext';
import { useState } from 'react';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-slate-600 dark:text-slate-400">Product not found.</p>
        <Link href="/products" className="mt-4 inline-block text-primary-600 dark:text-primary-400 hover:underline">
          Back to products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/products"
        className="inline-flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 mb-6"
      >
        ← Back to products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-700">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {product.name}
          </h1>
          <p className="mt-2 text-2xl font-semibold text-primary-600 dark:text-primary-400">
            ${product.price.toFixed(2)}
          </p>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            {product.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">Quantity</span>
              <input
                type="number"
                min={1}
                max={99}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="w-16 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-2 py-1 text-center text-slate-900 dark:text-slate-100"
              />
            </label>
            <button
              onClick={handleAddToCart}
              className="rounded-lg bg-primary-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-700 transition-colors disabled:opacity-70"
            >
              {added ? 'Added to cart!' : 'Add to cart'}
            </button>
            <Link
              href="/cart"
              className="rounded-lg border border-slate-300 dark:border-slate-600 px-6 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              View cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
