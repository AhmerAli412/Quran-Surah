import { UserProgress, UserStats, CreateProgressRequest, UpdateStatsRequest } from '@/types';
import { apiService } from './apiService';
import { API_ENDPOINTS } from '@/constants';

class UserService {
  async getUserProgress(userId: string): Promise<UserProgress[]> {
    const response = await apiService.get<UserProgress[]>(`${API_ENDPOINTS.PROGRESS.GET}/${userId}`);
    return response.data || [];
  }

  async saveProgress(progress: CreateProgressRequest): Promise<UserProgress> {
    const response = await apiService.post<UserProgress>(API_ENDPOINTS.PROGRESS.POST, progress);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to save progress');
    }
    return response.data;
  }

  async deleteProgress(userId: string, surahNumber: number, language: string): Promise<void> {
    const response = await apiService.delete(`${API_ENDPOINTS.PROGRESS.DELETE}/${userId}/${surahNumber}/${language}`);
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete progress');
    }
  }

  async getUserStats(userId: string): Promise<UserStats | null> {
    const response = await apiService.get<UserStats>(`${API_ENDPOINTS.STATS.GET}/${userId}`);
    return response.data || null;
  }

  async updateStats(stats: UpdateStatsRequest): Promise<UserStats> {
    const response = await apiService.post<UserStats>(API_ENDPOINTS.STATS.POST, stats);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to update stats');
    }
    return response.data;
  }

  // Local storage fallback methods
  saveProgressLocally(progress: UserProgress): void {
    const key = `quran_progress_${progress.userId}_${progress.surahNumber}_${progress.language}`;
    localStorage.setItem(key, JSON.stringify(progress));
  }

  getProgressLocally(userId: string): UserProgress[] {
    const progress: UserProgress[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(`quran_progress_${userId}_`)) {
        const data = localStorage.getItem(key);
        if (data) {
          progress.push(JSON.parse(data));
        }
      }
    }
    return progress;
  }

  clearProgressLocally(userId: string): void {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && key.startsWith(`quran_progress_${userId}_`)) {
        localStorage.removeItem(key);
      }
    }
  }

  // Progress calculation utilities
  calculateProgressPercentage(currentPage: number, totalPages: number): number {
    if (totalPages === 0) return 0;
    return Math.round((currentPage / totalPages) * 100);
  }

  getReadingStreak(progress: UserProgress[]): number {
    if (progress.length === 0) return 0;
    
    const sortedProgress = progress
      .sort((a, b) => new Date(b.lastRead).getTime() - new Date(a.lastRead).getTime());
    
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (const p of sortedProgress) {
      const lastRead = new Date(p.lastRead);
      lastRead.setHours(0, 0, 0, 0);
      
      const diffTime = today.getTime() - lastRead.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === streak) {
        streak++;
        today.setDate(today.getDate() - 1);
      } else {
        break;
      }
    }
    
    return streak;
  }

  getTotalVersesRead(progress: UserProgress[]): number {
    return progress.reduce((total, p) => {
      const versesRead = Math.min(p.currentPage * 10, p.totalPages * 10); // Assuming 10 verses per page
      return total + versesRead;
    }, 0);
  }
}

export const userService = new UserService();
