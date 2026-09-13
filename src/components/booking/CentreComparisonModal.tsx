import React from 'react';
import { ProcurementCentre, CropInfo } from '../../types';
import { X, Check } from 'lucide-react';

interface CentreComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  centres: ProcurementCentre[];
  selectedCrop: CropInfo | null;
  selectedCentreId: string;
  onSelectCentre: (centreId: string) => void;
}

export const CentreComparisonModal: React.FC<CentreComparisonModalProps> = ({
  isOpen,
  onClose,
  centres,
  selectedCrop,
  selectedCentreId,
  onSelectCentre
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-[#0c2417]/70 backdrop-blur-md animate-fade-in">
      <div className="bg-[#ffffff] rounded-[20px] sm:rounded-[24px] border border-[#cdeac6] w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl text-[#0d2618]">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#cdeac6] flex items-center justify-between shrink-0 bg-[#f4fbf5]">
          <div>
            <span className="text-[9px] uppercase tracking-[0.45px] font-bold text-[#166534] block mb-1">
              TERMINAL SPECIFICATION MATRIX
            </span>
            <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-[#0d2618]">
              Procurement Centre Comparison
            </h2>
            <p className="text-xs text-[#2e5a40] mt-0.5">
              Side-by-side capacity analysis for {selectedCrop?.name || 'Selected Crop'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#ffffff] text-[#2e5a40] hover:text-[#0d2618] border border-[#cdeac6] hover:bg-[#eef8ee] transition-colors flex items-center justify-center shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto p-3 sm:p-6 flex-1">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-[#cdeac6]">
                <th className="p-3 text-[9px] uppercase tracking-[0.45px] text-[#2e5a40] w-44 font-bold">
                  Telemetry Metrics
                </th>
                {centres.map((c, idx) => {
                  const isSelected = c.id === selectedCentreId;
                  const isRecommended = idx === 0;
                  return (
                    <th
                      key={c.id}
                      className={`p-4 text-left transition-all ${
                        isRecommended ? 'bg-[#f4fbf5] border-t-2 border-[#166534]' : 'bg-[#ffffff]'
                      }`}
                    >
                      <div className="font-bold text-sm text-[#0d2618]">{c.name.split(' ')[0]} {c.name.split(' ')[1]}</div>
                      {isRecommended && (
                        <span className="inline-block mt-1 px-2.5 py-0.5 bg-[#BBEAA6] text-[#0c2417] text-[9px] uppercase tracking-[0.45px] font-bold rounded-[56px]">
                          Recommended
                        </span>
                      )}
                      <div className="text-xs text-[#2e5a40] mt-1 font-normal line-clamp-1">{c.location.village}</div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#cdeac6] text-xs">
              {/* Distance */}
              <tr>
                <td className="p-3 text-[9px] uppercase tracking-[0.45px] text-[#2e5a40] font-bold">
                  Distance
                </td>
                {centres.map((c) => (
                  <td key={c.id} className="p-3">
                    <span className="font-mono text-base font-bold text-[#166534]">{c.distanceKm} km</span>
                    <span className="text-[#2e5a40] block text-[11px]">from your village</span>
                  </td>
                ))}
              </tr>

              {/* Current Queue & Load */}
              <tr>
                <td className="p-3 text-[9px] uppercase tracking-[0.45px] text-[#2e5a40] font-bold">
                  Live Load & Wait
                </td>
                {centres.map((c) => (
                  <td key={c.id} className="p-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        c.currentQueue.loadLevel === 'Low' ? 'bg-[#166534]' :
                        c.currentQueue.loadLevel === 'Moderate' ? 'bg-[#d97706]' : 'bg-[#dc2626]'
                      }`} />
                      <span className="font-bold text-[#0d2618]">{c.currentQueue.loadLevel} Load</span>
                    </div>
                    <div className="text-[#2e5a40] text-[11px] mt-0.5">
                      {c.currentQueue.activeVehicles} vehicles in line (~{c.currentQueue.estimatedWaitMins}m)
                    </div>
                  </td>
                ))}
              </tr>

              {/* Operating Hours */}
              <tr>
                <td className="p-3 text-[9px] uppercase tracking-[0.45px] text-[#2e5a40] font-bold">
                  Hours & Shift
                </td>
                {centres.map((c) => (
                  <td key={c.id} className="p-3">
                    <div className="text-[#0d2618] font-bold">
                      {c.operatingHours.opens} - {c.operatingHours.closes}
                    </div>
                    <div className="text-[#2e5a40] text-[11px] mt-0.5">{c.operatingHours.days}</div>
                  </td>
                ))}
              </tr>

              {/* Accepted Crops */}
              <tr>
                <td className="p-3 text-[9px] uppercase tracking-[0.45px] text-[#2e5a40] font-bold">
                  Crop Verification
                </td>
                {centres.map((c) => {
                  const acceptsSelected = selectedCrop ? c.acceptedCropIds.includes(selectedCrop.id) : true;
                  return (
                    <td key={c.id} className="p-3">
                      {acceptsSelected ? (
                        <span className="inline-flex items-center gap-1 text-[#166534] font-bold text-[11px] bg-[#eef8ee] px-2.5 py-1 rounded-[56px] border border-[#BBEAA6]">
                          <Check className="w-3 h-3" /> Accepts {selectedCrop?.name.split(' ')[0]}
                        </span>
                      ) : (
                        <span className="text-[#64748b] text-[11px]">
                          Not accepted
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Officer Contact */}
              <tr>
                <td className="p-3 text-[9px] uppercase tracking-[0.45px] text-[#2e5a40] font-bold">
                  Terminal Officer
                </td>
                {centres.map((c) => (
                  <td key={c.id} className="p-3 text-[#2e5a40]">
                    <div className="text-[#0d2618] font-semibold">{c.officerInCharge.split('(')[0]}</div>
                    <div className="text-[11px] text-[#166534] font-mono font-bold mt-0.5">{c.contactNumber}</div>
                  </td>
                ))}
              </tr>

              {/* Actions */}
              <tr>
                <td className="p-3"></td>
                {centres.map((c) => {
                  const isSelected = c.id === selectedCentreId;
                  return (
                    <td key={c.id} className="p-3">
                      <button
                        onClick={() => {
                          onSelectCentre(c.id);
                          onClose();
                        }}
                        className={`w-full min-h-[44px] py-2.5 px-4 rounded-[56px] text-xs font-bold transition-all flex items-center justify-center ${
                          isSelected
                            ? 'bg-[#166534] text-[#ffffff] shadow-sm'
                            : 'bg-[#f4fbf5] border border-[#cdeac6] text-[#0d2618] hover:bg-[#eef8ee]'
                        }`}
                      >
                        {isSelected ? 'Active Selection' : 'Select Centre'}
                      </button>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#cdeac6] bg-[#f4fbf5] flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-[#ffffff] border border-[#cdeac6] hover:bg-[#eef8ee] text-[#0d2618] rounded-[56px] text-xs font-bold flex items-center justify-center"
          >
            Close Matrix
          </button>
        </div>
      </div>
    </div>
  );
};
