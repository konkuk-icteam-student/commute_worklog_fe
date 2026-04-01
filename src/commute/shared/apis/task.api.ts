import apiClient from '@/shared/apis/apiClient';
import type {
  ApiResponse,
  TasksByDateDetails,
  TaskDetail,
  ToggleCompleteDetails,
  CreateTaskRequest,
  UpdateTaskRequest,
  SetTaskCompleteRequest,
} from '../types/task.types';

/**
 * 특정 날짜의 업무 목록 조회
 * @param date 조회할 날짜 (YYYY-MM-DD 형식)
 * @returns API 응답 (정규/비정규 업무 목록)
 */
export const getTasksByDate = async (date: string): Promise<ApiResponse<TasksByDateDetails>> => {
  const response = await apiClient.get<ApiResponse<TasksByDateDetails>>('/api/v1/tasks', {
    params: { date },
  });
  return response.data;
};

/**
 * 특정 업무의 상세 정보 조회
 * @param taskId 조회할 업무 ID
 * @returns API 응답 (업무 상세 정보)
 */
// TODO: api 연동 기능 구현 필요
export const getTaskDetail = async (taskId: number): Promise<ApiResponse<TaskDetail>> => {
  const response = await apiClient.get<ApiResponse<TaskDetail>>(`/api/v1/tasks/${taskId}`);
  return response.data;
};

/**
 * 업무 완료 상태 토글
 * @param taskId 토글할 업무 ID
 * @returns API 응답 (토글 결과)
 */
export const toggleTaskComplete = async (
  taskId: number
): Promise<ApiResponse<ToggleCompleteDetails>> => {
  const response = await apiClient.patch<ApiResponse<ToggleCompleteDetails>>(
    `/api/v1/tasks/${taskId}/toggle-complete`
  );
  return response.data;
};

/**
 * 업무 생성 (비정기 업무용)
 * @param data 업무 생성 요청 데이터
 * @returns API 응답 (생성된 업무 상세)
 */
export const createTask = async (data: CreateTaskRequest): Promise<ApiResponse<TaskDetail>> => {
  const response = await apiClient.post<ApiResponse<TaskDetail>>('/api/v1/tasks', data);
  return response.data;
};

/**
 * 업무 수정 (관리자 전용)
 * @param taskId 수정할 업무 ID
 * @param data 수정할 필드 (title, assigneeId, taskTime)
 * @returns API 응답 (수정된 업무 상세)
 */
// TODO: api 연동 기능 구현 필요
export const updateTask = async (
  taskId: number,
  data: UpdateTaskRequest
): Promise<ApiResponse<TaskDetail>> => {
  const response = await apiClient.patch<ApiResponse<TaskDetail>>(`/api/v1/tasks/${taskId}`, data);
  return response.data;
};

/**
 * 업무 완료 상태 설정
 * @param taskId 설정할 업무 ID
 * @param data 완료 상태 (isCompleted)
 * @returns API 응답 (토글 결과)
 */
// TODO: api 연동 기능 구현 필요
export const setTaskComplete = async (
  taskId: number,
  data: SetTaskCompleteRequest
): Promise<ApiResponse<ToggleCompleteDetails>> => {
  const response = await apiClient.patch<ApiResponse<ToggleCompleteDetails>>(
    `/api/v1/tasks/${taskId}/complete`,
    data
  );
  return response.data;
};

/**
 * 업무 삭제 (관리자 전용)
 * @param taskId 삭제할 업무 ID
 * @returns API 응답 (details: null)
 */
export const deleteTask = async (taskId: number): Promise<ApiResponse<null>> => {
  const response = await apiClient.delete<ApiResponse<null>>(`/api/v1/tasks/${taskId}`);
  return response.data;
};
