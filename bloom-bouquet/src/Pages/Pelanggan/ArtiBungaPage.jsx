/**
 * FILE: src/Pages/FlowerMeaningsPage.jsx
 * TUJUAN: Menampilkan daftar jenis bunga beserta ringkasan filosofi atau maknanya.
 * KETERHUBUNGAN: Mengambil data statis makna bunga untuk diedukasikan kepada pengguna.
 */

// [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import CustomAlert from "../../Components/CustomAlert";
import { Sparkles, ArrowRight, HeartHandshake, ArrowLeft } from "lucide-react";
import { flowerDataContent } from "../../Data/Flowers";

const FlowerMeaningsPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [showAlert, setShowAlert] = useState(false);

  // [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
  useEffect(() => {
    // [DI LUAR MODUL] window.scrollTo: Memanipulasi browser untuk menggulir halaman ke koordinat tertentu.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const handleBuilderAccess = () => {
    navigate("/rangkai-buket");
  };

  const meaningList = Object.keys(flowerDataContent).map((key) => ({
    id: key,
    nama: flowerDataContent[key].nama,
    desc: flowerDataContent[key].subtitle,
    img: flowerDataContent[key].img,
  }));

  return (
    <div className="space-y-12 font-sans pb-20 bg-gradient-to-b from-pink-50/40 via-white to-pink-50/20 min-h-screen">
      
      <CustomAlert
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        onConfirm={() => {
          setShowAlert(false);
          navigate("/masuk");
        }}
        type="login"
        message="Masuk ke akunmu dulu yuk untuk mulai merangkai buket bunga impianmu!"
        confirmText="Okey Siap"
        cancelText="Nanti Aja Deh"
      />

      {/* HEADER HERO ESTETIK */}
      <div className="relative overflow-hidden bg-gradient-to-r from-pink-100/80 via-pink-50 to-pink-100/60 py-12 border-b border-pink-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
          <div>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-pink-500 hover:text-white text-pink-600 font-bold text-xs rounded-full shadow-sm border border-pink-200 transition-all duration-300 cursor-pointer hover:shadow-md hover:-translate-x-1"
            >
              <ArrowLeft size={16} />
              <span>Kembali</span>
            </button>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center gap-4">
              <div className="w-10 sm:flex-1 h-[2px] bg-pink-300 rounded-full shrink-0" />
              <div className="text-center shrink-0 px-2 flex flex-col items-center space-y-4">
                <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md text-pink-600 text-xs font-bold px-4 py-1.5 rounded-full border border-pink-200 shadow-xs">
                  <Sparkles size={14} className="text-pink-500 animate-spin" /> Ensiklopedia & Filosofi Flora
                </span>
                <h1 className="text-4xl sm:text-6xl font-cursive font-bold text-pink-700 tracking-wide">
                  Makna & Filosofi Bunga
                </h1>
                <p className="text-[10px] sm:text-xs text-pink-500 max-w-[280px] sm:max-w-xl mx-auto leading-relaxed font-medium">
                  Setiap tangkai bunga membawa cerita, bahasa rahasia, dan simbolisme mendalam untuk mewakili ketulusan perasaanmu.
                </p>
              </div>
              <div className="w-10 sm:flex-1 h-[2px] bg-pink-300 rounded-full shrink-0" />
            </div>
          </div>
        </div>
      </div>

      {/* GRID KARTU ARTI BUNGA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {meaningList.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/bunga/${item.id}`)}
              className="bg-white/90 backdrop-blur-xs p-7 rounded-[2.5rem] border border-pink-100 shadow-xs hover:shadow-xl hover:border-pink-300 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-5 relative z-10">
                <div className="w-24 h-24 mx-auto overflow-hidden rounded-full border-2 border-pink-200/80 p-3 bg-pink-50/60 flex items-center justify-center shadow-inner group-hover:border-pink-400 transition duration-300">
                  <img 
                    src={item.img} 
                    alt={item.nama} 
                    className="w-full h-full object-contain group-hover:scale-110 group-hover:rotate-3 transition duration-500" 
                  />
                </div>

                <div className="text-center space-y-2">
                  <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                    Koleksi Makna
                  </span>
                  <h3 className="font-serif font-bold text-2xl text-pink-900 group-hover:text-pink-600 transition">
                    Bunga {item.nama}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-2 px-2">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="pt-5 mt-6 border-t border-pink-50 flex items-center justify-center gap-2 text-xs font-bold text-pink-600 group-hover:text-pink-700 relative z-10">
                <span className="group-hover:underline">Baca Filosofi Lengkap</span>
                <ArrowRight size={15} className="group-hover:translate-x-1.5 transition duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BANNER BAWAH DENGAN CEK LOGIN */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        <div className="bg-gradient-to-r from-pink-500 to-rose-400 rounded-3xl p-8 sm:p-10 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 opacity-10 pointer-events-none">
            <HeartHandshake size={200} />
          </div>
          
          <div className="space-y-2 text-center md:text-left relative z-10">
            <h3 className="text-2xl sm:text-3xl font-cursive font-bold text-pink-100">
              Bingung Menentukan Pilihan yang Tepat?
            </h3>
            <p className="text-xs sm:text-sm text-pink-50 max-w-xl leading-relaxed font-medium">
              Kamu bisa langsung merangkai buket custom sendiri sesuai makna dan warna kesukaan orang tersayang di fitur Rangkai Buket kami.
            </p>
          </div>

          <button
            onClick={handleBuilderAccess}
            className="px-6 py-3 bg-white text-pink-600 hover:bg-pink-50 font-bold text-xs rounded-full shadow-md hover:scale-105 transition duration-300 shrink-0 cursor-pointer relative z-10"
          >
            Mulai Rangkai Sekarang →
          </button>
        </div>
      </div>

    </div>
  );
};

export default FlowerMeaningsPage;