/**
 * FILE: src/Pages/Register.jsx
 * TUJUAN: Halaman pendaftaran (registrasi) akun pengguna baru.
 * KETERHUBUNGAN: Terhubung ke backend/API (jika ada) untuk menyimpan data user baru.
 */

import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import logo2 from "../../assets/logo2.png";
import { ArrowLeft, Eye, EyeOff, User, Lock } from "lucide-react";
import CustomAlert from "../../Components/CustomAlert";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: "", password: "", confirmPassword: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    // [DI LUAR MODUL] preventDefault: Mencegah aksi bawaan browser (misal form submit page reload).
    e.preventDefault();
    setErrorMessage("");

    if (!formData.username.trim()) {
      setErrorMessage("Username nggak boleh kosong dong!");
      setShowErrorAlert(true);
      return;
    }

    if (formData.username.length < 3 || formData.username.length > 20) {
      setErrorMessage("Username harus antara 3 hingga 20 karakter ya!");
      setShowErrorAlert(true);
      return;
    }

    if (!formData.password) {
      setErrorMessage("Password juga wajib diisi ya!");
      setShowErrorAlert(true);
      return;
    }

    if (formData.password.length < 6 || formData.password.length > 20) {
      setErrorMessage("Password harus antara 6 hingga 20 karakter ya!");
      setShowErrorAlert(true);
      return;
    }

    if (!formData.confirmPassword) {
      setErrorMessage("Tolong konfirmasi password kamu ya!");
      setShowErrorAlert(true);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Password dan konfirmasi password kamu nggak cocok, bestie. Coba diketik pelan-pelan lagi ya!");
      setShowErrorAlert(true);
      return;
    }
    
    // Panggil fungsi register dari AuthContext
    const res = register({ username: formData.username, password: formData.password });
    if (!res.success) {
      setErrorMessage(res.message);
      setShowErrorAlert(true);
      return;
    }

    setShowErrorAlert(false);
    setShowSuccessAlert(true);
  };

  return (
    <>
      {/* Alert Error Validation */}
      <CustomAlert
        isOpen={showErrorAlert}
        onClose={() => setShowErrorAlert(false)}
        type="error_toast"
        title="Ups, Cek Lagi Yuk!"
        message={errorMessage}
      />

      {/* Alert Sukses Registrasi */}
      <CustomAlert
        isOpen={showSuccessAlert}
        onClose={() => {
          setShowSuccessAlert(false);
          navigate("/masuk");
        }}
        onConfirm={() => {
          setShowSuccessAlert(false);
          navigate("/masuk");
        }}
        type="success_modal"
        title="Yeay! Akun Berhasil Dibuat 🎉"
        message="Selamat bergabung di keluarga Bloom & Bouquet! Yuk langsung masuk dan mulai rangkai buket impianmu sekarang juga."
        confirmText="Lanjut Masuk"
        showCancel={false}
      />

      <div className="flex items-center justify-center px-4 font-sans" style={{ minHeight: 'calc(100vh - 80px)' }}>
        <div className="max-w-3xl w-full flex flex-col-reverse md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-pink-200 my-2 relative">
        
        {/* TOMBOL KEMBALI */}
        <Link to="/" className="absolute top-4 left-4 z-20 p-2 bg-white/70 backdrop-blur-sm hover:bg-pink-500 hover:text-white rounded-full text-pink-500 transition-all duration-300 shadow-sm border border-pink-200 group" title="Kembali ke Beranda">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </Link>

        {/* BAGIAN KIRI: FORM DAFTAR */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center bg-white">
          <div className="text-center mb-5 mt-6 md:mt-0">
            <h2 className="text-xl md:text-2xl font-cursive font-bold text-pink-600 mb-1">Buat Akun Baru</h2>
            <p className="text-[11px] md:text-xs text-pink-500">Bergabunglah untuk mulai merangkai buket impianmu</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
            <div>
              <label className="block text-[10px] font-bold text-pink-800 uppercase tracking-wider mb-1">Username</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  minLength={3}
                  maxLength={20}
                  placeholder="Pilih username (Maks 20 karakter)"
                  className="w-full pl-10 pr-3 py-2 text-sm rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50/30 hover:bg-white shadow-sm transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-pink-800 uppercase tracking-wider mb-1">Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                  maxLength={20}
                  placeholder="•••••••• (6-20 karakter)"
                  className="w-full pl-10 pr-10 py-2 text-sm rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50/30 hover:bg-white shadow-sm transition-all"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400 hover:text-pink-600 transition-colors cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-pink-800 uppercase tracking-wider mb-1">Konfirmasi Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400">
                  <Lock size={16} />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  minLength={6}
                  maxLength={20}
                  placeholder="•••••••• (6-20 karakter)"
                  className="w-full pl-10 pr-10 py-2 text-sm rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50/30 hover:bg-white shadow-sm transition-all"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400 hover:text-pink-600 transition-colors cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm rounded-lg shadow hover:shadow-pink-300/50 hover:-translate-y-0.5 transition-all duration-300 mt-2 cursor-pointer"
            >
              Daftar Sekarang
            </button>
          </form>
        </div>

        {/* BAGIAN KANAN: LOGO & INFO */}
        <div className="md:w-1/2 bg-pink-50/80 p-6 flex flex-col items-center justify-center relative group overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-bl from-pink-100/40 to-transparent opacity-50 transition duration-500 group-hover:scale-110"></div>

          <img src={logo2} alt="Bloom & Bouquet Logo" className="w-48 sm:w-60 mb-2 drop-shadow-md z-10 hover:scale-105 transition-transform duration-500 mt-6 md:mt-0" />
          
          <div className="z-10 text-center mt-3">
            <div className="text-xs text-pink-800 bg-white/70 py-1.5 px-4 rounded-full shadow-sm backdrop-blur-sm border border-pink-200 inline-block font-medium">
              Sudah punya akun?{" "}
              <Link to="/masuk" className="font-bold underline text-pink-600 hover:text-pink-800 transition-colors">
                Masuk
              </Link>
            </div>
          </div>
        </div>

        </div>
      </div>
    </>
  );
};

export default Register;