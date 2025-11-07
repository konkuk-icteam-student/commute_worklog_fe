interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
}

export default function Button({
  children,
  onClick,
  disabled = false,
  type = 'button',
  variant = 'primary'
}: ButtonProps) {
  const baseClasses = "box-border content-stretch flex flex-col h-[55.982px] items-start rounded-[46px] w-full transition-colors duration-200";
  const variantClasses = disabled
    ? "bg-[#eaeaea] cursor-not-allowed"
    : variant === 'primary'
    ? "bg-[#51a8ff] hover:bg-[#3d8ee0] cursor-pointer"
    : "bg-[#eaeaea] hover:bg-[#d5d5d5] cursor-pointer";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses}`}
      data-name="Button"
    >
      <div className="flex items-center justify-center w-full h-full">
        <p className={`font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[24px] not-italic text-[16px] text-center text-nowrap tracking-[0.24px] whitespace-pre ${
          disabled ? 'text-[#cdcdcd]' : variant === 'primary' ? 'text-white' : 'text-[#09121c]'
        }`}>
          {children}
        </p>
      </div>
    </button>
  );
}
