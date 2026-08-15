import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn } from '../utils/tokenManager'; //[cite: 28]

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!isLoggedIn()) {
    //[cite: 28]
    return <Navigate to="/" replace />; // 미로그인 시 루트(/)로 이동 (루트에서 <Auth /> 렌더링)
  }

  // children이 전달되면 children을, 없으면 중첩 라우트 렌더링을 위해 <Outlet />을 반환
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute; //[cite: 28]
