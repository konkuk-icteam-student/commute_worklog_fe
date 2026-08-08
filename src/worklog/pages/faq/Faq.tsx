import { useEffect, useState, useRef, useCallback } from 'react';
import Title from '@/worklog/shared/components/faq/Title';
import SearchBar from '@/worklog/shared/components/faq/SearchBar';
import SidePanel, { type TabData } from '@/worklog/shared/components/faq/SidePanel';
import WriteForm from '@/worklog/shared/components/faq/WriteForm';
import DetailView from '@/worklog/shared/components/faq/DetailView';
import MainLayout from '@/worklog/shared/components/layout/MainLayout';
import Pagination from '@/worklog/shared/components/faq/Pagination';
import { getFaqList, type FaqListItem } from '@/worklog/shared/apis/faq/faq.api';

const Faq = () => {
  const [tabs, setTabs] = useState<TabData[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | number>(0);

  const [posts, setPosts] = useState<FaqListItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // 💡 [추가] 좌우 패널 크기 조절을 위한 상태 및 Ref
  const [leftPanelWidth, setLeftPanelWidth] = useState(55); // 초기값 55%
  const isDragging = useRef(false);

  // 💡 [추가] 마우스 이벤트 핸들러
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none'; // 드래그 중 텍스트 선택 방지
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;

    // 전체 화면 너비 대비 현재 마우스 X좌표의 비율 계산
    const newWidthPercentage = (e.clientX / window.innerWidth) * 100;

    // 최소 50% ~ 최대 60% 사이에서만 조절되도록 제한
    if (newWidthPercentage >= 50 && newWidthPercentage <= 60) {
      setLeftPanelWidth(newWidthPercentage);
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto'; // 텍스트 선택 다시 허용
    }
  }, []);

  // 💡 [추가] 드래그 이벤트를 window 객체에 등록 (마우스가 화면을 벗어나도 부드럽게 동작하게 함)
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await getFaqList({ page: currentPage });
        setPosts(res.faqs);
        setTotalPages(res.totalPages);
        setTotalElements(res.faqs.length);
      } catch (error) {
        console.error('FAQ 목록 조회 실패:', error);
      }
    };
    fetchList();
  }, [currentPage, refreshTrigger]);

  const addTab = (newTab: TabData) => {
    setTabs((prev) => {
      const exists = prev.find((t) => t.id === newTab.id);
      if (exists) {
        setActiveTabId(newTab.id);
        return prev;
      }
      let newTabs = [...prev, newTab];
      if (newTabs.length > 5) {
        newTabs = newTabs.slice(1);
      }
      setActiveTabId(newTab.id);
      return newTabs;
    });
  };

  const handleSuccess = (tabId: string | number) => {
    handleCloseTab(tabId);
    setRefreshTrigger((prev) => prev + 1);
  };

  const handlePencilClick = () => {
    const newTab: TabData = {
      id: 'write-new',
      label: '글 작성',
      type: 'write',
      content: <WriteForm onSuccess={() => handleSuccess('write-new')} />,
    };
    addTab(newTab);
  };

  const handleItemClick = (id: number) => {
    const selectedPost = posts.find((p) => p.faqId === id);
    if (!selectedPost) return;

    const shortTitle =
      selectedPost.title.length > 10
        ? selectedPost.title.substring(0, 10) + '...'
        : selectedPost.title;

    const formattedDate = selectedPost.updatedDate ? selectedPost.updatedDate.substring(0, 10) : '';

    const newTab: TabData = {
      id: id,
      label: shortTitle,
      title: selectedPost.title,
      type: 'detail',
      content: (
        <DetailView faqId={id} updatedDate={formattedDate} onSuccess={() => handleSuccess(id)} />
      ),
    };
    addTab(newTab);
  };

  const handleCloseTab = (targetTabId: string | number) => {
    setTabs((prevTabs) => {
      const newTabs = prevTabs.filter((tab) => tab.id !== targetTabId);
      if (activeTabId === targetTabId) {
        if (newTabs.length > 0) {
          setActiveTabId(newTabs[newTabs.length - 1].id);
        } else {
          setActiveTabId(0);
        }
      }
      return newTabs;
    });
  };

  const isPanelOpen = tabs.length > 0;

  return (
    <MainLayout onPencilClick={handlePencilClick} showPencil={true}>
      <div className="flex h-full w-full flex-1 overflow-hidden bg-white">
        {/* === [좌측] 사이드 패널 === */}
        {isPanelOpen && (
          <>
            <div
              // 💡 Tailwind의 w-[] 클래스 대신 style로 상태값을 직접 바인딩
              className="h-full shrink-0 border-r border-[#E8EEF2]"
              style={{ width: `${leftPanelWidth}%` }}
            >
              <SidePanel
                tabs={tabs}
                activeTabId={activeTabId}
                onTabClick={setActiveTabId}
                onClose={handleCloseTab}
              />
            </div>

            {/* 💡 [추가] 드래그 가능한 구분선 (Splitter) */}
            <div
              onMouseDown={handleMouseDown}
              className="relative z-10 w-[6px] shrink-0 cursor-col-resize bg-[#F4F6F8] transition-colors hover:bg-blue-400 active:bg-blue-500"
              title="크기 조절"
            >
              {/* 시각적인 손잡이(Handle) 표시 */}
              <div className="absolute inset-y-0 left-1/2 flex -translate-x-1/2 flex-col items-center justify-center gap-[2px]">
                <div className="h-[4px] w-[2px] rounded-full bg-[#8C9499]" />
                <div className="h-[4px] w-[2px] rounded-full bg-[#8C9499]" />
                <div className="h-[4px] w-[2px] rounded-full bg-[#8C9499]" />
              </div>
            </div>
          </>
        )}

        {/* === [우측] 메인 컨텐츠 영역 === */}
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-white">
          <div className="scrollbar-hide w-full shrink-0 overflow-x-auto border-b border-[#E8EEF2]">
            <Title />
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="mx-auto w-full max-w-[1200px]">
              <div className="mb-6 flex flex-row items-center gap-[12px]">
                <span className="pb-[10px] pl-[12px] text-[32px] font-[700] text-[#17191A]">
                  FAQ
                </span>
                <span className="pb-[10px] text-[16px] font-[400] text-[#464A4D]">
                  총 {totalElements}건의 메뉴얼이 있습니다.
                </span>
              </div>

              {posts.map((post) => (
                <div
                  key={post.faqId}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData(
                      'application/json',
                      JSON.stringify({ id: post.faqId, title: post.title })
                    );
                  }}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <SearchBar
                    key={post.faqId}
                    id={post.faqId}
                    title={post.title}
                    date={post.updatedDate ? post.updatedDate.substring(0, 10) : ''}
                    onClick={handleItemClick}
                  />
                </div>
              ))}

              <div className="mt-8 pb-4">
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
