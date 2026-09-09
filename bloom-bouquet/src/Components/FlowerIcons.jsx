/**
 * FILE: src/Components/FlowerIcons.jsx
 * TUJUAN: Kumpulan komponen visual (SVG inline) yang menggambar ikon bunga dan wadah secara matematis tanpa file eksternal.
 * KETERHUBUNGAN: 
 *  - Digunakan secara intensif oleh `BouquetBuilder.jsx` untuk visualisasi dinamis berdasarkan pilihan pengguna.
 */

import React from "react";

// 🌹 1. MAWAR
export const RoseAnimated = ({ color = "merah" }) => {
  const colors = {
    merah: { back: "#e11d48", front: "#f43f5e", center: "#fb7185" },
    putih: { back: "#e2e8f0", front: "#f8fafc", center: "#f1f5f9" },
    pink: { back: "#db2777", front: "#f472b6", center: "#fbcfe8" },
    kuning: { back: "#ca8a04", front: "#facc15", center: "#fef08a" },
  };
  const c = colors[color] || colors.merah;
  return (
    <div className="flex items-center justify-center p-1">
      <svg className="w-16 h-24 drop-shadow-sm animate-pulse" viewBox="0 0 100 160" fill="none">
        <path d="M50 70 C 48 100, 52 130, 50 150" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />
        <path d="M49 100 L44 96 L49 104 Z" fill="#15803d" />
        <path d="M51 120 L56 116 L51 124 Z" fill="#15803d" />
        <path d="M48 110 C 30 105, 25 90, 48 100 Z" fill="#16a34a" stroke="#15803d" strokeWidth="1" />
        <path d="M52 125 C 70 120, 75 105, 52 115 Z" fill="#16a34a" stroke="#15803d" strokeWidth="1" />
        <path d="M30 50 C 20 20, 80 20, 70 50 C 80 75, 20 75, 30 50 Z" fill={c.back} />
        <path d="M36 45 C 30 25, 70 25, 64 45 C 70 65, 30 65, 36 45 Z" fill={c.front} />
        <circle cx="50" cy="42" r="10" fill={c.center} />
        <path d="M45 40 C 45 35, 55 35, 55 40 C 55 46, 45 46, 45 40 Z" fill="#ffe4e6" />
      </svg>
    </div>
  );
};

// 🌷 2. TULIP
export const TulipAnimated = ({ color = "pink" }) => {
  const colors = {
    pink: { back: "#f472b6", left: "#ec4899", right: "#db2777" },
    putih: { back: "#f8fafc", left: "#f1f5f9", right: "#e2e8f0" },
  };
  const c = colors[color] || colors.pink;
  return (
    <div className="flex items-center justify-center p-1">
      <svg className="w-16 h-24 drop-shadow-sm animate-pulse" viewBox="0 0 100 160" fill="none">
        <path d="M50 80 C 48 110, 52 135, 50 155" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />
        <path d="M48 120 C 25 110, 20 85, 48 105 Z" fill="#16a34a" stroke="#15803d" strokeWidth="1" />
        <path d="M52 130 C 75 120, 80 95, 52 115 Z" fill="#16a34a" stroke="#15803d" strokeWidth="1" />
        <path d="M30 50 C 30 90, 70 90, 70 50 C 70 30, 50 25, 50 25 C 50 25, 30 30, 30 50 Z" fill={c.back} />
        <path d="M30 50 C 35 75, 50 85, 50 30 C 45 40, 35 45, 30 50 Z" fill={c.left} />
        <path d="M70 50 C 65 75, 50 85, 50 30 C 55 40, 65 45, 70 50 Z" fill={c.right} />
      </svg>
    </div>
  );
};

// 🌻 3. SUNFLOWER
export const SunflowerAnimated = () => (
  <div className="flex items-center justify-center p-1">
    <svg className="w-16 h-24 drop-shadow-sm animate-pulse" viewBox="0 0 100 160" fill="none">
      <path d="M50 75 L50 155" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />
      <path d="M50 120 C 30 115, 25 100, 50 108 Z" fill="#16a34a" />
      <path d="M50 135 C 70 130, 75 115, 50 123 Z" fill="#16a34a" />
      <g fill="#eab308">
        <ellipse cx="50" cy="20" rx="5" ry="15" />
        <ellipse cx="50" cy="70" rx="5" ry="15" />
        <ellipse cx="25" cy="45" rx="15" ry="5" />
        <ellipse cx="75" cy="45" rx="15" ry="5" />
        <ellipse cx="32" cy="27" rx="6" ry="14" transform="rotate(-45 32 27)" />
        <ellipse cx="68" cy="63" rx="6" ry="14" transform="rotate(-45 68 63)" />
        <ellipse cx="68" cy="27" rx="6" ry="14" transform="rotate(45 68 27)" />
        <ellipse cx="32" cy="63" rx="6" ry="14" transform="rotate(45 32 63)" />
      </g>
      <circle cx="50" cy="45" r="16" fill="#78350f" />
      <circle cx="50" cy="45" r="13" fill="#451a03" />
    </svg>
  </div>
);

