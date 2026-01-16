import v from '@/worklog/shared/assets/v.svg';
import glasses from '@/worklog/shared/assets/glasses.svg';
import reset from './resetArrow.svg';
const Title = () => {
  return (
    <section className="flex h-[180px] shrink-0 flex-col items-center justify-center border-b border-[#E8EEF2]">
      <div className="flex w-full max-w-[1200px] flex-col gap-8 px-4">
        {/* Main Title */}
        <h1 className="text-center text-[40px] font-bold">자주 하는 질문</h1>

        {/* Controls: Dropdowns & Search */}
        <div className="flex items-center justify-center gap-3">
          {/* 소속 Dropdown */}
          <button className="flex h-[48px] items-center gap-2 rounded-[24px] border border-[#E8EEF2] px-4 hover:bg-gray-50">
            <img src={v} alt="dropdown" />
            <span className="text-[16px] text-[#8C9499]">소속</span>
          </button>

          {/* 분류 Dropdown */}
          <button className="flex h-[48px] items-center gap-2 rounded-[24px] border border-[#E8EEF2] px-4 hover:bg-gray-50">
            <img src={v} alt="dropdown" />
            <span className="text-[16px] text-[#8C9499]">분류</span>
          </button>

          {/* 제목 + 내용 Dropdown */}
          <button className="flex h-[48px] items-center gap-2 rounded-[24px] border border-[#E8EEF2] px-4 hover:bg-gray-50">
            <img src={v} alt="dropdown" />
            <span className="text-[16px] text-[#8C9499]">제목 + 내용</span>
          </button>

          {/* Search Bar */}
          <div className="flex h-[48px] w-[480px] items-center gap-2 rounded-[24px] border border-[#E8EEF2] px-4 focus-within:border-blue-400">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="h-full w-full bg-transparent text-[16px] outline-none placeholder:text-[#8C9499]"
            />
            <img src={glasses} alt="검색" className="cursor-pointer" />
          </div>

          {/* 제목 + 내용 Dropdown */}
          <button className="flex h-[48px] items-center gap-2 rounded-[24px] border border-[#E8EEF2] px-4 hover:bg-gray-50">
            <img src={v} alt="dropdown" />
            <span className="text-[16px] text-[#464A4D]">2025.05.14 ~ 2025.09.14</span>
          </button>

          <img
            src={reset}
            alt="reset"
            className="cursor-pointer"
            onClick={() => console.log('날짜 초기화 버튼 클릭!')}
          />
        </div>
      </div>
    </section>
  );
};

export default Title;
