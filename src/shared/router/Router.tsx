import { createBrowserRouter } from 'react-router-dom';
//import Test from '../../pages/Test';
import AuthPage from '../../commute/pages/AuthPage';
import HomePage from '../../commute/pages/HomePage';
import MyPage from '../../commute/pages/MyPage';
import SchedulePage from '../../commute/pages/SchedulePage';
import ScheduleApplyPage from '../../commute/pages/ScheduleApplyPage';
import ScheduleModifyPage from '../../commute/pages/ScheduleModifyPage';
import ScheduleEditPage from '../../commute/pages/ScheduleEditPage';
import TasksPage from '../../commute/pages/TasksPage';
import TasksEditPage from '../../commute/pages/TasksEditPage';
import AdminDashboardPage from '../../commute/admin/pages/AdminDashboardPage';
import Category from '@/worklog/pages/category/Category';
import Faq from '@/worklog/pages/faq/Faq';
import Auth from '@/worklog/pages/auth/Auth';
import Home from '@/worklog/pages/home/Home';
import Department from '@/worklog/pages/category/Department';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,
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
    path: '/worklog/category/manager',
    element: <Category />,
  },
  {
    path: '/worklog/faq',
    element: <Faq />,
  },

  {
    path: '/worklog/home',
    element: <Home />,
  },
  {
    path: '/worklog/category/department',
    element: <Department />,
  },
]);

export default router;
