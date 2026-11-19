// Menampilkan pilihan layanan tambahan Antar-Jemput dan Pewangi Premium (FT-03).
import { Check } from 'lucide-react';
import { ADD_ONS } from '../config';
import { formatRupiah, formatWeight } from '../lib/format';

interface AddOnOptionsProps {
  hasDelivery: boolean;
  hasPremiumScent: boolean;
  billedWeight: number;
  scentCost: number;
  onToggleDelivery: () => void;
  onTogglePremiumScent: () => void;
}

export function AddOnOptions({
  hasDelivery,
  hasPremiumScent,
  billedWeight,
  scentCost,
  onToggleDelivery,
  onTogglePremiumScent,
}: AddOnOptionsProps) {
  return (
    <section aria-labelledby="addons-heading" className="space-y-3">
      <h2 id="addons-heading" className="text-lg font-semibold text-neutral-900">
        Layanan Tambahan
      </h2>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {ADD_ONS.map((addon) => {
          const isDelivery = addon.code === 'T01';
          const isChecked = isDelivery ? hasDelivery : hasPremiumScent;
          const handleToggle = isDelivery
            ? onToggleDelivery
            : onTogglePremiumScent;

          const priceLabel = isDelivery
            ? `+${formatRupiah(addon.price)}`
            : `+${formatRupiah(addon.price)} / kg ditagih`;

          return (
            <button
              key={addon.code}
              type="button"
              role="checkbox"
              aria-checked={isChecked}
              onClick={handleToggle}
              className={`min-h-[44px] w-full rounded-2xl border p-4 text-left transition-[background-color,border-color,transform] duration-150 ease-out active:scale-[0.99] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700 focus-visible:ring-offset-2 ${
                isChecked
                  ? 'border-orange-700 bg-orange-50'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="block text-base font-semibold text-neutral-900">
                    {addon.name}
                  </span>
                  <span className="block text-sm font-semibold tabular-nums text-orange-700">
                    {priceLabel}
                  </span>
                </div>

                <span
                  aria-hidden="true"
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${
                    isChecked
                      ? 'border-orange-700 bg-orange-700 text-white'
                      : 'border-neutral-300 bg-white'
                  }`}
                >
                  {isChecked && <Check className="h-4 w-4" />}
                </span>
              </div>

              <p className="mt-2 text-sm text-neutral-600">{addon.notes}</p>

              {!isDelivery && isChecked && billedWeight > 0 && (
                <p className="mt-2 text-sm font-medium tabular-nums text-neutral-900">
                  Biaya pewangi ({formatWeight(billedWeight)} kg):{' '}
                  {formatRupiah(scentCost)}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
