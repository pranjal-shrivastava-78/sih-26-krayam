import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search } from 'lucide-react';

export const HistoryView: React.FC = () => {
  const { procurements, crops } = useApp();

  const [selectedCrop, setSelectedCrop] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Transform procurements into Section 19 format
  const rows = [
    {
      id: 'TXN-01',
      date: '08 Sep 2026',
      crop: 'Wheat (गेहूं)',
      cropId: 'crop-wheat',
      quantity: '65 Qtl',
      centre: 'Samrala Main Mandi',
      amount: '₹1,47,875',
      status: 'Processing',
      statusType: 'warning'
    },
    {
      id: 'TXN-02',
      date: '14 Aug 2026',
      crop: 'Mustard (सरसों)',
      cropId: 'crop-mustard',
      quantity: '29.4 Qtl',
      centre: 'Machhiwara Sub-Yard',
      amount: '₹1,66,110',
      status: 'Paid',
      statusType: 'success'
    },
    {
      id: 'TXN-03',
      date: '20 Apr 2026',
      crop: 'Wheat (गेहूं)',
      cropId: 'crop-wheat',
      quantity: '108.5 Qtl',
      centre: 'Samrala Main Mandi',
      amount: '₹2,46,837',
      status: 'Paid',
      statusType: 'success'
    },
    {
      id: 'TXN-04',
      date: '18 Apr 2026',
      crop: 'Wheat (गेहूं)',
      cropId: 'crop-wheat',
      quantity: '42 Qtl',
      centre: 'Samrala Main Mandi',
      amount: '₹95,550',
      status: 'Paid',
      statusType: 'success'
    },
    {
      id: 'TXN-05',
      date: '22 Jul 2026',
      crop: 'Gram (चना)',
      cropId: 'crop-gram',
      quantity: '40 Qtl',
      centre: 'Ludhiana Central Mandi',
      amount: '₹2,17,600',
      status: 'Cancelled',
      statusType: 'error'
    }
  ];

  const filteredRows = rows.filter(r => {
    const matchesCrop = selectedCrop === 'ALL' || r.cropId === selectedCrop;
    const matchesStatus = selectedStatus === 'ALL' || r.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesSearch = 
      r.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.centre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.amount.includes(searchQuery);

    return matchesCrop && matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-[1440px] mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Page Header */}
      <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-5 sm:p-6 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#17231F]">
            Transaction History / गतिविधि एवं लेन-देन
          </h1>
          <p className="text-xs sm:text-sm text-[#66736D] mt-0.5">
            Permanent ledger of certified grain procurements, weighbridge slips, and Treasury DBT payments
          </p>
        </div>
      </div>

      {/* Section 19: Filters & Search Strip */}
      <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          {/* Crop Filter */}
          <div className="flex-1 min-w-[160px]">
            <label className="block text-[11px] font-bold text-[#66736D] uppercase mb-1">
              Crop / फसल
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full h-10 px-3 rounded-[6px] border border-[#CBD8D1] bg-[#FFFFFF] text-xs text-[#17231F] focus:outline-none focus:border-[#16845F]"
            >
              <option value="ALL">All Crops (सभी फसलें)</option>
              {crops.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex-1 min-w-[140px]">
            <label className="block text-[11px] font-bold text-[#66736D] uppercase mb-1">
              Status / स्थिति
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full h-10 px-3 rounded-[6px] border border-[#CBD8D1] bg-[#FFFFFF] text-xs text-[#17231F] focus:outline-none focus:border-[#16845F]"
            >
              <option value="ALL">All Status (सभी स्थितियां)</option>
              <option value="Paid">Paid / जमा</option>
              <option value="Processing">Processing / प्रक्रियाधीन</option>
              <option value="Cancelled">Cancelled / रद्द</option>
            </select>
          </div>

          {/* Search Input */}
          <div className="flex-[2] min-w-[220px]">
            <label className="block text-[11px] font-bold text-[#66736D] uppercase mb-1">
              Search / खोजें
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-[#66736D] absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search by mandi, crop, date, or amount..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-3 rounded-[6px] border border-[#CBD8D1] bg-[#FFFFFF] text-xs text-[#17231F] focus:outline-none focus:border-[#16845F]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 19: Searchable Transaction Table */}
      <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="gov-table">
            <thead>
              <tr>
                <th className="w-1/6">Date / तारीख</th>
                <th className="w-1/6">Crop / फसल</th>
                <th className="w-1/6">Quantity / मात्रा</th>
                <th className="w-2/6">Centre / क्रय केंद्र</th>
                <th className="w-1/6">Amount / राशि</th>
                <th className="w-1/6">Status / स्थिति</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-sm text-[#66736D]">
                    No transactions found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredRows.map((row) => {
                  const badgeStyle = 
                    row.statusType === 'success' 
                      ? 'bg-[#E7F3EC] text-[#16803C] border-[#B7DCC5]' 
                      : row.statusType === 'warning'
                      ? 'bg-[#FFF9ED] text-[#B45309] border-[#F0D7A7]'
                      : 'bg-[#FFF5F5] text-[#B42318] border-[#F0C2C2]';

                  return (
                    <tr key={row.id}>
                      <td className="font-medium text-xs text-[#17231F]">
                        {row.date}
                      </td>
                      <td className="text-xs font-semibold text-[#17231F]">
                        {row.crop}
                      </td>
                      <td className="font-mono text-xs font-bold text-[#075E43]">
                        {row.quantity}
                      </td>
                      <td className="text-xs text-[#34443D]">
                        {row.centre}
                      </td>
                      <td className="font-mono font-bold text-xs text-[#063B2A]">
                        {row.amount}
                      </td>
                      <td>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-[10px] font-bold border uppercase tracking-wider ${badgeStyle}`}>
                          ● {row.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="bg-[#EDF3EF] px-5 py-3 border-t border-[#CBD8D1] flex flex-col sm:flex-row items-center justify-between text-xs text-[#66736D] gap-2">
          <span>
            Showing {filteredRows.length} of {rows.length} verified transactions
          </span>
          <span className="font-mono text-[11px]">
            Data synced with State Mandi Board & Treasury
          </span>
        </div>
      </div>

    </div>
  );
};
