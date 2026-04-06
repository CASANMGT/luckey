import { useEffect, useMemo, useRef, useState } from "react";
import "./luckey.css";
import type { GuestDuration, Screen } from "./types";
import { SplashScreen } from "./screens/SplashScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { BottomNav } from "./components/BottomNav";
import {
  AssignGuestScreen,
  BayarScreen,
  BerandaScreen,
  KamarScreen,
  KunciScreen,
  KwitansiScreen,
  PindahScreen,
  ShareGuestScreen,
  SuccessScreen,
} from "./screens/PrimaryScreens";
import { KontrakDokumenSignedScreen, KontrakDokumenUnsignedScreen } from "./screens/KontrakDokumenScreen";
import { KontrakLegalPksScreen } from "./screens/KontrakLegalPksScreen";
import { ChangelogScreen } from "./screens/ChangelogScreen";
import { useSignaturePad } from "./hooks/useSignaturePad";
import { createDefaultLegalPksProfile, refreshPksOpeningDates } from "./data/legalPksProfile";
import { getContractRenewalInfo } from "./utils/contractRenewal";

export default function LuckeyApp() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [legalPksReturnScreen, setLegalPksReturnScreen] = useState<Screen>("kontrakDokumenSigned");
  const [legalPksViewed, setLegalPksViewed] = useState(false);
  const [pksProfile, setPksProfile] = useState(createDefaultLegalPksProfile);
  const [pinVisible, setPinVisible] = useState(false);
  const [unlockActive, setUnlockActive] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("QRIS");
  /** Alur bayar tunai: konfirmasi penyewa → tunggu operator → sukses (demo: tombol simulasi). */
  const [tunaiFlowStatus, setTunaiFlowStatus] = useState<"idle" | "awaiting_operator" | "confirmed">("idle");
  const [tunaiRequestRef, setTunaiRequestRef] = useState<string | null>(null);
  /** Alur transfer bank: rekening → unggah bukti → tunggu operator → sukses. */
  const [transferFlowStatus, setTransferFlowStatus] = useState<
    "idle" | "bank_details" | "upload_proof" | "awaiting_operator" | "confirmed"
  >("idle");
  const [transferBankId, setTransferBankId] = useState<string | null>(null);
  const [transferRequestRef, setTransferRequestRef] = useState<string | null>(null);
  const [moveReason, setMoveReason] = useState("Pindah Kerja");
  const [guestDuration, setGuestDuration] = useState<GuestDuration>("1H");
  const [guestName, setGuestName] = useState("");
  const [guestPin, setGuestPin] = useState("8249");
  const [tncChecked, setTncChecked] = useState(false);
  const [signatureMode, setSignatureMode] = useState<"draw" | "typed">("draw");
  const [typedSignatureName, setTypedSignatureName] = useState("");
  const { hasDrawn, canvasRef, drawStart, drawMove, drawEnd, clearSignature } = useSignaturePad();
  /** Kontainer scroll utama (bukan window) — harus di-reset saat ganti sub-layar Bayar. */
  const mainScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const first = window.setTimeout(() => setScreen("login"), 3800);
    return () => window.clearTimeout(first);
  }, []);

  useEffect(() => {
    if (screen !== "kontrakDokumenUnsigned") return;
    setTypedSignatureName((prev) => (prev.trim() ? prev : pksProfile.namaPenyewa));
  }, [screen, pksProfile.namaPenyewa]);

  useEffect(() => {
    if (screen !== "bayar") {
      setTunaiFlowStatus("idle");
      setTunaiRequestRef(null);
      setTransferFlowStatus("idle");
      setTransferBankId(null);
      setTransferRequestRef(null);
    }
  }, [screen]);

  /** Unggah bukti & langkah transfer/tunai lain memakai konten baru; jangan bawa scroll dari layar sebelumnya. */
  useEffect(() => {
    if (screen !== "bayar") return;
    const inTransferStep = transferFlowStatus !== "idle";
    const inTunaiStep = tunaiFlowStatus !== "idle";
    if (!inTransferStep && !inTunaiStep) return;
    const el = mainScrollRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollTop = 0;
    });
  }, [screen, transferFlowStatus, tunaiFlowStatus]);

  const contractRenewal = useMemo(
    () => getContractRenewalInfo(pksProfile.tanggalBerakhir),
    [pksProfile.tanggalBerakhir]
  );

  const typedSignatureOk = typedSignatureName.trim().length >= 2;
  const signatureComplete =
    signatureMode === "draw" ? hasDrawn : typedSignatureOk;
  const canSubmitSignature = signatureComplete && tncChecked && legalPksViewed;
  const backupPin = pinVisible ? "7241" : "••••";

  const expiryText = useMemo(() => {
    if (guestDuration === "4H") return "Hari ini, 19:00 WIB";
    if (guestDuration === "24H") return "Besok, 15:00 WIB";
    if (guestDuration === "CUSTOM") return "Sesuai kustomisasi";
    return "Hari ini, 16:00 WIB";
  }, [guestDuration]);

  const generatePin = () => {
    const pin = Math.floor(1000 + Math.random() * 9000).toString();
    setGuestPin(pin);
  };

  const triggerUnlock = () => {
    setUnlockActive(true);
    window.setTimeout(() => setUnlockActive(false), 3000);
  };

  const onTogglePin = () => setPinVisible((v) => !v);

  return (
    <div className="luckey-app flex items-center justify-center p-0 sm:p-8">
      <div className="relative w-full max-w-[400px] h-[100dvh] sm:h-[800px] sm:rounded-[2.5rem] sm:border-[8px] sm:border-gray-900 bg-[#F2FDFB] overflow-hidden">
        {screen === "splash" && <SplashScreen />}

        {screen === "login" && <LoginScreen onLogin={() => setScreen("beranda")} />}

        {screen !== "splash" && screen !== "login" && (
          <div ref={mainScrollRef} className="absolute inset-0 overflow-y-auto pb-28">
            {screen === "beranda" && (
              <BerandaScreen setScreen={setScreen} contractRenewal={contractRenewal} />
            )}

            {screen === "changelog" && <ChangelogScreen onBack={() => setScreen("beranda")} />}

            {screen === "kunci" && (
              <KunciScreen unlockActive={unlockActive} triggerUnlock={triggerUnlock} backupPin={backupPin} pinVisible={pinVisible} onTogglePin={onTogglePin} setScreen={setScreen} />
            )}

            {screen === "bayar" && (
              <BayarScreen
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                setScreen={setScreen}
                tunaiFlowStatus={tunaiFlowStatus}
                tunaiRequestRef={tunaiRequestRef}
                onStartTunaiAwaiting={() => {
                  setTunaiRequestRef(`TX-${Math.floor(1000 + Math.random() * 9000)}-CON`);
                  setTunaiFlowStatus("awaiting_operator");
                }}
                onSimulateOperatorConfirm={() => setTunaiFlowStatus("confirmed")}
                onResetTunaiFlow={() => {
                  setTunaiFlowStatus("idle");
                  setTunaiRequestRef(null);
                }}
                transferFlowStatus={transferFlowStatus}
                transferBankId={transferBankId}
                transferRequestRef={transferRequestRef}
                onStartTransferFlow={() => {
                  setTransferFlowStatus("bank_details");
                  setTransferBankId(null);
                  setTransferRequestRef(null);
                }}
                onSelectTransferBank={setTransferBankId}
                onTransferProceedToUpload={() => setTransferFlowStatus("upload_proof")}
                onTransferBackToBankDetails={() => setTransferFlowStatus("bank_details")}
                onTransferSubmitProof={() => {
                  setTransferRequestRef(`TX-${Math.floor(1000 + Math.random() * 9000)}-TRF`);
                  setTransferFlowStatus("awaiting_operator");
                }}
                onSimulateTransferConfirm={() => setTransferFlowStatus("confirmed")}
                onResetTransferFlow={() => {
                  setTransferFlowStatus("idle");
                  setTransferBankId(null);
                  setTransferRequestRef(null);
                }}
              />
            )}

            {screen === "kwitansi" && <KwitansiScreen paymentMethod={paymentMethod} />}

            {screen === "kamar" && (
              <KamarScreen
                setScreen={setScreen}
                contractRenewal={contractRenewal}
                tanggalPembuka={pksProfile.tanggalPembuka}
              />
            )}

            {screen === "kontrakDokumenSigned" && (
              <KontrakDokumenSignedScreen
                contractRenewal={contractRenewal}
                tanggalPembuka={pksProfile.tanggalPembuka}
                onBack={() => setScreen("kamar")}
                onAjukanPerpanjangan={() => {
                  setLegalPksViewed(false);
                  setTncChecked(false);
                  clearSignature();
                  setSignatureMode("draw");
                  setTypedSignatureName(pksProfile.namaPenyewa);
                  setScreen("kontrakDokumenUnsigned");
                }}
                onViewLegalPks={() => {
                  setLegalPksReturnScreen("kontrakDokumenSigned");
                  setPksProfile((prev) => refreshPksOpeningDates(prev));
                  setScreen("kontrakLegalPks");
                }}
              />
            )}

            {screen === "kontrakDokumenUnsigned" && (
              <KontrakDokumenUnsignedScreen
                onBack={() => setScreen("kontrakDokumenSigned")}
                onOpenLegalPks={() => {
                  setLegalPksReturnScreen("kontrakDokumenUnsigned");
                  setPksProfile((prev) => refreshPksOpeningDates(prev));
                  setScreen("kontrakLegalPks");
                }}
                legalPksViewed={legalPksViewed}
                signatoryDefaultName={pksProfile.namaPenyewa}
                signatureMode={signatureMode}
                setSignatureMode={setSignatureMode}
                typedSignatureName={typedSignatureName}
                setTypedSignatureName={setTypedSignatureName}
                canvasRef={canvasRef}
                drawStart={drawStart}
                drawMove={drawMove}
                drawEnd={drawEnd}
                clearSignature={clearSignature}
                tncChecked={tncChecked}
                setTncChecked={setTncChecked}
                canSubmitSignature={canSubmitSignature}
                onSubmit={() => setScreen("successPindah")}
              />
            )}

            {screen === "kontrakLegalPks" && (
              <KontrakLegalPksScreen
                pksProfile={pksProfile}
                setPksProfile={setPksProfile}
                alreadyReadConfirmed={legalPksViewed && legalPksReturnScreen === "kontrakDokumenUnsigned"}
                onBack={() => setScreen(legalPksReturnScreen)}
                requireAcknowledge={legalPksReturnScreen === "kontrakDokumenUnsigned"}
                onAcknowledgeRead={() => setLegalPksViewed(true)}
              />
            )}

            {screen === "pindah" && <PindahScreen moveReason={moveReason} setMoveReason={setMoveReason} setScreen={setScreen} />}

            {screen === "assignGuest" && (
              <AssignGuestScreen
                guestName={guestName}
                setGuestName={setGuestName}
                guestPin={guestPin}
                generatePin={generatePin}
                guestDuration={guestDuration}
                setGuestDuration={setGuestDuration}
                expiryText={expiryText}
                setScreen={setScreen}
              />
            )}

            {screen === "shareGuest" && <ShareGuestScreen guestName={guestName} guestPin={guestPin} expiryText={expiryText} setScreen={setScreen} />}

            {screen === "successPindah" && <SuccessScreen setScreen={setScreen} />}
          </div>
        )}

        {screen !== "splash" && screen !== "login" && screen !== "kontrakLegalPks" && (
          <BottomNav screen={screen} setScreen={setScreen} />
        )}
      </div>
    </div>
  );
}
