"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Package, Clock, ShieldCheck, Mail } from "lucide-react";

type Order = {
  _id: string;
  createdAt: string;
  totalAmount: number;
  status: string;
  items: {
    productId: string;
    quantity: number;
    size: string;
    priceAtPurchase: number;
  }[];
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const fetchOrders = async (userEmail: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders?email=${encodeURIComponent(userEmail)}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('customerEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      fetchOrders(savedEmail);
    } else {
      setLoading(false);
    }
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      localStorage.setItem('customerEmail', emailInput.trim());
      setEmail(emailInput.trim());
      fetchOrders(emailInput.trim());
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('customerEmail');
    setEmail("");
    setOrders([]);
    setEmailInput("");
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[var(--background)] px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between border-b-4 border-double border-[var(--border)] pb-6">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--ink)] font-bold text-xs uppercase tracking-widest mb-4 transition-colors">
              <ArrowLeft size={16} />
              Return to Catalog
            </Link>
            <h1 className="text-3xl md:text-5xl font-catalog font-black tracking-tighter uppercase text-[var(--ink)]">
              Purchase Archives
            </h1>
          </div>
          {email && (
            <button 
              onClick={handleLogout}
              className="px-4 py-2 text-[10px] font-bold tracking-widest uppercase border-2 border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--background)] transition-colors halftone-border-sm"
            >
              Sign Out
            </button>
          )}
        </div>

        {!email ? (
          <div className="catalog-border halftone-border bg-white p-8 md:p-12 text-center">
            <Mail className="mx-auto mb-4 text-[var(--neon-pink)]" size={48} strokeWidth={1} />
            <h2 className="text-2xl font-bold uppercase tracking-wide mb-2 text-[var(--ink)]">Access Your Records</h2>
            <p className="text-[var(--muted)] mb-8 font-medium">Enter the email address you used during checkout to view your purchase history.</p>
            <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto flex gap-2">
              <input 
                type="email" 
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="your.email@example.com"
                className="flex-1 border-2 border-[var(--border)] p-3 focus:outline-none focus:border-[var(--ink)] bg-[var(--background)] font-mono text-sm"
              />
              <button 
                type="submit"
                className="px-6 py-3 bg-[var(--ink)] text-[var(--background)] font-bold tracking-widest uppercase text-xs hover:bg-[var(--neon-pink)] transition-colors halftone-border-sm"
              >
                Access
              </button>
            </form>
          </div>
        ) : loading ? (
          <div className="py-20 flex justify-center text-[var(--muted)]">
            <span className="font-mono text-sm uppercase tracking-widest animate-pulse">Retrieving Archives...</span>
          </div>
        ) : orders.length === 0 ? (
          <div className="catalog-border bg-white p-12 text-center">
            <Package className="mx-auto mb-4 text-[var(--muted)] opacity-50" size={48} strokeWidth={1} />
            <h2 className="text-xl font-bold uppercase tracking-wide mb-2 text-[var(--ink)]">No Records Found</h2>
            <p className="text-[var(--muted)] font-medium">We couldn't find any purchases associated with <span className="font-bold text-[var(--ink)]">{email}</span>.</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-[var(--ink)] text-[var(--background)] p-4 catalog-border">
              <p className="font-mono text-[10px] uppercase tracking-widest">
                Showing records for: <span className="font-bold text-[var(--neon-cyan)]">{email}</span>
              </p>
            </div>

            {orders.map((order) => (
              <div key={order._id} className="catalog-border halftone-border bg-white overflow-hidden">
                <div className="bg-gray-50 border-b-2 border-dotted border-[var(--border)] p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--muted)] mb-1">Order Identifier</p>
                    <p className="font-mono text-sm font-bold text-[var(--ink)]">#{order._id.slice(-8).toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--muted)] mb-1">Date</p>
                    <p className="font-bold text-sm text-[var(--ink)]">
                      {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--muted)] mb-1">Status</p>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--background)] border border-[var(--ink)] text-xs font-bold uppercase tracking-wide">
                      {order.status === 'Delivered' ? (
                        <ShieldCheck size={14} className="text-[var(--neon-cyan)]" />
                      ) : (
                        <Clock size={14} className="text-[var(--neon-pink)]" />
                      )}
                      {order.status}
                    </div>
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  <div className="divide-y-2 divide-dotted divide-[var(--border)]">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between">
                        <div>
                          <p className="font-bold uppercase tracking-wide text-[var(--ink)]">Product Item</p>
                          <p className="text-xs font-medium text-[var(--muted)] mt-1">Size: {item.size} • Qty: {item.quantity}</p>
                        </div>
                        <p className="font-black font-catalog text-lg">₹{(item.priceAtPurchase * item.quantity).toLocaleString('en-IN')}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 border-t-2 border-[var(--ink)] p-4 md:p-6 flex justify-between items-center">
                  <span className="font-bold uppercase tracking-widest text-sm text-[var(--muted)]">Total Amount</span>
                  <span className="text-2xl font-black font-catalog text-[var(--ink)]">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
