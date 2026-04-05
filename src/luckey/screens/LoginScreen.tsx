type LoginScreenProps = {
  onLogin: () => void;
};

export function LoginScreen({ onLogin }: LoginScreenProps) {
  return (
    <div className="absolute inset-0 px-3 py-4 flex items-center justify-center bg-gradient-to-b from-[#F2FDFB] to-[#D0F5ED]">
      <div className="w-full max-w-[380px] bg-[#F2F6F6]/90 backdrop-blur-xl rounded-[2.5rem] p-6 border border-white/70 shadow-xl">
        <div className="flex items-center justify-center gap-2">
          <svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-9 shrink-0 drop-shadow-sm">
            <defs>
              <linearGradient id="loginMintGrad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                <stop stopColor="#B3F7E5" />
                <stop offset="1" stopColor="#9DE4F8" />
              </linearGradient>
            </defs>
            <rect x="52" y="70" width="16" height="80" rx="8" fill="url(#loginMintGrad)" />
            <rect x="62" y="115" width="22" height="12" rx="6" fill="url(#loginMintGrad)" />
            <rect x="62" y="135" width="16" height="12" rx="6" fill="url(#loginMintGrad)" />
            <circle cx="60" cy="30" r="24" fill="url(#loginMintGrad)" />
            <circle cx="60" cy="74" r="24" fill="url(#loginMintGrad)" />
            <circle cx="32" cy="52" r="24" fill="url(#loginMintGrad)" />
            <circle cx="88" cy="52" r="24" fill="url(#loginMintGrad)" />
            <rect x="42" y="34" width="36" height="36" fill="url(#loginMintGrad)" />
            <path d="M46 48 Q49 43 52 48" stroke="#004D4D" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M68 48 Q71 43 74 48" stroke="#004D4D" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M55 56 Q60 62 65 56" stroke="#004D4D" strokeWidth="3.5" strokeLinecap="round" />
            <ellipse cx="43" cy="55" rx="4" ry="2.5" fill="#FFB6C1" opacity="0.6" />
            <ellipse cx="77" cy="55" rx="4" ry="2.5" fill="#FFB6C1" opacity="0.6" />
          </svg>
          <h1 className="text-[3rem] leading-none font-extrabold text-center tracking-tight text-[#004D4D]">Luckey</h1>
          <svg className="w-4 h-4 text-[#FDE047]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z" fill="#FDE047" />
          </svg>
        </div>
        <p className="text-center text-[#008080] text-[1.9rem] mt-2">Smart living. Easy booking.</p>

        <div className="mt-8 space-y-6">
          <div>
            <p className="text-[12px] font-extrabold text-[#008080] tracking-[0.18em] uppercase mb-2">Email Address</p>
            <div className="h-16 flex items-center rounded-[1.5rem] border border-[#B7E6DF] bg-[#DCEAEA] px-5">
              <span className="text-[#79B9BB] text-3xl mr-3">@</span>
              <input className="w-full bg-transparent text-[1.05rem] text-[#6FAFB1] outline-none placeholder:text-[#8CC1C2]" placeholder="nama@email.com" />
            </div>
          </div>

          <div>
            <p className="text-[12px] font-extrabold text-[#008080] tracking-[0.18em] uppercase mb-2">Password</p>
            <div className="h-16 flex items-center rounded-[1.5rem] border border-[#B7E6DF] bg-[#DCEAEA] px-5">
              <span className="text-[#79B9BB] text-xl mr-3">🔒</span>
              <input className="w-full bg-transparent text-[1.05rem] text-[#6FAFB1] outline-none placeholder:text-[#8CC1C2]" placeholder="•••••••" type="password" />
              <span className="text-[#79B9BB] text-lg ml-2">◉</span>
            </div>
            <div className="mt-3 text-right">
              <button className="text-[12px] font-extrabold text-[#004D4D] tracking-[0.12em] uppercase">Lupa Password?</button>
            </div>
          </div>
        </div>

        <button onClick={onLogin} className="w-full mt-7 h-14 rounded-[1.25rem] bg-[#007D7D] text-white text-[2.2rem] font-bold shadow-[0_10px_20px_rgba(0,128,128,0.22)]">
          Masuk
        </button>

        <div className="flex items-center gap-3 mt-7">
          <div className="h-[1px] bg-[#B7E6DF] flex-1" />
          <span className="text-[10px] font-extrabold tracking-[0.14em] uppercase text-[#008080]">Atau Masuk Dengan</span>
          <div className="h-[1px] bg-[#B7E6DF] flex-1" />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <button onClick={onLogin} className="h-14 rounded-3xl border border-[#B7E6DF] bg-white text-[#004D4D] font-extrabold tracking-[0.12em] uppercase text-[1.05rem]">
            Tenant
          </button>
          <button className="h-14 rounded-3xl border border-[#B7E6DF] bg-white text-[#004D4D] font-extrabold tracking-[0.12em] uppercase text-[1.05rem]">
            Owner
          </button>
        </div>

        <p className="mt-8 text-center text-[11px] text-[#008080]">
          Belum punya akun? <span className="font-extrabold text-[#004D4D]">Daftar Akun Baru</span>
        </p>
      </div>
    </div>
  );
}
