import { useNavigate, useLocation } from 'react-router-dom'; // [추가] useLocation
import Header from '@/worklog/shared/components/header/Header';

import CommuteLogo from './logo1.svg';
import WorklogLogo from './logo2.svg';
import RightArrow from '../../shared/assets/rightarrow.svg';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation(); // [추가] 넘어온 state 받기 위함

  // 1. 전달받은 데이터 추출 (우선순위: navigate state -> localStorage -> 기본값)
  // 타입 안전성을 위해 state를 any 또는 인터페이스로 캐스팅
  const state = location.state as { userName: string; roleCode: string } | null;

  const userName = state?.userName || localStorage.getItem('userName') || '게스트';
  const roleCode = state?.roleCode || localStorage.getItem('roleCode') || 'RL01';

  // 2. Role Code 매핑 로직 (RL01: Student, RL02: Manager)
  const roleText = roleCode === 'RL02' ? 'Manager' : 'Student';

  // [Handlers]
  const goToCommute = () => {
    navigate('/home');
  };

  const goToWorklog = () => {
    navigate('/worklog/faq');
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="flex flex-col items-center justify-center border-b border-[#E8EEF2] py-10">
        <div className="flex w-full max-w-[1200px] flex-col items-center gap-8 px-4">
          <h1 className="text-center text-[40px] font-bold text-black">정보운영팀</h1>

          <div className="flex flex-row items-center justify-center gap-[16px]">
            {/* 동적으로 변경된 roleText 표시 */}
            <div className="flex w-[111px] items-center justify-center rounded-[24px] border border-[#E8EEF2] bg-white pb-[13px] pl-[23px] pr-[22px] pt-[11px]">
              <span className="text-[16px] font-medium text-[#464A4D]">{roleText}</span>
            </div>

            {/* 동적으로 변경된 userName 표시 */}
            <div className="text-[16px] text-black">
              <span className="font-[700]">{userName}</span>
              <span className="font-[400]">님 환영합니다.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ... 아래 카드 그리드 영역은 기존 코드와 동일 ... */}
      <div className="flex w-full justify-center pb-20 pt-10">
        <div className="flex flex-row gap-[24px]">
          {/* === [좌측] 출근부 카드 === */}
          <div className="flex h-[344px] w-[384px] flex-col justify-between rounded-[12px] border border-[#E8EEF2] bg-white p-[32px]">
            <div>
              <div className="mb-[24px] flex h-[56px] w-[56px] items-center justify-center rounded-[8px] bg-[#E6E8FF]">
                <img src={CommuteLogo} alt="출근부 로고" />
              </div>
              <div className="flex flex-col gap-[12px]">
                <div className="flex flex-row items-center gap-[8px]">
                  <img src={RightArrow} alt="화살표" />
                  <span className="text-[16px] font-[400] text-[#464A4D]">
                    근로학생 출근부 관리하기
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={goToCommute}
              className="flex h-[36px] w-fit items-center gap-[4px] rounded-[8px] border border-[#E8EEF2] bg-white pb-[8px] pl-[13px] pr-[12px] pt-[8px] hover:bg-gray-50"
            >
              <span className="text-[14px] font-medium text-[#464A4D]">입장하기</span>
              <img src={RightArrow} alt="이동" className="h-[10px] w-[6px]" />
            </button>
          </div>

          {/* === [우측] 업무일지 카드 === */}
          <div className="flex h-[344px] w-[384px] flex-col justify-between rounded-[12px] border border-[#E8EEF2] bg-white p-[32px]">
            <div>
              <div className="mb-[24px] flex h-[56px] w-[56px] items-center justify-center rounded-[8px] bg-[#E6E8FF]">
                <img src={WorklogLogo} alt="업무일지 로고" />
              </div>
              <div className="flex flex-col gap-[12px]">
                <div className="flex flex-row items-center gap-[8px]">
                  <img src={RightArrow} alt="화살표" />
                  <span className="text-[16px] font-[400] text-[#464A4D]">
                    업무 기록지 작성하기
                  </span>
                </div>
                <div className="flex flex-row items-center gap-[8px]">
                  <img src={RightArrow} alt="화살표" />
                  <span className="text-[16px] font-[400] text-[#464A4D]">담당자 관리하기</span>
                </div>
                <div className="flex flex-row items-center gap-[8px]">
                  <img src={RightArrow} alt="화살표" />
                  <span className="text-[16px] font-[400] text-[#464A4D]">소속·분류 관리하기</span>
                </div>
              </div>
            </div>
            <button
              onClick={goToWorklog}
              className="flex h-[36px] w-fit items-center gap-[4px] rounded-[8px] border border-[#E8EEF2] bg-white pb-[8px] pl-[13px] pr-[12px] pt-[8px] hover:bg-gray-50"
            >
              <span className="text-[14px] font-medium text-[#464A4D]">입장하기</span>
              <img src={RightArrow} alt="이동" className="h-[10px] w-[6px]" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
