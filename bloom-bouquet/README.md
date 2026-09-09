# 🌸 Bloom & Bouquet

**Bloom & Bouquet** adalah sebuah aplikasi web *e-commerce* dan toko bunga (*florist*) interaktif yang dibangun menggunakan **React.js**. Aplikasi ini dirancang untuk memberikan pengalaman berbelanja bunga yang menyenangkan, memungkinkan pelanggan untuk menjelajahi katalog produk, mempelajari filosofi di balik setiap bunga, hingga merangkai buket kustom secara mandiri. Untuk memastikan kelancaran transaksi tanpa menghilangkan jejak, aplikasi ini menyimpan riwayat keranjang, favorit, hingga pesanan pengguna dengan aman menggunakan fitur penyimpanan bawaan peramban web (*Web Storage API*).

---

## ✨ Daftar Fitur

Aplikasi ini dibagi menjadi dua antarmuka (Role): **Pelanggan** dan **Admin**.

**👤 Fitur Pelanggan (User):**
- **Autentikasi:** Mendaftar akun baru dan masuk (*Login/Register*).
- **Beranda & Katalog:** Menampilkan koleksi terbaru, diskon, dan best seller.
- **Pencarian & Filter:** Mencari bunga berdasarkan nama, kategori, jenis, dan ketersediaan stok.
- **Keranjang Belanja:** Menambah produk ke keranjang dan mengubah jumlah kuantitas.
- **Favorit (Wishlist):** Menyimpan daftar bunga yang disukai untuk dibeli nanti.
- **Checkout:** Proses penyelesaian pesanan dan penggunaan Voucher Diskon.
- **Beri Ulasan:** Memberikan penilaian dan komentar (*review*) setelah pesanan selesai.
- **Rangkai Buket Kustom:** Pelanggan dapat membuat buket sendiri dengan memilih ukuran, warna, bunga utama, dan hiasan tambahan.
- **Arti Bunga (Edukasi):** Membaca artikel filosofi dan makna di balik jenis-jenis bunga.
- **Pesanan Saya & Profil:** Melacak status pesanan dan mengedit data diri pelanggan.

**👑 Fitur Admin:**
- **Dashboard Admin:** Ringkasan statistik (total pesanan, total produk).
- **Manajemen Produk:** Menambah, mengedit, dan menghapus data bunga (katalog).
- **Manajemen Pesanan:** Memperbarui status pesanan pelanggan (Dikemas, Dikirim, Selesai).
- **Manajemen Voucher:** Membuat dan mengatur kupon diskon.
- **Bunga Terjual:** Melihat riwayat produk yang telah terjual.
- **Pengaturan Rangkai Buket:** Mengelola opsi bunga kustom (harga, stok hiasan).

---

## 🛠️ Teknologi yang Digunakan

Aplikasi ini sepenuhnya dibangun dengan teknologi web modern:
- **React 18** (Vite.js)
- **Tailwind CSS** (Pembuatan *styling* UI secara responsif)
- **React Router DOM** (Navigasi antar halaman / SPA)
- **Context API** (Manajemen *state* global seperti *Cart* dan *Auth*)
- **Lucide React & React Icons** (Kumpulan ikon antarmuka yang lengkap)
- **ReactBits & Framer Motion** (Menambahkan animasi keren seperti *Blur Text* dan *Fade In*)
- **LocalStorage & SessionStorage** (Penyimpanan data lokal persisten tanpa database)

---

## 📁 Struktur Folder Proyek

Karena proyek ini berjalan penuh di sisi klien (*Front-End Only*), semua logika dan tampilan diatur dalam folder `src/`.

