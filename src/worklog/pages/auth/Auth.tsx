import Header from '@/worklog/shared/components/header/Header';
const Auth = () => {
  return (
    <main>
      {/* Header에 이벤트 전달 */}
      <Header showPencil={false} />
    </main>
  );
};

export default Auth;
