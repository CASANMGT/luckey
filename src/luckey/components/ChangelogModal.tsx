import { useEffect } from "react";
import { createPortal } from "react-dom";
import { LUCKEY_APP_VERSION } from "../data/changelog";
import { ChangelogBody } from "./ChangelogBody";

type ChangelogModalProps = {
  open: boolean;
  onClose: () => void;
};

export function ChangelogModal({ open, onClose }: ChangelogModalProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-0 sm:p-4" role="dialog" aria-modal="true" aria-labelledby="luckey-changelog-title">
      <button
        type="button"
        className="absolute inset-0 bg-[#004D4D]/40 backdrop-blur-[2px]"
        aria-label="Tutup pembaruan"
        onClick={onClose}
      />
      <div className="relative w-full max-w-[400px] max-h-[min(88vh,720px)] flex flex-col rounded-t-[2rem] sm:rounded-[2rem] bg-[#F2FDFB] shadow-[0_-8px_40px_rgba(0,77,77,0.18)] sm:shadow-xl border border-[#D0F5ED] border-b-0 sm:border-b">
        <div className="flex shrink-0 items-center justify-between gap-2 px-5 pt-4 pb-3 border-b border-[#D0F5ED] bg-[#F2FDFB] rounded-t-[2rem]">
          <div className="min-w-0">
            <p id="luckey-changelog-title" className="text-base font-extrabold text-[#004D4D] tracking-tight">
              Pembaruan aplikasi
            </p>
            <p className="text-[10px] font-bold text-[#008080] mt-0.5">Luckey · v{LUCKEY_APP_VERSION}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-[#D0F5ED] text-[#004D4D] text-xl font-bold shadow-sm active:scale-95"
            aria-label="Tutup"
          >
            ×
          </button>
        </div>
        <div className="overflow-y-auto overscroll-contain px-5 py-4 pb-8">
          <ChangelogBody />
          <p className="text-center text-[10px] text-[#008080] font-semibold mt-4">Ketuk di luar panel atau tekan Esc untuk menutup.</p>
        </div>
      </div>
    </div>,
    document.body
  );
}
