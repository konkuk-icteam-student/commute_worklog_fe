import { useState } from 'react';
import TodayWorkStudentList from '../components/TodayWorkStudentList';
import WorkTimeApprovalQueue from '../components/WorkTimeApprovalQueue';

export default function AdminDashboardPage() {
  const [currentMonth, setCurrentMonth] = useState(9);
  const [currentYear, setCurrentYear] = useState(2025);

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-[120px]">
      {/* 상단 헤더 - 파란색 배경 */}
      <div className="bg-[#51a8ff] px-8 py-6">
        <div className="max-w-[1240px] mx-auto">
          {/* 타이틀 - 중앙 정렬 */}
          <h1 className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[24px] text-white text-center">
            정보운영팀 출근부 · 관리자 홈
          </h1>
        </div>
      </div>

      {/* 날짜 네비게이션 및 통계 카드 영역 - 흰색 배경 */}
      <div className="bg-white py-6">
        <div className="max-w-[1198px] mx-auto px-0">
          {/* 날짜 네비게이션 */}
          <div className="flex items-center justify-center gap-8 mb-6">
            <button
              onClick={handlePrevMonth}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="#09121c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[20px] text-[#09121c] min-w-[120px] text-center">
              {currentYear}년 {currentMonth}월
            </p>
            <button
              onClick={handleNextMonth}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="#09121c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* 4개 통계 카드 */}
          <div className="grid grid-cols-4 gap-4 w-full">
            {/* 현재 근무 중 - 그라데이션 파란색 */}
            <div className="bg-gradient-to-br from-[#51a8ff] to-[#3d8ce7] rounded-[12px] p-5 text-white">
              <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[14px] mb-2 opacity-90">
                현재 근무 중
              </p>
              <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[28px] mb-1">
                2명
              </p>
              <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[12px] opacity-80">
                전체 3명
              </p>
            </div>

            {/* 미출근자 */}
            <div className="bg-white rounded-[12px] p-5 border border-[#eaeaea]">
              <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[14px] text-[#6b7280] mb-2">
                미출근자
              </p>
              <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[28px] text-[#09121c] mb-1">
                1명
              </p>
              <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[12px] text-[#6b7280]">
                박길동
              </p>
            </div>

            {/* 지각자 */}
            <div className="bg-white rounded-[12px] p-5 border border-[#eaeaea]">
              <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[14px] text-[#6b7280] mb-2">
                지각자
              </p>
              <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[28px] text-[#09121c] mb-1">
                1명
              </p>
              <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[12px] text-[#6b7280]">
                홍길동
              </p>
            </div>

            {/* 오늘의 업무 */}
            <div className="bg-white rounded-[12px] p-5 border border-[#eaeaea]">
              <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[14px] text-[#6b7280] mb-2">
                오늘의 업무
              </p>
              <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[28px] text-[#09121c] mb-1">
                1/6
              </p>
              <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[12px] text-[#6b7280]">
                미완료
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="max-w-[1198px] mx-auto px-0 py-8">
        <div className="flex flex-col gap-8">
          {/* 오늘 근무 학생 목록 섹션 */}
          <div className="w-full">
            <TodayWorkStudentList />
          </div>

          {/* 근로 시간 승인 대기열 섹션 */}
          <div className="w-full h-[203px]">
            <WorkTimeApprovalQueue />
          </div>
        </div>
      </div>

      {/* 하단 네비게이션 바 (UI만, 기능 없음) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px]">
        <div className="bg-white rounded-[50px] shadow-[0px_4px_30px_0px_rgba(81,168,255,0.2)] px-12 py-6">
          <div className="flex items-center justify-between gap-8">
            {/* Home 아이콘 */}
            <div className="flex items-center justify-center rounded-full size-[40px] bg-[rgba(81,168,255,0.1)]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#51a8ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 22V12H15V22" stroke="#51a8ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Calendar 아이콘 */}
            <div className="flex items-center justify-center rounded-full size-[40px] hover:bg-gray-50 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="#99a1af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 2V6" stroke="#99a1af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 2V6" stroke="#99a1af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 10H21" stroke="#99a1af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Tasks 아이콘 */}
            <div className="flex items-center justify-center rounded-full size-[40px] hover:bg-gray-50 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#99a1af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Profile 아이콘 */}
            <div className="flex items-center justify-center rounded-full size-[40px] hover:bg-gray-50 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#99a1af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="#99a1af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
