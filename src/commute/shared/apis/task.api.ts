import apiClient from '@/shared/apis/apiClient';
import type {
  ApiResponse,
  TasksByDateDetails,
  TaskDetail,
} from '../types/task.types';

/**
 * 특정 날짜의 업무 목록 조회
 * @param date 조회할 날짜 (YYYY-MM-DD 형식)
 * @returns API 응답 (정규/비정규 업무 목록)
 */
export const getTasksByDate = async (
  date: string
): Promise<ApiResponse<TasksByDateDetails>> => {
  const response = await apiClient.get<ApiResponse<TasksByDateDetails>>(
    '/api/v1/tasks',
    {
      params: { date },
    }
  );
  return response.data;
};

/**
 * 특정 업무의 상세 정보 조회
 * @param taskId 조회할 업무 ID
 * @returns API 응답 (업무 상세 정보)
 */
export const getTaskDetail = async (
  taskId: number
): Promise<ApiResponse<TaskDetail>> => {
  const response = await apiClient.get<ApiResponse<TaskDetail>>(
    `/api/v1/tasks/${taskId}`
  );
  return response.data;
};
