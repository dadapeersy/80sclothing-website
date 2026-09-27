"use client";

import { motion } from "framer-motion";
import { Scissors, ShieldCheck, Droplets } from "lucide-react";

const features = [
  {
    icon: <Scissors className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={1} />,
    title: "Precision Tailoring",
    description: "Every seam is double-stitched for maximum durability. Engineered to withstand the demands of everyday urban life."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={1} />,
    title: "Premium Materials",
    description: "Sourced from the finest mills. Our fabrics are selected for their perfect balance of heavy-weight drape and breathable comfort."
  },
  {
    icon: <Droplets className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={1} />,
    title: "Pre-Washed Finish",
    description: "Garment-dyed and pre-washed to eliminate shrinkage and provide an instantly lived-in, incredibly soft feel from day one."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function Craftsmanship() {
  return (
    <section className="bg-[#0a0a0a] text-white py-24 md:py-32 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
      <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[50%] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-neutral-500 uppercase mb-4 block">
            The Details
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase">
            Engineered <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-400 to-neutral-600">
              For The Streets
            </span>
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-12"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="group flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/5"
            >
              <div className="mb-6 md:mb-8 p-4 bg-white/5 rounded-full group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
                {feature.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3 md:mb-4">
                {feature.title}
              </h3>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
