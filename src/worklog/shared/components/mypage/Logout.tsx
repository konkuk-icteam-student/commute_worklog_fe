import logoutlogo from './logoutlogo.svg';

const Logout = () => {
  const handleLogout = () => {
    console.log('로그아웃 클릭!');
  };

  return (
    // 전체 컨테이너 (이전과 동일한 반응형 너비 및 테두리 스타일 적용)
    <div className="mx-auto flex w-full max-w-[1090px] items-center justify-between rounded-[20px] border-[1.5px] border-[#E8EEF2] bg-white px-8 py-8">
      {/* 좌측 텍스트 영역 */}
      <div className="flex flex-col gap-2">
        <h2 className="text-[22px] font-bold text-[#464A4D]">로그아웃</h2>
        <p className="text-[15px] font-medium text-[#A9AFB2]">현재 계정에서 로그아웃합니다.</p>
      </div>

      {/* 우측 로그아웃 버튼 */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 rounded-[8px] border-[1.5px] border-[#E8EEF2] px-5 py-2.5 text-[14px] font-bold text-[#464A4D] transition-colors hover:bg-gray-50"
      >
        <img src={logoutlogo} alt="로그아웃 아이콘" className="h-[16px] w-[16px]" />
        <span>로그아웃 하기</span>
      </button>
    </div>
  );
};

export default Logout;
