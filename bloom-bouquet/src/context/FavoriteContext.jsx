import { createContext, useState, useEffect, useContext } from "react";
import CustomAlert from "../Components/CustomAlert";
import { AuthContext } from "./AuthContext";

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loadedUser, setLoadedUser] = useState(null);

  // Load wishlist saat currentUser berubah
  useEffect(() => {
    if (currentUser && currentUser.username) {
      const saved = localStorage.getItem(`wishlist_${currentUser.username}`);
      let loadedWishlist = saved ? JSON.parse(saved) : [];

      // Cek apakah ada favorit yang tertunda (belum login)
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
  useEffect(() => {
    if (currentUser && currentUser.username && loadedUser === currentUser.username) {
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
