import React, { useState, useEffect } from "react";
import { QuestPack, CollectedCard, Rarity } from "../types";
import { Sparkles, ArrowRight, Eye, CheckCircle2 } from "lucide-react";
import { sound } from "../utils/audio";
import group303Image from "../assets/images/Group 303.png";
import { rarityArtwork } from "../utils/rarityArtwork";

interface PackCompletionRevealProps {
  pack: QuestPack;
  score: number;
  maxScore: number;
  rarity: Rarity;
  points: number;
  rewardCard: CollectedCard;
  onViewCollection: () => void;
  onFinish: () => void;
}

export const PackCompletionReveal: React.FC<PackCompletionRevealProps> = ({
  pack,
  score,
  maxScore,
  rarity,
  points,
  rewardCard,
  onViewCollection,
  onFinish,
}) => {
  const [analyzing, setAnalyzing] = useState(true);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnalyzing(false);
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  const handleReveal = () => {
    if (isRevealed) return;
    sound.playCardFlip();
    sound.playRewardFanfare(rarity);
    setIsRevealed(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!analyzing && !isRevealed && (e.key === " " || e.key === "Enter")) {
        e.preventDefault();
        handleReveal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [analyzing, isRevealed]);

  const getRarityConfig = (r: Rarity) => {
    switch (r) {
      case "LEGENDARY":
        return {
          label: "LEGENDARY",
          border: "border-amber-400",
          glow: "foil-gold",
          badgeBg: "bg-amber-400 text-black font-black",
          textColor: "text-amber-400",
          ambient: "bg-amber-400/30",
        };
      case "EPIC":
        return {
          label: "EPIC",
          border: "border-orange-500",
          glow: "foil-orange",
          badgeBg: "bg-orange-500 text-black font-black",
          textColor: "text-orange-400",
          ambient: "bg-orange-500/30",
        };
      case "RARE":
        return {
          label: "RARE",
          border: "border-purple-500",
          glow: "foil-purple",
          badgeBg: "bg-purple-600 text-white font-black",
          textColor: "text-purple-400",
          ambient: "bg-purple-500/30",
        };
      case "UNCOMMON":
        return {
          label: "UNCOMMON",
          border: "border-emerald-500",
          glow: "foil-green",
          badgeBg: "bg-emerald-500 text-black font-black",
          textColor: "text-emerald-400",
          ambient: "bg-emerald-500/25",
        };
      case "COMMON":
        return {
          label: "COMMON",
          border: "border-sky-400",
          glow: "foil-blue",
          badgeBg: "bg-sky-500 text-black font-black",
          textColor: "text-sky-400",
          ambient: "bg-sky-500/25",
        };
      case "STARTER":
      default:
        return {
          label: "STARTER",
          border: "border-slate-400",
          glow: "foil-slate",
          badgeBg: "bg-slate-500 text-white font-black",
          textColor: "text-slate-400",
          ambient: "bg-slate-500/20",
        };
    }
  };

  const rarityConfig = getRarityConfig(rarity);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full flex flex-col items-center justify-between py-8 px-4 bg-[#1D3F6D] select-none overflow-hidden">
      {/* Ambient background glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-[150px] pointer-events-none transition-all duration-1000 ${
          isRevealed ? rarityConfig.ambient : "bg-[#DBEE00]/25"
        }`}
      />

      {/* Top Header */}
      <div className="relative z-10 text-center max-w-xl">
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-wide text-[#DBEE00] font-['Outfit'] drop-shadow">
          PACK SELESAI!
        </h1>
        <p className="mt-1 text-sm text-[#F5F7FA] font-medium">
          {analyzing
            ? "Menganalisis hasil jawaban..."
            : "Kuis telah berhasil dinilai secara otomatis."}
        </p>
      </div>

      {/* Center Card Stage */}
      <div className="relative z-10 my-auto py-4 flex flex-col items-center justify-center">
        {analyzing ? (
          <div className="w-[280px] sm:w-[330px] h-[420px] sm:h-[480px] rounded-3xl bg-[#142e52] border-2 border-[#2b558c] flex flex-col items-center justify-center p-6 text-center shadow-2xl">
            <div className="relative w-16 h-16 flex items-center justify-center mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-[#DBEE00]/20 border-t-[#DBEE00] animate-spin" />
              <Sparkles className="w-7 h-7 text-[#DBEE00] animate-pulse" />
            </div>
            <span className="text-base font-black text-[#F5F7FA] font-['Outfit']">
              Menganalisis hasil jawaban...
            </span>
            <span className="text-xs text-white/70 mt-2">
              Menghitung skor dan menentukan tingkat kelangkaan kartu
            </span>
          </div>
        ) : (
          <div
            onClick={!isRevealed ? handleReveal : undefined}
            className={`perspective-1200 ${!isRevealed ? "cursor-pointer group" : ""}`}
          >
            <div
              className={`relative w-[280px] sm:w-[330px] h-[430px] sm:h-[490px] rounded-3xl transition-transform duration-700 preserve-3d will-change-transform ${
                isRevealed ? "rotate-y-180" : "group-hover:scale-[1.03]"
              }`}
            >
              {/* Face-down card */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden backface-hidden shadow-2xl shadow-[#DBEE00]/30 border-2 border-[#DBEE00]">
                <img
                  src={group303Image}
                  alt="Questdex pack"
                  className="w-full h-full object-cover select-none"
                />
                <div className="absolute bottom-10 inset-x-8 z-30 bg-[#1D3F6D]/95 border-2 border-[#DBEE00] py-2.5 px-4 rounded-2xl text-center shadow-xl group-hover:bg-[#DBEE00] transition-colors">
                  <span className="text-xs font-black tracking-widest uppercase font-['Outfit'] flex items-center justify-center gap-2 text-[#DBEE00] group-hover:text-black">
                    <Sparkles className="w-4 h-4" />
                    TAP TO REVEAL
                  </span>
                </div>
              </div>

              {/* Face-up reward card */}
              <div
                className={`absolute inset-0 rounded-3xl overflow-hidden border-4 ${rarityConfig.border} ${rarityConfig.glow} backface-hidden rotate-y-180 shadow-2xl`}
              >
                <img
                  src={rarityArtwork[rarity]}
                  alt={`${rarityConfig.label} reward card`}
                  className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                />

                <div className="absolute top-4 inset-x-4 z-10 flex items-center justify-between gap-2">
                  <span
                    className={`text-[11px] font-mono font-black px-2.5 py-1 rounded-full shadow-sm ${rarityConfig.badgeBg}`}
                  >
                    {rarityConfig.label}
                  </span>
                  <span className="text-[11px] font-mono font-black uppercase text-[#1D3F6D] bg-[#DBEE00]/90 px-2 py-1 rounded-full">
                    {pack.meetingCode}
                  </span>
                </div>

                <div className="absolute bottom-3 inset-x-3 z-10 bg-[#1D3F6D]/95 text-white border-2 border-black/20 rounded-2xl p-2.5 text-center space-y-1 shadow-lg">
                  <div className="text-xs text-white/90 font-bold">
                    <span className="text-[#DBEE00] font-black">{score}</span>{" "}
                    dari {maxScore} jawaban benar
                  </div>
                  <div className="text-base font-black font-mono tabular-nums text-[#DBEE00]">
                    +{points} Poin
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Footer */}
      <div className="relative z-10 w-full max-w-md text-center space-y-3">
        {!analyzing && isRevealed && (
          <div className="space-y-3 animate-fade-in">
            <div className="flex items-center justify-center gap-2 text-xs text-[#DBEE00] font-black">
              <CheckCircle2 className="w-4 h-4 text-[#DBEE00]" /> Kartu telah
              ditambahkan ke QuestDex Anda!
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  sound.playSelect();
                  onViewCollection();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#DBEE00] hover:bg-[#c8d800] text-black font-black font-['Outfit'] text-xs tracking-wide transition-all shadow-xl hover:scale-105 flex items-center justify-center gap-2 cursor-pointer ring-2 ring-black/20"
              >
                <Eye className="w-4 h-4 fill-black" />
                LIHAT KOLEKSI
              </button>

              <button
                onClick={() => {
                  sound.playSelect();
                  onFinish();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#142e52] hover:bg-[#1c3f6f] border border-[#2b558c] hover:border-[#DBEE00] text-[#F5F7FA] font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                SELESAI
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {!analyzing && !isRevealed && (
          <span className="text-xs text-white/70 block font-semibold">
            Ketuk kartu di atas untuk membuka reward kartu Anda
          </span>
        )}
      </div>
    </div>
  );
};
