// src/worklog/shared/components/header/Header.tsx

import menu from '@/worklog/shared/assets/menu.svg';
import pencil from '@/worklog/shared/assets/pencil.svg';
import setting from '@/worklog/shared/assets/setting.svg';
import bell from '@/worklog/shared/assets/bell.svg';

interface HeaderProps {
  onPencilClick?: () => void;
  onMenuClick?: () => void; // [추가] 메뉴 클릭 핸들러
  showPencil?: boolean;
}

const Header = ({ onPencilClick, onMenuClick, showPencil = true }: HeaderProps) => {
  return (
    <header className="relative z-20 flex h-[76px] shrink-0 items-center justify-between border-b border-[#E8EEF2] bg-white px-8">
      {/* 메뉴 클릭 연결 */}
      <button onClick={onMenuClick} className="cursor-pointer focus:outline-none">
        <img src={menu} alt="메뉴" />
      </button>

      <div className="flex items-center gap-6">
        <button
          onClick={showPencil ? onPencilClick : undefined}
          className={showPencil ? '' : 'pointer-events-none invisible cursor-default'}
          tabIndex={showPencil ? 0 : -1}
        >
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
