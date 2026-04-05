export type Screen =
  | "splash"
  | "login"
  | "beranda"
  | "kunci"
  | "bayar"
  | "kwitansi"
  | "kamar"
  | "pindah"
  | "successPindah"
  | "assignGuest"
  | "shareGuest"
  | "kontrakDokumenSigned"
  | "kontrakDokumenUnsigned"
  | "kontrakLegalPks"
  | "changelog";

export type GuestDuration = "1H" | "4H" | "24H" | "CUSTOM";
