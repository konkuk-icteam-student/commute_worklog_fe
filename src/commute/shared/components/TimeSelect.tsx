import { useState, useRef, useEffect } from 'react';

// SVG path for dropdown arrow
const svgPaths = {
  p351ca610: "M4 6L8 10L12 6"
};

interface TimeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TimeSelect({ value, onChange }: TimeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Parse current time
  const [hour, minute] = value.split(':');

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = ['00', '15', '30', '45'];

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

  const handleTimeChange = (newHour: string, newMinute: string) => {
    onChange(`${newHour}:${newMinute}`);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Select Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white h-[41.061px] relative rounded-[10px] shrink-0 w-[101.683px]"
        data-name="CustomTimePicker"
      >
        <div aria-hidden="true" className="absolute border-[#e0e0e0] border-[0.542px] border-solid inset-0 pointer-events-none rounded-[10px]" />
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[41.061px] items-center justify-between px-[16.538px] py-[0.542px] relative w-[101.683px]">
          <div className="h-[28px] relative shrink-0 w-[45px]" data-name="Text">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[45px]">
              <p className="absolute font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#09121c] text-[16px] text-nowrap top-[1.17px] tracking-[0.21px] whitespace-pre">{value}</p>
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
        <div className="absolute bg-white left-0 mt-[4px] rounded-[10px] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.15)] top-full w-[160px] z-50" data-name="TimeDropdown">
          <div className="content-stretch flex p-[8px] relative w-full">
            {/* Hours Column */}
            <div className="basis-0 grow flex flex-col items-center min-h-px min-w-px relative shrink-0">
              <div className="h-[32px] relative shrink-0 w-full" data-name="Header">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-center justify-center px-[4px] py-[4px] relative w-full">
                  <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[24px] not-italic text-[#51a8ff] text-[14px] text-nowrap tracking-[0.18px] whitespace-pre">시</p>
                </div>
              </div>
              <div className="max-h-[200px] overflow-y-auto relative shrink-0 w-full">
                {hours.map((h) => (
                  <button
                    key={h}
                    onClick={() => handleTimeChange(h, minute)}
                    className={`h-[36px] relative shrink-0 w-full hover:bg-gray-50 ${
                      hour === h ? 'bg-[#f1f8ff]' : ''
                    }`}
                    data-name="Option"
                  >
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[36px] items-center justify-center px-[8px] py-[6px] relative w-full">
                      <p className={`font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[24px] not-italic text-[16px] text-nowrap tracking-[0.18px] whitespace-pre ${
                        hour === h ? 'text-[#51a8ff]' : 'text-[#09121c]'
                      }`}>{h}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="bg-gray-200 relative shrink-0 w-[1px]" />

            {/* Minutes Column */}
            <div className="basis-0 grow flex flex-col items-center min-h-px min-w-px relative shrink-0">
              <div className="h-[32px] relative shrink-0 w-full" data-name="Header">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-center justify-center px-[4px] py-[4px] relative w-full">
                  <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[24px] not-italic text-[#51a8ff] text-[14px] text-nowrap tracking-[0.18px] whitespace-pre">분</p>
                </div>
              </div>
              <div className="max-h-[200px] overflow-y-auto relative shrink-0 w-full">
                {minutes.map((m) => (
                  <button
                    key={m}
                    onClick={() => handleTimeChange(hour, m)}
                    className={`h-[36px] relative shrink-0 w-full hover:bg-gray-50 ${
                      minute === m ? 'bg-[#f1f8ff]' : ''
                    }`}
                    data-name="Option"
                  >
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[36px] items-center justify-center px-[8px] py-[6px] relative w-full">
                      <p className={`font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[24px] not-italic text-[16px] text-nowrap tracking-[0.18px] whitespace-pre ${
                        minute === m ? 'text-[#51a8ff]' : 'text-[#09121c]'
                      }`}>{m}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
