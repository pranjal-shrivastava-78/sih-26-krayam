import React from 'react';
import { useApp } from '../../context/AppContext';
import { LanguageDropdown } from '../common/LanguageDropdown';
import { KrayamFooter } from '../common/KrayamFooter';
import { getHomeText } from '../../i18n/homeTranslations';
import {
  User,
  Sprout,
  Clock,
  ShieldCheck,
  IndianRupee,
  Users,
  Calendar,
  Scale,
  Warehouse,
  Sparkles,
  Bell,
  Layers,
} from 'lucide-react';

interface HomePageProps {
  onNavigateToAuth: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigateToAuth }) => {
  const { language, isLoggedIn, setActiveView } = useApp();
  const ht = getHomeText(language);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      setActiveView('dashboard');
    } else {
      onNavigateToAuth();
    }
  };

  const features = [
    {
      icon: Calendar,
      iconBg: 'bg-[#10B981]',
      title: ht.feature1Title,
      desc: ht.feature1Desc,
    },
    {
      icon: Users,
      iconBg: 'bg-[#F97316]',
      title: ht.feature2Title,
      desc: ht.feature2Desc,
    },
    {
      icon: Scale,
      iconBg: 'bg-[#8B5CF6]',
      title: ht.feature3Title,
      desc: ht.feature3Desc,
    },
    {
      icon: IndianRupee,
      iconBg: 'bg-[#F59E0B]',
      title: ht.feature4Title,
      desc: ht.feature4Desc,
    },
    {
      icon: Warehouse,
      iconBg: 'bg-[#3B82F6]',
      title: ht.feature5Title,
      desc: ht.feature5Desc,
    },
    {
      icon: Sparkles,
      iconBg: 'bg-[#EC4899]',
      title: ht.feature6Title,
      desc: ht.feature6Desc,
    },
    {
      icon: Bell,
      iconBg: 'bg-[#06B6D4]',
      title: ht.feature7Title,
      desc: ht.feature7Desc,
    },
    {
      icon: Layers,
      iconBg: 'bg-[#16A34A]',
      title: ht.feature8Title,
      desc: ht.feature8Desc,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F8F5] text-[#122A1E] font-['Inter',sans-serif] selection:bg-[#075E43] selection:text-white overflow-x-hidden w-full">
      
      {/* ============================================================ */}
      {/* 1. HEADER (No Home text link, real logo, lang selector, auth) */}
      {/* ============================================================ */}
      <header className="w-full bg-white border-b border-[#E3ECE6] sticky top-0 z-40 shadow-xs shrink-0">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Real KRAYAM Logo & Identity */}
          <div 
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none min-w-0 shrink"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 transition-transform group-hover:scale-105">
              <img
                src="/logo.png"
                alt="KRAYAM Logo"
                className="w-full h-full object-contain select-none"
              />
            </div>

            <div className="min-w-0 flex flex-col">
              <div className="text-base sm:text-xl font-black text-[#0B402E] tracking-tight leading-none">
                {ht.appTitle}
              </div>
              <div className="text-[9.5px] xs:text-[10.5px] sm:text-xs font-semibold text-[#1C7351] tracking-tight leading-none mt-1 truncate">
                {ht.appSubtitle}
              </div>
            </div>
          </div>

          {/* Right: Language Dropdown + Register / Log In Button */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <LanguageDropdown variant="modal" align="right" className="shrink-0" />

            <button
              type="button"
              id="krayam-home-login-btn"
              onClick={handleAuthClick}
              className="inline-flex items-center justify-center gap-1 sm:gap-2 bg-[#0B402B] hover:bg-[#0D5238] active:bg-[#083020] text-white px-2.5 sm:px-5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-xs hover:shadow-md cursor-pointer shrink-0 whitespace-nowrap"
            >
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
              <span>{isLoggedIn ? ht.goToDashboard : ht.registerLogin}</span>
            </button>
          </div>

        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. HERO SECTION */}
      {/* ============================================================ */}
      <section className="relative w-full overflow-hidden bg-cover bg-right lg:bg-center border-b border-[#DFECE4] shrink-0"
        style={{
          backgroundImage: "url('/assets/home/hero-bg-perfect.png')",
          backgroundColor: '#E7F2EB'
        }}
      >
        {/* Soft atmospheric gradient wash on mobile / tablet to guarantee 100% legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent lg:via-transparent lg:from-transparent pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6 min-h-[380px] lg:min-h-[420px]">
            
            {/* Left Hero Typography */}
            <div className="w-full lg:w-[50%] xl:w-[48%] flex flex-col justify-center">
              
              {/* Hero Badge */}
              <div className="inline-flex items-center gap-2 bg-[#E6F4ED]/90 backdrop-blur-xs border border-[#BFDFCD] text-[#0C5438] px-3.5 py-1 rounded-full text-xs font-semibold shadow-2xs w-fit mb-4">
                <Sprout className="w-3.5 h-3.5 text-[#0E7A50] shrink-0" />
                <span className="truncate">{ht.heroBadge}</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-black text-[#0A2E20] leading-[1.16] tracking-tight">
                {ht.heroTitleLine1}<br />
                {ht.heroTitleLine2}<br />
                {ht.heroTitleLine3}
              </h1>

              {/* Supporting Text */}
              <p className="mt-4 text-xs sm:text-sm lg:text-[14px] leading-relaxed text-[#2C4E40] max-w-xl font-medium">
                {ht.heroDescription}
              </p>

              {/* Mobile Farmer Visual Highlight (visible on small mobile where bg crops) */}
              <div className="mt-6 flex lg:hidden items-center justify-center">
                <div className="relative rounded-2xl overflow-hidden shadow-md border border-white/60 max-w-xs">
                  <img
                    src="/assets/home/farmer-hero.png"
                    alt="Farmer"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Spacer for center farmer visual in background on desktop */}
            <div className="hidden lg:block lg:flex-1" />

            {/* Right Hero: Floating Benefits Card */}
            <div className="w-full lg:w-auto shrink-0 flex justify-center lg:justify-end">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-[0_10px_35px_rgba(0,0,0,0.08)] border border-white/80 w-full sm:w-[300px] lg:w-[290px] xl:w-[310px] space-y-4">
                
                {/* Benefit 1 */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#E5F5EC] flex items-center justify-center text-[#0D6242] shrink-0">
                    <Sprout className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-[#0B3323] leading-snug">
                      {ht.benefit1Title}
                    </div>
                    <div className="text-[11px] text-[#4E6B5D] leading-tight mt-0.5">
                      {ht.benefit1Desc}
                    </div>
                  </div>
                </div>

                {/* Benefit 2 */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#E5F5EC] flex items-center justify-center text-[#0D6242] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-[#0B3323] leading-snug">
                      {ht.benefit2Title}
                    </div>
                    <div className="text-[11px] text-[#4E6B5D] leading-tight mt-0.5">
                      {ht.benefit2Desc}
                    </div>
                  </div>
                </div>

                {/* Benefit 3 */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#E5F5EC] flex items-center justify-center text-[#0D6242] shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-[#0B3323] leading-snug">
                      {ht.benefit3Title}
                    </div>
                    <div className="text-[11px] text-[#4E6B5D] leading-tight mt-0.5">
                      {ht.benefit3Desc}
                    </div>
                  </div>
                </div>

                {/* Benefit 4 */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#E5F5EC] flex items-center justify-center text-[#0D6242] shrink-0">
                    <IndianRupee className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-[#0B3323] leading-snug">
                      {ht.benefit4Title}
                    </div>
                    <div className="text-[11px] text-[#4E6B5D] leading-tight mt-0.5">
                      {ht.benefit4Desc}
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. FEATURES SECTION + PRODUCE IMAGE CARD */}
      {/* ============================================================ */}
      <section className="w-full bg-[#F2F8F4] py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-[1440px] mx-auto">
          
          {/* Section Header */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-[26px] font-black text-[#0B3626] tracking-tight">
              {ht.featuresTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#466557] font-medium mt-1 max-w-2xl">
              {ht.featuresSubtitle}
            </p>
          </div>

          {/* Grid Layout: 8 Feature Cards + Large Produce Image Card */}
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-stretch">
            
            {/* Left/Center: 8 Feature Cards organized as 4x2 grid */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
              {features.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-[#E3ECE6] hover:shadow-md hover:border-[#BFDFCD] transition-all flex flex-col justify-start"
                  >
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className={`w-8 h-8 rounded-xl ${item.iconBg} flex items-center justify-center text-white shrink-0 shadow-xs`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-[#0D3828] leading-snug">
                        {item.title}
                      </div>
                    </div>
                    <div className="text-[11px] sm:text-xs text-[#557365] leading-relaxed">
                      {item.desc}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Rounded Produce Image Card */}
            <div className="w-full lg:w-[320px] xl:w-[360px] shrink-0 flex flex-col">
              <div className="h-full min-h-[220px] sm:min-h-[260px] rounded-3xl overflow-hidden shadow-md border-2 border-white relative bg-[#E6F0E9] group">
                
                {/* Background image: produce-card for English, produce-clean for other languages */}
                <img
                  src={language === 'en' ? '/assets/home/produce-card.png' : '/assets/home/produce-clean.png'}
                  alt="KRAYAM Agricultural Produce"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />

                {/* Localized text overlay (prominent when non-English) */}
                {language !== 'en' && (
                  <div className="absolute top-4 left-4 right-4 text-center z-10 bg-white/70 backdrop-blur-xs rounded-xl py-2 px-3 border border-white/60 shadow-2xs">
                    <div className="text-[#0E5238] font-bold text-xs sm:text-sm tracking-tight leading-snug">
                      {ht.produceCardTitle}
                    </div>
                    <div className="text-[#136846] font-semibold text-[11px] sm:text-xs tracking-tight leading-snug mt-0.5">
                      {ht.produceCardSubtitle}
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Unified KRAYAM Footer */}
      <KrayamFooter />

    </div>
  );
};
