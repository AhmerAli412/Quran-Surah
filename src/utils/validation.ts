// Validation utilities
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const isValidSurahNumber = (number: number): boolean => {
  return number >= 1 && number <= 114 && Number.isInteger(number);
};

export const isValidLanguage = (language: string): boolean => {
  const validLanguages = ['quran-uthmani', 'ur.jalandhry', 'en.asad'];
  return validLanguages.includes(language);
};

export const isValidPageNumber = (page: number, totalPages: number): boolean => {
  return page >= 1 && page <= totalPages && Number.isInteger(page);
};

export const isValidUserId = (userId: string): boolean => {
  return Boolean(userId && userId.length > 0 && typeof userId === 'string');
};

export const validateProgressData = (data: {
  userId: string;
  surahNumber: number;
  language: string;
  currentPage: number;
  totalPages: number;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!isValidUserId(data.userId)) {
    errors.push('Invalid user ID');
  }

  if (!isValidSurahNumber(data.surahNumber)) {
    errors.push('Invalid surah number');
  }

  if (!isValidLanguage(data.language)) {
    errors.push('Invalid language');
  }

  if (!isValidPageNumber(data.currentPage, data.totalPages)) {
    errors.push('Invalid page number');
  }

  if (data.totalPages <= 0) {
    errors.push('Total pages must be greater than 0');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

export const validateSearchQuery = (query: string): boolean => {
  return Boolean(query && query.trim().length >= 2);
};
