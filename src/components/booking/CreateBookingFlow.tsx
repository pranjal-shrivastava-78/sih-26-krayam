import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CropInfo, ProcurementCentre, SlotTimeWindow, Booking } from '../../types';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  IndianRupee,
  Building2,
  CalendarCheck,
  RotateCcw
} from 'lucide-react';
import { RescheduleModal } from './RescheduleModal';

const TIME_SLOTS: { slot: SlotTimeWindow; desc: string }[] = [
  { slot: 'Morning (08:00 AM - 11:30 AM)', desc: 'Fastest weighbridge clearance' },
  { slot: 'Midday (11:30 AM - 02:30 PM)', desc: 'Standard turnaround time' },
  { slot: 'Afternoon (02:30 PM - 05:30 PM)', desc: 'Late gate entry window' },
];

export const CreateBookingFlow: React.FC = () => {
  const { 
    crops, 
    centres, 
    farmer, 
    createBooking, 
    activeBooking, 
    setActiveView,
    t
  } = useApp();

  const [step, setStep] = useState<number>(1);
  const [selectedCropId, setSelectedCropId] = useState<string>(crops[0]?.id || 'crop-wheat');
  const [quantityQuintals, setQuantityQuintals] = useState<number>(65);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  const [expectedDate, setExpectedDate] = useState<string>(tomorrowStr);

  const [selectedCentreId, setSelectedCentreId] = useState<string>(centres[0]?.id || 'centre-samrala');
  const [selectedSlot, setSelectedSlot] = useState<SlotTimeWindow>(TIME_SLOTS[0].slot);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookingError, setBookingError] = useState<string>('');

  const selectedCrop = crops.find(c => c.id === selectedCropId) || crops[0];
  const selectedCentre = centres.find(c => c.id === selectedCentreId) || centres[0];

  const eligibleCentres = centres.filter(c => c.acceptedCropIds.includes(selectedCropId));
  const estimatedTotalPayout = quantityQuintals * (selectedCrop?.mspPerQuintal || 0);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setBookingError('');
    try {
      const booking = await createBooking({
        cropId: selectedCropId,
        quantityQuintals,
        expectedDate,
        centreId: selectedCentreId,
        slot: selectedSlot
      });
      setConfirmedBooking(booking);
      setStep(5);
    } catch (err: any) {
      setBookingError(err.message || 'Failed to create booking on backend. Please check details.');
      alert(err.message || 'Failed to create booking on backend.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepsList = [
    { num: 1, titleEn: 'Select Crop', titleKey: 'selectCrop' as const },
    { num: 2, titleEn: 'Enter Quantity', titleKey: 'enterQuantity' as const },
    { num: 3, titleEn: 'Select Centre', titleKey: 'selectCentre' as const },
    { num: 4, titleEn: 'Date & Time', titleKey: 'selectSlot' as const },
    { num: 5, titleEn: 'Confirm Booking', titleKey: 'confirmBooking' as const },
  ];

  return (
    <div className="space-y-6 w-full">
      
      {/* Existing Active Booking Banner */}
      {activeBooking && (
        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[6px] bg-[#E7F3EC] border border-[#CBD8D1] text-[#075E43] flex items-center justify-center flex-shrink-0">
              <CalendarCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#17231F]">
                  Existing Active Booking: <span className="font-mono text-[#075E43]">{activeBooking.id}</span>
                </span>
                <span className="px-1.5 py-0.2 rounded-[4px] text-[10px] font-bold bg-[#E7F3EC] text-[#16803C] border border-[#CBD8D1]">
                  {activeBooking.status}
                </span>
              </div>
              <div className="text-xs text-[#66736D] mt-0.5">
                {activeBooking.quantityQuintals} Qtl {activeBooking.cropName} at {activeBooking.centreName} ({activeBooking.expectedDate})
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView('tracking')}
              className="h-9 px-4 rounded-[6px] bg-[#0B6B4F] hover:bg-[#075E43] text-[#FFFFFF] text-xs font-semibold"
            >
              Track Live Queue
            </button>
            <button
              onClick={() => setIsRescheduleOpen(true)}
              className="h-9 px-3 rounded-[6px] bg-[#FFFFFF] border border-[#CBD8D1] hover:bg-[#F3F9F5] text-[#17231F] text-xs font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#075E43]" />
              <span>Reschedule</span>
            </button>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-5 sm:p-6 shadow-sm">
        <div className="flex items-baseline justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#17231F]">
              {t('procurementBooking')}
            </h1>
            <p className="text-xs sm:text-sm text-[#66736D] mt-1">
              Ministry of Agriculture & Farmers Welfare — Digital Mandi Slot Allotment
            </p>
          </div>
          <span className="text-xs font-mono text-[#075E43] font-semibold hidden sm:inline">
            Step {step} of 5
          </span>
        </div>

        {/* Section 16: Adaptive Stepper */}
        <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-[#EDF3EF]">
          {/* Mobile Stepper (< 640px): Compact progress bar & step indicator */}
          <div className="sm:hidden space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#063B2A] flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#063B2A] text-white flex items-center justify-center text-[10px] font-bold">
                  {step}
                </span>
                <span>{t(stepsList[step - 1].titleKey)}</span>
              </span>
              <span className="text-[11px] font-mono font-semibold text-[#075E43] bg-[#E7F3EC] px-2 py-0.5 rounded">
                Step {step} of 5
              </span>
            </div>
            <div className="w-full bg-[#EDF3EF] h-2 rounded-full overflow-hidden">
              <div 
                className="bg-[#075E43] h-full transition-all duration-300 rounded-full"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Desktop & Tablet Stepper (>= 640px): Full 5-column horizontal milestone view */}
          <div className="hidden sm:grid sm:grid-cols-5 gap-2">
            {stepsList.map((s) => {
              const isDone = step > s.num;
              const isCurrent = step === s.num;
              return (
                <div key={s.num} className="text-left">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      isDone 
                        ? 'bg-[#16803C] text-[#FFFFFF]' 
                        : isCurrent 
                        ? 'bg-[#063B2A] text-[#FFFFFF] ring-2 ring-[#B7DCC5]' 
                        : 'bg-[#EDF3EF] border border-[#CBD8D1] text-[#66736D]'
                    }`}>
                      {isDone ? <Check className="w-3.5 h-3.5" /> : s.num}
                    </div>
                    <div className={`h-[2px] flex-1 ${isDone ? 'bg-[#16803C]' : 'bg-[#CBD8D1]'} hidden md:block`} />
                  </div>
                  <div className={`text-xs font-semibold leading-tight ${isCurrent ? 'text-[#063B2A] font-bold' : 'text-[#17231F]'}`}>
                    {t(s.titleKey)}
                  </div>
                  <div className="text-[10px] text-[#66736D] hidden sm:block">
                    {s.titleEn}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Form Content Container */}
      <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-6 sm:p-8 shadow-sm">
        
        {/* STEP 1: Select Crop */}
        {step === 1 && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-lg font-bold text-[#17231F]">Step 1: Select Crop / फसल चुनें</h2>
              <p className="text-xs text-[#66736D] mt-0.5">
                Choose the agriculture produce you intend to bring to the procurement centre
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="cropSelect" className="block text-xs font-bold text-[#17231F] uppercase tracking-wide">
                Crop Type / फसल का प्रकार
              </label>
              <select
                id="cropSelect"
                value={selectedCropId}
                onChange={(e) => setSelectedCropId(e.target.value)}
                className="w-full h-11 px-3 rounded-[6px] border border-[#CBD8D1] bg-[#FFFFFF] text-sm text-[#17231F] focus:outline-none focus:border-[#16845F]"
              >
                {crops.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} — Official MSP: ₹{c.mspPerQuintal.toLocaleString('en-IN')}/Qtl ({c.season} Season)
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Crop Government MSP Details Box */}
            <div className="bg-[#F4FAF6] border border-[#B7DCC5] rounded-[6px] p-4 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-[#063B2A] uppercase">Notified MSP Rate</div>
                <div className="text-xl font-bold text-[#063B2A]">
                  ₹{selectedCrop.mspPerQuintal.toLocaleString('en-IN')} <span className="text-xs font-normal text-[#34443D]">/ Quintal</span>
                </div>
                <div className="text-xs text-[#66736D] mt-0.5">
                  Guaranteed Government of India Minimum Support Price
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-[#34443D]">Season: {selectedCrop.season}</div>
                <div className="text-xs text-[#16803C] font-semibold mt-0.5">Procurement Active</div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[6px] bg-[#0B6B4F] hover:bg-[#075E43] text-[#FFFFFF] font-semibold text-sm transition-colors"
              >
                <span>Continue to Step 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Enter Quantity */}
        {step === 2 && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-lg font-bold text-[#17231F]">Step 2: Enter Quantity / उपज की मात्रा</h2>
              <p className="text-xs text-[#66736D] mt-0.5">
                Specify expected crop quantity in quintals as per your registered landholding
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="quantityInput" className="block text-xs font-bold text-[#17231F] uppercase tracking-wide">
                Quantity in Quintals (Qtl)
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="quantityInput"
                  type="number"
                  min="5"
                  max="1000"
                  value={quantityQuintals}
                  onChange={(e) => setQuantityQuintals(Number(e.target.value) || 0)}
                  className="flex-1 h-11 px-3 rounded-[6px] border border-[#CBD8D1] bg-[#FFFFFF] text-base font-bold text-[#17231F] focus:outline-none focus:border-[#16845F]"
                />
                <span className="h-11 px-4 rounded-[6px] bg-[#EDF3EF] border border-[#CBD8D1] text-xs font-bold text-[#17231F] flex items-center justify-center">
                  Quintals
                </span>
              </div>
              <p className="text-[11px] text-[#66736D]">
                Maximum allowed for verified landholding (12.5 acres): 250 Quintals
              </p>
            </div>

            {/* Financial Estimate Strip */}
            <div className="bg-[#EDF3EF] border border-[#CBD8D1] rounded-[6px] p-4 flex items-center justify-between">
              <div>
                <div className="text-xs text-[#66736D] font-bold uppercase">Estimated Gross DBT Payment</div>
                <div className="text-2xl font-bold text-[#063B2A] mt-0.5">
                  ₹{estimatedTotalPayout.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-[#66736D] mt-0.5">
                  {quantityQuintals} Qtl × ₹{selectedCrop.mspPerQuintal}/Qtl
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-semibold text-[#17231F]">Linked Bank Account</div>
                <div className="text-xs font-mono text-[#075E43] font-bold mt-0.5">{farmer?.bankAccountMasked}</div>
              </div>
            </div>

            <div className="pt-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center justify-center gap-1.5 h-11 px-4 rounded-[6px] border border-[#CBD8D1] hover:bg-[#F3F9F5] text-[#17231F] text-xs font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={quantityQuintals <= 0}
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[6px] bg-[#0B6B4F] hover:bg-[#075E43] text-[#FFFFFF] font-semibold text-sm transition-colors disabled:opacity-50"
              >
                <span>Continue to Step 3</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Select Centre */}
        {step === 3 && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <h2 className="text-lg font-bold text-[#17231F]">Step 3: Select Procurement Centre / क्रय केंद्र चुनें</h2>
              <p className="text-xs text-[#66736D] mt-0.5">
                Choose the nearest government grain mandi or state warehouse accepting {selectedCrop.name}
              </p>
            </div>

            <div className="space-y-3">
              {eligibleCentres.map((centre) => {
                const isSelected = selectedCentreId === centre.id;
                return (
                  <label
                    key={centre.id}
                    className={`block p-4 rounded-[6px] border cursor-pointer transition-colors ${
                      isSelected
                        ? 'border-[#075E43] bg-[#E7F3EC]'
                        : 'border-[#CBD8D1] bg-[#FFFFFF] hover:bg-[#F3F9F5]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="centreRadio"
                        checked={isSelected}
                        onChange={() => setSelectedCentreId(centre.id)}
                        className="mt-1 text-[#075E43] focus:ring-[#075E43]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-[#17231F]">{centre.name}</span>
                          <span className="text-xs font-bold text-[#075E43] bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#CBD8D1]">
                            {centre.distanceKm} km away
                          </span>
                        </div>
                        <div className="text-xs text-[#66736D] mt-0.5">
                          {centre.location.address}, {centre.location.district}
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-[11px] text-[#34443D]">
                          <span>In-Charge: {centre.officerInCharge}</span>
                          <span>•</span>
                          <span>Operating Hours: {centre.operatingHours.opens} – {centre.operatingHours.closes}</span>
                          <span>•</span>
                          <span className="text-[#16803C] font-semibold">{centre.availableSlots || 24} slots available</span>
                        </div>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>

            <div className="pt-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center justify-center gap-1.5 h-11 px-4 rounded-[6px] border border-[#CBD8D1] hover:bg-[#F3F9F5] text-[#17231F] text-xs font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(4)}
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[6px] bg-[#0B6B4F] hover:bg-[#075E43] text-[#FFFFFF] font-semibold text-sm transition-colors"
              >
                <span>Continue to Step 4</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Select Date & Time */}
        {step === 4 && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-lg font-bold text-[#17231F]">Step 4: Select Date & Time / तारीख एवं समय चुनें</h2>
              <p className="text-xs text-[#66736D] mt-0.5">
                Reserve your designated arrival window to ensure direct weighbridge access
              </p>
            </div>

            {/* Date Input */}
            <div className="space-y-2">
              <label htmlFor="preferredDate" className="block text-xs font-bold text-[#17231F] uppercase tracking-wide">
                Preferred Date / तारीख
              </label>
              <input
                id="preferredDate"
                type="date"
                min={tomorrowStr}
                value={expectedDate}
                onChange={(e) => setExpectedDate(e.target.value)}
                className="w-full h-11 px-3 rounded-[6px] border border-[#CBD8D1] bg-[#FFFFFF] text-sm text-[#17231F] focus:outline-none focus:border-[#16845F]"
              />
            </div>

            {/* Time Slots */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#17231F] uppercase tracking-wide">
                Time Window / समय स्लॉट
              </label>
              <div className="space-y-2.5">
                {TIME_SLOTS.map((tSlot) => {
                  const isSelected = selectedSlot === tSlot.slot;
                  return (
                    <label
                      key={tSlot.slot}
                      className={`block p-3.5 rounded-[6px] border cursor-pointer transition-colors ${
                        isSelected
                          ? 'border-[#075E43] bg-[#E7F3EC]'
                          : 'border-[#CBD8D1] bg-[#FFFFFF] hover:bg-[#F3F9F5]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="slotRadio"
                          checked={isSelected}
                          onChange={() => setSelectedSlot(tSlot.slot)}
                          className="text-[#075E43] focus:ring-[#075E43]"
                        />
                        <div className="flex-1 flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-[#17231F]">{tSlot.slot}</span>
                            <div className="text-[11px] text-[#66736D]">{tSlot.desc}</div>
                          </div>
                          <span className="text-[11px] font-semibold text-[#16803C]">Available</span>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <button
                onClick={() => setStep(3)}
                className="inline-flex items-center justify-center gap-1.5 h-11 px-4 rounded-[6px] border border-[#CBD8D1] hover:bg-[#F3F9F5] text-[#17231F] text-xs font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleConfirm}
                disabled={isSubmitting}
                className={`inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[6px] ${
                  isSubmitting ? 'bg-[#66736D] cursor-not-allowed' : 'bg-[#0B6B4F] hover:bg-[#075E43]'
                } text-[#FFFFFF] font-semibold text-sm transition-colors`}
              >
                <span>{isSubmitting ? 'Submitting to Backend...' : 'Confirm & Generate Token'}</span>
                <CheckCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Confirm Booking */}
        {step === 5 && (
          <div className="space-y-6 max-w-2xl text-center mx-auto py-4">
            <div className="w-12 h-12 rounded-full bg-[#E7F3EC] border border-[#16803C] text-[#16803C] flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-[#16803C] bg-[#E7F3EC] px-2.5 py-1 rounded-[4px] border border-[#CBD8D1]">
                Booking Confirmed & Token Generated
              </span>
              <h2 className="text-2xl font-bold text-[#17231F] mt-2">
                Token No: <span className="font-mono text-[#063B2A]">{confirmedBooking?.id || 'BK-2026-9481'}</span>
              </h2>
              <p className="text-xs text-[#66736D] mt-1">
                An official SMS confirmation has been dispatched to {farmer?.mobileNumber}
              </p>
            </div>

            {/* Booking Summary Table */}
            <div className="border border-[#CBD8D1] rounded-[6px] overflow-hidden text-left">
              <table className="gov-table">
                <tbody>
                  <tr>
                    <td className="w-2/5 bg-[#EDF3EF] font-semibold text-xs text-[#17231F]">Crop & Quantity</td>
                    <td className="font-bold text-xs text-[#17231F]">{selectedCrop.name} — {quantityQuintals} Qtl</td>
                  </tr>
                  <tr>
                    <td className="bg-[#EDF3EF] font-semibold text-xs text-[#17231F]">Procurement Mandi</td>
                    <td className="text-xs text-[#17231F] font-bold">{selectedCentre.name}</td>
                  </tr>
                  <tr>
                    <td className="bg-[#EDF3EF] font-semibold text-xs text-[#17231F]">Allotted Date & Slot</td>
                    <td className="text-xs text-[#17231F]">{expectedDate} ({selectedSlot.split('(')[0].trim()})</td>
                  </tr>
                  <tr>
                    <td className="bg-[#EDF3EF] font-semibold text-xs text-[#17231F]">Estimated DBT Payout</td>
                    <td className="text-xs font-bold text-[#063B2A]">₹{estimatedTotalPayout.toLocaleString('en-IN')} (MSP ₹{selectedCrop.mspPerQuintal}/Qtl)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setActiveView('tracking')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[6px] bg-[#0B6B4F] hover:bg-[#075E43] text-[#FFFFFF] font-semibold text-sm transition-colors"
              >
                <span>Track Live Mandi Queue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setStep(1)}
                className="w-full sm:w-auto h-11 px-5 rounded-[6px] bg-[#FFFFFF] border border-[#CBD8D1] hover:bg-[#F3F9F5] text-[#17231F] font-semibold text-xs"
              >
                Book Another Slot
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Reschedule Modal */}
      {activeBooking && (
        <RescheduleModal
          booking={activeBooking}
          isOpen={isRescheduleOpen}
          onClose={() => setIsRescheduleOpen(false)}
        />
      )}

    </div>
  );
};
