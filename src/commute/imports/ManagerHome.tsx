//ManagerHome.tsx
import svgPaths from "./svg-t1qecyan8p";

type ManagerHomeProps = {
  onNavigate: (page: 'home' | 'qr' | 'task') => void;
  currentPage: 'home' | 'qr' | 'task';
};

function Paragraph() {
  return (
    <div className="h-[18px] relative shrink-0 w-[151px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[18px] left-0 not-italic text-[14px] text-nowrap text-white top-[0.5px]">현재 근무 중</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p25397b80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p18e6a68} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2241fff0} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2c4f400} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph />
      <Icon />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] h-[42px] leading-[42px] left-0 not-italic text-[28px] text-nowrap text-white top-0 w-[58px]">2명</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[15px] left-0 not-italic text-[14px] text-nowrap text-white top-0 w-[117px]">전체 3명</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="col-[1] relative rounded-[16px] row-[1] self-stretch shadow-[0px_4px_20px_0px_rgba(81,168,255,0.3)] shrink-0" data-name="Container" style={{ backgroundImage: "linear-gradient(166.793deg, rgb(123, 190, 253) 4.2403%, rgb(81, 168, 255) 78.689%)" }}>
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-0 pt-[14px] px-[20px] relative size-full">
        <Container />
        <Paragraph1 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[18px] relative shrink-0 w-[44.68px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[18px] left-0 not-italic text-[#09121c] text-[14px] text-nowrap top-[0.5px]">미출근자</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex h-[20px] items-center relative shrink-0" data-name="Container">
      <Paragraph3 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[42px] left-0 not-italic text-[#09121c] text-[28px] text-nowrap top-0 w-[107px]">1명</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[15px] left-0 not-italic text-[#51a8ff] text-[14px] text-nowrap top-[0.5px]">박길동</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-white col-[2] relative rounded-[16px] row-[1] self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#eaeaea] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-px pt-[14px] px-[21px] relative size-full">
        <Container2 />
        <Paragraph4 />
        <Paragraph5 />
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[18px] relative shrink-0 w-[65px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[18px] left-0 not-italic text-[#09121c] text-[14px] text-nowrap top-[0.5px]">오늘의 업무</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph6 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[42px] left-0 not-italic text-[#09121c] text-[28px] text-nowrap top-0 w-[103px]">1/6</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[15px] left-0 not-italic text-[#51a8ff] text-[14px] text-nowrap top-[0.5px]">미완료</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-white col-[3] relative rounded-[16px] row-[1] self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#eaeaea] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-px pt-[14px] px-[21px] relative size-full">
        <Container4 />
        <Paragraph7 />
        <Paragraph8 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(3,_minmax(0,_1fr))] grid-rows-[repeat(1,_minmax(0,_1fr))] h-[123px] relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Container3 />
      <Container5 />
    </div>
  );
}

function Icon1() {
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
      <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[22.5px] left-0 not-italic text-[15px] text-nowrap text-white top-px w-[162px]">오늘 근무 학생 목록</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
        <Icon1 />
        <Heading />
      </div>
    </div>
  );
}

function Frame4() {
  return <div className="bg-[#51a8ff] h-[23px] rounded-[20px] shrink-0 w-[80px]" />;
}

function Frame5() {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[28px] relative rounded-[29px] shrink-0 w-[166px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center px-[3px] py-[4px] relative size-full">
        <Frame4 />
        <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[13.5px] not-italic relative shrink-0 text-[12px] text-[rgba(153,161,175,0)] text-center text-nowrap">자세히 보기</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex h-[22.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Frame6 />
      <Frame5 />
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[#51a8ff] h-[55.5px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#eaeaea] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[16px] px-[20px] relative size-full">
        <Container7 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-[rgba(220,223,226,0.2)] col-1 h-[33px] ml-0 mt-0 relative row-1 w-[1198px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#eaeaea] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[23px] relative shrink-0 w-[36px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[21px] left-0 not-italic text-[#09121c] text-[14px] text-nowrap top-px">오전</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex h-[21px] items-center relative shrink-0 w-full" data-name="Container">
      <Paragraph9 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Container10 />
    </div>
  );
}

function Container11() {
  return (
    <div className="col-1 content-stretch flex flex-col h-[21px] items-start ml-0 mt-[5px] px-[20px] py-0 relative row-1 w-[1198px]" data-name="Container">
      <Frame2 />
    </div>
  );
}

function Group3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] relative shrink-0">
      <Container9 />
      <Container11 />
    </div>
  );
}

