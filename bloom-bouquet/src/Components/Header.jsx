/**
 * FILE: src/Components/Header.jsx
 * TUJUAN: Komponen navigasi atas (navbar) aplikasi.
 * KETERHUBUNGAN: Menggunakan `AuthContext` untuk menampilkan status profil, `CartContext` untuk menampilkan jumlah item di keranjang.
 */

// [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
import { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import CustomAlert from "./CustomAlert";
import logo from "../assets/logo2.png";
import { Sparkles, ShoppingCart, User, Home, Flower, BookOpen, Heart, Menu, X, ClipboardList, LogOut, Bell, Package, LayoutDashboard, Tag } from "lucide-react";

const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [alertData, setAlertData] = useState({
    isOpen: false,
    type: "login",
    title: "",
    message: "",
    confirmText: "Okey Siap",
    cancelText: "Nanti Aja Deh",
    onConfirm: null
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [hasUnreadNotif, setHasUnreadNotif] = useState(false);
  const [notifList, setNotifList] = useState([]);

  // [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
  useEffect(() => {
    if (!currentUser) return;

    const checkNotifs = () => {
      const key = currentUser.role === "admin" ? "notif_admin" : `notif_user_${currentUser.username}`;
      // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
      const saved = localStorage.getItem(key);
      // [DI LUAR MODUL] JSON.parse: Mengubah string JSON kembali menjadi objek JavaScript.
      const notifs = saved ? JSON.parse(saved) : [];
      
      setNotifList(notifs);
      
      const hasUnread = notifs.some(n => !n.read);
      if (hasUnread && !isNotifOpen) {
        setHasUnreadNotif(true);
      } else if (!hasUnread) {
        setHasUnreadNotif(false);
      }
    };

    checkNotifs();
    window.addEventListener("storage", checkNotifs);
    
    // Polling for local updates in the same window
    const interval = setInterval(checkNotifs, 3000); 

    return () => {
      window.removeEventListener("storage", checkNotifs);
      clearInterval(interval);
    };
  }, [currentUser, isNotifOpen]);

  const toggleNotif = () => {
    setIsNotifOpen(!isNotifOpen);
    if (!isNotifOpen) {
      setHasUnreadNotif(false);
      if (currentUser) {
        const key = currentUser.role === "admin" ? "notif_admin" : `notif_user_${currentUser.username}`;
        const updated = notifList.map(n => ({...n, read: true}));
        // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
        // [DI LUAR MODUL] JSON.stringify: Mengubah objek JS menjadi string JSON (karena Storage API hanya menerima string).
        localStorage.setItem(key, JSON.stringify(updated));
      }
    }
  };

  const clearNotifs = () => {
    if (!currentUser) return;
    const key = currentUser.role === "admin" ? "notif_admin" : `notif_user_${currentUser.username}`;
    setNotifList([]);
    // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
    // [DI LUAR MODUL] JSON.stringify: Mengubah objek JS menjadi string JSON (karena Storage API hanya menerima string).
    localStorage.setItem(key, JSON.stringify([]));
    setHasUnreadNotif(false);
  };

  const closeAlert = () => setAlertData(prev => ({ ...prev, isOpen: false }));

  const handleProtectedAction = (path, e) => {
    if (!currentUser) {
      // [DI LUAR MODUL] preventDefault: Mencegah aksi bawaan browser (misal form submit page reload).
      if (e) e.preventDefault();
      setAlertData({
        isOpen: true,
        type: "login",
        title: "",
        message: "Masuk ke akunmu dulu yuk untuk mengakses fitur ini!",
        confirmText: "Okey Siap",
        cancelText: "Nanti Aja Deh",
        onConfirm: () => {
          closeAlert();
          navigate("/masuk");
        }
      });
    } else {
      navigate(path);
    }
    setMobileMenuOpen(false);
  };

  const isActive = (path) => {
    if (path === "/arti-bunga") {
      return location.pathname === "/arti-bunga" || (location.pathname.startsWith("/bunga/") && location.pathname !== "/bunga");
    }
    if (path === "/bunga") {
      return location.pathname === "/bunga";
    }
    return location.pathname === path;
  };

  const totalCartItems = cartItems ? cartItems.reduce((acc, item) => acc + (item.qty || 1), 0) : 0;

  return (
    <>
      <CustomAlert
        isOpen={alertData.isOpen}
        onClose={closeAlert}
        onConfirm={alertData.onConfirm}
        type={alertData.type}
        title={alertData.title}
        message={alertData.message}
        confirmText={alertData.confirmText}
        cancelText={alertData.cancelText}
      />

      {/* Drawer Pemberitahuan */}
      {currentUser && (
        <>
          {/* Overlay */}
          <div 
            className={`fixed inset-0 bg-pink-900/20 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isNotifOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} 
            onClick={() => setIsNotifOpen(false)}
          />
          {/* Side Panel */}
          <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-out flex flex-col border-l border-pink-100 ${isNotifOpen ? "translate-x-0" : "translate-x-full"}`}>
            <div className="p-5 border-b border-pink-100 flex items-center justify-between bg-pink-50/50">
              <h3 className="font-bold text-pink-900 flex items-center gap-2">
                <Bell size={18} className="text-pink-500" /> Pemberitahuan
              </h3>
              <button onClick={() => setIsNotifOpen(false)} className="p-1.5 text-pink-400 hover:text-pink-600 hover:bg-pink-100 rounded-full transition cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {notifList.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-400 text-sm font-medium">Belum ada pemberitahuan baru.</p>
                </div>
              ) : (
                notifList.map((notif, idx) => (
                  <div key={notif.id || idx} className={`bg-white border ${notif.read ? 'border-gray-100' : 'border-pink-200 shadow-sm'} rounded-2xl p-4 transition cursor-default relative overflow-hidden`}>
                    {!notif.read && <div className="absolute left-0 top-0 bottom-0 w-1 bg-pink-400"></div>}
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${notif.read ? 'text-gray-500 bg-gray-50' : 'text-pink-600 bg-pink-50'}`}>Info</span>
                      <span className="text-[10px] text-gray-400 font-medium">{notif.date || "Baru saja"}</span>
                    </div>
                    <p className={`text-sm mt-2 ${notif.read ? 'text-gray-500' : 'text-gray-800 font-medium'}`}>
                      {notif.message}
                    </p>
                  </div>
                ))
              )}
            </div>
            <div className="p-4 border-t border-pink-50 bg-gray-50/50 flex items-center justify-between">
              <p className="text-[10px] text-gray-400">Hanya tersimpan di perangkat ini</p>
              <button onClick={clearNotifs} className="text-[10px] text-pink-500 hover:text-pink-600 font-bold cursor-pointer">Bersihkan</button>
            </div>
          </div>
        </>
      )}

      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-pink-200 shadow-md shadow-pink-200/60 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">

          {/* LOGO & NAMA BRAND TETAP MUNCUL DI SEMUA UKURAN LAYAR */}
          {currentUser?.role === "admin" ? (
            <div className="flex items-center gap-2 sm:gap-3 cursor-default">
              <div className="bg-pink-100 p-1 rounded-full flex items-center justify-center border border-pink-200">
                <img src={logo} alt="Bloom & Bouquet" className="h-7 w-7 sm:h-9 sm:w-9 object-cover rounded-full bg-white p-0.5" />
              </div>
              <div className="flex flex-col">
                <span className="font-cursive font-bold text-lg sm:text-2xl text-pink-700 leading-none">Bloom & Bouquet</span>
                <span className="text-[8px] sm:text-[10px] text-pink-400 font-semibold tracking-wider mt-0.5">Pusat Kontrol Admin</span>
              </div>
            </div>
          ) : (
            <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-90 transition">
              <div className="bg-pink-100 p-1 rounded-full flex items-center justify-center border border-pink-200">
                <img src={logo} alt="Bloom & Bouquet" className="h-7 w-7 sm:h-9 sm:w-9 object-cover rounded-full bg-white p-0.5" />
              </div>
              <div className="flex flex-col">
                <span className="font-cursive font-bold text-lg sm:text-2xl text-pink-700 leading-none">Bloom & Bouquet</span>
                <span className="text-[8px] sm:text-[10px] text-pink-400 font-semibold tracking-wider mt-0.5 line-clamp-1">The Best-Looking Flowers in Town</span>
              </div>
            </Link>
          )}

          {/* NAVIGASI MENU DESKTOP (Tampil di layar besar) */}
          <nav className="hidden lg:flex items-center gap-2 bg-pink-100/80 p-1.5 rounded-full border border-pink-200 shadow-sm">
            {currentUser?.role === "admin" ? (
              <>
                <Link
                  to="/admin"
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${isActive("/admin") || isActive("/admin/") ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md shadow-pink-200/50 scale-105" : "text-pink-700 hover:text-pink-900 hover:bg-pink-200/80"
                    }`}
                >
                  <LayoutDashboard size={15} /> Beranda
                </Link>
                <Link
                  to="/admin/produk"
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${isActive("/admin/produk") ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md shadow-pink-200/50 scale-105" : "text-pink-700 hover:text-pink-900 hover:bg-pink-200/80"
                    }`}
                >
                  <Package size={15} /> Produk
                </Link>
                <Link
                  to="/admin/pesanan"
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${isActive("/admin/pesanan") ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md shadow-pink-200/50 scale-105" : "text-pink-700 hover:text-pink-900 hover:bg-pink-200/80"
                    }`}
                >
                  <ClipboardList size={15} /> Pesanan
                </Link>
                <Link
                  to="/admin/voucher"
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${isActive("/admin/voucher") ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md shadow-pink-200/50 scale-105" : "text-pink-700 hover:text-pink-900 hover:bg-pink-200/80"
                    }`}
                >
                  <Tag size={15} /> Voucher
                </Link>
                <Link
                  to="/admin/rangkai"
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${isActive("/admin/rangkai") ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md shadow-pink-200/50 scale-105" : "text-pink-700 hover:text-pink-900 hover:bg-pink-200/80"
                    }`}
                >
                  <Sparkles size={15} /> Rangkai Bunga
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${isActive("/") ? "bg-pink-500 text-white shadow-xs" : "text-pink-700 hover:text-pink-900 hover:bg-pink-200/80"
                    }`}
                >
                  <Home size={15} /> Beranda
                </Link>

                <Link
                  to="/bunga"
                  className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${isActive("/bunga") ? "bg-pink-500 text-white shadow-xs" : "text-pink-700 hover:text-pink-900 hover:bg-pink-200/80"
                    }`}
                >
                  <Flower size={15} /> Bunga
                </Link>

                <Link
                  to="/arti-bunga"
                  className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${isActive("/arti-bunga") ? "bg-pink-500 text-white shadow-xs" : "text-pink-700 hover:text-pink-900 hover:bg-pink-200/80"
                    }`}
                >
                  <BookOpen size={15} /> Arti Bunga
                </Link>

                <Link
                  to="/rangkai-buket"
                  className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${isActive("/rangkai-buket") ? "bg-pink-500 text-white shadow-xs" : "text-pink-700 hover:text-pink-900 hover:bg-pink-200/80"
                    }`}
                >
                  <Sparkles size={15} /> Rangkai Buket
                </Link>
              </>
            )}
          </nav>

          {/* AKSI KANAN (FAVORIT, KERANJANG, PROFIL/LOGIN, & HAMBURGER MOBILE) */}
          <div className="flex items-center gap-1 sm:gap-2">

            {currentUser?.role !== "admin" && (
              <>
                <button
                  onClick={(e) => handleProtectedAction("/keranjang", e)}
                  title="Keranjang Belanja"
                  className={`p-2 rounded-full transition cursor-pointer relative ${isActive("/keranjang") ? "bg-pink-500 text-white shadow-xs" : "text-pink-500 hover:bg-pink-50"}`}
                >
                  <ShoppingCart size={18} className="sm:w-5 sm:h-5" />
                  {totalCartItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full px-1 shadow-sm">
                      {totalCartItems}
                    </span>
                  )}
                </button>
              </>
            )}

            {currentUser && (
              <button
                onClick={toggleNotif}
                title="Pemberitahuan"
                className="relative p-2.5 bg-pink-100 hover:bg-pink-200 text-pink-600 rounded-full transition shadow-xs flex items-center justify-center cursor-pointer"
              >
                <Bell size={16} className="sm:w-[18px] sm:h-[18px]" />
                {hasUnreadNotif && (
                  <span className="absolute top-0 right-0 w-3 h-3 bg-rose-500 border-2 border-white rounded-full animate-pulse"></span>
                )}
              </button>
            )}

            <Link
              to={currentUser ? (currentUser.role === "admin" ? "/admin/profil" : "/profil") : "/masuk"}
              title={currentUser ? "Profil Akun" : "Masuk"}
              className={`p-2.5 rounded-full transition shadow-xs flex items-center justify-center cursor-pointer ${isActive("/profil") || isActive("/admin/profil") ? "bg-pink-500 text-white" : "bg-pink-100 hover:bg-pink-200 text-pink-600"}`}
            >
              <User size={16} className="sm:w-[18px] sm:h-[18px]" />
            </Link>

            {/* TOMBOL HAMBURGER MENU (Hanya muncul di layar HP/Tablet kecil) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-pink-700 hover:bg-pink-50 rounded-full transition ml-1"
              title="Menu"
            >
              {mobileMenuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
            </button>

          </div>

        </div>
      </header>

      {/* OVERLAY & DROPDOWN MENU MOBILE (Slide dari kanan) */}
      <div className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" onClick={() => setMobileMenuOpen(false)}></div>
        
        {/* Sidebar Menu */}
        <div className={`absolute top-0 right-0 w-[280px] h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          
          {/* Header sidebar */}
          <div className="flex justify-between items-center p-6 border-b border-pink-100 bg-pink-50/30">
             <span className="font-cursive font-bold text-2xl text-pink-700">Menu Utama</span>
             <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-pink-500 hover:bg-pink-100 rounded-full transition-colors shadow-sm bg-white">
               <X size={20} />
             </button>
          </div>

          {/* Menu Links */}
          <div className="flex flex-col space-y-2 p-4 overflow-y-auto flex-1">
            {currentUser?.role === "admin" ? (
              <>
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${isActive("/admin") || isActive("/admin/") ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md" : "text-pink-700 hover:bg-pink-50"
                    }`}
                >
                  <LayoutDashboard size={18} /> Beranda
                </Link>
                <Link
                  to="/admin/produk"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${isActive("/admin/produk") ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md" : "text-pink-700 hover:bg-pink-50"
                    }`}
                >
                  <Package size={18} /> Produk
                </Link>
                <Link
                  to="/admin/pesanan"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${isActive("/admin/pesanan") ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md" : "text-pink-700 hover:bg-pink-50"
                    }`}
                >
                  <ClipboardList size={18} /> Pesanan
                </Link>
                <Link
                  to="/admin/voucher"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${isActive("/admin/voucher") ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md" : "text-pink-700 hover:bg-pink-50"
                    }`}
                >
                  <Tag size={18} /> Voucher
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${isActive("/") ? "bg-pink-500 text-white shadow-sm" : "text-pink-700 hover:bg-pink-50"
                    }`}
                >
                  <Home size={18} /> Beranda
                </Link>

                <Link
                  to="/bunga"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${isActive("/bunga") ? "bg-pink-500 text-white shadow-sm" : "text-pink-700 hover:bg-pink-50"
                    }`}
                >
                  <Flower size={18} /> Bunga
                </Link>

                <Link
                  to="/arti-bunga"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${isActive("/arti-bunga") ? "bg-pink-500 text-white shadow-sm" : "text-pink-700 hover:bg-pink-50"
                    }`}
                >
                  <BookOpen size={18} /> Arti Bunga
                </Link>

                <Link
                  to="/rangkai-buket"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${isActive("/rangkai-buket") ? "bg-pink-500 text-white shadow-sm" : "text-pink-700 hover:bg-pink-50"
                    }`}
                >
                  <Sparkles size={18} /> Rangkai Buket
                </Link>

                <Link
                  to="/favorit"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${isActive("/favorit") ? "bg-pink-500 text-white shadow-sm" : "text-pink-700 hover:bg-pink-50"
                    }`}
                >
                  <Heart size={18} /> Favorit
                </Link>

                {currentUser && (
                  <Link
                    to="/pesanan"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${isActive("/pesanan") ? "bg-pink-500 text-white shadow-sm" : "text-pink-700 hover:bg-pink-50"
                      }`}
                  >
                    <ClipboardList size={18} /> Pesanan Saya
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
  
  export default Header;