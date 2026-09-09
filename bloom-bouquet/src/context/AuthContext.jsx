/**
 * FILE: src/context/AuthContext.jsx
 * TUJUAN: Mengelola state global autentikasi pengguna (status login, data profil, fungsi login/register).
 * KETERHUBUNGAN: Digunakan oleh hampir seluruh komponen yang membutuhkan data pengguna (seperti `Header`, `Login`, dll).
 */

// [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    // [DI LUAR MODUL] localStorage.getItem: Mengambil data dari memori browser lokal.
    const saved = localStorage.getItem("currentUser");
    // [DI LUAR MODUL] JSON.parse: Mengubah data string dari localStorage kembali menjadi objek JavaScript.
    return saved ? JSON.parse(saved) : null;
  });

  const [adminProfile, setAdminProfile] = useState(() => {
    const defaultAdmin = { 
      username: "adminbnb",
      password: "blooming",
      fullName: "Admin Utama", 
      email: "admin@bloombouquet.id", 
      phone: "+62 812-3456-7890", 
      bio: "Halo, saya admin utama yang mengurus semua pesanan dan produk bunga di Bloom & Bouquet!" 
    };
    // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
    const saved = localStorage.getItem("adminProfile");
    if (saved) {
      // [DI LUAR MODUL] JSON.parse: Mengubah string JSON kembali menjadi objek JavaScript.
      const parsed = JSON.parse(saved);
      if (!parsed.password) {
        parsed.username = "adminbnb";
        parsed.password = "blooming";
      }
      return { ...defaultAdmin, ...parsed };
    }
    return defaultAdmin;
  });

  const [usersList, setUsersList] = useState(() => {
    // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
    const saved = localStorage.getItem("registeredUsers");
    // [DI LUAR MODUL] JSON.parse: Mengubah string JSON kembali menjadi objek JavaScript.
    return saved ? JSON.parse(saved) : [];
  });

  // [DI LUAR MODUL] useEffect: Hook ini mengeksekusi kode secara otomatis setiap kali nilai state (dependencies array) berubah.
  // Di sini digunakan untuk otomatis menyimpan data terbaru ke localStorage tanpa harus dipanggil manual.
  // [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
  useEffect(() => {
    // [DI LUAR MODUL] JSON.stringify: Mengubah objek JS menjadi string agar bisa disimpan di localStorage.
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  // [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
  useEffect(() => {
    // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
    // [DI LUAR MODUL] JSON.stringify: Mengubah objek JS menjadi string JSON (karena Storage API hanya menerima string).
    localStorage.setItem("adminProfile", JSON.stringify(adminProfile));
  }, [adminProfile]);

  // [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
  useEffect(() => {
    // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
    // [DI LUAR MODUL] JSON.stringify: Mengubah objek JS menjadi string JSON (karena Storage API hanya menerima string).
    localStorage.setItem("registeredUsers", JSON.stringify(usersList));
  }, [usersList]);

  const register = (userData) => {
    const isExist = usersList.some((u) => u.username === userData.username);
    if (isExist) {
      return { success: false, message: "Username sudah terdaftar!" };
    }
    const newUser = { ...userData, role: "user" };
    setUsersList((prev) => [...prev, newUser]);
    return { success: true, message: "Registrasi berhasil! Silakan login." };
  };

  const login = (username, password) => {
    // Kredensial Khusus Admin
    if (username === adminProfile.username && password === adminProfile.password) {
      const adminData = { ...adminProfile, role: "admin" };
      setCurrentUser(adminData);
      return { success: true, role: "admin", message: "Login Admin berhasil!" };
    }

    // Kredensial Customer Biasa
    const user = usersList.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      const customerData = { ...user, role: "user" };
      setCurrentUser(customerData);
      return { success: true, role: "user", message: "Login berhasil!" };
    }

    return { success: false, message: "Username atau password salah!" };
  };

  const logout = () => {
    setCurrentUser(null);
    // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
    localStorage.removeItem("currentUser");
  };

  const updateProfile = (updatedData) => {
    if (currentUser.role === "admin") {
      setAdminProfile((prev) => ({ ...prev, ...updatedData }));
      setCurrentUser((prev) => ({ ...prev, ...updatedData }));
    } else {
      // 1. Perbarui data yang sedang aktif (sesi saat ini)
      setCurrentUser((prev) => ({ ...prev, ...updatedData }));

      // 2. Perbarui data di "database" localStorage agar tidak hilang saat relogin
      setUsersList((prev) =>
        prev.map((user) =>
          user.username === currentUser.username
            ? { ...user, ...updatedData }
            : user
        )
      );
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, adminProfile, register, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};