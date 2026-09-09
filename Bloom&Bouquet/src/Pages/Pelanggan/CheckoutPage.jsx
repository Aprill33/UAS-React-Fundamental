import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { OrderContext } from "../../context/OrderContext";
import { VoucherContext } from "../../context/VoucherContext";
import { ArrowLeft, Sparkles, Receipt, MapPin, CreditCard, Tag, CheckCircle2, ChevronDown, Mail } from "lucide-react";
import CustomAlert from "../../Components/CustomAlert";

const ONGKIR_ZONES = {
  "Bandung Kota": 10000,
  "Cimahi": 15000,
  "Bandung Barat": 20000,
  "Kabupaten Bandung": 20000,
  "Sumedang": 30000,
  "Garut": 35000,
  "Cianjur": 35000,
  "Subang": 35000,
  "Purwakarta": 40000,
  "Karawang": 45000,
  "Bogor": 50000,
  "Bekasi": 50000,
  "Kota Lainnya": 100000,
};

const SHIPPING_ZONES = [
  {
    label: "Zona 1 — Bandung Raya",
    cities: ["Bandung Kota", "Cimahi", "Bandung Barat", "Kabupaten Bandung"]
  },
  {
    label: "Zona 2 — Sekitar Bandung",
    cities: ["Sumedang", "Garut", "Cianjur", "Subang"]
  },
  {
    label: "Zona 3 — Luar Bandung",
    cities: ["Purwakarta", "Karawang", "Bogor", "Bekasi"]
  },
  {
    label: "Zona 4 — Luar Area Utama (Tarif Flat)",
    cities: ["Kota Lainnya"]
  }
];

