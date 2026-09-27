"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Oswald } from 'next/font/google';

const displayFont = Oswald({
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
});

interface ProductImage {
  src: string;
  alt?: string;
}

interface ProductProps {
  name?: string;
  images?: ProductImage[];
}

interface ProductShowcaseProps {
  product: ProductProps;
}

export default function ProductShowcase({ product }: ProductShowcaseProps) {
  const containerRef = useRef<HTMLElement>(null);

  // Track scroll over a 300vh tall container to give us plenty of room to scroll horizontally
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth the scroll so it feels premium and fluid
  const springProgress = useSpring(scrollYProgress, { stiffness: 400, damping: 40, mass: 0.8 });

  // Map the vertical scroll from 0 -> 1 into a horizontal transform from 0% -> -66.66%
  // Since we have 3 slides, we want to move exactly 2 slide-widths to the left.
  const x = useTransform(springProgress, [0, 1], ["0%", "-66.666%"]);

  // Data check
  const validImages = (product?.images || []).filter((img) => img && img.src);
  if (validImages.length === 0) return null;

  const displayImages = [
    validImages[0],
    validImages[1] || validImages[validImages.length - 1],
    validImages[2] || validImages[validImages.length - 1]
  ];

  return (
    // The section is 300vh tall. You scroll vertically, but the content sticks and moves horizontally!
    <section id="showcase" ref={containerRef} className="relative h-[300vh] bg-neutral-50 scroll-mt-10">
      
      {/* Sticky container locks to the screen */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        
        {/* The extremely wide flex row that pans left as you scroll down */}
        <motion.div style={{ x }} className="flex w-[300vw] h-full items-center">
          
          {/* ---------------- SLIDE 1 ---------------- */}
          <div className="w-[100vw] h-full flex items-center justify-center shrink-0">
            <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-12">
                {/* Image */}
                <div className="w-full lg:w-[50%] flex justify-center">
                  <div className="relative w-[70%] sm:w-[60%] md:w-[55%] lg:w-[65%] aspect-[3/4] overflow-hidden shadow-xl border border-neutral-200 bg-white">
                    <Image src={displayImages[0].src} alt={displayImages[0].alt || "Product view 1"} fill priority className="object-cover" />
                  </div>
                </div>
                {/* Text */}
                <div className="w-full lg:w-[50%]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-px w-6 bg-blue-600" aria-hidden="true" />
                    <span className="text-sm font-medium text-neutral-600 tracking-wide">Featured release</span>
                  </div>
                  <h2 className={`${displayFont.className} text-5xl lg:text-7xl font-bold tracking-tight mb-8 text-neutral-900 leading-[1.05] uppercase`}>
                    Form and <br/> Function
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------- SLIDE 2 ---------------- */}
          <div className="w-[100vw] h-full flex items-center justify-center shrink-0">
            <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-12">
                {/* Image */}
                <div className="w-full lg:w-[50%] flex justify-center">
                  <div className="relative w-[70%] sm:w-[60%] md:w-[55%] lg:w-[65%] aspect-[3/4] overflow-hidden shadow-xl border border-neutral-200 bg-white">
                    <Image src={displayImages[1].src} alt={displayImages[1].alt || "Product view 2"} fill className="object-cover" />
                  </div>
                </div>
                {/* Text */}
                <div className="w-full lg:w-[50%]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-px w-6 bg-blue-600" aria-hidden="true" />
                    <span className="text-sm font-medium text-neutral-600 tracking-wide">Premium Build</span>
                  </div>
                  <h2 className={`${displayFont.className} text-5xl lg:text-7xl font-bold tracking-tight mb-8 text-neutral-900 leading-[1.05] uppercase`}>
                    Every Detail <br/> Matters
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------- SLIDE 3 ---------------- */}
          <div className="w-[100vw] h-full flex items-center justify-center shrink-0">
            <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-12">
                {/* Image */}
                <div className="w-full lg:w-[50%] flex justify-center">
                  <div className="relative w-[70%] sm:w-[60%] md:w-[55%] lg:w-[65%] aspect-[3/4] overflow-hidden shadow-xl border border-neutral-200 bg-white">
                    <Image src={displayImages[2].src} alt={displayImages[2].alt || "Product view 3"} fill className="object-cover" />
                  </div>
                </div>
                {/* Text */}
                <div className="w-full lg:w-[50%]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-px w-6 bg-blue-600" aria-hidden="true" />
                    <span className="text-sm font-medium text-neutral-600 tracking-wide">Built to Last</span>
                  </div>
                  <p className="text-neutral-600 text-base lg:text-lg leading-relaxed mb-10 max-w-md">
                    Constructed with durable materials and precise tailoring. {product?.name ? `${product.name} provides` : 'This piece provides'} reliable structure and an adjustable fit suited for daily wear in urban environments.
                  </p>
                  <div>
                    <button className="px-6 py-3.5 bg-black text-white text-sm font-medium hover:bg-neutral-800 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 flex items-center gap-2">
                      View product details
                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
