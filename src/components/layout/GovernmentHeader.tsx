import React from 'react';
import { useApp } from '../../context/AppContext';
import { Emblem } from './Emblem';
import { Bell, Menu, ChevronDown, UserCheck } from 'lucide-react';

interface GovernmentHeaderProps {
  onOpenSidebar: () => void;
}

export const GovernmentHeader: React.FC<GovernmentHeaderProps> = ({ onOpenSidebar }) => {
  const { 
    farmer, 
    unreadCount, 
    activeView, 
    setActiveView, 
    language, 
    setLanguage 
  } = useApp();

  return (
    <header className="w-full bg-[#FFFFFF] border-b border-[#CBD8D1] sticky top-0 z-30">
      {/* Official Top National Identity Stripe */}
      <div className="w-full bg-[#063B2A] text-[#FFFFFF] text-[11px] py-1 px-4 sm:px-6">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <span className="font-medium tracking-wide">
            भारत सरकार | Government of India
          </span>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-[#CBD8D1]">
              कृषि एवं किसान कल्याण मंत्रालय | Ministry of Agriculture & Farmers Welfare
            </span>
            <div className="flex items-center border border-[#16845F] rounded px-1.5 py-0.5 bg-[#075E43] text-[10px]">
              <button
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 rounded transition-colors ${language === 'en' ? 'bg-[#FFFFFF] text-[#063B2A] font-bold' : 'text-[#E7F3EC] hover:text-[#FFFFFF]'}`}
                aria-label="Switch to English"
              >
                English
              </button>
              <span className="text-[#16845F] px-1">|</span>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-1.5 py-0.5 rounded transition-colors ${language === 'hi' ? 'bg-[#FFFFFF] text-[#063B2A] font-bold' : 'text-[#E7F3EC] hover:text-[#FFFFFF]'}`}
                aria-label="हिंदी में बदलें"
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Official Header Area */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Left: Mobile Toggle + Emblem + Ministry + Portal Identity */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            {/* Mobile Menu Button */}
            <button
              onClick={onOpenSidebar}
              className="p-2 rounded-[6px] border border-[#CBD8D1] text-[#17231F] hover:bg-[#F3F9F5] lg:hidden flex-shrink-0"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 text-[#075E43]" />
            </button>

            {/* Emblem Area */}
            <div 
              onClick={() => setActiveView('dashboard')}
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group flex-shrink-0"
            >
              <div className="text-[#063B2A] flex-shrink-0">
                <Emblem className="w-8 h-10 sm:w-9 sm:h-11" />
              </div>
              <div className="border-l border-[#CBD8D1] pl-2.5 sm:pl-3 hidden sm:block leading-tight">
                <div className="text-[11px] font-semibold text-[#17231F] font-['Noto_Sans_Devanagari']">
                  भारत सरकार
                </div>
                <div className="text-[10px] text-[#66736D]">
                  Government of India
                </div>
                <div className="text-[10px] font-medium text-[#34443D] mt-0.5 line-clamp-1">
                  कृषि एवं किसान कल्याण मंत्रालय
                </div>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="h-9 w-[1px] bg-[#CBD8D1] hidden md:block" />

            {/* Portal Title & Subtitle */}
            <div 
              onClick={() => setActiveView('dashboard')}
              className="cursor-pointer min-w-0"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#063B2A]">
                  KRAYAM
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-[4px] bg-[#E7F3EC] text-[#075E43] border border-[#CBD8D1] hidden lg:inline">
                  Portal
                </span>
              </div>
              <div className="text-xs font-semibold text-[#075E43] font-['Noto_Sans_Devanagari'] truncate leading-tight">
                कृषि उपज क्रय प्रबंधन प्रणाली
              </div>
              <div className="text-[11px] text-[#66736D] truncate hidden sm:block leading-tight">
                Farmer Procurement Management System
              </div>
            </div>
          </div>

          {/* Right: Notification Bell & Farmer Identity Block */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Notification Bell */}
            <button
              onClick={() => setActiveView('notifications')}
              className={`relative p-2 rounded-[6px] border transition-colors ${
                activeView === 'notifications'
                  ? 'bg-[#E7F3EC] text-[#063B2A] border-[#075E43]'
                  : 'bg-[#FFFFFF] text-[#34443D] border-[#CBD8D1] hover:bg-[#F3F9F5]'
              }`}
              title="Alerts & Notices"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 text-[#075E43]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D97706] text-[#FFFFFF] font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Farmer Identity Badge in Header */}
            {farmer && (
              <button
                onClick={() => setActiveView('profile')}
                className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-[6px] border transition-colors text-left ${
                  activeView === 'profile'
                    ? 'bg-[#E7F3EC] border-[#075E43]'
                    : 'bg-[#FFFFFF] border-[#CBD8D1] hover:bg-[#F3F9F5]'
                }`}
                title="View Farmer Profile"
              >
                <div className="w-7 h-7 rounded-full bg-[#063B2A] text-[#E7F3EC] flex items-center justify-center text-xs font-bold flex-shrink-0">
                  <UserCheck className="w-4 h-4 text-[#E7F3EC]" />
                </div>
                <div className="hidden sm:block leading-tight">
                  <div className="text-xs font-bold text-[#17231F] truncate max-w-[150px]">
                    {farmer.fullName}
                  </div>
                  <div className="text-[10px] font-mono text-[#66736D]">
                    {farmer.farmerId}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#66736D] hidden sm:block" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