function Container12() {
  return (
    <div className="col-1 h-[64px] ml-0 mt-0 relative row-1 w-[1198px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#eaeaea] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[23px] relative shrink-0 w-[36px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[21px] left-0 not-italic text-[#09121c] text-[14px] text-nowrap top-px">김길동</p>
      </div>
    </div>
  );
}

function Container13() {
  return <div className="bg-[#00c950] opacity-90 rounded-[16777200px] shrink-0 size-[8px]" data-name="Container" />;
}

function Text() {
  return (
    <div className="flex-[1_0_0] h-[14.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[13.5px] left-0 not-italic text-[#008236] text-[9px] text-nowrap top-[0.5px]">근무중</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-[#dcfce7] h-[17.5px] relative rounded-[10px] shrink-0 w-[51.359px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center px-[8px] py-0 relative size-full">
        <Container13 />
        <Text />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[8px] h-[21px] items-center relative shrink-0 w-full" data-name="Container">
      <Paragraph10 />
      <Container14 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Container15 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[#09121c] text-[0px] text-[12px] text-nowrap w-[202px]">
        <span className="leading-[16.5px]">9시</span>
        <span className="leading-[16.5px]">{` ~ `}</span>
        <span className="leading-[16.5px]">1</span>
        <span className="leading-[16.5px]">1시</span>
      </p>
    </div>
  );
}

function Container16() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[8px] h-[46px] items-start ml-0 mt-[9px] px-[20px] py-0 relative row-1 w-[1198px]" data-name="Container">
      <Frame8 />
      <Frame3 />
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] relative shrink-0">
      <Container12 />
      <Container16 />
    </div>
  );
}

function Container17() {
  return (
    <div className="col-1 h-[64px] ml-0 mt-0 relative row-1 w-[1198px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#eaeaea] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[23px] relative shrink-0 w-[36px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[21px] left-0 not-italic text-[#09121c] text-[14px] text-nowrap top-px">홍길동</p>
      </div>
    </div>
  );
}

function Container18() {
  return <div className="bg-[#00c950] opacity-90 rounded-[16777200px] shrink-0 size-[8px]" data-name="Container" />;
}

function Text1() {
  return (
    <div className="flex-[1_0_0] h-[14.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[13.5px] left-0 not-italic text-[#008236] text-[9px] text-nowrap top-[0.5px]">근무중</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="bg-[#dcfce7] h-[17.5px] relative rounded-[10px] shrink-0 w-[51.359px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center px-[8px] py-0 relative size-full">
        <Container18 />
        <Text1 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex gap-[8px] h-[21px] items-center relative shrink-0 w-full" data-name="Container">
      <Paragraph11 />
      <Container19 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Container20 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[#09121c] text-[0px] text-[12px] text-nowrap w-[202px]">
        <span className="leading-[16.5px]">9시</span>
        <span className="leading-[16.5px]">{` ~`}</span>
        <span className="leading-[16.5px]"> </span>
        <span className="leading-[16.5px]">11시 30분</span>
      </p>
    </div>
  );
}

function Container21() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[8px] h-[46px] items-start ml-0 mt-[9px] px-[20px] py-0 relative row-1 w-[1198px]" data-name="Container">
      <Frame9 />
      <Frame10 />
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] relative shrink-0">
      <Container17 />
      <Container21 />
    </div>
  );
}

function Container22() {
  return (
    <div className="col-1 h-[64px] ml-0 mt-0 relative row-1 w-[1198px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#eaeaea] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[23px] relative shrink-0 w-[36px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[21px] left-0 not-italic text-[#09121c] text-[14px] text-nowrap top-px">박길동</p>
      </div>
    </div>
  );
}

function Container23() {
  return <div className="bg-[#fb2c36] opacity-90 rounded-[16777200px] shrink-0 size-[8px]" data-name="Container" />;
}

