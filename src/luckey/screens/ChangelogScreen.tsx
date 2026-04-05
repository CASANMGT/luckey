import { ChangelogBody } from "../components/ChangelogBody";

export function ChangelogScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="p-6 pb-28 space-y-4">
      <header className="w-full flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-[#004D4D] text-2xl leading-none min-w-[2rem]"
          aria-label="Kembali"
        >
          ‹
        </button>
        <h2 className="text-lg font-extrabold text-[#004D4D] tracking-tight text-center flex-1 px-2">
          Pembaruan aplikasi
        </h2>
        <div className="w-6" />
      </header>

      <ChangelogBody />
    </div>
  );
}
