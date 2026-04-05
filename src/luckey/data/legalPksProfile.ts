/** Data kontrak untuk mengisi Legal PKS (demo + input penyewa). */

export type LegalPksProfile = {
  docSeq: string;
  /** Nama bulan Latin untuk nomor dokumen, e.g. April */
  bulanRomawi: string;
  tahunDok: string;
  hariPembuka: string;
  tanggalPembuka: string;
  kota: string;
  namaPemilik: string;
  nikPemilik: string;
  alamatPemilik: string;
  namaPenyewa: string;
  nikPenyewa: string;
  hpPenyewa: string;
  alamatPenyewa: string;
  nomorKamar: string;
  namaKos: string;
  alamatProperti: string;
  sewaBulanan: boolean;
  sewaTahunan: boolean;
  sewaLainLabel: string;
  tanggalMulai: string;
  tanggalBerakhir: string;
  sewaRupiahFormatted: string;
  periodePembayaran: string;
  tanggalJatuhTempo: string;
  dendaPerHari: string;
  gracePeriodHari: string;
};

const ID_DATE: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
};

export function idPartsPks(d: Date) {
  const hari = d.toLocaleDateString("id-ID", { weekday: "long" });
  const tanggal = d.toLocaleDateString("id-ID", ID_DATE);
  const bulan = d.toLocaleDateString("id-ID", { month: "long" });
  const tahun = d.getFullYear().toString();
  return { hari, tanggal, bulan, tahun };
}

/** Perbarui tanggal pembuka dokumen ke hari ini (bahasa Indonesia). */
export function refreshPksOpeningDates(p: LegalPksProfile, now = new Date()): LegalPksProfile {
  const { hari, tanggal, bulan, tahun } = idPartsPks(now);
  return { ...p, hariPembuka: hari, tanggalPembuka: tanggal, bulanRomawi: bulan, tahunDok: tahun };
}

/** Nilai awal selaras dengan Beranda/Kamar (Dewi, Kos Melati Indah, kamar 302). NIK & HP penyewa kosong — wajib diisi di halaman PKS. */
export function createDefaultLegalPksProfile(now = new Date()): LegalPksProfile {
  const { hari, tanggal, bulan, tahun } = idPartsPks(now);
  return {
    docSeq: "083",
    bulanRomawi: bulan,
    tahunDok: tahun,
    hariPembuka: hari,
    tanggalPembuka: tanggal,
    kota: "Jakarta",
    namaPemilik: "PT. Luckey Estate Indonesia",
    nikPemilik: "09.123.456.7-890.000",
    alamatPemilik: "Jl. Melati Raya No. 88, Jakarta Selatan",
    namaPenyewa: "Dewi Lestari",
    nikPenyewa: "",
    hpPenyewa: "",
    alamatPenyewa: "Kos Melati Indah, Kamar 302, Jakarta",
    nomorKamar: "302",
    namaKos: "Kos Melati Indah",
    alamatProperti: "Jl. Melati Indah No. 12, Tebet, Jakarta Selatan",
    sewaBulanan: true,
    sewaTahunan: false,
    sewaLainLabel: "",
    tanggalMulai: "1 Juni 2026",
    tanggalBerakhir: "31 Mei 2027",
    sewaRupiahFormatted: "2.500.000",
    periodePembayaran: "bulan",
    tanggalJatuhTempo: "1",
    dendaPerHari: "50.000",
    gracePeriodHari: "3",
  };
}

/** NIK 16 digit angka; HP minimal 10 digit angka. */
export function isLegalPksTenantIdentityComplete(p: LegalPksProfile): boolean {
  const nik = p.nikPenyewa.replace(/\D/g, "");
  const hp = p.hpPenyewa.replace(/\D/g, "");
  return nik.length === 16 && hp.length >= 10;
}

export function legalPksTenantIdentityHint(p: LegalPksProfile): string | null {
  const nik = p.nikPenyewa.replace(/\D/g, "");
  const hp = p.hpPenyewa.replace(/\D/g, "");
  if (nik.length !== 16) return "NIK penyewa wajib 16 digit angka.";
  if (hp.length < 10) return "Nomor HP wajib diisi (minimal 10 digit).";
  return null;
}
