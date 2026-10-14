import React, { useState } from "react";
import { QuestPack, Question } from "../types";
import {
  Clock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Send,
} from "lucide-react";
import { sound } from "../utils/audio";
import { QuestdexLogo } from "./QuestdexLogo";
import { GROUP_303_ARTWORK_URL } from "../data/initialPacks";
import questionCardBackground from "../assets/images/ty.png";

interface QuestionCardPanelProps {
  pack: QuestPack;
  timeRemainingSeconds: number;
  userAnswers: Record<number, string>;
  onAnswerChange: (cardIndex: number, answer: string) => void;
  onSubmitPack: () => void;
}

export const QuestionCardPanel: React.FC<QuestionCardPanelProps> = ({
  pack,
  timeRemainingSeconds,
  userAnswers,
  onAnswerChange,
  onSubmitPack,
}) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(1);
  const currentQuestion: Question =
    pack.questions.find((q) => q.cardIndex === currentCardIndex) ||
    pack.questions[0];

  const minutes = Math.floor(timeRemainingSeconds / 60);
  const seconds = timeRemainingSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const isTimeCritical = timeRemainingSeconds <= 120;

  const currentAnswer = userAnswers[currentCardIndex] || "";
  const answeredCount = Object.keys(userAnswers).filter(
    (k) => userAnswers[Number(k)]?.trim() !== "",
  ).length;

  const handleSelectOption = (opt: string) => {
    sound.playSelect();
    onAnswerChange(currentCardIndex, opt);
  };

  const handleNext = () => {
    sound.playSelect();
    if (currentCardIndex < pack.cardCount) {
      setCurrentCardIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    sound.playSelect();
    if (currentCardIndex > 1) {
      setCurrentCardIndex((prev) => prev - 1);
    }
  };

  const handleCardClick = (idx: number) => {
    sound.playSelect();
    setCurrentCardIndex(idx);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full bg-[#1D3F6D] py-4 px-3 sm:px-6 flex flex-col justify-between">
      {/* Top HUD: Pack Info, Timer, and Progress */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-4 pb-3 border-b border-[#2b558c]">
        <div className="flex items-center gap-3">
          <QuestdexLogo size="sm" className="hidden sm:inline-flex" />
          <span className="text-xs font-mono font-black text-[#DBEE00] tracking-wider uppercase bg-[#142e52] px-2.5 py-1 rounded-lg border border-[#2b558c]">
            {pack.meetingCode}
          </span>
          <span className="text-white/60 hidden sm:inline">·</span>
          <h2 className="text-sm sm:text-base font-black text-[#F5F7FA] font-['Outfit'] truncate max-w-[200px] sm:max-w-md">
            {pack.title}
          </h2>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="text-xs font-mono tabular-nums text-white/80 hidden sm:block">
            <span className="text-[#DBEE00] font-black">{answeredCount}</span>{" "}
            dari {pack.cardCount} terjawab
          </div>

          <div
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border font-mono text-xs sm:text-sm font-black tracking-wider tabular-nums shadow-md ${
              isTimeCritical
                ? "bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse"
                : "bg-[#142e52] border-[#2b558c] text-[#DBEE00]"
            }`}
          >
            <Clock className="w-4 h-4 text-[#DBEE00]" />
            <span>{timeFormatted}</span>
          </div>
        </div>
      </div>

      {/* Main 3-Column Layout */}
      <div className="w-full max-w-7xl mx-auto my-auto py-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* LEFT COLUMN: Opened Pack Miniature (Original Pack Artwork) & 10-Card Thumbnail Stack */}
        <div className="lg:col-span-3 flex flex-col justify-between bg-[#142e52]/90 border border-[#2b558c] rounded-3xl p-4 shadow-xl">
          {/* Opened Pack Miniature with Original Pack Cover */}
          <div className="flex items-center gap-3 pb-3 border-b border-[#2b558c]">
            <div className="w-14 h-18 rounded-xl overflow-hidden border-2 border-[#DBEE00] shrink-0 shadow-md">
              <img
                src={GROUP_303_ARTWORK_URL}
                alt={pack.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono uppercase text-[#DBEE00] block font-black">
                PACK TERBUKA
              </span>
              <h3 className="text-xs font-bold text-[#F5F7FA] truncate font-['Outfit']">
                {pack.topic}
              </h3>
              <span className="text-[11px] text-white/70 block font-semibold">
                {answeredCount}/{pack.cardCount} Selesai
              </span>
            </div>
          </div>

          {/* 10 Card Thumbnails */}
          <div className="mt-3">
            <span className="text-[11px] font-bold text-[#DBEE00] block mb-2 uppercase tracking-wide">
              DAFTAR KARTU SOAL
            </span>
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto max-h-[360px] pb-2 pr-1">
              {pack.questions.map((q) => {
                const isSelected = q.cardIndex === currentCardIndex;
                const isAnswered = Boolean(userAnswers[q.cardIndex]?.trim());

                return (
                  <button
                    key={q.id}
                    onClick={() => handleCardClick(q.cardIndex)}
                    className={`flex items-center justify-between p-2.5 rounded-2xl border text-left transition-all duration-150 cursor-pointer shrink-0 lg:w-full ${
                      isSelected
                        ? "bg-[#DBEE00] border-black text-black shadow-lg ring-2 ring-[#DBEE00]"
                        : isAnswered
                          ? "bg-[#1D3F6D] border-[#2b558c] text-[#F5F7FA]"
                          : "bg-[#1D3F6D]/50 border-[#2b558c]/60 text-white/70 hover:border-[#DBEE00]/50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-black shrink-0 ${
                          isSelected
                            ? "bg-black text-[#DBEE00]"
                            : isAnswered
                              ? "bg-[#DBEE00] text-black"
                              : "bg-[#2b558c] text-white"
                        }`}
                      >
                        {String(q.cardIndex).padStart(2, "0")}
                      </div>
                      <div className="hidden lg:block truncate max-w-[120px]">
                        <span
                          className={`text-[10px] font-mono uppercase block font-bold ${isSelected ? "text-black/80" : "text-white/60"}`}
                        >
                          {q.topic}
                        </span>
                        <span
                          className={`text-xs font-semibold truncate block ${isSelected ? "text-black" : "text-[#F5F7FA]"}`}
                        >
                          {q.prompt}
                        </span>
                      </div>
                    </div>

                    <div className="hidden lg:flex items-center">
                      {isAnswered ? (
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 ${isSelected ? "text-black" : "text-[#DBEE00]"}`}
                        />
                      ) : (
                        <div
                          className={`w-2 h-2 rounded-full ${isSelected ? "bg-black/40" : "bg-[#2b558c]"}`}
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-[#2b558c] text-[11px] text-white/70 hidden lg:block">
            Jawaban dapat diubah sebelum dikirim.
          </div>
        </div>

        {/* CENTER COLUMN: Large Interactive Question Card using Group 303 Image Background */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[420px] min-h-[490px] rounded-[32px] p-6 shadow-2xl shadow-black/60 flex flex-col justify-between overflow-hidden text-[#1D3F6D] border-4 border-[#1D3F6D]">
            {/* Background: Exact Group 303 Card Image */}
            <img
              src={questionCardBackground}
              alt="Latar kartu soal"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            />

            {/* Top Card Kicker: Card Index & Question Type */}
            <div className="relative z-10 flex items-center justify-between border-b-2 border-[#1D3F6D]/30 pb-2">
              <span className="text-xs font-mono font-black text-[#1D3F6D] tracking-wider uppercase">
                KARTU {String(currentCardIndex).padStart(2, "0")} /{" "}
                {String(pack.cardCount).padStart(2, "0")}
              </span>
              <span className="text-[11px] font-mono font-black uppercase text-[#1D3F6D]">
                {currentQuestion.type === "multiple-choice"
                  ? "PILIHAN GANDA"
                  : currentQuestion.type === "true-false"
                    ? "BENAR / SALAH"
                    : "ISIAN SINGKAT"}
              </span>
            </div>

            {/* Center: Topic & Prompt */}
            <div className="relative z-10 my-auto py-5 px-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#1D3F6D] font-black block mb-2 opacity-90">
                TOPIK: {currentQuestion.topic}
              </span>
              <p className="text-base sm:text-lg lg:text-xl font-black text-[#0D2038] font-['Outfit'] leading-relaxed drop-shadow-xs">
                "{currentQuestion.prompt}"
              </p>
            </div>

            {/* Bottom Card Footer: Course & Questdex Branding */}
            <div className="relative z-10 pt-2 border-t-2 border-[#1D3F6D]/30 flex items-center justify-between text-xs font-black text-[#1D3F6D]">
              <span className="truncate max-w-[210px]">{pack.course}</span>
              <span className="font-mono text-[11px] uppercase">QUESTDEX</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Answer Panel */}
        <div className="lg:col-span-4 flex flex-col justify-between bg-[#142e52]/90 border border-[#2b558c] rounded-3xl p-5 shadow-xl">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#2b558c] mb-4">
              <h3 className="text-sm font-black text-[#DBEE00] font-['Outfit'] uppercase tracking-wide">
                PANEL JAWABAN
              </h3>
              <span className="text-xs">
                {currentAnswer ? (
                  <span className="text-[#DBEE00] font-bold">Sudah diisi</span>
                ) : (
                  <span className="text-amber-300 font-bold">Belum diisi</span>
                )}
              </span>
            </div>

            {/* Question Type Inputs */}
            {currentQuestion.type === "multiple-choice" && (
              <div className="space-y-2.5">
                {currentQuestion.options?.map((opt, idx) => {
                  const isChecked = currentAnswer === opt;
                  const letter = String.fromCharCode(65 + idx);

                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelectOption(opt)}
                      className={`w-full p-3 rounded-2xl border text-left transition-all duration-150 flex items-start gap-3 cursor-pointer group ${
                        isChecked
                          ? "bg-[#DBEE00] border-black text-black ring-2 ring-[#DBEE00] font-bold shadow-md"
                          : "bg-[#1D3F6D] border-[#2b558c] text-[#F5F7FA] hover:border-[#DBEE00] hover:bg-[#224b82]"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-xs font-black shrink-0 mt-0.5 ${
                          isChecked
                            ? "bg-black text-[#DBEE00]"
                            : "bg-[#142e52] text-[#DBEE00] group-hover:bg-[#10233d]"
                        }`}
                      >
                        {letter}
                      </div>
                      <span className="text-xs sm:text-sm font-semibold leading-relaxed">
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {currentQuestion.type === "true-false" && (
              <div className="grid grid-cols-2 gap-3">
                {["Benar", "Salah"].map((opt) => {
                  const isChecked = currentAnswer === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelectOption(opt)}
                      className={`p-4 rounded-2xl border text-center font-['Outfit'] font-black text-sm sm:text-base transition-all duration-150 cursor-pointer ${
                        isChecked
                          ? "bg-[#DBEE00] border-black text-black ring-2 ring-[#DBEE00] shadow-md"
                          : "bg-[#1D3F6D] border-[#2b558c] text-[#F5F7FA] hover:border-[#DBEE00] hover:bg-[#224b82]"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}

            {currentQuestion.type === "short-answer" && (
              <div className="space-y-2">
                <label className="text-xs text-white/80 block font-semibold">
                  Ketik jawaban singkat Anda di bawah ini:
                </label>
                <input
                  type="text"
                  value={currentAnswer}
                  onChange={(e) =>
                    onAnswerChange(currentCardIndex, e.target.value)
                  }
                  placeholder="Masukkan jawaban Anda..."
                  className="w-full bg-[#1D3F6D] border-2 border-[#2b558c] focus:border-[#DBEE00] rounded-2xl px-4 py-3 text-sm text-[#F5F7FA] placeholder-white/40 outline-none transition-colors"
                />
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="pt-6 border-t border-[#2b558c] mt-6 space-y-3">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                disabled={currentCardIndex === 1}
                className="flex-1 px-4 py-2.5 rounded-2xl border border-[#2b558c] bg-[#1D3F6D] hover:bg-[#234d85] text-xs font-bold text-[#F5F7FA] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                SEBELUMNYA
              </button>

              {currentCardIndex < pack.cardCount ? (
                <button
                  onClick={handleNext}
                  className="flex-1 px-4 py-2.5 rounded-2xl bg-[#DBEE00] hover:bg-[#c6d700] text-black text-xs font-black font-['Outfit'] transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-98 shadow-md"
                >
                  KARTU BERIKUTNYA
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onSubmitPack}
                  className="flex-1 px-4 py-2.5 rounded-2xl bg-[#DBEE00] hover:bg-[#c6d700] text-black text-xs font-black font-['Outfit'] transition-all flex items-center justify-center gap-1 cursor-pointer shadow-lg shadow-[#DBEE00]/30 active:scale-98"
                >
                  <Send className="w-3.5 h-3.5" />
                  KIRIM JAWABAN
                </button>
              )}
            </div>

            {currentCardIndex !== pack.cardCount && (
              <button
                onClick={onSubmitPack}
                className="w-full text-center text-[11px] text-[#DBEE00] hover:underline transition-colors py-1 cursor-pointer font-bold"
              >
                Selesaikan dan kumpulkan kuis sekarang ({answeredCount}/
                {pack.cardCount} terisi)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
