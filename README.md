# Alat QR Code untuk Hotspot MikroTik

Kumpulan utilitas QR Code lengkap yang dirancang khusus untuk lingkungan Hotspot MikroTik. Proyek ini mencakup **Pemindai QR** yang aman untuk login pengguna dan **Pembuat QR** untuk membuat kode voucher.

## Fitur

- **🔒 Pemindai Aman**: Bekerja dengan login Hotspot MikroTik. Mendukung kontrol kamera manual (Mulai/Berhenti) dan unggah file.
- **⚡ Pembuat Massal**: Membuat kode QR voucher yang dapat dicetak dari daftar username/password.
- **🎨 Tampilan Modern**: Dibuat dengan Tailwind CSS, mendukung Mode Gelap (Dark Mode), Glassmorphism, dan desain responsif.
- **🌐 Siap Offline**: Semua dependensi (library JS, CSS) di-hosting secara lokal. Tidak memerlukan CDN.
- **📱 Pengalaman Aplikasi**: Tata letak ramah seluler dengan animasi yang halus.

## Struktur Folder

- `scanner/` - Aplikasi Pemindai QR Code.
- `generator/` - Aplikasi Pembuat QR Code.
- `assets/` - Aset bersama (Ikon, Gambar).
- `css/` - Output Tailwind CSS bersama.
- `js/` - Library JavaScript bersama.

## Kredit & Library

Proyek ini menggunakan library open-source berikut:

- **[html5-qrcode](https://github.com/mebjas/html5-qrcode)** oleh mebjas - Untuk fungsi pemindaian QR Code.
- **[qrcode.js](https://davidshimjs.github.io/qrcodejs/)** oleh davidshimjs - Untuk menghasilkan gambar kode QR.
- **[Tailwind CSS](https://tailwindcss.com/)** - Untuk styling berbasis utilitas.
- **[Heroicons](https://heroicons.com/)** - Untuk ikon SVG yang indah.

## Lisensi

Proyek ini open-source dan gratis untuk digunakan dalam kustomisasi Hotspot MikroTik Anda.
