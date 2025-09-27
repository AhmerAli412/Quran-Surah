import { useState, useEffect } from 'react';
import { Surah, SurahData, Language } from '@/types';
import { quranService } from '@/services';

export const useSurahList = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        setLoading(true);
        const data = await quranService.getSurahList();
        setSurahs(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch surahs');
      } finally {
        setLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      const data = await quranService.getSurahList();
      setSurahs(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch surahs');
    } finally {
      setLoading(false);
    }
  };

  return { surahs, loading, error, refetch };
};

export const useSurah = (surahNumber: number, language: Language) => {
  const [surahData, setSurahData] = useState<SurahData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        setLoading(true);
        const data = await quranService.getSurah(surahNumber, language);
        setSurahData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch surah');
      } finally {
        setLoading(false);
      }
    };

    if (surahNumber && language) {
      fetchSurah();
    }
  }, [surahNumber, language]);

  const refetch = async () => {
    try {
      setLoading(true);
      const data = await quranService.getSurah(surahNumber, language);
      setSurahData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch surah');
    } finally {
      setLoading(false);
    }
  };

  return { surahData, loading, error, refetch };
};

export const useSurahSearch = (query: string) => {
  const [results, setResults] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchSurahs = async () => {
      if (!query || query.length < 2) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        const data = await quranService.searchSurahs(query);
        setResults(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed');
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(searchSurahs, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return { results, loading, error };
};
