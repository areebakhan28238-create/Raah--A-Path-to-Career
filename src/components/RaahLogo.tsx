import React from 'react';

interface RaahLogoProps {
  variant?: 'full' | 'horizontal' | 'mark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  theme?: 'dark' | 'light'; // dark text for light bg, light text for dark bg
}

export const RaahLogoMark: React.FC<{ size?: number; className?: string }> = ({
  size = 40,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="RAAH Logo Mark"
    >
      <defs>
        {/* Sun Gradient */}
        <linearGradient id="raahSunGrad" x1="100" y1="50" x2="160" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>

        {/* Paper Plane Gradient */}
        <linearGradient id="raahPlaneGrad" x1="130" y1="65" x2="175" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      {/* Warm Golden Sun in the upper right background */}
      <circle cx="126" cy="82" r="32" fill="url(#raahSunGrad)" />

      {/* Main Stylized 'R' Stem and Foundation in Deep Navy (#1B2744) */}
      {/* Left vertical pillar */}
      <path
        d="M62 48 H84 V160 H62 Z"
        fill="#18233C"
      />

      {/* Upper loop of 'R' outer curve */}
      <path
        d="M84 48 H120 C146 48 158 64 158 84 C158 100 148 114 130 119 L162 160 H136 L108 122 H84 V48 Z"
        fill="#18233C"
      />

      {/* Winding Road (RAAH) curving from bottom right, swooping through the R's counter and pointing toward the plane */}
      <path
        d="M102 122 C95 106 100 90 120 84 C140 78 155 76 155 76 C155 76 138 94 114 98 C94 102 88 112 88 122 Z"
        fill="#F8FAFC"
      />
      <path
        d="M72 110 C88 108 108 98 126 92 C146 86 162 76 162 76 C162 76 142 98 120 106 C98 114 80 122 72 136 Z"
        fill="#FFFFFF"
      />
      {/* Road curvature highlight */}
      <path
        d="M74 122 C92 118 112 108 132 98 C148 90 162 76 162 76 C162 76 140 100 116 112 C96 122 82 132 74 146 L68 138 C74 130 72 124 74 122 Z"
        fill="#F1F5F9"
      />

      {/* Mortarboard / Graduation Cap resting on top-left of 'R' */}
      {/* Diamond Cap */}
      <polygon
        points="68,14 100,28 68,42 36,28"
        fill="#18233C"
      />
      {/* Skull cap under diamond */}
      <path
        d="M52 35 C52 42 84 42 84 35 Z"
        fill="#111A2E"
      />
      {/* Tassel cord and tassel dropping down left */}
      <path
        d="M68 28 Q44 32 40 48"
        stroke="#18233C"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="40" cy="48" r="2.5" fill="#18233C" />
      <path
        d="M38 50 L42 50 L43 62 L37 62 Z"
        fill="#18233C"
      />

      {/* Golden Paper Airplane soaring up-right into the future */}
      <g transform="translate(136, 52) rotate(10)">
        <polygon
          points="24,8 0,2 10,18"
          fill="url(#raahPlaneGrad)"
        />
        <polygon
          points="24,8 8,9 10,18"
          fill="#D97706"
          opacity="0.8"
        />
      </g>
    </svg>
  );
};

export const RaahLogo: React.FC<RaahLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  theme = 'dark',
}) => {
  const sizeMap = {
    sm: { mark: 30, text: 'text-lg', sub: 'text-[9px]', tracking: 'tracking-[0.2em]' },
    md: { mark: 40, text: 'text-2xl', sub: 'text-[10px]', tracking: 'tracking-[0.25em]' },
    lg: { mark: 54, text: 'text-3xl', sub: 'text-xs', tracking: 'tracking-[0.3em]' },
    xl: { mark: 72, text: 'text-4xl', sub: 'text-sm', tracking: 'tracking-[0.35em]' },
  };

  const currentSize = sizeMap[size];
  const isDarkText = theme === 'dark';
  const textColor = isDarkText ? 'text-[#16203B]' : 'text-white';
  const subColor = isDarkText ? 'text-slate-600' : 'text-slate-300';
  const accentLine = isDarkText ? 'border-amber-400' : 'border-amber-300';

  if (variant === 'mark') {
    return <RaahLogoMark size={currentSize.mark} className={className} />;
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center select-none ${className}`}>
        <RaahLogoMark size={size === 'xl' ? 96 : size === 'lg' ? 76 : 56} />
        
        {/* RAAH brand typography */}
        <div className={`mt-2 font-black ${textColor} ${currentSize.text} tracking-[0.3em] font-sans flex items-center`}>
          <span>R</span>
          <span className="inline-block relative">
            <span className="text-[#18233C]">A</span>
          </span>
          <span className="inline-block relative">
            <span className="text-[#18233C]">A</span>
          </span>
          <span>H</span>
        </div>

        {/* Tagline: Your Path to Career */}
        <div className={`mt-1 flex items-center gap-2 ${subColor} ${currentSize.sub} uppercase font-medium tracking-wider`}>
          <span className={`w-4 border-b ${accentLine}`}></span>
          <span>Your Path to Career</span>
          <span className={`w-4 border-b ${accentLine}`}></span>
        </div>
      </div>
    );
  }

  // Default: Horizontal layout for Navbars and Headers
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <RaahLogoMark size={currentSize.mark} />
      <div className="flex flex-col">
        <div className={`font-black leading-none ${textColor} ${currentSize.text} tracking-[0.22em] font-sans`}>
          RAAH
        </div>
        <div className={`flex items-center gap-1.5 ${subColor} ${currentSize.sub} uppercase font-semibold tracking-wider mt-1`}>
          <span className={`w-2.5 border-b ${accentLine}`}></span>
          <span>Your Path to Career</span>
          <span className={`w-2.5 border-b ${accentLine}`}></span>
        </div>
      </div>
    </div>
  );
};

export default RaahLogo;
