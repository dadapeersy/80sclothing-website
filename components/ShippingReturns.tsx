"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  {
    title: "Sizing & Fit",
    content:
      "Our jackets are cut true to the original '80s silhouette — boxy through the body with room over the shoulders for a layer underneath. If you're between sizes or prefer a slimmer look, size down. Check the size chart on each product page for exact chest and length measurements before ordering."
  },
  {
    title: "Materials & Construction",
    content:
      "Each jacket is made from a ripstop nylon shell with a soft mesh lining, colour-blocked panels, and a full front zip with a stand collar. Prints and patches are heat-sealed, not just stitched, so they hold up through repeated washing without cracking or peeling."
  },
  {
    title: "Shipping",
    content:
      "Free standard shipping on all orders over ₹999. Orders are processed within 1-2 business days, and delivery typically takes 3-5 business days depending on your location. You'll get a tracking link by email as soon as your order ships."
  },
  {
    title: "Returns & Refunds",
    content:
      "All sales are final — we don't offer refunds, replacements, or exchanges once an order is placed. Please check the size chart and product details carefully before checkout. Each jacket is inspected before it ships, so if yours arrives damaged or defective, contact us within 48 hours of delivery with photos and we'll make it right."
  },
  {
    title: "Care Instructions",
    content:
      "Machine wash cold with like colours, on a gentle cycle. Tumble dry low or hang to dry — high heat can warp the colour-block panels. Do not bleach or iron directly on the zipper or printed areas; iron inside-out on low heat if needed."
  }
];

export default function ShippingReturns() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 md:py-16 bg-background scroll-mt-10">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tighter uppercase mb-8 md:mb-12 text-center">FREQUENTLY ASKED QUESTIONS</h2>

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