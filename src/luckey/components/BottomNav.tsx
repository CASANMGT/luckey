import type { Screen } from "../types";

type BottomNavProps = {
  screen: Screen;
  setScreen: (screen: Screen) => void;
};

export function BottomNav({ screen, setScreen }: BottomNavProps) {
  const activeItemClass = "flex flex-col items-center bg-[#F2FDFB] px-3 py-1.5 rounded-2xl text-[#004D4D]";
  const idleItemClass = "flex flex-col items-center text-gray-400 hover:text-[#008080] transition-colors";

  return (
    <nav className="absolute bottom-0 w-full bg-white border-t border-[#D0F5ED] px-2 py-2 pb-6 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.02)] flex items-end justify-around">
      <button onClick={() => setScreen("beranda")} className={screen === "beranda" || screen === "changelog" ? activeItemClass : idleItemClass}>
        <svg className="w-6 h-6 mb-0.5" fill={screen === "beranda" ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span className="text-[8px] font-extrabold tracking-widest uppercase">Beranda</span>
      </button>

      <button onClick={() => setScreen("bayar")} className={screen === "bayar" ? activeItemClass : idleItemClass}>
        <svg className="w-6 h-6 mb-0.5" fill={screen === "bayar" ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
        <span className="text-[8px] font-extrabold tracking-widest uppercase">Bayar</span>
      </button>

      <button onClick={() => setScreen("kunci")} className="relative -top-3 flex flex-col items-center z-40">
        <div className={`w-14 h-14 rounded-full border-4 border-white flex flex-col items-center justify-center text-[#004D4D] shadow-lg ${screen === "kunci" ? "bg-gradient-to-br from-[#A5F28A] to-[#6EE0AF] shadow-[#90EE90]/60" : "bg-gradient-to-br from-[#9DE4F8] to-[#B3F7E5] shadow-[#B3F7E5]/60"}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
          <span className="text-[7px] font-extrabold tracking-widest uppercase mt-0.5">Kunci</span>
        </div>
      </button>

      <button onClick={() => setScreen("assignGuest")} className={screen === "assignGuest" || screen === "shareGuest" ? activeItemClass : idleItemClass}>
        <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span className="text-[8px] font-extrabold tracking-widest uppercase">Request</span>
      </button>

      <button onClick={() => setScreen("kamar")} className={screen === "kamar" || screen === "kontrakDokumenSigned" || screen === "kontrakDokumenUnsigned" || screen === "kontrakLegalPks" || screen === "pindah" ? activeItemClass : idleItemClass}>
        <svg className="w-6 h-6 mb-0.5" fill={screen === "kamar" ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V6a2 2 0 012-2h10a2 2 0 012 2v13M5 19h14M14 12h.01" />
        </svg>
        <span className="text-[8px] font-extrabold tracking-widest uppercase">Kamar</span>
      </button>
    </nav>
  );
}
