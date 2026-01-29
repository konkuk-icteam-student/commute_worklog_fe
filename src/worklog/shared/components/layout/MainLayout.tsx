import { useState, type ReactNode } from 'react';
import Header from '@/worklog/shared/components/header/Header';
import Nav from '@/worklog/shared/components/nav/Nav';

interface MainLayoutProps {
  children: ReactNode;
  showPencil?: boolean; // Header props 전달용
  onPencilClick?: () => void; // Header props 전달용
}

const MainLayout = ({ children, showPencil = true, onPencilClick }: MainLayoutProps) => {
  // 여기서 Nav의 열림/닫힘 상태를 관리합니다.
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white">
      {/* 1. 상단 Header (고정) */}
      <Header onMenuClick={toggleNav} onPencilClick={onPencilClick} showPencil={showPencil} />

      {/* 2. 하단 영역 (Nav + Page Content) */}
      <div className="flex flex-1 overflow-hidden">
        {/* 좌측 Nav (애니메이션 포함) */}
        <Nav isOpen={isNavOpen} />

        {/* 우측 실제 페이지 내용 (Nav가 열리면 자동으로 width가 줄어듬 - flex-1 덕분) */}
        <main className="relative flex h-full flex-1 flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
