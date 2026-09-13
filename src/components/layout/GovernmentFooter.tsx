import React from 'react';
import { useApp } from '../../context/AppContext';
import { Emblem } from './Emblem';

export const GovernmentFooter: React.FC = () => {
  const { setActiveView, setIsHelpModalOpen } = useApp();

  return (
    <footer className="w-full bg-[#FFFFFF] border-t border-[#CBD8D1] py-8 text-xs text-[#34443D] mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#CBD8D1] text-center md:text-left">
          {/* Official Emblem & Portal Title */}
          <div className="flex items-center gap-3">
            <div className="text-[#063B2A] flex-shrink-0">
              <Emblem className="w-8 h-10" />
            </div>
            <div>
              <div className="font-bold text-sm text-[#063B2A]">
                KRAYAM — कृषि उपज क्रय प्रबंधन प्रणाली
              </div>
              <div className="text-[11px] text-[#66736D]">
                Ministry of Agriculture & Farmers Welfare, Government of India
              </div>
              <div className="text-[10px] text-[#16803C] font-semibold mt-0.5">
                ● Designed for Farmers across India
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-5 gap-y-2 text-xs font-medium text-[#075E43]">
            <button onClick={() => setActiveView('dashboard')} className="hover:underline">Home</button>
            <span>•</span>
            <button onClick={() => setIsHelpModalOpen(true)} className="hover:underline">About KRAYAM</button>
            <span>•</span>
            <button onClick={() => setIsHelpModalOpen(true)} className="hover:underline">Help & Support</button>
            <span>•</span>
            <button onClick={() => setIsHelpModalOpen(true)} className="hover:underline">Contact Us</button>
            <span>•</span>
            <span className="text-[#66736D] cursor-pointer hover:underline">Privacy Policy</span>
            <span>•</span>
            <span className="text-[#66736D] cursor-pointer hover:underline">Terms of Use</span>
          </div>
        </div>

        {/* Bottom Attribution & Version */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#66736D] text-center sm:text-left">
          <div>
            © 2026 भारत सरकार | Government of India. All Rights Reserved.
          </div>
          <div className="flex items-center gap-3 font-mono text-[10px]">
            <span>National Agri-Procurement Network</span>
            <span>|</span>
            <span className="font-bold text-[#063B2A]">Version 2.4.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
