import apiClient from '@/shared/apis/apiClient';
import type {
  ApiResponse,
  TodayWorkTimeDetails,
  AttendanceStatusDetails,
} from '../types/home.types';

/**
 * 오늘의 근무 시간 및 예정 스케줄 수 조회
 * @returns API 응답 (오늘의 근무 시간, 스케줄 수)
 */
// TODO: api 연동 기능 구현 필요
export const getTodayWorkTime = async (): Promise<ApiResponse<TodayWorkTimeDetails>> => {
  const response = await apiClient.get<ApiResponse<TodayWorkTimeDetails>>('/api/v1/home/work-time');
  return response.data;
};

/**
 * 현재 출퇴근 버튼 상태 조회
 * @returns API 응답 (출퇴근 상태, 마지막 체크 시간)
 */
// TODO: api 연동 기능 구현 필요
export const getAttendanceStatus = async (): Promise<ApiResponse<AttendanceStatusDetails>> => {
  const response = await apiClient.get<ApiResponse<AttendanceStatusDetails>>(
    '/api/v1/home/attendance-status'
  );
  return response.data;
};
