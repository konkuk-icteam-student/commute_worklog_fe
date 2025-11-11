import { createBrowserRouter } from 'react-router-dom';
import Test from '../../pages/Test';
import AuthPage from '../../commute/pages/AuthPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Test />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
]);

export default router;
