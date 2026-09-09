import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, Users, BarChart2, User, Menu, LogOut } from "lucide-react";
import CustomAlert from "../../Components/CustomAlert";

const LayoutAdmin = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const [alertData, setAlertData] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
    confirmText: "Oke",
    cancelText: "",
    onConfirm: null,
    onCancel: null
  });

  const showAlert = (type, title, message = "", onConfirm, onCancel, confirmText = "Oke", cancelText = "") => {
    setAlertData({
      isOpen: true,
      type,
      title,
      message,
      onConfirm: onConfirm || (() => setAlertData(prev => ({ ...prev, isOpen: false }))),
      onCancel,
      confirmText,
      cancelText
    });
  };

  const closeAlert = () => setAlertData(prev => ({ ...prev, isOpen: false }));

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key && e.key.startsWith("orders_") && e.newValue) {
        // Cek jika jumlah pesanan bertambah (pesanan baru)
        try {
          const oldData = e.oldValue ? JSON.parse(e.oldValue) : [];
          const newData = JSON.parse(e.newValue);
          if (newData.length > oldData.length) {
            showAlert("success", "Notifikasi Pesanan Baru! 📦", "Ada pesanan baru dari pelanggan yang menunggu untuk diproses.", () => closeAlert(), null, "Tutup");
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="bg-pink-50/30 font-sans">
      {/* Konten Utama */}
      <main className="p-6 md:p-8 lg:p-10 w-full relative animate-fadeIn transition-all duration-300">
        {/* Dekorasi Latar (dibungkus untuk menghindari overflow tanpa memotong konten utama) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <Outlet context={{ showAlert }} />
        </div>
      </main>

      {/* Komponen Modal/Toast Alert Global untuk Admin */}
      <CustomAlert
        isOpen={alertData.isOpen}
        type={alertData.type}
        title={alertData.title}
        message={alertData.message}
        onConfirm={alertData.onConfirm}
        onCancel={alertData.onCancel}
        confirmText={alertData.confirmText}
        cancelText={alertData.cancelText}
        showCancel={!!alertData.onCancel}
        onClose={closeAlert}
      />
    </div>
  );
};

export default LayoutAdmin;
