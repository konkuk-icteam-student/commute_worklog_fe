import { useState, useEffect } from 'react';

const Signup = () => {
  // 1. 사용자 유형 (학생/관리자)
  const [userType, setUserType] = useState<'student' | 'admin'>('student');

  // 2. 입력 상태
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [password, setPassword] = useState('');

  // 3. 진행 단계 및 UI 상태
  const [isAuthCodeSent, setIsAuthCodeSent] = useState(false); // 인증번호 발송 여부
  const [isAuthVerified, setIsAuthVerified] = useState(false); // 인증 완료 여부

  // 4. 메시지 상태 (안내 및 에러)
  const [emailMessage, setEmailMessage] = useState<{
    text: string;
    type: 'error' | 'success';
  } | null>(null);
  const [authMessage, setAuthMessage] = useState<{
    text: string;
    type: 'error' | 'success';
  } | null>(null);
  const [pwMessage, setPwMessage] = useState<{ text: string; type: 'error' | 'success' } | null>(
    null
  );

  // --- 유효성 검사 정규식 ---
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const pwRegex = /^[A-Za-z0-9]{4,16}$/;

  // --- 이벤트 핸들러 ---

  // 인증번호 받기 버튼 클릭
  const handleRequestAuthCode = () => {
    if (!emailRegex.test(email)) {
      setEmailMessage({ text: '올바르지 않은 이메일 형식입니다.', type: 'error' });
      return;
    }
    // TODO: API 인증번호 발송 요청
    console.log(`인증번호 요청: ${email}`);
    setIsAuthCodeSent(true);
    setEmailMessage({ text: '입력하신 메일로 인증번호가 발송되었습니다.', type: 'success' });
  };

  // 인증번호 확인 버튼 클릭
  const handleVerifyAuthCode = () => {
    // TODO: API 인증번호 검증 요청
    console.log(`인증번호 확인: ${authCode}`);
    if (authCode === '123456') {
      setIsAuthVerified(true);
      setAuthMessage({ text: '인증이 완료되었습니다.', type: 'success' });
    } else {
      setAuthMessage({ text: '인증번호가 일치하지 않습니다.', type: 'error' });
    }
  };

  // 가입하기 버튼 클릭
  const handleSignup = () => {
    console.log('가입하기 버튼 클릭!');
    // TODO: API 회원가입 요청
  };

  // 비밀번호 입력 시 실시간 검사
  useEffect(() => {
    if (password.length > 0) {
      if (!pwRegex.test(password)) {
        setPwMessage({
          text: '비밀번호는 영어 또는 숫자로 이루어진 최소 4자~최대 16자를 만족해야합니다.',
          type: 'error',
        });
      } else {
        setPwMessage(null);
      }
    } else {
      setPwMessage(null);
    }
  }, [password]);

  // --- 버튼 활성화 조건 ---
  const isRequestBtnEnabled = name.length > 0 && email.length > 0 && !isAuthCodeSent;
  // 가입하기 버튼: 인증 완료되고, 비밀번호 유효성 통과 시 활성화
  const isSignupBtnEnabled = isAuthVerified && password.length > 0 && pwRegex.test(password);

  return (
    // [수정] w-[600px]로 변경하여 인풋과 너비 통일
    <div className="flex w-[600px] flex-col gap-4">
      {/* 1. 사용자 유형 선택 (라디오 버튼) */}
      <div className="mb-2 flex h-[24px] items-center justify-center gap-8">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="radio"
            name="userType"
            checked={userType === 'student'}
            onChange={() => setUserType('student')}
            className="h-4 w-4 accent-blue-500"
          />
          <span className="text-[14px]">학생</span>
        </label>
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="radio"
            name="userType"
            checked={userType === 'admin'}
            onChange={() => setUserType('admin')}
            className="h-4 w-4 accent-blue-500"
          />
          <span className="text-[14px]">관리자</span>
        </label>
      </div>

      {/* 2. 이름 입력 */}
      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isAuthVerified}
        className="h-[53px] w-full rounded-[16px] border border-[#E8EEF2] px-6 py-4 text-[14px] outline-none placeholder:text-[#CDCDCD] focus:border-blue-400"
      />

      {/* 3. 이메일 입력 */}
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isAuthCodeSent}
        className="h-[53px] w-full rounded-[16px] border border-[#E8EEF2] px-6 py-4 text-[14px] outline-none placeholder:text-[#CDCDCD] focus:border-blue-400"
      />

      {/* 이메일 관련 메시지 */}
      {emailMessage && (
        <p
          className={`pl-2 text-[12px] ${emailMessage.type === 'error' ? 'text-red-500' : 'text-blue-500'}`}
        >
          {emailMessage.text}
        </p>
      )}

      {/* 4. 인증번호 받기 버튼 (인증 전이고, 발송 전일 때만 보임) */}
      {!isAuthCodeSent && (
        <button
          disabled={!isRequestBtnEnabled}
          onClick={handleRequestAuthCode}
          className={`h-[56px] w-full rounded-[16px] text-[16px] transition-colors ${
            isRequestBtnEnabled
              ? 'bg-[#EAEAEA] font-bold text-[#464A4D] hover:bg-gray-300'
              : 'cursor-not-allowed bg-[#EAEAEA] font-normal text-[#CDCDCD]'
          }`}
        >
          인증번호 받기
        </button>
      )}

      {/* 5. 인증번호 입력 영역 (발송 후 표시) */}
      {isAuthCodeSent && !isAuthVerified && (
        // [수정] w-full을 주어 부모(600px) 안에서 꽉 차게 배치
        <div className="flex w-full gap-[10px]">
          <input
            type="text"
            placeholder="인증번호"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
            // [수정] w-[440px] 고정, shrink-0으로 줄어듦 방지
            className="h-[53px] w-[440px] shrink-0 rounded-[16px] border border-[#E8EEF2] px-6 py-4 text-[14px] outline-none placeholder:text-[#CDCDCD] focus:border-blue-400"
          />
          <button
            onClick={handleVerifyAuthCode}
            disabled={authCode.length === 0}
            // [수정] w-[150px] 고정, shrink-0으로 줄어듦 방지
            className={`h-[53px] w-[150px] shrink-0 rounded-[16px] text-[14px] ${
              authCode.length > 0
                ? 'bg-[#51A8FF] font-bold text-white'
                : 'bg-[#EAEAEA] text-[#CDCDCD]'
            }`}
          >
            확인
          </button>
        </div>
      )}

      {/* 인증 관련 메시지 */}
      {authMessage && (
        <p
          className={`pl-2 text-[12px] ${authMessage.type === 'error' ? 'text-red-500' : 'text-blue-500'}`}
        >
          {authMessage.text}
        </p>
      )}

      {/* 6. 비밀번호 입력 (항상 렌더링) */}
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        // [수정] 인증 전에는 disabled 처리 (UX상 흐름 제어)
        disabled={!isAuthVerified}
        className={`h-[53px] w-full rounded-[16px] border border-[#E8EEF2] px-6 py-4 text-[14px] outline-none placeholder:text-[#CDCDCD] focus:border-blue-400 ${
          !isAuthVerified ? 'cursor-not-allowed bg-gray-50' : 'bg-white'
        }`}
      />
      {pwMessage && (
        <p
          className={`pl-2 text-[12px] ${pwMessage.type === 'error' ? 'text-red-500' : 'text-blue-500'}`}
        >
          {pwMessage.text}
        </p>
      )}

      {/* 7. 가입하기 버튼 (항상 렌더링) */}
      <button
        disabled={!isSignupBtnEnabled}
        onClick={handleSignup}
        // [수정] mt-[40px] 추가하여 거리두기
        className={`mt-[40px] h-[56px] w-full rounded-[46px] text-[16px] transition-colors ${
          isSignupBtnEnabled
            ? 'bg-[#51A8FF] font-bold text-white hover:bg-blue-500'
            : 'cursor-not-allowed bg-[#EAEAEA] font-normal text-[#CDCDCD]'
        }`}
      >
        가입하기
      </button>
    </div>
  );
};

export default Signup;
