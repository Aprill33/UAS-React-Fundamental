/**
 * FILE: /src/Pages/Pelanggan/PesananSayaPage.jsx
 * TUJUAN: Halaman aplikasi utama yang merender antarmuka pengguna.
 * KETERHUBUNGAN: Terintegrasi dengan komponen induk dan menggunakan Context API atau Hooks untuk mengelola datanya.
 */

import { useContext, useState } from "react";
import { OrderContext, sendNotification } from "../../context/OrderContext";
import { ArrowLeft, Package, Truck, CheckCircle2, ShoppingBag, X, XCircle, Clock, Mail } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ReviewContext } from "../../context/ReviewContext";
import CustomAlert from "../../Components/CustomAlert";

const OrderDetailModal = ({ order, onClose, onUpdateStatus, currentUser }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-pink-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl border border-pink-100 animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-pink-100">
          <div>
            <h3 className="font-bold text-pink-800 text-lg">Detail Pesanan</h3>
            <p className="text-xs text-gray-500 mt-1">ID: {order.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-pink-50 hover:bg-pink-100 text-pink-400 rounded-full transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div className="flex justify-between items-center bg-pink-50/50 p-4 rounded-2xl border border-pink-100">
            <div>
              <p className="text-xs text-pink-500 mb-1">Status</p>
              <div className="font-bold text-pink-700 flex items-center gap-1.5">
                {order.status === "Menunggu Konfirmasi" && <Clock size={16} />}
                {order.status === "Diproses" && <Package size={16} />}
                {order.status === "Dikirim" && <Truck size={16} />}
                {order.status === "Selesai" && <CheckCircle2 size={16} />}
                {order.status === "Dibatalkan" && <XCircle size={16} />}
                {order.status}
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-pink-500 mb-1">Tanggal</p>
              <p className="font-bold text-gray-700">{order.date}</p>
            </div>
          </div>

          <div className="bg-pink-50/30 p-4 rounded-2xl border border-pink-100">
            <h4 className="font-bold text-pink-800 text-sm mb-2">Detail Pengiriman</h4>
            <p className="text-sm font-bold text-gray-700">{order.customer || currentUser?.username || "Pelanggan"}</p>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              {order.shippingAddress}<br/>
              <span className="font-semibold text-pink-600">{order.shippingCity}</span>
            </p>
          </div>

          {/* TAMBAHAN KARTU UCAPAN */}
          {order.greetingMessage && (
            <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-amber-100/30 rounded-bl-full -mr-8 -mt-8"></div>
              <h4 className="font-bold text-amber-700 text-sm mb-2 flex items-center gap-1.5">
                <Mail size={16} /> Pesan Kartu Ucapan
              </h4>
              {typeof order.greetingMessage === 'object' ? (
                <div className="space-y-1">
                  {(order.greetingMessage.untuk || order.greetingMessage.dari) && (
                    <div className="text-xs text-amber-800 font-medium mb-1">
                      {order.greetingMessage.untuk && <div><span className="font-bold">Untuk:</span> {order.greetingMessage.untuk}</div>}
                      {order.greetingMessage.dari && <div><span className="font-bold">Dari:</span> {order.greetingMessage.dari}</div>}
                    </div>
                  )}
                  {order.greetingMessage.pesan && <p className="text-xs text-gray-600 italic leading-relaxed">"{order.greetingMessage.pesan}"</p>}
                </div>
              ) : (
                <p className="text-xs text-gray-600 italic leading-relaxed">"{order.greetingMessage}"</p>
              )}
            </div>
          )}

          <div>
            <h4 className="font-bold text-pink-800 mb-3 text-sm">Daftar Produk</h4>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-3 border border-pink-100 rounded-2xl bg-white shadow-sm">
                  <img src={item.gambarProduk} alt={item.namaProduk} className="w-16 h-16 rounded-xl object-cover bg-pink-50" />
                  <div className="flex-1 pt-1">
                    <h5 className="font-bold text-pink-900 text-sm">{item.namaProduk}</h5>
                    <p className="text-xs text-pink-500 mt-0.5">{item.qty}x • Rp {item.harga.toLocaleString("id-ID")}</p>
                    {item.diskon && (
                      <p className="text-[10px] text-emerald-600 font-bold mt-0.5">
                        Menikmati Diskon {item.diskon}%
                      </p>
                    )}
                    {item.deskripsi && (
                      <p className="text-[10px] text-gray-500 mt-2 bg-gray-50 p-2 rounded-lg leading-relaxed">
                        {item.deskripsi}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-pink-100 pt-4">
            <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
              <span>Total Harga ({order.items.reduce((acc, item) => acc + item.qty, 0)} barang)</span>
              <span>Rp {order.totalAsli ? order.totalAsli.toLocaleString("id-ID") : order.totalHarga.toLocaleString("id-ID")}</span>
            </div>
            {order.totalDiskon > 0 && (
              <div className="flex justify-between items-center mb-2 text-sm text-emerald-500">
                <span>Diskon Barang</span>
                <span>- Rp {order.totalDiskon.toLocaleString("id-ID")}</span>
              </div>
            )}
            {order.voucher && (
              <div className="flex justify-between items-center mb-2 text-sm text-emerald-500">
                <span>Diskon Voucher ({order.voucher.code})</span>
                <span>- Rp {order.voucher.discount.toLocaleString("id-ID")}</span>
              </div>
            )}
            <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
              <span>Ongkos Kirim</span>
              <span>{order.ongkir === 0 ? "Gratis" : `Rp ${order.ongkir?.toLocaleString("id-ID") || 0}`}</span>
            </div>
            <div className="flex justify-between items-center mt-4 text-base font-bold text-pink-800">
              <span>Total Belanja</span>
              <span className="text-lg">Rp {order.totalHarga.toLocaleString("id-ID")}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        {order.status === "Dikirim" && (
          <div className="p-6 border-t border-pink-100 bg-gray-50 rounded-b-3xl">
            <button
              onClick={() => onUpdateStatus(order.id, "Selesai")}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={18} />
              Pesanan Diterima
            </button>
            <p className="text-[10px] text-center text-gray-400 mt-2">Klik tombol ini jika paket sudah sampai di tanganmu.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Orders = () => {
  const { orders, updateOrderStatus, cancelOrder } = useContext(OrderContext);
  const { getReviewByOrderId } = useContext(ReviewContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Menunggu Konfirmasi");
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);

  const tabs = [
    { id: "Menunggu Konfirmasi", label: "Menunggu", icon: Clock },
    { id: "Diproses", label: "Dikemas", icon: Package },
    { id: "Dikirim", label: "Dikirim", icon: Truck },
    { id: "Selesai", label: "Selesai", icon: CheckCircle2 },
    { id: "Dibatalkan", label: "Dibatalkan", icon: XCircle },
  ];

  const filteredOrders = orders.filter((o) => o.status === activeTab);

  const handleUpdateStatus = (id, status) => {
    updateOrderStatus(id, status);
    if (status === "Selesai") {
      sendNotification("admin", `Pesanan (ID: ${id}) telah diterima oleh pelanggan ${currentUser?.username || ""}`, currentUser?.username || "Pelanggan");
    }
    setSelectedOrder(null);
  };

  const handleCancelClick = (orderId) => {
    setOrderToCancel(orderId);
    setShowCancelConfirm(true);
  };

  const confirmCancelOrder = () => {
    if (orderToCancel) {
      cancelOrder(orderToCancel);
    }
    setShowCancelConfirm(false);
    setOrderToCancel(null);
  };

  return (
    <div className="min-h-screen bg-pink-50/30 font-sans pb-20">
      <CustomAlert
        isOpen={showCancelConfirm}
        onClose={() => setShowCancelConfirm(false)}
        onConfirm={confirmCancelOrder}
        type="delete"
        title="Batalkan Pesanan?"
        message="Apakah Anda yakin ingin membatalkan pesanan ini? Aksi ini tidak dapat dibatalkan."
        confirmText="Ya, Batalkan"
        cancelText="Tidak, Kembali"
        showCancel={true}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 mb-6">
        <button
          onClick={() => navigate("/profil")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-pink-500 hover:text-white text-pink-600 font-bold text-xs rounded-full shadow-sm border border-pink-200 transition-all duration-300 cursor-pointer hover:shadow-md hover:-translate-x-1"
        >
          <ArrowLeft size={16} />
          <span>Kembali</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8">
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <div className="w-10 sm:flex-1 h-[2px] bg-pink-300 rounded-full shrink-0" />
          <div className="text-center px-4 space-y-2">
            <h1 className="text-3xl sm:text-4xl font-cursive font-bold text-pink-700">Pesanan Saya</h1>
            <p className="text-xs sm:text-sm text-pink-500">Pantau status pengiriman buket bungamu di sini</p>
          </div>
          <div className="w-10 sm:flex-1 h-[2px] bg-pink-300 rounded-full shrink-0" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8">
        {/* TABS */}
        <div className="flex bg-white sm:rounded-full p-1.5 shadow-sm border border-pink-100 max-w-3xl mx-auto overflow-x-auto sm:overflow-visible rounded-xl">
          <div className="flex w-full min-w-max sm:min-w-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-0 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-pink-500 text-white shadow-md"
                      : "text-gray-500 hover:bg-pink-50 hover:text-pink-600"
                  }`}
                >
                  <Icon size={16} className="shrink-0" />
                  <span className={`${isActive ? "inline" : "hidden sm:inline"} whitespace-nowrap`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-pink-100 shadow-sm animate-in fade-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-pink-100">
              <ShoppingBag size={40} className="text-pink-300" />
            </div>
            <h3 className="font-bold text-pink-800 text-lg mb-2">Belum ada pesanan</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
              Sepertinya belum ada transaksi dengan status <span className="font-semibold text-pink-600">{activeTab}</span> saat ini.
            </p>
            <Link
              to="/bunga"
              className="inline-flex px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm rounded-full shadow-md transition"
            >
              Belanja Sekarang
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-3xl p-5 sm:p-6 border border-pink-100 shadow-sm hover:border-pink-300 transition duration-300 group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b border-pink-50 pb-4">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                      {order.date}
                    </span>
                    <span className="text-sm font-semibold text-pink-800">
                      ID: {order.id}
                    </span>
                  </div>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                    order.status === "Selesai" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                    order.status === "Dikirim" ? "bg-blue-50 text-blue-600 border-blue-100" :
                    order.status === "Menunggu Konfirmasi" ? "bg-amber-50 text-amber-600 border-amber-100" :
                    "bg-rose-50 text-rose-600 border-rose-100"
                  }`}>
                    {order.status === "Menunggu Konfirmasi" && <Clock size={12} />}
                    {order.status === "Diproses" && <Package size={12} />}
                    {order.status === "Dikirim" && <Truck size={12} />}
                    {order.status === "Selesai" && <CheckCircle2 size={12} />}
                    {order.status === "Dibatalkan" && <XCircle size={12} />}
                    {order.status}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Gambar Produk Pertama */}
                    <div className="w-16 h-16 rounded-xl bg-pink-50 flex items-center justify-center shrink-0 border border-pink-100 overflow-hidden relative">
                      {order.items[0] && (
                        <img src={order.items[0].gambarProduk} alt="Produk" className="w-full h-full object-cover" />
                      )}
                      {order.items.length > 1 && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">+{order.items.length - 1}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">
                        {order.items[0]?.namaProduk} {order.items.length > 1 ? `dan ${order.items.length - 1} barang lainnya` : ""}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Total Pembayaran: <span className="font-bold text-pink-700">Rp {order.totalHarga.toLocaleString("id-ID")}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {order.status === "Menunggu Konfirmasi" && (
                      <button
                        onClick={() => handleCancelClick(order.id)}
                        className="flex-1 sm:flex-none px-5 py-2.5 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white rounded-full font-bold text-xs transition cursor-pointer shrink-0"
                      >
                        Batalkan
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="flex-1 sm:flex-none px-5 py-2.5 bg-pink-50 text-pink-600 hover:bg-pink-500 hover:text-white rounded-full font-bold text-xs transition cursor-pointer shrink-0"
                    >
                      Lihat Detail
                    </button>
                    {order.status === "Selesai" && (
                      <button
                        onClick={() => navigate(`/pesanan/ulasan/${order.id}`)}
                        className={`flex-1 sm:flex-none px-5 py-2.5 rounded-full font-bold text-xs transition cursor-pointer shrink-0 ${
                          getReviewByOrderId(order.id) 
                          ? "bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white" 
                          : "bg-pink-500 text-white hover:bg-pink-600 shadow-md shadow-pink-200"
                        }`}
                      >
                        {getReviewByOrderId(order.id) ? "Edit Ulasan" : "Beri Ulasan"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <OrderDetailModal 
        order={selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
        onUpdateStatus={handleUpdateStatus} 
        currentUser={currentUser}
      />
    </div>
  );
};

export default Orders;
