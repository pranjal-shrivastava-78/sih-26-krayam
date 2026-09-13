import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  MapPin, 
  ShieldCheck, 
  Copy, 
  Check, 
  Edit3, 
  Save,
  Building2,
  CreditCard,
  Phone,
  CheckCircle2
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { farmer, updateProfile } = useApp();
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: farmer?.fullName || 'Sardar Gurpreet Singh',
    mobileNumber: farmer?.mobileNumber || '+91 98765 43210',
    village: farmer?.location.village || 'Rampur Kalan',
    tehsil: farmer?.location.tehsil || 'Samrala',
    district: farmer?.location.district || 'Ludhiana',
    state: farmer?.location.state || 'Punjab',
    pincode: farmer?.location.pincode || '141114',
    landHoldingAcres: farmer?.landHoldingAcres || 12.5,
  });

  const handleCopyFarmerId = () => {
    if (!farmer) return;
    navigator.clipboard.writeText(farmer.farmerId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName: formData.fullName,
      mobileNumber: formData.mobileNumber,
      landHoldingAcres: Number(formData.landHoldingAcres),
      location: {
        ...(farmer?.location || { state: 'Punjab', coordinates: { lat: 30.8358, lng: 76.1917 } }),
        village: formData.village,
        tehsil: formData.tehsil,
        district: formData.district,
        state: formData.state,
        pincode: formData.pincode
      }
    });
    setIsEditing(false);
  };

  if (!farmer) return null;

  return (
    <div className="max-w-[1440px] mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Page Header */}
      <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#17231F]">
            Farmer Identity & Landholding / किसान पहचान एवं भूमि विवरण
          </h1>
          <p className="text-xs sm:text-sm text-[#66736D] mt-0.5">
            Ministry of Agriculture & Farmers Welfare — Official Farmer Registry
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="h-10 px-4 rounded-[6px] bg-[#FFFFFF] border border-[#CBD8D1] hover:bg-[#F3F9F5] text-xs font-semibold text-[#17231F] flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <Edit3 className="w-3.5 h-3.5 text-[#075E43]" />
          <span>{isEditing ? 'Cancel Edit' : 'Edit Information'}</span>
        </button>
      </div>

      {/* Section 7: Farmer Official Identity Block */}
      <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#EDF3EF]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#063B2A] text-[#FFFFFF] border-2 border-[#CBD8D1] flex items-center justify-center text-xl font-bold flex-shrink-0">
              <User className="w-8 h-8 text-[#E7F3EC]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-[4px] bg-[#E7F3EC] text-[#16803C] border border-[#B7DCC5] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  VERIFIED FARMER
                </span>
                <span className="text-xs text-[#66736D]">Registered: {farmer.registeredDate}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17231F] mt-1">
                {farmer.fullName}
              </h2>
              <div className="text-xs text-[#34443D] mt-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#075E43]" />
                <span>{farmer.location.village}, Tehsil {farmer.location.tehsil}, District {farmer.location.district}, {farmer.location.state}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#F5F8F6] border border-[#CBD8D1] rounded-[6px] p-3 sm:text-right">
            <div className="text-[11px] font-bold text-[#66736D] uppercase">Official Farmer ID</div>
            <div className="text-lg font-mono font-bold text-[#063B2A] mt-0.5">
              {farmer.farmerId}
            </div>
            <button
              onClick={handleCopyFarmerId}
              className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-[#075E43] hover:underline"
            >
              {copied ? <Check className="w-3 h-3 text-[#16803C]" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy ID'}</span>
            </button>
          </div>
        </div>

        {/* Verification Status Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <div className="bg-[#F4FAF6] border border-[#B7DCC5] rounded-[6px] p-3.5">
            <div className="text-[11px] font-bold uppercase text-[#063B2A]">Aadhaar e-KYC</div>
            <div className="text-sm font-bold text-[#16803C] mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              UIDAI Verified
            </div>
            <div className="text-[11px] text-[#66736D] mt-0.5">Linked to Mobile {farmer.mobileNumber}</div>
          </div>

          <div className="bg-[#F4FAF6] border border-[#B7DCC5] rounded-[6px] p-3.5">
            <div className="text-[11px] font-bold uppercase text-[#063B2A]">Land Records (Jamabandi)</div>
            <div className="text-sm font-bold text-[#16803C] mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Verified ({farmer.landHoldingAcres || 12.5} Acres)
            </div>
            <div className="text-[11px] text-[#66736D] mt-0.5">Revenue Dept. Record #482/9</div>
          </div>

          <div className="bg-[#F4FAF6] border border-[#B7DCC5] rounded-[6px] p-3.5">
            <div className="text-[11px] font-bold uppercase text-[#063B2A]">DBT Bank Seeded</div>
            <div className="text-sm font-bold text-[#16803C] mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              PFMS Active
            </div>
            <div className="text-[11px] text-[#66736D] mt-0.5 font-mono">{farmer.bankAccountMasked}</div>
          </div>
        </div>
      </div>

      {/* Profile Edit or View Form */}
      <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-6 shadow-sm">
        <h2 className="text-base font-bold text-[#17231F] mb-4 pb-2 border-b border-[#EDF3EF]">
          {isEditing ? 'Edit Official Farmer Profile' : 'Verified Profile Information'}
        </h2>

        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-4 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#17231F] uppercase mb-1">
                  Full Name / पूरा नाम
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full h-11 px-3 rounded-[6px] border border-[#CBD8D1] bg-[#FFFFFF] text-sm text-[#17231F] focus:outline-none focus:border-[#16845F]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17231F] uppercase mb-1">
                  Mobile Number / मोबाइल नंबर
                </label>
                <input
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                  className="w-full h-11 px-3 rounded-[6px] border border-[#CBD8D1] bg-[#FFFFFF] text-sm text-[#17231F] focus:outline-none focus:border-[#16845F]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17231F] uppercase mb-1">
                  Village / गाँव
                </label>
                <input
                  type="text"
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  className="w-full h-11 px-3 rounded-[6px] border border-[#CBD8D1] bg-[#FFFFFF] text-sm text-[#17231F] focus:outline-none focus:border-[#16845F]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17231F] uppercase mb-1">
                  Tehsil / तहसील
                </label>
                <input
                  type="text"
                  value={formData.tehsil}
                  onChange={(e) => setFormData({ ...formData, tehsil: e.target.value })}
                  className="w-full h-11 px-3 rounded-[6px] border border-[#CBD8D1] bg-[#FFFFFF] text-sm text-[#17231F] focus:outline-none focus:border-[#16845F]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17231F] uppercase mb-1">
                  District / जिला
                </label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full h-11 px-3 rounded-[6px] border border-[#CBD8D1] bg-[#FFFFFF] text-sm text-[#17231F] focus:outline-none focus:border-[#16845F]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17231F] uppercase mb-1">
                  Landholding (Acres) / भूमि
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.landHoldingAcres}
                  onChange={(e) => setFormData({ ...formData, landHoldingAcres: Number(e.target.value) })}
                  className="w-full h-11 px-3 rounded-[6px] border border-[#CBD8D1] bg-[#FFFFFF] text-sm text-[#17231F] focus:outline-none focus:border-[#16845F]"
                  required
                />
              </div>
            </div>

            <div className="pt-3 flex items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-[6px] bg-[#0B6B4F] hover:bg-[#075E43] text-[#FFFFFF] font-semibold text-xs transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile Changes</span>
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="h-11 px-4 rounded-[6px] border border-[#CBD8D1] text-xs font-semibold text-[#17231F] hover:bg-[#F3F9F5]"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="border border-[#CBD8D1] rounded-[6px] overflow-hidden max-w-2xl">
            <table className="gov-table">
              <tbody>
                <tr>
                  <td className="w-2/5 bg-[#EDF3EF] font-semibold text-xs text-[#17231F]">Farmer Full Name</td>
                  <td className="font-bold text-xs text-[#17231F]">{farmer.fullName}</td>
                </tr>
                <tr>
                  <td className="bg-[#EDF3EF] font-semibold text-xs text-[#17231F]">Mobile Number</td>
                  <td className="font-mono text-xs text-[#17231F]">{farmer.mobileNumber}</td>
                </tr>
                <tr>
                  <td className="bg-[#EDF3EF] font-semibold text-xs text-[#17231F]">Village & Tehsil</td>
                  <td className="text-xs text-[#17231F]">{farmer.location.village}, Tehsil {farmer.location.tehsil}</td>
                </tr>
                <tr>
                  <td className="bg-[#EDF3EF] font-semibold text-xs text-[#17231F]">District & State</td>
                  <td className="text-xs text-[#17231F]">{farmer.location.district}, {farmer.location.state} — {farmer.location.pincode}</td>
                </tr>
                <tr>
                  <td className="bg-[#EDF3EF] font-semibold text-xs text-[#17231F]">Landholding</td>
                  <td className="text-xs font-bold text-[#075E43]">{farmer.landHoldingAcres || 12.5} Acres (Verified Revenue Khata)</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
