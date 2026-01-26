// 공통 라벨 스타일 (WriteForm과 동일)
const labelStyle =
  'flex h-[36px] w-[71px] shrink-0 items-center justify-center rounded-[6px] border border-[#E8EEF2] text-[16px] font-[700] text-[#17191A]';

const DetailView = () => {
  return (
    <div className="flex flex-col gap-6 pb-20">
      {/* 1. 제목 */}
      <div className="flex gap-4">
        <div className={labelStyle}>제목</div>
        <div className="flex h-[36px] flex-1 items-center rounded-[6px] bg-[#F4F6F8] px-3 text-[14px]">
          학정시 로그인 오류
        </div>
      </div>

      {/* 2. 민원인 */}
      <div className="flex gap-4">
        <div className={labelStyle}>민원인</div>
        <div className="flex h-[36px] flex-1 items-center px-2 text-[14px]">
          김석진 (컴퓨터공학부 3학년)
        </div>
      </div>

      {/* 3. 내용 */}
      <div className="flex gap-4">
        <div className={labelStyle}>내용</div>
        <div className="flex min-h-[80px] flex-1 rounded-[6px] bg-[#F4F6F8] p-3 text-[14px] leading-relaxed">
          학사정보시스템 로그인을 하려는데 OTP 관련 메시지가 뜸,
          <br />
          팝업 하단 6자리 인증번호 입력 창에서
          <br />
          6자리를 입력해도 에러가 나고 로그인이 안됨
        </div>
      </div>

      {/* 4. 작성자 */}
      <div className="flex gap-4">
        <div className={labelStyle}>작성자</div>
        <div className="flex h-[36px] flex-1 items-center px-2 text-[14px]">
          박길동 (컴퓨터공학부 과사무실)
        </div>
      </div>

      {/* 5. 이미지 (더미) */}
      <div className="flex gap-4">
        <div className="flex h-[200px] w-full items-center justify-center rounded-[6px] border border-[#E8EEF2] text-[#8C9499]">
          이미지
        </div>
      </div>

      {/* 6. 답변 */}
      <div className="flex gap-4">
        <div className={labelStyle}>답변</div>
        <div className="flex flex-1 flex-col gap-1 rounded-[6px] bg-[#F4F6F8] p-3 text-[14px]">
          <p>핸드폰 Google Authenticator 앱에서</p>
          <p>[QR코드 스캔]을 실행 못하고 엉뚱한 6자리를 입력해서 진행이 안되는 사례였음</p>
          <p>OTP 인증 매뉴얼 8page 내용 순서대로 그대로 실행하면 해결 됨</p>
          <ol className="list-decimal pl-4">
            <li>학사정보시스템 로그인</li>
            <li>OTP 인증 팝업창이 뜨면</li>
            <li>Google Authenticator 앱 실행(없으면 다운로드)</li>
            <li>오른쪽 하단 + 클릭</li>
            <li>QR 코드 스캔 실행하고 컴퓨터 화면의 QR코드를 스캔해 등록</li>
          </ol>
        </div>
      </div>

      {/* 7. 비고 */}
      <div className="flex gap-4">
        <div className={labelStyle}>비고</div>
        <div className="flex h-[36px] flex-1 items-center px-2 text-[14px]">버튼 위치 변경됨</div>
      </div>

      {/* 8. 수정 이력 (더미) */}
      <div className="flex gap-4">
        <div className={labelStyle}>수정</div>
        <div className="flex flex-col justify-center text-[12px] text-[#8C9499]">
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-[#8C9499]"></div>
            <span>2025.10.29 (삭제)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-blue-500"></div>
            <span className="text-blue-500 underline">2025.05.21</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-[#8C9499]"></div>
            <span>2025.05.20</span>
          </div>
        </div>
      </div>

      {/* 9. 담당자 */}
      <div className="flex gap-4">
        <div className={labelStyle}>담당자</div>
        <div className="flex h-[36px] flex-1 items-center px-2 text-[14px]">
          김담당 (정보운영팀)
        </div>
      </div>

      {/* 첨부파일 확인 */}
      <div className="flex w-fit items-center gap-2 rounded-[6px] border p-2 text-[#464A4D]">
        <span>📎</span>
        <span className="text-[14px]">첨부파일 1건</span>
      </div>

      {/* 수정하기 버튼 */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={() => console.log('수정하기 버튼 클릭!')}
          className="rounded-[6px] border border-[#E8EEF2] px-4 py-2 text-[14px] font-bold text-[#464A4D] hover:bg-gray-50"
        >
          수정하기
        </button>
      </div>
    </div>
  );
};

export default DetailView;
