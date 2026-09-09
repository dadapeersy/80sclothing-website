"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { product } from "@/lib/product-data";

export default function ProductGallery() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Desktop: Asymmetric Grid
  // Mobile: Swipeable horizontal list
  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-12 gap-4 auto-rows-[300px]">
          {product.images.map((img, i) => {
            // Create an editorial asymmetric layout
            let colSpan = "col-span-6";
            let rowSpan = "row-span-2";
            
            if (i === 0) {
               colSpan = "col-span-12 lg:col-span-8";
               rowSpan = "row-span-3";
            } else if (i === 1) {
               colSpan = "col-span-6 lg:col-span-4";
               rowSpan = "row-span-2";
            } else if (i === 2) {
               colSpan = "col-span-6 lg:col-span-4";
               rowSpan = "row-span-2";
            } else {
               colSpan = "col-span-6 lg:col-span-8";
               rowSpan = "row-span-2";
            }

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative w-full h-full bg-gray-100 overflow-hidden cursor-zoom-in ${colSpan} ${rowSpan}`}
                onClick={() => setLightboxImage(img.src)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Swipeable Gallery */}
        <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-4">
          {product.images.map((img, i) => (
            <div 
              key={i} 
              className="relative min-w-[85vw] aspect-[3/4] snap-center bg-gray-100 rounded-sm overflow-hidden"
              onClick={() => setLightboxImage(img.src)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="85vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              <X size={32} strokeWidth={1} />
            </button>
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-4xl max-h-[90vh] aspect-[3/4] md:aspect-[4/5] bg-transparent"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImage}
                alt="Fullscreen view"
                fill
                className="object-contain"
                sizes="100vw"
                quality={100}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
