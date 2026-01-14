import apiClient from '@/shared/apis/apiClient';
import type {
  ApiResponse,
  ApplyWorkScheduleRequest,
  ApplyWorkScheduleDetails,
  ModifyWorkScheduleRequest,
  WorkScheduleListDetails,
  WorkHistoryListDetails,
  WorkScheduleDetail,
  AllScheduleHistoryDetails,
} from '../types/schedule.types';

/**
 * 근무 일정 일괄 신청
 * @param data 신청할 시간 슬롯 배열
 * @returns API 응답 (성공/실패 목록 포함)
 */
export const applyWorkSchedule = async (
  data: ApplyWorkScheduleRequest
): Promise<ApiResponse<ApplyWorkScheduleDetails>> => {
  const response = await apiClient.post<ApiResponse<ApplyWorkScheduleDetails>>(
    '/api/v1/work-schedules/apply',
    data,
    {
      // 422 응답도 정상 응답으로 처리 (백엔드가 의도적으로 반환하는 응답)
      validateStatus: (status) => status < 500,
    }
  );
  return response.data;
};

/**
 * 근무 일정 수정
 * 기존 일정을 취소하고 새로운 일정을 추가합니다.
 * @param data 취소할 일정 ID, 신청할 슬롯, 사유
 * @returns API 응답
 */
export const modifyWorkSchedule = async (
  data: ModifyWorkScheduleRequest
): Promise<ApiResponse<null>> => {
  const response = await apiClient.patch<ApiResponse<null>>(
    '/api/v1/work-schedules/modify',
    data
  );
  return response.data;
};

/**
 * 나의 근무 일정 조회
 * @param year 조회할 연도
 * @param month 조회할 월 (1~12)
 * @returns API 응답 (근무 일정 목록)
 */
export const getMySchedules = async (
  year: number,
  month: number
): Promise<ApiResponse<WorkScheduleListDetails>> => {
  const response = await apiClient.get<ApiResponse<WorkScheduleListDetails>>(
    '/api/v1/work-schedules',
    {
      params: { year, month },
    }
  );
  return response.data;
};

/**
 * 나의 지난 근무 이력 조회
 * @param year 조회할 연도
 * @param month 조회할 월 (1~12)
 * @returns API 응답 (근무 이력 목록)
 */
export const getMyHistory = async (
  year: number,
  month: number
): Promise<ApiResponse<WorkHistoryListDetails>> => {
  const response = await apiClient.get<ApiResponse<WorkHistoryListDetails>>(
    '/api/v1/work-schedules/history',
    {
      params: { year, month },
    }
  );
  return response.data;
};

/**
 * 특정 근무 일정 상세 조회
 * @param scheduleId 조회할 일정 ID
 * @returns API 응답 (근무 일정 상세)
 */
export const getWorkScheduleDetail = async (
  scheduleId: number
): Promise<ApiResponse<WorkScheduleDetail>> => {
  const response = await apiClient.get<ApiResponse<WorkScheduleDetail>>(
    `/api/v1/work-schedules/${scheduleId}`
  );
  return response.data;
};

/**
 * 근무 일정 취소/삭제
 * @param scheduleId 취소할 일정 ID
 * @returns API 응답
 */
export const deleteWorkSchedule = async (scheduleId: number): Promise<ApiResponse<null>> => {
  const response = await apiClient.delete<ApiResponse<null>>(
    `/api/v1/work-schedules/${scheduleId}`
  );
  return response.data;
};

/**
 * 전체 근무 이력 조회 (관리자용 - 모든 사용자의 스케줄)
 * @param year 조회할 연도
 * @param month 조회할 월 (1~12)
 * @returns API 응답 (전체 스케줄 히스토리 목록)
 */
export const getAllScheduleHistory = async (
  year: number,
  month: number
): Promise<ApiResponse<AllScheduleHistoryDetails>> => {
  const response = await apiClient.get<ApiResponse<AllScheduleHistoryDetails>>(
    '/api/v1/admin/schedule/history/all',
    {
      params: { year, month },
    }
  );
  return response.data;
};
