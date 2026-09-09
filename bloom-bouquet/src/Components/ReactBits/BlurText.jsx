/**
 * FILE: /src/Components/ReactBits/BlurText.jsx
 * TUJUAN: Komponen UI yang dapat digunakan berulang (Reusable Component).
 * KETERHUBUNGAN: Terintegrasi dengan komponen induk dan menggunakan Context API atau Hooks untuk mengelola datanya.
 */

// [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
// [DI LUAR MODUL] useRef: Menyimpan referensi elemen DOM atau nilai mutabel yang tidak memicu re-render.
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Komponen BlurText menerima beberapa properti (props) untuk mengatur tampilan dan animasinya.
const BlurText = ({
  text = '',                 // Teks yang akan dianimasikan
  delay = 50,                // Jeda waktu animasi antar kata/huruf (dalam milidetik)
  className = '',            // Kelas CSS tambahan untuk gaya (styling)
  animateBy = 'words',       // Cara memecah teks: bisa 'words' (per kata) atau 'letters' (per huruf)
  direction = 'top',         // Arah munculnya teks: dari 'top' (atas) atau 'bottom' (bawah)
  threshold = 0.1,           // Seberapa banyak elemen harus terlihat di layar sebelum animasi dimulai (0.1 = 10%)
  rootMargin = '0px',        // Margin tambahan untuk area deteksi kemunculan elemen di layar
  animationFrom,             // Nilai animasi awal kustom (opsional)
  animationTo,               // Nilai animasi akhir kustom (opsional)
  easing = 'easeOut',        // Gaya transisi animasi (easeOut berarti melambat di akhir)
  onAnimationComplete,       // Fungsi yang akan dipanggil saat animasi selesai sepenuhnya
}) => {
  
  // 1. MEMECAH TEKS:
  // Jika animateBy adalah 'words', teks dipisah berdasarkan spasi (menjadi array kata).
  // Jika bukan 'words', teks dipisah per karakter (menjadi array huruf).
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  
  // 2. STATE UNTUK DETEKSI LAYAR:
  // inView menyimpan status apakah komponen ini sudah terlihat di layar pengguna atau belum.
  const [inView, setInView] = useState(false);
  
  // 3. REFERENSI ELEMEN (DOM):
  // ref digunakan untuk menunjuk langsung ke elemen HTML <p> agar bisa diamati posisinya di layar.
  // [DI LUAR MODUL] useRef: Menyimpan referensi elemen DOM atau nilai mutabel yang tidak memicu re-render.
  const ref = useRef();
  
  // animatedCount digunakan untuk menghitung berapa banyak kata/huruf yang sudah selesai dianimasikan.
  // [DI LUAR MODUL] useRef: Menyimpan referensi elemen DOM atau nilai mutabel yang tidak memicu re-render.
  const animatedCount = useRef(0);

  // 4. KONFIGURASI ANIMASI AWAL (Sebelum muncul):
  // Jika arahnya 'top', elemen sedikit naik (-10px). Jika 'bottom', elemen turun (10px).
  // Elemen dibuat sangat blur (10px) dan tidak terlihat (opacity: 0).
  const defaultFrom =
    direction === 'top'
      ? { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,-10px,0)' }
      : { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,10px,0)' };

  // 5. KONFIGURASI ANIMASI AKHIR (Setelah muncul penuh):
  // Blur hilang (0px), sepenuhnya terlihat (opacity: 1), dan kembali ke posisi asli (0,0,0).
  const defaultTo = [
    { filter: 'blur(0px)', opacity: 1, transform: 'translate3d(0,0,0)' },
  ];

  // 6. INTERSECTION OBSERVER (Deteksi Layar):
  // useEffect ini bertugas mengamati apakah elemen <p> sudah masuk ke jangkauan layar pengguna.
  // [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Jika elemen sudah masuk jangkauan pandang layar (isIntersecting)...
        if (entry.isIntersecting) {
          setInView(true); // Ubah state menjadi true (memicu animasi dimulai)
          observer.unobserve(ref.current); // Hentikan pengamatan agar animasi tidak berulang terus dari awal saat discroll
        }
      },
      { threshold, rootMargin } // Aturan kapan elemen dianggap terlihat
    );

    // Mulai amati elemen HTML yang ditunjuk oleh ref
    if (ref.current) {
      observer.observe(ref.current);
    }

    // Bersihkan (cleanup) observer ketika komponen dihapus dari layar
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    // <p> adalah pembungkus utama seluruh teks. 
    // flex-wrap memastikan teks bisa turun ke baris baru jika terlalu panjang.
    <p ref={ref} className={`inline-flex flex-wrap ${className}`}>
      
      {/* 7. LOOPING ELEMEN: 
          Kita memetakan (map) setiap kata/huruf di dalam array `elements` menjadi elemen <motion.span> */}
      {elements.map((element, index) => (
        <motion.span
          key={index} // Key unik yang dibutuhkan React saat melakukan perulangan
          
          // Titik awal animasi
          initial={animationFrom || defaultFrom} 
          
          // Titik tujuan animasi: Jika inView true, jalankan animasiTo. Jika false, tetap di posisi awal.
          animate={inView ? animationTo || defaultTo : animationFrom || defaultFrom}
          
          // Konfigurasi durasi dan jeda
          transition={{
            // Setiap kata/huruf memiliki jeda yang makin bertambah (delay * index), 
            // sehingga tercipta efek muncul bergantian (staggered).
            delay: index * (delay / 1000), 
            duration: 0.3,
            ease: easing,
          }}
          
          // Fungsi ini jalan setiap kali SATU kata/huruf selesai beranimasi.
          onAnimationComplete={() => {
            animatedCount.current += 1;
            // Jika jumlah yang selesai sama dengan total semua kata/huruf, berarti animasi selesai total.
            if (animatedCount.current === elements.length && onAnimationComplete) {
              onAnimationComplete();
            }
          }}
          
          // whitespace: 'pre-wrap' menjaga agar spasi tidak diabaikan oleh HTML
          style={{ display: 'inline-block', whiteSpace: 'pre-wrap' }}
        >
          {/* 8. MERENDER TEKS: 
              Jika elemennya spasi kosong, ubah jadi &nbsp; (\u00A0) agar terlihat sebagai spasi sungguhan di HTML */}
          {element === ' ' ? '\u00A0' : element}
          
          {/* Jika pemisahnya per kata, otomatis tambahkan spasi antar kata 
              (kecuali untuk kata yang paling terakhir) */}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </p>
  );
};

export default BlurText;
