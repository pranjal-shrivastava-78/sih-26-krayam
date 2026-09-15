import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { getOperatorText } from '../../i18n/operatorTranslations';
import { 
  Users, 
  Clock, 
  Scale, 
  CreditCard, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  ArrowRight, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  PhoneCall, 
  TrendingUp
} from 'lucide-react';

export const OperatorDashboardTab: React.FC = () => {
  const { 
    bookings, 
    procurements, 
    payments, 
    operator, 
    isOffline, 
    syncQueue, 
    lastSyncTime, 
    syncOfflineQueue, 
    setOperatorActiveTab, 
    operatorCallNext, 
    language 
  } = useApp();

  const ot = getOperatorText(language);

  // Metrics Calculation from real state
  const todayBookingsCount = bookings.length;
  const waitingCount = bookings.filter(b => b.status === 'IN_QUEUE' || b.status === 'CHECKED_IN' || b.status === 'TURN_APPROACHING').length;
  const processingCount = bookings.filter(b => b.status === 'PROCESSING' || b.status === 'WEIGHING' || b.status === 'QUALITY_CHECK').length;
  const completedCount = bookings.filter(b => b.status === 'COMPLETED').length;
  const pendingPaymentsCount = payments.filter(p => p.paymentStatus === 'Pending').length;
  const pendingSyncCount = syncQueue.filter(q => q.status === 'PENDING').length;

  // Centre Load calculation (Max daily capacity ~ 25 vehicles simultaneously)
  const centreLoadPct = Math.min(100, Math.round(((waitingCount + processingCount) / 12) * 100));

  // Audio / Announcement simulated state
  const [announcementMsg, setAnnouncementMsg] = useState<string | null>(null);

  const handleCallNext = () => {
    const nextFarmer = operatorCallNext();
    if (nextFarmer) {
      setAnnouncementMsg(`Calling Token ${nextFarmer.id}: ${nextFarmer.farmerName} to Weighbridge Gate 1.`);
      setTimeout(() => setAnnouncementMsg(null), 5000);
    } else {
      setAnnouncementMsg('No farmers currently waiting in queue.');
      setTimeout(() => setAnnouncementMsg(null), 4000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Alert / Chime Feedback */}
      {announcementMsg && (
        <div className="bg-[#063B2A] text-[#85E1A9] border border-[#16803C] px-4 py-3 rounded-[8px] flex items-center justify-between text-xs font-semibold shadow-md animate-fade-in">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-[#85E1A9] animate-bounce" />
            <span>{announcementMsg}</span>
          </div>
          <button 
            onClick={() => setAnnouncementMsg(null)} 
            className="text-white hover:text-[#85E1A9]"
          >
            ✕
          </button>
        </div>
      )}

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
        {/* Today's Bookings */}
        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-4 shadow-sm">
          <div className="text-[11px] font-bold text-[#66736D] uppercase">
            {ot.todayBookings}
          </div>
          <div className="text-2xl font-bold text-[#17231F] mt-1 font-mono">
            {todayBookingsCount}
          </div>
          <div className="text-[10px] text-[#075E43] font-semibold mt-1">
            Confirmed Slots
          </div>
        </div>

        {/* Farmers Waiting in Queue */}
        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-4 shadow-sm">
          <div className="text-[11px] font-bold text-[#66736D] uppercase">
            {ot.farmersWaiting}
          </div>
          <div className="text-2xl font-bold text-[#B45309] mt-1 font-mono flex items-center gap-1.5">
            <span>{waitingCount}</span>
            <span className="w-2 h-2 rounded-full bg-[#EA8A0A] animate-ping"></span>
          </div>
          <div className="text-[10px] text-[#66736D] font-medium mt-1">
            Waiting in Yard
          </div>
        </div>

        {/* Under Processing */}
        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-4 shadow-sm">
          <div className="text-[11px] font-bold text-[#66736D] uppercase">
            {ot.farmersProcessing}
          </div>
          <div className="text-2xl font-bold text-[#175CD3] mt-1 font-mono">
            {processingCount}
          </div>
          <div className="text-[10px] text-[#66736D] font-medium mt-1">
            At Weighbridges
          </div>
        </div>

        {/* Completed Procurements */}
        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-4 shadow-sm">
          <div className="text-[11px] font-bold text-[#66736D] uppercase">
            {ot.completedProcurements}
          </div>
          <div className="text-2xl font-bold text-[#16803C] mt-1 font-mono">
            {completedCount}
          </div>
          <div className="text-[10px] text-[#16803C] font-semibold mt-1">
            J-Forms Issued
          </div>
        </div>

        {/* Pending DBT Payments */}
        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-4 shadow-sm">
          <div className="text-[11px] font-bold text-[#66736D] uppercase">
            {ot.pendingPayments}
          </div>
          <div className="text-2xl font-bold text-[#B42318] mt-1 font-mono">
            {pendingPaymentsCount}
          </div>
          <div className="text-[10px] text-[#B42318] font-semibold mt-1">
            PFMS Awaiting
          </div>
        </div>

        {/* Centre Load / Utilization Gauge */}
        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-4 shadow-sm">
          <div className="text-[11px] font-bold text-[#66736D] uppercase">
            {ot.centreLoad}
          </div>
          <div className="text-2xl font-bold text-[#063B2A] mt-1 font-mono">
            {centreLoadPct}%
          </div>
          <div className="w-full bg-[#EDF3EF] h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className={`h-full ${centreLoadPct > 80 ? 'bg-[#B42318]' : centreLoadPct > 50 ? 'bg-[#EA8A0A]' : 'bg-[#16803C]'}`}
              style={{ width: `${centreLoadPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Operational Status Strip: Online/Offline & Synchronization */}
      <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${isOffline ? 'bg-[#FFF3DC] text-[#B45309]' : 'bg-[#E7F3EC] text-[#063B2A]'}`}>
            {isOffline ? <WifiOff className="w-5 h-5" /> : <Wifi className="w-5 h-5" />}
          </div>
          <div>
            <div className="text-xs font-bold text-[#17231F] flex items-center gap-2">
              <span>{isOffline ? ot.offlineBadge : ot.onlineBadge}</span>
              <span className="text-[10px] text-[#66736D] font-normal font-mono">
                • {ot.lastSyncTimestamp}: {lastSyncTime}
              </span>
            </div>
            <div className="text-[11px] text-[#66736D] mt-0.5">
              {isOffline 
                ? ot.offlineNotice
                : 'All digital weighbridge intakes and DBT transfers are syncing in real time with the State Grid.'
              }
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {pendingSyncCount > 0 && (
            <button
              type="button"
              onClick={() => syncOfflineQueue()}
              className="flex-1 sm:flex-initial bg-[#EA8A0A] hover:bg-[#D97706] text-[#FFFFFF] text-xs font-bold px-3 py-2 rounded-[6px] transition-colors flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{ot.syncNowBtn} ({pendingSyncCount})</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleCallNext}
            className="flex-1 sm:flex-initial bg-[#063B2A] hover:bg-[#075E43] text-[#FFFFFF] text-xs font-bold px-4 py-2 rounded-[6px] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{ot.callNextFarmerBtn}</span>
          </button>
        </div>
      </div>

      {/* Two Column Section: Live Floor Queue Preview + AI High-Load Warning */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Queue Summary */}
        <div className="lg:col-span-2 bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#17231F] flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#075E43]" />
                <span>{ot.liveQueueTitle}</span>
              </h2>
              <p className="text-xs text-[#66736D]">
                Vehicles currently inside Samrala Mandi Yard and Weighing Stations
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOperatorActiveTab('queue')}
              className="text-xs font-bold text-[#075E43] hover:underline flex items-center gap-1"
            >
              <span>Manage Full Queue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Queue Table */}
          <div className="overflow-x-auto border border-[#CBD8D1] rounded-[6px]">
            <table className="w-full text-xs text-left min-w-[550px]">
              <thead className="bg-[#EDF3EF] text-[#34443D] uppercase text-[10px] font-bold border-b border-[#CBD8D1]">
                <tr>
                  <th className="px-3 py-2.5">{ot.queueTokenHeader}</th>
                  <th className="px-3 py-2.5">{ot.farmerNameHeader}</th>
                  <th className="px-3 py-2.5">{ot.cropVarietyHeader}</th>
                  <th className="px-3 py-2.5">{ot.slotTimeHeader}</th>
                  <th className="px-3 py-2.5">{ot.statusHeader}</th>
                  <th className="px-3 py-2.5 text-right">{ot.actionsHeader}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#CBD8D1]">
                {bookings.slice(0, 5).map((b) => (
                  <tr key={b.id} className="hover:bg-[#F5F8F6]">
                    <td className="px-3 py-3 font-mono font-bold text-[#063B2A]">
                      {b.id}
                      {b.queuePosition ? (
                        <div className="text-[10px] text-[#B45309]">Pos #{b.queuePosition}</div>
                      ) : null}
                    </td>
                    <td className="px-3 py-3">
                      <div className="font-bold text-[#17231F]">{b.farmerName}</div>
                      <div className="text-[11px] text-[#66736D] font-mono">{b.farmerMobile}</div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="font-medium">{b.cropName}</div>
                      <div className="text-[11px] text-[#66736D] font-mono">{b.quantityQuintals} Qtl</div>
                    </td>
                    <td className="px-3 py-3 text-[11px] text-[#66736D]">
                      {b.slot.split(' ')[0]}
                    </td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                        b.status === 'PROCESSING' 
                          ? 'bg-[#175CD3]/10 text-[#175CD3]'
                          : b.status === 'TURN_APPROACHING'
                          ? 'bg-[#B45309]/10 text-[#B45309]'
                          : b.status === 'COMPLETED'
                          ? 'bg-[#16803C]/10 text-[#16803C]'
                          : b.status === 'NO_SHOW'
                          ? 'bg-[#B42318]/10 text-[#B42318]'
                          : 'bg-[#063B2A]/10 text-[#063B2A]'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => setOperatorActiveTab('procurement')}
                        className="bg-[#EDF3EF] hover:bg-[#CBD8D1] text-[#063B2A] font-bold text-[11px] px-2.5 py-1 rounded border border-[#CBD8D1] transition-colors"
                      >
                        {ot.tabProcurement}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Yard Telemetry & Yard Load Alert */}
        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#17231F] flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#075E43]" />
              <span>Yard Arrival Telemetry</span>
            </h2>
          </div>

          {/* High-load warning box */}
          <div className="bg-[#FFF3DC] border border-[#F0C2C2] rounded-[6px] p-3 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#B45309]">
              <AlertTriangle className="w-4 h-4 text-[#B45309]" />
              <span>Peak Arrival Forecast (10:30 - 13:00)</span>
            </div>
            <p className="text-[11px] text-[#34443D] leading-relaxed">
              Wheat procurement volume is expected to spike by 35% around midday. 14 tractor-trolleys anticipated from Rampur Kalan and Machhiwara sectors.
            </p>
            <div className="text-[11px] font-semibold text-[#075E43] pt-1 border-t border-[#CBD8D1]">
              💡 <strong>Action:</strong> Open Weighbridge Gate #2 to reduce wait times to &lt; 15 mins.
            </div>
          </div>

          {/* Predictive Metrics Card */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-[#CBD8D1]">
              <span className="text-[#66736D]">Predicted Wait for Next Arrival:</span>
              <span className="font-bold text-[#17231F] font-mono">~18 minutes</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#CBD8D1]">
              <span className="text-[#66736D]">Expected Total Quintals Today:</span>
              <span className="font-bold text-[#17231F] font-mono">1,420 Qtl</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#CBD8D1]">
              <span className="text-[#66736D]">Moisture Rejection Rate:</span>
              <span className="font-bold text-[#16803C] font-mono">1.2% (Normal)</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[#66736D]">DBT Settlement SLA:</span>
              <span className="font-bold text-[#075E43] font-mono">100% within 48 hrs</span>
            </div>
          </div>

          {/* Shortcut Buttons */}
          <div className="pt-2 border-t border-[#CBD8D1] grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setOperatorActiveTab('procurement')}
              className="w-full bg-[#EDF3EF] hover:bg-[#CBD8D1] text-[#063B2A] font-bold py-2 rounded-[6px] border border-[#CBD8D1] transition-colors flex items-center justify-center gap-1"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{ot.tabProcurement}</span>
            </button>
            <button
              type="button"
              onClick={() => setOperatorActiveTab('payments')}
              className="w-full bg-[#EDF3EF] hover:bg-[#CBD8D1] text-[#063B2A] font-bold py-2 rounded-[6px] border border-[#CBD8D1] transition-colors flex items-center justify-center gap-1"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>{ot.tabPayments}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
