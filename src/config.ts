// Menyimpan seluruh data katalog resmi, aturan toko, dan pilihan bawaan aplikasi dari PRD.

export type ServiceCode = 'L01' | 'L02' | 'L03';
export type AddOnCode = 'T01' | 'T02';

export interface MainService {
  code: ServiceCode;
  name: string;
  price_per_kg: number;
  duration_days: number;
  description: string;
}

export interface AddOnService {
  code: AddOnCode;
  name: string;
  price: number;
  calculation_type: 'flat' | 'per_billed_kg';
  notes: string;
}

export const STORE_INFO = {
  name: 'LaundryCalc',
  // Nomor contoh untuk prototipe browser; ganti dengan nomor WA toko aktif saat rilis produksi.
  whatsapp_number: '6281234567890',
  opening_hours: '08:00 - 20:00 WIB',
  pickup_hours: '09:00 - 17:00 WIB',
  pickup_radius_max_km: 5,
  minimum_charge_kg: 3.0,
} as const;

export const DEFAULT_SERVICE_CODE: ServiceCode = 'L02';

export const MAIN_SERVICES: readonly MainService[] = [
  {
    code: 'L01',
    name: 'Cuci Lipat',
    price_per_kg: 6000,
    duration_days: 3,
    description: 'Dicuci, dikeringkan, dilipat tanpa setrika (Min. charge 3 kg)',
  },
  {
    code: 'L02',
    name: 'Cuci Setrika',
    price_per_kg: 8000,
    duration_days: 3,
    description: 'Dicuci, disetrika, dilipat rapi (Min. charge 3 kg)',
  },
  {
    code: 'L03',
    name: 'Cuci Setrika Ekspres',
    price_per_kg: 15000,
    duration_days: 1,
    description: 'Sama dengan Cuci Setrika, selesai besok (Min. charge 3 kg)',
  },
] as const;

export const ADD_ONS: readonly AddOnService[] = [
  {
    code: 'T01',
    name: 'Antar-Jemput',
    price: 10000,
    calculation_type: 'flat',
    notes: 'Area penjemputan radius max 5 km',
  },
  {
    code: 'T02',
    name: 'Pewangi Premium',
    price: 2000,
    calculation_type: 'per_billed_kg',
    notes: 'Aroma mewah pilihan tahan lama (Downy Passion / Mystique)',
  },
] as const;

export const ESTIMATION_CLAUSE =
  'Nominal di atas adalah estimasi awal sebelum penimbangan fisik oleh toko.';
