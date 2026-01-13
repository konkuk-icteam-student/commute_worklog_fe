import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/tokenManager';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * 인증이 필요한 라우트를 보호하는 컴포넌트
 * - 로그인되지 않은 경우 /auth 페이지로 리다이렉트
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
