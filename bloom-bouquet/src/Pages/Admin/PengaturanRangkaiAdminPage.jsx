import { useState, useContext } from "react";
import { CustomBouquetContext } from "../../context/CustomBouquetContext";
import { ArrowLeft, Sparkles, Plus, Edit2, Check, X, Palette, DollarSign, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PengaturanRangkaiAdminPage = () => {
  const navigate = useNavigate();
  const { 
    wrappingOptions, 
    flowerCategories, 
    flowerOptions, 
    updateWrappingOption, 
    addWrappingColor, 
    addFlowerOption, 
    updateFlowerOption, 
    deleteFlowerOption,
    getFlowerComponent
  } = useContext(CustomBouquetContext);

  // States untuk Wadah (Wrapping)
  const [editingWrapId, setEditingWrapId] = useState(null);
  const [wrapPrice, setWrapPrice] = useState("");
  const [newColorWrapId, setNewColorWrapId] = useState(null);
  const [newColorValue, setNewColorValue] = useState("");

  // States untuk Bunga (Flowers)
  const [editingFlowerId, setEditingFlowerId] = useState(null);
  const [flowerEditData, setFlowerEditData] = useState({});
  const [showAddFlower, setShowAddFlower] = useState(false);
  const [newFlowerData, setNewFlowerData] = useState({
    nama: "", category: "c1", harga: "", iconColor: ""
  });

  // --- HANDLER WADAH ---
  const handleEditWrap = (wrap) => {
    setEditingWrapId(wrap.id);
    setWrapPrice(wrap.harga);
  };

  const handleSaveWrap = (id) => {
    updateWrappingOption(id, { harga: parseInt(wrapPrice) || 0 });
    setEditingWrapId(null);
  };

  const handleAddColor = (id) => {
    if (newColorValue.trim() !== "") {
      addWrappingColor(id, newColorValue.trim());
      setNewColorValue("");
      setNewColorWrapId(null);
    }
  };

  // --- HANDLER BUNGA ---
  const handleEditFlower = (flower) => {
    setEditingFlowerId(flower.id);
    setFlowerEditData({ nama: flower.nama, harga: flower.harga });
  };

  const handleSaveFlower = (id) => {
    updateFlowerOption(id, {
      nama: flowerEditData.nama,
      harga: parseInt(flowerEditData.harga) || 0
    });
    setEditingFlowerId(null);
  };

  const handleSaveNewFlower = () => {
    if (!newFlowerData.nama || !newFlowerData.harga) return;
    
    // Cari kategori untuk mengambil iconType bawaannya
    const cat = flowerCategories.find(c => c.id === newFlowerData.category);
    
    const newFlower = {
      id: "f" + Date.now(),
      category: newFlowerData.category,
      nama: newFlowerData.nama,
      harga: parseInt(newFlowerData.harga) || 0,
      iconType: cat ? cat.iconType : "RoseAnimated",
      iconColor: newFlowerData.iconColor || "merah"
    };

    addFlowerOption(newFlower);
    setShowAddFlower(false);
    setNewFlowerData({ nama: "", category: "c1", harga: "", iconColor: "" });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-pink-600 hover:text-pink-700 bg-white px-4 py-2 rounded-full border border-pink-200 shadow-sm transition hover:shadow-md cursor-pointer w-fit mt-2"
      >
        <ArrowLeft size={16} /> Kembali
      </button>

      <div className="flex items-center justify-center gap-4 mb-2 mt-4">
        <div className="flex-1 h-[1.5px] bg-pink-200" />
        <div className="text-center shrink-0 px-2">
          <h2 className="text-3xl font-cursive font-bold text-pink-700 mb-1 flex items-center justify-center gap-2">
            <Sparkles size={28} /> Pengaturan Rangkai Bunga
          </h2>
          <p className="text-xs text-pink-500">Kelola Harga, Wadah Pembungkus, dan Katalog Tangkai Bunga</p>
        </div>
        <div className="flex-1 h-[1.5px] bg-pink-200" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* KOLOM KIRI: PENGATURAN WADAH (WRAPPING) */}
        <div className="space-y-4">
          <h3 className="font-bold text-pink-800 text-lg flex items-center gap-2 bg-white p-4 rounded-2xl shadow-sm border border-pink-100">
            <Package size={20} className="text-pink-500" /> Kustomisasi Wadah & Pembungkus
          </h3>

          {wrappingOptions.map((wrap) => (
            <div key={wrap.id} className="bg-white p-5 rounded-3xl border border-pink-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-pink-50 rounded-bl-full -mr-10 -mt-10 transition group-hover:scale-110"></div>
              
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <h4 className="font-bold text-pink-900">{wrap.nama}</h4>
                  <p className="text-[10px] text-pink-400 uppercase tracking-widest font-bold">{wrap.type}</p>
                </div>
                
                {/* Form Edit Harga */}
                {editingWrapId === wrap.id ? (
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-pink-400">Rp</span>
                      <input 
                        type="number" 
                        value={wrapPrice} 
                        onChange={(e) => setWrapPrice(e.target.value)}
                        className="pl-8 pr-3 py-1.5 w-32 border border-pink-300 rounded-lg text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      />
                    </div>
                    <button onClick={() => handleSaveWrap(wrap.id)} className="p-1.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
                      <Check size={16} />
                    </button>
                    <button onClick={() => setEditingWrapId(null)} className="p-1.5 bg-rose-100 text-rose-500 rounded-lg hover:bg-rose-200">
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-pink-600 bg-pink-50 px-3 py-1 rounded-full text-sm">
                      Rp {wrap.harga.toLocaleString("id-ID")}
                    </span>
                    <button onClick={() => handleEditWrap(wrap)} className="p-2 text-gray-400 hover:text-pink-500 hover:bg-pink-50 rounded-full transition cursor-pointer">
                      <Edit2 size={16} />
                    </button>
                  </div>
                )}
              </div>

              {/* Tampilkan Warna Kertas Jika Ada */}
              {wrap.colorOptions && (
                <div className="mt-4 pt-4 border-t border-pink-50 relative z-10">
                  <p className="text-xs font-bold text-gray-500 mb-2 flex items-center gap-1">
                    <Palette size={12} /> Pilihan Warna Kertas
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {wrap.colorOptions.map((color, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-semibold text-gray-600">
                        {color}
                      </span>
                    ))}
                    
                    {/* Tambah Warna Baru */}
                    {newColorWrapId === wrap.id ? (
                      <div className="flex gap-1 items-center">
                        <input 
                          type="text"
                          value={newColorValue}
                          onChange={(e) => setNewColorValue(e.target.value)}
                          placeholder="Warna baru..."
                          className="px-2 py-1 border border-pink-300 rounded-lg text-[10px] w-24 focus:outline-none"
                        />
                        <button onClick={() => handleAddColor(wrap.id)} className="p-1 bg-pink-500 text-white rounded-md text-[10px]"><Check size={12} /></button>
                        <button onClick={() => setNewColorWrapId(null)} className="p-1 bg-gray-200 text-gray-600 rounded-md text-[10px]"><X size={12} /></button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setNewColorWrapId(wrap.id)}
                        className="px-2 py-1 bg-pink-50 border border-pink-200 text-pink-600 rounded-lg text-[10px] font-bold hover:bg-pink-100 flex items-center gap-1 transition cursor-pointer"
                      >
                        <Plus size={12} /> Tambah
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* KOLOM KANAN: PENGATURAN TANGKAI BUNGA */}
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-pink-100">
            <h3 className="font-bold text-pink-800 text-lg flex items-center gap-2">
              <Sparkles size={20} className="text-pink-500" /> Katalog Tangkai Bunga
            </h3>
            <button 
              onClick={() => setShowAddFlower(!showAddFlower)}
              className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1.5 rounded-full text-xs font-bold transition shadow-sm flex items-center gap-1 cursor-pointer"
            >
              {showAddFlower ? <X size={14} /> : <Plus size={14} />} 
              {showAddFlower ? "Batal" : "Bunga Baru"}
            </button>
          </div>

          {/* Form Tambah Bunga Baru */}
          {showAddFlower && (
            <div className="bg-pink-50 p-5 rounded-3xl border border-pink-200 shadow-inner animate-in fade-in slide-in-from-top-4">
              <h4 className="font-bold text-pink-800 mb-4 text-sm">Tambahkan Varian Bunga Baru</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-pink-600 block mb-1">Nama Varian (Contoh: Mawar Hitam)</label>
                  <input type="text" value={newFlowerData.nama} onChange={(e) => setNewFlowerData({...newFlowerData, nama: e.target.value})} className="w-full p-2 border border-pink-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-pink-600 block mb-1">Kategori / Ikon Bawaan</label>
                    <select value={newFlowerData.category} onChange={(e) => setNewFlowerData({...newFlowerData, category: e.target.value})} className="w-full p-2 border border-pink-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white">
                      {flowerCategories.map(c => <option key={c.id} value={c.id}>{c.nama}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-pink-600 block mb-1">Warna Ikon (Contoh: hitam)</label>
                    <input type="text" value={newFlowerData.iconColor} onChange={(e) => setNewFlowerData({...newFlowerData, iconColor: e.target.value})} placeholder="merah, biru..." className="w-full p-2 border border-pink-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-pink-600 block mb-1">Harga Per Tangkai</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-pink-400">Rp</span>
                    <input type="number" value={newFlowerData.harga} onChange={(e) => setNewFlowerData({...newFlowerData, harga: e.target.value})} className="w-full pl-9 p-2 border border-pink-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white" />
                  </div>
                </div>
                <button onClick={handleSaveNewFlower} className="w-full py-2 bg-pink-500 text-white rounded-xl font-bold text-sm shadow-md hover:bg-pink-600 transition mt-2">
                  Simpan Bunga Baru
                </button>
              </div>
            </div>
          )}

          {/* Daftar Bunga (Dikelompokkan per kategori) */}
          <div className="space-y-6">
            {flowerCategories.map((cat) => {
              const flowersInCat = flowerOptions.filter(f => f.category === cat.id);
              if (flowersInCat.length === 0) return null;

              return (
                <div key={cat.id} className="bg-white rounded-3xl border border-pink-100 shadow-sm overflow-hidden">
                  <div className="bg-pink-50/50 px-4 py-3 border-b border-pink-100 flex items-center justify-between">
                    <h4 className="font-bold text-pink-800 text-sm">{cat.nama}</h4>
                    <span className="text-[10px] font-bold text-pink-500 bg-pink-100 px-2 py-0.5 rounded-full">{flowersInCat.length} Varian</span>
                  </div>
                  <div className="p-4 space-y-3">
                    {flowersInCat.map(flower => (
                      <div key={flower.id} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl transition group">
                        <div className="flex items-center gap-3">
                          <div className="bg-white w-10 h-10 rounded-lg shadow-sm border border-slate-100 flex items-center justify-center p-1">
                            {getFlowerComponent(flower.iconType, flower.iconColor)}
                          </div>
                          {editingFlowerId === flower.id ? (
                            <div className="flex flex-col gap-1">
                              <input 
                                type="text" 
                                value={flowerEditData.nama} 
                                onChange={(e) => setFlowerEditData({...flowerEditData, nama: e.target.value})}
                                className="text-sm font-bold text-gray-800 border-b border-pink-300 focus:outline-none px-1"
                              />
                              <div className="flex items-center text-xs">
                                <span className="text-pink-400 font-bold mr-1">Rp</span>
                                <input 
                                  type="number" 
                                  value={flowerEditData.harga} 
                                  onChange={(e) => setFlowerEditData({...flowerEditData, harga: e.target.value})}
                                  className="w-20 border-b border-pink-300 focus:outline-none px-1 text-pink-600 font-bold"
                                />
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="font-bold text-sm text-gray-800">{flower.nama}</div>
                              <div className="text-xs font-semibold text-pink-500">Rp {flower.harga.toLocaleString("id-ID")}</div>
                            </div>
                          )}
                        </div>

                        {/* Aksi Bunga */}
                        <div className="opacity-0 group-hover:opacity-100 transition duration-200">
                          {editingFlowerId === flower.id ? (
                            <div className="flex gap-1">
                              <button onClick={() => handleSaveFlower(flower.id)} className="p-1.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"><Check size={14} /></button>
                              <button onClick={() => setEditingFlowerId(null)} className="p-1.5 bg-rose-100 text-rose-500 rounded-lg hover:bg-rose-200"><X size={14} /></button>
                            </div>
                          ) : (
                            <div className="flex gap-1">
                              <button onClick={() => handleEditFlower(flower)} className="p-1.5 text-gray-400 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition"><Edit2 size={14} /></button>
                              <button onClick={() => deleteFlowerOption(flower.id)} className="p-1.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition" title="Hapus Bunga"><X size={14} /></button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PengaturanRangkaiAdminPage;
