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
  variant = 'primary',
}: ButtonProps) {
  const baseClasses =
    'box-border content-stretch flex flex-col h-[55.982px] items-start rounded-[4.6rem] w-full transition-colors duration-200';
  const variantClasses = disabled
    ? 'bg-[#eaeaea] cursor-not-allowed'
    : variant === 'primary'
      ? 'bg-[#51a8ff] hover:bg-[#3d8ee0] cursor-pointer'
      : 'bg-[#eaeaea] hover:bg-[#d5d5d5] cursor-pointer';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses}`}
      data-name="Button"
    >
      <div className="flex h-full w-full items-center justify-center">
        <p
          className={`whitespace-pre text-nowrap text-center font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] not-italic leading-[24px] tracking-[0.24px] ${
            disabled ? 'text-[#cdcdcd]' : variant === 'primary' ? 'text-white' : 'text-[#09121c]'
          }`}
        >
          {children}
        </p>
      </div>
    </button>
  );
}
