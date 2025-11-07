import { createBrowserRouter } from 'react-router-dom';
import AuthPage from '../../commute/pages/AuthPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthPage />,
  },
]);

export default router;
