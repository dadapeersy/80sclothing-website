"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  {
    title: "Shipping",
    content: "Free standard shipping on all orders over ₹999. Orders are processed within 1-2 business days. Delivery typically takes 3-5 business days depending on your location."
  },
  {
    title: "Returns & Exchanges",
    content: "We accept returns within 14 days of delivery. Items must be unworn, unwashed, and in their original packaging with all tags attached. Exchanges are free."
  },
  {
    title: "Delivery Information",
    content: "Once your order ships, you will receive a tracking number via email. We partner with reliable couriers to ensure your package arrives safely."
  },
  {
    title: "Care Instructions",
    content: "Machine wash cold with like colors. Tumble dry low or hang to dry. Do not bleach. Do not iron the zipper or prints."
  }
];

export default function ShippingReturns() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tighter uppercase mb-8 md:mb-12 text-center">SHIPPING & RETURNS</h2>
        
        <div className="border-t border-black">
          {items.map((item, i) => (
            <div key={i} className="border-b border-border">
              <button
                onClick={() => toggleItem(i)}
                className="w-full py-5 md:py-6 flex justify-between items-center text-left hover:opacity-70 transition-opacity"
              >
                <span className="font-semibold tracking-wide text-sm pr-4">{item.title}</span>
                {openIndex === i ? (
                  <Minus size={18} strokeWidth={1.5} />
                ) : (
                  <Plus size={18} strokeWidth={1.5} />
                )}
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 text-muted text-sm leading-relaxed max-w-2xl">
                      {item.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
