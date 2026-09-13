import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProcurementRecord, PaymentRecord } from '../../types';
import { 
  Check, 
  ArrowRight, 
  Circle, 
  IndianRupee, 
  Building2, 
  FileText,
  Printer
} from 'lucide-react';

export const ProcurementPaymentView: React.FC = () => {
  const { procurements, payments, farmer } = useApp();
  const [selectedRecord, setSelectedRecord] = useState<ProcurementRecord>(procurements[0]);

  // Lifecycle stages based on Section 18
  const getLifecycleStages = (record: ProcurementRecord) => {
    const isCompleted = record.procurementStatus === 'Accepted';
    return [
      { name: 'Vehicle Entry', nameHi: 'वाहन प्रवेश', status: 'done' },
      { name: 'Document Check', nameHi: 'दस्तावेज जांच', status: 'done' },
      { name: 'Weighing', nameHi: 'तौल (कांटा)', status: 'done' },
      { name: 'Quality Check', nameHi: 'गुणवत्ता जांच', status: isCompleted ? 'done' : 'current' },
      { name: 'Procurement', nameHi: 'क्रय अभिलेख', status: isCompleted ? 'done' : 'upcoming' },
      { name: 'Payment / DBT', nameHi: 'प्रत्यक्ष लाभ अंतरण', status: record.paymentStatus === 'Credited' ? 'done' : 'upcoming' },
    ];
  };

  return (
    <div className="space-y-6 w-full">
      {/* Page Header */}
      <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#17231F]">
              Procurement & DBT Clearance / तौल एवं भुगतान
            </h1>
            <p className="text-xs sm:text-sm text-[#66736D] mt-0.5">
              Verified mandi intake weighbridge slips, moisture grading, and automated bank disbursement
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-[4px] bg-[#E7F3EC] text-[#075E43] border border-[#CBD8D1]">
              PFMS Integrated
            </span>
          </div>
        </div>
      </div>

      {/* Main Container: Selected Transaction Details */}
      <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-5 sm:p-6 shadow-sm space-y-6">
        {/* Record Selection Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#CBD8D1]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#17231F]">
              Select Consignment:
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {procurements.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedRecord(p)}
                  className={`px-3 py-1.5 rounded-[4px] text-xs font-semibold border transition-colors ${
                    selectedRecord.id === p.id
                      ? 'bg-[#063B2A] text-[#FFFFFF] border-[#063B2A]'
                      : 'bg-[#FFFFFF] text-[#17231F] border-[#CBD8D1] hover:bg-[#F3F9F5]'
                  }`}
                >
                  {p.cropName.split(' ')[0]} ({p.date})
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs font-mono text-[#66736D]">
            Receipt Ref: <span className="font-bold text-[#17231F]">{selectedRecord.id}</span>
          </div>
        </div>

        {/* Section 18: Transaction Lifecycle Tracker */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#17231F]">
              Procurement Status / प्रक्रिया की स्थिति
            </h2>
            <span className="text-xs text-[#075E43] font-semibold">
              Live Mandi Weighbridge Pipeline
            </span>
          </div>

          {/* Horizontal Lifecycle Strip */}
          <div className="bg-[#F5F8F6] border border-[#CBD8D1] rounded-[6px] p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {getLifecycleStages(selectedRecord).map((stage, idx) => {
                return (
                  <div key={idx} className="flex flex-col items-center text-center p-2 rounded bg-[#FFFFFF] border border-[#CBD8D1]">
                    <div className="mb-1.5">
                      {stage.status === 'done' ? (
                        <div className="w-6 h-6 rounded-full bg-[#16803C] text-[#FFFFFF] flex items-center justify-center text-xs font-bold mx-auto">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : stage.status === 'current' ? (
                        <div className="w-6 h-6 rounded-full bg-[#063B2A] text-[#FFFFFF] flex items-center justify-center text-xs font-bold mx-auto ring-2 ring-[#B7DCC5]">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-[#EDF3EF] text-[#66736D] flex items-center justify-center text-xs font-bold mx-auto">
                          <Circle className="w-3 h-3 text-[#CBD8D1]" />
                        </div>
                      )}
                    </div>
                    <div className="text-xs font-bold text-[#17231F] leading-tight">
                      {stage.name}
                    </div>
                    <div className="text-[10px] text-[#66736D] font-['Noto_Sans_Devanagari'] mt-0.5">
                      {stage.nameHi}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section 18: Financial & Intake Information Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Financial Breakdown Table (8 cols) */}
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#17231F]">
                Weighing & Payment Information / वित्तीय एवं तौल विवरण
              </h2>
              <span className="text-xs text-[#66736D]">
                Mandi Weighbridge Slip #WB-88192
              </span>
            </div>

            <div className="border border-[#CBD8D1] rounded-[6px] overflow-hidden overflow-x-auto">
              <table className="gov-table min-w-[480px]">
                <tbody>
                  <tr>
                    <td className="w-1/2 bg-[#EDF3EF] font-semibold text-xs text-[#17231F]">
                      Gross Weight (Laden Tractor) / सकल भार
                    </td>
                    <td className="font-mono font-bold text-xs text-[#17231F]">
                      {selectedRecord.grossWeight || 78.4} Qtl
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-[#EDF3EF] font-semibold text-xs text-[#17231F]">
                      Tare Weight (Empty Tractor) / खाली वाहन भार
                    </td>
                    <td className="font-mono font-bold text-xs text-[#66736D]">
                      {selectedRecord.tareWeight || 13.4} Qtl
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-[#EDF3EF] font-semibold text-xs text-[#17231F]">
                      Net Produce Weight / शुद्ध उपज भार
                    </td>
                    <td className="font-mono font-bold text-xs text-[#063B2A]">
                      {selectedRecord.acceptedQuantity} Quintals (Qtl)
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-[#EDF3EF] font-semibold text-xs text-[#17231F]">
                      Official MSP Rate / न्यूनतम समर्थन मूल्य
                    </td>
                    <td className="font-bold text-xs text-[#17231F]">
                      ₹{selectedRecord.mspRate || 2275} per Quintal
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-[#EDF3EF] font-semibold text-xs text-[#17231F]">
                      Gross Amount / कुल राशि
                    </td>
                    <td className="font-mono font-bold text-xs text-[#17231F]">
                      ₹{(selectedRecord.grossAmount || (selectedRecord.acceptedQuantity * (selectedRecord.mspRate || 2275))).toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-[#EDF3EF] font-semibold text-xs text-[#17231F]">
                      Standard Deductions (Moisture / Dockage)
                    </td>
                    <td className="font-mono text-xs text-[#B45309]">
                      - ₹{(selectedRecord.deductions || 0).toLocaleString('en-IN')} ({selectedRecord.deductionReason})
                    </td>
                  </tr>
                  <tr className="bg-[#F4FAF6]">
                    <td className="bg-[#E7F3EC] font-bold text-sm text-[#063B2A]">
                      Final Payable Amount / शुद्ध देय राशि
                    </td>
                    <td className="font-mono font-black text-base text-[#063B2A]">
                      ₹{selectedRecord.paymentAmount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-[#EDF3EF] font-semibold text-xs text-[#17231F]">
                      Payment Status / भुगतान स्थिति
                    </td>
                    <td>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-xs font-bold border ${
                        selectedRecord.paymentStatus === 'Credited'
                          ? 'bg-[#E7F3EC] text-[#16803C] border-[#B7DCC5]'
                          : 'bg-[#FFF9ED] text-[#B45309] border-[#F0D7A7]'
                      }`}>
                        {selectedRecord.paymentStatus === 'Credited' ? '● CREDITED VIA DBT' : '● PROCESSING VIA PFMS'}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Card: Bank Account & Actions (4 cols) */}
          <div className="lg:col-span-4 bg-[#F5F8F6] border border-[#CBD8D1] rounded-[6px] p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-[#17231F] pb-2 border-b border-[#CBD8D1]">
                Disbursement Account Details
              </div>

              <div className="mt-3 space-y-2 text-xs">
                <div>
                  <span className="text-[#66736D] block">Beneficiary Farmer:</span>
                  <span className="font-bold text-[#17231F]">{farmer?.fullName}</span>
                </div>
                <div>
                  <span className="text-[#66736D] block">Farmer ID:</span>
                  <span className="font-mono font-bold text-[#17231F]">{farmer?.farmerId}</span>
                </div>
                <div>
                  <span className="text-[#66736D] block">Bank Account (Aadhaar Seeded):</span>
                  <span className="font-mono font-bold text-[#063B2A]">{farmer?.bankAccountMasked}</span>
                </div>
                <div>
                  <span className="text-[#66736D] block">Procurement Centre:</span>
                  <span className="text-[#17231F] font-medium">{selectedRecord.centreName}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#CBD8D1] space-y-2">
              <button
                onClick={() => window.print()}
                className="w-full h-10 rounded-[6px] bg-[#FFFFFF] border border-[#CBD8D1] hover:bg-[#EDF3EF] text-[#17231F] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-[#075E43]" />
                <span>Print Official Slip / रसीद प्रिंट करें</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Past DBT Payments History Strip */}
      <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-5 sm:p-6 shadow-sm">
        <h2 className="text-base font-bold text-[#17231F] mb-3">
          Direct Benefit Transfer (DBT) Ledger / बैंक अंतरण इतिहास
        </h2>

        <div className="border border-[#CBD8D1] rounded-[6px] overflow-x-auto">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Transaction UTR</th>
                <th>Crop</th>
                <th>Amount</th>
                <th>Account</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pay) => (
                <tr key={pay.id}>
                  <td className="text-xs">{pay.date}</td>
                  <td className="font-mono text-xs font-bold text-[#17231F]">{pay.utrNumber || pay.transactionId}</td>
                  <td className="text-xs">{pay.cropName}</td>
                  <td className="font-mono font-bold text-xs text-[#063B2A]">₹{pay.amount.toLocaleString('en-IN')}</td>
                  <td className="text-xs text-[#66736D]">{pay.bankAccountMasked}</td>
                  <td>
                    <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-bold bg-[#E7F3EC] text-[#16803C] border border-[#B7DCC5]">
                      {pay.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
