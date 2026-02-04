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
    <div className="relative w-full bg-white rounded-[10px] border-[0.542px] border-solid border-[#EAEAEA] px-[16px] py-[12px] flex items-center justify-between">
      <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[18px] not-italic text-[#09121c] text-[12px] tracking-[0.21px]">
        {week}주차 총 시간
      </p>
      <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[18px] not-italic text-[#51a8ff] text-[12px] tracking-[0.21px]">
        {currentHours} / {maxHours}h
      </p>
    </div>
  );
}
