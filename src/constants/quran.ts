import { LanguageOption } from '@/types';

// Quran API Configuration
export const QURAN_API_BASE_URL = 'https://api.alquran.cloud/v1';

// Language Options
export const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    value: 'quran-uthmani',
    label: 'Arabic',
    flag: '🇸🇦'
  },
  {
    value: 'ur.jalandhry',
    label: 'Urdu',
    flag: '🇵🇰'
  },
  {
    value: 'en.asad',
    label: 'English',
    flag: '🇺🇸'
  }
];

// Pagination
export const VERSES_PER_PAGE = 10;
export const MAX_PAGES_DISPLAY = 10;

// Reading Progress
export const PROGRESS_STORAGE_KEY = 'quran_progress';
export const STATS_STORAGE_KEY = 'quran_stats';

// Surah Information
export const TOTAL_SURAHS = 114;
export const TOTAL_VERSES = 6236;

// Reading Streaks
export const STREAK_MILESTONES = [7, 30, 100, 365];

// Bookmark Categories
export const BOOKMARK_CATEGORIES = [
  'favorite',
  'memorization',
  'reflection',
  'study'
] as const;

export type BookmarkCategory = typeof BOOKMARK_CATEGORIES[number];
