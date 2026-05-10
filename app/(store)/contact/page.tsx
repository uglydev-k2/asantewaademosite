export default function ContactPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-2xl border bg-white p-6">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <form className="mt-4 space-y-3">
          <input placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input placeholder="Subject" />
          <textarea placeholder="Message" rows={5} />
          <button className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">Send message</button>
        </form>
      </section>
      <section className="space-y-4 rounded-2xl border bg-white p-6">
        <h2 className="text-xl font-semibold">Visit us</h2>
        <p className="text-sm text-slate-600">Accra, Ghana</p>
        <p className="text-sm text-slate-600">+233 XX XXX XXXX</p>
        <p className="text-sm text-slate-600">info@asantewaaImports.com</p>
        <iframe
          title="Accra map"
          src="https://maps.google.com/maps?q=accra%20ghana&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="h-60 w-full rounded-xl border"
        />
      </section>
    </div>
  );
}
