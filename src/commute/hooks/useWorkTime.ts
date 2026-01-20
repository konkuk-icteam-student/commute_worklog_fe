import { useState, useEffect, useCallback } from 'react';
import { getWeeklyWorkTime, getMonthlyWorkTime } from '../shared/apis/user.api';
import { getMySchedules } from '../shared/apis/schedule.api';
import type { WorkSchedule } from '../shared/types/schedule.types';

/**
 * 월간 최대 근무시간 (고정값)
 */
const MONTHLY_MAX_HOURS = 27;

/**
 * 근무시간 데이터
 */
export interface WorkTimeData {
  // 실제 근무 시간 (시간 단위, 소수점 1자리)
  actualHours: number;
  // 예정/최대 근무 시간 (시간 단위)
  maxHours: number;
  // 진행률 (0-100)
  percentage: number;
}

interface UseWorkTimeResult {
  weekly: WorkTimeData | null;
  monthly: WorkTimeData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * 주어진 날짜가 속한 주의 시작일(월요일)과 종료일(일요일) 반환
 */
const getWeekRange = (date: Date): { start: Date; end: Date } => {
  const d = new Date(date);
  const day = d.getDay();
  // 일요일(0)은 7로 변환하여 월요일 기준으로 계산
  const diff = day === 0 ? 6 : day - 1;

  const start = new Date(d);
  start.setDate(d.getDate() - diff);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

/**
 * ISO 8601 시간 문자열에서 시간 차이(분) 계산
 */
const calculateDurationMinutes = (startIso: string, endIso: string): number => {
  const start = new Date(startIso);
  const end = new Date(endIso);
  return (end.getTime() - start.getTime()) / (1000 * 60);
};

/**
 * 스케줄이 특정 주에 속하는지 확인
 */
const isScheduleInWeek = (schedule: WorkSchedule, weekStart: Date, weekEnd: Date): boolean => {
  const scheduleDate = new Date(schedule.start);
  return scheduleDate >= weekStart && scheduleDate <= weekEnd;
};

/**
 * 분을 시간으로 변환 (소수점 1자리)
 */
const minutesToHours = (minutes: number): number => {
  return Math.round((minutes / 60) * 10) / 10;
};

/**
 * MyPage용 주간/월간 근무시간 데이터를 가져오는 커스텀 훅
 */
export const useWorkTime = (): UseWorkTimeResult => {
  const [weekly, setWeekly] = useState<WorkTimeData | null>(null);
  const [monthly, setMonthly] = useState<WorkTimeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkTimeData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;

      // 병렬로 API 호출
      const [weeklyResponse, monthlyResponse, schedulesResponse] = await Promise.all([
        getWeeklyWorkTime(),
        getMonthlyWorkTime(),
        getMySchedules(year, month),
      ]);

      // 에러 체크
      if (!weeklyResponse.isSuccess) {
        throw new Error(weeklyResponse.message || '주간 근무시간 조회 실패');
      }
      if (!monthlyResponse.isSuccess) {
        throw new Error(monthlyResponse.message || '월간 근무시간 조회 실패');
      }
      if (!schedulesResponse.isSuccess) {
        throw new Error(schedulesResponse.message || '스케줄 조회 실패');
      }

      // 이번 주 범위 계산
      const { start: weekStart, end: weekEnd } = getWeekRange(now);

      // 이번 주 스케줄 필터링 및 예정 시간 계산
      const weeklySchedules = schedulesResponse.details.schedules.filter((schedule: WorkSchedule) =>
        isScheduleInWeek(schedule, weekStart, weekEnd)
      );

      // 중복 제거: start 시간이 같은 스케줄은 하나만 유지 (프론트엔드 방어 코드)
      const uniqueWeeklySchedules = weeklySchedules.reduce(
        (acc: WorkSchedule[], current: WorkSchedule) => {
          const isDuplicate = acc.some((item) => item.start === current.start);
          if (!isDuplicate) {
            acc.push(current);
          }
          return acc;
        },
        []
      );

      const weeklyScheduledMinutes = uniqueWeeklySchedules.reduce(
        (total: number, schedule: WorkSchedule) => {
          return total + calculateDurationMinutes(schedule.start, schedule.end);
        },
        0
      );

      // 주간 데이터 설정
      const weeklyActualHours = minutesToHours(weeklyResponse.details.totalMinutes);
      const weeklyMaxHours = minutesToHours(weeklyScheduledMinutes);
      // 예정된 스케줄이 없으면 0으로 표시
      const weeklyPercentage =
        weeklyMaxHours > 0
          ? Math.min(100, Math.round((weeklyActualHours / weeklyMaxHours) * 100))
          : 0;

      setWeekly({
        actualHours: weeklyActualHours,
        maxHours: weeklyMaxHours,
        percentage: weeklyPercentage,
      });

      // 월간 데이터 설정 (최대 27시간 고정)
      const monthlyActualHours = minutesToHours(monthlyResponse.details.totalMinutes);
      const monthlyPercentage = Math.min(
        100,
        Math.round((monthlyActualHours / MONTHLY_MAX_HOURS) * 100)
      );

      setMonthly({
        actualHours: monthlyActualHours,
        maxHours: MONTHLY_MAX_HOURS,
        percentage: monthlyPercentage,
      });
    } catch (err) {
      console.error('근무시간 데이터 조회 실패:', err);
      setError(err instanceof Error ? err.message : '근무시간을 불러오는 중 오류가 발생했습니다.');
      setWeekly(null);
      setMonthly(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkTimeData();
  }, [fetchWorkTimeData]);

  return {
    weekly,
    monthly,
    isLoading,
    error,
    refetch: fetchWorkTimeData,
  };
};
