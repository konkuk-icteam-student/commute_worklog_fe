// ManagerHomeEmpty.tsx - 근무자가 없을 때 UI 예시
import svgPaths from './svg-1vkgajec0o';

function Icon() {
  return (
    <div className="relative size-[20px] shrink-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path
            d={svgPaths.p25397b80}
            id="Vector"
            stroke="var(--stroke-0, white)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.66667"
          />
          <path
            d={svgPaths.p18406864}
            id="Vector_2"
            stroke="var(--stroke-0, white)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.66667"
          />
          <path
            d={svgPaths.p2241fff0}
            id="Vector_3"
            stroke="var(--stroke-0, white)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.66667"
          />
          <path
            d={svgPaths.p2c4f400}
            id="Vector_4"
            stroke="var(--stroke-0, white)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.66667"
          />
        </g>
      </svg>
    </div>
  );
}

function Heading() {
  return (
    <div className="relative h-[23px] w-[150px] shrink-0" data-name="Heading 2">
      <p className="absolute left-0 top-px w-[162px] font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[15px] not-italic leading-[22.5px] text-white">
        오늘 근무 학생 목록
      </p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative shrink-0">
      <div className="relative flex content-stretch items-center gap-[8px] border-0 border-solid border-[transparent] bg-clip-padding">
        <Icon />
        <Heading />
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative flex h-[23px] w-[80px] shrink-0 content-stretch items-center justify-center rounded-[20px] bg-[#51a8ff] px-[10px] py-[2px]">
      <p className="relative shrink-0 text-center font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[12px] not-italic leading-[13.5px] text-white">
        간단히 보기
      </p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative h-[28px] w-[166px] shrink-0 rounded-[29px] bg-white">
      <div className="relative flex size-full content-stretch items-center gap-[12px] border-0 border-solid border-[transparent] bg-clip-padding px-[3px] py-[4px]">
        <Frame2 />
        <p className="relative shrink-0 text-center font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[12px] not-italic leading-[13.5px] text-[#99a1af]">
          자세히 보기
        </p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div
      className="relative flex h-[22.5px] w-full shrink-0 content-stretch items-center justify-between"
      data-name="Container"
    >
      <Frame4 />
      <Frame3 />
    </div>
  );
}

function Container1() {
  return (
    <div className="relative h-[55.5px] w-full shrink-0 bg-[#51a8ff]" data-name="Container">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border-b border-solid border-[#eaeaea]"
      />
      <div className="relative flex size-full flex-col content-stretch items-start px-[20px] pb-px pt-[16px]">
        <Container />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div
      className="col-1 row-1 relative ml-0 mt-0 h-[33px] w-[1198px] bg-[rgba(220,223,226,0.2)]"
      data-name="Container"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border-b border-solid border-[#eaeaea]"
      />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="relative h-[23px] w-[36px] shrink-0" data-name="Paragraph">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="absolute left-0 top-px font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[14px] not-italic leading-[21px] text-[#09121c]">
          오전
        </p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div
      className="relative flex h-[21px] w-full shrink-0 content-stretch items-center"
      data-name="Container"
    >
      <Paragraph />
    </div>
  );
}

function Frame() {
  return (
    <div className="relative flex w-full shrink-0 flex-col content-stretch items-start">
      <Container3 />
    </div>
  );
}

function Container4() {
  return (
    <div
      className="col-1 row-1 relative ml-0 mt-[5px] flex h-[21px] w-[1198px] flex-col content-stretch items-start px-[20px] py-0"
      data-name="Container"
    >
      <Frame />
    </div>
  );
}

function Group() {
  return (
    <div className="items-[start] justify-items-[start] relative inline-grid shrink-0 grid-cols-[max-content] grid-rows-[max-content] leading-[0]">
      <Container2 />
      <Container4 />
    </div>
  );
}

function Container5() {
  return (
    <div
      className="relative flex h-[64px] w-[1198px] shrink-0 flex-col content-stretch items-center px-[20px] pb-px pt-[16px]"
      data-name="Container"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border-b border-solid border-[#eaeaea]"
      />
      <p className="relative shrink-0 text-center font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[16px] not-italic leading-[30px] text-[#99a1af]">
        오늘의 오전 근무자가 없습니다.
      </p>
    </div>
  );
}

function Container6() {
  return (
    <div
      className="col-1 row-1 relative ml-0 mt-0 h-[33px] w-[1198px] bg-[rgba(220,223,226,0.2)]"
      data-name="Container"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border-b border-solid border-[#eaeaea]"
      />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="relative h-[23px] w-[36px] shrink-0" data-name="Paragraph">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="absolute left-0 top-px font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[14px] not-italic leading-[21px] text-[#09121c]">
          오후
        </p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div
      className="relative flex h-[21px] w-full shrink-0 content-stretch items-center"
      data-name="Container"
    >
      <Paragraph1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative flex w-full shrink-0 flex-col content-stretch items-start">
      <Container7 />
    </div>
  );
}

function Container8() {
  return (
    <div
      className="col-1 row-1 relative ml-0 mt-[5px] flex h-[21px] w-[1198px] flex-col content-stretch items-start px-[20px] py-0"
      data-name="Container"
    >
      <Frame1 />
    </div>
  );
}

function Group1() {
  return (
    <div className="items-[start] justify-items-[start] relative inline-grid shrink-0 grid-cols-[max-content] grid-rows-[max-content] leading-[0]">
      <Container6 />
      <Container8 />
    </div>
  );
}

function Container9() {
  return (
    <div className="col-1 row-1 relative ml-0 mt-0 h-[64px] w-[1198px]" data-name="Container">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border-b border-solid border-[#eaeaea]"
      />
    </div>
  );
}

function Group2() {
  return (
    <div className="items-[start] justify-items-[start] relative inline-grid shrink-0 grid-cols-[max-content] grid-rows-[max-content] leading-[0]">
      <Container9 />
      <p className="col-1 row-1 relative ml-[599.5px] mt-[17px] translate-x-[-50%] text-center font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[16px] not-italic leading-[30px] text-[#99a1af]">
        오늘의 오후 근무자가 없습니다.
      </p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute left-0 top-[0.5px] flex w-[1198px] flex-col content-stretch items-start">
      <Group />
      <Container5 />
      <Group1 />
      <Group2 />
    </div>
  );
}

function Container10() {
  return (
    <div className="relative h-[353px] w-full shrink-0" data-name="Container">
      <Frame5 />
    </div>
  );
}

export default function ManagerHomeEmpty() {
  return (
    <div className="relative size-full rounded-[16px] bg-white" data-name="근무자가 없을 때">
      <div className="relative flex size-full flex-col content-stretch items-start overflow-clip rounded-[inherit] p-px">
        <Container1 />
        <Container10 />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[16px] border border-solid border-[#eaeaea] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)]"
      />
    </div>
  );
}
