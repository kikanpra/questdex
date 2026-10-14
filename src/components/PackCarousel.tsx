import React, { useState, useEffect, useRef } from "react";
import { QuestPack, User, CollectedCard } from "../types";
import { GROUP_303_ARTWORK_URL } from "../data/initialPacks";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Layers,
  Sparkles,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { sound } from "../utils/audio";

interface PackCarouselProps {
  packs: QuestPack[];
  currentUser: User;
  collectedCards: CollectedCard[];
  onOpenPack: (pack: QuestPack) => void;
  onOpenQuestDex: () => void;
}

export const PackCarousel: React.FC<PackCarouselProps> = ({
  packs,
  currentUser,
  collectedCards,
  onOpenPack,
  onOpenQuestDex,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const visiblePacks = packs.filter(
    (p) => p.isPublished || currentUser.role === "lecturer",
  );
  const selectedPack = visiblePacks[selectedIndex] || visiblePacks[0];

  const handlePrev = () => {
    sound.playSelect();
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : visiblePacks.length - 1));
  };

  const handleNext = () => {
    sound.playSelect();
    setSelectedIndex((prev) => (prev < visiblePacks.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Enter") {
        if (selectedPack) {
          handleOpenClick();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, visiblePacks]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  const hasCompleted = collectedCards.some(
    (c) => c.packId === selectedPack?.id,
  );
  const isClassMatch =
    currentUser.role === "lecturer" ||
    selectedPack?.assignedClass === currentUser.classId;

  const handleOpenClick = () => {
    if (!selectedPack || !isClassMatch) return;
    sound.playPackTear();
    onOpenPack(selectedPack);
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col justify-between pt-8 pb-10 px-4 sm:px-6 overflow-hidden bg-[#1D3F6D]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] rounded-full blur-[140px] pointer-events-none opacity-25 bg-[#DBEE00]" />
      <div className="absolute inset-0 bg-[radial-gradient(#2b558c_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Header Info with Generous Gap to prevent overlap with cards */}
      <div className="relative text-center max-w-2xl mx-auto pt-2 mb-12 sm:mb-16 z-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#DBEE00] font-['Outfit'] uppercase drop-shadow-md">
          MY QUEST PACKS
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#F5F7FA] font-medium tracking-wide">
          Kumpulkan kartu dari setiap perjalanan belajarmu.
        </p>
      </div>

      {/* 3D Pack Carousel Area using original booster pack images */}
      <div
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full max-w-5xl mx-auto my-auto py-4 flex items-center justify-center perspective-1200 z-10 select-none"
        style={{ minHeight: "430px" }}
      >
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          aria-label="Pack Sebelumnya"
          className="absolute left-2 sm:left-4 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#142e52]/90 hover:bg-[#1a3d6d] border border-[#2b558c] hover:border-[#DBEE00] text-[#DBEE00] flex items-center justify-center shadow-xl transition-all duration-200 cursor-pointer active:scale-95"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          aria-label="Pack Berikutnya"
          className="absolute right-2 sm:right-4 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#142e52]/90 hover:bg-[#1a3d6d] border border-[#2b558c] hover:border-[#DBEE00] text-[#DBEE00] flex items-center justify-center shadow-xl transition-all duration-200 cursor-pointer active:scale-95"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* 3D Stage of Packs */}
        <div className="relative w-full h-[400px] flex items-center justify-center preserve-3d">
          {visiblePacks.map((pack, index) => {
            const offset = index - selectedIndex;
            const isSelected = offset === 0;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            const packIsCompleted = collectedCards.some(
              (c) => c.packId === pack.id,
            );

            const translateX = offset * (window.innerWidth < 640 ? 140 : 210);
            const rotateY = offset * -28;
            const translateZ = isSelected ? 80 : -80 * Math.abs(offset);
            const scale = isSelected ? 1 : 0.82 - Math.abs(offset) * 0.08;
            const opacity = isSelected ? 1 : 0.65 - Math.abs(offset) * 0.15;
            const zIndex = 20 - Math.abs(offset);

            return (
              <div
                key={pack.id}
                onClick={() => {
                  sound.playSelect();
                  setSelectedIndex(index);
                }}
                className={`absolute transition-all duration-500 ease-out cursor-pointer preserve-3d will-change-transform ${
                  isSelected ? "cursor-default" : "hover:opacity-90"
                }`}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  zIndex,
                  opacity,
                }}
              >
                {/* Booster Pack with Original Artwork */}
                <div
                  className={`relative w-[230px] sm:w-[260px] h-[340px] sm:h-[390px] rounded-2xl overflow-hidden border transition-all duration-300 ${
                    isSelected
                      ? "border-[#DBEE00] shadow-2xl shadow-[#DBEE00]/30 ring-2 ring-[#DBEE00]/60"
                      : "border-[#2b558c] shadow-xl shadow-black/80"
                  }`}
                >
                  {/* Original Booster Pack Artwork Image */}
                  <img
                    src={GROUP_303_ARTWORK_URL}
                    alt={pack.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center select-none"
                  />

                  {/* Foil Shimmer Sheen overlay */}
                  <div className="absolute inset-0 pointer-events-none holo-sheen opacity-35 mix-blend-screen" />

                  {/* Sealed Top Crimp Line */}
                  <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-center">
                    <div className="w-16 h-0.5 bg-white/30 rounded-full" />
                  </div>

                  {/* Small Selesai Badge in the Top-Right Corner as originally designed */}
                  {packIsCompleted && (
                    <div className="absolute top-3.5 right-3.5 z-20 bg-emerald-500/90 text-black text-[10px] font-bold px-2 py-0.5 rounded shadow-lg flex items-center gap-1 backdrop-blur-sm">
                      <CheckCircle2 className="w-3 h-3 text-black" />
                      SELESAI
                    </div>
                  )}

                  {/* Class Lock Overlay */}
                  {!isClassMatch && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-xs z-30 flex flex-col items-center justify-center text-center p-4">
                      <Lock className="w-8 h-8 text-[#DBEE00] mb-2" />
                      <span className="text-xs font-bold text-white">
                        Khusus Kelas {pack.assignedClass}
                      </span>
                    </div>
                  )}

                  {/* Bottom Gradient with Quick Info */}
                  <div className="absolute bottom-0 inset-x-0 p-3.5 bg-gradient-to-t from-[#10243E] via-[#10243E]/85 to-transparent pt-8 text-left z-10">
                    <span className="text-[10px] font-mono tracking-wider text-[#DBEE00] uppercase font-bold block">
                      {pack.meetingCode} · 10 CARDS
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[#F5F7FA] font-['Outfit'] truncate">
                      {pack.title}
                    </h3>
                  </div>
                </div>

                {/* Subtle Reflection below selected pack */}
                {isSelected && (
                  <div className="w-full h-12 mt-2 rounded-full blur-md opacity-30 pointer-events-none bg-[#DBEE00]" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Pack Details & Primary Action Bar */}
      <div className="relative z-20 max-w-xl mx-auto w-full text-center pt-4 pb-2">
        <div className="bg-[#142e52]/95 backdrop-blur-md border-2 border-[#2b558c] p-4 sm:p-5 rounded-3xl shadow-2xl">
          <div className="flex items-center justify-center gap-3 text-xs text-[#F5F7FA] mb-1.5 font-semibold">
            <span className="text-[#DBEE00] font-bold">
              {selectedPack.meetingCode}
            </span>
            <span>·</span>
            <span>{selectedPack.course}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-[#F5F7FA] font-['Outfit']">
            {selectedPack.title}
          </h2>

          <p className="mt-1 text-xs text-white/80 line-clamp-2 max-w-md mx-auto">
            {selectedPack.description}
          </p>

          {/* Metadata Specs Strip */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 my-3.5 pt-3 border-t border-[#2b558c] text-xs">
            <div className="flex items-center gap-1.5 text-[#F5F7FA] font-semibold">
              <Layers className="w-4 h-4 text-[#DBEE00]" />
              <span className="font-mono tabular-nums">
                {selectedPack.cardCount} Kartu Soal
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[#F5F7FA] font-semibold">
              <Clock className="w-4 h-4 text-[#DBEE00]" />
              <span className="font-mono tabular-nums">
                {selectedPack.timeLimitMinutes} Menit
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {hasCompleted ? (
                <span className="text-[#DBEE00] flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Sudah Selesai
                </span>
              ) : isClassMatch ? (
                <span className="text-white/80 flex items-center gap-1 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#DBEE00]" /> Belum
                  Selesai
                </span>
              ) : (
                <span className="text-amber-300 flex items-center gap-1 font-bold">
                  <Lock className="w-3.5 h-3.5" /> Terkunci
                </span>
              )}
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-2">
            <button
              onClick={handleOpenClick}
              disabled={!isClassMatch}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black font-['Outfit'] text-sm tracking-wide transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-xl ${
                isClassMatch
                  ? "bg-[#DBEE00] hover:bg-[#c9da00] text-black hover:scale-105 active:scale-98 shadow-[#DBEE00]/30 ring-2 ring-black/20"
                  : "bg-[#1D3F6D] text-white/40 cursor-not-allowed opacity-60"
              }`}
            >
              <Sparkles className="w-4 h-4 fill-black" />
              BUKA PACK
            </button>

            <button
              onClick={() => {
                sound.playSelect();
                onOpenQuestDex();
              }}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl font-bold text-xs text-[#F5F7FA] hover:text-[#DBEE00] bg-[#1a3d6d] hover:bg-[#204982] border border-[#2b558c] hover:border-[#DBEE00]/50 transition-all cursor-pointer"
            >
              Lihat QuestDex
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
