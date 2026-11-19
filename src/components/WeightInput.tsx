// Mengelola kolom input estimasi berat cucian dan notifikasi aturan minimum charge 3 kg (FT-02).
import { AlertCircle, Info } from 'lucide-react';
import { type RefObject } from 'react';
import { STORE_INFO } from '../config';
import { formatWeight } from '../lib/format';

interface WeightInputProps {
  value: string;
  billedWeight: number;
  isMinChargeApplied: boolean;
  error?: string;
  inputRef: RefObject<HTMLInputElement | null>;
  onChange: (value: string) => void;
}

export function WeightInput({
  value,
  billedWeight,
  isMinChargeApplied,
  error,
  inputRef,
  onChange,
}: WeightInputProps) {
  const inputId = 'laundry-weight-input';
  const errorId = 'laundry-weight-error';
  const minChargeText = formatWeight(STORE_INFO.minimum_charge_kg);

  return (
    <section
      aria-labelledby="weight-heading"
      className="rounded-2xl bg-white p-4 sm:p-6 space-y-4"
    >
      <h2 id="weight-heading" className="text-lg font-semibold text-neutral-900">
        Estimasi Berat Cucian
      </h2>

      <div className="space-y-2">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-neutral-900"
        >
          Berat Cucian (kg)
        </label>

        <div className="relative flex items-center">
          <input
            ref={inputRef}
            id={inputId}
            name="weight"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Contoh: 2,5"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            className={`min-h-[44px] w-full rounded-xl border bg-white px-4 py-3 pr-12 text-base tabular-nums text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700 focus-visible:ring-offset-2 ${
              error ? 'border-red-800' : 'border-neutral-200'
            }`}
          />
          <span className="pointer-events-none absolute right-4 text-sm font-medium text-neutral-600">
            kg
          </span>
        </div>

        <p className="text-sm text-neutral-600">
          Minimal penagihan {minChargeText} kg per pesanan.
        </p>

        {error && (
          <p
            id={errorId}
            role="alert"
            className="flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-800"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </p>
        )}
      </div>

      {isMinChargeApplied && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800"
        >
          <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p>
            Minimum charge {minChargeText} kg berlaku. Berat ditagih dihitung
            sebagai{' '}
            <span className="font-semibold tabular-nums">
              {formatWeight(billedWeight)} kg
            </span>
            .
          </p>
        </div>
      )}
    </section>
  );
}
