/**
 * FILE: /src/Pages/Pelanggan/RangkaiBuketPage.jsx
 * TUJUAN: Halaman aplikasi utama yang merender antarmuka pengguna.
 * KETERHUBUNGAN: Terintegrasi dengan komponen induk dan menggunakan Context API atau Hooks untuk mengelola datanya.
 */

import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { CustomBouquetContext } from "../../context/CustomBouquetContext";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../../Components/CustomAlert";
import { Sparkles, ShoppingCart, ArrowLeft, Flower } from "lucide-react";
import flowerImg from "../../assets/flower.png";
import {
  RoseAnimated,
  TulipAnimated,
  SunflowerAnimated,
  LilyAnimated,
  DaisyAnimated,
  OrchidAnimated,
  PaperWrapIcon,
  RoundBoxIcon,
  BasketIcon,
} from "../../Components/FlowerIcons";

// Data pembungkus dan bunga sekarang diambil dari CustomBouquetContext


const BouquetBuilder = () => {
  const { wrappingOptions, flowerCategories, flowerOptions, getFlowerComponent } = useContext(CustomBouquetContext);
  const { addToCart } = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [alertData, setAlertData] = useState({ isOpen: false });
  const [selectedWrap, setSelectedWrap] = useState(wrappingOptions[0]);
  const [wrapColor, setWrapColor] = useState("Soft Pink");
  const [ribbonColor, setRibbonColor] = useState("Pita Pink");
  const [basketSize, setBasketSize] = useState({ size: "Small", extraHarga: 0 });

  const [selectedFlowers, setSelectedFlowers] = useState([]);
  const [greetingCard, setGreetingCard] = useState({ to: "", from: "", message: "" });
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null); // State baru untuk kategori bunga

  const handleSelectWrap = (wrap) => {
    setSelectedWrap(wrap);
    if (wrap.type === "paper") {
      setWrapColor(wrap.colorOptions[0]);
      setRibbonColor(wrap.ribbonOptions[0]);
    } else if (wrap.type === "box") {
      setWrapColor(wrap.colorOptions[0]);
    } else if (wrap.type === "basket") {
      setBasketSize(wrap.sizeOptions[0]);
    }
  };

  const handleAddFlower = (flower) => {
    setSelectedFlowers((prev) => {
      const exist = prev.find((item) => item.id === flower.id);
      if (exist) {
        return prev.map((item) =>
          item.id === flower.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...flower, qty: 1 }];
    });
  };

  const handleRemoveFlower = (id) => {
    setSelectedFlowers((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const extraBasketHarga = selectedWrap.type === "basket" ? basketSize.extraHarga : 0;
  const totalHargaBunga = selectedFlowers.reduce(
    (sum, item) => sum + item.harga * item.qty,
    0
  );
  const totalHargaBuket = selectedWrap.harga + extraBasketHarga + totalHargaBunga;

  const getWrapDetailText = () => {
    if (selectedWrap.type === "paper") {
      return `${selectedWrap.nama} (${wrapColor}, ${ribbonColor})`;
    }
    if (selectedWrap.type === "box") {
      return `${selectedWrap.nama} (${wrapColor})`;
    }
    if (selectedWrap.type === "basket") {
      return `${selectedWrap.nama} (Ukuran ${basketSize.size})`;
    }
    return selectedWrap.nama;
  };

  const handleAddToCart = () => {
    if (selectedFlowers.length === 0) {
      setAlertData({
        isOpen: true,
        type: "error",
        title: "Oops!",
        message: "Silakan pilih minimal 1 tangkai bunga dulu ya!",
        confirmText: "Oke",
        showCancel: false,
        onConfirm: () => setAlertData({ isOpen: false })
      });
      return;
    }

    const customBouquetProduct = {
      id: `custom-${Date.now()}`,
      namaProduk: `Custom Bouquet - ${selectedWrap.nama}`,
      harga: totalHargaBuket,
      gambarProduk: flowerImg,
      deskripsi: `Detail Wadah: ${getWrapDetailText()}. Bunga: ${selectedFlowers
        .map((f) => `${f.nama} (${f.qty}x)`)
        .join(", ")}. Kartu: "To: ${greetingCard.to || "-"}, Msg: ${greetingCard.message || "-"}"`,
      kategori: "Custom",
      statusProduk: "Custom Order",
    };

    if (!currentUser) {
      setAlertData({
        isOpen: true,
        type: "login",
        title: "",
        message: "Masuk ke akunmu dulu yuk untuk menyimpan kreasi buket ini ke keranjang!",
        confirmText: "Okey Siap",
        cancelText: "Nanti Aja Deh",
        onConfirm: () => {
          // [DI LUAR MODUL] sessionStorage: Menyimpan data sementara di browser (hilang saat tab ditutup).
          // [DI LUAR MODUL] JSON.stringify: Mengubah objek JS menjadi string JSON (karena Storage API hanya menerima string).
          sessionStorage.setItem("pendingBouquet", JSON.stringify(customBouquetProduct));
          setAlertData({ isOpen: false });
          navigate("/masuk");
        }
      });
      return;
    }

    addToCart(customBouquetProduct);
    navigate("/keranjang");
  };

  const renderWrapIcon = (wrap) => {
    if (wrap.type === "paper") {
      return (
        <PaperWrapIcon
          color={selectedWrap.id === wrap.id ? wrapColor : wrap.colorOptions[0]}
          ribbonColor={selectedWrap.id === wrap.id ? ribbonColor : wrap.ribbonOptions[0]}
        />
      );
    }
    if (wrap.type === "box") {
      return (
        <RoundBoxIcon
          color={selectedWrap.id === wrap.id ? wrapColor : wrap.colorOptions[0]}
        />
      );
    }
    return <BasketIcon />;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 font-sans relative">
      <CustomAlert
        isOpen={alertData.isOpen}
        onClose={() => setAlertData({ isOpen: false })}
        onConfirm={alertData.onConfirm}
        type={alertData.type}
        title={alertData.title}
        message={alertData.message}
        confirmText={alertData.confirmText}
        cancelText={alertData.cancelText}
        showCancel={alertData.cancelText !== undefined || alertData.showCancel !== false}
      />
      
      {/* TOMBOL KEMBALI GLOBAL */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-8 left-4 sm:left-6 inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-pink-500 hover:text-white text-pink-600 font-bold text-xs rounded-full shadow-sm border border-pink-200 transition-all duration-300 cursor-pointer hover:shadow-md hover:-translate-x-1"
      >
        <ArrowLeft size={16} />
        <span>Kembali</span>
      </button>

      <div className="mb-8 mt-12 sm:mt-0">
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <div className="hidden sm:block flex-1 h-[1.5px] bg-pink-200" />
          <div className="text-center px-1 sm:px-2 flex flex-col items-center space-y-1 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 bg-pink-100 text-pink-600 text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full mb-2">
              <Sparkles size={14} className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Fitur Interaktif
            </span>
            <h1 className="text-3xl md:text-5xl font-cursive font-bold text-pink-600 leading-tight">
              Rangkai Buket Sendiri
            </h1>
            <p className="text-[10px] sm:text-sm text-pink-400 mx-auto leading-relaxed">Pilih wadah, tangkai bunga favorit, dan tulis kartu ucapanmu</p>
          </div>
          <div className="hidden sm:block flex-1 h-[1.5px] bg-pink-200" />
        </div>
      </div>

      <div className="flex justify-center mb-8 gap-1.5 sm:gap-2 px-2 sm:px-0">
        {[1, 2, 3].map((s) => (
          <button
            key={s}
            onClick={() => setStep(s)}
            className={`flex-1 sm:flex-none px-2 sm:px-4 py-2 rounded-xl sm:rounded-full text-[10px] sm:text-xs font-bold transition-all flex flex-col sm:block items-center justify-center leading-tight ${
              step === s
                ? "bg-pink-500 text-white shadow-md"
                : "bg-white text-pink-500 border border-pink-200 cursor-pointer hover:bg-pink-50"
            }`}
          >
            <span className="sm:hidden">Step {s}</span>
            <span className="hidden sm:inline">Langkah {s}: </span>
            <span className="text-center">{s === 1 ? "Wadah" : s === 2 ? "Bunga" : "Kartu"}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {step === 1 && (
            <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm space-y-6">
              <h3 className="font-bold text-pink-700">1. Pilih Jenis Wadah / Wrapping</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {wrappingOptions.map((wrap) => (
                  <div
                    key={wrap.id}
                    onClick={() => handleSelectWrap(wrap)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all text-center flex flex-col items-center justify-between ${
                      selectedWrap.id === wrap.id
                        ? "border-pink-500 bg-pink-50/50 shadow-sm"
                        : "border-pink-100 bg-white hover:border-pink-200"
                    }`}
                  >
                    {renderWrapIcon(wrap)}
                    <div>
                      <div className="font-semibold text-pink-700 text-sm mb-1">{wrap.nama}</div>
                      <div className="text-xs text-pink-500 font-bold">
                        +Rp {wrap.harga.toLocaleString("id-ID")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* OPSI WARNA KERTAS & PITA (PAPER) */}
              {selectedWrap.type === "paper" && (
                <div className="p-4 bg-pink-50/50 rounded-2xl border border-pink-100 space-y-3">
                  <div>
                    <label className="text-xs font-bold text-pink-700 block mb-2">Pilih Warna Kertas Paper:</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedWrap.colorOptions.map((c) => (
                        <button
                          key={c}
                          onClick={() => setWrapColor(c)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                            wrapColor === c
                              ? "bg-pink-500 text-white shadow-sm"
                              : "bg-white text-pink-600 border border-pink-200 hover:bg-pink-50"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-pink-700 block mb-2">Pilih Warna Pita:</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedWrap.ribbonOptions.map((r) => (
                        <button
                          key={r}
                          onClick={() => setRibbonColor(r)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                            ribbonColor === r
                              ? "bg-pink-500 text-white shadow-sm"
                              : "bg-white text-pink-600 border border-pink-200 hover:bg-pink-50"
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* OPSI WARNA BOX */}
              {selectedWrap.type === "box" && (
                <div className="p-4 bg-pink-50/50 rounded-2xl border border-pink-100">
                  <label className="text-xs font-bold text-pink-700 block mb-2">Pilih Warna Round Box:</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedWrap.colorOptions.map((c) => (
                      <button
                        key={c}
                        onClick={() => setWrapColor(c)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                          wrapColor === c
                            ? "bg-pink-500 text-white shadow-sm"
                            : "bg-white text-pink-600 border border-pink-200 hover:bg-pink-50"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* OPSI UKURAN BASKET */}
              {selectedWrap.type === "basket" && (
                <div className="p-4 bg-pink-50/50 rounded-2xl border border-pink-100">
                  <label className="text-xs font-bold text-pink-700 block mb-2">Pilih Ukuran Keranjang:</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedWrap.sizeOptions.map((s) => (
                      <button
                        key={s.size}
                        onClick={() => setBasketSize(s)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                          basketSize.size === s.size
                            ? "bg-pink-500 text-white shadow-sm"
                            : "bg-white text-pink-600 border border-pink-200 hover:bg-pink-50"
                        }`}
                      >
                        Ukuran {s.size} {s.extraHarga > 0 ? `(+Rp ${s.extraHarga.toLocaleString("id-ID")})` : ""}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setStep(2)}
                className="w-full py-3 bg-pink-500 text-white rounded-full font-semibold text-sm hover:bg-pink-600 transition cursor-pointer"
              >
                Lanjut ke Pilih Bunga →
              </button>
            </div>
          )}

          {/* STEP 2: BUNGA */}
          {step === 2 && (
            <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm">
              <h3 className="font-bold text-pink-700 mb-4">2. Pilih Tangkai Bunga</h3>
              
              {!selectedCategory ? (
                // 2.A: TAMPILAN PEMILIHAN KATEGORI BUNGA
                <div className="space-y-4 animate-in fade-in duration-300">
                  <p className="text-sm text-pink-500 mb-2">Pilih jenis bunga yang kamu inginkan:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {flowerCategories.map((cat) => (
                      <div
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className="p-4 border-2 border-pink-100 rounded-2xl flex flex-col items-center text-center bg-white shadow-sm hover:border-pink-300 hover:bg-pink-50 cursor-pointer transition group"
                      >
                        <div className="group-hover:scale-110 transition duration-300 bg-slate-50/80 rounded-full w-24 h-24 flex items-center justify-center shadow-inner border border-slate-100">
                          {getFlowerComponent(cat.iconType, cat.iconColor)}
                        </div>
                        <div className="font-bold text-sm text-pink-800 mt-3">{cat.nama}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // 2.B: TAMPILAN PEMILIHAN WARNA/VARIAN BUNGA
                <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="p-2 bg-pink-50 text-pink-500 hover:bg-pink-500 hover:text-white rounded-full transition cursor-pointer"
                      title="Kembali ke Jenis Bunga"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <div>
                      <h4 className="font-bold text-pink-800">
                        Pilih Varian {flowerCategories.find(c => c.id === selectedCategory)?.nama}
                      </h4>
                      <p className="text-[11px] text-pink-500">Tentukan warna dan jumlah tangkai.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {flowerOptions
                      .filter((f) => f.category === selectedCategory)
                      .map((flower) => {
                        const currentQty =
                          selectedFlowers.find((f) => f.id === flower.id)?.qty || 0;
                        return (
                          <div
                            key={flower.id}
                            className="p-3 border border-pink-100 rounded-2xl flex items-center justify-between bg-white shadow-sm hover:border-pink-300 transition"
                          >
                            <div className="flex items-center gap-2">
                              <div className="bg-slate-50/80 rounded-xl p-1 shrink-0 border border-slate-100 shadow-inner">
                                {getFlowerComponent(flower.iconType, flower.iconColor)}
                              </div>
                              <div>
                                <div className="font-bold text-sm text-pink-700 leading-tight mb-1">{flower.nama}</div>
                                <div className="text-[11px] font-semibold text-pink-400">
                                  Rp {flower.harga.toLocaleString("id-ID")}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {currentQty > 0 && (
                                <button
                                  onClick={() => handleRemoveFlower(flower.id)}
                                  className="w-7 h-7 rounded-full bg-pink-100 text-pink-700 font-bold text-xs hover:bg-pink-500 hover:text-white transition cursor-pointer flex items-center justify-center"
                                >
                                  -
                                </button>
                              )}
                              <span className="text-xs font-bold text-gray-700 w-3 text-center">
                                {currentQty}
                              </span>
                              <button
                                onClick={() => handleAddFlower(flower)}
                                className="w-7 h-7 rounded-full bg-pink-50 text-pink-600 font-bold text-xs hover:bg-pink-500 hover:text-white border border-pink-200 transition cursor-pointer flex items-center justify-center"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        );
                    })}
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-8 pt-4 border-t border-pink-50">
                <button
                  onClick={() => setStep(1)}
                  className="w-1/2 py-3 bg-gray-100 text-gray-600 rounded-full font-semibold text-sm hover:bg-pink-500 hover:text-white transition-all cursor-pointer"
                >
                  ← Kembali
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="w-1/2 py-3 bg-pink-500 text-white rounded-full font-semibold text-sm hover:bg-pink-600 transition cursor-pointer"
                >
                  Tulis Kartu Ucapan →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: KARTU UCAPAN */}
          {step === 3 && (
            <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm space-y-4">
              <h3 className="font-bold text-pink-700">3. Kartu Ucapan Digital</h3>
              <div>
                <label className="text-xs font-semibold text-pink-600 uppercase">Penerima (To)</label>
                <input
                  type="text"
                  value={greetingCard.to}
                  onChange={(e) => setGreetingCard({ ...greetingCard, to: e.target.value })}
                  placeholder="Nama Penerima"
                  className="w-full mt-1 p-3 border border-pink-200 rounded-xl bg-pink-50/30 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-pink-600 uppercase">Pengirim (From)</label>
                <input
                  type="text"
                  value={greetingCard.from}
                  onChange={(e) => setGreetingCard({ ...greetingCard, from: e.target.value })}
                  placeholder="Nama Pengirim"
                  className="w-full mt-1 p-3 border border-pink-200 rounded-xl bg-pink-50/30 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-pink-600 uppercase">Pesan Ucapan</label>
                <textarea
                  value={greetingCard.message}
                  onChange={(e) => setGreetingCard({ ...greetingCard, message: e.target.value })}
                  placeholder="Tuliskan ucapan manismu di sini..."
                  rows="3"
                  className="w-full mt-1 p-3 border border-pink-200 rounded-xl bg-pink-50/30 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                ></textarea>
              </div>
              <button
                onClick={() => setStep(2)}
                className="w-full py-3 bg-gray-100 text-gray-600 rounded-full font-semibold text-sm hover:bg-pink-500 hover:text-white transition-all cursor-pointer"
              >
                ← Kembali ke Pilih Bunga
              </button>
            </div>
          )}
        </div>

        {/* PANEL KANAN: RINGKASAN */}
        <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm flex flex-col justify-between h-fit sticky top-6">
          <div>
            <h3 className="font-bold text-pink-700 border-b border-pink-100 pb-3 mb-4">
              Ringkasan Buket Kustom
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-pink-400 block mb-0.5">Wadah & Variasi:</span>
                <span className="font-bold text-pink-700 block">{getWrapDetailText()}</span>
              </div>

              <div>
                <span className="text-pink-400 block mb-1">Pilihan Bunga:</span>
                {selectedFlowers.length === 0 ? (
                  <span className="text-gray-400 italic">Belum ada bunga dipilih</span>
                ) : (
                  selectedFlowers.map((f) => (
                    <div key={f.id} className="flex justify-between font-medium text-gray-700 pl-2 mb-1">
                      <span>{f.nama} (x{f.qty})</span>
                      <span>Rp {(f.harga * f.qty).toLocaleString("id-ID")}</span>
                    </div>
                  ))
                )}
              </div>

              {greetingCard.message && (
                <div className="relative p-5 mt-5 bg-gradient-to-br from-[#fff0f5] to-white rounded-lg shadow-sm border border-pink-200 transform rotate-1 transition hover:rotate-0 hover:shadow-md cursor-default">
                  {/* Selotip (Tape) Decor */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-5 bg-pink-300/40 -rotate-2 rounded-sm backdrop-blur-sm shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-white/50 z-10"></div>
                  
                  <div className="text-left font-sans font-semibold text-[10px] text-pink-400 uppercase tracking-widest mb-3 relative z-10">
                    To: <span className="text-pink-600 font-bold ml-1">{greetingCard.to || "Penerima"}</span>
                  </div>
                  
                  <div className="py-2 text-center text-pink-700 italic font-cursive text-xl sm:text-2xl leading-relaxed whitespace-pre-wrap relative z-10 px-2 min-h-[60px] flex items-center justify-center">
                    "{greetingCard.message}"
                  </div>
                  
                  <div className="text-right font-sans font-semibold text-[10px] text-pink-400 uppercase tracking-widest mt-3 relative z-10">
                    From: <span className="text-pink-600 font-bold ml-1">{greetingCard.from || "Pengirim"}</span>
                  </div>
                  
                  {/* Dekorasi Tambahan */}
                  <div className="absolute bottom-2 left-2 opacity-20 pointer-events-none">
                    <Flower size={32} className="text-pink-500" />
                  </div>
                  <div className="absolute top-4 right-3 opacity-15 pointer-events-none">
                    <Sparkles size={20} className="text-pink-400" />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-pink-100">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-semibold text-pink-400 uppercase">Total Harga</span>
              <span className="text-xl font-bold text-pink-700">
                Rp {totalHargaBuket.toLocaleString("id-ID")}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-semibold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingCart size={16} />
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BouquetBuilder;