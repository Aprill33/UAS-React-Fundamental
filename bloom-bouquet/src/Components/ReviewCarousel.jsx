/**
 * FILE: /src/Components/ReviewCarousel.jsx
 * TUJUAN: Komponen UI yang dapat digunakan berulang (Reusable Component).
 * KETERHUBUNGAN: Terintegrasi dengan komponen induk dan menggunakan Context API atau Hooks untuk mengelola datanya.
 */

import { useState, useContext } from "react";
import { ChevronLeft, ChevronRight, Star, User } from "lucide-react";
import { ReviewContext } from "../context/ReviewContext";

const ReviewCarousel = () => {
  const { reviews } = useContext(ReviewContext);
  const [currentPage, setCurrentPage] = useState(0);

  if (!reviews || reviews.length === 0) return null;

  // Determine items per page based on screen size (using Tailwind classes for layout instead of window resize listener for simplicity, 
  // but we need to chunk the array here. Actually, we can just use CSS grid and translate to slide).
  // A simple pagination state:
  const itemsPerPageDesktop = 3;
  const itemsPerPageMobile = 1;

  // Since we want it to be responsive, we can just render all items in a flex row and translate the container.
  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(Math.ceil(reviews.length / 1) - 1, prev + 1));
  };

  return (
    <div className="py-12 bg-pink-50/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10">
          <div className="w-10 sm:flex-1 h-[2px] bg-pink-300 rounded-full shrink-0" />
          <div className="text-center px-4">
            <h2 className="font-cursive text-3xl sm:text-4xl font-bold text-pink-700 mb-2">Apa Kata Mereka</h2>
            <p className="text-pink-400 text-[10px] sm:text-xs font-medium">Ulasan dari pelanggan setia Bloom & Bouquet</p>
          </div>
          <div className="w-10 sm:flex-1 h-[2px] bg-pink-300 rounded-full shrink-0" />
        </div>

        <div className="relative">
          {/* Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-2 sm:-left-4 z-10 hidden sm:block">
            <button 
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="p-2 sm:p-3 rounded-full bg-white text-pink-500 shadow-md border border-pink-100 hover:bg-pink-500 hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-pink-500 disabled:cursor-not-allowed transition-all duration-300"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 -right-2 sm:-right-4 z-10 hidden sm:block">
            <button 
              onClick={() => setCurrentPage(p => Math.min(Math.ceil(reviews.length / 4) - 1, p + 1))}
              disabled={currentPage >= Math.ceil(reviews.length / 4) - 1}
              className="p-2 sm:p-3 rounded-full bg-white text-pink-500 shadow-md border border-pink-100 hover:bg-pink-500 hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-pink-500 disabled:cursor-not-allowed transition-all duration-300"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex justify-between absolute top-1/2 -translate-y-1/2 w-full z-10 sm:hidden px-1">
            <button 
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="p-1.5 rounded-full bg-white text-pink-500 shadow-md border border-pink-100 hover:bg-pink-500 hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-pink-500 disabled:cursor-not-allowed transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => setCurrentPage(p => Math.min(reviews.length - 1, p + 1))}
              disabled={currentPage >= reviews.length - 1}
              className="p-1.5 rounded-full bg-white text-pink-500 shadow-md border border-pink-100 hover:bg-pink-500 hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-pink-500 disabled:cursor-not-allowed transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Carousel Track */}
          <div className="overflow-hidden px-2 sm:px-6 py-4">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-4 sm:gap-6"
              style={{
                // Responsive transform: on mobile, slide 1 item (100%). On desktop, slide 3 items (100% of container).
                // We'll handle this by making each item w-full on mobile, and w-1/3 on desktop.
              }}
            >
              {reviews.map((review, idx) => (
                <div 
                  key={review.id} 
                  className={`w-full sm:w-[calc(25%-1.125rem)] shrink-0 bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-pink-100 transition-transform duration-500 transform`}
                  style={{
                    transform: `translateX(calc(-${currentPage * 100}% - ${currentPage * 16}px))` // adjust for gap
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">
                        <User size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm">{review.customer}</h4>
                        <span className="text-[10px] text-gray-400">{review.date}</span>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"} />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">"{review.comment}"</p>
                  
                  {review.productImage && (
                    <div className="w-full h-32 rounded-xl overflow-hidden mt-auto border border-gray-100">
                      <img src={review.productImage} alt="Product Review" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Pagination Dots (Desktop) */}
          <div className="hidden sm:flex justify-center mt-6 gap-2">
            {[...Array(Math.ceil(reviews.length / 4))].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`h-2 rounded-full transition-all duration-300 ${currentPage === i ? "w-6 bg-pink-500" : "w-2 bg-pink-200"}`}
              />
            ))}
          </div>

          {/* Pagination Dots (Mobile) */}
          <div className="flex sm:hidden justify-center mt-6 gap-1.5 overflow-x-auto px-4">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`h-1.5 rounded-full transition-all duration-300 shrink-0 ${currentPage === i ? "w-4 bg-pink-500" : "w-1.5 bg-pink-200"}`}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ReviewCarousel;
