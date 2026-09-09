/**
 * FILE: src/context/AuthContext.jsx
 * TUJUAN: Mengelola state global autentikasi pengguna (status login, data profil, fungsi login/register).
 * KETERHUBUNGAN: Digunakan oleh hampir seluruh komponen yang membutuhkan data pengguna (seperti `Header`, `Login`, dll).
 */

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
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
    const saved = localStorage.getItem("adminProfile");
    if (saved) {
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
    const saved = localStorage.getItem("registeredUsers");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("adminProfile", JSON.stringify(adminProfile));
  }, [adminProfile]);

  useEffect(() => {
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