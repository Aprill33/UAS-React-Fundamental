import { useState, useEffect } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import { PackagePlus, Edit3, ChevronDown, ArrowLeft } from "lucide-react";
import { flowers as initialFlowers, kategoriList, statusList } from "../../Data/Flowers";
import flowerImg from "../../assets/flower.png";

const FormProdukAdminPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showAlert } = useOutletContext();
  
  const isEditing = !!id;

  const [flowerList, setFlowerList] = useState(() => {
    const saved = localStorage.getItem("customFlowersData");
    let parsed = saved ? JSON.parse(saved) : initialFlowers;
    parsed = parsed.map(item => {
      const original = initialFlowers.find(f => f.id === item.id);
      if (original && original.statusProduk === "Diskon" && item.statusProduk !== "Diskon") {
        return { ...item, statusProduk: "Diskon", diskon: original.diskon };
      }
      return item;
    });
    return parsed;
  });

  const unikJenisList = [...new Set(initialFlowers.map(f => f.jenis))];

  const [formData, setFormData] = useState({
    namaProduk: "", harga: 100000, kategori: "Flower Bouquet", jenis: "Mawar", statusProduk: "Produk Baru", stok: 10, deskripsi: "",
  });

  useEffect(() => {
    if (isEditing) {
      const itemToEdit = flowerList.find(f => f.id.toString() === id);
      if (itemToEdit) {
        setFormData(itemToEdit);
      } else {
        showAlert("error", "Bunga tidak ditemukan!");
        navigate("/admin/produk");
      }
    }
  }, [id, isEditing, flowerList, navigate, showAlert]);

  const saveToLocal = (data) => {
    setFlowerList(data);
    localStorage.setItem("customFlowersData", JSON.stringify(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.namaProduk.trim()) {
      showAlert("error", "Nama bunga wajib diisi!");
      return;
    }

    if (!isEditing) {
      const newItem = {
        ...formData,
        id: Date.now().toString(),
        rating: 5.0,
        gambarProduk: flowerImg,
      };
      saveToLocal([newItem, ...flowerList]);
      showAlert("success", "Berhasil menambahkan bunga baru!");
    } else {
      const updated = flowerList.map((item) =>
        item.id.toString() === id ? { ...item, ...formData } : item
      );
      saveToLocal(updated);
      showAlert("success", "Bunga berhasil diperbarui!");
    }
    navigate("/admin/produk");
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto px-4 pb-12">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-pink-600 hover:text-pink-700 bg-white px-4 py-2 rounded-full border border-pink-200 shadow-sm transition hover:shadow-md cursor-pointer w-fit mt-2"
      >
        <ArrowLeft size={16} /> Kembali
      </button>

      <div className="flex items-center justify-center gap-4 mb-2 mt-4">
        <div className="flex-1 h-[1.5px] bg-pink-200" />
        <div className="text-center shrink-0 px-2">
          <h2 className="text-3xl font-cursive font-bold text-pink-700 mb-1">
            {!isEditing ? "Tambah Bunga Baru" : "Edit Bunga"}
          </h2>
          <p className="text-xs text-pink-500">{!isEditing ? "Tambahkan jenis bunga baru ke dalam katalog" : "Perbarui informasi detail bunga"}</p>
        </div>
        <div className="flex-1 h-[1.5px] bg-pink-200" />
      </div>

      <div className="p-8 bg-white border border-pink-100 rounded-3xl shadow-xl shadow-pink-100/50 relative overflow-hidden mt-4">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500"></div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-pink-700 uppercase tracking-wide mb-1.5">Nama Bunga</label>
            <input type="text" value={formData.namaProduk} onChange={(e) => setFormData({ ...formData, namaProduk: e.target.value })} className="w-full p-3 text-sm border border-pink-200 rounded-xl bg-pink-50/30 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" required />
          </div>

          <div>
            <label className="block text-xs font-bold text-pink-700 uppercase tracking-wide mb-1.5">Harga (Rp)</label>
            <input type="number" value={formData.harga} onChange={(e) => setFormData({ ...formData, harga: Number(e.target.value) })} className="w-full p-3 text-sm border border-pink-200 rounded-xl bg-pink-50/30 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" required />
          </div>

          <div>
            <label className="block text-xs font-bold text-pink-700 uppercase tracking-wide mb-1.5">Kategori</label>
            <div className="relative">
              <select value={formData.kategori} onChange={(e) => setFormData({ ...formData, kategori: e.target.value })} className="w-full p-3 pr-10 text-sm font-medium text-pink-700 border border-pink-200 rounded-xl bg-pink-50/50 hover:bg-pink-100/50 focus:outline-none focus:ring-2 focus:ring-pink-400 transition cursor-pointer appearance-none">
                {kategoriList.filter((k) => k !== "Semua").map((k) => <option key={k} value={k} className="text-gray-700">{k}</option>)}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-pink-700 uppercase tracking-wide mb-1.5">Jenis Bunga</label>
            <div className="relative">
              <select value={formData.jenis} onChange={(e) => setFormData({ ...formData, jenis: e.target.value })} className="w-full p-3 pr-10 text-sm font-medium text-pink-700 border border-pink-200 rounded-xl bg-pink-50/50 hover:bg-pink-100/50 focus:outline-none focus:ring-2 focus:ring-pink-400 transition cursor-pointer appearance-none">
                {unikJenisList.map((j) => <option key={j} value={j} className="text-gray-700">{j}</option>)}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-pink-700 uppercase tracking-wide mb-1.5">Status / Stok</label>
            <div className="flex gap-2">
              <input 
                type="number" 
                min="1"
                value={formData.stok} 
                onChange={(e) => {
                  const valStr = e.target.value;
                  if (valStr === "") {
                    setFormData({ ...formData, stok: "" });
                    return;
                  }
                  const val = Number(valStr);
                  if (val < 1) {
                    showAlert("error", "Stok minimal adalah 1!");
                    setFormData({ ...formData, stok: 1 });
                  } else {
                    setFormData({ ...formData, stok: val });
                  }
                }} 
                className={`${formData.statusProduk === "Diskon" ? "w-1/4" : "w-1/3"} p-3 text-sm border border-pink-200 rounded-xl bg-pink-50/30 focus:outline-none focus:ring-2 focus:ring-pink-400 transition`} 
                required 
                placeholder="Stok"
              />
              <div className="relative flex-1">
                <select value={formData.statusProduk} onChange={(e) => setFormData({ ...formData, statusProduk: e.target.value })} className="w-full p-3 pr-10 text-sm font-medium text-pink-700 border border-pink-200 rounded-xl bg-pink-50/50 hover:bg-pink-100/50 focus:outline-none focus:ring-2 focus:ring-pink-400 transition cursor-pointer appearance-none">
                  {statusList.filter((s) => s !== "Semua Status").map((s) => <option key={s} value={s} className="text-gray-700">{s}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400 pointer-events-none" />
              </div>
              {formData.statusProduk === "Diskon" && (
                <input 
                  type="number" 
                  min="1"
                  max="100"
                  value={formData.diskon || ""} 
                  onChange={(e) => setFormData({ ...formData, diskon: Number(e.target.value) })}
                  className="w-1/4 p-3 text-sm border border-pink-200 rounded-xl bg-pink-50/30 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" 
                  placeholder="Diskon (%)"
                  required 
                />
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-pink-700 uppercase tracking-wide mb-1.5">Deskripsi Bunga</label>
            <textarea value={formData.deskripsi} onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })} className="w-full p-3 text-sm border border-pink-200 rounded-xl bg-pink-50/30 focus:outline-none focus:ring-2 focus:ring-pink-400 transition min-h-[120px]" />
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => navigate("/admin/produk")} className="px-6 py-2.5 text-sm font-bold text-pink-600 bg-pink-50 hover:bg-pink-100 rounded-2xl transition cursor-pointer">
              Batal
            </button>
            <button type="submit" className="px-6 py-2.5 text-sm font-bold text-white bg-pink-500 hover:bg-pink-600 rounded-2xl shadow-sm transition hover:-translate-y-0.5 cursor-pointer">
              {isEditing ? "Simpan Perubahan" : "Simpan Bunga"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormProdukAdminPage;
