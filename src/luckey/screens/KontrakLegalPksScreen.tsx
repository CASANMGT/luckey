import { useMemo, type Dispatch, type SetStateAction } from "react";
import { cardClass } from "../constants";
import { buildLegalPksMeta, buildLegalPksSections, LEGAL_PKS_TITLE } from "../data/legalPksKontrak";
import type { LegalPksProfile } from "../data/legalPksProfile";
import { isLegalPksTenantIdentityComplete, legalPksTenantIdentityHint } from "../data/legalPksProfile";

type KontrakLegalPksScreenProps = {
  pksProfile: LegalPksProfile;
  setPksProfile: Dispatch<SetStateAction<LegalPksProfile>>;
  /** True setelah user menekan konfirmasi baca (alur unsigned). */
  alreadyReadConfirmed: boolean;
  onBack: () => void;
  requireAcknowledge?: boolean;
  onAcknowledgeRead?: () => void;
};

function digitsOnly(s: string, maxLen: number) {
  return s.replace(/\D/g, "").slice(0, maxLen);
}

const TLDR_BULLETS = [
  "🏠 Kamu sewa kamar + pakai smart lock",
  "🔑 Akses kamar = tergantung pembayaran",
  "💸 Telat bayar → akses bisa mati otomatis",
  "⏳ Ada grace period sebelum lock",
  "🚫 Jangan share PIN",
  "📱 Semua aktivitas tercatat di sistem",
  "⚖️ Setuju via app = sah secara hukum",
] as const;

