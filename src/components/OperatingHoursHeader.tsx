// Menampilkan jadwal operasional toko dan jadwal penjemputan di header halaman (FT-07).
import { STORE_INFO } from '../config';

export function OperatingHoursHeader() {
  return (
    <div className="mt-2 space-y-1 text-sm tabular-nums text-neutral-600">
      <p>Buka setiap hari {STORE_INFO.opening_hours}</p>
      <p>Jadwal jemput {STORE_INFO.pickup_hours}</p>
    </div>
  );
}
