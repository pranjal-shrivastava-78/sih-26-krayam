import React from 'react';
import { useApp } from '../../context/AppContext';
import { ActiveView, Language } from '../../types';
import { 
  LayoutDashboard,
  Activity, 
  CalendarPlus, 
  MapPin, 
  IndianRupee, 
  History, 
  Bell, 
  HelpCircle,
  Settings,
  X,
  CheckCircle2,
  ShieldCheck,
  User,
  ExternalLink,
  Globe
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { 
    activeView, 
    setActiveView, 
    farmer, 
    unreadCount, 
    setIsHelpModalOpen, 
    setIsSettingsModalOpen,
    language,
    setLanguage
  } = useApp();

  // All 7 Services for Desktop
  const desktopServices: {
    id: ActiveView;
    titleEn: string;
    titleHi: string;
    icon: React.ElementType;
    badge?: number;
  }[] = [
    { 
      id: 'dashboard', 
      titleEn: 'Dashboard', 
      titleHi: 'मुख्य पृष्ठ', 
      icon: LayoutDashboard 
    },
    { 
      id: 'tracking', 
      titleEn: 'Queue Track', 
      titleHi: 'कतार की स्थिति', 
      icon: Activity 
    },
    { 
      id: 'booking', 
      titleEn: 'Book Slot', 
      titleHi: 'स्लॉट बुक करें', 
      icon: CalendarPlus 
    },
    { 
      id: 'centres', 
      titleEn: 'Centres', 
      titleHi: 'क्रय केंद्र', 
      icon: MapPin 
    },
    { 
      id: 'procurement', 
      titleEn: 'Procurement & DBT', 
      titleHi: 'तौल एवं भुगतान', 
      icon: IndianRupee 
    },
    { 
      id: 'history', 
      titleEn: 'History', 
      titleHi: 'गतिविधि एवं लेन-देन', 
      icon: History 
    },
    { 
      id: 'notifications', 
      titleEn: 'Alerts', 
      titleHi: 'सूचनाएं', 
      icon: Bell,
      badge: unreadCount 
    },
  ];

  // Additional Services specifically for Mobile (excluding the 4 tabs pinned on the bottom bar: Home, Book, Queue, History)
  const mobileAdditionalServices: {
    id: ActiveView;
    titleEn: string;
    titleHi: string;
    desc: string;
    icon: React.ElementType;
    badge?: number;
  }[] = [
    { 
      id: 'centres', 
      titleEn: 'Procurement Centres', 
      titleHi: 'क्रय केंद्र एवं मानचित्र', 
      desc: 'Mandi locator, distances & slot availability',
      icon: MapPin 
    },
    { 
      id: 'procurement', 
      titleEn: 'Procurement & DBT', 
      titleHi: 'तौल एवं बैंक भुगतान', 
      desc: 'Intake weighbridge slips & PFMS transfer logs',
      icon: IndianRupee 
    },
    { 
      id: 'notifications', 
      titleEn: 'Alerts & Notices', 
      titleHi: 'सूचनाएं एवं दिशानिर्देश', 
      desc: 'Queue updates & MSP notifications',
      icon: Bell,
      badge: unreadCount 
    },
    { 
      id: 'profile', 
      titleEn: 'Farmer Profile & Land', 
      titleHi: 'किसान विवरण एवं भूमि', 
      desc: 'Aadhaar e-KYC, Jamabandi & bank account',
      icon: User 
    },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'pa', label: 'ਪੰਜਾਬੀ' },
    { code: 'mr', label: 'मराठी' },
  ];

  const handleNavClick = (view: ActiveView) => {
    setActiveView(view);
    onClose();
  };

  return (
    <>
      {/* ────────────────────────────────────────────────────────────────
          1. DESKTOP SIDEBAR (Visible on lg screens, perfectly aligned 
             underneath the government header with 280px fixed width)
      ──────────────────────────────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-[280px] shrink-0 bg-[#063B2A] text-[#FFFFFF] border-r border-[#0B4734] sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto justify-between pb-6 select-none">
        <div>
          {/* Section 7: Farmer Profile Panel (Official Identity Block) */}
          {farmer && (
            <div className="p-3.5 mx-3.5 mt-4 mb-2 rounded-[8px] bg-[#075E43]/70 border border-[#16845F]/60">
              <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-[#CBD8D1] pb-2 border-b border-[#16845F]/40 mb-2">
                <span className="flex items-center gap-1.5 text-[#E7F3EC]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E7F3EC]" />
                  Verified Farmer
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16803C]" />
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#063B2A] border border-[#CBD8D1] flex items-center justify-center text-[#FFFFFF] flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4 text-[#CBD8D1]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-[#FFFFFF] truncate leading-tight">
                    {farmer.fullName}
                  </div>
                  <div className="text-xs font-mono text-[#CBD8D1] mt-0.5">
                    Farmer ID: {farmer.farmerId}
                  </div>
                  <div className="text-[11px] text-[#E7F3EC] truncate mt-0.5">
                    {farmer.location.village}, {farmer.location.district}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 6: Main Services Navigation */}
          <div className="px-3.5 py-2">
            <div className="text-[10px] uppercase tracking-wider text-[#CBD8D1] font-bold px-2 mb-2">
              Main Services / मुख्य सेवाएं
            </div>

            <nav className="space-y-1">
              {desktopServices.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[6px] text-left transition-colors relative ${
                      isActive
                        ? 'bg-[#E7F3EC] text-[#063B2A] font-bold border border-[#CBD8D1]'
                        : 'text-[#E7F3EC] hover:bg-[#075E43] hover:text-[#FFFFFF]'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#063B2A] rounded-r" />
                    )}

                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#063B2A]' : 'text-[#CBD8D1]'}`} />
                      <div className="leading-tight truncate">
                        <div className="text-[13px]">{item.titleEn}</div>
                        <div className={`text-[10px] font-['Noto_Sans_Devanagari'] ${isActive ? 'text-[#075E43]' : 'text-[#CBD8D1]'}`}>
                          {item.titleHi}
                        </div>
                      </div>
                    </div>

                    {item.badge !== undefined && item.badge > 0 && (
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                        isActive ? 'bg-[#063B2A] text-[#FFFFFF]' : 'bg-[#D97706] text-[#FFFFFF]'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Sidebar Footer: Help & Support, Settings, Version */}
        <div className="p-3 mx-3.5 border-t border-[#0B4734] bg-[#04261B] rounded-[6px] space-y-1">
          <button
            onClick={() => setIsHelpModalOpen(true)}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[6px] text-xs text-[#E7F3EC] hover:bg-[#075E43] transition-colors text-left"
          >
            <HelpCircle className="w-4 h-4 text-[#CBD8D1]" />
            <div className="leading-tight">
              <div>Help & Support</div>
              <div className="text-[10px] text-[#CBD8D1] font-['Noto_Sans_Devanagari']">सहायता (1800-180-1551)</div>
            </div>
          </button>

          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[6px] text-xs text-[#E7F3EC] hover:bg-[#075E43] transition-colors text-left"
          >
            <Settings className="w-4 h-4 text-[#CBD8D1]" />
            <div className="leading-tight">
              <div>Settings</div>
              <div className="text-[10px] text-[#CBD8D1] font-['Noto_Sans_Devanagari']">पोर्टल सेटिंग्स</div>
            </div>
          </button>

          <div className="pt-2 border-t border-[#0B4734]/60 flex items-center justify-between text-[10px] text-[#CBD8D1] px-3">
            <span>Official Portal</span>
            <span className="font-mono">v2.4.0</span>
          </div>
        </div>
      </aside>

      {/* ────────────────────────────────────────────────────────────────
          2. MOBILE DRAWER (Tailored specifically for Phone Viewport!
             Does NOT duplicate the 4 items pinned on the bottom bar:
             Home, Book, Queue, History. Instead, highlights Additional
             Services, Farmer Identity, Support, and Settings!)
      ──────────────────────────────────────────────────────────────── */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop overlay */}
          <div 
            onClick={onClose}
            className="fixed inset-0 bg-[#063B2A]/70 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer container */}
          <div className="fixed inset-y-0 left-0 w-[310px] sm:w-[340px] bg-[#063B2A] text-[#FFFFFF] shadow-2xl flex flex-col justify-between z-50 overflow-y-auto pb-safe">
            <div>
              {/* Drawer Top Bar */}
              <div className="p-4 border-b border-[#0B4734] flex items-center justify-between bg-[#04261B]">
                <div>
                  <div className="font-bold text-base text-[#FFFFFF] tracking-tight flex items-center gap-2">
                    <span>KRAYAM Portal</span>
                    <span className="text-[10px] font-normal uppercase text-[#CBD8D1] bg-[#075E43] px-1.5 py-0.5 rounded">
                      Gov Menu
                    </span>
                  </div>
                  <div className="text-[11px] text-[#CBD8D1] font-['Noto_Sans_Devanagari']">
                    अतिरिक्त सेवाएं एवं किसान खाता
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-[6px] text-[#CBD8D1] hover:text-[#FFFFFF] hover:bg-[#075E43] active:scale-95"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Verified Farmer Profile Block */}
              {farmer && (
                <div className="p-3.5 mx-3.5 my-3 rounded-[8px] bg-[#075E43]/70 border border-[#16845F]/60">
                  <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-[#CBD8D1] pb-2 border-b border-[#16845F]/40 mb-2">
                    <span className="flex items-center gap-1.5 text-[#E7F3EC]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#E7F3EC]" />
                      Verified Farmer
                    </span>
                    <span className="text-[10px] font-mono text-[#CBD8D1]">{farmer.farmerId}</span>
                  </div>

                  <div className="text-sm font-bold text-[#FFFFFF] leading-tight">
                    {farmer.fullName}
                  </div>
                  <div className="text-[11px] text-[#E7F3EC] mt-0.5">
                    {farmer.location.village}, {farmer.location.district}
                  </div>

                  <button
                    onClick={() => handleNavClick('profile')}
                    className="mt-2.5 w-full h-8 px-2.5 rounded-[4px] bg-[#063B2A] hover:bg-[#04261B] text-[#E7F3EC] text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#16845F]"
                  >
                    <User className="w-3 h-3" />
                    <span>View Full Profile & Land</span>
                  </button>
                </div>
              )}

              {/* Mobile: Additional Government Services (Not on Bottom Bar) */}
              <div className="px-3.5 py-2">
                <div className="flex items-center justify-between px-2 mb-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#CBD8D1] font-bold">
                    Additional Services / अन्य सेवाएं
                  </span>
                  <span className="text-[9px] text-[#CBD8D1] bg-[#075E43] px-1.5 py-0.2 rounded">
                    Mandi Grid
                  </span>
                </div>

                <div className="space-y-1.5">
                  {mobileAdditionalServices.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeView === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-[6px] text-left transition-colors ${
                          isActive
                            ? 'bg-[#E7F3EC] text-[#063B2A] font-bold border border-[#CBD8D1]'
                            : 'text-[#E7F3EC] hover:bg-[#075E43] hover:text-[#FFFFFF] bg-[#075E43]/40 border border-[#0B4734]'
                        }`}
                      >
                        <div className="flex items-start gap-2.5 min-w-0">
                          <div className={`p-1.5 rounded ${isActive ? 'bg-[#063B2A] text-[#E7F3EC]' : 'bg-[#075E43] text-[#CBD8D1]'}`}>
                            <Icon className="w-4 h-4 flex-shrink-0" />
                          </div>
                          <div className="leading-tight truncate">
                            <div className="text-xs font-bold">{item.titleEn}</div>
                            <div className={`text-[10px] font-['Noto_Sans_Devanagari'] ${isActive ? 'text-[#075E43]' : 'text-[#CBD8D1]'}`}>
                              {item.titleHi}
                            </div>
                            <div className={`text-[10px] mt-0.5 truncate ${isActive ? 'text-[#34443D]' : 'text-[#CBD8D1]/80'}`}>
                              {item.desc}
                            </div>
                          </div>
                        </div>

                        {item.badge !== undefined && item.badge > 0 && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#D97706] text-[#FFFFFF] flex-shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Bar Reminder Strip (Explains why Home/Book/Queue/History aren't duplicated) */}
              <div className="mx-3.5 my-2 p-2.5 rounded-[6px] bg-[#04261B] border border-[#0B4734] text-[11px] text-[#CBD8D1]">
                <div className="font-bold text-[#E7F3EC] mb-1">
                  Primary Daily Actions:
                </div>
                <div className="text-[10px] text-[#CBD8D1] leading-relaxed">
                  Home • Book • Queue • History are pinned to the bottom bar for instant 1-tap access.
                </div>
              </div>
            </div>

            {/* Mobile Drawer Bottom: Language & Support */}
            <div className="p-3.5 border-t border-[#0B4734] bg-[#04261B] space-y-2">
              {/* Language Switcher */}
              <div className="flex items-center justify-between text-xs text-[#CBD8D1] pb-2 border-b border-[#0B4734]">
                <span className="flex items-center gap-1 text-[11px]">
                  <Globe className="w-3.5 h-3.5 text-[#CBD8D1]" />
                  Language:
                </span>
                <div className="flex items-center gap-1">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setLanguage(l.code)}
                      className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                        language === l.code
                          ? 'bg-[#E7F3EC] text-[#063B2A] font-bold'
                          : 'text-[#CBD8D1] hover:bg-[#075E43]'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => { setIsHelpModalOpen(true); onClose(); }}
                  className="h-9 px-2.5 rounded-[6px] bg-[#075E43] hover:bg-[#0B6B4F] text-[#FFFFFF] text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Help (1800)</span>
                </button>

                <button
                  onClick={() => { setIsSettingsModalOpen(true); onClose(); }}
                  className="h-9 px-2.5 rounded-[6px] bg-[#075E43] hover:bg-[#0B6B4F] text-[#FFFFFF] text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
