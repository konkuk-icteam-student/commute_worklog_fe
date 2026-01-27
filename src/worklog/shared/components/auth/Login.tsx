import { useState, useEffect } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);

  // 에러 메시지 상태 (API 연동 후 사용)
  const [errorMessage, setErrorMessage] = useState('');

  // 유효성 검사 (입력값이 있는지 확인)
  useEffect(() => {
    // 간단한 체크: 둘 다 비어있지 않으면 활성화
    setIsValid(email.length > 0 && password.length > 0);
  }, [email, password]);

  const handleLogin = () => {
    console.log('로그인 버튼 클릭!');
    // TODO: API 로그인 요청 로직
    // 실패 시: setErrorMessage("로그인 정보를 다시 확인해주세요");
  };

  return (
    // [수정] w-[600px]로 변경하여 인풋과 너비 통일
    // [수정] pt-[40px] 추가: Signup의 라디오버튼 높이만큼 여백을 주어 첫 번째 인풋 위치를 맞춤
    <div className="flex w-[600px] flex-col gap-4 pt-[40px]">
      {/* 이메일 입력 */}
      <div className="relative">
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-[53px] w-full rounded-[16px] border border-[#E8EEF2] px-6 py-4 text-[14px] outline-none placeholder:text-[#CDCDCD] focus:border-blue-400"
        />
      </div>

      {/* 비밀번호 입력 */}
      <div className="relative">
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-[53px] w-full rounded-[16px] border border-[#E8EEF2] px-6 py-4 text-[14px] outline-none placeholder:text-[#CDCDCD] focus:border-blue-400"
        />
      </div>

      {/* 로그인 실패 에러 메시지 */}
      {errorMessage && <p className="pl-2 text-[12px] text-red-500">{errorMessage}</p>}

      {/* 로그인 버튼 */}
      {/* [수정] mt-[60px] 추가하여 인풋란들과 거리두기 */}
      <button
        disabled={!isValid}
        onClick={handleLogin}
        className={`mt-[60px] h-[56px] w-full rounded-[46px] text-[16px] transition-colors ${
          isValid
            ? 'bg-[#51A8FF] font-bold text-white hover:bg-blue-500'
            : 'cursor-not-allowed bg-[#EAEAEA] font-normal text-[#CDCDCD]'
        }`}
      >
        로그인
      </button>
    </div>
  );
};

export default Login;
