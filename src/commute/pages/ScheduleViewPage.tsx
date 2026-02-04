import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ScheduleInfoCard from '../shared/components/ScheduleInfoCard';
import WeekTotalCard from '../shared/components/WeekTotalCard';
import WeeklyTimeTableNew from '../shared/components/WeeklyTimeTableNew';
import MonthlyHoursCard from '../shared/components/MonthlyHoursCard';
import WeeklySummaryCard from '../shared/components/WeeklySummaryCard';
import BottomNavigation from '../shared/components/BottomNavigation';
import { getMySchedules, getAllScheduleHistory } from '../shared/apis/schedule.api';
import { convertSchedulesToSlots } from '../shared/utils/scheduleUtils';
import type { WorkSchedule, ScheduleHistoryItem, ScheduleUpdateItem } from '../shared/types/schedule.types';
import { useScheduleWebSocket } from '../hooks/useScheduleWebSocket';

export default function ScheduleViewPage() {
  const navigate = useNavigate();
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [allSchedules, setAllSchedules] = useState<WorkSchedule[]>([]); // 전체 월의 스케줄
  const [slotCapacityMap, setSlotCapacityMap] = useState<Map<string, number>>(new Map()); // 슬롯별 신청 인원수
  const [isLoadingCapacity, setIsLoadingCapacity] = useState(false);

  // 현재 연도/월
  const currentYear = 2026;
  const currentMonth = 2;
  const MAX_CAPACITY = 5; // 최대 신청 가능 인원수

  /**
   * API 응답을 슬롯별 신청 인원수로 변환
   * @param histories 전체 스케줄 히스토리 배열
   * @returns Map<슬롯키, 신청인원수>
   */
  const processScheduleHistoryToCapacity = (histories: ScheduleHistoryItem[]): Map<string, number> => {
    const capacityMap = new Map<string, number>();

    histories.forEach((history) => {
      // start + end를 key로 사용
      const slotKey = `${history.start}_${history.end}`;

      // 기존 카운트에 +1
      const currentCount = capacityMap.get(slotKey) || 0;
      capacityMap.set(slotKey, currentCount + 1);
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

  // 내 스케줄 조회 함수
  const fetchMySchedules = useCallback(async () => {
    try {
      const response = await getMySchedules(currentYear, currentMonth);

      if (response.isSuccess && response.details?.schedules) {
        // 전체 스케줄 저장
        setAllSchedules(response.details.schedules);

        // 현재 주차의 슬롯만 selectedSlots에 저장
        const slots = convertSchedulesToSlots(
          response.details.schedules,
          selectedWeek,
          currentYear,
          currentMonth
        );
        setSelectedSlots(slots);
      } else {
        setAllSchedules([]);
        setSelectedSlots([]);
      }
    } catch (err) {
      console.error('스케줄 조회 에러:', err);
      setAllSchedules([]);
      setSelectedSlots([]);
    }
  }, [selectedWeek, currentYear, currentMonth]);

  // 1단계: 페이지 로드 시 전체 슬롯 인원수 조회 (한 번만 실행)
  useEffect(() => {
    fetchAllScheduleCapacity();
  }, [fetchAllScheduleCapacity]);

  // 2단계: 전체 슬롯 인원수 로드 완료 후, 주차 변경 시마다 내 스케줄 조회
  useEffect(() => {
    if (!isLoadingCapacity) {
      fetchMySchedules();
    }
  }, [isLoadingCapacity, fetchMySchedules]);

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
      // 다른 주차는 API에서 가져온 데이터만 사용
      const weekSlots = convertSchedulesToSlots(allSchedules, week, currentYear, currentMonth);
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

  return (
    <div className="bg-white relative min-h-screen w-full" data-name="scheduleView">
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
                근로 시간 조회
              </p>
              <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.3rem] leading-[1.95rem] text-[rgba(255,255,255,0.8)]">
                2월
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
                  onClick={() => setSelectedWeek(week)}
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

          {/* Time Table Label */}
          <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[1.4rem] text-[#09121c]">
            시간표
          </p>

          {/* Time Table */}
          <WeeklyTimeTableNew
            selectedWeek={selectedWeek}
            selectedSlots={selectedSlots}
            onSlotClick={handleSlotClick}
            slotCapacityMap={slotCapacityMap}
            maxCapacity={MAX_CAPACITY}
            readOnly={true}
          />

          {/* Monthly Summary */}
          <div className="w-full">
            <MonthlyHoursCard currentHours={totalMonthHours} maxHours={27} />
          </div>

          {/* Week Summary List */}
          <div className="w-full">
            <WeeklySummaryCard weeklyHours={weeklyHours} />
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activePage="calendar" />
    </div>
  );
}
