import React, { useState } from 'react';
import { Booking, SlotTimeWindow } from '../../types';
import { useApp } from '../../context/AppContext';
import { Clock, AlertTriangle, X, Check } from 'lucide-react';

interface RescheduleModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

const SLOTS: SlotTimeWindow[] = [
  'Morning (08:00 AM - 11:30 AM)',
  'Midday (11:30 AM - 02:30 PM)',
  'Afternoon (02:30 PM - 05:30 PM)',
];

export const RescheduleModal: React.FC<RescheduleModalProps> = ({ booking, isOpen, onClose }) => {
  const { rescheduleBooking } = useApp();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  const [newDate, setNewDate] = useState(minDateStr);
  const [newSlot, setNewSlot] = useState<SlotTimeWindow>(SLOTS[0]);
  const [success, setSuccess] = useState(false);

  if (!isOpen || !booking) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await rescheduleBooking(booking.id, newDate, newSlot);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1200);
    } catch (err: any) {
      alert(err.message || 'Rescheduling failed.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#063B2A]/60">
      <div className="bg-[#FFFFFF] rounded-[8px] border border-[#CBD8D1] w-full max-w-md overflow-hidden text-[#17231F] shadow-gov-dropdown">
        {/* Header */}
        <div className="bg-[#EDF3EF] px-5 py-3.5 border-b border-[#CBD8D1] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#075E43] font-bold block">
              Official Slot Re-allocation
            </span>
            <h3 className="font-bold text-base text-[#17231F]">Reschedule Mandi Slot / स्लॉट बदलें</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded text-[#66736D] hover:text-[#17231F] hover:bg-[#CBD8D1]/40">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5">
          {success ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 bg-[#E7F3EC] text-[#16803C] border border-[#B7DCC5] rounded-full flex items-center justify-center mx-auto shadow-xs">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h4 className="text-base font-bold text-[#17231F]">Slot Successfully Rescheduled</h4>
              <p className="text-xs text-[#66736D]">
                Your token has been updated to {newDate} ({newSlot.split('(')[0]}).
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-[#FFF9ED] border border-[#F0D7A7] rounded-[6px] text-xs text-[#B45309] flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  Rescheduling will retain your crop allocation for <strong>{booking.cropName}</strong> at <strong>{booking.centreName}</strong> while generating a new queue slot.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17231F] uppercase mb-1">
                  New Preferred Date / नई तारीख
                </label>
                <input
                  type="date"
                  min={minDateStr}
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full h-11 px-3 border border-[#CBD8D1] rounded-[6px] bg-[#FFFFFF] text-sm text-[#17231F] focus:outline-none focus:border-[#16845F]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17231F] uppercase mb-1">
                  Select Time Window / समय स्लॉट
                </label>
                <select
                  value={newSlot}
                  onChange={(e) => setNewSlot(e.target.value as SlotTimeWindow)}
                  className="w-full h-11 px-3 border border-[#CBD8D1] rounded-[6px] bg-[#FFFFFF] text-xs text-[#17231F] focus:outline-none focus:border-[#16845F]"
                >
                  {SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-3 border-t border-[#EDF3EF] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="h-10 px-4 rounded-[6px] border border-[#CBD8D1] hover:bg-[#F3F9F5] text-xs font-semibold text-[#17231F]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-10 px-5 rounded-[6px] bg-[#0B6B4F] hover:bg-[#075E43] text-[#FFFFFF] text-xs font-semibold transition-colors"
                >
                  Confirm Reschedule
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
