/**
 * FILE: src/Pages/FlowerMeaningDetail.jsx
 * TUJUAN: Menampilkan detail artikel, filosofi, dan rekomendasi produk untuk satu jenis bunga tertentu.
 * KETERHUBUNGAN: 
 *  - Mengambil data dari src/Data/Flowers.js (`flowers`, `flowerDataContent`, `exploreFlowersList`)
 *  - Menggunakan komponen `ProductDetailModal` dan `Pagination`.
 */

import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ProductDetailModal from "../../Components/ProductDetailModal";
import CustomAlert from "../../Components/CustomAlert";
import { FavoriteContext } from "../../context/FavoriteContext";
import Pagination from "../../Components/Pagination";
import { 
  Heart, 
  Eye, 
  ArrowLeft, 
  Sparkles,
  CheckCircle2,
  Palette,
  Grid
} from "lucide-react";

import { flowers, flowerDataContent, exploreFlowersList } from "../../Data/Flowers";

const FlowerMeaningDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const { wishlist, toggleWishlist } = useContext(FavoriteContext);
  const [showAlert, setShowAlert] = useState(false);

  // State untuk Halaman Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setCurrentPage(1);
  }, [id]);

  const currentFlower = flowerDataContent[id] || flowerDataContent["rose"];

  const handleToggleWishlist = (prodId) => {
    if (!currentUser) {
      setShowAlert(true);
      return;
    }
    toggleWishlist(prodId);
  };

  const allFlowers = flowers || [];
  const filteredProducts = allFlowers.filter(
    (item) => 
      item.kategori?.toLowerCase().includes(currentFlower.nama.toLowerCase()) || 
      item.namaProduk?.toLowerCase().includes(currentFlower.nama.toLowerCase()) ||
      item.jenis?.toLowerCase().includes(currentFlower.nama.toLowerCase())
  );
  const displayProducts = filteredProducts.length > 0 ? filteredProducts : allFlowers;

  // Perhitungan Data Pagination
  const totalPages = Math.ceil(displayProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = displayProducts.slice(indexOfFirstItem, indexOfLastItem);

  const otherFlowers = exploreFlowersList.filter((item) => item.id !== (id || "rose"));

  return (
    <div className="space-y-16 font-sans pb-16 bg-linear-to-b from-pink-50/30 to-white min-h-screen">

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-pink-500 hover:text-white text-pink-600 font-bold text-xs rounded-full shadow-sm border border-pink-200 transition-all duration-300 cursor-pointer hover:shadow-md hover:-translate-x-1"
        >
          <ArrowLeft size={16} />
          <span>Kembali</span>
        </button>
      </div>

      {/* HERO SECTION */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4 -mt-4 pt-0">
        <div className="w-40 h-40 mx-auto bg-pink-100/50 rounded-full p-2 border-2 border-pink-200 flex items-center justify-center shadow-md">
          <img src={currentFlower.img} alt={currentFlower.nama} className="w-full h-full object-contain" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl font-cursive font-bold text-pink-600">
            Makna & Filosofi Bunga {currentFlower.nama}
          </h1>
          <p className="text-sm sm:text-base text-pink-400 max-w-xl mx-auto leading-relaxed">
            {currentFlower.subtitle}
          </p>
        </div>
        <div className="h-[1.5px] w-24 bg-pink-300 mx-auto" />
      </section>

      {/* ARTIKEL EDUKASI */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-sm space-y-3">
          <h3 className="font-serif font-bold text-xl text-pink-800 flex items-center gap-2">
            <Sparkles size={18} className="text-pink-500" />
            <span>{currentFlower.bentukTitle}</span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {currentFlower.bentukDesc}
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-sm space-y-3">
          <h3 className="font-serif font-bold text-xl text-pink-800 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-pink-500" />
            <span>{currentFlower.pesanTitle}</span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {currentFlower.pesanDesc}
          </p>
        </div>

        <div className="bg-pink-50/50 p-6 sm:p-8 rounded-3xl border border-pink-200 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-xl text-pink-800 flex items-center gap-2">
            <Palette size={18} className="text-pink-500" />
            <span>{currentFlower.warnaTitle}</span>
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-gray-600 pl-4">
            {currentFlower.warnaList.map((item, idx) => (
              <li key={idx}>
                <strong className={item.color}>{item.label}:</strong> {item.desc}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* KATALOG PRODUK DENGAN KOMPONEN PAGINATION PUSAT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-cursive font-bold text-pink-600">
              Rekomendasi Buket {currentFlower.nama}
            </h2>
            <p className="text-xs text-pink-400">Koleksi rangkaian bunga segar terbaik dari toko kami</p>
          </div>
          
          <Link 
            to={`/bunga?jenis=${currentFlower.nama}`} 
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 text-xs font-bold rounded-full transition"
          >
            <Grid size={14} />
            <span>Semua Katalog Bunga →</span>
          </Link>
        </div>

        {/* Grid Produk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {currentProducts.map((prod) => (
            <div 
              key={prod.id} 
              onClick={() => setSelectedProduct(prod)}
              className="bg-white rounded-3xl border border-pink-100 overflow-hidden shadow-xs hover:shadow-md transition duration-300 flex flex-col justify-between cursor-pointer group p-3"
            >
              <div className="relative h-56 overflow-hidden rounded-2xl bg-pink-50/20">
                <img
                  src={prod.gambarProduk}
                  alt={prod.namaProduk}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
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
                  {prod.kategori}
                </span>
                <h3 className="font-serif font-bold text-pink-900 text-base leading-snug line-clamp-1">
                  {prod.namaProduk}
                </h3>
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

        {/* MENGGUNAKAN KOMPONEN PAGINATION PUSAT */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            setCurrentPage(page);
          }}
        />
      </section>

      {/* JELAJAHI BUNGA LAINNYA */}
      <section className="bg-pink-50/30 py-12 border-y border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 text-center">
          <div className="space-y-1">
            <h2 className="text-3xl md:text-4xl font-cursive font-bold text-pink-600">
              Jelajahi Jenis Bunga Lainnya
            </h2>
            <p className="text-xs text-pink-400">
              Temukan filosofi dan makna indah dari berbagai variasi bunga pilihan kami
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {otherFlowers.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/bunga/${item.id}`)}
                className="w-full sm:w-[calc(50%-8rem)] lg:w-[calc(25%-1rem)] bg-white p-4 rounded-2xl border border-pink-100 shadow-xs hover:shadow-md hover:-translate-y-1 transition duration-300 cursor-pointer text-center flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-16 h-16 mx-auto overflow-hidden rounded-full border border-pink-100 p-1 bg-pink-50/30 flex items-center justify-center">
                    <img src={item.img} alt={item.nama} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="font-bold text-pink-800 text-sm">{item.nama}</h3>
                  <p className="text-[11px] text-pink-400 leading-relaxed line-clamp-2">{item.desc}</p>
                </div>
                <div className="pt-3 mt-2 border-t border-pink-50">
                  <span className="text-[11px] font-bold text-pink-500 hover:text-pink-700 transition">
                    Baca selengkapnya →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

export default FlowerMeaningDetail;