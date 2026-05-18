import Mylog from './mylog.svg';
import Draftlist from './draftlist.svg';
import rightArrow from '../../assets/rightarrow.svg';
const WorkLogList = () => {
  return (
    // 전체 컨테이너 (ProfileBox와 동일한 반응형 및 테두리 스타일)
    <div className="mx-auto flex w-full max-w-[1090px] flex-col rounded-[20px] border-[1.5px] border-[#E8EEF2] bg-white">
      {/* 헤더 타이틀 */}
      <div className="px-8 pb-4 pt-8">
        <h2 className="text-[22px] font-bold text-[#464A4D]">업무일지 조회</h2>
      </div>

      {/* 리스트 영역 */}
      <div className="flex flex-col gap-8 px-8 pb-10 pt-4">
        {/* 1. 내가 작성한 업무 일지 */}
        <div className="group flex cursor-pointer items-center justify-between">
          <div className="flex items-center gap-4">
            {/* 아이콘 박스 */}
            <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[12px]">
              <img src={Mylog} alt="내가 작성한 업무 일지" />
            </div>
            <span className="text-[18px] font-bold text-[#464A4D]">내가 작성한 업무 일지</span>
          </div>

          <div className="flex items-center gap-4">
            {/* 건수 텍스트 */}
            <span className="text-[16px] text-[#464A4D]">
              총 <span className="font-bold text-[#17191A]">24</span>건
            </span>
            {/* 우측 화살표 (Hover 시 우측으로 살짝 이동) */}
            <img src={rightArrow} alt="우측 화살표" />
          </div>
        </div>

        {/* 2. 임시저장 업무 일지 */}
        <div className="group flex cursor-pointer items-center justify-between">
          <div className="flex items-center gap-4">
            {/* 아이콘 박스 */}
            <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[12px]">
              <img src={Draftlist} alt="임시저장 업무 일지" />
            </div>
            <span className="text-[18px] font-bold text-[#464A4D]">임시저장 업무 일지</span>
          </div>

          <div className="flex items-center gap-4">
            {/* 건수 텍스트 */}
            <span className="text-[16px] text-[#464A4D]">
              총 <span className="font-bold text-[#17191A]">4</span>건
            </span>
            {/* 우측 화살표 */}
            <img src={rightArrow} alt="우측 화살표" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkLogList;
