import svgPaths from "../../imports/svg-aoy5qofihl";
import { useState } from "react";

function Wrapper({ children }: React.PropsWithChildren<Record<string, never>>) {
  return (
    <div className="relative shrink-0 size-[14px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Frame">{children}</g>
      </svg>
    </div>
  );
}
type Text1Props = {
  text: string;
};

function Text1({ text }: Text1Props) {
  return (
    <div className="bg-[#51a8ff] content-stretch flex gap-[2px] h-[23px] items-center px-[16px] py-[2px] relative rounded-[20px] shrink-0 w-[80px]">
      <Wrapper>
        <path d={svgPaths.p34d0bc00} fill="var(--fill-0, white)" id="Vector" />
      </Wrapper>
      <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[13.5px] not-italic relative shrink-0 text-[12px] text-center text-nowrap text-white">{text}</p>
    </div>
  );
}
type TextProps = {
  text: string;
};

function Text({ text }: TextProps) {
  return (
    <div className="bg-white content-stretch flex gap-[2px] h-[23px] items-center px-[16px] py-[2px] relative rounded-[20px] shrink-0 w-[80px]">
      <div aria-hidden="true" className="absolute border border-[#eaeaea] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <Wrapper>
        <path d={svgPaths.p12a26572} fill="var(--fill-0, #09121C)" id="Vector" />
      </Wrapper>
      <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[13.5px] not-italic relative shrink-0 text-[#09121c] text-[12px] text-center text-nowrap">{text}</p>
    </div>
  );
}
type ParagraphText1Props = {
  text: string;
};

function ParagraphText1({ text }: ParagraphText1Props) {
  return (
    <div className="h-[30px] relative shrink-0 w-full">
      <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[30px] left-[133.2px] not-italic text-[#09121c] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">{text}</p>
    </div>
  );
}
type FrameProps = {
  additionalClassNames?: string;
};

function Frame({ additionalClassNames = "" }: FrameProps) {
  return (
    <div className={"absolute size-[24px] top-[16px]" + (additionalClassNames ? " " + additionalClassNames : "")}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d={svgPaths.pb57c500} fill="var(--fill-0, #09121C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}
type ParagraphTextProps = {
  text: string;
};

function ParagraphText({ text }: ParagraphTextProps) {
  return (
    <div className="h-[15px] opacity-60 relative shrink-0 w-full">
      <p className="absolute font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[15px] left-[132.59px] not-italic text-[#09121c] text-[14px] text-center text-nowrap top-[0.5px] translate-x-[-50%]">{text}</p>
    </div>
  );
}

export default function WorkTimeApprovalQueue() {
  // 대기 중인 요청 데이터 - 실제로는 props나 API에서 가져올 데이터
  const [hasRequests] = useState(true);

  // 대기 중인 요청이 없을 때의 UI
  if (!hasRequests) {
    return (
      <div className="bg-white border border-[#eaeaea] border-solid overflow-clip relative rounded-[16px] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)] size-full" data-name="대기 중인 요청이 없을 때">
        <div className="absolute bg-[#51a8ff] content-stretch flex flex-col h-[55px] items-start left-0 pb-px pt-[16px] px-[20px] top-[0.5px] w-[1198px]" data-name="Container">
          <div aria-hidden="true" className="absolute border-[#eaeaea] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex gap-[8px] h-[22.5px] items-center relative shrink-0 w-full" data-name="Container">
            <div className="relative shrink-0 size-[20px]" data-name="Icon">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <g clipPath="url(#clip0_78_322)" id="Icon">
                  <path d="M18.1675 8.33332C18.5481 10.2011 18.2768 12.1428 17.399 13.8348C16.5212 15.5268 15.0899 16.8667 13.3438 17.6311C11.5976 18.3955 9.64219 18.5381 7.80358 18.0353C5.96498 17.5325 4.35433 16.4145 3.24023 14.8678C2.12613 13.3212 1.57594 11.4394 1.68139 9.53615C1.78684 7.63294 2.54157 5.8234 3.81971 4.4093C5.09785 2.9952 6.82215 2.06202 8.70505 1.76537C10.588 1.46872 12.5157 1.82654 14.1667 2.77916" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  <path d="M7.5 9.16667L10 11.6667L18.3333 3.33333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </g>
                <defs>
                  <clipPath id="clip0_78_322">
                    <rect fill="white" height="20" width="20" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="h-[13px] relative shrink-0 w-[127px]" data-name="Heading 2">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[22.5px] left-0 not-italic text-[15px] text-nowrap text-white top-[-5.75px]">근로 시간 승인 대기열</p>
              </div>
            </div>
            <div className="relative shrink-0 size-[16px]" data-name="Frame">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                <g id="Frame">
                  <path d="M8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8C14.6667 11.6819 11.6819 14.6667 8 14.6667ZM7.33333 7.33333V11.3333H8.66667V7.33333H7.33333ZM7.33333 4.66667V6H8.66667V4.66667H7.33333Z" fill="var(--fill-0, white)" id="Vector" />
                </g>
              </svg>
            </div>
          </div>
        </div>
        <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[30px] left-[calc(50%-0.5px)] not-italic text-[#99a1af] text-[16px] text-center text-nowrap top-[calc(50%+10px)] translate-x-[-50%]">대기 중인 요청이 없습니다.</p>
      </div>
    );
  }

  // 대기 중인 요청이 있을 때의 UI
  return (
    <div className="bg-white border border-[#eaeaea] border-solid overflow-clip relative rounded-[16px] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)] size-full" data-name="Container">
      <div className="absolute bg-[#51a8ff] content-stretch flex flex-col h-[55px] items-start left-0 pb-px pt-[16px] px-[20px] top-[0.5px] w-[1198px]" data-name="Container">
        <div aria-hidden="true" className="absolute border-[#eaeaea] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] h-[22.5px] items-center relative shrink-0 w-full" data-name="Container">
          <div className="relative shrink-0 size-[20px]" data-name="Icon">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <g clipPath="url(#clip0_78_322)" id="Icon">
                <path d="M18.1675 8.33332C18.5481 10.2011 18.2768 12.1428 17.399 13.8348C16.5212 15.5268 15.0899 16.8667 13.3438 17.6311C11.5976 18.3955 9.64219 18.5381 7.80358 18.0353C5.96498 17.5325 4.35433 16.4145 3.24023 14.8678C2.12613 13.3212 1.57594 11.4394 1.68139 9.53615C1.78684 7.63294 2.54157 5.8234 3.81971 4.4093C5.09785 2.9952 6.82215 2.06202 8.70505 1.76537C10.588 1.46872 12.5157 1.82654 14.1667 2.77916" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d="M7.5 9.16667L10 11.6667L18.3333 3.33333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              </g>
              <defs>
                <clipPath id="clip0_78_322">
                  <rect fill="white" height="20" width="20" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="h-[13px] relative shrink-0 w-[127px]" data-name="Heading 2">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
              <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[22.5px] left-0 not-italic text-[15px] text-nowrap text-white top-[-5.75px]">근로 시간 승인 대기열</p>
            </div>
          </div>
          <div className="relative shrink-0 size-[16px]" data-name="Frame">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <g id="Frame">
                <path d="M8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8C14.6667 11.6819 11.6819 14.6667 8 14.6667ZM7.33333 7.33333V11.3333H8.66667V7.33333H7.33333ZM7.33333 4.66667V6H8.66667V4.66667H7.33333Z" fill="var(--fill-0, white)" id="Vector" />
              </g>
            </svg>
          </div>
          <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[16.5px] not-italic relative shrink-0 text-[11px] text-white w-[188px]">신청이 오래된 순부터 차례로 표시됩니다.</p>
        </div>
      </div>
      <div className="absolute gap-[12px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[116px] left-[20px] top-[71.5px] w-[1190px]" data-name="Container">
        <div className="[grid-area:1_/_1] bg-[#f9fafb] content-stretch flex flex-col gap-[4px] items-center px-[12px] py-[20px] relative rounded-[10px] self-start shrink-0 w-[289px]" data-name="Container">
          <ParagraphText text="이길동" />
          <ParagraphText1 text="12일 2시간, 13일 1시간, ... → 15일, 16일, ..." />
          <div className="content-stretch flex gap-[4px] items-start relative shrink-0">
            <Text text="거절" />
            <Text1 text="승인" />
          </div>
          <Frame additionalClassNames="left-[253px]" />
        </div>
        <div className="[grid-area:1_/_2] bg-[#f9fafb] content-stretch flex flex-col gap-[4px] items-center justify-center px-[12px] py-[20px] relative rounded-[10px] self-start shrink-0 w-[289px]" data-name="Container">
          <ParagraphText text="박길동" />
          <ParagraphText1 text="12일 2시간 → 14일" />
          <div className="content-stretch flex gap-[4px] items-start relative shrink-0">
            <Text text="거절" />
            <Text1 text="승인" />
          </div>
          <Frame additionalClassNames="left-[253.5px]" />
        </div>
      </div>
    </div>
  );
}
