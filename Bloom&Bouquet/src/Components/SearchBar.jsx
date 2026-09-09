/**
 * FILE: src/Components/SearchBar.jsx
 * TUJUAN: Komponen bar pencarian dan tombol filter yang dapat digunakan kembali.
 * KETERHUBUNGAN: Digunakan oleh halaman `FlowersPage` atau katalog untuk menyaring produk.
 */

import { Search } from "lucide-react";
import { kategoriList, jenisList, statusList } from "../Data/Flowers";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  selectedKategori,
  setSelectedKategori,
  selectedJenis,
  setSelectedJenis,
  selectedStatus,
  setSelectedStatus,
  sortBy,
  setSortBy,
  ...restProps
}) => {
  return (
    <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-4 sm:p-5 space-y-4" {...restProps}>
      {/* Search Input */}
      <div className="relative">
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-pink-300" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari nama bunga favoritmu..."
          className="w-full pl-10 pr-4 py-2.5 rounded-full border border-pink-200 bg-pink-50/50 text-sm text-pink-700 placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white transition"
        />
      </div>

      {/* Kategori Filter */}
      <div>
        <p className="text-xs font-semibold text-pink-400 mb-2 uppercase tracking-wide">Kategori Rangkaian</p>
        <div className="flex flex-wrap gap-2">
          {kategoriList.map((kat) => (
            <button
              key={kat}
              type="button"
              onClick={() => setSelectedKategori(kat)}
              className={`text-xs sm:text-sm px-3.5 py-1.5 rounded-full border transition-colors ${
                selectedKategori === kat
                  ? "bg-pink-500 border-pink-500 text-white shadow-soft"
                  : "bg-white border-pink-200 text-pink-500 hover:bg-pink-100"
              }`}
            >
              {kat}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Dropdown & Sorting */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold text-pink-400 uppercase tracking-wide shrink-0">Jenis</p>
          <select
            value={selectedJenis}
            onChange={(e) => setSelectedJenis(e.target.value)}
            className="w-full text-xs sm:text-sm px-3 py-2 rounded-full border border-pink-200 bg-pink-50/50 text-pink-700 focus:outline-none"
          >
            {jenisList.map((j) => (
              <option key={j} value={j}>{j}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold text-pink-400 uppercase tracking-wide shrink-0">Status</p>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full text-xs sm:text-sm px-3 py-2 rounded-full border border-pink-200 bg-pink-50/50 text-pink-700 focus:outline-none"
          >
            {statusList.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold text-pink-400 uppercase tracking-wide shrink-0">Urutkan</p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full text-xs sm:text-sm px-3 py-2 rounded-full border border-pink-200 bg-pink-100/60 text-pink-700 font-medium focus:outline-none"
          >
            <option value="default">Default</option>
            <option value="az">Nama (A - Z)</option>
            <option value="za">Nama (Z - A)</option>
            <option value="low-high">Harga: Termurah</option>
            <option value="high-low">Harga: Termahal</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;