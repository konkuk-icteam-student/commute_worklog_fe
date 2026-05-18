import { useState, useEffect } from 'react';
import blueX from '@/worklog/shared/assets/blueX.svg';
import DeleteConfirmationModal from '@/worklog/shared/components/modal/DeleteConfirmationModal';

// API import
import {
  getOrganizations,
  type Organization,
} from '@/worklog/shared/apis/organization/Organization.api';
import { getCategories, type Category } from '@/worklog/shared/apis/categories/categories.api';
import { createManager, deleteManager } from '@/worklog/shared/apis/manager/manager.api';

export interface ManagerData {
  managerId?: number;
  name: string;
  organizationId: number;
  categoryId: number;
  phone: string;
}

interface ModalAddManagerProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'add' | 'edit';
  initialData?: ManagerData | null;
  onSuccess?: () => void;
}

const ModalAddManager = ({
  isOpen,
  onClose,
  mode = 'add',
  initialData,
  onSuccess,
}: ModalAddManagerProps) => {
  // Form 상태
  const [formData, setFormData] = useState<ManagerData>({
    name: '',
    organizationId: 0,
    categoryId: 0,
    phone: '',
  });

  // Dropdown 데이터 상태
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // 삭제 확인 모달 상태
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  // 초기화 (모달 열릴 때)
  useEffect(() => {
    if (isOpen) {
      // 1. 소속/분류 목록 조회
      const fetchData = async () => {
        try {
          const [orgRes, catRes] = await Promise.all([getOrganizations(), getCategories()]);

          if (orgRes.isSuccess && orgRes.details) {
            setOrganizations(orgRes.details.organizations || []);
          }
          // [주의] Category API는 details.categories에 데이터가 있었죠? (이전 질문 참고)
          if (catRes.isSuccess && catRes.details) {
            setCategories(catRes.details.categories || []);
          }
        } catch (error) {
          console.error('데이터 조회 실패:', error);
        }
      };
      fetchData();

      // 2. 폼 데이터 초기화
      if (mode === 'edit' && initialData) {
        setFormData(initialData);
      } else {
        setFormData({ name: '', organizationId: 0, categoryId: 0, phone: '' });
      }
    }
  }, [isOpen, mode, initialData]);

  // Input 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      // organizationId, categoryId는 숫자로 변환
      [name]: name === 'organizationId' || name === 'categoryId' ? Number(value) : value,
    }));
  };

  // 등록 / 수정 핸들러
  const handleSubmit = async () => {
    // 유효성 검사
    if (!formData.name || !formData.organizationId || !formData.categoryId || !formData.phone) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    if (mode === 'add') {
      try {
        console.log('📤 [API Request] 담당자 등록 요청:', formData);

        // createManager API 호출
        const response = await createManager({
          name: formData.name,
          organizationId: formData.organizationId,
          categoryId: formData.categoryId,
          phonenum: formData.phone,
        });

        if (response.isSuccess) {
          console.log('✅ 담당자 등록 성공');
          onSuccess?.(); // 부모 목록 갱신
          onClose(); // 모달 닫기
        } else {
          alert('등록 실패: ' + response.message);
        }
      } catch (error) {
        console.error('❌ 등록 오류:', error);
        alert('등록 중 오류가 발생했습니다.');
      }
    } else {
      // 수정 (API 없음 -> 알림만)
      alert('수정 기능은 아직 구현되지 않았습니다.');
      onClose();
    }
  };

  // 삭제 버튼 클릭 (1차)
  const handleDeleteClick = () => {
    setIsDeleteConfirmOpen(true);
  };

  // 진짜 삭제 (2차 확인 후 API 호출)
  const handleRealDelete = async () => {
    if (!formData.managerId) return;

    try {
      console.log(`📤 [API Request] 담당자 삭제 요청 ID: ${formData.managerId}`);
      const response = await deleteManager(formData.managerId);

      if (response.isSuccess) {
        console.log('✅ 담당자 삭제 성공');
        setIsDeleteConfirmOpen(false);
        onSuccess?.(); // 부모 목록 갱신
        onClose(); // 메인 모달 닫기
      } else {
        alert('삭제 실패: ' + response.message);
      }
    } catch (error) {
      console.error('❌ 삭제 오류:', error);
      alert('삭제 중 오류가 발생했습니다. 담당/분류 관련 담당자가 존재하는지 확인해주십시오.');
    }
  };

  if (!isOpen) return null;

  // 스타일 정의
  const inputStyle =
    'w-full h-[32px] rounded-[6px] border border-[#F4F6F8] bg-[#F4F6F8] px-3 text-[14px] outline-none focus:border-blue-400';
  const labelStyle = 'text-[14px] font-normal text-[#4F4F4F] mb-2 block';

  return (
    <>
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
              className="flex items-center justify-center hover:opacity-80"
              style={{ width: '36px', height: '36px', borderRadius: '6px', background: '#E6E8FF' }}
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
                value={formData.name}
                onChange={handleChange}
                className={inputStyle}
                placeholder="성함을 입력하세요"
              />
            </div>

            {/* 소속 (Dropdown) */}
            <div>
              <label className={labelStyle}>소속</label>
              <select
                name="organizationId"
                value={formData.organizationId}
                onChange={handleChange}
                className={inputStyle}
              >
                <option value={0} disabled>
                  선택해주세요
                </option>
                {organizations.map((org) => (
                  <option key={org.organizationId} value={org.organizationId}>
                    {org.organizationName}
                  </option>
                ))}
              </select>
            </div>

            {/* 분류 (Dropdown) */}
            <div>
              <label className={labelStyle}>분류</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className={inputStyle}
              >
                <option value={0} disabled>
                  선택해주세요
                </option>
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
                value={formData.phone}
                onChange={handleChange}
                className={inputStyle}
                placeholder="전화번호를 입력하세요 (010-0000-0000)"
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="mt-auto flex justify-center gap-4">
            {mode === 'add' ? (
              <button
                onClick={handleSubmit}
                className="flex h-[48px] w-[140px] items-center justify-center rounded-[8px] border border-[#E8EEF2] bg-white hover:bg-gray-50"
              >
                <span className="text-[16px] font-[700] text-black">추가하기</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handleDeleteClick}
                  className="flex h-[48px] w-[140px] items-center justify-center rounded-[8px] border border-[#E8EEF2] bg-white hover:bg-red-50"
                >
                  <span className="text-[16px] font-[700] text-red-500">삭제하기</span>
                </button>
                <button
                  onClick={handleSubmit} // 수정은 현재 알림만 뜸
                  className="flex h-[48px] w-[140px] items-center justify-center rounded-[8px] border border-[#E8EEF2] bg-white hover:bg-gray-50"
                >
                  <span className="text-[16px] font-[700] text-black">저장하기</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      <DeleteConfirmationModal
        isOpen={isDeleteConfirmOpen}
        targetName={formData.name} // "홍길동"
        targetType="담당자를" // "담당자를 삭제하시겠습니까?"
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleRealDelete}
      />
    </>
  );
};

export default ModalAddManager;
