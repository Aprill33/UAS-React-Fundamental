/**
 * FILE: src/Data/Flowers.js
 * TUJUAN: File pusat (Database Lokal) yang menyimpan semua data statis untuk toko bunga.
 * KETERHUBUNGAN: Data dari file ini akan di-import dan digunakan oleh hampir semua halaman
 *                (Home, FlowersPage, FlowerMeaningDetail, dll) agar tidak ada redundansi/pengulangan kode.
 */

// Import Gambar dari Assets
import buketMawarMerah from "../assets/buketmawarmerah.jpg";
import buketMawarPink from "../assets/buketmawarpink.jpg";
import buketMawarPutih from "../assets/buketmawarputih.jpg";
import buketTulipMix from "../assets/bukettulipmix.jpg";
import buketTulipPink from "../assets/bukettulippink.jpg";
import buketTulipPutih from "../assets/bukettulipputih.jpg";
import anggrekBiru from "../assets/anggrekbiru.jpg";
import anggrekPink from "../assets/anggrekpink.jpg";
import anggrekUngu from "../assets/anggrekungu.jpg";
import daisy1 from "../assets/daisy1.jpg";
import daisy2 from "../assets/daisy2.jpg";
import lilyPink from "../assets/lilypink.jpg";
import lilyPutih from "../assets/lilyputih.jpg";
import sunflower2 from "../assets/sunflower2.jpg";
import sunflowers from "../assets/sunflowers.jpg";

// Background Hero
import heroBg1 from "../assets/background.jpg";
import heroBg2 from "../assets/background2.jpg";
import heroBg3 from "../assets/background3.jpg";

// Flower Basket
import fbCampur from "../assets/flowerbasket_campur.jpg";
import fbCampur1 from "../assets/flowerbasket_campur1.jpg";
import fbCampur2 from "../assets/flowerbasket_campur2.jpg";
import fbLilyPutih from "../assets/flowerbasket_lily_putih.jpg";
import fbMawarCampur from "../assets/flowerbasket_mawar_campur.jpg";
import fbMawarPinkPutih from "../assets/flowerbasket_mawar_pinkputih.jpg";
import fbMawarPutih from "../assets/flowerbasket_mawar_putih.jpg";
import fbMawarPutihKuning from "../assets/flowerbasket_mawar_putihkuning.jpg";
import fbSunflower from "../assets/flowerbasket_sunflower.jpg";
import fbCampurPutihBiru from "../assets/flowerbasket_campur_putihbiru.jpg";

// Flower Bouquet (Diperbaiki: Pakai bouqet sesuai nama file assets)
import fqMerahPink from "../assets/flowerbouqet_campur_merahpink.jpg";
import fqPutihBiru from "../assets/flowerbouqet_campur_putihbiru.jpg";
import fqPutihUngu from "../assets/flowerbouqet_campur_putihungu.jpg";
import fqCampur2 from "../assets/flowerbouqet_campur2.jpg";
import fqDaisyPutihBiru from "../assets/flowerbouqet_daisy_putihbiru.jpg";
import fqLilyPink from "../assets/flowerbouqet_liliypink.jpg";
import fqLilyPinkPutih from "../assets/flowerbouqet_lily_pinkputih.jpg";
import fqMawarMerah from "../assets/flowerbouqet_mawar_merah.jpg";
import fqMawarPinkPutih from "../assets/flowerbouqet_mawar_pinkputih.jpg";
import fqMawarPutih from "../assets/flowerbouqet_mawar_putih.jpg";
import fqMawarUngu from "../assets/flowerbouqet_mawar_ungu.jpg";
import fqTulipPutih from "../assets/flowerbouqet_tulip_putih.jpg";
import fqBiruKuning from "../assets/flowerbouqet_campur_birukuning.jpg";

