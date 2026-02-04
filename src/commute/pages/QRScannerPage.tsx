import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Scanner } from '@yudiel/react-qr-scanner';
import Lottie from 'lottie-react';
import loadingAnimation from '../shared/assets/Insider-loading.json';
import { checkIn, checkOut } from '../shared/apis/attendance.api';
import leftArrowIcon from '../shared/assets/leftArrow.svg';

// QR 스캔 상태 타입
type ScanStatus = 'scanning' | 'loading' | 'success' | 'failed';

// 출퇴근 모드 타입
type AttendanceMode = 'checkIn' | 'checkOut';

// SVG 아이콘 경로
const svgPaths = {
  // 뒤로가기 화살표
  backArrow: 'M7.99941 14.9989L0.999926 7.99941L7.99941 0.999926',
  // 새로고침 아이콘
  refresh: 'M10 5C10 7.7614 7.76145 10 5 10C2.2386 10 0 7.7614 0 5C0 2.23857 2.2386 0 5 0V1C2.79085 1 1 2.79086 1 5C1 7.20915 2.79085 9 5 9C7.20915 9 9 7.20915 9 5C9 3.62511 8.30635 2.41223 7.2499 1.69225L7.25 3H6.25V0H9.25V1L8.0004 0.999945C9.21465 1.91217 10 3.36436 10 5Z',
  // 실패 X 아이콘
  failedIcon: 'M20.5 36C11.3873 36 4 28.6126 4 19.5C4 10.3873 11.3873 3 20.5 3C29.6126 3 37 10.3873 37 19.5C37 28.6126 29.6126 36 20.5 36ZM20.5 17.1666L15.8331 12.4996L13.4996 14.8331L18.1666 19.5L13.4996 24.1669L15.8331 26.5003L20.5 21.8334L25.1669 26.5003L27.5003 24.1669L22.8334 19.5L27.5003 14.8331L25.1669 12.4996L20.5 17.1666Z',
  // 성공 체크 아이콘
  successIcon: 'M20.5 36C29.6126 36 37 28.6126 37 19.5C37 10.3873 29.6126 3 20.5 3C11.3873 3 4 10.3873 4 19.5C4 28.6126 11.3873 36 20.5 36ZM29.5042 15.3042L18.85 25.9584L11.9083 19.0167L14.2417 16.6833L18.85 21.2916L27.1708 12.9708L29.5042 15.3042Z',
};

