/**
 * 토큰 관리 유틸리티
 * - localStorage를 사용하여 토큰을 저장/조회/삭제
 */

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const TOKEN_EXPIRES_AT_KEY = 'tokenExpiresAt';

/**
 * 액세스 토큰 저장
 */
export const setAccessToken = (token: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

/**
 * 액세스 토큰 조회
 */
export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

/**
 * 리프레시 토큰 저장
 */
export const setRefreshToken = (token: string): void => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

/**
 * 리프레시 토큰 조회
 */
export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * 토큰 만료 시간 저장
 */
export const setTokenExpiresAt = (expiresAt: number): void => {
  localStorage.setItem(TOKEN_EXPIRES_AT_KEY, expiresAt.toString());
};

/**
 * 토큰 만료 시간 조회
 */
export const getTokenExpiresAt = (): number | null => {
  const expiresAt = localStorage.getItem(TOKEN_EXPIRES_AT_KEY);
  return expiresAt ? parseInt(expiresAt, 10) : null;
};

/**
 * 토큰이 만료되었는지 확인
 */
export const isTokenExpired = (): boolean => {
  const expiresAt = getTokenExpiresAt();
  if (!expiresAt) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime >= expiresAt;
};

/**
 * 모든 토큰 삭제 (로그아웃 시 사용)
 */
export const clearTokens = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRES_AT_KEY);
};

/**
 * 로그인 정보 저장
 */
export const saveLoginInfo = (
  accessToken: string,
  refreshToken: string,
  expiresAt: number
): void => {
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
  setTokenExpiresAt(expiresAt);
};

/**
 * 로그인 여부 확인
 */
export const isLoggedIn = (): boolean => {
  const accessToken = getAccessToken();
  return !!accessToken && !isTokenExpired();
};
