/**
 * FILE: src/Components/ProductDetailModal.jsx
 * TUJUAN: Menampilkan modal/popup detail sebuah produk (buket/bunga).
 * KETERHUBUNGAN: Menerima props dari halaman induk (Home, FlowersPage, BouquetBuilder, dll).
 */

import { X, Heart, ShoppingCart, Star, Package } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import CustomAlert from "./CustomAlert";

const ProductDetailModal = ({ produk, isWishlisted, onClose, onToggleWishlist }) => {
  const { addToCart, setSelectedItems } = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  if (!produk) return null;

  const handleAddToCart = () => {
    if (!currentUser) {
      // [DI LUAR MODUL] sessionStorage: Menyimpan data sementara di browser (hilang saat tab ditutup).
      // [DI LUAR MODUL] JSON.stringify: Mengubah objek JS menjadi string JSON (karena Storage API hanya menerima string).
      sessionStorage.setItem("pendingBouquet", JSON.stringify(produk));
      setShowAlert(true);
      return;
    }
    addToCart(produk, 1);
  };

  return (
    <>
      {/* Alert Login jika belum login */}
      <CustomAlert
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        onConfirm={() => {
          setShowAlert(false);
          onClose(); // Tutup modal produk juga sebelum pindah halaman
          navigate("/masuk");
        }}
        type="login"
        message="Masuk ke akunmu dulu yuk untuk mulai belanja bunga cantik ini!"
        confirmText="Okey Siap"
        cancelText="Nanti Aja Deh"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-pink-50/60 backdrop-blur-md animate-in fade-in duration-200">
        <div 
          className="bg-white w-full max-w-[800px] max-h-[90vh] sm:max-h-[500px] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col sm:flex-row relative animate-in zoom-in-95 duration-300 border border-pink-100"
          // [DI LUAR MODUL] stopPropagation: Mencegah event merambat/bubble ke parent elemen HTML.
          onClick={(e) => e.stopPropagation()}
        >
        {/* Tombol Tutup */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-md hover:bg-pink-100 p-2 rounded-full text-pink-700 shadow-sm transition hover:scale-110"
        >
          <X size={18} />
        </button>

        {/* Bagian Gambar (Kiri) */}
        <div className="w-full sm:w-[45%] h-56 sm:h-auto relative bg-pink-50/50 shrink-0">
          <img 
            src={produk.gambarProduk || produk.gambar || produk.img} 
            alt={produk.namaProduk || produk.nama} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent sm:hidden" />
          {produk.statusProduk && (
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-pink-600 text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
              {produk.statusProduk === "Diskon" && produk.diskon ? `Diskon ${produk.diskon}%` : produk.statusProduk}
            </div>
          )}
        </div>

        {/* Bagian Info Produk (Kanan) */}
        <div className="w-full sm:w-[55%] p-5 sm:p-7 flex flex-col overflow-y-auto custom-scrollbar">
          <div className="mb-1 text-[10px] sm:text-xs font-bold text-pink-400 uppercase tracking-widest flex items-center gap-2">
            <span>{produk.kategori || "Buket Bunga"}</span>
            <span className="w-1 h-1 rounded-full bg-pink-300" />
            <span>{produk.jenis || "Campur"}</span>
          </div>
          
          <h2 className="text-xl sm:text-3xl font-serif font-bold text-pink-900 mb-3 leading-tight pr-8">
            {produk.namaProduk || produk.nama}
          </h2>
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 text-xs sm:text-sm text-gray-500 font-medium">
            <div className="flex items-center gap-1.5 bg-amber-50 text-amber-600 px-2.5 py-1.5 rounded-lg border border-amber-100">
              <Star size={14} fill="currentColor" />
              <span>{produk.rating || "4.8"} / 5.0</span>
            </div>
            <div className="flex items-center gap-1.5 bg-pink-50 text-pink-600 px-2.5 py-1.5 rounded-lg border border-pink-100">
              <Package size={14} />
              <span>Sisa {produk.stok ?? "10"} Item</span>
            </div>
          </div>

          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 flex-grow">
            {produk.deskripsi || "Rangkaian bunga segar dan cantik, dirangkai khusus untuk momen terbaikmu."}
          </p>

          <div className="mt-auto space-y-4 pt-4 border-t border-pink-50">
            <div className="flex items-end justify-between">
              <div className="text-gray-500 text-xs sm:text-sm font-medium">Harga Spesial</div>
              <div className="flex flex-col items-end">
                {produk.diskon && (
                  <span className="text-sm text-gray-400 line-through">
                    Rp {Number(produk.harga || 150000).toLocaleString("id-ID")}
                  </span>
                )}
                <div className="text-2xl sm:text-3xl font-bold text-pink-600 font-sans tracking-tight">
                  Rp {Number(produk.diskon ? produk.harga - (produk.harga * produk.diskon / 100) : (produk.harga || 150000)).toLocaleString("id-ID")}
                </div>
              </div>
            </div>

            <div className="flex gap-2 sm:gap-3">
              <button 
                onClick={(e) => {
                  // [DI LUAR MODUL] stopPropagation: Mencegah event merambat/bubble ke parent elemen HTML.
                  e.stopPropagation();
                  if (!currentUser) {
                    // [DI LUAR MODUL] sessionStorage: Menyimpan data sementara di browser (hilang saat tab ditutup).
                    sessionStorage.setItem("pendingFavorite", produk.id);
                    setShowAlert(true);
                    return;
                  }
                  onToggleWishlist(produk.id);
                }}
                className="p-3 sm:p-3.5 border-2 border-pink-200 text-pink-500 rounded-xl hover:bg-pink-50 hover:border-pink-300 transition flex items-center justify-center shrink-0 group cursor-pointer"
                title="Tambahkan ke Favorit"
              >
                <Heart 
                  size={20} 
                  fill={isWishlisted ? "currentColor" : "none"} 
                  className={isWishlisted ? "text-pink-500" : "group-hover:scale-110 transition"}
                />
              </button>
              
              <button 
                onClick={handleAddToCart}
                disabled={produk.stok === 0}
                className="p-3 sm:p-3.5 bg-pink-100 hover:bg-pink-200 text-pink-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-sm transition flex items-center justify-center shrink-0 cursor-pointer"
                title={produk.stok === 0 ? "Stok Habis" : "Masukkan Keranjang"}
              >
                <ShoppingCart size={20} />
              </button>
              
              <button 
                onClick={(e) => {
                  // [DI LUAR MODUL] stopPropagation: Mencegah event merambat/bubble ke parent elemen HTML.
                  e.stopPropagation();
                  if (!currentUser) {
                    // [DI LUAR MODUL] sessionStorage: Menyimpan data sementara di browser (hilang saat tab ditutup).
                    // [DI LUAR MODUL] JSON.stringify: Mengubah objek JS menjadi string JSON (karena Storage API hanya menerima string).
                    sessionStorage.setItem("pendingCheckout", JSON.stringify(produk));
                    setShowAlert(true);
                    return;
                  }
                  // Pindah langsung ke checkout dengan membawa data produk (qty = 1 default)
                  onClose();
                  navigate("/checkout", { 
                    state: { 
                      buyNowItem: {
                        id: produk.id,
                        namaProduk: produk.namaProduk,
                        harga: produk.diskon ? produk.harga - (produk.harga * produk.diskon / 100) : produk.harga,
                        gambarProduk: produk.gambarProduk,
                        kategori: produk.kategori,
                        jenis: produk.jenis,
                        diskon: produk.diskon,
                        qty: 1
                      }
                    } 
                  });
                }}
                disabled={produk.stok === 0}
                className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 disabled:from-gray-300 disabled:to-gray-400 disabled:text-gray-500 text-white font-bold py-3 sm:py-3.5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition flex items-center justify-center cursor-pointer"
              >
                <span className="text-xs sm:text-sm">{produk.stok === 0 ? "Stok Habis" : "Beli Sekarang"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

        {/* Area Luar untuk Menutup Modal */}
        <div className="absolute inset-0 z-[-1]" onClick={onClose} />
      </div>
    </>
  );
};

export default ProductDetailModal;