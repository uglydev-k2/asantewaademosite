export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto max-w-md rounded-2xl border bg-white p-6">
      <h1 className="text-2xl font-semibold">Forgot password</h1>
      <p className="mt-1 text-sm text-slate-500">Enter your email and we will send a reset link.</p>
      <form className="mt-4 space-y-3">
        <input type="email" required placeholder="you@example.com" className="w-full" />
        <button className="w-full rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">
          Send reset link
        </button>
      </form>
    </div>
  );
}
