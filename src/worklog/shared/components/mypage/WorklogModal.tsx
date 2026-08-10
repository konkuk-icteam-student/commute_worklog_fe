import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Pagination from '@/worklog/shared/components/faq/Pagination';
import DetailView from '@/worklog/shared/components/faq/DetailView';
import {
  getMyPagePublishedFaqs,
  getMyPageDraftFaqs,
  type MyPageFaqItem,
} from '@/worklog/shared/apis/mypage/mypage.api';
import glasses from '@/worklog/shared/assets/glasses.svg';

interface WorklogModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'published' | 'draft';
}

const WorklogModal = ({ isOpen, onClose, type }: WorklogModalProps) => {
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');

  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [faqs, setFaqs] = useState<MyPageFaqItem[]>([]);

  const titleText = type === 'published' ? '내가 작성한 업무 일지' : '임시저장한 업무 일지';

  // 검색어 디바운스
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedKeyword(keyword), 300);
    return () => clearTimeout(timer);
  }, [keyword]);

  // 페이지 및 검색어 초기화 유도
  useEffect(() => {
    setPage(1);
  }, [debouncedKeyword, type]);

  // API 목록 조회
  useEffect(() => {
    if (!isOpen || viewMode === 'detail') return;
    const fetchList = async () => {
      try {
        const apiCall = type === 'published' ? getMyPagePublishedFaqs : getMyPageDraftFaqs;
        const res = await apiCall(page, debouncedKeyword);
        setFaqs(res.faqs);
        setTotalPages(res.totalPages);
      } catch (e) {
        console.error(e);
      }
    };
    fetchList();
  }, [isOpen, viewMode, type, page, debouncedKeyword]);

  // 💡 백엔드 검색 미지원 대비 프론트엔드 강제 필터링 로직
  const displayFaqs = faqs.filter((faq) =>
    debouncedKeyword ? faq.title.toLowerCase().includes(debouncedKeyword.toLowerCase()) : true
  );

  // 💡 검색어와 일치하는 부분을 파란색으로 하이라이트 처리하는 함수
  const renderHighlightedTitle = (title: string) => {
    if (!debouncedKeyword.trim()) return title;

    const parts = title.split(new RegExp(`(${debouncedKeyword})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === debouncedKeyword.toLowerCase() ? (
            <span key={i} className="font-bold text-[#3B82F6]">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  };

  // 항목 클릭 시 날짜 파싱해서 DetailView로 전달
  const handleItemClick = (faq: MyPageFaqItem) => {
    setSelectedId(faq.faqId);
    setSelectedDate(format(new Date(faq.updatedDate), 'yyyy-MM-dd'));
    setViewMode('detail');
  };

  const handleClose = () => {
    if (viewMode === 'detail') {
      setViewMode('list');
      setSelectedId(null);
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="flex h-[80vh] w-full max-w-[800px] flex-col rounded-[16px] bg-white shadow-xl">
        {/* Header 영역 */}
        <div className="flex items-center justify-between border-b border-[#E8EEF2] px-6 py-4">
          <h2 className="text-[20px] font-bold text-[#17191A]">{titleText}</h2>
          <button
            onClick={handleClose}
            className="flex h-[32px] w-[32px] items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="#17191A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Body 영역 */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {viewMode === 'list' ? (
            <div className="flex flex-col gap-4">
              {/* 검색창 */}
              <div className="flex h-[48px] w-full items-center gap-2 rounded-[8px] border border-[#E8EEF2] bg-[#F4F6F8] px-4 focus-within:border-blue-400 focus-within:bg-white">
                <img src={glasses} alt="검색" className="h-4 w-4 opacity-50" />
                <input
                  type="text"
                  placeholder="제목 검색"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="h-full flex-1 bg-transparent text-[14px] outline-none placeholder:text-[#8C9499]"
                />
              </div>

              {/* 목록 리스트 */}
              <div className="flex flex-col">
                {/* 💡 기존 faqs 대신 프론트엔드 필터링이 적용된 displayFaqs 사용 */}
                {displayFaqs.map((faq) => (
                  <div
                    key={faq.faqId}
                    onClick={() => handleItemClick(faq)}
                    className="flex cursor-pointer items-center justify-between border-b border-[#E8EEF2] py-4 hover:bg-gray-50"
                  >
                    {/* 💡 타이틀에 하이라이트 함수 적용 */}
                    <span className="truncate pr-4 text-[15px] font-medium text-[#17191A]">
                      {renderHighlightedTitle(faq.title)}
                    </span>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="text-[14px] text-[#8C9499]">
                        {format(new Date(faq.updatedDate), 'yyyy-MM-dd')}
                      </span>
                      {type === 'draft' && (
                        <span className="rounded bg-[#FFF9E6] px-2 py-0.5 text-[12px] font-bold text-[#F59E0B]">
                          임시저장
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {displayFaqs.length === 0 && (
                  <div className="py-10 text-center text-[14px] text-[#8C9499]">
                    조회된 내역이 없습니다.
                  </div>
                )}
              </div>

              {/* 페이지네이션 */}
              {displayFaqs.length > 0 && (
                <div className="mt-4">
                  <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                </div>
              )}
            </div>
          ) : (
            <DetailView
              faqId={selectedId!}
              updatedDate={selectedDate}
              isDraft={type === 'draft'}
              onSuccess={() => setViewMode('list')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WorklogModal;
