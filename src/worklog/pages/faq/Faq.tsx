import { useEffect, useState } from 'react';
import Title from '@/worklog/shared/components/faq/Title';
import SearchBar from '@/worklog/shared/components/faq/SearchBar';
import SidePanel, { type TabData } from '@/worklog/shared/components/faq/SidePanel';
import WriteForm from '@/worklog/shared/components/faq/WriteForm';
import DetailView from '@/worklog/shared/components/faq/DetailView';
import MainLayout from '@/worklog/shared/components/layout/MainLayout';
import Pagination from '@/worklog/shared/components/faq/Pagination';
import { getFaqList, type FaqListItem } from '@/worklog/shared/apis/faq/faq.api';

const Faq = () => {
  const [tabs, setTabs] = useState<TabData[]>([]); // 열린 탭 목록
  const [activeTabId, setActiveTabId] = useState<string | number>(0); // 현재 보고있는 탭 ID

  const [posts, setPosts] = useState<FaqListItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  // 💡 컴포넌트 마운트 및 페이지 변경 시 API 호출
  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await getFaqList({ page: currentPage });
        setPosts(res.faqs);
        setTotalPages(res.totalPages);
        setTotalElements(res.faqs.length); // 실제론 API에서 totalElements를 주면 좋지만, 우선 길이로 대체하거나 생략 가능
      } catch (error) {
        console.error('FAQ 목록 조회 실패:', error);
      }
    };
    fetchList();
  }, [currentPage]);

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
    const selectedPost = posts.find((p) => p.faqId === id);
    if (!selectedPost) return;

    // 긴 제목은 잘라서 탭 제목으로 사용
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
      content: <DetailView faqId={id} updatedDate={formattedDate} />,
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
                  총 {totalElements}건의 메뉴얼이 있습니다.
                </span>
              </div>

              {/* 리스트 렌더링 */}
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
                    date={post.updatedDate}
                    onClick={handleItemClick}
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
