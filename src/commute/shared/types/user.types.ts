import type { ApiResponse } from './schedule.types';

// Re-export ApiResponse for convenience
export type { ApiResponse };

/**
 * 역할 코드
 * RL01: 학생
 * RL02: 관리자
 */
export type RoleCode = 'RL01' | 'RL02';

/**
 * 내 정보 상세
 */
export interface MyInfoDetails {
  userId: number;
  email: string;
  name: string;
  roleCode: RoleCode;
  organizationName: string;
}

/**
 * 근무 시간 조회 기간 타입
 */
export type PeriodType = 'WEEKLY' | 'MONTHLY';

/**
 * 근무 시간 조회 응답 상세
 */
export interface WorkTimeDetails {
  totalMinutes: number;
  periodType: PeriodType;
}

// ============================================
// API 응답 타입 별칭 (편의를 위해)
// ============================================

/**
 * 내 정보 조회 응답
 */
export type MyInfoResponse = ApiResponse<MyInfoDetails>;

/**
 * 주간 근무 시간 조회 응답
 */
export type WeeklyWorkTimeResponse = ApiResponse<WorkTimeDetails>;

/**
 * 월간 근무 시간 조회 응답
 */
export type MonthlyWorkTimeResponse = ApiResponse<WorkTimeDetails>;
