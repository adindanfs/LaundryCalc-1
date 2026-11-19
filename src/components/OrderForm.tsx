// Mengelola formulir data pemesan termasuk alamat jemput kondisional dan catatan khusus (FT-05).
import { AlertCircle } from 'lucide-react';
import { type RefObject } from 'react';
import type { OrderFormErrors } from '../lib/validation';

interface OrderFormProps {
  customerName: string;
  pickupAddress: string;
  notes: string;
  hasDelivery: boolean;
  errors: OrderFormErrors;
  nameInputRef: RefObject<HTMLInputElement | null>;
  addressInputRef: RefObject<HTMLTextAreaElement | null>;
  onCustomerNameChange: (value: string) => void;
  onPickupAddressChange: (value: string) => void;
  onNotesChange: (value: string) => void;
}

export function OrderForm({
  customerName,
  pickupAddress,
  notes,
  hasDelivery,
  errors,
  nameInputRef,
  addressInputRef,
  onCustomerNameChange,
  onPickupAddressChange,
  onNotesChange,
}: OrderFormProps) {
  const nameId = 'customer-name-input';
  const nameErrorId = 'customer-name-error';
  const addressId = 'pickup-address-input';
  const addressErrorId = 'pickup-address-error';
  const notesId = 'order-notes-input';

  return (
    <section
      aria-labelledby="order-form-heading"
      className="rounded-2xl bg-white p-4 sm:p-6 space-y-4"
    >
      <h2
        id="order-form-heading"
        className="text-lg font-semibold text-neutral-900"
      >
        Data Pemesan
      </h2>

      <div className="space-y-2">
        <label
          htmlFor={nameId}
          className="block text-sm font-medium text-neutral-900"
        >
          Nama Pelanggan
        </label>
        <input
          ref={nameInputRef}
          id={nameId}
          name="customerName"
          type="text"
          autoComplete="name"
          value={customerName}
          onChange={(e) => onCustomerNameChange(e.target.value)}
          placeholder="Contoh: Budi Santoso"
          aria-invalid={Boolean(errors.customerName)}
          aria-describedby={errors.customerName ? nameErrorId : undefined}
          className={`min-h-[44px] w-full rounded-xl border bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700 focus-visible:ring-offset-2 ${
            errors.customerName ? 'border-red-800' : 'border-neutral-200'
          }`}
        />
        {errors.customerName && (
          <p
            id={nameErrorId}
            role="alert"
            className="flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-800"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{errors.customerName}</span>
          </p>
        )}
      </div>

      {hasDelivery && (
        <div className="space-y-2">
          <label
            htmlFor={addressId}
            className="block text-sm font-medium text-neutral-900"
          >
            Alamat Penjemputan
          </label>
          <textarea
            ref={addressInputRef}
            id={addressId}
            name="pickupAddress"
            rows={2}
            autoComplete="street-address"
            value={pickupAddress}
            onChange={(e) => onPickupAddressChange(e.target.value)}
            placeholder="Contoh: Jl. Melati No. 12, RT 02"
            aria-invalid={Boolean(errors.pickupAddress)}
            aria-describedby={errors.pickupAddress ? addressErrorId : undefined}
            className={`min-h-[44px] w-full rounded-xl border bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700 focus-visible:ring-offset-2 ${
              errors.pickupAddress ? 'border-red-800' : 'border-neutral-200'
            }`}
          />
          {errors.pickupAddress && (
            <p
              id={addressErrorId}
              role="alert"
              className="flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-800"
            >
              <AlertCircle
                className="mt-0.5 h-4 w-4 shrink-0"
                aria-hidden="true"
              />
              <span>{errors.pickupAddress}</span>
            </p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <label
          htmlFor={notesId}
          className="block text-sm font-medium text-neutral-900"
        >
          Catatan Khusus (Opsional)
        </label>
        <textarea
          id={notesId}
          name="notes"
          rows={2}
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Contoh: Pisahkan pakaian putih"
          className="min-h-[44px] w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700 focus-visible:ring-offset-2"
        />
      </div>
    </section>
  );
}
