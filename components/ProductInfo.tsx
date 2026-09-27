import { product } from "@/lib/product-data";

export default function ProductInfo() {
  return (
    <section id="info" className="py-12 md:py-16 bg-background scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-24 items-start">
          
          {/* Left: Heading */}
          <div className="md:w-1/3">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter uppercase leading-tight">
              Designed to <br className="hidden sm:block" />stand out.
            </h2>
          </div>

          {/* Right: Details */}
          <div className="md:w-2/3 max-w-2xl">
            <p className="text-base text-muted leading-relaxed mb-8 md:mb-12">
              {product.details}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-3 md:gap-y-4">
              {product.detailsList.map((detail, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" />
                  <span className="text-sm font-semibold tracking-wide">{detail}</span>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
