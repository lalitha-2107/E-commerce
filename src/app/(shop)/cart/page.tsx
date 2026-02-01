'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/components/context/CartContext';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Your cart</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Your cart is empty.</p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-lg bg-primary-600 px-6 py-3 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Your cart</h1>
      <p className="mt-1 text-slate-600 dark:text-slate-400">
        {totalItems} {totalItems === 1 ? 'item' : 'items'}
      </p>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex gap-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4"
            >
              <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${product.slug}`}
                  className="font-medium text-slate-900 dark:text-slate-100 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {product.name}
                </Link>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                  ${product.price.toFixed(2)} each
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={quantity}
                    onChange={(e) =>
                      updateQuantity(product.id, Math.max(1, parseInt(e.target.value, 10) || 1))
                    }
                    className="w-14 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-2 py-1 text-center text-slate-900 dark:text-slate-100 text-sm"
                  />
                  <button
                    onClick={() => removeItem(product.id)}
                    className="text-sm text-red-600 dark:text-red-400 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-right font-medium text-slate-900 dark:text-slate-100">
                ${(product.price * quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 sticky top-24">
            <h2 className="font-semibold text-slate-900 dark:text-slate-100">Order summary</h2>
            <div className="mt-4 flex justify-between text-sm text-slate-600 dark:text-slate-400">
              <span>Subtotal ({totalItems} items)</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="mt-2 flex justify-between font-semibold text-slate-900 dark:text-slate-100">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              className="mt-6 block w-full rounded-lg bg-primary-600 py-3 text-center text-sm font-medium text-white hover:bg-primary-700 transition-colors"
            >
              Proceed to checkout
            </Link>
            <Link
              href="/products"
              className="mt-3 block w-full text-center text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
