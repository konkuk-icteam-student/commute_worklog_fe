import Header from '@/worklog/shared/components/header/Header';
import Title from '@/worklog/shared/components/faq/Title';
import SearchBar from '@/worklog/shared/components/faq/SearchBar';
const Faq = () => {
  // 예시 데이터 배열
  const dummyPosts = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    title:
      i % 2 === 0
        ? '부서 계정으로 로그인 하려고 하는데 장시간 접속을 안해서 불가능하다는 문구가 뜬다고 합니다.'
        : '홈페이지 접속 불가',
    date: '2023-10-0' + ((i % 9) + 1),
  }));

  return (
    <main>
      <Header />
      <Title />
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[1200px] px-4 py-4">
          <div className="flex flex-row items-center gap-[12px]">
            <span className="pb-[20px] pl-[12px] text-[32px] font-[700] text-[#17191A]">FAQ</span>
            <span className="text-[16px] font-[400] text-[#464A4D]">
              총 {dummyPosts.length}건의 메뉴얼이 있습니다.
            </span>
          </div>
          {dummyPosts.map((searchbar) => (
            <SearchBar key={searchbar.id} title={searchbar.title} date={searchbar.date} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Faq;
