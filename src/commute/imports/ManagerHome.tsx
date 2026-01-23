//ManagerHome.tsx
import svgPaths from './svg-t1qecyan8p';
import TodayWorkStudentList from '../admin/components/TodayWorkStudentList';

type ManagerHomeProps = {
  onNavigate: (page: 'home' | 'qr' | 'task') => void;
  currentPage: 'home' | 'qr' | 'task';
};

function Paragraph() {
  return (
    <div className="relative h-[18px] w-[151px] shrink-0" data-name="Paragraph">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="absolute left-0 top-[0.5px] text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[14px] not-italic leading-[18px] text-white">
          현재 근무 중
        </p>
      </div>
    </div>
  );
}

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
            d={svgPaths.p18e6a68}
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

function Container() {
  return (
    <div
      className="relative flex h-[20px] w-full shrink-0 content-stretch items-center justify-between"
      data-name="Container"
    >
      <Paragraph />
      <Icon />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="relative h-[42px] w-full shrink-0" data-name="Paragraph">
      <p className="absolute left-0 top-0 h-[42px] w-[58px] text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[28px] not-italic leading-[42px] text-white">
        2명
      </p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="relative h-[15px] w-full shrink-0" data-name="Paragraph">
      <p className="absolute left-0 top-0 w-[117px] text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[14px] not-italic leading-[15px] text-white">
        전체 3명
      </p>
    </div>
  );
}

function Container1() {
  return (
    <div
      className="relative col-[1] row-[1] shrink-0 self-stretch rounded-[16px] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.3)]"
      data-name="Container"
      style={{
        backgroundImage:
          'linear-gradient(166.793deg, rgb(123, 190, 253) 4.2403%, rgb(81, 168, 255) 78.689%)',
      }}
    >
      <div className="relative flex size-full flex-col content-stretch items-start gap-[8px] px-[20px] pb-0 pt-[14px]">
        <Container />
        <Paragraph1 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="relative h-[18px] w-[44.68px] shrink-0" data-name="Paragraph">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="absolute left-0 top-[0.5px] text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[14px] not-italic leading-[18px] text-[#09121c]">
          미출근자
        </p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div
      className="relative flex h-[20px] shrink-0 content-stretch items-center"
      data-name="Container"
    >
      <Paragraph3 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="relative h-[42px] w-full shrink-0" data-name="Paragraph">
      <p className="absolute left-0 top-0 w-[107px] text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[28px] not-italic leading-[42px] text-[#09121c]">
        1명
      </p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="relative h-[15px] w-full shrink-0" data-name="Paragraph">
      <p className="absolute left-0 top-[0.5px] text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[14px] not-italic leading-[15px] text-[#51a8ff]">
        박길동
      </p>
    </div>
  );
}

