import { Navigate, Outlet } from 'react-router-dom';
import { getAccessToken } from '@/shared/utils/tokenManager';

const ProtectedRoute = () => {
  const token = getAccessToken();

  // 토큰이 아예 없다면(비로그인 상태) 경고창 띄우고 루트('/')로 쫓아냅니다.
  if (!token) {
    alert('로그인이 필요한 서비스입니다.');
    return <Navigate to="/login" replace />;
  }

  // 토큰이 있다면 원래 가려던 페이지(Outlet)를 정상적으로 띄워줍니다.
  return <Outlet />;
};

export default ProtectedRoute;
