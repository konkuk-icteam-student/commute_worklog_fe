import { useNavigate } from 'react-router-dom';

// Navigation icons
import HomeButton from '../../../shared/assets/HomeButton.svg';
import SelectedHomeButton from '../../../shared/assets/SelectedHomeButton.svg';
import CalendarButton from '../../../shared/assets/CalendarButton.svg';
import SelectedCalendarButton from '../../../shared/assets/SelectedCalendarButton.svg';
import MessageButton from '../../../shared/assets/MessageButton.svg';
import SelectedMessageButton from '../../../shared/assets/SelectedMessageButton.svg';
import ProfileButton from '../../../shared/assets/ProfileButton.svg';
import SelectedProfileButton from '../../../shared/assets/SelectedProfileButton.svg';

type NavigationPage = 'home' | 'calendar' | 'tasks' | 'mypage';

interface BottomNavigationProps {
  activePage: NavigationPage;
}

export default function BottomNavigation({ activePage }: BottomNavigationProps) {
  const navigate = useNavigate();

  const handleNavigation = (page: NavigationPage) => {
    switch (page) {
      case 'home':
        navigate('/home');
        break;
      case 'calendar':
        navigate('/schedule');
        break;
      case 'tasks':
        navigate('/tasks');
        break;
      case 'mypage':
        navigate('/mypage');
        break;
    }
  };

  return (
    <div
      className="fixed bottom-[2rem] left-1/2 w-[90%] max-w-[39.3rem] -translate-x-1/2"
      data-name="BottomNavigation"
    >
      <div className="rounded-[5rem] bg-white px-[3.2rem] py-[1.6rem] shadow-[0rem_0.4rem_3rem_0rem_rgba(81,168,255,0.2)]">
        <div className="flex items-center justify-between gap-[2rem]">
          {/* Home Button */}
          <button
            onClick={() => handleNavigation('home')}
            className={`flex size-[4rem] items-center justify-center rounded-full transition-all ${
              activePage === 'home' ? 'bg-[rgba(81,168,255,0.1)]' : 'hover:bg-gray-50'
            }`}
            data-name="Button"
          >
            <img
              src={activePage === 'home' ? SelectedHomeButton : HomeButton}
              alt="Home"
              className="h-[2.4rem] w-[2.4rem]"
            />
          </button>

          {/* Calendar Button */}
          <button
            onClick={() => handleNavigation('calendar')}
            className={`flex size-[4rem] items-center justify-center rounded-full transition-all ${
              activePage === 'calendar' ? 'bg-[rgba(81,168,255,0.1)]' : 'hover:bg-gray-50'
            }`}
            data-name="Button"
          >
            <img
              src={activePage === 'calendar' ? SelectedCalendarButton : CalendarButton}
              alt="Calendar"
              className="h-[2.4rem] w-[2.4rem]"
            />
          </button>

          {/* Tasks Button */}
          <button
            onClick={() => handleNavigation('tasks')}
            className={`flex size-[4rem] items-center justify-center rounded-full transition-all ${
              activePage === 'tasks' ? 'bg-[rgba(81,168,255,0.1)]' : 'hover:bg-gray-50'
            }`}
            data-name="Button"
          >
            <img
              src={activePage === 'tasks' ? SelectedMessageButton : MessageButton}
              alt="Tasks"
              className="h-[2.4rem] w-[2.4rem]"
            />
          </button>

          {/* Profile Button */}
          <button
            onClick={() => handleNavigation('mypage')}
            className={`flex size-[4rem] items-center justify-center rounded-full transition-all ${
              activePage === 'mypage' ? 'bg-[rgba(81,168,255,0.1)]' : 'hover:bg-gray-50'
            }`}
            data-name="Button"
          >
            <img
              src={activePage === 'mypage' ? SelectedProfileButton : ProfileButton}
              alt="Profile"
              className="h-[2.4rem] w-[2.4rem]"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
