import React from "react";
import group303Image from "../assets/images/Group 303.png";

interface Group303CoverProps {
  className?: string;
  isCompleted?: boolean;
  showWatermark?: boolean;
}

export const Group303Cover: React.FC<Group303CoverProps> = ({
  className = "",
  isCompleted = false,
  showWatermark = true,
}) => {
  return (
    <div
      className={`relative w-full h-full rounded-[26px] select-none overflow-hidden shadow-2xl ${className}`}
    >
      <img
        src={group303Image}
        alt="Questdex"
        className="absolute inset-0 h-full w-full object-fill"
      />

      {showWatermark && (
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
          {isCompleted ? (
            <div className="-rotate-14 animate-fade-in">
              <div className="px-5 py-1.5 sm:px-6 sm:py-2 border-4 border-[#1D3F6D] bg-[#DBEE00]/90 text-[#1D3F6D] font-black text-lg sm:text-2xl uppercase tracking-[0.2em] font-['Outfit'] rounded-2xl shadow-xl shadow-black/30 backdrop-blur-xs ring-2 ring-white/50 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1D3F6D]" />
                SELESAI
                <span className="w-2.5 h-2.5 rounded-full bg-[#1D3F6D]" />
              </div>
            </div>
          ) : (
            <div className="-rotate-14 opacity-80">
              <div className="px-5 py-1.5 sm:px-6 sm:py-2 border-4 border-[#1D3F6D]/70 bg-white/20 text-[#1D3F6D] font-black text-base sm:text-xl uppercase tracking-[0.2em] font-['Outfit'] rounded-2xl shadow-md backdrop-blur-xs">
                BELUM SELESAI
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
