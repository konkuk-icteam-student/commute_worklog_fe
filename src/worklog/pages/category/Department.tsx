//import { useState } from 'react';
import Post2 from '@/worklog/shared/components/posting/Post2';
import MainLayout from '@/worklog/shared/components/layout/MainLayout'; // MainLayout import

const Department = () => {
  // 예시 데이터 배열
  const dummyPosts2 = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    title: i % 2 === 0 ? '로그인 오류' : '홈페이지 접속 불가',
  }));

  return (
    <MainLayout showPencil={false}>
      {/* MainLayout 내부의 컨텐츠 영역입니다.
        flex-col과 h-full을 주어 상단 검색 영역과 하단 리스트 영역을 수직으로 배치하고 꽉 채웁니다.
      */}
      <div className="flex h-full flex-col">
        {/* 1. Title Section (Fixed Height: 180px) */}
        <section className="flex h-[180px] shrink-0 flex-col items-center justify-center border-b border-[#E8EEF2]">
          <div className="flex w-full max-w-[1200px] flex-col gap-8 px-4">
            {/* Main Title */}
            <h1 className="text-center text-[40px] font-bold">소속</h1>

            {/* Controls: Search & Buttons */}
            <div className="flex items-center justify-center gap-3">
              {/* Search Bar */}
              <div className="flex h-[48px] w-[480px] items-center gap-2 rounded-[24px] border border-[#E8EEF2] px-4 focus-within:border-blue-400">
                <input
                  type="text"
                  className="h-full w-full bg-transparent text-[16px] outline-none placeholder:text-[#8C9499]"
                />
              </div>

              {/* Add Button */}
              <button className="h-[48px] rounded-[24px] border border-[#E8EEF2] px-6 text-[16px] font-[700] text-[#464A4D] hover:bg-gray-50">
                추가하기
              </button>
            </div>
          </div>
        </section>

        {/* 2. Contents Section (Takes remaining space & Scrollable) */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-4">
            {dummyPosts2.map((post) => (
              <Post2 key={post.id} title={post.title} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Department;
