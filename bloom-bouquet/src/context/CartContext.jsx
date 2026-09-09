/**
 * FILE: src/context/CartContext.jsx
 * TUJUAN: Mengelola state global keranjang belanja (tambah barang, hapus barang, hitung total harga).
 * KETERHUBUNGAN: Digunakan oleh komponen `Cart.jsx`, tombol beli di katalog, dan ikon keranjang di `Header.jsx`.
 */

// [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
import { createContext, useState, useEffect, useContext } from "react";
import CustomAlert from "../Components/CustomAlert";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loadedUser, setLoadedUser] = useState(null);

  const [cartAlert, setCartAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "cart"
  });

  // [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
  useEffect(() => {
    const currentUsername = currentUser?.username;
    if (currentUsername) {
      // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
      const saved = localStorage.getItem(`cartItems_${currentUsername}`);
      // [DI LUAR MODUL] JSON.parse: Mengubah string JSON kembali menjadi objek JavaScript.
      let initialCart = saved ? JSON.parse(saved) : [];

      // [DI LUAR MODUL] sessionStorage: Menyimpan data sementara di browser (hilang saat tab ditutup).
      const pendingBouquetStr = sessionStorage.getItem("pendingBouquet");
      if (pendingBouquetStr) {
        try {
          // [DI LUAR MODUL] JSON.parse: Mengubah string JSON kembali menjadi objek JavaScript.
          const pending = JSON.parse(pendingBouquetStr);
          const toAdd = { ...pending, qty: pending.qty || 1 };
          initialCart.push(toAdd);
          // [DI LUAR MODUL] sessionStorage: Menyimpan data sementara di browser (hilang saat tab ditutup).
          sessionStorage.removeItem("pendingBouquet");

          setCartAlert({
            isOpen: true,
            title: "Masuk Keranjang!",
            message: `${pending.namaProduk} berhasil ditambahkan.`,
            type: "cart"
          });
          setTimeout(() => {
            setCartAlert((prev) => ({ ...prev, isOpen: false }));
          }, 3000);
        } catch (e) {
          console.error(e);
        }
      }

      setCartItems(initialCart);
      setLoadedUser(currentUsername);
    } else {
      setCartItems([]);
      setSelectedItems([]);
      setLoadedUser(null);
    }
  }, [currentUser?.username]);

  // [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
  useEffect(() => {
    // Hanya simpan jika keranjang sudah selesai dimuat untuk user yang bersangkutan
    if (currentUser && currentUser.username && loadedUser === currentUser.username) {
      // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
      // [DI LUAR MODUL] JSON.stringify: Mengubah objek JS menjadi string JSON (karena Storage API hanya menerima string).
      localStorage.setItem(`cartItems_${currentUser.username}`, JSON.stringify(cartItems));
    }
  }, [cartItems, currentUser, loadedUser]);

  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const exist = prevCart.find((item) => item.id === product.id);

      if (exist && product.stok !== undefined && exist.qty + 1 > product.stok) {
        setTimeout(() => {
          setCartAlert({
            isOpen: true,
            title: "Stok Terbatas!",
            message: `Maaf, stok ${product.namaProduk} hanya tersisa ${product.stok}.`,
            type: "cart"
          });
          setTimeout(() => setCartAlert(p => ({ ...p, isOpen: false })), 3000);
        }, 0);
        return prevCart;
      }

      setTimeout(() => {
        setCartAlert({
          isOpen: true,
          title: "Masuk Keranjang!",
          message: `${product.namaProduk || "Bunga cantikmu"} berhasil ditambahkan.`,
          type: "cart"
        });
        setTimeout(() => {
          setCartAlert((prev) => ({ ...prev, isOpen: false }));
        }, 3000);
      }, 0);

      if (exist) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => {
      const itemToRemove = prev.find((item) => item.id === id);

      setCartAlert({
        isOpen: true,
        title: "Dihapus dari Keranjang",
        message: `${itemToRemove?.namaProduk || "Bunga"} telah dikeluarkan.`,
        type: "cart_remove"
      });
      setTimeout(() => {
        setCartAlert((prev) => ({ ...prev, isOpen: false }));
      }, 3000);

      return prev.filter((item) => item.id !== id);
    });
    setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
  };

  const updateQty = (id, delta) => {
    setCartItems((prev) => {
      let isOverStock = false;
      let overStockItemName = "";
      let overStockCount = 0;

      const nextCart = prev.map((item) => {
        if (item.id === id) {
          const newQty = item.qty + delta;
          if (delta > 0 && item.stok !== undefined && newQty > item.stok) {
            isOverStock = true;
            overStockItemName = item.namaProduk;
            overStockCount = item.stok;
            return item;
          }
          return newQty > 0 ? { ...item, qty: newQty } : null;
        }
        return item;
      }).filter(Boolean);

      if (isOverStock) {
        setTimeout(() => {
          setCartAlert({
            isOpen: true,
            title: "Stok Terbatas!",
            message: `Maaf, stok ${overStockItemName} hanya tersisa ${overStockCount}.`,
            type: "cart"
          });
          setTimeout(() => setCartAlert(p => ({ ...p, isOpen: false })), 3000);
        }, 0);
      }

      return nextCart;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setSelectedItems([]);
  };

  const removeSelectedFromCart = () => {
    setCartItems((prev) => prev.filter((item) => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const toggleSelection = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const toggleAllSelection = () => {
    if (selectedItems.length === cartItems.length && cartItems.length > 0) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  };

  const selectedCartItems = cartItems.filter((item) => selectedItems.includes(item.id));

  const totalAsli = selectedCartItems.reduce(
    (sum, item) => sum + item.harga * item.qty,
    0
  );

  const totalDiskon = selectedCartItems.reduce(
    (sum, item) => sum + (item.diskon ? (item.harga * item.diskon / 100) * item.qty : 0),
    0
  );

  const totalHarga = totalAsli - totalDiskon;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        selectedItems,
        setSelectedItems,
        toggleSelection,
        toggleAllSelection,
        removeSelectedFromCart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        totalAsli,
        totalDiskon,
        totalHarga,
      }}
    >
      <CustomAlert
        isOpen={cartAlert.isOpen}
        onClose={() => setCartAlert((prev) => ({ ...prev, isOpen: false }))}
        type={cartAlert.type}
        title={cartAlert.title}
        message={cartAlert.message}
      />
      {children}
    </CartContext.Provider>
  );
};