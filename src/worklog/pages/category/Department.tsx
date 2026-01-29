import { useState } from 'react';
import glasses from '@/worklog/shared/assets/glasses.svg';
//import plus from '@/worklog/shared/assets/plus.svg';
import Header from '@/worklog/shared/components/header/Header';
import ModalAddManager from '@/worklog/shared/components/modal_add_manager/ModalAddManager';
import Post2 from '@/worklog/shared/components/posting/Post2';

const Department = () => {
  //모달 상태관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 예시 데이터 배열
  const dummyPosts2 = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    title: i % 2 === 0 ? '로그인 오류' : '홈페이지 접속 불가',
  }));

  return (
    <>
      <main className="relative flex h-screen flex-col overflow-hidden bg-white">
        <Header showPencil={false} />
        {/* 2. Title Section (Height: 212px) */}
        <section className="flex h-[180px] shrink-0 flex-col items-center justify-center border-b border-[#E8EEF2]">
          <div className="flex w-full max-w-[1200px] flex-col gap-8 px-4">
            {/* Main Title */}
            <h1 className="text-center text-[40px] font-bold">소속</h1>

            {/* Controls: Dropdowns & Search */}
            <div className="flex items-center justify-center gap-3">
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
              <button
                className="h-[48px] rounded-[24px] border border-[#E8EEF2] px-6 text-[16px] font-[700] text-[#464A4D] hover:bg-gray-50"
                onClick={openModal}
              >
                추가하기
              </button>
            </div>
          </div>
        </section>

        {/* 3. Contents Section (Scrollable) */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-4">
            {dummyPosts2.map((post) => (
              <Post2 key={post.id} title={post.title} />
            ))}
          </div>
        </div>
      </main>

      <ModalAddManager isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Department;
