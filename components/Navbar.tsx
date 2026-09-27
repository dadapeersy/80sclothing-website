"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, User, Heart, ShoppingBag } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { siteConfig } from "@/lib/product-data";
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
          "sticky top-0 z-40 w-full transition-all duration-300",
          isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50 py-3" : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">

          {/* Mobile Menu Button & Desktop Left Empty Space */}
          <div className="flex-1 flex md:hidden">
            {/* Hamburger menu removed as requested */}
          </div>
          <div className="hidden md:flex flex-1">
            <Link href="/" className="flex items-center">
              <Image src="/torocavallo_logo.png" alt={siteConfig.name} width={150} height={40} className="object-contain" priority />
            </Link>
          </div>

          {/* Center Logo Mobile / Navigation Desktop */}
          <div className="flex-1 flex justify-center">
            <Link href="/" className="md:hidden flex items-center">
              <Image src="/torocavallo_logo.png" alt={siteConfig.name} width={120} height={32} className="object-contain" priority />
            </Link>
            <div className="hidden md:flex space-x-8 text-sm font-medium tracking-wide">
              {/* Links removed as requested */}
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex-1 flex justify-end items-center space-x-4 md:space-x-6">
            <button
              className="relative hover:opacity-60 transition-opacity"
              aria-label="Cart"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

    </>
  );
}
