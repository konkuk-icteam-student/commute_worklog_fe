import { useState } from 'react';
import star_empty from '@/worklog/shared/assets/star_empty.svg';
import star_filled from '@/worklog/shared/assets/star_filled.svg';
import copy from '@/worklog/shared/assets/copy.svg';
import graypencil from '@/worklog/shared/assets/graypencil.svg';

// 수정 모달로 넘길 데이터 타입 (ModalAddManager의 ManagerData와 호환)
export interface ManagerEditData {
  managerId: number;
  name: string; // form 데이터는 name
  teamId: number;
  categoryId: number;
  phone: string; // form 데이터는 phone
}

export interface PostProps {
  managerId: number;
  categoryName: string; // 분류 (Post의 큰 제목)
  managerName: string; // 담당자 성함
  teamName: string; // 소속
  phonenum: string; // 전화번호
  teamId: number; // 수정용
  categoryId: number; // 수정용
  onEditClick: (data: ManagerEditData) => void;
}

const Post = ({
  managerId,
  categoryName,
  managerName,
  teamName,
  phonenum,
  teamId,
  categoryId,
  onEditClick,
}: PostProps) => {
  const [isStarred, setIsStarred] = useState(false);

  const toggleStar = () => {
    setIsStarred((prev) => !prev);
  };

  // 연필 버튼 클릭 시 부모에게 데이터 전달
  const handleEdit = () => {
    onEditClick({
      managerId,
      name: managerName, // UI props -> Form data 매핑
      teamId,
      categoryId,
      phone: phonenum, // UI props -> Form data 매핑
    });
  };

  return (
    <div className="flex items-center justify-between border-b border-[#E8EEF2] py-4 transition-colors hover:bg-gray-50">
      <div className="flex items-center gap-4">
        {/* 즐겨찾기 */}
        <button onClick={toggleStar} className="focus:outline-none">
          <img
            src={isStarred ? star_filled : star_empty}
            alt="즐겨찾기"
            className="cursor-pointer"
          />
        </button>

        {/* 정보 영역 */}
        <div className="flex flex-col gap-1">
          <div className="flex gap-[6px]">
            {/* 분류 이름이 제목으로 표시됨 */}
            <h3 className="text-[16px] font-bold leading-none text-black">{categoryName}</h3>
            {/* 수정 버튼 */}
            <button onClick={handleEdit} className="cursor-pointer hover:opacity-70">
              <img src={graypencil} alt="연필" />
            </button>
          </div>
          <div className="flex items-center gap-2 text-[12px] font-normal leading-none text-[#464A4D]">
            {/* 성함 */}
            <span>{managerName}</span>
            <span className="h-[2px] w-[2px] rounded-full bg-[#464A4D]"></span>
            {/* 소속 */}
            <span>{teamName}</span>
            {/* 직급(role)은 API에 없어서 제거됨 */}
          </div>
        </div>
      </div>

      {/* 우측 전화번호 */}
      <div className="flex items-center">
        <div className="flex h-[24px] w-[121px] items-center justify-between rounded-[6px] border border-[#E8EEF2] bg-white px-[8px]">
          <span className="text-[12px] text-[#464A4D]">{phonenum}</span>
          <button className="cursor-pointer hover:opacity-70">
            <img src={copy} alt="복사" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
