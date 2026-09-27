import { Star } from "lucide-react";

export default function Reviews() {
  // Simulating an empty state for reviews as requested
  const reviews: any[] = [];
  
  return (
    <section id="reviews" className="py-12 md:py-16 bg-background scroll-mt-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col items-center text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter uppercase mb-3 md:mb-4">CUSTOMER REVIEWS</h2>
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={20} className="fill-black text-black opacity-20" />
            ))}
          </div>
          <p className="text-muted text-sm font-semibold uppercase tracking-wider mb-6">0 Reviews</p>
          <button className="px-6 md:px-8 py-3 bg-transparent border border-black text-black text-sm font-semibold tracking-wide hover:bg-black hover:text-white transition-colors rounded-sm">
            WRITE A REVIEW
          </button>
        </div>

        <div>
          {reviews.length === 0 ? (
            <div className="py-12 border-t border-b border-border text-center">
              <p className="text-muted">Be the first to review this product.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {reviews.map((review, i) => (
                <div key={i} className="border-b border-border pb-8">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        size={14} 
                        className={star <= review.rating ? "fill-black text-black" : "fill-black text-black opacity-20"} 
                      />
                    ))}
                  </div>
                  <h4 className="font-bold mb-2">{review.title}</h4>
                  <p className="text-muted text-sm mb-4">{review.content}</p>
                  <p className="text-xs text-muted font-medium">{review.name} - {review.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
