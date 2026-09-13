import React from 'react';
import { useApp } from '../../context/AppContext';
import { LanguageDropdown } from '../common/LanguageDropdown';
import { getOperatorText } from '../../i18n/operatorTranslations';
import { 
  Building2, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  LogOut, 
  Layers, 
  Calendar, 
  Scale, 
  CreditCard, 
  BarChart3, 
  Sparkles, 
  HardDrive
} from 'lucide-react';

export const OperatorHeader: React.FC = () => {
  const { 
    operator, 
    logout, 
    operatorActiveTab, 
    setOperatorActiveTab, 
    isOffline, 
    toggleOfflineMode, 
    syncQueue, 
    syncOfflineQueue, 
    language 
  } = useApp();

  const ot = getOperatorText(language);
  const pendingSyncCount = syncQueue.filter(q => q.status === 'PENDING').length;

  return (
    <header className="bg-[#063B2A] text-[#FFFFFF] border-b border-[#075E43] shadow-md sticky top-0 z-40">
      {/* Top Strip: Mandi Badge & Connection on Left, Language & Logout on Right */}
      <div className="max-w-[1500px] mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex items-start justify-between gap-3 border-b border-[#075E43]/60 text-xs">
        
        {/* Left: Centre Identity with Connection Status directly below Mandi Name */}
        <div className="flex flex-col gap-1.5 min-w-0">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-md bg-[#075E43] flex items-center justify-center border border-[#0B6B4F] shrink-0">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#E7F3EC]" />
            </div>
            <div className="min-w-0">
              <div className="text-[9px] sm:text-[10px] text-[#85E1A9] uppercase tracking-wider font-bold truncate">
                APMC Mandi Floor Control
              </div>
              <div className="font-bold text-xs sm:text-sm text-[#FFFFFF] tracking-tight truncate">
                {operator?.centreName || ot.mandiCentreBadge}
              </div>
            </div>
          </div>

          {/* Connection Status Below Mandi Name */}
          <div className="flex items-center gap-2 pl-10 sm:pl-10.5">
            <button
              type="button"
              onClick={toggleOfflineMode}
              className={`px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold flex items-center gap-1.5 transition-colors border ${
                isOffline 
                  ? 'bg-[#EA8A0A]/20 text-[#EA8A0A] border-[#EA8A0A]/40' 
                  : 'bg-[#16803C]/20 text-[#85E1A9] border-[#16803C]/40'
              }`}
              title="Click to toggle simulated Offline Mode"
            >
              {isOffline ? (
                <>
                  <WifiOff className="w-3 h-3" />
                  <span>{ot.offlineBadge}</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3 h-3 animate-pulse" />
                  <span>{ot.onlineBadge}</span>
                </>
              )}
            </button>

            {pendingSyncCount > 0 && (
              <button
                type="button"
                onClick={() => syncOfflineQueue()}
                className="bg-[#EA8A0A] hover:bg-[#D97706] text-[#FFFFFF] px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold flex items-center gap-1 sm:gap-1.5 transition-colors shadow-sm"
                title="Synchronize local operations with cloud backend"
              >
                <RefreshCw className="w-2.5 h-2.5 sm:w-3 sm:h-3 animate-spin" />
                <span>{pendingSyncCount} {ot.pendingSync}</span>
              </button>
            )}
          </div>
        </div>

        {/* Right: Language on the Right, and below it Log Out button */}
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <div className="flex items-center gap-2">
            {/* Operator Badge (Desktop/Tablet) */}
            <div className="hidden lg:flex flex-col text-right mr-1">
              <span className="font-bold text-[#FFFFFF] text-xs leading-tight">
                {operator?.name || 'Sh. Rajesh Kumar'}
              </span>
              <span className="text-[10px] text-[#85E1A9]">
                {operator?.operatorId || 'OP-SAMRALA-01'} • Mandi In-Charge
              </span>
            </div>
            {/* Language Dropdown Aligned Right */}
            <LanguageDropdown variant="header" align="right" />
          </div>

          {/* Logout Button Below Language */}
          <button
            type="button"
            onClick={logout}
            className="bg-[#B42318]/20 hover:bg-[#B42318]/30 text-[#F0C2C2] text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-[6px] border border-[#B42318]/30 transition-colors flex items-center gap-1.5 shrink-0"
            title="Logout from Operator Portal"
          >
            <LogOut className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>{ot.logoutBtn}</span>
          </button>
        </div>
      </div>

      {/* Operator Navigation Tabs */}
      <div className="max-w-[1500px] mx-auto px-2 sm:px-6 flex items-center gap-1 overflow-x-auto py-1 text-xs no-scrollbar">
        <button
          type="button"
          onClick={() => setOperatorActiveTab('dashboard')}
          className={`px-3 py-2 rounded-t-[6px] font-bold flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
            operatorActiveTab === 'dashboard'
              ? 'bg-[#075E43] text-[#FFFFFF] border-[#85E1A9]'
              : 'text-[#CBD8D1] hover:text-[#FFFFFF] hover:bg-[#075E43]/40 border-transparent'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{ot.tabDashboard}</span>
        </button>

        <button
          type="button"
          onClick={() => setOperatorActiveTab('queue')}
          className={`px-3 py-2 rounded-t-[6px] font-bold flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
            operatorActiveTab === 'queue'
              ? 'bg-[#075E43] text-[#FFFFFF] border-[#85E1A9]'
              : 'text-[#CBD8D1] hover:text-[#FFFFFF] hover:bg-[#075E43]/40 border-transparent'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#16803C] animate-pulse"></span>
          <span>{ot.tabQueue}</span>
        </button>

        <button
          type="button"
          onClick={() => setOperatorActiveTab('bookings')}
          className={`px-3 py-2 rounded-t-[6px] font-bold flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
            operatorActiveTab === 'bookings'
              ? 'bg-[#075E43] text-[#FFFFFF] border-[#85E1A9]'
              : 'text-[#CBD8D1] hover:text-[#FFFFFF] hover:bg-[#075E43]/40 border-transparent'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>{ot.tabBookings}</span>
        </button>

        <button
          type="button"
          onClick={() => setOperatorActiveTab('procurement')}
          className={`px-3 py-2 rounded-t-[6px] font-bold flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
            operatorActiveTab === 'procurement'
              ? 'bg-[#075E43] text-[#FFFFFF] border-[#85E1A9]'
              : 'text-[#CBD8D1] hover:text-[#FFFFFF] hover:bg-[#075E43]/40 border-transparent'
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>{ot.tabProcurement}</span>
        </button>

        <button
          type="button"
          onClick={() => setOperatorActiveTab('payments')}
          className={`px-3 py-2 rounded-t-[6px] font-bold flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
            operatorActiveTab === 'payments'
              ? 'bg-[#075E43] text-[#FFFFFF] border-[#85E1A9]'
              : 'text-[#CBD8D1] hover:text-[#FFFFFF] hover:bg-[#075E43]/40 border-transparent'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>{ot.tabPayments}</span>
        </button>

        <button
          type="button"
          onClick={() => setOperatorActiveTab('analytics')}
          className={`px-3 py-2 rounded-t-[6px] font-bold flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
            operatorActiveTab === 'analytics'
              ? 'bg-[#075E43] text-[#FFFFFF] border-[#85E1A9]'
              : 'text-[#CBD8D1] hover:text-[#FFFFFF] hover:bg-[#075E43]/40 border-transparent'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>{ot.tabAnalytics}</span>
        </button>

        <button
          type="button"
          onClick={() => setOperatorActiveTab('ai_insights')}
          className={`px-3 py-2 rounded-t-[6px] font-bold flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
            operatorActiveTab === 'ai_insights'
              ? 'bg-[#075E43] text-[#FFFFFF] border-[#85E1A9]'
              : 'text-[#CBD8D1] hover:text-[#FFFFFF] hover:bg-[#075E43]/40 border-transparent'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#EA8A0A]" />
          <span>{ot.tabAiInsights}</span>
        </button>

        <button
          type="button"
          onClick={() => setOperatorActiveTab('offline')}
          className={`px-3 py-2 rounded-t-[6px] font-bold flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
            operatorActiveTab === 'offline'
              ? 'bg-[#075E43] text-[#FFFFFF] border-[#85E1A9]'
              : 'text-[#CBD8D1] hover:text-[#FFFFFF] hover:bg-[#075E43]/40 border-transparent'
          }`}
        >
          <HardDrive className="w-3.5 h-3.5" />
          <span>{ot.tabOffline}</span>
          {pendingSyncCount > 0 && (
            <span className="ml-1 bg-[#EA8A0A] text-white text-[10px] px-1.5 py-0.2 rounded-full">
              {pendingSyncCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
