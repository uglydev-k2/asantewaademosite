export default function OrderTrackingPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold">Track My Order</h1>
      <section className="rounded-2xl border bg-white p-6">
        <div className="grid gap-3 md:grid-cols-2">
          <input placeholder="Order number" />
          <input type="email" placeholder="Email" />
        </div>
        <button className="mt-3 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">
          Track order
        </button>
      </section>
      <section className="rounded-2xl border bg-white p-6">
        <h2 className="font-semibold">Order status timeline</h2>
        <ol className="mt-3 space-y-2 text-sm text-slate-600">
          <li>Placed</li>
          <li>Processing</li>
          <li>Shipped</li>
          <li>Delivered</li>
        </ol>
      </section>
    </div>
  );
}
