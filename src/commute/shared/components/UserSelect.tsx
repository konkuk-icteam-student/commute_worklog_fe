import { useState, useRef, useEffect } from 'react';

// SVG path for dropdown arrow
const svgPaths = {
  p351ca610: 'M4 6L8 10L12 6',
};

interface UserSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export default function UserSelect({ value, onChange, options }: UserSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter options based on search text
  const filteredOptions = searchText
    ? options.filter((option) => option.includes(searchText))
    : options;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchText('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setSearchText('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Select Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative h-[37.064px] w-[143.871px] shrink-0 rounded-[10px] bg-white"
        data-name="CustomSelect"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[10px] border-[0.542px] border-solid border-gray-200"
        />
        <div className="relative box-border flex h-[37.064px] w-[143.871px] content-stretch items-center justify-between border-0 border-solid border-[transparent] bg-clip-padding px-[12.541px] py-[0.542px]">
          <div
            className="relative h-[28px] min-h-px min-w-px shrink-0 grow basis-0"
            data-name="Text"
          >
            <div className="relative box-border h-[28px] w-full overflow-clip rounded-[inherit] border-0 border-solid border-[transparent] bg-clip-padding">
              <p className="absolute left-0 top-[1.17px] whitespace-pre text-nowrap font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] not-italic leading-[24px] tracking-[0.18px] text-[#09121c]">
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
          className="absolute left-0 top-full z-50 mt-[4px] w-[143.871px] rounded-[10px] bg-white shadow-[0px_4px_20px_0px_rgba(81,168,255,0.15)]"
          data-name="Dropdown"
        >
          <div className="relative flex w-full flex-col content-stretch items-start p-[8px]">
            {/* Search Input */}
            <div className="relative h-[40px] w-full shrink-0" data-name="SearchInput">
              <input
                ref={inputRef}
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="이름 검색"
                className="h-full w-full border-b border-gray-100 px-[12px] py-[8px] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[14px] text-[#09121c] placeholder-gray-400 outline-none"
              />
            </div>

            {/* Options */}
            <div className="scrollbar-hide max-h-[160px] w-full overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`relative h-[40px] w-full shrink-0 hover:bg-gray-50 ${
                      value === option ? 'bg-[#f1f8ff]' : ''
                    }`}
                    data-name="Option"
                  >
                    <div className="relative box-border flex h-[40px] w-full content-stretch items-center border-0 border-solid border-[transparent] bg-clip-padding px-[12px] py-[8px]">
                      <p
                        className={`whitespace-pre text-nowrap font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] not-italic leading-[24px] tracking-[0.18px] ${
                          value === option ? 'text-[#51a8ff]' : 'text-[#09121c]'
                        }`}
                      >
                        {option}
                      </p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="flex h-[40px] items-center justify-center">
                  <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[14px] text-gray-400">
                    결과 없음
                  </p>
                </div>
              )}
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
