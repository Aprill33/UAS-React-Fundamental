/**
 * FILE: /src/context/OrderContext.jsx
 * TUJUAN: Context API untuk menyediakan state global (Global State Management).
 * KETERHUBUNGAN: Terintegrasi dengan komponen induk dan menggunakan Context API atau Hooks untuk mengelola datanya.
 */

// [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { flowers } from "../Data/Flowers";
import { formatRupiah } from "../utils/formatCurrency";

export const OrderContext = createContext();

export const sendNotification = (target, message, customer = null) => {
  const key = target === "admin" ? "notif_admin" : `notif_user_${target}`;
  // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
  const saved = localStorage.getItem(key);
  // [DI LUAR MODUL] JSON.parse: Mengubah string JSON kembali menjadi objek JavaScript.
  let notifs = saved ? JSON.parse(saved) : [];
  notifs.unshift({
    id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    message,
    customer,
    date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", hour: "2-digit", minute:"2-digit" }),
    read: false
  });
  // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
  // [DI LUAR MODUL] JSON.stringify: Mengubah objek JS menjadi string JSON (karena Storage API hanya menerima string).
  localStorage.setItem(key, JSON.stringify(notifs));
  window.dispatchEvent(new Event("storage"));
};

export const OrderProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loadedUser, setLoadedUser] = useState(null);

  // [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
  useEffect(() => {
    const currentUsername = currentUser?.username;
    if (currentUsername) {
      // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
      const saved = localStorage.getItem(`orders_${currentUsername}`);
      // [DI LUAR MODUL] JSON.parse: Mengubah string JSON kembali menjadi objek JavaScript.
      setOrders(saved ? JSON.parse(saved) : []);
      setLoadedUser(currentUsername);
    } else {
      setOrders([]);
      setLoadedUser(null);
    }
  }, [currentUser?.username]);

  // [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
  useEffect(() => {
    if (currentUser && currentUser.username && loadedUser === currentUser.username) {
      // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
      // [DI LUAR MODUL] JSON.stringify: Mengubah objek JS menjadi string JSON (karena Storage API hanya menerima string).
      localStorage.setItem(`orders_${currentUser.username}`, JSON.stringify(orders));
    }
  }, [orders, currentUser, loadedUser]);

  const addOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
    
    sendNotification("admin", `Pesanan baru dari pelanggan ${currentUser?.username || "Pelanggan"} sejumlah ${formatRupiah(order.totalHarga || order.totalAsli || 0)}. Segera konfirmasi pesanan ini!`, currentUser?.username || "Pesanan Baru");
    
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
              stok: Math.max(0, flower.stok - orderedItem.qty)
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
        console.error("Gagal mengupdate stok:", e);
      }
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const cancelOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "Dibatalkan" } : order
      )
    );

    const orderToCancel = orders.find((o) => o.id === orderId);
    if (orderToCancel && orderToCancel.items && orderToCancel.items.length > 0) {
      try {
        // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
        const savedFlowers = localStorage.getItem("customFlowersData");
        // [DI LUAR MODUL] JSON.parse: Mengubah string JSON kembali menjadi objek JavaScript.
        const parsedFlowers = savedFlowers ? JSON.parse(savedFlowers) : flowers;
        let updated = false;
        
        const newFlowers = parsedFlowers.map((flower) => {
          const orderedItem = orderToCancel.items.find((item) => item.id === flower.id);
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

    sendNotification("admin", `Pelanggan ${currentUser?.username || "Pelanggan"} telah membatalkan pesanan (ID: ${orderId}).`, currentUser?.username || "Pembatalan Pesanan");
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const getAllAdminOrders = () => {
  let allOrders = [];
  // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
  for (let i = 0; i < localStorage.length; i++) {
    // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
    const key = localStorage.key(i);
    if (key && key.startsWith("orders_")) {
      try {
        // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
        // [DI LUAR MODUL] JSON.parse: Mengubah string JSON kembali menjadi objek JavaScript.
        const userOrders = JSON.parse(localStorage.getItem(key));
        if (Array.isArray(userOrders)) {
          const username = key.replace("orders_", "");
          const ordersWithCustomer = userOrders.map(o => ({
            ...o,
            customer: o.customer || username
          }));
          allOrders = [...allOrders, ...ordersWithCustomer];
        }
      } catch (e) {
        console.error("Gagal mem-parsing orders untuk", key);
      }
    }
  }
  // Sort descending by id/time for consistency
  return allOrders.sort((a, b) => b.id.localeCompare(a.id));
};