function Container3() {
  return (
    <div
      className="relative col-[2] row-[1] shrink-0 self-stretch rounded-[16px] bg-white"
      data-name="Container"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[16px] border border-solid border-[#eaeaea] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)]"
      />
      <div className="relative flex size-full flex-col content-stretch items-start gap-[8px] px-[21px] pb-px pt-[14px]">
        <Container2 />
        <Paragraph4 />
        <Paragraph5 />
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="relative h-[18px] w-[65px] shrink-0" data-name="Paragraph">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="absolute left-0 top-[0.5px] text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[14px] not-italic leading-[18px] text-[#09121c]">
          오늘의 업무
        </p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div
      className="relative flex h-[20px] w-full shrink-0 content-stretch items-center justify-between"
      data-name="Container"
    >
      <Paragraph6 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="relative h-[42px] w-full shrink-0" data-name="Paragraph">
      <p className="absolute left-0 top-0 w-[103px] text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[28px] not-italic leading-[42px] text-[#09121c]">
        1/6
      </p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="relative h-[15px] w-full shrink-0" data-name="Paragraph">
      <p className="absolute left-0 top-[0.5px] text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[14px] not-italic leading-[15px] text-[#51a8ff]">
        미완료
      </p>
    </div>
  );
}

function Container5() {
  return (
    <div
      className="relative col-[3] row-[1] shrink-0 self-stretch rounded-[16px] bg-white"
      data-name="Container"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[16px] border border-solid border-[#eaeaea] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)]"
      />
      <div className="relative flex size-full flex-col content-stretch items-start gap-[8px] px-[21px] pb-px pt-[14px]">
        <Container4 />
        <Paragraph7 />
        <Paragraph8 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div
      className="relative grid h-[123px] w-full shrink-0 grid-cols-[repeat(3,_minmax(0,_1fr))] grid-rows-[repeat(1,_minmax(0,_1fr))] gap-[16px]"
      data-name="Container"
    >
      <Container1 />
      <Container3 />
      <Container5 />
    </div>
  );
}

function Icon1() {
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
      <p className="absolute left-0 top-px w-[162px] text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[15px] not-italic leading-[22.5px] text-white">
        오늘 근무 학생 목록
      </p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative shrink-0">
      <div className="relative flex content-stretch items-center gap-[8px] border-0 border-solid border-[transparent] bg-clip-padding">
        <Icon1 />
        <Heading />
      </div>
    </div>
  );
}

function Frame4() {
  return <div className="h-[23px] w-[80px] shrink-0 rounded-[20px] bg-[#51a8ff]" />;
}

function Frame5() {
  return (
    <div className="relative h-[28px] w-[166px] shrink-0 rounded-[29px] bg-[rgba(255,255,255,0)]">
      <div className="relative flex size-full content-stretch items-center gap-[12px] border-0 border-solid border-[transparent] bg-clip-padding px-[3px] py-[4px]">
        <Frame4 />
        <p className="relative shrink-0 text-nowrap text-center font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[12px] not-italic leading-[13.5px] text-[rgba(153,161,175,0)]">
          자세히 보기
        </p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div
      className="relative flex h-[22.5px] w-full shrink-0 content-stretch items-center justify-between"
      data-name="Container"
    >
      <Frame6 />
      <Frame5 />
    </div>
  );
}

function Container8() {
  return (
    <div className="relative h-[55.5px] w-full shrink-0 bg-[#51a8ff]" data-name="Container">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border-b border-solid border-[#eaeaea]"
      />
      <div className="relative flex size-full flex-col content-stretch items-start px-[20px] pb-px pt-[16px]">
        <Container7 />
      </div>
    </div>
  );
}

function Container9() {
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

function Paragraph9() {
  return (
    <div className="relative h-[23px] w-[36px] shrink-0" data-name="Paragraph">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="absolute left-0 top-px text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[14px] not-italic leading-[21px] text-[#09121c]">
          오전
        </p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div
      className="relative flex h-[21px] w-full shrink-0 content-stretch items-center"
      data-name="Container"
    >
      <Paragraph9 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative flex w-full shrink-0 flex-col content-stretch items-start">
      <Container10 />
    </div>
  );
}

function Container11() {
  return (
    <div
      className="col-1 row-1 relative ml-0 mt-[5px] flex h-[21px] w-[1198px] flex-col content-stretch items-start px-[20px] py-0"
      data-name="Container"
    >
      <Frame2 />
    </div>
  );
}

function Group3() {
  return (
    <div className="items-[start] justify-items-[start] relative inline-grid shrink-0 grid-cols-[max-content] grid-rows-[max-content]">
      <Container9 />
      <Container11 />
    </div>
  );
}

function Container12() {
  return (
    <div className="col-1 row-1 relative ml-0 mt-0 h-[64px] w-[1198px]" data-name="Container">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border-b border-solid border-[#eaeaea]"
      />
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="relative h-[23px] w-[36px] shrink-0" data-name="Paragraph">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="absolute left-0 top-px text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[14px] not-italic leading-[21px] text-[#09121c]">
          김길동
        </p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div
      className="size-[8px] shrink-0 rounded-[16777200px] bg-[#00c950] opacity-90"
      data-name="Container"
    />
  );
}

function Text() {
  return (
    <div className="relative h-[14.5px] min-h-px min-w-px flex-[1_0_0]" data-name="Text">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="absolute left-0 top-[0.5px] text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[9px] not-italic leading-[13.5px] text-[#008236]">
          근무중
        </p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div
      className="relative h-[17.5px] w-[51.359px] shrink-0 rounded-[10px] bg-[#dcfce7]"
      data-name="Container"
    >
      <div className="relative flex size-full content-stretch items-center gap-[4px] border-0 border-solid border-[transparent] bg-clip-padding px-[8px] py-0">
        <Container13 />
        <Text />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div
      className="relative flex h-[21px] w-full shrink-0 content-stretch items-center gap-[8px]"
      data-name="Container"
    >
      <Paragraph10 />
      <Container14 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="relative flex w-full shrink-0 flex-col content-stretch items-start">
      <Container15 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative flex shrink-0 flex-col content-stretch items-start">
      <p className="relative w-[202px] shrink-0 text-nowrap font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[0px] text-[12px] not-italic leading-[0] text-[#09121c]">
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
    <div
      className="col-1 row-1 relative ml-0 mt-[9px] flex h-[46px] w-[1198px] flex-col content-stretch items-start gap-[8px] px-[20px] py-0"
      data-name="Container"
    >
      <Frame8 />
      <Frame3 />
    </div>
  );
}

function Group() {
  return (
    <div className="items-[start] justify-items-[start] relative inline-grid shrink-0 grid-cols-[max-content] grid-rows-[max-content]">
      <Container12 />
      <Container16 />
    </div>
  );
}

function Container17() {
  return (
    <div className="col-1 row-1 relative ml-0 mt-0 h-[64px] w-[1198px]" data-name="Container">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border-b border-solid border-[#eaeaea]"
      />
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="relative h-[23px] w-[36px] shrink-0" data-name="Paragraph">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="absolute left-0 top-px text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[14px] not-italic leading-[21px] text-[#09121c]">
          홍길동
        </p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div
      className="size-[8px] shrink-0 rounded-[16777200px] bg-[#00c950] opacity-90"
      data-name="Container"
    />
  );
}

function Text1() {
  return (
    <div className="relative h-[14.5px] min-h-px min-w-px flex-[1_0_0]" data-name="Text">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="absolute left-0 top-[0.5px] text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[9px] not-italic leading-[13.5px] text-[#008236]">
          근무중
        </p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div
      className="relative h-[17.5px] w-[51.359px] shrink-0 rounded-[10px] bg-[#dcfce7]"
      data-name="Container"
    >
      <div className="relative flex size-full content-stretch items-center gap-[4px] border-0 border-solid border-[transparent] bg-clip-padding px-[8px] py-0">
        <Container18 />
        <Text1 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div
      className="relative flex h-[21px] w-full shrink-0 content-stretch items-center gap-[8px]"
      data-name="Container"
    >
      <Paragraph11 />
      <Container19 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="relative flex w-full shrink-0 flex-col content-stretch items-start">
      <Container20 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="relative flex shrink-0 flex-col content-stretch items-start">
      <p className="relative w-[202px] shrink-0 text-nowrap font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[0px] text-[12px] not-italic leading-[0] text-[#09121c]">
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
    <div
      className="col-1 row-1 relative ml-0 mt-[9px] flex h-[46px] w-[1198px] flex-col content-stretch items-start gap-[8px] px-[20px] py-0"
      data-name="Container"
    >
      <Frame9 />
      <Frame10 />
    </div>
  );
}

function Group1() {
  return (
    <div className="items-[start] justify-items-[start] relative inline-grid shrink-0 grid-cols-[max-content] grid-rows-[max-content]">
      <Container17 />
      <Container21 />
    </div>
  );
}

function Container22() {
  return (
    <div className="col-1 row-1 relative ml-0 mt-0 h-[64px] w-[1198px]" data-name="Container">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border-b border-solid border-[#eaeaea]"
      />
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="relative h-[23px] w-[36px] shrink-0" data-name="Paragraph">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="absolute left-0 top-px text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[14px] not-italic leading-[21px] text-[#09121c]">
          박길동
        </p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div
      className="size-[8px] shrink-0 rounded-[16777200px] bg-[#fb2c36] opacity-90"
      data-name="Container"
    />
  );
}

function Text2() {
  return (
    <div className="relative h-[14.5px] min-h-px min-w-px flex-[1_0_0]" data-name="Text">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="absolute left-0 top-[0.5px] text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[9px] not-italic leading-[13.5px] text-[#833333]">
          미출근
        </p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div
      className="relative h-[17.5px] w-[51.359px] shrink-0 rounded-[10px] bg-[#ffebeb]"
      data-name="Container"
    >
      <div className="relative flex size-full content-stretch items-center gap-[4px] border-0 border-solid border-[transparent] bg-clip-padding px-[8px] py-0">
        <Container23 />
        <Text2 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div
      className="relative flex h-[21px] w-full shrink-0 content-stretch items-center gap-[8px]"
      data-name="Container"
    >
      <Paragraph12 />
      <Container24 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="relative flex w-full shrink-0 flex-col content-stretch items-start">
      <Container25 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="relative flex shrink-0 flex-col content-stretch items-start">
      <p className="relative w-[202px] shrink-0 text-nowrap font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[0px] text-[12px] not-italic leading-[0] text-[#09121c]">
        <span className="leading-[16.5px]">9시</span>
        <span className="leading-[16.5px]">{` ~ 11시 30분`}</span>
      </p>
    </div>
  );
}

function Container26() {
  return (
    <div
      className="col-1 row-1 relative ml-0 mt-[9px] flex h-[46px] w-[1198px] flex-col content-stretch items-start gap-[8px] px-[20px] py-0"
      data-name="Container"
    >
      <Frame11 />
      <Frame15 />
    </div>
  );
}

function Group2() {
  return (
    <div className="items-[start] justify-items-[start] relative inline-grid shrink-0 grid-cols-[max-content] grid-rows-[max-content]">
      <Container22 />
      <Container26 />
    </div>
  );
}

function Container27() {
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

function Paragraph13() {
  return (
    <div className="relative h-[23px] w-[36px] shrink-0" data-name="Paragraph">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="absolute left-0 top-px text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[14px] not-italic leading-[21px] text-[#09121c]">
          오후
        </p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div
      className="relative flex h-[21px] w-full shrink-0 content-stretch items-center"
      data-name="Container"
    >
      <Paragraph13 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="relative flex w-full shrink-0 flex-col content-stretch items-start">
      <Container28 />
    </div>
  );
}

function Container29() {
  return (
    <div
      className="col-1 row-1 relative ml-0 mt-[5px] flex h-[21px] w-[1198px] flex-col content-stretch items-start px-[20px] py-0"
      data-name="Container"
    >
      <Frame16 />
    </div>
  );
}

function Group4() {
  return (
    <div className="items-[start] justify-items-[start] relative inline-grid shrink-0 grid-cols-[max-content] grid-rows-[max-content]">
      <Container27 />
      <Container29 />
    </div>
  );
}

function Container30() {
  return (
    <div className="col-1 row-1 relative ml-0 mt-0 h-[64px] w-[1198px]" data-name="Container">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border-b border-solid border-[#eaeaea]"
      />
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="relative h-[23px] w-[36px] shrink-0" data-name="Paragraph">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="absolute left-0 top-px text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[14px] not-italic leading-[21px] text-[#09121c]">
          서길동
        </p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div
      className="relative flex h-[21px] w-full shrink-0 content-stretch items-center"
      data-name="Container"
    >
      <Paragraph14 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="relative flex w-full shrink-0 flex-col content-stretch items-start">
      <Container31 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="relative flex shrink-0 flex-col content-stretch items-start">
      <p className="relative w-[202px] shrink-0 text-nowrap font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[0px] text-[12px] not-italic leading-[0] text-[#09121c]">
        <span className="leading-[16.5px]">1시</span>
        <span className="leading-[16.5px]">{` ~ `}</span>
        <span className="leading-[16.5px]">5시 30분</span>
      </p>
    </div>
  );
}

function Container32() {
  return (
    <div
      className="col-1 row-1 relative ml-0 mt-[9px] flex h-[46px] w-[1198px] flex-col content-stretch items-start gap-[8px] px-[20px] py-0"
      data-name="Container"
    >
      <Frame17 />
      <Frame18 />
    </div>
  );
}

function Container33() {
  return (
    <div
      className="size-[8px] shrink-0 rounded-[16777200px] bg-black opacity-90"
      data-name="Container"
    />
  );
}

function Text3() {
  return (
    <div className="relative h-[14.5px] min-h-px min-w-px flex-[1_0_0]" data-name="Text">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="absolute left-0 top-[0.5px] text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[9px] not-italic leading-[13.5px] text-black">
          출근전
        </p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div
      className="col-1 row-1 relative ml-[64px] mt-[11px] flex h-[17.5px] w-[51.359px] content-stretch items-center gap-[4px] rounded-[10px] bg-[#f1f1f1] px-[8px] py-0"
      data-name="Container"
    >
      <Container33 />
      <Text3 />
    </div>
  );
}

function Group5() {
  return (
    <div className="items-[start] justify-items-[start] relative inline-grid shrink-0 grid-cols-[max-content] grid-rows-[max-content]">
      <Container30 />
      <Container32 />
      <Container34 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute left-0 top-[0.5px] flex w-[1198px] flex-col content-stretch items-start leading-[0]">
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
    <div className="relative h-[353px] w-full shrink-0" data-name="Container">
      <Frame7 />
    </div>
  );
}

function Component() {
  return (
    <div className="w-full shrink-0">
      <TodayWorkStudentList />
    </div>
  );
}

function Container36() {
  return (
    <div
      className="absolute left-1/2 top-0 flex h-[891px] w-[1200px] max-w-[calc(100%-40px)] -translate-x-1/2 flex-col content-stretch items-start gap-[24px]"
      data-name="Container"
    >
      <Container6 />
      <Component />
    </div>
  );
}

function Section() {
  return (
    <div className="absolute left-0 right-0 top-[114px] h-[784px] w-full" data-name="Section">
      <Container36 />
    </div>
  );
}

function Section1() {
  return (
    <div className="absolute left-0 right-0 top-[76px] h-[1004px] w-full" data-name="Section">
      <Section />
    </div>
  );
}

function SearchContent() {
  return (
    <div className="absolute left-0 top-[31px] h-[30px] w-[1200px]" data-name="Search content">
      <div className="absolute left-[600px] top-[14px] flex w-[1200px] translate-x-[-50%] translate-y-[-50%] flex-col justify-center text-center font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[40px] not-italic leading-[0] text-[#17191a]">
        <p className="text-nowrap leading-[1.25]">2025년 9월</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute left-0 top-0 h-[95px] w-[1200px]" data-name="Container">
      <SearchContent />
    </div>
  );
}

function SearchContainer() {
  return (
    <div
      className="absolute left-1/2 top-0 h-[95px] w-[1200px] max-w-[calc(100%-40px)] -translate-x-1/2"
      data-name="Search container"
    >
      <Container37 />
    </div>
  );
}

function Frame() {
  return (
    <div className="relative size-[40px] shrink-0" data-name="Frame">
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
    <div className="relative flex shrink-0 content-stretch items-center">
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
    <div className="relative flex shrink-0 content-stretch items-center justify-end">
      <div className="relative flex shrink-0 items-center justify-center">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute left-1/2 top-[27px] flex w-[360px] translate-x-[-50%] content-stretch items-center justify-between py-0 pl-0 pr-[2px]">
      <Frame13 />
      <Frame14 />
    </div>
  );
}

function PageHeaderSectionDesktop() {
  return (
    <div
      className="absolute left-0 right-0 top-[76px] h-[95px] w-full bg-white"
      data-name="Page-header-section-desktop"
    >
      <div className="relative mx-auto h-full max-w-[1920px]">
        <SearchContainer />
        <Frame12 />
      </div>
    </div>
  );
}

function SearchContent1() {
  return (
    <div
      className="absolute left-1/2 top-[23px] h-[30px] w-[1200px] -translate-x-1/2"
      data-name="Search content"
    >
      <div className="flex h-full w-full flex-col justify-center text-center font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[20px] not-italic leading-[0] text-white">
        <p className="text-nowrap leading-[1.25]">정보운영팀 출근부 · 관리자 홈</p>
      </div>
    </div>
  );
}

function HeaderDesktop() {
  return (
    <div
      className="absolute left-0 right-0 top-0 h-[76px] w-full bg-[#51a8ff]"
      data-name="Header-Desktop"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[0_0_-0.5px_0] border-b border-solid border-[#e8eef2]"
      />
      <div className="relative mx-auto h-full max-w-[1920px]">
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
    <div className="relative h-[23.992px] w-full shrink-0 overflow-clip" data-name="Icon">
      <div
        className="absolute bottom-[12.5%] left-[37.5%] right-[37.5%] top-1/2"
        data-name="Vector"
      >
        <div className="absolute inset-[-11.11%_-16.67%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 7.99746 10.9965"
          >
            <path
              d={svgPaths.p27b3c860}
              id="Vector"
              stroke={active ? '#51A8FF' : '#99A1AF'}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.99936"
            />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_12.5%_12.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.26%_-5.56%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 19.9937 20.9938"
          >
            <path
              d={svgPaths.p27cb6000}
              id="Vector"
              stroke={active ? '#51A8FF' : '#99A1AF'}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.99936"
            />
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
      className={`absolute left-0 top-0 flex size-[39.976px] flex-col content-stretch items-start rounded-[18715300px] px-[7.992px] pb-0 pt-[7.992px] ${active ? 'bg-[rgba(81,168,255,0.1)]' : ''}`}
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
    <div className="relative h-[23.992px] w-full shrink-0 overflow-clip" data-name="Icon">
      <div
        className="absolute bottom-3/4 left-[33.33%] right-[66.67%] top-[8.33%]"
        data-name="Vector"
      >
        <div className="absolute inset-[-25%_-1px]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 1.99936 5.9981"
          >
            <path
              d="M0.999682 0.999682V4.99841"
              id="Vector"
              stroke={active ? '#51A8FF' : '#99A1AF'}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.99936"
            />
          </svg>
        </div>
      </div>
      <div
        className="absolute bottom-3/4 left-[66.67%] right-[33.33%] top-[8.33%]"
        data-name="Vector"
      >
        <div className="absolute inset-[-25%_-1px]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 1.99936 5.9981"
          >
            <path
              d="M0.999682 0.999682V4.99841"
              id="Vector"
              stroke={active ? '#51A8FF' : '#99A1AF'}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.99936"
            />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[16.67%_12.5%_8.33%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 19.9937 19.9937"
          >
            <path
              d={svgPaths.p260a3f80}
              id="Vector"
              stroke={active ? '#51A8FF' : '#99A1AF'}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.99936"
            />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.67%_12.5%_58.33%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-1px_-5.56%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 19.9937 1.99936"
          >
            <path
              d="M0.999682 0.999682H18.994"
              id="Vector"
              stroke={active ? '#51A8FF' : '#99A1AF'}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.99936"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button1({ active }: { active: boolean }) {
  return (
    <div
      className={`absolute left-[87.97px] top-0 flex size-[39.976px] flex-col content-stretch items-start rounded-[18715300px] px-[7.992px] pb-0 pt-[7.992px] ${active ? 'bg-[rgba(81,168,255,0.1)]' : ''}`}
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
    <div className="relative h-[23.992px] w-full shrink-0 overflow-clip" data-name="Icon">
      <div className="absolute inset-[12.5%_8.33%_8.35%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5.26%_-5%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 21.993 20.9892"
          >
            <path
              d={svgPaths.p3a853f00}
              id="Vector"
              stroke={active ? '#51A8FF' : '#99A1AF'}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.99936"
            />
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
      className={`absolute left-[175.94px] top-0 flex size-[39.976px] flex-col content-stretch items-start rounded-[18715300px] px-[7.992px] pb-0 pt-[7.992px] ${active ? 'bg-[rgba(81,168,255,0.1)]' : ''}`}
      data-name="Button"
    >
      <Icon4 active={active} />
    </button>
  );
}

function Icon5() {
  return (
    <div className="relative h-[23.992px] w-full shrink-0 overflow-clip" data-name="Icon">
      <div className="absolute inset-[62.5%_20.83%_12.5%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-7.14%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 15.9949 7.99746"
          >
            <path
              d={svgPaths.p39f3b4d0}
              id="Vector"
              stroke="var(--stroke-0, #99A1AF)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.99936"
            />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_33.33%_54.17%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-12.5%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 9.99683 9.99683"
          >
            <path
              d={svgPaths.p370c1e00}
              id="Vector"
              stroke="var(--stroke-0, #99A1AF)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.99936"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div
      className="absolute left-[263.91px] top-0 flex size-[39.976px] flex-col content-stretch items-start rounded-[18715300px] px-[7.992px] pb-0 pt-[7.992px]"
      data-name="Button"
    >
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
    <div className="relative h-[39.976px] w-full shrink-0" data-name="Container">
      <Button active={currentPage === 'home'} onClick={() => onNavigate('home')} />
      <Button1 active={currentPage === 'qr'} />
      <Button2 active={currentPage === 'task'} onClick={() => onNavigate('task')} />
      <Button3 />
    </div>
  );
}

function DesktopHome({ onNavigate, currentPage }: ManagerHomeProps) {
  return (
    <div
      className="absolute left-[calc(50%-0.07px)] top-[965px] flex h-[71.96px] w-[367.869px] translate-x-[-50%] flex-col content-stretch items-start rounded-[18715300px] bg-white px-[31.993px] pb-0 pt-[15.992px] shadow-[0px_4px_30px_0px_rgba(81,168,255,0.2)]"
      data-name="DesktopHome"
    >
      <Container38 onNavigate={onNavigate} currentPage={currentPage} />
    </div>
  );
}

export default function ManagerHome({ onNavigate, currentPage }: ManagerHomeProps) {
  return (
    <div className="relative size-full bg-white" data-name="Manager_Home">
      <Section1 />
      <PageHeaderSectionDesktop />
      <HeaderDesktop />
      <DesktopHome onNavigate={onNavigate} currentPage={currentPage} />
    </div>
  );
}
