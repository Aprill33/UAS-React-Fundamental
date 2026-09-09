/**
 * FILE: /src/Components/CustomAlert.jsx
 * TUJUAN: Komponen UI yang dapat digunakan berulang (Reusable Component).
 * KETERHUBUNGAN: Terintegrasi dengan komponen induk dan menggunakan Context API atau Hooks untuk mengelola datanya.
 */

import React from "react";
import { 
  Lock, 
  CheckCircle2, 
  ShoppingCart, 
  Heart, 
  Sparkles, 
  X, 
  ArrowRight, 
  Rocket,
  Trash2
} from "lucide-react";

const CustomAlert = ({
  isOpen,
  onClose,
  onConfirm,
  type = "login", // Pilihan tipe: "login", "cart", "favorite", "checkout", "success"
  title,
  message,
  confirmText = "Okey Siap",
  cancelText = "Nanti Aja Deh",
  showCancel = true,
}) => {
  if (!isOpen) return null;

  // Konfigurasi Ikon, Warna, & Judul Default
  const alertConfig = {
    login: {
      icon: Lock,
      titleIcon: Sparkles,
      bgColor: "bg-pink-100",
      textColor: "text-pink-500",
      btnColor: "bg-pink-500",
      defaultTitle: "Eits, Masuk Dulu Yuk!",
    },
    cart: {
      icon: ShoppingCart,
      titleIcon: ShoppingCart,
      bgColor: "bg-pink-100",
      textColor: "text-pink-600",
      btnColor: "bg-pink-500",
      defaultTitle: "Masuk Keranjang!",
    },
    cart_remove: {
      icon: Trash2,
      titleIcon: Trash2,
      bgColor: "bg-rose-100",
      textColor: "text-rose-500",
      btnColor: "bg-rose-500",
      defaultTitle: "Dihapus dari Keranjang",
    },
    favorite: {
      icon: Heart,
      titleIcon: Heart,
      bgColor: "bg-rose-100",
      textColor: "text-rose-500",
      btnColor: "bg-rose-500",
      defaultTitle: "Ditambahkan ke Favorit!",
    },
    checkout: {
      icon: Sparkles,
      titleIcon: Sparkles,
      bgColor: "bg-pink-100",
      textColor: "text-pink-600",
      btnColor: "bg-pink-500",
      defaultTitle: "Pesanan Diproses!",
    },
    success: {
      icon: CheckCircle2,
      titleIcon: CheckCircle2,
      bgColor: "bg-pink-100",
      textColor: "text-pink-600",
      btnColor: "bg-pink-500",
      defaultTitle: "Berhasil!",
    },
    success_modal: {
      icon: CheckCircle2,
      titleIcon: CheckCircle2,
      bgColor: "bg-pink-100",
      textColor: "text-pink-600",
      btnColor: "bg-pink-500",
      defaultTitle: "Berhasil!",
    },
    error_toast: {
      icon: X,
      titleIcon: X,
      bgColor: "bg-rose-100",
      textColor: "text-rose-500",
      btnColor: "bg-rose-500",
      defaultTitle: "Ups, Gagal!",
    },
    delete_confirm: {
      icon: Trash2,
      titleIcon: Trash2,
      bgColor: "bg-rose-100",
      textColor: "text-rose-600",
      btnColor: "bg-rose-500",
      defaultTitle: "Konfirmasi Hapus",
    },
  };

  const currentConfig = alertConfig[type] || alertConfig.login;
  const IconComponent = currentConfig.icon;
  const TitleIconComponent = currentConfig.titleIcon;

  // Jika tipenya success, favorite, cart, cart_remove, atau error_toast tampilkan bergaya Toast / Notifikasi dari atas
  if (["success", "favorite", "cart", "cart_remove", "error_toast"].includes(type)) {
    const isRed = type === "favorite" || type === "cart_remove" || type === "error_toast";
    const borderColor = isRed ? "border-rose-100" : "border-pink-200";
    const titleColor = isRed ? "text-rose-900" : "text-pink-800";

    return (
      <div className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-[70] animate-in slide-in-from-top-8 fade-in duration-300 w-[85%] sm:w-[90%] max-w-md">
        <div className={`bg-white rounded-2xl shadow-xl border ${borderColor} p-3 sm:p-4 flex items-start gap-3 sm:gap-4 relative`}>
          <div className={`w-8 h-8 sm:w-10 sm:h-10 shrink-0 ${currentConfig.bgColor} ${currentConfig.textColor} rounded-full flex items-center justify-center shadow-sm`}>
            <IconComponent size={16} className="sm:w-5 sm:h-5" />
          </div>
          
          <div className="flex-1 pt-0 sm:pt-0.5">
            <h4 className={`font-bold text-xs sm:text-sm ${titleColor} flex items-center gap-1.5 leading-tight mb-0.5 sm:mb-0`}>
              {title || currentConfig.defaultTitle}
            </h4>
            <p className="text-[10px] sm:text-xs text-gray-500 sm:mt-0.5 leading-relaxed">
              {message}
            </p>
          </div>

          <button 
            onClick={onClose} 
            className="p-1 sm:p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition cursor-pointer"
          >
            <X size={14} className="sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Tampilan Modal Default untuk tipe lainnya
  return (
    <div className="fixed inset-0 w-screen h-screen z-[60] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-[1.5rem] max-w-[90%] w-80 sm:w-96 p-6 sm:p-8 shadow-2xl border border-pink-100 text-center space-y-4 relative animate-in zoom-in-95 duration-200">
        
        {/* Tombol Silang Pojok Atas */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-400 flex items-center justify-center transition cursor-pointer"
        >
          <X size={14} />
        </button>

        {/* Ikon Alert Utama */}
        <div className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto ${currentConfig.bgColor} ${currentConfig.textColor} rounded-full flex items-center justify-center shadow-xs`}>
          <IconComponent size={28} className="sm:w-8 sm:h-8" />
        </div>

        {/* Judul & Pesan */}
        <div className="space-y-2">
          <h4 className={`font-serif font-bold text-lg sm:text-xl ${currentConfig.textColor.replace('text-', 'text-')} flex items-center justify-center gap-1.5`}>
            <span>{title || currentConfig.defaultTitle}</span>
          </h4>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed px-2">
            {message}
          </p>
        </div>

        {/* Tombol Aksi */}
        <div className="pt-3 space-y-2 sm:space-y-3">
          <button
            type="button"
            onClick={onConfirm || onClose}
            className={`w-full py-3 sm:py-3.5 ${currentConfig.btnColor} hover:opacity-90 text-white font-bold text-xs sm:text-sm rounded-full shadow-sm transition cursor-pointer flex items-center justify-center gap-2`}
          >
            <span>{confirmText}</span>
          </button>

          {showCancel && (
            <button
              type="button"
              onClick={onClose}
              className={`w-full py-2.5 sm:py-3 bg-gray-50 hover:bg-gray-100 text-gray-500 font-bold text-xs sm:text-sm rounded-full transition cursor-pointer`}
            >
              {cancelText}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default CustomAlert;