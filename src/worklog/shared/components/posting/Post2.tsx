import trashcan from '../../assets/trashcan.svg';
interface Post2Props {
  title: string;
}

const Post2 = ({ title }: Post2Props) => {
  return (
    <div className="flex items-center justify-between border-b border-[#E8EEF2] px-[20px] py-4 transition-colors hover:bg-gray-50">
      <div className="flex items-center gap-4">
        {/* 게시글 정보 */}
        <div className="flex flex-col gap-1">
          <h3 className="text-[16px] font-bold leading-none text-black">{title}</h3>
        </div>
      </div>
      {/* 우측 휴지통 아이콘 영역 */}

      <button className="cursor-pointer hover:opacity-70">
        <img src={trashcan} alt="휴지통" />
      </button>
    </div>
  );
};

export default Post2;
