import { useState } from 'react';
import Header from '@/worklog/shared/components/header/Header';
import Login from '@/worklog/shared/components/auth/Login';
import Signup from '@/worklog/shared/components/auth/Signup';

const Auth = () => {
  const [tab, setTab] = useState<'login' | 'signup'>('login');

  return (
    <main className="min-h-screen bg-white">
      {/* Header: 연필 아이콘 숨김 */}
      <Header showPencil={false} />

      {/* 상단 섹션: 타이틀 & 탭 */}
      <section className="flex flex-col items-center justify-center border-b border-[#E8EEF2] py-10">
        <div className="flex w-full max-w-[1200px] flex-col items-center gap-8 px-4">
          <h1 className="text-center text-[40px] font-bold text-black">정보운영팀</h1>

          {/* 탭 (로그인 / 회원가입) */}
          <div
            className="flex items-center rounded-[20px] bg-[#F1F8FF] p-[4px]"
            style={{ height: '53px' }}
          >
            {/* 로그인 탭 */}
            <button
              onClick={() => setTab('login')}
              className={`flex h-full min-w-[120px] items-center justify-center rounded-[16px] px-8 text-[14px] transition-all ${
                tab === 'login'
                  ? 'bg-white font-bold text-[#004FFF] shadow-[0_4px_20px_0_rgba(81,168,255,0.07)]'
                  : 'bg-transparent font-normal text-[#CDCDCD]'
              }`}
            >
              로그인
            </button>

            {/* 회원가입 탭 */}
            <button
              onClick={() => setTab('signup')}
              className={`flex h-full min-w-[120px] items-center justify-center rounded-[16px] px-8 text-[14px] transition-all ${
                tab === 'signup'
                  ? 'bg-white font-bold text-[#004FFF] shadow-[0_4px_20px_0_rgba(81,168,255,0.07)]'
                  : 'bg-transparent font-normal text-[#CDCDCD]'
              }`}
            >
              회원가입
            </button>
          </div>
        </div>
      </section>

      {/* 컨텐츠 섹션: 로그인 or 회원가입 폼 */}
      <div className="flex w-full justify-center pb-20 pt-10">
        {/* 여기서 탭에 따라 컴포넌트 교체 */}
        {tab === 'login' ? <Login /> : <Signup />}
      </div>
    </main>
  );
};

export default Auth;
