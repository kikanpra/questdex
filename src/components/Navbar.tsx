import React from 'react';
import { User } from '../types';
import { Volume2, VolumeX, UserCheck } from 'lucide-react';
import { sound } from '../utils/audio';
import { QuestdexLogo } from './QuestdexLogo';

interface NavbarProps {
  currentUser: User;
  onSwitchUser: () => void;
  activeTab: 'packs' | 'questdex' | 'leaderboard' | 'history' | 'lecturer';
  onSelectTab: (tab: 'packs' | 'questdex' | 'leaderboard' | 'history' | 'lecturer') => void;
  totalPoints: number;
  totalCards: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onSwitchUser,
  activeTab,
  onSelectTab,
  totalPoints,
  totalCards,
}) => {
  const [muted, setMuted] = React.useState(sound.getMuted());

  const toggleSound = () => {
    const next = !muted;
    sound.setMuted(next);
    setMuted(next);
    if (!next) sound.playSelect();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#16355d]/95 backdrop-blur-md border-b border-[#2b558c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Logo (Tematik visit Questdex Bubble Logo) */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => onSelectTab('packs')}
            className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
            aria-label="Kembali ke Beranda Packs"
          >
            <QuestdexLogo size="sm" className="hover:scale-105 transition-transform duration-200" />
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#F5F7FA]">
          <button
            onClick={() => { sound.playSelect(); onSelectTab('packs'); }}
            className={`transition-colors whitespace-nowrap cursor-pointer hover:text-[#DBEE00] ${
              activeTab === 'packs' ? 'text-[#DBEE00] font-bold border-b-2 border-[#DBEE00] pb-1' : ''
            }`}
          >
            Packs
          </button>
          <button
            onClick={() => { sound.playSelect(); onSelectTab('questdex'); }}
            className={`transition-colors whitespace-nowrap cursor-pointer hover:text-[#DBEE00] flex items-center gap-1.5 ${
              activeTab === 'questdex' ? 'text-[#DBEE00] font-bold border-b-2 border-[#DBEE00] pb-1' : ''
            }`}
          >
            QuestDex
            {totalCards > 0 && (
              <span className="text-[11px] font-mono tabular-nums text-black font-bold bg-[#DBEE00] px-1.5 py-0.2 rounded">
                {totalCards}
              </span>
            )}
          </button>
          <button
            onClick={() => { sound.playSelect(); onSelectTab('leaderboard'); }}
            className={`transition-colors whitespace-nowrap cursor-pointer hover:text-[#DBEE00] ${
              activeTab === 'leaderboard' ? 'text-[#DBEE00] font-bold border-b-2 border-[#DBEE00] pb-1' : ''
            }`}
          >
            Peringkat
          </button>
          <button
            onClick={() => { sound.playSelect(); onSelectTab('history'); }}
            className={`transition-colors whitespace-nowrap cursor-pointer hover:text-[#DBEE00] ${
              activeTab === 'history' ? 'text-[#DBEE00] font-bold border-b-2 border-[#DBEE00] pb-1' : ''
            }`}
          >
            Riwayat
          </button>
          {currentUser.role === 'lecturer' && (
            <button
              onClick={() => { sound.playSelect(); onSelectTab('lecturer'); }}
              className={`transition-colors whitespace-nowrap cursor-pointer hover:text-[#DBEE00] ${
                activeTab === 'lecturer' ? 'text-[#DBEE00] font-bold border-b-2 border-[#DBEE00] pb-1' : ''
              }`}
            >
              Studio Dosen
            </button>
          )}
        </nav>

        {/* Zone 3: Primary Action & User Session */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleSound}
            aria-label={muted ? 'Aktifkan Suara' : 'Bisukan Suara'}
            className="w-8 h-8 rounded-lg bg-[#142e52] border border-[#2b558c] flex items-center justify-center text-[#F5F7FA] hover:text-[#DBEE00] hover:border-[#DBEE00]/50 transition-colors cursor-pointer"
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#DBEE00]" />}
          </button>

          {/* Points Pill */}
          <div className="hidden sm:flex items-center gap-1.5 bg-[#142e52] border border-[#2b558c] px-3 py-1 rounded-lg text-xs font-mono tabular-nums text-[#F5F7FA]">
            <span className="text-[#DBEE00] font-bold">{totalPoints}</span>
            <span className="text-white/70 text-[10px]">POIN</span>
          </div>

          {/* Switch Role / User profile */}
          <button
            onClick={onSwitchUser}
            title={`Masuk sebagai: ${currentUser.role === 'student' ? 'Ganti ke Akun Dosen' : 'Ganti ke Akun Mahasiswa'}`}
            className="flex items-center gap-2 bg-[#142e52] hover:bg-[#1a3d6d] border border-[#2b558c] hover:border-[#DBEE00]/50 px-3 py-1.5 rounded-lg text-xs text-[#F5F7FA] transition-all cursor-pointer whitespace-nowrap"
          >
            <UserCheck className="w-3.5 h-3.5 text-[#DBEE00]" />
            <span className="font-semibold max-w-[120px] truncate">{currentUser.name}</span>
            <span className="text-[10px] text-white/70 hidden lg:inline">
              ({currentUser.role === 'student' ? 'Mhs' : 'Dosen'})
            </span>
          </button>
        </div>
      </div>

      {/* Mobile nav links */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 border-t border-[#2b558c] bg-[#122847] text-xs font-semibold">
        <button
          onClick={() => onSelectTab('packs')}
          className={`py-1 px-2 cursor-pointer ${activeTab === 'packs' ? 'text-[#DBEE00] font-bold' : 'text-[#F5F7FA]'}`}
        >
          Packs
        </button>
        <button
          onClick={() => onSelectTab('questdex')}
          className={`py-1 px-2 cursor-pointer ${activeTab === 'questdex' ? 'text-[#DBEE00] font-bold' : 'text-[#F5F7FA]'}`}
        >
          QuestDex ({totalCards})
        </button>
        <button
          onClick={() => onSelectTab('leaderboard')}
          className={`py-1 px-2 cursor-pointer ${activeTab === 'leaderboard' ? 'text-[#DBEE00] font-bold' : 'text-[#F5F7FA]'}`}
        >
          Peringkat
        </button>
        <button
          onClick={() => onSelectTab('history')}
          className={`py-1 px-2 cursor-pointer ${activeTab === 'history' ? 'text-[#DBEE00] font-bold' : 'text-[#F5F7FA]'}`}
        >
          Riwayat
        </button>
        {currentUser.role === 'lecturer' && (
          <button
            onClick={() => onSelectTab('lecturer')}
            className={`py-1 px-2 cursor-pointer ${activeTab === 'lecturer' ? 'text-[#DBEE00] font-bold' : 'text-[#F5F7FA]'}`}
          >
            Dosen
          </button>
        )}
      </div>
    </header>
  );
};