```text
bloom-bouquet/
├── public/                 # Aset publik statis (favicon, logo)
├── src/
│   ├── assets/             # [Berisi kumpulan gambar bunga dan aset visual UI]
│   ├── Components/         # Komponen UI Reusable
│   │   ├── ReactBits/      # Komponen animasi pihak ketiga (BlurText.jsx)
│   │   ├── CustomAlert.jsx # Pop-up notifikasi kecil (toast/alert)
│   │   ├── CustomDropdown.jsx # Menu tarik-turun (contoh: menu klik profil)
│   │   ├── FlowerIcons.jsx # Kumpulan ikon dekoratif berbentuk bunga
│   │   ├── Footer.jsx      # Bagian paling bawah (kaki) halaman
│   │   ├── Header.jsx      # Bagian navigasi (atas) halaman
│   │   ├── Pagination.jsx  # Tombol angka untuk pindah halaman
│   │   ├── ProductCard.jsx # Kartu untuk menampilkan satu produk bunga
│   │   ├── ProductDetailModal.jsx # Jendela (pop-up) detail suatu produk
│   │   ├── ProtectedRoute.jsx # Pelindung halaman (mencegah akses tanpa login)
│   │   ├── ReviewCarousel.jsx # Slider otomatis untuk testimoni pelanggan
│   │   └── SearchBar.jsx   # Kolom input untuk mencari bunga
│   ├── context/            # Global State Management
│   │   ├── AuthContext.jsx # Mengatur data sesi login dan registrasi pengguna
│   │   ├── CartContext.jsx # Mengatur isi keranjang belanja
│   │   ├── CustomBouquetContext.jsx # Mengatur fitur merangkai buket
│   │   ├── FavoriteContext.jsx # Mengatur daftar bunga yang disukai (Wishlist)
│   │   ├── OrderContext.jsx # Mengatur data checkout dan riwayat pesanan
│   │   ├── ReviewContext.jsx # Mengatur pengiriman ulasan produk
│   │   └── VoucherContext.jsx # Mengatur validasi kode kupon diskon
│   ├── Data/               # Data dummy/inisial statis pengganti Database
│   │   ├── Flowers.js      # Kumpulan data katalog produk bunga
│   │   ├── Reviews.js      # Kumpulan data ulasan pembeli
│   │   └── Vouchers.js     # Kumpulan data kupon diskon
│   ├── hooks/              # Custom Hooks React
│   │   └── usePagination.js # Logika matematika untuk penomoran halaman
│   ├── Pages/              # Folder Halaman-Halaman
│   │   ├── Admin/          # Halaman Panel Admin
│   │   │   ├── BerandaAdminPage.jsx # Halaman ringkasan dashboard admin
│   │   │   ├── BungaTerjualAdminPage.jsx # Riwayat produk-produk yang terjual
│   │   │   ├── DaftarPesananAdminPage.jsx # Tabel untuk mengubah status pesanan
│   │   │   ├── DaftarProdukAdminPage.jsx # Tabel manajemen katalog produk
│   │   │   ├── DaftarVoucherAdminPage.jsx # Tabel manajemen daftar voucher
│   │   │   ├── FormProdukAdminPage.jsx # Form untuk menambah/mengedit produk
│   │   │   ├── LayoutAdmin.jsx # Pembungkus sisi layar (*Sidebar*) halaman admin
│   │   │   ├── PengaturanRangkaiAdminPage.jsx # Kelola opsi bunga kustom
│   │   │   └── ProfilAdminPage.jsx # Form edit biodata akun admin
│   │   ├── Error/          # Halaman Error Not Found
│   │   │   └── Error404Page.jsx # Halaman yang muncul jika link URL salah
│   │   ├── Otentikasi/     # Halaman Autentikasi
│   │   │   ├── LoginPage.jsx # Form untuk masuk / login
│   │   │   └── RegisterPage.jsx # Form untuk daftar akun baru
│   │   └── Pelanggan/      # Halaman Antarmuka Pelanggan
│   │       ├── ArtiBungaPage.jsx # Kumpulan artikel filosofi macam-macam bunga
│   │       ├── BerandaPage.jsx # Halaman depan (Koleksi Terbaru & Best Seller)
│   │       ├── CheckoutPage.jsx # Halaman formulir pengiriman & pembayaran
│   │       ├── DaftarBungaPage.jsx # Halaman katalog utama produk bunga
│   │       ├── DetailArtiBungaPage.jsx # Artikel mendetail mengenai satu bunga
│   │       ├── FavoritPage.jsx # Halaman daftar bunga kesukaan
│   │       ├── KeranjangPage.jsx # Halaman keranjang belanja
│   │       ├── PesananSayaPage.jsx # Halaman cek resi/status pesanan pelanggan
│   │       ├── ProfilPelangganPage.jsx # Halaman profil dan edit biodata pelanggan
│   │       ├── RangkaiBuketPage.jsx # Simulator kanvas untuk merangkai buket
│   │       └── TulisUlasanPage.jsx # Form untuk menulis ulasan setelah selesai beli
│   ├── utils/              # Fungsi utilitas pembantu
│   │   └── formatCurrency.js # Fungsi otomatis mengubah angka menjadi format Rupiah
│   ├── App.css             # Penambahan animasi CSS sederhana (loader spinner)
│   ├── App.jsx             # Pengaturan Routing & Layouting Utama
│   ├── main.jsx            # Titik masuk utama aplikasi (Root Render)
│   └── index.css           # File konfigurasi utama untuk Tailwind CSS v4
├── package.json            # Daftar pustaka dan script (dependensi)
└── vite.config.js          # Konfigurasi *bundler* Vite
```

---

## 🚀 Cara Instalasi dan Menjalankan Frontend

Ikuti langkah-langkah mudah di bawah ini untuk menjalankan aplikasi di komputer Anda:

1. **Siapkan Prasyarat:**
   Pastikan Anda sudah menginstal **[Node.js](https://nodejs.org/en)** (minimal versi 18+) dan juga **Git** di komputer Anda.

2. **Clone Repositori dari GitHub:**
   Buka Terminal atau Command Prompt (CMD), lalu jalankan perintah berikut untuk mengunduh kode proyek ini:
   ```bash
   git clone <Masukkan-Link-Repository-GitHub-Anda-Di-Sini>
   ```

3. **Masuk ke Folder Proyek:**
   ```bash
   cd bloom-bouquet
   ```

4. **Instal Dependensi / Pustaka yang Dibutuhkan:**
   Gunakan perintah `npm` (atau `pnpm` jika Anda menggunakannya) untuk memasang semua modul:
   ```bash
   npm install
   ```
   *(Atau jalankan `pnpm install` jika memakai pnpm)*

5. **Jalankan Aplikasi:**
   Setelah proses instalasi selesai, jalankan server pengembangan dengan perintah:
   ```bash
   npm run dev
   ```
   *(Atau jalankan `pnpm dev`)*

6. **Selesai!**
   Buka *browser* Anda dan kunjungi tautan: **[http://localhost:5173](http://localhost:5173)**

---

## 📸 Screenshot Aplikasi

*(Silakan tempel / masukkan gambar screenshot aplikasi pada masing-masing menu di bawah ini)*

### Halaman Beranda
`[Tambahkan Screenshot Beranda di sini]`

### Halaman Katalog Bunga
`[Tambahkan Screenshot Katalog di sini]`

### Halaman Rangkai Buket Kustom
`[Tambahkan Screenshot Rangkai Buket di sini]`

### Halaman Keranjang Belanja & Checkout
`[Tambahkan Screenshot Keranjang & Checkout di sini]`

### Halaman Dashboard Admin
`[Tambahkan Screenshot Dashboard Admin di sini]`

### Halaman Kelola Produk Admin
`[Tambahkan Screenshot Kelola Produk di sini]`
