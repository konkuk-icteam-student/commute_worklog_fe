import { useNavigate } from 'react-router-dom';
import ManagerHome from '../../imports/ManagerHome';

export default function ManagerHomePage() {
  const navigate = useNavigate();

  const handleNavigate = (page: 'home' | 'qr' | 'task') => {
    switch (page) {
      case 'home':
        navigate('/manager/home');
        break;
      case 'qr':
        navigate('/manager/qr');
        break;
      case 'task':
        navigate('/manager/task');
        break;
    }
  };

  return (
    <div className="flex min-h-screen w-full justify-center bg-white">
      <div className="relative w-full max-w-[1920px]">
        <ManagerHome onNavigate={handleNavigate} currentPage="home" />
      </div>
    </div>
  );
}
