# API 연동 사용 가이드

이 문서는 회원가입/로그인 API 연동 코드의 사용 방법을 설명합니다.

## 목차

1. [설정](#설정)
2. [API 함수 사용법](#api-함수-사용법)
3. [토큰 관리](#토큰-관리)
4. [에러 처리](#에러-처리)
5. [사용 예시](#사용-예시)

---

## 설정

### 1. 환경변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 API 서버 URL을 설정합니다.

```bash
# .env 파일 생성
cp .env.example .env
```

```env
# API Base URL
VITE_API_BASE_URL=http://localhost:8080
```

### 2. 프로젝트 구조

```
src/
├── shared/
│   ├── apis/
│   │   ├── apiClient.ts      # Axios 인스턴스 및 인터셉터
│   │   ├── auth.api.ts        # 인증 관련 API 함수
│   │   └── index.ts           # API 모듈 통합 export
│   ├── types/
│   │   ├── auth.types.ts      # 인증 관련 타입 정의
│   │   └── index.ts
│   └── utils/
│       ├── tokenManager.ts    # 토큰 관리 유틸리티
│       └── index.ts
```

---

## API 함수 사용법

### 1. 인증번호 발송

```typescript
import { sendVerificationCode } from '@/shared/apis';

const handleSendCode = async () => {
  try {
    const response = await sendVerificationCode({
      email: 'user@example.com',
    });

    if (response.isSuccess) {
      console.log(response.message); // "인증번호가 이메일로 발송되었습니다. (유효시간: 5분)"
    }
  } catch (error) {
    console.error('인증번호 발송 실패:', error);
  }
};
```

### 2. 인증번호 검증

```typescript
import { verifyCode } from '@/shared/apis';

const handleVerifyCode = async () => {
  try {
    const response = await verifyCode({
      email: 'user@example.com',
      code: '123456',
    });

    if (response.isSuccess) {
      console.log(response.message); // "이메일 인증이 완료되었습니다. 회원가입을 진행해주세요."
      // 다음 단계로 이동
    }
  } catch (error) {
    console.error('인증번호 검증 실패:', error);
  }
};
```

### 3. 회원가입

```typescript
import { register } from '@/shared/apis';
import type { RegisterRequest } from '@/shared/types';

const handleRegister = async () => {
  try {
    const data: RegisterRequest = {
      email: 'newuser@example.com',
      password: 'securePass123',
      name: '홍길동',
      roleCode: 'RL01', // RL01: 학생/사원, RL02: 관리자
      organizationId: 1,
    };

    const response = await register(data);

    if (response.isSuccess && response.details) {
      console.log('회원가입 성공:', response.details);
      // { userId: 1, email: "newuser@example.com", name: "홍길동", roleCode: "RL01" }
    }
  } catch (error) {
    console.error('회원가입 실패:', error);
  }
};
```

### 4. 로그인

```typescript
import { login } from '@/shared/apis';

const handleLogin = async () => {
  try {
    const response = await login({
      email: 'user@example.com',
      password: 'password123',
    });

    if (response.isSuccess && response.details) {
      console.log('로그인 성공');
      // 토큰은 자동으로 localStorage에 저장됨
      // 메인 페이지로 이동
      window.location.href = '/';
    }
  } catch (error) {
    console.error('로그인 실패:', error);
  }
};
```

### 5. 로그아웃

```typescript
import { logout } from '@/shared/apis';

const handleLogout = async () => {
  try {
    const response = await logout();

    if (response.isSuccess) {
      console.log('로그아웃 성공');
      // 토큰은 자동으로 삭제됨
      // 로그인 페이지로 이동
      window.location.href = '/login';
    }
  } catch (error) {
    console.error('로그아웃 실패:', error);
  }
};
```

---

## 토큰 관리

토큰은 `localStorage`를 통해 자동으로 관리됩니다.

### 토큰 관리 함수

```typescript
import { getAccessToken, getRefreshToken, isLoggedIn, clearTokens } from '@/shared/utils';

// 로그인 여부 확인
if (isLoggedIn()) {
  console.log('사용자가 로그인되어 있습니다.');
}

// 토큰 조회
const accessToken = getAccessToken();
const refreshToken = getRefreshToken();

// 토큰 삭제 (비상시)
clearTokens();
```

### 자동 토큰 갱신

API 클라이언트는 다음과 같은 기능을 자동으로 처리합니다:

1. **요청 시 자동 Authorization 헤더 추가**
   - 모든 API 요청에 `Bearer {accessToken}` 헤더가 자동으로 추가됩니다.

2. **401 에러 시 자동 토큰 갱신**
   - Access Token이 만료되어 401 에러가 발생하면
   - Refresh Token으로 자동으로 토큰을 갱신하고
   - 실패한 요청을 재시도합니다.

3. **Refresh Token 만료 시 로그인 페이지 이동**
   - Refresh Token도 만료된 경우 자동으로 로그인 페이지로 이동합니다.

---

## 에러 처리

### 에러 응답 구조

API 에러는 다음과 같은 구조를 가집니다:

```typescript
{
  isSuccess: false,
  message: "에러 메시지",
  details: null
}
```

### 에러 처리 예시

```typescript
import { login } from '@/shared/apis';
import { AxiosError } from 'axios';

const handleLogin = async (email: string, password: string) => {
  try {
    const response = await login({ email, password });

    if (response.isSuccess) {
      // 성공 처리
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      // API 에러 응답이 있는 경우
      if (error.response?.data) {
        const errorMessage = error.response.data.message || '로그인에 실패했습니다.';
        alert(errorMessage);
      } else {
        // 네트워크 에러 등
        alert('서버와 통신할 수 없습니다.');
      }
    } else {
      // 예상치 못한 에러
      alert('알 수 없는 오류가 발생했습니다.');
    }
  }
};
```

---

## 사용 예시

### React 컴포넌트에서 사용

#### 1. 로그인 페이지

```typescript
import React, { useState } from 'react';
import { login } from '@/shared/apis';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login({ email, password });

      if (response.isSuccess) {
        alert('로그인 성공!');
        navigate('/'); // 메인 페이지로 이동
      }
    } catch (error) {
      alert('로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      />
      <button type="submit" disabled={loading}>
        {loading ? '로그인 중...' : '로그인'}
      </button>
    </form>
  );
};

export default LoginPage;
```

#### 2. 회원가입 페이지

```typescript
import React, { useState } from 'react';
import { sendVerificationCode, verifyCode, register } from '@/shared/apis';
import type { RegisterRequest } from '@/shared/types';

const RegisterPage = () => {
  const [step, setStep] = useState<'email' | 'verify' | 'info'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [formData, setFormData] = useState<RegisterRequest>({
    email: '',
    password: '',
    name: '',
    roleCode: 'RL01',
    organizationId: 1
  });

  // 1단계: 인증번호 발송
  const handleSendCode = async () => {
    try {
      const response = await sendVerificationCode({ email });
      if (response.isSuccess) {
        alert(response.message);
        setStep('verify');
      }
    } catch (error) {
      alert('인증번호 발송 실패');
    }
  };

  // 2단계: 인증번호 검증
  const handleVerifyCode = async () => {
    try {
      const response = await verifyCode({ email, code });
      if (response.isSuccess) {
        alert(response.message);
        setFormData({ ...formData, email });
        setStep('info');
      }
    } catch (error) {
      alert('인증번호 검증 실패');
    }
  };

  // 3단계: 회원가입
  const handleRegister = async () => {
    try {
      const response = await register(formData);
      if (response.isSuccess) {
        alert('회원가입 완료!');
        // 로그인 페이지로 이동
      }
    } catch (error) {
      alert('회원가입 실패');
    }
  };

  return (
    <div>
      {step === 'email' && (
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
          />
          <button onClick={handleSendCode}>인증번호 발송</button>
        </div>
      )}

      {step === 'verify' && (
        <div>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="인증번호"
          />
          <button onClick={handleVerifyCode}>인증하기</button>
        </div>
      )}

      {step === 'info' && (
        <div>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="비밀번호"
          />
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="이름"
          />
          <select
            value={formData.roleCode}
            onChange={(e) => setFormData({ ...formData, roleCode: e.target.value as 'RL01' | 'RL02' })}
          >
            <option value="RL01">학생/사원</option>
            <option value="RL02">관리자</option>
          </select>
          <button onClick={handleRegister}>회원가입</button>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
```

#### 3. Protected Route (인증 필요 페이지)

```typescript
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '@/shared/utils';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!isLoggedIn()) {
    // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
```

---

## 주의사항

1. **환경변수 설정**: `.env` 파일에 올바른 API 서버 URL을 설정해야 합니다.

2. **토큰 보안**:
   - Access Token은 자동으로 만료되며, Refresh Token으로 갱신됩니다.
   - 민감한 정보는 localStorage 대신 secure httpOnly cookie 사용을 권장합니다. (백엔드 설정 필요)

3. **에러 처리**: 모든 API 호출에는 try-catch 블록을 사용하여 에러를 처리해야 합니다.

4. **타입 안전성**: TypeScript를 사용하여 타입 안전성을 보장합니다.

---

## 문의

API 연동 관련 문의사항이 있으시면 프론트엔드 팀에 문의해 주세요.
