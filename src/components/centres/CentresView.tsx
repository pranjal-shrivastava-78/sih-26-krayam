import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProcurementCentre } from '../../types';
import { LeafletMap } from '../common/LeafletMap';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Phone, 
  Search, 
  CalendarPlus, 
  CheckCircle2, 
  Users
} from 'lucide-react';

export const CentresView: React.FC = () => {
  const { 
    centres, 
    crops, 
    farmer, 
    selectedCentre, 
    setSelectedCentre, 
    setActiveView 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [cropFilter, setCropFilter] = useState('ALL');

  const filteredCentres = centres.filter(centre => {
    const matchesSearch = 
      centre.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      centre.location.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
      centre.location.district.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCrop = 
      cropFilter === 'ALL' || centre.acceptedCropIds.includes(cropFilter);

    return matchesSearch && matchesCrop;
  });

  const handleBookAtCentre = (centre: ProcurementCentre) => {
    setSelectedCentre(centre);
    setActiveView('booking');
  };

  return (
    <div className="max-w-[1440px] mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header & Search / Filters Strip */}
      <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#17231F]">
              Procurement Centres / अधिकृत क्रय केंद्र
            </h1>
            <p className="text-xs sm:text-sm text-[#66736D] mt-0.5">
              Verified District Mandis, Agro Hubs, and Warehouse Terminals in Ludhiana District
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-[#66736D] absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search mandi or tehsil..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 pl-9 pr-3 rounded-[6px] border border-[#CBD8D1] bg-[#FFFFFF] text-xs text-[#17231F] w-full focus:outline-none focus:border-[#16845F]"
              />
            </div>

            {/* Crop Filter */}
            <select
              value={cropFilter}
              onChange={(e) => setCropFilter(e.target.value)}
              className="h-10 px-3 rounded-[6px] border border-[#CBD8D1] bg-[#FFFFFF] text-xs text-[#17231F] focus:outline-none focus:border-[#16845F]"
            >
              <option value="ALL">All Crops (सभी फसलें)</option>
              {crops.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Section 17: Side-by-Side Map + List Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Centre List (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-[#17231F] uppercase tracking-wider">
              Centre List ({filteredCentres.length} Operational Mandis)
            </span>
            <span className="text-xs text-[#075E43] font-semibold">
              Rampur Kalan Reference
            </span>
          </div>

          {filteredCentres.length === 0 ? (
            <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-8 text-center">
              <p className="text-sm text-[#66736D]">No procurement centres matched your filter criteria.</p>
            </div>
          ) : (
            filteredCentres.map((centre) => {
              const isSelected = selectedCentre?.id === centre.id;
              const loadBadge = centre.currentQueue.loadLevel === 'High'
                ? 'bg-[#FFF5F5] text-[#B42318] border-[#F0C2C2]'
                : centre.currentQueue.loadLevel === 'Moderate'
                ? 'bg-[#FFF9ED] text-[#B45309] border-[#F0D7A7]'
                : 'bg-[#E7F3EC] text-[#16803C] border-[#B7DCC5]';

              return (
                <div
                  key={centre.id}
                  onClick={() => setSelectedCentre(centre)}
                  className={`bg-[#FFFFFF] border rounded-[8px] p-4 sm:p-5 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#075E43] ring-1 ring-[#075E43] bg-[#F4FAF6]'
                      : 'border-[#CBD8D1] hover:border-[#075E43]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-3 border-b border-[#EDF3EF]">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-bold text-[#17231F] leading-tight">
                          {centre.name}
                        </h2>
                      </div>
                      <div className="text-xs text-[#66736D] mt-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#075E43] flex-shrink-0" />
                        <span>{centre.location.address}</span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 flex-shrink-0">
                      <span className="text-xs font-bold text-[#063B2A] bg-[#E7F3EC] px-2 py-0.5 rounded-[4px] border border-[#CBD8D1]">
                        {centre.distanceKm} km away
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-[4px] border ${loadBadge}`}>
                        ● Open ({centre.currentQueue.loadLevel} Traffic)
                      </span>
                    </div>
                  </div>

                  {/* Centre details row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3 text-xs text-[#34443D]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#66736D] flex-shrink-0" />
                      <span>{centre.operatingHours.opens} – {centre.operatingHours.closes}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#66736D] flex-shrink-0" />
                      <span>Wait: ~{centre.currentQueue.estimatedWaitMins}m</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#16803C] font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{centre.availableSlots || 24} slots available</span>
                    </div>
                  </div>

                  {/* Crops Accepted & Action */}
                  <div className="mt-3 pt-3 border-t border-[#EDF3EF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] text-[#66736D] font-semibold">Crops:</span>
                      {centre.acceptedCropIds.map(cropId => {
                        const crop = crops.find(c => c.id === cropId);
                        return (
                          <span key={cropId} className="text-[10px] bg-[#EDF3EF] text-[#17231F] px-1.5 py-0.5 rounded border border-[#CBD8D1]">
                            {crop ? crop.name.split(' ')[0] : cropId}
                          </span>
                        );
                      })}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookAtCentre(centre);
                      }}
                      className="inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-[6px] bg-[#0B6B4F] hover:bg-[#075E43] text-[#FFFFFF] text-xs font-semibold transition-colors flex-shrink-0"
                    >
                      <CalendarPlus className="w-3.5 h-3.5" />
                      <span>Book Slot Here</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Interactive Map (5 cols) */}
        <div className="lg:col-span-5 sticky top-28 bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-3 shadow-sm">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#CBD8D1] px-2">
            <span className="text-xs uppercase font-bold tracking-wider text-[#17231F]">
              Geographic Grid Map
            </span>
            <span className="text-[11px] text-[#075E43] font-semibold">
              Live Mandi Network
            </span>
          </div>

          <div className="h-[480px] w-full rounded-[6px] overflow-hidden border border-[#CBD8D1]">
            <LeafletMap
              farmerCoordinates={farmer?.location.coordinates}
              centres={filteredCentres}
              selectedCentreId={selectedCentre?.id}
              onSelectCentre={(c) => setSelectedCentre(c)}
            />
          </div>

          <div className="p-2 text-[11px] text-[#66736D] flex items-center justify-between">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#063B2A] inline-block" /> Your Village
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16803C] inline-block" /> Mandi Terminal
            </span>
            <span className="text-[#075E43] font-bold">Ludhiana Sub-Division</span>
          </div>
        </div>

      </div>
    </div>
  );
};
