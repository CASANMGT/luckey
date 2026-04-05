import { cardClass } from "../constants";
import {
  LUCKEY_APP_VERSION,
  LUCKEY_CHANGELOG,
  changelogKindLabel,
  type ChangelogKind,
} from "../data/changelog";

const KIND_STYLES: Record<ChangelogKind, string> = {
  added: "bg-[#90EE90]/25 text-[#004D4D] border-[#90EE90]/50",
  changed: "bg-[#9DE4F8]/25 text-[#004D4D] border-[#9DE4F8]/50",
  fixed: "bg-[#FFFBEB] text-[#92400E] border-[#FDE047]/60",
};

function formatDisplayDate(iso: string) {
  try {
    const d = new Date(iso + "T12:00:00");
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return iso;
  }
}

/** Isi scrollable changelog (dipakai layar penuh & popout). */
export function ChangelogBody({ className = "" }: { className?: string }) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="rounded-2xl border border-[#D0F5ED] bg-white/90 px-4 py-3 text-center shadow-sm">
        <p className="text-[10px] font-extrabold tracking-widest uppercase text-[#008080]">Versi terpasang</p>
        <p className="text-2xl font-extrabold text-[#004D4D] mt-0.5">v{LUCKEY_APP_VERSION}</p>
        <p className="text-[11px] text-[#008080] font-medium mt-1 leading-relaxed">
          Riwayat di bawah mencakup fitur dan perbaikan penting. Versi terbaru selalu di atas.
        </p>
      </div>

      <div className="space-y-4">
        {LUCKEY_CHANGELOG.map((release) => (
          <article key={release.version} className={cardClass}>
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
              <h3 className="text-base font-extrabold text-[#004D4D]">v{release.version}</h3>
              <time
                dateTime={release.date}
                className="text-[10px] font-bold text-[#008080] tracking-wide"
              >
                {formatDisplayDate(release.date)}
              </time>
            </div>
            {release.summary && (
              <p className="text-xs text-gray-600 font-medium leading-relaxed mb-3">{release.summary}</p>
            )}
            <div className="space-y-3">
              {(["added", "changed", "fixed"] as ChangelogKind[]).map((kind) => {
                const bullets = release.sections[kind];
                if (!bullets?.length) return null;
                return (
                  <div key={kind}>
                    <p
                      className={`text-[9px] font-extrabold tracking-widest uppercase mb-1.5 inline-block rounded-full border px-2 py-0.5 ${KIND_STYLES[kind]}`}
                    >
                      {changelogKindLabel(kind)}
                    </p>
                    <ul className="list-disc pl-4 space-y-1.5 text-xs text-gray-700 leading-relaxed">
                      {bullets.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
