import React from 'react';

export const GovernmentFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#FFFFFF] border-t border-[#CBD8D1] py-4 text-xs text-[#34443D] mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Bottom Attribution & Version */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#66736D] text-center sm:text-left">
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