function Text2() {
  return (
    <div className="flex-[1_0_0] h-[14.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[13.5px] left-0 not-italic text-[#833333] text-[9px] text-nowrap top-[0.5px]">미출근</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="bg-[#ffebeb] h-[17.5px] relative rounded-[10px] shrink-0 w-[51.359px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center px-[8px] py-0 relative size-full">
        <Container23 />
        <Text2 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex gap-[8px] h-[21px] items-center relative shrink-0 w-full" data-name="Container">
      <Paragraph12 />
      <Container24 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Container25 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[#09121c] text-[0px] text-[12px] text-nowrap w-[202px]">
        <span className="leading-[16.5px]">9시</span>
        <span className="leading-[16.5px]">{` ~ 11시 30분`}</span>
      </p>
    </div>
  );
}

function Container26() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[8px] h-[46px] items-start ml-0 mt-[9px] px-[20px] py-0 relative row-1 w-[1198px]" data-name="Container">
      <Frame11 />
      <Frame15 />
    </div>
  );
}

function Group2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] relative shrink-0">
      <Container22 />
      <Container26 />
    </div>
  );
}

function Container27() {
  return (
    <div className="bg-[rgba(220,223,226,0.2)] col-1 h-[33px] ml-0 mt-0 relative row-1 w-[1198px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#eaeaea] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[23px] relative shrink-0 w-[36px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[21px] left-0 not-italic text-[#09121c] text-[14px] text-nowrap top-px">오후</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex h-[21px] items-center relative shrink-0 w-full" data-name="Container">
      <Paragraph13 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Container28 />
    </div>
  );
}

function Container29() {
  return (
    <div className="col-1 content-stretch flex flex-col h-[21px] items-start ml-0 mt-[5px] px-[20px] py-0 relative row-1 w-[1198px]" data-name="Container">
      <Frame16 />
    </div>
  );
}

function Group4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] relative shrink-0">
      <Container27 />
      <Container29 />
    </div>
  );
}

function Container30() {
  return (
    <div className="col-1 h-[64px] ml-0 mt-0 relative row-1 w-[1198px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#eaeaea] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[23px] relative shrink-0 w-[36px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[21px] left-0 not-italic text-[#09121c] text-[14px] text-nowrap top-px">서길동</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex h-[21px] items-center relative shrink-0 w-full" data-name="Container">
      <Paragraph14 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Container31 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[#09121c] text-[0px] text-[12px] text-nowrap w-[202px]">
        <span className="leading-[16.5px]">1시</span>
        <span className="leading-[16.5px]">{` ~ `}</span>
        <span className="leading-[16.5px]">5시 30분</span>
      </p>
    </div>
  );
}

function Container32() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[8px] h-[46px] items-start ml-0 mt-[9px] px-[20px] py-0 relative row-1 w-[1198px]" data-name="Container">
      <Frame17 />
      <Frame18 />
    </div>
  );
}

function Container33() {
  return <div className="bg-black opacity-90 rounded-[16777200px] shrink-0 size-[8px]" data-name="Container" />;
}

function Text3() {
  return (
    <div className="flex-[1_0_0] h-[14.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[13.5px] left-0 not-italic text-[9px] text-black text-nowrap top-[0.5px]">출근전</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="bg-[#f1f1f1] col-1 content-stretch flex gap-[4px] h-[17.5px] items-center ml-[64px] mt-[11px] px-[8px] py-0 relative rounded-[10px] row-1 w-[51.359px]" data-name="Container">
      <Container33 />
      <Text3 />
    </div>
  );
}

function Group5() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] relative shrink-0">
      <Container30 />
      <Container32 />
      <Container34 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute content-stretch flex flex-col items-start leading-[0] left-0 top-[0.5px] w-[1198px]">
      <Group3 />
      <Group />
      <Group1 />
      <Group2 />
      <Group4 />
      <Group5 />
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[353px] relative shrink-0 w-full" data-name="Container">
      <Frame7 />
    </div>
  );
}

