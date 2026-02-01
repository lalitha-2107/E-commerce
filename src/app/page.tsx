import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-semibold text-slate-900 dark:text-slate-100">Store</span>
          <Link
            href="/products"
            className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            Products
          </Link>
        </div>
      </header>
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 animate-fade-in">
          E-Commerce Platform
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-md animate-slide-up">
          A dummy e-commerce store built with Next.js & Tailwind — for portfolio showcase.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-sm font-medium text-white shadow hover:bg-primary-700 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
        Portfolio project — Next.js · Prisma · Stripe · Vercel
      </footer>
    </main>
  );
}
