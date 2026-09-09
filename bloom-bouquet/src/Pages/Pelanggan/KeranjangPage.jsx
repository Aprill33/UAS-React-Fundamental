/**
 * FILE: /src/Pages/Pelanggan/KeranjangPage.jsx
 * TUJUAN: Halaman aplikasi utama yang merender antarmuka pengguna.
 * KETERHUBUNGAN: Terintegrasi dengan komponen induk dan menggunakan Context API atau Hooks untuk mengelola datanya.
 */

import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { OrderContext } from "../../context/OrderContext";
import { Link, useNavigate } from "react-router-dom";
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  ArrowRight,
  Receipt,
  Sparkles,
  ShieldCheck,
  Truck,
  CheckSquare,
  Square
} from "lucide-react";
import CustomAlert from "../../Components/CustomAlert";

const Cart = () => {
  const { 
    cartItems, 
    selectedItems,
    toggleSelection,
    toggleAllSelection,
    removeFromCart, 
    updateQty, 
    clearCart, 
    totalAsli, 
    totalDiskon, 
    totalHarga 
  } = useContext(CartContext);
  const { addOrder } = useContext(OrderContext);
  const navigate = useNavigate();
  const [showCheckoutAlert, setShowCheckoutAlert] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleCheckout = () => {
    if (cartItems.length === 0 || selectedItems.length === 0) return;
    navigate("/checkout");
  };

  const handleClearCart = () => {
    setShowClearConfirm(true);
  };

  const handleDecrease = (item) => {
    if (item.qty === 1) {
      setItemToDelete(item);
    } else {
      updateQty(item.id, -1);
    }
  };

  // Jika keranjang kosong
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[75vh] flex flex-col justify-center bg-gradient-to-b from-pink-50/50 to-white font-sans py-12 px-4 relative">
        <button
          onClick={() => navigate("/bunga")}
          className="absolute top-8 left-4 sm:left-8 inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-pink-500 hover:text-white text-pink-600 font-bold text-xs rounded-full shadow-sm border border-pink-200 transition-all duration-300 cursor-pointer hover:shadow-md hover:-translate-x-1"
        >
          <ArrowLeft size={16} />
          <span>Kembali</span>
        </button>

        <div className="max-w-md mx-auto text-center space-y-6 animate-in zoom-in-95 duration-500">
          <div className="w-32 h-32 bg-pink-100 rounded-full flex items-center justify-center mx-auto shadow-inner border border-pink-200">
            <ShoppingCart size={56} className="text-pink-400 opacity-80" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-cursive font-bold text-pink-800">Keranjang Kosong</h2>
            <p className="text-sm text-gray-500">
              Belum ada bunga cantik yang kamu tambahkan. Yuk, cari buket spesial untuk hari istimewamu!
            </p>
          </div>

          <Link
            to="/bunga"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-bold text-sm rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition duration-300"
          >
            <span>Mulai Belanja</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  // Jika keranjang ada isinya
  return (
    <div className="bg-pink-50/30 min-h-screen font-sans pb-20">
      
      <CustomAlert
        isOpen={showCheckoutAlert}
        onClose={() => {
          setShowCheckoutAlert(false);
          navigate("/pesanan");
        }}
        type="checkout"
        title="Pesanan Berhasil Dibuat!"
        message="Terima kasih, pembayaranmu telah dikonfirmasi. Bunga cantikmu akan segera kami kemas!"
        confirmText="Lihat Pesanan"
        showCancel={false}
      />

      <CustomAlert
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={() => {
          clearCart();
          setShowClearConfirm(false);
        }}
        type="delete_confirm"
        title="Kosongkan Keranjang?"
        message="Apakah Anda yakin ingin menghapus semua pesanan bunga di keranjang ini?"
        confirmText="Ya, Kosongkan"
        showCancel={true}
      />

      <CustomAlert
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={() => {
          if (itemToDelete) removeFromCart(itemToDelete.id);
          setItemToDelete(null);
        }}
        type="delete_confirm"
        title="Hapus dari Keranjang?"
        message={`Apakah Anda yakin ingin menghapus "${itemToDelete?.namaProduk}" dari keranjang?`}
        confirmText="Ya, Hapus"
        showCancel={true}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 mb-6">
        <button
          onClick={() => navigate("/bunga")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-pink-500 hover:text-white text-pink-600 font-bold text-xs rounded-full shadow-sm border border-pink-200 transition-all duration-300 cursor-pointer hover:shadow-md hover:-translate-x-1"
        >
          <ArrowLeft size={16} />
          <span>Lanjut Belanja</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        <div className="flex items-center justify-center gap-4">
          <div className="flex-1 h-[1.5px] bg-pink-200" />
          <div className="text-center shrink-0 px-2 space-y-1">
            <h1 className="text-3xl sm:text-4xl font-cursive font-bold text-pink-700">Keranjang Belanja</h1>
            <p className="text-xs sm:text-sm text-pink-500">Tinjau kembali pilihan bunga pesananmu sebelum checkout</p>
          </div>
          <div className="flex-1 h-[1.5px] bg-pink-200" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-8">
        
        {/* KIRI: DAFTAR PRODUK */}
        <div className="flex-1 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm">
            <div className="flex items-center justify-between border-b border-pink-100 pb-4 mb-4">
              <h2 className="font-bold text-pink-800 text-lg flex items-center gap-2">
                <ShoppingCart size={20} className="text-pink-500" />
                Daftar Pesanan ({cartItems.length})
              </h2>
              <button 
                onClick={handleClearCart}
                className="text-xs font-bold text-pink-400 hover:text-red-500 transition cursor-pointer"
              >
                Kosongkan Semua
              </button>
            </div>

            <div className="flex items-center gap-2 mb-4 px-2">
              <button onClick={toggleAllSelection} className="text-pink-500 hover:text-pink-600 cursor-pointer">
                {selectedItems.length === cartItems.length && cartItems.length > 0 ? (
                  <CheckSquare size={20} className="fill-pink-50 text-pink-500" />
                ) : (
                  <Square size={20} />
                )}
              </button>
              <span className="text-sm font-bold text-gray-600">Pilih Semua ({cartItems.length})</span>
            </div>

            <div className="space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl border transition duration-300 gap-4 group relative ${
                    selectedItems.includes(item.id) ? "bg-pink-50/40 border-pink-300 shadow-sm" : "bg-white border-pink-100 hover:border-pink-200"
                  }`}
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <button onClick={() => toggleSelection(item.id)} className="text-pink-500 hover:text-pink-600 shrink-0 cursor-pointer">
                      {selectedItems.includes(item.id) ? (
                        <CheckSquare size={20} className="fill-pink-50 text-pink-500" />
                      ) : (
                        <Square size={20} />
                      )}
                    </button>
                    <div className="w-20 h-20 bg-white rounded-xl overflow-hidden shadow-sm shrink-0 border border-pink-50 relative">
                      <img
                        src={item.gambarProduk}
                        alt={item.namaProduk}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wide">
                        {item.kategori || "Buket"}
                      </span>
                      <h3 className="font-serif font-bold text-pink-900 text-base leading-tight">
                        {item.namaProduk}
                      </h3>
                      <div className="text-sm font-bold text-pink-600">
                        Rp {item.harga.toLocaleString("id-ID")}
                      </div>
                      {item.deskripsi && item.kategori === "Custom" && (
                        <p className="text-[11px] text-gray-500 max-w-xs leading-relaxed line-clamp-2 mt-1">
                          {item.deskripsi}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 sm:gap-4 mt-2 sm:mt-0">
                    <div className="flex items-center bg-white border border-pink-200 rounded-full p-1 shadow-xs">
                      <button
                        onClick={() => handleDecrease(item)}
                        className="w-7 h-7 rounded-full bg-pink-50 text-pink-600 hover:bg-pink-500 hover:text-white flex items-center justify-center transition cursor-pointer"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-pink-900">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="w-7 h-7 rounded-full bg-pink-50 text-pink-600 hover:bg-pink-500 hover:text-white flex items-center justify-center transition cursor-pointer"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="text-right w-24 hidden sm:block">
                      <span className="text-xs text-gray-400 block">Subtotal</span>
                      <span className="font-bold text-pink-700 text-sm">
                        Rp {((item.diskon ? item.harga - (item.harga * item.diskon / 100) : item.harga) * item.qty).toLocaleString("id-ID")}
                      </span>
                    </div>

                    <button
                      onClick={() => setItemToDelete(item)}
                      className="p-2 text-pink-300 hover:text-red-500 hover:bg-red-50 rounded-full transition cursor-pointer absolute top-2 right-2 sm:static sm:top-auto sm:right-auto"
                      title="Hapus"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* KANAN: RINGKASAN BELANJA */}
        <div className="lg:w-[380px] shrink-0 h-fit space-y-4 sticky top-6">
          <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm">
            <h3 className="font-bold text-pink-800 text-lg flex items-center gap-2 mb-4 border-b border-pink-100 pb-4">
              <Receipt size={20} className="text-pink-500" />
              Ringkasan Belanja
            </h3>
            
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Total Harga ({cartItems.filter(item => selectedItems.includes(item.id)).reduce((acc, item) => acc + item.qty, 0)} barang)</span>
                <span className="font-semibold text-gray-800">Rp {totalAsli.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Total Diskon Barang</span>
                <span className="font-semibold text-emerald-500">- Rp {totalDiskon.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Ongkos Kirim</span>
                <span className="font-semibold text-gray-800">Dihitung saat checkout</span>
              </div>
            </div>

            <div className="border-t border-pink-100 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-bold text-pink-900 text-base">Total Belanja</span>
                <span className="text-xl font-bold text-pink-600">
                  Rp {totalHarga.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={selectedItems.length === 0}
              className={`w-full py-3.5 rounded-full font-bold shadow-lg flex items-center justify-center gap-2 transition duration-300 ${
                selectedItems.length > 0 
                  ? "bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white hover:shadow-xl hover:-translate-y-1 cursor-pointer" 
                  : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
              }`}
            >
              <Sparkles size={18} />
              Beli Sekarang
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-pink-100 shadow-sm flex flex-col items-center justify-center text-center gap-2">
              <ShieldCheck size={24} className="text-emerald-500" />
              <span className="text-[10px] font-semibold text-gray-500 leading-tight">Transaksi<br/>Aman & Terlindungi</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-pink-100 shadow-sm flex flex-col items-center justify-center text-center gap-2">
              <Truck size={24} className="text-blue-400" />
              <span className="text-[10px] font-semibold text-gray-500 leading-tight">Pengiriman<br/>Cepat & Aman</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;