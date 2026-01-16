import { useState } from 'react';
import v from '@/worklog/shared/assets/v.svg';
import glasses from '@/worklog/shared/assets/glasses.svg';
import plus from '@/worklog/shared/assets/plus.svg';
import Header from '@/worklog/shared/components/header/Header';
import Post from '@/worklog/shared/components/posting/Post';
import ModalAddManager from '@/worklog/shared/components/modal_add_manager/ModalAddManager';

const Category = () => {
  //모달 상태관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 예시 데이터 배열
  const dummyPosts = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    title: i % 2 === 0 ? '로그인 오류' : '홈페이지 접속 불가',
    name: '홍길동',
    department: '정보운영팀',
    role: '주임',
    phone: '02-342-3333',
  }));

  return (
    <>
      <main className="relative flex h-screen flex-col overflow-hidden bg-white">
        <Header />
        {/* 2. Title Section (Height: 212px) */}
        <section className="flex h-[180px] shrink-0 flex-col items-center justify-center border-b border-[#E8EEF2]">
          <div className="flex w-full max-w-[1200px] flex-col gap-8 px-4">
            {/* Main Title */}
            <h1 className="text-center text-[40px] font-bold">카테고리 담당자</h1>

            {/* Controls: Dropdowns & Search */}
            <div className="flex items-center justify-center gap-3">
              {/* 소속 Dropdown */}
              <button className="flex h-[48px] items-center gap-2 rounded-[24px] border border-[#E8EEF2] px-4 hover:bg-gray-50">
                <img src={v} alt="dropdown" />
                <span className="text-[16px] text-[#8C9499]">소속</span>
              </button>

              {/* 분류 Dropdown */}
              <button className="flex h-[48px] items-center gap-2 rounded-[24px] border border-[#E8EEF2] px-4 hover:bg-gray-50">
                <img src={v} alt="dropdown" />
                <span className="text-[16px] text-[#8C9499]">분류</span>
              </button>

              {/* Search Bar */}
              <div className="flex h-[48px] w-[480px] items-center gap-2 rounded-[24px] border border-[#E8EEF2] px-4 focus-within:border-blue-400">
                <img src={glasses} alt="검색" />
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  className="h-full w-full bg-transparent text-[16px] outline-none placeholder:text-[#8C9499]"
                />
              </div>

              {/* Filter Toggle */}
              <button className="h-[48px] rounded-[24px] border border-[#E8EEF2] px-6 text-[16px] text-[#8C9499] hover:bg-gray-50">
                즐겨찾기만 보기
              </button>
            </div>
          </div>
        </section>

        {/* 3. Contents Section (Scrollable) */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-4">
            {dummyPosts.map((post) => (
              <Post
                key={post.id}
                title={post.title}
                name={post.name}
                department={post.department}
                role={post.role}
                phone={post.phone}
              />
            ))}
          </div>
        </div>

        {/* Floating Action Button (FAB) */}
        <button
          className="fixed bottom-[40px] right-[40px] flex h-[80px] w-[80px] items-center justify-center rounded-full bg-white transition-transform hover:scale-105"
          style={{
            boxShadow: '2px 4px 20px 0 rgba(163, 164, 183, 0.30)',
          }}
          onClick={openModal}
        >
          <img src={plus} alt="추가" />
        </button>
      </main>

      <ModalAddManager isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Category;
