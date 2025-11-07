interface InputFieldProps {
  type: 'text' | 'email' | 'password';
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  verified?: boolean;
}

export default function InputField({
  type,
  placeholder,
  value,
  onChange,
  verified = false
}: InputFieldProps) {
  return (
    <div className="relative w-full h-[52.984px]" data-name="input-field">
      <div className="absolute inset-0 bg-white rounded-[16px] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)]">
        <div aria-hidden="true" className="absolute border-[#eaeaea] border-[0.542px] border-solid inset-0 pointer-events-none rounded-[16px]" />
      </div>
      <div className="absolute inset-0 content-stretch flex items-center overflow-clip rounded-[16px]">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-full items-center px-[24px] py-[16px] relative w-full">
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[normal] not-italic flex-1 text-[14px] text-nowrap tracking-[0.21px] bg-transparent border-none outline-none w-full ${
              value ? 'text-[#09121c]' : 'text-[rgba(9,18,28,0.5)]'
            }`}
          />
          {verified && (
            <svg className="ml-2 w-5 h-5 text-[#51a8ff]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
