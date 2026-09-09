import { useContext, useState } from "react";
import { VoucherContext } from "../../context/VoucherContext";
import { Tag, Plus, Trash2, Power, Percent, DollarSign, ArrowLeft } from "lucide-react";
import { useOutletContext, useNavigate } from "react-router-dom";

const DaftarVoucherAdminPage = () => {
  const { vouchers, addVoucher, removeVoucher, toggleVoucherStatus } = useContext(VoucherContext);
  const { showAlert } = useOutletContext();
  const navigate = useNavigate();
  
  const [isAdding, setIsAdding] = useState(false);
  const [newVoucher, setNewVoucher] = useState({ code: "", type: "percent", value: 10 });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newVoucher.code.trim()) {
      showAlert("error", "Kode voucher tidak boleh kosong!");
      return;
    }
    
    // Cek duplikat
    if (vouchers.some(v => v.code.toUpperCase() === newVoucher.code.toUpperCase())) {
      showAlert("error", "Kode voucher sudah ada!");
      return;
    }

    addVoucher({
      id: Date.now().toString(),
      code: newVoucher.code.toUpperCase(),
      type: newVoucher.type,
      value: Number(newVoucher.value),
      isActive: true
    });
    
    setIsAdding(false);
    setNewVoucher({ code: "", type: "percent", value: 10 });
    showAlert("success", "Voucher berhasil ditambahkan!");
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto">
      <button 
        onClick={() => navigate(-1)} 
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

      <div className="flex justify-between items-center bg-white p-4 rounded-3xl border border-pink-100 shadow-sm">
        <h2 className="text-xl font-bold text-pink-900 flex items-center gap-2 px-2">
          <Tag size={24} className="text-pink-500" /> Daftar Voucher
        </h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="px-5 py-2.5 bg-pink-500 hover:bg-pink-600 text-white text-sm font-bold rounded-2xl shadow-xs transition hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
        >
          {isAdding ? <><Power size={18} /> <span>Batal</span></> : <><Plus size={18} /> <span>Buat Voucher Baru</span></>}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-pink-100 animate-in slide-in-from-top-4 duration-300">
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
              <label className="block text-xs font-bold text-pink-700 uppercase tracking-wide mb-1.5">Tipe Diskon</label>
              <select 
                value={newVoucher.type} 
                onChange={(e) => setNewVoucher({ ...newVoucher, type: e.target.value })} 
                className="w-full p-3 text-sm font-medium text-gray-700 border border-pink-200 rounded-xl bg-pink-50/50 hover:bg-pink-100/50 focus:outline-none focus:ring-2 focus:ring-pink-400 transition cursor-pointer"
              >
                <option value="percent">Persen (%)</option>
                <option value="nominal">Nominal (Rp)</option>
              </select>
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
            <div className="w-full md:w-auto">
              <button type="submit" className="w-full md:w-auto px-6 py-3 bg-pink-500 text-white rounded-xl font-bold hover:bg-pink-600 transition shadow-sm cursor-pointer">
                Simpan
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
                <h3 className="font-bold text-lg text-gray-800 tracking-wide">{v.code}</h3>
                <p className={`text-xl font-black ${v.isActive ? 'text-pink-600' : 'text-gray-500'}`}>
                  {v.type === 'percent' ? `${v.value}% OFF` : `Rp ${v.value.toLocaleString('id-ID')} OFF`}
                </p>
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
                onClick={() => removeVoucher(v.id)}
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
