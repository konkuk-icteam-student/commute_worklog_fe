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
              <div className="content-stretch flex h-[22.5px] items-center relative shrink-0 w-full" data-name="Container">
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
                    <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[22.5px] left-0 not-italic text-[15px] text-white top-px w-[162px]">오늘 근무 학생 목록</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 relative w-full overflow-y-auto overflow-x-hidden custom-scrollbar" data-name="Container">
          <div className="flex flex-col w-full">
            {/* 오전 */}
            <div className="relative w-full bg-[rgba(220,223,226,0.2)] border-b border-[#eaeaea]">
              <div className="flex items-center h-[33px] px-[20px]">
                <ParagraphText text="오전" />
              </div>
            </div>

            {/* 김길동 */}
            <div className="relative w-full border-b border-[#eaeaea]">
              <div className="flex w-full py-[10px]">
                <div className="flex flex-col gap-[4px] justify-center px-[20px]">
                  <div className="flex gap-[8px] items-center">
                    <ParagraphText text="김길동" />
                    <Container2 additionalClassNames="bg-[#dcfce7] h-[17.5px] w-[51.359px]">
                      <div className="bg-[#00c950] opacity-[0.903] rounded-[1.67772e+07px] shrink-0 size-[8px]" />
                      <TextText text="근무중" />
                    </Container2>
                  </div>
                  <Wrapper1>
                    <span className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[#51a8ff]">9시</span>
                    <span>{` ~ `}</span>11시
                  </Wrapper1>
                </div>
              </div>
            </div>

            {/* 홍길동 */}
            <div className="relative w-full border-b border-[#eaeaea]">
              <div className="flex w-full py-[10px]">
                <div className="flex flex-col gap-[4px] justify-center px-[20px]">
                  <div className="flex gap-[8px] items-center">
                    <ParagraphText text="홍길동" />
                    <Container2 additionalClassNames="bg-[#dcfce7] h-[17.5px] w-[51.359px]">
                      <div className="bg-[#00c950] opacity-[0.903] rounded-[1.67772e+07px] shrink-0 size-[8px]" />
                      <TextText text="근무중" />
                    </Container2>
                  </div>
                  <Wrapper1>
                    <span className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[#51a8ff]">9시</span>
                    <span>{` ~ `}</span>11시 30분
                  </Wrapper1>
                </div>
              </div>
            </div>

            {/* 박길동 */}
            <div className="relative w-full border-b border-[#eaeaea]">
              <div className="flex w-full py-[10px]">
                <div className="flex flex-col gap-[4px] justify-center px-[20px]">
                  <div className="flex gap-[8px] items-center">
                    <ParagraphText text="박길동" />
                    <Container2 additionalClassNames="bg-[#ffebeb] h-[17.5px] w-[51.359px]">
                      <div className="bg-[#fb2c36] opacity-[0.903] rounded-[1.67772e+07px] shrink-0 size-[8px]" />
                      <Wrapper>
                        <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[13.5px] left-0 not-italic text-[#833333] text-[9px] text-nowrap top-[0.5px]">미출근</p>
                      </Wrapper>
                    </Container2>
                  </div>
                  <Wrapper1>
                    9시<span>{` ~ 11시 30분`}</span>
                  </Wrapper1>
                </div>
              </div>
            </div>

            {/* 오후 */}
            <div className="relative w-full bg-[rgba(220,223,226,0.2)] border-b border-[#eaeaea]">
              <div className="flex items-center h-[33px] px-[20px]">
                <ParagraphText text="오후" />
              </div>
            </div>

            {/* 서길동 */}
            <div className="relative w-full border-b border-[#eaeaea]">
              <div className="flex w-full py-[10px]">
                <div className="flex flex-col gap-[4px] justify-center px-[20px]">
                  <div className="flex gap-[8px] items-center">
                    <ParagraphText text="서길동" />
                    <Container2 additionalClassNames="bg-[#f1f1f1] h-[17.5px] w-[51.359px]">
                      <div className="bg-black opacity-[0.903] rounded-[1.67772e+07px] shrink-0 size-[8px]" />
                      <Wrapper>
                        <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[13.5px] left-0 not-italic text-[9px] text-black text-nowrap top-[0.5px]">출근완</p>
                      </Wrapper>
                    </Container2>
                  </div>
                  <Wrapper1>
                    1시<span>{` ~ `}</span>5시 30분
                  </Wrapper1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#eaeaea] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}
