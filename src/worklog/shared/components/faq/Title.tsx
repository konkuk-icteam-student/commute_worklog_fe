import { useState } from 'react';
import { type DateRange } from 'react-day-picker';
import v from '@/worklog/shared/assets/v.svg';
import glasses from '@/worklog/shared/assets/glasses.svg';
import reset from './resetArrow.svg';
import DateRangePicker from '@/worklog/shared/components/faq/DateRangePicker';
import type { Organization } from '@/worklog/shared/apis/organization/Organization.api';
import type { Category } from '@/worklog/shared/apis/categories/categories.api';

interface TitleProps {
  keywordInput: string;
  setKeywordInput: (val: string) => void;
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  onReset: () => void;
  // 소속 및 분류 관련 Props
  organizations: Organization[];
  categories: Category[];
  selectedOrgId: number | null;
  setSelectedOrgId: (id: number | null) => void;
  selectedCatId: number | null;
  setSelectedCatId: (id: number | null) => void;
}

const Title = ({
  keywordInput,
  setKeywordInput,
  dateRange,
  setDateRange,
  onReset,
  organizations,
  categories,
  selectedOrgId,
  setSelectedOrgId,
  selectedCatId,
  setSelectedCatId,
}: TitleProps) => {
  // 드롭다운 열림/닫힘 상태
  const [isOrgOpen, setIsOrgOpen] = useState(false);
  const [isCatOpen, setIsCatOpen] = useState(false);

  // 현재 선택된 소속/분류 이름 찾기
  const selectedOrgName =
    organizations.find((o) => o.organizationId === selectedOrgId)?.organizationName || '소속';
  const selectedCatName =
    categories.find((c) => c.categoryId === selectedCatId)?.categoryName || '분류';

  return (
    // 💡 overflow-x-auto를 제거하여 DatePicker 달력 팝업이 잘리지 않도록 합니다.
    <section className="flex min-h-[180px] shrink-0 flex-col items-center justify-center border-b border-[#E8EEF2] py-6">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-4">
        {/* Main Title */}
        <h1 className="text-center text-[40px] font-bold">자주 하는 질문</h1>

        {/* Controls: Dropdowns & Search */}
        {/* 💡 화면이 좁아지면 자연스럽게 밑으로 내려가도록 flex-wrap 적용 */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* 소속 Dropdown */}
          <div className="relative shrink-0">
            <button
              onClick={() => {
                setIsOrgOpen(!isOrgOpen);
                setIsCatOpen(false);
              }}
              className={`flex h-[48px] items-center gap-2 rounded-[24px] border px-4 transition-colors ${selectedOrgId ? 'border-blue-300 bg-blue-50' : 'border-[#E8EEF2] hover:bg-gray-50'}`}
            >
              <img
                src={v}
                alt="dropdown"
                className={`shrink-0 transition-transform ${isOrgOpen ? 'rotate-180' : ''}`}
              />
              <span
                className={`whitespace-nowrap text-[16px] ${selectedOrgId ? 'font-bold text-blue-600' : 'text-[#8C9499]'}`}
              >
                {selectedOrgName}
              </span>
            </button>
            {isOrgOpen && (
              <div className="absolute left-0 top-[56px] z-50 max-h-[200px] w-max min-w-[120px] overflow-y-auto rounded-[12px] border border-[#E8EEF2] bg-white py-2 shadow-lg">
                <div
                  className="cursor-pointer px-4 py-2 text-[14px] text-[#464A4D] hover:bg-gray-50"
                  onClick={() => {
                    setSelectedOrgId(null);
                    setIsOrgOpen(false);
                  }}
                >
                  전체보기
                </div>
                {organizations.map((org) => (
                  <div
                    key={org.organizationId}
                    className="cursor-pointer px-4 py-2 text-[14px] text-[#464A4D] hover:bg-gray-50"
                    onClick={() => {
                      setSelectedOrgId(org.organizationId);
                      setIsOrgOpen(false);
                    }}
                  >
                    {org.organizationName}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 분류 Dropdown */}
          <div className="relative shrink-0">
            <button
              onClick={() => {
                setIsCatOpen(!isCatOpen);
                setIsOrgOpen(false);
              }}
              className={`flex h-[48px] items-center gap-2 rounded-[24px] border px-4 transition-colors ${selectedCatId ? 'border-blue-300 bg-blue-50' : 'border-[#E8EEF2] hover:bg-gray-50'}`}
            >
              <img
                src={v}
                alt="dropdown"
                className={`shrink-0 transition-transform ${isCatOpen ? 'rotate-180' : ''}`}
              />
              <span
                className={`whitespace-nowrap text-[16px] ${selectedCatId ? 'font-bold text-blue-600' : 'text-[#8C9499]'}`}
              >
                {selectedCatName}
              </span>
            </button>
            {isCatOpen && (
              <div className="absolute left-0 top-[56px] z-50 max-h-[200px] w-max min-w-[120px] overflow-y-auto rounded-[12px] border border-[#E8EEF2] bg-white py-2 shadow-lg">
                <div
                  className="cursor-pointer px-4 py-2 text-[14px] text-[#464A4D] hover:bg-gray-50"
                  onClick={() => {
                    setSelectedCatId(null);
                    setIsCatOpen(false);
                  }}
                >
                  전체보기
                </div>
                {categories.map((cat) => (
                  <div
                    key={cat.categoryId}
                    className="cursor-pointer px-4 py-2 text-[14px] text-[#464A4D] hover:bg-gray-50"
                    onClick={() => {
                      setSelectedCatId(cat.categoryId);
                      setIsCatOpen(false);
                    }}
                  >
                    {cat.categoryName}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search Bar (실시간 입력) */}
          <div className="flex h-[48px] w-[300px] shrink-0 items-center gap-2 rounded-[24px] border border-[#E8EEF2] px-4 focus-within:border-blue-400 sm:w-[480px]">
            <input
              type="text"
              placeholder="검색어를 입력하세요 (입력 시 자동 검색)"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              className="h-full w-full bg-transparent text-[16px] outline-none placeholder:text-[#8C9499]"
            />
            <img src={glasses} alt="검색" className="shrink-0" />
          </div>

          {/* 날짜 선택기 영역 */}
          <div className="shrink-0">
            <DateRangePicker range={dateRange} onRangeChange={setDateRange} />
          </div>

          {/* 초기화 버튼 */}
          <img
            src={reset}
            alt="reset"
            className="shrink-0 cursor-pointer transition-transform hover:rotate-180 hover:opacity-70"
            onClick={onReset}
          />
        </div>
      </div>
    </section>
  );
};

export default Title;
