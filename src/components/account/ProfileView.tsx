import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  MapPin, 
  ShieldCheck, 
  Copy, 
  Check, 
  Edit3, 
  Save,
  CheckCircle2,
  LogOut,
  LogIn,
  AlertCircle
} from 'lucide-react';
import { INDIAN_STATES } from '../../data/states';
import { getDistrictsForState } from '../../data/districts';

export const ProfileView: React.FC = () => {
  const { farmer, updateProfile, logout, setActiveView } = useApp();
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: farmer?.fullName || '',
    mobileNumber: farmer?.mobileNumber || '',
    village: farmer?.location?.village || '',
    district: farmer?.location?.district || '',
    state: farmer?.location?.state || '',
    pincode: farmer?.location?.pincode || '',
  });

  // Keep form data synchronized with authenticated farmer profile
  useEffect(() => {
    if (farmer) {
      setFormData({
        fullName: farmer.fullName || '',
        mobileNumber: farmer.mobileNumber || '',
        village: farmer.location?.village || '',
        district: farmer.location?.district || '',
        state: farmer.location?.state || '',
        pincode: farmer.location?.pincode || '',
      });
    }
  }, [farmer, isEditing]);

  const handleProfileStateChange = (selectedState: string) => {
    setFormData(prev => ({
      ...prev,
      state: selectedState,
      district: '', // Reset district when state changes
    }));
  };

  const handleCopyFarmerId = () => {
    if (!farmer?.farmerId) return;
    navigator.clipboard.writeText(farmer.farmerId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError(null);
    setSaveSuccess(null);

    if (!formData.fullName.trim()) {
      setSaveError('Please enter full name.');
      return;
    }

    if (!formData.mobileNumber.trim()) {
      setSaveError('Please enter mobile number.');
      return;
    }

    if (!formData.state) {
      setSaveError('Please select a State from the dropdown.');
      return;
    }

    if (!formData.district) {
      setSaveError('Please select a District from the dropdown.');
      return;
    }

    if (!formData.pincode.trim() || formData.pincode.trim().length !== 6) {
      setSaveError('PIN Code must be exactly 6 numeric digits.');
      return;
    }

    if (!formData.village.trim()) {
      setSaveError('Please enter village name.');
      return;
    }

    setIsSaving(true);
    try {
      await updateProfile({
        fullName: formData.fullName.trim(),
        mobileNumber: formData.mobileNumber.trim(),
        location: {
          ...(farmer?.location || {}),
          village: formData.village.trim() || undefined,
          district: formData.district.trim() || undefined,
          state: formData.state.trim() || undefined,
          pincode: formData.pincode.trim() || undefined,
        },
      });
      setSaveSuccess('Profile updated successfully.');
      setIsEditing(false);
      setTimeout(() => setSaveSuccess(null), 4000);
    } catch (err: any) {
      setSaveError(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!farmer) {
    return (
      <div className="w-full py-8">
        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-8 sm:p-12 text-center max-w-xl mx-auto shadow-sm">
          <div className="w-12 h-12 rounded-[6px] bg-[#E7F3EC] text-[#075E43] border border-[#CBD8D1] flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#17231F]">
            Farmer Profile Not Loaded
          </h2>
          <p className="text-xs text-[#66736D] mt-2 mb-6">
            Please log in with your registered mobile number or Farmer ID to view and manage your personal details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      {/* Page Header */}
      <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#17231F]">
            Farmer Identity / किसान पहचान
          </h1>
          <p className="text-xs sm:text-sm text-[#66736D] mt-0.5">
            Ministry of Agriculture & Farmers Welfare — Official Farmer Registry
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-2 self-start sm:self-auto">
          <button
            onClick={() => {
              setIsEditing(!isEditing);
              setSaveError(null);
            }}
            className="h-10 px-4 rounded-[6px] bg-[#FFFFFF] border border-[#CBD8D1] hover:bg-[#F3F9F5] text-xs font-semibold text-[#17231F] flex items-center gap-1.5 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#075E43]" />
            <span>{isEditing ? 'Cancel Edit' : 'Edit Information'}</span>
          </button>

          <button
            onClick={() => setActiveView('auth')}
            className="h-10 px-3.5 rounded-[6px] bg-[#F3F9F5] border border-[#CBD8D1] hover:bg-[#E7F3EC] text-xs font-semibold text-[#075E43] flex items-center gap-1.5 transition-colors"
            title="Switch or Register Another Account"
          >
            <LogIn className="w-3.5 h-3.5 text-[#075E43]" />
            <span className="hidden sm:inline">Switch Account</span>
          </button>

          <button
            onClick={() => logout()}
            className="h-10 px-3.5 rounded-[6px] bg-[#FEF2F2] border border-[#FECACA] hover:bg-[#FEE2E2] text-xs font-semibold text-[#DC2626] flex items-center gap-1.5 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3 bg-[#E7F3EC] border border-[#85E1A9] rounded-[6px] text-xs text-[#063B2A] font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#16803C]" />
          <span>{saveSuccess}</span>
        </div>
      )}

      {/* Farmer Official Identity Block */}
      <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
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
                {farmer.registeredDate && (
                  <span className="text-xs text-[#66736D]">Registered: {farmer.registeredDate}</span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17231F] mt-1">
                {farmer.fullName || 'Not provided'}
              </h2>
              <div className="text-xs text-[#34443D] mt-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#075E43]" />
                <span>
                  {[
                    farmer.location?.village,
                    farmer.location?.district ? `District ${farmer.location.district}` : null,
                    farmer.location?.state,
                    farmer.location?.pincode ? `PIN ${farmer.location.pincode}` : null,
                  ].filter(Boolean).join(', ') || 'Not provided'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#F5F8F6] border border-[#CBD8D1] rounded-[6px] p-3 sm:text-right">
            <div className="text-[11px] font-bold text-[#66736D] uppercase">Official Farmer ID</div>
            <div className="text-lg font-mono font-bold text-[#063B2A] mt-0.5">
              {farmer.farmerId || 'Not provided'}
            </div>
            {farmer.farmerId && (
              <button
                onClick={handleCopyFarmerId}
                className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-[#075E43] hover:underline"
              >
                {copied ? <Check className="w-3 h-3 text-[#16803C]" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy ID'}</span>
              </button>
            )}
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
            {saveError && (
              <div className="p-3 bg-[#FEF2F2] border border-[#FECACA] rounded-[6px] text-xs text-[#DC2626] font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{saveError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Row 1: Full Name & Mobile Number */}
              <div>
                <label className="block text-xs font-bold text-[#17231F] uppercase mb-1">
                  FULL NAME / पूरा नाम *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Full Name"
                  className="w-full h-11 px-3 rounded-[6px] border border-[#CBD8D1] bg-[#FFFFFF] text-sm text-[#17231F] focus:outline-none focus:border-[#16845F]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17231F] uppercase mb-1">
                  MOBILE NUMBER / मोबाइल *
                </label>
                <input
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                  placeholder="Mobile Number"
                  className="w-full h-11 px-3 rounded-[6px] border border-[#CBD8D1] bg-[#FFFFFF] text-sm text-[#17231F] focus:outline-none focus:border-[#16845F]"
                  required
                />
              </div>

              {/* Row 2: State & District */}
              <div>
                <label className="block text-xs font-bold text-[#17231F] uppercase mb-1">
                  STATE / राज्य *
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => handleProfileStateChange(e.target.value)}
                  className="w-full h-11 px-3 rounded-[6px] border border-[#CBD8D1] bg-[#FFFFFF] text-sm text-[#17231F] focus:outline-none focus:border-[#16845F]"
                  required
                >
                  <option value="">Select State</option>
                  {INDIAN_STATES.map((stateName) => (
                    <option key={stateName} value={stateName}>
                      {stateName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17231F] uppercase mb-1">
                  DISTRICT / जिला *
                </label>
                <select
                  required
                  disabled={!formData.state}
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full h-11 px-3 rounded-[6px] border border-[#CBD8D1] bg-[#FFFFFF] text-sm text-[#17231F] focus:outline-none focus:border-[#16845F] disabled:bg-[#F4F7F5] disabled:text-[#94A3B8] disabled:cursor-not-allowed"
                >
                  <option value="">
                    {formData.state ? 'Select District' : 'Select State First'}
                  </option>
                  {getDistrictsForState(formData.state).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                  {formData.district && !getDistrictsForState(formData.state).includes(formData.district) && (
                    <option value={formData.district}>{formData.district}</option>
                  )}
                </select>
              </div>

              {/* Row 3: PIN Code & Village */}
              <div>
                <label className="block text-xs font-bold text-[#17231F] uppercase mb-1">
                  PIN CODE / पिन कोड *
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
                  placeholder="Pincode"
                  className="w-full h-11 px-3 rounded-[6px] border border-[#CBD8D1] bg-[#FFFFFF] text-sm text-[#17231F] focus:outline-none focus:border-[#16845F]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17231F] uppercase mb-1">
                  VILLAGE / गाँव *
                </label>
                <input
                  type="text"
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  placeholder="Village"
                  className="w-full h-11 px-3 rounded-[6px] border border-[#CBD8D1] bg-[#FFFFFF] text-sm text-[#17231F] focus:outline-none focus:border-[#16845F]"
                  required
                />
              </div>
            </div>

            <div className="pt-3 flex items-center gap-3">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 h-11 px-6 rounded-[6px] bg-[#0B6B4F] hover:bg-[#075E43] disabled:opacity-50 text-[#FFFFFF] font-semibold text-xs transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaving ? 'Saving to National Grid...' : 'Save Profile Changes'}</span>
              </button>
              <button
                type="button"
                disabled={isSaving}
                onClick={() => {
                  setIsEditing(false);
                  setSaveError(null);
                }}
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
                  <td className="font-bold text-xs text-[#17231F]">{farmer.fullName || 'Not provided'}</td>
                </tr>
                <tr>
                  <td className="bg-[#EDF3EF] font-semibold text-xs text-[#17231F]">Mobile Number</td>
                  <td className="font-mono text-xs text-[#17231F]">{farmer.mobileNumber || 'Not provided'}</td>
                </tr>
                <tr>
                  <td className="bg-[#EDF3EF] font-semibold text-xs text-[#17231F]">Village</td>
                  <td className="text-xs text-[#17231F]">{farmer.location?.village || 'Not provided'}</td>
                </tr>
                <tr>
                  <td className="bg-[#EDF3EF] font-semibold text-xs text-[#17231F]">District</td>
                  <td className="text-xs text-[#17231F]">{farmer.location?.district || 'Not provided'}</td>
                </tr>
                <tr>
                  <td className="bg-[#EDF3EF] font-semibold text-xs text-[#17231F]">State</td>
                  <td className="text-xs text-[#17231F]">{farmer.location?.state || 'Not provided'}</td>
                </tr>
                <tr>
                  <td className="bg-[#EDF3EF] font-semibold text-xs text-[#17231F]">PIN Code</td>
                  <td className="font-mono text-xs text-[#17231F]">{farmer.location?.pincode || 'Not provided'}</td>
                </tr>
                <tr>
                  <td className="bg-[#EDF3EF] font-semibold text-xs text-[#17231F]">Farmer ID</td>
                  <td className="font-mono text-xs font-bold text-[#063B2A]">{farmer.farmerId || 'Not provided'}</td>
                </tr>
                {farmer.registeredDate && (
                  <tr>
                    <td className="bg-[#EDF3EF] font-semibold text-xs text-[#17231F]">Registration Date</td>
                    <td className="text-xs text-[#17231F]">{farmer.registeredDate}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
