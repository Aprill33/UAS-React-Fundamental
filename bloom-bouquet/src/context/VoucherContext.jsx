import { createContext, useState, useEffect } from "react";

export const VoucherContext = createContext();

export const VoucherProvider = ({ children }) => {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("vouchers");
    if (saved) {
      setVouchers(JSON.parse(saved));
    } else {
      // Default dummy vouchers
      const defaultVouchers = [
        { id: "1", code: "BLOOM10", type: "percent", value: 10, isActive: true },
        { id: "2", code: "POTONG20", type: "nominal", value: 20000, isActive: true },
      ];
      setVouchers(defaultVouchers);
      localStorage.setItem("vouchers", JSON.stringify(defaultVouchers));
    }
  }, []);

  const addVoucher = (newVoucher) => {
    setVouchers((prev) => {
      const updated = [...prev, newVoucher];
      localStorage.setItem("vouchers", JSON.stringify(updated));
      return updated;
    });
  };

  const removeVoucher = (id) => {
    setVouchers((prev) => {
      const updated = prev.filter(v => v.id !== id);
      localStorage.setItem("vouchers", JSON.stringify(updated));
      return updated;
    });
  };

  const toggleVoucherStatus = (id) => {
    setVouchers((prev) => {
      const updated = prev.map(v => v.id === id ? { ...v, isActive: !v.isActive } : v);
      localStorage.setItem("vouchers", JSON.stringify(updated));
      return updated;
    });
  };

  const checkVoucher = (code) => {
    return vouchers.find((v) => v.code.toUpperCase() === code.toUpperCase() && v.isActive);
  };

  return (
    <VoucherContext.Provider value={{ vouchers, addVoucher, removeVoucher, toggleVoucherStatus, checkVoucher }}>
      {children}
    </VoucherContext.Provider>
  );
};
