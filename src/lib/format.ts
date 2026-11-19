// Menyediakan fungsi pemformatan rupiah, berat desimal, dan penguraian input berat di seluruh aplikasi.

/**
 * Memformat bilangan bulat rupiah sesuai format PRD (contoh: "Rp 18.000").
 */
export function formatRupiah(amount: number): string {
  const rounded = Math.round(amount);
  const formatted = new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 0,
  }).format(rounded);
  return `Rp ${formatted}`;
}

/**
 * Memformat angka berat dengan koma dan tanpa nol di belakang (contoh: 1.8 -> "1,8", 3.0 -> "3").
 */
export function formatWeight(weight: number): string {
  if (!Number.isFinite(weight) || weight <= 0) {
    return '0';
  }
  const normalized = Number(weight.toFixed(2));
  return String(normalized).replace('.', ',');
}

/**
 * Mengurai string input berat yang menerima koma atau titik menjadi angka positif, atau null jika tidak valid.
 */
export function parseWeightInput(rawValue: string): number | null {
  const trimmed = rawValue.trim();
  if (!trimmed) {
    return null;
  }
  const normalized = trimmed.replace(',', '.');
  if (!/^\d+(\.\d+)?$/.test(normalized)) {
    return null;
  }
  const parsed = Number(normalized);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return null;
  }
  return parsed;
}
