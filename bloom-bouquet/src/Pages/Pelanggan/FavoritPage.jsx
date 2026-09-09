/**
 * FILE: /src/Pages/Pelanggan/FavoritPage.jsx
 * TUJUAN: Halaman aplikasi utama yang merender antarmuka pengguna.
 * KETERHUBUNGAN: Terintegrasi dengan komponen induk dan menggunakan Context API atau Hooks untuk mengelola datanya.
 */

import { useContext, useState } from "react";
import { FavoriteContext } from "../../context/FavoriteContext";
import { AuthContext } from "../../context/AuthContext";
import { flowers } from "../../Data/Flowers";
import { Heart, Search, ShoppingBag, ArrowLeft } from "lucide-react";
import ProductCard from "../../Components/ProductCard";
import ProductDetailModal from "../../Components/ProductDetailModal";
import Pagination from "../../Components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import usePagination from "../../hooks/usePagination";

const Favorites = () => {
  const { wishlist, toggleWishlist } = useContext(FavoriteContext);
  const { currentUser } = useContext(AuthContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  if (!currentUser) return null; // Protected route handles redirect

  const favoriteProducts = flowers.filter(flower => wishlist.includes(flower.id));

  // Menggunakan custom hook paginasi
  const { currentData: currentFavorites, totalPages, currentPage, setCurrentPage } = usePagination(favoriteProducts, 8);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // [DI LUAR MODUL] window.scrollTo: Memanipulasi browser untuk menggulir halaman ke koordinat tertentu.
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 font-sans min-h-[70vh]">
      
      {/* TOMBOL KEMBALI */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-pink-500 hover:text-white text-pink-600 font-bold text-xs rounded-full shadow-sm border border-pink-200 transition-all duration-300 cursor-pointer hover:shadow-md hover:-translate-x-1"
        >
          <ArrowLeft size={16} />
          <span>Kembali</span>
        </button>
      </div>

      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="flex-1 h-[1.5px] bg-pink-200" />
        <div className="text-center shrink-0 px-2 flex flex-col items-center">
          <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-3 shadow-sm border border-pink-200">
            <Heart size={32} className="text-pink-500" fill="currentColor" />
          </div>
          <h2 className="text-3xl font-cursive font-bold text-pink-700 mb-1">
            Bunga Favoritku
          </h2>
          <p className="text-xs text-pink-500">Koleksi bunga cantik yang paling kamu sukai</p>
        </div>
        <div className="flex-1 h-[1.5px] bg-pink-200" />
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white rounded-3xl p-12 shadow-sm border border-pink-100 text-center animate-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mb-6 text-pink-300">
            <Heart size={48} />
          </div>
          <h3 className="text-2xl font-serif font-bold text-pink-900 mb-2">Belum Ada Favorit</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            Kamu belum menambahkan bunga apapun ke daftar favorit. Yuk, telusuri koleksi kami dan simpan bunga yang paling menarik hatimu!
          </p>
          <Link 
            to="/bunga" 
            className="px-8 py-3.5 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition flex items-center gap-2"
          >
            <Search size={18} />
            Mulai Cari Bunga
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {currentFavorites.map((produk) => (
              <ProductCard 
                key={produk.id} 
                produk={produk} 
                isWishlisted={wishlist.includes(produk.id)} 
                onToggleWishlist={toggleWishlist}
                onOpenDetail={setSelectedProduct}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
              />
            </div>
          )}
        </>
      )}

      {selectedProduct && (
        <ProductDetailModal 
          produk={selectedProduct} 
          isWishlisted={wishlist.includes(selectedProduct.id)}
          onToggleWishlist={toggleWishlist}
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default Favorites;