function Component() {
  return (
    <div className="bg-white h-[410.5px] relative rounded-[16px] shrink-0 w-[1200px]" data-name="간단히 보기">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container8 />
        <Container35 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#eaeaea] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)]" />
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[891px] items-start left-1/2 -translate-x-1/2 top-0 w-[1200px] max-w-[calc(100%-40px)]" data-name="Container">
      <Container6 />
      <Component />
    </div>
  );
}

function Section() {
  return (
    <div className="absolute h-[784px] left-0 right-0 top-[114px] w-full" data-name="Section">
      <Container36 />
    </div>
  );
}

function Section1() {
  return (
    <div className="absolute h-[1004px] left-0 right-0 top-[76px] w-full" data-name="Section">
      <Section />
    </div>
  );
}

function SearchContent() {
  return (
    <div className="absolute h-[30px] left-0 top-[31px] w-[1200px]" data-name="Search content">
      <div className="absolute flex flex-col font-['LINE_Seed_Sans_KR:Bold',sans-serif] justify-center leading-[0] left-[600px] not-italic text-[#17191a] text-[40px] text-center top-[14px] translate-x-[-50%] translate-y-[-50%] w-[1200px]">
        <p className="leading-[1.25] text-nowrap">2025년 9월</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute h-[95px] left-0 top-0 w-[1200px]" data-name="Container">
      <SearchContent />
    </div>
  );
}

