// src/services/api/apiClient.ts
import axios, {
  type AxiosInstance,
  type AxiosError,
  type InternalAxiosRequestConfig
} from 'axios';
import { env } from '../../config/env';
import { logger } from '../../utils/logger';

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: env.tmdbBaseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        config.params = {
          ...config.params,
          api_key: env.tmdbApiKey,
        };

        if (env.isDevelopment) {
          logger.log(`📡 [API] ${config.method?.toUpperCase()} ${config.url}`);
        }

        return config;
      },
      (error) => {
        logger.error('❌ [API] Request error:', error);
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        if (env.isDevelopment) {
          logger.log(`✅ [API] ${response.config.url} - Status: ${response.status}`);
        }
        return response;
      },
      (error: AxiosError) => {
        const status = error.response?.status;
        logger.error(`❌ [API] Error ${status || 'unknown'}:`, error.message);

        if (status === 401) {
          logger.error('🔑 [API] Authentication failed – check your API key');
        } else if (status === 404) {
          logger.warn('🔍 [API] Resource not found');
        } else if (status === 429) {
          logger.warn('⏳ [API] Rate limit exceeded – waiting...');
        }

        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    const response = await this.instance.get<T>(url, { params });
    return response.data;
  }
}

export const apiClient = new ApiClient();