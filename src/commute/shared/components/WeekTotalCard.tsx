export default function WeekTotalCard({
  week = 1,
  currentHours = 0,
  maxHours = 13,
}: {
  week?: number;
  currentHours?: number;
  maxHours?: number;
}) {
  return (
    <div className="relative flex w-full items-center justify-between rounded-[10px] border-[0.542px] border-solid border-[#EAEAEA] bg-white px-[16px] py-[12px]">
      <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[12px] not-italic leading-[18px] tracking-[0.21px] text-[#09121c]">
        {week}주차 총 시간
      </p>
      <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[12px] not-italic leading-[18px] tracking-[0.21px] text-[#51a8ff]">
        {currentHours} / {maxHours}h
      </p>
    </div>
  );
}
