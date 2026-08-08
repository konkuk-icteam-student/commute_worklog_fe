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

    // API 호출 전 기존 에러 메시지 초기화
    setErrorMessage('');

    try {
      const response = await login({ email, password });

      if (response.isSuccess) {
        console.log('✅ [Login Success] Redirecting to /branch');

        const { userName, roleCode, accessToken } = response.details;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userName', userName ?? '');
        localStorage.setItem('roleCode', roleCode ?? '');

        navigate('/', {
          state: {
            userName: userName ?? '',
            roleCode: roleCode ?? '',
          },
        });
      } else {
        setErrorMessage(response.message || '로그인 정보를 다시 확인해주세요.');
        setPassword(''); // 실패 시 비밀번호만 초기화
      }
    } catch (error) {
      console.error('Login Failed:', error);

      const err = error as AxiosError<{ message: string }>;

      // 서버의 HTTP 상태 코드에 따라 에러 메시지를 세분화하여 화면에 띄워줍니다.
      if (err.response) {
        const status = err.response.status;

        if (status === 404) {
          setErrorMessage('가입되지 않은 이메일이거나 존재하지 않는 계정입니다.');
        } else if (status === 401 || status === 400) {
          setErrorMessage('비밀번호가 일치하지 않거나 이메일 정보가 잘못되었습니다.');
        } else {
          setErrorMessage(err.response.data?.message || '로그인 중 오류가 발생했습니다.');
        }
      } else {
        // 서버가 죽었거나 인터넷이 끊긴 경우
        setErrorMessage('서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
      }

      // 실패 시 사용자가 바로 다시 칠 수 있도록 비밀번호 입력창 비워주기
      setPassword('');
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

      {/* 에러 메시지가 있을 때만 렌더링되며, 페이지 이동을 막고 이 위치에 빨간 글씨를 띄웁니다. */}
      {errorMessage && <p className="pl-2 text-[13px] font-medium text-red-500">{errorMessage}</p>}

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