function SearchContainer() {
  return (
    <div className="absolute h-[95px] left-1/2 -translate-x-1/2 top-0 w-[1200px] max-w-[calc(100%-40px)]" data-name="Search container">
      <Container37 />
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Frame">
          <path d={svgPaths.p3a82b80} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame />
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative size-[40px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Frame">
          <path d={svgPaths.p3a82b80} fill="var(--fill-0, #17191A)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-1/2 pl-0 pr-[2px] py-0 top-[27px] translate-x-[-50%] w-[360px]">
      <Frame13 />
      <Frame14 />
    </div>
  );
}

function PageHeaderSectionDesktop() {
  return (
    <div className="absolute bg-white h-[95px] left-0 right-0 top-[76px] w-full" data-name="Page-header-section-desktop">
      <div className="max-w-[1920px] mx-auto relative h-full">
        <SearchContainer />
        <Frame12 />
      </div>
    </div>
  );
}

function SearchContent1() {
  return (
    <div className="absolute h-[30px] left-1/2 -translate-x-1/2 top-[23px] w-[1200px]" data-name="Search content">
      <div className="flex flex-col font-['LINE_Seed_Sans_KR:Bold',sans-serif] justify-center leading-[0] not-italic text-[20px] text-center text-white h-full w-full">
        <p className="leading-[1.25] text-nowrap">정보운영팀 출근부 · 관리자 홈</p>
      </div>
    </div>
  );
}

function HeaderDesktop() {
  return (
    <div className="absolute bg-[#51a8ff] h-[76px] left-0 right-0 top-0 w-full" data-name="Header-Desktop">
      <div aria-hidden="true" className="absolute border-[#e8eef2] border-b border-solid inset-[0_0_-0.5px_0] pointer-events-none" />
      <div className="max-w-[1920px] mx-auto relative h-full">
        <SearchContent1 />
      </div>
    </div>
  );
}

type Icon2Props = {
  active: boolean;
};

function Icon2({ active }: Icon2Props) {
  return (
    <div className="h-[23.992px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[12.5%] left-[37.5%] right-[37.5%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-11.11%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.99746 10.9965">
            <path d={svgPaths.p27b3c860} id="Vector" stroke={active ? '#51A8FF' : '#99A1AF'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99936" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_12.5%_12.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.26%_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9937 20.9938">
            <path d={svgPaths.p27cb6000} id="Vector" stroke={active ? '#51A8FF' : '#99A1AF'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99936" />
          </svg>
        </div>
      </div>
    </div>
  );
}

type ButtonProps = {
  active: boolean;
  onClick: () => void;
};

function Button({ active, onClick }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`absolute content-stretch flex flex-col items-start left-0 pb-0 pt-[7.992px] px-[7.992px] rounded-[18715300px] size-[39.976px] top-0 ${active ? 'bg-[rgba(81,168,255,0.1)]' : ''}`}
      data-name="Button"
    >
      <Icon2 active={active} />
    </button>
  );
}

type Icon3Props = {
  active: boolean;
};

function Icon3({ active }: Icon3Props) {
  return (
    <div className="h-[23.992px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-3/4 left-[33.33%] right-[66.67%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.99936 5.9981">
            <path d="M0.999682 0.999682V4.99841" id="Vector" stroke={active ? '#51A8FF' : '#99A1AF'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99936" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[66.67%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.99936 5.9981">
            <path d="M0.999682 0.999682V4.99841" id="Vector" stroke={active ? '#51A8FF' : '#99A1AF'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99936" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[16.67%_12.5%_8.33%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9937 19.9937">
            <path d={svgPaths.p260a3f80} id="Vector" stroke={active ? '#51A8FF' : '#99A1AF'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99936" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.67%_12.5%_58.33%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-1px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9937 1.99936">
            <path d="M0.999682 0.999682H18.994" id="Vector" stroke={active ? '#51A8FF' : '#99A1AF'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99936" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button1({ active }: { active: boolean }) {
  return (
    <div
      className={`absolute content-stretch flex flex-col items-start left-[87.97px] pb-0 pt-[7.992px] px-[7.992px] rounded-[18715300px] size-[39.976px] top-0 ${active ? 'bg-[rgba(81,168,255,0.1)]' : ''}`}
      data-name="Button"
    >
      <Icon3 active={active} />
    </div>
  );
}

type Icon4Props = {
  active: boolean;
};

function Icon4({ active }: Icon4Props) {
  return (
    <div className="h-[23.992px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%_8.33%_8.35%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5.26%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.993 20.9892">
            <path d={svgPaths.p3a853f00} id="Vector" stroke={active ? '#51A8FF' : '#99A1AF'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99936" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button2({ active, onClick }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`absolute content-stretch flex flex-col items-start left-[175.94px] pb-0 pt-[7.992px] px-[7.992px] rounded-[18715300px] size-[39.976px] top-0 ${active ? 'bg-[rgba(81,168,255,0.1)]' : ''}`}
      data-name="Button"
    >
      <Icon4 active={active} />
    </button>
  );
}

function Icon5() {
  return (
    <div className="h-[23.992px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[62.5%_20.83%_12.5%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9949 7.99746">
            <path d={svgPaths.p39f3b4d0} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99936" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_33.33%_54.17%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.99683 9.99683">
            <path d={svgPaths.p370c1e00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99936" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[263.91px] pb-0 pt-[7.992px] px-[7.992px] rounded-[18715300px] size-[39.976px] top-0" data-name="Button">
      <Icon5 />
    </div>
  );
}

type Container38Props = {
  onNavigate: (page: 'home' | 'qr' | 'task') => void;
  currentPage: 'home' | 'qr' | 'task';
};

function Container38({ onNavigate, currentPage }: Container38Props) {
  return (
    <div className="h-[39.976px] relative shrink-0 w-full" data-name="Container">
      <Button active={currentPage === 'home'} onClick={() => onNavigate('home')} />
      <Button1 active={currentPage === 'qr'} />
      <Button2 active={currentPage === 'task'} onClick={() => onNavigate('task')} />
      <Button3 />
    </div>
  );
}

function DesktopHome({ onNavigate, currentPage }: ManagerHomeProps) {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[71.96px] items-start left-[calc(50%-0.07px)] pb-0 pt-[15.992px] px-[31.993px] rounded-[18715300px] shadow-[0px_4px_30px_0px_rgba(81,168,255,0.2)] top-[965px] translate-x-[-50%] w-[367.869px]" data-name="DesktopHome">
      <Container38 onNavigate={onNavigate} currentPage={currentPage} />
    </div>
  );
}

export default function ManagerHome({ onNavigate, currentPage }: ManagerHomeProps) {
  return (
    <div className="bg-white relative size-full" data-name="Manager_Home">
      <Section1 />
      <PageHeaderSectionDesktop />
      <HeaderDesktop />
      <DesktopHome onNavigate={onNavigate} currentPage={currentPage} />
    </div>
  );
}