import { useEffect, useMemo, useState } from "react";
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

export default function LuckeyApp() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [legalPksReturnScreen, setLegalPksReturnScreen] = useState<Screen>("kontrakDokumenSigned");
  const [legalPksViewed, setLegalPksViewed] = useState(false);
  const [pksProfile, setPksProfile] = useState(createDefaultLegalPksProfile);
  const [pinVisible, setPinVisible] = useState(false);
  const [unlockActive, setUnlockActive] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("QRIS");
  const [moveReason, setMoveReason] = useState("Pindah Kerja");
  const [guestDuration, setGuestDuration] = useState<GuestDuration>("1H");
  const [guestName, setGuestName] = useState("");
  const [guestPin, setGuestPin] = useState("8249");
  const [tncChecked, setTncChecked] = useState(false);
  const [signatureMode, setSignatureMode] = useState<"draw" | "typed">("draw");
  const [typedSignatureName, setTypedSignatureName] = useState("");
  const { hasDrawn, canvasRef, drawStart, drawMove, drawEnd, clearSignature } = useSignaturePad();

  useEffect(() => {
    const first = window.setTimeout(() => setScreen("login"), 3800);
    return () => window.clearTimeout(first);
  }, []);

  useEffect(() => {
    if (screen !== "kontrakDokumenUnsigned") return;
    setTypedSignatureName((prev) => (prev.trim() ? prev : pksProfile.namaPenyewa));
  }, [screen, pksProfile.namaPenyewa]);

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
          <div className="absolute inset-0 overflow-y-auto pb-28">
            {screen === "beranda" && (
              <BerandaScreen setScreen={setScreen} />
            )}

            {screen === "changelog" && <ChangelogScreen onBack={() => setScreen("beranda")} />}

            {screen === "kunci" && (
              <KunciScreen unlockActive={unlockActive} triggerUnlock={triggerUnlock} backupPin={backupPin} pinVisible={pinVisible} onTogglePin={onTogglePin} setScreen={setScreen} />
            )}

            {screen === "bayar" && (
              <BayarScreen paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} setScreen={setScreen} />
            )}

            {screen === "kwitansi" && <KwitansiScreen paymentMethod={paymentMethod} />}

            {screen === "kamar" && <KamarScreen setScreen={setScreen} />}

            {screen === "kontrakDokumenSigned" && (
              <KontrakDokumenSignedScreen
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
