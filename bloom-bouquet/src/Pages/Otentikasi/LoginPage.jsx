/**
 * FILE: src/Pages/Login.jsx
 * TUJUAN: Halaman masuk (login) pengguna untuk mengelola sesi akun mereka.
 * KETERHUBUNGAN: Menggunakan fungsi login dari `AuthContext`.
 */

import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import logo2 from "../../assets/logo2.png";
import { ArrowLeft, Eye, EyeOff, User, Lock } from "lucide-react";
import BlurText from "../../Components/ReactBits/BlurText";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [shakeKey, setShakeKey] = useState(0);
  const { login } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!username.trim() || !password.trim()) {
      setErrorMsg("Semua kolom wajib diisi!");
      setShakeKey(prev => prev + 1);
      return;
    }

    // Baca status pending SEBELUM login mengubah state Auth
    const hasPendingBouquet = !!sessionStorage.getItem("pendingBouquet");

    const res = login(username, password);
    if (res.success) {
      if (res.role === "admin") {
        navigate("/admin");
      } else {
        if (hasPendingBouquet) {
          navigate("/keranjang");
        } else {
          navigate("/", { state: { showWelcome: true, username: username } });
        }
      }
    } else {
      setErrorMsg(res.message);
      setShakeKey(prev => prev + 1);
    }
  };

  return (
    <div className="flex items-center justify-center px-4" style={{ minHeight: 'calc(100vh - 80px)' }}>
      <div className="max-w-3xl w-full flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-pink-200 my-2 relative">
        
        {/* TOMBOL KEMBALI */}
        <Link to="/" className="absolute top-4 left-4 z-20 p-2 bg-white/70 backdrop-blur-sm hover:bg-pink-500 hover:text-white rounded-full text-pink-500 transition-all duration-300 shadow-sm border border-pink-200 group" title="Kembali ke Beranda">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </Link>

        {/* BAGIAN KIRI: LOGO & INFO */}
        <div className="md:w-1/2 bg-pink-50/80 p-6 flex flex-col items-center justify-center relative group overflow-hidden">
          {/* Efek dekorasi background */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-100/40 to-transparent opacity-50 transition duration-500 group-hover:scale-110"></div>
          
          <img src={logo2} alt="Bloom & Bouquet Logo" className="w-48 sm:w-60 mb-2 drop-shadow-md z-10 hover:scale-105 transition-transform duration-500 mt-6 md:mt-0" />
          
          <div className="z-10 text-center mt-3">
            <div className="text-xs text-pink-800 bg-white/70 py-1.5 px-4 rounded-full shadow-sm backdrop-blur-sm border border-pink-200 inline-block font-medium">
              Belum punya akun?{" "}
              <Link to="/daftar" className="font-bold underline text-pink-600 hover:text-pink-800 transition-colors">
                Daftar
              </Link>
            </div>
          </div>
        </div>

        {/* BAGIAN KANAN: FORM LOGIN */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center bg-white">
          <div className="text-center mb-5">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-pink-900">Selamat Datang</h2>
            <p className="text-[11px] md:text-xs text-pink-600 mt-1">Masuk ke akun Bloom & Bouquet</p>
          </div>

          {errorMsg && (
            <div className="mb-3 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center justify-center">
              <BlurText 
                key={shakeKey}
                text={errorMsg}
                delay={50}
                animateBy="words"
                direction="top"
                className="text-xs text-center font-medium"
              />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[10px] font-bold text-pink-800 uppercase tracking-wider mb-1">
                Username
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  className="w-full pl-10 pr-3 py-2 text-sm rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50/30 hover:bg-white shadow-sm transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-pink-800 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
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

            <button
              type="submit"
              className="w-full py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm rounded-lg shadow hover:shadow-pink-300/50 hover:-translate-y-0.5 transition-all duration-300 mt-2 cursor-pointer"
            >
              Masuk
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;