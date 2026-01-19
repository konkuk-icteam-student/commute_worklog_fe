import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ScheduleInfoCard from '../shared/components/ScheduleInfoCard';
import WeekTotalCard from '../shared/components/WeekTotalCard';
import WeeklyTimeTableNew from '../shared/components/WeeklyTimeTableNew';
import MonthlyHoursCard from '../shared/components/MonthlyHoursCard';
import WeeklySummaryCard from '../shared/components/WeeklySummaryCard';
import BottomNavigation from '../shared/components/BottomNavigation';
import successIcon from '../shared/assets/success.svg';
import { applyWorkSchedule, getMySchedules, getAllScheduleHistory } from '../shared/apis/schedule.api';
import { convertSlotsToTimeSlots, convertSchedulesToSlots } from '../shared/utils/scheduleUtils';
import type { TimeSlot, WorkSchedule, ScheduleHistoryItem, ScheduleUpdateItem } from '../shared/types/schedule.types';
import { useScheduleWebSocket } from '../hooks/useScheduleWebSocket';

export default function ScheduleApplyPage() {
  const navigate = useNavigate();
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [pendingSlotsByWeek, setPendingSlotsByWeek] = useState<Record<number, string[]>>({}); // 주차별 선택 슬롯 저장
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [failedSlots, setFailedSlots] = useState<TimeSlot[]>([]);
  const [allSchedules, setAllSchedules] = useState<WorkSchedule[]>([]); // 전체 월의 스케줄
  const [slotCapacityMap, setSlotCapacityMap] = useState<Map<string, number>>(new Map()); // 슬롯별 신청 인원수
  const [isLoadingCapacity, setIsLoadingCapacity] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false); // 초기화 여부

  // 현재 연도/월
  const currentYear = 2026;
  const currentMonth = 1;
  const MAX_CAPACITY = 5; // 최대 신청 가능 인원수

  /**
   * API 응답을 슬롯별 신청 인원수로 변환
   * 전체 시간 범위(예: 09:00~18:00)를 30분 단위 슬롯으로 분해하여 카운트
   * @param histories 전체 스케줄 히스토리 배열
   * @returns Map<슬롯키, 신청인원수>
   */
  const processScheduleHistoryToCapacity = (histories: ScheduleHistoryItem[]): Map<string, number> => {
    const capacityMap = new Map<string, number>();

    histories.forEach((history) => {
      // start: "2026-01-11T09:00:00", end: "2026-01-11T18:00:00"
      const startDate = new Date(history.start);
      const endDate = new Date(history.end);

      // 30분 단위로 슬롯 분해
      let currentSlotStart = new Date(startDate);
      while (currentSlotStart < endDate) {
        // 슬롯 종료 시간 (30분 후)
        const currentSlotEnd = new Date(currentSlotStart.getTime() + 30 * 60 * 1000);

        // ISO 형식으로 슬롯 키 생성 (시간대 정보 제거)
        const formatDateTime = (date: Date): string => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          const hours = String(date.getHours()).padStart(2, '0');
          const minutes = String(date.getMinutes()).padStart(2, '0');
          return `${year}-${month}-${day}T${hours}:${minutes}:00`;
        };

        const slotKey = `${formatDateTime(currentSlotStart)}_${formatDateTime(currentSlotEnd)}`;

        // 기존 카운트에 +1
        const currentCount = capacityMap.get(slotKey) || 0;
        capacityMap.set(slotKey, currentCount + 1);

        // 다음 30분 슬롯으로 이동
        currentSlotStart = currentSlotEnd;
      }
    });

    return capacityMap;
  };

  /**
   * 전체 슬롯별 신청 인원수 조회
   */
  const fetchAllScheduleCapacity = useCallback(async () => {
    setIsLoadingCapacity(true);
    try {
      const response = await getAllScheduleHistory(currentYear, currentMonth);

      if (response.isSuccess && response.details?.histories) {
        const capacityMap = processScheduleHistoryToCapacity(response.details.histories);
        setSlotCapacityMap(capacityMap);
      } else {
        setSlotCapacityMap(new Map());
      }
    } catch (err) {
      console.error('전체 스케줄 조회 에러:', err);
      setSlotCapacityMap(new Map());
    } finally {
      setIsLoadingCapacity(false);
    }
  }, [currentYear, currentMonth]);

  /**
   * 웹소켓 스케줄 업데이트 처리
   * slotStartTime을 받아서 endTime을 계산하고 (+30분), slotCapacityMap 업데이트
   */
  const handleScheduleUpdate = useCallback((updates: ScheduleUpdateItem[]) => {
    setSlotCapacityMap((prevMap) => {
      const newMap = new Map(prevMap);

      updates.forEach((update) => {
        // slotStartTime: "2026-01-11T09:00:00"
        const startISO = update.slotStartTime;

        // 종료 시간 계산 (30분 후)
        // "2026-01-11T09:00:00" -> "09:00"
        const timeMatch = startISO.match(/T(\d{2}):(\d{2}):(\d{2})$/);
        if (!timeMatch) {
          console.error('[실시간 업데이트] Invalid time format:', startISO);
          return;
        }

        const [, hourStr, minuteStr] = timeMatch;
        let hour = parseInt(hourStr);
        let minute = parseInt(minuteStr) + 30;

        // 60분 넘으면 시간 증가
        if (minute >= 60) {
          hour += 1;
          minute -= 60;
        }

        // endISO 생성
        const endISO = startISO.replace(
          /T\d{2}:\d{2}:\d{2}$/,
          `T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`
        );

        // 슬롯 키 생성
        const slotKey = `${startISO}_${endISO}`;

        // 현재 카운트 가져오기
        const currentCount = newMap.get(slotKey) || 0;

        // isAdd에 따라 +1 또는 -1
        if (update.isAdd) {
          newMap.set(slotKey, currentCount + 1);
          console.log(`[실시간 업데이트] ${slotKey}: ${currentCount} → ${currentCount + 1} (신청)`);
        } else {
          const newCount = Math.max(0, currentCount - 1); // 음수 방지
          newMap.set(slotKey, newCount);
          console.log(`[실시간 업데이트] ${slotKey}: ${currentCount} → ${newCount} (취소)`);
        }
      });

      return newMap;
    });
  }, []);

  // 웹소켓 연결: 스케줄 실시간 업데이트 수신
  useScheduleWebSocket({
    onScheduleUpdate: handleScheduleUpdate,
    enabled: true, // 백엔드 CORS 설정 완료 후 동작
  });

  // 내 스케줄 조회 함수 (초기 로드용)
  const fetchMySchedules = useCallback(async () => {
    try {
      const response = await getMySchedules(currentYear, currentMonth);

      if (response.isSuccess && response.details?.schedules) {
        // 전체 스케줄 저장
        setAllSchedules(response.details.schedules);

        // 초기화: 각 주차별 API 슬롯을 pendingSlotsByWeek에 저장
        const initialPendingSlots: Record<number, string[]> = {};
        for (let week = 1; week <= 5; week++) {
          const slots = convertSchedulesToSlots(
            response.details.schedules,
            week,
            currentYear,
            currentMonth
          );
          initialPendingSlots[week] = slots;
        }
        setPendingSlotsByWeek(initialPendingSlots);

        // 현재 주차의 슬롯을 selectedSlots에 설정
        setSelectedSlots(initialPendingSlots[selectedWeek] || []);
        setIsInitialized(true);
      } else {
        setAllSchedules([]);
        setPendingSlotsByWeek({});
        setSelectedSlots([]);
        setIsInitialized(true);
      }
    } catch (err) {
      console.error('스케줄 조회 에러:', err);
      setAllSchedules([]);
      setPendingSlotsByWeek({});
      setSelectedSlots([]);
      setIsInitialized(true);
    }
  }, [currentYear, currentMonth, selectedWeek]);

  // 주차 변경 핸들러
  const handleWeekChange = (newWeek: number) => {
    if (newWeek === selectedWeek) return;

    // 현재 주차의 선택 슬롯을 저장
    setPendingSlotsByWeek(prev => ({
      ...prev,
      [selectedWeek]: selectedSlots
    }));

    // 새 주차로 변경
    setSelectedWeek(newWeek);

    // 새 주차의 저장된 슬롯 불러오기
    const newWeekSlots = pendingSlotsByWeek[newWeek] || convertSchedulesToSlots(
      allSchedules,
      newWeek,
      currentYear,
      currentMonth
    );
    setSelectedSlots(newWeekSlots);
  };

  // 1단계: 페이지 로드 시 전체 슬롯 인원수 조회 (한 번만 실행)
  useEffect(() => {
    fetchAllScheduleCapacity();
  }, [fetchAllScheduleCapacity]);

  // 2단계: 전체 슬롯 인원수 로드 완료 후, 초기 스케줄 조회 (한 번만)
  useEffect(() => {
    if (!isLoadingCapacity && !isInitialized) {
      fetchMySchedules();
    }
  }, [isLoadingCapacity, isInitialized, fetchMySchedules]);

  const handleSlotClick = (dayIndex: number, time: string) => {
    const slotKey = `${dayIndex}-${time}`;
    setSelectedSlots(prev => {
      if (prev.includes(slotKey)) {
        return prev.filter(s => s !== slotKey);
      } else {
        return [...prev, slotKey];
      }
    });
  };

  const calculateWeekHours = (week: number) => {
    if (week === selectedWeek) {
      // 현재 선택된 주차는 selectedSlots 사용 (사용자가 추가/제거한 것 포함)
      return selectedSlots.length * 0.5;
    } else {
      // 다른 주차는 pendingSlotsByWeek에서 가져오기 (없으면 API 데이터)
      const weekSlots = pendingSlotsByWeek[week] || convertSchedulesToSlots(allSchedules, week, currentYear, currentMonth);
      return weekSlots.length * 0.5;
    }
  };

  const currentWeekHours = calculateWeekHours(selectedWeek);

  // 주차별 시간 데이터 (WeeklySummaryCard에 전달)
  const weeklyHours: Record<number, number> = {
    1: calculateWeekHours(1),
    2: calculateWeekHours(2),
    3: calculateWeekHours(3),
    4: calculateWeekHours(4),
    5: calculateWeekHours(5),
  };

  // 월별 총 시간 계산 (모든 주차의 시간 합산)
  const totalMonthHours = Object.values(weeklyHours).reduce((total, hours) => total + hours, 0);

  // 최대 근무시간 상수
  const MAX_WEEK_HOURS = 13;
  const MAX_MONTH_HOURS = 27;
  const MIN_CONSECUTIVE_HOURS = 2;

  /**
   * 연속 2시간 이상 선택 여부 검사
   * 각 요일별로 선택된 슬롯이 연속 2시간(4슬롯) 이상인지 확인
   */
  const checkConsecutiveHours = (): boolean => {
    if (selectedSlots.length === 0) return true;

    // 요일별로 슬롯 그룹화
    const slotsByDay: Record<number, string[]> = {};
    selectedSlots.forEach(slot => {
      const [dayStr, time] = slot.split('-');
      const day = parseInt(dayStr);
      if (!slotsByDay[day]) slotsByDay[day] = [];
      slotsByDay[day].push(time);
    });

    // 시간을 분으로 변환하는 함수
    const timeToMinutes = (time: string): number => {
      const [hour, minute] = time.split(':').map(Number);
      return hour * 60 + minute;
    };

    // 각 요일별로 연속 블록 검사
    for (const day in slotsByDay) {
      const times = slotsByDay[day].sort((a, b) => timeToMinutes(a) - timeToMinutes(b));

      let consecutiveCount = 1;

      for (let i = 1; i < times.length; i++) {
        const prevMinutes = timeToMinutes(times[i - 1]);
        const currMinutes = timeToMinutes(times[i]);

        // 30분 간격이면 연속
        if (currMinutes - prevMinutes === 30) {
          consecutiveCount++;
        } else {
          // 연속이 끊김 - 이전 블록 검사
          if (consecutiveCount < 4) {
            return false; // 2시간 미만 블록 발견
          }
          consecutiveCount = 1;
        }
      }

      // 마지막 블록 검사
      if (consecutiveCount < 4) {
        return false; // 2시간 미만 블록 발견
      }
    }

    return true;
  };

  // 유효성 검사
  const isWeekHoursExceeded = currentWeekHours > MAX_WEEK_HOURS;
  const isMonthHoursExceeded = totalMonthHours > MAX_MONTH_HOURS;
  const isConsecutiveHoursValid = checkConsecutiveHours();

  // 유효성 검사 경고 메시지
  const getValidationWarning = (): string | null => {
    if (isWeekHoursExceeded) {
      return `현재 주 최대 근무 가능시간 ${MAX_WEEK_HOURS}시간을 초과하였습니다.`;
    }
    if (isMonthHoursExceeded) {
      return `현재 월 최대 근무 가능시간 ${MAX_MONTH_HOURS}시간을 초과하였습니다.`;
    }
    if (!isConsecutiveHoursValid && selectedSlots.length > 0) {
      return `최소 근무 시간은 ${MIN_CONSECUTIVE_HOURS}시간입니다.`;
    }
    return null;
  };

  const validationWarning = getValidationWarning();
  const isSubmitDisabled = selectedSlots.length === 0 || isLoading || validationWarning !== null;

  const handleSubmit = async () => {
    if (selectedSlots.length === 0) return;

    setIsLoading(true);
    setError(null);
    setFailedSlots([]);

    try {
      // 선택된 슬롯을 TimeSlot 배열로 변환
      const timeSlots = convertSlotsToTimeSlots(selectedSlots, selectedWeek, 2026, 1);

      if (timeSlots.length === 0) {
        setError('유효한 일정이 없습니다.');
        setIsLoading(false);
        return;
      }

      // API 호출
      const response = await applyWorkSchedule({ slots: timeSlots });

      if (response.isSuccess) {
        // 부분 실패가 있는 경우 (207 Multi-Status)
        if (response.details?.failure && response.details.failure.length > 0) {
          setFailedSlots(response.details.failure);
          setError(`일부 일정 신청에 실패했습니다. (성공: ${response.details.success.length}개, 실패: ${response.details.failure.length}개)`);
        }

        // 성공한 경우 스케줄 재조회
        await fetchMySchedules();

        // 성공한 경우 (전체 또는 부분)
        setIsSubmitted(true);
      } else {
        // isSuccess: false인 경우 (422 등)
        setError(response.message || '일정 신청에 실패했습니다.');

        // 실패한 슬롯 정보가 있으면 표시
        if (response.details?.failure && response.details.failure.length > 0) {
          setFailedSlots(response.details.failure);
        }
      }
    } catch (err: unknown) {
      console.error('일정 신청 에러:', err);

      // axios 에러에서 response.data 추출
      if (axios.isAxiosError(err) && err.response?.data) {
        const errorData = err.response.data as { message?: string; details?: { failure?: TimeSlot[] } };
        setError(errorData.message || '일정 신청에 실패했습니다.');

        // 실패한 슬롯 정보가 있으면 표시
        if (errorData.details?.failure && errorData.details.failure.length > 0) {
          setFailedSlots(errorData.details.failure);
        }
      } else {
        setError('일정 신청 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 신청 완료 화면
  if (isSubmitted) {
    return (
      <div className="bg-white relative min-h-screen w-full" data-name="scheduleApplySuccess">
        {/* Background Gradient */}
        <div className="absolute bg-gradient-to-b from-[#f8fbff] to-[#ffffff] inset-0 -z-10" data-name="Background" />

        {/* Header */}
        <div className="w-full bg-[#51a8ff] shadow-[0rem_0.4rem_0.6rem_-0.4rem_rgba(0,0,0,0.1)]" data-name="Container">
          <div className="max-w-[39.3rem] mx-auto px-[3.2rem] py-[2.4rem]">
            <div className="flex items-center gap-[1.6rem]">
              {/* Back Button */}
              <button
                onClick={() => navigate('/schedule')}
                className="shrink-0 size-[4rem] flex items-center justify-center"
                data-name="Button"
              >
                <svg className="size-[2.4rem]" fill="none" viewBox="0 0 24 24">
                  <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="flex flex-col gap-[0.4rem]">
                <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[1.6rem] leading-[2.4rem] text-white">
                  근로 시간 신청
                </p>
                <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.3rem] leading-[1.95rem] text-[rgba(255,255,255,0.8)]">
                  2026년 1월
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Success Content */}
        <div className="w-full flex items-center justify-center" style={{ minHeight: 'calc(100vh - 200px)' }}>
          <div className="flex flex-col items-center gap-[24px] px-[32px]">
            <img src={successIcon} alt="success" className="w-[40px] h-[40px]" />
            <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] leading-[16px] tracking-[0.24px] text-[#09121c] text-center">
              {failedSlots.length > 0 ? '일부 일정 신청이 완료되었습니다.' : '신청이 완료되었습니다.'}
            </p>
            {failedSlots.length > 0 && (
              <div className="w-full max-w-[300px] px-[16px] py-[12px] bg-yellow-50 border border-yellow-200 rounded-[12px]">
                <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[13px] text-yellow-800 mb-[8px]">
                  ⚠ 일부 일정 신청 실패
                </p>
                {failedSlots.map((slot, index) => (
                  <p key={index} className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[11px] text-yellow-700">
                    • {slot.start.split('T')[1].slice(0, 5)} ~ {slot.end.split('T')[1].slice(0, 5)}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation activePage="calendar" />
      </div>
    );
  }

  return (
    <div className="bg-white relative min-h-screen w-full" data-name="scheduleApply">
      {/* Background Gradient */}
      <div className="absolute bg-gradient-to-b from-[#f8fbff] to-[#ffffff] inset-0 -z-10" data-name="Background" />

      {/* Header */}
      <div className="w-full bg-[#51a8ff] shadow-[0rem_0.4rem_0.6rem_-0.4rem_rgba(0,0,0,0.1)]" data-name="Container">
        <div className="max-w-[39.3rem] mx-auto px-[3.2rem] py-[2.4rem]">
          <div className="flex items-center gap-[1.6rem]">
            {/* Back Button */}
            <button
              onClick={() => navigate('/schedule')}
              className="shrink-0 size-[4rem] flex items-center justify-center"
              data-name="Button"
            >
              <svg className="size-[2.4rem]" fill="none" viewBox="0 0 24 24">
                <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="flex flex-col gap-[0.4rem]">
              <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[1.6rem] leading-[2.4rem] text-white">
                근로 시간 신청
              </p>
              <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.3rem] leading-[1.95rem] text-[rgba(255,255,255,0.8)]">
                1월
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="w-full">
        <div className="max-w-[39.3rem] mx-auto px-[2.4rem] pt-[3.2rem] pb-[3.2rem] flex flex-col gap-[2rem]">
          {/* Info Box */}
          <div className="w-full">
            <ScheduleInfoCard />
          </div>

          {/* Week Tabs */}
          <div className="flex gap-[1rem] w-full" data-name="Container">
            {[1, 2, 3, 4, 5].map((week) => {
              const isActive = selectedWeek === week;

              return (
                <button
                  key={week}
                  onClick={() => handleWeekChange(week)}
                  className={`flex-1 h-[3.6rem] rounded-[4.4rem] shadow-[0px_4px_${isActive ? '20' : '25'}px_0px_rgba(${isActive ? '81,168,255' : '5,6,24'},${isActive ? '0.07' : '0.05'})] ${isActive ? 'bg-[#51a8ff]' : 'bg-white'} transition-all duration-200`}
                  data-name="Button"
                >
                  <p className={`font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.3rem] leading-[1.2rem] tracking-[0.021rem] ${isActive ? 'text-white' : 'text-[#09121c]'}`}>
                    {week}주차
                  </p>
                </button>
              );
            })}
          </div>

          {/* Weekly Hours Card */}
          <div className="w-full">
            <WeekTotalCard
              week={selectedWeek}
              currentHours={currentWeekHours}
              maxHours={13}
            />
          </div>

          {/* Time Table */}
          <WeeklyTimeTableNew
            selectedWeek={selectedWeek}
            selectedSlots={selectedSlots}
            onSlotClick={handleSlotClick}
            slotCapacityMap={slotCapacityMap}
            maxCapacity={MAX_CAPACITY}
          />

          {/* Monthly Summary */}
          <div className="w-full">
            <MonthlyHoursCard currentHours={totalMonthHours} maxHours={27} />
          </div>

          {/* Week Summary List */}
          <div className="w-full">
            <WeeklySummaryCard weeklyHours={weeklyHours} />
          </div>

          {/* Validation Warning */}
          {validationWarning && (
            <div className="w-full px-[1.6rem] py-[1.2rem] bg-yellow-50 border border-yellow-300 rounded-[1.2rem]">
              <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.3rem] leading-[1.95rem] text-yellow-700">
                {validationWarning}
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="w-full px-[1.6rem] py-[1.2rem] bg-red-50 border border-red-200 rounded-[1.2rem]">
              <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.3rem] leading-[1.95rem] text-red-600">
                {error}
              </p>
              {failedSlots.length > 0 && (
                <div className="mt-[0.8rem]">
                  <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[1.2rem] text-red-700">
                    실패한 일정:
                  </p>
                  {failedSlots.map((slot, index) => (
                    <p key={index} className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.1rem] text-red-600">
                      • {slot.start} ~ {slot.end}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Submit Button - At bottom of page */}
          <div className="w-full bg-white py-[2rem]">
            <button
              onClick={handleSubmit}
              disabled={isSubmitDisabled}
              className={`w-full h-[5.6rem] rounded-[4.6rem] transition-all duration-200 ${
                !isSubmitDisabled
                  ? 'bg-[#51a8ff] hover:bg-[#3d8fe0]'
                  : 'bg-[#eaeaea]'
              }`}
              data-name="Button"
            >
              <p className={`font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.6rem] leading-[2.4rem] tracking-[0.024rem] ${
                !isSubmitDisabled ? 'text-white' : 'text-[#cdcdcd]'
              }`}>
                {isLoading ? '신청 중...' : '신청하기'}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
