interface VerificationCodeFieldProps {
  value: string;
  onChange: (value: string) => void;
  onVerify: () => void;
  disabled?: boolean;
}

export default function VerificationCodeField({
  value,
  onChange,
  onVerify,
  disabled = false,
}: VerificationCodeFieldProps) {
  return (
    <div
      className="relative h-[52.984px] w-full shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)]"
      data-name="verification-code-field"
    >
      {/* Input Container */}
      <div
        className="absolute left-0 top-0 h-full rounded-[16px] bg-white"
        style={{ width: 'calc(100% - 85px)' }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[16px] border-[0.542px] border-solid border-[#eaeaea]"
        />
        <div className="absolute inset-0 flex content-stretch items-center overflow-clip rounded-[16px]">
          <div className="relative box-border flex h-full w-full content-stretch items-center border-0 border-solid border-[transparent] bg-clip-padding px-[24px] py-[16px]">
            <input
              type="text"
              placeholder="인증번호"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className={`w-full flex-1 text-nowrap border-none bg-transparent font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[14px] not-italic leading-[normal] tracking-[0.21px] outline-none ${
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
        disabled={!value || disabled}
        className={`absolute right-0 top-0 h-full w-[73.146px] rounded-[16px] transition-colors duration-200 ${
          value && !disabled
            ? 'cursor-pointer bg-[#51a8ff] hover:bg-[#3d8ee0]'
            : 'cursor-not-allowed bg-[#eaeaea]'
        }`}
      >
        <p
          className={`text-nowrap text-center font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[14px] not-italic leading-[21px] tracking-[0.21px] ${
            value && !disabled ? 'text-white' : 'text-[#cdcdcd]'
          }`}
        >
          {disabled ? '확인 중...' : '확인'}
        </p>
      </button>
    </div>
  );
}
