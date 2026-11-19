// Menampilkan bilah ringkasan biaya langsung (FT-04) dengan tombol pemicu tinjauan pesanan.
import { type RefObject } from 'react';
import type { CalculationResult } from '../lib/calculator';
import { formatRupiah } from '../lib/format';

interface PriceSummaryBarProps {
  calculation: CalculationResult;
  reviewButtonRef: RefObject<HTMLButtonElement | null>;
  onReviewClick: () => void;
}

export function PriceSummaryBar({
  calculation,
  reviewButtonRef,
  onReviewClick,
}: PriceSummaryBarProps) {
  return (
    <aside
      aria-label="Ringkasan Estimasi Biaya"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-neutral-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-2 px-4 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-3">
        <div className="flex items-center justify-between gap-4 sm:flex-1">
          <div>
            <p className="text-sm font-medium text-neutral-600">
              Total Estimasi
            </p>
            <p className="text-2xl font-semibold tabular-nums text-neutral-900 sm:text-3xl">
              {formatRupiah(calculation.totalEstimate)}
            </p>
          </div>

          <div className="text-right text-sm tabular-nums text-neutral-600 sm:flex sm:items-center sm:gap-6 sm:text-left">
            <div>
              <span className="text-neutral-600">Utama: </span>
              <span className="font-semibold text-neutral-900">
                {formatRupiah(calculation.mainCost)}
              </span>
            </div>
            <div>
              <span className="text-neutral-600">Tambahan: </span>
              <span className="font-semibold text-neutral-900">
                {formatRupiah(calculation.addOnTotal)}
              </span>
            </div>
          </div>
        </div>

        <button
          ref={reviewButtonRef}
          type="button"
          onClick={onReviewClick}
          className="inline-flex min-h-[44px] w-full shrink-0 items-center justify-center whitespace-nowrap rounded-xl bg-orange-700 px-6 py-2.5 text-base font-semibold text-white transition-[background-color,transform] duration-150 ease-out hover:bg-orange-800 active:scale-[0.99] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700 focus-visible:ring-offset-2 sm:w-auto"
        >
          Tinjau Pesanan
        </button>
      </div>
    </aside>
  );
}
