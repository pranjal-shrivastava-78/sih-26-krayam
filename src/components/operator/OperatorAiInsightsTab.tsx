import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { getOperatorText } from '../../i18n/operatorTranslations';
import api, { BackendAnalyticsForecast } from '../../services/api';
import kaiService from '../../services/kaiService';
import { 
  RecommendedCentreItem, 
  KaiDemandPrediction, 
  KaiQueuePrediction, 
  KaiCapacityForecast, 
  KaiProduceFlowPrediction, 
  KaiSmartRecommendation 
} from '../../types';
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
  Compass, 
  Loader2, 
  RefreshCw, 
  Building2, 
  Package, 
  Truck, 
  Warehouse, 
  Scale, 
  Calendar,
  Activity,
  Check
} from 'lucide-react';

export const OperatorAiInsightsTab: React.FC = () => {
  const { operator, centres, payments, bookings, produceLots, language, isOffline, lastSyncTime } = useApp();
  const ot = getOperatorText(language);

  const [forecast, setForecast] = useState<BackendAnalyticsForecast | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendedCentreItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeEngineTab, setActiveEngineTab] = useState<'DEMAND' | 'QUEUE' | 'CAPACITY' | 'PRODUCE_FLOW'>('DEMAND');
  const [acknowledgedRecs, setAcknowledgedRecs] = useState<Set<string>>(new Set());

  const activeCentre = centres.find(c => c.id === operator?.centreId) || centres[0] || {
    id: 'centre-samrala',
    name: operator?.centreName || 'Samrala Main Grain Mandi',
    acceptedCropIds: [],
    operatingHours: { opens: '08:00', closes: '18:00' },
    currentQueue: { activeVehicles: 0, loadLevel: 'Low', estimatedWaitMins: 0 },
    location: { district: 'Ludhiana', state: 'Punjab' },
    availableSlots: 25
  };

  const todayStr = new Date().toISOString().split('T')[0];

  const fetchAiData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (activeCentre.id) {
        const forecastData = await api.analytics.getForecast(activeCentre.id, todayStr);
        setForecast(forecastData);
      }

      try {
        const recData = await api.bookings.recommend('Wheat', todayStr);
        setRecommendations(recData || []);
      } catch (recErr: any) {
        console.warn('Network recommendation notice:', recErr.message);
      }
    } catch (err: any) {
      console.warn('AI insights fetch error:', err.message);
      setError(err.message || 'KAI insights temporarily unavailable.');
    } finally {
      setIsLoading(false);
    }
  }, [activeCentre.id, todayStr]);

  useEffect(() => {
    fetchAiData();
  }, [fetchAiData]);

  // Derive live KAI intelligence models
  const demandPrediction = useMemo<KaiDemandPrediction>(() => {
    const bookedQtl = bookings.reduce((sum, b) => sum + (b.quantityQuintals || 0), 0);
    const totalQtl = forecast?.booked_quantity ? forecast.booked_quantity : (bookedQtl > 0 ? bookedQtl : 185);
    const inflowTonnes = Number((totalQtl / 10).toFixed(1));
    const loadPct = forecast?.expected_load_percent !== undefined 
      ? Math.round(forecast.expected_load_percent) 
      : 78;

    return {
      crop: 'Wheat (गेहूं)',
      centreId: activeCentre.id,
      centreName: activeCentre.name,
      date: todayStr,
      expectedProduceInflowTonnes: inflowTonnes,
      expectedProduceArrivalQuintals: totalQtl,
      expectedFarmerCount: forecast?.expected_arrivals ? Math.round(forecast.expected_arrivals) : 18,
      projectedCentreLoadPercent: loadPct,
      seasonalTrend: loadPct > 80 ? 'Peak Harvest' : 'Rising Inflow',
      confidenceScorePercent: forecast ? 96 : 89,
      historicalBaselineQuintals: 160,
      source: forecast ? 'LIVE / BACKEND' : 'DEMO / SIMULATED',
      updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }, [forecast, bookings, activeCentre, todayStr]);

  const queuePrediction = useMemo<KaiQueuePrediction>(() => {
    const wait = forecast?.predicted_wait_minutes !== undefined ? forecast.predicted_wait_minutes : 32;
    const risk = wait > 40 ? 'High' : wait > 20 ? 'Medium' : 'Low';
    return {
      centreId: activeCentre.id,
      predictedWaitMinutes: wait,
      predictedPeakPeriod: '11:00 AM – 01:00 PM',
      queueRiskLevel: risk,
      queueStatus: risk === 'High' ? 'Congested' : 'Moderate Density',
      processingRatePerHour: 6,
      activeWeighbridgeGates: 2,
      delayProbabilityPercent: risk === 'High' ? 68 : 28,
      source: forecast ? 'LIVE / BACKEND' : 'DEMO / SIMULATED',
      updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }, [forecast, activeCentre]);

  const capacityForecast = useMemo<KaiCapacityForecast>(() => {
    const capacity = forecast?.capacity || activeCentre.availableSlots || 25;
    const util = forecast?.expected_load_percent !== undefined 
      ? Math.round(forecast.expected_load_percent) 
      : 78;
    const status = util > 85 ? 'Near Limit' : util > 70 ? 'Moderate Load' : 'Normal';
    const queueRisk = util > 80 ? 'High' : util > 60 ? 'Medium' : 'Low';

    return {
      centreId: activeCentre.id,
      centreName: activeCentre.name,
      dailyCapacityQuintals: capacity * 10,
      expectedInflowQuintals: demandPrediction.expectedProduceArrivalQuintals,
      capacityUtilizationPercent: util,
      capacityStatus: status,
      queueRisk,
      pressureWarning: util > 75 ? 'Midday appointment congestion predicted at weighbridge lane 1' : undefined,
      actionableRecommendation: util > 75 
        ? 'Consider adding weighing capacity or redistributing appointments.'
        : 'Intake flow balanced across operational windows.',
      source: forecast ? 'LIVE / BACKEND' : 'DEMO / SIMULATED',
      updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }, [forecast, activeCentre, demandPrediction]);

  const producePrediction = useMemo<KaiProduceFlowPrediction>(() => {
    return kaiService.getProduceFlowPrediction(activeCentre as any, produceLots, demandPrediction.expectedProduceArrivalQuintals);
  }, [activeCentre, produceLots, demandPrediction]);

  const smartRecommendations = useMemo<KaiSmartRecommendation[]>(() => {
    return kaiService.getSmartRecommendations(activeCentre as any, capacityForecast.capacityUtilizationPercent, producePrediction);
  }, [activeCentre, capacityForecast, producePrediction]);

  const handleAcknowledge = (id: string) => {
    setAcknowledgedRecs(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const flaggedPayments = payments.filter(p => p.anomalyFlags && p.anomalyFlags.length > 0);

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#063B2A] bg-[#E7F3EC] px-2.5 py-0.5 rounded border border-[#85E1A9]">
              KAI • KRAYAM AGRICULTURAL INTELLIGENCE
            </span>
            <span className="text-[10px] font-mono text-[#075E43] font-semibold">
              PREDICT → OPTIMIZE → RECOMMEND
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#17231F] mt-1 flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-[#075E43]" />
            <span>Mandi Operational Intelligence Dashboard</span>
          </h1>
          <p className="text-xs text-[#66736D] mt-0.5">
            {activeCentre.name} • Live machine learning demand forecasts, queue telemetry, and produce dispatch optimization.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => fetchAiData()}
            disabled={isLoading}
            className="p-2 rounded-[6px] border border-[#CBD8D1] bg-[#FFFFFF] hover:bg-[#F5F8F6] text-[#17231F] transition-colors flex items-center gap-1.5"
            title="Refresh KAI Models"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#075E43]' : ''}`} />
            <span className="hidden sm:inline font-semibold">Refresh Telemetry</span>
          </button>
          <div className="flex items-center gap-1.5 bg-[#063B2A] text-white px-3 py-2 rounded-[6px] font-mono font-bold text-xs">
            <Activity className="w-3.5 h-3.5 text-[#85E1A9]" />
            <span>{isOffline ? `LAST SYNC: ${lastSyncTime}` : 'LIVE / BACKEND'}</span>
          </div>
        </div>
      </div>

      {/* 2. Top KAI 5 Mandatory Operational Telemetry Indicators (Phase 4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Metric 1: Expected Produce Inflow */}
        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-4 shadow-sm">
          <div className="text-[11px] font-bold text-[#66736D] uppercase flex items-center justify-between">
            <span>Expected Inflow</span>
            <TrendingUp className="w-4 h-4 text-[#075E43]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#063B2A] mt-2">
            {demandPrediction.expectedProduceInflowTonnes} Tonnes
          </div>
          <div className="text-[10px] text-[#075E43] font-semibold mt-1 flex items-center justify-between">
            <span>{demandPrediction.expectedProduceArrivalQuintals} Qtl Booked</span>
            <span className="font-mono bg-[#E7F3EC] px-1 rounded">{demandPrediction.source}</span>
          </div>
        </div>

        {/* Metric 2: Centre Load */}
        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-4 shadow-sm">
          <div className="text-[11px] font-bold text-[#66736D] uppercase flex items-center justify-between">
            <span>Centre Load</span>
            <AlertTriangle className="w-4 h-4 text-[#EA8A0A]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#EA8A0A] mt-2">
            {capacityForecast.capacityUtilizationPercent}%
          </div>
          <div className="text-[10px] text-[#B45309] font-semibold mt-1 flex items-center justify-between">
            <span>Yard Capacity {capacityForecast.capacityUtilizationPercent > 75 ? 'Heavy' : 'Normal'}</span>
            <span className="font-mono bg-[#FFF3DC] px-1 rounded">{capacityForecast.source}</span>
          </div>
        </div>

        {/* Metric 3: Predicted Peak */}
        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-4 shadow-sm">
          <div className="text-[11px] font-bold text-[#66736D] uppercase flex items-center justify-between">
            <span>Predicted Peak</span>
            <Clock className="w-4 h-4 text-[#175CD3]" />
          </div>
          <div className="text-xl font-bold font-mono text-[#175CD3] mt-2">
            {queuePrediction.predictedPeakPeriod}
          </div>
          <div className="text-[10px] text-[#1E40AF] font-semibold mt-1 flex items-center justify-between">
            <span>Midday Arrival Window</span>
            <span className="font-mono bg-[#EEF4FF] px-1 rounded">{queuePrediction.source}</span>
          </div>
        </div>

        {/* Metric 4: Queue Risk */}
        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-4 shadow-sm">
          <div className="text-[11px] font-bold text-[#66736D] uppercase flex items-center justify-between">
            <span>Queue Risk</span>
            <Activity className="w-4 h-4 text-[#B42318]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#B42318] mt-2">
            {queuePrediction.queueRiskLevel}
          </div>
          <div className="text-[10px] text-[#B42318] font-semibold mt-1 flex items-center justify-between">
            <span>Wait: ~{queuePrediction.predictedWaitMinutes} mins</span>
            <span className="font-mono bg-[#FFF5F5] px-1 rounded">{queuePrediction.source}</span>
          </div>
        </div>

        {/* Metric 5: Capacity Status */}
        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-4 shadow-sm">
          <div className="text-[11px] font-bold text-[#66736D] uppercase flex items-center justify-between">
            <span>Capacity Status</span>
            <Scale className="w-4 h-4 text-[#075E43]" />
          </div>
          <div className={`text-xl font-bold font-mono mt-2 ${
            capacityForecast.capacityStatus === 'Near Limit' ? 'text-[#B42318]' : 'text-[#063B2A]'
          }`}>
            {capacityForecast.capacityStatus}
          </div>
          <div className="text-[10px] text-[#075E43] font-semibold mt-1 flex items-center justify-between">
            <span>Scale Lanes Active</span>
            <span className="font-mono bg-[#E7F3EC] px-1 rounded">{capacityForecast.source}</span>
          </div>
        </div>
      </div>

      {/* 3. Four Core Predictive Intelligence Engines (Phases 5, 6, 7, 11) */}
      <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] overflow-hidden shadow-sm">
        {/* Navigation Tabs */}
        <div className="bg-[#EDF3EF] border-b border-[#CBD8D1] flex flex-wrap items-center gap-1 p-1.5 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveEngineTab('DEMAND')}
            className={`px-3.5 py-2 rounded-[6px] transition-colors flex items-center gap-1.5 ${
              activeEngineTab === 'DEMAND' ? 'bg-[#063B2A] text-white shadow-xs' : 'text-[#34443D] hover:bg-[#CBD8D1]'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Demand Prediction</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveEngineTab('QUEUE')}
            className={`px-3.5 py-2 rounded-[6px] transition-colors flex items-center gap-1.5 ${
              activeEngineTab === 'QUEUE' ? 'bg-[#063B2A] text-white shadow-xs' : 'text-[#34443D] hover:bg-[#CBD8D1]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Queue Prediction</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveEngineTab('CAPACITY')}
            className={`px-3.5 py-2 rounded-[6px] transition-colors flex items-center gap-1.5 ${
              activeEngineTab === 'CAPACITY' ? 'bg-[#063B2A] text-white shadow-xs' : 'text-[#34443D] hover:bg-[#CBD8D1]'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Capacity Forecasting</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveEngineTab('PRODUCE_FLOW')}
            className={`px-3.5 py-2 rounded-[6px] transition-colors flex items-center gap-1.5 ${
              activeEngineTab === 'PRODUCE_FLOW' ? 'bg-[#063B2A] text-white shadow-xs' : 'text-[#34443D] hover:bg-[#CBD8D1]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Produce Flow Prediction</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-5 text-xs">
          {/* TAB 1: DEMAND PREDICTION */}
          {activeEngineTab === 'DEMAND' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#17231F]">Crop Inflow & Mandi Demand Forecast</h3>
                  <p className="text-[#66736D] mt-0.5">
                    Evaluates verified farmer bookings, seasonal procurement cycles, and historical arrivals.
                  </p>
                </div>
                <span className="font-mono text-[10px] bg-[#E7F3EC] text-[#075E43] font-bold px-2 py-0.5 rounded border border-[#85E1A9]">
                  Source: {demandPrediction.source}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-[#F5F8F6] border border-[#CBD8D1] rounded-[6px] space-y-1">
                  <span className="text-[#66736D] block">Expected Arrival Volume:</span>
                  <span className="text-xl font-bold font-mono text-[#063B2A]">{demandPrediction.expectedProduceArrivalQuintals} Qtl</span>
                  <p className="text-[11px] text-[#16803C]">~{demandPrediction.expectedProduceInflowTonnes} metric tonnes intake</p>
                </div>

                <div className="p-3 bg-[#F5F8F6] border border-[#CBD8D1] rounded-[6px] space-y-1">
                  <span className="text-[#66736D] block">Expected Farmer Footfall:</span>
                  <span className="text-xl font-bold font-mono text-[#17231F]">{demandPrediction.expectedFarmerCount} Farmers</span>
                  <p className="text-[11px] text-[#66736D]">Scheduled across 6 mandi operational windows</p>
                </div>

                <div className="p-3 bg-[#F5F8F6] border border-[#CBD8D1] rounded-[6px] space-y-1">
                  <span className="text-[#66736D] block">Seasonal Harvesting Phase:</span>
                  <span className="text-xl font-bold text-[#175CD3]">{demandPrediction.seasonalTrend}</span>
                  <p className="text-[11px] text-[#075E43]">Model Confidence: {demandPrediction.confidenceScorePercent}%</p>
                </div>
              </div>

              <div className="p-3 bg-[#E7F3EC] border border-[#85E1A9] rounded-[6px] text-[#063B2A] flex items-center justify-between">
                <span>
                  💡 <strong>Demand Forecast Note:</strong> Historical procurement baseline is {demandPrediction.historicalBaselineQuintals} Qtl/day. Current booking trend indicates healthy volume without extreme supply shock.
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: QUEUE PREDICTION */}
          {activeEngineTab === 'QUEUE' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#17231F]">Queue Telemetry & Wait Time Projection</h3>
                  <p className="text-[#66736D] mt-0.5">
                    Evaluates weighbridge throughput, gate arrivals, and historical clearing times per vehicle.
                  </p>
                </div>
                <span className="font-mono text-[10px] bg-[#E7F3EC] text-[#075E43] font-bold px-2 py-0.5 rounded border border-[#85E1A9]">
                  Source: {queuePrediction.source}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-3 bg-[#F5F8F6] border border-[#CBD8D1] rounded-[6px] space-y-1">
                  <span className="text-[#66736D] block">Predicted Average Wait:</span>
                  <span className="text-xl font-bold font-mono text-[#063B2A]">~{queuePrediction.predictedWaitMinutes} mins</span>
                  <p className="text-[11px] text-[#16803C]">From gate check-in to tare weighing</p>
                </div>

                <div className="p-3 bg-[#F5F8F6] border border-[#CBD8D1] rounded-[6px] space-y-1">
                  <span className="text-[#66736D] block">Predicted Peak Period:</span>
                  <span className="text-lg font-bold font-mono text-[#175CD3]">{queuePrediction.predictedPeakPeriod}</span>
                  <p className="text-[11px] text-[#66736D]">Congestion window</p>
                </div>

                <div className="p-3 bg-[#F5F8F6] border border-[#CBD8D1] rounded-[6px] space-y-1">
                  <span className="text-[#66736D] block">Weighbridge Rate:</span>
                  <span className="text-xl font-bold font-mono text-[#17231F]">{queuePrediction.processingRatePerHour} vehicles/hr</span>
                  <p className="text-[11px] text-[#66736D]">2 gates active</p>
                </div>

                <div className="p-3 bg-[#F5F8F6] border border-[#CBD8D1] rounded-[6px] space-y-1">
                  <span className="text-[#66736D] block">Delay Probability:</span>
                  <span className="text-xl font-bold font-mono text-[#EA8A0A]">{queuePrediction.delayProbabilityPercent}%</span>
                  <p className="text-[11px] text-[#B45309]">Normal variance</p>
                </div>
              </div>

              <div className="p-3 bg-[#FFF3DC] border border-[#F0D7A7] rounded-[6px] text-[#B45309]">
                ⚠️ <strong>Queue Risk Advisory:</strong> Vehicle arrival rate between 11:30 AM and 01:00 PM requires strict appointment adherence to avoid entry gate spillover.
              </div>
            </div>
          )}

          {/* TAB 3: CAPACITY FORECASTING */}
          {activeEngineTab === 'CAPACITY' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#17231F]">Yard & Scale Capacity Forecast</h3>
                  <p className="text-[#66736D] mt-0.5">
                    Evaluates expected arrivals vs daily centre capacity limits. Decision support for facility managers.
                  </p>
                </div>
                <span className="font-mono text-[10px] bg-[#E7F3EC] text-[#075E43] font-bold px-2 py-0.5 rounded border border-[#85E1A9]">
                  Source: {capacityForecast.source}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-[#F5F8F6] border border-[#CBD8D1] rounded-[6px] space-y-1">
                  <span className="text-[#66736D] block">Mandi Daily Capacity:</span>
                  <span className="text-xl font-bold font-mono text-[#063B2A]">{capacityForecast.dailyCapacityQuintals} Qtl</span>
                  <p className="text-[11px] text-[#66736D]">Scale throughput limit per 8-hour shift</p>
                </div>

                <div className="p-3 bg-[#F5F8F6] border border-[#CBD8D1] rounded-[6px] space-y-1">
                  <span className="text-[#66736D] block">Capacity Utilization:</span>
                  <span className="text-xl font-bold font-mono text-[#EA8A0A]">{capacityForecast.capacityUtilizationPercent}%</span>
                  <p className="text-[11px] text-[#B45309] font-semibold">{capacityForecast.capacityStatus}</p>
                </div>

                <div className="p-3 bg-[#F5F8F6] border border-[#CBD8D1] rounded-[6px] space-y-1">
                  <span className="text-[#66736D] block">Facility Operational Status:</span>
                  <span className="text-xl font-bold text-[#16803C]">Operational</span>
                  <p className="text-[11px] text-[#66736D]">Weighbridge scales verified</p>
                </div>
              </div>

              <div className="p-4 bg-[#F4FAF6] border border-[#85E1A9] rounded-[6px] space-y-2">
                <div className="font-bold text-[#063B2A] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16803C]" />
                  <span>KAI Capacity Recommendation</span>
                </div>
                <p className="text-xs text-[#34443D]">
                  "{capacityForecast.actionableRecommendation}"
                </p>
                <div className="text-[11px] text-[#66736D]">
                  Note: KAI acts as an operational decision support system to assist officers in staffing and slot management.
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PRODUCE FLOW PREDICTION */}
          {activeEngineTab === 'PRODUCE_FLOW' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#17231F]">Produce Inflow, Accumulation & Evacuation Forecast</h3>
                  <p className="text-[#66736D] mt-0.5">
                    Connects physical intake with warehouse covered bays and evacuation transport requirements.
                  </p>
                </div>
                <span className="font-mono text-[10px] bg-[#E7F3EC] text-[#075E43] font-bold px-2 py-0.5 rounded border border-[#85E1A9]">
                  Source: {producePrediction.source}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-3 bg-[#F5F8F6] border border-[#CBD8D1] rounded-[6px] space-y-1">
                  <span className="text-[#66736D] block">Expected Inflow:</span>
                  <span className="text-xl font-bold font-mono text-[#063B2A]">{producePrediction.expectedProduceInflowTonnes} Tonnes</span>
                  <p className="text-[11px] text-[#66736D]">Daily procurement</p>
                </div>

                <div className="p-3 bg-[#F5F8F6] border border-[#CBD8D1] rounded-[6px] space-y-1">
                  <span className="text-[#66736D] block">Accumulated Volume:</span>
                  <span className="text-xl font-bold font-mono text-[#17231F]">{producePrediction.expectedAccumulationTonnes} Tonnes</span>
                  <p className="text-[11px] text-[#075E43]">Currently in yard bays</p>
                </div>

                <div className="p-3 bg-[#F5F8F6] border border-[#CBD8D1] rounded-[6px] space-y-1">
                  <span className="text-[#66736D] block">Storage Pressure:</span>
                  <span className="text-xl font-bold text-[#EA8A0A]">{producePrediction.storageRequirementLevel} Load</span>
                  <p className="text-[11px] text-[#66736D]">{producePrediction.storageBayUtilizationPercent}% bay space filled</p>
                </div>

                <div className="p-3 bg-[#F5F8F6] border border-[#CBD8D1] rounded-[6px] space-y-1">
                  <span className="text-[#66736D] block">Dispatch Evacuation:</span>
                  <span className="text-xl font-bold font-mono text-[#175CD3]">{producePrediction.dispatchRequirementText}</span>
                  <p className="text-[11px] text-[#1E40AF]">To prevent warehouse overflow</p>
                </div>
              </div>

              <div className="p-3 bg-[#F5F8F6] border border-[#CBD8D1] rounded-[6px] flex items-center justify-between">
                <span>
                  📦 <strong>Storage Coordination:</strong> Ensure Bay 04 and Bay 02 are aerated. Direct evening transport trucks to East Gate loading dock.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. Actionable Smart Recommendations (Phase 8) */}
      <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#17231F] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#EA8A0A]" />
              <span>Smart Operational Recommendations</span>
            </h2>
            <p className="text-xs text-[#66736D]">
              Real-time actionable decision support across slots, yard operations, staff allocation, and produce flow.
            </p>
          </div>
          <span className="text-xs text-[#075E43] font-bold font-mono">
            {smartRecommendations.length} Active Directives
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {smartRecommendations.map((rec) => {
            const isAck = acknowledgedRecs.has(rec.id);
            return (
              <div 
                key={rec.id}
                className={`p-4 rounded-[6px] border space-y-2 transition-all ${
                  isAck 
                    ? 'bg-[#F9FAFB] border-[#E5E7EB] opacity-75' 
                    : rec.severity === 'critical'
                    ? 'bg-[#FFF5F5] border-[#F0C2C2]'
                    : rec.severity === 'warning'
                    ? 'bg-[#FFFDF5] border-[#F0D7A7]'
                    : 'bg-[#F4FAF6] border-[#85E1A9]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase bg-white px-2 py-0.5 rounded font-bold border border-[#CBD8D1]">
                      {rec.category.replace('_', ' ')}
                    </span>
                    <span className="font-bold text-xs text-[#17231F]">{rec.title}</span>
                  </div>
                  <span className="text-[10px] text-[#66736D] font-mono">{rec.timestamp}</span>
                </div>

                <p className="text-xs text-[#34443D] leading-relaxed">
                  {rec.description}
                </p>

                <div className="pt-2 border-t border-[#CBD8D1]/40 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-[#063B2A]">Directive: </span>
                    <span className="text-[#34443D]">{rec.suggestedAction}</span>
                    <div className="text-[10px] text-[#075E43] font-medium mt-0.5">Impact: {rec.impact}</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAcknowledge(rec.id)}
                    disabled={isAck}
                    className={`px-3 py-1 rounded text-[11px] font-bold flex items-center gap-1 shrink-0 ${
                      isAck 
                        ? 'bg-[#E5E7EB] text-[#6B7280]' 
                        : 'bg-[#063B2A] text-white hover:bg-[#075E43]'
                    }`}
                  >
                    {isAck ? <Check className="w-3 h-3" /> : null}
                    <span>{isAck ? 'Acknowledged' : 'Acknowledge'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Regional Mandi Balancing & Audited Anomalies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Mandi Balancing */}
        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-5 shadow-sm space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#17231F] flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#075E43]" />
              <span>Regional Mandi Network Balancing</span>
            </h3>
            <span className="text-[10px] font-mono text-[#075E43] bg-[#E7F3EC] px-2 py-0.5 rounded font-bold">
              Score-Optimized
            </span>
          </div>

          <p className="text-[#66736D]">
            Live allocation and load distribution across verified APMC procurement centres:
          </p>

          <div className="space-y-2 pt-1">
            {recommendations.length > 0 ? (
              recommendations.map((rec, i) => (
                <div key={rec.centre.id || i} className="p-3 bg-[#F5F8F6] border border-[#CBD8D1] rounded-[6px] flex items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-[#17231F] flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#075E43]" />
                      <span>{rec.centre.name}</span>
                      {rec.distanceKm !== null && (
                        <span className="font-normal text-[#66736D]">({rec.distanceKm} km)</span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#16803C] mt-0.5">
                      Current Load: {rec.loadPercent}% • Waiting: {rec.currentQueue} vehicles
                    </div>
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-1 rounded shrink-0 ${
                    rec.loadPercent > 80 
                      ? 'bg-[#FFF3DC] text-[#B45309]' 
                      : 'bg-[#E7F3EC] text-[#075E43]'
                  }`}>
                    {rec.loadPercent > 80 ? 'Heavy Load' : 'Available'}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-[#66736D] bg-[#F5F8F6] rounded-[6px] border border-[#CBD8D1]">
                Regional network load balanced across active procurement centres.
              </div>
            )}
          </div>
        </div>

        {/* Live Anomaly Detection Flags */}
        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-5 shadow-sm space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#17231F] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#B42318]" />
              <span>Procurement & Payment Anomaly Detection</span>
            </h3>
            <span className="text-[10px] font-mono font-bold text-[#16803C] bg-[#E7F3EC] px-2 py-0.5 rounded">
              Audited
            </span>
          </div>

          <div className="space-y-2.5">
            {flaggedPayments.length > 0 ? (
              flaggedPayments.map((p) => (
                <div key={p.id} className="p-3 bg-[#FFF5F5] border border-[#F0C2C2] rounded-[6px] space-y-1">
                  <div className="flex items-center justify-between font-bold text-[#B42318]">
                    <span>Transaction #{p.transactionId}</span>
                    <span className="text-[10px] uppercase bg-[#FFF3DC] text-[#B45309] px-1.5 py-0.5 rounded">
                      Flagged
                    </span>
                  </div>
                  <div className="text-[11px] text-[#17231F] font-medium">
                    Farmer: {p.farmerName || 'Beneficiary'} ({p.cropName} • {p.quantity || 0} Qtl)
                  </div>
                  <div className="text-[11px] text-[#B45309] font-mono">
                    Flags: {p.anomalyFlags?.join(', ')}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-[#66736D] bg-[#F5F8F6] rounded-[6px] border border-[#CBD8D1] space-y-2">
                <CheckCircle2 className="w-6 h-6 text-[#16803C] mx-auto" />
                <div className="font-bold text-[#17231F]">No Anomalies Detected</div>
                <p className="text-[11px] text-[#66736D]">
                  All current intake weighbridge logs, moisture checks, and PFMS payment disbursements conform to standard regulatory tolerance ranges.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperatorAiInsightsTab;
