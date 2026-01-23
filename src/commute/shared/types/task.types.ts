import type { ApiResponse } from './schedule.types';

// Re-export ApiResponse for convenience
export type { ApiResponse };

/**
 * 업무 유형 코드
 * TT01: 정규 업무
 * TT02: 비정규 업무
 */
export type TaskTypeCode = 'TT01' | 'TT02';

/**
 * 업무 단건 (목록 조회용)
 */
export interface Task {
  taskId: number;
  title: string;
  taskTime: string; // "14:00:00"
  isCompleted: boolean;
}

/**
 * 업무 상세 (상세 조회용)
 */
export interface TaskDetail {
  taskId: number;
  title: string;
  assigneeId: number;
  taskDate: string; // "2025-10-24"
  taskTime: string; // "14:00:00"
  taskType: TaskTypeCode;
  isCompleted: boolean;
}

/**
 * 특정 날짜의 업무 목록 조회 응답 상세
 */
export interface TasksByDateDetails {
  date: string; // "2025-10-24"
  regularTasks: Task[];
  irregularTasks: Task[];
}

// ============================================
// API 응답 타입 별칭 (편의를 위해)
// ============================================

/**
 * 특정 날짜의 업무 목록 조회 응답
 */
export type TasksByDateResponse = ApiResponse<TasksByDateDetails>;

/**
 * 업무 상세 조회 응답
 */
export type TaskDetailResponse = ApiResponse<TaskDetail>;

// ============================================
// API 요청 타입
// ============================================

/**
 * 업무 완료 상태 토글 응답 상세
 */
export interface ToggleCompleteDetails {
  taskId: number;
  isCompleted: boolean;
}

/**
 * 업무 완료 상태 토글 응답
 */
export type ToggleCompleteResponse = ApiResponse<ToggleCompleteDetails>;

/**
 * 업무 생성 요청 (학생용 비정기 업무)
 */
export interface CreateTaskRequest {
  title: string;
  assigneeId?: number;
  taskDate: string; // "YYYY-MM-DD"
  taskTime?: string; // "HH:mm:ss"
  taskType: TaskTypeCode;
}

/**
 * 업무 수정 요청 (관리자 전용)
 */
export interface UpdateTaskRequest {
  title?: string;
  assigneeId?: number;
  taskTime?: string; // "HH:mm:ss"
}

/**
 * 업무 완료 상태 설정 요청
 */
export interface SetTaskCompleteRequest {
  isCompleted: boolean;
}

/**
 * 업무 생성 응답
 */
export type CreateTaskResponse = ApiResponse<TaskDetail>;
