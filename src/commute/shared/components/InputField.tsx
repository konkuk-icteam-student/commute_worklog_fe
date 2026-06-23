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
  verified = false,
}: InputFieldProps) {
  return (
    <div className="relative h-[5.3rem] w-full" data-name="input-field">
      <div className="absolute inset-0 rounded-[1.6rem] bg-white shadow-[0rem_0.4rem_2rem_0rem_rgba(81,168,255,0.07)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[1.6rem] border-[0.1rem] border-solid border-[#eaeaea]"
        />
      </div>
      <div className="absolute inset-0 flex content-stretch items-center overflow-clip rounded-[1.6rem]">
        <div className="relative box-border flex h-full w-full content-stretch items-center border-0 border-solid border-[transparent] bg-clip-padding px-[2.4rem] py-[1.6rem]">
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full flex-1 text-nowrap border-none bg-transparent font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.4rem] not-italic leading-[normal] tracking-[0.0rem] outline-none ${
              value ? 'text-[#09121c]' : 'text-[rgba(9,18,28,0.5)]'
            }`}
          />
          {verified && (
            <svg className="ml-2 h-5 w-5 text-[#51a8ff]" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
