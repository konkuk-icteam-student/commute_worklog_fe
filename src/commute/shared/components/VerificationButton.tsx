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
      className={`relative w-full h-[52.984px] rounded-[16px] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)] transition-colors duration-200 ${
        disabled
          ? 'bg-[#eaeaea] cursor-not-allowed'
          : 'bg-[#51a8ff] hover:bg-[#3d8ee0] cursor-pointer'
      }`}
      data-name="verification-button"
    >
      <div className="flex items-center justify-center h-full">
        <p className={`font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[21px] not-italic text-[14px] text-nowrap tracking-[0.21px] whitespace-pre ${
          disabled ? 'text-[#cdcdcd]' : 'text-white'
        }`}>
          인증번호 받기
        </p>
      </div>
    </button>
  );
}
