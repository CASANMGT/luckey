import type { LegalPksProfile } from "./legalPksProfile";

export type LegalPksSection = {
  title: string;
  blocks: string[];
};

export const LEGAL_PKS_TITLE = `PERJANJIAN SEWA MENYEWA KAMAR KOS

DENGAN SISTEM IoT (SMART LOCK & DIGITAL ACCESS)`;

function dash(v: string, emptyLabel = "—"): string {
  const t = v.trim();
  return t.length ? t : emptyLabel;
}

export function buildLegalPksMeta(p: LegalPksProfile): string {
  return `Nomor: ${p.docSeq}/PKS-KOS/${p.bulanRomawi}/${p.tahunDok}

Pada hari ini, ${p.hariPembuka}, tanggal ${p.tanggalPembuka}, bertempat di ${p.kota}, para pihak:`;
}

export function buildLegalPksSections(p: LegalPksProfile): LegalPksSection[] {
  const bulanan = p.sewaBulanan ? "☑" : "☐";
  const tahunan = p.sewaTahunan ? "☑" : "☐";
  const lain = p.sewaLainLabel.trim() ? "☑" : "☐";
  const lainText = p.sewaLainLabel.trim() || "—";

  return [
    {
      title: "PASAL PEMBUKA (IDENTITAS PARA PIHAK)",
      blocks: [
        `1. PIHAK PERTAMA (PENGELOLA / PEMILIK KOS)

Nama: ${dash(p.namaPemilik)}
No. Identitas: ${dash(p.nikPemilik)}
Alamat: ${dash(p.alamatPemilik)}

Dalam hal ini bertindak sebagai pemilik/pengelola kos, selanjutnya disebut:
“PIHAK PERTAMA”`,

        `2. PIHAK KEDUA (PENGHUNI / PENYEWA)

Nama: ${dash(p.namaPenyewa)}
No. Identitas: ${dash(p.nikPenyewa, "(isi NIK 16 digit di formulir)")}
No. HP: ${dash(p.hpPenyewa, "(isi nomor HP di formulir)")}
Alamat: ${dash(p.alamatPenyewa)}

Selanjutnya disebut:
“PIHAK KEDUA”`,

        `Kedua pihak sepakat untuk mengikatkan diri dalam perjanjian dengan ketentuan berikut:`,
      ],
    },
    {
      title: "PASAL 1 – OBJEK SEWA",
      blocks: [
        `PIHAK PERTAMA menyewakan kepada PIHAK KEDUA:
1 (satu) kamar kos nomor: ${dash(p.nomorKamar)} (${p.namaKos})
Beralamat di: ${dash(p.alamatProperti)}
Kamar dilengkapi dengan:
Sistem smart lock berbasis IoT
Akses digital (PIN / QR / aplikasi)`,
      ],
    },
    {
      title: "PASAL 2 – JANGKA WAKTU",
      blocks: [
        `Masa sewa berlaku selama:
${bulanan} Bulanan / ${tahunan} Tahunan / ${lain} Lainnya: ${lainText}
Dimulai pada tanggal: ${dash(p.tanggalMulai)}
Berakhir pada tanggal: ${dash(p.tanggalBerakhir)}`,
      ],
    },
    {
      title: "PASAL 3 – BIAYA SEWA & PEMBAYARAN",
      blocks: [
        `Biaya sewa sebesar:
Rp ${dash(p.sewaRupiahFormatted)} per ${dash(p.periodePembayaran)}
Pembayaran dilakukan melalui:
Transfer bank / QRIS / e-wallet / sistem aplikasi
Tanggal jatuh tempo: setiap tanggal ${dash(p.tanggalJatuhTempo)}`,
      ],
    },
    {
      title: "PASAL 4 – SISTEM AKSES DIGITAL (IoT)",
      blocks: [
        `PIHAK KEDUA akan memperoleh:
PIN / akses digital unik untuk kamar
Akses berlaku selama:
Masa sewa aktif
PIHAK KEDUA memahami dan menyetujui bahwa:
Akses kamar dikontrol oleh sistem otomatis
Status pembayaran mempengaruhi akses`,
      ],
    },
    {
      title: "PASAL 5 – KETENTUAN KETERLAMBATAN",
      blocks: [
        `Jika PIHAK KEDUA terlambat melakukan pembayaran:
Dapat dikenakan denda sebesar Rp ${dash(p.dendaPerHari)} per hari
PIHAK PERTAMA berhak:
Memberikan peringatan
Memberlakukan pembatasan akses`,
      ],
    },
    {
      title: "PASAL 6 – SISTEM PEMBATASAN AKSES (AUTO LOCK)",
      blocks: [
        `PIHAK KEDUA dengan ini menyetujui bahwa:
Sistem dapat menonaktifkan akses kamar secara otomatis apabila:
Pembayaran melewati jatuh tempo
Melewati masa toleransi (grace period)
Grace period: ${dash(p.gracePeriodHari)} hari
Setelah grace period:
Akses kamar dapat dinonaktifkan tanpa persetujuan tambahan`,
      ],
    },
    {
      title: "PASAL 7 – KEAMANAN & TANGGUNG JAWAB",
      blocks: [
        `PIHAK KEDUA bertanggung jawab atas:
Penggunaan PIN / akses digital
Barang pribadi di dalam kamar
PIHAK KEDUA dilarang:
Membagikan akses kepada pihak lain
PIHAK PERTAMA tidak bertanggung jawab atas:
Kehilangan akibat kelalaian PIHAK KEDUA`,
      ],
    },
    {
      title: "PASAL 8 – DATA & PRIVASI",
      blocks: [
        `PIHAK KEDUA menyetujui bahwa:
Sistem akan mencatat:
Riwayat akses
Data pembayaran
Data digunakan untuk:
Operasional kos
Keamanan
PIHAK PERTAMA wajib menjaga kerahasiaan data`,
      ],
    },
    {
      title: "PASAL 9 – GANGGUAN SISTEM",
      blocks: [
        `Jika sistem IoT mengalami gangguan:
PIHAK PERTAMA akan menyediakan akses alternatif
PIHAK KEDUA tidak berhak menuntut ganti rugi atas gangguan teknis yang wajar`,
      ],
    },
    {
      title: "PASAL 10 – LARANGAN",
      blocks: [
        `PIHAK KEDUA dilarang:

Menyewakan kembali kamar
Mengubah sistem IoT
Menggunakan kamar untuk aktivitas ilegal`,
      ],
    },
    {
      title: "PASAL 11 – PENGAKHIRAN PERJANJIAN",
      blocks: [
        `Perjanjian berakhir apabila:
Masa sewa habis
PIHAK KEDUA melanggar ketentuan
Setelah berakhir:
Akses akan dinonaktifkan otomatis`,
      ],
    },
    {
      title: "PASAL 12 – PENGOSONGAN KAMAR",
      blocks: [
        `PIHAK KEDUA wajib:
Mengosongkan kamar sesuai tanggal berakhir
Jika tidak:
PIHAK PERTAMA berhak mengambil tindakan sesuai hukum`,
      ],
    },
    {
      title: "PASAL 13 – KEADAAN KAHAR (FORCE MAJEURE)",
      blocks: [
        `Kedua pihak tidak bertanggung jawab atas:

Bencana alam
Gangguan listrik nasional
Keadaan di luar kendali`,
      ],
    },
    {
      title: "PASAL 14 – PENYELESAIAN SENGKETA",
      blocks: [
        `Diselesaikan secara musyawarah
Jika tidak tercapai:
Mengacu pada hukum Republik Indonesia`,
      ],
    },
    {
      title: "PASAL 15 – PERSETUJUAN DIGITAL",
      blocks: [
        `PIHAK KEDUA menyetujui bahwa:

Persetujuan melalui:
Aplikasi
OTP
Checkbox digital
memiliki kekuatan hukum yang sah dan mengikat.`,
      ],
    },
    {
      title: "PASAL 16 – PENUTUP",
      blocks: [
        `Perjanjian ini dibuat:

Secara sadar
Tanpa paksaan
Mengikat kedua pihak`,
      ],
    },
    {
      title: "✍️ TANDA TANGAN",
      blocks: [
        `PIHAK PERTAMA
(Pengelola)

PIHAK KEDUA
(Penyewa)`,
      ],
    },
  ];
}
