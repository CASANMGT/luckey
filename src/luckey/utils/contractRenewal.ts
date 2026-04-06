/** Parse tanggal seperti "31 Mei 2027" (locale Indonesia). */
const ID_MONTHS: Record<string, number> = {
  januari: 0,
  februari: 1,
  maret: 2,
  april: 3,
  mei: 4,
  juni: 5,
  juli: 6,
  agustus: 7,
  september: 8,
  oktober: 9,
  november: 10,
  desember: 11,
};

export function parseIndonesianDateString(s: string): Date | null {
  const t = s.trim().toLowerCase().replace(/\s+/g, " ");
  const m = t.match(/^(\d{1,2})\s+([a-zé]+)\s+(\d{4})$/i);
  if (!m) return null;
  const day = parseInt(m[1], 10);
  const monthKey = m[2].toLowerCase().replace("é", "e");
  const year = parseInt(m[3], 10);
  const month = ID_MONTHS[monthKey];
  if (month === undefined || day < 1 || day > 31) return null;
  const d = new Date(year, month, day);
  if (d.getFullYear() !== year || d.getMonth() !== month || d.getDate() !== day) return null;
  return d;
}

export const RENEWAL_COUNTDOWN_DAYS = 30;

export type ContractRenewalInfo = {
  /** Tanggal berakhir kontrak (string dari profil, untuk tampilan). */
  endDateLabel: string;
  /** Hari kalender sampai tanggal berakhir (0 = hari ini, negatif = sudah lewat). */
  daysRemaining: number;
  /** Tampilkan hitung mundur & ajukan perpanjangan (≤30 hari dan belum lewat). */
  isInCountdownWindow: boolean;
  /** Sudah melewati tanggal berakhir. */
  isExpired: boolean;
};

export function getContractRenewalInfo(
  tanggalBerakhir: string,
  now = new Date()
): ContractRenewalInfo | null {
  const end = parseIndonesianDateString(tanggalBerakhir);
  if (!end) return null;

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endDay = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  const diffMs = endDay.getTime() - today.getTime();
  const daysRemaining = Math.round(diffMs / 86_400_000);

  return {
    endDateLabel: tanggalBerakhir.trim(),
    daysRemaining,
    isInCountdownWindow: daysRemaining <= RENEWAL_COUNTDOWN_DAYS && daysRemaining >= 0,
    isExpired: daysRemaining < 0,
  };
}
