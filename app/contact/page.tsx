"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Clock } from "lucide-react";
import { siteConfig } from "@/lib/product-data";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <div className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted hover:text-black transition-colors mb-12">
          <ArrowLeft size={16} className="mr-2" />
          Back to Store
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left: Contact Info */}
          <div>
            <h1 className="text-4xl font-bold tracking-tighter mb-6">CONTACT US</h1>
            <p className="text-muted mb-12 max-w-md leading-relaxed">
              Have a question about a product, your order, or just want to say hi? We'd love to hear from you.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Mail className="mt-1" size={20} />
                <div>
                  <h3 className="font-semibold tracking-wide mb-1">Email</h3>
                  <p className="text-muted text-sm">{siteConfig.contactEmail}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="mt-1" size={20} />
                <div>
                  <h3 className="font-semibold tracking-wide mb-1">Phone</h3>
                  <p className="text-muted text-sm">+91 1800 123 4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="mt-1" size={20} />
                <div>
                  <h3 className="font-semibold tracking-wide mb-1">Business Hours</h3>
                  <p className="text-muted text-sm">Monday - Friday: 9am - 6pm</p>
                  <p className="text-muted text-sm">Saturday: 10am - 4pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-white p-8 border border-border shadow-sm rounded-sm">
            <h2 className="text-2xl font-bold tracking-tighter mb-6">SEND A MESSAGE</h2>
            
            {status === "success" ? (
              <div className="py-12 text-center text-green-700">
                <p className="text-lg font-medium mb-2">Message sent successfully!</p>
                <p className="text-sm">We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium tracking-wide mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full bg-transparent border-b border-border py-3 px-0 focus:outline-none focus:border-black transition-colors rounded-none"
                    disabled={status === "loading"}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium tracking-wide mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full bg-transparent border-b border-border py-3 px-0 focus:outline-none focus:border-black transition-colors rounded-none"
                    disabled={status === "loading"}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium tracking-wide mb-2">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-border py-3 px-0 focus:outline-none focus:border-black transition-colors rounded-none resize-none"
                    disabled={status === "loading"}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 bg-black text-white font-semibold tracking-widest uppercase hover:bg-black/90 transition-colors rounded-sm"
                >
                  {status === "loading" ? "SENDING..." : "SUBMIT"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
