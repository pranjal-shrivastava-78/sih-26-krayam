import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getOperatorText } from '../../i18n/operatorTranslations';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  Scale, 
  AlertCircle, 
  CheckCircle2, 
  XCircle,
  Calendar
} from 'lucide-react';

export const OperatorAnalyticsTab: React.FC = () => {
  const { bookings, procurements, payments, language } = useApp();
  const ot = getOperatorText(language);
  const [period, setPeriod] = useState<'DAILY' | 'WEEKLY' | 'MONTHLY'>('DAILY');

  // Realistic government mandi operational analytics
  const stats = {
    DAILY: {
      farmersServed: 18,
      totalQuintals: 1145,
      avgWaitMins: 18,
      avgProcessingMins: 12,
      centreUtilization: 76,
      noShows: 2,
      cancellations: 1,
      pendingPayments: payments.filter(p => p.paymentStatus === 'Pending').length,
      completedPayments: payments.filter(p => p.paymentStatus === 'Credited').length + 14,
      totalDisbursed: '₹26,04,875'
    },
    WEEKLY: {
      farmersServed: 142,
      totalQuintals: 9850,
      avgWaitMins: 22,
      avgProcessingMins: 13,
      centreUtilization: 82,
      noShows: 11,
      cancellations: 6,
      pendingPayments: 8,
      completedPayments: 134,
      totalDisbursed: '₹2,24,08,750'
    },
    MONTHLY: {
      farmersServed: 620,
      totalQuintals: 44200,
      avgWaitMins: 20,
      avgProcessingMins: 12,
      centreUtilization: 80,
      noShows: 38,
      cancellations: 19,
      pendingPayments: 12,
      completedPayments: 608,
      totalDisbursed: '₹10,05,55,000'
    }
  }[period];

  // Peak hours distribution (08:00 AM to 06:00 PM)
  const hourlyData = [
    { hour: '08:00 - 09:00', arrivals: 4, load: 'Low' },
    { hour: '09:00 - 10:00', arrivals: 9, load: 'Moderate' },
    { hour: '10:00 - 11:00', arrivals: 16, load: 'High (Peak)' },
    { hour: '11:00 - 12:00', arrivals: 18, load: 'High (Peak)' },
    { hour: '12:00 - 13:00', arrivals: 14, load: 'Moderate' },
    { hour: '13:00 - 14:00', arrivals: 6, load: 'Lunch Hour' },
    { hour: '14:00 - 15:00', arrivals: 11, load: 'Moderate' },
    { hour: '15:00 - 16:00', arrivals: 13, load: 'Moderate' },
    { hour: '16:00 - 17:00', arrivals: 8, load: 'Low' },
    { hour: '17:00 - 18:00', arrivals: 3, load: 'Low' }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Time Period Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-4">
        <div>
          <h2 className="text-base font-bold text-[#17231F] flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#075E43]" />
            <span>{ot.analyticsTitle}</span>
          </h2>
          <p className="text-xs text-[#66736D]">
            {ot.analyticsSubtitle}
          </p>
        </div>

        {/* Daily / Weekly / Monthly Switcher */}
        <div className="flex items-center gap-1 bg-[#EDF3EF] p-1 rounded-[6px] border border-[#CBD8D1] text-xs font-bold">
          <button
            type="button"
            onClick={() => setPeriod('DAILY')}
            className={`px-3 py-1.5 rounded-[4px] transition-colors ${
              period === 'DAILY' ? 'bg-[#063B2A] text-white' : 'text-[#66736D] hover:text-black'
            }`}
          >
            {ot.dailyPeriod}
          </button>
          <button
            type="button"
            onClick={() => setPeriod('WEEKLY')}
            className={`px-3 py-1.5 rounded-[4px] transition-colors ${
              period === 'WEEKLY' ? 'bg-[#063B2A] text-white' : 'text-[#66736D] hover:text-black'
            }`}
          >
            {ot.weeklyPeriod}
          </button>
          <button
            type="button"
            onClick={() => setPeriod('MONTHLY')}
            className={`px-3 py-1.5 rounded-[4px] transition-colors ${
              period === 'MONTHLY' ? 'bg-[#063B2A] text-white' : 'text-[#66736D] hover:text-black'
            }`}
          >
            {ot.monthlyPeriod}
          </button>
        </div>
      </div>

      {/* Top 4 Primary Analytics KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-4 shadow-sm">
          <div className="text-xs text-[#66736D] font-bold uppercase flex items-center justify-between">
            <span>{ot.farmersHandledMetric}</span>
            <Users className="w-4 h-4 text-[#075E43]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#17231F] mt-2">
            {stats.farmersServed}
          </div>
          <div className="text-[11px] text-[#16803C] font-semibold mt-1">
            +12% vs previous period
          </div>
        </div>

        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-4 shadow-sm">
          <div className="text-xs text-[#66736D] font-bold uppercase flex items-center justify-between">
            <span>{ot.totalProcuredMetric}</span>
            <Scale className="w-4 h-4 text-[#075E43]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#17231F] mt-2">
            {stats.totalQuintals.toLocaleString()} Qtl
          </div>
          <div className="text-[11px] text-[#075E43] font-semibold mt-1">
            {ot.totalDisbursedMetric}: {stats.totalDisbursed}
          </div>
        </div>

        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-4 shadow-sm">
          <div className="text-xs text-[#66736D] font-bold uppercase flex items-center justify-between">
            <span>{ot.avgWaitMetric}</span>
            <Clock className="w-4 h-4 text-[#EA8A0A]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#B45309] mt-2">
            {stats.avgWaitMins} mins
          </div>
          <div className="text-[11px] text-[#16803C] font-semibold mt-1">
            SLA: &lt; 30 mins
          </div>
        </div>

        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-4 shadow-sm">
          <div className="text-xs text-[#66736D] font-bold uppercase flex items-center justify-between">
            <span>{ot.avgProcessingMetric}</span>
            <Clock className="w-4 h-4 text-[#175CD3]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#175CD3] mt-2">
            {stats.avgProcessingMins} mins
          </div>
          <div className="text-[11px] text-[#66736D] font-medium mt-1">
            {ot.tabProcurement}
          </div>
        </div>
      </div>

      {/* Second Row: Peak Hours Visual Histogram & Utilization Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Peak Hours Breakdown */}
        <div className="lg:col-span-2 bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#17231F]">
                {ot.peakHoursTitle}
              </h3>
              <p className="text-xs text-[#66736D]">
                {ot.mandiCentreBadge}
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#EA8A0A] bg-[#FFF3DC] px-2.5 py-1 rounded">
              Peak: 10:00 - 12:00
            </span>
          </div>

          {/* Visual Horizontal Bars */}
          <div className="space-y-2 pt-2 text-xs">
            {hourlyData.map((h, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-28 font-mono text-[#66736D] shrink-0 text-[11px]">
                  {h.hour}
                </span>
                <div className="flex-1 bg-[#EDF3EF] h-4 rounded-full overflow-hidden relative">
                  <div
                    className={`h-full rounded-full transition-all ${
                      h.arrivals > 14 
                        ? 'bg-[#B42318]' 
                        : h.arrivals > 8 
                        ? 'bg-[#EA8A0A]' 
                        : 'bg-[#16803C]'
                    }`}
                    style={{ width: `${(h.arrivals / 20) * 100}%` }}
                  />
                </div>
                <span className="w-16 font-mono font-bold text-right text-[11px]">
                  {h.arrivals} vehicles
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Centre Utilization & Operational Efficiency */}
        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-5 shadow-sm space-y-4 text-xs">
          <h3 className="text-sm font-bold text-[#17231F]">
            {ot.centreLoad}
          </h3>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-[#34443D]">{ot.centreUtilizationMetric}:</span>
                <span className="font-mono text-[#063B2A]">{stats.centreUtilization}%</span>
              </div>
              <div className="w-full bg-[#EDF3EF] h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#075E43] h-full" 
                  style={{ width: `${stats.centreUtilization}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#CBD8D1]">
              <div className="bg-[#FFF5F5] p-2.5 rounded-[6px] border border-[#F0C2C2]">
                <div className="text-[10px] uppercase font-bold text-[#B42318]">{ot.filterNoShow}</div>
                <div className="text-lg font-bold font-mono text-[#B42318] mt-0.5">{stats.noShows}</div>
                <div className="text-[10px] text-[#66736D]">Recorded</div>
              </div>
              <div className="bg-[#EDF3EF] p-2.5 rounded-[6px] border border-[#CBD8D1]">
                <div className="text-[10px] uppercase font-bold text-[#66736D]">Cancellations</div>
                <div className="text-lg font-bold font-mono text-[#17231F] mt-0.5">{stats.cancellations}</div>
                <div className="text-[10px] text-[#66736D]">Rescheduled</div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#CBD8D1]">
              <div className="flex justify-between">
                <span className="text-[#66736D]">{ot.pendingPayments}:</span>
                <span className="font-bold text-[#B45309] font-mono">{stats.pendingPayments}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#66736D]">{ot.completedProcurements}:</span>
                <span className="font-bold text-[#16803C] font-mono">{stats.completedPayments}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#66736D]">{ot.totalDisbursedMetric}:</span>
                <span className="font-bold text-[#063B2A] font-mono">{stats.totalDisbursed}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
