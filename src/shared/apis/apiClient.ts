import axios, { AxiosError } from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, getRefreshToken, clearTokens, saveLoginInfo } from '../utils/tokenManager';

/**
 * API 베이스 URL
 * 개발 환경: 빈 문자열 (Vite 프록시 사용)
 * 프로덕션: VITE_API_BASE_URL 환경변수 사용
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Axios 인스턴스 생성
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 요청 인터셉터
 * - 모든 요청에 Authorization 헤더 자동 추가
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * 리프레시 토큰으로 액세스 토큰 갱신
 */
const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      return null;
    }

    const response = await axios.post('/api/auth/refresh-token', {
      refreshToken,
    });

    if (response.data.isSuccess && response.data.details) {
      const { accessToken, refreshToken: newRefreshToken, expiresAt } = response.data.details;
      saveLoginInfo(accessToken, newRefreshToken, expiresAt);
      return accessToken;
    }

    return null;
  } catch {
    clearTokens();
    return null;
  }
};

/**
 * 응답 인터셉터
 * - 401 에러 시 리프레시 토큰으로 재시도
 */
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

const subscribeTokenRefresh = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // 401 에러이고 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // 이미 토큰 갱신 중인 경우, 대기
        return new Promise((resolve) => {
          subscribeTokenRefresh((token: string) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            resolve(apiClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const newAccessToken = await refreshAccessToken();
      isRefreshing = false;

      if (newAccessToken) {
        onTokenRefreshed(newAccessToken);
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return apiClient(originalRequest);
      } else {
        // 리프레시 토큰도 만료된 경우, 로그인 페이지로 이동
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