const BANK_OPTIONS = ["BCA", "Mandiri", "BNI", "BRI", "BSI"];
const EWALLET_OPTIONS = ["GoPay", "OVO", "DANA", "ShopeePay", "LinkAja"];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, selectedItems, totalAsli, totalDiskon, removeSelectedFromCart } = useContext(CartContext);
  const checkoutItems = cartItems.filter(item => selectedItems.includes(item.id));
  const { currentUser, updateProfile } = useContext(AuthContext);
  const { addOrder } = useContext(OrderContext);
  const { checkVoucher } = useContext(VoucherContext);

  const [shippingCity, setShippingCity] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");
  // STATE BARU: Menyimpan teks pesan yang akan ditulis di kartu ucapan (bersifat opsional)
  const [greetingMessage, setGreetingMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Transfer Bank");
  const [paymentSubMethod, setPaymentSubMethod] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [activeVoucher, setActiveVoucher] = useState(null);
  const [voucherError, setVoucherError] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorAlertMessage, setErrorAlertMessage] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0 && !isCheckingOut) {
      navigate("/keranjang");
    }
    if (currentUser?.address) {
      setShippingAddress(currentUser.address);
    }
    if (currentUser?.city) {
      setShippingCity(currentUser.city);
    }
    if (currentUser?.phone) {
      setShippingPhone(currentUser.phone);
    }
  }, [cartItems, navigate, currentUser, isCheckingOut]);

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    
    // Jika user menekan backspace hingga kosong
    if (value === "" || value === "+") {
      setShippingPhone("");
      return;
    }

    // Ambil hanya angka
    let digits = value.replace(/\D/g, "");
    
    // Konversi awalan 08 menjadi 628
    if (digits.startsWith("08")) {
      digits = "62" + digits.slice(1);
    } else if (digits.length > 0 && !digits.startsWith("62")) {
      // Jika angka selain 0 diketik di awal, paksa jadi awalan 62
      digits = "62" + digits;
    }

    // Maksimal 12 digit (tidak termasuk 62) -> Total 14 digit
    if (digits.length > 14) {
      digits = digits.slice(0, 14);
    }

    let formatted = "";
    if (digits.length > 0) {
      formatted = "+" + digits.slice(0, 2); // +62
      if (digits.length > 2) {
        formatted += " " + digits.slice(2, 5);
      }
      if (digits.length > 5) {
        formatted += "-" + digits.slice(5, 9);
      }
      if (digits.length > 9) {
        formatted += "-" + digits.slice(9);
      }
    }
    
    setShippingPhone(formatted);
  };

  const ongkir = ONGKIR_ZONES[shippingCity] || 0;
  
  // Hitung diskon voucher
  let voucherDiscount = 0;
  if (activeVoucher) {
    if (activeVoucher.type === "percent") {
      voucherDiscount = (totalAsli - totalDiskon) * (activeVoucher.value / 100);
    } else {
      voucherDiscount = activeVoucher.value;
    }
    // Jangan sampai voucher melebihi harga produk
    if (voucherDiscount > (totalAsli - totalDiskon)) {
      voucherDiscount = totalAsli - totalDiskon;
    }
  }

  const grandTotal = totalAsli - totalDiskon - voucherDiscount + ongkir;

  const handleApplyVoucher = () => {
    setVoucherError("");
    if (!voucherCode.trim()) return;
    
    const v = checkVoucher(voucherCode);
    if (v) {
      setActiveVoucher(v);
    } else {
      setActiveVoucher(null);
      setVoucherError("Kode voucher tidak valid atau sudah tidak aktif.");
    }
  };

  const handlePlaceOrder = () => {
    if (!shippingCity || !shippingAddress.trim() || !shippingPhone.trim()) {
      setErrorAlertMessage("Harap lengkapi nomor telepon, alamat, dan kota pengiriman!");
      setShowErrorAlert(true);
      return;
    }
    
    if (paymentMethod !== "COD (Bayar di Tempat)" && !paymentSubMethod) {
      setErrorAlertMessage(`Harap pilih ${paymentMethod === "Transfer Bank" ? "bank" : "e-wallet"} tujuan pembayaran.`);
      setShowErrorAlert(true);
      return;
    }

    const phoneDigits = shippingPhone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      setErrorAlertMessage("Nomor telepon tidak valid (minimal 10 angka).");
      setShowErrorAlert(true);
      return;
    }

    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute:"2-digit" }),
      items: checkoutItems,
      totalAsli,
      totalDiskon,
      voucher: activeVoucher ? { code: activeVoucher.code, discount: voucherDiscount } : null,
      ongkir,
      totalHarga: grandTotal,
      shippingCity,
      shippingAddress,
      shippingPhone,
      // TAMBAHAN: Menyisipkan pesan kartu ucapan ke dalam struktur pesanan agar tersimpan di database lokal
      greetingMessage: greetingMessage.trim() !== "" ? greetingMessage : null,
      paymentMethod: paymentMethod === "COD (Bayar di Tempat)" ? paymentMethod : `${paymentMethod} - ${paymentSubMethod}`,
      status: "Menunggu Konfirmasi"
    };

    setIsCheckingOut(true);
    addOrder(newOrder);


    // SIMPAN KE PROFIL JIKA SEBELUMNYA KOSONG
    if (currentUser && (!currentUser.address || !currentUser.city || !currentUser.phone)) {
      updateProfile({
        address: currentUser.address || shippingAddress,
        city: currentUser.city || shippingCity,
        phone: currentUser.phone || shippingPhone
      });
    }

    removeSelectedFromCart();
    setShowAlert(true);
  };

  if (checkoutItems.length === 0 && !isCheckingOut) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center font-sans">
        <h2 className="text-2xl text-pink-700 font-bold mb-4">Tidak ada pesanan untuk diproses</h2>
        <button onClick={() => navigate("/keranjang")} className="px-6 py-2 bg-pink-500 text-white rounded-full font-bold">Kembali ke Keranjang</button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-pink-50/30 to-white min-h-screen font-sans pb-20">
      <CustomAlert
        isOpen={showAlert}
        onClose={() => {
          setShowAlert(false);
          navigate("/pesanan");
        }}
        onConfirm={() => {
          setShowAlert(false);
          navigate("/pesanan");
        }}
        type="checkout"
        title="Pesanan Berhasil Dibuat!"
        message="Terima kasih, pesananmu sedang kami proses. Bunga cantikmu akan segera meluncur!"
        confirmText="Lihat Pesanan"
        showCancel={false}
      />

      <CustomAlert
        isOpen={showErrorAlert}
        onClose={() => setShowErrorAlert(false)}
        onConfirm={() => setShowErrorAlert(false)}
        type="error_toast"
        title="Ups, Ada yang Kurang!"
        message={errorAlertMessage}
        confirmText="Okey, saya perbaiki"
        showCancel={false}
      />

      <div className="bg-pink-100/60 py-8 border-b border-pink-200 relative mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-4">
          <button
            onClick={() => navigate("/keranjang")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-pink-500 hover:text-white text-pink-600 font-bold text-xs rounded-full shadow-sm border border-pink-200 transition-all duration-300 cursor-pointer hover:shadow-md hover:-translate-x-1"
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Keranjang</span>
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center gap-4">
            <div className="flex-1 h-[1.5px] bg-pink-200" />
            <div className="text-center shrink-0 px-2 flex flex-col items-center space-y-1">
              <span className="inline-flex items-center gap-1.5 bg-white text-pink-600 text-xs font-bold px-4 py-1.5 rounded-full border border-pink-200 shadow-xs">
                <Receipt size={14} /> Langkah Terakhir
              </span>
              <h1 className="text-4xl sm:text-5xl font-cursive font-bold text-pink-700">
                Checkout Pesanan
              </h1>
              <p className="text-xs sm:text-sm text-pink-500 max-w-xl mx-auto">
                Lengkapi detail pengiriman dan selesaikan pembayaranmu.
              </p>
            </div>
            <div className="flex-1 h-[1.5px] bg-pink-200" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-8">
        
        {/* KIRI: FORM PENGIRIMAN & PEMBAYARAN */}
        <div className="flex-1 space-y-6">
          
          {/* Detail Pengiriman */}
          <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm">
            <h2 className="font-bold text-pink-800 text-lg flex items-center gap-2 mb-4 border-b border-pink-100 pb-4">
              <MapPin size={20} className="text-pink-500" />
              Detail Pengiriman
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-pink-700 uppercase tracking-wide mb-1.5">Kota Pengiriman</label>
                <div className="relative">
                  <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full p-3 text-sm font-bold text-pink-700 border border-pink-200 rounded-xl bg-pink-50 hover:bg-pink-100 flex items-center justify-between cursor-pointer transition shadow-sm"
                  >
                    <span>{shippingCity || <span className="text-gray-400 font-normal">Pilih Kota Tujuan...</span>}</span>
                    <ChevronDown size={16} className={`text-pink-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                  
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-white border border-pink-200 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto overflow-x-hidden animate-fadeIn">
                      {SHIPPING_ZONES.map((zone, zIdx) => (
                        <div key={zIdx} className="mb-1 last:mb-0">
                          <div className="px-4 py-2 bg-pink-50/50 text-[11px] font-bold text-pink-800 uppercase tracking-wider sticky top-0 backdrop-blur-sm">
                            {zone.label}
                          </div>
                          {zone.cities.map((city, cIdx) => (
                            <div 
                              key={cIdx}
                              onClick={() => {
                                setShippingCity(city);
                                setIsDropdownOpen(false);
                              }}
                              className={`px-5 py-2.5 text-sm font-medium cursor-pointer transition flex items-center justify-between ${shippingCity === city ? 'bg-pink-500 text-white' : 'text-pink-700 hover:bg-pink-100'}`}
                            >
                              <span>{city}</span>
                              {shippingCity === city && <CheckCircle2 size={16} className="text-white" />}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-pink-700 uppercase tracking-wide mb-1.5">Alamat Lengkap</label>
                <textarea 
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Nama jalan, RT/RW, Patokan, dll."
                  className="w-full p-3 text-sm border border-pink-200 rounded-xl bg-pink-50/30 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" 
                  rows="3"
                ></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-pink-700 uppercase tracking-wide mb-1.5">Nomor Telepon Penerima</label>
                <input 
                  type="text" 
                  value={shippingPhone}
                  onChange={handlePhoneChange}
                  placeholder="+62 8xx-xxxx-xxxx"
                  className="w-full p-3 text-sm border border-pink-200 rounded-xl bg-pink-50/30 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" 
                />
              </div>
            </div>
          </div>

          {/* BAGIAN BARU: Pesan Kartu Ucapan */}
          <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm">
            <h2 className="font-bold text-pink-800 text-lg flex items-center gap-2 mb-4 border-b border-pink-100 pb-4">
              <Mail size={20} className="text-pink-500" />
              Kartu Ucapan (Opsional)
            </h2>
            <div>
              {/* Panduan untuk pelanggan */}
              <p className="text-xs text-pink-500 mb-3">Tulis pesan manis yang ingin disematkan pada kartu ucapan untuk penerima. Kosongkan jika tidak perlu.</p>
              <textarea 
                // Mengaitkan value dengan state greetingMessage
                value={greetingMessage}
                // Memperbarui state setiap kali pengguna mengetik
                onChange={(e) => setGreetingMessage(e.target.value)}
                placeholder="Contoh: Happy Anniversary sayang! Semoga kita bahagia selalu..."
                className="w-full p-3 text-sm border border-pink-200 rounded-xl bg-pink-50/30 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" 
                rows="3"
              ></textarea>
            </div>
          </div>

          {/* Metode Pembayaran */}
          <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm">
            <h2 className="font-bold text-pink-800 text-lg flex items-center gap-2 mb-4 border-b border-pink-100 pb-4">
              <CreditCard size={20} className="text-pink-500" />
              Metode Pembayaran
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {["Transfer Bank", "E-Wallet", "COD (Bayar di Tempat)"].map((method) => (
                  <div 
                    key={method}
                    onClick={() => {
                      setPaymentMethod(method);
                      setPaymentSubMethod(""); // Reset sub-method when main method changes
                    }}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === method ? 'border-pink-500 bg-pink-50' : 'border-gray-100 hover:border-pink-200'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-bold ${paymentMethod === method ? 'text-pink-700' : 'text-gray-600'}`}>{method}</span>
                      {paymentMethod === method && <CheckCircle2 size={18} className="text-pink-500" />}
                    </div>
                  </div>
                ))}
              </div>

              {/* Sub-metode Pembayaran */}
              {paymentMethod === "Transfer Bank" && (
                <div className="p-4 border border-pink-100 rounded-xl bg-pink-50/30 animate-fadeIn">
                  <p className="text-xs font-bold text-pink-700 mb-3 uppercase tracking-wide">Pilih Bank Tujuan</p>
                  <div className="flex flex-wrap gap-2">
                    {BANK_OPTIONS.map(bank => (
                      <button
                        key={bank}
                        onClick={() => setPaymentSubMethod(bank)}
                        className={`px-4 py-2 text-sm font-bold rounded-lg border transition-all cursor-pointer ${paymentSubMethod === bank ? 'bg-pink-500 text-white border-pink-500 shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300 hover:text-pink-600'}`}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {paymentMethod === "E-Wallet" && (
                <div className="p-4 border border-pink-100 rounded-xl bg-pink-50/30 animate-fadeIn">
                  <p className="text-xs font-bold text-pink-700 mb-3 uppercase tracking-wide">Pilih E-Wallet Tujuan</p>
                  <div className="flex flex-wrap gap-2">
                    {EWALLET_OPTIONS.map(ewallet => (
                      <button
                        key={ewallet}
                        onClick={() => setPaymentSubMethod(ewallet)}
                        className={`px-4 py-2 text-sm font-bold rounded-lg border transition-all cursor-pointer ${paymentSubMethod === ewallet ? 'bg-pink-500 text-white border-pink-500 shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300 hover:text-pink-600'}`}
                      >
                        {ewallet}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Voucher */}
          <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm">
            <h2 className="font-bold text-pink-800 text-lg flex items-center gap-2 mb-4 border-b border-pink-100 pb-4">
              <Tag size={20} className="text-pink-500" />
              Voucher Diskon
            </h2>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                placeholder="Masukkan kode voucher (contoh: BLOOM10)" 
                className="flex-1 p-3 text-sm border border-pink-200 rounded-xl bg-pink-50/30 focus:outline-none focus:ring-2 focus:ring-pink-400 transition uppercase"
              />
              <button 
                onClick={handleApplyVoucher}
                className="px-6 py-3 bg-pink-500 text-white rounded-xl font-bold hover:bg-pink-600 transition shadow-sm cursor-pointer"
              >
                Pakai
              </button>
            </div>
            {voucherError && <p className="text-xs text-red-500 mt-2 ml-1">{voucherError}</p>}
            {activeVoucher && (
              <div className="mt-3 bg-emerald-50 text-emerald-600 p-3 rounded-xl border border-emerald-100 text-sm flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>Berhasil memakai voucher <b>{activeVoucher.code}</b>! Diskon {activeVoucher.type === 'percent' ? `${activeVoucher.value}%` : `Rp ${activeVoucher.value.toLocaleString('id-ID')}`} telah diterapkan.</span>
              </div>
            )}
          </div>
        </div>

        {/* KANAN: RINGKASAN BELANJA */}
        <div className="lg:w-[380px] shrink-0 h-fit space-y-4 sticky top-6">
          <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm">
            <h3 className="font-bold text-pink-800 text-lg flex items-center gap-2 mb-4 border-b border-pink-100 pb-4">
              <Receipt size={20} className="text-pink-500" />
              Rincian Pembayaran
            </h3>
            
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Total Harga ({checkoutItems.reduce((acc, item) => acc + item.qty, 0)} barang)</span>
                <span className="font-semibold text-gray-800">Rp {totalAsli.toLocaleString("id-ID")}</span>
              </div>
              {totalDiskon > 0 && (
                <div className="flex justify-between text-emerald-500">
                  <span>Diskon Barang</span>
                  <span className="font-semibold">- Rp {totalDiskon.toLocaleString("id-ID")}</span>
                </div>
              )}
              {voucherDiscount > 0 && (
                <div className="flex justify-between text-emerald-500">
                  <span>Diskon Voucher ({activeVoucher.code})</span>
                  <span className="font-semibold">- Rp {voucherDiscount.toLocaleString("id-ID")}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Ongkos Kirim {shippingCity && `(${shippingCity})`}</span>
                <span className="font-semibold text-gray-800">{ongkir === 0 ? "Pilih Kota" : `Rp ${ongkir.toLocaleString("id-ID")}`}</span>
              </div>
            </div>

            <div className="border-t border-pink-100 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-bold text-pink-900 text-base">Total Bayar</span>
                <span className="text-xl font-bold text-pink-600">
                  Rp {grandTotal.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles size={18} />
              Buat Pesanan
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;
