import React, { useState } from "react";
import { CollectedCard, QuestPack, Rarity } from "../types";
import { X, Award, Filter, Calendar, Lock } from "lucide-react";
import { sound } from "../utils/audio";
import { rarityArtwork } from "../utils/rarityArtwork";
import { QuestdexLogo } from "./QuestdexLogo";

interface QuestDexModalProps {
  isOpen: boolean;
  onClose: () => void;
  collectedCards: CollectedCard[];
  packs: QuestPack[];
  totalPoints: number;
}

export const QuestDexModal: React.FC<QuestDexModalProps> = ({
  isOpen,
  onClose,
  collectedCards,
  packs,
  totalPoints,
}) => {
  const [selectedPackFilter, setSelectedPackFilter] = useState<string>("all");
  const [selectedCardDetail, setSelectedCardDetail] =
    useState<CollectedCard | null>(null);

  if (!isOpen) return null;

  const filteredCollected =
    selectedPackFilter === "all"
      ? collectedCards
      : collectedCards.filter((c) => c.packId === selectedPackFilter);

  const totalTargetCards = selectedPackFilter === "all" ? 20 : 4;
  const distinctCardIds = new Set(filteredCollected.map((c) => c.cardTitle));
  const distinctCollectedCount = distinctCardIds.size;
  const progressPercent = Math.min(
    100,
    Math.round((distinctCollectedCount / totalTargetCards) * 100),
  );

  const rarityOrder: Rarity[] = [
    "LEGENDARY",
    "EPIC",
    "RARE",
    "UNCOMMON",
    "COMMON",
    "STARTER",
  ];

  const getRarityBadge = (r: Rarity) => {
    switch (r) {
      case "LEGENDARY":
        return {
          label: "LEGENDARY",
          text: "text-amber-300",
          border: "border-amber-400",
          bg: "bg-amber-400 text-black",
          glow: "foil-gold",
        };
      case "EPIC":
        return {
          label: "EPIC",
          text: "text-orange-300",
          border: "border-orange-500",
          bg: "bg-orange-500 text-black",
          glow: "foil-orange",
        };
      case "RARE":
        return {
          label: "RARE",
          text: "text-purple-300",
          border: "border-purple-500",
          bg: "bg-purple-600 text-white",
          glow: "foil-purple",
        };
      case "UNCOMMON":
        return {
          label: "UNCOMMON",
          text: "text-emerald-300",
          border: "border-emerald-500",
          bg: "bg-emerald-500 text-black",
          glow: "foil-green",
        };
      case "COMMON":
        return {
          label: "COMMON",
          text: "text-sky-300",
          border: "border-sky-400",
          bg: "bg-sky-500 text-black",
          glow: "foil-blue",
        };
      case "STARTER":
      default:
        return {
          label: "STARTER",
          text: "text-slate-300",
          border: "border-slate-500",
          bg: "bg-slate-500 text-white",
          glow: "foil-slate",
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      {/* Main QuestDex Container */}
      <div className="relative w-full max-w-5xl h-[90vh] bg-[#142e52] border-2 border-[#2b558c] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#F5F7FA]">
        {/* Header Strip with Questdex Bubble Logo */}
        <div className="p-4 sm:p-6 border-b border-[#2b558c] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 bg-[#10243e]">
          <div className="flex items-center gap-4">
            <QuestdexLogo size="md" />
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-full bg-[#DBEE00] text-black">
                  {filteredCollected.length} KARTU TERKUMPUL
                </span>
              </div>
              <p className="text-xs text-white/70 font-medium mt-0.5">
                Katalog kartu kelangkaan dan pencapaian akademik Anda.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Total Points Badge */}
            <div className="flex items-center gap-2 bg-[#1D3F6D] border border-[#2b558c] px-3.5 py-1.5 rounded-2xl font-mono text-xs tabular-nums">
              <Award className="w-4 h-4 text-[#DBEE00]" />
              <span className="text-white/70">Total:</span>
              <span className="text-[#DBEE00] font-black text-sm">
                {totalPoints} Poin
              </span>
            </div>

            <button
              onClick={() => {
                sound.playSelect();
                onClose();
              }}
              className="w-9 h-9 rounded-2xl bg-[#1D3F6D] hover:bg-[#204a82] text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-[#2b558c]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="px-4 sm:px-6 py-3 border-b border-[#2b558c] bg-[#142e52] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2 text-xs text-white/80 font-bold">
            <Filter className="w-3.5 h-3.5 text-[#DBEE00]" />
            <span className="hidden sm:inline">
              PILIH PACK ATAU MATA KULIAH:
            </span>
          </div>

          <select
            value={selectedPackFilter}
            onChange={(e) => {
              sound.playSelect();
              setSelectedPackFilter(e.target.value);
            }}
            aria-label="Pilih Pack atau Mata Kuliah"
            className="bg-[#1D3F6D] border-2 border-[#2b558c] focus:border-[#DBEE00] text-xs font-bold text-[#F5F7FA] px-3 py-1.5 rounded-xl outline-none cursor-pointer"
          >
            <option value="all">Semua Pack & Mata Kuliah</option>
            {packs.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} ({p.meetingCode})
              </option>
            ))}
          </select>
        </div>

        {/* Scrollable Card Catalog */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8 bg-[#122847]">
          {rarityOrder.map((rarityLevel) => {
            const cardsInRarity = filteredCollected.filter(
              (c) => c.rarity === rarityLevel,
            );
            const cfg = getRarityBadge(rarityLevel);

            return (
              <div key={rarityLevel} className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#2b558c]">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`text-xs font-mono font-black px-2.5 py-0.5 rounded-full ${cfg.bg}`}
                    >
                      {rarityLevel}
                    </span>
                    <span className="text-xs text-white/70 font-bold">
                      — {cardsInRarity.length} kartu
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
                  {cardsInRarity.length > 0 ? (
                    cardsInRarity.map((card) => (
                      <div
                        key={card.id}
                        onClick={() => {
                          sound.playSelect();
                          setSelectedCardDetail(card);
                        }}
                        className={`relative group rounded-2xl overflow-hidden border-2 ${cfg.border} bg-[#DBEE00] cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${cfg.glow} text-[#1D3F6D]`}
                      >
                        {/* Artwork container using Group 303 Card Image */}
                        <div className="aspect-[3/4] w-full relative overflow-hidden rounded-t-2xl bg-[#1D3F6D]">
                          <img
                            src={rarityArtwork[card.rarity]}
                            alt={card.cardTitle}
                            className="w-full h-full object-cover select-none"
                          />
                          <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-mono font-black bg-[#1D3F6D] text-[#DBEE00] border border-[#DBEE00]/40 shadow-xs">
                            #{String(card.meetingNumber).padStart(2, "0")}
                          </div>
                        </div>

                        {/* Card Info */}
                        <div className="p-2.5 bg-[#DBEE00] border-t-2 border-[#1D3F6D]">
                          <h4 className="text-xs font-black text-[#10243E] font-['Outfit'] truncate">
                            {card.cardTitle}
                          </h4>
                          <div className="flex items-center justify-between mt-0.5 text-[10px] font-bold text-[#1D3F6D]">
                            <span className="truncate max-w-[90px]">
                              {card.packTitle}
                            </span>
                            <span className="font-mono font-black bg-[#1D3F6D] text-[#DBEE00] px-1 rounded">
                              +{card.points}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full py-4 px-4 rounded-2xl border-2 border-dashed border-[#2b558c] bg-[#142e52]/40 flex items-center justify-center gap-2 text-xs text-white/50 font-medium">
                      <Lock className="w-3.5 h-3.5" />
                      Belum ada kartu tingkat {rarityLevel} yang terkumpul di
                      kategori ini.
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Fixed Footer: Collection Progress Bar in Lime #DBEE00 */}
        <div className="p-4 sm:p-5 border-t border-[#2b558c] bg-[#10243e] shrink-0">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="font-mono uppercase tracking-wider text-[#DBEE00] font-black">
              PROGRES KOLEKSI
            </span>
            <span className="font-mono text-[#F5F7FA] tabular-nums">
              {distinctCollectedCount} dari {totalTargetCards} kartu unik (
              {progressPercent}%)
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-[#1D3F6D] border border-[#2b558c] overflow-hidden">
            <div
              className="h-full bg-[#DBEE00] transition-all duration-500 rounded-full shadow-md shadow-[#DBEE00]/30"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Screen 8: Card Detail Preview Modal */}
      {selectedCardDetail && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-sm bg-[#142e52] border-2 border-[#DBEE00] rounded-3xl p-5 shadow-2xl flex flex-col items-center">
            <button
              onClick={() => setSelectedCardDetail(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white hover:text-[#DBEE00] flex items-center justify-center cursor-pointer z-10 border border-[#2b558c]"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Large Card using Group 303 image background */}
            <div className="relative w-[240px] h-[340px] rounded-3xl overflow-hidden border-4 border-[#1D3F6D] shadow-2xl mb-4 p-4 flex flex-col justify-between text-[#1D3F6D]">
              <img
                src={rarityArtwork[selectedCardDetail.rarity]}
                alt="Card Preview"
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              />
              <div className="absolute inset-0 bg-white/20 pointer-events-none" />

              <div className="relative z-10 text-center my-auto bg-[#DBEE00]/85 p-3 rounded-2xl border border-[#1D3F6D]/20 shadow-sm backdrop-blur-xs">
                <span
                  className={`text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full ${getRarityBadge(selectedCardDetail.rarity).bg}`}
                >
                  {selectedCardDetail.rarity}
                </span>
                <h3 className="text-lg font-black font-['Outfit'] text-[#10243E] mt-2 uppercase">
                  {selectedCardDetail.cardTitle}
                </h3>
                <span className="text-xs font-bold text-[#1D3F6D]/80 block mt-0.5">
                  {selectedCardDetail.course}
                </span>
              </div>

              <div className="relative z-10 bg-[#1D3F6D] text-[#DBEE00] rounded-xl p-2.5 text-center font-bold text-xs shadow-md">
                Skor: {selectedCardDetail.score}/{selectedCardDetail.maxScore} ·
                +{selectedCardDetail.points} Poin
              </div>
            </div>

            {/* Metadata Detail Breakdown */}
            <div className="w-full space-y-2 text-xs bg-[#1D3F6D] p-3.5 rounded-2xl border border-[#2b558c]">
              <div className="flex justify-between text-white/70">
                <span>Pack:</span>
                <span className="font-bold text-[#F5F7FA]">
                  {selectedCardDetail.packTitle}
                </span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Mata Kuliah:</span>
                <span className="font-bold text-[#F5F7FA]">
                  {selectedCardDetail.course}
                </span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Skor Kuis:</span>
                <span className="font-black text-[#DBEE00]">
                  {selectedCardDetail.score}/{selectedCardDetail.maxScore} Benar
                </span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Poin Diperoleh:</span>
                <span className="font-mono font-black text-[#DBEE00]">
                  +{selectedCardDetail.points} Poin
                </span>
              </div>
              <div className="flex justify-between text-white/70 pt-1 border-t border-[#2b558c]">
                <span>Tanggal Koleksi:</span>
                <span className="font-mono text-[11px] text-white/80 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#DBEE00]" />
                  {selectedCardDetail.collectedAt}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedCardDetail(null)}
              className="mt-4 w-full py-2.5 bg-[#DBEE00] hover:bg-[#c9da00] text-black font-black text-xs rounded-2xl transition-colors cursor-pointer"
            >
              Tutup Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
