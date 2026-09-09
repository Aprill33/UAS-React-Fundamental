/**
 * FILE: /src/context/ReviewContext.jsx
 * TUJUAN: Context API untuk menyediakan state global (Global State Management).
 * KETERHUBUNGAN: Terintegrasi dengan komponen induk dan menggunakan Context API atau Hooks untuk mengelola datanya.
 */

// [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
import { createContext, useState, useEffect } from "react";
import { dummyReviews } from "../Data/Reviews";

export const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);

  // [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
  useEffect(() => {
    // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
    const saved = localStorage.getItem("reviews");
    // [DI LUAR MODUL] JSON.parse: Mengubah string JSON kembali menjadi objek JavaScript.
    let parsedSaved = saved ? JSON.parse(saved) : null;

    if (parsedSaved && parsedSaved.some(r => r.customer === "Siti Aminah" || r.customer === "Budi Santoso" || r.comment.includes("Bunga mawar merahnya sangat cantik") || r.comment.includes("Bunga lily-nya wangi banget"))) {
      // Keep any actual user reviews, but replace old dummy ones
      const userReviews = parsedSaved.filter(r => !r.id.startsWith("REV-00"));
      parsedSaved = [...userReviews, ...dummyReviews];
      // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
      // [DI LUAR MODUL] JSON.stringify: Mengubah objek JS menjadi string JSON (karena Storage API hanya menerima string).
      localStorage.setItem("reviews", JSON.stringify(parsedSaved));
    }

    if (parsedSaved) {
      setReviews(parsedSaved);
    } else {
      setReviews(dummyReviews);
      // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
      // [DI LUAR MODUL] JSON.stringify: Mengubah objek JS menjadi string JSON (karena Storage API hanya menerima string).
      localStorage.setItem("reviews", JSON.stringify(dummyReviews));
    }
  }, []);

  const addReview = (newReview) => {
    setReviews((prev) => {
      const updated = [newReview, ...prev]; // Add to beginning
      // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
      // [DI LUAR MODUL] JSON.stringify: Mengubah objek JS menjadi string JSON (karena Storage API hanya menerima string).
      localStorage.setItem("reviews", JSON.stringify(updated));
      return updated;
    });
  };

  const updateReview = (id, updatedData) => {
    setReviews((prev) => {
      const updated = prev.map(r => r.id === id ? { ...r, ...updatedData } : r);
      // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
      // [DI LUAR MODUL] JSON.stringify: Mengubah objek JS menjadi string JSON (karena Storage API hanya menerima string).
      localStorage.setItem("reviews", JSON.stringify(updated));
      return updated;
    });
  };

  const deleteReview = (id) => {
    setReviews((prev) => {
      const updated = prev.filter(r => r.id !== id);
      // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
      // [DI LUAR MODUL] JSON.stringify: Mengubah objek JS menjadi string JSON (karena Storage API hanya menerima string).
      localStorage.setItem("reviews", JSON.stringify(updated));
      return updated;
    });
  };

  const getReviewByOrderId = (orderId) => {
    return reviews.find(r => r.orderId === orderId);
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview, updateReview, deleteReview, getReviewByOrderId }}>
      {children}
    </ReviewContext.Provider>
  );
};
