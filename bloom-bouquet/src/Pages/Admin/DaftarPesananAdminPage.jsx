/**
 * FILE: /src/Pages/Admin/DaftarPesananAdminPage.jsx
 * TUJUAN: Halaman aplikasi utama yang merender antarmuka pengguna.
 * KETERHUBUNGAN: Terintegrasi dengan komponen induk dan menggunakan Context API atau Hooks untuk mengelola datanya.
 */

import { useState } from "react";
import { ShoppingCart, Clock, Check, X, CheckCircle, ArrowLeft, Mail, XCircle } from "lucide-react";
import { sendNotification, getAllAdminOrders } from "../../context/OrderContext";
import { formatRupiah } from "../../utils/formatCurrency";
import { useNavigate } from "react-router-dom";
import { flowers } from "../../Data/Flowers";

const DaftarPesananAdminPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(() => {
    return getAllAdminOrders().map(o => ({
      ...o,
      itemsDisplay: Array.isArray(o.items) 
        ? o.items.map(item => `${item.namaProduk} (${item.qty}x)`).join(", ")
        : o.items,
      totalDisplay: o.totalHarga || o.total
    }));
  });

  const updateOrderInLocal = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));

    // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
    for (let i = 0; i < localStorage.length; i++) {
      // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
      const key = localStorage.key(i);
      if (key && key.startsWith("orders_")) {
        // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
        // [DI LUAR MODUL] JSON.parse: Mengubah string JSON kembali menjadi objek JavaScript.
        let userOrders = JSON.parse(localStorage.getItem(key));
        let found = false;
        userOrders = userOrders.map(o => {
          if (o.id === orderId) {
            found = true;
            return { ...o, status: newStatus };
          }
          return o;
        });
        if (found) {
          // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
          // [DI LUAR MODUL] JSON.stringify: Mengubah objek JS menjadi string JSON (karena Storage API hanya menerima string).
          localStorage.setItem(key, JSON.stringify(userOrders));
          break; 
        }
      }
    }
  };

  const handleAccOrder = (order) => {
    updateOrderInLocal(order.id, "Diproses");
    sendNotification(order.customer, `Yey! Pesananmu (ID: ${order.id}) sedang kami proses.`, "Sistem");
  };
  
  const handleKirimOrder = (order) => {
    updateOrderInLocal(order.id, "Dikirim");
    sendNotification(order.customer, `Pesananmu (ID: ${order.id}) sudah dikirim kurir. Ditunggu ya!`, "Sistem");
  };
  
  const handleRejectOrder = (order) => {
    updateOrderInLocal(order.id, "Dibatalkan");
    
    // Kembalikan stok
    if (order.items && order.items.length > 0) {
      try {
        // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
        const savedFlowers = localStorage.getItem("customFlowersData");
        // [DI LUAR MODUL] JSON.parse: Mengubah string JSON kembali menjadi objek JavaScript.
        const parsedFlowers = savedFlowers ? JSON.parse(savedFlowers) : flowers;
        let updated = false;
        
        const newFlowers = parsedFlowers.map((flower) => {
          const orderedItem = order.items.find((item) => item.id === flower.id);
          if (orderedItem && flower.stok !== undefined) {
            updated = true;
            return {
              ...flower,
              stok: flower.stok + (orderedItem.qty || 1)
            };
          }
          return flower;
        });

        if (updated) {
          // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
          // [DI LUAR MODUL] JSON.stringify: Mengubah objek JS menjadi string JSON (karena Storage API hanya menerima string).
          localStorage.setItem("customFlowersData", JSON.stringify(newFlowers));
          window.dispatchEvent(new Event("stockUpdated"));
        }
      } catch (e) {
        console.error("Gagal mengembalikan stok:", e);
      }
    }

    sendNotification(order.customer, `Mohon maaf, pesananmu (ID: ${order.id}) dibatalkan oleh Admin.`, "Sistem");
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <button 
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 text-pink-600 hover:text-pink-700 bg-white px-4 py-2 rounded-full border border-pink-200 shadow-sm transition hover:shadow-md cursor-pointer w-fit mt-2"
      >
        <ArrowLeft size={16} /> Kembali
      </button>

      <div className="flex items-center justify-center gap-4 mb-2 mt-4">
        <div className="flex-1 h-[1.5px] bg-pink-200" />
        <div className="text-center shrink-0 px-2">
          <h2 className="text-3xl font-cursive font-bold text-pink-700 mb-1">
            Daftar Pesanan
          </h2>
          <p className="text-xs text-pink-500">Kelola semua pesanan masuk dari pelanggan</p>
        </div>
        <div className="flex-1 h-[1.5px] bg-pink-200" />
      </div>

      <div className="bg-white rounded-3xl border border-pink-100 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-pink-50 flex items-center justify-between bg-pink-50/30 gap-2">
          <h2 className="text-sm sm:text-xl font-bold text-pink-900 flex items-center gap-1.5 sm:gap-2">
            <ShoppingCart size={20} className="text-pink-500 sm:w-6 sm:h-6 shrink-0" /> 
            <span className="hidden sm:inline">Daftar Pesanan Masuk</span>
            <span className="sm:hidden leading-tight">Pesanan Masuk</span>
          </h2>
          <span className="bg-pink-100 text-pink-600 text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shrink-0 text-center leading-tight">
            {orders.length} <span className="hidden sm:inline">Total </span>Pesanan
          </span>
        </div>
        
        <div className="p-2 sm:p-4">
          <div className="block sm:table w-full text-left text-sm whitespace-nowrap">
            <div className="hidden sm:table-header-group text-gray-400 text-xs uppercase tracking-wider font-bold">
              <div className="table-row">
                <div className="table-cell p-3 pb-4">ID Pesanan</div>
                <div className="table-cell p-3 pb-4">Pelanggan</div>
                <div className="table-cell p-3 pb-4">Item & Total</div>
                <div className="table-cell p-3 pb-4">Status</div>
                <div className="table-cell p-3 pb-4 text-center">Aksi Respon</div>
              </div>
            </div>
            <div className="block sm:table-row-group sm:divide-y sm:divide-pink-50/60 space-y-4 sm:space-y-0">
              {orders.length === 0 ? (
                <div className="table-row">
                  <div className="table-cell p-8 text-center text-gray-400 font-medium text-sm">
                    Belum ada pesanan yang masuk.
                  </div>
                </div>
              ) : orders.map((order) => (
                <div key={order.id} className="block sm:table-row bg-white sm:bg-transparent sm:hover:bg-pink-50/30 transition border border-pink-100 sm:border-none shadow-sm sm:shadow-none rounded-2xl sm:rounded-none overflow-hidden">
                  
                  {/* ID Pesanan - Mobile Card Header */}
                  <div className="block sm:table-cell p-3 sm:p-3 border-b border-pink-50 sm:border-none bg-pink-50/30 sm:bg-transparent">
                    <div className="flex justify-between sm:block items-center">
                      <span className="sm:hidden text-[10px] uppercase font-bold text-gray-400">ID Pesanan</span>
                      <div className="text-right sm:text-left">
                        <div className="font-bold text-pink-700">{order.id}</div>
                        <div className="text-[10px] text-gray-400 font-medium flex items-center justify-end sm:justify-start gap-1 mt-1"><Clock size={10} /> {order.date}</div>
                      </div>
                    </div>
                  </div>
                  <div className="block sm:table-cell p-3 border-b border-pink-50 sm:border-none">
                    <div className="flex justify-between sm:block items-center">
                      <span className="sm:hidden text-[10px] uppercase font-bold text-gray-400">Pelanggan</span>
                      <span className="font-bold text-gray-800">{order.customer}</span>
                    </div>
                  </div>
                  <div className="block sm:table-cell p-3 border-b border-pink-50 sm:border-none">
                    <div className="flex flex-col sm:block">
                      <span className="sm:hidden text-[10px] uppercase font-bold text-gray-400 mb-1">Item & Total</span>
                      <div className="text-xs text-gray-600 sm:max-w-xs whitespace-normal sm:truncate" title={order.itemsDisplay}>{order.itemsDisplay}</div>
                      <div className="font-bold text-pink-600 mt-1">{formatRupiah(order.totalDisplay || 0)}</div>
                      {order.greetingMessage && (
                        <div className="text-[10px] text-amber-600 font-bold flex flex-col gap-1 mt-1.5 bg-amber-50 px-2 py-1.5 rounded-lg border border-amber-100 sm:max-w-xs" title={typeof order.greetingMessage === 'object' ? `Untuk: ${order.greetingMessage.untuk}\nDari: ${order.greetingMessage.dari}\nPesan: ${order.greetingMessage.pesan}` : `Pesan Kartu Ucapan: "${order.greetingMessage}"`}>
                          <div className="flex items-center gap-1"><Mail size={10} /> <span>Kartu Ucapan:</span></div>
                          {typeof order.greetingMessage === 'object' ? (
                            <div className="font-medium whitespace-normal">
                              {order.greetingMessage.untuk && <div>Untuk: {order.greetingMessage.untuk}</div>}
                              {order.greetingMessage.dari && <div>Dari: {order.greetingMessage.dari}</div>}
                              {order.greetingMessage.pesan && <div className="italic text-gray-600 mt-0.5">"{order.greetingMessage.pesan}"</div>}
                            </div>
                          ) : (
                            <span className="font-medium italic text-gray-600 whitespace-normal">"{order.greetingMessage}"</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="block sm:table-cell p-3 border-b border-pink-50 sm:border-none">
                    <div className="flex justify-between sm:block items-center">
                      <span className="sm:hidden text-[10px] uppercase font-bold text-gray-400">Status</span>
                      <span className={`px-3 py-1.5 text-[10px] uppercase font-bold rounded-full inline-block ${
                        order.status === "Menunggu Konfirmasi" ? "bg-amber-100 text-amber-700" :
                        order.status === "Diproses" ? "bg-blue-100 text-blue-700" :
                        order.status === "Selesai" ? "bg-emerald-100 text-emerald-700" :
                        "bg-rose-100 text-rose-700"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="block sm:table-cell p-3 sm:text-center bg-gray-50/50 sm:bg-transparent">
                    <div className="flex flex-col sm:flex-row sm:justify-center items-center gap-2">
                      <span className="sm:hidden text-[10px] uppercase font-bold text-gray-400 mb-1">Aksi Respon</span>
                      {order.status === "Menunggu Konfirmasi" ? (
                        <div className="flex justify-center gap-2 w-full sm:w-auto">
                          <button 
                            onClick={() => handleAccOrder(order)}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-[10px] font-bold rounded-full transition shadow-xs cursor-pointer"
                          >
                            <CheckCircle size={14} /> Proses
                          </button>
                          <button 
                            onClick={() => handleRejectOrder(order)}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-600 text-[10px] font-bold rounded-full transition cursor-pointer"
                          >
                            <XCircle size={14} /> Tolak
                          </button>
                        </div>
                      ) : order.status === "Diproses" ? (
                        <button 
                          onClick={() => handleKirimOrder(order)}
                          className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-[10px] font-bold rounded-full transition shadow-xs cursor-pointer"
                        >
                          <CheckCircle size={14} /> Kirim Pesanan
                        </button>
                      ) : (
                        <span className="text-[10px] font-bold text-gray-300 italic">Tidak ada aksi</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaftarPesananAdminPage;
