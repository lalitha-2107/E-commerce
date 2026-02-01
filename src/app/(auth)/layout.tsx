/** Auth layout: centered card-style layout for login/signup */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-100 dark:bg-slate-900">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
