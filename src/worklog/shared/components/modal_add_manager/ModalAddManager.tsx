import { useState, useEffect } from 'react';
import blueX from '@/worklog/shared/assets/blueX.svg'; // 경로 확인 필요
import DeleteConfirmationModal from '@/worklog/shared/components/modal/DeleteConfirmationModal';

// API import
import { getTeams, type Team } from '@/worklog/shared/apis/team/team.api';
import { getCategories, type Category } from '@/worklog/shared/apis/categories/categories.api';
import { deleteManager } from '@/worklog/shared/apis/manager/manager.api'; // 삭제 API (필요 시)

// 담당자 데이터 타입 (Post에서 넘겨주는 데이터 구조에 맞춤)
export interface ManagerData {
  managerId?: number; // 수정/삭제 시 필요
  name: string;
  teamId: number;
  categoryId: number;
  phone: string;
}

interface ModalAddManagerProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'add' | 'edit'; // 모드 구분
  initialData?: ManagerData | null; // 수정 시 초기 데이터
  onSuccess?: () => void; // 작업 성공 시 부모에게 알림 (목록 갱신용)
}

const ModalAddManager = ({
  isOpen,
  onClose,
  mode = 'add',
  initialData,
  onSuccess,
}: ModalAddManagerProps) => {
  // 1. 폼 상태 관리
  const [formData, setFormData] = useState<ManagerData>({
    name: '',
    teamId: 0,
    categoryId: 0,
    phone: '',
  });

  // 2. 드롭다운 데이터 상태
  const [teams, setTeams] = useState<Team[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // 3. 삭제 확인 모달 상태
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  // --- 데이터 조회 및 초기화 ---
  useEffect(() => {
    if (isOpen) {
      // 드롭다운 데이터 불러오기
      const fetchData = async () => {
        try {
          const [teamRes, catRes] = await Promise.all([getTeams(), getCategories()]);
          if (teamRes.isSuccess && teamRes.details) setTeams(teamRes.details.teams);
          if (catRes.isSuccess && catRes.details) setCategories(catRes.details.categories);
        } catch (error) {
          console.error('데이터 조회 실패:', error);
        }
      };
      fetchData();

      // 모드에 따른 폼 초기화
      if (mode === 'edit' && initialData) {
        setFormData(initialData);
      } else {
        setFormData({ name: '', teamId: 0, categoryId: 0, phone: '' });
      }
    }
  }, [isOpen, mode, initialData]);

  // --- 핸들러 ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'teamId' || name === 'categoryId' ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    if (mode === 'add') {
      // TODO: 추후 createManager API 연동
      console.log('추가하기:', formData);
      alert('추가되었습니다 (API 미연동)');
      onSuccess?.();
      onClose();
    } else {
      // 수정 (API 없음 -> 그냥 닫기)
      console.log('수정하기:', formData);
      alert('수정되었습니다 (API 미연동)');
      onSuccess?.();
      onClose();
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteConfirmOpen(true);
  };

  const handleRealDelete = async () => {
    if (!formData.managerId) return;
    try {
      const response = await deleteManager(formData.managerId);
      if (response.isSuccess) {
        alert('삭제되었습니다.');
        setIsDeleteConfirmOpen(false);
        onSuccess?.();
        onClose(); // 메인 모달도 닫기
      } else {
        alert('삭제 실패: ' + response.message);
      }
    } catch (error) {
      console.error('삭제 오류:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  if (!isOpen) return null;

  // 공통 스타일
  const inputStyle =
    'w-full h-[32px] rounded-[6px] border border-[#F4F6F8] bg-[#F4F6F8] px-3 text-[14px] outline-none focus:border-blue-400';
  const labelStyle = 'text-[14px] font-normal text-[#4F4F4F] mb-2 block';

  return (
    <>
      {/* 메인 모달 */}
      <div
        className="fixed inset-0 z-40 flex items-center justify-center"
        style={{ background: 'rgba(70, 74, 77, 0.30)' }}
        onClick={onClose}
      >
        <div
          className="relative flex flex-col rounded-[24px] bg-white px-[32px] py-[32px] shadow-lg"
          style={{ width: '640px', height: '605px' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="mb-10 flex items-start justify-between">
            <h2 className="mt-2 text-[24px] font-[600] leading-none text-black">
              {mode === 'add' ? '담당자를 추가하세요.' : '담당자를 수정하세요.'}
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

          {/* Body */}
          <div className="flex flex-1 flex-col gap-6">
            {/* 성함 */}
            <div>
              <label className={labelStyle}>성함</label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            {/* 소속 (Select) */}
            <div>
              <label className={labelStyle}>소속</label>
              <select
                name="teamId"
                value={formData.teamId}
                onChange={handleChange}
                className={inputStyle}
              >
                <option value={0}>선택해주세요</option>
                {teams.map((t) => (
                  <option key={t.teamId} value={t.teamId}>
                    {t.teamName}
                  </option>
                ))}
              </select>
            </div>

            {/* 분류 (Select) */}
            <div>
              <label className={labelStyle}>분류</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className={inputStyle}
              >
                <option value={0}>선택해주세요</option>
                {categories.map((c) => (
                  <option key={c.categoryId} value={c.categoryId}>
                    {c.categoryName}
                  </option>
                ))}
              </select>
            </div>

            {/* 번호 */}
            <div>
              <label className={labelStyle}>번호</label>
              <input
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>
          </div>

          {/* Footer: Buttons */}
          <div className="mt-auto flex justify-center gap-4">
            {mode === 'add' ? (
              // 추가 모드: 버튼 1개
              <button
                onClick={handleSubmit}
                className="flex h-[48px] w-[140px] items-center justify-center rounded-[8px] border border-[#E8EEF2] bg-white hover:bg-gray-50"
              >
                <span className="text-[16px] font-[700] text-black">추가하기</span>
              </button>
            ) : (
              // 수정 모드: 버튼 2개 (삭제 / 저장)
              <>
                <button
                  onClick={handleDeleteClick}
                  className="flex h-[48px] w-[140px] items-center justify-center rounded-[8px] border border-[#E8EEF2] bg-white hover:bg-red-50"
                >
                  <span className="text-[16px] font-[700] text-red-500">삭제하기</span>
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex h-[48px] w-[140px] items-center justify-center rounded-[8px] border border-[#E8EEF2] bg-white hover:bg-gray-50"
                >
                  <span className="text-[16px] font-[700] text-black">저장하기</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 삭제 확인 모달 (중첩) */}
      <DeleteConfirmationModal
        isOpen={isDeleteConfirmOpen}
        targetName={formData.name}
        targetType="담당자를" // "홍길동 담당자를 삭제하시겠습니까?"
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleRealDelete}
      />
    </>
  );
};

export default ModalAddManager;
