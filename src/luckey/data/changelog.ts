/**
 * Catatan rilis Luckey — sumber untuk layar “Pembaruan” di aplikasi.
 * Untuk dokumentasi repo, sinkronkan ringkas ke .github/luckey/CHANGELOG.md.
 */

export const LUCKEY_APP_VERSION = "0.6.0";

export type ChangelogKind = "added" | "changed" | "fixed";

export type LuckeyChangelogRelease = {
  version: string;
  date: string;
  summary?: string;
  sections: Partial<Record<ChangelogKind, string[]>>;
};

const kindLabel: Record<ChangelogKind, string> = {
  added: "Baru",
  changed: "Diubah",
  fixed: "Diperbaiki",
};

export function changelogKindLabel(kind: ChangelogKind): string {
  return kindLabel[kind];
}

/** Urutan: terbaru di atas. */
export const LUCKEY_CHANGELOG: LuckeyChangelogRelease[] = [
  {
    version: "0.6.0",
    date: "2026-04-06",
    summary: "Alur bayar transfer & tunai, kwitansi digital, dan perpanjangan kontrak.",
    sections: {
      added: [
        "Bayar Transfer Bank: pilih bank, salin rekening, unggah bukti, tunggu verifikasi operator, lalu layar sukses.",
        "Bayar tunai: minta konfirmasi operator, lalu layar sukses.",
        "Layar konfirmasi pembayaran bergaya kwitansi digital (teal) dengan total, detail transaksi, unduh PDF, dan kirim ringkasan ke WhatsApp atau email penyewa (ikon resmi).",
        "Data bank transfer (`transferBanks`) dan utilitas sisa masa kontrak (`contractRenewal`) untuk countdown perpanjangan.",
      ],
      changed: [
        "Urutan metode bayar: QRIS, Transfer Bank, Bayar tunai; scroll konten utama di-reset saat masuk sub-alur transfer/tunai.",
        "Kamar: kartu kontrak menampilkan tanggal berakhir, countdown ≤30 hari, dan ajukan perpanjangan saat mendekati habis.",
      ],
    },
  },
  {
    version: "0.5.0",
    date: "2026-04-05",
    summary: "Catatan rilis di aplikasi & dokumentasi GitHub Luckey.",
    sections: {
      added: [
        "Layar Pembaruan (changelog) dengan riwayat versi di dalam aplikasi.",
        "Folder .github/luckey untuk dokumentasi dan catatan rilis khusus modul Luckey.",
      ],
    },
  },
  {
    version: "0.4.0",
    date: "2026-04-04",
    summary: "Kontrak digital, Legal PKS, dan opsi tanda tangan.",
    sections: {
      added: [
        "Legal PKS lengkap dengan data terisi otomatis (kos, kamar, biaya) dan form NIK/HP.",
        "Ringkasan TL;DR setelah teks pasal penuh; validasi NIK 16 digit & HP dengan centang hijau.",
        "Tanda tangan: coret di kanvas atau nama bergaya tulisan tangan (fallback).",
        "Alur kontrak ditandatangani vs perpanjangan (dokumen unsigned + tanda tangan).",
      ],
      changed: [
        "Navigasi kembali antara Kamar, kontrak, dan Legal PKS diperjelas.",
      ],
    },
  },
  {
    version: "0.3.0",
    date: "2026-04-03",
    summary: "Layar utama, pembayaran, dan kamar.",
    sections: {
      added: [
        "Beranda dengan ringkasan sewa, tagihan, dan aktivitas.",
        "Bayar dengan metode QRIS, transfer, tunai; halaman Kwitansi.",
        "Kamar: kontrak aktif, riwayat, dan dokumen.",
        "Bottom navigation dengan ikon untuk Beranda, Bayar, Kunci, Request, Kamar.",
      ],
    },
  },
  {
    version: "0.2.0",
    date: "2026-04-02",
    summary: "Kunci pintar & tamu.",
    sections: {
      added: [
        "Layar Kunci dengan hold-to-unlock dan PIN cadangan.",
        "Pin tamu: generate PIN, durasi akses, dan pratinjau pesan bagikan.",
        "Pengajuan pindah kamar dengan alasan pill dan alur sukses.",
      ],
    },
  },
  {
    version: "0.1.0",
    date: "2026-04-01",
    summary: "Rilis awal prototipe.",
    sections: {
      added: [
        "Splash animasi dan login (peran tenant).",
        "Tema Luckey: mint, teal, sprout green, neumorphism ringan.",
        "Integrasi rute /luckey di dashboard Casan.",
      ],
    },
  },
];
