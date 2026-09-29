"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useShop } from "@/context/ShopContext";
import { cn } from "@/lib/utils";
import { Camera, ShieldCheck, Tag, ChevronRight } from "lucide-react";

export default function HeroProduct({ product }: { product: any }) {
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [mainImageIndex, setMainImageIndex] = useState(0);
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
          
          {/* LEFT: JACKET IMAGE GALLERY & PHOTO STACK (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Primary Large Showcase Frame */}
            <div className="relative rounded-sm overflow-hidden p-3 md:p-5 catalog-border halftone-border bg-[var(--background)] transition-all duration-300">
              
              {/* Floating Polaroid Stamp */}
              <div className="absolute top-6 left-6 z-20 flex items-center gap-2">
                <span className="px-3 py-1 bg-[var(--neon-pink)] text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow-md">
                  AUTHENTIC 1984 TASLAN
                </span>
              </div>

              {/* Instant Camera Snapshot Trigger */}
              <button 
                title="Take Polaroid Snapshot" 
                className="absolute top-6 right-6 z-20 w-11 h-11 rounded-full bg-[var(--background)] text-[var(--ink)] catalog-border flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-xl"
              >
                <Camera size={18} />
              </button>

              {/* Main Image */}
              <div className="relative w-full aspect-[4/3] flex items-center justify-center overflow-hidden bg-white catalog-border">
                <Image
                  src={product.images[mainImageIndex]?.src}
                  alt={product.images[mainImageIndex]?.alt || product.name}
                  fill
                  priority
                  className="object-contain p-4"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
            </div>

            {/* Thumbnail Carousel Container */}
            <div className="relative mt-4">
              <div 
                ref={scrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide pr-12 scroll-smooth"
              >
                {product.images.map((img: any, idx: number) => (
                  <button 
                    key={idx}
                    onClick={() => setMainImageIndex(idx)}
                    className={cn(
                      "flex-none w-28 md:w-36 lg:w-40 snap-start p-2.5 text-left transition-all hover:translate-y-[-2px] active:translate-y-[0px] catalog-border bg-[var(--background)]",
                      mainImageIndex === idx ? "halftone-border-sm" : "opacity-80 hover:opacity-100"
                    )}
                  >
                    <div className="font-mono text-[10px] md:text-xs uppercase text-[var(--neon-pink)] font-bold mb-1.5 tracking-wider">SHOT 0{idx + 1}</div>
                    <div className="relative w-full aspect-square bg-white border border-[var(--border)]">
                      <Image
                        src={img.src}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Scroll Indicator Arrow */}
              {product.images.length > 3 && (
                <div className="absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-[var(--background)] via-[var(--background)]/80 to-transparent pointer-events-none flex items-center justify-end pr-1 z-10">
                  <button 
                    onClick={() => scrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' })}
                    className="w-8 h-8 rounded-sm bg-[var(--ink)] text-[var(--background)] flex items-center justify-center shadow-lg catalog-border pointer-events-auto hover:bg-[var(--neon-pink)] hover:text-white transition-colors active:scale-95"
                    aria-label="Scroll right"
                  >
                    <ChevronRight size={18} strokeWidth={3} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: PRODUCT BUY BOX (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
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

              <div className="bg-[var(--background)] catalog-border p-4 mb-8">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold tracking-widest text-[var(--muted)] uppercase">LIMITED MAIL-ORDER PRICE</span>
                  <span className="bg-[var(--border)] text-[var(--background)] px-2 py-0.5 text-[10px] font-bold uppercase">27% OFF DISPATCH</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black font-catalog text-[var(--ink)]">₹{product.price.toLocaleString('en-IN')}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-[var(--muted)] line-through decoration-[var(--border)] decoration-2">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  )}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[11px] font-bold tracking-widest uppercase">SELECT FIT (SIZE)</span>
                  <span className="text-[10px] font-bold text-[var(--neon-pink)] underline underline-offset-2 cursor-pointer">Sizing Chart</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "py-2.5 text-xs font-bold border-2 transition-all duration-200",
                        selectedSize === size
                          ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--background)] halftone-border-sm translate-y-[-2px]"
                          : "border-[var(--border)] text-[var(--ink)] hover:border-[var(--ink)] bg-[var(--background)]"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <button
                onClick={() => {
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    size: selectedSize,
                    quantity: 1,
                    image: product.images[0].src,
                  });
                  setIsCartOpen(true);
                }}
                className="w-full py-4 bg-[var(--neon-pink)] text-white text-sm font-bold tracking-widest uppercase transition-all flex justify-center items-center gap-2 catalog-border hover:bg-[var(--border)] active:translate-y-[2px] halftone-border"
              >
                <ShieldCheck size={18} />
                ADD TO MAIL-ORDER BAG
              </button>
              
              <div className="mt-4 text-center">
                <p className="text-[10px] font-mono text-[var(--muted)] uppercase">Please allow 2-3 weeks for postal delivery.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
