function Icon() {
  return (
    <div className="relative size-[13.998px] shrink-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_53_301)" id="Icon">
          <circle
            cx="7"
            cy="7"
            r="6"
            stroke="#51A8FF"
            strokeWidth="1.16646"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.99878 4.66585V6.99878"
            stroke="#51A8FF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.16646"
          />
          <path
            d="M6.99878 9.3317H7.00461"
            stroke="#51A8FF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.16646"
          />
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
    <div className="relative h-[17.994px] w-[153.016px] shrink-0 opacity-70" data-name="Paragraph">
      <div className="relative box-border h-[17.994px] w-[153.016px] border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="absolute left-0 top-[0.63px] whitespace-pre text-nowrap font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[12px] not-italic leading-[18px] tracking-[0.18px] text-[#09121c]">
          1회 최소 2시간 · 주 최대 13시간 · 월 목표 27시간
        </p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div
      className="relative flex h-[17.994px] w-[175.008px] shrink-0 content-stretch items-center gap-[7.994px]"
      data-name="Container"
    >
      <Icon />
      <Paragraph />
    </div>
  );
}

function Container1() {
  return (
    <div
      className="relative size-[11.992px] shrink-0 rounded-[6px] bg-orange-50"
      data-name="Container"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[6px] border-[0.558px] border-solid border-[#ffd6a7]"
      />
      <div className="box-border size-[11.992px] border-0 border-solid border-[transparent] bg-clip-padding" />
    </div>
  );
}

function Text() {
  return (
    <div
      className="relative h-[14.99px] min-h-px min-w-px shrink-0 grow basis-0 opacity-60"
      data-name="Text"
    >
      <div className="relative box-border h-[14.99px] w-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="absolute left-0 top-[0.12px] whitespace-pre text-nowrap font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[10px] not-italic leading-[15px] text-[#09121c]">
          4명
        </p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="relative h-[14.99px] w-[30.18px] shrink-0" data-name="Container">
      <div className="relative box-border flex h-[14.99px] w-[30.18px] content-stretch items-center gap-[3.991px] border-0 border-solid border-[transparent] bg-clip-padding">
        <Container1 />
        <Text />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div
      className="relative size-[11.992px] shrink-0 rounded-[6px] bg-red-50 opacity-60"
      data-name="Container"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[6px] border-[0.558px] border-solid border-[#ffc9c9]"
      />
      <div className="box-border size-[11.992px] border-0 border-solid border-[transparent] bg-clip-padding" />
    </div>
  );
}

function Text1() {
  return (
    <div
      className="relative h-[14.99px] min-h-px min-w-px shrink-0 grow basis-0 opacity-60"
      data-name="Text"
    >
      <div className="relative box-border h-[14.99px] w-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="absolute left-0 top-[0.12px] whitespace-pre text-nowrap font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[10px] not-italic leading-[15px] text-[#09121c]">
          마감(5명)
        </p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative h-[14.99px] w-[53.249px] shrink-0" data-name="Container">
      <div className="relative box-border flex h-[14.99px] w-[53.249px] content-stretch items-center gap-[3.991px] border-0 border-solid border-[transparent] bg-clip-padding">
        <Container3 />
        <Text1 />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="relative h-[14.99px] w-[149.175px] shrink-0 opacity-50" data-name="Text">
      <div className="relative box-border h-[14.99px] w-[149.175px] border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="absolute left-0 top-[0.12px] whitespace-pre text-nowrap font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[10px] not-italic leading-[15px] text-[#09121c]">
          * 셀에 마우스를 올리면 신청 인원 확인
        </p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div
      className="relative flex h-[14.99px] w-[288.702px] shrink-0 content-stretch items-center gap-[11.992px]"
      data-name="Container"
    >
      <Container2 />
      <Container4 />
      <Text2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="relative h-[38px] shrink-0">
      <div className="relative box-border flex h-[38px] flex-col content-stretch items-start justify-between border-0 border-solid border-[transparent] bg-clip-padding">
        <Container />
        <Container5 />
      </div>
    </div>
  );
}

export default function ScheduleInfoCard() {
  return (
    <div
      className="relative size-full rounded-[10px] bg-[rgba(81,168,255,0.05)]"
      data-name="Container"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[10px] border-[0.542px] border-solid border-[rgba(81,168,255,0.2)]"
      />
      <div className="flex size-full flex-row items-center">
        <div className="relative box-border flex size-full content-stretch items-center justify-between py-[8px] pl-[12.541px] pr-[157.911px]">
          <Frame />
        </div>
      </div>
    </div>
  );
}
