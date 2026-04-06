export type TransferBank = {
  id: string;
  fullName: string;
  shortName: string;
  accountNumber: string;
  accountHolder: string;
  /** Kantor cabang / unit kerja rekening penerima */
  branch: string;
  /** Label kanan atas kartu, e.g. ATM / M-Banking */
  channelLabel: string;
};

export const TRANSFER_BANKS: TransferBank[] = [
  {
    id: "BCA",
    fullName: "Bank Central Asia",
    shortName: "BCA",
    accountNumber: "1234567890",
    accountHolder: "PT Kos Melati Indah",
    branch: "KC Jakarta Tebet — Jl. Tebet Raya No. 48, Jakarta Selatan",
    channelLabel: "ATM / M-Banking",
  },
  {
    id: "MANDIRI",
    fullName: "Bank Mandiri",
    shortName: "Mandiri",
    accountNumber: "0987654321",
    accountHolder: "PT Kos Melati Indah",
    branch: "KC Casablanca — Jl. Casablanca Kav. 18, Jakarta Selatan",
    channelLabel: "ATM / M-Banking",
  },
  {
    id: "BNI",
    fullName: "Bank Negara Indonesia",
    shortName: "BNI",
    accountNumber: "1122334455",
    accountHolder: "PT Kos Melati Indah",
    branch: "KC Pancoran — Jl. Raya Pasar Minggu, Jakarta Selatan",
    channelLabel: "Instant",
  },
];

export function getTransferBank(id: string | null): TransferBank | undefined {
  if (!id) return undefined;
  return TRANSFER_BANKS.find((b) => b.id === id);
}
