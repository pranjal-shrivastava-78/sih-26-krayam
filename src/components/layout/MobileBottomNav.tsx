import React from 'react';
import { useApp } from '../../context/AppContext';
import { ActiveView } from '../../types';
import { 
  Home, 
  CalendarPlus, 
  Activity, 
  History, 
  Menu
} from 'lucide-react';

interface MobileBottomNavProps {
  onOpenMore?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenMore }) => {
  const { activeView, setActiveView } = useApp();

  const navItems: {
    id: ActiveView | 'more';
    label: string;
    labelHi: string;
    icon: React.ElementType;
  }[] = [
    { id: 'dashboard', label: 'Home', labelHi: 'होम', icon: Home },
    { id: 'booking', label: 'Book', labelHi: 'बुक', icon: CalendarPlus },
    { id: 'tracking', label: 'Queue', labelHi: 'कतार', icon: Activity },
    { id: 'history', label: 'History', labelHi: 'इतिहास', icon: History },
    { id: 'more', label: 'More', labelHi: 'अधिक', icon: Menu },
  ];

  return (
    <nav 
      aria-label="Mobile Bottom Navigation" 
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF] border-t border-[#CBD8D1] shadow-[0_-2px_6px_rgba(0,0,0,0.06)] lg:hidden pb-safe"
    >
      <div className="grid grid-cols-5 h-15 max-w-lg mx-auto items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          const handleClick = () => {
            if (item.id === 'more') {
              if (onOpenMore) onOpenMore();
            } else {
              setActiveView(item.id);
            }
          };

          return (
            <button
              key={item.id}
              onClick={handleClick}
              className={`flex flex-col items-center justify-center py-2 transition-colors ${
                isActive 
                  ? 'text-[#063B2A] font-bold bg-[#E7F3EC]' 
                  : 'text-[#66736D] hover:text-[#17231F]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#063B2A]' : 'text-[#66736D]'}`} />
              <span className="text-[11px] mt-0.5 leading-none">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
