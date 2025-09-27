// Storage utilities
export const storage = {
  // Local Storage
  set: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue || null;
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },

  // Session Storage
  setSession: (key: string, value: any): void => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to sessionStorage:', error);
    }
  },

  getSession: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch (error) {
      console.error('Error reading from sessionStorage:', error);
      return defaultValue || null;
    }
  },

  removeSession: (key: string): void => {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from sessionStorage:', error);
    }
  },

  clearSession: (): void => {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
    }
  }
};

// Progress-specific storage utilities
export const progressStorage = {
  getKey: (userId: string, surahNumber: number, language: string): string => {
    return `quran_progress_${userId}_${surahNumber}_${language}`;
  },

  save: (userId: string, surahNumber: number, language: string, data: any): void => {
    const key = progressStorage.getKey(userId, surahNumber, language);
    storage.set(key, data);
  },

  get: (userId: string, surahNumber: number, language: string): any => {
    const key = progressStorage.getKey(userId, surahNumber, language);
    return storage.get(key);
  },

  remove: (userId: string, surahNumber: number, language: string): void => {
    const key = progressStorage.getKey(userId, surahNumber, language);
    storage.remove(key);
  },

  getAll: (userId: string): any[] => {
    const progress: any[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(`quran_progress_${userId}_`)) {
        const data = storage.get(key);
        if (data) {
          progress.push(data);
        }
      }
    }
    return progress;
  },

  clear: (userId: string): void => {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && key.startsWith(`quran_progress_${userId}_`)) {
        storage.remove(key);
      }
    }
  }
};

// Export/Import utilities
export const exportProgress = (userId: string): string => {
  const progress = progressStorage.getAll(userId);
  const exportData = {
    userId,
    progress,
    exportedAt: new Date().toISOString(),
    version: '1.0'
  };
  return JSON.stringify(exportData, null, 2);
};

export const importProgress = (jsonData: string): { success: boolean; error?: string } => {
  try {
    const data = JSON.parse(jsonData);
    if (!data.userId || !data.progress) {
      return { success: false, error: 'Invalid data format' };
    }

    data.progress.forEach((item: any) => {
      progressStorage.save(data.userId, item.surahNumber, item.language, item);
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Invalid JSON format' };
  }
};
