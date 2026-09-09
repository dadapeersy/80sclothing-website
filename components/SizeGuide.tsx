export default function SizeGuide() {
  return (
    <section className="py-12 md:py-16 bg-background border-t border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter uppercase mb-3 md:mb-4">SIZE GUIDE</h2>
          <p className="text-base text-muted max-w-md mx-auto leading-relaxed">
            The jacket has a relaxed, slightly oversized fit. If you prefer a more tailored look, we recommend sizing down. Available in the following sizes:
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 py-8 border-y border-border">
          {["S", "M", "L", "XL", "XXL"].map((size, i) => (
            <span key={i} className="text-xl md:text-2xl font-black tracking-tighter">
              {size}
            </span>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted mb-4">Not sure about your size?</p>
          <button className="text-sm font-medium border-b border-black pb-0.5 hover:opacity-60 transition-opacity">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}