export default function QRScannerPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scanStatus, setScanStatus] = useState<ScanStatus>('scanning');
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // location.state에서 출퇴근 모드 가져오기 (기본값: checkIn)
  const mode: AttendanceMode = location.state?.mode || 'checkIn';

  // 현재 날짜/시간 업데이트
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const date = now.getDate();
      const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][now.getDay()];
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
      setCurrentDateTime(`${year}년 ${month}월 ${date}일 (${dayOfWeek}) ${period} ${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 뒤로가기 핸들러
  const handleBack = useCallback(() => {
    navigate('/home');
  }, [navigate]);

  // QR 코드 스캔 성공 핸들러
  const handleScan = useCallback(async (result: { rawValue: string }[]) => {
    if (result && result.length > 0 && scanStatus === 'scanning') {
      const qrToken = result[0].rawValue;

      if (!qrToken) return;

      setScanStatus('loading');
      setErrorMessage('');

      try {
        if (mode === 'checkIn') {
          await checkIn({ qrToken });
        } else {
          await checkOut({ qrToken });
        }
        setScanStatus('success');

        // 2초 후 홈으로 이동
        setTimeout(() => {
          navigate('/home', { state: { attendanceSuccess: true, mode } });
        }, 2000);
      } catch (error) {
        console.error('Attendance check failed:', error);
        setScanStatus('failed');
        setErrorMessage('인증에 실패했습니다. 다시 시도해주세요.');

        // 3초 후 다시 스캔 모드로
        setTimeout(() => {
          setScanStatus('scanning');
        }, 3000);
      }
    }
  }, [mode, navigate, scanStatus]);

  // 새로고침/재시도 핸들러
  const handleRefresh = useCallback(() => {
    setScanStatus('scanning');
    setErrorMessage('');
  }, []);

  // 스캔 상태별 렌더링
  const renderContent = () => {
    switch (scanStatus) {
      case 'loading':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col gap-[2rem] items-center justify-center">
              <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[1.6rem] text-[#09121c] text-[1.6rem] tracking-[0.024rem]">
                잠시만 기다려주세요...
              </p>
              <div className="w-[12rem] h-[6rem]">
                <Lottie
                  animationData={loadingAnimation}
                  loop={true}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col gap-[2rem] items-center justify-center">
              <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[1.6rem] text-[#09121c] text-[1.6rem] tracking-[0.024rem]">
                {mode === 'checkIn' ? '출근 인증 성공' : '퇴근 인증 성공'}
              </p>
              <div className="relative shrink-0 size-[4rem]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
                  <path d={svgPaths.successIcon} fill="#41D224" />
                </svg>
              </div>
            </div>
          </div>
        );

      case 'failed':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col gap-[2rem] items-center justify-center">
              <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[1.6rem] text-[#09121c] text-[1.6rem] tracking-[0.024rem]">
                {errorMessage || '다시 시도해주세요.'}
              </p>
              <div className="relative shrink-0 size-[4rem]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
                  <path d={svgPaths.failedIcon} fill="#FF0B0B" />
                </svg>
              </div>
              <button
                onClick={handleRefresh}
                className="mt-[1rem] px-[2rem] py-[1rem] bg-[#51a8ff] text-white rounded-[1rem] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.4rem]"
              >
                다시 시도
              </button>
            </div>
          </div>
        );

      case 'scanning':
      default:
        return (
          <div className="flex flex-col items-center w-full h-full pt-[2rem]">
            <div className="bg-white relative rounded-[1.6rem] shadow-[0rem_0.4rem_2rem_0rem_rgba(81,168,255,0.07)] w-[33rem] h-[33rem]">
              <div className="absolute left-1/2 overflow-hidden rounded-[1.6rem] w-[32rem] h-[32rem] top-1/2 translate-x-[-50%] translate-y-[-50%]">
                <Scanner
                  onScan={handleScan}
                  allowMultiple={false}
                  scanDelay={500}
                  constraints={{
                    facingMode: 'environment', // 후면 카메라 사용 (모바일)
                  }}
                  styles={{
                    container: {
                      width: '100%',
                      height: '100%',
                    },
                    video: {
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    },
                  }}
                  components={{
                    torch: false,
                    finder: false,
                  }}
                />
              </div>
            </div>
            <p className="mt-[2rem] font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[1.6rem] text-[#09121c] text-[1.4rem] tracking-[0.021rem] opacity-50">
              QR 코드를 카메라에 비춰주세요
            </p>
          </div>
        );
    }
  };

  return (
    <div className="bg-white relative min-h-screen w-full" data-name="QR_Scanner">
      {/* 상단 헤더 */}
      <div className="bg-[#51a8ff] flex gap-[1.6rem] h-[9.5rem] items-center pl-[3.2rem] pr-0 py-0 shadow-[0rem_0.4rem_0.6rem_-0.4rem_rgba(0,0,0,0.1)] w-full">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={handleBack}
          className="relative rounded-full shrink-0 size-[4rem] flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <img src={leftArrowIcon} alt="뒤로가기" className="w-[4rem] h-[4rem]" />
        </button>

        {/* 제목 및 날짜 */}
        <div className="flex flex-col gap-[0.4rem]">
          {/* 제목 */}
          <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[2.4rem] text-[1.6rem] text-white">
            {mode === 'checkIn' ? '출근 QR 인증' : '퇴근 QR 인증'}
          </p>
          {/* 날짜 및 시간 */}
          <div className="flex items-center gap-[0.8rem]">
            <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[1.6rem] text-[1.2rem] text-white tracking-[0.018rem]">
              {currentDateTime}
            </p>
            {/* 새로고침 아이콘 */}
            <button onClick={handleRefresh} className="size-[1rem] hover:opacity-80 transition-opacity">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
                <path d={svgPaths.refresh} fill="white" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div className="w-full h-[calc(100vh-9.5rem)] flex items-center justify-center">
        {renderContent()}
      </div>
    </div>
  );
}
