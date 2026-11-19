// Menampilkan drawer bawah di ponsel dan modal terpusat di desktop untuk meninjau rincian biaya dan data pemesan sebelum mengirim ke WhatsApp.
import { Info, MessageCircle, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { ESTIMATION_CLAUSE, STORE_INFO } from '../config';
import type { CalculationResult } from '../lib/calculator';
import { formatRupiah, formatWeight } from '../lib/format';

interface OrderReviewDialogProps {
  isOpen: boolean;
  calculation: CalculationResult;
  hasDelivery: boolean;
  hasPremiumScent: boolean;
  customerName: string;
  pickupAddress: string;
  notes: string;
  whatsAppUrl: string;
  onClose: () => void;
}

export function OrderReviewDialog({
  isOpen,
  calculation,
  hasDelivery,
  hasPremiumScent,
  customerName,
  pickupAddress,
  notes,
  whatsAppUrl,
  onClose,
}: OrderReviewDialogProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    panelRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const trimmedName = customerName.trim();
  const displayAddress = hasDelivery
    ? pickupAddress.trim()
    : 'Antar Sendiri ke Toko';
  const displayNotes = notes.trim() || '-';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
      role="presentation"
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-neutral-900/50 transition-opacity duration-150 ease-out motion-reduce:transition-none"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-dialog-title"
        tabIndex={-1}
        className="relative z-10 flex max-h-[85vh] w-full flex-col rounded-t-2xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)] transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none focus:outline-none sm:max-w-lg sm:rounded-2xl"
      >
        <div className="flex justify-center pt-3 sm:hidden" aria-hidden="true">
          <span className="h-1 w-12 rounded-full bg-neutral-300" />
        </div>

        <div className="flex items-center justify-between gap-4 border-b border-neutral-200 px-4 py-3 sm:px-6 sm:py-4">
          <h2
            id="review-dialog-title"
            className="text-lg font-semibold text-neutral-900"
          >
            Tinjau Rincian Pesanan
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup tinjauan pesanan"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-neutral-600 transition-colors duration-150 ease-out hover:bg-neutral-100 hover:text-neutral-900 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700 focus-visible:ring-offset-2"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-neutral-600">
              Rincian Layanan & Biaya
            </h3>

            <dl className="divide-y divide-neutral-200 border-y border-neutral-200 text-sm">
              <div className="flex items-start justify-between gap-4 py-3">
                <dt className="text-neutral-600">Paket Layanan</dt>
                <dd className="text-right font-medium text-neutral-900">
                  <span className="block">{calculation.service.name}</span>
                  <span className="block text-neutral-600 tabular-nums">
                    {formatRupiah(calculation.service.price_per_kg)} / kg (
                    {calculation.service.duration_days} hari)
                  </span>
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="text-neutral-600">Estimasi Berat</dt>
                <dd className="font-medium tabular-nums text-neutral-900">
                  {formatWeight(calculation.actualWeight)} kg
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="text-neutral-600">Berat Ditagih</dt>
                <dd className="font-semibold tabular-nums text-neutral-900">
                  {formatWeight(calculation.billedWeight)} kg
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="text-neutral-600">Biaya Layanan Utama</dt>
                <dd className="font-semibold tabular-nums text-neutral-900">
                  {formatRupiah(calculation.mainCost)}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="text-neutral-600">Antar-Jemput</dt>
                <dd className="font-medium tabular-nums text-neutral-900">
                  {hasDelivery
                    ? formatRupiah(calculation.deliveryCost)
                    : 'Tidak dipilih'}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="text-neutral-600">Pewangi Premium</dt>
                <dd className="font-medium tabular-nums text-neutral-900">
                  {hasPremiumScent
                    ? formatRupiah(calculation.scentCost)
                    : 'Tidak dipilih'}
                </dd>
              </div>
            </dl>

            {calculation.isMinChargeApplied && (
              <div className="flex items-start gap-2 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">
                <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  Ketentuan minimum charge{' '}
                  {formatWeight(STORE_INFO.minimum_charge_kg)} kg berlaku pada
                  pesanan ini.
                </span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-neutral-600">
              Data Pemesan
            </h3>

            <dl className="divide-y divide-neutral-200 border-y border-neutral-200 text-sm">
              <div className="flex items-start justify-between gap-4 py-3">
                <dt className="shrink-0 text-neutral-600">Nama</dt>
                <dd className="text-right font-medium text-neutral-900">
                  {trimmedName}
                </dd>
              </div>

              <div className="flex items-start justify-between gap-4 py-3">
                <dt className="shrink-0 text-neutral-600">Penjemputan</dt>
                <dd className="text-right font-medium text-neutral-900">
                  {displayAddress}
                </dd>
              </div>

              <div className="flex items-start justify-between gap-4 py-3">
                <dt className="shrink-0 text-neutral-600">Catatan</dt>
                <dd className="text-right font-medium text-neutral-900">
                  {displayNotes}
                </dd>
              </div>
            </dl>
          </div>

          <div className="space-y-2 border-t border-neutral-200 pt-4">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-base font-semibold text-neutral-900">
                Total Estimasi
              </span>
              <span className="text-2xl font-semibold tabular-nums text-orange-700 sm:text-3xl">
                {formatRupiah(calculation.totalEstimate)}
              </span>
            </div>
            <p className="text-sm text-neutral-600">{ESTIMATION_CLAUSE}</p>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-neutral-200 px-4 py-3 sm:flex-row sm:justify-end sm:px-6 sm:py-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-base font-medium text-neutral-900 transition-colors duration-150 ease-out hover:bg-neutral-50 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700 focus-visible:ring-offset-2 sm:w-auto"
          >
            Ubah Data
          </button>

          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-orange-700 px-6 py-2.5 text-base font-semibold text-white transition-[background-color,transform] duration-150 ease-out hover:bg-orange-800 active:scale-[0.99] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700 focus-visible:ring-offset-2 sm:w-auto"
          >
            <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span>Kirim ke WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
