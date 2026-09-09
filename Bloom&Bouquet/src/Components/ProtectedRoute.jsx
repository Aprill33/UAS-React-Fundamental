/**
 * FILE: src/Components/ProtectedRoute.jsx
 * TUJUAN: Wrapper komponen (High-Order Component) untuk membatasi akses halaman tertentu (misalnya halaman admin).
 * KETERHUBUNGAN: Menggunakan `AuthContext` untuk memvalidasi hak akses (role) pengguna.
 */

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/masuk" replace />;
  }

  if (allowedRole && currentUser.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;