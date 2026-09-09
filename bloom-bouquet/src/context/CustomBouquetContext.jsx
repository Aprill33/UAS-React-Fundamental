/**
 * FILE: /src/context/CustomBouquetContext.jsx
 * TUJUAN: Context API untuk menyediakan state global (Global State Management).
 * KETERHUBUNGAN: Terintegrasi dengan komponen induk dan menggunakan Context API atau Hooks untuk mengelola datanya.
 */

// [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
import { createContext, useState, useEffect } from "react";
import {
  RoseAnimated,
  TulipAnimated,
  SunflowerAnimated,
  LilyAnimated,
  DaisyAnimated,
  OrchidAnimated,
} from "../Components/FlowerIcons";

export const CustomBouquetContext = createContext();

export const CustomBouquetProvider = ({ children }) => {
  // --- DEFAULT DATA ---
  // Data ini akan digunakan jika localStorage masih kosong
  const defaultWrappingOptions = [
    {
      id: "w1",
      nama: "Pastel Paper Bouquet",
      harga: 30000,
      type: "paper",
      colorOptions: ["Soft Pink", "Soft Blue", "Cream White", "Pastel Lilac", "Elegant Black"],
      ribbonOptions: ["Pita Pink", "Pita Putih", "Pita Gold"],
    },
    {
      id: "w2",
      nama: "Luxury Round Box",
      harga: 50000,
      type: "box",
      colorOptions: ["Rose Gold Box", "Pure White Box", "Matte Black Box"],
    },
    {
      id: "w3",
      nama: "Rustic Basket",
      harga: 45000,
      type: "basket",
      sizeOptions: [
        { size: "Small", extraHarga: 0 },
        { size: "Medium", extraHarga: 15000 },
        { size: "Large", extraHarga: 30000 },
      ],
    },
  ];

  const defaultFlowerCategories = [
    { id: "c1", nama: "Mawar", iconType: "RoseAnimated", iconColor: "merah" },
    { id: "c2", nama: "Tulip", iconType: "TulipAnimated", iconColor: "pink" },
    { id: "c3", nama: "Lily", iconType: "LilyAnimated", iconColor: "putih" },
    { id: "c4", nama: "Matahari", iconType: "SunflowerAnimated", iconColor: "" },
    { id: "c5", nama: "Daisy", iconType: "DaisyAnimated", iconColor: "" },
    { id: "c6", nama: "Anggrek", iconType: "OrchidAnimated", iconColor: "ungu" },
  ];

  const defaultFlowerOptions = [
    { id: "f1", category: "c1", nama: "Mawar Merah", harga: 15000, iconType: "RoseAnimated", iconColor: "merah" },
    { id: "f2", category: "c1", nama: "Mawar Putih", harga: 15000, iconType: "RoseAnimated", iconColor: "putih" },
    { id: "f3", category: "c1", nama: "Mawar Pink", harga: 15000, iconType: "RoseAnimated", iconColor: "pink" },
    { id: "f4", category: "c1", nama: "Mawar Kuning", harga: 15000, iconType: "RoseAnimated", iconColor: "kuning" },
    { id: "f5", category: "c2", nama: "Tulip Pink", harga: 20000, iconType: "TulipAnimated", iconColor: "pink" },
    { id: "f6", category: "c2", nama: "Tulip Putih", harga: 20000, iconType: "TulipAnimated", iconColor: "putih" },
    { id: "f7", category: "c3", nama: "Lily Pink", harga: 22000, iconType: "LilyAnimated", iconColor: "pink" },
    { id: "f8", category: "c3", nama: "Lily Putih", harga: 22000, iconType: "LilyAnimated", iconColor: "putih" },
    { id: "f9", category: "c4", nama: "Matahari", harga: 18000, iconType: "SunflowerAnimated", iconColor: "" },
    { id: "f10", category: "c5", nama: "Daisy Sweet", harga: 12000, iconType: "DaisyAnimated", iconColor: "" },
    { id: "f11", category: "c6", nama: "Anggrek Ungu", harga: 25000, iconType: "OrchidAnimated", iconColor: "ungu" },
    { id: "f12", category: "c6", nama: "Anggrek Pink", harga: 25000, iconType: "OrchidAnimated", iconColor: "pink" },
    { id: "f13", category: "c6", nama: "Anggrek Biru", harga: 25000, iconType: "OrchidAnimated", iconColor: "biru" },
  ];

  // --- STATES ---
  // Inisialisasi state dengan mencoba mengambil dari localStorage, jika tidak ada gunakan default
  const [wrappingOptions, setWrappingOptions] = useState(() => {
    // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
    const saved = localStorage.getItem("admin_wrappingOptions");
    // [DI LUAR MODUL] JSON.parse: Mengubah string JSON kembali menjadi objek JavaScript.
    return saved ? JSON.parse(saved) : defaultWrappingOptions;
  });

  const [flowerCategories, setFlowerCategories] = useState(() => {
    // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
    const saved = localStorage.getItem("admin_flowerCategories");
    // [DI LUAR MODUL] JSON.parse: Mengubah string JSON kembali menjadi objek JavaScript.
    return saved ? JSON.parse(saved) : defaultFlowerCategories;
  });

  const [flowerOptions, setFlowerOptions] = useState(() => {
    // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
    const saved = localStorage.getItem("admin_flowerOptions");
    // [DI LUAR MODUL] JSON.parse: Mengubah string JSON kembali menjadi objek JavaScript.
    return saved ? JSON.parse(saved) : defaultFlowerOptions;
  });

  // --- EFFECTS ---
  // Otomatis simpan ke localStorage setiap ada perubahan pada state
  // [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
  useEffect(() => {
    // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
    // [DI LUAR MODUL] JSON.stringify: Mengubah objek JS menjadi string JSON (karena Storage API hanya menerima string).
    localStorage.setItem("admin_wrappingOptions", JSON.stringify(wrappingOptions));
  }, [wrappingOptions]);

  // [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
  useEffect(() => {
    // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
    // [DI LUAR MODUL] JSON.stringify: Mengubah objek JS menjadi string JSON (karena Storage API hanya menerima string).
    localStorage.setItem("admin_flowerCategories", JSON.stringify(flowerCategories));
  }, [flowerCategories]);

  // [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
  useEffect(() => {
    // [DI LUAR MODUL] localStorage: Web Storage API untuk menyimpan data di browser secara persisten.
    // [DI LUAR MODUL] JSON.stringify: Mengubah objek JS menjadi string JSON (karena Storage API hanya menerima string).
    localStorage.setItem("admin_flowerOptions", JSON.stringify(flowerOptions));
  }, [flowerOptions]);

  // --- HELPER FUNCTION ---
  // Karena kita tidak bisa menyimpan komponen React ke dalam localStorage, 
  // kita simpan sebagai string (iconType) dan warna (iconColor).
  // Fungsi ini bertugas mengembalikan komponen SVG yang sesuai.
  const getFlowerComponent = (iconType, iconColor) => {
    switch (iconType) {
      case "RoseAnimated": return <RoseAnimated color={iconColor} />;
      case "TulipAnimated": return <TulipAnimated color={iconColor} />;
      case "LilyAnimated": return <LilyAnimated color={iconColor} />;
      case "SunflowerAnimated": return <SunflowerAnimated />;
      case "DaisyAnimated": return <DaisyAnimated />;
      case "OrchidAnimated": return <OrchidAnimated color={iconColor} />;
      default: return <RoseAnimated color="merah" />;
    }
  };

  // --- ACTIONS UTUK ADMIN ---
  const updateWrappingOption = (id, updatedData) => {
    setWrappingOptions(prev => prev.map(w => w.id === id ? { ...w, ...updatedData } : w));
  };

  const addWrappingColor = (id, newColor) => {
    setWrappingOptions(prev => prev.map(w => {
      if (w.id === id && w.colorOptions) {
        return { ...w, colorOptions: [...w.colorOptions, newColor] };
      }
      return w;
    }));
  };

  const addFlowerOption = (newFlower) => {
    setFlowerOptions(prev => [...prev, newFlower]);
  };

  const updateFlowerOption = (id, updatedData) => {
    setFlowerOptions(prev => prev.map(f => f.id === id ? { ...f, ...updatedData } : f));
  };

  const deleteFlowerOption = (id) => {
    setFlowerOptions(prev => prev.filter(f => f.id !== id));
  };

  return (
    <CustomBouquetContext.Provider 
      value={{ 
        wrappingOptions, 
        flowerCategories, 
        flowerOptions, 
        getFlowerComponent,
        updateWrappingOption,
        addWrappingColor,
        addFlowerOption,
        updateFlowerOption,
        deleteFlowerOption
      }}
    >
      {children}
    </CustomBouquetContext.Provider>
  );
};
