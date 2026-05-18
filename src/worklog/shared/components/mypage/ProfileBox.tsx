const ProfileBox = () => {
  // 수정 버튼 클릭 핸들러
  const handleEditClick = () => {
    console.log('수정버튼클릭!');
  };

  return (
    // 1. 전체 컨테이너 (반응형: w-full max-w-..., 높이 유동적: min-h-...)
    <div className="mx-auto flex min-h-[300px] w-full max-w-[1090px] flex-col rounded-[20px] border-[1.5px] border-[#E8EEF2] bg-white">
      {/* 2. 헤더 영역 (프로필 타이틀 & 수정 버튼) */}
      <div className="flex items-center justify-between border-b-[1.5px] border-[#E8EEF2] px-8 py-6">
        <h2 className="text-[22px] font-bold text-[#464A4D]">프로필</h2>
        <button
          onClick={handleEditClick}
          className="rounded-[8px] border-[1.5px] border-[#E8EEF2] px-5 py-2 text-[14px] font-bold text-[#464A4D] transition-colors hover:bg-gray-50"
        >
          수정
        </button>
      </div>

      {/* 3. 본문 영역 (아바타 & 정보) */}
      {/* 화면이 작을 때(sm 이하)는 세로로 배치되도록 flex-col 지정 */}
      <div className="flex flex-1 flex-col items-start gap-12 px-8 py-10 sm:flex-row sm:items-center">
        {/* 아바타 (임시 회색 원) */}
        <div className="h-[130px] w-[130px] shrink-0 rounded-full border-[1.5px] border-[#E8EEF2] bg-[#F4F6F8]"></div>

        {/* 유저 정보 그리드 (이름, 이메일, 조직) */}
        {/* 화면이 클 때는 2열(grid-cols-2), 작을 때는 1열(grid-cols-1) */}
        <div className="grid w-full max-w-[600px] grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
          {/* 이름 */}
          <div className="flex flex-col gap-2">
            <span className="text-[15px] font-medium text-[#A9AFB2]">이름</span>
            <span className="text-[20px] font-bold text-[#464A4D]">김담당</span>
          </div>

          {/* 이메일 */}
          <div className="flex flex-col gap-2">
            <span className="text-[15px] font-medium text-[#A9AFB2]">이메일</span>
            <span className="text-[20px] font-bold text-[#464A4D]">1234@konkuk.ac.kr</span>
          </div>

          {/* 조직 (항상 왼쪽 아래에 위치하도록 2열일 때도 1열 공간 차지) */}
          <div className="flex flex-col gap-2 sm:col-span-2">
            <span className="text-[15px] font-medium text-[#A9AFB2]">조직</span>
            <span className="text-[20px] font-bold text-[#464A4D]">정보운영팀</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;
