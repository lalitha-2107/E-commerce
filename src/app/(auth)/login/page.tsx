import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
      <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Sign in</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Auth forms will go here (NextAuth).
      </p>
      <Link
        href="/"
        className="mt-4 inline-block text-sm text-primary-600 dark:text-primary-400 hover:underline"
      >
        ← Back to home
      </Link>
    </div>
  );
}
