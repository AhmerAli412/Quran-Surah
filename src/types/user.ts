// User-related types
export interface UserProgress {
  id: string;
  userId: string;
  surahNumber: number;
  language: string;
  currentPage: number;
  totalPages: number;
  lastRead: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserStats {
  id: string;
  userId: string;
  totalSurahsRead: number;
  totalVersesRead: number;
  readingStreak: number;
  lastActivity: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserBookmark {
  id: string;
  userId: string;
  surahNumber: number;
  verseNumber: number;
  language: string;
  createdAt: string;
}

export interface UserNote {
  id: string;
  userId: string;
  surahNumber: number;
  verseNumber: number;
  noteText: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProgressRequest {
  userId: string;
  surahNumber: number;
  language: string;
  currentPage: number;
  totalPages: number;
}

export interface UpdateStatsRequest {
  userId: string;
  totalSurahsRead?: number;
  totalVersesRead?: number;
  readingStreak?: number;
}
