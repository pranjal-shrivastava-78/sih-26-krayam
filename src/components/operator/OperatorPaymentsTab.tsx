import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getOperatorText } from '../../i18n/operatorTranslations';
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  Building, 
  ShieldCheck, 
  ArrowRight, 
  History,
  FileCheck
} from 'lucide-react';

export const OperatorPaymentsTab: React.FC = () => {
  const { 
    payments, 
    procurements, 
    operatorConfirmPayment, 
    language 
  } = useApp();

  const ot = getOperatorText(language);
  const [activeTab, setActiveTab] = useState<'PENDING' | 'HISTORY'>('PENDING');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const pendingPayments = payments.filter(p => p.paymentStatus === 'Pending');
  const creditedPayments = payments.filter(p => p.paymentStatus === 'Credited');

  const handleAuthorizePayment = (paymentId: string) => {
    operatorConfirmPayment(paymentId);
    setSuccessMsg(ot.dbtInitiatedSuccess);
    setTimeout(() => setSuccessMsg(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Header and Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-4">
        <div>
          <h2 className="text-base font-bold text-[#17231F] flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#075E43]" />
            <span>{ot.paymentManagementTitle}</span>
          </h2>
          <p className="text-xs text-[#66736D] mt-0.5">
            {ot.paymentsSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('PENDING')}
            className={`px-3 py-1.5 rounded-[6px] text-xs font-bold transition-colors ${
              activeTab === 'PENDING' ? 'bg-[#063B2A] text-white' : 'bg-[#EDF3EF] text-[#34443D] hover:bg-[#CBD8D1]'
            }`}
          >
            {ot.pendingAuthorizations} ({pendingPayments.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('HISTORY')}
            className={`px-3 py-1.5 rounded-[6px] text-xs font-bold transition-colors ${
              activeTab === 'HISTORY' ? 'bg-[#063B2A] text-white' : 'bg-[#EDF3EF] text-[#34443D] hover:bg-[#CBD8D1]'
            }`}
          >
            {ot.completedProcurements} ({creditedPayments.length})
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {successMsg && (
        <div className="bg-[#E7F3EC] border border-[#85E1A9] text-[#063B2A] p-3.5 rounded-[8px] flex items-center justify-between text-xs font-semibold shadow-sm animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#16803C]" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>
      )}

      {/* TAB 1: PENDING PAYMENTS */}
      {activeTab === 'PENDING' && (
        <div className="space-y-3">
          {pendingPayments.map((p) => {
            const proc = procurements.find(pr => pr.id === p.procurementId) || procurements[0];
            return (
              <div 
                key={p.id}
                className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-5 shadow-sm space-y-4"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#CBD8D1] pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#17231F]">{p.cropName}</span>
                      <span className="text-xs font-mono font-bold text-[#063B2A] bg-[#EDF3EF] px-2 py-0.5 rounded">
                        {p.transactionId}
                      </span>
                      <span className="text-xs text-[#EA8A0A] bg-[#FFF3DC] px-2 py-0.5 rounded font-bold uppercase">
                        ● {ot.pendingAuthorizations}
                      </span>
                    </div>
                    <div className="text-xs text-[#66736D] mt-1 font-mono">
                      Token: <strong>{p.bookingId}</strong> • J-Form: <strong>{p.procurementId}</strong>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-[#66736D]">{ot.totalCalculatedAmount}:</div>
                    <div className="text-xl font-bold font-mono text-[#063B2A]">
                      ₹{p.amount.toLocaleString('en-IN')}.00
                    </div>
                  </div>
                </div>

                {/* Farmer & Banking Details Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="bg-[#F5F8F6] p-3 rounded-[6px] border border-[#CBD8D1]">
                    <div className="text-[#66736D]">{ot.farmerNameHeader}:</div>
                    <div className="font-bold text-[#17231F] mt-0.5">Sardar Gurpreet Singh</div>
                    <div className="text-[11px] font-mono text-[#66736D]">FID: {p.farmerId}</div>
                  </div>

                  <div className="bg-[#F5F8F6] p-3 rounded-[6px] border border-[#CBD8D1]">
                    <div className="text-[#66736D]">{ot.cropHeader}:</div>
                    <div className="font-bold text-[#17231F] mt-0.5">{p.cropName}</div>
                    <div className="text-[11px] font-mono text-[#075E43]">
                      Accepted: {proc?.acceptedQuantity || 65} Qtl @ ₹{proc?.mspRate || 2275}/Qtl
                    </div>
                  </div>

                  <div className="bg-[#F5F8F6] p-3 rounded-[6px] border border-[#CBD8D1]">
                    <div className="text-[#66736D]">{ot.verifiedBankDetails}:</div>
                    <div className="font-bold text-[#17231F] mt-0.5">{p.bankAccountMasked}</div>
                    <div className="text-[11px] font-mono text-[#66736D]">IFSC: PUNB0141114</div>
                  </div>

                  <div className="bg-[#F5F8F6] p-3 rounded-[6px] border border-[#CBD8D1]">
                    <div className="text-[#66736D]">Aadhaar Bridge:</div>
                    <div className="font-bold text-[#16803C] flex items-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5" /> NPCI Seeded
                    </div>
                    <div className="text-[11px] text-[#66736D]">PFMS Direct Benefit Transfer</div>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between pt-2 border-t border-[#CBD8D1]">
                  <div className="text-[11px] text-[#66736D]">
                    {ot.avgPaymentSla}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAuthorizePayment(p.id)}
                    className="bg-[#075E43] hover:bg-[#063B2A] text-white text-xs font-bold px-4 py-2 rounded-[6px] transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>{ot.confirmDbtPaymentBtn}</span>
                  </button>
                </div>
              </div>
            );
          })}

          {pendingPayments.length === 0 && (
            <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-8 text-center text-xs text-[#66736D]">
              No pending payments. All farmer procurements have been settled.
            </div>
          )}
        </div>
      )}

      {/* TAB 2: COMPLETED PAYMENT HISTORY */}
      {activeTab === 'HISTORY' && (
        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#EDF3EF] text-[#34443D] uppercase text-[10px] font-bold border-b border-[#CBD8D1]">
                <tr>
                  <th className="px-4 py-3">Txn Ref</th>
                  <th className="px-4 py-3">{ot.farmerNameHeader}</th>
                  <th className="px-4 py-3">{ot.cropHeader}</th>
                  <th className="px-4 py-3">{ot.totalCalculatedAmount}</th>
                  <th className="px-4 py-3">Bank Account</th>
                  <th className="px-4 py-3">{ot.utrReferenceNumber}</th>
                  <th className="px-4 py-3">{ot.bookedDateHeader}</th>
                  <th className="px-4 py-3 text-right">{ot.statusHeader}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#CBD8D1]">
                {creditedPayments.map((p) => (
                  <tr key={p.id} className="hover:bg-[#F5F8F6]">
                    <td className="px-4 py-3 font-mono font-bold text-[#063B2A]">
                      {p.transactionId}
                    </td>
                    <td className="px-4 py-3 font-bold text-[#17231F]">
                      Sardar Gurpreet Singh
                    </td>
                    <td className="px-4 py-3 font-semibold">
                      {p.cropName}
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-[#16803C]">
                      ₹{p.amount.toLocaleString('en-IN')}.00
                    </td>
                    <td className="px-4 py-3 font-mono text-[#66736D]">
                      {p.bankAccountMasked}
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-[#075E43]">
                      {p.utrNumber || 'PFMS20268102910'}
                    </td>
                    <td className="px-4 py-3 font-mono text-[#66736D]">
                      {p.date}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="bg-[#E7F3EC] text-[#16803C] px-2 py-0.5 rounded text-[10px] font-bold">
                        ✓ Credited
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
