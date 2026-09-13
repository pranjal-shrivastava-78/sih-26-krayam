import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, 
  RotateCcw, 
  XCircle, 
  Check, 
  AlertTriangle, 
  FastForward,
  CalendarPlus,
  ArrowRight
} from 'lucide-react';
import { RescheduleModal } from '../booking/RescheduleModal';

export const QueueTrackerView: React.FC = () => {
  const { 
    activeBooking, 
    cancelBooking, 
    advanceQueue, 
    setActiveView,
    t
  } = useApp();

  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  if (!activeBooking) {
    return (
      <div className="w-full py-8">
        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-8 sm:p-12 text-center max-w-xl mx-auto shadow-sm">
          <div className="w-12 h-12 rounded-[6px] bg-[#E7F3EC] text-[#075E43] border border-[#CBD8D1] flex items-center justify-center mx-auto mb-4">
            <CalendarPlus className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#17231F]">
            {t('noActiveBooking')}
          </h2>
          <p className="text-sm text-[#66736D] mt-2 mb-6 leading-relaxed">
            {t('rescheduleNotice')}
          </p>
          <button
            onClick={() => setActiveView('booking')}
            className="inline-flex items-center gap-2 h-11 px-6 rounded-[6px] bg-[#0B6B4F] hover:bg-[#075E43] text-[#FFFFFF] font-semibold text-sm transition-colors"
          >
            <span>{t('bookSlotAction')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const queuePos = activeBooking.queuePosition || 3;
  const farmersAhead = activeBooking.farmersAhead !== undefined ? activeBooking.farmersAhead : Math.max(0, queuePos - 1);
  const waitMinutes = activeBooking.estimatedWaitMinutes || 25;

  // Timeline stages based on Section 12
  const timelineStages = [
    { 
      number: 1, 
      titleEn: 'Token Issued', 
      titleHi: 'टोकन जारी', 
      time: '08 Sep 2026 · 08:10 AM', 
      isDone: true, 
      isCurrent: false 
    },
    { 
      number: 2, 
      titleEn: 'Document Verification', 
      titleHi: 'दस्तावेज सत्यापन', 
      time: '08:35 AM', 
      isDone: true, 
      isCurrent: false 
    },
    { 
      number: 3, 
      titleEn: 'In Queue for Weighbridge', 
      titleHi: 'तौल कांटे के लिए कतार में', 
      time: 'Current stage', 
      isDone: queuePos < 3, 
      isCurrent: queuePos >= 3 || queuePos === 3 
    },
    { 
      number: 4, 
      titleEn: 'Weighing in Progress', 
      titleHi: 'तौल की प्रक्रिया', 
      time: 'Upcoming stage', 
      isDone: activeBooking.status === 'PROCESSING' || activeBooking.status === 'COMPLETED', 
      isCurrent: activeBooking.status === 'PROCESSING' 
    },
    { 
      number: 5, 
      titleEn: 'Quality Check', 
      titleHi: 'गुणवत्ता जांच', 
      time: 'Upcoming stage', 
      isDone: activeBooking.status === 'COMPLETED', 
      isCurrent: false 
    },
    { 
      number: 6, 
      titleEn: 'Procurement & Payment', 
      titleHi: 'क्रय एवं भुगतान', 
      time: 'Direct Benefit Transfer', 
      isDone: activeBooking.status === 'COMPLETED', 
      isCurrent: false 
    },
  ];

  const handleConfirmCancel = () => {
    cancelBooking(activeBooking.id);
    setShowCancelDialog(false);
  };

  return (
    <div className="space-y-6 w-full">
      
      {/* 10. Booking Summary Panel */}
      <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left info: Crop, Quantity, Location */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold text-[#17231F]">
                {activeBooking.cropName}
              </span>
              <span className="text-base sm:text-lg font-normal text-[#34443D]">
                / {activeBooking.quantityQuintals} Qtl
              </span>
            </div>

            <div className="mt-2 flex items-start gap-1.5 text-xs sm:text-sm text-[#34443D]">
              <MapPin className="w-4 h-4 text-[#075E43] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#17231F]">{activeBooking.centreName}</span>
                <span className="text-[#66736D] block sm:inline sm:ml-1">({activeBooking.centreLocation})</span>
              </div>
            </div>
          </div>

          {/* Right-side info: Live queue badge, Token No, Booking Date, Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-8 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#EDF3EF]">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-xs font-bold bg-[#E7F3EC] text-[#16803C] border border-[#CBD8D1]">
                  <span className="w-2 h-2 rounded-full bg-[#16803C] animate-pulse" />
                  LIVE QUEUE
                </span>
              </div>
              <div className="text-xs text-[#66736D]">
                Token No: <span className="font-mono font-bold text-[#17231F]">{activeBooking.id}</span>
              </div>
              <div className="text-xs text-[#66736D]">
                Booking: <span className="font-semibold text-[#17231F]">{activeBooking.expectedDate} ({activeBooking.slot.split('(')[0].trim()})</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsRescheduleOpen(true)}
                className="h-10 px-4 rounded-[6px] bg-[#FFFFFF] border border-[#CBD8D1] hover:border-[#075E43] hover:bg-[#F3F9F5] text-[#17231F] text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#075E43]" />
                <span>Reschedule Booking</span>
              </button>

              <button
                onClick={() => setShowCancelDialog(true)}
                className="h-10 px-3.5 rounded-[6px] bg-[#FFFFFF] border border-[#CBD8D1] hover:border-[#B42318] hover:bg-[#FFF5F5] text-[#B42318] text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 11. Queue Status Summary: Horizontal Information Strip */}
      <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] overflow-hidden shadow-sm">
        <div className="bg-[#EDF3EF] px-5 py-2.5 border-b border-[#CBD8D1] flex items-center justify-between">
          <span className="text-xs uppercase font-bold tracking-wider text-[#17231F]">
            Queue Status / कतार स्थिति
          </span>
          <span className="text-xs text-[#075E43] font-semibold">
            Mandi Gate No. 2
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#CBD8D1] p-4 sm:p-6 text-center">
          {/* Queue Position */}
          <div className="py-2 sm:py-0">
            <div className="text-xs uppercase font-bold tracking-wider text-[#66736D]">
              Queue Position / कतार संख्या
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-[#063B2A] font-mono mt-1">
              #{queuePos}
            </div>
            <div className="text-xs text-[#66736D] mt-1">
              Official Token Order
            </div>
          </div>

          {/* Farmers Ahead */}
          <div className="py-2 sm:py-0">
            <div className="text-xs uppercase font-bold tracking-wider text-[#66736D]">
              {t('farmersAhead')}
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-[#063B2A] font-mono mt-1">
              {farmersAhead}
            </div>
            <div className="text-xs text-[#66736D] mt-1">
              {t('people')}
            </div>
          </div>

          {/* Estimated Waiting Time */}
          <div className="py-2 sm:py-0">
            <div className="text-xs uppercase font-bold tracking-wider text-[#66736D]">
              {t('estimatedWaitTime')}
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-[#063B2A] mt-1">
              ~{waitMinutes} {t('minutesAbbr')}
            </div>
            <div className="text-xs text-[#66736D] mt-1">
              Average weighbridge pace
            </div>
          </div>
        </div>

        {/* Demo Simulation Trigger Bar */}
        <div className="bg-[#F5F8F6] border-t border-[#CBD8D1] px-5 py-2.5 flex items-center justify-between">
          <span className="text-xs text-[#66736D]">
            Official Queue Simulation Tool (for operational testing)
          </span>
          <button
            onClick={advanceQueue}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#075E43] hover:bg-[#063B2A] text-[#FFFFFF] text-xs font-semibold transition-colors"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>Advance Queue (Demo)</span>
          </button>
        </div>
      </div>

      {/* 2-Column Operational Layout: Section 12 Queue Progress & Section 13 Booking Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: 12. Queue Progress Timeline (7 cols) */}
        <div className="lg:col-span-6 bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-5 sm:p-6 shadow-sm">
          <div className="border-b border-[#CBD8D1] pb-3 mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#17231F]">
                Queue Progress / कतार प्रगति
              </h2>
              <p className="text-xs text-[#66736D]">
                Step-by-step verification and weighing pipeline
              </p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-[4px] bg-[#E7F3EC] text-[#075E43] border border-[#CBD8D1]">
              Live Feed
            </span>
          </div>

          <div className="space-y-0 relative">
            {timelineStages.map((stage, idx) => {
              const isLast = idx === timelineStages.length - 1;
              return (
                <div key={stage.number} className="relative flex items-start gap-4 pb-6 group">
                  {/* Vertical connecting line */}
                  {!isLast && (
                    <div 
                      className={`absolute left-[13px] top-[26px] bottom-0 w-[2px] ${
                        stage.isDone ? 'bg-[#16803C]' : 'bg-[#CBD8D1]'
                      }`} 
                    />
                  )}

                  {/* Stage Node Indicator */}
                  <div className="relative z-10 flex-shrink-0 mt-0.5">
                    {stage.isDone ? (
                      <div className="w-7 h-7 rounded-full bg-[#16803C] text-[#FFFFFF] flex items-center justify-center shadow-xs">
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      </div>
                    ) : stage.isCurrent ? (
                      <div className="w-7 h-7 rounded-full bg-[#063B2A] text-[#FFFFFF] flex items-center justify-center ring-4 ring-[#E7F3EC] font-bold text-xs">
                        {stage.number}
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-[#FFFFFF] border-2 border-[#CBD8D1] text-[#66736D] flex items-center justify-center text-xs font-bold">
                        {stage.number}
                      </div>
                    )}
                  </div>

                  {/* Stage Content */}
                  <div className={`flex-1 min-w-0 p-2.5 rounded-[6px] transition-colors ${
                    stage.isCurrent ? 'bg-[#E7F3EC] border border-[#B7DCC5]' : ''
                  }`}>
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm font-bold text-[#17231F] leading-tight">
                        {stage.titleEn}
                      </div>
                      {stage.isCurrent && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-[4px] bg-[#063B2A] text-[#FFFFFF] flex-shrink-0">
                          Current Stage
                        </span>
                      )}
                      {stage.isDone && (
                        <span className="text-[11px] font-semibold text-[#16803C] flex-shrink-0">
                          Completed ✓
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-[#34443D] font-['Noto_Sans_Devanagari'] mt-0.5">
                      {stage.titleHi}
                    </div>

                    <div className="text-[11px] text-[#66736D] mt-1">
                      {stage.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: 13. Booking Details Table (5 cols) */}
        <div className="lg:col-span-6 bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="border-b border-[#CBD8D1] pb-3 mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[#17231F]">
                  Booking Details / बुकिंग विवरण
                </h2>
                <p className="text-xs text-[#66736D]">
                  Official allocation certificate data
                </p>
              </div>
              <span className="font-mono text-xs text-[#075E43] font-bold">
                {activeBooking.id}
              </span>
            </div>

            {/* Official Table Style */}
            <div className="border border-[#CBD8D1] rounded-[6px] overflow-hidden">
              <table className="gov-table">
                <tbody>
                  <tr>
                    <td className="w-2/5 bg-[#EDF3EF] font-semibold text-[#17231F] text-xs">
                      Token Number
                    </td>
                    <td className="font-mono font-bold text-[#17231F] text-xs">
                      {activeBooking.id}
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-[#EDF3EF] font-semibold text-[#17231F] text-xs">
                      Crop / फसल
                    </td>
                    <td className="font-medium text-[#17231F] text-xs">
                      {activeBooking.cropName}
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-[#EDF3EF] font-semibold text-[#17231F] text-xs">
                      Quantity / मात्रा
                    </td>
                    <td className="font-bold text-[#075E43] text-xs">
                      {activeBooking.quantityQuintals} Quintals (Qtl)
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-[#EDF3EF] font-semibold text-[#17231F] text-xs">
                      Procurement Centre
                    </td>
                    <td className="text-xs text-[#17231F]">
                      <div className="font-bold">{activeBooking.centreName}</div>
                      <div className="text-[11px] text-[#66736D]">{activeBooking.centreLocation}</div>
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-[#EDF3EF] font-semibold text-[#17231F] text-xs">
                      Booking Date
                    </td>
                    <td className="text-xs text-[#17231F]">
                      {activeBooking.expectedDate} ({activeBooking.slot.split('(')[0].trim()})
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-[#EDF3EF] font-semibold text-[#17231F] text-xs">
                      Farmer Name
                    </td>
                    <td className="font-bold text-[#17231F] text-xs">
                      {activeBooking.farmerName}
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-[#EDF3EF] font-semibold text-[#17231F] text-xs">
                      Village / गाँव
                    </td>
                    <td className="text-xs text-[#17231F]">
                      Rampur Kalan (Samrala Tehsil)
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-[#EDF3EF] font-semibold text-[#17231F] text-xs">
                      District / जिला
                    </td>
                    <td className="text-xs text-[#17231F]">
                      Ludhiana, Punjab
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="mt-4 pt-3 border-t border-[#EDF3EF] flex items-center justify-between text-xs text-[#66736D]">
            <span className="flex items-center gap-1 text-[#16803C] font-semibold">
              <Check className="w-3.5 h-3.5" />
              Direct Mandi Linkage Verified
            </span>
            <span>Ref: PFMS-AGRI-2026</span>
          </div>
        </div>
      </div>

      {/* 14. Important Instructions Panel */}
      <div className="bg-[#FFF9ED] border border-[#F0D7A7] rounded-[8px] p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-[4px] bg-[#FFF3DC] border border-[#F0D7A7] text-[#D97706] flex items-center justify-center flex-shrink-0 font-bold">
            <AlertTriangle className="w-4 h-4 text-[#D97706]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#17231F]">
                Important Instructions / महत्वपूर्ण निर्देश
              </h3>
            </div>
            
            <ol className="mt-3 space-y-2.5 text-xs sm:text-sm text-[#34443D] list-decimal pl-5 leading-relaxed">
              <li>
                <div className="font-semibold text-[#17231F]">Keep your original documents ready.</div>
                <div className="text-xs text-[#66736D] font-['Noto_Sans_Devanagari']">कृपया अपने मूल दस्तावेज (आधार कार्ड, बैंक पासबुक, एवं फर्द) तैयार रखें।</div>
              </li>
              <li>
                <div className="font-semibold text-[#17231F]">Be present at the centre when your token is called.</div>
                <div className="text-xs text-[#66736D] font-['Noto_Sans_Devanagari']">आपकी टोकन संख्या बुलाए जाने पर केंद्र पर उपस्थित रहें।</div>
              </li>
              <li>
                <div className="font-semibold text-[#17231F]">Ensure your produce meets prescribed quality standards.</div>
                <div className="text-xs text-[#66736D] font-['Noto_Sans_Devanagari']">सुनिश्चित करें कि आपकी उपज सरकार द्वारा निर्धारित नमी और गुणवत्ता मानकों के अनुरूप है।</div>
              </li>
              <li>
                <div className="font-semibold text-[#17231F]">Follow the instructions of centre officials.</div>
                <div className="text-xs text-[#66736D] font-['Noto_Sans_Devanagari']">खरीद केंद्र के अधिकारियों और तौल कांटे कर्मचारियों के निर्देशों का पालन करें।</div>
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Reschedule Modal */}
      <RescheduleModal
        booking={activeBooking}
        isOpen={isRescheduleOpen}
        onClose={() => setIsRescheduleOpen(false)}
      />

      {/* Section 37: Confirmation Dialog for Cancellation */}
      {showCancelDialog && (
        <div className="fixed inset-0 bg-[#063B2A]/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] max-w-md w-full p-6 shadow-gov-dropdown">
            <div className="flex items-center gap-3 text-[#B42318] mb-3">
              <XCircle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-[#17231F]">
                Cancel Booking?
              </h3>
            </div>

            <p className="text-sm text-[#34443D] leading-relaxed mb-6">
              Your booking for <span className="font-bold text-[#17231F]">{activeBooking.cropName} — {activeBooking.quantityQuintals} Qtl</span> at <span className="font-bold text-[#17231F]">{activeBooking.centreName}</span> will be cancelled. Your queue token <span className="font-mono font-bold text-[#17231F]">#{queuePos}</span> will be released.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EDF3EF]">
              <button
                onClick={() => setShowCancelDialog(false)}
                className="h-10 px-4 rounded-[6px] bg-[#FFFFFF] border border-[#CBD8D1] hover:bg-[#F3F9F5] text-[#17231F] font-semibold text-xs"
              >
                Keep Booking
              </button>
              <button
                onClick={handleConfirmCancel}
                className="h-10 px-4 rounded-[6px] bg-[#B42318] hover:bg-[#911b12] text-[#FFFFFF] font-semibold text-xs transition-colors"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
