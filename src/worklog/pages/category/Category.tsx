import { useState, useEffect } from 'react';
import v from '@/worklog/shared/assets/v.svg';
import glasses from '@/worklog/shared/assets/glasses.svg';
import ManagerCard from '@/worklog/shared/components/posting/ManagerCard';
import ModalAddManager, {
  type ManagerData,
} from '@/worklog/shared/components/modal_add_manager/ModalAddManager';
import MainLayout from '@/worklog/shared/components/layout/MainLayout';

// API import
import { getManagers, type Manager } from '@/worklog/shared/apis/manager/manager.api';

const Category = () => {
  // 1. 데이터 상태
  const [managers, setManagers] = useState<Manager[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedManager, setSelectedManager] = useState<ManagerData | null>(null);

  // 💡 2. 필터 및 검색 상태 추가
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedOrg, setSelectedOrg] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [isFavoriteOnly, setIsFavoriteOnly] = useState(false);

  // 💡 드롭다운 열림/닫힘 상태
  const [isOrgDropdownOpen, setIsOrgDropdownOpen] = useState(false);
  const [isCatDropdownOpen, setIsCatDropdownOpen] = useState(false);

  // 데이터 조회 함수
  const fetchManagers = async () => {
    try {
      const response = await getManagers();
      if (response.isSuccess && response.details) {
        setManagers(response.details.managers || []);
      } else {
        setManagers([]);
      }
    } catch (error) {
      console.error('담당자 조회 실패:', error);
      setManagers([]);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  // 모달 핸들러
  const openAddModal = () => {
    setModalMode('add');
    setSelectedManager(null);
    setIsModalOpen(true);
  };

  const openEditModal = (data: ManagerData) => {
    setModalMode('edit');
    setSelectedManager(data);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSuccess = () => {
    fetchManagers();
  };

  // 💡 3. 드롭다운 옵션 자동 추출 (중복 제거)
  const uniqueOrgs = Array.from(new Set(managers.map((m) => m.organizationName))).filter(Boolean);
  const uniqueCats = Array.from(new Set(managers.map((m) => m.categoryName))).filter(Boolean);

  // 💡 4. 필터링 로직 적용 (소속, 분류, 검색어, 즐겨찾기 교집합)
  const filteredManagers = managers.filter((m) => {
    const matchOrg = selectedOrg ? m.organizationName === selectedOrg : true;
    const matchCat = selectedCat ? m.categoryName === selectedCat : true;
    const matchFav = isFavoriteOnly ? m.managerFavorite : true;
    const matchSearch = searchKeyword
      ? m.managerName.includes(searchKeyword) ||
        m.organizationName.includes(searchKeyword) ||
        m.categoryName.includes(searchKeyword)
      : true;

    return matchOrg && matchCat && matchFav && matchSearch;
  });

  return (
    <MainLayout showPencil={false}>
      <div className="flex h-full flex-col">
        {/* Title Section */}
        <section className="flex h-[180px] shrink-0 flex-col items-center justify-center border-b border-[#E8EEF2]">
          <div className="flex w-full max-w-[1000px] flex-col gap-8 px-8">
            <h1 className="text-center text-[40px] font-bold">담당자</h1>

            <div className="flex items-center justify-center gap-3">
              {/* 💡 소속 필터 드롭다운 */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsOrgDropdownOpen(!isOrgDropdownOpen);
                    setIsCatDropdownOpen(false); // 다른 드롭다운 닫기
                  }}
                  className={`flex h-[48px] items-center gap-2 rounded-[24px] border px-4 transition-colors ${
                    selectedOrg ? 'border-blue-300 bg-blue-50' : 'border-[#E8EEF2] hover:bg-gray-50'
                  }`}
                >
                  <img
                    src={v}
                    alt="dropdown"
                    className={`transition-transform ${isOrgDropdownOpen ? 'rotate-180' : ''}`}
                  />
                  <span
                    className={`text-[16px] ${selectedOrg ? 'font-bold text-blue-600' : 'text-[#8C9499]'}`}
                  >
                    {selectedOrg || '소속'}
                  </span>
                </button>

                {isOrgDropdownOpen && (
                  <div className="absolute left-0 top-[56px] z-50 max-h-[200px] w-max min-w-full overflow-y-auto rounded-[12px] border border-[#E8EEF2] bg-white py-2 shadow-lg">
                    <div
                      className="cursor-pointer px-4 py-2 text-[14px] text-[#464A4D] hover:bg-gray-50"
                      onClick={() => {
                        setSelectedOrg('');
                        setIsOrgDropdownOpen(false);
                      }}
                    >
                      전체보기
                    </div>
                    {uniqueOrgs.map((org) => (
                      <div
                        key={org}
                        className="cursor-pointer px-4 py-2 text-[14px] text-[#464A4D] hover:bg-gray-50"
                        onClick={() => {
                          setSelectedOrg(org);
                          setIsOrgDropdownOpen(false);
                        }}
                      >
                        {org}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 💡 분류 필터 드롭다운 */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsCatDropdownOpen(!isCatDropdownOpen);
                    setIsOrgDropdownOpen(false); // 다른 드롭다운 닫기
                  }}
                  className={`flex h-[48px] items-center gap-2 rounded-[24px] border px-4 transition-colors ${
                    selectedCat ? 'border-blue-300 bg-blue-50' : 'border-[#E8EEF2] hover:bg-gray-50'
                  }`}
                >
                  <img
                    src={v}
                    alt="dropdown"
                    className={`transition-transform ${isCatDropdownOpen ? 'rotate-180' : ''}`}
                  />
                  <span
                    className={`text-[16px] ${selectedCat ? 'font-bold text-blue-600' : 'text-[#8C9499]'}`}
                  >
                    {selectedCat || '분류'}
                  </span>
                </button>

                {isCatDropdownOpen && (
                  <div className="absolute left-0 top-[56px] z-50 max-h-[200px] w-max min-w-full overflow-y-auto rounded-[12px] border border-[#E8EEF2] bg-white py-2 shadow-lg">
                    <div
                      className="cursor-pointer px-4 py-2 text-[14px] text-[#464A4D] hover:bg-gray-50"
                      onClick={() => {
                        setSelectedCat('');
                        setIsCatDropdownOpen(false);
                      }}
                    >
                      전체보기
                    </div>
                    {uniqueCats.map((cat) => (
                      <div
                        key={cat}
                        className="cursor-pointer px-4 py-2 text-[14px] text-[#464A4D] hover:bg-gray-50"
                        onClick={() => {
                          setSelectedCat(cat);
                          setIsCatDropdownOpen(false);
                        }}
                      >
                        {cat}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 💡 검색어 입력 (분류, 소속, 이름 통합 검색) */}
              <div className="flex h-[48px] w-[480px] items-center gap-2 rounded-[24px] border border-[#E8EEF2] px-4 focus-within:border-blue-400">
                <img src={glasses} alt="검색" />
                <input
                  type="text"
                  placeholder="검색어를 입력하세요 (소속, 분류, 이름)"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="h-full w-full bg-transparent text-[16px] outline-none placeholder:text-[#8C9499]"
                />
              </div>

              {/* 💡 즐겨찾기 필터 토글 */}
              <button
                onClick={() => setIsFavoriteOnly(!isFavoriteOnly)}
                className={`h-[48px] rounded-[24px] border px-6 text-[16px] transition-colors ${
                  isFavoriteOnly
                    ? 'border-blue-300 bg-blue-50 font-[700] text-blue-600'
                    : 'border-[#E8EEF2] text-[#8C9499] hover:bg-gray-50'
                }`}
              >
                즐겨찾기만 보기
              </button>

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
        <div
          className="flex-1 overflow-y-auto"
          onClick={() => {
            // 빈 공간 클릭 시 열려있는 드롭다운 닫기
            if (isOrgDropdownOpen) setIsOrgDropdownOpen(false);
            if (isCatDropdownOpen) setIsCatDropdownOpen(false);
          }}
        >
          <div className="mx-auto w-full max-w-[1000px] px-8 py-10">
            {/* 💡 필터링된 배열(filteredManagers)을 순회합니다 */}
            {filteredManagers.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredManagers.map((manager, index) => (
                  <ManagerCard
                    key={`${manager.managerId}-${index}`}
                    managerId={manager.managerId}
                    categoryName={manager.categoryName}
                    managerName={manager.managerName}
                    organizationName={manager.organizationName}
                    phonenum={manager.phonenum}
                    organizationId={manager.organizationId}
                    categoryId={manager.categoryId}
                    initialFavorite={manager.managerFavorite}
                    onEditClick={openEditModal}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center text-[16px] text-gray-400">
                조건에 맞는 담당자가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>

      <ModalAddManager
        isOpen={isModalOpen}
        onClose={closeModal}
        mode={modalMode}
        initialData={selectedManager}
        onSuccess={handleSuccess}
      />
    </MainLayout>
  );
};

export default Category;
