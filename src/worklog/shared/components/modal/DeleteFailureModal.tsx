interface DeleteFailureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteFailureModal = ({ isOpen, onClose }: DeleteFailureModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="flex h-[200px] w-[540px] flex-col items-center justify-center rounded-[16px] bg-white px-8 shadow-lg">
        <h2 className="mb-8 text-[24px] font-bold text-[#17191A]">
          관련 FAQ 또는 담당자가 존재합니다.
        </h2>
        <button
          onClick={onClose}
          className="flex h-[48px] w-[160px] items-center justify-center rounded-[8px] border border-[#E8EEF2] text-[16px] font-bold text-[#464A4D] hover:bg-gray-50"
        >
          돌아가기
        </button>
      </div>
    </div>
  );
};

export default DeleteFailureModal;
