/**
 * FILE: src/App.jsx
 * TUJUAN: Root komponen aplikasi yang mengatur routing (navigasi) seluruh halaman.
 * KETERHUBUNGAN: 
 *  - Membungkus seluruh aplikasi dengan `AuthProvider` dan `CartProvider`.
 *  - Menggunakan `react-router-dom` untuk mendefinisikan URL (seperti /home, /flowers, /cart).
 *  - Terhubung dengan komponen `Header` dan `Footer` sebagai tata letak global.
 */

import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { FavoriteProvider } from "./context/FavoriteContext";
import { OrderProvider } from "./context/OrderContext";
import { VoucherProvider } from "./context/VoucherContext";
import { CustomBouquetProvider } from "./context/CustomBouquetContext";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ProtectedRoute from "./Components/ProtectedRoute";

import Home from "./Pages/Pelanggan/BerandaPage";
import FlowersPage from "./Pages/Pelanggan/DaftarBungaPage";
import FlowerMeaningsPage from "./Pages/Pelanggan/ArtiBungaPage"; 
import FlowerMeaningDetail from "./Pages/Pelanggan/DetailArtiBungaPage";
import BouquetBuilder from "./Pages/Pelanggan/RangkaiBuketPage";
import Cart from "./Pages/Pelanggan/KeranjangPage";
import CheckoutPage from "./Pages/Pelanggan/CheckoutPage";
import Favorites from "./Pages/Pelanggan/FavoritPage";
import Orders from "./Pages/Pelanggan/PesananSayaPage";
import Profile from "./Pages/Pelanggan/ProfilPelangganPage";

import Login from "./Pages/Otentikasi/LoginPage";
import Register from "./Pages/Otentikasi/RegisterPage";
import NotFound from "./Pages/Error/Error404Page";

// Admin
import LayoutAdmin from "./Pages/Admin/LayoutAdmin";
import BerandaAdminPage from "./Pages/Admin/BerandaAdminPage";
import DaftarProdukAdminPage from "./Pages/Admin/DaftarProdukAdminPage";
import FormProdukAdminPage from "./Pages/Admin/FormProdukAdminPage";
import BungaTerjualAdminPage from "./Pages/Admin/BungaTerjualAdminPage";
import DaftarPesananAdminPage from "./Pages/Admin/DaftarPesananAdminPage";
import DaftarVoucherAdminPage from "./Pages/Admin/DaftarVoucherAdminPage";
import ProfilAdminPage from "./Pages/Admin/ProfilAdminPage";
import PengaturanRangkaiAdminPage from "./Pages/Admin/PengaturanRangkaiAdminPage";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

function App() {
  return (
    <AuthProvider>
      <VoucherProvider>
        <FavoriteProvider>
          <CustomBouquetProvider>
            <CartProvider>
              <OrderProvider>
                <BrowserRouter>
                <ScrollToTop />
            
            <div className="min-h-screen bg-pink-50/30 font-sans text-gray-800 flex flex-col justify-between">
              <div>
                <Header />
                <main className="pb-12">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/bunga" element={<FlowersPage />} />
                    <Route path="/arti-bunga" element={<FlowerMeaningsPage />} />
                    <Route path="/bunga/:id" element={<FlowerMeaningDetail />} />
                    <Route path="/rangkai-buket" element={<BouquetBuilder />} />
                    <Route path="/masuk" element={<Login />} />
                    <Route path="/daftar" element={<Register />} />

                    {/* Protected Routes */}
                    <Route
                      path="/favorit"
                      element={
                        <ProtectedRoute allowedRole="user">
                          <Favorites />
                        </ProtectedRoute>
                      }
                    />
                  <Route
                    path="/profil"
                    element={
                      <ProtectedRoute allowedRole="user">
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/keranjang"
                    element={
                      <ProtectedRoute allowedRole="user">
                        <Cart />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute allowedRole="user">
                        <CheckoutPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pesanan"
                    element={
                      <ProtectedRoute allowedRole="user">
                        <Orders />
                      </ProtectedRoute>
                    }
                  />
                  
                  {/* Admin Nested Routes */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute allowedRole="admin">
                        <LayoutAdmin />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<BerandaAdminPage />} />
                    <Route path="produk" element={<DaftarProdukAdminPage />} />
                    <Route path="produk/tambah" element={<FormProdukAdminPage />} />
                    <Route path="produk/edit/:id" element={<FormProdukAdminPage />} />
                    <Route path="terjual" element={<BungaTerjualAdminPage />} />
                    <Route path="pesanan" element={<DaftarPesananAdminPage />} />
                    <Route path="voucher" element={<DaftarVoucherAdminPage />} />
                    <Route path="rangkai" element={<PengaturanRangkaiAdminPage />} />
                    <Route path="profil" element={<ProfilAdminPage />} />
                  </Route>

                  {/* Fallback Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
              </OrderProvider>
            </CartProvider>
          </CustomBouquetProvider>
        </FavoriteProvider>
      </VoucherProvider>
    </AuthProvider>
  );
}

export default App;