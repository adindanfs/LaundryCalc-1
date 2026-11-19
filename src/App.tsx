// Menggabungkan katalog layanan, input berat, opsi tambahan, formulir pemesan, ringkasan biaya, dan dialog tinjauan LaundryCalc.
import { useMemo, useRef, useState } from 'react';
import { AddOnOptions } from './components/AddOnOptions';
import { OperatingHoursHeader } from './components/OperatingHoursHeader';
import { OrderForm } from './components/OrderForm';
import { OrderReviewDialog } from './components/OrderReviewDialog';
import { PriceSummaryBar } from './components/PriceSummaryBar';
import { ServiceCatalog } from './components/ServiceCatalog';
import { WeightInput } from './components/WeightInput';
import {
  DEFAULT_SERVICE_CODE,
  ESTIMATION_CLAUSE,
  STORE_INFO,
  type ServiceCode,
} from './config';
import { calculateEstimate } from './lib/calculator';
import { parseWeightInput } from './lib/format';
import {
  type FormFieldKey,
  type OrderFormErrors,
  validateOrderForm,
} from './lib/validation';
import { buildWhatsAppUrl } from './lib/whatsapp';

export default function App() {
  const [selectedServiceCode, setSelectedServiceCode] =
    useState<ServiceCode>(DEFAULT_SERVICE_CODE);
  const [weightInput, setWeightInput] = useState<string>('');
  const [hasDelivery, setHasDelivery] = useState<boolean>(false);
  const [hasPremiumScent, setHasPremiumScent] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>('');
  const [pickupAddress, setPickupAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [errors, setErrors] = useState<OrderFormErrors>({});
  const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false);

  const weightInputRef = useRef<HTMLInputElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const addressInputRef = useRef<HTMLTextAreaElement | null>(null);
  const reviewButtonRef = useRef<HTMLButtonElement | null>(null);

  const parsedWeight = useMemo(
    () => parseWeightInput(weightInput),
    [weightInput]
  );

  const calculation = useMemo(
    () =>
      calculateEstimate({
        serviceCode: selectedServiceCode,
        actualWeight: parsedWeight,
        hasDelivery,
        hasPremiumScent,
      }),
    [selectedServiceCode, parsedWeight, hasDelivery, hasPremiumScent]
  );

  const whatsAppUrl = useMemo(
    () =>
      buildWhatsAppUrl({
        customerName,
        pickupAddress,
        notes,
        hasDelivery,
        hasPremiumScent,
        calculation,
      }),
    [
      customerName,
      pickupAddress,
      notes,
      hasDelivery,
      hasPremiumScent,
      calculation,
    ]
  );

  const focusField = (field: FormFieldKey) => {
    const target =
      field === 'weight'
        ? weightInputRef.current
        : field === 'customerName'
          ? nameInputRef.current
          : addressInputRef.current;

    if (target) {
      target.scrollIntoView({ block: 'center' });
      target.focus();
    }
  };

  const handleWeightChange = (nextValue: string) => {
    setWeightInput(nextValue);
    if (errors.weight) {
      setErrors((prev) => ({ ...prev, weight: undefined }));
    }
  };

  const handleToggleDelivery = () => {
    setHasDelivery((prev) => {
      const next = !prev;
      if (!next && errors.pickupAddress) {
        setErrors((err) => ({ ...err, pickupAddress: undefined }));
      }
      return next;
    });
  };

  const handleCustomerNameChange = (nextValue: string) => {
    setCustomerName(nextValue);
    if (errors.customerName) {
      setErrors((prev) => ({ ...prev, customerName: undefined }));
    }
  };

  const handlePickupAddressChange = (nextValue: string) => {
    setPickupAddress(nextValue);
    if (errors.pickupAddress) {
      setErrors((prev) => ({ ...prev, pickupAddress: undefined }));
    }
  };

  const handleReviewClick = () => {
    const validation = validateOrderForm({
      weightInput,
      hasDelivery,
      customerName,
      pickupAddress,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      if (validation.firstErrorField) {
        focusField(validation.firstErrorField);
      }
      return;
    }

    setErrors({});
    setIsReviewOpen(true);
  };

  const handleCloseReview = () => {
    setIsReviewOpen(false);
    reviewButtonRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6">
          <p className="text-sm font-semibold text-orange-700">
            {STORE_INFO.name}
          </p>
          <h1 className="text-2xl font-semibold text-neutral-900">
            Kalkulator Estimasi Laundry
          </h1>
          <OperatingHoursHeader />
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-8 px-4 py-6 sm:px-6 sm:py-8">
        <ServiceCatalog
          selectedCode={selectedServiceCode}
          onSelect={setSelectedServiceCode}
        />

        <WeightInput
          value={weightInput}
          billedWeight={calculation.billedWeight}
          isMinChargeApplied={calculation.isMinChargeApplied}
          error={errors.weight}
          inputRef={weightInputRef}
          onChange={handleWeightChange}
        />

        <AddOnOptions
          hasDelivery={hasDelivery}
          hasPremiumScent={hasPremiumScent}
          billedWeight={calculation.billedWeight}
          scentCost={calculation.scentCost}
          onToggleDelivery={handleToggleDelivery}
          onTogglePremiumScent={() => setHasPremiumScent((prev) => !prev)}
        />

        <OrderForm
          customerName={customerName}
          pickupAddress={pickupAddress}
          notes={notes}
          hasDelivery={hasDelivery}
          errors={errors}
          nameInputRef={nameInputRef}
          addressInputRef={addressInputRef}
          onCustomerNameChange={handleCustomerNameChange}
          onPickupAddressChange={handlePickupAddressChange}
          onNotesChange={setNotes}
        />

        <p className="text-sm text-neutral-600">{ESTIMATION_CLAUSE}</p>

        <div className="h-32 sm:h-24" aria-hidden="true" />
      </main>

      <PriceSummaryBar
        calculation={calculation}
        reviewButtonRef={reviewButtonRef}
        onReviewClick={handleReviewClick}
      />

      <OrderReviewDialog
        isOpen={isReviewOpen}
        calculation={calculation}
        hasDelivery={hasDelivery}
        hasPremiumScent={hasPremiumScent}
        customerName={customerName}
        pickupAddress={pickupAddress}
        notes={notes}
        whatsAppUrl={whatsAppUrl}
        onClose={handleCloseReview}
      />
    </div>
  );
}
