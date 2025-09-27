// Quran-related types
export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
}

export interface Ayah {
  numberInSurah: number;
  numberInQuran: number;
  text: string;
  juz: number;
  manzil: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

export interface SurahData {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: 'Meccan' | 'Medinan';
  numberOfAyahs: number;
  ayahs: Ayah[];
  edition: {
    identifier: string;
    language: string;
    name: string;
    englishName: string;
    format: string;
    type: string;
    direction: string;
  };
}

export interface QuranApiResponse {
  code: number;
  status: string;
  data: {
    surahs: {
      references: Surah[];
    };
  };
}

export interface SurahApiResponse {
  code: number;
  status: string;
  data: SurahData;
}

export type Language = 'quran-uthmani' | 'ur.jalandhry' | 'en.asad';

export interface LanguageOption {
  value: Language;
  label: string;
  flag: string;
}
