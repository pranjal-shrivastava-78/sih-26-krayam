import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
  durationMs?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ 
  onFinish, 
  durationMs = 1400 
}) => {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Start fading out slightly before duration
    const fadeTimer = setTimeout(() => {
      setFadingOut(true);
    }, durationMs - 300);

    const finishTimer = setTimeout(() => {
      onFinish();
    }, durationMs);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [durationMs, onFinish]);

  return (
    <div 
      onClick={onFinish}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#063B2A] text-[#FFFFFF] cursor-pointer select-none transition-opacity duration-300 ease-out ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(7,94,67,0.5)_0%,rgba(6,59,42,1)_70%)]" />

      {/* Main Logo Card */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md animate-fade-in">
        {/* User's Sprout Logo with subtle breathing animation */}
        <div className="relative mb-5">
          <div className="w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
            <img 
              src="/logo.png" 
              alt="KRAYAM Logo" 
              className="w-full h-full object-contain drop-shadow-2xl select-none"
            />
          </div>
          {/* Subtle pulse ring */}
          <span className="absolute -inset-1.5 rounded-[32px] border border-[#16845F]/40 animate-ping opacity-25" />
        </div>

        {/* Brand Name */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#FFFFFF]">
          KRAYAM
        </h1>

        {/* Progress Bar & Telemetry Status */}
        <div className="w-48 h-1 bg-[#075E43] rounded-full overflow-hidden mt-6">
          <div className="h-full bg-[#EA8A0A] rounded-full animate-[pulse_1s_infinite] w-full" />
        </div>
        <div className="text-[10px] uppercase tracking-wider text-[#CBD8D1]/70 mt-2.5 font-mono">
          Connecting to Agri-Mandi Grid...
        </div>
      </div>
    </div>
  );
};