// Flower Box
import fbxBlack from "../assets/flowerbox_black.jpg";
import fbxPutihBiru from "../assets/flowerbox_campur_putihbiru.jpg";
import fbxCampur1 from "../assets/flowerbox_campur1.jpg";
import fbxCampur2 from "../assets/flowerbox_campur2.jpg";
import fbxCampur3 from "../assets/flowerbox_campur3.jpg";
import fbxCampur4 from "../assets/flowerbox_campur4.jpg";
import fbxDaisy from "../assets/flowerbox_daisy.jpg";
import fbxMawarMerah from "../assets/flowerbox_mawar_merah.jpg";
import fbxMawarPink from "../assets/flowerbox_mawar_pink.jpg";
import fbxMawarPinkPutih from "../assets/flowerbox_mawar_pinkputih.jpg";
import fbxMawarUngu from "../assets/flowerbox_mawar_ungu.jpg";
import fbxMawarPinkAlt from "../assets/flowerbox_mawarpink.jpg";
import fbxPink from "../assets/flowerbox_pink.jpg";

//meaningflowers
import roseImg from "../assets/rose.png";
import tulipImg from "../assets/tulip.png";
import lilyImg from "../assets/lily.png";
import daisyImg from "../assets/daisy.png";
import orchidImg from "../assets/orchid.png";
import sunflowerImg from "../assets/bunga_matahari.png";

