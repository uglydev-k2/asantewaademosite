"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string>("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Joining...");
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      setStatus("You are in. Watch your inbox.");
      setEmail("");
    } catch {
      setStatus("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="rounded-2xl border bg-white p-6">
      <h2 className="text-2xl font-semibold">Join Our Community</h2>
      <p className="mt-2 text-sm text-slate-600">Get exclusive access to new arrivals, secret sales, and sourcing stories.</p>
      <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="min-w-0 flex-1"
        />
        <Button className="bg-emerald-700 hover:bg-emerald-800">Join</Button>
      </form>
      {status ? <p className="mt-2 text-xs text-slate-500">{status}</p> : null}
    </section>
  );
}
