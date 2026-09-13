import React, { useState } from 'react';
import { X, Megaphone } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AnnouncementBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { language } = useApp();

  if (!isVisible) return null;

  const announcements: Record<string, string> = {
    en: 'OFFICIAL NOTICE: Rabi Procurement 2026-27 Active. Wheat MSP Notified at ₹2,275/Qtl. Direct Bank Transfer (DBT) within 48 hours.',
    hi: 'आधिकारिक सूचना: रबी खरीद 2026-27 सक्रिय। गेहूं का न्यूनतम समर्थन मूल्य (MSP) ₹2,275/क्विंटल। 48 घंटे के भीतर सीधा बैंक ट्रांसफर।',
    pa: 'ਸਰਕਾਰੀ ਸੂਚਨਾ: ਹਾੜੀ ਖਰੀਦ 2026-27 ਚਾਲੂ। ਕਣਕ ਦਾ ਸਰਕਾਰੀ ਰੇਟ ₹2,275/ਕੁਇੰਟਲ। ਡੀ.ਬੀ.ਟੀ ਰਾਹੀਂ ਖਾਤੇ ਵਿੱਚ ਭੁਗਤਾਨ।',
    mr: 'शासकीय सूचना: रब्बी खरेदी 2026-27 सुरू. गहू हमीभाव दर ₹2,275/क्विंटल. 48 तासांत थेट बँक खात्यात रक्कम.',
  };

  return (
    <aside aria-label="Official announcement" className="w-full bg-[#075E43] text-[#FFFFFF] px-4 py-1.5 text-xs font-medium border-b border-[#063B2A] flex items-center justify-between z-30">
      <div className="max-w-[1440px] mx-auto flex items-center justify-center gap-2 text-center w-full pr-4">
        <span className="bg-[#D97706] text-[#FFFFFF] text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded">
          Notice
        </span>
        <span className="truncate">
          {announcements[language] || announcements.en}
        </span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="text-[#E7F3EC] hover:text-[#FFFFFF] p-1 flex-shrink-0"
        title="Dismiss announcement"
        aria-label="Close Announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
};
