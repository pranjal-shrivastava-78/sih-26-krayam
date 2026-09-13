import React from 'react';
import { useApp } from '../../context/AppContext';
import { getOperatorText } from '../../i18n/operatorTranslations';
import { 
  Sparkles, 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  ShieldAlert, 
  BrainCircuit, 
  Compass 
} from 'lucide-react';

export const OperatorAiInsightsTab: React.FC = () => {
  const { language } = useApp();
  const ot = getOperatorText(language);

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-[#17231F] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#EA8A0A]" />
            <span>{ot.aiInsightsTitle}</span>
          </h2>
          <p className="text-xs text-[#66736D]">
            {ot.aiInsightsSubtitle}
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#063B2A] font-bold bg-[#E7F3EC] px-3 py-1.5 rounded-[6px] border border-[#85E1A9]">
          <BrainCircuit className="w-4 h-4 text-[#16803C]" />
          <span>{ot.aiModelActiveBadge}</span>
        </div>
      </div>

      {/* Top 4 Predictive Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Predicted Wait Time */}
        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-4 shadow-sm">
          <div className="text-xs text-[#66736D] font-bold uppercase flex items-center justify-between">
            <span>{ot.predictedWaitCard}</span>
            <Clock className="w-4 h-4 text-[#075E43]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#17231F] mt-2">
            18.5 mins
          </div>
          <div className="text-[11px] text-[#075E43] font-semibold mt-1">
            ↓ 4.2 mins faster than yesterday
          </div>
        </div>

        {/* Expected Farmer Arrivals */}
        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-4 shadow-sm">
          <div className="text-xs text-[#66736D] font-bold uppercase flex items-center justify-between">
            <span>{ot.predictedPeakCard}</span>
            <TrendingUp className="w-4 h-4 text-[#175CD3]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#175CD3] mt-2">
            28 Vehicles
          </div>
          <div className="text-[11px] text-[#66736D] mt-1">
            Estimated ~1,750 Quintals Wheat
          </div>
        </div>

        {/* Expected Centre Load */}
        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-4 shadow-sm">
          <div className="text-xs text-[#66736D] font-bold uppercase flex items-center justify-between">
            <span>{ot.yardCongestionCard}</span>
            <AlertTriangle className="w-4 h-4 text-[#EA8A0A]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#EA8A0A] mt-2">
            84% (High)
          </div>
          <div className="text-[11px] text-[#B45309] font-semibold mt-1">
            Window: 10:45 AM - 01:15 PM
          </div>
        </div>

        {/* Demand Forecast */}
        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-4 shadow-sm">
          <div className="text-xs text-[#66736D] font-bold uppercase flex items-center justify-between">
            <span>{ot.moistureAnomalyCard}</span>
            <Layers className="w-4 h-4 text-[#075E43]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#063B2A] mt-2">
            1.2% (Low Risk)
          </div>
          <div className="text-[11px] text-[#16803C] font-semibold mt-1">
            Optimal Harvest Conditions
          </div>
        </div>
      </div>

      {/* High-Load Warnings & Yard Action Section */}
      <div className="bg-[#FFFDF5] border border-[#F0C2C2] rounded-[8px] p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#B45309]">
          <AlertTriangle className="w-4 h-4 text-[#B45309]" />
          <span className="uppercase tracking-wide">{ot.highLoadAlert}</span>
        </div>
        <p className="text-xs text-[#34443D] leading-relaxed">
          Real-time GPS telemetry from registered tractor-trolleys indicates 9 vehicles converging on Samrala Main Gate between 11:15 AM and 12:00 PM. Yard entry queue may exceed 35 minutes if single weighbridge remains active.
        </p>
        <div className="bg-white border border-[#CBD8D1] p-3 rounded-[6px] text-xs text-[#063B2A] font-semibold flex items-center justify-between">
          <span>
            💡 <strong>{ot.recommendedActionsTitle}:</strong> Divert Gate #2 for empty vehicle tare check and activate Standby Weighbridge Station.
          </span>
          <button 
            type="button" 
            onClick={() => alert('Dispatched advisory SMS to upcoming farmers to utilize afternoon slots.')}
            className="bg-[#063B2A] hover:bg-[#075E43] text-white px-3 py-1.5 rounded-[4px] font-bold shrink-0 transition-colors"
          >
            Dispatch Load Advisory
          </button>
        </div>
      </div>

      {/* Suggested Load Distribution Across Mandi Network */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-5 shadow-sm space-y-3 text-xs">
          <h3 className="text-sm font-bold text-[#17231F] flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#075E43]" />
            <span>Suggested Regional Load Distribution</span>
          </h3>
          <p className="text-[#66736D]">
            AI redistribution recommendations for neighboring procurement centres in Ludhiana district:
          </p>

          <div className="space-y-2.5 pt-1">
            <div className="p-3 bg-[#F5F8F6] border border-[#CBD8D1] rounded-[6px] flex items-center justify-between">
              <div>
                <div className="font-bold text-[#17231F]">Machhiwara Sub-Yard (9.5 km)</div>
                <div className="text-[11px] text-[#16803C]">Current Load: 28% (Available Capacity: 40 Qtl slots)</div>
              </div>
              <span className="text-[11px] font-bold text-[#075E43] bg-[#E7F3EC] px-2 py-1 rounded">
                Divert 4 Trolleys
              </span>
            </div>

            <div className="p-3 bg-[#F5F8F6] border border-[#CBD8D1] rounded-[6px] flex items-center justify-between">
              <div>
                <div className="font-bold text-[#17231F]">Payal Co-op Society (16.2 km)</div>
                <div className="text-[11px] text-[#16803C]">Current Load: 35% (Available Capacity: 32 Qtl slots)</div>
              </div>
              <span className="text-[11px] font-bold text-[#075E43] bg-[#E7F3EC] px-2 py-1 rounded">
                Divert 3 Trolleys
              </span>
            </div>

            <div className="p-3 bg-[#F5F8F6] border border-[#CBD8D1] rounded-[6px] flex items-center justify-between">
              <div>
                <div className="font-bold text-[#17231F]">Doraha Depot Terminal (18.0 km)</div>
                <div className="text-[11px] text-[#EA8A0A]">Current Load: 65% (Near Optimal Capacity)</div>
              </div>
              <span className="text-[11px] font-bold text-[#66736D] bg-[#EDF3EF] px-2 py-1 rounded">
                Balanced
              </span>
            </div>
          </div>
        </div>

        {/* Slot Recommendations & Anomaly Detection */}
        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-5 shadow-sm space-y-3 text-xs">
          <h3 className="text-sm font-bold text-[#17231F] flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#B42318]" />
            <span>Telemetry Anomaly Detection</span>
          </h3>

          <div className="space-y-2.5">
            <div className="p-3 bg-[#FFF5F5] border border-[#F0C2C2] rounded-[6px] space-y-1">
              <div className="flex items-center justify-between font-bold text-[#B42318]">
                <span>Moisture Variance Anomaly (Token BK-2026-9484)</span>
                <span>Severity: Medium</span>
              </div>
              <p className="text-[11px] text-[#34443D]">
                Farmer Harnek Singh booked 110 Qtl Wheat. Surrounding farms in sector reported 11.2% moisture, but sensor flagged potential morning rain dampness. Recommend secondary grain probe.
              </p>
            </div>

            <div className="p-3 bg-[#E7F3EC] border border-[#85E1A9] rounded-[6px] space-y-1">
              <div className="flex items-center justify-between font-bold text-[#063B2A]">
                <span>Slot Recommendation for Tomorrow</span>
                <span className="text-[#16803C]">Optimal</span>
              </div>
              <p className="text-[11px] text-[#34443D]">
                Morning slot (08:00 - 11:30 AM) is 90% booked. Recommended to open 15 extra slots for Afternoon window (02:30 - 05:30 PM) to maintain even flow.
              </p>
            </div>

            <div className="p-3 bg-[#F5F8F6] border border-[#CBD8D1] rounded-[6px] space-y-1">
              <div className="flex items-center justify-between font-bold text-[#17231F]">
                <span>Weighbridge Calibration Health</span>
                <span className="text-[#075E43] font-mono">99.8% Accuracy</span>
              </div>
              <p className="text-[11px] text-[#66736D]">
                Electronic load cell sensors recalibrated at 06:30 AM today against standard 5,000 kg test blocks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