// 🌺 4. LILY
export const LilyAnimated = ({ color = "putih" }) => {
  const colors = {
    putih: { main: "#ffffff", side: "#f1f5f9", accent: "#fbcfe8" },
    pink: { main: "#fbcfe8", side: "#f472b6", accent: "#ec4899" },
  };
  const c = colors[color] || colors.putih;
  return (
    <div className="flex items-center justify-center p-1">
      <svg className="w-16 h-24 drop-shadow-sm animate-pulse" viewBox="0 0 100 160" fill="none">
        <path d="M50 70 Q 45 110 50 155" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />
        <path d="M48 115 C 20 110, 15 90, 48 100 Z" fill="#16a34a" />
        <g stroke="#cbd5e1" strokeWidth="1">
          <path d="M50 15 C 35 30, 35 55, 50 70 C 65 55, 65 30, 50 15 Z" fill={c.main} />
          <path d="M20 35 C 35 40, 50 55, 50 70 C 35 65, 20 50, 20 35 Z" fill={c.side} />
          <path d="M80 35 C 65 40, 50 55, 50 70 C 65 65, 80 50, 80 35 Z" fill={c.side} />
          <path d="M30 65 C 35 50, 45 35, 50 20 C 45 45, 30 55, 30 65 Z" fill={c.accent} />
          <path d="M70 65 C 65 50, 55 35, 50 20 C 55 45, 70 55, 70 65 Z" fill={c.accent} />
        </g>
        <path d="M50 60 L45 35 M50 60 L50 30 M50 60 L55 35" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
};

// 🌼 5. DAISY SWEET
export const DaisyAnimated = () => (
  <div className="flex items-center justify-center p-1">
    <svg className="w-16 h-24 drop-shadow-sm animate-pulse" viewBox="0 0 100 160" fill="none">
      <path d="M50 70 L50 155" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />
      <path d="M50 120 Q 30 110 40 100 Q 50 110 50 120" fill="#16a34a" />
      <g fill="#ffffff" stroke="#e2e8f0" strokeWidth="1">
        <ellipse cx="50" cy="25" rx="5" ry="14" />
        <ellipse cx="50" cy="65" rx="5" ry="14" />
        <ellipse cx="30" cy="45" rx="14" ry="5" />
        <ellipse cx="70" cy="45" rx="14" ry="5" />
        <ellipse cx="36" cy="31" rx="6" ry="12" transform="rotate(-45 36 31)" />
        <ellipse cx="64" cy="59" rx="6" ry="12" transform="rotate(-45 64 59)" />
        <ellipse cx="64" cy="31" rx="6" ry="12" transform="rotate(45 64 31)" />
        <ellipse cx="36" cy="59" rx="6" ry="12" transform="rotate(45 36 59)" />
      </g>
      <circle cx="50" cy="45" r="10" fill="#facc15" />
    </svg>
  </div>
);

// 🌺 6. ANGGREK (ORCHID)
export const OrchidAnimated = ({ color = "ungu" }) => {
  const colors = {
    ungu: { main: "#d8b4fe", accent: "#a855f7" },
    pink: { main: "#fbcfe8", accent: "#ec4899" },
    biru: { main: "#bfdbfe", accent: "#3b82f6" },
  };
  const c = colors[color] || colors.ungu;
  return (
    <div className="flex items-center justify-center p-1">
      <svg className="w-16 h-24 drop-shadow-sm animate-pulse" viewBox="0 0 100 160" fill="none">
        <path d="M50 70 Q 40 110 50 155" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />
        <path d="M49 105 C 30 100, 25 80, 45 95 Z" fill="#16a34a" />
        <path d="M51 125 C 70 120, 75 100, 55 115 Z" fill="#16a34a" />
        
        {/* Bunga atas */}
        <g stroke={c.accent} strokeWidth="0.5">
          <ellipse cx="50" cy="20" rx="6" ry="16" fill={c.main} />
          <ellipse cx="30" cy="40" rx="16" ry="8" fill={c.main} transform="rotate(15 30 40)" />
          <ellipse cx="70" cy="40" rx="16" ry="8" fill={c.main} transform="rotate(-15 70 40)" />
          <path d="M40 55 Q 50 70 60 55 Q 50 45 40 55 Z" fill={c.accent} />
          <circle cx="50" cy="50" r="4" fill="#fef08a" />
        </g>
      </svg>
    </div>
  );
};

// 🎁 6. WADAH PAPER WRAP (WARNA DINAMIS)
// Komponen ini menerima data/props warna kertas dan pita, lalu menggambar wadah dengan warna tersebut
export const PaperWrapIcon = ({ color = "Soft Pink", ribbonColor = "Pita Pink" }) => {
  // Kamus (dictionary) yang memetakan nama warna ke kode warna asli (bg dan stroke)
  const paperColors = {
    "Soft Pink": { bg: "#fce7f3", stroke: "#f472b6" },
    "Soft Blue": { bg: "#e0f2fe", stroke: "#38bdf8" },
    "Cream White": { bg: "#fef3c7", stroke: "#fde047" },
    "Pastel Lilac": { bg: "#f3e8ff", stroke: "#c084fc" },
    "Elegant Black": { bg: "#334155", stroke: "#0f172a" },
  };

  // Kamus warna untuk pita pembungkus
  const ribbonColors = {
    "Pita Pink": "#ec4899",
    "Pita Putih": "#ffffff",
    "Pita Gold": "#eab308",
  };

  // Mencari warna dari kamus berdasarkan pilihan, jika tidak ditemukan gunakan default (Soft Pink / Pita Pink)
  const selectedPaper = paperColors[color] || paperColors["Soft Pink"];
  const selectedRibbon = ribbonColors[ribbonColor] || ribbonColors["Pita Pink"];

  return (
    <div className="flex items-center justify-center p-1 mb-2">
      <svg className="w-16 h-20 drop-shadow-sm transition-all duration-300" viewBox="0 0 100 120" fill="none">
        <path d="M20 20 L80 20 L65 100 L35 100 Z" fill={selectedPaper.bg} stroke={selectedPaper.stroke} strokeWidth="2" /> {/* Bentuk utama kertas (bentuk trapesium terbalik) */}
        <path d="M20 20 L50 80 L80 20" stroke={selectedPaper.stroke} strokeWidth="2" strokeDasharray="3 3" /> {/* Garis putus-putus lipatan kertas tengah */}
        <path d="M30 75 Q 50 85 70 75 Q 50 65 30 75 Z" fill={selectedRibbon} /> {/* Bagian tali pita ikat yang melintang */}
        <circle cx="50" cy="72" r="5" fill={selectedRibbon} /> {/* Simpul/bundaran pita di tengah */}
        <path d="M47 75 L40 95 M53 75 L60 95" stroke={selectedRibbon} strokeWidth="3" strokeLinecap="round" /> {/* Dua ujung tali pita yang menjuntai jatuh ke bawah */}
      </svg>
    </div>
  );
};

// 🎁 7. WADAH ROUND BOX (WARNA DINAMIS)
// Komponen kotak bundar yang warnanya juga bisa dikontrol dari luar
export const RoundBoxIcon = ({ color = "Rose Gold Box" }) => {
  // Menyimpan kode warna hex untuk bagian-bagian kotak (utama, tutup atas, garis tepi)
  const boxColors = {
    "Rose Gold Box": { main: "#fb7185", top: "#fda4af", border: "#e11d48" },
    "Pure White Box": { main: "#ffffff", top: "#f1f5f9", border: "#cbd5e1" },
    "Matte Black Box": { main: "#1e293b", top: "#334155", border: "#0f172a" },
  };

  // Memilih setelan warna sesuai properti color yang dikirim
  const selectedBox = boxColors[color] || boxColors["Rose Gold Box"];

  return (
    <div className="flex items-center justify-center p-1 mb-2">
      <svg className="w-16 h-20 drop-shadow-sm transition-all duration-300" viewBox="0 0 100 120" fill="none">
        <rect x="25" y="40" width="50" height="55" rx="6" fill={selectedBox.main} stroke={selectedBox.border} strokeWidth="2" /> {/* Silinder / badan kotak buket bawah */}
        <ellipse cx="50" cy="40" rx="25" ry="8" fill={selectedBox.top} stroke={selectedBox.border} strokeWidth="2" /> {/* Bagian atas (penutup) kotak yang melingkar/oval */}
        <rect x="25" y="60" width="50" height="10" fill="#be185d" /> {/* Pita horizontal merah hati yang melingkari kotak */}
        <circle cx="50" cy="65" r="4" fill="#fef08a" /> {/* Pin atau stiker emas kecil hiasan pita */}
      </svg>
    </div>
  );
};

// 🎁 8. WADAH RUSTIC BASKET
// Komponen keranjang, tidak punya warna dinamis karena warnanya standar coklat kayu (rustic)
export const BasketIcon = () => (
  <div className="flex items-center justify-center p-1 mb-2">
    <svg className="w-16 h-20 drop-shadow-sm" viewBox="0 0 100 120" fill="none">
      <path d="M30 50 C 30 15, 70 15, 70 50" stroke="#b45309" strokeWidth="4" fill="none" strokeLinecap="round" /> {/* Gagang keranjang pegangan rotan atas */}
      <path d="M20 45 L80 45 L72 95 L28 95 Z" fill="#d97706" stroke="#b45309" strokeWidth="2" /> {/* Badan keranjang rotan (trapesium) */}
      <path d="M20 60 L80 60 M23 75 L77 75 M35 45 L40 95 M50 45 L50 95 M65 45 L60 95" stroke="#78350f" strokeWidth="1.5" /> {/* Pola anyaman rotan menyilang pada keranjang */}
    </svg>
  </div>
);