export const flowers = [
  // --- FLOWER BOUQUET ---
  { id: 1, namaProduk: "Classic Red Rose Bouquet", gambarProduk: buketMawarMerah, kategori: "Flower Bouquet", jenis: "Mawar", harga: 150000, rating: 4.9, stok: 15, statusProduk: "Best Seller", deskripsi: "Buket mawar merah klasik melambangkan cinta sejati dan keanggunan." },
  { id: 2, namaProduk: "Soft Pink Rose Bouquet", gambarProduk: buketMawarPink, kategori: "Flower Bouquet", jenis: "Mawar", harga: 145000, rating: 4.8, stok: 12, statusProduk: "Diskon", diskon: 15, deskripsi: "Buket mawar pink lembut cocok untuk momen manis bersama orang tersayang." },
  { id: 3, namaProduk: "Pure White Rose Bouquet", gambarProduk: buketMawarPutih, kategori: "Flower Bouquet", jenis: "Mawar", harga: 155000, rating: 4.7, stok: 8, statusProduk: "Stok Terbatas", deskripsi: "Mawar putih bersih melambangkan ketulusan dan kemurnian." },
  { id: 4, namaProduk: "Pink Tulip Bouquet", gambarProduk: buketTulipPink, kategori: "Flower Bouquet", jenis: "Tulip", harga: 175000, rating: 4.8, stok: 10, statusProduk: "Produk Baru", deskripsi: "Tulip pink segar pilihan impor dalam balutan buket cantik." },
  { id: 5, namaProduk: "White Tulip Bouquet", gambarProduk: buketTulipPutih, kategori: "Flower Bouquet", jenis: "Tulip", harga: 180000, rating: 4.9, stok: 7, statusProduk: "Stok Terbatas", deskripsi: "Tulip putih indah dengan kesan minimalis dan sangat elegan." },
  { id: 6, namaProduk: "Rainbow Tulip Mix Bouquet", gambarProduk: buketTulipMix, kategori: "Flower Bouquet", jenis: "Tulip", harga: 195000, rating: 4.8, stok: 14, statusProduk: "Best Seller", deskripsi: "Kombinasi warna-warni bunga tulip yang memberikan keceriaan penuh." },
  { id: 7, namaProduk: "Sweet Daisy Bouquet", gambarProduk: daisy1, kategori: "Flower Bouquet", jenis: "Daisy", harga: 110000, rating: 4.7, stok: 18, statusProduk: "Diskon", diskon: 10, deskripsi: "Bunga daisy segar memberikan tampilan manis dan penuh keceriaan." },
  { id: 8, namaProduk: "Daisy Delight Mix", gambarProduk: daisy2, kategori: "Flower Bouquet", jenis: "Daisy", harga: 120000, rating: 4.8, stok: 14, statusProduk: "Produk Baru", deskripsi: "Buket daisy cantik dan segar untuk hadiah kecil berkesan mendalam." },
  { id: 9, namaProduk: "Romantic Pink Lily Bouquet", gambarProduk: lilyPink, kategori: "Flower Bouquet", jenis: "Lily", harga: 170000, rating: 4.8, stok: 9, statusProduk: "Best Seller", deskripsi: "Bunga lily pink wangi dengan balutan kertas wrapping pastel." },
  { id: 10, namaProduk: "Elegant White Lily Bouquet", gambarProduk: lilyPutih, kategori: "Flower Bouquet", jenis: "Lily", harga: 175000, rating: 4.9, stok: 7, statusProduk: "Stok Terbatas", deskripsi: "Keanggunan lily putih segar dipadukan dengan daun hijau alami." },
  { id: 11, namaProduk: "Warm Sunshine Bouquet", gambarProduk: sunflowers, kategori: "Flower Bouquet", jenis: "Sunflower", harga: 125000, rating: 4.7, stok: 20, statusProduk: "Diskon", diskon: 20, deskripsi: "Bunga matahari mekar sempurna yang memberi kesan hangat dan bahagia." },
  { id: 12, namaProduk: "Golden Sunflower Bouquet", gambarProduk: sunflower2, kategori: "Flower Bouquet", jenis: "Sunflower", harga: 150000, rating: 4.9, stok: 10, statusProduk: "Best Seller", deskripsi: "Buket bunga matahari besar dipadu bunga pendamping yang anggun." },
  { id: 13, namaProduk: "Red Pink Passion Bouquet", gambarProduk: fqMerahPink, kategori: "Flower Bouquet", jenis: "Campur", harga: 185000, rating: 4.9, stok: 8, statusProduk: "Best Seller", deskripsi: "Buket bunga campuran bernuansa merah & pink yang romantis." },
  { id: 14, namaProduk: "Ocean Breeze Blue-White Bouquet", gambarProduk: fqPutihBiru, kategori: "Flower Bouquet", jenis: "Campur", harga: 190000, rating: 4.8, stok: 11, statusProduk: "Produk Baru", deskripsi: "Perpaduan bunga nuansa putih dan biru yang menenangkan." },
  { id: 15, namaProduk: "Purple Dream Bouquet", gambarProduk: fqPutihUngu, kategori: "Flower Bouquet", jenis: "Campur", harga: 180000, rating: 4.7, stok: 9, statusProduk: "Diskon", diskon: 10, deskripsi: "Kombinasi bunga cantik dalam balutan nuansa putih dan ungu." },
  { id: 16, namaProduk: "Pastel Fantasy Bouquet", gambarProduk: fqCampur2, kategori: "Flower Bouquet", jenis: "Campur", harga: 195000, rating: 4.9, stok: 13, statusProduk: "Best Seller", deskripsi: "Aneka jenis bunga segar warna pastel yang sangat manis." },
  { id: 17, namaProduk: "Blue Sky Daisy Bouquet", gambarProduk: fqDaisyPutihBiru, kategori: "Flower Bouquet", jenis: "Daisy", harga: 130000, rating: 4.6, stok: 15, statusProduk: "Diskon", diskon: 25, deskripsi: "Rangkaian daisy putih dan sentuhan warna biru yang unik." },
  { id: 18, namaProduk: "Pink Grace Lily Bouquet", gambarProduk: fqLilyPink, kategori: "Flower Bouquet", jenis: "Lily", harga: 185000, rating: 4.8, stok: 6, statusProduk: "Stok Terbatas", deskripsi: "Bunga lily pink cantik dalam kemasan buket premium." },
  { id: 19, namaProduk: "Lily Rose Harmony", gambarProduk: fqLilyPinkPutih, kategori: "Flower Bouquet", jenis: "Lily", harga: 210000, rating: 5.0, stok: 5, statusProduk: "Best Seller", deskripsi: "Perpaduan sempurna antara bunga lily dan mawar segar." },
  { id: 20, namaProduk: "Royal Crimson Rose Bouquet", gambarProduk: fqMawarMerah, kategori: "Flower Bouquet", jenis: "Mawar", harga: 165000, rating: 4.9, stok: 14, statusProduk: "Diskon", diskon: 15, deskripsi: "Buket mawar merah pekat berukuran besar yang amat menawan." },
  { id: 21, namaProduk: "Blush Pink White Rose Bouquet", gambarProduk: fqMawarPinkPutih, kategori: "Flower Bouquet", jenis: "Mawar", harga: 160000, rating: 4.8, stok: 10, statusProduk: "Produk Baru", deskripsi: "Perpaduan mawar pink dan putih yang sangat digemari." },
  { id: 22, namaProduk: "Ivory Pearl Rose Bouquet", gambarProduk: fqMawarPutih, kategori: "Flower Bouquet", jenis: "Mawar", harga: 170000, rating: 4.7, stok: 7, statusProduk: "Stok Terbatas", deskripsi: "Rangkaian mawar putih mewah bernuansa ivory." },
  { id: 23, namaProduk: "Velvet Purple Rose Bouquet", gambarProduk: fqMawarUngu, kategori: "Flower Bouquet", jenis: "Mawar", harga: 175000, rating: 4.8, stok: 9, statusProduk: "Ready Stock", deskripsi: "Mawar warna ungu eksotis yang memikat dan elegan." },
  { id: 24, namaProduk: "Pure White Tulip Simplicity", gambarProduk: fqTulipPutih, kategori: "Flower Bouquet", jenis: "Tulip", harga: 190000, rating: 4.9, stok: 8, statusProduk: "Stok Terbatas", deskripsi: "Buket tulip putih dengan penataan simetris nan elegan." },
  { id: 25, namaProduk: "Vibrant Blue-Yellow Bouquet", gambarProduk: fqBiruKuning, kategori: "Flower Bouquet", jenis: "Campur", harga: 180000, rating: 4.7, stok: 12, statusProduk: "Ready Stock", deskripsi: "Kombinasi warna biru dan kuning yang segar & kontras." },

  // --- FLOWER BOX ---
  { id: 26, namaProduk: "Mystic Black Flower Box", gambarProduk: fbxBlack, kategori: "Flower Box", jenis: "Campur", harga: 220000, rating: 4.9, stok: 6, statusProduk: "Stok Terbatas", deskripsi: "Bunga dalam kotak hitam eksklusif memberikan kesan modern." },
  { id: 27, namaProduk: "Ocean Breeze Bloom Box", gambarProduk: fbxPutihBiru, kategori: "Flower Box", jenis: "Campur", harga: 215000, rating: 4.8, stok: 8, statusProduk: "Produk Baru", deskripsi: "Kotak bunga berisi nuansa putih & biru yang mewah." },
  { id: 28, namaProduk: "Pastel Bloom Box Deluxe", gambarProduk: fbxCampur1, kategori: "Flower Box", jenis: "Campur", harga: 230000, rating: 4.9, stok: 5, statusProduk: "Best Seller", deskripsi: "Arrangement bunga pastel di dalam round box eksklusif." },
  { id: 29, namaProduk: "Sweet Sorbet Flower Box", gambarProduk: fbxCampur2, kategori: "Flower Box", jenis: "Campur", harga: 225000, rating: 4.8, stok: 9, statusProduk: "Ready Stock", deskripsi: "Kotak bunga kombinasi warna lembut nan manis." },
  { id: 30, namaProduk: "Peachy Sunset Flower Box", gambarProduk: fbxCampur3, kategori: "Flower Box", jenis: "Campur", harga: 235000, rating: 5.0, stok: 4, statusProduk: "Stok Terbatas", deskripsi: "Bunga segar warna peach dan oranye dalam bloom box." },
  { id: 31, namaProduk: "Garden Party Flower Box", gambarProduk: fbxCampur4, kategori: "Flower Box", jenis: "Campur", harga: 240000, rating: 4.9, stok: 7, statusProduk: "Best Seller", deskripsi: "Komposisi bunga taman segar lengkap dengan bunga matahari." },
  { id: 32, namaProduk: "Pure Daisy Bloom Box", gambarProduk: fbxDaisy, kategori: "Flower Box", jenis: "Daisy", harga: 165000, rating: 4.7, stok: 12, statusProduk: "Diskon", diskon: 10, deskripsi: "Daisy mekar tertata rapi di dalam kotak bulat putih." },
  { id: 33, namaProduk: "Red Rose Secret Box", gambarProduk: fbxMawarMerah, kategori: "Flower Box", jenis: "Mawar", harga: 250000, rating: 5.0, stok: 6, statusProduk: "Best Seller", deskripsi: "Kotak mawar merah penuh yang melambangkan ketulusan cinta." },
  { id: 34, namaProduk: "Pink Passion Rose Box", gambarProduk: fbxMawarPink, kategori: "Flower Box", jenis: "Mawar", harga: 230000, rating: 4.8, stok: 10, statusProduk: "Diskon", diskon: 20, deskripsi: "Mawar pink segar dalam bentuk bloom box cantik." },
  { id: 35, namaProduk: "Blushing Rose & White Box", gambarProduk: fbxMawarPinkPutih, kategori: "Flower Box", jenis: "Mawar", harga: 240000, rating: 4.9, stok: 8, statusProduk: "Produk Baru", deskripsi: "Perpaduan mawar pink & putih dalam susunan kotak estetik." },
  { id: 36, namaProduk: "Violet Majesty Rose Box", gambarProduk: fbxMawarUngu, kategori: "Flower Box", jenis: "Mawar", harga: 245000, rating: 4.8, stok: 5, statusProduk: "Stok Terbatas", deskripsi: "Mawar ungu mewah tersusun anggun di dalam bloom box." },
  { id: 37, namaProduk: "Soft Pink Romance Box", gambarProduk: fbxMawarPinkAlt, kategori: "Flower Box", jenis: "Mawar", harga: 220000, rating: 4.7, stok: 11, statusProduk: "Ready Stock", deskripsi: "Bloom box mawar pink bernuansa manis dan elegan." },
  { id: 38, namaProduk: "Sweet Pink Carnation & Rose Box", gambarProduk: fbxPink, kategori: "Flower Box", jenis: "Campur", harga: 210000, rating: 4.8, stok: 9, statusProduk: "Produk Baru", deskripsi: "Sentuhan bunga pink lembut dipadu pita satin cantik." },

  // --- FLOWER BASKET ---
  { id: 39, namaProduk: "Rustic Garden Basket", gambarProduk: fbCampur, kategori: "Flower Basket", jenis: "Campur", harga: 260000, rating: 4.9, stok: 7, statusProduk: "Best Seller", deskripsi: "Keranjang anyaman berisi rangkaian bunga segar gaya rustic." },
  { id: 40, namaProduk: "Sunshine Garden Basket", gambarProduk: fbCampur1, kategori: "Flower Basket", jenis: "Campur", harga: 270000, rating: 4.8, stok: 6, statusProduk: "Diskon", diskon: 15, deskripsi: "Keranjang bunga cerah dengan sentuhan bunga matahari." },
  { id: 41, namaProduk: "Blush Harmony Basket", gambarProduk: fbCampur2, kategori: "Flower Basket", jenis: "Campur", harga: 265000, rating: 4.9, stok: 5, statusProduk: "Stok Terbatas", deskripsi: "Rangkaian bunga pastel di dalam keranjang kayu manis." },
  { id: 42, namaProduk: "White Lily Basket Delight", gambarProduk: fbLilyPutih, kategori: "Flower Basket", jenis: "Lily", harga: 280000, rating: 5.0, stok: 4, statusProduk: "Best Seller", deskripsi: "Keranjang bunga berisi lily putih anggun bernuansa murni." },
  { id: 43, namaProduk: "Mixed Rose Garden Basket", gambarProduk: fbMawarCampur, kategori: "Flower Basket", jenis: "Mawar", harga: 275000, rating: 4.9, stok: 8, statusProduk: "Diskon", diskon: 10, deskripsi: "Aneka mawar pilihan di dalam keranjang cantik berpita." },
  { id: 44, namaProduk: "Pink White Rose Basket", gambarProduk: fbMawarPinkPutih, kategori: "Flower Basket", jenis: "Mawar", harga: 270000, rating: 4.8, stok: 9, statusProduk: "Produk Baru", deskripsi: "Keranjang mawar kombinasi warna pink dan putih." },
  { id: 45, namaProduk: "Pure White Rose Basket", gambarProduk: fbMawarPutih, kategori: "Flower Basket", jenis: "Mawar", harga: 265000, rating: 4.7, stok: 6, statusProduk: "Stok Terbatas", deskripsi: "Mawar putih segar dalam susunan keranjang elegan." },
  { id: 46, namaProduk: "Yellow Sun Rose Basket", gambarProduk: fbMawarPutihKuning, kategori: "Flower Basket", jenis: "Mawar", harga: 260000, rating: 4.8, stok: 10, statusProduk: "Ready Stock", deskripsi: "Keranjang mawar warna kuning-putih yang memikat." },
  { id: 47, namaProduk: "Sunflower Joy Basket", gambarProduk: fbSunflower, kategori: "Flower Basket", jenis: "Sunflower", harga: 255000, rating: 4.9, stok: 8, statusProduk: "Best Seller", deskripsi: "Bunga matahari mekar segar tersusun rapi di keranjang." },
  { id: 48, namaProduk: "Sapphire Blue-White Basket", gambarProduk: fbCampurPutihBiru, kategori: "Flower Basket", jenis: "Campur", harga: 285000, rating: 4.9, stok: 5, statusProduk: "Stok Terbatas", deskripsi: "Keranjang bunga mewah nuansa warna biru sapphire & putih." },
  { id: 49, namaProduk: "Blue Orchid Pot Arrangement", gambarProduk: anggrekBiru, kategori: "Flower Basket", jenis: "Anggrek", harga: 290000, rating: 4.8, stok: 7, statusProduk: "Ready Stock", deskripsi: "Anggrek biru unik dalam pot dekoratif yang menawan." },
  { id: 50, namaProduk: "Pink Orchid Pot Delight", gambarProduk: anggrekPink, kategori: "Flower Basket", jenis: "Anggrek", harga: 295000, rating: 5.0, stok: 4, statusProduk: "Best Seller", deskripsi: "Anggrek pink anggun cocok untuk hiasan meja maupun hadiah spesial." },
];

