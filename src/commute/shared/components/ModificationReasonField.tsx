interface ModificationReasonFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ModificationReasonField({ value, onChange }: ModificationReasonFieldProps) {
  return (
    <div
      className="relative flex w-full flex-col content-stretch items-start gap-[7.994px] overflow-clip rounded-[16px] bg-white px-[15.996px] pb-0 pt-[11.999px] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)]"
      data-name="Container"
    >
      <div className="relative h-[19.493px] w-full shrink-0" data-name="Heading 3">
        <p className="absolute left-0 top-[0.63px] text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[13px] not-italic leading-[19.5px] tracking-[0.24px] text-[#09121c]">
          수정 사유
        </p>
        <div
          className="absolute left-[53.25px] top-[1.63px] flex h-[15.717px] w-[5.064px] content-stretch items-start"
          data-name="Text"
        >
          <p className="relative shrink-0 text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[13px] not-italic leading-[19.5px] tracking-[0.24px] text-[#f44]">
            *
          </p>
        </div>
      </div>
      <div className="relative h-[79.997px] w-full shrink-0 rounded-[10px]" data-name="Text Area">
        <div className="size-full overflow-clip rounded-[inherit]">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="수정이 필요한 이유를 입력해주세요"
            className="h-full w-full resize-none border-none bg-transparent px-[12px] py-[8px] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[12px] not-italic leading-[18px] text-[#09121c] outline-none placeholder:text-[rgba(9,18,28,0.5)]"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[10px] border-[0.542px] border-solid border-[#eaeaea]"
        />
      </div>
    </div>
  );
}
