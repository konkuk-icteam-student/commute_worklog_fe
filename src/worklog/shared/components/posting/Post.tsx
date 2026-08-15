import { useState } from 'react';
import star_empty from '@/worklog/shared/assets/star_empty.svg';
import star_filled from '@/worklog/shared/assets/star_filled.svg';
import copy from '@/worklog/shared/assets/copy.svg';
import AlertModal from '@/worklog/shared/components/modal/AlertModal';
import graypencil from '@/worklog/shared/assets/graypencil.svg';

export interface ManagerEditData {
  managerId: number;
  name: string;
  organizationId: number;
  categoryId: number;
  phone: string;
}

export interface PostProps {
  managerId: number;
  categoryName: string;
  managerName: string;
  organizationName: string;
  phonenum: string;
  organizationId: number;
  categoryId: number;
  onEditClick: (data: ManagerEditData) => void;
}

const Post = ({
  managerId,
  categoryName,
  managerName,
  organizationName,
  phonenum,
  organizationId,
  categoryId,
  onEditClick,
}: PostProps) => {
  const [isStarred, setIsStarred] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const openAlertModal = (message: string) => {
    setAlertMessage(message);
    setIsAlertModalOpen(true);
  };

  const toggleStar = () => {
    setIsStarred((prev) => !prev);
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
    <div className="flex items-center justify-between border-b border-[#E8EEF2] py-4 transition-colors hover:bg-gray-50">
      <div className="flex items-center gap-4">
        {/* 즐겨찾기 아이콘 크기 살짝 확대 */}
        <button onClick={toggleStar} className="focus:outline-none">
          <img
            src={isStarred ? star_filled : star_empty}
            alt="즐겨찾기"
            className="ml-[10px] h-7 w-7 cursor-pointer"
          />
        </button>

        {/* 정보 영역 */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            {/* 분류 제목: 16px -> 18px 상향 */}
            <h3 className="text-[18px] font-bold leading-none text-black">{categoryName}</h3>
            {/* 연필 버튼 */}
            <button onClick={handleEdit} className="cursor-pointer hover:opacity-70">
              <img src={graypencil} alt="연필" className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center gap-2 text-[14px] font-medium leading-none text-[#464A4D]">
            {/* 담당자 정보: 12px -> 14px 상향 */}
            <span>{managerName}</span>
            <span className="h-[3px] w-[3px] rounded-full bg-[#8C9499]"></span>
            <span>{organizationName}</span>
          </div>
        </div>
      </div>

      {/* 우측 전화번호 박스 영역 */}
      <div className="mr-[10px] flex items-center">
        <div className="flex items-center justify-center gap-2 rounded-[8px] border border-[#E8EEF2] bg-white px-3.5 py-1.5 shadow-sm transition-all hover:border-blue-300">
          <span className="whitespace-nowrap text-[15px] font-bold text-[#2D3032]">{phonenum}</span>
          <button
            onClick={handleCopy}
            title="전화번호 복사"
            className="flex shrink-0 cursor-pointer items-center hover:opacity-70"
          >
            <img src={copy} alt="복사" className="h-4 w-4 opacity-60" />
          </button>
        </div>
      </div>
      <AlertModal
        isOpen={isAlertModalOpen}
        message={alertMessage}
        onClose={() => setIsAlertModalOpen(false)}
      />
    </div>
  );
};

export default Post;
