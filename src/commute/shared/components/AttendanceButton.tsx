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
    subtitle: '바로가기'
  },
  checkedIn: {
    icon: AttendanceCompletedIcon,
    title: '출근 완료',
    subtitle: ''
  },
  checkOut: {
    icon: AttendanceVerificationIcon,
    title: '퇴근 인증',
    subtitle: '바로가기'
  },
  checkedOut: {
    icon: AttendanceCompletedIcon,
    title: '퇴근 완료',
    subtitle: ''
  }
};

export default function AttendanceButton({
  status,
  time,
  onClick
}: AttendanceButtonProps) {
  const config = statusConfig[status];
  const displaySubtitle = config.subtitle || time || '';

  return (
    <button
      onClick={onClick}
      className="bg-white box-border content-stretch flex gap-[1.6rem] items-center overflow-clip relative rounded-[1.6rem] shadow-[0rem_0.4rem_2rem_0rem_rgba(81,168,255,0.07)] w-full h-[12.5984rem] hover:bg-gray-50 transition-colors"
      data-name="AttendanceButton"
    >
      {/* Icon */}
      <div className="size-[4.6rem] relative shrink-0 ml-[2.4rem]" data-name="Image">
        <img
          src={config.icon}
          alt={config.title}
          className="block size-full object-contain"
        />
      </div>

      {/* Text */}
      <div
        className="content-stretch flex flex-col gap-[0.8rem] items-start relative shrink-0 text-[#09121c] text-nowrap whitespace-pre"
        data-name="Text"
      >
        <p
          className="font-['Poppins:Medium','Noto_Sans_KR:Medium',sans-serif] leading-[1.6rem] relative shrink-0 text-[1.6rem] tracking-[0.024rem]"
          style={{ fontVariationSettings: "'wght' 500" }}
        >
          {config.title}
        </p>
        <p
          className="font-['Poppins:Light','Noto_Sans_KR:Light',sans-serif] leading-[1.2rem] opacity-50 relative shrink-0 text-[1.2rem] tracking-[0.018rem]"
          style={{ fontVariationSettings: "'wght' 300" }}
        >
          {displaySubtitle}
        </p>
      </div>
    </button>
  );
}
