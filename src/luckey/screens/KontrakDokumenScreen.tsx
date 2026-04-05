import { cardClass } from "../constants";
import type { PointerEvent, RefObject } from "react";

type KontrakDokumenUnsignedScreenProps = {
  onBack: () => void;
  onOpenLegalPks: () => void;
  legalPksViewed: boolean;
  signatoryDefaultName: string;
  signatureMode: "draw" | "typed";
  setSignatureMode: (mode: "draw" | "typed") => void;
  typedSignatureName: string;
  setTypedSignatureName: (value: string) => void;
  canvasRef: RefObject<HTMLCanvasElement>;
  drawStart: (e: PointerEvent<HTMLCanvasElement>) => void;
  drawMove: (e: PointerEvent<HTMLCanvasElement>) => void;
  drawEnd: () => void;
  clearSignature: () => void;
  tncChecked: boolean;
  setTncChecked: (value: boolean | ((prev: boolean) => boolean) ) => void;
  canSubmitSignature: boolean;
  onSubmit: () => void;
};

export function KontrakDokumenUnsignedScreen({
  onBack,
  onOpenLegalPks,
  legalPksViewed,
  signatoryDefaultName,
  signatureMode,
  setSignatureMode,
  typedSignatureName,
  setTypedSignatureName,
  canvasRef,
  drawStart,
  drawMove,
  drawEnd,
  clearSignature,
  tncChecked,
  setTncChecked,
  canSubmitSignature,
  onSubmit,
}: KontrakDokumenUnsignedScreenProps) {
  const pillOn = "bg-[#004D4D] text-[#90EE90] shadow-sm";
  const pillOff = "bg-white border border-[#D0F5ED] text-[#004D4D]";
  return (
    <div className="p-6 space-y-4">
      <header className="w-full flex items-center justify-between">
        <button type="button" onClick={onBack} className="text-[#004D4D] text-2xl leading-none min-w-[2rem]" aria-label="Kembali">
          ‹
        </button>
        <h2 className="text-lg font-extrabold text-[#004D4D] tracking-tight">Kontrak Sewa Digital</h2>
        <div className="w-6" />
      </header>
      <p className="text-center text-sm text-[#008080] font-medium leading-relaxed">Selesaikan proses verifikasi dokumen untuk mengaktifkan kunci digital Anda.</p>

      {legalPksViewed && (
        <div
          className="flex items-center gap-2.5 rounded-2xl border border-[#90EE90]/80 bg-gradient-to-r from-[#90EE90]/25 to-[#6EE0AF]/15 px-3.5 py-3 shadow-sm"
          role="status"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#004D4D] text-[#90EE90] text-lg font-extrabold">
            ✓
          </div>
          <div>
            <p className="text-xs font-extrabold text-[#004D4D]">Legal PKS sudah dibaca</p>
            <p className="text-[10px] text-[#008080] font-semibold leading-snug mt-0.5">
              Anda telah mengonfirmasi pembacaan dokumen. Lengkapi tanda tangan dan centang persetujuan di bawah.
            </p>
          </div>
        </div>
      )}

      <div className={cardClass}>
        <div className="bg-[#F2FDFB] px-4 py-3 -mx-4 -mt-4 mb-4 border-b border-[#D0F5ED] flex justify-between items-center rounded-t-3xl">
          <span className="text-[10px] font-extrabold tracking-widest uppercase text-[#008080]">Document ID: #KL-2026-083</span>
          <span className="text-[#008080]">📄</span>
        </div>
        <h3 className="text-center font-extrabold text-[#004D4D] text-lg tracking-wide mb-4">PERJANJIAN SEWA MENYEWA</h3>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">Bahwa pada hari ini, <strong className="text-[#004D4D]">24 Mei 2026</strong>, yang bertanda tangan di bawah ini:</p>
        <div className="border-l-2 border-[#90EE90] pl-3 mb-4 space-y-2">
          <p className="text-sm text-gray-600"><em className="text-[#008080]">Pihak Pertama (Pemilik):</em> PT. Luckey Estate Indonesia</p>
          <p className="text-sm text-gray-600"><em className="text-[#008080]">Pihak Kedua (Penyewa):</em> {signatoryDefaultName || "Penyewa"}</p>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">Kedua belah pihak sepakat untuk melakukan perjanjian sewa menyewa unit hunian dengan ketentuan sebagai berikut...</p>
        <button
          type="button"
          onClick={onOpenLegalPks}
          className="mt-4 w-full text-center text-xs font-extrabold text-[#008080] underline underline-offset-2 decoration-[#008080]/40"
        >
          Baca Syarat &amp; Ketentuan — Legal PKS lengkap
        </button>
      </div>

      <div className="space-y-3">
        <p className="font-bold text-[#008080]">Tanda Tangan Digital</p>
        <p className="text-[10px] text-[#008080] font-semibold leading-relaxed -mt-1">
          Pilih coret langsung di kotak, atau gunakan nama Anda dengan gaya tulisan tangan jika sulit menandatangani di layar.
        </p>
        <div className="flex gap-2 mt-2">
          <button
            type="button"
            onClick={() => {
              setSignatureMode("draw");
            }}
            className={`flex-1 rounded-xl py-2.5 text-[10px] font-extrabold tracking-wide uppercase ${signatureMode === "draw" ? pillOn : pillOff}`}
          >
            Coret tangan
          </button>
          <button
            type="button"
            onClick={() => {
              clearSignature();
              setSignatureMode("typed");
            }}
            className={`flex-1 rounded-xl py-2.5 text-[10px] font-extrabold tracking-wide uppercase ${signatureMode === "typed" ? pillOn : pillOff}`}
          >
            Nama (tulisan tangan)
          </button>
        </div>

        {signatureMode === "draw" ? (
          <canvas
            ref={canvasRef}
            width={320}
            height={130}
            onPointerDown={drawStart}
            onPointerMove={drawMove}
            onPointerUp={drawEnd}
            onPointerLeave={drawEnd}
            className="mt-3 w-full h-32 rounded-2xl border-2 border-dashed border-[#008080]/30 bg-[#F2FDFB] touch-none"
          />
        ) : (
          <div className="mt-3 space-y-2">
            <div
              className="flex min-h-[8rem] w-full items-center justify-center rounded-2xl border-2 border-dashed border-[#008080]/30 bg-[#F2FDFB] px-4 py-6"
              aria-label="Pratinjau tanda tangan bergaya tulisan tangan"
            >
              <span
                className="luckey-handwriting-signature text-center text-[1.85rem] leading-tight text-[#004D4D] -rotate-1"
                style={{ textShadow: "0 1px 0 rgba(0,77,77,0.08)" }}
              >
                {typedSignatureName.trim() || "Nama Anda"}
              </span>
            </div>
            <label className="block">
              <span className="text-[9px] font-extrabold tracking-widest uppercase text-[#008080]">Nama untuk tanda tangan</span>
              <input
                type="text"
                value={typedSignatureName}
                onChange={(e) => setTypedSignatureName(e.target.value)}
                placeholder={signatoryDefaultName || "Contoh: Dewi Lestari"}
                className="mt-1 w-full rounded-xl border border-[#D0F5ED] bg-white px-3 py-2 text-xs font-semibold text-[#004D4D] placeholder:text-gray-400"
              />
            </label>
            <button
              type="button"
              onClick={() => setTypedSignatureName(signatoryDefaultName)}
              className="text-[10px] font-extrabold text-[#008080] underline underline-offset-2"
            >
              Gunakan nama dari profil ({signatoryDefaultName || "—"})
            </button>
          </div>
        )}
        <div className="rounded-2xl border border-[#D0F5ED] bg-white/80 px-3 py-2.5 space-y-2">
          <p className="text-[10px] text-[#008080] font-semibold leading-relaxed">
            {legalPksViewed
              ? "Centang di bawah untuk menyatakan persetujuan terhadap isi perjanjian dan Legal PKS."
              : "Buka halaman Legal PKS terlebih dahulu, lalu konfirmasi bahwa Anda telah membaca seluruh isinya."}
          </p>
          <label className={`flex items-start gap-2 ${legalPksViewed ? "cursor-pointer" : "cursor-not-allowed opacity-60"}`}>
            <input
              type="checkbox"
              checked={tncChecked}
              disabled={!legalPksViewed}
              onChange={() => legalPksViewed && setTncChecked((v) => !v)}
              className="mt-0.5 rounded border-[#D0F5ED] text-[#004D4D] focus:ring-[#008080]"
            />
            <span className="text-xs font-bold text-[#004D4D] leading-snug">
              Saya setuju dengan Syarat &amp; Ketentuan serta seluruh isi Perjanjian Sewa dan Legal PKS.
            </span>
          </label>
        </div>
        <div className="flex justify-between mt-1">
          <button
            type="button"
            onClick={() => {
              clearSignature();
              if (signatureMode === "typed") {
                setTypedSignatureName(signatoryDefaultName);
              }
            }}
            className="text-xs font-extrabold tracking-widest uppercase text-[#008080]"
          >
            Hapus &amp; Ulangi
          </button>
          {!legalPksViewed && (
            <button type="button" onClick={onOpenLegalPks} className="text-xs font-extrabold tracking-widest uppercase text-[#004D4D]">
              Buka Legal PKS
            </button>
          )}
        </div>
        <button
          disabled={!canSubmitSignature}
          onClick={onSubmit}
          className={`w-full mt-4 rounded-2xl py-4 font-bold ${canSubmitSignature ? "bg-[#004D4D] text-[#90EE90]" : "bg-[#D0F5ED] text-[#008080] cursor-not-allowed"}`}
        >
          Tanda Tangani Sekarang
        </button>
      </div>
    </div>
  );
}

export function KontrakDokumenSignedScreen({
  onBack,
  onAjukanPerpanjangan,
  onViewLegalPks,
}: {
  onBack: () => void;
  onAjukanPerpanjangan: () => void;
  onViewLegalPks: () => void;
}) {
  return (
    <div className="p-6 space-y-4">
      <header className="w-full flex items-center justify-between">
        <button type="button" onClick={onBack} className="text-[#004D4D] text-2xl leading-none min-w-[2rem]" aria-label="Kembali">
          ‹
        </button>
        <h2 className="text-lg font-extrabold text-[#004D4D] tracking-tight">Kontrak Sewa Digital</h2>
        <div className="w-6" />
      </header>

      <div className="px-2 text-center">
        <p className="text-sm text-[#008080] font-medium leading-relaxed">Dokumen Anda telah berhasil ditandatangani dan aktif.</p>
      </div>

      <div className={cardClass}>
        <div className="bg-[#F2FDFB] px-4 py-3 -mx-4 -mt-4 mb-4 border-b border-[#D0F5ED] flex justify-between items-center rounded-t-3xl">
          <span className="text-[10px] font-extrabold tracking-widest uppercase text-[#008080]">Document ID: #KL-2026-082</span>
          <span className="text-[#008080]">⚙</span>
        </div>
        <h3 className="text-center font-extrabold text-[#004D4D] text-lg tracking-wide mb-4">PERJANJIAN SEWA MENYEWA</h3>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">Bahwa pada hari ini, <strong className="text-[#004D4D]">24 Mei 2026</strong>, yang bertanda tangan di bawah ini:</p>
        <div className="border-l-2 border-[#90EE90] pl-3 mb-4 space-y-2">
          <p className="text-sm text-gray-600"><em className="text-[#008080]">Pihak Pertama (Pemilik):</em> PT. Luckey Estate Indonesia</p>
          <p className="text-sm text-gray-600"><em className="text-[#008080]">Pihak Kedua (Penyewa):</em> Ibu Dewi</p>
        </div>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">Kedua belah pihak sepakat untuk melakukan perjanjian sewa menyewa unit sesuai dengan syarat dan ketentuan yang berlaku.</p>
        <button
          type="button"
          onClick={onViewLegalPks}
          className="w-full mb-3 text-center text-xs font-extrabold text-[#008080] underline underline-offset-2 decoration-[#008080]/40 py-1"
        >
          Lihat Syarat &amp; Ketentuan — Legal PKS
        </button>
        <button type="button" className="w-full bg-white border border-[#008080] text-[#008080] py-3.5 rounded-2xl font-bold text-sm">
          Download PDF Contract
        </button>
      </div>

      <div className="bg-gradient-to-r from-[#9DE4F8] to-[#B3F7E5] rounded-2xl p-4 flex items-center gap-3 shadow-sm">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#90EE90]">✓</div>
        <div>
          <h4 className="font-extrabold text-[#004D4D] text-base">Kontrak Ditandatangani</h4>
          <p className="text-[10px] font-extrabold text-[#008080] mt-0.5 opacity-80">DIVERIFIKASI PADA 24 MEI 2026</p>
        </div>
      </div>

      <div className={cardClass}>
        <h4 className="font-extrabold text-[#004D4D] text-lg mb-2">Perpanjang Sewa</h4>
        <p className="text-sm text-gray-500 leading-relaxed mb-5">Masa sewa Anda akan berakhir dalam <strong className="text-[#004D4D]">15 hari</strong>. Perpanjang sekarang untuk memastikan akses kunci digital tidak terputus.</p>
        <button onClick={onAjukanPerpanjangan} className="w-full bg-[#004D4D] text-[#90EE90] py-3.5 rounded-xl font-bold text-sm">
          Ajukan Perpanjangan
        </button>
      </div>
    </div>
  );
}
