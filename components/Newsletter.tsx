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
    <section className="py-16 md:py-24 bg-gray-100">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tighter uppercase mb-3 md:mb-4">STAY IN THE LOOP</h2>
        <p className="text-base text-muted mb-8 md:mb-10 max-w-md mx-auto leading-relaxed">
          Get updates on new drops, exclusive releases and offers.
        </p>
        
        <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full bg-transparent border-b border-black py-4 pl-0 pr-12 focus:outline-none focus:border-black placeholder:text-muted/60 transition-colors rounded-none"
            required
            disabled={status === "loading" || status === "success"}
          />
          <button 
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:opacity-70 transition-opacity disabled:opacity-50"
            aria-label="Subscribe"
          >
            <ArrowRight size={20} />
          </button>
        </form>
        
        {status === "success" && (
          <p className="mt-4 text-sm font-medium text-green-700">
            Thank you for subscribing!
          </p>
        )}
      </div>
    </section>
  );
}
