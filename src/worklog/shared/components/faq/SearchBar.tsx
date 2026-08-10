interface SearchBarProps {
  id: number;
  title: string;
  date: string;
  keyword?: string;
  onClick: (id: number) => void;
}

const SearchBar = ({ id, title, date, keyword = '', onClick }: SearchBarProps) => {
  const formattedDate = date ? date.substring(0, 10) : '';

  const renderHighlightedTitle = () => {
    if (!keyword.trim()) return title;

    // 대소문자 구분 없이 검색어를 기준으로 텍스트 분할
    const parts = title.split(new RegExp(`(${keyword})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === keyword.toLowerCase() ? (
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

  return (
    <div
      className="mb-4 flex h-[48px] cursor-pointer flex-row items-center justify-between rounded-[24px] border border-[#E8EEF2] px-4 hover:bg-gray-50"
      onClick={() => onClick(id)}
    >
      <span className="flex-1 truncate pl-[20px] text-[16px] font-[400] text-[#464A4D]">
        {renderHighlightedTitle()}
      </span>
      <span className="whitespace-nowrap pr-[10px] text-[16px] font-[400] text-[#A9AFB2]">
        {formattedDate}
      </span>
    </div>
  );
};

export default SearchBar;
