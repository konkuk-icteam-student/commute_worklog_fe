interface SearchBarProps {
  title: string;
  date: string;
}

const SearchBar = ({ title, date }: SearchBarProps) => {
  return (
    <div className="mb-4 flex h-[48px] cursor-pointer flex-row items-center justify-between rounded-[24px] border border-[#E8EEF2] px-4 hover:bg-gray-50">
      <span className="pl-[20px] text-[16px] font-[400] text-[#464A4D]">{title}</span>
      <span className="pr-[10px] text-[16px] font-[400] text-[#A9AFB2]">{date}</span>
    </div>
  );
};

export default SearchBar;
