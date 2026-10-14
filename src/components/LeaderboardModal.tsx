import React from 'react';
import { LeaderboardEntry } from '../types';
import { Trophy, Medal, X } from 'lucide-react';
import { sound } from '../utils/audio';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  entries: LeaderboardEntry[];
  currentUserId: string;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  entries,
  currentUserId,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in text-[#F5F7FA]">
      <div className="relative w-full max-w-2xl bg-[#142e52] border-2 border-[#2b558c] rounded-3xl p-6 shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#2b558c]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#DBEE00]/20 border border-[#DBEE00]/50 flex items-center justify-center text-[#DBEE00]">
              <Trophy className="w-5 h-5 text-[#DBEE00]" />
            </div>
            <div>
              <h2 className="text-xl font-black font-['Outfit'] uppercase text-[#DBEE00]">
                Papan Peringkat Kelas
              </h2>
              <span className="text-xs text-white/70 font-medium">
                Peringkat akumulasi poin koleksi kartu kuis
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

        {/* List */}
        <div className="overflow-y-auto py-4 space-y-2.5 flex-1 pr-1">
          {entries.map((entry, index) => {
            const isMe = entry.userId === currentUserId;
            const rank = index + 1;

            return (
              <div
                key={entry.userId}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                  isMe
                    ? 'bg-[#DBEE00] border-black text-black shadow-lg font-bold'
                    : 'bg-[#1D3F6D] border-[#2b558c]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center font-mono font-black text-sm shrink-0">
                    {rank === 1 ? (
                      <span className="text-amber-400 font-extrabold flex items-center">
                        <Medal className="w-5 h-5 text-amber-400" />
                      </span>
                    ) : rank === 2 ? (
                      <span className={isMe ? 'text-black' : 'text-slate-300'}>2</span>
                    ) : rank === 3 ? (
                      <span className={isMe ? 'text-black' : 'text-amber-500'}>3</span>
                    ) : (
                      <span className={isMe ? 'text-black' : 'text-white/70'}>{rank}</span>
                    )}
                  </div>

                  <div>
                    <h4 className={`text-sm font-black font-['Outfit'] flex items-center gap-2 ${isMe ? 'text-black' : 'text-[#F5F7FA]'}`}>
                      {entry.userName}
                      {isMe && (
                        <span className="text-[10px] font-mono uppercase bg-black text-[#DBEE00] px-1.5 py-0.2 rounded font-black">
                          ANDA
                        </span>
                      )}
                    </h4>
                    <span className={`text-xs ${isMe ? 'text-black/80' : 'text-white/60'}`}>
                      {entry.className} · {entry.cardsCollected} kartu dikoleksi
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`text-base font-black font-mono block tabular-nums ${isMe ? 'text-black' : 'text-[#DBEE00]'}`}>
                    {entry.totalPoints}
                  </span>
                  <span className={`text-[10px] uppercase font-mono ${isMe ? 'text-black/80' : 'text-white/60'}`}>
                    POIN
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
