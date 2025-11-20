import { useState, useRef, useEffect } from 'react';

// SVG path for dropdown arrow
const svgPaths = {
  p351ca610: "M4 6L8 10L12 6"
};

interface UserSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export default function UserSelect({ value, onChange, options }: UserSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Select Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white h-[37.064px] relative rounded-[10px] shrink-0 w-[143.871px]"
        data-name="CustomSelect"
      >
        <div aria-hidden="true" className="absolute border-[0.542px] border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[37.064px] items-center justify-between px-[12.541px] py-[0.542px] relative w-[143.871px]">
          <div className="basis-0 grow h-[28px] min-h-px min-w-px relative shrink-0" data-name="Text">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] overflow-clip relative rounded-[inherit] w-full">
              <p className="absolute font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#09121c] text-[16px] text-nowrap top-[1.17px] tracking-[0.18px] whitespace-pre">{value}</p>
            </div>
          </div>
          <div className="relative shrink-0 size-[15.996px]" data-name="Icon">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <g id="Icon">
                <path d={svgPaths.p351ca610} id="Vector" stroke="#09121C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.333" />
              </g>
            </svg>
          </div>
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute bg-white left-0 mt-[4px] rounded-[10px] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.15)] top-full w-[143.871px] z-50" data-name="Dropdown">
          <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
            {/* Header */}
            <div className="h-[32px] relative shrink-0 w-full" data-name="Header">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-center px-[12px] py-[4px] relative w-full">
                <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[24px] not-italic text-[#51a8ff] text-[14px] text-nowrap tracking-[0.18px] whitespace-pre">담당자 선택</p>
              </div>
            </div>

            {/* Options */}
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`h-[40px] relative shrink-0 w-full hover:bg-gray-50 ${
                  value === option ? 'bg-[#f1f8ff]' : ''
                }`}
                data-name="Option"
              >
                <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[40px] items-center px-[12px] py-[8px] relative w-full">
                  <p className={`font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[24px] not-italic text-[16px] text-nowrap tracking-[0.18px] whitespace-pre ${
                    value === option ? 'text-[#51a8ff]' : 'text-[#09121c]'
                  }`}>{option}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
