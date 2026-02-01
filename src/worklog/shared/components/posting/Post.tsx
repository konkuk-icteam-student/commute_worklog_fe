import { useState } from 'react';
import star_empty from '../../assets/star_empty.svg';
import star_filled from '../../assets/star_filled.svg';
import copy from '../../assets/copy.svg';
import graypencil from '../../assets/graypencil.svg';

export interface ManagerEditData {
  managerId: number;
  name: string;
  teamId: number;
  categoryId: number;
  phone: string;
}

export interface PostProps {
  managerId: number; // [추가] 수정/삭제 위해 ID 필수
  title: string; // (참고: API 응답엔 title이 없고 categoryName이 있을텐데, 화면엔 title로 쓰고 있다면 매핑 필요)
  name: string;
  department: string; // API: teamName
  phone: string; // API: phonenum
  teamId: number; // [추가] 모달에 초기값 채워주기 위해 필요
  categoryId: number; // [추가]
  onEditClick: (data: ManagerEditData) => void; // [추가] 부모에게 알리기 위한 함수
}

const Post = ({
  managerId,
  title,
  name,
  department,
  phone,
  teamId,
  categoryId,
  onEditClick,
}: PostProps) => {
  const [isStarred, setIsStarred] = useState(false);

  const toggleStar = () => {
    setIsStarred((prev) => !prev);
  };

  // 수정 버튼 클릭 핸들러
  const handleEdit = () => {
    // 부모에게 현재 데이터를 객체로 전달
    onEditClick({
      managerId,
      name,
      teamId,
      categoryId,
      phone,
      // role 등 기타 필요한 정보도 함께
    });
  };

  return (
    <div className="flex items-center justify-between border-b border-[#E8EEF2] py-4 transition-colors hover:bg-gray-50">
      <div className="flex items-center gap-4">
        {/* 즐겨찾기 별 아이콘 (클릭 시 토글) */}
        <button onClick={toggleStar} className="focus:outline-none">
          <img
            src={isStarred ? star_filled : star_empty}
            alt="즐겨찾기"
            className="cursor-pointer"
          />
        </button>

        {/* 게시글 정보 */}
        <div className="flex flex-col gap-1">
          <div className="flex gap-[6px]">
            <h3 className="text-[16px] font-bold leading-none text-black">{title}</h3>
            <button onClick={handleEdit} className="cursor-pointer hover:opacity-70">
              <img src={graypencil} alt="연필" />
            </button>
          </div>
          <div className="flex items-center gap-2 text-[12px] font-normal leading-none text-[#464A4D]">
            <span>{name}</span>
            <span className="h-[2px] w-[2px] rounded-full bg-[#464A4D]"></span>
            <span>{department}</span>
            <span className="h-[2px] w-[2px] rounded-full bg-[#464A4D]"></span>
          </div>
        </div>
      </div>

      {/* 우측 전화번호 및 복사 영역 */}
      <div className="flex items-center">
        <div className="flex h-[24px] w-[121px] items-center justify-between rounded-[6px] border border-[#E8EEF2] bg-white px-[8px]">
          <span className="text-[12px] text-[#464A4D]">{phone}</span>
          <button className="cursor-pointer hover:opacity-70">
            <img src={copy} alt="복사" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