export const flowerDataContent = {
  rose: {
    nama: "Mawar",
    img: roseImg,
    subtitle: "Isyarat romantis yang akrab, yang maknanya tetap bergantung pada warna, konteks, serta kepada siapa ia diberikan.",
    bentukTitle: "Mawar Memiliki Berbagai Bentuk & Jenis",
    bentukDesc: "Rosa adalah genus rumpun semak dan tanaman merambat yang sangat beragam. Mawar taman dikelompokkan dalam berbagai cara, mulai dari bentuk kelopak tunggal yang terbuka hingga bunga berpetal padat. Warna, keharuman, dan pola mekar sangat bervariasi.",
    pesanTitle: "Pesan yang Disampaikan oleh Mawar",
    pesanDesc: "Mawar adalah salah satu simbol romantis paling familier bagi banyak orang, menjadikannya pilihan utama ketika pengirim ingin menyampaikan rasa kasih sayang secara jelas dan langsung. Namun, asosiasi ini dapat berubah seiring budaya dan kedekatan personal.",
    warnaTitle: "Memilih Warna Tanpa Salah Arti",
    warnaList: [
      { color: "text-red-600 font-bold", label: "Merah", desc: "Opsi paling romantis untuk pasangan dan ketegasan rasa cinta." },
      { color: "text-pink-600 font-bold", label: "Merah Muda (Pink)", desc: "Melambangkan kasih sayang, rasa terima kasih, atau perayaan hangat." },
      { color: "text-amber-500 font-bold", label: "Kuning", desc: "Terkesan lebih cerah, ceria, dan kasual untuk persahabatan." },
      { color: "text-slate-700 font-bold", label: "Mawar Putih", desc: "Melambangkan kemurnian, kesucian, ketulusan cinta sejati, serta awal yang baru." },
      { color: "text-orange-500 font-bold", label: "Oranye", desc: "Membawa energi yang hidup dan membuat buket terasa lebih meriah." }
    ]
  },
  tulip: {
    nama: "Tulip",
    img: tulipImg,
    subtitle: "Pilihan bunga cerah dan hangat untuk mengawali langkah baru serta kehangatan sehari-hari.",
    bentukTitle: "Karakteristik & Siluet Tulip",
    bentukDesc: "Bunga tulip berasal dari kelompok genus tanaman umbi Tulipa. Memiliki batang yang tegak dengan bentuk kelopak menyerupai cangkir. Variasi bentuk serta warna budidayanya sangat luas di berbagai kawasan sedang.",
    pesanTitle: "Editorial & Arti Pesan Tulip",
    pesanDesc: "Dalam tata letak kreatif, tulip berfungsi sebagai elemen penyegar yang memberikan kesan tinggi pada buket tanpa kesan terlalu padat. Sangat ideal untuk ulang tahun, ucapan selamat, persahabatan, atau kabar baik.",
    warnaTitle: "Dinamika Warna Tulip",
    warnaList: [
      { color: "text-yellow-500 font-bold", label: "Kuning", desc: "Memberikan energi cerah dan semangat yang tinggi." },
      { color: "text-pink-600 font-bold", label: "Pink", desc: "Nuansa hangat yang cocok untuk persahabatan maupun keluarga." },
      { color: "text-red-600 font-bold", label: "Merah", desc: "Meningkatkan kesan romantis yang lebih mendalam." },
      { color: "text-slate-700 font-bold", label: "Putih", desc: "Menghadirkan komposisi yang lebih minimalis dan tenang." },
      { color: "text-purple-600 font-bold", label: "Ungu", desc: "Memberikan kontras visual serta kesan elegan yang berkelas." }
    ]
  },
  daisy: {
    nama: "Daisy",
    img: daisyImg,
    subtitle: "Bunga ramah yang membuat ketulusan dan keringanan terasa begitu natural.",
    bentukTitle: "Mengenal Karakter Bunga Daisy",
    bentukDesc: "Nama daisy sering digunakan secara umum untuk berbagai jenis tanaman. Karakter utamanya memiliki kelopak radial yang mengitari bagian tengah berwarna kuning cerah, memberikan kesan estetika yang santai dan terbuka.",
    pesanTitle: "Makna Daisy dalam Rangkaian",
    pesanDesc: "Daisy sangat pas digunakan ketika gestur besar dirasa terlalu berlebihan—seperti ucapan ulang tahun santai untuk teman, tanda terima kasih kilat, atau sekadar pengingat bahwa seseorang sedang memikirkan hari baikmu.",
    warnaTitle: "Menjaga Kejelasan Nada Pesan",
    warnaList: [
      { color: "text-amber-500 font-bold", label: "Putih & Kuning", desc: "Kontras visual tinggi yang menghadirkan kesan ceria serta kasual." }
    ]
  },
  lily: {
    nama: "Lily",
    img: lilyImg,
    subtitle: "Bunga anggun untuk menunjukkan rasa hormat, dukungan tenang, dan kasih sayang yang elegan.",
    bentukTitle: "Struktur & Keindahan Bunga Lily",
    bentukDesc: "Lily sejati berasal dari kelompok marga Lilium yang tumbuh dari umbi dengan bentuk bunga menyerupai terompet atau corong. Sebagian kultivarnya memiliki aroma harum yang khas dan memikat.",
    pesanTitle: "Pesan dan Suasana yang Dibawa Lily",
    pesanDesc: "Lily digunakan sebagai isyarat visual untuk ruang, ketenangan, dan martabat. Kelopaknya yang lebar memberikan keleluasaan pada tata letak buket agar terasa lebih luas dan teduh.",
    warnaTitle: "Pengaruh Suhu Warna Visual",
    warnaList: [
      { color: "text-slate-700 font-bold", label: "Putih", desc: "Menghasilkan tampilan paling tenang dan khidmat." },
      { color: "text-pink-600 font-bold", label: "Pink", desc: "Melembutkan bentuk bunga untuk ungkapan rasa terima kasih." },
      { color: "text-amber-500 font-bold", label: "Kuning & Oranye", desc: "Membuat bunga tampak lebih bersemangat dan meriah." }
    ]
  },
  sunflower: {
    nama: "Sunflower",
    img: sunflowerImg,
    subtitle: "Pancaran keceriaan membara, optimisme tinggi, dan kesetiaan yang selalu menghadap cahaya.",
    bentukTitle: "Karakteristik Khas Bunga Matahari",
    bentukDesc: "Dikenal dengan ukuran kepalanya yang besar serta kelopak kuning cemerlang yang melambangkan energi positif dan kekuatan hidup di bawah teriknya matahari.",
    pesanTitle: "Pesan Semangat dari Bunga Matahari",
    pesanDesc: "Sangat ideal diberikan untuk memberikan suntikan motivasi moral, merayakan kelulusan, atau menyampaikan dukungan penuh kepada orang terdekat.",
    warnaTitle: "Esensi Warna Cerah",
    warnaList: [
      { color: "text-amber-500 font-bold", label: "Kuning Keemasan", desc: "Melambangkan kehangatan, persahabatan abadi, dan keceriaan hidup." }
    ]
  },
  orchid: {
    nama: "Anggrek",
    img: orchidImg,
    subtitle: "Bunga eksotis berkelas untuk bentuk kekaguman, apresiasi, dan keanggunan penuh kesengajaan.",
    bentukTitle: "Keragaman Keluarga Anggrek",
    bentukDesc: "Orchidaceae merupakan salah satu keluarga tumbuhan berbunga yang paling beragam di dunia dengan ribuan spesies. Bentuk siluetnya yang asimetris memberikan focal point yang kuat pada setiap rangkaian.",
    pesanTitle: "Kesan Profesional & Elegan",
    pesanDesc: "Anggrek sangat fungsional untuk hadiah apresiasi mentor, pencapaian milestone profesional, promosi jabatan, maupun perayaan istimewa berstandar modern.",
    warnaTitle: "Karakter Warna Anggrek",
    warnaList: [
      { color: "text-purple-600 font-bold", label: "Ungu", desc: "Memberikan kontras tajam serta martabat yang kuat." },
      { color: "text-pink-600 font-bold", label: "Pink", desc: "Membawa sentuhan feminin yang lebih lembut dan ramah." }
    ]
  }
};

