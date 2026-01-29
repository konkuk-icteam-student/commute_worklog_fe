import { useNavigate } from 'react-router-dom';

interface NavProps {
  isOpen: boolean;
}

const Nav = ({ isOpen }: NavProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-col gap-[20px] overflow-hidden border-r border-[#E8EEF2] bg-white transition-all duration-300 ease-in-out ${isOpen ? 'w-[200px] p-[30px] opacity-100' : 'w-0 border-none p-0 opacity-0'} `}
    >
      <div className="flex min-w-[140px] flex-col gap-[20px] whitespace-nowrap">
        <span
          className="cursor-pointer text-[16px] font-[400] text-[#464A4D]"
          onClick={() => {
            navigate('/worklog/home');
          }}
        >
          홈
        </span>
        <div className="flex flex-col">
          <span className="text-[18px] font-[700] text-[#464A4D]">업무일지</span>
          <span
            className="cursor-pointer text-[16px] font-[400] text-[#464A4D]"
            onClick={() => {
              navigate('/worklog/faq');
            }}
          >
            FAQ
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[18px] font-[700] text-[#464A4D]">설정</span>
          <span
            className="cursor-pointer text-[16px] font-[400] text-[#464A4D]"
            onClick={() => {
              navigate('/worklog/category/department');
            }}
          >
            소속관리
          </span>
          <span
            className="cursor-pointer text-[16px] font-[400] text-[#464A4D]"
            onClick={() => {
              navigate('/worklog/category/department');
            }}
          >
            분류관리
          </span>
          <span
            className="cursor-pointer text-[16px] font-[400] text-[#464A4D]"
            onClick={() => {
              navigate('/worklog/category/manager');
            }}
          >
            담당자 관리
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[18px] font-[700] text-[#464A4D]">마이</span>
          <span
            className="cursor-pointer text-[16px] font-[400] text-[#464A4D]"
            onClick={() => console.log('로그아웃 버튼 클릭')}
          >
            로그아웃
          </span>
        </div>
      </div>
    </div>
  );
};

export default Nav;
