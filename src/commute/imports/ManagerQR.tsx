import svgPaths from './svg-7jm38x0asw';

export default function ManagerQR() {
  return (
    <div className="relative size-full bg-white" data-name="Manager_QR">
      {/* 상단 헤더 */}
      <div
        className="absolute left-0 right-0 top-0 h-[76px] w-full bg-[#51a8ff]"
        data-name="Header-Desktop"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[0_0_-0.5px_0] border-b border-solid border-[#e8eef2]"
        />
        <div
          className="absolute left-1/2 top-[23px] h-[30px] w-[1200px] max-w-[calc(100%-40px)] translate-x-[-50%]"
          data-name="Search content"
        >
          <div className="flex h-full w-full flex-col justify-center text-center font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[20px] not-italic leading-[0] text-white">
            <p className="leading-[1.25]">정보운영팀 출근부 · 출근 QR</p>
          </div>
        </div>
      </div>

      {/* 날짜/시간 표시 섹션 */}
      <div
        className="absolute left-0 right-0 top-[76px] h-[95px] w-full bg-white"
        data-name="Page-header-section-desktop"
      >
        <div
          className="absolute left-1/2 top-0 h-[95px] w-[1200px] max-w-[calc(100%-40px)] -translate-x-1/2"
          data-name="Search container"
        >
          <div className="absolute left-0 top-0 h-[95px] w-full" data-name="Container">
            <div className="absolute left-0 top-[31px] h-[30px] w-full" data-name="Search content">
              <div className="flex h-full w-full flex-col justify-center text-center font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[40px] not-italic leading-[0] text-[#17191a]">
                <p className="leading-[1.25]">2025년 9월 8일 오전 11:30 25초</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 섹션 */}
      <div className="absolute left-0 right-0 top-[76px] h-[1004px] w-full" data-name="Section">
        <div className="absolute left-0 right-0 top-[110px] h-[784px] w-full" data-name="Section" />

        {/* QR 코드 섹션 (왼쪽 사이트 바로가기 + 중앙 화살표 + 오른쪽 출근 QR) */}
        <div className="absolute left-1/2 top-[274px] flex translate-x-[-50%] content-stretch items-center gap-[182px]">
          {/* 왼쪽: 출근부 사이트 바로가기 */}
          <div className="relative flex w-[400px] shrink-0 flex-col content-stretch items-center gap-[23px]">
            <p className="relative w-[min-content] min-w-full shrink-0 text-center font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[30px] not-italic leading-[30px] text-[#09121c]">
              출근부 사이트 바로가기
            </p>
            {/* QR 코드 플레이스홀더 - 실제 QR 코드로 교체 필요 */}
            <div className="size-[400px] shrink-0 bg-[#d9d9d9]" />
            <p className="relative w-[456px] shrink-0 text-center font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[16px] not-italic leading-[30px] text-[#99a1af]">
              *위 사이트 접속 후 '출근하기'를 눌러 오른쪽 QR을 스캔해주세요.
            </p>
          </div>

          {/* 중앙: 화살표 아이콘 */}
          <div className="relative size-[88px] shrink-0" data-name="Frame">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 88 88"
            >
              <g id="Frame">
                <path d={svgPaths.p28c58b80} fill="black" id="Vector" />
              </g>
            </svg>
          </div>

          {/* 오른쪽: 출근 QR */}
          <div className="relative flex w-[400px] shrink-0 flex-col content-stretch items-center gap-[23px]">
            <p className="relative w-[min-content] min-w-full shrink-0 text-center font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[30px] not-italic leading-[30px] text-[#09121c]">
              출근 QR
            </p>
            {/* QR 코드 플레이스홀더 - 실제 QR 코드로 교체 필요 */}
            <div className="size-[400px] shrink-0 bg-[#d9d9d9]" />
            <p className="relative w-[528px] shrink-0 text-center font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[16px] not-italic leading-[30px] text-[#99a1af]">
              *1분마다 QR이 갱신되며, 출근 시각 전 QR을 찍어도 정시 출근으로 반영됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
