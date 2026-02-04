// UserTypeRadio.tsx - 관리자/학생 선택 라디오 버튼

type UserTypeRadioProps = {
  value: 'student' | 'manager';
  onChange: (value: 'student' | 'manager') => void;
};

export default function UserTypeRadio({ value, onChange }: UserTypeRadioProps) {
  return (
    <div className="relative flex w-full content-stretch items-center">
      {/* 학생 옵션 */}
      <button
        type="button"
        onClick={() => onChange('student')}
        className="relative flex w-[150px] shrink-0 cursor-pointer content-stretch items-center gap-[10px]"
      >
        <div className="relative size-[13px] shrink-0">
          <div className="absolute inset-[-123.08%_-153.85%_-184.62%_-153.85%]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 53 53"
            >
              <g filter="url(#filter0_d_student)" id="Group 33">
                <circle
                  cx="26.5"
                  cy="22.5"
                  fill="white"
                  id="Ellipse 2"
                  r="6.25"
                  stroke="#EAEAEA"
                  strokeWidth="0.5"
                />
                {value === 'student' && (
                  <circle cx="26.5" cy="22.5" fill="#51A8FF" id="Ellipse 3" r="3.5" />
                )}
              </g>
              <defs>
                <filter
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                  height="53"
                  id="filter0_d_student"
                  width="53"
                  x="0"
                  y="0"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="10" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.317647 0 0 0 0 0.658824 0 0 0 0 1 0 0 0 0.07 0"
                  />
                  <feBlend
                    in2="BackgroundImageFix"
                    mode="normal"
                    result="effect1_dropShadow_student"
                  />
                  <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow_student"
                    mode="normal"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
        <p className="css-ew64yg relative shrink-0 text-nowrap font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[14px] not-italic leading-[normal] tracking-[0.21px] text-[rgba(9,18,28,0.5)]">
          학생
        </p>
      </button>

      {/* 관리자 옵션 */}
      <button
        type="button"
        onClick={() => onChange('manager')}
        className="relative flex w-[150px] shrink-0 cursor-pointer content-stretch items-center gap-[10px]"
      >
        <div className="relative size-[13px] shrink-0">
          <div className="absolute inset-[-123.08%_-153.85%_-184.62%_-153.85%]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 53 53"
            >
              <g filter="url(#filter0_d_manager)" id="Group 33">
                <circle
                  cx="26.5"
                  cy="22.5"
                  fill="white"
                  id="Ellipse 2"
                  r="6.25"
                  stroke="#EAEAEA"
                  strokeWidth="0.5"
                />
                {value === 'manager' && (
                  <circle cx="26.5" cy="22.5" fill="#51A8FF" id="Ellipse 3" r="3.5" />
                )}
              </g>
              <defs>
                <filter
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                  height="53"
                  id="filter0_d_manager"
                  width="53"
                  x="0"
                  y="0"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="10" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.317647 0 0 0 0 0.658824 0 0 0 0 1 0 0 0 0.07 0"
                  />
                  <feBlend
                    in2="BackgroundImageFix"
                    mode="normal"
                    result="effect1_dropShadow_manager"
                  />
                  <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow_manager"
                    mode="normal"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
        <p className="css-ew64yg relative shrink-0 text-nowrap font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[14px] not-italic leading-[normal] tracking-[0.21px] text-[rgba(9,18,28,0.5)]">
          관리자
        </p>
      </button>
    </div>
  );
}
