import svgPaths from "../../imports/svg-366r4er6h5";
import type { ScheduleHistoryItem } from "../../shared/types/schedule.types";

interface TodayWorkStudentListProps {
  schedules: ScheduleHistoryItem[];
}

type StatusLabel = '근무중' | '미출근' | '출근전' | '퇴근완료';

interface StatusStyle {
  bg: string;
  dot: string;
  text: string;
}

const STATUS_STYLES: Record<StatusLabel, StatusStyle> = {
  '근무중': { bg: 'bg-[#dcfce7]', dot: 'bg-[#00c950]', text: 'text-[#008236]' },
  '미출근': { bg: 'bg-[#ffebeb]', dot: 'bg-[#fb2c36]', text: 'text-[#833333]' },
  '출근전': { bg: 'bg-[#f1f1f1]', dot: 'bg-black', text: 'text-black' },
  '퇴근완료': { bg: 'bg-[#f1f1f1]', dot: 'bg-black', text: 'text-black' },
};

function getStatus(schedule: ScheduleHistoryItem, now: Date): StatusLabel {
  const start = new Date(schedule.start);
  const end = new Date(schedule.end);

  if (schedule.actualStart && schedule.actualEnd) return '퇴근완료';
  if (schedule.actualStart && !schedule.actualEnd && now >= start && now <= end) return '근무중';
  if (!schedule.actualStart && now >= start) return '미출근';
  return '출근전';
}

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  if (minutes === 0) return `${hour}시`;
  return `${hour}시 ${minutes}분`;
}

function sortSchedules(schedules: ScheduleHistoryItem[]): ScheduleHistoryItem[] {
  return [...schedules].sort((a, b) => {
    if (a.start !== b.start) return a.start.localeCompare(b.start);
    if (a.end !== b.end) return a.end.localeCompare(b.end);
    return a.userName.localeCompare(b.userName, 'ko');
  });
}

export default function TodayWorkStudentList({ schedules }: TodayWorkStudentListProps) {
  const now = new Date();

  const morningSchedules = sortSchedules(
    schedules.filter(s => new Date(s.start).getHours() < 12)
  );
  const afternoonSchedules = sortSchedules(
    schedules.filter(s => new Date(s.start).getHours() >= 12)
  );

  return (
    <div className="bg-white relative rounded-[16px] w-full h-[410px] overflow-hidden" data-name="Container">
      <div className="content-stretch flex flex-col items-start p-px relative rounded-[inherit] size-full">
        {/* Header */}
        <div className="bg-[#51a8ff] h-[55.5px] relative shrink-0 w-full" data-name="Container">
          <div aria-hidden="true" className="absolute border-[#eaeaea] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex flex-col items-start pb-px pt-[16px] px-[20px] relative size-full">
            <div className="content-stretch flex h-[22.5px] items-center relative shrink-0 w-full" data-name="Container">
              <div className="relative shrink-0">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
                  <div className="relative shrink-0 size-[20px]" data-name="Icon">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                      <g id="Icon">
                        <path d={svgPaths.p25397b80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d={svgPaths.p18406864} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d={svgPaths.p2241fff0} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d={svgPaths.p2c4f400} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      </g>
                    </svg>
                  </div>
                  <div className="h-[23px] relative shrink-0 w-[150px]" data-name="Heading 2">
                    <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[22.5px] left-0 not-italic text-[15px] text-white top-px w-[162px]">오늘 근무 학생 목록</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 relative w-full overflow-y-auto overflow-x-hidden custom-scrollbar" data-name="Container">
          <div className="flex flex-col w-full">
            {/* 오전 header */}
            <div className="relative w-full bg-[rgba(220,223,226,0.2)] border-b border-[#eaeaea]">
              <div className="flex items-center h-[33px] px-[20px]">
                <div className="h-[23px] relative shrink-0 w-[36px]">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                    <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[21px] left-0 not-italic text-[#09121c] text-[14px] text-nowrap top-px">오전</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 오전 students */}
            {morningSchedules.length === 0 ? (
              <div className="content-stretch flex flex-col h-[64px] items-center pb-px pt-[16px] px-[20px] relative shrink-0 w-full border-b border-[#eaeaea]">
                <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[30px] not-italic relative shrink-0 text-[#99a1af] text-[16px] text-center text-nowrap">오늘의 오전 근무자가 없습니다.</p>
              </div>
            ) : (
              morningSchedules.map((schedule) => (
                <StudentRow key={schedule.id} schedule={schedule} status={getStatus(schedule, now)} />
              ))
            )}

            {/* 오후 header */}
            <div className="relative w-full bg-[rgba(220,223,226,0.2)] border-b border-[#eaeaea]">
              <div className="flex items-center h-[33px] px-[20px]">
                <div className="h-[23px] relative shrink-0 w-[36px]">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                    <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[21px] left-0 not-italic text-[#09121c] text-[14px] text-nowrap top-px">오후</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 오후 students */}
            {afternoonSchedules.length === 0 ? (
              <div className="content-stretch flex flex-col h-[64px] items-center pb-px pt-[16px] px-[20px] relative shrink-0 w-full border-b border-[#eaeaea]">
                <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[30px] not-italic relative shrink-0 text-[#99a1af] text-[16px] text-center text-nowrap">오늘의 오후 근무자가 없습니다.</p>
              </div>
            ) : (
              afternoonSchedules.map((schedule) => (
                <StudentRow key={schedule.id} schedule={schedule} status={getStatus(schedule, now)} />
              ))
            )}
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#eaeaea] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function StudentRow({ schedule, status }: { schedule: ScheduleHistoryItem; status: StatusLabel }) {
  const style = STATUS_STYLES[status];
  const startTime = formatTime(schedule.start);
  const endTime = formatTime(schedule.end);

  return (
    <div className="relative w-full border-b border-[#eaeaea]">
      <div className="flex w-full py-[10px]">
        <div className="flex flex-col gap-[4px] justify-center px-[20px]">
          <div className="flex gap-[8px] items-center">
            <div className="h-[23px] relative shrink-0 w-[36px]">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[21px] left-0 not-italic text-[#09121c] text-[14px] text-nowrap top-px">{schedule.userName}</p>
              </div>
            </div>
            <div className={`relative rounded-[10px] shrink-0 ${style.bg} h-[17.5px] w-[51.359px]`}>
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center px-[8px] py-0 relative size-full">
                <div className={`${style.dot} opacity-[0.903] rounded-[1.67772e+07px] shrink-0 size-[8px]`} />
                <div className="basis-0 grow h-[14.5px] min-h-px min-w-px relative shrink-0">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                    <p className={`absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[13.5px] left-0 not-italic ${style.text} text-[9px] text-nowrap top-[0.5px]`}>{status}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-start relative shrink-0">
            <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[16.5px] not-italic relative shrink-0 text-[#09121c] text-[12px] w-[202px]">
              <span className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[#51a8ff]">{startTime}</span>
              <span>{` ~ `}</span>
              {endTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
