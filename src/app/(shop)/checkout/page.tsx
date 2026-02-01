'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/components/context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Checkout</h1>
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

  const handlePlaceOrder = () => {
    // Dummy checkout: just clear cart and redirect to success
    clearCart();
    router.push('/checkout/success');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Checkout</h1>
      <p className="mt-1 text-slate-600 dark:text-slate-400">
        Demo checkout — no payment required. Click &quot;Place order&quot; to see the success page.
      </p>

      <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 space-y-4">
        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Items ({items.length})</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-100 pt-2 border-t border-slate-200 dark:border-slate-700">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          onClick={handlePlaceOrder}
          className="rounded-lg bg-primary-600 px-6 py-3 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
        >
          Place order
        </button>
        <Link
          href="/cart"
          className="rounded-lg border border-slate-300 dark:border-slate-600 px-6 py-3 text-center text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          Back to cart
        </Link>
      </div>
    </div>
  );
}
