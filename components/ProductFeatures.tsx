import { product } from "@/lib/product-data";
import { Wind, Paintbrush, Compass, Layers } from "lucide-react";

const iconMap = [
  <Wind key="0" size={48} strokeWidth={1.2} />,
  <Paintbrush key="1" size={48} strokeWidth={1.2} />,
  <Compass key="2" size={48} strokeWidth={1.2} />,
  <Layers key="3" size={48} strokeWidth={1.2} />
];

export default function ProductFeatures() {
  return (
    <section className="py-16 md:py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {product.features.map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="mb-4 md:mb-6 opacity-80">
                {iconMap[i % iconMap.length]}
              </div>
              <h3 className="text-base font-bold tracking-widest uppercase mb-2 md:mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-[280px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
