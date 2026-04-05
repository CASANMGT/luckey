import { useState } from "react";
import { ChangelogModal } from "../components/ChangelogModal";
import { cardClass, guestDurations, moveReasons, paymentMethods } from "../constants";
import { LUCKEY_APP_VERSION } from "../data/changelog";
import type { GuestDuration, Screen } from "../types";

type SetScreen = (screen: Screen) => void;

export function BerandaScreen({
  setScreen,
}: {
  setScreen: SetScreen;
}) {
  const [changelogOpen, setChangelogOpen] = useState(false);

  return (
    <div className="pb-24">
      <ChangelogModal open={changelogOpen} onClose={() => setChangelogOpen(false)} />

      <div className="bg-gradient-to-r from-[#004D4D] to-[#008080] rounded-b-[2.5rem] px-6 pt-8 pb-16 text-white relative shadow-md">
        <div className="flex justify-between items-center mb-6">
          <button
            type="button"
            onClick={() => setChangelogOpen(true)}
            className="flex items-center space-x-3 text-left rounded-2xl -m-1 p-1 pr-3 hover:bg-white/10 active:bg-white/15 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-label={`Buka catatan pembaruan aplikasi, versi ${LUCKEY_APP_VERSION}`}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/40 text-sm">
                👩🏻
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 min-w-[1.125rem] h-[1.125rem] px-0.5 rounded-full bg-[#90EE90] text-[#004D4D] text-[8px] font-extrabold flex items-center justify-center border border-white/90 shadow-sm">
                v{LUCKEY_APP_VERSION.split(".").slice(0, 2).join(".")}
              </span>
            </div>
            <div className="flex flex-col items-start">
              <h2 className="text-xl font-extrabold tracking-tight leading-tight">Luckey</h2>
              <span className="text-[9px] font-bold text-white/75 tracking-wide">Pembaruan</span>
            </div>
          </button>
          <button className="relative bg-white/10 p-2 rounded-full backdrop-blur-sm">
            <span className="text-sm">🔔</span>
            <span className="absolute top-1.5 right-2 w-2.5 h-2.5 bg-[#EAB308] border-2 border-[#008080] rounded-full" />
          </button>
        </div>
        <h1 className="text-3xl font-extrabold mb-1 tracking-tight">Halo, Dewi! 🌱</h1>
        <p className="text-sm text-white/80 font-medium tracking-wide">Selamat datang kembali di hunianmu.</p>
        <div className="mt-4 inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-[11px] font-bold border border-white/30">
          <span>🏢</span>
          Kos Melati Indah • Kamar 302
        </div>
      </div>

      <div className="-mt-8 mx-6 grid grid-cols-2 gap-3 relative z-10">
        {[
          ["Sewa/Bulan", "2.5M"],
          ["Periode", "Bln 06"],
          ["Sisa", "12 Hari"],
        ].map(([label, value]) => (
          <div key={label} className="bg-white rounded-[1.5rem] p-4 shadow-sm border border-[#D0F5ED] text-center flex flex-col justify-center h-24">
            <p className="text-[9px] font-extrabold text-[#008080] tracking-widest uppercase mb-1">{label}</p>
            <p className="text-xl font-extrabold text-[#004D4D]">{value}</p>
          </div>
        ))}
        <div className="bg-white rounded-[1.5rem] p-4 shadow-sm border border-[#D0F5ED] flex flex-col justify-center items-center h-24">
          <p className="text-[9px] font-extrabold text-[#008080] tracking-widest uppercase mb-1">Status</p>
          <div className="bg-[#90EE90]/30 border border-[#90EE90]/50 text-[#004D4D] px-3 py-1 rounded-full flex items-center gap-1.5 mt-0.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#008080] animate-pulse" />
            <span className="text-xs font-extrabold">Aktif</span>
          </div>
        </div>
      </div>

      <div className="mx-6 mt-6 space-y-4">
        <div className="bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] rounded-[2rem] p-5 border border-[#FDE047]/50 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="bg-[#FDE047]/50 border border-[#FDE047] text-[#92400E] text-[8px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full inline-flex items-center gap-1">Upcoming</span>
              <h3 className="font-extrabold text-lg text-[#004D4D] mt-2">Tagihan Juli</h3>
            </div>
            <div className="text-right">
              <p className="font-extrabold text-lg text-[#004D4D]">Rp 2.500.000</p>
              <p className="text-[9px] font-bold text-[#B45309] uppercase tracking-wider mt-0.5">Jatuh Tempo: 1 Juli</p>
            </div>
          </div>
          <p className="text-[11px] text-[#92400E]/80 font-medium leading-relaxed mb-4">Tagihan bulan depan sudah tersedia. Anda dapat melakukan pembayaran lebih awal.</p>
          <button onClick={() => setScreen("bayar")} className="w-full bg-[#004D4D] text-[#FDE047] py-3.5 rounded-xl font-bold text-sm shadow-md">
            Detail Tagihan
          </button>
        </div>

        <div className="bg-gradient-to-br from-[#F2FDFB] to-[#E6FBF7] rounded-[2rem] p-5 border border-[#90EE90]/60 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="bg-[#90EE90]/40 border border-[#90EE90] text-[#004D4D] text-[8px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full inline-flex items-center gap-1">Lunas</span>
              <h3 className="font-extrabold text-lg text-[#004D4D] mt-2">Tagihan Juni</h3>
            </div>
            <div className="text-right">
              <p className="font-extrabold text-lg text-[#004D4D]">Rp 2.500.000</p>
              <p className="text-[9px] font-extrabold text-[#008080] uppercase tracking-wider mt-0.5">Terbayar</p>
            </div>
          </div>
          <p className="text-[11px] text-[#008080] font-medium leading-relaxed mb-4">Terima kasih! Pembayaran untuk periode Juni telah kami terima dengan baik.</p>
          <button onClick={() => setScreen("kwitansi")} className="w-full bg-[#90EE90]/30 text-[#008080] py-3.5 rounded-xl font-bold text-sm">
            Lihat Kwitansi
          </button>
        </div>
      </div>

      <div className="mx-6 mt-8 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold text-lg text-[#004D4D]">Aktivitas Terbaru</h3>
          <button className="text-[10px] font-extrabold text-[#008080] tracking-widest uppercase">Lihat Semua</button>
        </div>
        <div className="space-y-3">
          {[
            ["Pembersihan Selesai", "Kamar Anda telah dibersihkan.", "10:45"],
            ["Akses Pintu Utama", "Pintu utama dibuka.", "Kemarin"],
          ].map(([title, desc, time]) => (
            <div key={title} className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-[#D0F5ED]">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#F2FDFB] border border-[#D0F5ED] flex items-center justify-center text-[#008080]">👍</div>
                <div>
                  <h4 className="font-bold text-sm text-[#004D4D]">{title}</h4>
                  <p className="text-[10px] font-medium text-gray-400 mt-0.5">{desc}</p>
                </div>
              </div>
              <span className="text-[9px] font-bold text-gray-400">{time}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export function KunciScreen({
  unlockActive,
  triggerUnlock,
  backupPin,
  pinVisible: _pinVisible,
  onTogglePin,
  setScreen,
}: {
  unlockActive: boolean;
  triggerUnlock: () => void;
  backupPin: string;
  pinVisible: boolean;
  onTogglePin: () => void;
  setScreen: SetScreen;
}) {
  return (
    <div className="px-6 pt-5 pb-24">
      <header className="w-full flex justify-between items-center">
        <button onClick={() => setScreen("beranda")} className="text-[#004D4D] text-2xl">‹</button>
        <h2 className="text-lg font-extrabold text-[#004D4D] tracking-tight">Kunci Digital</h2>
        <button className="text-[#008080] text-xl">⚙</button>
      </header>

      <div className="mt-8 flex flex-col items-center relative">
        <p className="text-[10px] font-extrabold text-gray-400 tracking-widest uppercase mb-1">Current Residence</p>
        <h3 className="text-2xl font-extrabold text-[#004D4D] tracking-tight text-center">Unit 302 • Deluxe</h3>
      </div>

      <div className="flex justify-center mt-6">
        <button onClick={triggerUnlock} className={`w-56 h-56 rounded-full border-[3px] ${unlockActive ? "border-[#90EE90]/50" : "border-[#9DE4F8]/50"} shadow-[0_0_40px_rgba(157,228,248,0.4)]`}>
          <div className={`w-full h-full rounded-full flex flex-col items-center justify-center bg-gradient-to-br ${unlockActive ? "from-[#A5F28A] to-[#6EE0AF]" : "from-[#9DE4F8] to-[#B3F7E5]"}`}>
            <div className="text-5xl">{unlockActive ? "🔓" : "🔒"}</div>
            <span className="mt-2 text-[10px] tracking-[0.18em] font-extrabold text-white uppercase">{unlockActive ? "Unlocked" : "Hold to Unlock"}</span>
          </div>
        </button>
      </div>

      <div className="flex items-center gap-3 mt-6 justify-center">
        <div className="flex items-center bg-[#90EE90] px-4 py-2 rounded-full shadow-sm">
          <span className="text-xs mr-2">📶</span>
          <span className="text-[10px] font-extrabold text-[#004D4D] tracking-widest uppercase">Connected</span>
        </div>
        <div className="flex items-center bg-[#F2FDFB] border border-[#D0F5ED] px-4 py-2 rounded-full shadow-sm">
          <span className="text-xs mr-2">🔋</span>
          <span className="text-[10px] font-extrabold text-[#008080] tracking-widest uppercase">84%</span>
        </div>
      </div>

      <div className="mt-8 mb-3">
        <h3 className="font-extrabold text-lg text-[#004D4D]">Akses Bangunan</h3>
      </div>
      <div className="space-y-3">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#D0F5ED] flex items-center justify-between">
          <div>
            <h4 className="font-bold text-[#004D4D] text-sm">Pintu Utama</h4>
            <p className="text-[11px] font-medium text-gray-500 mt-0.5">Main Entrance Lobby</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-extrabold tracking-widest uppercase text-gray-400 mb-1">Passcode</p>
            <div className="bg-[#E6FBF7] text-[#004D4D] px-3 py-1.5 rounded-lg font-extrabold text-base tracking-widest">
              774291
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#D0F5ED] flex items-center justify-between">
          <div>
            <h4 className="font-bold text-[#004D4D] text-sm">PIN Unit Anda</h4>
            <p className="text-[11px] font-medium text-gray-500 mt-0.5">Cadangan akses pintu kamar</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-extrabold tracking-[0.3em]">{backupPin}</span>
            <button onClick={onTogglePin} className="text-[#008080] p-1.5 bg-[#F2FDFB] rounded-full border border-[#D0F5ED]">
              👁
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 mb-3 flex items-center justify-between">
        <h3 className="font-extrabold text-lg text-[#004D4D]">Kunci Tamu</h3>
        <button onClick={() => setScreen("assignGuest")} className="bg-gradient-to-r from-[#004D4D] to-[#008080] text-white px-3 py-1.5 rounded-lg text-[11px] font-bold">
          Assign Guest
        </button>
      </div>

      <div className="space-y-3">
        <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-[#D0F5ED]">
          <div>
            <h4 className="font-bold text-sm text-[#004D4D]">Siska Maharani</h4>
            <p className="text-[10px] font-medium text-gray-400 mt-0.5">Valid until 18:00 today</p>
          </div>
          <div className="text-right">
            <p className="font-extrabold text-sm text-[#008080]">04:22:10</p>
            <p className="text-[8px] font-extrabold tracking-widest uppercase text-gray-400 mt-0.5">Left</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-[#D0F5ED]">
          <div>
            <h4 className="font-bold text-sm text-[#004D4D]">Ahmad Fauzi</h4>
            <p className="text-[10px] font-medium text-gray-400 mt-0.5">One-time entry key</p>
          </div>
          <div className="w-6 h-6 rounded-full bg-[#90EE90] flex items-center justify-center text-[#004D4D]">✓</div>
        </div>
      </div>

      <div className="mt-8 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold text-lg text-[#004D4D]">Riwayat</h3>
          <button className="text-[10px] font-extrabold text-[#008080] tracking-widest uppercase">View all</button>
        </div>
        <div className="space-y-3">
          {[
            ["Unit Unlocked", "Accessed by Siska Maharani (Guest)", "13:45"],
            ["Main Entrance Access", "Used PIN: 774291", "12:10"],
            ["Unit Locked", "System auto-lock secured", "09:00"],
          ].map(([title, desc, time]) => (
            <div key={title} className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-[#D0F5ED]">
              <div>
                <h4 className="font-bold text-sm text-[#004D4D]">{title}</h4>
                <p className="text-[10px] font-medium text-gray-400 mt-0.5">{desc}</p>
              </div>
              <span className="text-[10px] font-bold text-gray-400">{time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BayarScreen({
  paymentMethod,
  setPaymentMethod,
  setScreen,
}: {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  setScreen: SetScreen;
}) {
  return (
    <div className="pb-24">
      <header className="w-full px-6 py-5 flex items-center justify-between sticky top-0 bg-[#F2FDFB]/90 backdrop-blur-md z-20">
        <button onClick={() => setScreen("beranda")} className="text-[#004D4D] p-2 -ml-2 rounded-full">‹</button>
        <h2 className="text-lg font-extrabold text-[#004D4D] tracking-tight">Pembayaran</h2>
        <button className="text-[#008080] p-2 -mr-2 relative">
          <span>🔔</span>
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#EAB308] rounded-full border border-white" />
        </button>
      </header>

      <div className="mx-6 mt-2 bg-gradient-to-r from-[#004D4D] to-[#008080] rounded-[2rem] p-8 text-center text-white shadow-lg shadow-[#008080]/20">
        <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-white/70">Tagihan — Juli 2026</p>
        <h3 className="text-4xl font-extrabold mt-3 tracking-tight">Rp 2.500.000</h3>
        <div className="inline-block mt-4 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest text-[#90EE90]">
          Jatuh tempo: 05 Jul 2026
        </div>
      </div>

      <div className="mx-6 mt-8 flex justify-between items-end mb-4">
        <h3 className="font-extrabold text-lg text-[#004D4D]">Pilih Metode</h3>
        <span className="text-[9px] font-extrabold text-[#008080] tracking-widest uppercase">Instan & Aman</span>
      </div>

      <div className="mx-6 space-y-3">
        {paymentMethods.map((method) => (
          <button key={method} onClick={() => setPaymentMethod(method)} className={`w-full rounded-2xl border-2 p-4 flex items-center justify-between shadow-sm ${paymentMethod === method ? "border-[#004D4D] bg-white" : "border-[#D0F5ED] bg-white"}`}>
            <div className="flex items-center gap-4 text-left">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${method === "QRIS" ? "bg-gradient-to-br from-[#9DE4F8] to-[#B3F7E5] text-[#004D4D]" : "bg-[#F2FDFB] text-[#008080]"}`}>
                {method === "QRIS" ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5v5H5zM14 5h5v5h-5zM5 14h5v5H5zM16 14h.01M14 16h2v3h3" />
                  </svg>
                ) : method === "Transfer Bank" ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <div>
                <p className="font-bold text-[#004D4D] text-sm leading-none">{method}</p>
                <p className="text-[10px] font-medium text-gray-400 mt-1">
                  {method === "QRIS" ? "Gopay, OVO, ShopeePay, Dana" : method === "Transfer Bank" ? "Virtual Account BCA, Mandiri, BNI" : "Serahkan langsung ke Ibu Kos"}
                </p>
              </div>
            </div>
            {paymentMethod === method ? (
              <span className="w-8 h-8 rounded-full bg-[#004D4D] border-2 border-[#004D4D] flex items-center justify-center text-white text-lg">✓</span>
            ) : (
              <span className="w-8 h-8 rounded-full border-2 border-[#D0F5ED]" />
            )}
          </button>
        ))}
      </div>

      <div className="mx-6 mt-8">
        <button onClick={() => setScreen("kwitansi")} className="w-full bg-[#004D4D] text-[#90EE90] py-4 rounded-[1.25rem] font-extrabold text-sm shadow-lg shadow-[#008080]/30">
          Bayar Sekarang
        </button>
      </div>

      <div className="mx-6 mt-8 mb-4">
        <h3 className="font-extrabold text-lg text-[#004D4D] mb-4">Pembayaran Sedang Dikonfirmasi</h3>
        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-[#FDE68A] flex items-center justify-center text-[#92400E]">!</div>
            <div>
              <h4 className="font-bold text-[#92400E] text-sm leading-none">Menunggu Konfirmasi</h4>
              <p className="text-[10px] font-medium text-[#B45309] mt-1">Pembayaran tunai sedang divalidasi</p>
            </div>
          </div>
          <span className="bg-[#FDE68A] text-[#92400E] text-[10px] font-extrabold tracking-widest uppercase px-2 py-1 rounded-md">Pending</span>
        </div>
      </div>
    </div>
  );
}

export function KwitansiScreen({ paymentMethod }: { paymentMethod: string }) {
  return (
    <div className="p-6 space-y-4">
      <div className="rounded-3xl bg-gradient-to-br from-[#9DE4F8] to-[#B3F7E5] p-6 text-center">
        <div className="text-4xl">✅</div>
        <h3 className="text-3xl font-extrabold mt-2">Rp 2.500.000</h3>
        <p className="font-bold text-[#008080]">Lunas</p>
      </div>
      <div className={cardClass}>
        <p className="font-bold">ID: TX-20260601-0722</p>
        <p className="text-sm text-gray-500 mt-1">Metode: {paymentMethod}</p>
      </div>
    </div>
  );
}

export function KamarScreen({ setScreen }: { setScreen: SetScreen }) {
  return (
    <div className="px-6 pt-5 pb-24">
      <header className="w-full flex items-center justify-between">
        <button className="text-[#004D4D] text-xl">☰</button>
        <h2 className="text-lg font-extrabold text-[#004D4D] tracking-tight">Kontrak Kamar</h2>
        <div className="w-7 h-7 rounded-full bg-[#F2FDFB] border border-[#D0F5ED] flex items-center justify-center text-[10px]">👩🏻</div>
      </header>

      <div className="mt-5 mb-3 flex justify-between items-center">
        <h3 className="font-extrabold text-lg text-[#004D4D]">Kontrak Aktif</h3>
        <span className="text-[9px] font-extrabold text-[#008080] tracking-widest uppercase">Current</span>
      </div>

      <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#D0F5ED] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#9DE4F8]/20 to-[#B3F7E5]/20 rounded-bl-[100px]" />

        <div className="flex justify-between items-start relative z-10">
          <div>
            <p className="text-[9px] font-extrabold tracking-widest uppercase text-gray-400">Nomor Unit</p>
            <h3 className="text-3xl font-extrabold text-[#004D4D] mt-1 tracking-tight">Kamar 302</h3>
          </div>
          <span className="bg-[#90EE90] text-[#004D4D] text-[9px] font-extrabold tracking-widest uppercase px-3 py-1.5 rounded-full">Active</span>
        </div>

        <div className="mt-5 bg-[#F2FDFB] border border-[#D0F5ED] rounded-2xl p-4 flex items-center gap-4 relative z-10">
          <div className="w-10 h-10 bg-[#004D4D] rounded-full flex items-center justify-center text-[#90EE90]">⏺</div>
          <div>
            <p className="text-[10px] font-medium text-gray-400">Ditandatangani pada</p>
            <p className="font-extrabold text-sm text-[#004D4D] mt-0.5">24 Mei 2026</p>
          </div>
        </div>

        <button onClick={() => setScreen("kontrakDokumenSigned")} className="w-full mt-5 bg-gradient-to-r from-[#004D4D] to-[#008080] text-white py-3.5 rounded-xl font-bold text-sm shadow-md relative z-10">
          Lihat Dokumen
        </button>
      </div>

      <div className="mt-6">
        <button onClick={() => setScreen("pindah")} className="w-full bg-white border border-dashed border-[#008080] text-[#008080] py-4 rounded-3xl font-extrabold text-xs tracking-widest uppercase">
          Ajukan Pindahan
        </button>
      </div>

      <div className="mt-8 mb-4">
        <h3 className="font-extrabold text-lg text-[#004D4D] mb-4">Riwayat Kontrak</h3>
        <div className="space-y-3">
          {[
            ["Kamar 102", "Selesai • Des 2025"],
            ["Kamar 302 (Initial)", "Diperpanjang • Juni 2025"],
          ].map(([title, meta]) => (
            <div key={title} className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-[#D0F5ED]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F2FDFB] flex items-center justify-center text-[#008080]">📁</div>
                <div>
                  <h4 className="font-bold text-sm text-[#004D4D]">{title}</h4>
                  <p className="text-[9px] font-bold text-gray-400 tracking-wider uppercase mt-1">{meta}</p>
                </div>
              </div>
              <span className="text-gray-400">›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PindahScreen({
  moveReason,
  setMoveReason,
  setScreen,
}: {
  moveReason: string;
  setMoveReason: (reason: string) => void;
  setScreen: SetScreen;
}) {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-3xl font-extrabold">Rencana Pindah</h2>
      <div className="flex flex-wrap gap-2">
        {moveReasons.map((reason) => (
          <button key={reason} onClick={() => setMoveReason(reason)} className={`px-4 py-2.5 rounded-full text-xs font-bold ${moveReason === reason ? "bg-[#004D4D] text-[#90EE90]" : "bg-white border border-[#D0F5ED] text-[#004D4D]"}`}>
            {reason}
          </button>
        ))}
      </div>
      <button onClick={() => setScreen("successPindah")} className="w-full rounded-2xl bg-[#004D4D] text-[#90EE90] py-3 font-bold">Kirim Permohonan</button>
    </div>
  );
}

export function AssignGuestScreen({
  guestName,
  setGuestName,
  guestPin,
  generatePin,
  guestDuration,
  setGuestDuration,
  expiryText,
  setScreen,
}: {
  guestName: string;
  setGuestName: (value: string) => void;
  guestPin: string;
  generatePin: () => void;
  guestDuration: GuestDuration;
  setGuestDuration: (value: GuestDuration) => void;
  expiryText: string;
  setScreen: SetScreen;
}) {
  return (
    <div className="p-6 space-y-4">
      <input value={guestName} onChange={(e) => setGuestName(e.target.value)} placeholder="Guest Name" className="w-full rounded-2xl border border-[#D0F5ED] bg-white px-4 py-3 outline-none" />
      <div className={cardClass}>
        <div className="flex justify-between items-center">
          <p className="text-xs tracking-widest font-extrabold uppercase text-[#008080]">PIN Access</p>
          <button onClick={generatePin} className="text-[10px] tracking-widest uppercase font-extrabold text-[#008080]">Generate</button>
        </div>
        <p className="text-4xl tracking-[0.3em] font-extrabold mt-3">{guestPin}</p>
      </div>
      <div className="flex gap-2">
        {guestDurations.map((item) => (
          <button key={item} onClick={() => setGuestDuration(item)} className={`flex-1 rounded-2xl py-2.5 text-xs font-extrabold ${guestDuration === item ? "bg-[#004D4D] text-[#90EE90]" : "bg-white border border-[#D0F5ED] text-[#004D4D]"}`}>
            {item}
          </button>
        ))}
      </div>
      <div className={cardClass}>
        <p className="text-sm">Halo <strong>{guestName || "[Nama Guest]"}</strong>, PIN kamu:</p>
        <p className="text-2xl tracking-[0.3em] font-extrabold mt-2">{guestPin}</p>
        <p className="text-xs text-gray-500 mt-2">Berlaku sampai: {expiryText}</p>
      </div>
      <button onClick={() => setScreen("shareGuest")} className="w-full rounded-2xl bg-gradient-to-r from-[#004D4D] to-[#008080] text-[#90EE90] py-3 font-bold">Share via WhatsApp</button>
    </div>
  );
}

export function ShareGuestScreen({
  guestName,
  guestPin,
  expiryText,
  setScreen,
}: {
  guestName: string;
  guestPin: string;
  expiryText: string;
  setScreen: SetScreen;
}) {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-3xl font-extrabold">Bagikan Kunci</h2>
      <div className={cardClass}>
        <p className="text-sm">Halo <strong>{guestName || "[Nama Guest]"}</strong>, ini PIN akses:</p>
        <p className="text-2xl tracking-[0.3em] font-extrabold mt-2">{guestPin}</p>
        <p className="text-xs text-gray-500 mt-2">Berlaku hingga {expiryText}</p>
      </div>
      <button onClick={() => setScreen("kunci")} className="w-full rounded-2xl bg-gradient-to-r from-[#004D4D] to-[#008080] text-[#90EE90] py-3 font-bold">Send to WhatsApp</button>
    </div>
  );
}

export function SuccessScreen({ setScreen }: { setScreen: SetScreen }) {
  return (
    <div className="p-6 space-y-4 text-center">
      <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#9DE4F8] to-[#B3F7E5] flex items-center justify-center text-4xl">✅</div>
      <h2 className="text-3xl font-extrabold">Permohonan Berhasil</h2>
      <p className="text-sm text-[#008080]">Status sedang diproses oleh tim Luckey.</p>
      <button onClick={() => setScreen("beranda")} className="w-full rounded-2xl bg-[#004D4D] text-[#90EE90] py-3 font-bold">Kembali ke Beranda</button>
    </div>
  );
}
