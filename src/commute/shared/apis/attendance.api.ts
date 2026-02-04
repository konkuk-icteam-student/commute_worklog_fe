import apiClient from '@/shared/apis/apiClient';
import type {
  ApiResponse,
  CheckInOutRequest,
  TodayAttendanceHistoryDetails,
  QrTokenDetails,
  AttendanceHistoryDetails,
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

/**
 * 관리자 태블릿용 QR 생성 토큰 발급
 * @returns API 응답 (QR 토큰 정보)
 */
export const getQrToken = async (): Promise<ApiResponse<QrTokenDetails>> => {
  const response = await apiClient.get<ApiResponse<QrTokenDetails>>(
    '/api/v1/attendance/qr-token'
  );
  return response.data;
};

/**
 * 특정 날짜의 출퇴근 기록 조회
 * @param date 조회할 날짜 (YYYY-MM-DD 형식)
 * @returns API 응답 (출퇴근 기록 목록)
 */
export const getAttendanceHistory = async (
  date: string
): Promise<ApiResponse<AttendanceHistoryDetails>> => {
  const response = await apiClient.get<ApiResponse<AttendanceHistoryDetails>>(
    '/api/v1/attendance/history',
    {
      params: { date },
    }
  );
  return response.data;
};
