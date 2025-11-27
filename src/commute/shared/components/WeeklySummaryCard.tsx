export default function WeeklySummaryCard() {
  const weeklyData = [
    { week: 1, hours: 0, status: '미신청' },
    { week: 2, hours: 0, status: '미신청' },
    { week: 3, hours: 0, status: '미신청' },
    { week: 4, hours: 0, status: '미신청' },
    { week: 5, hours: 0, status: '미신청' },
  ];

  return (
    <div className="bg-white relative rounded-[16px] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)] size-full p-[16px]" data-name="WeeklySummaryCard">
      <div className="flex flex-col gap-[12px]">
        {/* Header */}
        <div className="pb-[8px] border-b border-[#eaeaea]">
          <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[14px] text-[#09121c]">
            주차별 신청 현황
          </p>
        </div>

        {/* Week List */}
        <div className="flex flex-col gap-[8px]">
          {weeklyData.map((data) => (
            <div
              key={data.week}
              className="flex items-center justify-between py-[6px]"
            >
              <div className="flex items-center gap-[8px]">
                <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[13px] text-[#09121c]">
                  {data.week}주차
                </p>
                <span
                  className={`font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[12px] ${
                    data.hours > 0 ? 'text-[#51a8ff]' : 'text-[#9ca3af]'
                  }`}
                >
                  {data.hours}h
                </span>
              </div>
              <div>
                <span
                  className={`font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[11px] px-[8px] py-[4px] rounded-[12px] ${
                    data.hours > 0
                      ? 'bg-[#e8f4ff] text-[#51a8ff]'
                      : 'bg-[#f5f5f5] text-[#9ca3af]'
                  }`}
                >
                  {data.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
