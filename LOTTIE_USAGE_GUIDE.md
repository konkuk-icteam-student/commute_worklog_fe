# Lottie 애니메이션 사용 가이드

이 문서는 Lottie 애니메이션을 프로젝트에서 사용하는 방법을 설명합니다.

## 설치 완료

다음 라이브러리가 설치되었습니다:

- `lottie-react` (v2.4.1)

---

## 사용 방법

### 1. Lottie JSON 파일 준비

Lottie 애니메이션 파일을 다운로드하여 프로젝트에 추가합니다.

**추천 다운로드 사이트:**

- [LottieFiles](https://lottiefiles.com/) - 무료/유료 Lottie 애니메이션
- [Lordicon](https://lordicon.com/) - 아이콘 애니메이션

**파일 저장 위치:**

```
src/shared/assets/animations/
├── loading.json
├── success.json
├── error.json
└── ...
```

---

### 2. 기본 사용법

#### 방법 1: LottieAnimation 컴포넌트 사용 (추천)

```typescript
import LottieAnimation from '@/shared/components/LottieAnimation';
import loadingAnimation from '@/shared/assets/animations/loading.json';

const MyComponent = () => {
  return (
    <div>
      <LottieAnimation
        animationData={loadingAnimation}
        width={200}
        height={200}
        loop={true}
        autoplay={true}
      />
    </div>
  );
};
```

#### 방법 2: lottie-react 직접 사용

```typescript
import Lottie from 'lottie-react';
import successAnimation from '@/shared/assets/animations/success.json';

const SuccessMessage = () => {
  return (
    <Lottie
      animationData={successAnimation}
      loop={false}
      autoplay={true}
      style={{ width: 150, height: 150 }}
    />
  );
};
```

---

## LottieAnimation 컴포넌트 Props

| Props           | 타입               | 기본값 | 설명                               |
| --------------- | ------------------ | ------ | ---------------------------------- |
| `animationData` | `any`              | -      | **(필수)** Lottie JSON 데이터      |
| `width`         | `string \| number` | `300`  | 애니메이션 너비 (px 또는 %, em 등) |
| `height`        | `string \| number` | `300`  | 애니메이션 높이                    |
| `loop`          | `boolean`          | `true` | 반복 재생 여부                     |
| `autoplay`      | `boolean`          | `true` | 자동 재생 여부                     |
| `speed`         | `number`           | `1`    | 재생 속도 (1 = 정상 속도)          |
| `className`     | `string`           | -      | CSS 클래스명                       |
| `style`         | `CSSProperties`    | -      | 인라인 스타일                      |

---

## 실전 예시

### 1. 로딩 스피너

```typescript
import LottieAnimation from '@/shared/components/LottieAnimation';
import loadingAnimation from '@/shared/assets/animations/loading.json';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <LottieAnimation
        animationData={loadingAnimation}
        width={100}
        height={100}
        loop={true}
      />
    </div>
  );
};

export default LoadingSpinner;
```

### 2. 성공 메시지 (한 번만 재생)

```typescript
import LottieAnimation from '@/shared/components/LottieAnimation';
import successAnimation from '@/shared/assets/animations/success.json';

const SuccessMessage = ({ message }: { message: string }) => {
  return (
    <div className="text-center">
      <LottieAnimation
        animationData={successAnimation}
        width={200}
        height={200}
        loop={false}
        autoplay={true}
      />
      <p className="mt-4 text-green-600 font-semibold">{message}</p>
    </div>
  );
};

export default SuccessMessage;
```

### 3. 조건부 렌더링 (로딩 상태)

```typescript
import { useState, useEffect } from 'react';
import LottieAnimation from '@/shared/components/LottieAnimation';
import loadingAnimation from '@/shared/assets/animations/loading.json';

const DataFetchingComponent = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    // API 호출 시뮬레이션
    setTimeout(() => {
      setData('데이터 로드 완료!');
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LottieAnimation
          animationData={loadingAnimation}
          width={150}
          height={150}
        />
      </div>
    );
  }

  return <div>{data}</div>;
};

export default DataFetchingComponent;
```

### 4. 에러 상태 표시

```typescript
import LottieAnimation from '@/shared/components/LottieAnimation';
import errorAnimation from '@/shared/assets/animations/error.json';

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <LottieAnimation
        animationData={errorAnimation}
        width={250}
        height={250}
        loop={false}
      />
      <h3 className="mt-4 text-xl font-bold text-red-600">오류 발생</h3>
      <p className="mt-2 text-gray-600">{message}</p>
    </div>
  );
};

export default ErrorMessage;
```

### 5. 빈 상태 (Empty State)

```typescript
import LottieAnimation from '@/shared/components/LottieAnimation';
import emptyAnimation from '@/shared/assets/animations/empty.json';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <LottieAnimation
        animationData={emptyAnimation}
        width={300}
        height={300}
        loop={true}
      />
      <h3 className="mt-4 text-lg font-semibold text-gray-700">
        데이터가 없습니다
      </h3>
      <p className="mt-2 text-gray-500">새로운 항목을 추가해보세요!</p>
    </div>
  );
};

export default EmptyState;
```

### 6. 버튼 호버 애니메이션

```typescript
import { useRef } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import buttonAnimation from '@/shared/assets/animations/button.json';

const AnimatedButton = ({ onClick, children }: any) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const handleMouseEnter = () => {
    lottieRef.current?.play();
  };

  const handleMouseLeave = () => {
    lottieRef.current?.stop();
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={buttonAnimation}
        loop={false}
        autoplay={false}
        style={{ width: 24, height: 24 }}
      />
      {children}
    </button>
  );
};

export default AnimatedButton;
```

---

## 고급 기능

### 재생 제어

```typescript
import { useRef } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import animationData from '@/shared/assets/animations/example.json';

const ControlledAnimation = () => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <div>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false}
        autoplay={false}
        style={{ width: 300, height: 300 }}
      />

      <div className="flex gap-2 mt-4">
        <button onClick={() => lottieRef.current?.play()}>재생</button>
        <button onClick={() => lottieRef.current?.pause()}>일시정지</button>
        <button onClick={() => lottieRef.current?.stop()}>정지</button>
        <button onClick={() => lottieRef.current?.setSpeed(2)}>2배속</button>
      </div>
    </div>
  );
};
```

### 이벤트 리스너

```typescript
import Lottie from 'lottie-react';
import animationData from '@/shared/assets/animations/example.json';

const EventAnimation = () => {
  const handleComplete = () => {
    console.log('애니메이션 완료!');
  };

  return (
    <Lottie
      animationData={animationData}
      loop={false}
      onComplete={handleComplete}
      onLoopComplete={() => console.log('루프 완료')}
      onEnterFrame={() => console.log('프레임 진입')}
      style={{ width: 300, height: 300 }}
    />
  );
};
```

---

## 최적화 팁

### 1. JSON 파일 크기 줄이기

- LottieFiles에서 다운로드 시 "Optimized for Lottie" 옵션 선택
- 불필요한 레이어 제거

### 2. 동적 import로 번들 크기 줄이기

```typescript
import { lazy, Suspense } from 'react';

const LottieAnimation = lazy(() => import('@/shared/components/LottieAnimation'));

const MyComponent = () => {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <LottieAnimation animationData={animationData} />
    </Suspense>
  );
};
```

### 3. CDN 사용 (선택사항)

```typescript
import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

const CDNAnimation = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('https://assets.lottiefiles.com/packages/lf20_xxxxx.json')
      .then(res => res.json())
      .then(data => setAnimationData(data));
  }, []);

  if (!animationData) return <div>로딩 중...</div>;

  return <Lottie animationData={animationData} />;
};
```

---

## 추천 Lottie 애니메이션

### 자주 사용하는 애니메이션 타입:

- ✅ 로딩 스피너
- ✅ 체크마크 (성공)
- ❌ 에러/실패
- 📭 빈 상태
- 🔍 검색 중
- 📤 업로드 중
- 🎉 축하/완료

**다운로드 링크:**

- https://lottiefiles.com/featured
- https://lottiefiles.com/search?q=loading
- https://lottiefiles.com/search?q=success

---

## 문제 해결

### JSON import 에러 발생 시

`src/vite-env.d.ts` 파일에 타입 정의가 있는지 확인:

```typescript
declare module '*.json' {
  const value: any;
  export default value;
}
```

### 애니메이션이 표시되지 않을 때

1. JSON 파일 경로가 올바른지 확인
2. animationData가 올바르게 import 되었는지 확인
3. 개발자 도구에서 콘솔 에러 확인

---

## 참고 자료

- [lottie-react 공식 문서](https://www.npmjs.com/package/lottie-react)
- [LottieFiles 웹사이트](https://lottiefiles.com/)
- [Lottie 공식 문서](https://airbnb.design/lottie/)

---

## 요약

1. `LottieAnimation` 컴포넌트를 사용하면 간단하게 애니메이션 추가 가능
2. JSON 파일을 import하여 `animationData`로 전달
3. `width`, `height`, `loop`, `autoplay` 등으로 커스터마이징
4. 로딩, 성공, 에러, 빈 상태 등 다양한 UX 개선 가능

즐거운 개발 되세요!
