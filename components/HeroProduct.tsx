"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useShop } from "@/context/ShopContext";
import { cn } from "@/lib/utils";
import { Camera, ShieldCheck, Tag, ChevronRight } from "lucide-react";

export default function HeroProduct({ product }: { product: any }) {
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addToCart, setIsCartOpen } = useShop();

  return (
    <section className="relative z-10 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Theme Headline Badge */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase catalog-border bg-[var(--background)] text-[var(--ink)] halftone-border-sm">
            <Tag size={14} className="text-[var(--neon-pink)]" />
            <span>SERIES NO. 1984 // ORIGINAL COLORBLOCKED CUT</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* LEFT: JACKET IMAGE GALLERY (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">

            {/* Mobile: Scrollable Full Images */}
            <div className="md:hidden relative w-full aspect-[4/5] max-h-[700px] flex overflow-x-auto snap-x snap-mandatory scrollbar-hide mb-4">
              {product.images.map((img: any, idx: number) => (
                <div key={idx} className="relative flex-none w-full h-full snap-center flex items-center justify-center">
                  <Image
                    src={img.src}
                    alt={img.alt || product.name}
                    fill
                    priority={idx === 0}
                    className="object-contain mix-blend-multiply"
                    sizes="100vw"
                  />
                </div>
              ))}
            </div>

            {/* Desktop: Layout with Thumbnails on Left */}
            <div className="hidden md:flex flex-row gap-6 h-[700px] max-h-[75vh]">

              {/* Vertical Thumbnails (Left side) */}
              <div className="flex flex-col gap-4 w-20 lg:w-24 flex-shrink-0 overflow-y-auto scrollbar-hide py-1">
                {product.images.map((img: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setMainImageIndex(idx)}
                    className={cn(
                      "relative w-full aspect-[3/4] overflow-hidden transition-all hover:scale-105 active:scale-95 border-2",
                      mainImageIndex === idx ? "border-[var(--ink)]" : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={img.src}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover mix-blend-multiply bg-black/5"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="relative flex-1 h-full flex items-center justify-center overflow-hidden">
                <Image
                  src={product.images[mainImageIndex]?.src}
                  alt={product.images[mainImageIndex]?.alt || product.name}
                  fill
                  priority
                  className="object-contain mix-blend-multiply"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: PRODUCT BUY BOX (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="catalog-border halftone-border bg-[var(--background)] p-6 lg:p-8 relative">

              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[var(--muted)] mb-3 uppercase border-b-2 border-dotted border-[var(--border)] pb-2">
                FALL/WINTER ARCHIVE '84
              </div>

              <h1 className="text-4xl lg:text-5xl font-catalog font-black tracking-tighter leading-[1.1] mb-5 uppercase text-[var(--ink)]">
                {product.name}
              </h1>

              <p className="text-sm text-[var(--muted)] mb-8 leading-relaxed font-medium">
                {product.description}
              </p>

              {/* Exclusive Waitlist Form */}
              <div className="mt-4 border-t-2 border-dotted border-[var(--border)] pt-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold font-catalog uppercase tracking-wide text-[var(--ink)] mb-2">Request Early Access</h3>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    We are currently testing interest for this exclusive retro piece. Drop your details below to join the waitlist!
                  </p>
                </div>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (isSubmitting) return;
                    setIsSubmitting(true);
                    const formData = new FormData(e.currentTarget);
                    try {
                      // Artificial delay to show loading state
                      await new Promise(resolve => setTimeout(resolve, 1000));
                      
                      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000'}/api/leads`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          name: formData.get('name'),
                          email: formData.get('email'),
                          description: formData.get('description'),
                          status: formData.get('status'),
                          productName: product.name
                        })
                      });
                      if (res.ok) {
                        setShowSuccess(true);
                        setTimeout(() => setShowSuccess(false), 4000);
                        (e.target as HTMLFormElement).reset();
                      } else {
                        // Silent failure or just a basic alert for now
                      }
                    } catch (err) {
                      // Silent failure
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase mb-1">Name</label>
                      <input type="text" name="name" required className="w-full bg-[var(--background)] border-2 border-[var(--border)] p-2.5 text-sm outline-none focus:border-[var(--ink)] transition-colors" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase mb-1">Email</label>
                      <input type="email" name="email" required className="w-full bg-[var(--background)] border-2 border-[var(--border)] p-2.5 text-sm outline-none focus:border-[var(--ink)] transition-colors" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-widest uppercase mb-1 flex justify-between">
                      <span>Quick Thoughts</span>
                      <span className="text-[var(--muted)] font-normal normal-case">Max 50 chars</span>
                    </label>
                    <input type="text" name="description" maxLength={50} className="w-full bg-[var(--background)] border-2 border-[var(--border)] p-2.5 text-sm outline-none focus:border-[var(--ink)] transition-colors" placeholder="What caught your eye?" />
                  </div>

                  <div className="pt-2">
                    <label className="block text-[10px] font-bold tracking-widest uppercase mb-3">Your Interest Level *</label>
                    <div className="space-y-2">
                      {[
                        { val: 'Ready to Buy', label: 'I’m Ready to Buy' },
                        { val: 'Interested', label: 'I’m Interested' },
                        { val: 'Considering', label: 'I’m Considering It' },
                        { val: 'Just Exploring', label: 'Just Exploring' }
                      ].map((opt) => (
                        <label key={opt.val} className="flex items-center gap-3 cursor-pointer group">
                          <input type="radio" name="status" value={opt.val} required className="w-4 h-4 accent-[var(--neon-pink)] cursor-pointer" />
                          <span className="text-xs font-medium text-[var(--ink)] group-hover:text-[var(--neon-pink)] transition-colors">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-4 bg-[var(--neon-pink)] text-white text-sm font-bold tracking-widest uppercase transition-all flex justify-center items-center gap-2 catalog-border hover:bg-[var(--border)] active:translate-y-[2px] halftone-border disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
                  </button>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Themed Success Toast Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-4 w-full max-w-sm pointer-events-none"
          >
            <div className="bg-[var(--background)] catalog-border halftone-border shadow-2xl p-6 flex flex-col items-center text-center relative z-[100]">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mb-4 catalog-border">
                <ShieldCheck size={24} />
              </div>
              <h4 className="font-catalog text-xl font-bold uppercase tracking-wider text-[var(--ink)] mb-2">
                You're on the list!
              </h4>
              <p className="text-sm text-[var(--muted)] leading-relaxed font-medium">
                Thanks for your interest. We've reserved your spot and will contact you directly.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
