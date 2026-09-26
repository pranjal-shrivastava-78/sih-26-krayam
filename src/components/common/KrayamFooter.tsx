import React from 'react';
import { useApp } from '../../context/AppContext';
import { Mail } from 'lucide-react';

interface KrayamFooterProps {
  className?: string;
}

export const KrayamFooter: React.FC<KrayamFooterProps> = ({ className = '' }) => {
  const { setIsPrivacyModalOpen, setIsTcModalOpen } = useApp();

  return (
    <footer 
      className={`relative w-full overflow-hidden bg-[#032316] text-white border-t-2 border-[#16A34A] shrink-0 select-none shadow-[0_-4px_16px_rgba(0,0,0,0.18)] z-20 ${className}`}
    >
      {/* ============================================================ */}
      {/* 1. SCENIC AGRICULTURAL SILHOUETTE BACKGROUND (Landscape + Tractor + Foliage) */}
      {/* ============================================================ */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        {/* Subtle Dark Forest Green Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#032216] via-[#053221] to-[#021F14]" />

        <svg
          className="w-full h-full object-cover opacity-35"
          viewBox="0 0 1440 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Distant Rolling Hills Layer */}
          <path
            d="M0,50 C200,26 400,64 620,38 C820,14 1000,54 1220,30 C1320,18 1390,32 1440,36 L1440,110 L0,110 Z"
            fill="#0D4F35"
            fillOpacity="0.6"
          />

          {/* Distant Trees on Background Hill */}
          <g fill="#0F5A3C" opacity="0.65">
            <circle cx="95" cy="44" r="8" />
            <circle cx="108" cy="47" r="6" />
            <circle cx="380" cy="46" r="10" />
            <circle cx="396" cy="49" r="7" />
            <circle cx="680" cy="34" r="9" />
            <circle cx="694" cy="37" r="6" />
            <circle cx="1140" cy="38" r="11" />
            <circle cx="1158" cy="41" r="8" />
          </g>

          {/* Mid Layer Rolling Hills */}
          <path
            d="M0,66 C220,48 450,78 700,56 C920,38 1140,70 1340,54 C1395,48 1425,54 1440,58 L1440,110 L0,110 Z"
            fill="#083824"
            fillOpacity="0.75"
          />

          {/* Mid Layer Trees */}
          <g fill="#062F1E">
            <circle cx="42" cy="62" r="11" />
            <circle cx="58" cy="66" r="8" />
            <circle cx="280" cy="70" r="7" />
            <circle cx="790" cy="64" r="8" />
            <circle cx="1280" cy="60" r="10" />
            <circle cx="1296" cy="64" r="7" />
          </g>

          {/* Tractor Silhouette in Field (Right-Center) */}
          <g fill="#042316" transform="translate(1015, 62) scale(0.68)">
            <rect x="18" y="2" width="16" height="18" rx="2" />
            <path d="M4 11 L18 11 L18 20 L4 20 Z" />
            <rect x="7" y="5" width="2" height="7" />
            <line x1="20" y1="8" x2="25" y2="12" stroke="#042316" strokeWidth="2" />
            <circle cx="28" cy="22" r="9" fill="#02160E" stroke="#042316" strokeWidth="2" />
            <circle cx="28" cy="22" r="4" fill="#0D4F35" />
            <circle cx="7" cy="24" r="5" fill="#02160E" stroke="#042316" strokeWidth="1.5" />
            <circle cx="7" cy="24" r="2" fill="#0D4F35" />
          </g>

          {/* Foreground Deep Silhouette Layer */}
          <path
            d="M0,84 C260,76 540,88 800,80 C1060,72 1300,84 1440,78 L1440,110 L0,110 Z"
            fill="#021C12"
          />
        </svg>

        {/* Left Corner Leaf Foliage Silhouette */}
        <div className="absolute -bottom-1 -left-2 w-24 h-24 opacity-30 pointer-events-none">
          <svg viewBox="0 0 100 100" fill="currentColor" className="text-[#22C55E]">
            <path d="M5,95 C25,75 20,45 45,35 C35,60 50,70 25,90 Z" />
            <path d="M20,90 C40,70 45,50 70,45 C55,65 65,80 40,90 Z" />
            <path d="M0,100 C15,85 35,90 40,100 Z" />
          </svg>
        </div>

        {/* Right Corner Leaf Foliage Silhouette */}
        <div className="absolute -bottom-1 -right-2 w-24 h-24 opacity-30 pointer-events-none transform scale-x-[-1]">
          <svg viewBox="0 0 100 100" fill="currentColor" className="text-[#22C55E]">
            <path d="M5,95 C25,75 20,45 45,35 C35,60 50,70 25,90 Z" />
            <path d="M20,90 C40,70 45,50 70,45 C55,65 65,80 40,90 Z" />
            <path d="M0,100 C15,85 35,90 40,100 Z" />
          </svg>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. MAIN FOOTER CONTENT CONTAINER */}
      {/* ============================================================ */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-2.5 relative z-10">
        
        {/* Upper Row: Compact Horizontal Alignment (Desktop) / Fluid Wrapped (Tablet/Mobile) */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-4 xl:gap-6">
          
          {/* ──────────────────────────────────────────────────────────── */}
          {/* GROUP 1: Logo + Tagline Section */}
          {/* ──────────────────────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-3.5 text-center sm:text-left w-full lg:w-auto justify-center lg:justify-start">
            
            {/* Logo Badge + KRAYAM Text */}
            <div className="flex items-center gap-2.5 shrink-0">
              {/* Green Squircle Leaf Icon */}
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#126A42] via-[#0A482C] to-[#042818] border border-[#22C55E]/40 flex items-center justify-center shadow-[0_0_14px_rgba(34,197,94,0.3)] shrink-0">
                <svg
                  className="w-5 h-5 text-[#4ADE80]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 20h10" />
                  <path d="M10 20c5.5-2.5.8-6.4 3-10" />
                  <path
                    d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4.1 5.5.8z"
                    fill="currentColor"
                    fillOpacity="0.85"
                  />
                  <path
                    d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"
                    fill="currentColor"
                    fillOpacity="0.85"
                  />
                </svg>
              </div>

              {/* Brand Name */}
              <span className="text-white font-black text-lg sm:text-xl tracking-wider leading-none">
                KRAYAM
              </span>
            </div>

            {/* Vertical Divider */}
            <div className="hidden sm:block h-7 w-px bg-white/20 shrink-0" />

            {/* Tagline + Pillars */}
            <div className="flex flex-col justify-center min-w-0">
              <div className="text-white text-xs sm:text-[13px] font-bold tracking-tight leading-snug">
                Smarter Procurement. Stronger Agriculture.
              </div>
              <div className="text-[#96D5B4] text-[10px] sm:text-[11px] font-medium leading-snug tracking-tight mt-0.5">
                Empowering Farmers | Transparent Markets | Sustainable Agriculture
              </div>
            </div>

          </div>

          {/* ──────────────────────────────────────────────────────────── */}
          {/* GROUP 2: Right Controls (Follow Us, Contact Us, Legal Links) */}
          {/* ──────────────────────────────────────────────────────────── */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 sm:gap-4 lg:gap-4 xl:gap-5 w-full lg:w-auto">
            
            {/* Desktop Vertical Divider */}
            <div className="hidden lg:block h-7 w-px bg-white/20 shrink-0" />

            {/* Follow Us Section */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              <span className="text-white font-bold text-xs sm:text-[13px] tracking-tight">
                Follow Us
              </span>
              
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Facebook */}
                <a
                  href="https://facebook.com/profile.php?id=61594948523891&sk=directory_links"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Krayam on Facebook"
                  title="Krayam on Facebook"
                  className="w-7 h-7 rounded-full bg-[#1877F2] flex items-center justify-center shadow-xs hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/krayam_aurions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Krayam on Instagram"
                  title="Krayam on Instagram"
                  className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] flex items-center justify-center shadow-xs hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-none stroke-white stroke-[2]" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>

                {/* X (formerly Twitter) */}
                <a
                  href="https://x.com/krayam_aurions"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Krayam on X"
                  title="Krayam on X"
                  className="w-7 h-7 rounded-full bg-black flex items-center justify-center shadow-xs border border-white/20 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                >
                  <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden sm:block h-7 w-px bg-white/20 shrink-0" />

            {/* Contact Us Section */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-7 h-7 rounded-full bg-[#A3E5C4] flex items-center justify-center shadow-xs shrink-0">
                <Mail className="w-3.5 h-3.5 text-[#053723]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-white font-bold text-xs sm:text-[13px] leading-tight">
                  Contact Us
                </span>
                <a
                  href="mailto:krayam.aurions@gmail.com"
                  className="text-[#CFEFE0] hover:text-white hover:underline text-[11px] sm:text-xs font-medium leading-tight transition-colors truncate"
                >
                  krayam.aurions@gmail.com
                </a>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden sm:block h-7 w-px bg-white/20 shrink-0" />

            {/* Legal Links (Privacy Policy & Terms & Conditions) */}
            <div className="flex items-center gap-2 text-xs sm:text-[13px] text-[#E0F2E9] shrink-0 font-medium">
              <button
                type="button"
                onClick={() => setIsPrivacyModalOpen(true)}
                className="hover:text-white hover:underline transition-colors py-0.5 cursor-pointer focus:outline-hidden"
              >
                Privacy Policy
              </button>
              <span className="text-white/30">|</span>
              <button
                type="button"
                onClick={() => setIsTcModalOpen(true)}
                className="hover:text-white hover:underline transition-colors py-0.5 cursor-pointer focus:outline-hidden"
              >
                Terms & Conditions
              </button>
            </div>

          </div>

        </div>

        {/* Lower Row: Copyright Notice */}
        <div className="mt-1.5 sm:mt-2 flex items-center justify-center sm:justify-start">
          <p className="text-[10px] sm:text-[11px] text-[#86C4A5] font-normal tracking-tight">
            © 2026 KRAYAM. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default KrayamFooter;
