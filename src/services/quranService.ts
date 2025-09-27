import { Surah, SurahData, Language, QuranApiResponse, SurahApiResponse } from '@/types';
import { QURAN_API_BASE_URL } from '@/constants';

class QuranService {
  private baseURL: string;

  constructor() {
    this.baseURL = QURAN_API_BASE_URL;
  }

  async getSurahList(): Promise<Surah[]> {
    try {
      const response = await fetch(`${this.baseURL}/meta`);
      const data: QuranApiResponse = await response.json();
      return data.data.surahs.references;
    } catch (error) {
      console.error('Error fetching surah list:', error);
      throw new Error('Failed to fetch surah list');
    }
  }

  async getSurah(surahNumber: number, language: Language): Promise<SurahData> {
    try {
      const response = await fetch(`${this.baseURL}/surah/${surahNumber}/${language}`);
      const data: SurahApiResponse = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching surah:', error);
      throw new Error(`Failed to fetch Surah ${surahNumber}`);
    }
  }

  async getSurahInfo(surahNumber: number): Promise<Surah> {
    try {
      const surahs = await this.getSurahList();
      const surah = surahs.find(s => s.number === surahNumber);
      if (!surah) {
        throw new Error(`Surah ${surahNumber} not found`);
      }
      return surah;
    } catch (error) {
      console.error('Error fetching surah info:', error);
      throw new Error(`Failed to fetch Surah ${surahNumber} info`);
    }
  }

  async searchSurahs(query: string): Promise<Surah[]> {
    try {
      const surahs = await this.getSurahList();
      const searchQuery = query.toLowerCase();
      
      return surahs.filter(surah => 
        surah.englishName.toLowerCase().includes(searchQuery) ||
        surah.englishNameTranslation.toLowerCase().includes(searchQuery) ||
        surah.name.includes(query) ||
        surah.number.toString().includes(query)
      );
    } catch (error) {
      console.error('Error searching surahs:', error);
      throw new Error('Failed to search surahs');
    }
  }

  getSurahByNumber(surahNumber: number, surahs: Surah[]): Surah | undefined {
    return surahs.find(surah => surah.number === surahNumber);
  }

  getSurahRange(start: number, end: number, surahs: Surah[]): Surah[] {
    return surahs.filter(surah => surah.number >= start && surah.number <= end);
  }

  getMeccanSurahs(surahList: Surah[]): Surah[] {
    return surahList.filter(surah => surah.revelationType === 'Meccan');
  }

  getMedinanSurahs(surahList: Surah[]): Surah[] {
    return surahList.filter(surah => surah.revelationType === 'Medinan');
  }
}

export const quranService = new QuranService();
