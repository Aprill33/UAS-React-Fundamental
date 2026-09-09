/**
 * FILE: /src/context/FavoriteContext.jsx
 * TUJUAN: Context API untuk menyediakan state global (Global State Management).
 * KETERHUBUNGAN: Terintegrasi dengan komponen induk dan menggunakan Context API atau Hooks untuk mengelola datanya.
 */

// [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
import { createContext, useState, useEffect, useContext } from "react";
import CustomAlert from "../Components/CustomAlert";
import { AuthContext } from "./AuthContext";

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loadedUser, setLoadedUser] = useState(null);

  // Load wishlist saat currentUser berubah
  // [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
  useEffect(() => {
    if (currentUser && currentUser.username) {
      // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
      const saved = localStorage.getItem(`wishlist_${currentUser.username}`);
      // [DI LUAR MODUL] JSON.parse: Mengubah string JSON kembali menjadi objek JavaScript.
      let loadedWishlist = saved ? JSON.parse(saved) : [];

      // Cek apakah ada favorit yang tertunda (belum login)
      // [DI LUAR MODUL] sessionStorage: Menyimpan data sementara di browser (hilang saat tab ditutup).
      const pendingFavoriteRaw = sessionStorage.getItem("pendingFavorite");
      if (pendingFavoriteRaw) {
        // Konversi ke Number agar sesuai dengan tipe data id (integer)
        const pendingFavorite = isNaN(Number(pendingFavoriteRaw)) ? pendingFavoriteRaw : Number(pendingFavoriteRaw);
        
        if (!loadedWishlist.includes(pendingFavorite)) {
          loadedWishlist.push(pendingFavorite);
          // Tampilkan alert
          setFavoriteAlert({
            isOpen: true,
            title: "Ditambahkan ke Favorit!",
            message: "Bunga cantik ini sudah masuk ke daftar kesukaanmu."
          });
          setTimeout(() => {
            setFavoriteAlert((prevAlert) => ({ ...prevAlert, isOpen: false }));
          }, 3000);
        }
        // [DI LUAR MODUL] sessionStorage: Menyimpan data sementara di browser (hilang saat tab ditutup).
        sessionStorage.removeItem("pendingFavorite");
      }

      setWishlist(loadedWishlist);
      setLoadedUser(currentUser.username);
    } else {
      setWishlist([]); // kosongkan jika logout
      setLoadedUser(null);
    }
  }, [currentUser]);

  const [favoriteAlert, setFavoriteAlert] = useState({ isOpen: false, title: "", message: "" });

  // Simpan wishlist ke localStorage tiap ada perubahan (jika user login)
  // [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
  useEffect(() => {
    if (currentUser && currentUser.username && loadedUser === currentUser.username) {
      // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
      // [DI LUAR MODUL] JSON.stringify: Mengubah objek JS menjadi string JSON (karena Storage API hanya menerima string).
      localStorage.setItem(`wishlist_${currentUser.username}`, JSON.stringify(wishlist));
    }
  }, [wishlist, currentUser, loadedUser]);

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        // Jika dihapus dari wishlist
        setFavoriteAlert({
          isOpen: true,
          title: "Dihapus dari Favorit",
          message: "Bunga ini telah dikeluarkan dari daftar kesukaanmu."
        });
        setTimeout(() => {
          setFavoriteAlert((prevAlert) => ({ ...prevAlert, isOpen: false }));
        }, 3000);
        
        return prev.filter((id) => id !== productId);
      }
      
      // Jika ditambah ke wishlist
      setFavoriteAlert({
        isOpen: true,
        title: "Ditambahkan ke Favorit!",
        message: "Bunga cantik ini sudah masuk ke daftar kesukaanmu."
      });
      
      // Auto close alert setelah 3 detik
      setTimeout(() => {
        setFavoriteAlert((prevAlert) => ({ ...prevAlert, isOpen: false }));
      }, 3000);

      return [...prev, productId];
    });
  };

  return (
    <FavoriteContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
      <CustomAlert 
        isOpen={favoriteAlert.isOpen}
        onClose={() => setFavoriteAlert({ ...favoriteAlert, isOpen: false })}
        type="favorite"
        title={favoriteAlert.title}
        message={favoriteAlert.message}
      />
    </FavoriteContext.Provider>
  );
};
