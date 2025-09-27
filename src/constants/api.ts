// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000
};

// API Endpoints
export const API_ENDPOINTS = {
  HEALTH: '/health',
  PROGRESS: {
    GET: '/api/progress',
    POST: '/api/progress',
    DELETE: '/api/progress'
  },
  STATS: {
    GET: '/api/stats',
    POST: '/api/stats'
  },
  BOOKMARKS: {
    GET: '/api/bookmarks',
    POST: '/api/bookmarks',
    DELETE: '/api/bookmarks'
  },
  NOTES: {
    GET: '/api/notes',
    POST: '/api/notes',
    PUT: '/api/notes',
    DELETE: '/api/notes'
  }
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Internal server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.'
} as const;
