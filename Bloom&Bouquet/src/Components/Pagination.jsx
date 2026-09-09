import React from "react";
/**
 * FILE: src/Components/Pagination.jsx
 * TUJUAN: Komponen kontrol navigasi halaman (Prev, Next, Nomor) untuk membagi daftar produk yang panjang.
 * KETERHUBUNGAN: Digunakan oleh `FlowersPage.jsx` dan `FlowerMeaningDetail.jsx`.
 */

import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Tombol Previous */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-full border border-pink-200 text-pink-600 hover:bg-pink-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Nomor Halaman Dinamis */}
      <div className="flex gap-1.5">
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 text-xs font-bold rounded-full transition ${
              currentPage === page
                ? "bg-pink-500 text-white shadow-sm"
                : "bg-white text-pink-600 border border-pink-200 hover:bg-pink-50"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Tombol Next */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full border border-pink-200 text-pink-600 hover:bg-pink-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;