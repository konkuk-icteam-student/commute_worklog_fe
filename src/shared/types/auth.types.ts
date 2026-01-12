/**
 * 공통 API 응답 타입
 */
export interface ApiResponse<T = null> {
  isSuccess: boolean;
  message: string;
  details: T;
}

/**
 * 인증번호 발송 요청
 */
export interface SendVerificationCodeRequest {
  email: string;
}

/**
 * 인증번호 검증 요청
 */
export interface VerifyCodeRequest {
  email: string;
  code: string;
}

/**
 * 회원가입 요청
 */
export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  roleCode: 'RL01' | 'RL02'; // RL01: 학생/사원, RL02: 관리자
  organizationId: number;
}

/**
 * 회원가입 응답
 */
export interface RegisterResponse {
  userId: number;
  email: string;
  name: string;
  roleCode: string;
}

/**
 * 로그인 요청
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * 로그인 응답
 */
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresAt: number;
}

/**
 * 리프레시 토큰 요청
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * 리프레시 토큰 응답
 */
export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresAt: number;
}
