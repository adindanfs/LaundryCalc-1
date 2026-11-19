// Menyediakan validasi formulir pesanan (BL-03) beserta penentuan kolom error pertama.

import { parseWeightInput } from './format';

export type FormFieldKey = 'weight' | 'customerName' | 'pickupAddress';

export interface OrderFormValues {
  weightInput: string;
  hasDelivery: boolean;
  customerName: string;
  pickupAddress: string;
}

export type OrderFormErrors = Partial<Record<FormFieldKey, string>>;

export interface ValidationResult {
  isValid: boolean;
  errors: OrderFormErrors;
  firstErrorField: FormFieldKey | null;
}

export function validateOrderForm(values: OrderFormValues): ValidationResult {
  const errors: OrderFormErrors = {};

  const parsedWeight = parseWeightInput(values.weightInput);
  if (parsedWeight === null) {
    errors.weight =
      'Masukkan berat cucian lebih dari 0 kg, contoh: 2,5.';
  }

  if (values.customerName.trim().length === 0) {
    errors.customerName =
      'Masukkan nama Anda agar admin mudah mencatat pesanan, contoh: Budi Santoso.';
  }

  if (values.hasDelivery && values.pickupAddress.trim().length === 0) {
    errors.pickupAddress =
      'Masukkan alamat penjemputan lengkap, contoh: Jl. Melati No. 12, RT 02.';
  }

  const fieldOrder: FormFieldKey[] = [
    'weight',
    'customerName',
    'pickupAddress',
  ];
  const firstErrorField =
    fieldOrder.find((field) => Boolean(errors[field])) ?? null;

  return {
    isValid: firstErrorField === null,
    errors,
    firstErrorField,
  };
}
