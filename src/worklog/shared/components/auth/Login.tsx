import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { login } from '../../../../shared/apis/auth.api';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsValid(email.length > 0 && password.length > 0);
  }, [email, password]);

  const handleLogin = async () => {
    console.log('로그인 버튼 클릭!');
    console.log('🖱️ [Action] 로그인 버튼 클릭');
    console.log('📤 [Sending Data]:', { email, password });
    setErrorMessage('');

    try {
      const response = await login({ email, password });

      if (response.isSuccess) {
        console.log('✅ [Login Success] Redirecting to /branch');

        // 구조 분해 할당 (userName, roleCode는 옵셔널이므로 undefined일 수 있음)
        const { userName, roleCode, accessToken } = response.details;

        // 1. LocalStorage 저장 (값이 없을 경우를 대비해 기본값 '' 처리)
        // accessToken은 필수값이므로 그대로 저장
        localStorage.setItem('accessToken', accessToken);
        // 옵셔널 값들은 ?? 연산자를 사용해 undefined일 경우 빈 문자열로 저장
        localStorage.setItem('userName', userName ?? '');
        localStorage.setItem('roleCode', roleCode ?? '');

        // 2. 페이지 이동 및 State 전달
        navigate('/branch', {
          state: {
            userName: userName ?? '', // 값이 없으면 빈 문자열 전달
            roleCode: roleCode ?? '', // 값이 없으면 빈 문자열 전달
          },
        });
      } else {
        setErrorMessage(response.message || '로그인 정보를 다시 확인해주세요.');
      }
    } catch (error) {
      console.error('Login Failed:', error);

      const err = error as AxiosError<{ message: string }>;
      const msg = err.response?.data?.message || '로그인 중 오류가 발생했습니다.';
      setErrorMessage(msg);
    }
  };

  return (
    <div className="flex w-full max-w-[600px] flex-col gap-4 px-[20px] pt-[40px]">
      <div className="relative">
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          className="h-[53px] w-full rounded-[16px] border border-[#E8EEF2] px-6 py-4 text-[14px] outline-none placeholder:text-[#CDCDCD] focus:border-blue-400"
        />
      </div>

      <div className="relative">
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          className="h-[53px] w-full rounded-[16px] border border-[#E8EEF2] px-6 py-4 text-[14px] outline-none placeholder:text-[#CDCDCD] focus:border-blue-400"
        />
      </div>

      {errorMessage && <p className="pl-2 text-[12px] text-red-500">{errorMessage}</p>}

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
