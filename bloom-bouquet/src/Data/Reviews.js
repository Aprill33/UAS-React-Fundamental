/**
 * FILE: /src/Data/Reviews.js
 * TUJUAN: Komponen/File pendukung aplikasi.
 * KETERHUBUNGAN: Terintegrasi dengan komponen induk dan menggunakan Context API atau Hooks untuk mengelola datanya.
 */

import buketMawarMerah from "../assets/buketmawarmerah.jpg";
import lilyPink from "../assets/lilypink.jpg";
import fqMerahPink from "../assets/flowerbouqet_campur_merahpink.jpg";
import daisy1 from "../assets/daisy1.jpg";
import sunflowers from "../assets/sunflowers.jpg";
import fbxMawarPink from "../assets/flowerbox_mawar_pink.jpg";

export const dummyReviews = [
  {
    id: "REV-001",
    orderId: "DUMMY-ORD-1",
    customer: "Nayana",
    rating: 5,
    comment: "Bunganya masih sangat segar saat sampai! Warnanya cantik banget dan wanginya semerbak. Pacar saya sangat suka dengan buketnya. Pelayanan juga ramah dan pengiriman tepat waktu. Terima kasih Bloom & Bouquet!",
    date: "5 September 2026",
    productImage: buketMawarMerah
  },
  {
    id: "REV-002",
    orderId: "DUMMY-ORD-2",
    customer: "Mahesa",
    rating: 4,
    comment: "Secara keseluruhan bagus, rangkaian rapi dan sesuai dengan foto di website. Hanya saja pengiriman sedikit terlambat dari estimasi, tapi masih bisa dimaklumi. Bunga lily pink-nya sangat cantik dan wangi.",
    date: "2 September 2026",
    productImage: lilyPink
  },
  {
    id: "REV-003",
    orderId: "DUMMY-ORD-3",
    customer: "Jaemima",
    rating: 5,
    comment: "Luar biasa! Saya pesan buket custom untuk acara wisuda sahabat dan hasilnya melebihi ekspektasi. Perpaduan warna bunganya sangat pas dan terlihat elegan. Sangat direkomendasikan!",
    date: "28 Agustus 2026",
    productImage: fqMerahPink
  },
  {
    id: "REV-004",
    orderId: "DUMMY-ORD-4",
    customer: "Juno",
    rating: 5,
    comment: "Kualitas bunga sangat terjamin. Bunga daisy-nya wangi banget dan tahan lama tidak cepat layu meskipun ditaruh di ruangan ber-AC.",
    date: "15 Agustus 2026",
    productImage: daisy1
  },
  {
    id: "REV-005",
    orderId: "DUMMY-ORD-5",
    customer: "Sharleen",
    rating: 4,
    comment: "Cantik banget buketnya! Bunga mataharinya cerah banget dan segar. Cuma ukuran pitanya ternyata lebih besar dari perkiraan saya. Tapi secara keseluruhan sangat memuaskan.",
    date: "10 Agustus 2026",
    productImage: sunflowers
  },
  {
    id: "REV-006",
    orderId: "DUMMY-ORD-6",
    customer: "Hiraya",
    rating: 5,
    comment: "Selalu puas belanja bunga di sini. Ini pesanan ketiga saya dan kualitasnya selalu konsisten. Flower box mawar pink-nya sangat elegan, cocok banget buat ngasih kejutan ke orang tersayang!",
    date: "1 Agustus 2026",
    productImage: fbxMawarPink
  }
];
