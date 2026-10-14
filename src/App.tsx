import React, { useState, useEffect, useRef } from "react";
import {
  QuestPack,
  CollectedCard,
  User,
  QuizAttempt,
  LeaderboardEntry,
  Rarity,
} from "./types";
import {
  getStoredUser,
  saveStoredUser,
  getStoredPacks,
  saveStoredPacks,
  getStoredCards,
  saveStoredCards,
  getStoredAttempts,
  saveStoredAttempt,
  getStoredLeaderboard,
  updateLeaderboardWithUserPoints,
} from "./utils/storage";
import {
  DEMO_STUDENT,
  DEMO_LECTURER,
  calculateRarityAndPoints,
} from "./data/initialPacks";
import { Navbar } from "./components/Navbar";
import { PackCarousel } from "./components/PackCarousel";
import { SealedCardReveal } from "./components/SealedCardReveal";
import { QuestionCardPanel } from "./components/QuestionCardPanel";
import { PackCompletionReveal } from "./components/PackCompletionReveal";
import { QuestDexModal } from "./components/QuestDexModal";
import { LeaderboardModal } from "./components/LeaderboardModal";
import { HistoryModal } from "./components/HistoryModal";
import { LecturerPackStudio } from "./components/LecturerPackStudio";
import { sound } from "./utils/audio";
import { LockKeyhole } from "lucide-react";

type ActiveScreen =
  | "CAROUSEL"
  | "SEALED_REVEAL"
  | "QUESTION_PANEL"
  | "COMPLETION_REVEAL";

