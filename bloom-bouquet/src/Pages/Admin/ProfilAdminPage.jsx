/**
 * FILE: /src/Pages/Admin/ProfilAdminPage.jsx
 * TUJUAN: Halaman aplikasi utama yang merender antarmuka pengguna.
 * KETERHUBUNGAN: Terintegrasi dengan komponen induk dan menggunakan Context API atau Hooks untuk mengelola datanya.
 */

// [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
import { useState, useContext, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { User, Mail, Phone, Shield, Camera, Save, Flower, Edit3, LogOut } from "lucide-react";
import { flowers as initialFlowers } from "../../Data/Flowers";
import { getAllAdminOrders } from "../../context/OrderContext";

const ProfilAdminPage = () => {
  const { showAlert } = useOutletContext();
  const navigate = useNavigate();
  const { currentUser, updateProfile, logout } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || "",
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    bio: currentUser?.bio || "",
    password: currentUser?.password || ""
  });

  // [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
  useEffect(() => {
    if (currentUser) {
      setFormData({
        fullName: currentUser.fullName || "",
        username: currentUser.username || "",
        email: currentUser.email || "",
        bio: currentUser.bio || "",
        password: currentUser.password || ""
      });
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    // [DI LUAR MODUL] preventDefault: Mencegah aksi bawaan browser (misal form submit page reload).
    e.preventDefault();
    updateProfile(formData);
    showAlert('success', 'Profil Anda berhasil diperbarui!');
  };

  const [flowerList, setFlowerList] = useState(() => {
    // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
    const saved = localStorage.getItem("customFlowersData");
    // [DI LUAR MODUL] JSON.parse: Mengubah string JSON kembali menjadi objek JavaScript.
    return saved ? JSON.parse(saved) : initialFlowers;
  });

  const [orders, setOrders] = useState(getAllAdminOrders);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex items-center justify-center gap-4 mb-2 mt-4">
        <div className="flex-1 h-[1.5px] bg-pink-200" />
        <div className="text-center shrink-0 px-2">
          <h2 className="text-3xl font-cursive font-bold text-pink-700 mb-1">
            Profil Admin
          </h2>
          <p className="text-xs text-pink-500">Kelola informasi akun dan kata sandi Anda</p>
        </div>
        <div className="flex-1 h-[1.5px] bg-pink-200" />
      </div>

      {/* Header Banner & Avatar */}
      <div className="bg-white rounded-3xl border border-pink-100 shadow-sm overflow-hidden relative">
        <div className="h-40 bg-gradient-to-r from-pink-300 via-rose-300 to-pink-400 relative">
           <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:16px_16px]"></div>
           <div className="absolute right-0 top-0 opacity-10 -translate-y-8 translate-x-8"><Flower size={200} /></div>
        </div>
        <div className="px-8 pb-8 pt-0 relative flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16">
          <div className="relative group">
            <div className="w-32 h-32 bg-white p-1.5 rounded-full shadow-lg relative">
               <img src="https://ui-avatars.com/api/?name=Admin+Bloom&background=fdf2f8&color=db2777&size=128&font-size=0.33" alt="Admin Profile" className="w-full h-full rounded-full object-cover" />
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left mb-2">
            <h1 className="text-2xl font-bold text-gray-800">{currentUser?.fullName || "Admin Utama"}</h1>
            <p className="text-pink-500 font-medium flex items-center justify-center sm:justify-start gap-1.5 mt-1 text-xs sm:text-sm">
               <Shield size={14} /> Pusat Kendali Bloom & Bouquet
            </p>
          </div>
          <div className="mb-2 w-full sm:w-auto">
            <button
               onClick={() => {
                 showAlert(
                   "warning",
                   "Keluar dari Akun?",
                   "Anda yakin ingin keluar dari panel admin?",
                   () => {
                     logout();
                     navigate("/masuk");
                   },
                   null,
                   "Ya, Keluar",
                   "Batal"
                 );
               }}
               className="w-full sm:w-auto px-6 py-2.5 bg-rose-100 hover:bg-rose-200 text-rose-600 font-bold rounded-xl transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut size={18} /> Keluar
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Info Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-pink-100 shadow-sm p-6">
            <h3 className="font-bold text-pink-900 mb-4 border-b border-pink-50 pb-2 flex items-center gap-2"><User size={18} className="text-pink-400"/> Informasi Akun</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center shrink-0"><User size={18} /></div>
                <div><p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Username</p><p className="text-sm font-bold text-gray-700">{currentUser?.username}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0"><Mail size={18} /></div>
                <div><p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Email</p><p className="text-sm font-bold text-gray-700">{currentUser?.email || "-"}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0"><Phone size={18} /></div>
                <div><p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Telepon</p><p className="text-sm font-bold text-gray-700">{currentUser?.phone || "-"}</p></div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-rose-400 rounded-3xl shadow-sm p-6 text-white relative overflow-hidden">
             <div className="absolute right-0 top-0 opacity-10 translate-x-4 -translate-y-4"><Flower size={120} /></div>
             <h3 className="font-bold text-lg mb-1 relative z-10">Aktivitas Toko</h3>
             <p className="text-pink-100 text-xs mb-5 relative z-10">Ringkasan total yang Anda kelola</p>
             <div className="flex justify-between items-center relative z-10 bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
               <div className="text-center w-full">
                 <p className="text-3xl font-black drop-shadow-sm">{flowerList.length}</p>
                 <p className="text-[10px] uppercase tracking-widest font-bold text-pink-50 mt-1">Produk</p>
               </div>
               <div className="h-12 w-px bg-white/30 shrink-0"></div>
               <div className="text-center w-full">
                 <p className="text-3xl font-black drop-shadow-sm">{orders.length}</p>
                 <p className="text-[10px] uppercase tracking-widest font-bold text-pink-50 mt-1">Pesanan</p>
               </div>
             </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-pink-100 shadow-sm p-6 sm:p-8 h-fit">
           <h3 className="text-lg font-bold text-pink-900 mb-6 flex items-center gap-2"><Edit3 size={20} className="text-pink-500" /> Perbarui Profil</h3>
           <form onSubmit={handleSave} className="space-y-5">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
               <div>
                 <label className="block text-xs font-bold text-pink-700 uppercase tracking-wide mb-1.5">Nama Lengkap</label>
                 <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full p-3 text-sm font-medium text-gray-700 border border-pink-200 rounded-xl bg-pink-50/30 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
               </div>
               <div>
                 <label className="block text-xs font-bold text-pink-700 uppercase tracking-wide mb-1.5">Username</label>
                 <input type="text" name="username" value={formData.username} onChange={handleInputChange} className="w-full p-3 text-sm font-medium text-gray-700 border border-pink-200 rounded-xl bg-pink-50/30 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
               </div>
             </div>
             <div>
               <label className="block text-xs font-bold text-pink-700 uppercase tracking-wide mb-1.5">Email Utama</label>
               <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-3 text-sm font-medium text-gray-700 border border-pink-200 rounded-xl bg-pink-50/30 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
             </div>
             <div>
               <label className="block text-xs font-bold text-pink-700 uppercase tracking-wide mb-1.5">Bio Singkat</label>
               <textarea rows="3" name="bio" value={formData.bio} onChange={handleInputChange} className="w-full p-3 text-sm font-medium text-gray-700 border border-pink-200 rounded-xl bg-pink-50/30 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"></textarea>
             </div>

             <div className="pt-2">
               <label className="block text-xs font-bold text-pink-700 uppercase tracking-wide mb-1.5">Ubah Kata Sandi</label>
               <input type="text" name="password" value={formData.password} onChange={handleInputChange} placeholder="Kata sandi untuk login" className="w-full p-3 text-sm font-medium text-gray-700 border border-pink-200 rounded-xl bg-pink-50/30 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
             </div>
             
             <div className="pt-5 mt-2 border-t border-pink-50 flex justify-end gap-3">
                <button type="button" onClick={() => setFormData({fullName: currentUser?.fullName||"", username: currentUser?.username||"", email: currentUser?.email||"", bio: currentUser?.bio||"", password: currentUser?.password||""})} className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-xl transition cursor-pointer text-sm">Batal</button>
                <button type="submit" className="px-6 py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl transition cursor-pointer text-sm shadow-sm hover:shadow-md flex items-center gap-2">
                  <Save size={16} /> Simpan Perubahan
                </button>
             </div>
           </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilAdminPage;
