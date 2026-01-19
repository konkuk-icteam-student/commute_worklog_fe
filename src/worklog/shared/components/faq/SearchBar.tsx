interface SearchBarProps {
  id: number;
  title: string;
  date: string;
  onClick: (id: number) => void;
}

const SearchBar = ({ id, title, date, onClick }: SearchBarProps) => {
  return (
    <div
      className="mb-4 flex h-[48px] cursor-pointer flex-row items-center justify-between rounded-[24px] border border-[#E8EEF2] px-4 hover:bg-gray-50"
      onClick={() => onClick(id)}
    >
      <span className="flex-1 truncate pl-[20px] text-[16px] font-[400] text-[#464A4D]">
        {title}
      </span>
      <span className="whitespace-nowrap pr-[10px] text-[16px] font-[400] text-[#A9AFB2]">
        {date}
      </span>
    </div>
  );
};

export default SearchBar;