export const kategoriList = [
  "Semua",
  "Flower Bouquet",
  "Flower Box",
  "Flower Basket",
];

export const jenisList = [
  "Semua Jenis",
  "Mawar",
  "Tulip",
  "Sunflower",
  "Lily",
  "Daisy",
  "Anggrek",
  "Campur",
];

export const statusList = [
  "Semua Status",
  "Best Seller",
  "Ready Stock",
  "Stok Terbatas",
  "Produk Baru",
  "Diskon",
];

// Data untuk slider di halaman utama
export const heroSlides = [
  {
    image: heroBg1,
    title: "Rangkai Cerita dari Setiap Tangkai",
    subtitle: "Kreasikan buket impianmu sendiri secara custom—pilih bunga, warna, dan gaya yang paling mewakili perasaanmu.",
  },
  {
    image: heroBg2,
    title: "Kesegaran Bunga Impor Pilihan",
    subtitle: "Menghadirkan bunga impor premium berkualitas terbaik yang terjaga kesegaran dan keindahannya hingga ke tanganmu.",
  },
  {
    image: heroBg3,
    title: "Ungkapkan Makna di Balik Keindahan",
    subtitle: "Temukan filosofi dan bahasa tersirat di setiap kelopak bunga sebelum memilih rangkaian yang tepat.",
  },
];

// Data daftar eksplorasi bunga (digunakan di Home, Modal, dan Detail Bunga)
export const exploreFlowersList = [
  { id: "rose", nama: "Mawar", desc: "Simbol cinta sejati dan kasih sayang yang mendalam.", img: roseImg },
  { id: "tulip", nama: "Tulip", desc: "Awal yang baru dan persahabatan yang tulus.", img: tulipImg },
  { id: "lily", nama: "Lily", desc: "Kemurnian, ketenangan, dan rasa hormat.", img: lilyImg },
  { id: "daisy", nama: "Daisy", desc: "Keceriaan, kepolosan, dan kebahagiaan.", img: daisyImg },
  { id: "orchid", nama: "Anggrek", desc: "Keanggunan, keindahan langka, dan cinta sejati.", img: orchidImg },
  { id: "sunflower", nama: "Bunga Matahari", desc: "Hangatnya keceriaan dan kesetiaan tanpa batas.", img: sunflowerImg },
];