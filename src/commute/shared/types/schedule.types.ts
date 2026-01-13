/**
 * 공통 API 응답 타입 (재사용)
 */
export interface ApiResponse<T = null> {
  isSuccess: boolean;
  message: string;
  details: T;
}

/**
 * 시간 슬롯 (ISO 8601 형식)
 */
export interface TimeSlot {
  start: string; // "2026-01-11T09:00:00"
  end: string; // "2026-01-11T12:00:00"
}

/**
 * 근무 일정 신청 요청
 */
export interface ApplyWorkScheduleRequest {
  slots: TimeSlot[];
}

/**
 * 근무 일정 신청 응답 상세
 */
export interface ApplyWorkScheduleDetails {
  success: TimeSlot[];
  fail: TimeSlot[];
}

/**
 * 근무 일정 수정 요청
 */
export interface ModifyWorkScheduleRequest {
  cancelScheduleIds: number[];
  applySlots: TimeSlot[];
  reason: string;
}

/**
 * 근무 일정 단건
 */
export interface WorkSchedule {
  scheduleId: number;
  scheduleDate: string; // "2026-01-11"
  startTime: string; // "09:00:00"
  endTime: string; // "18:00:00"
  statusCode: string; // "WS02" 등
}

/**
 * 근무 일정 목록 조회 응답 상세
 */
export interface WorkScheduleListDetails {
  workSchedules: WorkSchedule[];
}

/**
 * 근무 이력 단건
 */
export interface WorkHistory {
  scheduleId: number;
  date: string; // "2026-01-11"
  scheduledTime: string; // "09:00~18:00"
  actualTime: string; // "08:55~18:05"
  status: string; // "APPROVED" 등
}

/**
 * 근무 이력 목록 조회 응답 상세
 */
export interface WorkHistoryListDetails {
  histories: WorkHistory[];
}

/**
 * 근무 일정 상세 조회 응답
 */
export interface WorkScheduleDetail {
  scheduleId: number;
  scheduleDate: string; // "2026-01-11"
  startTime: string; // "09:00:00"
  endTime: string; // "18:00:00"
  statusCode: string; // "WS02" 등
}
