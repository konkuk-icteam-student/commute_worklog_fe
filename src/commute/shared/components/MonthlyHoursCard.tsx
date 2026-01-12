export default function MonthlyHoursCard({
  currentHours = 0,
  maxHours = 27
}: {
  currentHours?: number;
  maxHours?: number;
}) {
  const progress = maxHours > 0 ? (currentHours / maxHours) * 100 : 0;
  const progressWidth = `${Math.min(progress, 100)}%`;

  return (
    <div className="bg-white relative rounded-[16px] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)] size-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[7.994px] items-start overflow-clip pb-0 pt-[11.999px] px-[15.996px] relative size-full">
          {/* Top Row - Label and Hours */}
          <div className="content-stretch flex h-[17.994px] items-center justify-between relative shrink-0 w-full" data-name="Container">
            <div className="h-[17.994px] relative shrink-0" data-name="Paragraph">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[17.994px] relative">
                <p className="absolute font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[18px] left-0 not-italic text-[#09121c] text-[12px] text-nowrap top-[0.63px] tracking-[0.21px] whitespace-pre">
                  1월 전체
                </p>
              </div>
            </div>
            <div className="h-[17.994px] relative shrink-0" data-name="Paragraph">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[17.994px] relative">
                <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[18px] right-0 not-italic text-[#51a8ff] text-[12px] text-nowrap top-[0.63px] tracking-[0.21px] whitespace-pre">
                  {currentHours} / {maxHours}h
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-[#eaeaea] h-[5.995px] relative rounded-[1.81848e+07px] shrink-0 w-full" data-name="Container">
            <div className="overflow-clip rounded-[inherit] size-full">
              <div className="box-border content-stretch flex flex-col h-[5.995px] items-start py-0 relative w-full" style={{ paddingLeft: 0, paddingRight: progress > 0 ? `calc(100% - ${progressWidth})` : '100%' }}>
                <div className="bg-[#51a8ff] h-[5.995px] rounded-[1.81848e+07px] shrink-0 w-full" data-name="Container" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
