import { useState } from 'react';
import Title from '@/worklog/shared/components/faq/Title';
import SearchBar from '@/worklog/shared/components/faq/SearchBar';
import SidePanel, { type TabData } from '@/worklog/shared/components/faq/SidePanel';
import WriteForm from '@/worklog/shared/components/faq/WriteForm';
import DetailView from '@/worklog/shared/components/faq/DetailView';
import MainLayout from '@/worklog/shared/components/layout/MainLayout';
import Pagination from '@/worklog/shared/components/faq/Pagination';

const Faq = () => {
  const [tabs, setTabs] = useState<TabData[]>([]); // 열린 탭 목록
  const [activeTabId, setActiveTabId] = useState<string | number>(0); // 현재 보고있는 탭 ID
  // 예시 데이터 배열
  const dummyPosts = Array.from({ length: 50 }).map((_, i) => ({
    id: i + 1,
    title:
      i % 2 === 0
        ? `[${i + 1}] 부서 계정으로 로그인 하려고 하는데 장시간 접속을 안해서 불가능하다는 문구가 뜬다고 합니다.`
        : `[${i + 1}] 홈페이지 접속 불가`,
    date: '2023-10-0' + ((i % 9) + 1),
  }));

  const ITEMS_PER_PAGE = 10;

  // [추가] 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);

  // [추가] 현재 페이지에 보여줄 데이터 슬라이싱
  const totalPages = Math.ceil(dummyPosts.length / ITEMS_PER_PAGE);
  const currentPosts = dummyPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // 2. 탭 추가 로직 (핵심: Max 5개, FIFO)
  const addTab = (newTab: TabData) => {
    setTabs((prev) => {
      // 이미 열려있는 탭인지 확인
      const exists = prev.find((t) => t.id === newTab.id);

      if (exists) {
        // 이미 있으면 그 탭을 활성화만 함
        setActiveTabId(newTab.id);
        return prev;
      }

      // 없으면 새로 추가
      let newTabs = [...prev, newTab];

      // 5개가 넘어가면? 가장 오래된 것(0번 인덱스) 삭제
      if (newTabs.length > 5) {
        newTabs = newTabs.slice(1);
      }

      setActiveTabId(newTab.id); // 새로 추가된 탭 활성화
      return newTabs;
    });
  };

  // 3. 이벤트 핸들러: 연필 아이콘 (Header) 클릭
  const handlePencilClick = () => {
    // 고정된 ID 'write-new'를 사용하여 중복 방지 (원하면 매번 새 창 띄우기도 가능)
    const newTab: TabData = {
      id: 'write-new',
      label: '글 작성',
      type: 'write',
      content: <WriteForm />,
    };
    addTab(newTab);
  };

  // 4. 이벤트 핸들러: 리스트 아이템 (SearchBar) 클릭
  const handleItemClick = (id: number) => {
    const selectedPost = dummyPosts.find((p) => p.id === id);
    if (!selectedPost) return;

    // 긴 제목은 잘라서 탭 제목으로 사용
    const shortTitle =
      selectedPost.title.length > 10
        ? selectedPost.title.substring(0, 10) + '...'
        : selectedPost.title;

    const newTab: TabData = {
      id: id,
      label: shortTitle,
      title: selectedPost.title,
      type: 'detail',
      content: <DetailView />, // 상세 데이터 전달 가능
    };
    addTab(newTab);
  };

  const handleCloseTab = (targetTabId: string | number) => {
    setTabs((prevTabs) => {
      // 1. 닫으려는 탭을 목록에서 제거
      const newTabs = prevTabs.filter((tab) => tab.id !== targetTabId);

      // 2. 만약 닫으려는 탭이 현재 보고 있던 탭이었다면? -> 다른 탭을 보여줘야 함
      if (activeTabId === targetTabId) {
        // 남은 탭이 있으면 맨 마지막(가장 최근) 탭을 보여줌
        if (newTabs.length > 0) {
          setActiveTabId(newTabs[newTabs.length - 1].id);
        } else {
          // 남은 탭이 없으면 패널이 자연스럽게 닫힘 (isPanelOpen이 false가 됨)
          setActiveTabId(0);
        }
      }

      return newTabs;
    });
  };

  // 사이드 패널이 열려있는지 여부
  const isPanelOpen = tabs.length > 0;

  return (
    <MainLayout onPencilClick={handlePencilClick} showPencil={true}>
      {/* === [우측] 메인 리스트 컨텐츠 === */}
      <div className="flex h-full flex-1 flex-col overflow-hidden bg-white">
        <Title />
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-1 overflow-hidden">
            {/* === [좌측] 사이드 패널 (조건부 렌더링) === */}
            {isPanelOpen && (
              // 너비 38% 설정, 애니메이션 효과 추가
              <div className="h-full w-[38%] shrink-0 border-r border-[#E8EEF2] transition-all duration-300 ease-in-out">
                <SidePanel
                  tabs={tabs}
                  activeTabId={activeTabId}
                  onTabClick={setActiveTabId} // 탭 클릭 시 활성화 변경
                  onClose={handleCloseTab}
                />
              </div>
            )}
            <div className="mx-auto w-full max-w-[1200px] px-4 py-4">
              <div className="mb-4 flex flex-row items-center gap-[12px]">
                <span className="pb-[10px] pl-[12px] text-[32px] font-[700] text-[#17191A]">
                  FAQ
                </span>
                <span className="pb-[10px] text-[16px] font-[400] text-[#464A4D]">
                  총 {dummyPosts.length}건의 메뉴얼이 있습니다.
                </span>
              </div>

              {/* 리스트 렌더링 */}
              {currentPosts.map((post) => (
                <div
                  key={post.id}
                  draggable // 드래그 허용
                  onDragStart={(e) => {
                    // 드래그 시작 시, 게시글의 ID와 제목을 JSON 문자열로 클립보드(dataTransfer)에 저장
                    e.dataTransfer.setData(
                      'application/json',
                      JSON.stringify({ id: post.id, title: post.title })
                    );
                  }}
                  className="cursor-grab active:cursor-grabbing" // 마우스 커서 UX 향상
                >
                  <SearchBar
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    date={post.date}
                    onClick={handleItemClick} // 클릭 이벤트 전달
                  />
                </div>
              ))}
              <div className="mt-auto pb-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Faq;
