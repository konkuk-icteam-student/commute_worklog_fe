interface ModificationReasonFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ModificationReasonField({ value, onChange }: ModificationReasonFieldProps) {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[7.994px] items-start overflow-clip pb-0 pt-[11.999px] px-[15.996px] relative rounded-[16px] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)] w-full" data-name="Container">
      <div className="h-[19.493px] relative shrink-0 w-full" data-name="Heading 3">
        <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[19.5px] left-0 not-italic text-[#09121c] text-[13px] text-nowrap top-[0.63px] tracking-[0.24px]">수정 사유</p>
        <div className="absolute content-stretch flex h-[15.717px] items-start left-[53.25px] top-[1.63px] w-[5.064px]" data-name="Text">
          <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[19.5px] not-italic relative shrink-0 text-[#f44] text-[13px] text-nowrap tracking-[0.24px]">*</p>
        </div>
      </div>
      <div className="h-[79.997px] relative rounded-[10px] shrink-0 w-full" data-name="Text Area">
        <div className="overflow-clip rounded-[inherit] size-full">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="수정이 필요한 이유를 입력해주세요"
            className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[18px] not-italic text-[12px] text-[#09121c] placeholder:text-[rgba(9,18,28,0.5)] w-full h-full px-[12px] py-[8px] resize-none outline-none border-none bg-transparent"
          />
        </div>
        <div aria-hidden="true" className="absolute border-[#eaeaea] border-[0.542px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
    </div>
  );
}
