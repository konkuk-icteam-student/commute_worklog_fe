import { useState, useRef, useEffect } from 'react';

interface DepartmentSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const departments = [
  '정보운영팀',
  '장학관리팀',
  '도서관',
  '학생지원팀',
  '교무팀',
  '총무팀',
  '기획팀',
  '입학관리팀',
  '취업지원팀',
];

export default function DepartmentSelect({ value, onChange }: DepartmentSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (dept: string) => {
    onChange(dept);
    setIsOpen(false);
    setSearchQuery('');
  };

  const filteredDepartments = departments.filter((dept) =>
    dept.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div ref={containerRef} className="relative h-[52.984px] w-full" data-name="department-select">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="absolute inset-0 cursor-pointer rounded-[16px] bg-white shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[16px] border-[0.542px] border-solid border-[#eaeaea]"
        />
        <div className="absolute inset-0 box-border flex content-stretch items-center justify-between px-[24px] py-[16px]">
          <p
            className={`text-nowrap font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[14px] not-italic leading-[21px] tracking-[0.21px] ${
              value ? 'text-[#09121c]' : 'text-[rgba(9,18,28,0.5)]'
            }`}
          >
            {value || '부서 선택'}
          </p>
          <svg
            className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 16 16"
            opacity="0.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.333"
              d="M4 6l4 4 4-4"
            />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-[58px] z-10 overflow-hidden rounded-[16px] bg-white shadow-[0px_4px_20px_0px_rgba(81,168,255,0.15)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[16px] border-[0.542px] border-solid border-[#eaeaea]"
          />

          {/* 검색 입력 필드 */}
          <div className="border-b border-[#eaeaea] p-[16px]">
            <div className="relative flex items-center">
              <svg
                className="absolute left-[12px] h-[16px] w-[16px] text-[#999]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="부서 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-[8px] border-none bg-[#f9f9f9] py-[8px] pl-[36px] pr-[12px] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[14px] text-[#09121c] outline-none placeholder:text-[#999]"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* 부서 목록 */}
          <div className="scrollbar-custom max-h-[200px] overflow-y-auto">
            {filteredDepartments.length > 0 ? (
              filteredDepartments.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => handleSelect(dept)}
                  className={`w-full px-[24px] py-[12px] text-left font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[14px] tracking-[0.21px] transition-colors ${
                    value === dept
                      ? 'bg-[#f1f8ff] text-[#51a8ff]'
                      : 'text-[#09121c] hover:bg-[#f9f9f9]'
                  }`}
                >
                  {dept}
                </button>
              ))
            ) : (
              <div className="px-[24px] py-[16px] text-center font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[14px] text-[#999]">
                검색 결과가 없습니다
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
