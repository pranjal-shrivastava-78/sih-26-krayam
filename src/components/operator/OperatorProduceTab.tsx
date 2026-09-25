import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ProduceLot, StorageStatus, DispatchStatus, ProduceFlowStage } from '../../types';
import kaiService from '../../services/kaiService';
import { 
  Package, 
  Layers, 
  Warehouse, 
  Truck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Search, 
  Filter, 
  ArrowRight, 
  Sparkles, 
  Eye, 
  Edit3, 
  Calendar, 
  FileCheck, 
  Check, 
  X,
  RefreshCw,
  TrendingUp,
  MapPin,
  Building2,
  Scale
} from 'lucide-react';

export const OperatorProduceTab: React.FC = () => {
  const { 
    produceLots, 
    updateProduceLotStorage, 
    updateProduceLotDispatch, 
    centres, 
    operator, 
    language,
    isOffline,
    formatLocalizedDate,
    translateCrop
  } = useApp();

  const activeCentre = centres.find(c => c.id === operator?.centreId) || centres[0] || {
    id: 'centre-samrala',
    name: operator?.centreName || 'Samrala Main Grain Mandi',
    acceptedCropIds: [],
    operatingHours: { opens: '08:00', closes: '18:00' },
    currentQueue: { activeVehicles: 0, loadLevel: 'Low', estimatedWaitMins: 0 },
    location: { district: 'Ludhiana', state: 'Punjab' }
  };

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [cropFilter, setCropFilter] = useState('ALL');
  const [storageFilter, setStorageFilter] = useState<string>('ALL');
  const [dispatchFilter, setDispatchFilter] = useState<string>('ALL');

  // Modals state
  const [selectedLotForStorage, setSelectedLotForStorage] = useState<ProduceLot | null>(null);
  const [selectedLotForDispatch, setSelectedLotForDispatch] = useState<ProduceLot | null>(null);
  const [selectedLotForDetail, setSelectedLotForDetail] = useState<ProduceLot | null>(null);

  // Storage Form state
  const [storageStatusInput, setStorageStatusInput] = useState<StorageStatus>('Stored');
  const [storageBayInput, setStorageBayInput] = useState('Warehouse Bay 04 (Covered Silo)');
  const [storageNotesInput, setStorageNotesInput] = useState('Aerated grain storage standards verified');
  const [isUpdatingStorage, setIsUpdatingStorage] = useState(false);

  // Dispatch Form state
  const [dispatchStatusInput, setDispatchStatusInput] = useState<DispatchStatus>('Dispatch Scheduled');
  const [dispatchDestinationInput, setDispatchDestinationInput] = useState('FCI Central Silo Panipat');
  const [dispatchVehicleInput, setDispatchVehicleInput] = useState('PB-10-CZ-4821');
  const [dispatchQuantityInput, setDispatchQuantityInput] = useState<number>(100);
  const [isUpdatingDispatch, setIsUpdatingDispatch] = useState(false);

  // KAI Produce Flow Prediction
  const kaiProduceInsight = useMemo(() => {
    return kaiService.getProduceFlowPrediction(activeCentre as any, produceLots, 185);
  }, [activeCentre, produceLots]);

  // Filtered Produce Lots
  const filteredLots = useMemo(() => {
    return produceLots.filter(lot => {
      const matchesSearch = 
        lot.lotId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lot.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lot.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lot.bookingId && lot.bookingId.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCrop = cropFilter === 'ALL' || lot.crop.toLowerCase().includes(cropFilter.toLowerCase());
      const matchesStorage = storageFilter === 'ALL' || lot.storageStatus === storageFilter;
      const matchesDispatch = dispatchFilter === 'ALL' || lot.dispatchStatus === dispatchFilter;

      return matchesSearch && matchesCrop && matchesStorage && matchesDispatch;
    });
  }, [produceLots, searchQuery, cropFilter, storageFilter, dispatchFilter]);

  // Aggregate stats
  const totalAcceptedQtl = produceLots.reduce((sum, l) => sum + l.acceptedQuantityQuintals, 0);
  const totalStoredQtl = produceLots
    .filter(l => l.storageStatus === 'Stored')
    .reduce((sum, l) => sum + l.acceptedQuantityQuintals, 0);
  const totalAwaitingStorageQtl = produceLots
    .filter(l => l.storageStatus === 'Awaiting Storage')
    .reduce((sum, l) => sum + l.acceptedQuantityQuintals, 0);
  const totalDispatchedQtl = produceLots
    .filter(l => l.dispatchStatus === 'Dispatched')
    .reduce((sum, l) => sum + (l.dispatchQuantityQuintals || l.acceptedQuantityQuintals), 0);

  // Handlers
  const handleOpenStorageModal = (lot: ProduceLot) => {
    setSelectedLotForStorage(lot);
    setStorageStatusInput(lot.storageStatus === 'Awaiting Storage' ? 'Stored' : lot.storageStatus);
    setStorageBayInput(lot.storageLocationBay || 'Warehouse Bay 03');
    setStorageNotesInput(lot.storageNotes || 'Dry covered storage bay');
  };

  const handleSaveStorage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLotForStorage) return;
    setIsUpdatingStorage(true);
    try {
      await updateProduceLotStorage(
        selectedLotForStorage.lotId,
        storageStatusInput,
        storageBayInput,
        storageNotesInput
      );
      setSelectedLotForStorage(null);
    } catch (err: any) {
      alert(err.message || 'Failed to update storage.');
    } finally {
      setIsUpdatingStorage(false);
    }
  };

  const handleOpenDispatchModal = (lot: ProduceLot) => {
    setSelectedLotForDispatch(lot);
    setDispatchStatusInput(lot.dispatchStatus === 'Awaiting Dispatch' ? 'Dispatch Scheduled' : lot.dispatchStatus);
    setDispatchDestinationInput(lot.dispatchDestination || 'FCI Central Silo Panipat');
    setDispatchVehicleInput(lot.transportVehicleNumber || 'PB-10-TR-3912');
    setDispatchQuantityInput(lot.acceptedQuantityQuintals);
  };

  const handleSaveDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLotForDispatch) return;
    setIsUpdatingDispatch(true);
    try {
      await updateProduceLotDispatch(
        selectedLotForDispatch.lotId,
        dispatchStatusInput,
        dispatchDestinationInput,
        dispatchVehicleInput,
        dispatchQuantityInput
      );
      setSelectedLotForDispatch(null);
    } catch (err: any) {
      alert(err.message || 'Failed to update dispatch.');
    } finally {
      setIsUpdatingDispatch(false);
    }
  };

  // Helper for lifecycle stages
  const getStageStatus = (currentStage: ProduceFlowStage, stage: ProduceFlowStage): 'completed' | 'current' | 'upcoming' => {
    const order: ProduceFlowStage[] = [
      'PROCURED',
      'QUALITY_VERIFIED',
      'LOT_CREATED',
      'AWAITING_STORAGE',
      'STORED',
      'AWAITING_DISPATCH',
      'DISPATCHED'
    ];
    const currentIndex = order.indexOf(currentStage);
    const targetIndex = order.indexOf(stage);

    if (targetIndex < currentIndex) return 'completed';
    if (targetIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#063B2A] bg-[#E7F3EC] px-2 py-0.5 rounded border border-[#85E1A9]">
              Mandi Produce Flow Architecture
            </span>
            <span className="text-xs font-mono text-[#075E43] font-semibold">
              6-Stage Traceability
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#17231F] mt-1 flex items-center gap-2">
            <Package className="w-6 h-6 text-[#075E43]" />
            <span>Produce Lot & Storage Management</span>
          </h1>
          <p className="text-xs text-[#66736D] mt-0.5">
            Trace procured grain batches from digital intake weighing, lot creation, and warehouse storage to FCI dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <div className="bg-[#F5F8F6] border border-[#CBD8D1] px-3 py-2 rounded-[6px] text-right">
            <div className="text-[10px] text-[#66736D] uppercase font-semibold">Mandi Facility</div>
            <div className="font-bold text-[#063B2A]">{activeCentre.name}</div>
          </div>
        </div>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Lots Procured */}
        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-4 shadow-sm">
          <div className="text-xs font-bold text-[#66736D] uppercase flex items-center justify-between">
            <span>Total Lots Created</span>
            <Layers className="w-4 h-4 text-[#075E43]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#17231F] mt-2">
            {produceLots.length} Lots
          </div>
          <div className="text-[11px] text-[#075E43] font-semibold mt-1">
            {totalAcceptedQtl.toLocaleString()} Qtl Total Volume
          </div>
        </div>

        {/* Stored in Warehouses */}
        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-4 shadow-sm">
          <div className="text-xs font-bold text-[#66736D] uppercase flex items-center justify-between">
            <span>Warehoused & Stored</span>
            <Warehouse className="w-4 h-4 text-[#16803C]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#16803C] mt-2">
            {(totalStoredQtl / 10).toFixed(1)} Tonnes
          </div>
          <div className="text-[11px] text-[#66736D] mt-1 font-mono">
            {totalStoredQtl} Qtl in Mandi Covered Bays
          </div>
        </div>

        {/* Awaiting Storage */}
        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-4 shadow-sm">
          <div className="text-xs font-bold text-[#66736D] uppercase flex items-center justify-between">
            <span>Awaiting Storage</span>
            <Clock className="w-4 h-4 text-[#EA8A0A]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#EA8A0A] mt-2">
            {(totalAwaitingStorageQtl / 10).toFixed(1)} Tonnes
          </div>
          <div className="text-[11px] text-[#B45309] font-semibold mt-1">
            Yard intake area staging
          </div>
        </div>

        {/* Dispatched */}
        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-4 shadow-sm">
          <div className="text-xs font-bold text-[#66736D] uppercase flex items-center justify-between">
            <span>Dispatched / Evacuated</span>
            <Truck className="w-4 h-4 text-[#175CD3]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#175CD3] mt-2">
            {(totalDispatchedQtl / 10).toFixed(1)} Tonnes
          </div>
          <div className="text-[11px] text-[#1E40AF] font-semibold mt-1">
            Transported to FCI / Mill Silos
          </div>
        </div>
      </div>

      {/* 3. KAI Produce Flow Prediction Strip (Phase 11 & 12) */}
      <div className="bg-[#063B2A] text-white border border-[#0B6B4F] rounded-[8px] p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#0B6B4F] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#075E43] flex items-center justify-center text-[#85E1A9]">
              <Sparkles className="w-4 h-4 text-[#85E1A9]" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#FFFFFF] flex items-center gap-2">
                <span>KAI PRODUCE FLOW INSIGHT</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#04261B] text-[#85E1A9] border border-[#0B4734]">
                  {kaiProduceInsight.source}
                </span>
              </div>
              <div className="text-[11px] text-[#CBD8D1]">
                Predictive accumulation & evacuation schedule for {activeCentre.name}
              </div>
            </div>
          </div>

          <div className="text-xs text-[#85E1A9] font-mono">
            Updated: {kaiProduceInsight.updatedAt}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-[#04261B] p-3 rounded-[6px] border border-[#0B4734]">
            <span className="text-[#CBD8D1] block text-[11px]">Expected Produce Inflow:</span>
            <span className="text-lg font-bold font-mono text-[#FFFFFF] mt-0.5 block">
              {kaiProduceInsight.expectedProduceInflowTonnes} Tonnes
            </span>
            <span className="text-[10px] text-[#85E1A9]">Intake scheduled today</span>
          </div>

          <div className="bg-[#04261B] p-3 rounded-[6px] border border-[#0B4734]">
            <span className="text-[#CBD8D1] block text-[11px]">Expected Accumulation:</span>
            <span className="text-lg font-bold font-mono text-[#E7F3EC] mt-0.5 block">
              {kaiProduceInsight.expectedAccumulationTonnes} Tonnes
            </span>
            <span className="text-[10px] text-[#85E1A9]">Storage bay volume</span>
          </div>

          <div className="bg-[#04261B] p-3 rounded-[6px] border border-[#0B4734]">
            <span className="text-[#CBD8D1] block text-[11px]">Storage Requirement:</span>
            <span className={`text-lg font-bold mt-0.5 block ${
              kaiProduceInsight.storageRequirementLevel === 'Critical' ? 'text-[#FCA5A5]' :
              kaiProduceInsight.storageRequirementLevel === 'High' ? 'text-[#FCD34D]' : 'text-[#85E1A9]'
            }`}>
              {kaiProduceInsight.storageRequirementLevel} Load ({kaiProduceInsight.storageBayUtilizationPercent}%)
            </span>
            <span className="text-[10px] text-[#CBD8D1]">Bay allocation needed</span>
          </div>

          <div className="bg-[#04261B] p-3 rounded-[6px] border border-[#0B4734]">
            <span className="text-[#CBD8D1] block text-[11px]">Dispatch Requirement:</span>
            <span className="text-lg font-bold font-mono text-[#FFFFFF] mt-0.5 block">
              {kaiProduceInsight.dispatchRequirementText}
            </span>
            <span className="text-[10px] text-[#85E1A9]">FCI Evacuation Trucks</span>
          </div>
        </div>
      </div>

      {/* 4. Visual 6-Stage Produce Flow Lifecycle Indicator (Phase 9.6) */}
      <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#17231F] flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#075E43]" />
            <span>Standardized Produce Flow Lifecycle</span>
          </h2>
          <span className="text-xs text-[#66736D]">
            Official Mandi Floor Protocol
          </span>
        </div>

        {/* Responsive Lifecycle Strip */}
        <div className="overflow-x-auto py-2">
          <div className="flex items-center justify-between min-w-[720px] gap-2">
            {[
              { id: 'PROCURED', label: '1. Procured' },
              { id: 'QUALITY_VERIFIED', label: '2. Quality Verified' },
              { id: 'LOT_CREATED', label: '3. Lot Created' },
              { id: 'AWAITING_STORAGE', label: '4. Awaiting Storage' },
              { id: 'STORED', label: '5. Stored' },
              { id: 'AWAITING_DISPATCH', label: '6. Awaiting Dispatch' },
              { id: 'DISPATCHED', label: '7. Dispatched' },
            ].map((step, idx, arr) => (
              <React.Fragment key={step.id}>
                <div className="flex items-center gap-2 bg-[#F5F8F6] border border-[#CBD8D1] px-3 py-2 rounded-[6px] shrink-0 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16803C]" />
                  <span className="font-semibold text-[#17231F]">{step.label}</span>
                </div>
                {idx < arr.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-[#66736D] shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Produce Lots Table Section (Phase 10) */}
      <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-5 shadow-sm space-y-4">
        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#66736D] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Lot ID (KRM-...), Farmer Name, Crop, or Booking..."
              className="w-full pl-9 pr-3 py-2 rounded-[6px] border border-[#CBD8D1] bg-[#FFFFFF] text-xs focus:outline-none focus:border-[#075E43]"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={cropFilter}
              onChange={(e) => setCropFilter(e.target.value)}
              className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[6px] px-3 py-2 text-xs font-medium focus:outline-none focus:border-[#075E43]"
            >
              <option value="ALL">All Crops</option>
              <option value="Wheat">Wheat</option>
              <option value="Paddy">Paddy / Rice</option>
              <option value="Mustard">Mustard</option>
              <option value="Cotton">Cotton</option>
            </select>

            <select
              value={storageFilter}
              onChange={(e) => setStorageFilter(e.target.value)}
              className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[6px] px-3 py-2 text-xs font-medium focus:outline-none focus:border-[#075E43]"
            >
              <option value="ALL">All Storage Status</option>
              <option value="Awaiting Storage">Awaiting Storage</option>
              <option value="Stored">Stored</option>
              <option value="Storage Issue">Storage Issue</option>
            </select>

            <select
              value={dispatchFilter}
              onChange={(e) => setDispatchFilter(e.target.value)}
              className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[6px] px-3 py-2 text-xs font-medium focus:outline-none focus:border-[#075E43]"
            >
              <option value="ALL">All Dispatch Status</option>
              <option value="Awaiting Dispatch">Awaiting Dispatch</option>
              <option value="Dispatch Scheduled">Dispatch Scheduled</option>
              <option value="Dispatched">Dispatched</option>
            </select>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto border border-[#CBD8D1] rounded-[6px]">
          <table className="w-full text-xs text-left min-w-[950px]">
            <thead className="bg-[#EDF3EF] text-[#34443D] uppercase text-[10px] font-bold border-b border-[#CBD8D1]">
              <tr>
                <th className="px-3 py-2.5">Lot ID & Booking</th>
                <th className="px-3 py-2.5">Farmer & Origin</th>
                <th className="px-3 py-2.5">Crop & Volume</th>
                <th className="px-3 py-2.5">Quality Grade</th>
                <th className="px-3 py-2.5">Storage Status</th>
                <th className="px-3 py-2.5">Dispatch Status</th>
                <th className="px-3 py-2.5">Current Flow</th>
                <th className="px-3 py-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#CBD8D1]">
              {filteredLots.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-[#66736D]">
                    No produce lots found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredLots.map((lot) => {
                  return (
                    <tr key={lot.lotId} className="hover:bg-[#F5F8F6] transition-colors">
                      {/* Lot ID */}
                      <td className="px-3 py-3">
                        <div className="font-mono font-bold text-[#063B2A]">{lot.lotId}</div>
                        <div className="text-[10px] text-[#66736D] font-mono">Ref: {lot.bookingId}</div>
                      </td>

                      {/* Farmer */}
                      <td className="px-3 py-3">
                        <div className="font-bold text-[#17231F]">{lot.farmerName}</div>
                        <div className="text-[10px] text-[#66736D]">{lot.procurementCentreName}</div>
                      </td>

                      {/* Crop & Quantity */}
                      <td className="px-3 py-3">
                        <div className="font-semibold text-[#17231F]">{translateCrop(lot.crop)}</div>
                        <div className="text-[11px] text-[#075E43] font-mono font-bold">
                          {lot.acceptedQuantityQuintals} Qtl ({(lot.acceptedQuantityQuintals / 10).toFixed(1)}T)
                        </div>
                      </td>

                      {/* Quality */}
                      <td className="px-3 py-3">
                        <span className="inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded text-[10px] bg-[#E7F3EC] text-[#075E43] border border-[#85E1A9]">
                          <CheckCircle2 className="w-3 h-3 text-[#16803C]" />
                          {lot.qualityGrade}
                        </span>
                        {lot.moisturePercent && (
                          <div className="text-[10px] text-[#66736D] mt-0.5">
                            Moisture: {lot.moisturePercent}%
                          </div>
                        )}
                      </td>

                      {/* Storage Status */}
                      <td className="px-3 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                          lot.storageStatus === 'Stored' 
                            ? 'bg-[#E7F3EC] text-[#16803C] border border-[#85E1A9]'
                            : lot.storageStatus === 'Storage Issue'
                            ? 'bg-[#FFF5F5] text-[#B42318] border border-[#F0C2C2]'
                            : 'bg-[#FFF3DC] text-[#B45309] border border-[#F0D7A7]'
                        }`}>
                          {lot.storageStatus}
                        </span>
                        <div className="text-[10px] text-[#66736D] mt-0.5 truncate max-w-[140px]" title={lot.storageLocationBay}>
                          {lot.storageLocationBay || 'Intake Staging Area'}
                        </div>
                      </td>

                      {/* Dispatch Status */}
                      <td className="px-3 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                          lot.dispatchStatus === 'Dispatched'
                            ? 'bg-[#E7F3EC] text-[#16803C] border border-[#85E1A9]'
                            : lot.dispatchStatus === 'Dispatch Scheduled'
                            ? 'bg-[#EEF4FF] text-[#175CD3] border border-[#C7D7FE]'
                            : 'bg-[#F5F8F6] text-[#66736D] border border-[#CBD8D1]'
                        }`}>
                          {lot.dispatchStatus}
                        </span>
                        <div className="text-[10px] text-[#66736D] mt-0.5 truncate max-w-[140px]" title={lot.dispatchDestination}>
                          {lot.dispatchDestination || 'Destination unassigned'}
                        </div>
                      </td>

                      {/* Current Flow Status Badge */}
                      <td className="px-3 py-3">
                        <span className="font-mono text-[10px] bg-[#063B2A] text-white px-2 py-0.5 rounded">
                          {lot.currentFlowStatus}
                        </span>
                      </td>

                      {/* Action Buttons */}
                      <td className="px-3 py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenStorageModal(lot)}
                            className="p-1.5 rounded bg-[#F5F8F6] hover:bg-[#E7F3EC] text-[#075E43] border border-[#CBD8D1]"
                            title="Update Storage Status"
                          >
                            <Warehouse className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenDispatchModal(lot)}
                            className="p-1.5 rounded bg-[#F5F8F6] hover:bg-[#EEF4FF] text-[#175CD3] border border-[#CBD8D1]"
                            title="Schedule Dispatch"
                          >
                            <Truck className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedLotForDetail(lot)}
                            className="p-1.5 rounded bg-[#063B2A] hover:bg-[#075E43] text-white"
                            title="View Full Flow Trace"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: Update Storage Status */}
      {selectedLotForStorage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-[8px] max-w-md w-full p-5 shadow-xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-[#CBD8D1] pb-2">
              <h3 className="text-sm font-bold text-[#17231F] flex items-center gap-1.5">
                <Warehouse className="w-4 h-4 text-[#075E43]" />
                <span>Update Storage: {selectedLotForStorage.lotId}</span>
              </h3>
              <button 
                onClick={() => setSelectedLotForStorage(null)}
                className="text-[#66736D] hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveStorage} className="space-y-3">
              <div>
                <label className="block font-bold text-[#17231F] mb-1">Storage Status *</label>
                <select
                  value={storageStatusInput}
                  onChange={(e) => setStorageStatusInput(e.target.value as StorageStatus)}
                  className="w-full border border-[#CBD8D1] rounded p-2 text-xs focus:border-[#075E43] focus:outline-none"
                >
                  <option value="Awaiting Storage">Awaiting Storage (Intake Staging)</option>
                  <option value="Stored">Stored (Warehouse Bay Assigned)</option>
                  <option value="Storage Issue">Storage Issue (Spillage / Quality Hold)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#17231F] mb-1">Warehouse / Bay Location</label>
                <input
                  type="text"
                  value={storageBayInput}
                  onChange={(e) => setStorageBayInput(e.target.value)}
                  placeholder="e.g. Warehouse Bay 04 (Covered Silo)"
                  className="w-full border border-[#CBD8D1] rounded p-2 text-xs focus:border-[#075E43] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#17231F] mb-1">Storage Condition Notes</label>
                <textarea
                  value={storageNotesInput}
                  onChange={(e) => setStorageNotesInput(e.target.value)}
                  rows={2}
                  className="w-full border border-[#CBD8D1] rounded p-2 text-xs focus:border-[#075E43] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#CBD8D1]">
                <button
                  type="button"
                  onClick={() => setSelectedLotForStorage(null)}
                  className="px-3 py-1.5 border border-[#CBD8D1] rounded text-[#34443D] hover:bg-[#F5F8F6]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingStorage}
                  className="px-4 py-1.5 bg-[#063B2A] text-white font-bold rounded hover:bg-[#075E43] transition-colors"
                >
                  {isUpdatingStorage ? 'Saving...' : 'Confirm Storage Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Schedule / Update Dispatch */}
      {selectedLotForDispatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-[8px] max-w-md w-full p-5 shadow-xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-[#CBD8D1] pb-2">
              <h3 className="text-sm font-bold text-[#17231F] flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#175CD3]" />
                <span>Schedule Dispatch: {selectedLotForDispatch.lotId}</span>
              </h3>
              <button 
                onClick={() => setSelectedLotForDispatch(null)}
                className="text-[#66736D] hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveDispatch} className="space-y-3">
              <div>
                <label className="block font-bold text-[#17231F] mb-1">Dispatch Status *</label>
                <select
                  value={dispatchStatusInput}
                  onChange={(e) => setDispatchStatusInput(e.target.value as DispatchStatus)}
                  className="w-full border border-[#CBD8D1] rounded p-2 text-xs focus:border-[#075E43] focus:outline-none"
                >
                  <option value="Awaiting Dispatch">Awaiting Dispatch (In Storage)</option>
                  <option value="Dispatch Scheduled">Dispatch Scheduled (Truck Assigned)</option>
                  <option value="Dispatched">Dispatched (Out for Delivery)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#17231F] mb-1">Destination Facility</label>
                <input
                  type="text"
                  value={dispatchDestinationInput}
                  onChange={(e) => setDispatchDestinationInput(e.target.value)}
                  placeholder="e.g. FCI Central Silo Panipat / Hafed Mill"
                  className="w-full border border-[#CBD8D1] rounded p-2 text-xs focus:border-[#075E43] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#17231F] mb-1">Transport Vehicle Number</label>
                <input
                  type="text"
                  value={dispatchVehicleInput}
                  onChange={(e) => setDispatchVehicleInput(e.target.value)}
                  placeholder="e.g. PB-10-TR-3912"
                  className="w-full border border-[#CBD8D1] rounded p-2 text-xs focus:border-[#075E43] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#17231F] mb-1">Quantity Dispatched (Quintals)</label>
                <input
                  type="number"
                  step="0.1"
                  value={dispatchQuantityInput}
                  onChange={(e) => setDispatchQuantityInput(Number(e.target.value))}
                  className="w-full border border-[#CBD8D1] rounded p-2 text-xs focus:border-[#075E43] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#CBD8D1]">
                <button
                  type="button"
                  onClick={() => setSelectedLotForDispatch(null)}
                  className="px-3 py-1.5 border border-[#CBD8D1] rounded text-[#34443D] hover:bg-[#F5F8F6]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingDispatch}
                  className="px-4 py-1.5 bg-[#175CD3] text-white font-bold rounded hover:bg-[#1E40AF] transition-colors"
                >
                  {isUpdatingDispatch ? 'Saving...' : 'Confirm Dispatch Schedule'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Full Produce Flow Detail & Traceability Modal */}
      {selectedLotForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-[8px] max-w-2xl w-full p-6 shadow-2xl space-y-5 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#CBD8D1] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase bg-[#E7F3EC] text-[#075E43] px-2 py-0.5 rounded font-bold">
                  Produce Flow Traceability
                </span>
                <h3 className="text-base font-bold text-[#17231F] mt-1 flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#075E43]" />
                  <span>LOT ID: {selectedLotForDetail.lotId}</span>
                </h3>
              </div>
              <button 
                onClick={() => setSelectedLotForDetail(null)}
                className="text-[#66736D] hover:text-black p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Traceable Core Stages Flow */}
            <div className="space-y-3 bg-[#F5F8F6] p-4 rounded-[6px] border border-[#CBD8D1]">
              <div className="text-xs font-bold text-[#063B2A] uppercase tracking-wide">
                Produce Lifecycle Progression
              </div>
              
              <div className="space-y-2">
                {[
                  { stage: 'PROCURED', title: '1. Procured at Gate Weighbridge', desc: `${selectedLotForDetail.acceptedQuantityQuintals} Qtl accepted • Verification timestamp ${selectedLotForDetail.verifiedAt.slice(0, 16)}` },
                  { stage: 'QUALITY_VERIFIED', title: '2. Quality & Moisture Verified', desc: `Grade: ${selectedLotForDetail.qualityGrade} • Moisture: ${selectedLotForDetail.moisturePercent || '11.5'}% • Notes: ${selectedLotForDetail.qualityNotes || 'Standards met'}` },
                  { stage: 'LOT_CREATED', title: '3. Produce Lot Created', desc: `Assigned ID ${selectedLotForDetail.lotId} linked to Transaction ${selectedLotForDetail.procurementId}` },
                  { stage: 'STORED', title: '4. Warehouse Storage', desc: `Status: ${selectedLotForDetail.storageStatus} • Location: ${selectedLotForDetail.storageLocationBay || 'Pending assignment'}` },
                  { stage: 'DISPATCHED', title: '5. Dispatch & Transport', desc: `Status: ${selectedLotForDetail.dispatchStatus} • Destination: ${selectedLotForDetail.dispatchDestination || 'Pending schedule'}` },
                ].map((s) => (
                  <div key={s.stage} className="flex items-start gap-2.5 p-2 bg-white rounded border border-[#CBD8D1]">
                    <CheckCircle2 className="w-4 h-4 text-[#16803C] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[#17231F]">{s.title}</div>
                      <div className="text-[11px] text-[#66736D]">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Traceability Metadata Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-[#FFFFFF] border border-[#CBD8D1] p-4 rounded-[6px]">
              <div>
                <span className="text-[#66736D] block">Farmer Name:</span>
                <span className="font-bold text-[#17231F]">{selectedLotForDetail.farmerName}</span>
              </div>
              <div>
                <span className="text-[#66736D] block">Farmer Mobile:</span>
                <span className="font-mono">{selectedLotForDetail.farmerMobile || 'N/A'}</span>
              </div>
              <div>
                <span className="text-[#66736D] block">Procurement Centre:</span>
                <span className="font-semibold">{selectedLotForDetail.procurementCentreName}</span>
              </div>
              <div>
                <span className="text-[#66736D] block">Procurement Date:</span>
                <span className="font-mono">{selectedLotForDetail.procurementDate}</span>
              </div>
              <div>
                <span className="text-[#66736D] block">Accepted Quantity:</span>
                <span className="font-bold text-[#16803C]">{selectedLotForDetail.acceptedQuantityQuintals} Qtl</span>
              </div>
              <div>
                <span className="text-[#66736D] block">Assessing Officer:</span>
                <span>{selectedLotForDetail.operatorName}</span>
              </div>
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={() => setSelectedLotForDetail(null)}
                className="px-4 py-2 bg-[#063B2A] text-white font-bold rounded-[6px] hover:bg-[#075E43]"
              >
                Close Trace Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OperatorProduceTab;
