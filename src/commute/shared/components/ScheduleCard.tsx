import ScheduleIcon from '../assets/schedule.svg';
import SelectedScheduleIcon from '../assets/selectedSchedule.svg';
import ModifyIcon from '../assets/modify.svg';
import SelectedModifyIcon from '../assets/selectedModify.svg';
import CheckIcon from '../assets/check.svg';
import SelectedCheckIcon from '../assets/selectedCheck.svg';

interface ScheduleCardProps {
  type: 'apply' | 'modify' | 'view';
  selected?: boolean;
  onClick?: () => void;
}

export default function ScheduleCard({ type, selected = false, onClick }: ScheduleCardProps) {
  const cardConfig = {
    apply: {
      icon: selected ? SelectedScheduleIcon : ScheduleIcon,
      title: '근로시간 신청',
      description: '새로운 근로시간을 신청합니다',
      bgColor: selected ? 'bg-[#E8F4FF]' : 'bg-white',
    },
    modify: {
      icon: selected ? SelectedModifyIcon : ModifyIcon,
      title: '근로시간 수정',
      description: '신청한 근로시간을 수정합니다',
      bgColor: selected ? 'bg-[#E8F4FF]' : 'bg-white',
    },
    view: {
      icon: selected ? SelectedCheckIcon : CheckIcon,
      title: '근로시간 조회',
      description: '신청한 근로시간을 조회합니다',
      bgColor: selected ? 'bg-[#E8F4FF]' : 'bg-white',
    },
  };

  const config = cardConfig[type];

  return (
    <button
      onClick={onClick}
      className={`w-full ${config.bgColor} cursor-pointer rounded-[1.6rem] p-[2.4rem] shadow-[0rem_0.4rem_2rem_0rem_rgba(81,168,255,0.07)] transition-all duration-200 hover:shadow-[0rem_0.6rem_2.4rem_0rem_rgba(81,168,255,0.12)]`}
      data-name="ScheduleCard"
    >
      <div className="flex items-center gap-[2rem]">
        {/* Icon */}
        <div className="shrink-0" data-name="IconContainer">
          <img src={config.icon} alt={config.title} className="h-[4rem] w-[4rem]" />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col items-start gap-[0.4rem]">
          <p className="text-left font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[1.6rem] leading-[2.4rem] text-[#09121c]">
            {config.title}
          </p>
          <p className="text-left font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.3rem] leading-[1.9rem] text-[#4a5565] opacity-70">
            {config.description}
          </p>
        </div>

        {/* Arrow */}
        <div className="shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18L15 12L9 6"
              stroke={selected ? '#51A8FF' : '#9CA3AF'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </button>
  );
}
