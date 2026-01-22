// ManagerHomeEmpty.tsx - 근무자가 없을 때 UI 예시
import svgPaths from "./svg-1vkgajec0o";

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p25397b80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p18406864} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2241fff0} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2c4f400} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[23px] relative shrink-0 w-[150px]" data-name="Heading 2">
      <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[22.5px] left-0 not-italic text-[15px] text-white top-px w-[162px]">오늘 근무 학생 목록</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
        <Icon />
        <Heading />
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[#51a8ff] content-stretch flex h-[23px] items-center justify-center px-[10px] py-[2px] relative rounded-[20px] shrink-0 w-[80px]">
      <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[13.5px] not-italic relative shrink-0 text-[12px] text-center text-white">간단히 보기</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-white h-[28px] relative rounded-[29px] shrink-0 w-[166px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center px-[3px] py-[4px] relative size-full">
        <Frame2 />
        <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[13.5px] not-italic relative shrink-0 text-[#99a1af] text-[12px] text-center">자세히 보기</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex h-[22.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Frame4 />
      <Frame3 />
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[#51a8ff] h-[55.5px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#eaeaea] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[16px] px-[20px] relative size-full">
        <Container />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[rgba(220,223,226,0.2)] col-1 h-[33px] ml-0 mt-0 relative row-1 w-[1198px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#eaeaea] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[23px] relative shrink-0 w-[36px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[21px] left-0 not-italic text-[#09121c] text-[14px] top-px">오전</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex h-[21px] items-center relative shrink-0 w-full" data-name="Container">
      <Paragraph />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Container3 />
    </div>
  );
}

function Container4() {
  return (
    <div className="col-1 content-stretch flex flex-col h-[21px] items-start ml-0 mt-[5px] px-[20px] py-0 relative row-1 w-[1198px]" data-name="Container">
      <Frame />
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <Container2 />
      <Container4 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col h-[64px] items-center pb-px pt-[16px] px-[20px] relative shrink-0 w-[1198px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#eaeaea] border-b border-solid inset-0 pointer-events-none" />
      <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[30px] not-italic relative shrink-0 text-[#99a1af] text-[16px] text-center">오늘의 오전 근무자가 없습니다.</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[rgba(220,223,226,0.2)] col-1 h-[33px] ml-0 mt-0 relative row-1 w-[1198px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#eaeaea] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[23px] relative shrink-0 w-[36px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[21px] left-0 not-italic text-[#09121c] text-[14px] top-px">오후</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex h-[21px] items-center relative shrink-0 w-full" data-name="Container">
      <Paragraph1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Container7 />
    </div>
  );
}

function Container8() {
  return (
    <div className="col-1 content-stretch flex flex-col h-[21px] items-start ml-0 mt-[5px] px-[20px] py-0 relative row-1 w-[1198px]" data-name="Container">
      <Frame1 />
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <Container6 />
      <Container8 />
    </div>
  );
}

function Container9() {
  return (
    <div className="col-1 h-[64px] ml-0 mt-0 relative row-1 w-[1198px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#eaeaea] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Group2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <Container9 />
      <p className="col-1 font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[30px] ml-[599.5px] mt-[17px] not-italic relative row-1 text-[#99a1af] text-[16px] text-center translate-x-[-50%]">오늘의 오후 근무자가 없습니다.</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-[0.5px] w-[1198px]">
      <Group />
      <Container5 />
      <Group1 />
      <Group2 />
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[353px] relative shrink-0 w-full" data-name="Container">
      <Frame5 />
    </div>
  );
}

export default function ManagerHomeEmpty() {
  return (
    <div className="bg-white relative rounded-[16px] size-full" data-name="근무자가 없을 때">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container1 />
        <Container10 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#eaeaea] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)]" />
    </div>
  );
}
