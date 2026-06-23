import AttendanceVerificationIcon from '../../../shared/assets/AttendanceVerification.svg';
import AttendanceCompletedIcon from '../../../shared/assets/AttendanceCompleted.svg';

export type AttendanceStatus = 'checkIn' | 'checkedIn' | 'checkOut' | 'checkedOut';

interface AttendanceButtonProps {
  status: AttendanceStatus;
  time?: string;
  onClick?: () => void;
}

const statusConfig = {
  checkIn: {
    icon: AttendanceVerificationIcon,
    title: '출근 인증',
    subtitle: '바로가기',
  },
  checkedIn: {
    icon: AttendanceCompletedIcon,
    title: '출근 완료',
    subtitle: '',
  },
  checkOut: {
    icon: AttendanceVerificationIcon,
    title: '퇴근 인증',
    subtitle: '바로가기',
  },
  checkedOut: {
    icon: AttendanceCompletedIcon,
    title: '퇴근 완료',
    subtitle: '',
  },
};

export default function AttendanceButton({ status, time, onClick }: AttendanceButtonProps) {
  const config = statusConfig[status];
  const displaySubtitle = config.subtitle || time || '';

  return (
    <button
      onClick={onClick}
      className="relative box-border flex h-[12.5984rem] w-full content-stretch items-center gap-[1.6rem] overflow-clip rounded-[1.6rem] bg-white shadow-[0rem_0.4rem_2rem_0rem_rgba(81,168,255,0.07)] transition-colors hover:bg-gray-50"
      data-name="AttendanceButton"
    >
      {/* Icon */}
      <div className="relative ml-[2.4rem] size-[4.6rem] shrink-0" data-name="Image">
        <img src={config.icon} alt={config.title} className="block size-full object-contain" />
      </div>

      {/* Text */}
      <div
        className="relative flex shrink-0 flex-col content-stretch items-start gap-[0.8rem] whitespace-pre text-nowrap text-[#09121c]"
        data-name="Text"
      >
        <p
          className="relative shrink-0 font-['Poppins:Medium','Noto_Sans_KR:Medium',sans-serif] text-[1.6rem] leading-[1.6rem] tracking-[0.024rem]"
          style={{ fontVariationSettings: "'wght' 500" }}
        >
          {config.title}
        </p>
        <p
          className="relative shrink-0 font-['Poppins:Light','Noto_Sans_KR:Light',sans-serif] text-[1.2rem] leading-[1.2rem] tracking-[0.018rem] opacity-50"
          style={{ fontVariationSettings: "'wght' 300" }}
        >
          {displaySubtitle}
        </p>
      </div>
    </button>
  );
}
