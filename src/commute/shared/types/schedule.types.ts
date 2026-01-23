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
  timestamp?: string;
  success: TimeSlot[];
  failure?: TimeSlot[];
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
 * 근무 일정 단건 (실제 API 응답 구조)
 */
export interface WorkSchedule {
  id: number;
  start: string; // ISO 8601: "2026-01-23T09:00:00"
  end: string; // ISO 8601: "2026-01-23T11:00:00"
  status: string; // "WS01", "WS02" 등
  timestamp: string;
}

/**
 * 근무 일정 목록 조회 응답 상세 (실제 API 응답 구조)
 */
export interface WorkScheduleListDetails {
  schedules: WorkSchedule[]; // workSchedules가 아니라 schedules
  timestamp: string;
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

/**
 * 전체 스케줄 히스토리 단건 (admin API 응답)
 */
export interface ScheduleHistoryItem {
  scheduleId: number;
  start: string; // "2026-01-11T13:00:00"
  end: string; // "2026-01-11T16:00:00"
  status: string;
  actualStart: string;
  actualEnd: string;
  workDurationMinutes: number;
}

/**
 * 전체 스케줄 히스토리 응답 상세
 */
export interface AllScheduleHistoryDetails {
  histories: ScheduleHistoryItem[];
}

/**
 * 유저 정보 (관리자 근무 시간 통계 조회용)
 */
export interface WorkTimeSummaryUserInfo {
  userId: number;
  name: string;
  email: string;
  roleCode: string;
  organizationName: string;
}

/**
 * 근무 시간 통계 단건
 */
export interface WorkTimeSummaryItem {
  userInfo: WorkTimeSummaryUserInfo;
  totalMinutes: number;
}

/**
 * 전체 근무 시간 통계 응답 상세
 */
export interface WorkTimeSummaryDetails {
  summaries: WorkTimeSummaryItem[];
}

/**
 * 웹소켓 스케줄 업데이트 단건
 */
export interface ScheduleUpdateItem {
  isAdd: boolean; // true: 신청, false: 취소
  slotStartTime: string; // "2026-01-11T09:00:00" (30분 단위, 종료시간은 +30분)
}

/**
 * 웹소켓 스케줄 업데이트 메시지
 */
export interface ScheduleUpdateMessage {
  type: 'SCHEDULE_UPDATED';
  updates: ScheduleUpdateItem[];
}
