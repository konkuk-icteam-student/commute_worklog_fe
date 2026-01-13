import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScheduleInfoCard from '../shared/components/ScheduleInfoCard';
import WeekTotalCard from '../shared/components/WeekTotalCard';
import WeeklyTimeTableNew from '../shared/components/WeeklyTimeTableNew';
import MonthlyHoursCard from '../shared/components/MonthlyHoursCard';
import WeeklySummaryCard from '../shared/components/WeeklySummaryCard';
import BottomNavigation from '../shared/components/BottomNavigation';
import successIcon from '../shared/assets/success.svg';
import { applyWorkSchedule } from '../shared/apis/schedule.api';
import { convertSlotsToTimeSlots } from '../shared/utils/scheduleUtils';
import type { TimeSlot } from '../shared/types/schedule.types';

export default function ScheduleApplyPage() {
  const navigate = useNavigate();
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [failedSlots, setFailedSlots] = useState<TimeSlot[]>([]);

  // Mock data for slot capacity (in real app, this would come from backend)
  // dayIndex: 0=월, 1=화, 2=수, 3=목, 4=금
  const slotCapacity: Record<string, { current: number; max: number }> = {
    // 월요일 - 선택된 슬롯들
    '0-10:00': { current: 1, max: 5 },
    '0-10:30': { current: 1, max: 5 },
    '0-11:00': { current: 1, max: 5 },

    // 화요일 - 마감된 슬롯 (핑크색)
    '1-09:00': { current: 5, max: 5 },
    '1-09:30': { current: 5, max: 5 },
    '1-14:00': { current: 5, max: 5 },

    // 수요일 - 부분 신청 슬롯 (주황색 4명)
    '2-10:00': { current: 4, max: 5 },
    '2-10:30': { current: 4, max: 5 },

    // 목요일 - 마감된 슬롯 (핑크색)
    '3-09:00': { current: 5, max: 5 },
    '3-09:30': { current: 5, max: 5 },
    '3-10:00': { current: 5, max: 5 },
    '3-10:30': { current: 5, max: 5 },

    // 금요일 - 일부 슬롯들
    '4-14:00': { current: 2, max: 5 },
  };

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
    // Mock calculation - in real app, this would calculate from selectedSlots
    const weekHours: Record<number, number> = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    return weekHours[week] || 0;
  };

  const currentWeekHours = calculateWeekHours(selectedWeek);
  const totalMonthHours = 0; // Sum of all weeks

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

      console.log('신청할 일정:', timeSlots);

      // API 호출
      const response = await applyWorkSchedule({ slots: timeSlots });

      if (response.isSuccess) {
        // 부분 실패가 있는 경우 (207 Multi-Status)
        if (response.details?.failure && response.details.failure.length > 0) {
          setFailedSlots(response.details.failure);
          setError(`일부 일정 신청에 실패했습니다. (성공: ${response.details.success.length}개, 실패: ${response.details.failure.length}개)`);
        }

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
    } catch (err: any) {
      console.error('일정 신청 에러:', err);

      // axios 에러에서 response.data 추출
      if (err.response && err.response.data) {
        const errorData = err.response.data;
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
                10월
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

          {/* Time Table */}
          <WeeklyTimeTableNew
            selectedWeek={selectedWeek}
            selectedSlots={selectedSlots}
            onSlotClick={handleSlotClick}
            slotCapacity={slotCapacity}
          />

          {/* Monthly Summary */}
          <div className="w-full">
            <MonthlyHoursCard currentHours={totalMonthHours} maxHours={27} />
          </div>

          {/* Week Summary List */}
          <div className="w-full">
            <WeeklySummaryCard />
          </div>

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
              disabled={selectedSlots.length === 0 || isLoading}
              className={`w-full h-[5.6rem] rounded-[4.6rem] transition-all duration-200 ${
                selectedSlots.length > 0 && !isLoading
                  ? 'bg-[#51a8ff] hover:bg-[#3d8fe0]'
                  : 'bg-[#eaeaea]'
              }`}
              data-name="Button"
            >
              <p className={`font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.6rem] leading-[2.4rem] tracking-[0.024rem] ${
                selectedSlots.length > 0 && !isLoading ? 'text-white' : 'text-[#cdcdcd]'
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
