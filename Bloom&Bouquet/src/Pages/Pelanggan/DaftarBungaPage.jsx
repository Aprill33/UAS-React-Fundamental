/**
 * FILE: src/Pages/FlowersPage.jsx
 * TUJUAN: Halaman katalog utama yang menampilkan seluruh produk toko dengan fitur pencarian, filter kategori, dan filter jenis.
 * KETERHUBUNGAN: 
 *  - Mengambil data katalog dari `src/Data/Flowers.js`.
 *  - Terhubung dengan `ProductCard` untuk merender tiap item produk.
 *  - Terhubung dengan `ProductDetailModal` untuk popup detail produk.
 */

import { useState, useEffect, useContext, Fragment } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ProductDetailModal from "../../Components/ProductDetailModal";
import CustomAlert from "../../Components/CustomAlert";
import { FavoriteContext } from "../../context/FavoriteContext";
import Pagination from "../../Components/Pagination";
import SearchBar from "../../Components/SearchBar";
import { Heart, Eye, Sparkles, ArrowLeft } from "lucide-react"; 
import { flowers } from "../../Data/Flowers";

const ProductCard = ({ prod, setSelectedProduct, handleToggleWishlist, currentUser, wishlist }) => (
  <div 
    onClick={() => setSelectedProduct(prod)}
    className="bg-white rounded-3xl border border-pink-100 overflow-hidden shadow-xs hover:shadow-md transition duration-300 flex flex-col justify-between cursor-pointer group p-3"
  >
    <div className="relative h-56 overflow-hidden rounded-2xl bg-pink-50/20">
      <img
        src={prod.gambarProduk}
        alt={prod.namaProduk}
        className={`w-full h-full object-cover group-hover:scale-105 transition duration-500 ${prod.stok === 0 ? "grayscale opacity-75" : ""}`}
      />
      {prod.stok === 0 ? (
        <span className="absolute top-3 left-3 bg-gray-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs">
          Habis Terjual
        </span>
      ) : prod.statusProduk === "Diskon" && prod.diskon ? (
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
        {prod.kategori} • <span className="text-pink-600">{prod.jenis}</span>
      </span>
      <h3 className="font-serif font-bold text-pink-900 text-base leading-snug line-clamp-1">
        {prod.namaProduk}
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
);

const FlowersPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { currentUser } = useContext(AuthContext);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const { wishlist, toggleWishlist } = useContext(FavoriteContext);
  const [showAlert, setShowAlert] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedKategori, setSelectedKategori] = useState("Semua");
  const [selectedJenis, setSelectedJenis] = useState(searchParams.get("jenis") || "Semua Jenis");

  const statusParam = searchParams.get("status");
  const initialStatus = 
    statusParam === "terbaru" ? "Produk Baru" : 
    statusParam === "best-seller" ? "Best Seller" : 
    statusParam === "diskon" ? "Diskon" : "Semua Status";

  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [sortBy, setSortBy] = useState("default");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const param = searchParams.get("status");
    if (param === "terbaru") {
      setSelectedStatus("Produk Baru");
    } else if (param === "best-seller") {
      setSelectedStatus("Best Seller");
    } else if (param === "diskon") {
      setSelectedStatus("Diskon");
    }
    const jenisParam = searchParams.get("jenis");
    if (jenisParam) {
      setSelectedJenis(jenisParam);
    }
    
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [searchParams]);

  const handleToggleWishlist = (prodId) => {
    if (!currentUser) {
      sessionStorage.setItem("pendingFavorite", prodId);
      setShowAlert(true);
      return;
    }
    toggleWishlist(prodId);
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

  const filteredFlowers = allFlowers.filter((item) => {
    const matchesSearch = 
      item.namaProduk?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kategori?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.jenis?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesKategori = 
      selectedKategori === "Semua" || item.kategori === selectedKategori;

    const matchesJenis = 
      selectedJenis === "Semua Jenis" || item.jenis === selectedJenis;

    const matchesStatus = (() => {
      if (selectedStatus === "Semua Status") return true;
      if (selectedStatus === "Ready Stock") return item.stok > 0;
      if (selectedStatus === "Habis Terjual") return item.stok === 0;
      return item.statusProduk?.toLowerCase() === selectedStatus.toLowerCase();
    })();

    return matchesSearch && matchesKategori && matchesJenis && matchesStatus;
  });

  const availableFlowers = filteredFlowers.filter(prod => prod.stok > 0);
  const outOfStockFlowers = filteredFlowers.filter(prod => prod.stok === 0);

  const sortedAvailableFlowers = [...availableFlowers].sort((a, b) => {
    // Logika sorting lanjutan
    if (sortBy === "az") return a.namaProduk.localeCompare(b.namaProduk);
    if (sortBy === "za") return b.namaProduk.localeCompare(a.namaProduk);
    if (sortBy === "low-high") return a.harga - b.harga;
    if (sortBy === "high-low") return b.harga - a.harga;
    return 0;
  });

  const totalPages = Math.ceil(sortedAvailableFlowers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFlowers = sortedAvailableFlowers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-10 font-sans pb-16 bg-gradient-to-b from-pink-50/30 to-white min-h-screen">
      <CustomAlert
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        onConfirm={() => {
          setShowAlert(false);
          navigate("/masuk");
        }}
        type="login"
        message="Masuk ke akunmu dulu yuk untuk menyimpan bunga cantik ini ke daftar favorit!"
        confirmText="Okey Siap"
        cancelText="Nanti Aja Deh"
      />

      <div className="bg-pink-100/60 py-10 border-b border-pink-200 relative">
        {/* TOMBOL KEMBALI */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-pink-500 hover:text-white text-pink-600 font-bold text-xs rounded-full shadow-sm border border-pink-200 transition-all duration-300 cursor-pointer hover:shadow-md hover:-translate-x-1"
          >
            <ArrowLeft size={16} />
            <span>Kembali</span>
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center gap-4">
            <div className="flex-1 h-[1.5px] bg-pink-200" />
            <div className="text-center shrink-0 px-2 flex flex-col items-center space-y-3">
              <span className="inline-flex items-center gap-1.5 bg-white text-pink-600 text-xs font-bold px-4 py-1.5 rounded-full border border-pink-200 shadow-xs">
                <Sparkles size={14} /> Katalog Lengkap Bloom & Bouquet
              </span>
              <h1 className="text-4xl sm:text-5xl font-cursive font-bold text-pink-700">
                Jelajahi Semua Koleksi Bunga
              </h1>
              <p className="text-xs sm:text-sm text-pink-500 max-w-xl mx-auto">
                Temukan berbagai pilihan buket segar, kotak bunga, dan keranjang cantik untuk setiap momen spesialmu.
              </p>
            </div>
            <div className="flex-1 h-[1.5px] bg-pink-200" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={(val) => { setSearchTerm(val); setCurrentPage(1); }}
          selectedKategori={selectedKategori}
          setSelectedKategori={(kat) => { setSelectedKategori(kat); setCurrentPage(1); }}
          selectedJenis={selectedJenis}
          setSelectedJenis={(jns) => { setSelectedJenis(jns); setCurrentPage(1); }}
          selectedStatus={selectedStatus}
          setSelectedStatus={(st) => { setSelectedStatus(st); setCurrentPage(1); }}
          sortBy={sortBy}
          setSortBy={(sort) => { setSortBy(sort); setCurrentPage(1); }}
        />

        {currentFlowers.length === 0 && outOfStockFlowers.length === 0 ? (
          <div className="text-center py-16 space-y-3 bg-white rounded-3xl border border-pink-100 p-8 shadow-sm">
            <p className="text-pink-600 font-bold text-base">Maaf, bunga atau buket yang kamu cari tidak ditemukan.</p>
            <button
              onClick={() => { 
                setSearchTerm(""); 
                setSelectedKategori("Semua"); 
                setSelectedJenis("Semua Jenis"); 
                setSelectedStatus("Semua Status");
                setSortBy("default");
              }}
              className="px-5 py-2 bg-pink-500 text-white rounded-full text-xs font-bold shadow-xs hover:bg-pink-600 transition cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {currentFlowers.map((prod) => (
              <ProductCard 
                key={prod.id} 
                prod={prod} 
                setSelectedProduct={setSelectedProduct} 
                handleToggleWishlist={handleToggleWishlist} 
                currentUser={currentUser} 
                wishlist={wishlist} 
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
          />
        )}

        {outOfStockFlowers.length > 0 && (
          <div className="mt-16 mb-8">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex-1 h-[1.5px] bg-pink-200" />
              <div className="text-center shrink-0 px-2">
                <h2 className="text-2xl sm:text-3xl font-cursive font-bold text-pink-700 mb-1">
                  Habis Terjual
                </h2>
                <p className="text-xs sm:text-sm text-pink-500">Mungkin akan tersedia kembali nanti</p>
              </div>
              <div className="flex-1 h-[1.5px] bg-pink-200" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 opacity-80">
              {outOfStockFlowers.map((prod) => (
                <ProductCard 
                  key={prod.id} 
                  prod={prod} 
                  setSelectedProduct={setSelectedProduct} 
                  handleToggleWishlist={handleToggleWishlist} 
                  currentUser={currentUser} 
                  wishlist={wishlist} 
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductDetailModal
          produk={selectedProduct}
          isWishlisted={wishlist.includes(selectedProduct.id)}
          onClose={() => setSelectedProduct(null)}
          onToggleWishlist={handleToggleWishlist}
        />
      )}
    </div>
  );
};

export default FlowersPage;