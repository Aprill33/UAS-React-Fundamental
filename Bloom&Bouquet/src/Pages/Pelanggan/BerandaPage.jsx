/**
 * FILE: src/Pages/Home.jsx
 * TUJUAN: Menampilkan halaman utama (Beranda) toko dengan fitur slider promosi (hero), produk terbaru, best seller, dan navigasi edukasi makna bunga.
 * KETERHUBUNGAN: 
 *  - Mengambil data dari src/Data/Flowers.js (`flowers`, `heroSlides`, `exploreFlowersList`)
 *  - Terhubung ke Context (`AuthContext`) untuk pengecekan login (wishlist).
 *  - Membuka modal `ProductDetailModal.jsx` saat detail produk diklik.
 */

import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ProductDetailModal from "../../Components/ProductDetailModal";
import CustomAlert from "../../Components/CustomAlert";
import { FavoriteContext } from "../../context/FavoriteContext";
import { CartContext } from "../../context/CartContext";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Truck,
  ShieldCheck,
  Palette,
  MessageCircle,
  ArrowRight,
  Heart,
  Eye,
  Grid
} from "lucide-react";

import { flowers, heroSlides, exploreFlowersList } from "../../Data/Flowers";

// Import Gambar Dekorasi Tentang Kami dari Assets[cite: 2]
import aboutus1 from "../../assets/aboutus1.png";
import aboutus2 from "../../assets/aboutus2.png";
import aboutus3 from "../../assets/aboutus3.png";
import aboutus4 from "../../assets/aboutus4.png";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useContext(AuthContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [newIndex, setNewIndex] = useState(0);
  const [bestIndex, setBestIndex] = useState(0);
  const [discountIndex, setDiscountIndex] = useState(0);

  // State Welcome Alert
  const [showWelcomeAlert, setShowWelcomeAlert] = useState(false);
  const [welcomeName, setWelcomeName] = useState("");

  // State Modal Detail & Custom Alert Dialog[cite: 2]
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { wishlist, toggleWishlist } = useContext(FavoriteContext);
  const [showHomeAlert, setShowHomeAlert] = useState(false);
  const [showBuilderAlert, setShowBuilderAlert] = useState(false);

  // Efek untuk mengganti slide hero otomatis setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Efek untuk menampilkan ucapan selamat datang dari login
  useEffect(() => {
    if (location.state?.showWelcome) {
      setWelcomeName(location.state.username);
      setShowWelcomeAlert(true);
      // Bersihkan state agar tidak muncul ulang jika halaman direfresh
      navigate("/", { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleToggleWishlist = (prodId) => {
    if (!currentUser) {
      sessionStorage.setItem("pendingFavorite", prodId);
      setShowHomeAlert(true);
      return;
    }
    toggleWishlist(prodId);
  };

  const handleBuilderClick = () => {
    if (!currentUser) {
      setShowBuilderAlert(true);
    } else {
      navigate("/rangkai-buket");
    }
  };

  const [allFlowers] = useState(() => {
    const saved = localStorage.getItem("customFlowersData");
    let parsed = saved ? JSON.parse(saved) : (flowers || []);
    // Sinkronisasi data agar diskon terbaru dari Flowers.js masuk ke data localStorage yang lama
    parsed = parsed.map(item => {
      const original = flowers.find(f => f.id === item.id);
      if (original && original.statusProduk === "Diskon" && item.statusProduk !== "Diskon") {
        return { ...item, statusProduk: "Diskon", diskon: original.diskon };
      }
      return item;
    });
    return parsed;
  });

  const newProducts = allFlowers.filter(
    (item) => item.statusProduk?.toLowerCase() === "produk baru" || item.statusProduk?.toLowerCase() === "terbaru"
  );
  const displayNewProducts = newProducts.length > 0 ? newProducts : allFlowers;

  const bestProducts = allFlowers.filter(
    (item) => item.statusProduk?.toLowerCase() === "best seller" || item.statusProduk?.toLowerCase() === "terlaris"
  );
  const displayBestProducts = bestProducts.length > 0 ? bestProducts : allFlowers;

  const discountProducts = allFlowers.filter(
    (item) => item.statusProduk?.toLowerCase() === "diskon"
  );

  return (
    <div className="space-y-16 font-sans pb-16 bg-gradient-to-b from-pink-50/40 via-white to-pink-50/20 min-h-screen overflow-x-hidden">

      {/* ALERT UCAPAN SELAMAT DATANG SETELAH LOGIN */}
      <CustomAlert
        isOpen={showWelcomeAlert}
        onClose={() => setShowWelcomeAlert(false)}
        type="success_modal"
        title={`Halo, ${welcomeName}! 🌸`}
        message="Selamat datang di Bloom & Bouquet. Yuk mulai rangkai buket impianmu hari ini!"
        confirmText="Mulai Belanja"
        showCancel={false}
      />

      {/* CUSTOM ALERT PUSAT UNTUK FAVORIT DI BERANDA[cite: 2] */}
      <CustomAlert
        isOpen={showHomeAlert}
        onClose={() => setShowHomeAlert(false)}
        onConfirm={() => {
          setShowHomeAlert(false);
          navigate("/masuk");
        }}
        type="login"
        message="Masuk ke akunmu dulu yuk untuk menyimpan bunga cantik ini ke daftar favorit!"
        confirmText="Okey Siap"
        cancelText="Nanti Aja Deh"
      />

      <CustomAlert
        isOpen={showBuilderAlert}
        onClose={() => setShowBuilderAlert(false)}
        onConfirm={() => {
          setShowBuilderAlert(false);
          navigate("/masuk");
        }}
        type="login"
        message="Masuk ke akunmu dulu yuk untuk mulai merangkai buket impianmu!"
        confirmText="Okey Siap"
        cancelText="Nanti Aja Deh"
      />

      {/* HERO SLIDER OTOMATIS (BERGANTI GAMBAR & TEKS) */}
      <section className="relative w-full h-[450px] sm:h-[520px] overflow-hidden rounded-b-[2.5rem] shadow-md bg-pink-950">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-900/60 via-pink-800/20 to-transparent z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center scale-105"
            />

            <div className="absolute inset-0 z-20 max-w-7xl mx-auto px-6 sm:px-10 flex flex-col justify-center items-start text-white space-y-5">
              <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-4 py-1.5 rounded-full border border-white/30 shadow-xs">
                <Sparkles size={14} /> Spesial Bloom & Bouquet
              </span>
              <h1 className="text-4xl sm:text-6xl font-cursive font-bold text-pink-100 max-w-xl leading-tight drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-xs sm:text-base text-pink-50 max-w-md leading-relaxed font-medium">
                {slide.subtitle}
              </p>
              <div className="pt-2">
                <button
                  onClick={handleBuilderClick}
                  className="px-7 py-3.5 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-bold text-xs sm:text-sm shadow-lg hover:scale-105 transition duration-300 flex items-center gap-2 cursor-pointer"
                >
                  <span>Mulai Rangkai Sekarang</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Indikator Titik Slide */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${idx === currentSlide ? "w-8 bg-pink-500" : "w-2.5 bg-white/60"
                }`}
            />
          ))}
        </div>
      </section>

      {/* 1. PRODUK TERBARU[cite: 2] */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex-1 h-[1.5px] bg-pink-200" />
          <div className="text-center shrink-0 px-2">
            <h2 className="text-3xl font-cursive font-bold text-pink-700 mb-1">
              Bunga Pilihan Terbaru
            </h2>
            <p className="text-xs text-pink-400">Rangkaian bunga segar teranyar dari kebun kami</p>
          </div>
          <div className="flex-1 h-[1.5px] bg-pink-200" />
        </div>

        <div className="flex justify-end items-center gap-2 mb-4">
          <button
            onClick={() => setNewIndex((prev) => Math.max(0, prev - 1))}
            disabled={newIndex === 0}
            className="p-2 border border-pink-200 text-pink-600 rounded-full hover:bg-pink-50 disabled:opacity-30 cursor-pointer transition bg-white"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => setNewIndex((prev) => Math.min(displayNewProducts.length - 4, prev + 1))}
            disabled={newIndex >= displayNewProducts.length - 4}
            className="p-2 border border-pink-200 text-pink-600 rounded-full hover:bg-pink-50 disabled:opacity-30 cursor-pointer transition bg-white"
          >
            <ChevronRight size={18} />
          </button>

          <Link
            to="/bunga?status=terbaru"
            className="ml-2 flex items-center gap-1.5 px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 text-xs font-bold rounded-full transition shadow-xs"
          >
            <Grid size={14} />
            <span>Lihat Semua</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {displayNewProducts.slice(newIndex, newIndex + 4).map((prod) => (
            <div
              key={prod.id}
              onClick={() => setSelectedProduct(prod)}
              className="bg-white rounded-3xl border border-pink-100 overflow-hidden shadow-xs hover:shadow-xl hover:border-pink-300 transition duration-300 flex flex-col justify-between cursor-pointer group p-3"
            >
              <div className="relative h-56 overflow-hidden rounded-2xl bg-pink-50/20">
                <img
                  src={prod.gambarProduk || prod.gambar || prod.img}
                  alt={prod.namaProduk || prod.nama}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

                {prod.statusProduk && (
                  <span className="absolute top-3 left-3 bg-pink-100 text-pink-600 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs">
                    {prod.statusProduk}
                  </span>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleWishlist(prod.id);
                  }}
                  className="absolute top-3 right-3 bg-white/90 hover:bg-white text-pink-500 p-2 rounded-full shadow-sm transition hover:scale-110 cursor-pointer"
                >
                  <Heart size={16} fill={currentUser && wishlist.includes(prod.id) ? "#f8619c" : "none"} />
                </button>
              </div>

              <div className="pt-3 px-1 pb-1 space-y-1.5">
                <span className="text-[11px] font-bold text-pink-400 uppercase tracking-wide block">
                  {prod.kategori || "MAWAR"}
                </span>

                <h3 className="font-serif font-bold text-pink-900 text-base leading-snug line-clamp-1">
                  {prod.namaProduk || prod.nama}
                </h3>

                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    ★ {prod.rating || "4.8"}
                  </span>
                  <span>•</span>
                  <span>Stok {prod.stok ?? "10"}</span>
                </div>

                <div className="text-lg font-bold text-pink-600 pt-0.5">
                  Rp {Number(prod.harga).toLocaleString("id-ID")}
                </div>

                <button
                  onClick={() => setSelectedProduct(prod)}
                  className="w-full mt-2 py-2 bg-pink-50/70 hover:bg-pink-100 text-pink-600 font-bold text-xs rounded-full transition flex items-center justify-center gap-1.5 cursor-pointer border border-pink-100"
                >
                  <Eye size={15} />
                  <span>Lihat Detail</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 1.5 PRODUK DISKON */}
      {discountProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex-1 h-[1.5px] bg-pink-200" />
            <div className="text-center shrink-0 px-2">
              <h2 className="text-3xl font-cursive font-bold text-pink-700 mb-1">
                Produk Diskon Spesial
              </h2>
              <p className="text-xs text-pink-400">Harga miring untuk bunga cantik favoritmu</p>
            </div>
            <div className="flex-1 h-[1.5px] bg-pink-200" />
          </div>

          <div className="flex justify-end items-center gap-2 mb-4">
            <button
              onClick={() => setDiscountIndex((prev) => Math.max(0, prev - 1))}
              disabled={discountIndex === 0}
              className="p-2 border border-pink-200 text-pink-600 rounded-full hover:bg-pink-50 disabled:opacity-30 cursor-pointer transition bg-white"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setDiscountIndex((prev) => Math.min(discountProducts.length - 4, prev + 1))}
              disabled={discountIndex >= discountProducts.length - 4}
              className="p-2 border border-pink-200 text-pink-600 rounded-full hover:bg-pink-50 disabled:opacity-30 cursor-pointer transition bg-white"
            >
              <ChevronRight size={18} />
            </button>

            <Link
              to="/bunga?status=diskon"
              className="ml-2 flex items-center gap-1.5 px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 text-xs font-bold rounded-full transition shadow-xs"
            >
              <Grid size={14} />
              <span>Lihat Semua</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {discountProducts.slice(discountIndex, discountIndex + 4).map((prod) => (
              <div
                key={prod.id}
                onClick={() => setSelectedProduct(prod)}
                className="bg-white rounded-3xl border border-pink-100 overflow-hidden shadow-xs hover:shadow-xl hover:border-pink-300 transition duration-300 flex flex-col justify-between cursor-pointer group p-3"
              >
                <div className="relative h-56 overflow-hidden rounded-2xl bg-pink-50/20">
                  <img
                    src={prod.gambarProduk || prod.gambar || prod.img}
                    alt={prod.namaProduk || prod.nama}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />

                  {prod.statusProduk === "Diskon" && prod.diskon ? (
                    <span className="absolute top-3 left-3 bg-pink-100 text-pink-600 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs">
                      Diskon {prod.diskon}%
                    </span>
                  ) : prod.statusProduk ? (
                    <span className="absolute top-3 left-3 bg-pink-100 text-pink-600 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs">
                      {prod.statusProduk}
                    </span>
                  ) : null}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleWishlist(prod.id);
                    }}
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white text-pink-500 p-2 rounded-full shadow-sm transition hover:scale-110 cursor-pointer"
                  >
                    <Heart size={16} fill={currentUser && wishlist.includes(prod.id) ? "#f8619c" : "none"} />
                  </button>
                </div>

                <div className="pt-3 px-1 pb-1 space-y-1.5">
                  <span className="text-[11px] font-bold text-pink-400 uppercase tracking-wide block">
                    {prod.kategori || "MAWAR"}
                  </span>

                  <h3 className="font-serif font-bold text-pink-900 text-base leading-snug line-clamp-1">
                    {prod.namaProduk || prod.nama}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <span className="flex items-center gap-1 text-amber-400 font-bold">
                      ★ {prod.rating || "4.8"}
                    </span>
                    <span>•</span>
                    <span>Stok {prod.stok ?? "10"}</span>
                  </div>

                  {prod.diskon ? (
                    <div className="pt-0.5 flex items-baseline gap-2">
                      <span className="text-lg font-bold text-pink-600">Rp {Number(prod.harga - (prod.harga * prod.diskon / 100)).toLocaleString("id-ID")}</span>
                      <span className="text-xs text-gray-400 line-through">Rp {Number(prod.harga).toLocaleString("id-ID")}</span>
                    </div>
                  ) : (
                    <div className="text-lg font-bold text-pink-600 pt-0.5">
                      Rp {Number(prod.harga).toLocaleString("id-ID")}
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedProduct(prod)}
                    className="w-full mt-2 py-2 bg-pink-50/70 hover:bg-pink-100 text-pink-600 font-bold text-xs rounded-full transition flex items-center justify-center gap-1.5 cursor-pointer border border-pink-100"
                  >
                    <Eye size={15} />
                    <span>Lihat Detail</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2. PRODUK BEST SELLER[cite: 2] */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex-1 h-[1.5px] bg-pink-200" />
          <div className="text-center shrink-0 px-2">
            <h2 className="text-3xl font-cursive font-bold text-pink-700 mb-1">
              Koleksi Terlaris & Populer
            </h2>
            <p className="text-xs text-pink-400">Favorit terbanyak yang paling disukai pelanggan</p>
          </div>
          <div className="flex-1 h-[1.5px] bg-pink-200" />
        </div>

        <div className="flex justify-end items-center gap-2 mb-4">
          <button
            onClick={() => setBestIndex((prev) => Math.max(0, prev - 1))}
            disabled={bestIndex === 0}
            className="p-2 border border-pink-200 text-pink-600 rounded-full hover:bg-pink-50 disabled:opacity-30 cursor-pointer transition bg-white"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => setBestIndex((prev) => Math.min(displayBestProducts.length - 4, prev + 1))}
            disabled={bestIndex >= displayBestProducts.length - 4}
            className="p-2 border border-pink-200 text-pink-600 rounded-full hover:bg-pink-50 disabled:opacity-30 cursor-pointer transition bg-white"
          >
            <ChevronRight size={18} />
          </button>

          <Link
            to="/bunga?status=best-seller"
            className="ml-2 flex items-center gap-1.5 px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 text-xs font-bold rounded-full transition shadow-xs"
          >
            <Grid size={14} />
            <span>Lihat Semua</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {displayBestProducts.slice(bestIndex, bestIndex + 4).map((prod) => (
            <div
              key={prod.id}
              onClick={() => setSelectedProduct(prod)}
              className="bg-white rounded-3xl border border-pink-100 overflow-hidden shadow-xs hover:shadow-xl hover:border-pink-300 transition duration-300 flex flex-col justify-between cursor-pointer group p-3"
            >
              <div className="relative h-56 overflow-hidden rounded-2xl bg-pink-50/20">
                <img
                  src={prod.gambarProduk || prod.gambar || prod.img}
                  alt={prod.namaProduk || prod.nama}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

                {prod.statusProduk && (
                  <span className="absolute top-3 left-3 bg-pink-100 text-pink-600 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs">
                    {prod.statusProduk}
                  </span>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleWishlist(prod.id);
                  }}
                  className="absolute top-3 right-3 bg-white/90 hover:bg-white text-pink-500 p-2 rounded-full shadow-sm transition hover:scale-110 cursor-pointer"
                >
                  <Heart size={16} fill={currentUser && wishlist.includes(prod.id) ? "#f8619c" : "none"} />
                </button>
              </div>

              <div className="pt-3 px-1 pb-1 space-y-1.5">
                <span className="text-[11px] font-bold text-pink-400 uppercase tracking-wide block">
                  {prod.kategori || "BUKET"}
                </span>

                <h3 className="font-serif font-bold text-pink-900 text-base leading-snug line-clamp-1">
                  {prod.namaProduk || prod.nama}
                </h3>

                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    ★ {prod.rating || "4.9"}
                  </span>
                  <span>•</span>
                  <span>Stok {prod.stok ?? "8"}</span>
                </div>

                <div className="text-lg font-bold text-pink-600 pt-0.5">
                  Rp {Number(prod.harga).toLocaleString("id-ID")}
                </div>

                <button
                  onClick={() => setSelectedProduct(prod)}
                  className="w-full mt-2 py-2 bg-pink-50/70 hover:bg-pink-100 text-pink-600 font-bold text-xs rounded-full transition flex items-center justify-center gap-1.5 cursor-pointer border border-pink-100"
                >
                  <Eye size={15} />
                  <span>Lihat Detail</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SECTION TENTANG KAMI[cite: 2] */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="relative bg-pink-100/60 p-6 sm:p-10 rounded-3xl border border-pink-200">

          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-lg border border-pink-100 relative z-10 max-w-5xl mx-auto">

            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex-1 h-[1.5px] bg-pink-300" />
              <h3 className="font-cursive font-bold text-pink-700 text-2xl sm:text-3xl px-2 text-center">
                Tentang Bloom & Bouquet
              </h3>
              <div className="flex-1 h-[1.5px] bg-pink-300" />
            </div>

            <div className="space-y-4 text-center text-xs sm:text-sm text-pink-600/90 leading-relaxed font-sans">
              <p>
                <strong className="text-pink-700 font-bold">Bloom & Bouquet</strong> merupakan studio florist modern di Bandung yang menjual <span className="text-pink-700 font-bold">bunga asli dan segar</span> seperti <span className="text-pink-700 font-bold">bunga mawar, tulip, matahari, lily, anggrek, daisy</span>, dll. Dapatkan rangkaian bunga cantik dan elegan untuk <span className="text-pink-700 font-bold">buket bunga, bunga box, atau bunga meja</span>.
              </p>

              <p>
                Menghubungkan orang-orang melalui keindahan bunga adalah passion bagi kami. Oleh karena itu, kami selalu berusaha menghadirkan layanan terbaik untuk kamu. Ciptakan momen terbaik bersama orang yang spesial dalam hidup kamu, baik itu untuk <span className="text-pink-700 font-bold">pacar, sahabat, maupun keluarga</span>. Demikian pula untuk momen istimewa seperti <span className="text-pink-700 font-bold">wisuda, pernikahan, ulang tahun, hari ibu</span>, dll.
              </p>

              <p className="pt-2">
                Bloom & Bouquet mempermudah kamu dalam menemukan buket bunga yang kamu butuhkan. Dengan kata lain, kamu bisa pesan bunga sekaligus menentukan jadwal kirim sesuai yang kamu inginkan secara praktis dan cepat.
              </p>
            </div>
          </div>

          <div className="hidden lg:block">
            <img src={aboutus1} alt="Bunga 1" className="absolute -top-6 -left-6 w-28 h-28 object-cover rounded-2xl shadow-md border-2 border-white -rotate-6" />
            <img src={aboutus2} alt="Bunga 2" className="absolute -bottom-6 -left-6 w-28 h-28 object-cover rounded-2xl shadow-md border-2 border-white -rotate-6" />
            <img src={aboutus3} alt="Bunga 3" className="absolute -top-6 -right-6 w-28 h-28 object-cover rounded-2xl shadow-md border-2 border-white -rotate-6" />
            <img src={aboutus4} alt="Bunga 4" className="absolute -bottom-6 -right-6 w-28 h-28 object-cover rounded-2xl shadow-md border-2 border-white -rotate-6" />
          </div>

        </div>
      </section>

      {/* 4. MENGAPA HARUS CHECKOUT[cite: 2] */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-8">
        <div className="flex items-center justify-center gap-4">
          <div className="flex-1 h-[1.5px] bg-pink-200" />
          <div className="space-y-1 shrink-0 px-2">
            <h2 className="text-3xl md:text-4xl font-cursive font-bold text-pink-700">
              Ini Alasan Bloom & Bouquet Selalu Jadi Pilihan Utama
            </h2>
            <p className="text-xs text-pink-400 max-w-xl mx-auto">
              Nikmati kemudahan pemesanan kado bunga segar dengan jaminan layanan terbaik.
            </p>
          </div>
          <div className="flex-1 h-[1.5px] bg-pink-200" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-pink-100 shadow-xs flex flex-col items-center text-center space-y-3">
            <div className="p-3 bg-pink-100 text-pink-600 rounded-2xl">
              <Truck size={28} />
            </div>
            <h3 className="font-bold text-sm text-pink-800">Pengiriman Hari Yang Sama</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Pesanan sebelum jam 3 sore siap dikirim di hari yang sama langsung ke alamat tujuan.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-pink-100 shadow-xs flex flex-col items-center text-center space-y-3">
            <div className="p-3 bg-pink-100 text-pink-600 rounded-2xl">
              <ShieldCheck size={28} />
            </div>
            <h3 className="font-bold text-sm text-pink-800">Garansi Bunga Segar</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Bunga dipastikan segar dan dirangkai rapi sesuai standar kualitas florist profesional.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-pink-100 shadow-xs flex flex-col items-center text-center space-y-3">
            <div className="p-3 bg-pink-100 text-pink-600 rounded-2xl">
              <Palette size={28} />
            </div>
            <h3 className="font-bold text-sm text-pink-800">Rangkaian Buket Kustom</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Bebas memilih jenis bunga, warna pembungkus, dan pita sesuai selera unikmu.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-pink-100 shadow-xs flex flex-col items-center text-center space-y-3">
            <div className="p-3 bg-pink-100 text-pink-600 rounded-2xl">
              <MessageCircle size={28} />
            </div>
            <h3 className="font-bold text-sm text-pink-800">Konsultasi Gratis</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Tim penata bunga kami siap memberikan rekomendasi pilihan bunga terbaik untuk setiap momen.
            </p>
          </div>
        </div>
      </section>

      {/* 5. JELAJAHI JENIS BUNGA[cite: 2] */}
      <section className="bg-pink-50/40 py-12 border-y border-pink-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 text-center">

          <div className="flex items-center justify-center gap-4">
            <div className="flex-1 h-[1.5px] bg-pink-200" />
            <div className="space-y-1 shrink-0 px-2">
              <h2 className="text-3xl md:text-4xl font-cursive font-bold text-pink-700">
                Jelajahi Jenis Bunga Kami
              </h2>
              <p className="text-xs text-pink-400">
                Pelajari arti, pesan tersembunyi, dan filosofi indah di balik setiap tangkai bunga
              </p>
            </div>
            <div className="flex-1 h-[1.5px] bg-pink-200" />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {exploreFlowersList.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/bunga/${item.id}`)}
                className="w-full sm:w-[calc(50%-8rem)] lg:w-[calc(25%-1rem)] bg-white p-5 rounded-2xl border border-pink-100 shadow-xs hover:shadow-md hover:-translate-y-1 transition duration-300 cursor-pointer text-center flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="w-16 h-16 mx-auto overflow-hidden rounded-full border border-pink-100 p-1 bg-pink-50/30 flex items-center justify-center group-hover:scale-105 transition">
                    <img src={item.img} alt={item.nama} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="font-bold text-pink-900 text-sm">{item.nama}</h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">{item.desc}</p>
                </div>

                <div className="pt-3 mt-2 border-t border-pink-50">
                  <span className="text-[11px] font-bold text-pink-600 group-hover:text-pink-700 transition">
                    Baca selengkapnya →
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* MODAL DETAIL MENGAMBANG[cite: 2] */}
      {selectedProduct && (
        <ProductDetailModal
          produk={selectedProduct}
          isWishlisted={!!(currentUser && wishlist.includes(selectedProduct.id))}
          onClose={() => setSelectedProduct(null)}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

    </div>
  );
};

export default Home;