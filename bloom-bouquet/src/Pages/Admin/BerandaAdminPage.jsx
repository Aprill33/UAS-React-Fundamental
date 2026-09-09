/**
 * FILE: /src/Pages/Admin/BerandaAdminPage.jsx
 * TUJUAN: Halaman aplikasi utama yang merender antarmuka pengguna.
 * KETERHUBUNGAN: Terintegrasi dengan komponen induk dan menggunakan Context API atau Hooks untuk mengelola datanya.
 */

// [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Flower, Package, ShoppingCart, Clock, X } from "lucide-react";
import { flowers as initialFlowers } from "../../Data/Flowers";
import Pagination from "../../Components/Pagination";
import { getAllAdminOrders } from "../../context/OrderContext";
import usePagination from "../../hooks/usePagination";

const BerandaAdminPage = () => {
  const navigate = useNavigate();

  const [flowerList, setFlowerList] = useState(() => {
    // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
    const saved = localStorage.getItem("customFlowersData");
    // [DI LUAR MODUL] JSON.parse: Mengubah string JSON kembali menjadi objek JavaScript.
    return saved ? JSON.parse(saved) : initialFlowers;
  });

  const [orders, setOrders] = useState(() => {
    return getAllAdminOrders().map(o => ({
      ...o,
      itemsDisplay: Array.isArray(o.items) 
        ? o.items.map(item => `${item.namaProduk} (${item.qty}x)`).join(", ")
        : o.items,
      totalDisplay: o.totalHarga || o.total
    }));
  });



  const totalProduk = flowerList.length;
  const produkTersedia = flowerList.filter(f => f.stok > 0).length;
  const produkHabis = flowerList.filter(f => f.stok === 0).length;

  const produkTerjual = orders
    .filter(o => o.status === "Selesai" || o.status === "Diproses")
    .reduce((sum, order) => {
      if (Array.isArray(order.items)) {
        return sum + order.items.reduce((itemSum, item) => itemSum + (item.qty || 1), 0);
      }
      return sum + 1;
    }, 0);

  const allTopProducts = flowerList.filter(f => f.statusProduk === "Best Seller");
  const { currentData: currentTopProducts, totalPages: totalTopPages, currentPage: topProductsPage, setCurrentPage: setTopProductsPage } = usePagination(allTopProducts, 4);
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center justify-center gap-4 mb-2 mt-4">
        <div className="flex-1 h-[1.5px] bg-pink-200" />
        <div className="text-center shrink-0 px-2">
          <h2 className="text-3xl font-cursive font-bold text-pink-700 mb-1">
            Ringkasan Toko
          </h2>
          <p className="text-xs text-pink-500">Sekilas kondisi katalog Bloom & Bouquet hari ini</p>
        </div>
        <div className="flex-1 h-[1.5px] bg-pink-200" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button 
          onClick={() => navigate('/admin/produk')}
          className="bg-white p-5 rounded-2xl border border-pink-100 shadow-sm hover:shadow-md hover:border-pink-300 transition cursor-pointer flex items-center gap-5 w-full text-left"
        >
          <div className="w-14 h-14 bg-pink-50 text-pink-500 rounded-xl flex items-center justify-center shrink-0">
            <Flower size={28} />
          </div>
          <div>
            <p className="text-2xl font-black text-pink-700">{totalProduk}</p>
            <p className="text-pink-400 font-medium text-xs">Total Bunga</p>
          </div>
        </button>

        <button 
          onClick={() => navigate('/admin/produk?status=Ready Stock')}
          className="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm hover:shadow-md hover:border-amber-300 transition cursor-pointer flex items-center gap-5 w-full text-left"
        >
          <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center shrink-0">
            <Package size={28} />
          </div>
          <div>
            <p className="text-2xl font-black text-amber-600">{produkTersedia}</p>
            <p className="text-amber-500 font-medium text-xs">Bunga Tersedia</p>
          </div>
        </button>

        <button 
          onClick={() => navigate('/admin/terjual')}
          className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-300 transition cursor-pointer flex items-center gap-5 w-full text-left"
        >
          <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center shrink-0">
            <ShoppingCart size={28} />
          </div>
          <div>
            <p className="text-2xl font-black text-emerald-600">{produkTerjual}</p>
            <p className="text-emerald-500 font-medium text-xs">Bunga Terjual</p>
          </div>
        </button>

        <button 
          onClick={() => navigate('/admin/produk?status=Habis Terjual')}
          className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm hover:shadow-md hover:border-rose-300 transition cursor-pointer flex items-center gap-5 w-full text-left"
        >
          <div className="w-14 h-14 bg-rose-50 text-rose-400 rounded-xl flex items-center justify-center shrink-0">
            <Package size={28} />
          </div>
          <div>
            <p className="text-2xl font-black text-rose-500">{produkHabis}</p>
            <p className="text-rose-400 font-medium text-xs">Bunga Habis</p>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="font-bold text-lg text-pink-900">Produk Terlaris</h3>
              <button 
                className="text-xs text-pink-500 font-bold cursor-pointer hover:underline" 
                onClick={() => { 
                  navigate('/admin/produk?status=Best Seller');
                }}
              >
                Lihat Semua
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {currentTopProducts.map(prod => (
                <div key={prod.id} className="bg-white p-3 rounded-2xl border border-pink-100 shadow-sm flex flex-col justify-between hover:shadow-md transition cursor-pointer">
                  <img src={prod.gambarProduk} alt={prod.namaProduk} className="w-full h-32 object-cover rounded-xl mb-3 bg-pink-50/50" />
                  <h4 className="font-bold text-sm text-gray-800 line-clamp-1">{prod.namaProduk}</h4>
                  <p className="font-bold text-pink-600 mt-0.5 text-xs">Rp {prod.harga.toLocaleString('id-ID')}</p>
                </div>
              ))}
            </div>
            <Pagination 
              currentPage={topProductsPage} 
              totalPages={totalTopPages} 
              onPageChange={setTopProductsPage} 
            />
        </div>
        
        <div className="bg-white p-5 rounded-3xl border border-pink-100 shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-pink-900">Pesanan Terbaru</h3>
              <button className="text-xs text-pink-500 font-bold cursor-pointer hover:underline" onClick={() => navigate('/admin/pesanan')}>Detail</button>
            </div>
            <div className="space-y-3 flex-1">
              {recentOrders.length === 0 ? <p className="text-xs text-gray-400">Belum ada pesanan.</p> : recentOrders.map(order => (
                <div key={order.id} className="flex justify-between items-center p-3 hover:bg-pink-50 rounded-xl transition cursor-pointer border border-pink-50">
                  <div>
                    <p className="font-bold text-sm text-gray-800">{order.customer}</p>
                    <p className="text-[10px] text-gray-500">{order.date}</p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <p className="font-bold text-sm text-pink-600">Rp {order.totalDisplay?.toLocaleString('id-ID') || 0}</p>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      order.status === "Selesai" ? "bg-emerald-100 text-emerald-700" :
                      order.status === "Menunggu Konfirmasi" ? "bg-amber-100 text-amber-700" :
                      order.status === "Diproses" ? "bg-blue-100 text-blue-700" :
                      "bg-rose-100 text-rose-700"
                    }`}>{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>

    </div>
  );
};

export default BerandaAdminPage;
