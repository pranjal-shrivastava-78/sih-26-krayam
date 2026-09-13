import React from 'react';

interface EmblemProps {
  className?: string;
}

export const Emblem: React.FC<EmblemProps> = ({ className = "w-10 h-10" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Government of India Emblem"
    >
      {/* Ashoka Stambh / State Emblem of India representation */}
      <g fill="currentColor">
        {/* Central Crown/Lions Silhouette */}
        <path d="M50 10 C46 10 43 14 43 19 C43 23 45 26 47 28 C45 30 44 33 44 37 C44 41 46 44 49 46 L49 55 L51 55 L51 46 C54 44 56 41 56 37 C56 33 55 30 53 28 C55 26 57 23 57 19 C57 14 54 10 50 10 Z" />
        {/* Left Lion */}
        <path d="M36 22 C32 22 29 26 30 31 C31 34 33 37 36 38 C35 41 35 45 37 49 L43 51 L44 44 C41 42 39 39 39 35 C39 32 40 29 42 27 C40 25 38 23 36 22 Z" />
        {/* Right Lion */}
        <path d="M64 22 C68 22 71 26 70 31 C69 34 67 37 64 38 C65 41 65 45 63 49 L57 51 L56 44 C59 42 61 39 61 35 C61 32 60 29 58 27 C60 25 62 23 64 22 Z" />
        {/* Abacus / Base Platform */}
        <rect x="24" y="56" width="52" height="6" rx="1.5" />
        {/* Ashoka Chakra in Center */}
        <circle cx="50" cy="70" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="50" cy="70" r="2" />
        <path d="M50 62 L50 78 M42 70 L58 70 M44.3 64.3 L55.7 75.7 M44.3 75.7 L55.7 64.3" stroke="currentColor" strokeWidth="1.2" />
        {/* Bull on right, Horse on left silhouettes */}
        <path d="M30 68 C28 66 26 68 25 70 C24 72 26 74 28 73 C29 74 31 73 32 71 Z" />
        <path d="M70 68 C72 66 74 68 75 70 C76 72 74 74 72 73 C71 74 69 73 68 71 Z" />
        {/* Lower Base Steps */}
        <rect x="20" y="78" width="60" height="4" rx="1" />
        <rect x="28" y="84" width="44" height="3" rx="1" />
        {/* Satyameva Jayate Inscription line representation */}
        <text x="50" y="98" textAnchor="middle" fontSize="7" fontFamily="Noto Sans Devanagari, sans-serif" fontWeight="bold">
          सत्यमेव जयते
        </text>
      </g>
    </svg>
  );
};
