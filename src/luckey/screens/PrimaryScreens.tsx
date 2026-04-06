import { useEffect, useRef, useState } from "react";
import { ChangelogModal } from "../components/ChangelogModal";
import {
  buildKwitansiShareMessage,
  cardClass,
  guestDurations,
  moveReasons,
  paymentMethods,
  TENANT_CONTACT_EMAIL,
  TENANT_WHATSAPP_DIGITS,
} from "../constants";
import { LUCKEY_APP_VERSION } from "../data/changelog";
import type { GuestDuration, Screen } from "../types";
import type { ContractRenewalInfo } from "../utils/contractRenewal";
import { TRANSFER_BANKS, getTransferBank, type TransferBank } from "../data/transferBanks";

type SetScreen = (screen: Screen) => void;

function formatCountdown(totalSec: number) {
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

function KwitansiWaIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#25D366"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
    </svg>
  );
}

function KwitansiEmailIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

export function BerandaScreen({
  setScreen,
  contractRenewal,
}: {
  setScreen: SetScreen;
  contractRenewal: ContractRenewalInfo | null;
}) {
  const [changelogOpen, setChangelogOpen] = useState(false);

  const sisaDisplay =
    contractRenewal == null
      ? "—"
      : contractRenewal.isExpired
        ? "Lewat"
        : `${contractRenewal.daysRemaining} Hari`;

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
          ["Sisa", sisaDisplay],
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

const BILL_AMOUNT_LABEL = "Rp 2.500.000";

type PaymentConfirmationReceiptProps = {
  onBack: () => void;
  onUnduhKwitansi: () => void;
  onKembaliBeranda: () => void;
  methodLine: string;
  transactionId: string;
};

/** Layar sukses bayar — struktur mirip kwitansi digital (mock), warna teal/mint Luckey. */
function PaymentConfirmationReceipt({
  onBack,
  onUnduhKwitansi,
  onKembaliBeranda,
  methodLine,
  transactionId,
}: PaymentConfirmationReceiptProps) {
  const paymentDateLabel = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const shareBody = buildKwitansiShareMessage({
    amountLabel: BILL_AMOUNT_LABEL,
    periodLabel: "Juli 2026",
    unitLabel: "Kamar 302",
    transactionId,
    paymentDateLabel,
    methodLine,
  });
  const waKwitansiHref = `https://wa.me/${TENANT_WHATSAPP_DIGITS}?text=${encodeURIComponent(shareBody)}`;
  const emailKwitansiHref = `mailto:${TENANT_CONTACT_EMAIL}?subject=${encodeURIComponent("Kwitansi sewa — Kos Melati Indah")}&body=${encodeURIComponent(shareBody)}`;

  return (
    <div className="pb-24">
      <header className="w-full px-6 py-5 flex items-center justify-between sticky top-0 bg-[#F2FDFB]/90 backdrop-blur-md z-20 border-b border-[#D0F5ED]/70">
        <button type="button" onClick={onBack} className="text-[#004D4D] text-2xl p-2 -ml-2 rounded-full leading-none" aria-label="Kembali">
          ‹
        </button>
        <h2 className="text-lg font-extrabold text-[#004D4D] tracking-tight">Kwitansi</h2>
        <button type="button" className="text-[#008080] p-2 -mr-2 text-xl leading-none" aria-label="Menu">
          ⋮
        </button>
      </header>

      <div className="px-5 pt-5 pb-6">
        <div className="rounded-[1.5rem] bg-white shadow-[0_8px_32px_rgba(0,77,77,0.09)] border border-[#D0F5ED] overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-[#004D4D] via-[#008080] to-[#9DE4F8]" aria-hidden />
          <div className="px-5 pt-6 pb-6">
            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D1FAE5] text-[#047857] text-[9px] font-extrabold uppercase tracking-wide px-3 py-1.5 border border-[#6EE7B7]">
                <span aria-hidden>✓</span> Lunas
              </span>
            </div>
            <h2 className="text-center text-[1.35rem] font-extrabold text-[#004D4D] leading-tight">Kos Melati Indah</h2>
            <p className="text-center text-[8px] font-extrabold tracking-[0.2em] text-gray-400 uppercase mt-2">Kwitansi digital resmi</p>

            <div className="mt-6 rounded-2xl bg-[#F2FDFB] border border-[#D0F5ED] px-4 py-5 text-center">
              <p className="text-[9px] font-extrabold text-[#008080] uppercase tracking-[0.15em]">Total terbayar</p>
              <p className="text-[1.75rem] font-extrabold text-[#004D4D] mt-2 tracking-tight">{BILL_AMOUNT_LABEL}</p>
            </div>

            <dl className="mt-6 space-y-3.5">
              <div className="flex justify-between items-start gap-3">
                <dt className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wide shrink-0 pt-0.5">Periode sewa</dt>
                <dd className="font-bold text-[#004D4D] text-right text-sm">Juli 2026</dd>
              </div>
              <div className="flex justify-between items-start gap-3">
                <dt className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wide shrink-0 pt-0.5">Unit</dt>
                <dd className="font-extrabold text-[#008080] text-right text-sm">Kamar 302</dd>
              </div>
              <div className="flex justify-between items-start gap-3">
                <dt className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wide shrink-0 pt-0.5">ID transaksi</dt>
                <dd className="font-mono font-bold text-[#004D4D] text-right text-xs break-all">{transactionId}</dd>
              </div>
              <div className="flex justify-between items-start gap-3">
                <dt className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wide shrink-0 pt-0.5">Tanggal bayar</dt>
                <dd className="font-bold text-[#004D4D] text-right text-sm">{paymentDateLabel}</dd>
              </div>
              <div className="flex justify-between items-start gap-3">
                <dt className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wide shrink-0 pt-0.5">Metode</dt>
                <dd className="font-bold text-[#004D4D] text-right text-sm leading-snug">{methodLine}</dd>
              </div>
            </dl>
          </div>
        </div>

        <button
          type="button"
          onClick={onUnduhKwitansi}
          className="mt-6 w-full py-4 rounded-[1.25rem] font-extrabold text-sm text-white shadow-lg shadow-[#008080]/30 bg-gradient-to-r from-[#004D4D] via-[#008080] to-[#0D9488] flex items-center justify-center gap-2.5"
        >
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Unduh kwitansi PDF
        </button>

        <div className="grid grid-cols-2 gap-3 mt-3">
          <a
            href={waKwitansiHref}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 rounded-xl border-2 border-[#D0F5ED] bg-white text-[#004D4D] text-[11px] font-bold flex flex-col items-center justify-center gap-1.5 no-underline active:bg-[#F2FDFB] text-center leading-tight px-1"
          >
            <KwitansiWaIcon className="w-6 h-6 shrink-0" />
            Kirim ke WA saya
          </a>
          <a
            href={emailKwitansiHref}
            className="py-3 rounded-xl border-2 border-[#D0F5ED] bg-white text-[#004D4D] text-[11px] font-bold flex flex-col items-center justify-center gap-1.5 no-underline active:bg-[#F2FDFB] text-center leading-tight px-1"
          >
            <KwitansiEmailIcon className="w-6 h-6 shrink-0 text-[#008080]" />
            Kirim ke email saya
          </a>
        </div>

        <button
          type="button"
          onClick={onKembaliBeranda}
          className="w-full mt-4 py-3.5 rounded-[1.25rem] border-2 border-[#D0F5ED] font-bold text-sm text-[#004D4D] bg-white flex items-center justify-center gap-2 shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Kembali ke beranda
        </button>

        <p className="text-center text-[9px] text-gray-400 mt-6">© {new Date().getFullYear()} Luckey · Kos Melati Indah</p>
      </div>
    </div>
  );
}

export function BayarScreen({
  paymentMethod,
  setPaymentMethod,
  setScreen,
  tunaiFlowStatus,
  tunaiRequestRef,
  onStartTunaiAwaiting,
  onSimulateOperatorConfirm,
  onResetTunaiFlow,
  transferFlowStatus,
  transferBankId,
  transferRequestRef,
  onStartTransferFlow,
  onSelectTransferBank,
  onTransferProceedToUpload,
  onTransferBackToBankDetails,
  onTransferSubmitProof,
  onSimulateTransferConfirm,
  onResetTransferFlow,
}: {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  setScreen: SetScreen;
  tunaiFlowStatus: "idle" | "awaiting_operator" | "confirmed";
  tunaiRequestRef: string | null;
  onStartTunaiAwaiting: () => void;
  onSimulateOperatorConfirm: () => void;
  onResetTunaiFlow: () => void;
  transferFlowStatus: "idle" | "bank_details" | "upload_proof" | "awaiting_operator" | "confirmed";
  transferBankId: string | null;
  transferRequestRef: string | null;
  onStartTransferFlow: () => void;
  onSelectTransferBank: (id: string) => void;
  onTransferProceedToUpload: () => void;
  onTransferBackToBankDetails: () => void;
  onTransferSubmitProof: () => void;
  onSimulateTransferConfirm: () => void;
  onResetTransferFlow: () => void;
}) {
  const tunaiRefId = tunaiRequestRef ?? "—";
  const transferRefDisplay = transferRequestRef ?? "—";
  const selectedTransferBank = getTransferBank(transferBankId);

  const [countdownSec, setCountdownSec] = useState(86399);
  const [proofFileName, setProofFileName] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [proofNote, setProofNote] = useState("");
  const [copyToast, setCopyToast] = useState<{ show: boolean; bankLabel: string }>({ show: false, bankLabel: "" });
  const copyToastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (transferFlowStatus !== "bank_details") {
      setCopyToast({ show: false, bankLabel: "" });
      if (copyToastTimerRef.current) {
        window.clearTimeout(copyToastTimerRef.current);
        copyToastTimerRef.current = null;
      }
    }
  }, [transferFlowStatus]);

  useEffect(() => {
    if (transferFlowStatus !== "bank_details") return;
    setCountdownSec(86399);
    const id = window.setInterval(() => {
      setCountdownSec((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [transferFlowStatus]);

  useEffect(() => {
    if (transferFlowStatus === "upload_proof") {
      setPaymentDate(new Date().toISOString().slice(0, 10));
      setProofFileName("");
      setProofNote("");
    }
  }, [transferFlowStatus]);

  const showCopyToast = (bankLabel: string, durationMs: number) => {
    if (copyToastTimerRef.current) window.clearTimeout(copyToastTimerRef.current);
    setCopyToast({ show: true, bankLabel });
    copyToastTimerRef.current = window.setTimeout(() => {
      setCopyToast({ show: false, bankLabel: "" });
      copyToastTimerRef.current = null;
    }, durationMs);
  };

  const copyBankTransferDetails = (bank: TransferBank) => {
    const text = [
      `${bank.fullName} — ${bank.shortName}`,
      bank.channelLabel,
      `No. rekening: ${bank.accountNumber}`,
      `Atas nama: ${bank.accountHolder}`,
    ].join("\n");
    const p = navigator.clipboard?.writeText(text);
    if (!p) {
      showCopyToast("Gagal menyalin — clipboard tidak tersedia", 3200);
      return;
    }
    void p.then(
      () => showCopyToast(`${bank.shortName} · ${bank.accountNumber}`, 2800),
      () => showCopyToast("Gagal menyalin — izinkan akses clipboard", 3200)
    );
  };

  const onHeaderBack = () => {
    if (tunaiFlowStatus !== "idle") {
      onResetTunaiFlow();
      return;
    }
    if (transferFlowStatus !== "idle") {
      if (transferFlowStatus === "upload_proof") {
        onTransferBackToBankDetails();
        return;
      }
      onResetTransferFlow();
      return;
    }
    setScreen("beranda");
  };

  const methodSubtitle = (method: string) => {
    if (method === "QRIS") return "Scan via aplikasi bank/e-wallet";
    if (method === "Transfer Bank") return "Virtual Account BCA, Mandiri, BNI";
    return "Pembayaran di lokasi";
  };

  const isBayarTunai = paymentMethod === "Bayar Tunai";
  const isTransferBank = paymentMethod === "Transfer Bank";
  const canSendProof =
    proofFileName.trim().length > 0 &&
    paymentDate.length > 0 &&
    (transferFlowStatus !== "upload_proof" || transferBankId != null);

  if (tunaiFlowStatus === "awaiting_operator") {
    return (
      <div className="pb-24 min-h-[60vh] flex flex-col">
        <header className="w-full px-6 py-5 flex items-center justify-between sticky top-0 bg-[#F2FDFB]/90 backdrop-blur-md z-20">
          <button type="button" onClick={onHeaderBack} className="text-[#004D4D] text-2xl p-2 -ml-2 rounded-full leading-none" aria-label="Kembali">
            ‹
          </button>
          <h2 className="text-lg font-extrabold text-[#004D4D] tracking-tight">Pembayaran</h2>
          <div className="w-10" />
        </header>

        <div className="px-6 pt-4 flex-1 flex flex-col pb-4">
          <div className="w-[4.5rem] h-[4.5rem] mx-auto rounded-full bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-center text-[2.25rem] shadow-sm">
            ⏳
          </div>
          <h3 className="text-center text-xl font-extrabold text-[#004D4D] mt-5 leading-tight px-2">Menunggu konfirmasi petugas</h3>
          <p className="text-center text-sm text-gray-600 mt-2.5 leading-relaxed px-1">
            Bawa tunai ke <strong className="text-[#004D4D]">meja resepsionis</strong> untuk menyelesaikan pembayaran ini.
          </p>

          <div className="mt-8 bg-white rounded-[1.75rem] p-5 shadow-sm border border-[#D0F5ED]">
            <div className="flex justify-between items-start gap-3">
              <div>
                <p className="text-[10px] font-extrabold tracking-widest text-[#008080] uppercase">Total tagihan</p>
                <p className="text-[1.65rem] font-extrabold mt-1 leading-none text-[#004D4D]">{BILL_AMOUNT_LABEL}</p>
              </div>
              <span className="shrink-0 text-[10px] font-extrabold uppercase tracking-wide text-[#92400E] bg-[#FDE68A]/90 border border-[#F59E0B]/40 px-3 py-1.5 rounded-full">
                Pending
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-white rounded-2xl p-4 border border-[#D0F5ED] shadow-sm">
              <p className="text-[9px] font-extrabold tracking-widest text-[#008080] uppercase">ID transaksi</p>
              <p className="font-mono text-[11px] font-bold text-[#004D4D] mt-2.5 leading-snug break-all">{tunaiRefId}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-[#D0F5ED] shadow-sm">
              <p className="text-[9px] font-extrabold tracking-widest text-[#008080] uppercase">Metode</p>
              <div className="flex items-center gap-2 mt-2.5">
                <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#9DE4F8] to-[#B3F7E5] flex items-center justify-center text-[#004D4D]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                </span>
                <span className="text-[11px] font-bold text-[#004D4D] leading-tight">Bayar tunai</span>
              </div>
            </div>
          </div>

          <div className="mt-4 relative overflow-hidden bg-[#F2FDFB] rounded-[1.75rem] p-5 border border-[#D0F5ED] shadow-sm">
            <span className="absolute -right-1 top-1/2 -translate-y-1/2 text-[7rem] font-black text-[#D0F5ED] leading-none select-none pointer-events-none" aria-hidden>
              i
            </span>
            <div className="relative flex gap-3.5">
              <div className="w-12 h-12 shrink-0 rounded-full bg-gradient-to-br from-[#004D4D] to-[#008080] flex items-center justify-center text-lg shadow-md shadow-[#008080]/25 text-[#90EE90]">
                🎧
              </div>
              <div className="min-w-0 pt-0.5">
                <h4 className="font-extrabold text-[#004D4D] text-sm">Langkah berikutnya</h4>
                <p className="text-[11px] text-gray-600 mt-1.5 leading-relaxed">
                  Petugas akan memverifikasi tunai dan memperbarui status secara real-time. Jangan tutup layar ini sampai pembayaran dikonfirmasi.
                </p>
              </div>
            </div>
          </div>

          <a
            href="tel:+6280000000000"
            className="mt-8 w-full py-4 rounded-[1.25rem] font-extrabold text-sm text-[#90EE90] text-center shadow-lg shadow-[#008080]/30 bg-gradient-to-r from-[#004D4D] to-[#008080]"
          >
            Hubungi petugas
          </a>
          <button
            type="button"
            onClick={onResetTunaiFlow}
            className="w-full mt-3 py-3.5 rounded-[1.25rem] border-2 border-[#D0F5ED] font-bold text-sm text-[#008080] bg-white"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onSimulateOperatorConfirm}
            className="w-full mt-2 py-2 text-xs font-bold text-[#008080] underline underline-offset-2"
          >
            Simulasi: petugas mengonfirmasi (demo)
          </button>
        </div>
      </div>
    );
  }

  if (tunaiFlowStatus === "confirmed") {
    return (
      <PaymentConfirmationReceipt
        onBack={onHeaderBack}
        onUnduhKwitansi={() => setScreen("kwitansi")}
        onKembaliBeranda={() => {
          onResetTunaiFlow();
          setScreen("beranda");
        }}
        methodLine="Bayar tunai (terverifikasi)"
        transactionId={tunaiRefId.replace(/-CON$/i, "-C")}
      />
    );
  }

  if (transferFlowStatus === "bank_details") {
    return (
      <div className="pb-24">
        <header className="w-full px-6 py-5 flex items-center justify-between sticky top-0 bg-[#F2FDFB]/90 backdrop-blur-md z-20">
          <button type="button" onClick={onHeaderBack} className="text-[#004D4D] text-2xl p-2 -ml-2 rounded-full leading-none" aria-label="Kembali">
            ‹
          </button>
          <h2 className="text-lg font-extrabold text-[#004D4D] tracking-tight">Detail pembayaran</h2>
          <button type="button" className="text-[#008080] p-2 -mr-2 text-lg leading-none" aria-label="Bantuan">
            ?
          </button>
        </header>

        <div className="px-6 pt-2">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#9DE4F8] to-[#B3F7E5] flex items-center justify-center text-[#004D4D] text-xl shrink-0 border border-[#D0F5ED]">
              🏦
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-[#004D4D] leading-tight">Transfer bank</h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Selesaikan transfer dalam{" "}
                <span className="font-extrabold text-[#B45309] tabular-nums">{formatCountdown(countdownSec)}</span>
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {TRANSFER_BANKS.map((bank) => {
              const selected = transferBankId === bank.id;
              return (
                <div
                  key={bank.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelectTransferBank(bank.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelectTransferBank(bank.id);
                    }
                  }}
                  className={`w-full text-left rounded-[1.25rem] p-4 border-2 shadow-sm transition-colors bg-white cursor-pointer ${
                    selected ? "border-[#004D4D] ring-1 ring-[#004D4D]/15" : "border-[#D0F5ED]"
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">{bank.fullName}</p>
                      <p className="text-lg font-extrabold text-[#004D4D] mt-0.5">{bank.shortName}</p>
                    </div>
                    <span
                      className={`shrink-0 text-[9px] font-extrabold uppercase tracking-wide px-2.5 py-1 rounded-full ${
                        bank.channelLabel.includes("ATM")
                          ? "bg-[#FFF7ED] text-[#EA580C]/45 border border-dashed border-orange-200/80 opacity-80"
                          : "bg-[#E6FBF7] text-[#008080] border border-[#D0F5ED]"
                      }`}
                    >
                      {bank.channelLabel}
                    </span>
                  </div>
                  <div className="mt-3 flex items-end justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[9px] font-extrabold text-[#008080] uppercase tracking-wider">Nomor rekening</p>
                      <p className="font-mono text-base font-extrabold text-[#004D4D] mt-0.5 tracking-tight">{bank.accountNumber}</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyBankTransferDetails(bank);
                      }}
                      className="shrink-0 text-[10px] font-extrabold uppercase tracking-wide text-[#008080] bg-[#F2FDFB] border border-[#D0F5ED] px-3 py-1.5 rounded-lg"
                    >
                      Salin
                    </button>
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#D0F5ED]">
                    <p className="text-[9px] font-extrabold text-[#008080] uppercase tracking-wider">Atas nama</p>
                    <p className="text-sm font-bold text-[#004D4D] mt-0.5">{bank.accountHolder}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-[1.25rem] border border-[#D0F5ED] bg-[#F2FDFB] p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#008080]">ⓘ</span>
              <h4 className="font-extrabold text-sm text-[#004D4D]">Cara bayar</h4>
            </div>
            <ol className="space-y-2.5 text-xs text-gray-600 leading-relaxed list-decimal list-inside">
              <li>
                Pilih bank dan salin nomor rekening di atas. Transfer <span className="font-extrabold text-[#004D4D]">tepat</span> sebesar{" "}
                <span className="font-extrabold text-[#004D4D]">{BILL_AMOUNT_LABEL}</span>.
              </li>
              <li>Setelah transfer, ketuk <span className="font-extrabold text-[#004D4D]">Saya sudah transfer</span> lalu unggah bukti.</li>
              <li>Tim kami akan memverifikasi pembayaran Anda.</li>
            </ol>
          </div>

          <button
            type="button"
            disabled={!transferBankId}
            onClick={onTransferProceedToUpload}
            className={`w-full mt-6 py-4 rounded-[1.25rem] font-extrabold text-sm shadow-lg ${
              transferBankId
                ? "text-[#90EE90] shadow-[#008080]/30 bg-gradient-to-r from-[#004D4D] to-[#008080]"
                : "text-gray-400 bg-[#D0F5ED] cursor-not-allowed"
            }`}
          >
            Saya sudah transfer
          </button>
        </div>

        {copyToast.show ? (
          <div
            role="status"
            aria-live="polite"
            className="fixed inset-0 z-[60] flex items-center justify-center px-6 pointer-events-none"
          >
            <div
              className={`relative max-w-sm w-full rounded-2xl px-4 py-3.5 shadow-2xl border text-center ${
                copyToast.bankLabel.startsWith("Gagal")
                  ? "bg-[#FFFBEB] border-[#F59E0B]/50 text-[#92400E]"
                  : "bg-[#004D4D] border-white/15 text-[#90EE90]"
              }`}
            >
              <p className="text-sm font-extrabold flex items-center justify-center gap-2">
                <span aria-hidden>{copyToast.bankLabel.startsWith("Gagal") ? "!" : "✓"}</span>
                {copyToast.bankLabel.startsWith("Gagal") ? "Tidak tersalin" : "Disalin ke papan klip"}
              </p>
              <p
                className={`text-[11px] mt-1 font-semibold break-words ${
                  copyToast.bankLabel.startsWith("Gagal") ? "text-[#B45309]" : "text-white/90"
                }`}
              >
                {copyToast.bankLabel}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  if (transferFlowStatus === "upload_proof") {
    return (
      <div className="pb-24">
        <header className="w-full px-6 py-5 flex items-center justify-between sticky top-0 bg-[#F2FDFB]/90 backdrop-blur-md z-20">
          <button type="button" onClick={onHeaderBack} className="text-[#004D4D] text-2xl p-2 -ml-2 rounded-full leading-none" aria-label="Kembali">
            ‹
          </button>
          <h2 className="text-lg font-extrabold text-[#004D4D] tracking-tight">Unggah bukti</h2>
          <div className="w-10" />
        </header>

        <div className="px-6 pt-2 space-y-5">
          {selectedTransferBank ? (
            <div className="rounded-[1.25rem] border-2 border-[#D0F5ED] bg-white p-4 shadow-sm">
              <p className="text-[10px] font-extrabold tracking-widest text-[#008080] uppercase mb-3">Rekening tujuan</p>
              <div className="space-y-3">
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">Bank</p>
                  <p className="text-sm font-extrabold text-[#004D4D] mt-0.5">{selectedTransferBank.fullName}</p>
                  <p className="text-xs font-bold text-[#008080] mt-0.5">{selectedTransferBank.shortName}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">Cabang</p>
                  <p className="text-xs font-semibold text-gray-700 mt-0.5 leading-relaxed">{selectedTransferBank.branch}</p>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2 border-t border-[#D0F5ED]">
                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">No. rekening</p>
                    <p className="font-mono text-sm font-extrabold text-[#004D4D] mt-0.5 tracking-tight">{selectedTransferBank.accountNumber}</p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">Atas nama</p>
                    <p className="text-sm font-bold text-[#004D4D] mt-0.5">{selectedTransferBank.accountHolder}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border-2 border-amber-200 bg-[#FFFBEB] px-4 py-3 text-xs font-semibold text-[#92400E]">
              Bank belum dipilih. Kembali satu langkah untuk memilih rekening tujuan.
            </div>
          )}

          <label htmlFor="proof-upload" className="block cursor-pointer">
            <input
              id="proof-upload"
              type="file"
              accept="image/*,.pdf"
              className="sr-only"
              onChange={(e) => {
                const f = e.target.files?.[0];
                setProofFileName(f ? f.name : "");
              }}
            />
            <div className="rounded-[1.25rem] border-2 border-dashed border-[#D0F5ED] bg-[#F2FDFB] px-4 py-8 text-center hover:border-[#008080]/40 transition-colors">
              <div className="w-11 h-11 mx-auto rounded-full bg-gradient-to-br from-[#004D4D] to-[#008080] flex items-center justify-center text-[#90EE90] text-lg mb-2">
                📎
              </div>
              <p className="text-sm font-bold text-[#004D4D]">Lampirkan bukti transfer</p>
              <p className="text-[11px] text-gray-500 mt-1">Ketuk area ini untuk memilih gambar atau PDF</p>
              {proofFileName ? <p className="text-xs font-bold text-[#008080] mt-2 truncate px-2">{proofFileName}</p> : null}
            </div>
          </label>

          <div>
            <label className="text-[10px] font-extrabold tracking-widest text-[#008080] uppercase block mb-1.5">Tanggal bayar</label>
            <div className="relative">
              <input
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                className="w-full rounded-xl border-2 border-[#D0F5ED] bg-white px-4 py-3 text-sm font-semibold text-[#004D4D] focus:outline-none focus:border-[#008080]"
              />
            </div>
            <p className="text-[10px] text-gray-500 mt-1">* Tanggal akan tercatat sesuai pilihan Anda</p>
          </div>

          <div>
            <label className="text-[10px] font-extrabold tracking-widest text-[#008080] uppercase block mb-1.5">Catatan (opsional)</label>
            <textarea
              value={proofNote}
              onChange={(e) => setProofNote(e.target.value)}
              rows={3}
              placeholder="Tambahkan catatan untuk petugas…"
              className="w-full rounded-xl border-2 border-[#D0F5ED] bg-white px-4 py-3 text-sm text-[#004D4D] placeholder:text-gray-400 focus:outline-none focus:border-[#008080] resize-none"
            />
          </div>

          <button
            type="button"
            disabled={!canSendProof}
            onClick={onTransferSubmitProof}
            className={`w-full py-4 rounded-[1.25rem] font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 ${
              canSendProof
                ? "text-[#90EE90] shadow-[#008080]/30 bg-gradient-to-r from-[#004D4D] to-[#008080]"
                : "text-gray-400 bg-[#D0F5ED] cursor-not-allowed"
            }`}
          >
            Kirim bukti pembayaran <span aria-hidden>›</span>
          </button>

          <div className="rounded-xl border border-[#BBF7D0] bg-[#ECFDF5] px-4 py-3 flex gap-2">
            <span className="text-[#15803D] shrink-0">ⓘ</span>
            <p className="text-[11px] text-[#166534] leading-relaxed">
              Verifikasi biasanya 1–2 jam kerja. Anda akan mendapat notifikasi setelah pembayaran dikonfirmasi.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (transferFlowStatus === "awaiting_operator") {
    const bankShort = selectedTransferBank?.shortName ?? "Bank";
    return (
      <div className="pb-24 min-h-[60vh] flex flex-col">
        <header className="w-full px-6 py-5 flex items-center justify-between sticky top-0 bg-[#F2FDFB]/90 backdrop-blur-md z-20">
          <button type="button" onClick={onHeaderBack} className="text-[#004D4D] text-2xl p-2 -ml-2 rounded-full leading-none" aria-label="Kembali">
            ‹
          </button>
          <h2 className="text-lg font-extrabold text-[#004D4D] tracking-tight">Pembayaran</h2>
          <div className="w-10" />
        </header>

        <div className="px-6 pt-4 flex-1 flex flex-col pb-4">
          <div className="w-[4.5rem] h-[4.5rem] mx-auto rounded-full bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-center text-[2.25rem] shadow-sm">
            ⏳
          </div>
          <h3 className="text-center text-xl font-extrabold text-[#004D4D] mt-5 leading-tight px-2">Menunggu verifikasi transfer</h3>
          <p className="text-center text-sm text-gray-600 mt-2.5 leading-relaxed px-1">
            Bukti Anda sedang ditinjau petugas. Pastikan nominal dan rekening tujuan sudah sesuai.
          </p>

          <div className="mt-8 bg-white rounded-[1.75rem] p-5 shadow-sm border border-[#D0F5ED]">
            <div className="flex justify-between items-start gap-3">
              <div>
                <p className="text-[10px] font-extrabold tracking-widest text-[#008080] uppercase">Total tagihan</p>
                <p className="text-[1.65rem] font-extrabold mt-1 leading-none text-[#004D4D]">{BILL_AMOUNT_LABEL}</p>
              </div>
              <span className="shrink-0 text-[10px] font-extrabold uppercase tracking-wide text-[#92400E] bg-[#FDE68A]/90 border border-[#F59E0B]/40 px-3 py-1.5 rounded-full">
                Pending
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-white rounded-2xl p-4 border border-[#D0F5ED] shadow-sm">
              <p className="text-[9px] font-extrabold tracking-widest text-[#008080] uppercase">ID transaksi</p>
              <p className="font-mono text-[11px] font-bold text-[#004D4D] mt-2.5 leading-snug break-all">{transferRefDisplay}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-[#D0F5ED] shadow-sm">
              <p className="text-[9px] font-extrabold tracking-widest text-[#008080] uppercase">Metode</p>
              <div className="flex items-center gap-2 mt-2.5">
                <span className="w-9 h-9 rounded-full bg-[#F2FDFB] border border-[#D0F5ED] flex items-center justify-center text-[#008080]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                </span>
                <span className="text-[11px] font-bold text-[#004D4D] leading-tight">Transfer {bankShort}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 relative overflow-hidden bg-[#F2FDFB] rounded-[1.75rem] p-5 border border-[#D0F5ED] shadow-sm">
            <span className="absolute -right-1 top-1/2 -translate-y-1/2 text-[7rem] font-black text-[#D0F5ED] leading-none select-none pointer-events-none" aria-hidden>
              i
            </span>
            <div className="relative flex gap-3.5">
              <div className="w-12 h-12 shrink-0 rounded-full bg-gradient-to-br from-[#004D4D] to-[#008080] flex items-center justify-center text-lg shadow-md shadow-[#008080]/25 text-[#90EE90]">
                🎧
              </div>
              <div className="min-w-0 pt-0.5">
                <h4 className="font-extrabold text-[#004D4D] text-sm">Langkah berikutnya</h4>
                <p className="text-[11px] text-gray-600 mt-1.5 leading-relaxed">
                  Petugas akan mencocokkan bukti dengan mutasi bank. Anda akan mendapat pemberitahuan saat pembayaran dikonfirmasi.
                </p>
              </div>
            </div>
          </div>

          <a
            href="tel:+6280000000000"
            className="mt-8 w-full py-4 rounded-[1.25rem] font-extrabold text-sm text-[#90EE90] text-center shadow-lg shadow-[#008080]/30 bg-gradient-to-r from-[#004D4D] to-[#008080]"
          >
            Hubungi petugas
          </a>
          <button type="button" onClick={onResetTransferFlow} className="w-full mt-3 py-3.5 rounded-[1.25rem] border-2 border-[#D0F5ED] font-bold text-sm text-[#008080] bg-white">
            Batal
          </button>
          <button
            type="button"
            onClick={onSimulateTransferConfirm}
            className="w-full mt-2 py-2 text-xs font-bold text-[#008080] underline underline-offset-2"
          >
            Simulasi: petugas mengonfirmasi (demo)
          </button>
        </div>
      </div>
    );
  }

  if (transferFlowStatus === "confirmed") {
    const bankShort = selectedTransferBank?.shortName ?? "Bank";
    return (
      <PaymentConfirmationReceipt
        onBack={onHeaderBack}
        onUnduhKwitansi={() => setScreen("kwitansi")}
        onKembaliBeranda={() => {
          onResetTransferFlow();
          setScreen("beranda");
        }}
        methodLine={`Transfer bank (${bankShort})`}
        transactionId={transferRefDisplay.replace(/-TRF$/i, "-C")}
      />
    );
  }

  return (
    <div className="pb-24">
      <header className="w-full px-6 py-5 flex items-center justify-between sticky top-0 bg-[#F2FDFB]/90 backdrop-blur-md z-20">
        <button type="button" onClick={onHeaderBack} className="text-[#004D4D] p-2 -ml-2 rounded-full" aria-label="Kembali">
          ‹
        </button>
        <h2 className="text-lg font-extrabold text-[#004D4D] tracking-tight">Pembayaran</h2>
        <button type="button" className="text-[#008080] p-2 -mr-2 relative">
          <span>🔔</span>
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#EAB308] rounded-full border border-white" />
        </button>
      </header>

      <div className="mx-6 mt-2 bg-gradient-to-r from-[#004D4D] to-[#008080] rounded-[2rem] p-8 text-center text-white shadow-lg shadow-[#008080]/20">
        <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-white/70">Tagihan — Juli 2026</p>
        <h3 className="text-4xl font-extrabold mt-3 tracking-tight">{BILL_AMOUNT_LABEL}</h3>
        <div className="inline-flex items-center gap-1.5 mt-4 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest text-[#90EE90]">
          <span>📅</span>
          Sewa bulan Juli
        </div>
      </div>

      <div className="mx-6 mt-8 flex justify-between items-end mb-4">
        <h3 className="font-extrabold text-lg text-[#004D4D]">Metode pembayaran</h3>
        <span className="text-[9px] font-extrabold text-[#008080] tracking-widest uppercase">Instan &amp; aman</span>
      </div>

      <div className="mx-6 space-y-3">
        {paymentMethods.map((method) => (
          <button
            key={method}
            type="button"
            onClick={() => setPaymentMethod(method)}
            className={`w-full rounded-2xl border-2 p-4 flex items-center justify-between shadow-sm transition-colors ${paymentMethod === method ? "border-[#004D4D] bg-white" : "border-[#D0F5ED] bg-white"}`}
          >
            <div className="flex items-center gap-4 text-left">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  method === "QRIS"
                    ? "bg-gradient-to-br from-[#9DE4F8] to-[#B3F7E5] text-[#004D4D]"
                    : method === "Transfer Bank"
                      ? "bg-[#F2FDFB] text-[#008080] border border-[#D0F5ED]"
                      : "bg-gradient-to-br from-[#9DE4F8] to-[#B3F7E5] text-[#004D4D]"
                }`}
              >
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
                <p className="text-[10px] font-medium text-gray-500 mt-1">{methodSubtitle(method)}</p>
              </div>
            </div>
            {paymentMethod === method ? (
              <span className="w-8 h-8 rounded-full bg-[#004D4D] border-2 border-[#004D4D] flex items-center justify-center text-[#90EE90] text-lg">✓</span>
            ) : (
              <span className="w-8 h-8 rounded-full border-2 border-[#D0F5ED]" />
            )}
          </button>
        ))}
      </div>

      {isBayarTunai && (
        <div className="mx-6 mt-6 rounded-2xl border border-[#D0F5ED] bg-[#E6FBF7] p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#008080] text-lg leading-none">ⓘ</span>
            <h4 className="font-extrabold text-sm text-[#004D4D]">Instruksi pembayaran</h4>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Silakan lakukan pembayaran tunai sebesar <strong className="text-[#004D4D]">{BILL_AMOUNT_LABEL}</strong> langsung di{" "}
            <strong className="text-[#004D4D]">meja resepsionis</strong> gedung. Setelah menyerahkan uang, ketuk konfirmasi di bawah;
            tunjukkan layar berikutnya kepada petugas untuk proses verifikasi.
          </p>
        </div>
      )}

      <div className="mx-6 mt-8">
        {isBayarTunai ? (
          <button
            type="button"
            onClick={onStartTunaiAwaiting}
            className="w-full py-4 rounded-[1.25rem] font-extrabold text-sm text-[#90EE90] shadow-lg shadow-[#008080]/30 bg-gradient-to-r from-[#004D4D] to-[#008080]"
          >
            Konfirmasi pembayaran ›
          </button>
        ) : isTransferBank ? (
          <button
            type="button"
            onClick={onStartTransferFlow}
            className="w-full bg-[#004D4D] text-[#90EE90] py-4 rounded-[1.25rem] font-extrabold text-sm shadow-lg shadow-[#008080]/30"
          >
            Bayar sekarang
          </button>
        ) : (
          <button type="button" onClick={() => setScreen("kwitansi")} className="w-full bg-[#004D4D] text-[#90EE90] py-4 rounded-[1.25rem] font-extrabold text-sm shadow-lg shadow-[#008080]/30">
            Bayar sekarang
          </button>
        )}
      </div>
    </div>
  );
}

const KWITANSI_DEMO_ID = "TX-20260601-0722";

export function KwitansiScreen({ paymentMethod }: { paymentMethod: string }) {
  const paymentDateLabel = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const shareBody = buildKwitansiShareMessage({
    amountLabel: BILL_AMOUNT_LABEL,
    periodLabel: "Juli 2026",
    unitLabel: "Kamar 302",
    transactionId: KWITANSI_DEMO_ID,
    paymentDateLabel,
    methodLine: paymentMethod,
  });
  const waKwitansiHref = `https://wa.me/${TENANT_WHATSAPP_DIGITS}?text=${encodeURIComponent(shareBody)}`;
  const emailKwitansiHref = `mailto:${TENANT_CONTACT_EMAIL}?subject=${encodeURIComponent("Kwitansi sewa — Kos Melati Indah")}&body=${encodeURIComponent(shareBody)}`;

  return (
    <div className="p-6 space-y-4 pb-28">
      <div className="rounded-3xl bg-gradient-to-br from-[#9DE4F8] to-[#B3F7E5] p-6 text-center">
        <div className="text-4xl">✅</div>
        <h3 className="text-3xl font-extrabold mt-2">{BILL_AMOUNT_LABEL}</h3>
        <p className="font-bold text-[#008080]">Lunas</p>
      </div>
      <div className={cardClass}>
        <p className="font-bold">ID: {KWITANSI_DEMO_ID}</p>
        <p className="text-sm text-gray-500 mt-1">Metode: {paymentMethod}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <a
          href={waKwitansiHref}
          target="_blank"
          rel="noopener noreferrer"
          className="py-3.5 rounded-xl border-2 border-[#D0F5ED] bg-white text-[#004D4D] text-[11px] font-bold flex flex-col items-center justify-center gap-1.5 no-underline active:bg-[#F2FDFB] text-center leading-tight px-1"
        >
          <KwitansiWaIcon className="w-6 h-6 shrink-0" />
          Kirim ke WA saya
        </a>
        <a
          href={emailKwitansiHref}
          className="py-3.5 rounded-xl border-2 border-[#D0F5ED] bg-white text-[#004D4D] text-[11px] font-bold flex flex-col items-center justify-center gap-1.5 no-underline active:bg-[#F2FDFB] text-center leading-tight px-1"
        >
          <KwitansiEmailIcon className="w-6 h-6 shrink-0 text-[#008080]" />
          Kirim ke email saya
        </a>
      </div>
    </div>
  );
}

export function KamarScreen({
  setScreen,
  contractRenewal,
  tanggalPembuka,
}: {
  setScreen: SetScreen;
  contractRenewal: ContractRenewalInfo | null;
  tanggalPembuka: string;
}) {
  const showRenewalCta =
    contractRenewal != null && (contractRenewal.isInCountdownWindow || contractRenewal.isExpired);

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
            <p className="font-extrabold text-sm text-[#004D4D] mt-0.5">{tanggalPembuka}</p>
          </div>
        </div>

        {contractRenewal != null && (
          <div className="mt-4 relative z-10 space-y-2">
            <div className="rounded-2xl border border-[#D0F5ED] bg-white/90 px-4 py-3">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Kontrak berakhir</p>
              <p className="font-extrabold text-sm text-[#004D4D] mt-0.5">{contractRenewal.endDateLabel}</p>
            </div>
            {contractRenewal.isInCountdownWindow && (
              <div className="rounded-2xl border border-[#FDE047]/80 bg-gradient-to-r from-[#FFFBEB] to-[#FEF9C3] px-4 py-3">
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#B45309]">Sisa masa sewa</p>
                <p className="text-2xl font-extrabold text-[#92400E] mt-0.5">{contractRenewal.daysRemaining} hari</p>
                <p className="text-[11px] text-[#92400E]/85 font-medium mt-1 leading-snug">
                  Ajukan perpanjangan agar akses kunci digital tidak terputus.
                </p>
              </div>
            )}
            {contractRenewal.isExpired && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-red-700">Masa sewa</p>
                <p className="text-sm font-extrabold text-red-800 mt-0.5">Sudah melewati tanggal berakhir</p>
                <p className="text-[11px] text-red-700/90 font-medium mt-1">Segera ajukan perpanjangan lewat dokumen kontrak.</p>
              </div>
            )}
          </div>
        )}

        {showRenewalCta && (
          <button
            type="button"
            onClick={() => setScreen("kontrakDokumenSigned")}
            className="w-full mt-3 bg-[#004D4D] text-[#90EE90] py-3 rounded-xl font-bold text-sm shadow-md relative z-10"
          >
            Ajukan Perpanjangan
          </button>
        )}

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
