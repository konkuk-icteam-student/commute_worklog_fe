import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../shared/components/Button';
import InputField from '../shared/components/InputField';
import VerificationCodeField from '../shared/components/VerificationCodeField';
import VerificationButton from '../shared/components/VerificationButton';
import UserTypeRadio from '../shared/components/UserTypeRadio';
import { sendVerificationCode, verifyCode, register, login } from '../../shared/apis/auth.api';

export default function AuthPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup state
  const [userType, setUserType] = useState<'student' | 'manager'>('student');
  const [name, setName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  // Verification flow state
  const [showVerificationField, setShowVerificationField] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Email validation function
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isLoginFormValid = isValidEmail(loginEmail) && loginPassword.length > 0;
  const isSignupFormValid = name && isEmailVerified && signupPassword;
  const canRequestVerification = isValidEmail(signupEmail) && !isEmailVerified;

  const handleLogin = async () => {
    if (!isLoginFormValid) return;

    try {
      setIsLoading(true);
      setErrorMessage('');

      const response = await login({
        email: loginEmail,
        password: loginPassword,
      });

      if (response.isSuccess && response.details) {
        // 로그인 응답에서 역할 코드를 확인하여 리다이렉트
        if (response.details.roleCode === 'RL02') {
          navigate('/manager');
        } else {
          navigate('/home');
        }
      } else {
        setErrorMessage(response.message || '로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('로그인 에러:', error);
      setErrorMessage('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!isSignupFormValid) return;

    try {
      setIsLoading(true);
      setErrorMessage('');

      const response = await register({
        email: signupEmail,
        password: signupPassword,
        name: name,
        roleCode: userType === 'manager' ? 'RL02' : 'RL01', // RL01: 학생/사원, RL02: 관리자
        organizationId: 1, // TODO: 추후 조직 선택 기능 추가
      });

      if (response.isSuccess) {
        console.log('회원가입 성공:', response.details);
        // 회원가입 성공 후 자동 로그인 처리
        const loginResponse = await login({
          email: signupEmail,
          password: signupPassword,
        });

        if (loginResponse.isSuccess) {
          navigate(userType === 'manager' ? '/manager' : '/home');
        } else {
          // 로그인 실패 시 로그인 탭으로 이동
          setActiveTab('login');
          setLoginEmail(signupEmail);
        }
      } else {
        setErrorMessage(response.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('회원가입 에러:', error);
      setErrorMessage('회원가입 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestVerification = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const response = await sendVerificationCode({ email: signupEmail });

      if (response.isSuccess) {
        setShowVerificationField(true);
        console.log('인증번호 발송 성공:', signupEmail);
      } else {
        setErrorMessage(response.message || '인증번호 발송에 실패했습니다.');
      }
    } catch (error) {
      console.error('인증번호 발송 에러:', error);
      setErrorMessage('인증번호 발송 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) return;

    try {
      setIsLoading(true);
      setErrorMessage('');

      const response = await verifyCode({
        email: signupEmail,
        code: verificationCode,
      });

      if (response.isSuccess) {
        setIsEmailVerified(true);
        setShowVerificationField(false);
        setVerificationCode('');
        console.log('이메일 인증 완료');
      } else {
        setErrorMessage(response.message || '인증번호가 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('인증번호 확인 에러:', error);
      setErrorMessage('인증번호 확인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (tab: 'login' | 'signup') => {
    setActiveTab(tab);
    setErrorMessage('');
    // Reset all states when switching tabs
    if (tab === 'login') {
      setLoginEmail('');
      setLoginPassword('');
    } else {
      setUserType('student');
      setName('');
      setSignupEmail('');
      setSignupPassword('');
      setVerificationCode('');
      setShowVerificationField(false);
      setIsEmailVerified(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-white" data-name="auth">
      {/* Header */}
      <div
        className="box-border flex h-[15.7rem] w-full flex-col content-stretch items-start gap-[2.4rem] bg-[#51a8ff] px-[2.4rem] pb-0 pt-[3.2rem]"
        data-name="Header"
      >
        <div className="relative w-full shrink-0" data-name="Heading 1">
          <p className="whitespace-pre text-nowrap text-center font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[1.6rem] not-italic leading-[2.4rem] text-white">
            출근부
          </p>
        </div>

        {/* Tab Navigation */}
        <div
          className="relative h-[5.3rem] w-full shrink-0 rounded-[1.6rem] bg-[#f1f8ff]"
          data-name="Container"
        >
          <div className="size-full">
            <div className="relative box-border flex h-[5.3rem] w-full content-stretch items-start gap-[0.4rem] px-[0.4rem] pb-0 pt-[0.4rem]">
              {/* Login Tab */}
              <button
                onClick={() => handleTabChange('login')}
                className={`relative h-[4.5rem] min-h-px min-w-px shrink-0 grow basis-0 rounded-[1.6rem] ${
                  activeTab === 'login' ? 'bg-white' : 'opacity-70'
                }`}
                data-name="Button"
              >
                {activeTab === 'login' && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-[1.6rem] border border-solid border-[#f1f8ff] shadow-[0rem_0.4rem_2rem_0rem_rgba(81,168,255,0.07)]"
                  />
                )}
                <div className="relative box-border flex h-[4.5rem] w-full items-center justify-center border-0 border-solid border-[transparent] bg-clip-padding">
                  <p
                    className={`whitespace-pre text-nowrap text-center font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.4rem] not-italic leading-[2.1rem] tracking-[0.0rem] ${
                      activeTab === 'login' ? 'text-[#51a8ff]' : 'text-[#cdcdcd]'
                    }`}
                  >
                    로그인
                  </p>
                </div>
              </button>

              {/* Signup Tab */}
              <button
                onClick={() => handleTabChange('signup')}
                className={`relative h-[4.5rem] min-h-px min-w-px shrink-0 grow basis-0 rounded-[1.6rem] ${
                  activeTab === 'signup' ? 'bg-white' : 'opacity-70'
                }`}
                data-name="Button"
              >
                {activeTab === 'signup' && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-[1.6rem] border border-solid border-[#f1f8ff] shadow-[0rem_0.4rem_2rem_0rem_rgba(81,168,255,0.07)]"
                  />
                )}
                <div className="relative box-border flex h-[4.5rem] w-full items-center justify-center border-0 border-solid border-[transparent] bg-clip-padding">
                  <p
                    className={`whitespace-pre text-nowrap text-center font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.4rem] not-italic leading-[2.1rem] tracking-[0.0rem] ${
                      activeTab === 'signup' ? 'text-[#51a8ff]' : 'text-[#cdcdcd]'
                    }`}
                  >
                    회원가입
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="box-border h-[42.7rem] w-full px-[2.4rem] pt-[3.5rem]">
        {activeTab === 'login' ? (
          // Login Form
          <div className="flex flex-col gap-[1.6rem]">
            <InputField
              type="email"
              placeholder="이메일"
              value={loginEmail}
              onChange={setLoginEmail}
            />
            <InputField
              type="password"
              placeholder="비밀번호"
              value={loginPassword}
              onChange={setLoginPassword}
            />
            {errorMessage && <p className="text-center text-sm text-red-500">{errorMessage}</p>}
            <div className="mt-[22.9rem]">
              <Button disabled={!isLoginFormValid || isLoading} onClick={handleLogin}>
                {isLoading ? '로그인 중...' : '로그인'}
              </Button>
            </div>
          </div>
        ) : (
          // Signup Form
          <div className="flex flex-col gap-[2rem]">
            {/* 사용자 유형 선택 */}
            <UserTypeRadio value={userType} onChange={setUserType} />

            {/* 이름 */}
            <InputField type="text" placeholder="이름" value={name} onChange={setName} />

            {/* 이메일 */}
            <InputField
              type="email"
              placeholder="이메일"
              value={signupEmail}
              onChange={setSignupEmail}
              verified={isEmailVerified}
            />

            {/* 인증번호 받기 버튼 */}
            {!isEmailVerified && !showVerificationField && (
              <VerificationButton
                disabled={!canRequestVerification || isLoading}
                onClick={handleRequestVerification}
              />
            )}

            {/* 인증번호 입력 필드 */}
            {showVerificationField && (
              <VerificationCodeField
                value={verificationCode}
                onChange={setVerificationCode}
                onVerify={handleVerifyCode}
                disabled={isLoading}
              />
            )}

            {/* 비밀번호 */}
            <InputField
              type="password"
              placeholder="비밀번호"
              value={signupPassword}
              onChange={setSignupPassword}
            />

            {errorMessage && <p className="text-center text-sm text-red-500">{errorMessage}</p>}

            <div className="mt-[1.5rem]">
              <Button disabled={!isSignupFormValid || isLoading} onClick={handleSignup}>
                {isLoading ? '가입 중...' : '가입하기'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
