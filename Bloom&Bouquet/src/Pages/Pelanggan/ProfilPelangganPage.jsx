import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, MapPin, LogOut, Heart, ShoppingBag, Settings, Sparkles, ArrowLeft } from "lucide-react";
import CustomAlert from "../../Components/CustomAlert";

const Profile = () => {
  const { currentUser, logout, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  // Ambil data yang ada di currentUser, atau kosongkan jika belum ada
  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    address: currentUser?.address || ""
  });

  const [showAlert, setShowAlert] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        username: currentUser.username,
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        address: currentUser.address || ""
      }));
    }
  }, [currentUser]);

  if (!currentUser) return null; // ProtectedRoute will handle redirect if not logged in

  const confirmLogout = () => {
    logout();
    navigate("/masuk");
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData); // Simpan ke localStorage!
    setShowAlert(true);
  };

  return (
    <>
      <CustomAlert
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        onConfirm={() => setShowAlert(false)}
        type="success"
        title="Pembaruan Sukses!"
        message="Perubahan profilmu berhasil disimpan dengan baik."
        confirmText="Tutup"
        showCancel={false}
      />
      <CustomAlert
        isOpen={showLogoutAlert}
        onClose={() => setShowLogoutAlert(false)}
        onConfirm={confirmLogout}
        type="login"
        title="Konfirmasi Keluar"
        message="kamu yakin mau keluar 🥺"
        confirmText="yakin bangett"
        cancelText="ngga jadi deh.."
        showCancel={true}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 font-sans min-h-[70vh]">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-pink-500 hover:text-white text-pink-600 font-bold text-xs rounded-full shadow-sm border border-pink-200 transition-all duration-300 cursor-pointer hover:shadow-md hover:-translate-x-1"
          >
            <ArrowLeft size={16} />
            <span>Kembali</span>
          </button>
        </div>
        
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex-1 h-[1.5px] bg-pink-200" />
          <div className="text-center shrink-0 px-2">
            <h2 className="text-3xl font-cursive font-bold text-pink-700 mb-1">
              Profil Saya
            </h2>
            <p className="text-xs text-pink-500">Kelola informasi akun dan preferensimu</p>
          </div>
          <div className="flex-1 h-[1.5px] bg-pink-200" />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* BAGIAN KIRI: MENU SAMPING */}
          <div className="lg:w-1/3 space-y-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100 flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-pink-200 to-pink-100"></div>
              
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-md mb-4 text-pink-400 relative z-10">
                <User size={48} />
              </div>
              
              <h3 className="text-xl font-bold text-pink-900 capitalize relative z-10">{formData.username || currentUser.username}</h3>
              <span className="text-[11px] font-bold text-pink-600 bg-pink-100 px-3 py-1 rounded-full mt-2 border border-pink-200 relative z-10">
                Pelanggan Setia
              </span>
            </div>

            <div className="bg-white rounded-3xl p-4 shadow-sm border border-pink-100 flex flex-col gap-2">
              <button className="flex items-center gap-3 w-full p-3 bg-pink-50 text-pink-700 font-bold rounded-xl transition border border-pink-100 cursor-pointer">
                <User size={18} /> Data Diri
              </button>
              <button 
                onClick={() => navigate("/pesanan")}
                className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-pink-50 hover:text-pink-600 font-medium rounded-xl transition cursor-pointer"
              >
                <ShoppingBag size={18} /> Riwayat Pesanan
              </button>
              <button 
                onClick={() => navigate("/favorit")}
                className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-pink-50 hover:text-pink-600 font-medium rounded-xl transition cursor-pointer"
              >
                <Heart size={18} /> Bunga Favorit
              </button>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-pink-50 hover:text-pink-600 font-medium rounded-xl transition cursor-pointer"
              >
                <Settings size={18} /> Pengaturan Akun
              </button>
              
              <div className="h-px bg-pink-100 my-2 mx-2"></div>
              
              <button 
                onClick={() => setShowLogoutAlert(true)}
                className="flex items-center gap-3 w-full p-3 text-red-500 hover:bg-red-50 hover:text-red-600 font-bold rounded-xl transition cursor-pointer"
              >
                <LogOut size={18} /> Keluar
              </button>
            </div>
          </div>

          {/* BAGIAN KANAN: KONTEN DATA DIRI */}
          <div className="lg:w-2/3 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-pink-100">
            <h3 className="text-2xl font-serif font-bold text-pink-900 mb-6 flex items-center gap-2 border-b border-pink-100 pb-4">
              <User className="text-pink-500" /> Detail Informasi
            </h3>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Username */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
                    <User size={14} /> Nama Pengguna
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama pengguna"
                    className="w-full p-3.5 bg-white border border-pink-200 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Mail size={14} /> Alamat Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Contoh: pengguna@email.com"
                    className="w-full p-3.5 bg-white border border-pink-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Phone size={14} /> Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Contoh: +62 812 3456 7890"
                    className="w-full p-3.5 bg-white border border-pink-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                  />
                </div>

                {/* Role */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles size={14} /> Tipe Akun
                  </label>
                  <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-500 capitalize cursor-not-allowed">
                    {currentUser.role}
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin size={14} /> Alamat Pengiriman Utama
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Masukkan alamat lengkap pengiriman..."
                  className="w-full p-4 bg-white border border-pink-200 rounded-xl text-sm leading-relaxed text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition resize-none"
                ></textarea>
              </div>

              <div className="pt-6 mt-4 flex justify-end">
                <button type="submit" className="px-6 py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm rounded-full shadow hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer">
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </>
  );
};

export default Profile;
