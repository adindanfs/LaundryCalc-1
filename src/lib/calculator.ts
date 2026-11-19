// Menyediakan perhitungan berat ditagih (BL-01) serta rincian biaya layanan dan tambahan (BL-02).

import {
  ADD_ONS,
  MAIN_SERVICES,
  STORE_INFO,
  type MainService,
  type ServiceCode,
} from '../config';

export interface CalculationInput {
  serviceCode: ServiceCode;
  actualWeight: number | null;
  hasDelivery: boolean;
  hasPremiumScent: boolean;
}

export interface CalculationResult {
  service: MainService;
  actualWeight: number;
  billedWeight: number;
  isMinChargeApplied: boolean;
  mainCost: number;
  deliveryCost: number;
  scentCost: number;
  addOnTotal: number;
  totalEstimate: number;
}

export function getServiceByCode(code: ServiceCode): MainService {
  return (
    MAIN_SERVICES.find((item) => item.code === code) ?? MAIN_SERVICES[1]
  );
}

export function calculateEstimate(input: CalculationInput): CalculationResult {
  const service = getServiceByCode(input.serviceCode);
  const deliveryConfig = ADD_ONS.find((item) => item.code === 'T01');
  const scentConfig = ADD_ONS.find((item) => item.code === 'T02');

  const validWeight =
    input.actualWeight !== null &&
    Number.isFinite(input.actualWeight) &&
    input.actualWeight > 0
      ? input.actualWeight
      : 0;

  const isMinChargeApplied =
    validWeight > 0 && validWeight < STORE_INFO.minimum_charge_kg;

  const billedWeight =
    validWeight > 0
      ? Math.max(STORE_INFO.minimum_charge_kg, validWeight)
      : 0;

  const mainCost =
    billedWeight > 0 ? Math.round(billedWeight * service.price_per_kg) : 0;

  const deliveryCost =
    input.hasDelivery && deliveryConfig ? deliveryConfig.price : 0;

  const scentCost =
    input.hasPremiumScent && scentConfig && billedWeight > 0
      ? Math.round(billedWeight * scentConfig.price)
      : 0;

  const addOnTotal = deliveryCost + scentCost;
  const totalEstimate = mainCost + addOnTotal;

  return {
    service,
    actualWeight: validWeight,
    billedWeight,
    isMinChargeApplied,
    mainCost,
    deliveryCost,
    scentCost,
    addOnTotal,
    totalEstimate,
  };
}
