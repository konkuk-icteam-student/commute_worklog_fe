import svgPaths from '../../imports/svg-366r4er6h5';
import type { ScheduleHistoryItem } from '../../shared/types/schedule.types';

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
  근무중: { bg: 'bg-[#dcfce7]', dot: 'bg-[#00c950]', text: 'text-[#008236]' },
  미출근: { bg: 'bg-[#ffebeb]', dot: 'bg-[#fb2c36]', text: 'text-[#833333]' },
  출근전: { bg: 'bg-[#f1f1f1]', dot: 'bg-black', text: 'text-black' },
  퇴근완료: { bg: 'bg-[#f1f1f1]', dot: 'bg-black', text: 'text-black' },
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
    schedules.filter((s) => new Date(s.start).getHours() < 12)
  );
  const afternoonSchedules = sortSchedules(
    schedules.filter((s) => new Date(s.start).getHours() >= 12)
  );

  return (
    <div
      className="relative h-[410px] w-full overflow-hidden rounded-[16px] bg-white"
      data-name="Container"
    >
      <div className="relative flex size-full flex-col content-stretch items-start rounded-[inherit] p-px">
        {/* Header */}
        <div className="relative h-[55.5px] w-full shrink-0 bg-[#51a8ff]" data-name="Container">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 border-solid border-[#eaeaea] border-[0px_0px_1px]"
          />
          <div className="relative flex size-full flex-col content-stretch items-start px-[20px] pb-px pt-[16px]">
            <div
              className="relative flex h-[22.5px] w-full shrink-0 content-stretch items-center"
              data-name="Container"
            >
              <div className="relative shrink-0">
                <div className="relative flex content-stretch items-center gap-[8px] border-0 border-solid border-[transparent] bg-clip-padding">
                  <div className="relative size-[20px] shrink-0" data-name="Icon">
                    <svg
                      className="block size-full"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 20 20"
                    >
                      <g id="Icon">
                        <path
                          d={svgPaths.p25397b80}
                          id="Vector"
                          stroke="var(--stroke-0, white)"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.66667"
                        />
                        <path
                          d={svgPaths.p18406864}
                          id="Vector_2"
                          stroke="var(--stroke-0, white)"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.66667"
                        />
                        <path
                          d={svgPaths.p2241fff0}
                          id="Vector_3"
                          stroke="var(--stroke-0, white)"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.66667"
                        />
                        <path
                          d={svgPaths.p2c4f400}
                          id="Vector_4"
                          stroke="var(--stroke-0, white)"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.66667"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="relative h-[23px] w-[150px] shrink-0" data-name="Heading 2">
                    <p className="absolute left-0 top-px w-[162px] font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[15px] not-italic leading-[22.5px] text-white">
                      오늘 근무 학생 목록
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          className="custom-scrollbar relative w-full flex-1 overflow-y-auto overflow-x-hidden"
          data-name="Container"
        >
          <div className="flex w-full flex-col">
            {/* 오전 header */}
            <div className="relative w-full border-b border-[#eaeaea] bg-[rgba(220,223,226,0.2)]">
              <div className="flex h-[33px] items-center px-[20px]">
                <div className="relative h-[23px] w-[36px] shrink-0">
                  <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
                    <p className="absolute left-0 top-px text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[14px] not-italic leading-[21px] text-[#09121c]">
                      오전
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 오전 students */}
            {morningSchedules.length === 0 ? (
              <div className="relative flex h-[64px] w-full shrink-0 flex-col content-stretch items-center border-b border-[#eaeaea] px-[20px] pb-px pt-[16px]">
                <p className="relative shrink-0 text-nowrap text-center font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[16px] not-italic leading-[30px] text-[#99a1af]">
                  오늘의 오전 근무자가 없습니다.
                </p>
              </div>
            ) : (
              morningSchedules.map((schedule) => (
                <StudentRow
                  key={schedule.id}
                  schedule={schedule}
                  status={getStatus(schedule, now)}
                />
              ))
            )}

            {/* 오후 header */}
            <div className="relative w-full border-b border-[#eaeaea] bg-[rgba(220,223,226,0.2)]">
              <div className="flex h-[33px] items-center px-[20px]">
                <div className="relative h-[23px] w-[36px] shrink-0">
                  <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
                    <p className="absolute left-0 top-px text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[14px] not-italic leading-[21px] text-[#09121c]">
                      오후
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 오후 students */}
            {afternoonSchedules.length === 0 ? (
              <div className="relative flex h-[64px] w-full shrink-0 flex-col content-stretch items-center border-b border-[#eaeaea] px-[20px] pb-px pt-[16px]">
                <p className="relative shrink-0 text-nowrap text-center font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[16px] not-italic leading-[30px] text-[#99a1af]">
                  오늘의 오후 근무자가 없습니다.
                </p>
              </div>
            ) : (
              afternoonSchedules.map((schedule) => (
                <StudentRow
                  key={schedule.id}
                  schedule={schedule}
                  status={getStatus(schedule, now)}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[16px] border border-solid border-[#eaeaea]"
      />
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
        <div className="flex flex-col justify-center gap-[4px] px-[20px]">
          <div className="flex items-center gap-[8px]">
            <div className="relative h-[23px] w-[36px] shrink-0">
              <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
                <p className="absolute left-0 top-px text-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[14px] not-italic leading-[21px] text-[#09121c]">
                  {schedule.userName}
                </p>
              </div>
            </div>
            <div className={`relative shrink-0 rounded-[10px] ${style.bg} h-[17.5px] w-[51.359px]`}>
              <div className="relative flex size-full content-stretch items-center gap-[4px] border-0 border-solid border-[transparent] bg-clip-padding px-[8px] py-0">
                <div
                  className={`${style.dot} size-[8px] shrink-0 rounded-[1.67772e+07px] opacity-[0.903]`}
                />
                <div className="relative h-[14.5px] min-h-px min-w-px shrink-0 grow basis-0">
                  <div className="relative size-full border-0 border-solid border-[transparent] bg-clip-padding">
                    <p
                      className={`absolute left-0 font-['LINE_Seed_Sans_KR:Bold',sans-serif] not-italic leading-[13.5px] ${style.text} top-[0.5px] text-nowrap text-[9px]`}
                    >
                      {status}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex shrink-0 flex-col content-stretch items-start">
            <p className="relative w-[202px] shrink-0 font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[12px] not-italic leading-[16.5px] text-[#09121c]">
              <span className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[#51a8ff]">
                {startTime}
              </span>
              <span>{` ~ `}</span>
              {endTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
