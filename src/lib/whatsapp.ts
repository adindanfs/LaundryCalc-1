// Menyusun teks template pesanan WhatsApp sesuai PRD dan menghasilkan tautan deep-link wa.me.

import { STORE_INFO } from '../config';
import type { CalculationResult } from './calculator';
import { formatRupiah, formatWeight } from './format';

export interface WhatsAppOrderPayload {
  customerName: string;
  pickupAddress: string;
  notes: string;
  hasDelivery: boolean;
  hasPremiumScent: boolean;
  calculation: CalculationResult;
}

export function buildWhatsAppMessage(payload: WhatsAppOrderPayload): string {
  const {
    customerName,
    pickupAddress,
    notes,
    hasDelivery,
    hasPremiumScent,
    calculation,
  } = payload;

  const cleanedName = customerName.trim();
  const cleanedAddress = hasDelivery
    ? pickupAddress.trim()
    : 'Antar Sendiri ke Toko';
  const cleanedNotes = notes.trim() || '-';

  const deliveryLine = hasDelivery
    ? `Ya (+${formatRupiah(calculation.deliveryCost)})`
    : 'Tidak';
  const scentLine = hasPremiumScent
    ? `Ya (+${formatRupiah(calculation.scentCost)})`
    : 'Tidak';

  return [
    'Halo Admin Laundry, saya ingin memesan layanan laundry dengan rincian berikut:',
    '',
    `*Nama:* ${cleanedName}`,
    `*Layanan Utama:* ${calculation.service.name}`,
    `*Estimasi Berat:* ${formatWeight(calculation.actualWeight)} kg (Berat Ditagih: ${formatWeight(calculation.billedWeight)} kg)`,
    '*Layanan Tambahan:*',
    `- Antar-Jemput: ${deliveryLine}`,
    `- Pewangi Premium: ${scentLine}`,
    '',
    `*Alamat Penjemputan:* ${cleanedAddress}`,
    `*Catatan Khusus:* ${cleanedNotes}`,
    '',
    `*Estimasi Total Biaya:* *${formatRupiah(calculation.totalEstimate)}*`,
    '',
    '_(Catatan: Total di atas adalah estimasi awal. Berat pasti akan ditimbang kembali saat pakaian diterima oleh kasir/kurir laundry)._',
    '',
    'Mohon konfirmasi pesanan dan ketersediaan jadwalnya. Terima kasih!',
  ].join('\n');
}

export function buildWhatsAppUrl(payload: WhatsAppOrderPayload): string {
  const message = buildWhatsAppMessage(payload);
  return `https://wa.me/${STORE_INFO.whatsapp_number}?text=${encodeURIComponent(message)}`;
}
