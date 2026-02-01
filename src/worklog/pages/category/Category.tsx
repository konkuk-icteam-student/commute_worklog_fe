import { useState } from 'react';
import v from '@/worklog/shared/assets/v.svg';
import glasses from '@/worklog/shared/assets/glasses.svg';
import Post from '@/worklog/shared/components/posting/Post';
import ModalAddManager from '@/worklog/shared/components/modal_add_manager/ModalAddManager';
import MainLayout from '@/worklog/shared/components/layout/MainLayout';

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const dummyPosts = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    title: i % 2 === 0 ? '로그인 오류' : '홈페이지 접속 불가',
    name: '홍길동',
    department: '정보운영팀',
    role: '주임',
    phone: '02-342-3333',
  }));

  return (
    <MainLayout showPencil={false}>
      <div className="flex h-full flex-col">
        <section className="flex h-[180px] shrink-0 flex-col items-center justify-center border-b border-[#E8EEF2]">
          <div className="flex w-full max-w-[1200px] flex-col gap-8 px-4">
            <h1 className="text-center text-[40px] font-bold">담당자</h1>

            <div className="flex items-center justify-center gap-3">
              <button className="flex h-[48px] items-center gap-2 rounded-[24px] border border-[#E8EEF2] px-4 hover:bg-gray-50">
                <img src={v} alt="dropdown" />
                <span className="text-[16px] text-[#8C9499]">소속</span>
              </button>

              <button className="flex h-[48px] items-center gap-2 rounded-[24px] border border-[#E8EEF2] px-4 hover:bg-gray-50">
                <img src={v} alt="dropdown" />
                <span className="text-[16px] text-[#8C9499]">분류</span>
              </button>

              <div className="flex h-[48px] w-[480px] items-center gap-2 rounded-[24px] border border-[#E8EEF2] px-4 focus-within:border-blue-400">
                <img src={glasses} alt="검색" />
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  className="h-full w-full bg-transparent text-[16px] outline-none placeholder:text-[#8C9499]"
                />
              </div>

              <button className="h-[48px] rounded-[24px] border border-[#E8EEF2] px-6 text-[16px] text-[#8C9499] hover:bg-gray-50">
                즐겨찾기만 보기
              </button>

              <button
                className="h-[48px] rounded-[24px] border border-[#E8EEF2] px-6 text-[16px] font-[700] text-[#464A4D] hover:bg-gray-50"
                onClick={openModal}
              >
                추가하기
              </button>
            </div>
          </div>
        </section>
        {/* 2. Contents Section (Takes remaining space) */}
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
      </div>

      <ModalAddManager isOpen={isModalOpen} onClose={closeModal} />
    </MainLayout>
  );
};

export default Category;
