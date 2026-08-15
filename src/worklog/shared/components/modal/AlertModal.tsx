interface AlertModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
}

const AlertModal = ({
  isOpen,
  message,
  onClose,
  onConfirm,
  confirmText = '확인',
}: AlertModalProps) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
      return;
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="flex min-h-[200px] w-[540px] flex-col items-center justify-center rounded-[16px] bg-white px-8 py-10 shadow-lg">
        <h2 className="mb-8 whitespace-pre-line text-center text-[24px] font-bold leading-[1.4] text-[#17191A]">
          {message}
        </h2>
        <button
          onClick={handleConfirm}
          className="flex h-[48px] w-[160px] items-center justify-center rounded-[8px] border border-[#E8EEF2] text-[16px] font-bold text-[#464A4D] hover:bg-gray-50"
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
