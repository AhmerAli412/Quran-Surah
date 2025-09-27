import { useState, useEffect, useCallback } from 'react';
import { UserProgress, UserStats, CreateProgressRequest } from '@/types';
import { userService } from '@/services';
import { progressStorage } from '@/utils';

export const useProgress = (userId: string) => {
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProgress = useCallback(async () => {
    try {
      setLoading(true);
      const data = await userService.getUserProgress(userId);
      setProgress(data);
      setError(null);
    } catch (err) {
      // Fallback to local storage
      const localProgress = userService.getProgressLocally(userId);
      setProgress(localProgress);
      setError(err instanceof Error ? err.message : 'Failed to fetch progress');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchProgress();
    }
  }, [userId, fetchProgress]);

  const saveProgress = useCallback(async (progressData: CreateProgressRequest) => {
    try {
      const savedProgress = await userService.saveProgress(progressData);
      
      // Update local state
      setProgress(prev => {
        const filtered = prev.filter(p => 
          !(p.surahNumber === progressData.surahNumber && p.language === progressData.language)
        );
        return [...filtered, savedProgress];
      });

      // Also save locally as backup
      userService.saveProgressLocally(savedProgress);
      
      return savedProgress;
    } catch (err) {
      // Fallback to local storage
      const localProgress: UserProgress = {
        id: `local_${Date.now()}`,
        userId: progressData.userId,
        surahNumber: progressData.surahNumber,
        language: progressData.language,
        currentPage: progressData.currentPage,
        totalPages: progressData.totalPages,
        lastRead: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      userService.saveProgressLocally(localProgress);
      setProgress(prev => {
        const filtered = prev.filter(p => 
          !(p.surahNumber === progressData.surahNumber && p.language === progressData.language)
        );
        return [...filtered, localProgress];
      });
      
      return localProgress;
    }
  }, []);

  const deleteProgress = useCallback(async (surahNumber: number, language: string) => {
    try {
      await userService.deleteProgress(userId, surahNumber, language);
      
      setProgress(prev => 
        prev.filter(p => !(p.surahNumber === surahNumber && p.language === language))
      );
    } catch (err) {
      // Fallback to local storage
      userService.clearProgressLocally(userId);
      setProgress([]);
    }
  }, [userId]);

  const getProgress = useCallback((surahNumber: number, language: string) => {
    return progress.find(p => p.surahNumber === surahNumber && p.language === language);
  }, [progress]);

  const getProgressPercentage = useCallback((surahNumber: number, language: string) => {
    const p = getProgress(surahNumber, language);
    if (!p) return 0;
    return userService.calculateProgressPercentage(p.currentPage, p.totalPages);
  }, [getProgress]);

  return {
    progress,
    loading,
    error,
    saveProgress,
    deleteProgress,
    getProgress,
    getProgressPercentage,
    refetch: fetchProgress
  };
};

export const useStats = (userId: string) => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const data = await userService.getUserStats(userId);
      setStats(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchStats();
    }
  }, [userId, fetchStats]);

  const updateStats = useCallback(async (statsData: Partial<UserStats>) => {
    try {
      const updatedStats = await userService.updateStats({
        userId,
        ...statsData
      });
      setStats(updatedStats);
      return updatedStats;
    } catch (err) {
      throw err;
    }
  }, [userId]);

  return {
    stats,
    loading,
    error,
    updateStats,
    refetch: fetchStats
  };
};
