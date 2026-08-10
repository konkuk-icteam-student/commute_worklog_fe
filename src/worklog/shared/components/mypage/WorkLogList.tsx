import { useState, useEffect } from 'react';
import { getMyPageProfile, type MyPageProfile } from '../../apis/mypage/mypage.api';
import Mylog from './mylog.svg';
import Draftlist from './draftlist.svg';
import rightArrow from '../../assets/rightarrow.svg';

// 💡 1. 방금 만든 모달 컴포넌트를 불러옵니다. (같은 폴더에 있다고 가정)
import WorklogModal from './WorklogModal';

const WorkLogList = () => {
  const [profile, setProfile] = useState<MyPageProfile | null>(null);

  // 💡 2. 모달의 열림 여부와 어떤 타입(published or draft)을 열 것인지 관리하는 상태를 추가합니다.
  const [modalConfig, setModalConfig] = useState<{ isOpen: boolean; type: 'published' | 'draft' }>({
    isOpen: false,
    type: 'published',
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const data = await getMyPageProfile();
        setProfile(data);
      } catch (error) {
        console.error('카운트 정보 조회 실패:', error);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-[1090px] flex-col rounded-[20px] border-[1.5px] border-[#E8EEF2] bg-white">
      <div className="px-8 pb-4 pt-8">
        <h2 className="text-[22px] font-bold text-[#464A4D]">업무일지 조회</h2>
      </div>

      <div className="flex flex-col gap-6 px-8 pb-10 pt-4">
        {/* 1. 내가 작성한 업무 일지 */}
        {/* 💡 3. onClick 이벤트를 달아서 모달 상태를 published로 열어줍니다. (hover 효과도 살짝 추가) */}
        <div
          className="group flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors hover:bg-gray-50"
          onClick={() => setModalConfig({ isOpen: true, type: 'published' })}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[12px]">
              <img src={Mylog} alt="내가 작성한 업무 일지" />
            </div>
            <span className="text-[18px] font-bold text-[#464A4D]">내가 작성한 업무 일지</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[16px] text-[#464A4D]">
              총 <span className="font-bold text-[#17191A]">{profile?.publishedCount || 0}</span>건
            </span>
            <img
              src={rightArrow}
              alt="우측 화살표"
              className="transition-transform group-hover:translate-x-1"
            />
          </div>
        </div>

        {/* 2. 임시저장 업무 일지 */}
        {/* 💡 3. onClick 이벤트를 달아서 모달 상태를 draft로 열어줍니다. */}
        <div
          className="group flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors hover:bg-gray-50"
          onClick={() => setModalConfig({ isOpen: true, type: 'draft' })}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[12px]">
              <img src={Draftlist} alt="임시저장 업무 일지" />
            </div>
            <span className="text-[18px] font-bold text-[#464A4D]">임시저장 업무 일지</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[16px] text-[#464A4D]">
              총 <span className="font-bold text-[#17191A]">{profile?.draftCount || 0}</span>건
            </span>
            <img
              src={rightArrow}
              alt="우측 화살표"
              className="transition-transform group-hover:translate-x-1"
            />
          </div>
        </div>
      </div>

      {/* 💡 4. 모달 상태가 true일 때 모달 컴포넌트를 렌더링합니다. */}
      {modalConfig.isOpen && (
        <WorklogModal
          isOpen={modalConfig.isOpen}
          type={modalConfig.type}
          onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))} // 닫기 콜백
        />
      )}
    </div>
  );
};

export default WorkLogList;
