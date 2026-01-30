interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  teamName: string; // 삭제할 소속 이름
}

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  teamName,
}: DeleteConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="flex h-[200px] w-[540px] flex-col items-center justify-center rounded-[16px] bg-white px-8 shadow-lg">
        <h2 className="mb-8 text-[24px] font-bold text-[#17191A]">
          '{teamName}' 소속을 삭제하시겠습니까?
        </h2>
        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="flex h-[48px] w-[160px] items-center justify-center rounded-[8px] border border-[#E8EEF2] text-[16px] font-bold text-[#464A4D] hover:bg-gray-50"
          >
            삭제하기
          </button>
          <button
            onClick={onClose}
            className="flex h-[48px] w-[160px] items-center justify-center rounded-[8px] border border-[#E8EEF2] text-[16px] font-bold text-[#464A4D] hover:bg-gray-50"
          >
            돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
