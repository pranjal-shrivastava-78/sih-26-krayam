import React from 'react';
import { useApp } from '../../context/AppContext';
import { ActiveView } from '../../types';
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
  User
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
    setIsSettingsModalOpen 
  } = useApp();

  const mainServices: {
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
      titleEn: 'Procurement', 
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

  const handleNavClick = (view: ActiveView) => {
    setActiveView(view);
    onClose();
  };

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-[#063B2A]/70 z-40 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Official Government Sidebar */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-72 sm:w-76 bg-[#063B2A] text-[#FFFFFF] border-r border-[#0B4734] flex flex-col justify-between transition-transform duration-200 ease-in-out pb-safe
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex-1 overflow-y-auto">
          {/* Header Branding */}
          <div className="p-4 border-b border-[#0B4734] flex items-center justify-between">
            <div>
              <div className="font-bold text-lg text-[#FFFFFF] tracking-tight flex items-center gap-2">
                <span>KRAYAM</span>
                <span className="text-[10px] font-normal uppercase tracking-wider text-[#CBD8D1] bg-[#075E43] px-1.5 py-0.5 rounded-[4px]">
                  Gov Portal
                </span>
              </div>
              <div className="text-[11px] text-[#CBD8D1] font-['Noto_Sans_Devanagari'] mt-0.5">
                किसान हेतु कृषि उपज क्रय पोर्टल
              </div>
            </div>

            {/* Close button for mobile */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-[6px] text-[#CBD8D1] hover:text-[#FFFFFF] hover:bg-[#075E43] lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Section 7: Farmer Profile Panel (Official Identity Block) */}
          {farmer && (
            <div className="p-3.5 mx-3 my-3.5 rounded-[8px] bg-[#075E43]/70 border border-[#16845F]/60">
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
          <div className="px-3 py-2">
            <div className="text-[10px] uppercase tracking-wider text-[#CBD8D1] font-bold px-2 mb-2">
              Main Services / मुख्य सेवाएं
            </div>

            <nav className="space-y-1">
              {mainServices.map((item) => {
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
                    {/* Left active green accent line */}
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
        <div className="p-3 border-t border-[#0B4734] bg-[#04261B] space-y-1">
          <button
            onClick={() => { setIsHelpModalOpen(true); onClose(); }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[6px] text-xs text-[#E7F3EC] hover:bg-[#075E43] transition-colors text-left"
          >
            <HelpCircle className="w-4 h-4 text-[#CBD8D1]" />
            <div className="leading-tight">
              <div>Help & Support</div>
              <div className="text-[10px] text-[#CBD8D1] font-['Noto_Sans_Devanagari']">सहायता एवं दिशानिर्देश</div>
            </div>
          </button>

          <button
            onClick={() => { setIsSettingsModalOpen(true); onClose(); }}
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
            <span className="font-mono">Version 2.4.0</span>
          </div>
        </div>
      </aside>
    </>
  );
};
