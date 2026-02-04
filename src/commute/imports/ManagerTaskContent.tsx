import svgPaths from './svg-y6pn8aze1v';
import { imgVector } from './svg-cs6su';

function Frame() {
  return (
    <div className="relative size-[22px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Frame">
          <path d={svgPaths.pbeb2040} fill="var(--fill-0, #09121C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TextInput() {
  return (
    <div
      className="relative h-[50px] w-[175px] shrink-0 rounded-[10px] bg-white"
      data-name="Text Input"
    >
      <div className="relative flex size-full content-stretch items-center justify-between overflow-clip rounded-[inherit] px-[16px] py-[12px]">
        <p className="css-ew64yg relative shrink-0 text-nowrap font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] not-italic leading-[normal] text-[#09121c]">
          정기 업무(오전)
        </p>
        <div
          className="relative flex size-[22px] shrink-0 items-center justify-center"
          style={
            {
              '--transform-inner-width': '0',
              '--transform-inner-height': '21.59375',
            } as React.CSSProperties
          }
        >
          <div className="flex-none rotate-[270deg]">
            <Frame />
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[10px] border-[0.542px] border-solid border-[#e0e0e0]"
      />
    </div>
  );
}

function TextInput1() {
  return (
    <div
      className="relative h-[50px] w-[488px] shrink-0 rounded-[10px] bg-white"
      data-name="Text Input"
    >
      <div className="relative flex size-full content-stretch items-center overflow-clip rounded-[inherit] px-[16px] py-[12px]">
        <p className="css-ew64yg relative shrink-0 text-nowrap font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] not-italic leading-[normal] text-[#cdcdcd]">
          새 업무 추가(최대 16자)
        </p>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[10px] border-[0.542px] border-solid border-[#e0e0e0]"
      />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative size-[20px] shrink-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path
            d="M4.16667 10H15.8333"
            id="Vector"
            stroke="var(--stroke-0, white)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.66607"
          />
          <path
            d="M10 4.16667V15.8333"
            id="Vector_2"
            stroke="var(--stroke-0, white)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.66607"
          />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div
      className="relative flex size-[50px] shrink-0 content-stretch items-center justify-center rounded-[10px] bg-[#51a8ff] py-0 pl-0 pr-[0.008px]"
      data-name="Button"
    >
      <Icon />
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative flex w-full shrink-0 content-stretch items-end justify-center gap-[10px]">
      <TextInput />
      <TextInput1 />
      <Button />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative size-[15.996px] shrink-0" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 15.996 15.996"
      >
        <g clipPath="url(#clip0_102_540)" id="Icon">
          <path
            d={svgPaths.p19fde300}
            id="Vector"
            stroke="var(--stroke-0, #51A8FF)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.333"
          />
          <path
            d={svgPaths.p265433f0}
            id="Vector_2"
            stroke="var(--stroke-0, #51A8FF)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.333"
          />
        </g>
        <defs>
          <clipPath id="clip0_102_540">
            <rect fill="white" height="15.996" width="15.996" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div
      className="relative size-[31.992px] shrink-0 rounded-[10px] bg-[rgba(81,168,255,0.1)]"
      data-name="Container"
    >
      <div className="relative flex size-full content-stretch items-center justify-center border-0 border-solid border-[transparent] bg-clip-padding py-0 pl-0 pr-[0.008px]">
        <Icon1 />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="relative h-[23.99px] w-[59.564px] shrink-0" data-name="Heading 2">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="css-ew64yg absolute left-0 top-[1.17px] text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[16px] not-italic leading-[24px] text-[#09121c]">
          정기 업무
        </p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div
      className="relative flex h-[31.992px] w-full shrink-0 content-stretch items-center gap-[7.994px]"
      data-name="Container"
    >
      <Container />
      <Heading />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="relative h-[23.99px] w-full shrink-0 opacity-60" data-name="Paragraph">
      <p className="css-ew64yg absolute left-[7.99px] top-[0.08px] text-nowrap font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] not-italic leading-[24px] text-[#09121c]">
        오전
      </p>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[16.67%_8.33%_33.33%_20.83%] contents" data-name="Group">
      <div
        className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.165px_-3.332px] mask-size-[19.993px_19.993px] absolute inset-[16.67%_8.33%_33.33%_20.83%]"
        data-name="Vector"
        style={{ maskImage: `url('${imgVector}')` }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 14.1616 9.99645"
        >
          <path d={svgPaths.p37b24200} fill="var(--fill-0, #51A8FF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[12.5%_8.33%_12.5%_12.5%] contents" data-name="Group">
      <div
        className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.499px_-2.499px] mask-size-[19.993px_19.993px] absolute inset-[12.5%]"
        data-name="Vector"
        style={{ maskImage: `url('${imgVector}')` }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 14.9947 14.9947"
        >
          <path d={svgPaths.p20d24100} fill="var(--fill-0, #EAEAEA)" id="Vector" />
        </svg>
      </div>
      <Group />
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute inset-0 contents" data-name="Clip path group">
      <Group1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative h-[19.993px] w-full shrink-0 overflow-clip" data-name="Icon">
      <ClipPathGroup />
    </div>
  );
}

function Button1() {
  return (
    <div className="relative size-[19.993px] shrink-0" data-name="Button">
      <div className="relative flex size-full flex-col content-stretch items-start border-0 border-solid border-[transparent] bg-clip-padding">
        <Icon2 />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="relative h-[23.99px] w-[263.87px] shrink-0" data-name="Paragraph">
      <div className="relative size-full overflow-clip rounded-[inherit] border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="css-ew64yg absolute left-0 top-[0.08px] text-nowrap font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] not-italic leading-[24px] text-[#51a8ff] line-through decoration-solid [text-decoration-skip-ink:none]">
          신문지 가져오기
        </p>
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="relative h-[19.493px] w-[219.718px] shrink-0" data-name="Paragraph">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="css-ew64yg absolute left-0 top-[-0.46px] text-nowrap font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[13px] not-italic leading-[19.5px] text-[#6b7280]">
          홍길동 · 09:00
        </p>
      </div>
    </div>
  );
}

function Text() {
  return <div className="h-[17.342px] w-[36.158px] shrink-0" data-name="Text" />;
}

function Container2() {
  return (
    <div className="relative h-[24px] w-[1134px] shrink-0" data-name="Container">
      <div className="relative flex size-full content-stretch items-center gap-[7.994px] border-0 border-solid border-[transparent] bg-clip-padding">
        <Paragraph2 />
        <Text />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="relative h-[23.99px] w-[40.333px] shrink-0" data-name="Text">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="css-4hzbpn absolute left-[calc(50%+0.3px)] top-[0.46px] w-[40px] translate-x-[-50%] text-center font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] not-italic leading-[24px] tracking-[0.21px] text-[#09121c]">
          삭제
        </p>
      </div>
    </div>
  );
}

function CustomTimePicker() {
  return (
    <div
      className="absolute left-[1037.39px] top-[7.03px] h-[41.061px] w-[97.399px] rounded-[10px] bg-white"
      data-name="CustomTimePicker"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[10px] border-[0.542px] border-solid border-[#e0e0e0]"
      />
      <div className="relative flex size-full content-stretch items-center justify-center border-0 border-solid border-[transparent] bg-clip-padding px-[16.538px] py-[0.542px]">
        <Text1 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative h-[55.973px] min-h-px min-w-px flex-[1_0_0]" data-name="Container">
      <div className="relative flex size-full flex-col content-stretch items-start gap-[7.994px] border-0 border-solid border-[transparent] bg-clip-padding">
        <Paragraph1 />
        <Container2 />
        <CustomTimePicker />
      </div>
    </div>
  );
}

function TaskItem() {
  return (
    <div
      className="absolute left-[17.62px] top-[0.26px] flex h-[80px] w-[1182px] content-stretch items-center gap-[11.999px] rounded-[6px] px-[7.994px] pb-[0.542px] pt-0"
      data-name="TaskItem"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[6px] border-b-[0.542px] border-solid border-[#f0f0f0]"
      />
      <Button1 />
      <Container3 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[12.5%] contents" data-name="Group">
      <div
        className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.499px_-2.499px] mask-size-[19.993px_19.993px] absolute inset-[12.5%]"
        data-name="Vector"
        style={{ maskImage: `url('${imgVector}')` }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 14.9947 14.9947"
        >
          <path d={svgPaths.p20d24100} fill="var(--fill-0, #EAEAEA)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function ClipPathGroup1() {
  return (
    <div className="absolute inset-0 contents" data-name="Clip path group">
      <Group2 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative h-[19.993px] w-full shrink-0 overflow-clip" data-name="Icon">
      <ClipPathGroup1 />
    </div>
  );
}

function Button2() {
  return (
    <div className="relative size-[19.993px] shrink-0" data-name="Button">
      <div className="relative flex size-full flex-col content-stretch items-start border-0 border-solid border-[transparent] bg-clip-padding">
        <Icon3 />
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="relative h-[23.99px] w-[263.87px] shrink-0" data-name="Paragraph">
      <div className="relative size-full overflow-clip rounded-[inherit] border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="css-ew64yg absolute left-0 top-[0.08px] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] not-italic leading-[24px] text-[#09121c]">
          커피머신 청소
        </p>
      </div>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="relative h-[19.493px] w-[220.379px] shrink-0" data-name="Paragraph">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="css-ew64yg absolute left-0 top-[-0.46px] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[13px] not-italic leading-[19.5px] text-[#6b7280]">
          김길동 · 09:00
        </p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative h-[24px] w-[1134px] shrink-0" data-name="Container">
      <div className="relative flex size-full content-stretch items-center border-0 border-solid border-[transparent] bg-clip-padding">
        <Paragraph4 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative h-[55.973px] min-h-px min-w-px flex-[1_0_0]" data-name="Container">
      <div className="relative flex size-full flex-col content-stretch items-start gap-[7.994px] border-0 border-solid border-[transparent] bg-clip-padding">
        <Paragraph3 />
        <Container4 />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="relative h-[23.99px] w-[40.333px] shrink-0" data-name="Text">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="css-4hzbpn absolute left-[calc(50%+0.3px)] top-[0.46px] w-[40px] translate-x-[-50%] text-center font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] not-italic leading-[24px] tracking-[0.21px] text-[#09121c]">
          삭제
        </p>
      </div>
    </div>
  );
}

function CustomTimePicker1() {
  return (
    <div
      className="absolute left-[1077.38px] top-[19.77px] h-[41.061px] w-[97.399px] rounded-[10px] bg-white"
      data-name="CustomTimePicker"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[10px] border-[0.542px] border-solid border-[#e0e0e0]"
      />
      <div className="relative flex size-full content-stretch items-center justify-center border-0 border-solid border-[transparent] bg-clip-padding px-[16.538px] py-[0.542px]">
        <Text2 />
      </div>
    </div>
  );
}

function TaskItem1() {
  return (
    <div
      className="absolute left-[17.62px] top-[80.26px] flex h-[81px] w-[1182px] content-stretch items-center gap-[11.999px] rounded-[6px] px-[7.994px] pb-[0.542px] pt-0"
      data-name="TaskItem"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[6px] border-b-[0.542px] border-solid border-[#f0f0f0]"
      />
      <Button2 />
      <Container5 />
      <CustomTimePicker1 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[16.67%_8.33%_33.33%_20.83%] contents" data-name="Group">
      <div
        className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.165px_-3.332px] mask-size-[19.993px_19.993px] absolute inset-[16.67%_8.33%_33.33%_20.83%]"
        data-name="Vector"
        style={{ maskImage: `url('${imgVector}')` }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 14.1616 9.99645"
        >
          <path d={svgPaths.p37b24200} fill="var(--fill-0, #51A8FF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[12.5%_8.33%_12.5%_12.5%] contents" data-name="Group">
      <div
        className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.499px_-2.499px] mask-size-[19.993px_19.993px] absolute inset-[12.5%]"
        data-name="Vector"
        style={{ maskImage: `url('${imgVector}')` }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 14.9947 14.9947"
        >
          <path d={svgPaths.p20d24100} fill="var(--fill-0, #EAEAEA)" id="Vector" />
        </svg>
      </div>
      <Group3 />
    </div>
  );
}

function ClipPathGroup2() {
  return (
    <div className="absolute inset-0 contents" data-name="Clip path group">
      <Group4 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative h-[19.993px] w-full shrink-0 overflow-clip" data-name="Icon">
      <ClipPathGroup2 />
    </div>
  );
}

function Button3() {
  return (
    <div className="relative size-[19.993px] shrink-0" data-name="Button">
      <div className="relative flex size-full flex-col content-stretch items-start border-0 border-solid border-[transparent] bg-clip-padding">
        <Icon4 />
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="relative h-[23.99px] w-[263.87px] shrink-0" data-name="Paragraph">
      <div className="relative size-full overflow-clip rounded-[inherit] border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="css-ew64yg absolute left-0 top-[0.08px] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] not-italic leading-[24px] text-[#51a8ff] line-through decoration-solid [text-decoration-skip-ink:none]">
          싱크대 청소
        </p>
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="relative h-[19.493px] w-[222.132px] shrink-0" data-name="Paragraph">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="css-ew64yg absolute left-0 top-[-0.46px] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[13px] not-italic leading-[19.5px] text-[#6b7280]">
          이길동 · 09:00
        </p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="relative h-[24px] w-[1134px] shrink-0" data-name="Container">
      <div className="relative flex size-full content-stretch items-center border-0 border-solid border-[transparent] bg-clip-padding">
        <Paragraph6 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="relative h-[23.99px] w-[40.333px] shrink-0" data-name="Text">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="css-4hzbpn absolute left-[calc(50%+0.3px)] top-[0.46px] w-[40px] translate-x-[-50%] text-center font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] not-italic leading-[24px] tracking-[0.21px] text-[#09121c]">
          삭제
        </p>
      </div>
    </div>
  );
}

function CustomTimePicker2() {
  return (
    <div
      className="absolute left-[1037.39px] top-[7.53px] h-[41.061px] w-[97.399px] rounded-[10px] bg-white"
      data-name="CustomTimePicker"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[10px] border-[0.542px] border-solid border-[#e0e0e0]"
      />
      <div className="relative flex size-full content-stretch items-center justify-center border-0 border-solid border-[transparent] bg-clip-padding px-[16.538px] py-[0.542px]">
        <Text3 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="relative h-[55.973px] min-h-px min-w-px flex-[1_0_0]" data-name="Container">
      <div className="relative flex size-full flex-col content-stretch items-start gap-[7.994px] border-0 border-solid border-[transparent] bg-clip-padding">
        <Paragraph5 />
        <Container6 />
        <CustomTimePicker2 />
      </div>
    </div>
  );
}

function TaskItem2() {
  return (
    <div
      className="absolute left-[17.62px] top-[161.26px] flex h-[81px] w-[1182px] content-stretch items-center gap-[11.999px] rounded-[6px] px-[7.994px] pb-[0.542px] pt-0"
      data-name="TaskItem"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[6px] border-b-[0.542px] border-solid border-[#f0f0f0]"
      />
      <Button3 />
      <Container7 />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute inset-[16.67%_8.33%_33.33%_20.83%] contents" data-name="Group">
      <div
        className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.165px_-3.332px] mask-size-[19.993px_19.993px] absolute inset-[16.67%_8.33%_33.33%_20.83%]"
        data-name="Vector"
        style={{ maskImage: `url('${imgVector}')` }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 14.1616 9.99645"
        >
          <path d={svgPaths.p37b24200} fill="var(--fill-0, #51A8FF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute inset-[12.5%_8.33%_12.5%_12.5%] contents" data-name="Group">
      <div
        className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.499px_-2.499px] mask-size-[19.993px_19.993px] absolute inset-[12.5%]"
        data-name="Vector"
        style={{ maskImage: `url('${imgVector}')` }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 14.9947 14.9947"
        >
          <path d={svgPaths.p20d24100} fill="var(--fill-0, #EAEAEA)" id="Vector" />
        </svg>
      </div>
      <Group5 />
    </div>
  );
}

function ClipPathGroup3() {
  return (
    <div className="absolute inset-0 contents" data-name="Clip path group">
      <Group6 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative h-[19.993px] w-full shrink-0 overflow-clip" data-name="Icon">
      <ClipPathGroup3 />
    </div>
  );
}

function Button4() {
  return (
    <div className="relative size-[19.993px] shrink-0" data-name="Button">
      <div className="relative flex size-full flex-col content-stretch items-start border-0 border-solid border-[transparent] bg-clip-padding">
        <Icon5 />
      </div>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="relative h-[23.99px] w-[263.87px] shrink-0" data-name="Paragraph">
      <div className="relative size-full overflow-clip rounded-[inherit] border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="css-ew64yg absolute left-0 top-[0.08px] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] not-italic leading-[24px] text-[#51a8ff] line-through decoration-solid [text-decoration-skip-ink:none]">
          회의실 청소
        </p>
      </div>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="relative h-[19.493px] w-[222.801px] shrink-0" data-name="Paragraph">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="css-ew64yg absolute left-0 top-[-0.46px] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[13px] not-italic leading-[19.5px] text-[#6b7280]">
          박길동 · 09:00
        </p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="relative h-[24px] w-[1134px] shrink-0" data-name="Container">
      <div className="relative flex size-full content-stretch items-center border-0 border-solid border-[transparent] bg-clip-padding">
        <Paragraph8 />
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="relative h-[23.99px] w-[40.333px] shrink-0" data-name="Text">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="css-4hzbpn absolute left-[calc(50%+0.3px)] top-[0.46px] w-[40px] translate-x-[-50%] text-center font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] not-italic leading-[24px] tracking-[0.21px] text-[#09121c]">
          삭제
        </p>
      </div>
    </div>
  );
}

function CustomTimePicker3() {
  return (
    <div
      className="absolute left-[1037.39px] top-[7.26px] h-[41.061px] w-[97.399px] rounded-[10px] bg-white"
      data-name="CustomTimePicker"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[10px] border-[0.542px] border-solid border-[#e0e0e0]"
      />
      <div className="relative flex size-full content-stretch items-center justify-center border-0 border-solid border-[transparent] bg-clip-padding px-[16.538px] py-[0.542px]">
        <Text4 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="relative h-[55.973px] min-h-px min-w-px flex-[1_0_0]" data-name="Container">
      <div className="relative flex size-full flex-col content-stretch items-start gap-[7.994px] border-0 border-solid border-[transparent] bg-clip-padding">
        <Paragraph7 />
        <Container8 />
        <CustomTimePicker3 />
      </div>
    </div>
  );
}

function TaskItem3() {
  return (
    <div
      className="absolute left-[17.62px] top-[242.26px] flex h-[79px] w-[1182px] content-stretch items-center gap-[11.999px] rounded-[6px] px-[7.994px] py-0"
      data-name="TaskItem"
    >
      <Button4 />
      <Container9 />
    </div>
  );
}

function Container10() {
  return (
    <div className="relative h-[321.512px] w-full shrink-0" data-name="Container">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border-l-[1.626px] border-solid border-[rgba(81,168,255,0.2)]"
      />
      <TaskItem />
      <TaskItem1 />
      <TaskItem2 />
      <TaskItem3 />
    </div>
  );
}

function Container11() {
  return (
    <div
      className="relative flex h-[353.495px] w-full shrink-0 flex-col content-stretch items-start gap-[7.994px]"
      data-name="Container"
    >
      <Paragraph />
      <Container10 />
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="relative h-[23.99px] w-full shrink-0 opacity-60" data-name="Paragraph">
      <p className="css-ew64yg absolute left-[7.99px] top-[0.08px] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] not-italic leading-[24px] text-[#09121c]">
        오후
      </p>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute inset-[12.5%] contents" data-name="Group">
      <div
        className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.499px_-2.499px] mask-size-[19.993px_19.993px] absolute inset-[12.5%]"
        data-name="Vector"
        style={{ maskImage: `url('${imgVector}')` }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 14.9947 14.9947"
        >
          <path d={svgPaths.p20d24100} fill="var(--fill-0, #EAEAEA)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function ClipPathGroup4() {
  return (
    <div className="absolute inset-0 contents" data-name="Clip path group">
      <Group7 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative h-[19.993px] w-full shrink-0 overflow-clip" data-name="Icon">
      <ClipPathGroup4 />
    </div>
  );
}

function Button5() {
  return (
    <div className="relative size-[19.993px] shrink-0" data-name="Button">
      <div className="relative flex size-full flex-col content-stretch items-start border-0 border-solid border-[transparent] bg-clip-padding">
        <Icon6 />
      </div>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="relative h-[23.99px] w-[263.87px] shrink-0" data-name="Paragraph">
      <div className="relative size-full overflow-clip rounded-[inherit] border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="css-ew64yg absolute left-0 top-[0.08px] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] not-italic leading-[24px] text-[#09121c]">
          바닥 쓸기
        </p>
      </div>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="relative h-[19.493px] w-[222.106px] shrink-0" data-name="Paragraph">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="css-ew64yg absolute left-0 top-[-0.46px] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[13px] not-italic leading-[19.5px] text-[#6b7280]">
          홍길동 · 09:00
        </p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="relative h-[24px] w-[1134px] shrink-0" data-name="Container">
      <div className="relative flex size-full content-stretch items-center border-0 border-solid border-[transparent] bg-clip-padding">
        <Paragraph11 />
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="relative h-[23.99px] w-[40.333px] shrink-0" data-name="Text">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="css-4hzbpn absolute left-[calc(50%+0.3px)] top-[0.46px] w-[40px] translate-x-[-50%] text-center font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] not-italic leading-[24px] tracking-[0.21px] text-[#09121c]">
          삭제
        </p>
      </div>
    </div>
  );
}

function CustomTimePicker4() {
  return (
    <div
      className="absolute left-[1037.39px] top-[7.54px] h-[41.061px] w-[97.399px] rounded-[10px] bg-white"
      data-name="CustomTimePicker"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[10px] border-[0.542px] border-solid border-[#e0e0e0]"
      />
      <div className="relative flex size-full content-stretch items-center justify-center border-0 border-solid border-[transparent] bg-clip-padding px-[16.538px] py-[0.542px]">
        <Text5 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="relative h-[55.973px] min-h-px min-w-px flex-[1_0_0]" data-name="Container">
      <div className="relative flex size-full flex-col content-stretch items-start gap-[7.994px] border-0 border-solid border-[transparent] bg-clip-padding">
        <Paragraph10 />
        <Container12 />
        <CustomTimePicker4 />
      </div>
    </div>
  );
}

function TaskItem4() {
  return (
    <div className="relative h-[80.513px] w-full shrink-0 rounded-[6px]" data-name="TaskItem">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[6px] border-b-[0.542px] border-solid border-[#f0f0f0]"
      />
      <div className="flex size-full flex-row items-center">
        <div className="relative flex size-full content-stretch items-center gap-[11.999px] px-[7.994px] pb-[0.542px] pt-0">
          <Button5 />
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute inset-[16.67%_8.33%_33.33%_20.83%] contents" data-name="Group">
      <div
        className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.165px_-3.332px] mask-size-[19.993px_19.993px] absolute inset-[16.67%_8.33%_33.33%_20.83%]"
        data-name="Vector"
        style={{ maskImage: `url('${imgVector}')` }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 14.1616 9.99645"
        >
          <path d={svgPaths.p37b24200} fill="var(--fill-0, #51A8FF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute inset-[12.5%_8.33%_12.5%_12.5%] contents" data-name="Group">
      <div
        className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.499px_-2.499px] mask-size-[19.993px_19.993px] absolute inset-[12.5%]"
        data-name="Vector"
        style={{ maskImage: `url('${imgVector}')` }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 14.9947 14.9947"
        >
          <path d={svgPaths.p20d24100} fill="var(--fill-0, #EAEAEA)" id="Vector" />
        </svg>
      </div>
      <Group8 />
    </div>
  );
}

function ClipPathGroup5() {
  return (
    <div className="absolute inset-0 contents" data-name="Clip path group">
      <Group9 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative h-[19.993px] w-full shrink-0 overflow-clip" data-name="Icon">
      <ClipPathGroup5 />
    </div>
  );
}

function Button6() {
  return (
    <div className="relative size-[19.993px] shrink-0" data-name="Button">
      <div className="relative flex size-full flex-col content-stretch items-start border-0 border-solid border-[transparent] bg-clip-padding">
        <Icon7 />
      </div>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="relative h-[23.99px] w-[263.87px] shrink-0" data-name="Paragraph">
      <div className="relative size-full overflow-clip rounded-[inherit] border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="css-ew64yg absolute left-0 top-[0.08px] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] not-italic leading-[24px] text-[#51a8ff] line-through decoration-solid [text-decoration-skip-ink:none]">
          바닥 닦기
        </p>
      </div>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="relative h-[19.493px] w-[222.775px] shrink-0" data-name="Paragraph">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="css-ew64yg absolute left-0 top-[-0.46px] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[13px] not-italic leading-[19.5px] text-[#6b7280]">
          김길동 · 09:00
        </p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="relative h-[24px] w-[1134px] shrink-0" data-name="Container">
      <div className="relative flex size-full content-stretch items-center border-0 border-solid border-[transparent] bg-clip-padding">
        <Paragraph13 />
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="relative h-[23.99px] w-[40.333px] shrink-0" data-name="Text">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="css-4hzbpn absolute left-[calc(50%+0.3px)] top-[0.46px] w-[40px] translate-x-[-50%] text-center font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] not-italic leading-[24px] tracking-[0.21px] text-[#09121c]">
          삭제
        </p>
      </div>
    </div>
  );
}

function CustomTimePicker5() {
  return (
    <div
      className="absolute left-[1037.39px] top-[7.02px] h-[41.061px] w-[97.399px] rounded-[10px] bg-white"
      data-name="CustomTimePicker"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[10px] border-[0.542px] border-solid border-[#e0e0e0]"
      />
      <div className="relative flex size-full content-stretch items-center justify-center border-0 border-solid border-[transparent] bg-clip-padding px-[16.538px] py-[0.542px]">
        <Text6 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="relative h-[55.973px] min-h-px min-w-px flex-[1_0_0]" data-name="Container">
      <div className="relative flex size-full flex-col content-stretch items-start gap-[7.994px] border-0 border-solid border-[transparent] bg-clip-padding">
        <Paragraph12 />
        <Container14 />
        <CustomTimePicker5 />
      </div>
    </div>
  );
}

function TaskItem5() {
  return (
    <div className="relative h-[80.513px] w-full shrink-0 rounded-[6px]" data-name="TaskItem">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[6px] border-b-[0.542px] border-solid border-[#f0f0f0]"
      />
      <div className="flex size-full flex-row items-center">
        <div className="relative flex size-full content-stretch items-center gap-[11.999px] px-[7.994px] pb-[0.542px] pt-0">
          <Button6 />
          <Container15 />
        </div>
      </div>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute inset-[16.67%_8.33%_33.33%_20.83%] contents" data-name="Group">
      <div
        className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.165px_-3.332px] mask-size-[19.993px_19.993px] absolute inset-[16.67%_8.33%_33.33%_20.83%]"
        data-name="Vector"
        style={{ maskImage: `url('${imgVector}')` }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 14.1616 9.99645"
        >
          <path d={svgPaths.p37b24200} fill="var(--fill-0, #51A8FF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute inset-[12.5%_8.33%_12.5%_12.5%] contents" data-name="Group">
      <div
        className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.499px_-2.499px] mask-size-[19.993px_19.993px] absolute inset-[12.5%]"
        data-name="Vector"
        style={{ maskImage: `url('${imgVector}')` }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 14.9947 14.9947"
        >
          <path d={svgPaths.p20d24100} fill="var(--fill-0, #EAEAEA)" id="Vector" />
        </svg>
      </div>
      <Group10 />
    </div>
  );
}

function ClipPathGroup6() {
  return (
    <div className="absolute inset-0 contents" data-name="Clip path group">
      <Group11 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative h-[19.993px] w-full shrink-0 overflow-clip" data-name="Icon">
      <ClipPathGroup6 />
    </div>
  );
}

function Button7() {
  return (
    <div className="relative size-[19.993px] shrink-0" data-name="Button">
      <div className="relative flex size-full flex-col content-stretch items-start border-0 border-solid border-[transparent] bg-clip-padding">
        <Icon8 />
      </div>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="relative h-[23.99px] w-[263.87px] shrink-0" data-name="Paragraph">
      <div className="relative size-full overflow-clip rounded-[inherit] border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="css-ew64yg absolute left-0 top-[0.08px] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] not-italic leading-[24px] text-[#51a8ff] line-through decoration-solid [text-decoration-skip-ink:none]">
          쓰레기통 비우기
        </p>
      </div>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="relative h-[19.493px] w-[222.835px] shrink-0" data-name="Paragraph">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="css-ew64yg absolute left-0 top-[-0.46px] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[13px] not-italic leading-[19.5px] text-[#6b7280]">
          이길동 · 09:00
        </p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="relative h-[24px] w-[1134px] shrink-0" data-name="Container">
      <div className="relative flex size-full content-stretch items-center border-0 border-solid border-[transparent] bg-clip-padding">
        <Paragraph15 />
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="relative h-[23.99px] w-[40.333px] shrink-0" data-name="Text">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="css-4hzbpn absolute left-[calc(50%+0.3px)] top-[0.46px] w-[40px] translate-x-[-50%] text-center font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] not-italic leading-[24px] tracking-[0.21px] text-[#09121c]">
          삭제
        </p>
      </div>
    </div>
  );
}

function CustomTimePicker6() {
  return (
    <div
      className="absolute left-[1037.39px] top-[7.51px] h-[41.061px] w-[97.399px] rounded-[10px] bg-white"
      data-name="CustomTimePicker"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[10px] border-[0.542px] border-solid border-[#e0e0e0]"
      />
      <div className="relative flex size-full content-stretch items-center justify-center border-0 border-solid border-[transparent] bg-clip-padding px-[16.538px] py-[0.542px]">
        <Text7 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="relative h-[55.973px] min-h-px min-w-px flex-[1_0_0]" data-name="Container">
      <div className="relative flex size-full flex-col content-stretch items-start gap-[7.994px] border-0 border-solid border-[transparent] bg-clip-padding">
        <Paragraph14 />
        <Container16 />
        <CustomTimePicker6 />
      </div>
    </div>
  );
}

function TaskItem6() {
  return (
    <div className="relative h-[80.513px] w-full shrink-0 rounded-[6px]" data-name="TaskItem">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[6px] border-b-[0.542px] border-solid border-[#f0f0f0]"
      />
      <div className="flex size-full flex-row items-center">
        <div className="relative flex size-full content-stretch items-center gap-[11.999px] px-[7.994px] pb-[0.542px] pt-0">
          <Button7 />
          <Container17 />
        </div>
      </div>
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute inset-[16.67%_8.33%_33.33%_20.83%] contents" data-name="Group">
      <div
        className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.165px_-3.332px] mask-size-[19.993px_19.993px] absolute inset-[16.67%_8.33%_33.33%_20.83%]"
        data-name="Vector"
        style={{ maskImage: `url('${imgVector}')` }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 14.1616 9.99645"
        >
          <path d={svgPaths.p37b24200} fill="var(--fill-0, #51A8FF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute inset-[12.5%_8.33%_12.5%_12.5%] contents" data-name="Group">
      <div
        className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.499px_-2.499px] mask-size-[19.993px_19.993px] absolute inset-[12.5%]"
        data-name="Vector"
        style={{ maskImage: `url('${imgVector}')` }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 14.9947 14.9947"
        >
          <path d={svgPaths.p20d24100} fill="var(--fill-0, #EAEAEA)" id="Vector" />
        </svg>
      </div>
      <Group12 />
    </div>
  );
}

function ClipPathGroup7() {
  return (
    <div className="absolute inset-0 contents" data-name="Clip path group">
      <Group13 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative h-[19.993px] w-full shrink-0 overflow-clip" data-name="Icon">
      <ClipPathGroup7 />
    </div>
  );
}

function Button8() {
  return (
    <div className="relative size-[19.993px] shrink-0" data-name="Button">
      <div className="relative flex size-full flex-col content-stretch items-start border-0 border-solid border-[transparent] bg-clip-padding">
        <Icon9 />
      </div>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="relative h-[23.99px] w-[263.87px] shrink-0" data-name="Paragraph">
      <div className="relative size-full overflow-clip rounded-[inherit] border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="css-ew64yg absolute left-0 top-[0.08px] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] not-italic leading-[24px] text-[#51a8ff] line-through decoration-solid [text-decoration-skip-ink:none]">
          물티슈로 먼지 쌓이는 곳 닦기
        </p>
      </div>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="relative h-[19.493px] w-[223.504px] shrink-0" data-name="Paragraph">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="css-ew64yg absolute left-0 top-[-0.46px] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[13px] not-italic leading-[19.5px] text-[#6b7280]">
          박길동 · 09:00
        </p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="relative h-[24px] w-[1134px] shrink-0" data-name="Container">
      <div className="relative flex size-full content-stretch items-center border-0 border-solid border-[transparent] bg-clip-padding">
        <Paragraph17 />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="relative h-[23.99px] w-[40.333px] shrink-0" data-name="Text">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="css-4hzbpn absolute left-[calc(50%+0.3px)] top-[0.46px] w-[40px] translate-x-[-50%] text-center font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] not-italic leading-[24px] tracking-[0.21px] text-[#09121c]">
          삭제
        </p>
      </div>
    </div>
  );
}

function CustomTimePicker7() {
  return (
    <div
      className="absolute left-[1037.39px] top-[7px] h-[41.061px] w-[97.399px] rounded-[10px] bg-white"
      data-name="CustomTimePicker"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[10px] border-[0.542px] border-solid border-[#e0e0e0]"
      />
      <div className="relative flex size-full content-stretch items-center justify-center border-0 border-solid border-[transparent] bg-clip-padding px-[16.538px] py-[0.542px]">
        <Text8 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="relative h-[55.973px] min-h-px min-w-px flex-[1_0_0]" data-name="Container">
      <div className="relative flex size-full flex-col content-stretch items-start gap-[7.994px] border-0 border-solid border-[transparent] bg-clip-padding">
        <Paragraph16 />
        <Container18 />
        <CustomTimePicker7 />
      </div>
    </div>
  );
}

function TaskItem7() {
  return (
    <div className="relative h-[79.972px] w-full shrink-0 rounded-[6px]" data-name="TaskItem">
      <div className="flex size-full flex-row items-center">
        <div className="relative flex size-full content-stretch items-center gap-[11.999px] px-[7.994px] py-0">
          <Button8 />
          <Container19 />
        </div>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="relative h-[321.512px] w-full shrink-0" data-name="Container">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border-l-[1.626px] border-solid border-[rgba(81,168,255,0.2)]"
      />
      <div className="relative flex size-full flex-col content-stretch items-start py-0 pl-[17.622px] pr-0">
        <TaskItem4 />
        <TaskItem5 />
        <TaskItem6 />
        <TaskItem7 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div
      className="relative flex h-[353.495px] w-full shrink-0 flex-col content-stretch items-start gap-[7.994px]"
      data-name="Container"
    >
      <Paragraph9 />
      <Container20 />
    </div>
  );
}

function Container22() {
  return (
    <div
      className="relative flex h-[730.989px] w-full shrink-0 flex-col content-stretch items-start gap-[23.998px]"
      data-name="Container"
    >
      <Container11 />
      <Container21 />
    </div>
  );
}

function Container23() {
  return (
    <div
      className="relative flex h-[778.977px] w-full shrink-0 flex-col content-stretch items-start gap-[15.996px]"
      data-name="Container"
    >
      <Container1 />
      <Container22 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative size-[15.996px] shrink-0" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 15.996 15.996"
      >
        <g id="Icon">
          <path
            d="M8.6645 3.3325H13.9965"
            id="Vector"
            stroke="var(--stroke-0, #6B7280)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.333"
          />
          <path
            d="M8.6645 7.998H13.9965"
            id="Vector_2"
            stroke="var(--stroke-0, #6B7280)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.333"
          />
          <path
            d="M8.6645 12.6635H13.9965"
            id="Vector_3"
            stroke="var(--stroke-0, #6B7280)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.333"
          />
          <path
            d={svgPaths.p1184c56}
            id="Vector_4"
            stroke="var(--stroke-0, #6B7280)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.333"
          />
          <path
            d={svgPaths.p3afbfd00}
            id="Vector_5"
            stroke="var(--stroke-0, #6B7280)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.333"
          />
        </g>
      </svg>
    </div>
  );
}

function Container24() {
  return (
    <div
      className="relative size-[31.992px] shrink-0 rounded-[10px] bg-[rgba(156,163,175,0.1)]"
      data-name="Container"
    >
      <div className="relative flex size-full content-stretch items-center justify-center border-0 border-solid border-[transparent] bg-clip-padding py-0 pl-0 pr-[0.008px]">
        <Icon10 />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="relative h-[23.99px] w-[73.409px] shrink-0" data-name="Heading 2">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="css-ew64yg absolute left-0 top-[1.17px] font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[16px] not-italic leading-[24px] text-[#09121c]">
          비정기 업무
        </p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div
      className="relative flex h-[31.992px] w-full shrink-0 content-stretch items-center gap-[7.994px]"
      data-name="Container"
    >
      <Container24 />
      <Heading1 />
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute inset-[16.67%_8.33%_33.33%_20.83%] contents" data-name="Group">
      <div
        className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.165px_-3.332px] mask-size-[19.993px_19.993px] absolute inset-[16.67%_8.33%_33.33%_20.83%]"
        data-name="Vector"
        style={{ maskImage: `url('${imgVector}')` }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 14.1616 9.99645"
        >
          <path d={svgPaths.p37b24200} fill="var(--fill-0, #51A8FF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute inset-[12.5%_8.33%_12.5%_12.5%] contents" data-name="Group">
      <div
        className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.499px_-2.499px] mask-size-[19.993px_19.993px] absolute inset-[12.5%]"
        data-name="Vector"
        style={{ maskImage: `url('${imgVector}')` }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 14.9947 14.9947"
        >
          <path d={svgPaths.p20d24100} fill="var(--fill-0, #EAEAEA)" id="Vector" />
        </svg>
      </div>
      <Group14 />
    </div>
  );
}

function ClipPathGroup8() {
  return (
    <div className="absolute inset-0 contents" data-name="Clip path group">
      <Group15 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative h-[19.993px] w-full shrink-0 overflow-clip" data-name="Icon">
      <ClipPathGroup8 />
    </div>
  );
}

function Button9() {
  return (
    <div className="relative size-[19.993px] shrink-0" data-name="Button">
      <div className="relative flex size-full flex-col content-stretch items-start border-0 border-solid border-[transparent] bg-clip-padding">
        <Icon11 />
      </div>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="relative h-[23.99px] w-[263.87px] shrink-0" data-name="Paragraph">
      <div className="relative size-full overflow-clip rounded-[inherit] border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="css-ew64yg absolute left-0 top-[0.08px] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] not-italic leading-[24px] text-[#51a8ff] line-through decoration-solid [text-decoration-skip-ink:none]">
          기록물 정리
        </p>
      </div>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="relative h-[19.493px] w-[222.979px] shrink-0" data-name="Paragraph">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="css-ew64yg absolute left-0 top-[-0.46px] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[13px] not-italic leading-[19.5px] text-[#6b7280]">
          홍길동 · 09:00
        </p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="relative h-[24px] w-[1134px] shrink-0" data-name="Container">
      <div className="relative flex size-full content-stretch items-center border-0 border-solid border-[transparent] bg-clip-padding">
        <Paragraph19 />
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="relative h-[23.99px] w-[40.333px] shrink-0" data-name="Text">
      <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
        <p className="css-4hzbpn absolute left-[calc(50%+0.3px)] top-[0.46px] w-[40px] translate-x-[-50%] text-center font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] not-italic leading-[24px] tracking-[0.21px] text-[#09121c]">
          삭제
        </p>
      </div>
    </div>
  );
}

function CustomTimePicker8() {
  return (
    <div
      className="absolute left-[1037.39px] top-[7.04px] h-[41.061px] w-[97.399px] rounded-[10px] bg-white"
      data-name="CustomTimePicker"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[10px] border-[0.542px] border-solid border-[#e0e0e0]"
      />
      <div className="relative flex size-full content-stretch items-center justify-center border-0 border-solid border-[transparent] bg-clip-padding px-[16.538px] py-[0.542px]">
        <Text9 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="relative h-[55.973px] min-h-px min-w-px flex-[1_0_0]" data-name="Container">
      <div className="relative flex size-full flex-col content-stretch items-start gap-[7.994px] border-0 border-solid border-[transparent] bg-clip-padding">
        <Paragraph18 />
        <Container26 />
        <CustomTimePicker8 />
      </div>
    </div>
  );
}

function TaskItem8() {
  return (
    <div className="relative h-[79.972px] w-full shrink-0 rounded-[6px]" data-name="TaskItem">
      <div className="flex size-full flex-row items-center">
        <div className="relative flex size-full content-stretch items-center gap-[11.999px] px-[7.994px] py-0">
          <Button9 />
          <Container27 />
        </div>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="relative h-[79.972px] w-full shrink-0" data-name="Container">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border-l-[1.626px] border-solid border-[rgba(156,163,175,0.2)]"
      />
      <div className="relative flex size-full flex-col content-stretch items-start py-0 pl-[17.622px] pr-0">
        <TaskItem8 />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div
      className="relative flex h-[127.96px] w-full shrink-0 flex-col content-stretch items-start gap-[15.996px]"
      data-name="Container"
    >
      <Container25 />
      <Container28 />
    </div>
  );
}

function Container30() {
  return (
    <div
      className="relative flex h-[970px] w-full shrink-0 flex-col content-stretch items-start gap-[31.992px]"
      data-name="Container"
    >
      <Container23 />
      <Container29 />
    </div>
  );
}

function Container31() {
  return (
    <div
      className="absolute left-1/2 top-0 flex w-[1200px] max-w-[calc(100%-40px)] -translate-x-1/2 flex-col content-stretch items-center justify-center gap-[24px]"
      data-name="Container"
    >
      <Frame6 />
      <Container30 />
    </div>
  );
}

function Section() {
  return (
    <div className="absolute left-0 right-0 top-[114px] h-[1069px] w-full" data-name="Section">
      <Container31 />
    </div>
  );
}

function Section1() {
  return (
    <div className="absolute left-0 right-0 top-[76px] h-[1261px] w-full" data-name="Section">
      <Section />
    </div>
  );
}

function Frame1() {
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

function Frame4() {
  return (
    <div className="relative flex shrink-0 content-stretch items-center">
      <Frame1 />
    </div>
  );
}

function Frame2() {
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

function Frame5() {
  return (
    <div className="relative flex shrink-0 content-stretch items-center justify-end">
      <div className="relative flex shrink-0 items-center justify-center">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <Frame2 />
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute left-1/2 top-[27px] flex w-[360px] translate-x-[-50%] content-stretch items-center justify-between py-0 pl-0 pr-[2px]">
      <Frame4 />
      <Frame5 />
    </div>
  );
}

function SearchContent() {
  return (
    <div className="absolute left-0 top-[31px] h-[30px] w-[1200px]" data-name="Search content">
      <div className="absolute left-[600px] top-[14px] flex w-[1200px] translate-x-[-50%] translate-y-[-50%] flex-col justify-center text-center font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[40px] not-italic leading-[0] text-[#17191a]">
        <p className="css-4hzbpn leading-[1.25]">2025년 9월</p>
      </div>
    </div>
  );
}

function Container32() {
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
      <Container32 />
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
        <Frame3 />
        <SearchContainer />
      </div>
    </div>
  );
}

function SearchContent1() {
  return (
    <div
      className="absolute left-1/2 top-[23px] h-[30px] w-[1200px] max-w-[calc(100%-40px)] -translate-x-1/2"
      data-name="Search content"
    >
      <div className="flex h-full w-full flex-col justify-center text-center font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[20px] not-italic leading-[0] text-white">
        <p className="css-4hzbpn leading-[1.25]">정보운영팀 출근부 · 업무 관리</p>
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

export default function Manager() {
  return (
    <div className="relative size-full bg-white" data-name="Manager_업무">
      <Section1 />
      <PageHeaderSectionDesktop />
      <HeaderDesktop />
    </div>
  );
}
