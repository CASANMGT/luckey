export function SplashScreen() {
  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-gradient-to-b from-[#F2FDFB] to-[#D0F5ED]">
      <div className="absolute w-[300px] h-[300px] bg-white rounded-full blur-[60px] opacity-50" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="luckey-drop relative">
          <div className="luckey-float relative w-40 h-56 flex justify-center">
            <svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl z-20">
              <defs>
                <linearGradient id="mintGrad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#B3F7E5" />
                  <stop offset="1" stopColor="#9DE4F8" />
                </linearGradient>
              </defs>
              <rect x="52" y="70" width="16" height="80" rx="8" fill="url(#mintGrad)" />
              <rect x="62" y="115" width="22" height="12" rx="6" fill="url(#mintGrad)" />
              <rect x="62" y="135" width="16" height="12" rx="6" fill="url(#mintGrad)" />
              <circle cx="60" cy="30" r="24" fill="url(#mintGrad)" />
              <circle cx="60" cy="74" r="24" fill="url(#mintGrad)" />
              <circle cx="32" cy="52" r="24" fill="url(#mintGrad)" />
              <circle cx="88" cy="52" r="24" fill="url(#mintGrad)" />
              <rect x="42" y="34" width="36" height="36" fill="url(#mintGrad)" />
              <path d="M46 48 Q49 43 52 48" stroke="#004D4D" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M68 48 Q71 43 74 48" stroke="#004D4D" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M55 56 Q60 62 65 56" stroke="#004D4D" strokeWidth="3.5" strokeLinecap="round" />
              <ellipse cx="43" cy="55" rx="4" ry="2.5" fill="#FFB6C1" opacity="0.6" />
              <ellipse cx="77" cy="55" rx="4" ry="2.5" fill="#FFB6C1" opacity="0.6" />
            </svg>

            <svg className="luckey-sparkle-1 absolute top-4 -left-2 w-7 h-7 z-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z" fill="#FDE047" opacity="0.9" />
            </svg>
            <svg className="luckey-sparkle-2 absolute bottom-20 -right-6 w-10 h-10 z-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z" fill="#FDE047" opacity="0.9" />
            </svg>
          </div>
        </div>

        <div className="relative mt-2 text-center">
          <h1 className="luckey-text-up text-[3.5rem] leading-none font-extrabold tracking-tight text-[#004D4D]">Luckey</h1>
          <p className="luckey-subtext-up text-[#008080] font-bold text-xs mt-3 tracking-[0.2em] uppercase">Smart Living, Made Easy.</p>
          <div className="luckey-sprout absolute -right-10 -top-6 w-[4.5rem] h-[4.5rem] z-30">
            <div className="luckey-sprout-wiggle w-full h-full">
              <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
                <defs>
                  <linearGradient id="sproutGrad" x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A5F28A" />
                    <stop offset="1" stopColor="#6EE0AF" />
                  </linearGradient>
                </defs>
                <circle cx="30" cy="42" r="16" fill="url(#sproutGrad)" />
                <path d="M28 26 C16 26 12 14 12 14 C18 8 30 14 28 26 Z" fill="url(#sproutGrad)" />
                <path d="M32 26 C44 26 48 14 48 14 C42 8 30 14 32 26 Z" fill="url(#sproutGrad)" />
                <circle cx="24" cy="40" r="1.5" fill="#004D4D" />
                <circle cx="36" cy="40" r="1.5" fill="#004D4D" />
                <path d="M28 44 Q30 47 32 44" stroke="#004D4D" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 flex space-x-2 luckey-subtext-up">
        <div className="luckey-dot-1 w-2.5 h-2.5 rounded-full bg-[#90EE90]" />
        <div className="luckey-dot-2 w-2.5 h-2.5 rounded-full bg-[#90EE90]" />
        <div className="luckey-dot-3 w-2.5 h-2.5 rounded-full bg-[#90EE90]" />
      </div>
    </div>
  );
}
