// DeleteConfirmPopup.tsx - 업무 삭제 재확인 모달

type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteConfirmPopup({ isOpen, onClose, onConfirm }: PopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div
        className="relative flex w-[440px] flex-col content-stretch items-center justify-center gap-[40px] rounded-[16px] bg-white p-[32px]"
        data-name="pop-up"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[-0.5px] rounded-[16.5px] border border-solid border-[#e8eef2] shadow-[15px_15px_20px_0px_rgba(232,238,242,0.3)]"
        />

        {/* 제목 */}
        <div className="relative flex w-full shrink-0 flex-col content-stretch items-center justify-center">
          <div className="relative flex w-full shrink-0 flex-col content-stretch items-center justify-center">
            <p className="css-ew64yg relative shrink-0 text-nowrap font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] text-[24px] font-semibold not-italic leading-[normal] text-black">
              업무를 삭제하시겠습니까?
            </p>
          </div>
        </div>

        {/* 버튼 그룹 */}
        <div className="relative flex w-full shrink-0 content-stretch items-center justify-center gap-[16px]">
          {/* 취소 버튼 */}
          <button
            onClick={onClose}
            className="relative flex h-[48px] w-[180px] shrink-0 cursor-pointer content-stretch items-center justify-center gap-[10px] rounded-[8px] bg-white px-[20px] py-[14px] transition-colors hover:bg-gray-50"
            data-name="Button"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[8px] border border-solid border-[#e8eef2]"
            />
            <div className="css-g0mm18 relative flex shrink-0 flex-col justify-center font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[16px] not-italic leading-[0] text-[#464a4d]">
              <p className="css-ew64yg text-nowrap leading-[normal]">취소</p>
            </div>
          </button>

          {/* 삭제 버튼 */}
          <button
            onClick={onConfirm}
            className="relative flex h-[48px] w-[180px] shrink-0 cursor-pointer content-stretch items-center justify-center gap-[10px] rounded-[8px] bg-white px-[20px] py-[14px] transition-colors hover:bg-gray-50"
            data-name="Button"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[8px] border border-solid border-[#e8eef2]"
            />
            <div className="css-g0mm18 relative flex shrink-0 flex-col justify-center font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[16px] not-italic leading-[0] text-[#464a4d]">
              <p className="css-ew64yg text-nowrap leading-[normal]">삭제</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
