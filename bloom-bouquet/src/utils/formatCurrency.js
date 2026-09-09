/**
 * FILE: src/utils/formatCurrency.js
 * TUJUAN: Memusatkan format mata uang (Rupiah) agar konsisten di seluruh aplikasi.
 * CARA PAKAI: 
 * import { formatRupiah } from '../utils/formatCurrency';
 * formatRupiah(150000); // Output: "Rp 150.000"
 */

export const formatRupiah = (angka) => {
  if (!angka) return "Rp 0";
  return new Intl.NumberFormat("id-ID", { 
    style: "currency", 
    currency: "IDR", 
    maximumFractionDigits: 0 
  }).format(angka);
};
