import menu from '@/worklog/shared/assets/menu.svg';
import pencil from '@/worklog/shared/assets/pencil.svg';
import setting from '@/worklog/shared/assets/setting.svg';
import bell from '@/worklog/shared/assets/bell.svg';
const Header = () => {
  return (
    <header className="flex h-[76px] shrink-0 items-center justify-between border-b border-[#E8EEF2] px-8">
      <div className="cursor-pointer">
        <img src={menu} alt="메뉴" />
      </div>
      <div className="flex items-center gap-6">
        <button>
          <img src={pencil} alt="수정" />
        </button>
        <button>
          <img src={setting} alt="설정" />
        </button>
        <button>
          <img src={bell} alt="알림" />
        </button>
      </div>
    </header>
  );
};

export default Header;
