import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
      <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Create account</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Signup form will go here.
      </p>
      <Link
        href="/login"
        className="mt-4 inline-block text-sm text-primary-600 dark:text-primary-400 hover:underline"
      >
        Already have an account? Sign in
      </Link>
    </div>
  );
}
