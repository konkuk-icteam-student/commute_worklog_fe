interface VerificationButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function VerificationButton({ onClick, disabled = false }: VerificationButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`relative h-[52.984px] w-full rounded-[16px] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)] transition-colors duration-200 ${
        disabled
          ? 'cursor-not-allowed bg-[#eaeaea]'
          : 'cursor-pointer bg-[#51a8ff] hover:bg-[#3d8ee0]'
      }`}
      data-name="verification-button"
    >
      <div className="flex h-full items-center justify-center">
        <p
          className={`whitespace-pre text-nowrap font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[14px] not-italic leading-[21px] tracking-[0.21px] ${
            disabled ? 'text-[#cdcdcd]' : 'text-white'
          }`}
        >
          인증번호 받기
        </p>
      </div>
    </button>
  );
}
