/**
 * FILE: src/Components/Footer.jsx
 * TUJUAN: Komponen bagian bawah (footer) global untuk seluruh halaman.
 * KETERHUBUNGAN: Dirender di `App.jsx` agar selalu muncul di bagian bawah aplikasi.
 */

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo2.png";
import { Flower, Heart, Mail } from "lucide-react";
import { FaInstagram, FaTiktok } from "react-icons/fa6";

const Footer = () => {
  const { currentUser } = useContext(AuthContext);
  const isAdmin = currentUser?.role === "admin";

  return (
    <footer className="bg-gradient-to-br from-pink-50 via-white to-pink-50 border-t border-pink-100 font-sans mt-16 relative overflow-hidden">
      {/* Dekorasi Latar */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-pink-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-200/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        <div className={`grid grid-cols-1 md:grid-cols-2 ${isAdmin ? "lg:grid-cols-3" : "lg:grid-cols-4"} gap-6 md:gap-8 mb-8`}>
          
          {/* BRAND INFO */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-tr from-pink-200 to-pink-50 p-1.5 rounded-full shadow-xs border border-pink-100">
                <img src={logo} alt="Bloom & Bouquet" className="h-9 w-9 object-cover rounded-full bg-white p-0.5" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-2xl sm:text-3xl font-cursive font-bold text-pink-600 leading-none">
                  Bloom & Bouquet
                </h2>
                {isAdmin && <span className="text-[10px] text-pink-400 font-semibold tracking-wider mt-1 uppercase">Pusat Kontrol Admin</span>}
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              {isAdmin 
                ? "Portal manajemen terpusat untuk mengelola seluruh data katalog bunga, transaksi pesanan, dan operasional Bloom & Bouquet."
                : "Mewujudkan perasaan serumit apa pun melalui rangkaian bunga estetik, buket kustom, dan kartu ucapan kustom yang dirangkai dengan cinta."}
            </p>
            {!isAdmin && (
              <div className="flex items-center gap-3 pt-2">
                <a href="#" className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition shadow-sm cursor-pointer" title="Instagram">
                  <FaInstagram size={14} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition shadow-sm cursor-pointer" title="TikTok">
                  <FaTiktok size={14} />
                </a>
              </div>
            )}
          </div>

          {/* NAVIGASI CEPAT */}
          <div>
            <h3 className="text-sm font-bold text-pink-800 tracking-wider mb-4 flex items-center gap-2">
              <Flower size={16} className="text-pink-400" />
              {isAdmin ? "Menu Admin" : "Navigasi"}
            </h3>
            <ul className="space-y-3 text-sm font-medium text-gray-500">
              {isAdmin ? (
                <>
                  <li><Link to="/admin" className="hover:text-pink-600 transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-pink-300"></span> Dasbor Utama</Link></li>
                  <li><Link to="/admin/produk" className="hover:text-pink-600 transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-pink-300"></span> Manajemen Produk</Link></li>
                  <li><Link to="/admin/pesanan" className="hover:text-pink-600 transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-pink-300"></span> Daftar Pesanan</Link></li>
                  <li><Link to="/admin/voucher" className="hover:text-pink-600 transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-pink-300"></span> Kelola Voucher</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/" className="hover:text-pink-600 transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-pink-300"></span> Beranda Utama</Link></li>
                  <li><Link to="/bunga" className="hover:text-pink-600 transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-pink-300"></span> Katalog Bunga</Link></li>
                  <li><Link to="/rangkai-buket" className="hover:text-pink-600 transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-pink-300"></span> Rangkai Buket Kustom</Link></li>
                  <li><Link to="/keranjang" className="hover:text-pink-600 transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-pink-300"></span> Keranjang Belanja</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* HUBUNGI KAMI */}
          <div>
            <h3 className="text-sm font-bold text-pink-800 tracking-wider mb-3 flex items-center gap-2">
              <Mail size={16} className="text-pink-400" />
              Kontak & Bantuan
            </h3>
            <div className="space-y-2 text-[13px] font-medium text-gray-500">
              <p className="leading-relaxed">
                Jalan Flora Indah No. 12<br/>
                Bandung, Jawa Barat, Indonesia
              </p>
              <p className="flex flex-col mt-2">
                <span className="text-[11px] text-pink-400">Email Bantuan:</span>
                <a href="mailto:support@hausofbloom.id" className="text-pink-600 font-bold hover:underline">support@bloomandbouquet.id</a>
              </p>
            </div>
          </div>

          {/* NEWSLETTER */}
          {!isAdmin && (
            <div className="lg:col-span-1 md:col-span-2">
              <div className="bg-white/60 p-4 rounded-2xl border border-pink-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-pink-100/50 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500"></div>
                <h3 className="text-[13px] font-bold text-pink-800 mb-1">Dapatkan Promo Eksklusif</h3>
                <p className="text-[11px] text-gray-500 mb-3 leading-relaxed">Berlangganan newsletter kami untuk info diskon dan koleksi terbaru.</p>
                <div className="flex gap-1.5">
                  <input type="email" placeholder="Email Anda" className="w-full p-2 text-xs border border-pink-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 transition" />
                  <button className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white p-2 rounded-lg transition shadow-sm cursor-pointer">
                    <Heart size={14} className="fill-white" />
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-pink-200/60 pt-6 text-center text-xs text-gray-400 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span>&copy; {new Date().getFullYear()} Bloom & Bouquet. All rights reserved.</span>
          <span className="flex items-center gap-1.5 font-medium bg-pink-50 px-3 py-1.5 rounded-full border border-pink-100">
            Crafted with <Heart size={12} className="fill-pink-500 text-pink-500 animate-pulse" /> for special moments
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;