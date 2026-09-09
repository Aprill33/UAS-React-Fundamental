/**
 * FILE: /src/Pages/Admin/DaftarVoucherAdminPage.jsx
 * TUJUAN: Halaman aplikasi utama yang merender antarmuka pengguna.
 * KETERHUBUNGAN: Terintegrasi dengan komponen induk dan menggunakan Context API atau Hooks untuk mengelola datanya.
 */

// [DI LUAR MODUL] useRef: Menyimpan referensi elemen DOM atau nilai mutabel yang tidak memicu re-render.
import { useContext, useState, useRef } from "react";
import { VoucherContext } from "../../context/VoucherContext";
import { Tag, Plus, Trash2, Power, Percent, DollarSign, ArrowLeft, Edit } from "lucide-react";
import { useOutletContext, useNavigate } from "react-router-dom";
import CustomAlert from "../../Components/CustomAlert";
import CustomDropdown from "../../Components/CustomDropdown";

const DaftarVoucherAdminPage = () => {
  const { vouchers, addVoucher, updateVoucher, removeVoucher, toggleVoucherStatus } = useContext(VoucherContext);
  const { showAlert } = useOutletContext();
  const navigate = useNavigate();
  // [DI LUAR MODUL] useRef: Menyimpan referensi elemen DOM atau nilai mutabel yang tidak memicu re-render.
  const formRef = useRef(null);
  
  const [isAdding, setIsAdding] = useState(false);
  const [editingVoucherId, setEditingVoucherId] = useState(null);
  const [newVoucher, setNewVoucher] = useState({ code: "", type: "percent", value: 10, category: "produk", minPurchase: 0 });
  const [voucherToDelete, setVoucherToDelete] = useState(null);

  const handleAdd = (e) => {
    // [DI LUAR MODUL] preventDefault: Mencegah aksi bawaan browser (misal form submit page reload).
    e.preventDefault();
    if (!newVoucher.code.trim()) {
      showAlert("error", "Kode voucher tidak boleh kosong!");
      return;
    }
    
    if (editingVoucherId) {
      // Cek duplikat saat edit
      const isDuplicate = vouchers.some(v => v.id !== editingVoucherId && v.code.toUpperCase() === newVoucher.code.toUpperCase());
      if (isDuplicate) {
        showAlert("error", "Kode voucher sudah ada!");
        return;
      }
      updateVoucher(editingVoucherId, {
        code: newVoucher.code.toUpperCase(),
        type: newVoucher.type,
        value: Number(newVoucher.value),
        category: newVoucher.category,
        minPurchase: Number(newVoucher.minPurchase)
      });
      showAlert("success", "Voucher berhasil diperbarui!");
    } else {
      // Cek duplikat saat tambah
      if (vouchers.some(v => v.code.toUpperCase() === newVoucher.code.toUpperCase())) {
        showAlert("error", "Kode voucher sudah ada!");
        return;
      }
      addVoucher({
        id: Date.now().toString(),
        code: newVoucher.code.toUpperCase(),
        type: newVoucher.type,
        value: Number(newVoucher.value),
        category: newVoucher.category,
        minPurchase: Number(newVoucher.minPurchase),
        isActive: true
      });
      showAlert("success", "Voucher berhasil ditambahkan!");
    }
    
    setIsAdding(false);
    setEditingVoucherId(null);
    setNewVoucher({ code: "", type: "percent", value: 10, category: "produk", minPurchase: 0 });
  };

  const handleEditClick = (v) => {
    setIsAdding(true);
    setEditingVoucherId(v.id);
    setNewVoucher({
      code: v.code,
      type: v.type,
      value: v.value,
      category: v.category || 'produk',
      minPurchase: v.minPurchase || 0
    });
    // Scroll to form
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto">
      <button 
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 text-pink-600 hover:text-pink-700 bg-white px-4 py-2 rounded-full border border-pink-200 shadow-sm transition hover:shadow-md cursor-pointer w-fit"
      >
        <ArrowLeft size={16} /> Kembali
      </button>

      <div className="flex items-center justify-center gap-4 mb-2 mt-4">
        <div className="flex-1 h-[1.5px] bg-pink-200" />
        <div className="text-center shrink-0 px-2">
          <h2 className="text-3xl font-cursive font-bold text-pink-700 mb-1">
            Kelola Voucher Diskon
          </h2>
          <p className="text-xs text-pink-500">Buat kode promo spesial untuk menarik pelanggan setia Anda.</p>
        </div>
        <div className="flex-1 h-[1.5px] bg-pink-200" />
      </div>

      <CustomAlert
        isOpen={!!voucherToDelete}
        onClose={() => setVoucherToDelete(null)}
        onConfirm={() => {
          if (voucherToDelete) removeVoucher(voucherToDelete.id);
          setVoucherToDelete(null);
        }}
        type="delete_confirm"
        title="Hapus Voucher?"
        message={`Apakah Anda yakin ingin menghapus voucher "${voucherToDelete?.code}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Ya, Hapus"
        showCancel={true}
      />

      <div className="flex justify-between items-center bg-white p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-pink-100 shadow-sm">
        <h2 className="text-sm sm:text-xl font-bold text-pink-900 flex items-center gap-1.5 sm:gap-2 px-1 sm:px-2">
          <Tag size={20} className="text-pink-500 sm:w-6 sm:h-6" /> 
          <span className="hidden sm:inline">Daftar Voucher</span>
          <span className="sm:hidden">Voucher</span>
        </h2>
        <button 
          onClick={() => {
            if (isAdding) {
              setEditingVoucherId(null);
              setNewVoucher({ code: "", type: "percent", value: 10, category: "produk", minPurchase: 0 });
            }
            setIsAdding(!isAdding);
          }}
          className="px-3 sm:px-5 py-2 sm:py-2.5 bg-pink-500 hover:bg-pink-600 text-white text-[11px] sm:text-sm font-bold rounded-xl sm:rounded-2xl shadow-xs transition hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5 sm:gap-2 whitespace-nowrap"
        >
          {isAdding ? <><Power size={16} className="sm:w-[18px] sm:h-[18px]" /> <span>Batal</span></> : <><Plus size={16} className="sm:w-[18px] sm:h-[18px]" /> <span className="hidden sm:inline">Buat Voucher Baru</span><span className="sm:hidden">Buat Baru</span></>}
        </button>
      </div>

      {isAdding && (
        <div ref={formRef} className="bg-white p-6 rounded-3xl shadow-sm border border-pink-100 animate-in slide-in-from-top-4 duration-300">
          <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4 items-end">
            <div className="w-full md:w-1/3">
              <label className="block text-xs font-bold text-pink-700 uppercase tracking-wide mb-1.5">Kode Voucher</label>
              <input 
                type="text" 
                value={newVoucher.code} 
                onChange={(e) => setNewVoucher({ ...newVoucher, code: e.target.value.toUpperCase() })} 
                placeholder="Contoh: MERDEKA20"
                className="w-full p-3 text-sm border border-pink-200 rounded-xl bg-pink-50/30 focus:outline-none focus:ring-2 focus:ring-pink-400 transition uppercase" 
                required 
              />
            </div>
            <div className="w-full md:w-1/4">
              <label className="block text-[10px] sm:text-xs font-bold text-pink-700 uppercase tracking-wide mb-1.5">Tipe Diskon</label>
              <CustomDropdown 
                value={newVoucher.type} 
                onChange={(val) => setNewVoucher({ ...newVoucher, type: val })} 
                options={[
                  { value: "percent", label: "Persen (%)" },
                  { value: "nominal", label: "Nominal (Rp)" }
                ]}
                className="w-full h-11 [&>div]:h-full"
              />
            </div>
            <div className="w-full md:w-1/4">
              <label className="block text-xs font-bold text-pink-700 uppercase tracking-wide mb-1.5">Besaran Diskon</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-500 font-bold">
                  {newVoucher.type === "percent" ? <Percent size={14} /> : <DollarSign size={14} />}
                </span>
                <input 
                  type="number" 
                  min="1"
                  value={newVoucher.value} 
                  onChange={(e) => setNewVoucher({ ...newVoucher, value: e.target.value })} 
                  className="w-full p-3 pl-8 text-sm border border-pink-200 rounded-xl bg-pink-50/30 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" 
                  required 
                />
              </div>
            </div>
            
            <div className="w-full md:w-1/4">
              <label className="block text-[10px] sm:text-xs font-bold text-pink-700 uppercase tracking-wide mb-1.5">Kategori</label>
              <CustomDropdown 
                value={newVoucher.category} 
                onChange={(val) => setNewVoucher({ ...newVoucher, category: val })} 
                options={[
                  { value: "produk", label: "Diskon Produk" },
                  { value: "ongkir", label: "Diskon Ongkir" }
                ]}
                className="w-full h-11 [&>div]:h-full"
              />
            </div>
            
            <div className="w-full md:w-1/4">
              <label className="block text-xs font-bold text-pink-700 uppercase tracking-wide mb-1.5">Min. Belanja</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-500 font-bold">
                  Rp
                </span>
                <input 
                  type="number" 
                  min="0"
                  value={newVoucher.minPurchase} 
                  onChange={(e) => setNewVoucher({ ...newVoucher, minPurchase: e.target.value })} 
                  className="w-full p-3 pl-8 text-sm border border-pink-200 rounded-xl bg-pink-50/30 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" 
                  required 
                />
              </div>
            </div>

            <div className="w-full md:w-auto mt-4 md:mt-0">
              <button type="submit" className="w-full md:w-auto px-6 py-3 bg-pink-500 text-white rounded-xl font-bold hover:bg-pink-600 transition shadow-sm cursor-pointer">
                {editingVoucherId ? 'Simpan Perubahan' : 'Simpan'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {vouchers.map(v => (
          <div key={v.id} className={`p-5 rounded-3xl border transition duration-300 relative overflow-hidden ${v.isActive ? 'bg-white border-pink-200 shadow-sm hover:shadow-md' : 'bg-gray-50 border-gray-200 opacity-70'}`}>
            {v.isActive ? (
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">Aktif</div>
            ) : (
              <div className="absolute top-0 right-0 bg-gray-400 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">Nonaktif</div>
            )}
            
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${v.isActive ? 'bg-pink-100 text-pink-500' : 'bg-gray-200 text-gray-500'}`}>
                {v.type === 'percent' ? <Percent size={24} /> : <DollarSign size={24} />}
              </div>
              <div className="space-y-1 w-full">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg text-gray-800 tracking-wide">{v.code}</h3>
                  <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-md ${v.category === 'ongkir' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                    {v.category === 'ongkir' ? 'Ongkir' : 'Produk'}
                  </span>
                </div>
                <p className={`text-xl font-black ${v.isActive ? 'text-pink-600' : 'text-gray-500'}`}>
                  {v.type === 'percent' ? `${v.value}% OFF` : `Rp ${v.value.toLocaleString('id-ID')} OFF`}
                </p>
                <p className="text-[10px] text-gray-500 font-medium">Min. Belanja: Rp {(v.minPurchase || 0).toLocaleString('id-ID')}</p>
              </div>
            </div>

            <div className="mt-5 flex gap-2 pt-4 border-t border-gray-100">
              <button 
                onClick={() => toggleVoucherStatus(v.id)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${v.isActive ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'}`}
              >
                {v.isActive ? 'Matikan' : 'Aktifkan'}
              </button>
              <button 
                onClick={() => handleEditClick(v)}
                className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white rounded-xl transition cursor-pointer"
              >
                <Edit size={16} />
              </button>
              <button 
                onClick={() => setVoucherToDelete(v)}
                className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition cursor-pointer"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {vouchers.length === 0 && (
          <div className="col-span-full bg-white p-12 rounded-3xl border border-pink-100 text-center text-gray-500">
            Belum ada voucher diskon yang dibuat.
          </div>
        )}
      </div>
    </div>
  );
};

export default DaftarVoucherAdminPage;
