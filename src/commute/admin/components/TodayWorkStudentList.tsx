import svgPaths from "../../imports/svg-366r4er6h5";
import { useState } from "react";

function Wrapper1({ children }: React.PropsWithChildren) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[16.5px] not-italic relative shrink-0 text-[#09121c] text-[0px] text-[12px] w-[202px]">{children}</p>
    </div>
  );
}
type Container2Props = {
  additionalClassNames?: string;
};

function Container2({ children, additionalClassNames = "" }: React.PropsWithChildren<Container2Props>) {
  return (
    <div className={"relative rounded-[10px] shrink-0" + (additionalClassNames ? " " + additionalClassNames : "")}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center px-[8px] py-0 relative size-full">{children}</div>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren) {
  return (
    <div className="basis-0 grow h-[14.5px] min-h-px min-w-px relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type TextText1Props = {
  text: string;
};

function TextText1({ text }: TextText1Props) {
  return (
    <Wrapper>
      <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[13.5px] left-0 not-italic text-[#875633] text-[9px] text-nowrap top-[0.5px]">{text}</p>
    </Wrapper>
  );
}
type Helper2Props = {
  text: string;
  text1: string;
};

function Helper2({ text, text1 }: Helper2Props) {
  return (
    <div className="content-stretch flex flex-col gap-px h-[46px] items-center px-[20px] py-[5px] relative rounded-[6px] shrink-0 w-[168px]">
      <div aria-hidden="true" className="absolute border-[#51a8ff] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[16.5px] not-italic relative shrink-0 text-[#09121c] text-[11px] text-center w-[84px]">{text}</p>
      <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[16.5px] min-w-full not-italic relative shrink-0 text-[#09121c] text-[11px] text-center w-[min-content]">
        {text1}
        <span className="font-['LINE_Seed_Sans_KR:Regular',sans-serif]">{` / 27시간`}</span>
      </p>
    </div>
  );
}
type Helper1Props = {
  text: string;
  text1: string;
  additionalClassNames?: string;
};

function Helper1({ text, text1, additionalClassNames = "" }: Helper1Props) {
  return (
    <div className={"content-stretch flex flex-col gap-px h-[46px] items-center px-[20px] py-[5px] relative rounded-[6px] shrink-0" + (additionalClassNames ? " " + additionalClassNames : "")}>
      <div aria-hidden="true" className="absolute border-[#51a8ff] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[16.5px] not-italic relative shrink-0 text-[#09121c] text-[11px] text-center w-[84px]">{text}</p>
      <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[16.5px] not-italic relative shrink-0 text-[#09121c] text-[11px] text-center w-[63px]">{text1}</p>
    </div>
  );
}

function Helper() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute bg-[#eaeaea] h-[5px] left-0 rounded-[10px] top-0 w-[400px]" />
      <div className="absolute bg-[#51a8ff] h-[5px] left-0 rounded-[10px] top-0 w-[282.486px]" />
    </div>
  );
}
type TextTextProps = {
  text: string;
};

function TextText({ text }: TextTextProps) {
  return (
    <Wrapper>
      <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[13.5px] left-0 not-italic text-[#008236] text-[9px] text-nowrap top-[0.5px]">{text}</p>
    </Wrapper>
  );
}
type ParagraphTextProps = {
  text: string;
};

function ParagraphText({ text }: ParagraphTextProps) {
  return (
    <div className="h-[23px] relative shrink-0 w-[36px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[21px] left-0 not-italic text-[#09121c] text-[14px] text-nowrap top-px">{text}</p>
      </div>
    </div>
  );
}
type ContainerProps = {
  additionalClassNames?: string;
};

function Container({ additionalClassNames = "" }: ContainerProps) {
  return (
    <div className={"[grid-area:1_/_1] ml-0 mt-0 relative w-full" + (additionalClassNames ? " " + additionalClassNames : "")}>
      <div aria-hidden="true" className="absolute border-[#eaeaea] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

export default function TodayWorkStudentList() {
  const [isSimpleView, setIsSimpleView] = useState(false);
  // 근무자 데이터 - 실제로는 props나 API에서 가져올 데이터
  const [hasWorkers] = useState(true);

  // 근무자가 없을 때의 UI
  if (!hasWorkers) {
    return (
      <div className="bg-white relative rounded-[16px] w-full h-[410px]" data-name="근무자가 없을 때">
        <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
          <div className="bg-[#51a8ff] h-[55.5px] relative shrink-0 w-full" data-name="Container">
            <div aria-hidden="true" className="absolute border-[#eaeaea] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
            <div className="content-stretch flex flex-col items-start pb-px pt-[16px] px-[20px] relative size-full">
              <div className="content-stretch flex h-[22.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
                <div className="relative shrink-0">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
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
                    <div className="h-[23px] relative shrink-0 w-[150px]" data-name="Heading 2">
                      <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[22.5px] left-0 not-italic text-[15px] text-white top-px whitespace-nowrap">오늘 근무 학생 목록</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white h-[28px] relative rounded-[29px] shrink-0 w-[166px]">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center px-[3px] py-[4px] relative size-full">
                    <div className="bg-[#51a8ff] content-stretch flex h-[23px] items-center justify-center px-[10px] py-[2px] relative rounded-[20px] shrink-0 w-[80px]">
                      <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[13.5px] not-italic relative shrink-0 text-[12px] text-center text-nowrap text-white">간단히 보기</p>
                    </div>
                    <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[13.5px] not-italic relative shrink-0 text-[#99a1af] text-[12px] text-center text-nowrap">자세히 보기</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[353px] relative shrink-0 w-full overflow-y-auto overflow-x-hidden custom-scrollbar" data-name="Container">
            <div className="absolute content-stretch flex flex-col items-start left-0 top-[0.5px] w-full">
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                <Container additionalClassNames="bg-[rgba(220,223,226,0.2)] h-[33px]" />
                <div className="[grid-area:1_/_1] content-stretch flex flex-col h-[21px] items-start ml-0 mt-[5px] px-[20px] py-0 relative w-full" data-name="Container">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                    <div className="content-stretch flex h-[21px] items-center relative shrink-0 w-full" data-name="Container">
                      <ParagraphText text="오전" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col h-[64px] items-center pb-px pt-[16px] px-[20px] relative shrink-0 w-full" data-name="Container">
                <div aria-hidden="true" className="absolute border-[#eaeaea] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
                <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[30px] not-italic relative shrink-0 text-[#99a1af] text-[16px] text-center text-nowrap">오늘의 오전 근무자가 없습니다.</p>
              </div>
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                <Container additionalClassNames="bg-[rgba(220,223,226,0.2)] h-[33px]" />
                <div className="[grid-area:1_/_1] content-stretch flex flex-col h-[21px] items-start ml-0 mt-[5px] px-[20px] py-0 relative w-full" data-name="Container">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                    <div className="content-stretch flex h-[21px] items-center relative shrink-0 w-full" data-name="Container">
                      <ParagraphText text="오후" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                <Container additionalClassNames="h-[64px]" />
                <p className="[grid-area:1_/_1] font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[30px] ml-[599.5px] mt-[17px] not-italic relative text-[#99a1af] text-[16px] text-center text-nowrap translate-x-[-50%]">오늘의 오후 근무자가 없습니다.</p>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#eaeaea] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)]" />
      </div>
    );
  }

  // 근무자가 있을 때의 UI
  return (
    <div className="bg-white relative rounded-[16px] w-full h-[410px] overflow-hidden" data-name="Container">
      <div className="content-stretch flex flex-col items-start p-px relative rounded-[inherit] size-full">
        <div className="bg-[#51a8ff] h-[55.5px] relative shrink-0 w-full" data-name="Container">
          <div aria-hidden="true" className="absolute border-[#eaeaea] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex flex-col items-start pb-px pt-[16px] px-[20px] relative size-full">
            <div className="content-stretch flex h-[22.5px] items-center relative shrink-0 w-full" data-name="Container">
              <div className="relative shrink-0 flex-1">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
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
                  <div className="h-[23px] relative shrink-0 w-[150px]" data-name="Heading 2">
                    <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[22.5px] left-0 not-italic text-[15px] text-white top-px w-[162px]">오늘 근무 학생 목록</p>
                  </div>
                  {!isSimpleView && (
                    <>
                      <div className="relative shrink-0 size-[16px]" data-name="Frame">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                          <g id="Frame">
                            <path d={svgPaths.p26934e00} fill="var(--fill-0, white)" id="Vector" />
                          </g>
                        </svg>
                      </div>
                      <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[16.5px] not-italic relative shrink-0 text-[11px] text-white text-nowrap whitespace-nowrap">출근 시간이 오래된 순부터 차례로 표시됩니다.</p>
                    </>
                  )}
                </div>
              </div>
              <div className="bg-white h-[28px] relative rounded-[29px] shrink-0 w-[166px] ml-auto">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center justify-center px-[3px] py-[4px] relative size-full">
                  {isSimpleView ? (
                    <>
                      <div
                        className="bg-[#51a8ff] content-stretch flex h-[23px] items-center justify-center px-[10px] py-[2px] relative rounded-[20px] shrink-0 w-[80px] cursor-pointer"
                        onClick={() => setIsSimpleView(true)}
                      >
                        <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[13.5px] not-italic relative shrink-0 text-[12px] text-center text-nowrap text-white">간단히 보기</p>
                      </div>
                      <p
                        className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[13.5px] not-italic relative shrink-0 text-[#99a1af] text-[12px] text-center text-nowrap cursor-pointer"
                        onClick={() => setIsSimpleView(false)}
                      >
                        자세히 보기
                      </p>
                    </>
                  ) : (
                    <>
                      <p
                        className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[13.5px] not-italic relative shrink-0 text-[#99a1af] text-[12px] text-center text-nowrap cursor-pointer"
                        onClick={() => setIsSimpleView(true)}
                      >
                        간단히 보기
                      </p>
                      <div
                        className="bg-[#51a8ff] content-stretch flex h-[23px] items-center justify-center px-[10px] py-[2px] relative rounded-[20px] shrink-0 w-[80px] cursor-pointer"
                        onClick={() => setIsSimpleView(false)}
                      >
                        <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[13.5px] not-italic relative shrink-0 text-[12px] text-center text-nowrap text-white">자세히 보기</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[353px] relative shrink-0 w-full overflow-y-auto overflow-x-hidden custom-scrollbar" data-name="Container">
          <div className="content-stretch flex flex-col items-start leading-[0] w-full">
            {/* 오전 */}
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
              <Container additionalClassNames="bg-[rgba(220,223,226,0.2)] h-[33px]" />
              <div className="[grid-area:1_/_1] content-stretch flex flex-col h-[21px] items-start ml-0 mt-[5px] px-[20px] py-0 relative w-full" data-name="Container">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                  <div className="content-stretch flex h-[21px] items-center relative shrink-0 w-full" data-name="Container">
                    <ParagraphText text="오전" />
                  </div>
                </div>
              </div>
            </div>

            {/* 김길동 */}
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
              <Container additionalClassNames={isSimpleView ? "h-[64px]" : "h-[80px]"} />
              <div className={"[grid-area:1_/_1] content-stretch flex ml-0 relative w-full " + (isSimpleView ? "mt-[9px]" : "mt-[5px] items-center justify-between")}>
                <div className={"content-stretch flex flex-col gap-[8px] items-start justify-center px-[20px] py-0 relative shrink-0 w-[200px] " + (isSimpleView ? "h-[46px]" : "h-[68.421px]")} data-name="Container">
                  <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                      <div className="content-stretch flex gap-[8px] h-[21px] items-center relative shrink-0 w-full" data-name="Container">
                        <ParagraphText text="김길동" />
                        <Container2 additionalClassNames="bg-[#dcfce7] h-[17.5px] w-[51.359px]">
                          <div className="bg-[#00c950] opacity-[0.903] rounded-[1.67772e+07px] shrink-0 size-[8px]" data-name="Container" />
                          <TextText text="근무중" />
                        </Container2>
                      </div>
                    </div>
                    {!isSimpleView && (
                      <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[16.5px] not-italic relative shrink-0 text-[#6b7280] text-[11px] whitespace-nowrap">{`컴퓨터공학부 · 202311303 `}</p>
                    )}
                  </div>
                  <Wrapper1>
                    <span className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[#51a8ff]">9시</span>
                    <span>{` ~ `}</span>11시
                  </Wrapper1>
                </div>
                {!isSimpleView && (
                  <div className="content-stretch flex flex-col gap-[10px] items-end justify-center px-[20px] py-0 relative shrink-0 w-[420px]">
                    <div className="h-[5px] relative shrink-0 w-[400px]">
                      <Helper />
                    </div>
                    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[400px]">
                      <Helper1 text="지각 횟수" text1="0회" additionalClassNames="w-[80px]" />
                      <Helper2 text="누적 시간" text1="13시간 30분" />
                      <Helper1 text="지각 시간" text1="0분" additionalClassNames="w-[120px]" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 홍길동 */}
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
              <Container additionalClassNames={isSimpleView ? "h-[64px]" : "h-[80px]"} />
              <div className={"[grid-area:1_/_1] content-stretch flex ml-0 relative w-full " + (isSimpleView ? "mt-[9px]" : "mt-[11px] items-center justify-between")}>
                <div className={"content-stretch flex flex-col gap-[8px] items-start justify-center px-[20px] py-0 relative shrink-0 w-[200px] " + (isSimpleView ? "h-[46px]" : "h-[57.5px]")} data-name="Container">
                  <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                      <div className="content-stretch flex gap-[8px] h-[21px] items-center relative shrink-0 w-full" data-name="Container">
                        <ParagraphText text="홍길동" />
                        <Container2 additionalClassNames="bg-[#dcfce7] h-[17.5px] w-[51.359px]">
                          <div className="bg-[#00c950] opacity-[0.903] rounded-[1.67772e+07px] shrink-0 size-[8px]" data-name="Container" />
                          <TextText text="근무중" />
                        </Container2>
                        {!isSimpleView && (
                          <Container2 additionalClassNames="bg-[#ffebdc] h-[17px] w-[44px]">
                            <div className="bg-[#ff6900] opacity-[0.903] rounded-[1.67772e+07px] shrink-0 size-[8px]" data-name="Container" />
                            <TextText1 text="지각" />
                          </Container2>
                        )}
                      </div>
                    </div>
                    {!isSimpleView && (
                      <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[16.5px] not-italic relative shrink-0 text-[#6b7280] text-[11px] whitespace-nowrap">{`컴퓨터공학부 · 202311303 `}</p>
                    )}
                  </div>
                  <Wrapper1>
                    <span className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[#51a8ff]">9시 5분</span>
                    <span>{` ~`}</span> 11시 30분
                  </Wrapper1>
                </div>
                {!isSimpleView && (
                  <div className="content-stretch flex flex-col gap-[10px] items-end justify-center px-[20px] py-0 relative shrink-0 w-[420px]">
                    <div className="h-[5px] relative shrink-0 w-[400px]">
                      <div className="absolute contents left-0 top-0">
                        <div className="absolute bg-[#eaeaea] h-[5px] left-0 rounded-[10px] top-0 w-[400px]" />
                        <div className="absolute bg-[#51a8ff] h-[5px] left-0 rounded-[10px] top-0 w-[224px]" />
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[400px]">
                      <Helper1 text="지각 횟수" text1="1회" additionalClassNames="w-[80px]" />
                      <Helper2 text="누적 시간" text1="12시간" />
                      <Helper1 text="지각 시간" text1="5분" additionalClassNames="w-[120px]" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 박길동 */}
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
              <Container additionalClassNames={isSimpleView ? "h-[64px]" : "h-[80px]"} />
              <div className={"[grid-area:1_/_1] content-stretch flex ml-0 relative w-full " + (isSimpleView ? "mt-[9px]" : "mt-[10px] items-center justify-between")}>
                <div className={"content-stretch flex flex-col gap-[8px] items-start justify-center px-[20px] py-0 relative shrink-0 w-[200px] " + (isSimpleView ? "h-[46px]" : "h-[57.5px]")} data-name="Container">
                  <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                      <div className="content-stretch flex gap-[8px] h-[21px] items-center relative shrink-0 w-full" data-name="Container">
                        <ParagraphText text="박길동" />
                        <Container2 additionalClassNames="bg-[#ffebeb] h-[17.5px] w-[51.359px]">
                          <div className="bg-[#fb2c36] opacity-[0.903] rounded-[1.67772e+07px] shrink-0 size-[8px]" data-name="Container" />
                          <Wrapper>
                            <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[13.5px] left-0 not-italic text-[#833333] text-[9px] text-nowrap top-[0.5px]">미출근</p>
                          </Wrapper>
                        </Container2>
                        {!isSimpleView && (
                          <Container2 additionalClassNames="bg-[#ffebdc] h-[17px] w-[44px]">
                            <div className="bg-[#ff6900] opacity-[0.903] rounded-[1.67772e+07px] shrink-0 size-[8px]" data-name="Container" />
                            <TextText1 text="지각" />
                          </Container2>
                        )}
                      </div>
                    </div>
                    {!isSimpleView && (
                      <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[16.5px] not-italic relative shrink-0 text-[#6b7280] text-[11px] whitespace-nowrap">{`컴퓨터공학부 · 202311303 `}</p>
                    )}
                  </div>
                  <Wrapper1>
                    9시<span>{` ~ 11시 30분`}</span>
                  </Wrapper1>
                </div>
                {!isSimpleView && (
                  <div className="content-stretch flex flex-col gap-[10px] items-end justify-center px-[20px] py-0 relative shrink-0 w-[420px]">
                    <div className="h-[5px] relative shrink-0 w-[400px]">
                      <div className="absolute contents left-0 top-0">
                        <div className="absolute bg-[#eaeaea] h-[5px] left-0 rounded-[10px] top-0 w-[400px]" />
                        <div className="absolute bg-[#51a8ff] h-[5px] left-0 rounded-[10px] top-0 w-[177px]" />
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[400px]">
                      <Helper1 text="지각 횟수" text1="4회" additionalClassNames="w-[80px]" />
                      <Helper2 text="누적 시간" text1="10시간 30분" />
                      <Helper1 text="지각 시간" text1="30분" additionalClassNames="w-[120px]" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 오후 */}
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
              <Container additionalClassNames="bg-[rgba(220,223,226,0.2)] h-[33px]" />
              <div className="[grid-area:1_/_1] content-stretch flex flex-col h-[21px] items-start ml-0 mt-[5px] px-[20px] py-0 relative w-full" data-name="Container">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                  <div className="content-stretch flex h-[21px] items-center relative shrink-0 w-full" data-name="Container">
                    <ParagraphText text="오후" />
                  </div>
                </div>
              </div>
            </div>

            {/* 서길동 */}
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
              <Container additionalClassNames={isSimpleView ? "h-[64px]" : "h-[80px]"} />
              <div className={"[grid-area:1_/_1] content-stretch flex ml-0 relative w-full " + (isSimpleView ? "mt-[9px]" : "mt-[12px] items-center justify-between")}>
                <div className={"content-stretch flex flex-col gap-[8px] items-start justify-center px-[20px] py-0 relative shrink-0 w-[200px] " + (isSimpleView ? "h-[46px]" : "h-[57.5px]")} data-name="Container">
                  <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full">
                    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full">
                      <div className="content-stretch flex gap-[8px] h-[21px] items-center relative shrink-0 w-full" data-name="Container">
                        <ParagraphText text="서길동" />
                        {!isSimpleView && (
                          <Container2 additionalClassNames="bg-[#f1f1f1] h-[17px] w-[51px]">
                            <div className="bg-black opacity-[0.903] rounded-[1.67772e+07px] shrink-0 size-[8px]" data-name="Container" />
                            <Wrapper>
                              <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[13.5px] left-0 not-italic text-[9px] text-black text-nowrap top-[0.5px]">출근전</p>
                            </Wrapper>
                          </Container2>
                        )}
                      </div>
                    </div>
                    {!isSimpleView && (
                      <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[16.5px] not-italic relative shrink-0 text-[#6b7280] text-[11px] whitespace-nowrap">{`컴퓨터공학부 · 202311303 `}</p>
                    )}
                  </div>
                  <Wrapper1>
                    1시<span>{` ~ `}</span>5시 30분
                  </Wrapper1>
                </div>
                {!isSimpleView && (
                  <div className="content-stretch flex flex-col gap-[10px] items-end justify-center px-[20px] py-0 relative shrink-0 w-[420px]">
                    <div className="h-[5px] relative shrink-0 w-[400px]">
                      <Helper />
                    </div>
                    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[400px]">
                      <Helper1 text="지각 횟수" text1="1회" additionalClassNames="w-[80px]" />
                      <Helper2 text="누적 시간" text1="14시간 30분" />
                      <Helper1 text="지각 시간" text1="0분" additionalClassNames="w-[120px]" />
                    </div>
                  </div>
                )}
              </div>
              {isSimpleView && (
                <div className="[grid-area:1_/_1] bg-[#f1f1f1] content-stretch flex gap-[4px] h-[17.5px] items-center ml-[64px] mt-[11px] px-[8px] py-0 relative rounded-[10px] w-[51.359px]" data-name="Container">
                  <div className="bg-black opacity-[0.903] rounded-[1.67772e+07px] shrink-0 size-[8px]" data-name="Container" />
                  <Wrapper>
                    <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[13.5px] left-0 not-italic text-[9px] text-black text-nowrap top-[0.5px]">출근전</p>
                  </Wrapper>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#eaeaea] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}
