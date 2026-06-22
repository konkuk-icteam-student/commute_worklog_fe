import apiClient from '@/shared/apis/apiClient';
import type { ApiResponse, MyInfoDetails, WorkTimeDetails } from '../types/user.types';

/**
 * 내 정보 조회
 * @returns API 응답 (사용자 정보)
 */
export const getMyInfo = async (): Promise<ApiResponse<MyInfoDetails>> => {
  const response = await apiClient.get<ApiResponse<MyInfoDetails>>('/api/users/me');
  return response.data;
};

/**
 * 주간 근무 시간 조회
 * @returns API 응답 (주간 총 근무 시간, 분 단위)
 */
export const getWeeklyWorkTime = async (): Promise<ApiResponse<WorkTimeDetails>> => {
  const response = await apiClient.get<ApiResponse<WorkTimeDetails>>(
    '/api/users/me/work-time/weekly'
  );
  return response.data;
};

/**
 * 월간 근무 시간 조회
 * @returns API 응답 (월간 총 근무 시간, 분 단위)
 */
export const getMonthlyWorkTime = async (): Promise<ApiResponse<WorkTimeDetails>> => {
  const response = await apiClient.get<ApiResponse<WorkTimeDetails>>(
    '/api/users/me/work-time/monthly'
  );
  return response.data;
};
