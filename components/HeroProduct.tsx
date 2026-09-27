"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useShop } from "@/context/ShopContext";
import { cn } from "@/lib/utils";

export default function HeroProduct({ product }: { product: any }) {
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const { addToCart, setIsCartOpen } = useShop();

  return (
    <section className="relative bg-background">
      <div className="max-w-[1800px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-4 pb-8 md:pt-12 md:pb-12 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* Left: Product Images Gallery Viewport */}
          <div className="lg:w-[60%] xl:w-[65%] w-full min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none scrollbar-hide gap-4 lg:gap-6 w-full"
            >
              {product.images.map((img: any, i: number) => (
                <div
                  key={i}
                  className="relative flex-shrink-0 w-full lg:w-[80%] mx-auto aspect-[3/4] lg:aspect-[4/5] snap-center lg:snap-align-none bg-gray-100 rounded-md overflow-hidden"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    priority={i === 0 || i === 1}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Product Information Container */}
          <div className="lg:w-[40%] xl:w-[35%] w-full">
            {/* The sticky wrapper */}
            <div className="lg:sticky lg:top-24 py-4 lg:py-0 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-md lg:max-w-none mx-auto lg:mx-0 w-full"
              >
                <div className="text-[10px] sm:text-xs font-bold tracking-widest text-muted mb-2 md:mb-3 uppercase">
                  NEW ARRIVAL
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black tracking-tighter leading-none mb-3 md:mb-4 uppercase">
                  {product.name}
                </h1>
                <p className="text-sm md:text-base text-muted mb-4 md:mb-5 leading-relaxed lg:max-w-md">
                  {product.description}
                </p>



                <div className="flex items-center gap-2 md:gap-3 mb-5 md:mb-6">
                  <span className="text-lg md:text-xl font-semibold tracking-tight">₹{product.price.toLocaleString('en-IN')}</span>
                  {product.originalPrice && (
                    <span className="text-sm md:text-base text-muted line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  )}
                </div>

                {/* Size Selector */}
                <div className="mb-6 md:mb-8 lg:max-w-md">
                  <div className="flex justify-between items-center mb-2 md:mb-3">
                    <span className="text-xs font-semibold tracking-wide">SIZE</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {product.sizes.map((size: string) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "py-2 text-[11px] sm:text-xs font-medium border rounded-sm transition-all duration-200",
                          selectedSize === size
                            ? "border-black bg-black text-white"
                            : "border-border text-foreground hover:border-black"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2.5 md:gap-3 mb-4 lg:max-w-md mt-6">
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
                    className="w-full py-3 md:py-3.5 bg-black text-white text-sm font-semibold tracking-widest uppercase hover:bg-black/90 transition-colors flex justify-center items-center rounded-sm"
                  >
                    BUY IT NOW
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
