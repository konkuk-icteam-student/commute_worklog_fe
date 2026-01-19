import { createBrowserRouter } from 'react-router-dom';
import Test from '../../pages/Test';
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
import AdminDashboardPage from '../../commute/admin/pages/AdminDashboardPage';
import QRScannerPage from '../../commute/pages/QRScannerPage';
import Category from '@/worklog/pages/category/Category';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Test />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/mypage',
    element: <MyPage />,
  },
  {
    path: '/schedule',
    element: <SchedulePage />,
  },
  {
    path: '/schedule/apply',
    element: <ScheduleApplyPage />,
  },
  {
    path: '/schedule/modify',
    element: <ScheduleModifyPage />,
  },
  {
    path: '/schedule/edit',
    element: <ScheduleEditPage />,
  },
  {
    path: '/schedule/view',
    element: <ScheduleViewPage />,
  },
  {
    path: '/tasks',
    element: <TasksPage />,
  },
  {
    path: '/tasks/today/modify',
    element: <TasksEditPage />,
  },
  {
    path: '/admin',
    element: <AdminDashboardPage />,
  },
  {
    path: '/admin/dashboard',
    element: <AdminDashboardPage />,
  },
  {
    path: '/qr-scanner',
    element: <QRScannerPage />,
  },
  {
    path: '/worklog/category',
    element: <Category />,
  },
]);

export default router;
