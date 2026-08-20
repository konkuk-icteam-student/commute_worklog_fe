import MainLayout from '@/worklog/shared/components/layout/MainLayout';
import Logout from '@/worklog/shared/components/mypage/Logout';
import ProfileBox from '@/worklog/shared/components/mypage/ProfileBox';
import WorkLogList from '@/worklog/shared/components/mypage/WorkLogList';
const Mypage = () => {
  return (
    <main className="min-h-screen bg-white">
      <MainLayout showPencil={false}>
        <div className="flex h-full flex-1 flex-col gap-[34px] overflow-y-auto bg-white pb-10">
          {/* Main Title */}
          <h1 className="flex h-[127px] items-center justify-center text-center text-[40px] font-bold">
            마이 페이지
          </h1>
          <ProfileBox />
          <WorkLogList />
          <Logout />
        </div>
      </MainLayout>
    </main>
  );
};

export default Mypage;
