import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AttendanceButton from '../shared/components/AttendanceButton';
import type { AttendanceStatus } from '../shared/components/AttendanceButton';
import BottomNavigation from '../shared/components/BottomNavigation';

export default function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [attendanceStatus, setAttendanceStatus] = useState<AttendanceStatus>('checkIn');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');

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
    <div className="bg-white relative min-h-screen w-full" data-name="home">
        {/* Header */}
        <div className="w-full bg-[#51a8ff] pt-[4.2rem] pb-[2rem]" data-name="Container">
          <div className="max-w-[39.3rem] mx-auto px-[2rem] flex flex-col items-center gap-[0.4rem]">
            {/* Top Navigation */}
            <div className="text-center">
              <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[1.6rem] text-[1.6rem] text-white tracking-[0.024rem]">
                안녕하세요, 홍길동님!
              </p>
            </div>

            {/* Department */}
            <div className="text-center">
              <p
                className="font-['Poppins:SemiBold','Noto_Sans_KR:Bold',sans-serif] leading-[4rem] text-[3.2rem] text-white tracking-[-0.016rem]"
                style={{ fontVariationSettings: "'wght' 700" }}
              >
                정보운영팀
              </p>
            </div>

            {/* Date/Time */}
            <div
              className="bg-[rgba(196,225,255,0.15)] flex gap-[0.4rem] items-center justify-center p-[1.2rem] rounded-[1.4rem] mt-[0.8rem]"
              data-name="time"
            >
              <div
                className="relative shrink-0 size-[1.2rem]"
                data-name="Frame"
              >
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
              <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[1.6rem] not-italic relative shrink-0 text-[1.2rem] text-center text-white tracking-[0.018rem] w-[17.2rem]">
                {currentDateTime}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full py-[2rem] pb-[10rem]" data-name="DesktopHome">
          <div className="max-w-[39.3rem] mx-auto px-[2rem]">
            <div className="flex flex-col gap-[2rem] items-center">
              {/* Attendance Button */}
              <div className="w-full">
                <AttendanceButton
                  status={attendanceStatus}
                  time={getCurrentTime()}
                  onClick={handleAttendanceClick}
                />
              </div>

              {/* Schedule Card */}
              <div
                className="w-full"
                data-name="Container"
              >
                  <div
                    className="bg-white h-[16.4rem] relative rounded-[1.6rem] shadow-[0rem_0.4rem_2rem_0rem_rgba(81,168,255,0.07)] shrink-0 w-full"
                    data-name="Container"
                  >
                    <div className="flex flex-col items-center justify-center size-full">
                      <div className="box-border content-stretch flex flex-col h-[16.4rem] items-center justify-center px-[2.3992rem] py-0 relative w-full">
                        {/* Morning Shift */}
                        <div
                          className="box-border content-stretch flex h-[6.7524rem] items-center justify-between pb-[0.0558rem] pt-0 px-0 relative shrink-0 w-full"
                          data-name="Container"
                        >
                          <div
                            aria-hidden="true"
                            className="absolute border-[0rem_0rem_0.0558rem] border-gray-100 border-solid inset-0 pointer-events-none"
                          />
                          <div
                            className="h-[4.2982rem] relative shrink-0 w-[6.9005rem]"
                            data-name="Container"
                          >
                            <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[0.3991rem] h-[4.2982rem] items-start relative w-[6.9005rem]">
                              <div
                                className="h-[2.0994rem] relative shrink-0 w-full"
                                data-name="Paragraph"
                              >
                                <p className="absolute font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[2.1rem] left-0 not-italic text-[#09121c] text-[1.4rem] text-nowrap top-[0.067rem] whitespace-pre">
                                  오전 근무
                                </p>
                              </div>
                              <div
                                className="h-[1.7996rem] opacity-50 relative shrink-0 w-full"
                                data-name="Paragraph"
                              >
                                <p className="absolute font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[1.8rem] left-0 not-italic text-[#09121c] text-[1.2rem] text-nowrap top-[0.067rem] whitespace-pre">
                                  09:30 - 11:30
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="bg-green-50 h-[2.5979rem] relative rounded-[1.87153e+07px] shrink-0 w-[5.5122rem]"
                            data-name="Container"
                          >
                            <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[2.5979rem] items-start pb-0 pt-[0.23rem] px-[1.1992rem] relative w-[5.5122rem]">
                              <div
                                className="h-[1.7996rem] relative shrink-0 w-full"
                                data-name="Paragraph"
                              >
                                <p className="absolute font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[1.8rem] left-0 not-italic text-[#00a63e] text-[1.2rem] text-nowrap top-[0.067rem] whitespace-pre">
                                  진행중
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Afternoon Shift */}
                        <div
                          className="content-stretch flex h-[6.6966rem] items-center justify-between relative shrink-0 w-full"
                          data-name="Container"
                        >
                          <div
                            className="h-[4.2982rem] relative shrink-0 w-[7.0417rem]"
                            data-name="Container"
                          >
                            <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[0.3991rem] h-[4.2982rem] items-start relative w-[7.0417rem]">
                              <div
                                className="h-[2.0994rem] relative shrink-0 w-full"
                                data-name="Paragraph"
                              >
                                <p className="absolute font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[2.1rem] left-0 not-italic text-[#09121c] text-[1.4rem] text-nowrap top-[0.067rem] whitespace-pre">
                                  오후 근무
                                </p>
                              </div>
                              <div
                                className="h-[1.7996rem] opacity-50 relative shrink-0 w-full"
                                data-name="Paragraph"
                              >
                                <p className="absolute font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[1.8rem] left-0 not-italic text-[#09121c] text-[1.2rem] text-nowrap top-[0.067rem] whitespace-pre">
                                  14:00 - 16:00
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="bg-gray-100 h-[2.5979rem] relative rounded-[1.87153e+07px] shrink-0 w-[4.4743rem]"
                            data-name="Container"
                          >
                            <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[2.5979rem] items-start pb-0 pt-[0.23rem] px-[1.1992rem] relative w-[4.4743rem]">
                              <div
                                className="basis-0 grow h-[1.7rem] min-h-px min-w-px relative shrink-0"
                                data-name="Paragraph"
                              >
                                <p className="absolute font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[1.8rem] left-0 not-italic text-[#4a5565] text-[1.2rem] text-nowrap top-[0.067rem] whitespace-pre">
                                  예정
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
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
