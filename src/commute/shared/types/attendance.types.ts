import type { ApiResponse } from './schedule.types';

// Re-export ApiResponse for convenience
export type { ApiResponse };

/**
 * QR 토큰을 이용한 출퇴근 체크 요청
 */
export interface CheckInOutRequest {
  qrToken: string;
}

/**
 * 체크 타입 코드
 * CT01: 출근
 * CT02: 퇴근
 */
export type CheckTypeCode = 'CT01' | 'CT02';

/**
 * 오늘의 출퇴근 기록 단건
 */
export interface TodayAttendanceHistory {
  attendanceId: number;
  checkTime: string; // ISO 8601: "2026-01-11T08:55:00"
  checkType: CheckTypeCode;
}

/**
 * 오늘의 출퇴근 기록 조회 응답 상세
 */
export interface TodayAttendanceHistoryDetails {
  histories: TodayAttendanceHistory[];
}

// ============================================
// API 응답 타입 별칭 (편의를 위해)
// ============================================

/**
 * 출근 체크 응답
 */
export type CheckInResponse = ApiResponse<null>;

/**
 * 퇴근 체크 응답
 */
export type CheckOutResponse = ApiResponse<null>;

/**
 * 오늘의 출퇴근 기록 조회 응답
 */
export type TodayHistoryResponse = ApiResponse<TodayAttendanceHistoryDetails>;
