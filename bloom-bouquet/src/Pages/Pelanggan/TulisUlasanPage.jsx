/**
 * FILE: /src/Pages/Pelanggan/TulisUlasanPage.jsx
 * TUJUAN: Halaman aplikasi utama yang merender antarmuka pengguna.
 * KETERHUBUNGAN: Terintegrasi dengan komponen induk dan menggunakan Context API atau Hooks untuk mengelola datanya.
 */

// [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { OrderContext } from "../../context/OrderContext";
import { ReviewContext } from "../../context/ReviewContext";
import { Star, ArrowLeft, Send, Trash2, Edit2 } from "lucide-react";
import CustomAlert from "../../Components/CustomAlert";

const TulisUlasanPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { orders } = useContext(OrderContext);
  const { reviews, addReview, updateReview, deleteReview, getReviewByOrderId } = useContext(ReviewContext);

  const [order, setOrder] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [existingReview, setExistingReview] = useState(null);

  const [alertData, setAlertData] = useState({ isOpen: false, type: "", title: "", message: "", onConfirm: null });
  const closeAlert = () => setAlertData(prev => ({ ...prev, isOpen: false }));

  // [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
  useEffect(() => {
    if (!currentUser) return;

    // Find the order
    const foundOrder = orders.find(o => o.id === orderId);
    if (!foundOrder || foundOrder.status !== "Selesai") {
      navigate("/pesanan");
      return;
    }
    setOrder(foundOrder);

    // Check if review exists
    const review = getReviewByOrderId(orderId);
    if (review) {
      setExistingReview(review);
      setRating(review.rating);
      setComment(review.comment);
      setIsEditing(true); // Allow them to see what they wrote and edit if they want
    }
  }, [orderId, orders, currentUser, navigate, getReviewByOrderId]);

  if (!order) return null;

  const handleSubmit = (e) => {
    // [DI LUAR MODUL] preventDefault: Mencegah aksi bawaan browser (misal form submit page reload).
    e.preventDefault();

    if (rating === 0) {
      setAlertData({
        isOpen: true,
        type: "error",
        title: "Oops!",
        message: "Jangan lupa berikan rating bintang ya sebelum submit!",
        confirmText: "Oke",
        onConfirm: closeAlert
      });
      return;
    }

    if (comment.trim() === "") {
        setAlertData({
            isOpen: true,
            type: "error",
            title: "Oops!",
            message: "Komentarnya jangan dibiarkan kosong ya!",
            confirmText: "Oke",
            onConfirm: closeAlert
        });
        return;
    }

    if (existingReview) {
      // Update
      updateReview(existingReview.id, { rating, comment, date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) });
      setAlertData({
        isOpen: true,
        type: "success",
        title: "Berhasil!",
        message: "Ulasan kamu berhasil diperbarui. Terima kasih!",
        confirmText: "Kembali ke Pesanan",
        onConfirm: () => navigate("/pesanan")
      });
    } else {
      // Create
      const newReview = {
        id: `REV-${Date.now()}`,
        orderId: order.id,
        customer: currentUser.namaLengkap || currentUser.username,
        rating,
        comment,
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        productImage: order.items[0]?.gambarProduk || null
      };
      addReview(newReview);
      setAlertData({
        isOpen: true,
        type: "success",
        title: "Terima Kasih!",
        message: "Ulasan kamu berhasil dikirim dan sangat berarti bagi kami.",
        confirmText: "Sama-sama!",
        onConfirm: () => navigate("/pesanan")
      });
    }
  };

  const handleDelete = () => {
    setAlertData({
      isOpen: true,
      type: "confirm",
      title: "Hapus Ulasan?",
      message: "Yakin ingin menghapus ulasan ini? Tindakan ini tidak bisa dibatalkan.",
      confirmText: "Ya, Hapus",
      cancelText: "Batal",
      onConfirm: () => {
        deleteReview(existingReview.id);
        navigate("/pesanan");
      }
    });
  };

  return (
    <div className="min-h-[90vh] bg-gradient-to-b from-pink-50/50 to-white pt-10 pb-20 relative">
      <CustomAlert {...alertData} onClose={closeAlert} />
      
      {/* Tombol Kembali - Style disamakan dengan KeranjangPage dll */}
      <button
        onClick={() => navigate("/pesanan")}
        className="absolute top-6 left-4 sm:top-10 sm:left-10 inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-pink-500 hover:text-white text-pink-600 font-bold text-xs rounded-full shadow-sm border border-pink-200 transition-all duration-300 cursor-pointer hover:shadow-md hover:-translate-x-1 z-10"
      >
        <ArrowLeft size={16} />
        <span className="hidden sm:inline">Kembali</span>
      </button>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 sm:pt-4">
        <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-xl shadow-pink-200 border border-pink-200 relative overflow-hidden">
          
          {/* Ornamen dekorasi */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10 text-center mb-10">
            <h1 className="font-cursive text-4xl sm:text-5xl font-bold text-pink-700 mb-2">
              {existingReview ? "Edit Ulasan Kamu" : "Bagaimana Bunga Kami?"}
            </h1>
            <p className="text-pink-400 font-medium text-sm">Ceritakan pengalamanmu berbelanja di Bloom & Bouquet</p>
          </div>

          {/* Grid Layout Horizontal */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
            
            {/* Bagian Kiri: Info Produk */}
            <div className="md:col-span-2 flex flex-col bg-gradient-to-br from-pink-50 to-white p-6 rounded-3xl border border-pink-200 shadow-md shadow-pink-200/50 h-full justify-center text-center">
              <div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-2xl bg-white shadow-md shadow-pink-200/40 border-4 border-white overflow-hidden mb-6 group">
                {order.items[0] && (
                  <img 
                    src={order.items[0].gambarProduk} 
                    alt="Produk" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                )}
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-2 leading-tight">
                {order.items[0]?.namaProduk}
              </h3>
              {order.items.length > 1 && (
                <p className="text-sm text-pink-500 font-medium mb-3">+ {order.items.length - 1} barang lainnya</p>
              )}
              <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-pink-100 mx-auto mt-auto">
                <span className="text-xs text-gray-500">ID Pesanan:</span>
                <span className="text-xs font-bold text-pink-700">{order.id}</span>
              </div>
            </div>

            {/* Bagian Kanan: Form Ulasan */}
            <div className="md:col-span-3 flex flex-col h-full justify-center">
              <form onSubmit={handleSubmit} className="space-y-8 bg-white p-2">
                <div>
                  <label className="block text-sm font-bold text-pink-600 mb-4 text-center md:text-left">Berikan Penilaian Bintang</label>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 sm:p-2 transition-transform hover:scale-110 focus:outline-none"
                      >
                        <Star 
                          size={42} 
                          className={`transition-colors duration-200 ${
                            (hoverRating || rating) >= star 
                              ? "text-yellow-400 fill-yellow-400" 
                              : "text-gray-200 fill-transparent"
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <p className="text-pink-600 font-bold mt-3 text-sm text-center md:text-left animate-in fade-in slide-in-from-left-2">
                      {rating === 1 && "Sangat Buruk 😞"}
                      {rating === 2 && "Buruk 😕"}
                      {rating === 3 && "Biasa Saja 😐"}
                      {rating === 4 && "Bagus! 🙂"}
                      {rating === 5 && "Sangat Memuaskan! 😍"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-pink-600 mb-3 text-center md:text-left">Tulis Komentar atau Pengalamanmu</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Misalnya: Bunganya segar banget, pengirimannya cepat, pacarku suka..."
                    className="w-full h-36 p-4 rounded-2xl bg-pink-50/30 border border-pink-200 focus:bg-white focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition resize-none outline-none text-sm text-pink-800 placeholder-pink-300 shadow-inner"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-4 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white rounded-xl font-bold shadow-md shadow-pink-200 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                  >
                    {existingReview ? <Edit2 size={18} /> : <Send size={18} />}
                    {existingReview ? "Simpan Perubahan" : "Kirim Ulasan"}
                  </button>
                  
                  {existingReview && (
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="w-full sm:w-auto py-4 px-8 bg-white hover:bg-red-50 text-red-500 hover:text-red-600 rounded-xl font-bold border border-red-200 hover:border-red-300 shadow-sm flex items-center justify-center gap-2 transition-all"
                    >
                      <Trash2 size={18} />
                      Hapus
                    </button>
                  )}
                </div>
              </form>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default TulisUlasanPage;
