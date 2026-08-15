import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/tokenManager'; // tokenManager 경로에 맞게 확인
import Auth from '@/worklog/pages/auth/Auth';

/**
 * 루트 경로(/) 진입 시 로그인 여부에 따라 분기
 * - 이미 로그인되어 있다면: /worklog/faq 로 리다이렉트
 * - 로그인되어 있지 않다면: 로그인 페이지(<Auth />) 렌더링
 */
const RootRoute = () => {
  if (isLoggedIn()) {
    return <Navigate to="/worklog/faq" replace />;
  }
  return <Auth />;
};

export default RootRoute;
