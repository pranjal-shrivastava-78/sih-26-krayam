import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, User, CheckCircle2, ArrowRight, X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, register, t } = useApp();
  const [tab, setTab] = useState<'login' | 'register'>('login');

  const [loginId, setLoginId] = useState('');
  const [loginError, setLoginError] = useState('');

  const [regData, setRegData] = useState({
    fullName: '',
    mobileNumber: '',
    village: '',
    tehsil: '',
    district: '',
    state: 'Punjab',
    pincode: '',
    landHoldingAcres: 5
  });
  const [regSuccessId, setRegSuccessId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginId.trim()) {
      setLoginError('Enter Farmer ID or Mobile Number');
      return;
    }
    try {
      const success = await login(loginId);
      if (success) {
        setLoginError('');
        onClose();
      } else {
        setLoginError('Invalid credentials. Please verify your Farmer ID or mobile number.');
      }
    } catch (err: any) {
      setLoginError(err.message || 'Login failed.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regData.fullName || !regData.mobileNumber || !regData.village) {
      alert('Please fill required fields');
      return;
    }
    try {
      const newFarmer = await register(regData);
      setRegSuccessId(newFarmer.farmerId);
    } catch (err: any) {
      alert(err.message || 'Registration failed.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0c2417]/70 backdrop-blur-md animate-fade-in">
      <div className="bg-[#ffffff] rounded-[22px] sm:rounded-[24px] border border-[#cdeac6] w-full max-w-md max-h-[92vh] flex flex-col overflow-hidden text-[#0d2618] shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#f4fbf5] border-b border-[#cdeac6] shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#eef8ee] border border-[#BBEAA6] flex items-center justify-center text-[#166534] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-[0.45px] text-[#166534] font-bold block">
                  AUTHENTICATION GATEWAY
                </span>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#0d2618]">
                  {tab === 'login' ? t('login') : t('register')}
                </h2>
              </div>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-[#eef8ee] text-[#2e5a40] hover:text-[#0d2618] flex items-center justify-center">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 56px Tab Switcher */}
          {!regSuccessId && (
            <div className="flex mt-4 bg-[#eef8ee] p-1 rounded-[56px] border border-[#cdeac6]">
              <button
                type="button"
                onClick={() => { setTab('login'); setLoginError(''); }}
                className={`flex-1 min-h-[40px] py-2 text-xs rounded-[56px] transition-all font-bold ${
                  tab === 'login' ? 'bg-[#166534] text-[#ffffff] shadow-sm' : 'text-[#2e5a40] hover:text-[#0d2618]'
                }`}
              >
                {t('login')}
              </button>
              <button
                type="button"
                onClick={() => { setTab('register'); setLoginError(''); }}
                className={`flex-1 min-h-[40px] py-2 text-xs rounded-[56px] transition-all font-bold ${
                  tab === 'register' ? 'bg-[#166534] text-[#ffffff] shadow-sm' : 'text-[#2e5a40] hover:text-[#0d2618]'
                }`}
              >
                {t('register')}
              </button>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {regSuccessId ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-[#eef8ee] text-[#166534] border border-[#BBEAA6] rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-[0.45px] text-[#166534] font-bold block">
                  REGISTRATION COMPLETED
                </span>
                <h3 className="text-xl font-bold text-[#0d2618] mt-1">Official Farmer ID Issued</h3>
              </div>
              <div className="p-4 bg-[#f4fbf5] border border-[#BBEAA6] rounded-[20px] font-mono text-2xl font-bold text-[#166534] tracking-wider">
                {regSuccessId}
              </div>
              <p className="text-xs text-[#2e5a40] max-w-xs mx-auto">
                Authentication key generated. Use this ID for all subsequent mandi bookings and queue tracking.
              </p>
              <button
                onClick={onClose}
                className="w-full py-3.5 bg-[#166534] hover:bg-[#14532d] text-[#ffffff] font-bold text-xs rounded-[56px] transition-all shadow-sm"
              >
                Enter Procurement Portal
              </button>
            </div>
          ) : tab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[9px] uppercase tracking-[0.45px] text-[#2e5a40] font-bold mb-1.5">
                  {t('farmerId')} / {t('mobileNumber')}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#2e5a40] absolute left-4 top-3.5" />
                  <input
                    type="text"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    placeholder="e.g. FID-2026-7842"
                    className="w-full pl-11 pr-4 py-3 bg-[#f4fbf5] border border-[#cdeac6] rounded-[56px] text-xs font-mono text-[#0d2618] focus:border-[#166534] outline-none font-semibold"
                  />
                </div>
                {loginError && (
                  <p className="text-xs text-[#dc2626] font-semibold mt-1.5">{loginError}</p>
                )}
              </div>

              {/* Demo button */}
              <div className="bg-[#f4fbf5] p-3 rounded-[16px] border border-[#cdeac6] flex items-center justify-between text-xs">
                <span className="text-[#2e5a40]">Quick Simulation:</span>
                <button
                  type="button"
                  onClick={() => setLoginId('FID-2026-7842')}
                  className="font-mono font-bold text-[#166534] hover:underline"
                >
                  Load FID-2026-7842
                </button>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 border border-[#cdeac6] text-[#0d2618] rounded-[56px] text-xs font-semibold hover:bg-[#eef8ee]"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#166534] hover:bg-[#14532d] text-[#ffffff] rounded-[56px] text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>{t('login')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-[9px] uppercase tracking-[0.45px] text-[#2e5a40] font-bold mb-1">{t('fullName')} *</label>
                <input
                  type="text"
                  required
                  value={regData.fullName}
                  onChange={(e) => setRegData({ ...regData, fullName: e.target.value })}
                  placeholder="e.g. Sardar Gurmeet Singh"
                  className="w-full px-4 py-2.5 bg-[#f4fbf5] border border-[#cdeac6] rounded-[56px] text-xs text-[#0d2618] focus:border-[#166534] outline-none font-semibold"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-[0.45px] text-[#2e5a40] font-bold mb-1">{t('mobileNumber')} *</label>
                <input
                  type="tel"
                  required
                  value={regData.mobileNumber}
                  onChange={(e) => setRegData({ ...regData, mobileNumber: e.target.value })}
                  placeholder="e.g. +91 98140 12345"
                  className="w-full px-4 py-2.5 bg-[#f4fbf5] border border-[#cdeac6] rounded-[56px] text-xs text-[#0d2618] focus:border-[#166534] outline-none font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.45px] text-[#2e5a40] font-bold mb-1">{t('village')} *</label>
                  <input
                    type="text"
                    required
                    value={regData.village}
                    onChange={(e) => setRegData({ ...regData, village: e.target.value })}
                    placeholder="e.g. Rampur"
                    className="w-full px-4 py-2.5 bg-[#f4fbf5] border border-[#cdeac6] rounded-[56px] text-xs text-[#0d2618] focus:border-[#166534] outline-none font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.45px] text-[#2e5a40] font-bold mb-1">{t('tehsil')}</label>
                  <input
                    type="text"
                    value={regData.tehsil}
                    onChange={(e) => setRegData({ ...regData, tehsil: e.target.value })}
                    placeholder="e.g. Samrala"
                    className="w-full px-4 py-2.5 bg-[#f4fbf5] border border-[#cdeac6] rounded-[56px] text-xs text-[#0d2618] focus:border-[#166534] outline-none font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.45px] text-[#2e5a40] font-bold mb-1">{t('district')}</label>
                  <input
                    type="text"
                    value={regData.district}
                    onChange={(e) => setRegData({ ...regData, district: e.target.value })}
                    placeholder="e.g. Ludhiana"
                    className="w-full px-4 py-2.5 bg-[#f4fbf5] border border-[#cdeac6] rounded-[56px] text-xs text-[#0d2618] focus:border-[#166534] outline-none font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.45px] text-[#2e5a40] font-bold mb-1">{t('pincode')}</label>
                  <input
                    type="text"
                    value={regData.pincode}
                    onChange={(e) => setRegData({ ...regData, pincode: e.target.value })}
                    placeholder="e.g. 141114"
                    className="w-full px-4 py-2.5 bg-[#f4fbf5] border border-[#cdeac6] rounded-[56px] text-xs text-[#0d2618] focus:border-[#166534] outline-none font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-[0.45px] text-[#2e5a40] font-bold mb-1">Total Agricultural Land (Acres)</label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={regData.landHoldingAcres}
                  onChange={(e) => setRegData({ ...regData, landHoldingAcres: parseFloat(e.target.value) || 1 })}
                  className="w-full px-4 py-2.5 bg-[#f4fbf5] border border-[#cdeac6] rounded-[56px] text-xs text-[#0d2618] focus:border-[#166534] outline-none font-semibold"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 border border-[#cdeac6] text-[#0d2618] rounded-[56px] text-xs font-semibold hover:bg-[#eef8ee]"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#166534] hover:bg-[#14532d] text-[#ffffff] rounded-[56px] text-xs font-bold shadow-sm"
                >
                  {t('register')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
