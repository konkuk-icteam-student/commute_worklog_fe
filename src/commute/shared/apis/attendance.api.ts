import apiClient from '@/shared/apis/apiClient';
import type {
  ApiResponse,
  CheckInOutRequest,
  TodayAttendanceHistoryDetails,
} from '../types/attendance.types';

/**
 * QR 코드를 통한 출근 체크
 * @param data QR 토큰 정보
 * @returns API 응답
 */
export const checkIn = async (
  data: CheckInOutRequest
): Promise<ApiResponse<null>> => {
  const response = await apiClient.post<ApiResponse<null>>(
    '/api/v1/attendance/check-in',
    data
  );
  return response.data;
};

/**
 * QR 코드를 통한 퇴근 체크
 * @param data QR 토큰 정보
 * @returns API 응답
 */
export const checkOut = async (
  data: CheckInOutRequest
): Promise<ApiResponse<null>> => {
  const response = await apiClient.post<ApiResponse<null>>(
    '/api/v1/attendance/check-out',
    data
  );
  return response.data;
};

/**
 * 오늘의 출퇴근 기록 조회
 * @returns API 응답 (오늘의 출퇴근 기록 목록)
 */
export const getTodayHistory = async (): Promise<ApiResponse<TodayAttendanceHistoryDetails>> => {
  const response = await apiClient.get<ApiResponse<TodayAttendanceHistoryDetails>>(
    '/api/v1/attendance/today'
  );
  return response.data;
};
