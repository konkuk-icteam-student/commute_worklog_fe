import { useState } from 'react';
import logoutlogo from './logoutlogo.svg';
import { logout } from '@/shared/apis/auth.api';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [isLoggingOut, setIsLoggingOut] = useState(false); // 로그아웃 진행 상태 (버튼 연타 방지)

  // 로그아웃 버튼 클릭 시 모달 열기
  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  // 모달에서 '예' 클릭 시 실제 로그아웃 처리
  const confirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      console.log('로그아웃 성공!');
      setIsModalOpen(false);
      navigate('/'); // 로그아웃 후 루트 페이지로 이동
    } catch (error) {
      console.error('로그아웃 실패:', error);
      // API 실패 시에도 토큰은 지워지도록 auth.api.ts에 구현되어 있으므로 강제 이동시킬지 선택 가능합니다.
      // navigate('/');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* 전체 컨테이너 */}
      <div className="mx-auto flex w-full max-w-[1090px] items-center justify-between rounded-[20px] border-[1.5px] border-[#E8EEF2] bg-white px-8 py-8">
        {/* 좌측 텍스트 영역 */}
        <div className="flex flex-col gap-2">
          <h2 className="text-[22px] font-bold text-[#464A4D]">로그아웃</h2>
          <p className="text-[15px] font-medium text-[#A9AFB2]">현재 계정에서 로그아웃합니다.</p>
        </div>

        {/* 우측 로그아웃 버튼 */}
        <button
          onClick={handleLogoutClick}
          className="flex items-center gap-2 rounded-[8px] border-[1.5px] border-[#E8EEF2] px-5 py-2.5 text-[14px] font-bold text-[#464A4D] transition-colors hover:bg-gray-50"
        >
          <img src={logoutlogo} alt="로그아웃 아이콘" className="h-[16px] w-[16px]" />
          <span>로그아웃 하기</span>
        </button>
      </div>

      {/* 로그아웃 확인 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="flex w-[320px] flex-col items-center gap-6 rounded-[16px] bg-white p-6 shadow-xl">
            <h3 className="text-[18px] font-bold text-[#17191A]">로그아웃 하시겠습니까?</h3>

            <div className="flex w-full gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isLoggingOut}
                className="flex-1 rounded-[8px] bg-gray-100 py-2.5 text-[14px] font-bold text-[#464A4D] hover:bg-gray-200"
              >
                아니오
              </button>
              <button
                onClick={confirmLogout}
                disabled={isLoggingOut}
                className="flex flex-1 items-center justify-center rounded-[8px] bg-[#3B82F6] py-2.5 text-[14px] font-bold text-white hover:bg-blue-600"
              >
                {isLoggingOut ? '처리 중...' : '예'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;
