import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import glasses from '@/worklog/shared/assets/glasses.svg';
import Post2 from '@/worklog/shared/components/posting/Post2';
import MainLayout from '@/worklog/shared/components/layout/MainLayout';
import AlertModal from '@/worklog/shared/components/modal/AlertModal';
import DeleteConfirmationModal from '@/worklog/shared/components/modal/DeleteConfirmationModal';

// [Import] Task(Category) API
import {
  createCategory,
  getCategories,
  deleteCategory,
  type Category,
} from '../../shared/apis/categories/categories.api';

const Task = () => {
  // 1. 상태 관리
  const [categories, setCategories] = useState<Category[]>([]); // 분류 리스트
  const [inputValue, setInputValue] = useState(''); // 입력창 값

  // 모달 상태 (실패 모달 없음)
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string } | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const openAlertModal = (message: string) => {
    setAlertMessage(message);
    setIsAlertModalOpen(true);
  };

  // 2. 초기 데이터 조회 (GET)
  const fetchCategories = async () => {
    console.log('🔄 [Action] 분류 목록 조회 시작 (fetchCategories)');
    try {
      const response = await getCategories();
      console.log('📥 [API Response] 조회된 분류 리스트:', response);

      // API 명세상 { timestamp, categories: [...] } 구조임
      if (response.isSuccess && response.details) {
        setCategories(response.details.categories || []);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error('❌ [API Error] 분류 목록 조회 실패:', error);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 3. 분류 등록 (POST)
  const handleAddCategory = async () => {
    console.log('🖱️ [Action] 추가하기 버튼 클릭 / 입력값:', inputValue);

    if (!inputValue.trim()) {
      openAlertModal('분류 이름을 입력해주세요.');
      return;
    }

    try {
      const requestData = { categoryName: inputValue };
      console.log('📤 [API Request] 분류 등록 요청 데이터:', requestData);

      const response = await createCategory(requestData);
      console.log('✅ [API Success] 분류 등록 성공:', response);

      setInputValue(''); // 초기화
      await fetchCategories(); // 목록 갱신
    } catch (error) {
      console.error('❌ [API Error] 분류 등록 실패:', error);
      const err = error as AxiosError;
      if (err.response?.status === 409) {
        openAlertModal('이미 존재하는 분류 이름입니다.');
      } else {
        openAlertModal('등록 중 오류가 발생했습니다.');
      }
    }
  };

  // 4. 삭제 요청 (휴지통 클릭)
  const handleDeleteRequest = (id: number, name: string) => {
    console.log(`🗑️ [Action] 삭제 요청 - ID: ${id}, Name: ${name}`);
    setDeleteTarget({ id, name });
    setIsConfirmModalOpen(true);
  };

  // 5. 삭제 확인 (API 호출)
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    console.log(`📤 [API Request] 분류 삭제 요청 ID: ${deleteTarget.id}`);

    try {
      const response = await deleteCategory(deleteTarget.id);
      console.log('✅ [API Success] 분류 삭제 결과:', response);

      if (response.isSuccess) {
        setIsConfirmModalOpen(false);
        setDeleteTarget(null);
        await fetchCategories(); // 목록 갱신
      } else {
        console.warn('⚠️ [API Warning] 삭제 실패 (서버 메시지):', response.message);
        setIsConfirmModalOpen(false);
        openAlertModal(response.message || '삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('❌ [API Error] 삭제 요청 실패:', error);
      setIsConfirmModalOpen(false);
      openAlertModal('삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <MainLayout showPencil={false}>
      <div className="flex h-full flex-col">
        {/* 1. Title Section */}
        <section className="flex h-[180px] shrink-0 flex-col items-center justify-center border-b border-[#E8EEF2]">
          <div className="flex w-full max-w-[1200px] flex-col gap-8 px-4">
            <h1 className="text-center text-[40px] font-bold">분류</h1>

            <div className="flex items-center justify-center gap-3">
              {/* Search Input */}
              <div className="flex h-[48px] w-[480px] items-center gap-2 rounded-[24px] border border-[#E8EEF2] px-4 focus-within:border-blue-400">
                <img src={glasses} alt="검색" />
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCategory();
                    }
                  }}
                  placeholder="추가할 분류 이름을 입력하세요"
                  className="h-full w-full bg-transparent text-[16px] outline-none placeholder:text-[#8C9499]"
                />
              </div>

              {/* Add Button */}
              <button
                type="button"
                onClick={handleAddCategory}
                className="h-[48px] rounded-[24px] border border-[#E8EEF2] px-6 text-[16px] font-[700] text-[#464A4D] hover:bg-gray-50"
              >
                추가하기
              </button>
            </div>
          </div>
        </section>

        {/* 2. Contents Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-4">
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <Post2
                  key={category.categoryId}
                  id={category.categoryId}
                  title={category.categoryName}
                  onDelete={handleDeleteRequest}
                />
              ))
            ) : (
              <div className="py-10 text-center text-gray-400">등록된 분류가 없습니다.</div>
            )}
          </div>
        </div>
      </div>

      {/* --- Modals --- */}
      <DeleteConfirmationModal
        isOpen={isConfirmModalOpen}
        targetName={deleteTarget?.name || ''} // teamName -> targetName
        targetType="분류를" // [설정] 분류 삭제 멘트 적용
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
      <AlertModal
        isOpen={isAlertModalOpen}
        message={alertMessage}
        onClose={() => setIsAlertModalOpen(false)}
      />
    </MainLayout>
  );
};

export default Task;
