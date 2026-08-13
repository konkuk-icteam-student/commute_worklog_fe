import { useState } from 'react';
import star_empty from '@/worklog/shared/assets/star_empty.svg';
import star_filled from '@/worklog/shared/assets/star_filled.svg';
import copy from '@/worklog/shared/assets/copy.svg';
import pencil from '@/worklog/shared/assets/pencil.svg'; // 요청하신 연필 아이콘
import AlertModal from '@/worklog/shared/components/modal/AlertModal';
import { toggleFavorite } from '@/worklog/shared/apis/manager/manager.api';

export interface ManagerEditData {
  managerId: number;
  name: string;
  organizationId: number;
  categoryId: number;
  phone: string;
}

export interface ManagerCardProps {
  managerId: number;
  categoryName: string;
  managerName: string;
  organizationName: string;
  phonenum: string;
  organizationId: number;
  categoryId: number;
  initialFavorite: boolean; // API에서 받아온 초기 즐겨찾기 상태
  onEditClick: (data: ManagerEditData) => void;
}

const ManagerCard = ({
  managerId,
  categoryName,
  managerName,
  organizationName,
  phonenum,
  organizationId,
  categoryId,
  initialFavorite,
  onEditClick,
}: ManagerCardProps) => {
  const [isStarred, setIsStarred] = useState(initialFavorite);
  const [alertMessage, setAlertMessage] = useState('');
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const openAlertModal = (message: string) => {
    setAlertMessage(message);
    setIsAlertModalOpen(true);
  };

  // 즐겨찾기 토글 (API 연동)
  const handleToggleStar = async () => {
    const newStatus = !isStarred;
    setIsStarred(newStatus); // UI 즉시 반영 (Optimistic Update)

    try {
      await toggleFavorite(managerId, categoryId, newStatus);
    } catch (error) {
      console.error('즐겨찾기 변경 실패:', error);
      setIsStarred(!newStatus); // 실패 시 원상복구
      openAlertModal('즐겨찾기 상태를 변경하지 못했습니다.');
    }
  };

  const handleEdit = () => {
    onEditClick({
      managerId,
      name: managerName,
      organizationId,
      categoryId,
      phone: phonenum,
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phonenum);
      openAlertModal('전화번호가 클립보드에 복사되었습니다.');
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  return (
    <div className="flex min-h-[160px] flex-col justify-between rounded-[16px] border border-[#E8EEF2] bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all hover:shadow-md">
      {/* 상단: 정보 및 액션 버튼 */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1.5">
          {/* 별 & 분류 제목 */}
          <div className="flex items-center gap-2">
            <button onClick={handleToggleStar} className="focus:outline-none">
              <img
                src={isStarred ? star_filled : star_empty}
                alt="즐겨찾기"
                className="h-6 w-6 cursor-pointer transition-transform hover:scale-110"
              />
            </button>
            <h3 className="text-[18px] font-bold text-[#17191A]">{categoryName}</h3>
          </div>

          {/* 담당자 & 소속 (별 아이콘 너비만큼 들여쓰기) */}
          <div className="ml-8 flex items-center gap-2 text-[13px] font-medium text-[#8C9499]">
            <span>{managerName}</span>
            <span className="h-[3px] w-[3px] rounded-full bg-[#8C9499]"></span>
            <span>{organizationName}</span>
          </div>
        </div>

        {/* 연필(수정) 버튼 */}
        <button onClick={handleEdit} className="shrink-0 cursor-pointer p-1 hover:opacity-70">
          <img src={pencil} alt="수정" className="h-8 w-8 opacity-50" />
        </button>
      </div>

      {/* 하단: 전화번호 영역 */}
      <div className="mt-6 flex h-[48px] items-center justify-between rounded-[8px] border border-[#E8EEF2] bg-[#F8FAFB] px-4">
        <span className="text-[15px] font-medium text-[#464A4D]">{phonenum}</span>
        <button
          onClick={handleCopy}
          title="전화번호 복사"
          className="flex shrink-0 cursor-pointer items-center p-1"
        >
          <img
            src={copy}
            alt="복사"
            className="h-4 w-4 opacity-40 transition-opacity hover:opacity-100"
          />
        </button>
      </div>
      <AlertModal
        isOpen={isAlertModalOpen}
        message={alertMessage}
        onClose={() => setIsAlertModalOpen(false)}
      />
    </div>
  );
};

export default ManagerCard;
