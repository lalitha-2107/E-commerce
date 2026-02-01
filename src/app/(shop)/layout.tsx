import Link from 'next/link';
import { CartIcon } from '@/components/layout/CartIcon';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

/** Shop layout: header with nav, cart, dark mode — no auth for portfolio showcase */
export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold text-slate-900 dark:text-slate-100">
            Store
          </Link>
          <nav className="flex items-center gap-2">
            <Link
              href="/products"
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Products
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <CartIcon />
              Cart
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
