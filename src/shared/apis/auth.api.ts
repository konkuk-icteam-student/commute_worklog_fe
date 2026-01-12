import apiClient from './apiClient';
import type {
  ApiResponse,
  SendVerificationCodeRequest,
  VerifyCodeRequest,
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '../types/auth.types';
import { saveLoginInfo, clearTokens } from '../utils/tokenManager';

/**
 * 인증번호 발송
 * @param data 이메일 정보
 * @returns API 응답
 */
export const sendVerificationCode = async (
  data: SendVerificationCodeRequest
): Promise<ApiResponse<null>> => {
  const response = await apiClient.post<ApiResponse<null>>(
    '/api/v1/auth/send-verification-code',
    data
  );
  return response.data;
};

/**
 * 인증번호 검증
 * @param data 이메일과 인증번호
 * @returns API 응답
 */
export const verifyCode = async (data: VerifyCodeRequest): Promise<ApiResponse<null>> => {
  const response = await apiClient.post<ApiResponse<null>>('/api/v1/auth/verify-code', data);
  return response.data;
};

/**
 * 회원가입
 * @param data 회원가입 정보
 * @returns API 응답 (사용자 정보 포함)
 */
export const register = async (
  data: RegisterRequest
): Promise<ApiResponse<RegisterResponse>> => {
  const response = await apiClient.post<ApiResponse<RegisterResponse>>(
    '/api/v1/auth/register',
    data
  );
  return response.data;
};

/**
 * 로그인
 * @param data 로그인 정보 (이메일, 비밀번호)
 * @returns API 응답 (토큰 정보 포함)
 */
export const login = async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
  const response = await apiClient.post<ApiResponse<LoginResponse>>('/api/v1/auth/login', data);

  // 로그인 성공 시 토큰 저장
  if (response.data.isSuccess && response.data.details) {
    const { accessToken, refreshToken, expiresAt } = response.data.details;
    saveLoginInfo(accessToken, refreshToken, expiresAt);
  }

  return response.data;
};

/**
 * 로그아웃
 * @returns API 응답
 */
export const logout = async (): Promise<ApiResponse<null>> => {
  try {
    const response = await apiClient.post<ApiResponse<null>>('/api/v1/auth/logout');

    // 로그아웃 성공 시 로컬 스토리지의 토큰 삭제
    if (response.data.isSuccess) {
      clearTokens();
    }

    return response.data;
  } catch (error) {
    // 에러가 발생해도 로컬 토큰은 삭제
    clearTokens();
    throw error;
  }
};

/**
 * 리프레시 토큰으로 액세스 토큰 갱신
 * @param data 리프레시 토큰
 * @returns API 응답 (새로운 토큰 정보 포함)
 */
export const refreshToken = async (
  data: RefreshTokenRequest
): Promise<ApiResponse<RefreshTokenResponse>> => {
  const response = await apiClient.post<ApiResponse<RefreshTokenResponse>>(
    '/api/v1/auth/refresh-token',
    data
  );

  // 토큰 갱신 성공 시 새 토큰 저장
  if (response.data.isSuccess && response.data.details) {
    const { accessToken, refreshToken, expiresAt } = response.data.details;
    saveLoginInfo(accessToken, refreshToken, expiresAt);
  }

  return response.data;
};
