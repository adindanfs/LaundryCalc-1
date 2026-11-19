// Menampilkan daftar paket layanan utama laundry (FT-01) dengan pemilihan satu paket aktif.
import { Check } from 'lucide-react';
import { MAIN_SERVICES, type ServiceCode } from '../config';
import { formatRupiah } from '../lib/format';

interface ServiceCatalogProps {
  selectedCode: ServiceCode;
  onSelect: (code: ServiceCode) => void;
}

export function ServiceCatalog({ selectedCode, onSelect }: ServiceCatalogProps) {
  return (
    <section aria-labelledby="catalog-heading" className="space-y-3">
      <h2 id="catalog-heading" className="text-lg font-semibold text-neutral-900">
        Pilih Paket Layanan
      </h2>
      <div
        role="radiogroup"
        aria-labelledby="catalog-heading"
        className="grid grid-cols-1 gap-3 md:grid-cols-3"
      >
        {MAIN_SERVICES.map((service) => {
          const isSelected = service.code === selectedCode;
          return (
            <button
              key={service.code}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(service.code)}
              className={`min-h-[44px] w-full rounded-2xl border p-4 text-left transition-[background-color,border-color,transform] duration-150 ease-out active:scale-[0.99] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700 focus-visible:ring-offset-2 ${
                isSelected
                  ? 'border-orange-700 bg-orange-50'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-base font-semibold text-neutral-900">
                  {service.name}
                </span>
                <span
                  aria-hidden="true"
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                    isSelected
                      ? 'border-orange-700 bg-orange-700 text-white'
                      : 'border-neutral-300 bg-white'
                  }`}
                >
                  {isSelected && <Check className="h-4 w-4" />}
                </span>
              </div>

              <p className="mt-2 text-base font-semibold tabular-nums text-orange-700">
                {formatRupiah(service.price_per_kg)} / kg
              </p>

              <p className="mt-1 text-sm font-medium text-neutral-900 tabular-nums">
                Estimasi selesai {service.duration_days} hari
              </p>

              <p className="mt-2 text-sm text-neutral-600">
                {service.description}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
