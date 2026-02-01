import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-sm">
        <div className="w-14 h-14 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-7 h-7 text-green-600 dark:text-green-400"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
          Order placed
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Thank you! This is a demo — no real payment was processed.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-lg bg-primary-600 px-6 py-3 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
