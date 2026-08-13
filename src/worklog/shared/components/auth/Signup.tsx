import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import AlertModal from '@/worklog/shared/components/modal/AlertModal';
import {
  sendVerificationCode,
  verifyCode,
  register,
  login,
} from '../../../../shared/apis/auth.api';
import { getOrganizations, type Organization } from '../../apis/organization/Organization.api';
import type { RegisterRequest } from '../../../../shared/types/auth.types';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const pwRegex = /^[A-Za-z0-9]{4,16}$/;

const Signup = () => {
  const navigate = useNavigate();

  // 1. 사용자 유형 (학생/관리자)
  const [userType, setUserType] = useState<'student' | 'admin'>('student');

  // 2. 입력 상태
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [password, setPassword] = useState('');

  // 2-1. 조직 선택 관련 상태 추가
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);
  const [isOrgDropdownOpen, setIsOrgDropdownOpen] = useState(false);

  // 3. 진행 단계 및 UI 상태
  const [isAuthCodeSent, setIsAuthCodeSent] = useState(false);
  const [isAuthVerified, setIsAuthVerified] = useState(false);

  // 4. 메시지 상태
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
  const [alertMessage, setAlertMessage] = useState('');
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertAction, setAlertAction] = useState<(() => void) | null>(null);

  const openAlertModal = (message: string, onConfirm?: () => void) => {
    setAlertMessage(message);
    setAlertAction(() => onConfirm ?? null);
    setIsAlertModalOpen(true);
  };

  const handleCloseAlertModal = () => {
    setIsAlertModalOpen(false);
    setAlertMessage('');
    setAlertAction(null);
  };

  const handleConfirmAlertModal = () => {
    const action = alertAction;
    handleCloseAlertModal();
    action?.();
  };

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await getOrganizations();
        if (response.isSuccess && response.details?.organizations?.length > 0) {
          setOrganizations(response.details.organizations);
        } else {
          // [예외 처리] 등록된 조직이 없을 경우 프론트 개발 진행을 위해 임시 더미 조직 삽입
          setOrganizations([{ organizationId: 0, organizationName: '임시 조직 (데이터 없음)' }]);
        }
      } catch (error) {
        console.error('조직 목록 조회 실패:', error);
        // [예외 처리] API 에러 시에도 막히지 않도록 임시 더미 조직 삽입
        setOrganizations([{ organizationId: 0, organizationName: '임시 조직 (API 통신 오류)' }]);
      }
    };
    fetchOrganizations();
  }, []);

  // --- API 1. 인증번호 발송 ---
  const handleRequestAuthCode = async () => {
    console.log('🖱️ [Action] 인증번호 받기 버튼 클릭');
    console.log('📤 [Sending Data]:', { email });
    if (!emailRegex.test(email)) {
      setEmailMessage({ text: '올바르지 않은 이메일 형식입니다.', type: 'error' });
      return;
    }

    try {
      const response = await sendVerificationCode({ email });
      if (response.isSuccess) {
        setIsAuthCodeSent(true);
        setEmailMessage({ text: '입력하신 메일로 인증번호가 발송되었습니다.', type: 'success' });
      } else {
        setEmailMessage({ text: response.message || '인증번호 발송 실패', type: 'error' });
      }
    } catch (error) {
      // [수정] any 제거 및 AxiosError 타입 단언
      console.error(error);
      const err = error as AxiosError<{ message: string }>;
      const msg = err.response?.data?.message || '인증번호 발송 중 오류 발생';
      setEmailMessage({ text: msg, type: 'error' });
    }
  };

  // --- API 2. 인증번호 검증 ---
  const handleVerifyAuthCode = async () => {
    console.log('🖱️ [Action] 인증번호 확인 버튼 클릭');
    console.log('📤 [Sending Data]:', { email, code: authCode });
    try {
      const response = await verifyCode({ email, code: authCode });

      if (response.isSuccess) {
        setIsAuthVerified(true);
        setAuthMessage({ text: '인증이 완료되었습니다.', type: 'success' });
      } else {
        setAuthMessage({
          text: response.message || '인증번호가 일치하지 않습니다.',
          type: 'error',
        });
      }
    } catch (error) {
      // [수정]
      console.error(error);
      const err = error as AxiosError<{ message: string }>;
      const msg = err.response?.data?.message || '인증번호 확인 중 오류 발생';
      setAuthMessage({ text: msg, type: 'error' });
    }
  };

  // --- API 3 & 4. 회원가입 및 자동 로그인 ---
  const handleSignup = async () => {
    console.log('가입하기 버튼 클릭!');

    // [수정] roleCode 타입 매핑 ("RL01" | "RL02")
    // API 명세서에는 WS01 이었으나, 실제 타입 에러 로그에 따라 RL01/RL02로 매핑합니다.
    const roleCode = userType === 'student' ? 'RL01' : 'RL02';

    const registerData: RegisterRequest = {
      email,
      password,
      name,
      roleCode: roleCode, // 여기서 타입 에러 해결됨
      organizationId: selectedOrgId as number,
    };
    console.log('📤 [Sending Data - Register]:', registerData);

    try {
      const regResponse = await register(registerData);

      if (regResponse.isSuccess) {
        try {
          const loginResponse = await login({ email, password });
          if (loginResponse.isSuccess) {
            openAlertModal('회원가입이 완료되었습니다.', () => window.location.reload());
          } else {
            openAlertModal(
              '회원가입은 완료되었으나 자동 로그인에 실패했습니다. 로그인 페이지로 이동합니다.',
              () => navigate(0)
            );
          }
        } catch (loginError) {
          console.error('Auto Login Failed', loginError);
          openAlertModal('회원가입 완료. 로그인 해주세요.', () => window.location.reload());
        }
      } else {
        openAlertModal(regResponse.message || '회원가입 실패');
      }
    } catch (error) {
      // [수정]
      console.error(error);
      const err = error as AxiosError<{ message: string }>;
      const msg = err.response?.data?.message || '회원가입 중 오류가 발생했습니다.';
      openAlertModal(msg);
    }
  };

  // 비밀번호 실시간 검사
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

  // 버튼 활성화 조건
  const isRequestBtnEnabled = name.length > 0 && email.length > 0 && !isAuthCodeSent;
  const isSignupBtnEnabled =
    isAuthVerified && password.length > 0 && pwRegex.test(password) && selectedOrgId !== null;

  return (
    <div className="flex w-full max-w-[600px] flex-col gap-4 px-[20px]">
      {/* 1. 사용자 유형 선택 */}
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

      {emailMessage && (
        <p
          className={`pl-2 text-[12px] ${emailMessage.type === 'error' ? 'text-red-500' : 'text-blue-500'}`}
        >
          {emailMessage.text}
        </p>
      )}

      {/* 4. 인증번호 받기 버튼 */}
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

      {/* 5. 인증번호 입력 영역 */}
      {isAuthCodeSent && !isAuthVerified && (
        <div className="flex w-full gap-[10px]">
          <input
            type="text"
            placeholder="인증번호"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
            className="h-[53px] w-[440px] shrink-0 rounded-[16px] border border-[#E8EEF2] px-6 py-4 text-[14px] outline-none placeholder:text-[#CDCDCD] focus:border-blue-400"
          />
          <button
            onClick={handleVerifyAuthCode}
            disabled={authCode.length === 0}
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

      {authMessage && (
        <p
          className={`pl-2 text-[12px] ${authMessage.type === 'error' ? 'text-red-500' : 'text-blue-500'}`}
        >
          {authMessage.text}
        </p>
      )}

      {/* 6. 비밀번호 입력 */}
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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

      {/* 💡 7. 소속(조직) 선택 드롭다운 (인증이 완료된 후에만 조작 가능) */}
      <div className="relative w-full">
        <div
          onClick={() => isAuthVerified && setIsOrgDropdownOpen(!isOrgDropdownOpen)}
          className={`flex h-[53px] w-full items-center justify-between rounded-[16px] border border-[#E8EEF2] px-6 py-4 text-[14px] ${!isAuthVerified ? 'cursor-not-allowed bg-gray-50 text-[#CDCDCD]' : 'cursor-pointer bg-white'}`}
        >
          <span className={selectedOrgId !== null ? 'text-[#17191A]' : 'text-[#CDCDCD]'}>
            {selectedOrgId !== null
              ? organizations.find((o) => o.organizationId === selectedOrgId)?.organizationName
              : '선택'}
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 4.5L6 8L9.5 4.5"
              stroke="#8C9499"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {isOrgDropdownOpen && isAuthVerified && (
          <div className="absolute top-[60px] z-10 max-h-[200px] w-full overflow-y-auto rounded-[16px] border border-[#E8EEF2] bg-white shadow-sm">
            {organizations.map((org) => (
              <div
                key={org.organizationId}
                onClick={() => {
                  setSelectedOrgId(org.organizationId);
                  setIsOrgDropdownOpen(false);
                }}
                className="cursor-pointer border-b border-[#E8EEF2] px-6 py-4 text-[14px] text-[#464A4D] last:border-none hover:bg-gray-50"
              >
                {org.organizationName}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 8. 가입하기 버튼 */}
      <button
        disabled={!isSignupBtnEnabled}
        onClick={handleSignup}
        className={`mt-[40px] h-[56px] w-full rounded-[46px] text-[16px] transition-colors ${
          isSignupBtnEnabled
            ? 'bg-[#51A8FF] font-bold text-white hover:bg-blue-500'
            : 'cursor-not-allowed bg-[#EAEAEA] font-normal text-[#CDCDCD]'
        }`}
      >
        가입하기
      </button>

      <AlertModal
        isOpen={isAlertModalOpen}
        message={alertMessage}
        onClose={handleCloseAlertModal}
        onConfirm={handleConfirmAlertModal}
      />
    </div>
  );
};

export default Signup;
