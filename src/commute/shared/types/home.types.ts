import type { ApiResponse } from './schedule.types';

// Re-export ApiResponse for convenience
export type { ApiResponse };

/**
 * 출퇴근 버튼 상태
 */
export type AttendanceStatusType =
  | 'CHECK_IN_AVAILABLE'   // 출근 가능
  | 'CHECK_OUT_AVAILABLE'  // 퇴근 가능
  | 'COMPLETED';           // 금일 출퇴근 완료

/**
 * 오늘의 근무 시간 및 예정 스케줄 수 조회 응답 상세
 */
export interface TodayWorkTimeDetails {
  totalMinutes: number;
  scheduleCount: number;
}

/**
 * 현재 출퇴근 버튼 상태 조회 응답 상세
 */
export interface AttendanceStatusDetails {
  status: AttendanceStatusType;
  lastCheckTime: string | null; // ISO 8601 또는 null
}

// ============================================
// API 응답 타입 별칭 (편의를 위해)
// ============================================

/**
 * 오늘의 근무 시간 조회 응답
 */
export type TodayWorkTimeResponse = ApiResponse<TodayWorkTimeDetails>;

/**
 * 출퇴근 상태 조회 응답
 */
export type AttendanceStatusResponse = ApiResponse<AttendanceStatusDetails>;
