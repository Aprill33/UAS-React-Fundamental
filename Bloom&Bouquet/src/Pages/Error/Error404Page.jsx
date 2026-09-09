/**
 * FILE: src/Pages/NotFound.jsx
 * TUJUAN: Halaman error 404 ketika pengguna mengakses URL yang tidak terdaftar.
 * KETERHUBUNGAN: Ditangkap oleh rute wildcard (*) di `App.jsx`.
 */

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-serif font-bold text-rose-900 mb-2">404</h1>
      <p className="text-lg text-rose-700 mb-6">Halaman yang Anda cari tidak ditemukan.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-rose-600 text-white font-semibold rounded-xl hover:bg-rose-700 transition"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFound;