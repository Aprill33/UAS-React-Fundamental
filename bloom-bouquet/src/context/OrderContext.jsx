import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const OrderContext = createContext();

export const sendNotification = (target, message, customer = null) => {
  const key = target === "admin" ? "notif_admin" : `notif_user_${target}`;
  const saved = localStorage.getItem(key);
  let notifs = saved ? JSON.parse(saved) : [];
  notifs.unshift({
    id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    message,
    customer,
    date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", hour: "2-digit", minute:"2-digit" }),
    read: false
  });
  localStorage.setItem(key, JSON.stringify(notifs));
  window.dispatchEvent(new Event("storage"));
};

export const OrderProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loadedUser, setLoadedUser] = useState(null);

  useEffect(() => {
    const currentUsername = currentUser?.username;
    if (currentUsername) {
      const saved = localStorage.getItem(`orders_${currentUsername}`);
      setOrders(saved ? JSON.parse(saved) : []);
      setLoadedUser(currentUsername);
    } else {
      setOrders([]);
      setLoadedUser(null);
    }
  }, [currentUser?.username]);

  useEffect(() => {
    if (currentUser && currentUser.username && loadedUser === currentUser.username) {
      localStorage.setItem(`orders_${currentUser.username}`, JSON.stringify(orders));
    }
  }, [orders, currentUser, loadedUser]);

  const addOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
    
    sendNotification("admin", `Pesanan baru dari pelanggan ${currentUser?.username || "Pelanggan"} sejumlah Rp ${(order.totalHarga || order.totalAsli || 0).toLocaleString("id-ID")}. Segera konfirmasi pesanan ini!`, currentUser?.username || "Pesanan Baru");
    
    if (order.items && order.items.length > 0) {
      const savedFlowers = localStorage.getItem("customFlowersData");
      if (savedFlowers) {
        try {
          const parsedFlowers = JSON.parse(savedFlowers);
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
            localStorage.setItem("customFlowersData", JSON.stringify(newFlowers));
            window.dispatchEvent(new Event("stockUpdated"));
          }
        } catch (e) {
          console.error("Gagal mengupdate stok:", e);
        }
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
      const savedFlowers = localStorage.getItem("customFlowersData");
      if (savedFlowers) {
        try {
          const parsedFlowers = JSON.parse(savedFlowers);
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
            localStorage.setItem("customFlowersData", JSON.stringify(newFlowers));
            window.dispatchEvent(new Event("stockUpdated"));
          }
        } catch (e) {
          console.error("Gagal mengembalikan stok:", e);
        }
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
