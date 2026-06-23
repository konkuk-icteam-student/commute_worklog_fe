export default function MonthlyHoursCard({
  currentHours = 0,
  maxHours = 27,
}: {
  currentHours?: number;
  maxHours?: number;
}) {
  const progress = maxHours > 0 ? (currentHours / maxHours) * 100 : 0;
  const progressWidth = `${Math.min(progress, 100)}%`;

  return (
    <div
      className="relative size-full rounded-[16px] bg-white shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)]"
      data-name="Container"
    >
      <div className="size-full">
        <div className="relative box-border flex size-full flex-col content-stretch items-start gap-[7.994px] overflow-clip px-[15.996px] pb-0 pt-[11.999px]">
          {/* Top Row - Label and Hours */}
          <div
            className="relative flex h-[17.994px] w-full shrink-0 content-stretch items-center justify-between"
            data-name="Container"
          >
            <div className="relative h-[17.994px] shrink-0" data-name="Paragraph">
              <div className="relative box-border h-[17.994px] border-0 border-solid border-[transparent] bg-clip-padding">
                <p className="absolute left-0 top-[0.63px] whitespace-pre text-nowrap font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[12px] not-italic leading-[18px] tracking-[0.21px] text-[#09121c]">
                  1월 전체
                </p>
              </div>
            </div>
            <div className="relative h-[17.994px] shrink-0" data-name="Paragraph">
              <div className="relative box-border h-[17.994px] border-0 border-solid border-[transparent] bg-clip-padding">
                <p className="absolute right-0 top-[0.63px] whitespace-pre text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[12px] not-italic leading-[18px] tracking-[0.21px] text-[#51a8ff]">
                  {currentHours} / {maxHours}h
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div
            className="relative h-[5.995px] w-full shrink-0 rounded-[1.81848e+07px] bg-[#eaeaea]"
            data-name="Container"
          >
            <div className="size-full overflow-clip rounded-[inherit]">
              <div
                className="relative box-border flex h-[5.995px] w-full flex-col content-stretch items-start py-0"
                style={{
                  paddingLeft: 0,
                  paddingRight: progress > 0 ? `calc(100% - ${progressWidth})` : '100%',
                }}
              >
                <div
                  className="h-[5.995px] w-full shrink-0 rounded-[1.81848e+07px] bg-[#51a8ff]"
                  data-name="Container"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
