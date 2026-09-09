/**
 * FILE: src/Components/ProductCard.jsx
 * TUJUAN: Komponen kartu untuk menampilkan ringkasan satu item produk (gambar, harga, rating) di katalog.
 * KETERHUBUNGAN: Digunakan berulang kali oleh `ProductList.jsx` atau `FlowersPage.jsx`.
 */

import { Heart, Star, Eye } from "lucide-react";

const statusStyle = {
  "Best Seller": "bg-pink-500 text-white",
  "Ready Stock": "bg-yellow-100 text-yellow-700 border border-yellow-300",
  "Stok Terbatas": "bg-orange-100 text-orange-600 border border-orange-300",
  "Produk Baru": "bg-pink-100 text-pink-600 border border-pink-300",
  "Diskon": "bg-red-100 text-red-600 border border-red-300",
};

const formatRupiah = (angka) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(angka);

const ProductCard = ({ produk, isWishlisted, onToggleWishlist, onOpenDetail }) => {
  const habis = produk.stok === 0;

  return (
    <div className="group bg-white rounded-2xl border border-pink-100 shadow-sm hover:shadow-soft hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col">
      <div className="relative">
        <img
          src={produk.gambarProduk}
          alt={produk.namaProduk}
          className="w-full aspect-square object-cover"
        />

        <span
          className={`absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full ${
            statusStyle[produk.statusProduk] || "bg-pink-100 text-pink-600"
          }`}
        >
          {produk.statusProduk === "Diskon" && produk.diskon ? `Diskon ${produk.diskon}%` : produk.statusProduk}
        </span>

        <button
          type="button"
          onClick={() => onToggleWishlist(produk.id)}
          aria-label="Toggle wishlist"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <Heart
            size={18}
            className={isWishlisted ? "text-pink-500" : "text-pink-300"}
            fill={isWishlisted ? "#f8619c" : "none"}
          />
        </button>

        {habis && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-pink-700 text-white text-xs font-bold px-3 py-1 rounded-full">
              Stok Habis
            </span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-pink-400">
          <span className="uppercase tracking-wide">{produk.kategori}</span>
          <span>•</span>
          <span className="text-pink-500 font-semibold">{produk.jenis}</span>
        </div>

        <h4 className="font-display font-semibold text-pink-700 text-base leading-snug mt-1 line-clamp-2">
          {produk.namaProduk}
        </h4>

        <div className="flex items-center gap-1 mt-1.5 text-xs text-pink-400">
          <Star size={13} className="text-yellow-400" fill="#ffd257" />
          <span>{produk.rating}</span>
          <span className="text-pink-200">•</span>
          <span>Stok {produk.stok}</span>
        </div>

        {produk.diskon ? (
          <div className="mt-1 flex items-baseline gap-2">
            <p className="font-bold text-pink-600 text-lg">{formatRupiah(produk.harga - (produk.harga * produk.diskon / 100))}</p>
            <p className="text-xs text-gray-400 line-through">{formatRupiah(produk.harga)}</p>
          </div>
        ) : (
          <p className="mt-2 font-bold text-pink-600 text-lg">{formatRupiah(produk.harga)}</p>
        )}

        <button
          type="button"
          onClick={() => onOpenDetail(produk)}
          className="mt-auto pt-3 w-full inline-flex items-center justify-center gap-1.5 bg-pink-50 hover:bg-pink-500 hover:text-white text-pink-600 text-sm font-semibold py-2 rounded-full border border-pink-200 hover:border-pink-500 transition-colors"
        >
          <Eye size={15} />
          Lihat Detail
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
export { formatRupiah };