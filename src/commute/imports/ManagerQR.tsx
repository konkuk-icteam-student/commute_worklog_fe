import { useState, useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { getQrToken } from '../shared/apis/attendance.api';
import svgPaths from './svg-7jm38x0asw';

function formatDateTime(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const period = hours < 12 ? '오전' : '오후';
  const displayHour = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');
  return `${year}년 ${month}월 ${day}일 ${period} ${displayHour}:${mm} ${ss}초`;
}

export default function ManagerQR() {
  const [now, setNow] = useState<Date>(new Date());
  const [token, setToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Real-time clock
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // QR token fetching with auto-refresh
  useEffect(() => {
    let cancelled = false;

    const fetchToken = async () => {
      try {
        setError(null);
        const res = await getQrToken();
        if (cancelled) return;
        if (res.isSuccess) {
          setToken(res.details.token);
          setIsLoading(false);
          // Schedule next refresh before token expires (5s buffer)
          const refreshIn = Math.max((res.details.validSeconds - 5) * 1000, 5000);
          timerRef.current = setTimeout(fetchToken, refreshIn);
        } else {
          setError(res.message || 'QR 토큰 발급에 실패했습니다.');
          setIsLoading(false);
        }
      } catch {
        if (cancelled) return;
        setError('QR 토큰을 불러올 수 없습니다.');
        setIsLoading(false);
      }
    };

    fetchToken();

    return () => {
      cancelled = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

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
                <p className="leading-[1.25]">{formatDateTime(now)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 섹션 */}
      <div className="absolute left-0 right-0 top-[76px] h-[1004px] w-full" data-name="Section">
        <div className="absolute left-0 right-0 top-[110px] h-[784px] w-full" data-name="Section" />

        {/* QR 코드 섹션 */}
        <div className="absolute left-1/2 top-[274px] flex translate-x-[-50%] content-stretch items-center gap-[182px]">
          {/* 왼쪽: 출근부 사이트 바로가기 */}
          <div className="relative flex w-[400px] shrink-0 flex-col content-stretch items-center gap-[23px]">
            <p className="relative w-[min-content] min-w-full shrink-0 text-center font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[30px] not-italic leading-[30px] text-[#09121c]">
              출근부 사이트 바로가기
            </p>
            <QRCodeSVG value={`${window.location.origin}/auth`} size={400} />
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
            {isLoading ? (
              <div className="flex size-[400px] items-center justify-center bg-[#f5f5f5] rounded-[8px]">
                <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] text-[#99a1af]">QR 로딩 중...</p>
              </div>
            ) : error ? (
              <div className="flex size-[400px] items-center justify-center bg-[#fff0f0] rounded-[8px]">
                <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[14px] text-[#fb2c36] text-center px-[20px]">{error}</p>
              </div>
            ) : (
              <QRCodeSVG value={token} size={400} />
            )}
            <p className="relative w-[528px] shrink-0 text-center font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[16px] not-italic leading-[30px] text-[#99a1af]">
              *1분마다 QR이 갱신되며, 출근 시각 전 QR을 찍어도 정시 출근으로 반영됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