export default function App() {
  // Current user state
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const storedUser = getStoredUser();
    return storedUser.role === "lecturer" ? DEMO_STUDENT : storedUser;
  });
  const [packs, setPacks] = useState<QuestPack[]>(() => getStoredPacks());
  const [collectedCards, setCollectedCards] = useState<CollectedCard[]>(() =>
    getStoredCards(currentUser.id),
  );
  const [attempts, setAttempts] = useState<QuizAttempt[]>(() =>
    getStoredAttempts(currentUser.id),
  );
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() =>
    getStoredLeaderboard(),
  );

  // Screen state machine
  const [currentScreen, setCurrentScreen] = useState<ActiveScreen>("CAROUSEL");
  const [activePack, setActivePack] = useState<QuestPack | null>(null);

  // Active quiz state
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(
    20 * 60,
  ); // 20 minutes default
  const [quizStartTime, setQuizStartTime] = useState<number>(0);

  // Evaluation & Reward state for Screen D
  const [quizResult, setQuizResult] = useState<{
    score: number;
    maxScore: number;
    rarity: Rarity;
    points: number;
    rewardCard: CollectedCard;
  } | null>(null);

  // Modals state
  const [isQuestDexOpen, setIsQuestDexOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isLecturerStudioOpen, setIsLecturerStudioOpen] = useState(false);
  const [isLecturerCodeOpen, setIsLecturerCodeOpen] = useState(false);
  const [lecturerCode, setLecturerCode] = useState("");
  const [lecturerCodeError, setLecturerCodeError] = useState("");

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<
    "packs" | "questdex" | "leaderboard" | "history" | "lecturer"
  >("packs");

  // Sync cards & attempts when user changes
  useEffect(() => {
    saveStoredUser(currentUser);
    setCollectedCards(getStoredCards(currentUser.id));
    setAttempts(getStoredAttempts(currentUser.id));
    setLeaderboard(getStoredLeaderboard());
  }, [currentUser.id]);

  // Total points calculated from collected cards & quiz attempts
  const totalPoints = collectedCards.reduce((acc, c) => acc + c.points, 0);

  // 20-minute timer loop during active quiz (Screens B & C)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (
      (currentScreen === "SEALED_REVEAL" ||
        currentScreen === "QUESTION_PANEL") &&
      timeRemainingSeconds > 0
    ) {
      interval = setInterval(() => {
        setTimeRemainingSeconds((prev) => {
          if (prev <= 1) {
            // Time expired: auto-submit quiz
            handleFinalSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentScreen, timeRemainingSeconds]);

  // Switch user role (Student <-> Lecturer)
  const handleSwitchUser = () => {
    sound.playSelect();
    if (currentUser.role === "student") {
      setLecturerCode("");
      setLecturerCodeError("");
      setIsLecturerCodeOpen(true);
    } else {
      setCurrentUser(DEMO_STUDENT);
      setIsLecturerStudioOpen(false);
      setActiveTab("packs");
    }
  };

  const handleLecturerCodeSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const expectedCode = import.meta.env.VITE_LECTURER_ACCESS_CODE?.trim();

    if (!expectedCode) {
      setLecturerCodeError(
        "Kode akses belum dikonfigurasi. Atur VITE_LECTURER_ACCESS_CODE di .env.local.",
      );
      return;
    }

    if (lecturerCode !== expectedCode) {
      setLecturerCodeError("Kode akses tidak sesuai.");
      return;
    }

    setCurrentUser(DEMO_LECTURER);
    setIsLecturerStudioOpen(true);
    setActiveTab("lecturer");
    setIsLecturerCodeOpen(false);
    setLecturerCode("");
    setLecturerCodeError("");
  };

  // Nav selection
  const handleSelectTab = (
    tab: "packs" | "questdex" | "leaderboard" | "history" | "lecturer",
  ) => {
    setActiveTab(tab);
    if (tab === "packs") {
      setIsQuestDexOpen(false);
      setIsLeaderboardOpen(false);
      setIsHistoryOpen(false);
      setIsLecturerStudioOpen(false);
      if (currentScreen !== "CAROUSEL") {
        // Confirm if leaving active quiz
        if (currentScreen === "QUESTION_PANEL") {
          const leave = window.confirm(
            "Kembali ke katalog pack? Jawaban yang belum dikirim akan dibatalkan.",
          );
          if (!leave) return;
        }
        setCurrentScreen("CAROUSEL");
      }
    } else if (tab === "questdex") {
      setIsQuestDexOpen(true);
    } else if (tab === "leaderboard") {
      setIsLeaderboardOpen(true);
    } else if (tab === "history") {
      setIsHistoryOpen(true);
    } else if (tab === "lecturer") {
      setIsLecturerStudioOpen(true);
    }
  };

  // Start Pack (Transition from Screen A to Screen B)
  const handleOpenPack = (pack: QuestPack) => {
    setActivePack(pack);
    setUserAnswers({});
    setTimeRemainingSeconds(pack.timeLimitMinutes * 60);
    setQuizStartTime(Date.now());
    setCurrentScreen("SEALED_REVEAL");
  };

  // Screen B -> Screen C (Sealed card flipped)
  const handleCardFlipped = () => {
    setCurrentScreen("QUESTION_PANEL");
  };

  // Answer change handler
  const handleAnswerChange = (cardIndex: number, answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [cardIndex]: answer,
    }));
  };

  // Screen C -> Screen D (Submit Pack & Calculate Rarity)
  const handleFinalSubmit = () => {
    if (!activePack) return;

    sound.playRewardFanfare("EPIC");

    // Automatic grading calculation
    let calculatedScore = 0;
    activePack.questions.forEach((q) => {
      const userAnswer = (userAnswers[q.cardIndex] || "").trim().toLowerCase();
      const correctAnswer = q.correctAnswer.trim().toLowerCase();

      if (userAnswer === correctAnswer) {
        calculatedScore += 1;
      }
    });

    // Exact rarity and points thresholds
    const { rarity, points } = calculateRarityAndPoints(calculatedScore);

    // Dynamic thematic Card Title based on pack & score
    const cardTitle =
      calculatedScore >= 9
        ? `${activePack.topic.split("&")[0].trim()} Master`
        : calculatedScore >= 7
          ? `${activePack.topic.split("&")[0].trim()} Explorer`
          : calculatedScore >= 5
            ? `${activePack.topic.split("&")[0].trim()} Novice`
            : `${activePack.topic.split("&")[0].trim()} Apprentice`;

    const nowFormatted = new Date()
      .toISOString()
      .replace("T", " ")
      .substring(0, 16);

    const newRewardCard: CollectedCard = {
      id: `card-${Date.now()}`,
      packId: activePack.id,
      packTitle: activePack.title,
      course: activePack.course,
      meetingNumber: activePack.meetingNumber,
      score: calculatedScore,
      maxScore: activePack.cardCount,
      rarity,
      points,
      collectedAt: nowFormatted,
      cardTitle,
      artworkUrl: activePack.coverImage,
    };

    const timeSpent = Math.max(
      1,
      Math.round((Date.now() - quizStartTime) / 1000),
    );

    const newAttempt: QuizAttempt = {
      id: `att-${Date.now()}`,
      userId: currentUser.id,
      packId: activePack.id,
      packTitle: activePack.title,
      answers: userAnswers,
      score: calculatedScore,
      points,
      rarity,
      completedAt: nowFormatted,
      timeSpentSeconds: timeSpent,
    };

    // Save to persistence
    const updatedCards = [newRewardCard, ...collectedCards];
    setCollectedCards(updatedCards);
    saveStoredCards(currentUser.id, updatedCards);

    const updatedAttempts = [newAttempt, ...attempts];
    setAttempts(updatedAttempts);
    saveStoredAttempt(newAttempt);

    updateLeaderboardWithUserPoints(
      currentUser,
      points,
      true,
      rarity === "LEGENDARY",
    );
    setLeaderboard(getStoredLeaderboard());

    setQuizResult({
      score: calculatedScore,
      maxScore: activePack.cardCount,
      rarity,
      points,
      rewardCard: newRewardCard,
    });

    setCurrentScreen("COMPLETION_REVEAL");
  };

  // Lecturer save pack
  const handleSaveLecturerPack = (savedPack: QuestPack) => {
    const existingIdx = packs.findIndex((p) => p.id === savedPack.id);
    let nextPacks: QuestPack[];
    if (existingIdx >= 0) {
      nextPacks = [...packs];
      nextPacks[existingIdx] = savedPack;
    } else {
      nextPacks = [savedPack, ...packs];
    }
    setPacks(nextPacks);
    saveStoredPacks(nextPacks);
  };

  return (
    <div className="min-h-screen bg-[#1D3F6D] text-[#F5F7FA] font-['Plus_Jakarta_Sans',sans-serif] flex flex-col justify-between selection:bg-[#DBEE00]/30 selection:text-[#DBEE00]">
      {/* 3-Zone Top Navigation Bar */}
      <Navbar
        currentUser={currentUser}
        onSwitchUser={handleSwitchUser}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        totalPoints={totalPoints}
        totalCards={collectedCards.length}
      />

      {isLecturerCodeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <form
            onSubmit={handleLecturerCodeSubmit}
            className="w-full max-w-sm rounded-2xl border border-[#2b558c] bg-[#142e52] p-6 shadow-2xl"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DBEE00]/15 text-[#DBEE00]">
                <LockKeyhole className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg font-black text-white">Akses Dosen</h2>
                <p className="text-xs text-white/70">
                  Masukkan kode akses untuk melanjutkan.
                </p>
              </div>
            </div>

            <label
              htmlFor="lecturer-access-code"
              className="mb-1.5 block text-xs font-bold text-white/80"
            >
              Kode akses
            </label>
            <input
              id="lecturer-access-code"
              type="password"
              autoComplete="current-password"
              autoFocus
              value={lecturerCode}
              onChange={(event) => {
                setLecturerCode(event.target.value);
                setLecturerCodeError("");
              }}
              className="w-full rounded-lg border border-[#2b558c] bg-[#1D3F6D] px-3 py-2.5 text-sm text-white outline-none focus:border-[#DBEE00]"
              placeholder="Masukkan kode"
            />
            {lecturerCodeError && (
              <p
                role="alert"
                className="mt-2 text-xs font-semibold text-rose-300"
              >
                {lecturerCodeError}
              </p>
            )}

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsLecturerCodeOpen(false)}
                className="rounded-lg border border-[#2b558c] px-4 py-2 text-xs font-bold text-white/80 transition-colors hover:border-white/50 hover:text-white"
              >
                Batal
              </button>
              <button
                type="submit"
                className="rounded-lg bg-[#DBEE00] px-4 py-2 text-xs font-black text-[#142e52] transition-colors hover:bg-[#c8d800]"
              >
                Verifikasi
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col justify-center">
        {isLecturerStudioOpen ? (
          /* SCREEN 9: Lecturer Pack Studio & Live Preview */
          <LecturerPackStudio
            packs={packs}
            onSavePack={handleSaveLecturerPack}
            onClose={() => {
              setIsLecturerStudioOpen(false);
              setActiveTab("packs");
            }}
          />
        ) : currentScreen === "CAROUSEL" ? (
          /* SCREEN A: 3D Pack Carousel */
          <PackCarousel
            packs={packs}
            currentUser={currentUser}
            collectedCards={collectedCards}
            onOpenPack={handleOpenPack}
            onOpenQuestDex={() => setIsQuestDexOpen(true)}
          />
        ) : currentScreen === "SEALED_REVEAL" && activePack ? (
          /* SCREEN B: Sealed Card / Tap to Reveal */
          <SealedCardReveal
            pack={activePack}
            timeRemainingSeconds={timeRemainingSeconds}
            onCardFlipped={handleCardFlipped}
          />
        ) : currentScreen === "QUESTION_PANEL" && activePack ? (
          /* SCREEN C: Question Card with Answer Panel */
          <QuestionCardPanel
            pack={activePack}
            timeRemainingSeconds={timeRemainingSeconds}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            onSubmitPack={handleFinalSubmit}
          />
        ) : currentScreen === "COMPLETION_REVEAL" &&
          activePack &&
          quizResult ? (
          /* SCREEN D: Pack Completion & Reward Card Reveal */
          <PackCompletionReveal
            pack={activePack}
            score={quizResult.score}
            maxScore={quizResult.maxScore}
            rarity={quizResult.rarity}
            points={quizResult.points}
            rewardCard={quizResult.rewardCard}
            onViewCollection={() => {
              setIsQuestDexOpen(true);
            }}
            onFinish={() => {
              setCurrentScreen("CAROUSEL");
              setActiveTab("packs");
            }}
          />
        ) : null}
      </main>

      {/* SCREEN E & SCREEN 7 & 8: QuestDex Modal & Progress Footer */}
      <QuestDexModal
        isOpen={isQuestDexOpen}
        onClose={() => setIsQuestDexOpen(false)}
        collectedCards={collectedCards}
        packs={packs}
        totalPoints={totalPoints}
      />

      {/* Leaderboard Modal */}
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        entries={leaderboard}
        currentUserId={currentUser.id}
      />

      {/* Quiz History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        attempts={attempts}
      />

      {/* Clean Footer */}
      <footer className="border-t border-[#2b558c] bg-[#142e52] py-3.5 px-4 text-center text-xs text-white/70">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-semibold">
            QuestPack University Edition · Kurikulum Pemrograman Web & Basis
            Data
          </span>
          <span className="font-mono text-[11px] text-[#DBEE00] font-bold">
            Sesi Kelas: {currentUser.className}
          </span>
        </div>
      </footer>
    </div>
  );
}
