import { createBrowserRouter } from 'react-router-dom';
import Test from '../../pages/Test';
import AuthPage from '../../commute/pages/AuthPage';
import HomePage from '../../commute/pages/HomePage';
import MyPage from '../../commute/pages/MyPage';
import SchedulePage from '../../commute/pages/SchedulePage';
import TasksPage from '../../commute/pages/TasksPage';

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
    path: '/tasks',
    element: <TasksPage />,
  },
]);

export default router;
