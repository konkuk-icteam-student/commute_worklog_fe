/// <reference types="vite/client" />

// JSON 파일 import 타입 정의
declare module '*.json' {
  const value: unknown;
  export default value;
}
