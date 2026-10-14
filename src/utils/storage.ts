import {
  QuestPack,
  CollectedCard,
  User,
  QuizAttempt,
  LeaderboardEntry,
} from "../types";
import {
  INITIAL_PACKS,
  INITIAL_COLLECTED_CARDS,
  INITIAL_LEADERBOARD,
  DEMO_STUDENT,
  GROUP_303_ARTWORK_URL,
} from "../data/initialPacks";

const STORAGE_KEYS = {
  USER: "questpack_active_user",
  PACKS: "questpack_packs_v1",
  CARDS_PREFIX: "questpack_cards_",
  ATTEMPTS_PREFIX: "questpack_attempts_",
  LEADERBOARD: "questpack_leaderboard",
};

export const getStoredUser = (): User => {
  if (typeof window === "undefined") return DEMO_STUDENT;
  const raw = localStorage.getItem(STORAGE_KEYS.USER);
  if (!raw) return DEMO_STUDENT;
  try {
    return JSON.parse(raw);
  } catch {
    return DEMO_STUDENT;
  }
};

export const saveStoredUser = (user: User) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const getStoredPacks = (): QuestPack[] => {
  if (typeof window === "undefined") return INITIAL_PACKS;
  const raw = localStorage.getItem(STORAGE_KEYS.PACKS);
  if (!raw) {
    localStorage.setItem(STORAGE_KEYS.PACKS, JSON.stringify(INITIAL_PACKS));
    return INITIAL_PACKS;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return INITIAL_PACKS;
  }
};

export const saveStoredPacks = (packs: QuestPack[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.PACKS, JSON.stringify(packs));
};

export const getStoredCards = (userId: string): CollectedCard[] => {
  if (typeof window === "undefined") return INITIAL_COLLECTED_CARDS;
  const key = `${STORAGE_KEYS.CARDS_PREFIX}${userId}`;
  const raw = localStorage.getItem(key);
  if (!raw) {
    if (userId === DEMO_STUDENT.id) {
      localStorage.setItem(key, JSON.stringify(INITIAL_COLLECTED_CARDS));
      return INITIAL_COLLECTED_CARDS;
    }
    return [];
  }
  try {
    const storedCards = JSON.parse(raw) as CollectedCard[];
    const cards = storedCards.map((card) =>
      card.artworkUrl === "/src/assets/images/Group 303.png" ||
      card.artworkUrl === "/src/assets/images/group_303_card.svg"
        ? { ...card, artworkUrl: GROUP_303_ARTWORK_URL }
        : card,
    );
    if (cards.some((card, index) => card !== storedCards[index])) {
      localStorage.setItem(key, JSON.stringify(cards));
    }
    return cards;
  } catch {
    return [];
  }
};

export const saveStoredCards = (userId: string, cards: CollectedCard[]) => {
  if (typeof window === "undefined") return;
  const key = `${STORAGE_KEYS.CARDS_PREFIX}${userId}`;
  localStorage.setItem(key, JSON.stringify(cards));
};

export const getStoredAttempts = (userId: string): QuizAttempt[] => {
  if (typeof window === "undefined") return [];
  const key = `${STORAGE_KEYS.ATTEMPTS_PREFIX}${userId}`;
  const raw = localStorage.getItem(key);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const saveStoredAttempt = (attempt: QuizAttempt) => {
  if (typeof window === "undefined") return;
  const key = `${STORAGE_KEYS.ATTEMPTS_PREFIX}${attempt.userId}`;
  const current = getStoredAttempts(attempt.userId);
  current.unshift(attempt);
  localStorage.setItem(key, JSON.stringify(current));
};

export const getStoredLeaderboard = (): LeaderboardEntry[] => {
  if (typeof window === "undefined") return INITIAL_LEADERBOARD;
  const raw = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
  if (!raw) {
    localStorage.setItem(
      STORAGE_KEYS.LEADERBOARD,
      JSON.stringify(INITIAL_LEADERBOARD),
    );
    return INITIAL_LEADERBOARD;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return INITIAL_LEADERBOARD;
  }
};

export const updateLeaderboardWithUserPoints = (
  user: User,
  additionalPoints: number,
  isNewCard: boolean,
  isLegendary: boolean,
) => {
  if (typeof window === "undefined") return;
  const board = getStoredLeaderboard();
  const existingIdx = board.findIndex((b) => b.userId === user.id);
  if (existingIdx >= 0) {
    board[existingIdx].totalPoints += additionalPoints;
    if (isNewCard) {
      board[existingIdx].cardsCollected += 1;
    }
    if (isLegendary) {
      board[existingIdx].legendaryCount += 1;
    }
  } else {
    board.push({
      userId: user.id,
      userName: `${user.name} (Anda)`,
      className: user.className,
      totalPoints: additionalPoints,
      cardsCollected: isNewCard ? 1 : 0,
      legendaryCount: isLegendary ? 1 : 0,
    });
  }
  board.sort((a, b) => b.totalPoints - a.totalPoints);
  localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(board));
};
