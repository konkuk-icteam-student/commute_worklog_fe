import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../../shared/apis/auth.api';
interface NavProps {
  isOpen: boolean;
}

const Nav = ({ isOpen }: NavProps) => {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      // 1. 로그아웃 API 호출 (내부적으로 로컬스토리지 토큰 삭제됨)
      await logout();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
      navigate('/', { replace: true });
    } finally {
      setIsLogoutModalOpen(false); // 로그아웃 후 모달 닫기
    }
  };

  return (
    <>
      <div
        className={`flex flex-col gap-[20px] overflow-hidden border-r border-[#E8EEF2] bg-white transition-all duration-300 ease-in-out ${isOpen ? 'w-[200px] p-[30px] opacity-100' : 'w-0 border-none p-0 opacity-0'} `}
      >
        <div className="flex min-w-[140px] flex-col gap-[20px] whitespace-nowrap">
          {/** 
        <span
          className="cursor-pointer text-[16px] font-[400] text-[#464A4D]"
          onClick={() => {
            navigate('/branch');
          }}
        >
          홈
        </span>
        */}
          <div className="flex flex-col">
            <span className="text-[18px] font-[700] text-[#464A4D]">업무일지</span>
            <span
              className="cursor-pointer text-[16px] font-[400] text-[#464A4D]"
              onClick={() => {
                navigate('/worklog/faq');
              }}
            >
              FAQ
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[18px] font-[700] text-[#464A4D]">AI</span>
            <span
              className="cursor-pointer text-[16px] font-[400] text-[#464A4D]"
              onClick={() => {
                navigate('/worklog/chat');
              }}
            >
              AI 챗봇
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[18px] font-[700] text-[#464A4D]">설정</span>
            <span
              className="cursor-pointer text-[16px] font-[400] text-[#464A4D]"
              onClick={() => {
                navigate('/worklog/category/department');
              }}
            >
              소속관리
            </span>
            <span
              className="cursor-pointer text-[16px] font-[400] text-[#464A4D]"
              onClick={() => {
                navigate('/worklog/category/task');
              }}
            >
              분류관리
            </span>
            <span
              className="cursor-pointer text-[16px] font-[400] text-[#464A4D]"
              onClick={() => {
                navigate('/worklog/category/manager');
              }}
            >
              담당자 관리
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[18px] font-[700] text-[#464A4D]">마이</span>
            <span
              className="cursor-pointer text-[16px] font-[400] text-[#464A4D]"
              onClick={() => {
                navigate('/worklog/mypage');
              }}
            >
              마이페이지
            </span>
            <span
              className="cursor-pointer text-[16px] font-[400] text-[#464A4D]"
              onClick={() => setIsLogoutModalOpen(true)}
            >
              로그아웃
            </span>
          </div>
        </div>
      </div>
      {/* 로그아웃 확인 모달 */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
          <div className="flex w-[320px] flex-col items-center gap-6 rounded-[16px] bg-white p-6 shadow-xl">
            <h3 className="text-[18px] font-bold text-[#17191A]">로그아웃 하시겠습니까?</h3>
            <div className="flex w-full gap-3">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 rounded-[8px] bg-gray-100 py-2.5 text-[14px] font-bold text-[#464A4D] hover:bg-gray-200"
              >
                아니오
              </button>
              <button
                onClick={handleLogout}
                className="flex flex-1 items-center justify-center rounded-[8px] bg-[#3B82F6] py-2.5 text-[14px] font-bold text-white hover:bg-blue-600"
              >
                예
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
