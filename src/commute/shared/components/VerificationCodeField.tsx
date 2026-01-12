interface VerificationCodeFieldProps {
  value: string;
  onChange: (value: string) => void;
  onVerify: () => void;
}

export default function VerificationCodeField({
  value,
  onChange,
  onVerify
}: VerificationCodeFieldProps) {
  return (
    <div className="relative w-full h-[52.984px] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)]" data-name="verification-code-field">
      {/* Input Container */}
      <div className="absolute left-0 top-0 bg-white rounded-[16px] h-full" style={{ width: 'calc(100% - 85px)' }}>
        <div aria-hidden="true" className="absolute border-[#eaeaea] border-[0.542px] border-solid inset-0 pointer-events-none rounded-[16px]" />
        <div className="absolute inset-0 content-stretch flex items-center overflow-clip rounded-[16px]">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-full items-center px-[24px] py-[16px] relative w-full">
            <input
              type="text"
              placeholder="인증번호"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className={`font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[normal] not-italic flex-1 text-[14px] text-nowrap tracking-[0.21px] bg-transparent border-none outline-none w-full ${
                value ? 'text-[#09121c]' : 'text-[rgba(9,18,28,0.5)]'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Verify Button */}
      <button
        type="button"
        onClick={onVerify}
        disabled={!value}
        className={`absolute right-0 top-0 h-full w-[73.146px] rounded-[16px] transition-colors duration-200 ${
          value
            ? 'bg-[#51a8ff] hover:bg-[#3d8ee0] cursor-pointer'
            : 'bg-[#eaeaea] cursor-not-allowed'
        }`}
      >
        <p className={`font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[21px] not-italic text-[14px] text-center text-nowrap tracking-[0.21px] ${
          value ? 'text-white' : 'text-[#cdcdcd]'
        }`}>
          확인
        </p>
      </button>
    </div>
  );
}
