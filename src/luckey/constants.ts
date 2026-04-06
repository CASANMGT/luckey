export const cardClass = "bg-white rounded-3xl border border-[#D0F5ED] p-4";

/** Urutan selaras segmen atas: QRIS → Transfer → Tunai. */
export const paymentMethods = ["QRIS", "Transfer Bank", "Bayar Tunai"] as const;

/** Email penyewa (demo) — tombol “email saya” memakai mailto ke alamat ini. */
export const TENANT_CONTACT_EMAIL = "siti.rahma@gmail.com";

/** Nomor WA penyewa tanpa +, untuk https://wa.me/… (demo). */
export const TENANT_WHATSAPP_DIGITS = "6281234567890";

export function buildKwitansiShareMessage(parts: {
  amountLabel: string;
  periodLabel: string;
  unitLabel: string;
  transactionId: string;
  paymentDateLabel: string;
  methodLine: string;
}): string {
  return [
    "Kwitansi pembayaran sewa — Kos Melati Indah",
    "",
    `Total: ${parts.amountLabel}`,
    `Periode: ${parts.periodLabel}`,
    `Unit: ${parts.unitLabel}`,
    `ID: ${parts.transactionId}`,
    `Tanggal: ${parts.paymentDateLabel}`,
    `Metode: ${parts.methodLine}`,
    "",
    "Detail & unduhan PDF ada di aplikasi Luckey.",
  ].join("\n");
}
export const moveReasons = ["Selesai Kontrak", "Pindah Kerja", "Masalah Fasilitas", "Lainnya"] as const;
export const guestDurations = ["1H", "4H", "24H", "CUSTOM"] as const;
