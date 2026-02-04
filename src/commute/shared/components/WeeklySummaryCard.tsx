import monthlyScheduleDates from '../../constants/monthlyScheduleDates.json';

interface WeeklySummaryCardProps {
  weeklyHours?: Record<number, number>; // { 1: 3.5, 2: 0, 3: 2, ... }
}

export default function WeeklySummaryCard({ weeklyHours = {} }: WeeklySummaryCardProps) {
  // TODO: 현재는 2026년 2월 하드코딩, 나중에 동적으로 year/month 받아오기
  const year = '2026';
  const month = '2';

  const monthData = monthlyScheduleDates[year as keyof typeof monthlyScheduleDates]?.[month as keyof typeof monthlyScheduleDates['2026']];

  const weeklyData = monthData?.weeks.map(weekInfo => {
    const hours = weeklyHours[weekInfo.week] || 0;
    return {
      week: weekInfo.week,
      hours,
      status: hours > 0 ? '신청' : '미신청',
      dateRange: weekInfo.dateRange
    };
  }) || [];

  return (
    <div className="bg-white relative rounded-[16px] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)] size-full p-[16px]" data-name="WeeklySummaryCard">
      <div className="flex flex-col gap-[12px]">
        {/* Header */}
        <div className="pb-[8px] border-b border-[#eaeaea]">
          <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[14px] text-[#09121c]">
            주차별 요약
          </p>
        </div>

        {/* Week List */}
        <div className="flex flex-col gap-[8px]">
          {weeklyData.map((data) => (
            <div
              key={data.week}
              className="flex items-center justify-between py-[6px]"
            >
              <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[13px] text-[#09121c]">
                {data.week}주차 ({data.dateRange})
              </p>
              <span
                className={`font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[12px] ${
                  data.hours > 0 ? 'text-[#51a8ff]' : 'text-[#9ca3af]'
                }`}
              >
                {data.hours}h
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
