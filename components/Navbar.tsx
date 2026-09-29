"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { setIsCartOpen, cartCount } = useShop();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300 border-b-4 border-double border-[var(--border)]",
          isScrolled ? "bg-[var(--background)]/90 backdrop-blur-md py-3 shadow-md" : "bg-[var(--background)] py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">

          {/* Brand Logo */}
          <div className="flex-1 flex items-center">
            <Link href="/" className="flex items-center gap-3 group transition-transform hover:scale-[1.02] active:scale-[0.98]">
              <Image
                src="/torocavallo_logo.png"
                alt="Brand Logo"
                width={160}
                height={45}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Navigation Links Removed as Requested */}
          <div className="hidden lg:flex flex-1 justify-center space-x-8 text-sm font-bold tracking-widest uppercase text-[var(--ink)]">
            {/* Empty center spacing */}
          </div>

          {/* Hotline & Cart */}
          <div className="flex-1 flex justify-end items-center gap-4 md:gap-6">
            <div className="hidden md:block text-right font-mono text-[10px] md:text-[11px] text-[var(--ink)] leading-tight border-r-2 border-[var(--border)] pr-4">
              <span className="opacity-80">CATALOG HOTLINE:</span>
              <b className="block text-xs font-bold text-[var(--neon-pink)]">1-800-80S-JACKET</b>
            </div>


            <button
              className="flex items-center gap-2 px-4 py-2 bg-[var(--ink)] text-[var(--background)] font-bold text-xs uppercase tracking-wider transition-all hover:bg-[var(--neon-pink)] active:scale-95 halftone-border-sm"
              aria-label="Cart"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={16} strokeWidth={2} />
              <span className="hidden sm:inline">Bag</span>
              <span className="w-5 h-5 bg-[var(--neon-cyan)] text-[var(--ink)] rounded-full flex items-center justify-center text-[10px] font-black border border-[var(--ink)]">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
