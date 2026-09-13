import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Language } from '../../types';
import { LanguageDropdown } from '../common/LanguageDropdown';
import { getAuthText } from '../../i18n/authTranslations';
import { 
  ShieldCheck, 
  User, 
  Phone, 
  MapPin, 
  CreditCard, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  KeyRound,
  Building2,
  Sparkles,
  Briefcase
} from 'lucide-react';

interface AuthPageProps {
  onSuccess?: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onSuccess }) => {
  const { 
    login, 
    operatorLogin, 
    register, 
    language, 
    setActiveView,
    centres,
    setIsTcModalOpen,
    setIsPrivacyModalOpen
  } = useApp();

  const at = getAuthText(language);

  // Tab State: Farmer Login | Operator Login | Registration
  const [tab, setTab] = useState<'farmer_login' | 'operator_login' | 'register'>('farmer_login');
  
  // Mandatory Terms & Conditions Agreement
  const [agreedToTc, setAgreedToTc] = useState(false);

  const termsText = {
    en: 'I agree to the Terms & Conditions',
    hi: 'मैं नियम एवं शर्तों (Terms & Conditions) से सहमत हूँ',
    pa: 'ਮੈਂ ਨਿਯਮਾਂ ਅਤੇ ਸ਼ਰਤਾਂ (Terms & Conditions) ਨਾਲ ਸਹਿਮਤ ਹਾਂ',
    bn: 'আমি শর্তাবলী (Terms & Conditions) সাথে একমত',
    mr: 'मी अटी आणि शर्तींशी (Terms & Conditions) सहमत आहे',
    te: 'నేను నిబంధనలు మరియు షరతులకు (Terms & Conditions) అంగీకరిస్తున్నాను',
    ta: 'விதிமுறைகள் மற்றும் நிபந்தனைகளை (Terms & Conditions) நான் ஒப்புக்கொள்கிறேன்',
    gu: 'હું નિયમો અને શરતો (Terms & Conditions) સાથે સંમત છું',
    ur: 'میں شرائط و ضوابط (Terms & Conditions) سے متفق ہوں',
    kn: 'ನಾನು ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳನ್ನು (Terms & Conditions) ಒಪ್ಪುತ್ತೇನೆ',
    or: 'ମୁଁ ନିୟମ ଏବଂ ସର୍ତ୍ତାବଳୀ (Terms & Conditions) ସହିତ ସହମତ'
  }[language] || 'I agree to the Terms & Conditions';

  const termsErrorMsg = {
    en: 'Please agree to the Terms & Conditions before proceeding.',
    hi: 'कृपया आगे बढ़ने से पहले नियम एवं शर्तों को स्वीकार करें।',
    pa: 'ਕਿਰਪਾ ਕਰਕੇ ਅੱਗੇ ਵਧਣ ਤੋਂ ਪਹਿਲਾਂ ਨਿਯਮਾਂ ਅਤੇ ਸ਼ਰਤਾਂ ਨੂੰ ਸਵੀਕਾਰ ਕਰੋ।',
    bn: 'অনুগ্রহ করে এগিয়ে যাওয়ার আগে শর্তাবলীতে সম্মত হন।',
    mr: 'कृपया पुढे जाण्यापूर्वी अटी व शर्ती मान्य करा.',
    te: 'దయచేసి కొనసాగడానికి ముందు నిబంధనలు మరియు షరతులను అంగీకరించండి.',
    ta: 'தொடர்வதற்கு முன் விதிமுறைகள் மற்றும் நிபந்தனைகளை ஏற்கவும்.',
    gu: 'કૃપા કરીને આગળ વધતા પહેલા નિયમો અને શરતો સાથે સંમત થાઓ.',
    ur: 'براہ کرم آگے بڑھنے سے پہلے شرائط و ضوابط سے اتفاق کریں۔',
    kn: 'ದಯವಿಟ್ಟು ಮುಂದುವರಿಯುವ ಮೊದಲು ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳನ್ನು ಒಪ್ಪಿಕೊಳ್ಳಿ.',
    or: 'ଦୟାକରି ଆଗକୁ ବଢ଼ିବା ପୂର୍ବରୁ ନିୟମ ଏବଂ ସର୍ତ୍ତାବଳୀ ସହିତ ସହମତ ହୁଅନ୍ତୁ |'
  }[language] || 'Please agree to the Terms & Conditions before proceeding.';
  
  // Farmer Login State
  const [loginMethod, setLoginMethod] = useState<'farmerId' | 'otp'>('farmerId');
  const [loginIdentifier, setLoginIdentifier] = useState('MP-2024-7842');
  const [mobileForOtp, setMobileForOtp] = useState('+91 98765 43210');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Operator Login State
  const [operatorId, setOperatorId] = useState('OP-SAMRALA-01');
  const [operatorPin, setOperatorPin] = useState('2026');
  const [selectedCentreId, setSelectedCentreId] = useState('centre-samrala');

  // Registration State matching features.md
  const [regData, setRegData] = useState({
    fullName: '',
    mobileNumber: '',
    aadhaarNumber: '',
    village: '',
    tehsil: '',
    district: 'Ludhiana',
    state: 'Punjab',
    pincode: '',
    landHoldingAcres: 5,
    primaryCrop: 'Wheat (गेहूं)',
    bankName: 'Punjab National Bank',
    bankAccount: '',
    ifscCode: '',
    preferredLanguage: 'en' as Language,
  });
  const [regSuccessFarmerId, setRegSuccessFarmerId] = useState<string | null>(null);

  // Handle Farmer Login
  const handleFarmerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!agreedToTc) {
      setLoginError(termsErrorMsg);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const identifier = loginMethod === 'otp' ? mobileForOtp : loginIdentifier;
      if (!identifier.trim()) {
        setLoginError(at.fillMandatoryError);
        setIsSubmitting(false);
        return;
      }

      if (loginMethod === 'otp' && otpSent && otpCode.trim() !== '123456' && otpCode.trim().length !== 6) {
        setLoginError(at.invalidOtpError);
        setIsSubmitting(false);
        return;
      }

      const success = login(identifier);
      setIsSubmitting(false);

      if (success) {
        if (onSuccess) onSuccess();
        setActiveView('dashboard');
      } else {
        setLoginError(at.invalidCredsError);
      }
    }, 350);
  };

  // Handle Operator Login
  const handleOperatorLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!agreedToTc) {
      setLoginError(termsErrorMsg);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      if (!operatorId.trim()) {
        setLoginError(at.fillMandatoryError);
        setIsSubmitting(false);
        return;
      }

      const success = operatorLogin(operatorId, selectedCentreId);
      setIsSubmitting(false);

      if (success) {
        if (onSuccess) onSuccess();
        setActiveView('dashboard');
      } else {
        setLoginError(at.invalidCredsError);
      }
    }, 350);
  };

  const handleSendOtp = () => {
    if (!mobileForOtp || mobileForOtp.length < 10) {
      setLoginError(at.fillMandatoryError);
      return;
    }
    setOtpSent(true);
    setOtpCode('123456'); // Auto-fill demo OTP for fast testing
    setLoginError('');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreedToTc) {
      alert(termsErrorMsg);
      return;
    }

    if (!regData.fullName || !regData.mobileNumber || !regData.village) {
      alert(at.fillMandatoryError);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newFarmer = register({
        fullName: regData.fullName,
        mobileNumber: regData.mobileNumber.startsWith('+91') ? regData.mobileNumber : `+91 ${regData.mobileNumber}`,
        village: regData.village,
        tehsil: regData.tehsil || 'Samrala',
        district: regData.district,
        state: regData.state,
        pincode: regData.pincode || '141114',
        landHoldingAcres: Number(regData.landHoldingAcres) || 5,
        coordinates: { lat: 30.8358, lng: 76.1917 }
      });
      setIsSubmitting(false);
      setRegSuccessFarmerId(newFarmer.farmerId);
    }, 450);
  };

  const fillQuickDemo = (role: 'gurpreet' | 'manpreet' | 'operator') => {
    setAgreedToTc(true);
    if (role === 'gurpreet') {
      setTab('farmer_login');
      setLoginIdentifier('MP-2024-7842');
      setMobileForOtp('+91 98765 43210');
      setLoginMethod('farmerId');
    } else if (role === 'manpreet') {
      setTab('farmer_login');
      setLoginIdentifier('PB-2026-1049');
      setMobileForOtp('+91 98140 55678');
      setLoginMethod('farmerId');
    } else {
      setTab('operator_login');
      setOperatorId('OP-SAMRALA-01');
      setOperatorPin('2026');
      setSelectedCentreId('centre-samrala');
    }
    setLoginError('');
  };

  return (
    <div className="min-h-screen bg-[#F5F8F6] text-[#17231F] flex flex-col justify-between">
      {/* Top Government Strip with Language Selector */}
      <div className="bg-[#063B2A] text-[#FFFFFF] text-xs py-2 px-4 sm:px-8 border-b border-[#075E43]">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <span className="font-medium tracking-wide">
            भारत सरकार • कृषि एवं किसान कल्याण मंत्रालय | Government of India
          </span>
          <div className="flex items-center gap-2">
            <LanguageDropdown variant="header" />
          </div>
        </div>
      </div>

      {/* Main Authentication Container */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 my-4">
        <div className="bg-[#FFFFFF] border border-[#CBD8D1] rounded-[10px] w-full max-w-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] overflow-hidden">
          
          {/* Header with Sprout Logo */}
          <div className="bg-[#EDF3EF] p-6 border-b border-[#CBD8D1] text-center">
            <div className="w-16 h-16 rounded-[16px] overflow-hidden shadow-sm border border-[#CBD8D1] mx-auto mb-3 bg-[#063B2A]">
              <img 
                src="/logo.png" 
                alt="KRAYAM Logo" 
                className="w-full h-full object-cover" 
              />
            </div>

            <div className="text-xs uppercase tracking-widest font-bold text-[#075E43]">
              {at.portalBadge}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#17231F] mt-0.5">
              {at.portalTitle}
            </h1>
            <p className="text-xs text-[#66736D] mt-1 max-w-md mx-auto leading-relaxed">
              {at.portalSubtitle}
            </p>

            {/* Tab Switcher: Farmer Login | Operator Login | New Registration */}
            <div className="grid grid-cols-3 mt-6 bg-[#FFFFFF] p-1 rounded-[6px] border border-[#CBD8D1] max-w-md mx-auto gap-1">
              <button
                type="button"
                id="tab-farmer-login"
                onClick={() => { setTab('farmer_login'); setRegSuccessFarmerId(null); setLoginError(''); }}
                className={`py-2 px-2 text-xs font-bold rounded-[4px] transition-colors truncate ${
                  tab === 'farmer_login' ? 'bg-[#063B2A] text-[#FFFFFF]' : 'text-[#66736D] hover:text-[#17231F]'
                }`}
              >
                {at.tabFarmerLogin}
              </button>
              <button
                type="button"
                id="tab-operator-login"
                onClick={() => { setTab('operator_login'); setRegSuccessFarmerId(null); setLoginError(''); }}
                className={`py-2 px-2 text-xs font-bold rounded-[4px] transition-colors truncate flex items-center justify-center gap-1 ${
                  tab === 'operator_login' ? 'bg-[#075E43] text-[#FFFFFF]' : 'text-[#66736D] hover:text-[#075E43]'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{at.tabOperatorLogin}</span>
              </button>
              <button
                type="button"
                id="tab-register"
                onClick={() => { setTab('register'); setRegSuccessFarmerId(null); setLoginError(''); }}
                className={`py-2 px-2 text-xs font-bold rounded-[4px] transition-colors truncate ${
                  tab === 'register' ? 'bg-[#063B2A] text-[#FFFFFF]' : 'text-[#66736D] hover:text-[#17231F]'
                }`}
              >
                {at.tabNewRegistration}
              </button>
            </div>
          </div>

          {/* TAB 1: FARMER LOGIN */}
          {tab === 'farmer_login' && (
            <div className="p-6 sm:p-8 space-y-5">
              {/* Login Method Toggle */}
              <div className="flex items-center justify-center gap-4 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer font-semibold">
                  <input
                    type="radio"
                    name="loginMethod"
                    checked={loginMethod === 'farmerId'}
                    onChange={() => { setLoginMethod('farmerId'); setLoginError(''); }}
                    className="text-[#075E43] focus:ring-[#075E43]"
                  />
                  <span>{at.loginMethodFarmerId}</span>
                </label>
                <span className="text-[#CBD8D1]">|</span>
                <label className="flex items-center gap-1.5 cursor-pointer font-semibold">
                  <input
                    type="radio"
                    name="loginMethod"
                    checked={loginMethod === 'otp'}
                    onChange={() => { setLoginMethod('otp'); setLoginError(''); }}
                    className="text-[#075E43] focus:ring-[#075E43]"
                  />
                  <span>{at.loginMethodOtp}</span>
                </label>
              </div>

              {loginError && (
                <div className="p-3 bg-[#FFF5F5] border border-[#F0C2C2] text-[#B42318] text-xs rounded-[6px]">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleFarmerLogin} className="space-y-4">
                {loginMethod === 'farmerId' ? (
                  <div>
                    <label className="block text-xs font-bold text-[#17231F] uppercase mb-1">
                      {at.farmerIdLabel}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#66736D] absolute left-3 top-3.5" />
                      <input
                        type="text"
                        required
                        value={loginIdentifier}
                        onChange={(e) => setLoginIdentifier(e.target.value)}
                        placeholder={at.farmerIdPlaceholder}
                        className="w-full bg-[#FFFFFF] border border-[#CBD8D1] rounded-[6px] pl-10 pr-3 py-2.5 text-sm font-mono focus:border-[#075E43] focus:outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-[#17231F] uppercase mb-1">
                        {at.mobileLabel}
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Phone className="w-4 h-4 text-[#66736D] absolute left-3 top-3.5" />
                          <input
                            type="tel"
                            required
                            value={mobileForOtp}
                            onChange={(e) => setMobileForOtp(e.target.value)}
                            placeholder={at.mobilePlaceholder}
                            className="w-full bg-[#FFFFFF] border border-[#CBD8D1] rounded-[6px] pl-10 pr-3 py-2.5 text-sm focus:border-[#075E43] focus:outline-none"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          className="bg-[#EDF3EF] hover:bg-[#CBD8D1] text-[#063B2A] font-bold text-xs px-4 rounded-[6px] border border-[#CBD8D1] transition-colors"
                        >
                          {at.sendOtp}
                        </button>
                      </div>
                    </div>

                    {otpSent && (
                      <div className="p-3 bg-[#E7F3EC] border border-[#85E1A9] text-[#063B2A] text-xs rounded-[6px] space-y-2">
                        <div className="flex items-center gap-1.5 font-bold">
                          <CheckCircle2 className="w-4 h-4 text-[#16803C]" />
                          <span>{at.otpSentAlert}</span>
                        </div>
                        <div className="relative">
                          <KeyRound className="w-4 h-4 text-[#66736D] absolute left-3 top-3" />
                          <input
                            type="text"
                            maxLength={6}
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                            placeholder={at.otpPlaceholder}
                            className="w-full bg-[#FFFFFF] border border-[#CBD8D1] rounded-[6px] pl-10 pr-3 py-2 text-sm font-mono font-bold tracking-widest focus:border-[#075E43] focus:outline-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Terms & Conditions Checkbox */}
                <div className="pt-2 pb-1">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none text-xs text-[#17231F]">
                    <input
                      type="checkbox"
                      checked={agreedToTc}
                      onChange={(e) => {
                        setAgreedToTc(e.target.checked);
                        if (e.target.checked) setLoginError('');
                      }}
                      className="mt-0.5 w-4 h-4 rounded border-[#CBD8D1] text-[#075E43] focus:ring-[#075E43] accent-[#075E43] cursor-pointer shrink-0"
                    />
                    <span className="leading-snug">
                      {language === 'en' ? 'I agree to the ' : ''}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsTcModalOpen(true);
                        }}
                        className="font-bold text-[#075E43] underline hover:text-[#04261B] transition-colors"
                      >
                        {language === 'en' ? 'Terms & Conditions' : termsText}
                      </button>
                      {language === 'en' && <span className="text-[#66736D] font-['Noto_Sans_Devanagari']"> (नियम एवं शर्तें)</span>}
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#063B2A] hover:bg-[#075E43] text-[#FFFFFF] font-bold text-sm py-3 rounded-[6px] transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? '...' : at.loginButton}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Quick Demo Pre-fill for Testing */}
              <div className="pt-4 border-t border-[#CBD8D1]">
                <div className="text-[11px] font-bold text-[#66736D] uppercase mb-2 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#EA8A0A]" />
                  <span>{at.quickDemoTitle}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => fillQuickDemo('gurpreet')}
                    className="p-2 text-left bg-[#EDF3EF] hover:bg-[#E7F3EC] border border-[#CBD8D1] rounded-[6px] transition-colors"
                  >
                    <div className="font-bold text-[#063B2A]">{at.quickDemoFarmer}</div>
                    <div className="text-[10px] text-[#66736D] font-mono">ID: MP-2024-7842</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => fillQuickDemo('operator')}
                    className="p-2 text-left bg-[#FFF3DC] hover:bg-[#FFE6B3] border border-[#F0C2C2] rounded-[6px] transition-colors"
                  >
                    <div className="font-bold text-[#B45309]">{at.quickDemoOperator}</div>
                    <div className="text-[10px] text-[#66736D] font-mono">OP: OP-SAMRALA-01</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: OPERATOR LOGIN */}
          {tab === 'operator_login' && (
            <div className="p-6 sm:p-8 space-y-5">
              <div className="bg-[#FFF3DC] border border-[#FFE6B3] p-3 rounded-[6px] text-xs text-[#B45309] flex items-center gap-2">
                <Briefcase className="w-4 h-4 shrink-0" />
                <span>
                  <strong>Authorized Mandi Personnel Only:</strong> Access live queue floor, digital weighbridges, and PFMS DBT authorization.
                </span>
              </div>

              {loginError && (
                <div className="p-3 bg-[#FFF5F5] border border-[#F0C2C2] text-[#B42318] text-xs rounded-[6px]">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleOperatorLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#17231F] uppercase mb-1">
                    {at.operatorIdLabel}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#66736D] absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      value={operatorId}
                      onChange={(e) => setOperatorId(e.target.value)}
                      placeholder={at.operatorIdPlaceholder}
                      className="w-full bg-[#FFFFFF] border border-[#CBD8D1] rounded-[6px] pl-10 pr-3 py-2.5 text-sm font-mono focus:border-[#075E43] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#17231F] uppercase mb-1">
                    {at.operatorPinLabel}
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#66736D] absolute left-3 top-3.5" />
                    <input
                      type="password"
                      required
                      value={operatorPin}
                      onChange={(e) => setOperatorPin(e.target.value)}
                      placeholder={at.operatorPinPlaceholder}
                      className="w-full bg-[#FFFFFF] border border-[#CBD8D1] rounded-[6px] pl-10 pr-3 py-2.5 text-sm font-mono focus:border-[#075E43] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#17231F] uppercase mb-1">
                    {at.operatorCentreLabel}
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-[#66736D] absolute left-3 top-3.5" />
                    <select
                      value={selectedCentreId}
                      onChange={(e) => setSelectedCentreId(e.target.value)}
                      className="w-full bg-[#FFFFFF] border border-[#CBD8D1] rounded-[6px] pl-10 pr-3 py-2.5 text-xs font-medium focus:border-[#075E43] focus:outline-none"
                    >
                      {centres.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.location.district})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Terms & Conditions Checkbox */}
                <div className="pt-2 pb-1">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none text-xs text-[#17231F]">
                    <input
                      type="checkbox"
                      checked={agreedToTc}
                      onChange={(e) => {
                        setAgreedToTc(e.target.checked);
                        if (e.target.checked) setLoginError('');
                      }}
                      className="mt-0.5 w-4 h-4 rounded border-[#CBD8D1] text-[#075E43] focus:ring-[#075E43] accent-[#075E43] cursor-pointer shrink-0"
                    />
                    <span className="leading-snug">
                      {language === 'en' ? 'I agree to the ' : ''}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsTcModalOpen(true);
                        }}
                        className="font-bold text-[#075E43] underline hover:text-[#04261B] transition-colors"
                      >
                        {language === 'en' ? 'Terms & Conditions' : termsText}
                      </button>
                      {language === 'en' && <span className="text-[#66736D] font-['Noto_Sans_Devanagari']"> (नियम एवं शर्तें)</span>}
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#075E43] hover:bg-[#063B2A] text-[#FFFFFF] font-bold text-sm py-3 rounded-[6px] transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>{isSubmitting ? '...' : at.loginAsOperatorBtn}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </form>

              {/* Quick Demo Pre-fill for Operator */}
              <div className="pt-4 border-t border-[#CBD8D1]">
                <div className="text-[11px] font-bold text-[#66736D] uppercase mb-2 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#EA8A0A]" />
                  <span>1-Click Operator Demo Login</span>
                </div>
                <button
                  type="button"
                  onClick={() => fillQuickDemo('operator')}
                  className="w-full p-2.5 text-left bg-[#EDF3EF] hover:bg-[#E7F3EC] border border-[#CBD8D1] rounded-[6px] transition-colors flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-[#063B2A] text-xs">Sh. Rajesh Kumar (Mandi Secretary)</div>
                    <div className="text-[11px] text-[#66736D]">Centre: Samrala Main Grain Mandi (Code: OP-SAMRALA-01)</div>
                  </div>
                  <span className="text-[11px] font-bold text-[#075E43] bg-[#E7F3EC] px-2 py-1 rounded">Quick Fill</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: REGISTRATION */}
          {tab === 'register' && (
            <div className="p-6 sm:p-8 space-y-5">
              {regSuccessFarmerId ? (
                <div className="bg-[#E7F3EC] border border-[#85E1A9] p-6 rounded-[8px] text-center space-y-4">
                  <div className="w-12 h-12 bg-[#16803C] text-white rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#063B2A]">{at.regSuccessTitle}</h3>
                    <p className="text-xs text-[#34443D] mt-1">{at.regSuccessMsg}</p>
                  </div>
                  <div className="p-3 bg-white border border-[#CBD8D1] rounded-[6px] inline-block font-mono text-base font-bold text-[#063B2A]">
                    {at.yourAssignedId}: <span className="text-[#B45309]">{regSuccessFarmerId}</span>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        setLoginIdentifier(regSuccessFarmerId);
                        setTab('farmer_login');
                      }}
                      className="bg-[#063B2A] hover:bg-[#075E43] text-[#FFFFFF] font-bold text-xs px-6 py-2.5 rounded-[6px] transition-colors inline-flex items-center gap-2"
                    >
                      {at.proceedToLogin}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4 text-xs">
                  <div>
                    <h2 className="text-sm font-bold text-[#17231F]">{at.regTitle}</h2>
                    <p className="text-[#66736D] text-[11px]">{at.regSubtitle}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-[#17231F] uppercase mb-1">
                        {at.fullNameLabel} *
                      </label>
                      <input
                        type="text"
                        required
                        value={regData.fullName}
                        onChange={(e) => setRegData({ ...regData, fullName: e.target.value })}
                        placeholder={at.fullNamePlaceholder}
                        className="w-full bg-[#FFFFFF] border border-[#CBD8D1] rounded-[6px] px-3 py-2 focus:border-[#075E43] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#17231F] uppercase mb-1">
                        {at.mobileLabel} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={regData.mobileNumber}
                        onChange={(e) => setRegData({ ...regData, mobileNumber: e.target.value })}
                        placeholder="9876543210"
                        className="w-full bg-[#FFFFFF] border border-[#CBD8D1] rounded-[6px] px-3 py-2 focus:border-[#075E43] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-[#17231F] uppercase mb-1">
                        {at.aadhaarLabel}
                      </label>
                      <input
                        type="text"
                        value={regData.aadhaarNumber}
                        onChange={(e) => setRegData({ ...regData, aadhaarNumber: e.target.value })}
                        placeholder={at.aadhaarPlaceholder}
                        className="w-full bg-[#FFFFFF] border border-[#CBD8D1] rounded-[6px] px-3 py-2 focus:border-[#075E43] focus:outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#17231F] uppercase mb-1">
                        {at.villageLabel} *
                      </label>
                      <input
                        type="text"
                        required
                        value={regData.village}
                        onChange={(e) => setRegData({ ...regData, village: e.target.value })}
                        placeholder={at.villagePlaceholder}
                        className="w-full bg-[#FFFFFF] border border-[#CBD8D1] rounded-[6px] px-3 py-2 focus:border-[#075E43] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block font-bold text-[#17231F] uppercase mb-1">
                        {at.tehsilLabel}
                      </label>
                      <input
                        type="text"
                        value={regData.tehsil}
                        onChange={(e) => setRegData({ ...regData, tehsil: e.target.value })}
                        placeholder={at.tehsilPlaceholder}
                        className="w-full bg-[#FFFFFF] border border-[#CBD8D1] rounded-[6px] px-2 py-2 text-xs focus:border-[#075E43] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#17231F] uppercase mb-1">
                        {at.districtLabel}
                      </label>
                      <input
                        type="text"
                        value={regData.district}
                        onChange={(e) => setRegData({ ...regData, district: e.target.value })}
                        className="w-full bg-[#FFFFFF] border border-[#CBD8D1] rounded-[6px] px-2 py-2 text-xs focus:border-[#075E43] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#17231F] uppercase mb-1">
                        {at.pincodeLabel}
                      </label>
                      <input
                        type="text"
                        value={regData.pincode}
                        onChange={(e) => setRegData({ ...regData, pincode: e.target.value })}
                        placeholder={at.pincodePlaceholder}
                        className="w-full bg-[#FFFFFF] border border-[#CBD8D1] rounded-[6px] px-2 py-2 text-xs focus:border-[#075E43] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#CBD8D1]">
                    <div>
                      <label className="block font-bold text-[#17231F] uppercase mb-1">
                        {at.landHoldingLabel}
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="200"
                        value={regData.landHoldingAcres}
                        onChange={(e) => setRegData({ ...regData, landHoldingAcres: Number(e.target.value) })}
                        className="w-full bg-[#FFFFFF] border border-[#CBD8D1] rounded-[6px] px-3 py-2 focus:border-[#075E43] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#17231F] uppercase mb-1">
                        {at.primaryCropLabel}
                      </label>
                      <select
                        value={regData.primaryCrop}
                        onChange={(e) => setRegData({ ...regData, primaryCrop: e.target.value })}
                        className="w-full bg-[#FFFFFF] border border-[#CBD8D1] rounded-[6px] px-3 py-2 focus:border-[#075E43] focus:outline-none"
                      >
                        <option value="Wheat (गेहूं)">Wheat (गेहूं)</option>
                        <option value="Paddy / Rice (धान)">Paddy / Rice (धान)</option>
                        <option value="Mustard (सरसों)">Mustard (सरसों)</option>
                        <option value="Gram / Chana (चना)">Gram / Chana (चना)</option>
                        <option value="Cotton (कपास)">Cotton (कपास)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#CBD8D1]">
                    <div>
                      <label className="block font-bold text-[#17231F] uppercase mb-1">
                        {at.bankAccountLabel}
                      </label>
                      <input
                        type="text"
                        value={regData.bankAccount}
                        onChange={(e) => setRegData({ ...regData, bankAccount: e.target.value })}
                        placeholder={at.bankAccountPlaceholder}
                        className="w-full bg-[#FFFFFF] border border-[#CBD8D1] rounded-[6px] px-3 py-2 focus:border-[#075E43] focus:outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#17231F] uppercase mb-1">
                        {at.ifscCodeLabel}
                      </label>
                      <input
                        type="text"
                        value={regData.ifscCode}
                        onChange={(e) => setRegData({ ...regData, ifscCode: e.target.value })}
                        placeholder={at.ifscCodePlaceholder}
                        className="w-full bg-[#FFFFFF] border border-[#CBD8D1] rounded-[6px] px-3 py-2 focus:border-[#075E43] focus:outline-none font-mono uppercase"
                      />
                    </div>
                  </div>

                  {/* Terms & Conditions Checkbox */}
                  <div className="pt-2 pb-1">
                    <label className="flex items-start gap-2.5 cursor-pointer select-none text-xs text-[#17231F]">
                      <input
                        type="checkbox"
                        checked={agreedToTc}
                        onChange={(e) => setAgreedToTc(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-[#CBD8D1] text-[#075E43] focus:ring-[#075E43] accent-[#075E43] cursor-pointer shrink-0"
                      />
                      <span className="leading-snug">
                        {language === 'en' ? 'I agree to the ' : ''}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsTcModalOpen(true);
                          }}
                          className="font-bold text-[#075E43] underline hover:text-[#04261B] transition-colors"
                        >
                          {language === 'en' ? 'Terms & Conditions' : termsText}
                        </button>
                        {language === 'en' && <span className="text-[#66736D] font-['Noto_Sans_Devanagari']"> (नियम एवं शर्तें)</span>}
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#063B2A] hover:bg-[#075E43] text-[#FFFFFF] font-bold text-sm py-3 rounded-[6px] transition-colors flex items-center justify-center gap-2 mt-4"
                  >
                    {isSubmitting ? '...' : at.registerButton}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Footer Helpline Note */}
          <div className="bg-[#EDF3EF] px-6 py-3 border-t border-[#CBD8D1] text-center text-xs text-[#66736D]">
            {at.helplineText}
          </div>
        </div>
      </div>

      {/* Official Government Footer Strip */}
      <div className="bg-[#FFFFFF] border-t border-[#CBD8D1] text-xs py-3 px-4 sm:px-8 text-[#66736D]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © 2026 Ministry of Agriculture & Farmers Welfare, Government of India.
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsTcModalOpen(true)}
              className="text-[#075E43] underline hover:text-[#04261B] font-medium transition-colors"
            >
              Terms & Conditions
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setIsPrivacyModalOpen(true)}
              className="text-[#075E43] underline hover:text-[#04261B] font-medium transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <span className="text-[#075E43] font-semibold">NIC Secure Portal v2.4.0</span>
            <span>•</span>
            <span className="text-[#16803C] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
