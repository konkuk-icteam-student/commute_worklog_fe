import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AttendanceButton from '../shared/components/AttendanceButton';
import type { AttendanceStatus } from '../shared/components/AttendanceButton';
import BottomNavigation from '../shared/components/BottomNavigation';
import { useTodaySchedules, type ScheduleDisplayStatus } from '../hooks/useTodaySchedules';
import { useUserInfo } from '../hooks/useUserInfo';
import LottieAnimation from '@/shared/components/LottieAnimation';
import sampleLoading from '@/shared/assets/animations/sample-loading.json';

// 스케줄 상태에 따른 배지 스타일 및 텍스트
const getStatusBadge = (status: ScheduleDisplayStatus) => {
  switch (status) {
    case 'IN_PROGRESS':
      return {
        bgColor: 'bg-green-50',
        textColor: 'text-[#00a63e]',
        label: '진행중',
      };
    case 'UPCOMING':
      return {
        bgColor: 'bg-gray-100',
        textColor: 'text-[#4a5565]',
        label: '예정',
      };
    case 'COMPLETED':
      return {
        bgColor: 'bg-blue-50',
        textColor: 'text-[#3b82f6]',
        label: '완료',
      };
  }
};

export default function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [attendanceStatus, setAttendanceStatus] = useState<AttendanceStatus>('checkIn');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');

  // 오늘의 스케줄 데이터 가져오기
  const { schedules, isLoading: isScheduleLoading, error: scheduleError } = useTodaySchedules();
  // 사용자 정보 가져오기
  const { userInfo, isLoading: isUserInfoLoading } = useUserInfo();

  const getFormattedTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${period} ${displayHours}:${minutes.toString().padStart(2, '0')}`;
  };

  // QR 스캔 성공 후 돌아왔을 때 상태 업데이트
  useEffect(() => {
    if (location.state?.attendanceSuccess) {
      const mode = location.state.mode;
      if (mode === 'checkIn') {
        setCheckInTime(getFormattedTime());
        setAttendanceStatus('checkedIn');
      } else if (mode === 'checkOut') {
        setCheckOutTime(getFormattedTime());
        setAttendanceStatus('checkedOut');
      }
      // state 초기화 (뒤로가기 시 중복 처리 방지)
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleAttendanceClick = () => {
    switch (attendanceStatus) {
      case 'checkIn':
        // 출근 인증 → QR 스캐너로 이동
        navigate('/qr-scanner', { state: { mode: 'checkIn' } });
        break;
      case 'checkedIn':
        // 출근 완료 → 퇴근 인증
        setAttendanceStatus('checkOut');
        break;
      case 'checkOut':
        // 퇴근 인증 → QR 스캐너로 이동
        navigate('/qr-scanner', { state: { mode: 'checkOut' } });
        break;
      case 'checkedOut':
        // 퇴근 완료 → 출근 인증 (다시 처음으로)
        setCheckInTime('');
        setCheckOutTime('');
        setAttendanceStatus('checkIn');
        break;
    }
  };

  // 현재 상태에 맞는 시간 표시
  const getCurrentTime = () => {
    if (attendanceStatus === 'checkedIn') return checkInTime;
    if (attendanceStatus === 'checkedOut') return checkOutTime;
    return '';
  };

  // Get current date and time
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][now.getDay()];
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  const currentDateTime = `${year}년 ${month}월 ${date}일 (${dayOfWeek}) ${period} ${displayHours}:${minutes.toString().padStart(2, '0')}`;

  return (
    <div className="relative min-h-screen w-full bg-white" data-name="home">
      {/* Header */}
      <div className="w-full bg-[#51a8ff] pb-[2rem] pt-[4.2rem]" data-name="Container">
        <div className="mx-auto flex max-w-[39.3rem] flex-col items-center gap-[0.4rem] px-[2rem]">
          {/* Top Navigation */}
          <div className="text-center">
            <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[1.6rem] leading-[1.6rem] tracking-[0.024rem] text-white">
              안녕하세요, {isUserInfoLoading ? '...' : userInfo?.name || '사용자'}님!
            </p>
          </div>

          {/* Department */}
          <div className="text-center">
            <p
              className="font-['Poppins:SemiBold','Noto_Sans_KR:Bold',sans-serif] text-[3.2rem] leading-[4rem] tracking-[-0.016rem] text-white"
              style={{ fontVariationSettings: "'wght' 700" }}
            >
              {isUserInfoLoading ? '...' : userInfo?.organizationName || '정보운영팀'}
            </p>
          </div>

          {/* Date/Time */}
          <div
            className="mt-[0.8rem] flex items-center justify-center gap-[0.4rem] rounded-[1.4rem] bg-[rgba(196,225,255,0.15)] p-[1.2rem]"
            data-name="time"
          >
            <div className="relative size-[1.2rem] shrink-0" data-name="Frame">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 12 12"
              >
                <g id="Frame">
                  <path
                    d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z M6 3V6L8 7"
                    fill="white"
                    id="Vector"
                  />
                </g>
              </svg>
            </div>
            <p className="relative w-[17.2rem] shrink-0 text-center font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.2rem] not-italic leading-[1.6rem] tracking-[0.018rem] text-white">
              {currentDateTime}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full py-[2rem] pb-[10rem]" data-name="DesktopHome">
        <div className="mx-auto max-w-[39.3rem] px-[2rem]">
          <div className="flex flex-col items-center gap-[2rem]">
            {/* Attendance Button */}
            <div className="w-full">
              <AttendanceButton
                status={attendanceStatus}
                time={getCurrentTime()}
                onClick={handleAttendanceClick}
              />
            </div>

            {/* Schedule Card */}
            <div className="w-full" data-name="Container">
              <div
                className="relative min-h-[16.4rem] w-full shrink-0 rounded-[1.6rem] bg-white shadow-[0rem_0.4rem_2rem_0rem_rgba(81,168,255,0.07)]"
                data-name="Container"
              >
                <div className="flex size-full flex-col items-center justify-center">
                  <div className="relative box-border flex min-h-[16.4rem] w-full flex-col content-stretch items-center justify-center px-[2.3992rem] py-[1rem]">
                    {/* 로딩 상태 */}
                    {isScheduleLoading && (
                      <div className="flex items-center justify-center py-[2rem]">
                        <LottieAnimation
                          animationData={sampleLoading}
                          width={80}
                          height={80}
                          loop={true}
                          autoplay={true}
                        />
                      </div>
                    )}

                    {/* 에러 상태 */}
                    {!isScheduleLoading && scheduleError && (
                      <div className="flex items-center justify-center py-[2rem]">
                        <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.4rem] text-red-400">
                          {scheduleError}
                        </p>
                      </div>
                    )}

                    {/* 스케줄 없음 상태 */}
                    {!isScheduleLoading && !scheduleError && schedules.length === 0 && (
                      <div className="flex items-center justify-center py-[2rem]">
                        <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.4rem] text-gray-400">
                          오늘 예정된 근무가 없습니다
                        </p>
                      </div>
                    )}

                    {/* 스케줄 목록 */}
                    {!isScheduleLoading &&
                      !scheduleError &&
                      schedules.map((schedule, index) => {
                        const badge = getStatusBadge(schedule.status);
                        const isLast = index === schedules.length - 1;

                        return (
                          <div
                            key={schedule.id}
                            className={`box-border flex h-[6.7524rem] content-stretch items-center justify-between ${!isLast ? 'border-b border-gray-100 pb-[0.0558rem]' : ''} relative w-full shrink-0 px-0 pt-0`}
                            data-name="Container"
                          >
                            <div className="relative h-[4.2982rem] shrink-0" data-name="Container">
                              <div className="relative box-border flex h-[4.2982rem] flex-col content-stretch items-start gap-[0.3991rem] border-0 border-solid border-[transparent] bg-clip-padding">
                                <div
                                  className="relative h-[2.0994rem] w-full shrink-0"
                                  data-name="Paragraph"
                                >
                                  <p className="whitespace-pre text-nowrap font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.4rem] not-italic leading-[2.1rem] text-[#09121c]">
                                    {schedule.label}
                                  </p>
                                </div>
                                <div
                                  className="relative h-[1.7996rem] w-full shrink-0 opacity-50"
                                  data-name="Paragraph"
                                >
                                  <p className="whitespace-pre text-nowrap font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.2rem] not-italic leading-[1.8rem] text-[#09121c]">
                                    {schedule.timeRange}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div
                              className={`${badge.bgColor} relative flex h-[2.5979rem] shrink-0 items-center justify-center rounded-full px-[1.2rem]`}
                              data-name="Container"
                            >
                              <p
                                className={`font-['LINE_Seed_Sans_KR:Regular',sans-serif] not-italic leading-[1.8rem] ${badge.textColor} whitespace-pre text-nowrap text-[1.2rem]`}
                              >
                                {badge.label}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activePage="home" />
    </div>
  );
}
