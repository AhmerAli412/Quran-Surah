import { ApiResponse, RequestConfig, ApiError } from '@/types';
import { API_CONFIG, ERROR_MESSAGES } from '@/constants';

class ApiService {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  private async request<T>(
    endpoint: string,
    config: RequestConfig = { method: 'GET' }
  ): Promise<ApiResponse<T>> {
    try {
      const url = new URL(endpoint, this.baseURL);
      
      // Add query parameters
      if (config.params) {
        Object.entries(config.params).forEach(([key, value]) => {
          url.searchParams.append(key, String(value));
        });
      }

      const requestConfig: RequestInit = {
        method: config.method,
        headers: {
          'Content-Type': 'application/json',
          ...config.headers,
        },
        signal: AbortSignal.timeout(this.timeout),
      };

      if (config.body && config.method !== 'GET') {
        requestConfig.body = JSON.stringify(config.body);
      }

      const response = await fetch(url.toString(), requestConfig);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : ERROR_MESSAGES.NETWORK_ERROR,
      };
    }
  }

  async get<T>(endpoint: string, params?: Record<string, string | number>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body: data });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PUT', body: data });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PATCH', body: data });
  }
}

export const apiService = new ApiService();
