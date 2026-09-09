import { useState, useEffect } from "react";
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import { Package, PackagePlus, Edit, Trash2, SearchX, ArrowLeft } from "lucide-react";
import { flowers as initialFlowers } from "../../Data/Flowers";
import SearchBar from "../../Components/SearchBar";
import Pagination from "../../Components/Pagination";

const DaftarProdukAdminPage = () => {
  const navigate = useNavigate();
  const { showAlert } = useOutletContext();
  const [searchParams] = useSearchParams();

  const [flowerList, setFlowerList] = useState(() => {
    const saved = localStorage.getItem("customFlowersData");
    return saved ? JSON.parse(saved) : initialFlowers;
  });

  const [orders, setOrders] = useState(() => {
    let allOrders = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("orders_")) {
        const userOrders = JSON.parse(localStorage.getItem(key));
        allOrders = [...allOrders, ...userOrders];
      }
    }
    return allOrders;
  });

  const saveToLocal = (data) => {
    setFlowerList(data);
    localStorage.setItem("customFlowersData", JSON.stringify(data));
  };

  const handleDelete = (id) => {
    const productToDelete = flowerList.find(f => f.id === id);
    if (!productToDelete) return;

    const isBought = orders.some(order => 
      Array.isArray(order.items) && 
      order.items.some(item => item.id === id || item.namaProduk === productToDelete.namaProduk)
    );

    if (isBought) {
      showAlert("error", "Bunga ini tidak dapat dihapus karena sudah ada pesanan!");
      return;
    }

    showAlert(
      "delete_confirm", 
      "Yakin nih bunga nya mau dihapus?", 
      () => {
        const updated = flowerList.filter((item) => item.id !== id);
        saveToLocal(updated);
        // hide the alert
        document.body.click(); // Hacky close or rely on outlet context closeAlert if passed, but showAlert passes onConfirm which can just do nothing if closeAlert is not passed. 
        // Wait, showAlert's onConfirm takes care of closing if we don't pass one, BUT we passed one so we need to close it. 
        // The CustomAlert closes itself if we don't do anything? 
        // Let's just reload or let CustomAlert close it. We can just alert success after a delay.
        setTimeout(() => showAlert("success", "Bunga berhasil dihapus!"), 100);
      }, 
      null,
      "Hapus Aja",
      "Batal"
    );
  };

  // State Filter Produk
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedKategori, setSelectedKategori] = useState("Semua");
  const [selectedJenis, setSelectedJenis] = useState("Semua Jenis");
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get("status") || "Semua Status");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredFlowers = flowerList.filter((item) => {
    const matchesSearch = 
      item.namaProduk?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kategori?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.jenis?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesKategori = 
      selectedKategori === "Semua" || item.kategori === selectedKategori;

    const matchesJenis = 
      selectedJenis === "Semua Jenis" || item.jenis === selectedJenis;

    const matchesStatus = (() => {
      if (selectedStatus === "Semua Status") return true;
      if (selectedStatus === "Ready Stock") return item.stok > 0;
      if (selectedStatus === "Habis Terjual") return item.stok === 0;
      return item.statusProduk?.toLowerCase() === selectedStatus.toLowerCase();
    })();

    return matchesSearch && matchesKategori && matchesJenis && matchesStatus;
  });

  const sortedFlowers = [...filteredFlowers].sort((a, b) => {
    if (a.stok === 0 && b.stok > 0) return 1;
    if (a.stok > 0 && b.stok === 0) return -1;

    if (sortBy === "az") return a.namaProduk.localeCompare(b.namaProduk);
    if (sortBy === "za") return b.namaProduk.localeCompare(a.namaProduk);
    if (sortBy === "low-high") return a.harga - b.harga;
    if (sortBy === "high-low") return b.harga - a.harga;
    return 0;
  });

  const totalPages = Math.ceil(sortedFlowers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFlowers = sortedFlowers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-6 animate-fadeIn">
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
            Inventori Bunga
          </h2>
          <p className="text-xs text-pink-500">Kelola katalog bunga Bloom & Bouquet</p>
        </div>
        <div className="flex-1 h-[1.5px] bg-pink-200" />
      </div>

      <div className="flex justify-between items-center bg-white p-4 rounded-3xl border border-pink-100 shadow-sm">
        <h2 className="text-xl font-bold text-pink-900 flex items-center gap-2 px-2">
          <Package size={24} className="text-pink-500" /> Inventori Bunga
        </h2>
        <button onClick={() => navigate('/admin/produk/tambah')} className="px-5 py-2.5 bg-pink-500 hover:bg-pink-600 text-white text-sm font-bold rounded-2xl shadow-xs transition hover:-translate-y-0.5 cursor-pointer flex items-center gap-2">
          <span>+ Tambah Bunga</span>
        </button>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={(val) => { setSearchTerm(val); setCurrentPage(1); }}
        selectedKategori={selectedKategori}
        setSelectedKategori={(kat) => { setSelectedKategori(kat); setCurrentPage(1); }}
        selectedJenis={selectedJenis}
        setSelectedJenis={(jns) => { setSelectedJenis(jns); setCurrentPage(1); }}
        selectedStatus={selectedStatus}
        setSelectedStatus={(st) => { setSelectedStatus(st); setCurrentPage(1); }}
        sortBy={sortBy}
        setSortBy={(sort) => { setSortBy(sort); setCurrentPage(1); }}
      />

      {currentFlowers.length === 0 ? (
        <div className="flex flex-col items-center text-center py-20 bg-white rounded-3xl border border-pink-100 p-8 shadow-sm">
          <div className="w-20 h-20 bg-pink-50 text-pink-300 rounded-full flex items-center justify-center mb-5">
            <SearchX size={40} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Bunga Tidak Ditemukan</h3>
          <p className="text-gray-500 max-w-md mx-auto">Tidak ada bunga yang cocok dengan pencarian dan filter yang kamu gunakan. Coba gunakan kata kunci lain.</p>
          <button
            onClick={() => { 
              setSearchTerm(""); setSelectedKategori("Semua"); setSelectedJenis("Semua Jenis"); setSelectedStatus("Semua Status"); setSortBy("default");
            }}
            className="mt-6 px-6 py-2.5 bg-pink-500 text-white rounded-full text-sm font-bold shadow-sm hover:bg-pink-600 transition hover:-translate-y-0.5 cursor-pointer"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {currentFlowers.map((prod) => (
            <div 
              key={prod.id} 
              className="bg-white rounded-3xl border border-pink-100 overflow-hidden shadow-xs hover:shadow-md transition duration-300 flex flex-col justify-between group p-3"
            >
              <div className="relative h-48 overflow-hidden rounded-2xl bg-pink-50/20">
                <img
                  src={prod.gambarProduk}
                  alt={prod.namaProduk}
                  className={`w-full h-full object-cover group-hover:scale-105 transition duration-500 ${prod.stok === 0 ? "grayscale opacity-75" : ""}`}
                />
                {prod.stok === 0 ? (
                  <span className="absolute top-3 left-3 bg-gray-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs">
                    Habis Terjual
                  </span>
                ) : prod.statusProduk ? (
                  <span className="absolute top-3 left-3 bg-pink-100 text-pink-600 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs">
                    {prod.statusProduk}
                  </span>
                ) : null}
              </div>

              <div className="pt-3 px-1 pb-1 flex-1 flex flex-col">
                <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wide block mb-1">
                  {prod.kategori} • <span className="text-pink-600">{prod.jenis}</span>
                </span>
                <h3 className="font-serif font-bold text-pink-900 text-sm leading-snug line-clamp-1 mb-1">
                  {prod.namaProduk}
                </h3>
                <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium mb-1">
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    ★ {prod.rating || "4.8"}
                  </span>
                  <span>•</span>
                  <span>Stok {prod.stok ?? "10"}</span>
                </div>
                <div className="text-base font-bold text-pink-600 mb-3 flex-1">
                  Rp {Number(prod.harga).toLocaleString("id-ID")}
                </div>
                
                {/* Admin Controls */}
                <div className="grid grid-cols-2 gap-2 mt-auto">
                  <button 
                    onClick={() => navigate(`/admin/produk/edit/${prod.id}`)}
                    className="py-2 bg-amber-50 hover:bg-amber-100 text-amber-600 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer border border-amber-100"
                  >
                    <Edit size={14} /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(prod.id)}
                    className="py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer border border-rose-100"
                  >
                    <Trash2 size={14} /> Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}
    </div>
  );
};

export default DaftarProdukAdminPage;
