# Daftar Fitur LaundryCalc

Dokumen ini mencatat daftar fitur dari PRD LaundryCalc v0.1, prioritas, ketergantungan antarfitur, status pengerjaan, dan catatan klarifikasi.

## Daftar Fitur

| Kode | Nama Fitur | Prioritas | Ketergantungan | Status |
| :--- | :--- | :--- | :--- | :--- |
| FT-01 | Tampilan Katalog & Durasi | Must Have | Tidak ada | Selesai |
| FT-02 | Input Berat & Notifikasi Min. Charge | Must Have | Tidak ada | Selesai |
| FT-03 | Opsi Add-on Terintegrasi | Must Have | FT-02 | Selesai |
| FT-04 | Floating Price Summary | Must Have | FT-01, FT-02, FT-03 | Selesai |
| FT-05 | Form Data Pemesan | Must Have | FT-03 | Selesai |
| FT-06 | WhatsApp Deep Link Button | Must Have | FT-01, FT-02, FT-03, FT-04, FT-05 | Selesai |
| FT-07 | Info Jam Operasional Toko | Should Have | Tidak ada | Selesai |

## Catatan Klarifikasi & Keputusan PRD

1. **Nomor WhatsApp toko**: PRD menuliskan placeholder `628xxxxxxxxxx`. Untuk prototipe yang dapat diuji langsung di browser tanpa data pribadi asli, dipakai nomor contoh `6281234567890` di `src/config.ts`.
2. **Format Rupiah dan desimal**: Mayoritas katalog, skenario uji, dan template WhatsApp di PRD memakai format `Rp 6.000` (dengan spasi setelah `Rp` dan titik pemisah ribuan), sedangkan nilai desimal berat memakai koma tanpa nol di belakang (contoh `1,8`, `4,5`, `3`). Input berat menerima titik maupun koma sebagai pemisah desimal.
3. **Paket bawaan & aroma pewangi**: Paket `L02` (Cuci Setrika) dipilih sebagai bawaan awal agar rincian estimasi langsung terbaca saat pengguna mulai mengisi berat. Opsi `T02` (Pewangi Premium) tetap berupa kotak centang aktif/tidak tanpa kolom pilihan aroma tambahan agar sesuai dengan template WhatsApp PRD.
4. **Pembulatan biaya**: Nilai uang disimpan sebagai bilangan bulat melalui pembulatan terdekat (`Math.round`) setelah berat ditagih dikalikan tarif per kg.
5. **Fitur FT-07**: Sesuai permintaan pengguna, fitur `FT-07` (Info Jam Operasional Toko) ditandai **Ditunda** dan tidak ditampilkan di antarmuka pada tahap ini.
