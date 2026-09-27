"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <section className="py-24 border-t border-neutral-200 bg-[var(--background)]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6 text-neutral-900">
          STAY IN THE LOOP
        </h2>
        <p className="text-lg text-neutral-600 mb-10 max-w-md mx-auto leading-relaxed">
          Get updates on new drops, exclusive releases and offers.
        </p>
        
        <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full bg-transparent border-b-2 border-neutral-900 py-4 pl-0 pr-12 focus:outline-none focus:border-[var(--neon-pink)] placeholder:text-neutral-400 transition-colors rounded-none text-neutral-900 font-medium"
            required
            disabled={status === "loading" || status === "success"}
          />
          <button 
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-neutral-900 hover:text-[var(--neon-pink)] transition-colors disabled:opacity-50"
            aria-label="Subscribe"
          >
            <ArrowRight size={24} strokeWidth={2} />
          </button>
        </form>
        
        {status === "success" && (
          <p className="mt-6 text-sm font-bold text-[var(--neon-cyan)] uppercase tracking-widest">
            Thank you for subscribing!
          </p>
        )}
      </div>
    </section>
  );
}
