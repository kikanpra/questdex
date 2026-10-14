import React from "react";
import { QuizAttempt, Rarity } from "../types";
import { Clock, X } from "lucide-react";
import { sound } from "../utils/audio";
import { rarityArtwork } from "../utils/rarityArtwork";

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  attempts: QuizAttempt[];
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  attempts,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in text-[#F5F7FA]">
      <div className="relative w-full max-w-2xl bg-[#142e52] border-2 border-[#2b558c] rounded-3xl p-6 shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#2b558c]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#DBEE00]/20 border border-[#DBEE00]/50 flex items-center justify-center text-[#DBEE00]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black font-['Outfit'] uppercase text-[#DBEE00]">
                Riwayat Pengerjaan Kuis
              </h2>
              <span className="text-xs text-white/70 font-medium">
                Catatan skor dan reward booster pack yang telah diselesaikan
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playSelect();
              onClose();
            }}
            className="w-9 h-9 rounded-2xl bg-[#1D3F6D] hover:bg-[#234c83] text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-[#2b558c]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Attempts List */}
        <div className="overflow-y-auto py-4 space-y-3 flex-1 pr-1">
          {attempts.length > 0 ? (
            attempts.map((att) => (
              <div
                key={att.id}
                className="p-4 rounded-2xl border border-[#2b558c] bg-[#1D3F6D] flex items-center justify-between gap-4 hover:border-[#DBEE00] transition-colors"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <img
                    src={rarityArtwork[att.rarity]}
                    alt={`${att.rarity} card`}
                    className="h-16 w-12 shrink-0 rounded-lg border border-[#2b558c] object-cover"
                  />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="truncate text-sm font-black text-[#F5F7FA] font-['Outfit']">
                        {att.packTitle}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#DBEE00] text-black font-black">
                        {att.rarity}
                      </span>
                    </div>
                    <span className="text-xs text-white/70 block mt-1">
                      Waktu: {att.completedAt} · Durasi:{" "}
                      {Math.floor(att.timeSpentSeconds / 60)}m{" "}
                      {att.timeSpentSeconds % 60}s
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-black text-[#DBEE00]">
                    {att.score}/10 Benar
                  </div>
                  <span className="text-xs font-mono font-black text-amber-300 block">
                    +{att.points} Poin
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-xs text-white/60">
              Belum ada riwayat kuis. Buka salah satu booster pack untuk mulai
              mengumpulkan kartu!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
