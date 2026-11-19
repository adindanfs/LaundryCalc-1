# Keputusan Desain LaundryCalc

Dokumen ini mencatat seluruh keputusan visual dan tata letak yang disetujui untuk LaundryCalc.

## Pilihan Desain Pengguna

| Aspek | Keputusan | Token / Implementasi |
| :--- | :--- | :--- |
| Kesan visual | Ramah dan hangat | `@fontsource/plus-jakarta-sans` (400, 500, 600) |
| Warna aksen | Oranye | `bg-orange-700`, `hover:bg-orange-800`, `text-orange-700`, `border-orange-700`, `bg-orange-50` |
| Sapaan pengguna | Anda | Kalimat aktif sopan memakai sapaan "Anda" |
| Susunan halaman | Satu halaman bergulir | Alur vertikal mobile-first (`360 px` ke atas), melebar rapi di layar desktop |
| Posisi aksi utama | Bar menempel di bawah layar + tinjauan pesanan | Sticky bottom bar dengan tombol `Tinjau Pesanan`, lalu drawer bawah (ponsel) atau modal (desktop) untuk konfirmasi dan tombol `Kirim ke WhatsApp` |
| Gambar | Tanpa gambar | Kartu layanan ringkas berbasis tipografi dan hierarki angka |
| Info jadwal (FT-07) | Teks polos dua baris di header | Dua baris ringkas `text-sm tabular-nums text-neutral-600` di bawah judul halaman tanpa kotak atau ikon |

## Token Permukaan, Tipografi, dan Status

- **Latar halaman**: `bg-neutral-50`
- **Kartu dan panel**: `bg-white` tanpa bayangan, dipisah dengan ruang dan `border-neutral-200` khusus untuk input, garis pemisah, serta batas elemen pilihan
- **Bayangan**: Hanya pada bilah ringkasan melayang di bawah layar (`shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]`)
- **Sudut**: Panel `rounded-2xl`, input dan tombol `rounded-xl`
- **Teks**: Utama `text-neutral-900`, pendukung `text-neutral-600`, placeholder `placeholder:text-neutral-500`, ukuran minimum `14 px` (`text-sm`), teks input `16 px` (`text-base`), angka memakai `tabular-nums`
- **Status semantik**:
  - Informasi *minimum charge* 3 kg: `bg-amber-50 text-amber-800` dengan ikon `Info`
  - Error validasi kolom: `bg-red-50 text-red-800` atau pesan `text-red-800` dengan ikon `AlertCircle`
- **Cincin fokus**: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700 focus-visible:ring-offset-2`
