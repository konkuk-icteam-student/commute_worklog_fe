import { useState, useRef, useEffect } from 'react';

// SVG path for dropdown arrow
const svgPaths = {
  p351ca610: 'M4 6L8 10L12 6',
};

interface TimeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TimeSelect({ value, onChange }: TimeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Parse current time
  const [hourRaw, minuteRaw] = value.split(':');
  const hour = hourRaw || '09';
  const minute = minuteRaw || '00';

  const hours = Array.from({ length: 15 }, (_, i) => (i + 9).toString().padStart(2, '0'));
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
        className="relative h-[41.061px] w-[101.683px] shrink-0 rounded-[10px] bg-white"
        data-name="CustomTimePicker"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[10px] border-[0.542px] border-solid border-[#e0e0e0]"
        />
        <div className="relative box-border flex h-[41.061px] w-[101.683px] content-stretch items-center justify-between border-0 border-solid border-[transparent] bg-clip-padding px-[16.538px] py-[0.542px]">
          <div className="relative h-[28px] w-[45px] shrink-0" data-name="Text">
            <div className="relative box-border h-[28px] w-[45px] border-0 border-solid border-[transparent] bg-clip-padding">
              <p className="absolute left-0 top-[1.17px] whitespace-pre text-nowrap font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] not-italic leading-[24px] tracking-[0.21px] text-[#09121c]">
                {value}
              </p>
            </div>
          </div>
          <div className="relative size-[15.996px] shrink-0" data-name="Icon">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 16 16"
            >
              <g id="Icon">
                <path
                  d={svgPaths.p351ca610}
                  id="Vector"
                  stroke="#09121C"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.333"
                />
              </g>
            </svg>
          </div>
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute left-0 top-full z-50 mt-[4px] w-[160px] rounded-[10px] bg-white shadow-[0px_4px_20px_0px_rgba(81,168,255,0.15)]"
          data-name="TimeDropdown"
        >
          <div className="relative flex w-full content-stretch p-[8px]">
            {/* Hours Column */}
            <div className="relative flex min-h-px min-w-px shrink-0 grow basis-0 flex-col items-center">
              <div className="relative h-[32px] w-full shrink-0" data-name="Header">
                <div className="relative box-border flex h-[32px] w-full content-stretch items-center justify-center border-0 border-solid border-[transparent] bg-clip-padding px-[4px] py-[4px]">
                  <p className="whitespace-pre text-nowrap font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[14px] not-italic leading-[24px] tracking-[0.18px] text-[#51a8ff]">
                    시
                  </p>
                </div>
              </div>
              <div className="scrollbar-hide relative max-h-[200px] w-full shrink-0 overflow-y-auto">
                {hours.map((h) => (
                  <button
                    key={h}
                    onClick={() => handleTimeChange(h, minute)}
                    className={`relative h-[36px] w-full shrink-0 hover:bg-gray-50 ${
                      hour === h ? 'bg-[#f1f8ff]' : ''
                    }`}
                    data-name="Option"
                  >
                    <div className="relative box-border flex h-[36px] w-full content-stretch items-center justify-center border-0 border-solid border-[transparent] bg-clip-padding px-[8px] py-[6px]">
                      <p
                        className={`whitespace-pre text-nowrap font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] not-italic leading-[24px] tracking-[0.18px] ${
                          hour === h ? 'text-[#51a8ff]' : 'text-[#09121c]'
                        }`}
                      >
                        {h}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="relative w-[1px] shrink-0 bg-gray-200" />

            {/* Minutes Column */}
            <div className="relative flex min-h-px min-w-px shrink-0 grow basis-0 flex-col items-center">
              <div className="relative h-[32px] w-full shrink-0" data-name="Header">
                <div className="relative box-border flex h-[32px] w-full content-stretch items-center justify-center border-0 border-solid border-[transparent] bg-clip-padding px-[4px] py-[4px]">
                  <p className="whitespace-pre text-nowrap font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[14px] not-italic leading-[24px] tracking-[0.18px] text-[#51a8ff]">
                    분
                  </p>
                </div>
              </div>
              <div className="scrollbar-hide relative max-h-[200px] w-full shrink-0 overflow-y-auto">
                {minutes.map((m) => (
                  <button
                    key={m}
                    onClick={() => handleTimeChange(hour, m)}
                    className={`relative h-[36px] w-full shrink-0 hover:bg-gray-50 ${
                      minute === m ? 'bg-[#f1f8ff]' : ''
                    }`}
                    data-name="Option"
                  >
                    <div className="relative box-border flex h-[36px] w-full content-stretch items-center justify-center border-0 border-solid border-[transparent] bg-clip-padding px-[8px] py-[6px]">
                      <p
                        className={`whitespace-pre text-nowrap font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] not-italic leading-[24px] tracking-[0.18px] ${
                          minute === m ? 'text-[#51a8ff]' : 'text-[#09121c]'
                        }`}
                      >
                        {m}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
