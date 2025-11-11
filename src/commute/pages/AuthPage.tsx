import { useState } from 'react';
import Button from '../shared/components/Button';
import InputField from '../shared/components/InputField';
import DepartmentSelect from '../shared/components/DepartmentSelect';
import VerificationCodeField from '../shared/components/VerificationCodeField';
import VerificationButton from '../shared/components/VerificationButton';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup state
  const [department, setDepartment] = useState('');
  const [name, setName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  // Verification flow state
  const [showVerificationField, setShowVerificationField] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // Email validation function
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isLoginFormValid = isValidEmail(loginEmail) && loginPassword.length > 0;
  const isSignupFormValid = department && name && isEmailVerified && signupPassword;
  const canRequestVerification = isValidEmail(signupEmail) && !isEmailVerified;

  const handleLogin = () => {
    if (isLoginFormValid) {
      console.log('로그인:', { email: loginEmail, password: loginPassword });
    }
  };

  const handleSignup = () => {
    if (isSignupFormValid) {
      console.log('회원가입:', { department, name, email: signupEmail, password: signupPassword });
    }
  };

  const handleRequestVerification = () => {
    setShowVerificationField(true);
    console.log('인증번호 요청:', signupEmail);
  };

  const handleVerifyCode = () => {
    if (verificationCode) {
      setIsEmailVerified(true);
      setShowVerificationField(false);
      setVerificationCode('');
      console.log('인증 완료');
    }
  };

  const handleTabChange = (tab: 'login' | 'signup') => {
    setActiveTab(tab);
    // Reset all states when switching tabs
    if (tab === 'login') {
      setLoginEmail('');
      setLoginPassword('');
    } else {
      setDepartment('');
      setName('');
      setSignupEmail('');
      setSignupPassword('');
      setVerificationCode('');
      setShowVerificationField(false);
      setIsEmailVerified(false);
    }
  };

  return (
    <div className="bg-white relative min-h-screen w-full" data-name="auth">
      {/* Header */}
      <div className="bg-[#51a8ff] box-border content-stretch flex flex-col gap-[2.4rem] items-start pb-0 pt-[3.2rem] px-[2.4rem] w-full h-[15.7rem]" data-name="Header">
        <div className="relative shrink-0 w-full" data-name="Heading 1">
          <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[2.4rem] text-center not-italic text-[1.6rem] text-nowrap text-white whitespace-pre">출근부</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#f1f8ff] h-[5.3rem] relative rounded-[1.6rem] shrink-0 w-full" data-name="Container">
          <div className="size-full">
            <div className="box-border content-stretch flex gap-[0.4rem] h-[5.3rem] items-start pb-0 pt-[0.4rem] px-[0.4rem] relative w-full">
              {/* Login Tab */}
              <button
                onClick={() => handleTabChange('login')}
                className={`basis-0 grow h-[4.5rem] min-h-px min-w-px relative rounded-[1.6rem] shrink-0 ${
                  activeTab === 'login' ? 'bg-white' : 'opacity-70'
                }`}
                data-name="Button"
              >
                {activeTab === 'login' && (
                  <div aria-hidden="true" className="absolute border border-[#f1f8ff] border-solid inset-0 pointer-events-none rounded-[1.6rem] shadow-[0rem_0.4rem_2rem_0rem_rgba(81,168,255,0.07)]" />
                )}
                <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[4.5rem] relative w-full flex items-center justify-center">
                  <p className={`font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[2.1rem] not-italic text-[1.4rem] text-center text-nowrap tracking-[0.0rem] whitespace-pre ${
                    activeTab === 'login' ? 'text-[#51a8ff]' : 'text-[#cdcdcd]'
                  }`}>로그인</p>
                </div>
              </button>

              {/* Signup Tab */}
              <button
                onClick={() => handleTabChange('signup')}
                className={`basis-0 grow h-[4.5rem] min-h-px min-w-px relative rounded-[1.6rem] shrink-0 ${
                  activeTab === 'signup' ? 'bg-white' : 'opacity-70'
                }`}
                data-name="Button"
              >
                {activeTab === 'signup' && (
                  <div aria-hidden="true" className="absolute border border-[#f1f8ff] border-solid inset-0 pointer-events-none rounded-[1.6rem] shadow-[0rem_0.4rem_2rem_0rem_rgba(81,168,255,0.07)]" />
                )}
                <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[4.5rem] relative w-full flex items-center justify-center">
                  <p className={`font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[2.1rem] not-italic text-[1.4rem] text-center text-nowrap tracking-[0.0rem] whitespace-pre ${
                    activeTab === 'signup' ? 'text-[#51a8ff]' : 'text-[#cdcdcd]'
                  }`}>회원가입</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="box-border px-[2.4rem] pt-[3.5rem] w-full h-[42.7rem]">
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
            <div className="mt-[22.9rem]">
              <Button disabled={!isLoginFormValid} onClick={handleLogin}>
                로그인
              </Button>
            </div>
          </div>
        ) : (
          // Signup Form
          <div className="flex flex-col gap-[2rem]">
            {/* 부서 선택 */}
            <DepartmentSelect
              value={department}
              onChange={setDepartment}
            />

            {/* 이름 */}
            <InputField
              type="text"
              placeholder="이름"
              value={name}
              onChange={setName}
            />

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
                disabled={!canRequestVerification}
                onClick={handleRequestVerification}
              />
            )}

            {/* 인증번호 입력 필드 */}
            {showVerificationField && (
              <VerificationCodeField
                value={verificationCode}
                onChange={setVerificationCode}
                onVerify={handleVerifyCode}
              />
            )}

            {/* 비밀번호 */}
            <InputField
              type="password"
              placeholder="비밀번호"
              value={signupPassword}
              onChange={setSignupPassword}
            />

            <div className="mt-[1.5rem]">
              <Button disabled={!isSignupFormValid} onClick={handleSignup}>
                가입하기
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
