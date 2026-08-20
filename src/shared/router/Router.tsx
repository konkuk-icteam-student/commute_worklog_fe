import { createBrowserRouter } from 'react-router-dom';
//import Test from '../../pages/Test';
import AuthPage from '../../commute/pages/AuthPage';
import HomePage from '../../commute/pages/HomePage';
import MyPage from '../../commute/pages/MyPage';
import SchedulePage from '../../commute/pages/SchedulePage';
import ScheduleApplyPage from '../../commute/pages/ScheduleApplyPage';
import ScheduleModifyPage from '../../commute/pages/ScheduleModifyPage';
import ScheduleEditPage from '../../commute/pages/ScheduleEditPage';
import ScheduleViewPage from '../../commute/pages/ScheduleViewPage';
import TasksPage from '../../commute/pages/TasksPage';
import TasksEditPage from '../../commute/pages/TasksEditPage';
import ManagerHomePage from '../../commute/admin/pages/ManagerHomePage';
import ManagerQRPage from '../../commute/admin/pages/ManagerQRPage';
import ManagerTaskPage from '../../commute/admin/pages/ManagerTaskPage';
import QRScannerPage from '../../commute/pages/QRScannerPage';
import Category from '@/worklog/pages/category/Category';
import Faq from '@/worklog/pages/faq/Faq';
import Auth from '@/worklog/pages/auth/Auth';
import Home from '@/worklog/pages/home/Home';
import Department from '@/worklog/pages/category/Department';
import Task from '@/worklog/pages/category/Task';
import Mypage from '@/worklog/pages/mypage/Mypage';
import ProtectedRoute from '@/shared/components/layout/ProtectedRoute';
import RootRoute from '@/shared/router/RootRoute';
import Chat from '@/worklog/pages/chat/Chat';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRoute />,
  },
  // 로그인 없이 접근 가능한 공개(Public) 라우트
  {
    path: '/login',
    element: <Auth />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },

  // 토큰이 있어야만 접근 가능한 보호된(Protected) 라우트 묶음
  {
    element: <ProtectedRoute />, // 이 보호막을 통과해야만 children으로 진입 가능
    children: [
      { path: '/home', element: <HomePage /> },
      { path: '/mypage', element: <MyPage /> },
      { path: '/schedule', element: <SchedulePage /> },
      { path: '/schedule/apply', element: <ScheduleApplyPage /> },
      { path: '/schedule/modify', element: <ScheduleModifyPage /> },
      { path: '/schedule/edit', element: <ScheduleEditPage /> },
      { path: '/schedule/view', element: <ScheduleViewPage /> },
      { path: '/tasks', element: <TasksPage /> },
      { path: '/tasks/today/modify', element: <TasksEditPage /> },
      { path: '/qr-scanner', element: <QRScannerPage /> },
      { path: '/manager', element: <ManagerHomePage /> },
      { path: '/manager/home', element: <ManagerHomePage /> },
      { path: '/manager/qr', element: <ManagerQRPage /> },
      { path: '/manager/task', element: <ManagerTaskPage /> },
      { path: '/worklog/category/manager', element: <Category /> },
      { path: '/worklog/faq', element: <Faq /> },
      { path: '/branch', element: <Home /> },
      { path: '/worklog/category/department', element: <Department /> },
      { path: '/worklog/category/task', element: <Task /> },
      { path: '/worklog/mypage', element: <Mypage /> },
      { path: '/worklog/chat', element: <Chat /> },
    ],
  },
]);

export default router;
