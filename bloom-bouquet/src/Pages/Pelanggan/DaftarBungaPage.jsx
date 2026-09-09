/**
 * FILE: src/Pages/FlowersPage.jsx
 * TUJUAN: Halaman katalog utama yang menampilkan seluruh produk toko dengan fitur pencarian, filter kategori, dan filter jenis.
 * KETERHUBUNGAN: 
 *  - Mengambil data katalog dari `src/Data/Flowers.js`.
 *  - Terhubung dengan `ProductCard` untuk merender tiap item produk.
 *  - Terhubung dengan `ProductDetailModal` untuk popup detail produk.
 */

// [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
import { useState, useEffect, useContext, Fragment } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ProductDetailModal from "../../Components/ProductDetailModal";
import CustomAlert from "../../Components/CustomAlert";
import { FavoriteContext } from "../../context/FavoriteContext";
import ProductCard from "../../Components/ProductCard";
import usePagination from "../../hooks/usePagination";
import SearchBar from "../../Components/SearchBar";
import Pagination from "../../Components/Pagination";
import { Sparkles, ArrowLeft } from "lucide-react";
import { flowers } from "../../Data/Flowers";

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

  // [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
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
    
    // [DI LUAR MODUL] window.scrollTo: Memanipulasi browser untuk menggulir halaman ke koordinat tertentu.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [searchParams]);

  const handleToggleWishlist = (prodId) => {
    if (!currentUser) {
      // [DI LUAR MODUL] sessionStorage: Menyimpan data sementara di browser (hilang saat tab ditutup).
      sessionStorage.setItem("pendingFavorite", prodId);
      setShowAlert(true);
      return;
    }
    toggleWishlist(prodId);
  };

  const [allFlowers] = useState(() => {
    // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
    const saved = localStorage.getItem("customFlowersData");
    // [DI LUAR MODUL] JSON.parse: Mengubah string JSON kembali menjadi objek JavaScript.
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

  const { currentData: currentFlowers, totalPages, currentPage, setCurrentPage } = usePagination(sortedAvailableFlowers, 8);

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
              <h1 className="text-3xl sm:text-5xl font-cursive font-bold text-pink-700 leading-tight">
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
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {currentFlowers.map((prod) => (
              <ProductCard 
                key={prod.id} 
                produk={prod} 
                onOpenDetail={setSelectedProduct} 
                onToggleWishlist={handleToggleWishlist} 
                isWishlisted={currentUser && wishlist.includes(prod.id)} 
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
            
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 opacity-80">
              {outOfStockFlowers.map((prod) => (
                <ProductCard 
                  key={prod.id} 
                  produk={prod} 
                  onOpenDetail={setSelectedProduct} 
                  onToggleWishlist={handleToggleWishlist} 
                  isWishlisted={currentUser && wishlist.includes(prod.id)} 
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