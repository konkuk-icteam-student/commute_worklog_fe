import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../shared/components/BottomNavigation';
import LogOutIcon from '../../shared/assets/LogOut.svg';
import { useWorkTime } from '../hooks/useWorkTime';
import { useUserInfo } from '../hooks/useUserInfo';
import LottieAnimation from '@/shared/components/LottieAnimation';
import sampleLoading from '@/shared/assets/animations/sample-loading.json';

export default function MyPage() {
  const navigate = useNavigate();
  const { weekly, monthly, isLoading, error } = useWorkTime();
  const { userInfo, isLoading: isUserInfoLoading } = useUserInfo();

  const handleLogout = () => {
    // TODO: 실제 로그아웃 로직 구현 (예: API 호출, 토큰 제거 등)
    navigate('/auth');
  };

  return (
    <div
      className="relative min-h-screen w-full bg-gradient-to-b from-[#f8fbff] to-[#ffffff]"
      data-name="mypage"
    >
      {/* Header */}
      <div
        className="w-full bg-[#51a8ff] py-[2.4rem] shadow-[0rem_0.4rem_0.6rem_-0.4rem_rgba(0,0,0,0.1)]"
        data-name="Container"
      >
        <div className="mx-auto max-w-[39.3rem] px-[2rem]">
          <div className="flex flex-col gap-[0.4rem]">
            <h1 className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[1.6rem] text-white">
              마이페이지
            </h1>
            <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.3rem] text-[rgba(255,255,255,0.8)]">
              {isUserInfoLoading
                ? '로딩 중...'
                : `${userInfo?.name || '사용자'}님 · ${userInfo?.organizationName || '정보운영팀'}`}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full py-[2rem] pb-[10rem]" data-name="Container">
        <div className="mx-auto max-w-[39.3rem] px-[2rem]">
          <div className="flex flex-col gap-[2.4rem]">
            {/* Work Time Cards */}
            <div className="grid w-full grid-cols-2 gap-[1.6rem]" data-name="Container">
              {/* Weekly Hours Card */}
              <div
                className="flex min-h-[12rem] flex-col gap-[0.8rem] rounded-[1.6rem] bg-white p-[2.4rem] shadow-[0rem_0.4rem_2rem_0rem_rgba(81,168,255,0.07)]"
                data-name="Container"
              >
                <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.4rem] text-gray-500">
                  이번 주 근무시간
                </p>
                {isLoading ? (
                  <div className="flex flex-1 items-center justify-center">
                    <LottieAnimation
                      animationData={sampleLoading}
                      width={40}
                      height={40}
                      loop={true}
                      autoplay={true}
                    />
                  </div>
                ) : error ? (
                  <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.2rem] text-red-400">
                    {error}
                  </p>
                ) : weekly ? (
                  <>
                    <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[2rem] text-[#51a8ff]">
                      {weekly.actualHours} / {weekly.maxHours}h
                    </p>
                    <div className="h-[0.8rem] w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-[#51a8ff] transition-all duration-300"
                        style={{ width: `${weekly.percentage}%` }}
                      />
                    </div>
                  </>
                ) : (
                  <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.4rem] text-gray-400">
                    데이터 없음
                  </p>
                )}
              </div>

              {/* Monthly Hours Card */}
              <div
                className="flex min-h-[12rem] flex-col gap-[0.8rem] rounded-[1.6rem] bg-white p-[2.4rem] shadow-[0rem_0.4rem_2rem_0rem_rgba(81,168,255,0.07)]"
                data-name="Container"
              >
                <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.4rem] text-gray-500">
                  이번 달 근무시간
                </p>
                {isLoading ? (
                  <div className="flex flex-1 items-center justify-center">
                    <LottieAnimation
                      animationData={sampleLoading}
                      width={40}
                      height={40}
                      loop={true}
                      autoplay={true}
                    />
                  </div>
                ) : error ? (
                  <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.2rem] text-red-400">
                    {error}
                  </p>
                ) : monthly ? (
                  <>
                    <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[2rem] text-[#51a8ff]">
                      {monthly.actualHours} / {monthly.maxHours}h
                    </p>
                    <div className="h-[0.8rem] w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-[#51a8ff] transition-all duration-300"
                        style={{ width: `${monthly.percentage}%` }}
                      />
                    </div>
                  </>
                ) : (
                  <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.4rem] text-gray-400">
                    데이터 없음
                  </p>
                )}
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-[2rem] rounded-[1.6rem] bg-white p-[2rem] shadow-[0rem_0.4rem_2rem_0rem_rgba(81,168,255,0.07)] transition-colors hover:bg-gray-50"
              data-name="Button"
            >
              <img src={LogOutIcon} alt="Logout" className="size-[4rem] flex-shrink-0" />
              <p className="flex-1 text-center font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.6rem] text-[#09121c]">
                로그아웃
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activePage="mypage" />
    </div>
  );
}
