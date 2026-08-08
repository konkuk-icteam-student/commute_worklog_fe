import { useState } from 'react';
import { type DateRange } from 'react-day-picker';
import v from '@/worklog/shared/assets/v.svg';
import glasses from '@/worklog/shared/assets/glasses.svg';
import reset from './resetArrow.svg';
import DateRangePicker from '@/worklog/shared/components/faq/DateRangePicker';

const Title = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  });

  const handleReset = () => {
    setDateRange({
      from: new Date(),
      to: undefined,
    });
    console.log('날짜가 오늘로 초기화되었습니다.');
  };

  return (
    <section className="flex h-[180px] shrink-0 flex-col items-center justify-center border-b border-[#E8EEF2]">
      {/* 💡 핵심 변경: 전체를 감싸는 컨테이너에 overflow-x-auto를 주어 가로 스크롤을 활성화합니다. */}
      <div className="scrollbar-hide w-full overflow-x-auto">
        {/* 💡 내부 컨텐츠가 절대 찌그러지지 않도록 min-w-max를 부여합니다. */}
        <div className="mx-auto flex min-w-max flex-col gap-8 px-8 py-4">
          {/* Main Title */}
          <h1 className="text-center text-[40px] font-bold">자주 하는 질문</h1>

          {/* Controls: Dropdowns & Search */}
          <div className="flex items-center justify-center gap-3">
            {/* 소속 Dropdown */}
            {/* 💡 텍스트가 밑으로 떨어지지 않게 whitespace-nowrap 추가, 버튼이 안 줄어들게 shrink-0 추가 */}
            <button className="flex h-[48px] shrink-0 items-center gap-2 rounded-[24px] border border-[#E8EEF2] px-4 hover:bg-gray-50">
              <img src={v} alt="dropdown" className="shrink-0" />
              <span className="whitespace-nowrap text-[16px] text-[#8C9499]">소속</span>
            </button>

            {/* 분류 Dropdown */}
            <button className="flex h-[48px] shrink-0 items-center gap-2 rounded-[24px] border border-[#E8EEF2] px-4 hover:bg-gray-50">
              <img src={v} alt="dropdown" className="shrink-0" />
              <span className="whitespace-nowrap text-[16px] text-[#8C9499]">분류</span>
            </button>

            {/* 제목 + 내용 Dropdown */}
            <button className="flex h-[48px] shrink-0 items-center gap-2 rounded-[24px] border border-[#E8EEF2] px-4 hover:bg-gray-50">
              <img src={v} alt="dropdown" className="shrink-0" />
              <span className="whitespace-nowrap text-[16px] text-[#8C9499]">제목 + 내용</span>
            </button>

            {/* Search Bar */}
            <div className="flex h-[48px] w-[300px] shrink-0 items-center gap-2 rounded-[24px] border border-[#E8EEF2] px-4 focus-within:border-blue-400 sm:w-[480px]">
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="h-full w-full bg-transparent text-[16px] outline-none placeholder:text-[#8C9499]"
              />
              <img src={glasses} alt="검색" className="shrink-0 cursor-pointer" />
            </div>

            {/* 날짜 선택기 영역 */}
            <div className="shrink-0">
              <DateRangePicker range={dateRange} onRangeChange={setDateRange} />
            </div>

            {/* 초기화 버튼 */}
            <img
              src={reset}
              alt="reset"
              className="shrink-0 cursor-pointer hover:opacity-70"
              onClick={handleReset}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Title;
