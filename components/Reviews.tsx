"use client";

import { useState, useEffect } from "react";
import { CircleDollarSign } from "lucide-react";

export default function Reviews() {
  const [userRating, setUserRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  
  // Load saved rating from cookies on mount
  useEffect(() => {
    const cookies = document.cookie.split(';');
    const savedRatingCookie = cookies.find(c => c.trim().startsWith('user_rating='));
    if (savedRatingCookie) {
      const rating = parseInt(savedRatingCookie.split('=')[1], 10);
      if (!isNaN(rating)) setUserRating(rating);
    }
  }, []);

  const handleRate = (rating: number) => {
    setUserRating(rating);
    // Save to cookie (expires in 365 days)
    document.cookie = `user_rating=${rating}; max-age=${60 * 60 * 24 * 365}; path=/`;
  };

  const reviews: any[] = [];
  
  return (
    <section id="reviews" className="py-12 md:py-16 bg-[var(--background)] scroll-mt-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col items-center text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-catalog font-black tracking-tighter uppercase mb-3 md:mb-4 text-[var(--ink)]">
            CUSTOMER REVIEWS
          </h2>
          
          <div className="flex items-center gap-2 mb-4" onMouseLeave={() => setHoverRating(0)}>
            {[1, 2, 3, 4, 5].map((coinValue) => (
              <button
                key={coinValue}
                onClick={() => handleRate(coinValue)}
                onMouseEnter={() => setHoverRating(coinValue)}
                className="transition-transform hover:scale-110 active:scale-95 focus:outline-none"
              >
                <CircleDollarSign 
                  size={32} 
                  className={
                    (hoverRating ? coinValue <= hoverRating : coinValue <= userRating)
                      ? "fill-[var(--neon-cyan)] text-[var(--ink)] drop-shadow-sm transition-all" 
                      : "fill-[var(--neon-cyan)] text-[var(--ink)] opacity-30 grayscale drop-shadow-sm transition-all"
                  } 
                />
              </button>
            ))}
          </div>
          
          <p className="text-[var(--muted)] text-sm font-bold uppercase tracking-wider mb-8">
            0 Reviews
          </p>
          
          <button className="px-8 md:px-10 py-3.5 bg-[var(--background)] border-[3px] border-[var(--neon-cyan)] text-[var(--ink)] text-sm font-bold tracking-widest uppercase hover:bg-[var(--neon-cyan)] transition-all catalog-border halftone-border-sm">
            INSERT COIN TO REVIEW
          </button>
        </div>

        <div>
          {reviews.length === 0 ? (
            <div className="py-12 border-t-2 border-b-2 border-dotted border-[var(--border)] text-center">
              <p className="text-[var(--muted)] font-bold tracking-widest uppercase text-sm">Be the first to review this product.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {reviews.map((review, i) => (
                <div key={i} className="border-b-2 border-dotted border-[var(--border)] pb-8">
                  <div className="flex items-center gap-1.5 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <CircleDollarSign 
                        key={star} 
                        size={18} 
                        className={star <= review.rating 
                          ? "fill-[var(--neon-cyan)] text-[var(--ink)] drop-shadow-sm" 
                          : "fill-[var(--neon-cyan)] text-[var(--ink)] opacity-30 grayscale drop-shadow-sm"} 
                      />
                    ))}
                  </div>
                  <h4 className="font-bold mb-2 text-[var(--ink)] text-lg uppercase tracking-wide">{review.title}</h4>
                  <p className="text-[var(--muted)] text-sm mb-4 leading-relaxed font-medium">{review.content}</p>
                  <p className="text-xs text-[var(--ink)] font-bold uppercase tracking-widest opacity-70">{review.name} - {review.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
