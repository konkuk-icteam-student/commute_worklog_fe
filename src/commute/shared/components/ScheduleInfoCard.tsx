function Icon() {
  return (
    <div className="relative shrink-0 size-[13.998px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_53_301)" id="Icon">
          <circle cx="7" cy="7" r="6" stroke="#51A8FF" strokeWidth="1.16646" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6.99878 4.66585V6.99878" stroke="#51A8FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16646" />
          <path d="M6.99878 9.3317H7.00461" stroke="#51A8FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16646" />
        </g>
        <defs>
          <clipPath id="clip0_53_301">
            <rect fill="white" height="13.9976" width="13.9976" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[17.994px] opacity-70 relative shrink-0 w-[153.016px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[17.994px] relative w-[153.016px]">
        <p className="absolute font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[18px] left-0 not-italic text-[#09121c] text-[12px] text-nowrap top-[0.63px] tracking-[0.18px] whitespace-pre">1회 최소 2시간 · 주 최대 13시간 · 월 목표 27시간</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[7.994px] h-[17.994px] items-center relative shrink-0 w-[175.008px]" data-name="Container">
      <Icon />
      <Paragraph />
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-orange-50 relative rounded-[6px] shrink-0 size-[11.992px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#ffd6a7] border-[0.558px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[11.992px]" />
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 grow h-[14.99px] min-h-px min-w-px opacity-60 relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14.99px] relative w-full">
        <p className="absolute font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[15px] left-0 not-italic text-[#09121c] text-[10px] text-nowrap top-[0.12px] whitespace-pre">4명</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[14.99px] relative shrink-0 w-[30.18px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[3.991px] h-[14.99px] items-center relative w-[30.18px]">
        <Container1 />
        <Text />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-red-50 opacity-60 relative rounded-[6px] shrink-0 size-[11.992px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#ffc9c9] border-[0.558px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[11.992px]" />
    </div>
  );
}

function Text1() {
  return (
    <div className="basis-0 grow h-[14.99px] min-h-px min-w-px opacity-60 relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14.99px] relative w-full">
        <p className="absolute font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[15px] left-0 not-italic text-[#09121c] text-[10px] text-nowrap top-[0.12px] whitespace-pre">마감(5명)</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[14.99px] relative shrink-0 w-[53.249px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[3.991px] h-[14.99px] items-center relative w-[53.249px]">
        <Container3 />
        <Text1 />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[14.99px] opacity-50 relative shrink-0 w-[149.175px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14.99px] relative w-[149.175px]">
        <p className="absolute font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[15px] left-0 not-italic text-[#09121c] text-[10px] text-nowrap top-[0.12px] whitespace-pre">* 셀에 마우스를 올리면 신청 인원 확인</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex gap-[11.992px] h-[14.99px] items-center relative shrink-0 w-[288.702px]" data-name="Container">
      <Container2 />
      <Container4 />
      <Text2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="h-[38px] relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[38px] items-start justify-between relative">
        <Container />
        <Container5 />
      </div>
    </div>
  );
}

export default function ScheduleInfoCard() {
  return (
    <div className="bg-[rgba(81,168,255,0.05)] relative rounded-[10px] size-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.542px] border-[rgba(81,168,255,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between pl-[12.541px] pr-[157.911px] py-[8px] relative size-full">
          <Frame />
        </div>
      </div>
    </div>
  );
}
