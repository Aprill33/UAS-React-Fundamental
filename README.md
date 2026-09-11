# 🌸 Bloom & Bouquet — Toko Bunga & E-Commerce Buket Kustom

> **Platform Belanja Bunga Online, Interaktif, dan Penuh Makna**
> Proyek Ujian Akhir Semester (UAS) — *React Fundamental & Frontend Web Application*

---

## 🔗 Link Tautan & Repositori

- 🚀 **Live Demo Web App:** [https://bloomnbouquet.vercel.app/](https://bloomnbouquet.vercel.app/)
- 📦 **GitHub Repository:** [https://github.com/Aprill33/UAS-React-Fundamental](https://github.com/Aprill33/UAS-React-Fundamental)
- 📂 **Subfolder Proyek:** [UAS-React-Fundamental/bloom-bouquet](https://github.com/Aprill33/UAS-React-Fundamental/tree/main/bloom-bouquet)
- **Video Presentasi :**  https://drive.google.com/drive/folders/1TxTMkM7pLx6gs6Wy9lewIZ0DbcCwUuoY?usp=sharing

---

## 🔑 Akun Demo Login (Kredensial)

| Role | Username | Password | Hak Akses & Fitur |
| :--- | :--- | :--- | :--- |
| 👑 **Admin** | `adminbnb` | `blooming` | Akses penuh: Dashboard Admin, Kelola Produk, Kelola Pesanan, Kelola Voucher, Pengaturan Rangkai Buket, Bunga Terjual. |
| 👤 **Pelanggan** | *(Daftar Akun Baru)* | *(Buat sendiri)* | Akses penuh sebagai pembeli: Beranda, Katalog Bunga, Rangkai Buket, Keranjang, Checkout, Favorit, Pesanan Saya, Profil. |

> 📱 **Akses Tanpa Login:**
> Pengunjung dapat menjelajahi Beranda, Katalog Bunga, Arti Bunga, dan halaman Rangkai Buket tanpa perlu membuat akun terlebih dahulu.

---

## a. 📖 Nama dan Deskripsi Aplikasi

**Bloom & Bouquet** adalah aplikasi web *e-commerce* toko bunga (*florist*) modern yang dirancang untuk mendigitalkan seluruh pengalaman berbelanja bunga secara *end-to-end*. Aplikasi ini memungkinkan pelanggan untuk:

1. **Menjelajahi Katalog Bunga (*Flower Catalogue*):** Temukan ratusan pilihan buket segar, bunga potong, kotak bunga, dan keranjang cantik dengan fitur pencarian dan filter canggih.
2. **Merangkai Buket Kustom (*Custom Bouquet Builder*):** Pelanggan dapat merancang sendiri buket impian mereka dengan memilih ukuran, warna tema, bunga utama, dan hiasan tambahan secara interaktif di atas kanvas visual.
3. **Belanja dengan Mudah:** Sistem keranjang belanja, penggunaan voucher diskon, dan proses checkout lengkap dengan formulir pengiriman.
4. **Belajar Filosofi Bunga (*Arti Bunga*):** Membaca artikel edukasi mengenai makna dan filosofi di balik setiap jenis bunga.
5. **Panel Admin Lengkap:** Pengelola toko dapat mengelola seluruh operasional bisnis mulai dari produk, pesanan, voucher, hingga konfigurasi buket kustom.

Karena aplikasi ini berjalan sepenuhnya di sisi klien (*Frontend Only*), seluruh data (produk, pengguna, pesanan, favorit, dan ulasan) disimpan dengan aman menggunakan **Web Storage API** (*localStorage* & *sessionStorage*) bawaan peramban web.

---

## b. 🌟 Daftar Fitur Lengkap

### 1. Autentikasi & Manajemen Akun
- Login dan Registrasi akun pengguna baru dengan validasi form.
- Pemisahan hak akses dinamis sesuai peran (**Admin** dan **Pelanggan**).
- Perlindungan rute halaman (`ProtectedRoute`) agar halaman sensitif tidak bisa diakses tanpa login.
- Edit profil dan data diri akun pelanggan.

### 2. Beranda & Slider Hero
- Slider hero otomatis dengan efek transisi gambar dan teks yang berganti setiap 5 detik.
- Tampilan koleksi produk terbaru, produk diskon spesial, dan produk best seller.
- Tampilan carousel testimoni ulasan pelanggan.
- Navigasi cepat ke fitur Rangkai Buket, Katalog, dan Arti Bunga.
- Bagian "Tentang Kami" dengan deskripsi visi dan misi toko.

### 3. Katalog Bunga (*Daftar Bunga*)
- Menampilkan seluruh produk bunga dengan grid responsif.
- **Pencarian Instan:** Mencari produk berdasarkan nama, kategori, atau jenis.
- **Filter Multi-dimensi:** Filter berdasarkan Kategori Rangkaian (Flower Bouquet, Flower Box, Flower Basket), Jenis Bunga, dan Status Produk (Baru, Best Seller, Diskon, Ready Stock).
- **Pengurutan:** Urutkan produk berdasarkan nama (A-Z, Z-A) atau harga (termurah/termahal).
- Tampilan pop-up modal detail produk untuk melihat informasi lengkap sebelum membeli.
- Tombol tambah ke keranjang dan tambah ke daftar favorit langsung dari kartu produk.

### 4. Keranjang Belanja (*Shopping Cart*)
- Menambah, mengurangi, dan menghapus item dari keranjang.
- Pilih item tertentu atau pilih semua untuk di-checkout.
- Ringkasan harga otomatis (subtotal, diskon).

### 5. Checkout & Voucher Diskon
- Formulir pengiriman lengkap (nama penerima, alamat, nomor telepon, catatan).
- Pilihan metode pengiriman.
- Input kode voucher diskon dengan validasi otomatis (potongan persentase atau nominal, minimal belanja).
- Ringkasan pesanan final sebelum konfirmasi.

### 6. Favorit / Wishlist
- Simpan bunga favorit untuk dibeli nanti.
- Halaman daftar bunga yang sudah di-*wishlist*.
- Sinkronisasi status favorit di seluruh halaman (katalog, beranda, detail modal).

### 7. Pesanan Saya (*Order Tracking*)
- Riwayat semua pesanan yang pernah dibuat.
- Melihat detail isi pesanan, total harga, dan status pengiriman.
- Akses tombol "Tulis Ulasan" setelah pesanan berstatus Selesai.

### 8. Ulasan Produk (*Review*)
- Menulis ulasan dan memberikan rating bintang (1-5) untuk produk yang sudah dibeli.
- Ulasan ditampilkan di carousel testimoni pada halaman Beranda.

### 9. Rangkai Buket Kustom (*Custom Bouquet Builder*)
- Simulator interaktif untuk merancang buket sendiri:
  - Memilih ukuran buket (Kecil, Sedang, Besar)
  - Memilih warna tema buket
  - Memilih bunga utama dari daftar yang tersedia
  - Menambahkan hiasan/aksesoris tambahan
- Kalkulasi harga otomatis sesuai pilihan.
- Langsung tambah buket kustom ke keranjang belanja.

### 10. Arti Bunga (*Flower Philosophy*)
- Kumpulan artikel edukasi mengenai filosofi dan makna di balik berbagai jenis bunga.
- Halaman detail untuk setiap artikel bunga.

### 11. Dashboard & Panel Admin
- **Dashboard:** Statistik ringkasan (total produk, total pesanan, total voucher aktif, bunga terjual).
- **Manajemen Produk:** Tambah, edit, dan hapus produk bunga (nama, kategori, jenis, harga, stok, gambar, status).
- **Manajemen Pesanan:** Melihat semua pesanan dan memperbarui status pesanan (Dikemas → Dikirim → Selesai).
- **Manajemen Voucher:** Membuat, mengaktifkan/menonaktifkan, dan menghapus kode voucher diskon.
- **Bunga Terjual:** Laporan riwayat produk yang berhasil terjual.
- **Pengaturan Rangkai Buket:** Mengelola daftar pilihan bunga, hiasan, dan harga untuk fitur Custom Bouquet Builder.

---

## c. 🛠️ Teknologi yang Digunakan

Aplikasi ini sepenuhnya dibangun menggunakan teknologi *frontend* modern:

| Teknologi | Versi | Kegunaan |
| :--- | :--- | :--- |
| **React** | v19 | Library utama untuk membangun UI berbasis komponen |
| **Vite** | v8 | Build tool & development server yang cepat |
| **React Router DOM** | v7 | Navigasi antar halaman (*Client-Side Routing* / SPA) |
| **Tailwind CSS** | v4 | Styling UI responsif berbasis utility-class |
| **Lucide React** | v1 | Kumpulan ikon antarmuka yang bersih dan konsisten |
| **React Icons** | v5 | Ikon tambahan dari berbagai library populer |
| **Framer Motion** | v13 | Animasi dan transisi UI (efek Blur Text, Fade In, dll.) |
| **Context API** | React Built-in | Manajemen *state* global (Auth, Cart, Favorites, Orders, Voucher, Review) |
| **LocalStorage API** | Browser Built-in | Penyimpanan data persisten tanpa database eksternal |
| **SessionStorage API** | Browser Built-in | Penyimpanan data sesi sementara |
| **Vercel** | - | Platform *deployment* dan hosting aplikasi web |

---

## d. 📁 Struktur Folder Proyek

Karena proyek ini berjalan penuh di sisi klien (*Front-End Only*), semua logika dan tampilan diatur dalam folder `src/`.

```plaintext
bloom-bouquet/
├── public/                     # Aset publik statis (favicon)
├── src/
│   ├── assets/                 # Gambar bunga, logo, dan aset visual UI
│   ├── Components/             # Komponen UI Reusable (Dapat Dipakai Ulang)
│   │   ├── ReactBits/          # Komponen animasi (BlurText.jsx, dll.)
│   │   ├── CustomAlert.jsx     # Pop-up notifikasi (toast/modal alert)
│   │   ├── CustomDropdown.jsx  # Menu tarik-turun kustom
│   │   ├── FlowerIcons.jsx     # Ikon dekoratif berbentuk bunga
│   │   ├── Footer.jsx          # Kaki halaman (footer)
│   │   ├── Header.jsx          # Navigasi atas (navbar + hamburger mobile)
│   │   ├── Pagination.jsx      # Komponen penomoran halaman
│   │   ├── ProductCard.jsx     # Kartu tampilan satu produk bunga
│   │   ├── ProductDetailModal.jsx  # Pop-up detail produk
│   │   ├── ProtectedRoute.jsx  # Pelindung rute (mencegah akses tanpa login)
│   │   ├── ReviewCarousel.jsx  # Slider otomatis testimoni pelanggan
│   │   └── SearchBar.jsx       # Kolom pencarian dan filter produk
│   ├── context/                # Global State Management (Context API)
│   │   ├── AuthContext.jsx     # Sesi login, registrasi, dan data pengguna
│   │   ├── CartContext.jsx     # Isi dan manajemen keranjang belanja
│   │   ├── CustomBouquetContext.jsx  # State merangkai buket kustom
│   │   ├── FavoriteContext.jsx # Daftar bunga favorit / wishlist
│   │   ├── OrderContext.jsx    # Data checkout dan riwayat pesanan
│   │   ├── ReviewContext.jsx   # Pengiriman dan penyimpanan ulasan produk
│   │   └── VoucherContext.jsx  # Validasi dan manajemen kode kupon diskon
│   ├── Data/                   # Data statis pengganti database
│   │   ├── Flowers.js          # Katalog data produk bunga
│   │   ├── Reviews.js          # Data ulasan pelanggan
│   │   └── Vouchers.js         # Data kupon diskon
│   ├── hooks/                  # Custom React Hooks
│   │   └── usePagination.js    # Logika pembagian data per halaman
│   ├── Pages/                  # Kumpulan Halaman Aplikasi
│   │   ├── Admin/              # Halaman Panel Admin
│   │   │   ├── BerandaAdminPage.jsx          # Dashboard ringkasan admin
│   │   │   ├── BungaTerjualAdminPage.jsx     # Laporan bunga terjual
│   │   │   ├── DaftarPesananAdminPage.jsx    # Kelola & update status pesanan
│   │   │   ├── DaftarProdukAdminPage.jsx     # Kelola katalog produk
│   │   │   ├── DaftarVoucherAdminPage.jsx    # Kelola voucher diskon
│   │   │   ├── FormProdukAdminPage.jsx       # Form tambah/edit produk
│   │   │   ├── LayoutAdmin.jsx               # Layout wrapper halaman admin
│   │   │   ├── PengaturanRangkaiAdminPage.jsx # Kelola opsi Custom Bouquet
│   │   │   └── ProfilAdminPage.jsx           # Edit profil akun admin
│   │   ├── Error/              # Halaman Error
│   │   │   └── Error404Page.jsx              # Halaman 404 Not Found
│   │   ├── Otentikasi/         # Halaman Autentikasi
│   │   │   ├── LoginPage.jsx                 # Form masuk / login
│   │   │   └── RegisterPage.jsx              # Form daftar akun baru
│   │   └── Pelanggan/          # Halaman Antarmuka Pelanggan
│   │       ├── ArtiBungaPage.jsx             # Daftar artikel filosofi bunga
│   │       ├── BerandaPage.jsx               # Halaman depan (Hero, Produk, Ulasan)
│   │       ├── CheckoutPage.jsx              # Form pengiriman & konfirmasi pesanan
│   │       ├── DaftarBungaPage.jsx           # Katalog bunga + filter + pencarian
│   │       ├── DetailArtiBungaPage.jsx       # Artikel detail satu jenis bunga
│   │       ├── FavoritPage.jsx               # Daftar bunga favorit / wishlist
│   │       ├── KeranjangPage.jsx             # Keranjang belanja
│   │       ├── PesananSayaPage.jsx           # Riwayat & status pesanan pelanggan
│   │       ├── ProfilPelangganPage.jsx       # Profil & edit biodata pelanggan
│   │       ├── RangkaiBuketPage.jsx          # Simulator merangkai buket kustom
│   │       └── TulisUlasanPage.jsx           # Form menulis ulasan produk
│   ├── utils/                  # Fungsi Utilitas Pembantu
│   │   └── formatCurrency.js   # Konversi angka ke format Rupiah (Rp)
│   ├── App.jsx                 # Konfigurasi Routing & Layout Utama
│   ├── main.jsx                # Entry point React (Root Render)
│   └── index.css               # Konfigurasi utama Tailwind CSS v4 & tema font
├── vercel.json                 # Konfigurasi rewrite URL untuk Vercel SPA
├── package.json                # Daftar dependensi & script
└── vite.config.js              # Konfigurasi bundler Vite
```

---

## e. 🚀 Cara Instalasi dan Menjalankan Proyek

### Prasyarat:
- **Node.js** (Versi 18 atau lebih baru) — [Download Node.js](https://nodejs.org/en)
- **Git** — [Download Git](https://git-scm.com/)
- **npm** atau **pnpm** (package manager)

### Langkah Menjalankan:

1. **Clone repositori dari GitHub:**
   ```bash
   git clone https://github.com/Aprill33/UAS-React-Fundamental.git
   ```

2. **Masuk ke folder proyek:**
   ```bash
   cd UAS-React-Fundamental/bloom-bouquet
   ```

3. **Instal semua dependensi:**
   ```bash
   npm install
   ```
   *(Atau gunakan `pnpm install` jika memakai pnpm)*

4. **Jalankan server development:**
   ```bash
   npm run dev
   ```
   *(Atau gunakan `pnpm dev`)*

5. **Buka di browser:**
   ```
   http://localhost:5173
   ```

---

## f. 🏗️ Build untuk Produksi

Untuk membuat versi produksi yang dioptimalkan:
```bash
npm run build
```
File hasil build akan tersimpan di folder `dist/` dan siap untuk di-deploy ke platform hosting seperti Vercel.

---

## g. 📡 Informasi Deployment

### Platform: Vercel

Proyek ini di-deploy di **Vercel** dan dikonfigurasi sebagai *Single Page Application (SPA)* menggunakan file `vercel.json` agar semua rute React Router dapat berfungsi dengan benar:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### URL Live:
- **Produksi:** [https://bloomnbouquet.vercel.app/](https://bloomnbouquet.vercel.app/)

### Catatan Penting:
> ⚠️ Seluruh data (produk, pesanan, akun pengguna, dll.) disimpan di **LocalStorage** browser pengguna masing-masing. Data tidak tersinkronisasi antar perangkat/browser yang berbeda, karena proyek ini adalah aplikasi *Frontend Only* tanpa backend/database eksternal.

---

## h. 🖼️ Screenshot Tampilan Aplikasi

### Halaman Beranda
<img width="1918" height="879" alt="image" src="https://github.com/user-attachments/assets/9b4211eb-2852-4fd0-88f0-8be3a29d69d7" />


### Halaman Katalog Bunga
<img width="1918" height="886" alt="image" src="https://github.com/user-attachments/assets/ea108e43-4322-4f86-938d-96776b8a225d" />


### Halaman Rangkai Buket Kustom
<img width="1918" height="880" alt="image" src="https://github.com/user-attachments/assets/cf5f1da8-3b22-43fd-903d-8df1f1d503f6" />

### Halaman Keranjang Belanja & Checkout
<img width="1918" height="889" alt="image" src="https://github.com/user-attachments/assets/faa12a10-9024-4d0a-ba9a-39a31879e05e" />

<img width="1912" height="879" alt="image" src="https://github.com/user-attachments/assets/a6faa4cd-e086-40fe-8e24-4169fd18d956" />


### Halaman Dashboard Admin
<img width="1912" height="879" alt="image" src="https://github.com/user-attachments/assets/a874c5cd-6ed6-4013-b77b-d2f4d877dd7f" />


### Halaman Kelola Produk Admin
<img width="1884" height="885" alt="image" src="https://github.com/user-attachments/assets/75c708e8-4765-4f82-8e0d-384e62fe3f02" />

---

**© 2026 Bloom & Bouquet. All Rights Reserved.**
