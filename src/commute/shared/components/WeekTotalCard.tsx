export default function WeekTotalCard({
  week = 1,
  currentHours = 0,
  maxHours = 13
}: {
  week?: number;
  currentHours?: number;
  maxHours?: number;
}) {
  return (
    <div className="relative w-full">
      <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[18px] not-italic text-[#09121c] text-[12px] tracking-[0.21px]">
        {week}주차 총 시간 <span className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[#51a8ff]">{currentHours} / {maxHours}h</span>
      </p>
    </div>
  );
}
