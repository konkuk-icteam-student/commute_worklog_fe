import { useState, useEffect } from 'react';
import svgPaths from './svg-t1qecyan8p';
import TodayWorkStudentList from '../admin/components/TodayWorkStudentList';
import { useAdminHome } from '../hooks/useAdminHome';
import type { ScheduleHistoryItem } from '../shared/types/schedule.types';

type ManagerHomeProps = {
  onNavigate: (page: 'home' | 'qr' | 'task') => void;
  currentPage: 'home' | 'qr' | 'task';
};

type StatusLabel = '근무중' | '미출근' | '출근전' | '퇴근완료';

function getStatus(schedule: ScheduleHistoryItem, now: Date): StatusLabel {
  const start = new Date(schedule.start);
  const end = new Date(schedule.end);
  if (schedule.actualStart && schedule.actualEnd) return '퇴근완료';
  if (schedule.actualStart && !schedule.actualEnd && now >= start && now <= end) return '근무중';
  if (!schedule.actualStart && now >= start) return '미출근';
  return '출근전';
}

export default function ManagerHome({ onNavigate, currentPage }: ManagerHomeProps) {
  const { schedules, tasks, isLoading } = useAdminHome();
  const [now, setNow] = useState(new Date());

  // Update now every minute for status recalculation
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const workingCount = schedules.filter(s => getStatus(s, now) === '근무중').length;
  const totalCount = schedules.length;
  const absentSchedules = schedules.filter(s => getStatus(s, now) === '미출근');
  const absentCount = absentSchedules.length;
  const absentNames = absentSchedules.map(s => s.userName).join(' ');

  const allTasks = tasks
    ? [
        ...(Array.isArray(tasks.regularTasks) ? tasks.regularTasks : []),
        ...(Array.isArray(tasks.irregularTasks) ? tasks.irregularTasks : []),
      ]
    : [];
  const totalTaskCount = allTasks.length;
  const completedTaskCount = allTasks.filter(t => t.isCompleted).length;
  const taskStatus = totalTaskCount > 0 && completedTaskCount === totalTaskCount ? '완료' : '미완료';

  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  return (
    <div className="relative size-full bg-white" data-name="Manager_Home">
      {/* Main content */}
      <div className="absolute left-0 right-0 top-[76px] h-[1004px] w-full" data-name="Section">
        <div className="absolute left-0 right-0 top-[114px] h-[784px] w-full" data-name="Section">
          <div
            className="absolute left-1/2 top-0 flex h-[891px] w-[1200px] max-w-[calc(100%-40px)] -translate-x-1/2 flex-col content-stretch items-start gap-[24px]"
            data-name="Container"
          >
            {/* Summary cards */}
            {isLoading ? (
              <div className="relative grid h-[123px] w-full shrink-0 grid-cols-[repeat(3,_minmax(0,_1fr))] gap-[16px]">
                {[0, 1, 2].map(i => (
                  <div key={i} className="rounded-[16px] bg-[#f5f5f5] animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="relative grid h-[123px] w-full shrink-0 grid-cols-[repeat(3,_minmax(0,_1fr))] gap-[16px]" data-name="Container">
                {/* Card 1: 현재 근무 중 */}
                <div
                  className="relative shrink-0 self-stretch rounded-[16px] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.3)]"
                  style={{ backgroundImage: 'linear-gradient(166.793deg, rgb(123, 190, 253) 4.2403%, rgb(81, 168, 255) 78.689%)' }}
                >
                  <div className="relative flex size-full flex-col content-stretch items-start gap-[8px] px-[20px] pb-0 pt-[14px]">
                    <div className="relative flex h-[20px] w-full shrink-0 content-stretch items-center justify-between">
                      <div className="relative h-[18px] w-[151px] shrink-0">
                        <p className="absolute left-0 top-[0.5px] text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[14px] not-italic leading-[18px] text-white">
                          현재 근무 중
                        </p>
                      </div>
                      <div className="relative size-[20px] shrink-0">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                          <g id="Icon">
                            <path d={svgPaths.p25397b80} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            <path d={svgPaths.p18e6a68} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            <path d={svgPaths.p2241fff0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            <path d={svgPaths.p2c4f400} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div className="relative h-[42px] w-full shrink-0">
                      <p className="absolute left-0 top-0 text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[28px] not-italic leading-[42px] text-white">
                        {workingCount}명
                      </p>
                    </div>
                    <div className="relative h-[15px] w-full shrink-0">
                      <p className="absolute left-0 top-0 text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[14px] not-italic leading-[15px] text-white">
                        전체 {totalCount}명
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 2: 미출근자 */}
                <div className="relative shrink-0 self-stretch rounded-[16px] bg-white">
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[16px] border border-solid border-[#eaeaea] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)]" />
                  <div className="relative flex size-full flex-col content-stretch items-start gap-[8px] px-[21px] pb-px pt-[14px]">
                    <div className="relative flex h-[20px] shrink-0 content-stretch items-center">
                      <p className="text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[14px] not-italic leading-[18px] text-[#09121c]">
                        미출근자
                      </p>
                    </div>
                    <div className="relative h-[42px] w-full shrink-0">
                      <p className="absolute left-0 top-0 text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[28px] not-italic leading-[42px] text-[#09121c]">
                        {absentCount}명
                      </p>
                    </div>
                    <div className="relative h-[15px] w-full shrink-0">
                      <p className="absolute left-0 top-[0.5px] text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[14px] not-italic leading-[15px] text-[#51a8ff] truncate max-w-full">
                        {absentNames || '-'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 3: 오늘의 업무 */}
                <div className="relative shrink-0 self-stretch rounded-[16px] bg-white">
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[16px] border border-solid border-[#eaeaea] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)]" />
                  <div className="relative flex size-full flex-col content-stretch items-start gap-[8px] px-[21px] pb-px pt-[14px]">
                    <div className="relative flex h-[20px] w-full shrink-0 content-stretch items-center justify-between">
                      <p className="text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[14px] not-italic leading-[18px] text-[#09121c]">
                        오늘의 업무
                      </p>
                    </div>
                    <div className="relative h-[42px] w-full shrink-0">
                      <p className="absolute left-0 top-0 text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[28px] not-italic leading-[42px] text-[#09121c]">
                        {completedTaskCount}/{totalTaskCount}
                      </p>
                    </div>
                    <div className="relative h-[15px] w-full shrink-0">
                      <p className="absolute left-0 top-[0.5px] text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[14px] not-italic leading-[15px] text-[#51a8ff]">
                        {totalTaskCount === 0 ? '-' : taskStatus}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Today work student list */}
            <div className="w-full shrink-0">
              <TodayWorkStudentList schedules={schedules} />
            </div>
          </div>
        </div>
      </div>

      {/* Page header section with year/month */}
      <div className="absolute left-0 right-0 top-[76px] h-[95px] w-full bg-white" data-name="Page-header-section-desktop">
        <div className="relative mx-auto h-full max-w-[1920px]">
          <div className="absolute left-1/2 top-0 h-[95px] w-[1200px] max-w-[calc(100%-40px)] -translate-x-1/2">
            <div className="absolute left-0 top-0 h-[95px] w-[1200px]">
              <div className="absolute left-0 top-[31px] h-[30px] w-[1200px]">
                <div className="absolute left-[600px] top-[14px] flex w-[1200px] translate-x-[-50%] translate-y-[-50%] flex-col justify-center text-center font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[40px] not-italic leading-[0] text-[#17191a]">
                  <p className="text-nowrap leading-[1.25]">{currentYear}년 {currentMonth}월</p>
                </div>
              </div>
            </div>
          </div>
          {/* Month navigation arrows */}
          <div className="absolute left-1/2 top-[27px] flex w-[360px] translate-x-[-50%] content-stretch items-center justify-between py-0 pl-0 pr-[2px]">
            <div className="relative flex shrink-0 content-stretch items-center">
              <div className="relative size-[40px] shrink-0">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
                  <g id="Frame"><path d={svgPaths.p3a82b80} fill="black" /></g>
                </svg>
              </div>
            </div>
            <div className="relative flex shrink-0 content-stretch items-center justify-end">
              <div className="relative flex shrink-0 items-center justify-center">
                <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                  <div className="relative size-[40px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
                      <g id="Frame"><path d={svgPaths.p3a82b80} fill="#17191A" /></g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="absolute left-0 right-0 top-0 h-[76px] w-full bg-[#51a8ff]" data-name="Header-Desktop">
        <div aria-hidden="true" className="pointer-events-none absolute inset-[0_0_-0.5px_0] border-b border-solid border-[#e8eef2]" />
        <div className="relative mx-auto h-full max-w-[1920px]">
          <div className="absolute left-1/2 top-[23px] h-[30px] w-[1200px] -translate-x-1/2">
            <div className="flex h-full w-full flex-col justify-center text-center font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[20px] not-italic leading-[0] text-white">
              <p className="text-nowrap leading-[1.25]">정보운영팀 출근부 · 관리자 홈</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <DesktopNav onNavigate={onNavigate} currentPage={currentPage} />
    </div>
  );
}

// Navigation bar components (preserved from original design)

type Icon2Props = { active: boolean };

function Icon2({ active }: Icon2Props) {
  return (
    <div className="relative h-[23.992px] w-full shrink-0 overflow-clip">
      <div className="absolute bottom-[12.5%] left-[37.5%] right-[37.5%] top-1/2">
        <div className="absolute inset-[-11.11%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.99746 10.9965">
            <path d={svgPaths.p27b3c860} stroke={active ? '#51A8FF' : '#99A1AF'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99936" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_12.5%_12.5%_12.5%]">
        <div className="absolute inset-[-5.26%_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9937 20.9938">
            <path d={svgPaths.p27cb6000} stroke={active ? '#51A8FF' : '#99A1AF'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99936" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon3({ active }: { active: boolean }) {
  return (
    <div className="relative h-[23.992px] w-full shrink-0 overflow-clip">
      <div className="absolute bottom-3/4 left-[33.33%] right-[66.67%] top-[8.33%]">
        <div className="absolute inset-[-25%_-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.99936 5.9981">
            <path d="M0.999682 0.999682V4.99841" stroke={active ? '#51A8FF' : '#99A1AF'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99936" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[66.67%] right-[33.33%] top-[8.33%]">
        <div className="absolute inset-[-25%_-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.99936 5.9981">
            <path d="M0.999682 0.999682V4.99841" stroke={active ? '#51A8FF' : '#99A1AF'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99936" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[16.67%_12.5%_8.33%_12.5%]">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9937 19.9937">
            <path d={svgPaths.p260a3f80} stroke={active ? '#51A8FF' : '#99A1AF'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99936" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.67%_12.5%_58.33%_12.5%]">
        <div className="absolute inset-[-1px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9937 1.99936">
            <path d="M0.999682 0.999682H18.994" stroke={active ? '#51A8FF' : '#99A1AF'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99936" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon4({ active }: { active: boolean }) {
  return (
    <div className="relative h-[23.992px] w-full shrink-0 overflow-clip">
      <div className="absolute inset-[12.5%_8.33%_8.35%_8.33%]">
        <div className="absolute inset-[-5.26%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.993 20.9892">
            <path d={svgPaths.p3a853f00} stroke={active ? '#51A8FF' : '#99A1AF'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99936" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative h-[23.992px] w-full shrink-0 overflow-clip">
      <div className="absolute inset-[62.5%_20.83%_12.5%_20.83%]">
        <div className="absolute inset-[-16.67%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9949 7.99746">
            <path d={svgPaths.p39f3b4d0} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99936" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_33.33%_54.17%_33.33%]">
        <div className="absolute inset-[-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.99683 9.99683">
            <path d={svgPaths.p370c1e00} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99936" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function DesktopNav({ onNavigate, currentPage }: ManagerHomeProps) {
  return (
    <div className="absolute left-[calc(50%-0.07px)] top-[965px] flex h-[71.96px] w-[367.869px] translate-x-[-50%] flex-col content-stretch items-start rounded-[18715300px] bg-white px-[31.993px] pb-0 pt-[15.992px] shadow-[0px_4px_30px_0px_rgba(81,168,255,0.2)]">
      <div className="relative h-[39.976px] w-full shrink-0">
        {/* Home */}
        <button
          onClick={() => onNavigate('home')}
          className={`absolute left-0 top-0 flex size-[39.976px] flex-col content-stretch items-start rounded-[18715300px] px-[7.992px] pb-0 pt-[7.992px] ${currentPage === 'home' ? 'bg-[rgba(81,168,255,0.1)]' : ''}`}
        >
          <Icon2 active={currentPage === 'home'} />
        </button>
        {/* QR (calendar icon) */}
        <button
          onClick={() => onNavigate('qr')}
          className={`absolute left-[87.97px] top-0 flex size-[39.976px] flex-col content-stretch items-start rounded-[18715300px] px-[7.992px] pb-0 pt-[7.992px] ${currentPage === 'qr' ? 'bg-[rgba(81,168,255,0.1)]' : ''}`}
        >
          <Icon3 active={currentPage === 'qr'} />
        </button>
        {/* Task */}
        <button
          onClick={() => onNavigate('task')}
          className={`absolute left-[175.94px] top-0 flex size-[39.976px] flex-col content-stretch items-start rounded-[18715300px] px-[7.992px] pb-0 pt-[7.992px] ${currentPage === 'task' ? 'bg-[rgba(81,168,255,0.1)]' : ''}`}
        >
          <Icon4 active={currentPage === 'task'} />
        </button>
        {/* Settings */}
        <div className="absolute left-[263.91px] top-0 flex size-[39.976px] flex-col content-stretch items-start rounded-[18715300px] px-[7.992px] pb-0 pt-[7.992px]">
          <Icon5 />
        </div>
      </div>
    </div>
  );
}
