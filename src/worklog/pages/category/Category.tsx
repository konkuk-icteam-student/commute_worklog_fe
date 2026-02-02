import { useState, useEffect } from 'react';
import v from '@/worklog/shared/assets/v.svg';
import glasses from '@/worklog/shared/assets/glasses.svg';
import Post from '@/worklog/shared/components/posting/Post';
import ModalAddManager, {
  type ManagerData,
} from '@/worklog/shared/components/modal_add_manager/ModalAddManager';
import MainLayout from '@/worklog/shared/components/layout/MainLayout';

// API import
import { getManagers, type Manager } from '@/worklog/shared/apis/manager/manager.api';

const Category = () => {
  // 1. 상태 관리
  const [managers, setManagers] = useState<Manager[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedManager, setSelectedManager] = useState<ManagerData | null>(null);

  // 2. 데이터 조회 함수
  const fetchManagers = async () => {
    console.log('🔄 [Action] 담당자 목록 조회 시작');
    try {
      const response = await getManagers();
      if (response.isSuccess && response.details) {
        console.log('📥 [API Response] 조회된 담당자:', response.details.managers);
        setManagers(response.details.managers || []);
      } else {
        setManagers([]);
      }
    } catch (error) {
      console.error('❌ [API Error] 담당자 조회 실패:', error);
      setManagers([]);
    }
  };

  // 초기 로딩 시 조회
  useEffect(() => {
    fetchManagers();
  }, []);

  // 3. 모달 핸들러
  const openAddModal = () => {
    setModalMode('add');
    setSelectedManager(null);
    setIsModalOpen(true);
  };

  const openEditModal = (data: ManagerData) => {
    setModalMode('edit');
    setSelectedManager(data); // 선택된 담당자 정보 전달
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // 모달 작업(추가/삭제) 성공 시 호출될 콜백
  const handleSuccess = () => {
    fetchManagers(); // 목록 새로고침
  };

  return (
    <MainLayout showPencil={false}>
      <div className="flex h-full flex-col">
        {/* Title Section */}
        <section className="flex h-[180px] shrink-0 flex-col items-center justify-center border-b border-[#E8EEF2]">
          <div className="flex w-full max-w-[1200px] flex-col gap-8 px-4">
            <h1 className="text-center text-[40px] font-bold">담당자</h1>

            <div className="flex items-center justify-center gap-3">
              {/* 필터 버튼들 (UI만 유지) */}
              <button className="flex h-[48px] items-center gap-2 rounded-[24px] border border-[#E8EEF2] px-4 hover:bg-gray-50">
                <img src={v} alt="dropdown" />
                <span className="text-[16px] text-[#8C9499]">소속</span>
              </button>

              <button className="flex h-[48px] items-center gap-2 rounded-[24px] border border-[#E8EEF2] px-4 hover:bg-gray-50">
                <img src={v} alt="dropdown" />
                <span className="text-[16px] text-[#8C9499]">분류</span>
              </button>

              <div className="flex h-[48px] w-[480px] items-center gap-2 rounded-[24px] border border-[#E8EEF2] px-4 focus-within:border-blue-400">
                <img src={glasses} alt="검색" />
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  className="h-full w-full bg-transparent text-[16px] outline-none placeholder:text-[#8C9499]"
                />
              </div>

              <button className="h-[48px] rounded-[24px] border border-[#E8EEF2] px-6 text-[16px] text-[#8C9499] hover:bg-gray-50">
                즐겨찾기만 보기
              </button>

              {/* 추가하기 버튼 */}
              <button
                className="h-[48px] rounded-[24px] border border-[#E8EEF2] px-6 text-[16px] font-[700] text-[#464A4D] hover:bg-gray-50"
                onClick={openAddModal}
              >
                추가하기
              </button>
            </div>
          </div>
        </section>

        {/* Contents Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-4">
            {managers && managers.length > 0 ? (
              managers.map((manager) => (
                <Post
                  key={manager.managerId}
                  managerId={manager.managerId}
                  categoryName={manager.categoryName} // title -> categoryName (분류)
                  managerName={manager.managerName} // name -> managerName (성함)
                  teamName={manager.teamName} // department -> teamName (소속)
                  phonenum={manager.phonenum} // phone -> phonenum (번호)
                  // 수정 모달을 위한 ID값들 전달
                  teamId={manager.teamId}
                  categoryId={manager.categoryId}
                  onEditClick={openEditModal}
                />
              ))
            ) : (
              <div className="py-20 text-center text-[16px] text-gray-400">
                조회된 내용이 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 담당자 추가/수정 모달 */}
      <ModalAddManager
        isOpen={isModalOpen}
        onClose={closeModal}
        mode={modalMode}
        initialData={selectedManager}
        onSuccess={handleSuccess} // 성공 시 목록 갱신
      />
    </MainLayout>
  );
};

export default Category;
