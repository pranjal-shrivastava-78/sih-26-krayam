import React from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumb: React.FC = () => {
  const { activeView, setActiveView, t } = useApp();

  const getViewData = () => {
    switch (activeView) {
      case 'dashboard':
        return { en: 'Dashboard', hi: 'मुख्य पृष्ठ' };
      case 'tracking':
        return { en: 'Queue Track', hi: 'कतार की स्थिति' };
      case 'booking':
        return { en: 'Book Slot', hi: 'स्लॉट बुक करें' };
      case 'centres':
        return { en: 'Centres', hi: 'क्रय केंद्र' };
      case 'procurement':
        return { en: 'Procurement & DBT', hi: 'तौल एवं भुगतान' };
      case 'history':
        return { en: 'Transaction History', hi: 'गतिविधि एवं लेन-देन' };
      case 'notifications':
        return { en: 'Alerts & Notices', hi: 'सूचनाएं एवं अलर्ट' };
      case 'profile':
        return { en: 'Farmer Profile', hi: 'किसान विवरण' };
      default:
        return { en: 'Home', hi: 'होम' };
    }
  };

  const current = getViewData();

  return (
    <nav aria-label="Breadcrumb" className="w-full bg-[#EDF3EF] border-b border-[#CBD8D1] py-2 px-4 sm:px-6">
      <div className="max-w-[1440px] mx-auto flex items-center gap-1.5 text-xs sm:text-[13px] text-[#66736D]">
        <button
          onClick={() => setActiveView('dashboard')}
          className="flex items-center gap-1 hover:text-[#063B2A] transition-colors"
          title="Go to Home"
        >
          <Home className="w-3.5 h-3.5 text-[#075E43]" />
          <span>Home</span>
        </button>

        {activeView !== 'dashboard' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-[#66736D] flex-shrink-0" />
            <span className="font-semibold text-[#17231F]">
              {current.en} <span className="font-normal text-[#34443D] font-['Noto_Sans_Devanagari']">({current.hi})</span>
            </span>
          </>
        )}
      </div>
    </nav>
  );
};
