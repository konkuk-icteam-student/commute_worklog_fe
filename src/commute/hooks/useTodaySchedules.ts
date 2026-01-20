import { useState, useEffect, useCallback } from 'react';
import { getMySchedules } from '../shared/apis/schedule.api';
import type { WorkSchedule } from '../shared/types/schedule.types';

/**
 * 스케줄 상태 타입
 * - IN_PROGRESS: 진행중 (현재 시간이 스케줄 시간 내)
 * - UPCOMING: 예정 (스케줄 시작 시간 전)
 * - COMPLETED: 완료 (스케줄 종료 시간 지남)
 */
export type ScheduleDisplayStatus = 'IN_PROGRESS' | 'UPCOMING' | 'COMPLETED';

/**
 * 화면 표시용 스케줄 데이터
 */
export interface TodayScheduleDisplay {
  id: number;
  label: string; // "오전 근무" | "오후 근무"
  timeRange: string; // "09:00 - 11:00"
  status: ScheduleDisplayStatus;
  startTime: Date;
  endTime: Date;
}

interface UseTodaySchedulesResult {
  schedules: TodayScheduleDisplay[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * ISO 8601 시간 문자열에서 "HH:MM" 형식 추출
 */
const formatTimeHHMM = (isoString: string): string => {
  const date = new Date(isoString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

/**
 * 스케줄이 오전인지 판단 (12시 이전 시작)
 */
const isMorningSchedule = (startTime: Date): boolean => {
  return startTime.getHours() < 12;
};

/**
 * 스케줄 상태 결정
 */
const determineScheduleStatus = (
  startTime: Date,
  endTime: Date,
  now: Date
): ScheduleDisplayStatus => {
  if (now < startTime) {
    return 'UPCOMING';
  } else if (now >= startTime && now <= endTime) {
    return 'IN_PROGRESS';
  } else {
    return 'COMPLETED';
  }
};

/**
 * 오늘 날짜인지 확인
 */
const isToday = (date: Date, today: Date): boolean => {
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};

/**
 * 오늘의 스케줄을 가져오고 화면 표시용으로 가공하는 커스텀 훅
 */
export const useTodaySchedules = (): UseTodaySchedulesResult => {
  const [schedules, setSchedules] = useState<TodayScheduleDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodaySchedules = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;

      const response = await getMySchedules(year, month);

      if (!response.isSuccess) {
        setError(response.message || '스케줄을 불러오는데 실패했습니다.');
        setSchedules([]);
        return;
      }

      // 오늘 날짜의 스케줄만 필터링
      const todaySchedules = response.details.schedules.filter(
        (schedule: WorkSchedule) => {
          const scheduleDate = new Date(schedule.start);
          return isToday(scheduleDate, now);
        }
      );

      // 화면 표시용 데이터로 변환
      const displaySchedules: TodayScheduleDisplay[] = todaySchedules
        .map((schedule: WorkSchedule) => {
          const startTime = new Date(schedule.start);
          const endTime = new Date(schedule.end);
          const isMorning = isMorningSchedule(startTime);
          const status = determineScheduleStatus(startTime, endTime, now);

          return {
            id: schedule.id,
            label: isMorning ? '오전 근무' : '오후 근무',
            timeRange: `${formatTimeHHMM(schedule.start)} - ${formatTimeHHMM(schedule.end)}`,
            status,
            startTime,
            endTime,
          };
        })
        // 시작 시간 순으로 정렬
        .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

      setSchedules(displaySchedules);
    } catch (err) {
      console.error('오늘의 스케줄 조회 실패:', err);
      setError('스케줄을 불러오는 중 오류가 발생했습니다.');
      setSchedules([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodaySchedules();
  }, [fetchTodaySchedules]);

  // 1분마다 상태 업데이트 (진행중/예정/완료 상태 변경을 위해)
  useEffect(() => {
    const interval = setInterval(() => {
      setSchedules((prevSchedules) => {
        const now = new Date();
        return prevSchedules.map((schedule) => ({
          ...schedule,
          status: determineScheduleStatus(schedule.startTime, schedule.endTime, now),
        }));
      });
    }, 60000); // 1분

    return () => clearInterval(interval);
  }, []);

  return {
    schedules,
    isLoading,
    error,
    refetch: fetchTodaySchedules,
  };
};
