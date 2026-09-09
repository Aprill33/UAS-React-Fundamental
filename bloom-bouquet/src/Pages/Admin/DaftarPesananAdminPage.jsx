import { useState } from "react";
import { ShoppingCart, Clock, Check, X, CheckCircle, ArrowLeft, Mail } from "lucide-react";
import { sendNotification } from "../../context/OrderContext";
import { useNavigate } from "react-router-dom";

const DaftarPesananAdminPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(() => {
    let allOrders = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("orders_")) {
        const username = key.replace("orders_", "");
        const userOrders = JSON.parse(localStorage.getItem(key));
        const mappedOrders = userOrders.map(o => ({
          ...o,
          customer: o.customer || username,
          itemsDisplay: Array.isArray(o.items) 
            ? o.items.map(item => `${item.namaProduk} (${item.qty}x)`).join(", ")
            : o.items,
          totalDisplay: o.totalHarga || o.total
        }));
        allOrders = [...allOrders, ...mappedOrders];
      }
    }
    return allOrders.sort((a, b) => b.id.localeCompare(a.id));
  });

  const updateOrderInLocal = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("orders_")) {
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
    sendNotification(order.customer, `Mohon maaf, pesananmu (ID: ${order.id}) dibatalkan.`, "Sistem");
  };

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
            Daftar Pesanan
          </h2>
          <p className="text-xs text-pink-500">Kelola semua pesanan masuk dari pelanggan</p>
        </div>
        <div className="flex-1 h-[1.5px] bg-pink-200" />
      </div>

      <div className="bg-white rounded-3xl border border-pink-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-pink-50 flex items-center justify-between bg-pink-50/30">
          <h2 className="text-xl font-bold text-pink-900 flex items-center gap-2">
            <ShoppingCart size={24} className="text-pink-500" /> Daftar Pesanan Masuk
          </h2>
          <span className="bg-pink-100 text-pink-600 text-xs font-bold px-3 py-1.5 rounded-full">{orders.length} Total Pesanan</span>
        </div>
        
        <div className="overflow-x-auto p-4">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="text-gray-400 text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="p-3 pb-4">ID Pesanan</th>
                <th className="p-3 pb-4">Pelanggan</th>
                <th className="p-3 pb-4">Item & Total</th>
                <th className="p-3 pb-4">Status</th>
                <th className="p-3 pb-4 text-center">Aksi Respon</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50/60">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-8 text-gray-400 font-medium text-sm">
                    Belum ada pesanan yang masuk.
                  </td>
                </tr>
              ) : orders.map((order) => (
                <tr key={order.id} className="hover:bg-pink-50/30 transition">
                  <td className="p-3">
                    <div className="font-bold text-pink-700">{order.id}</div>
                    <div className="text-[10px] text-gray-400 font-medium flex items-center gap-1 mt-1"><Clock size={10} /> {order.date}</div>
                  </td>
                  <td className="p-3 font-bold text-gray-800">{order.customer}</td>
                  <td className="p-3">
                    <div className="text-xs text-gray-600 max-w-xs truncate" title={order.itemsDisplay}>{order.itemsDisplay}</div>
                    <div className="font-bold text-pink-600 mt-1">Rp {order.totalDisplay?.toLocaleString("id-ID") || 0}</div>
                    {order.greetingMessage && (
                      <div className="text-[10px] text-amber-600 font-bold flex items-center gap-1 mt-1.5 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100 max-w-xs truncate" title={`Pesan Kartu Ucapan: "${order.greetingMessage}"`}>
                        <Mail size={10} /> <span>Pesan: {order.greetingMessage}</span>
                      </div>
                    )}
                  </td>
                  <td className="p-3">
                    <span className={`px-3 py-1.5 text-[10px] uppercase font-bold rounded-full ${
                      order.status === "Menunggu Konfirmasi" ? "bg-amber-100 text-amber-700" :
                      order.status === "Diproses" ? "bg-blue-100 text-blue-700" :
                      order.status === "Selesai" ? "bg-emerald-100 text-emerald-700" :
                      "bg-rose-100 text-rose-700"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    {order.status === "Menunggu Konfirmasi" ? (
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleAccOrder(order)} className="flex items-center gap-1 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-bold rounded-xl transition shadow-xs cursor-pointer">
                          <Check size={14} /> Terima
                        </button>
                        <button onClick={() => handleRejectOrder(order)} className="flex items-center gap-1 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 text-[10px] font-bold rounded-xl transition border border-rose-100 cursor-pointer">
                          <X size={14} /> Tolak
                        </button>
                      </div>
                    ) : order.status === "Diproses" ? (
                      <button onClick={() => handleKirimOrder(order)} className="flex items-center mx-auto gap-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-[10px] font-bold rounded-xl transition shadow-xs cursor-pointer">
                        <CheckCircle size={14} /> Kirim Pesanan
                      </button>
                    ) : (
                      <span className="text-[10px] font-bold text-gray-300 italic">Tidak ada aksi</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DaftarPesananAdminPage;