function FieldValidTick({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <span
      className="pointer-events-none absolute right-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-[#90EE90] text-[#004D4D] shadow-sm shadow-[#90EE90]/40"
      aria-hidden
    >
      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

export function KontrakLegalPksScreen({
  pksProfile,
  setPksProfile,
  alreadyReadConfirmed,
  onBack,
  requireAcknowledge = false,
  onAcknowledgeRead,
}: KontrakLegalPksScreenProps) {
  const meta = useMemo(() => buildLegalPksMeta(pksProfile), [pksProfile]);
  const sections = useMemo(() => buildLegalPksSections(pksProfile), [pksProfile]);
  const nikDigits = pksProfile.nikPenyewa.replace(/\D/g, "");
  const hpDigits = pksProfile.hpPenyewa.replace(/\D/g, "");
  const nikValid = nikDigits.length === 16;
  const hpValid = hpDigits.length >= 10;

  const identityOk = isLegalPksTenantIdentityComplete(pksProfile);
  const identityHint = legalPksTenantIdentityHint(pksProfile);
  const canConfirmRead = requireAcknowledge && identityOk;

  return (
    <div className="p-6 pb-32 space-y-4">
      <header className="w-full flex items-center justify-between sticky top-0 z-10 -mx-6 px-6 py-2 bg-[#F2FDFB]/95 backdrop-blur-sm border-b border-[#D0F5ED]/80">
        <button
          type="button"
          onClick={onBack}
          className="text-[#004D4D] text-2xl leading-none min-w-[2rem]"
          aria-label="Kembali"
        >
          ‹
        </button>
        <h2 className="text-sm font-extrabold text-[#004D4D] tracking-tight text-center flex-1 px-2">
          Syarat &amp; Ketentuan — Legal PKS
        </h2>
        <div className="w-6" />
      </header>

      {alreadyReadConfirmed && (
        <div
          className="flex items-start gap-2 rounded-2xl border border-[#90EE90]/70 bg-[#90EE90]/15 px-3 py-2.5"
          role="status"
        >
          <span className="text-[#004D4D] font-extrabold text-sm shrink-0" aria-hidden>
            ✓
          </span>
          <p className="text-[11px] font-bold text-[#004D4D] leading-snug">
            Anda sudah mengonfirmasi telah membaca Legal PKS. Anda dapat membuka ulang dokumen ini kapan saja.
          </p>
        </div>
      )}

      <div className={cardClass}>
        <div className="bg-[#F2FDFB] px-4 py-3 -mx-4 -mt-4 mb-3 border-b border-[#D0F5ED] rounded-t-3xl">
          <span className="text-[10px] font-extrabold tracking-widest uppercase text-[#008080]">Data dokumen (otomatis + penyewa)</span>
        </div>
        <p className="text-[10px] text-[#008080] font-semibold leading-relaxed mb-3">
          Kos, kamar, tanggal, dan biaya diisi dari data sewa Anda. Lengkapi{" "}
          <strong className="text-[#004D4D]">NIK</strong> dan <strong className="text-[#004D4D]">nomor HP</strong> agar dokumen sah untuk ditandatangani.
        </p>
        <div className="grid gap-2.5">
          <label className="block">
            <span className="text-[9px] font-extrabold tracking-widest uppercase text-[#008080]">Nama penyewa</span>
            <input
              type="text"
              value={pksProfile.namaPenyewa}
              onChange={(e) => setPksProfile((prev) => ({ ...prev, namaPenyewa: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-[#D0F5ED] bg-white px-3 py-2 text-xs font-semibold text-[#004D4D] placeholder:text-gray-400"
              placeholder="Nama lengkap"
            />
          </label>
          <label className="block">
            <span className="text-[9px] font-extrabold tracking-widest uppercase text-[#008080]">NIK (16 digit) *</span>
            <div className="relative mt-1">
              <input
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={pksProfile.nikPenyewa}
                onChange={(e) =>
                  setPksProfile((prev) => ({ ...prev, nikPenyewa: digitsOnly(e.target.value, 16) }))
                }
                className={`w-full rounded-xl border bg-white px-3 py-2 pr-11 text-xs font-semibold text-[#004D4D] tracking-wide ${
                  nikValid ? "border-[#90EE90] ring-1 ring-[#90EE90]/40" : "border-[#D0F5ED]"
                }`}
                placeholder="Contoh: 3175xxxxxxxxxxxx"
                maxLength={16}
                aria-invalid={!nikValid && nikDigits.length > 0}
              />
              <FieldValidTick show={nikValid} />
            </div>
          </label>
          <label className="block">
            <span className="text-[9px] font-extrabold tracking-widest uppercase text-[#008080]">No. HP *</span>
            <div className="relative mt-1">
              <input
                type="tel"
                inputMode="numeric"
                value={pksProfile.hpPenyewa}
                onChange={(e) =>
                  setPksProfile((prev) => ({ ...prev, hpPenyewa: digitsOnly(e.target.value, 15) }))
                }
                className={`w-full rounded-xl border bg-white px-3 py-2 pr-11 text-xs font-semibold text-[#004D4D] ${
                  hpValid ? "border-[#90EE90] ring-1 ring-[#90EE90]/40" : "border-[#D0F5ED]"
                }`}
                placeholder="08xxxxxxxxxx"
                aria-invalid={!hpValid && hpDigits.length > 0}
              />
              <FieldValidTick show={hpValid} />
            </div>
          </label>
          <label className="block">
            <span className="text-[9px] font-extrabold tracking-widest uppercase text-[#008080]">Alamat penyewa (opsional)</span>
            <input
              type="text"
              value={pksProfile.alamatPenyewa}
              onChange={(e) => setPksProfile((prev) => ({ ...prev, alamatPenyewa: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-[#D0F5ED] bg-white px-3 py-2 text-xs font-semibold text-[#004D4D]"
              placeholder="Alamat asal / domisili"
            />
          </label>
        </div>
        {identityHint && (
          <p className="mt-2 text-[10px] font-bold text-[#B45309]">{identityHint}</p>
        )}
      </div>

      <p className="text-center text-xs text-[#008080] font-medium leading-relaxed px-1">
        Mulai dengan membaca <strong className="text-[#004D4D]">seluruh</strong> teks Legal PKS di bawah ini (identitas, objek sewa, IoT, pembayaran, dan persetujuan digital).{" "}
        <strong className="text-[#004D4D]">Setelah itu</strong>, ringkasan <strong className="text-[#004D4D]">TL;DR</strong> ada di bagian paling bawah sebagai pengingat singkat—bukan pengganti dokumen lengkap.
      </p>

      <div className={cardClass}>
        <div className="bg-[#F2FDFB] px-4 py-3 -mx-4 -mt-4 mb-4 border-b border-[#D0F5ED] rounded-t-3xl">
          <span className="text-[10px] font-extrabold tracking-widest uppercase text-[#008080]">Legal PKS</span>
        </div>
        <h3 className="text-center font-extrabold text-[#004D4D] text-sm tracking-wide whitespace-pre-line leading-snug mb-3">
          {LEGAL_PKS_TITLE}
        </h3>
        <p className="text-xs text-gray-600 whitespace-pre-line leading-relaxed mb-6 border-l-2 border-[#90EE90] pl-3">
          {meta}
        </p>

        <div className="space-y-6">
          {sections.map((section) => (
            <section key={section.title} className="border-t border-[#D0F5ED] pt-4 first:border-t-0 first:pt-0">
              <h4 className="text-[11px] font-extrabold text-[#004D4D] tracking-wide uppercase mb-2">{section.title}</h4>
              {section.blocks.map((block, i) => (
                <p
                  key={i}
                  className="text-xs text-gray-600 whitespace-pre-line leading-relaxed mb-3 last:mb-0"
                >
                  {block}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-[#90EE90]/50 bg-gradient-to-br from-[#F2FDFB] via-white to-[#E6FBF7] p-4 shadow-sm shadow-[#90EE90]/10">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg" aria-hidden>
            ⚡
          </span>
          <h3 className="text-sm font-extrabold text-[#004D4D] tracking-tight">TL;DR (Executive Version)</h3>
        </div>
        <ul className="space-y-2.5 list-none pl-0">
          {TLDR_BULLETS.map((line) => (
            <li key={line} className="text-xs font-semibold text-[#004D4D] leading-snug pl-0">
              {line}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[10px] font-bold text-[#008080] leading-relaxed border-t border-[#D0F5ED] pt-3">
          Ini hanya ringkasan. Wajib membaca seluruh pasal Legal PKS di atas terlebih dahulu sebelum menyetujui.
        </p>
      </div>

      {requireAcknowledge && onAcknowledgeRead && (
        <div className="fixed bottom-0 left-0 right-0 max-w-[400px] mx-auto p-4 pb-8 bg-gradient-to-t from-[#F2FDFB] via-[#F2FDFB] to-transparent z-20 border-t border-[#D0F5ED] sm:rounded-b-[2rem] sm:static sm:border-0 sm:bg-transparent sm:p-0 sm:pb-0 space-y-2">
          {!identityOk && (
            <p className="text-center text-[10px] font-bold text-[#008080] px-2">
              Isi NIK (16 digit) dan nomor HP untuk mengaktifkan konfirmasi pembacaan.
            </p>
          )}
          <button
            type="button"
            disabled={!canConfirmRead}
            onClick={() => {
              onAcknowledgeRead();
              onBack();
            }}
            className={`w-full rounded-2xl py-3.5 font-bold shadow-md text-sm ${
              canConfirmRead
                ? "bg-[#004D4D] text-[#90EE90]"
                : "bg-[#D0F5ED] text-[#008080] cursor-not-allowed"
            }`}
          >
            Saya telah membaca seluruh Legal PKS
          </button>
        </div>
      )}
    </div>
  );
}
