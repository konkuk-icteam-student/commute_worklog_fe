import left from './leftpage.svg'; // 경로 확인 필요
import right from './rightpage.svg'; // 경로 확인 필요

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  // 페이지 번호 배열 생성 (ex: 1, 2, 3, 4, 5, '...', 13)
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          '...',
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  if (totalPages === 0) return null;

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      {/* 이전 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-8 w-8 items-center justify-center disabled:opacity-30"
      >
        <img src={left} alt="이전" className="h-[14px] w-[14px]" />
      </button>

      {/* 페이지 번호 리스트 */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={index}
                className="flex h-8 w-8 items-center justify-center text-[16px] text-[#A9AFB2]"
              >
                ...
              </span>
            );
          }

          const isCurrent = page === currentPage;

          return (
            <button
              key={index}
              onClick={() => onPageChange(page as number)}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-[16px] transition-colors ${
                isCurrent
                  ? 'bg-[#E8EEF2] font-bold text-[#17191A]' // 활성화된 페이지 스타일
                  : 'font-normal text-[#A9AFB2] hover:bg-gray-50 hover:text-[#464A4D]' // 비활성화 스타일
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* 다음 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-8 w-8 items-center justify-center disabled:opacity-30"
      >
        <img src={right} alt="다음" className="h-[14px] w-[14px]" />
      </button>
    </div>
  );
};

export default Pagination;
