interface SearchBarProps {
  id: number;
  title: string;
  date: string;
  keyword?: string;
  deletedFlag?: boolean; // 💡 [추가] 삭제 여부 Props
  onClick: (id: number) => void;
}

const SearchBar = ({
  id,
  title,
  date,
  keyword = '',
  deletedFlag = false,
  onClick,
}: SearchBarProps) => {
  const formattedDate = date ? date.substring(0, 10) : '';

  const renderHighlightedTitle = () => {
    if (!keyword.trim()) return title;
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

      {/* 💡 날짜와 삭제됨 뱃지를 하나로 묶음 */}
      <div className="flex shrink-0 items-center gap-3 pr-[10px]">
        {deletedFlag && (
          <span className="rounded bg-[#F4F6F8] px-2 py-0.5 text-[12px] font-bold text-[#8C9499]">
            삭제됨
          </span>
        )}
        <span className="whitespace-nowrap text-[16px] font-[400] text-[#A9AFB2]">
          {formattedDate}
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
