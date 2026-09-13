import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Emblem } from './Emblem';
import { LanguageDropdown } from '../common/LanguageDropdown';
import { Bell, Menu, ChevronDown, UserCheck, LogOut, LogIn, ShieldCheck } from 'lucide-react';

interface GovernmentHeaderProps {
  onOpenSidebar: () => void;
}

export const GovernmentHeader: React.FC<GovernmentHeaderProps> = ({ onOpenSidebar }) => {
  const { 
    farmer, 
    unreadCount, 
    activeView, 
    setActiveView, 
    t,
    isLoggedIn,
    logout
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#FFFFFF] border-b border-[#CBD8D1] sticky top-0 z-30 shadow-xs">
      {/* Official Top National Identity Stripe */}
      <div className="w-full bg-[#063B2A] text-[#FFFFFF] text-[11px] py-1 px-4 sm:px-6">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <span className="font-medium tracking-wide flex items-center gap-2">
            <span>{t('govOfIndia')}</span>
            <span className="hidden lg:inline text-[#A3D99D] text-[10px] bg-[#075E43] px-2 py-0.5 rounded border border-[#16845F]">
              {t('fastApiConnected')}
            </span>
          </span>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-[#CBD8D1]">
              {t('ministryName')}
            </span>
            {/* Top Right Indian Languages Dropdown */}
            <LanguageDropdown variant="header" />
          </div>
        </div>
      </div>

      {/* Main Official Header Area */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Left: Mobile Toggle + Emblem + User Sprout Logo + Portal Identity */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
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
              className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group flex-shrink-0"
            >
              <div className="text-[#063B2A] flex-shrink-0">
                <Emblem className="w-7 h-9 sm:w-8 sm:h-10" />
              </div>

              {/* Seedling / Sprout Brand Logo */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] overflow-hidden border border-[#CBD8D1] shadow-xs flex-shrink-0 bg-[#075E43]">
                <img 
                  src="/logo.png" 
                  alt="KRAYAM Seedling Logo" 
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="border-l border-[#CBD8D1] pl-2 sm:pl-2.5 hidden sm:block leading-tight">
                <div className="text-[11px] font-semibold text-[#17231F]">
                  {t('govOfIndia')}
                </div>
                <div className="text-[10px] text-[#66736D]">
                  Government of India
                </div>
                <div className="text-[10px] font-medium text-[#34443D] mt-0.5 line-clamp-1">
                  {t('ministryName')}
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
                  {t('appTitle')}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-[4px] bg-[#E7F3EC] text-[#075E43] border border-[#CBD8D1] hidden lg:inline">
                  Portal
                </span>
              </div>
              <div className="text-xs font-semibold text-[#075E43] truncate leading-tight">
                {t('appSubtitle')}
              </div>
            </div>
          </div>

          {/* Right: Notification Bell & Farmer Identity Block */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 relative">
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

            {/* Farmer Identity Badge or Login/Register Button */}
            {isLoggedIn && farmer ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-[6px] border transition-colors text-left ${
                    isUserMenuOpen || activeView === 'profile'
                      ? 'bg-[#E7F3EC] border-[#075E43]'
                      : 'bg-[#FFFFFF] border-[#CBD8D1] hover:bg-[#F3F9F5]'
                  }`}
                  title="Farmer Account Options"
                >
                  <div className="w-7 h-7 rounded-full bg-[#063B2A] text-[#E7F3EC] flex items-center justify-center text-xs font-bold flex-shrink-0">
                    <UserCheck className="w-4 h-4 text-[#E7F3EC]" />
                  </div>
                  <div className="hidden sm:block leading-tight">
                    <div className="text-xs font-bold text-[#17231F] truncate max-w-[130px]">
                      {farmer.fullName}
                    </div>
                    <div className="text-[10px] font-mono text-[#66736D]">
                      {farmer.farmerId}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#66736D]" />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-1 w-56 bg-[#FFFFFF] border border-[#CBD8D1] rounded-[8px] shadow-lg py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-2 border-b border-[#EDF3EF]">
                      <div className="text-xs font-bold text-[#17231F]">{farmer.fullName}</div>
                      <div className="text-[10px] text-[#66736D] font-mono">{farmer.farmerId}</div>
                      <div className="text-[10px] text-[#075E43] font-medium mt-0.5">
                        {farmer.location.village}, {farmer.location.district}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setActiveView('profile');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-[#17231F] hover:bg-[#F5F8F6] flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#075E43]" />
                      <span>View Full Profile & Land</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveView('auth');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-[#17231F] hover:bg-[#F5F8F6] flex items-center gap-2"
                    >
                      <LogIn className="w-4 h-4 text-[#075E43]" />
                      <span>Switch Account / Register</span>
                    </button>

                    <div className="border-t border-[#EDF3EF] my-1" />

                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-[#DC2626] hover:bg-[#FEF2F2] flex items-center gap-2 font-medium"
                    >
                      <LogOut className="w-4 h-4 text-[#DC2626]" />
                      <span>Sign Out (लॉग आउट)</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setActiveView('auth')}
                className="h-9 px-3 sm:px-4 rounded-[6px] bg-[#075E43] hover:bg-[#063B2A] text-[#FFFFFF] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <LogIn className="w-4 h-4" />
                <span>Login / Register</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
