import blueX from '../../assets/blueX.svg';

interface ModalAddManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalAddManager = ({ isOpen, onClose }: ModalAddManagerProps) => {
  if (!isOpen) return null;

  // 공통 Input 스타일 정의
  const inputStyle =
    'w-full h-[32px] rounded-[6px] border border-[#F4F6F8] bg-[#F4F6F8] px-3 text-[14px] outline-none focus:border-blue-400';
  // 공통 Label 스타일 정의
  const labelStyle = 'text-[14px] font-normal text-[#4F4F4F] mb-2 block';

  return (
    // 배경 (Overlay)
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(70, 74, 77, 0.30)' }}
      onClick={onClose}
    >
      {/* 모달 박스 (Container) */}
      <div
        className="relative flex flex-col rounded-[24px] bg-white px-[32px] py-[32px] shadow-lg"
        style={{ width: '640px', height: '605px' }}
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
      >
        {/* Header: Title & Close Button */}
        <div className="mb-10 flex items-start justify-between">
          <h2 className="mt-2 text-[24px] font-[600] leading-none text-black">
            담당자를 추가하세요.
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center transition-opacity hover:opacity-80"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '6px',
              background: '#E6E8FF',
            }}
          >
            <img src={blueX} alt="닫기" />
          </button>
        </div>

        {/* Body: Form Inputs */}
        <div className="flex flex-1 flex-col gap-6">
          {/* 성함 */}
          <div>
            <label className={labelStyle}>성함</label>
            <input type="text" className={inputStyle} />
          </div>

          {/* 소속 */}
          <div>
            <label className={labelStyle}>소속</label>
            {/* 이미지상 드롭다운처럼 보이지만 일단 Input 스타일로 통일 (추후 Select로 변경 가능) */}
            <input type="text" className={inputStyle} />
          </div>

          {/* 분류 */}
          <div>
            <label className={labelStyle}>분류</label>
            <input type="text" className={inputStyle} />
          </div>

          {/* 번호 */}
          <div>
            <label className={labelStyle}>번호</label>
            <input type="text" className={inputStyle} />
          </div>
        </div>

        {/* Footer: Submit Button */}
        <div className="mt-auto flex justify-center">
          <button
            className="flex h-[48px] w-[140px] items-center justify-center bg-white transition-colors hover:bg-gray-50"
            style={{
              borderRadius: '8px',
              border: '1px solid #E8EEF2',
            }}
            onClick={() => alert('추가하기 버튼 클릭!')}
          >
            <span className="text-[16px] font-[700] text-black">추가하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddManager;
