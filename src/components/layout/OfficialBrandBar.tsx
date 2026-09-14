import React from 'react';
import { useApp } from '../../context/AppContext';
import { Emblem } from './Emblem';

interface OfficialBrandBarProps {
  onClick?: () => void;
  className?: string;
}

export const OfficialBrandBar: React.FC<OfficialBrandBarProps> = ({
  onClick,
  className = ""
}) => {
  const { t } = useApp();

  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-2.5 sm:gap-3.5 md:gap-4 cursor-pointer group min-w-0 ${className}`}
    >
      {/* 1. KRAYAM Sprout Logo */}
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-[8px] sm:rounded-[10px] overflow-hidden border border-[#CBD8D1] shadow-xs flex-shrink-0 bg-[#075E43]">
        <img 
          src="/logo.png" 
          alt="KRAYAM Logo" 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* 2. KRAYAM Name & Subtitle */}
      <div className="min-w-0 flex-shrink-0">
        <div className="flex items-baseline">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-[#063B2A] leading-tight">
            {t('appTitle')}
          </span>
        </div>
        <div className="text-[10px] sm:text-xs font-semibold text-[#075E43] truncate leading-tight mt-0.5">
          {t('appSubtitle')}
        </div>
      </div>

      {/* Vertical Divider 1: Between KRAYAM and National Identity */}
      <div className="h-8 sm:h-9 w-[1px] bg-[#CBD8D1] hidden md:block flex-shrink-0" />

      {/* 3. Ashok Emblem & Government of India Block */}
      <div className="hidden md:flex items-center gap-2 sm:gap-2.5 flex-shrink-0 text-left">
        <div className="flex-shrink-0 flex items-center">
          <Emblem className="h-9 sm:h-10 md:h-11 w-auto max-w-[44px]" alt="State Emblem of India" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-[11px] lg:text-[12px] font-bold text-[#17231F] tracking-tight whitespace-nowrap">
            भारत सरकार
          </span>
          <span className="text-[9px] lg:text-[10px] font-semibold text-[#5A6860] uppercase tracking-wider whitespace-nowrap mt-0.5">
            GOVERNMENT OF INDIA
          </span>
        </div>
      </div>

      {/* Vertical Divider 2: Between Government of India and Ministry */}
      <div className="h-7 lg:h-8 w-[1px] bg-[#CBD8D1] hidden md:block flex-shrink-0" />

      {/* 4. Ministry of Agriculture & Farmers Welfare */}
      <div className="hidden md:flex flex-col leading-tight text-left flex-shrink-0">
        <span className="text-[11px] lg:text-[12px] font-bold text-[#17231F] tracking-tight whitespace-nowrap">
          कृषि एवं किसान कल्याण मंत्रालय
        </span>
        <span className="text-[9px] lg:text-[10px] font-semibold text-[#5A6860] uppercase tracking-wider whitespace-nowrap mt-0.5">
          MINISTRY OF AGRICULTURE & FARMERS WELFARE
        </span>
      </div>
    </div>
  );
};
