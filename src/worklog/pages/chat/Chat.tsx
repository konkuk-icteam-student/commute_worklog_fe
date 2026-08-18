import MainLayout from '@/worklog/shared/components/layout/MainLayout';

const Chat = () => {
  return (
    <MainLayout showPencil={false}>
      <div className="flex h-full flex-col">
        {/* 1. Title Section */}
        <section className="flex h-[180px] shrink-0 flex-col items-center justify-center border-b border-[#E8EEF2]">
          <h1 className="text-center text-[40px] font-bold">AI챗봇 만들거야</h1>
        </section>
      </div>
    </MainLayout>
  );
};

export default Chat;
