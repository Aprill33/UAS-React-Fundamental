/**
 * FILE: /src/Data/Vouchers.js
 * TUJUAN: Komponen/File pendukung aplikasi.
 * KETERHUBUNGAN: Terintegrasi dengan komponen induk dan menggunakan Context API atau Hooks untuk mengelola datanya.
 */

export const dummyVouchers = [
  { id: "1", code: "BLOOM10", type: "percent", value: 10, isActive: true, category: "produk", minPurchase: 50000 },
  { id: "2", code: "POTONG20", type: "nominal", value: 20000, isActive: true, category: "produk", minPurchase: 0 },
  { id: "3", code: "FREEONGKIR", type: "nominal", value: 15000, isActive: true, category: "ongkir", minPurchase: 100000 },
];
