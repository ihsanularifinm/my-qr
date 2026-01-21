# Pemindai QR Aman

Halaman Pemindai QR Code khusus yang dioptimalkan untuk login Hotspot MikroTik. Pemindai ini berjalan sepenuhnya di sisi klien (browser) dan mendukung pengalihan otomatis dengan kredensial.

## Fitur

- **Mode Ganda**: Pindai langsung dengan kamera atau unggah file gambar QR.
- **Kontrol Kamera Cerdas**: 
    - Privasi terjaga: Kamera hanya menyala saat diminta.
    - Otomatis "Berhenti" setelah pemindaian berhasil.
    - Indikator Visual (Ikon berubah) untuk status kamera.
- **Penanganan Error**: Pesan kesalahan yang ramah untuk masalah perizinan atau kode tidak valid.
- **Dukungan Universal**: Bekerja pada browser seluler dan desktop (Memerlukan HTTPS).

## Cara Kerja

1. Pengguna membuka halaman pemindai.
2. Mengklik "Mulai Kamera" (ikon video) meminta izin dan membuka feed video.
3. Setelah mendeteksi kode QR yang valid (format URL atau `user:pass`), kamera berhenti dan mengarahkan pengguna ke halaman Login Hotspot.
4. Jika file diunggah, sistem akan mendekode gambar statis tersebut.

## Kredit

- **Mesin Pemindai**: Didukung oleh [html5-qrcode](https://github.com/mebjas/html5-qrcode).
- **Ikon**: [Heroicons](https://heroicons.com/).
