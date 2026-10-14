import React, { useState, useEffect } from "react";
import { QuestPack } from "../types";
import { Clock, Sparkles } from "lucide-react";
import { sound } from "../utils/audio";
import group303Image from "../assets/images/Group 303.png";

interface SealedCardRevealProps {
  pack: QuestPack;
  timeRemainingSeconds: number;
  onCardFlipped: () => void;
}

export const SealedCardReveal: React.FC<SealedCardRevealProps> = ({
  pack,
  timeRemainingSeconds,
  onCardFlipped,
}) => {
  const [isFlipping, setIsFlipping] = useState(false);

  const minutes = Math.floor(timeRemainingSeconds / 60);
  const seconds = timeRemainingSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const handleReveal = () => {
    if (isFlipping) return;
    sound.playCardFlip();
    setIsFlipping(true);
    setTimeout(() => {
      onCardFlipped();
    }, 600);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleReveal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFlipping]);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full flex flex-col items-center justify-between py-6 px-4 bg-[#1D3F6D] select-none">
      {/* Lime Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#DBEE00]/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header & Prominent Timer */}
      <div className="relative z-10 w-full max-w-xl text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#142e52] border border-[#2b558c] rounded-full text-xs font-mono text-[#DBEE00] font-bold shadow-lg">
          <Clock className="w-3.5 h-3.5 text-[#DBEE00]" />
          <span className="tabular-nums tracking-wider">{timeFormatted}</span>
        </div>

        <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-[#F5F7FA] font-['Outfit'] drop-shadow">
          {pack.title} #{String(pack.meetingNumber).padStart(2, "0")}
        </h1>
      </div>

      {/* Center Sealed Card with 3D Flip */}
      <div
        onClick={handleReveal}
        className="relative z-10 my-auto cursor-pointer perspective-1200 group"
      >
        <div
          className={`relative w-[280px] sm:w-[330px] h-[420px] sm:h-[490px] rounded-3xl transition-transform duration-700 preserve-3d will-change-transform shadow-2xl shadow-[#DBEE00]/30 group-hover:shadow-[#DBEE00]/60 ${
            isFlipping ? "rotate-y-180" : "group-hover:scale-[1.03]"
          }`}
        >
          {/* Back of Card: Pure Group 303 Card Image */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden backface-hidden shadow-2xl">
            <img
              src={group303Image}
              alt="Questdex pack"
              className="w-full h-full object-cover select-none"
            />

            {/* Tap to Reveal Prompt Button */}
            <div className="absolute bottom-9 inset-x-8 z-30 bg-[#1D3F6D]/95 backdrop-blur-md border-2 border-[#DBEE00] py-2.5 px-4 rounded-2xl text-center shadow-xl group-hover:bg-[#DBEE00] transition-colors duration-200">
              <span className="text-xs font-black tracking-widest uppercase font-['Outfit'] flex items-center justify-center gap-2 text-[#DBEE00] group-hover:text-black">
                <Sparkles className="w-4 h-4" />
                TAP TO REVEAL
              </span>
            </div>
          </div>

          {/* Front of Card: Opening transition */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden border-4 border-[#1D3F6D] bg-[#DBEE00] backface-hidden rotate-y-180 p-6 flex flex-col items-center justify-center text-center shadow-2xl text-black">
            <img
              src={group303Image}
              alt="Questdex pack"
              className="absolute inset-0 w-full h-full object-cover opacity-30 select-none"
            />
            <span className="relative z-10 text-xs font-mono text-[#1D3F6D] uppercase font-black tracking-wider">
              KARTU 01 / 10
            </span>
            <h3 className="relative z-10 text-xl font-black text-[#1D3F6D] mt-2 font-['Outfit']">
              Membuka Soal Pertama...
            </h3>
          </div>
        </div>
      </div>

      {/* Underneath Card Counter & Prompt */}
      <div className="relative z-10 text-center pb-4">
        <span className="text-sm font-bold text-[#DBEE00] tracking-wide block">
          Kartu 01 dari 10
        </span>
        <span className="text-xs text-white/70 mt-1 block">
          Ketuk kartu atau tekan spasi untuk membuka soal
        </span>
      </div>
    </div>
  );
};
