import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScheduleInfoCard from '../shared/components/ScheduleInfoCard';
import WeekTotalCard from '../shared/components/WeekTotalCard';
import WeeklyTimeTableNew from '../shared/components/WeeklyTimeTableNew';
import MonthlyHoursCard from '../shared/components/MonthlyHoursCard';
import WeeklySummaryCard from '../shared/components/WeeklySummaryCard';

export default function ScheduleApplyPage() {
  const navigate = useNavigate();
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

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
      <div className="w-full pb-[12rem]">
        <div className="max-w-[39.3rem] mx-auto px-[2.4rem] pt-[3.2rem] flex flex-col gap-[2rem]">
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
        </div>
      </div>

      {/* Submit Button - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white py-[2rem] px-[2rem] shadow-[0px_-4px_20px_0px_rgba(0,0,0,0.05)]">
        <div className="max-w-[39.3rem] mx-auto">
          <button
            onClick={() => {
              console.log('신청하기:', selectedSlots);
              // Handle submit logic here
            }}
            disabled={selectedSlots.length === 0}
            className={`w-full h-[5.6rem] rounded-[4.6rem] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)] transition-all duration-200 ${
              selectedSlots.length > 0
                ? 'bg-[#51a8ff] hover:bg-[#3d8fe0]'
                : 'bg-[#eaeaea]'
            }`}
            data-name="Button"
          >
            <p className={`font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.6rem] leading-[2.4rem] tracking-[0.024rem] ${
              selectedSlots.length > 0 ? 'text-white' : 'text-[#cdcdcd]'
            }`}>
              신청하기
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
